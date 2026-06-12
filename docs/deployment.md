# 部署说明

## 1. Supabase 项目

1. 在 Supabase 创建新项目并妥善保存数据库密码。
2. 在 SQL Editor 依次执行：

```text
supabase/migrations/202606120001_initial_schema.sql
supabase/seed.sql
```

迁移会创建：

- `guests`
- `messages`
- `photos`
- `site_settings`
- `form_rate_limits`
- 私有 Storage bucket `wedding-media`
- RLS、管理员策略、更新时间触发器和原子限流函数

不要为 `guests` 添加匿名读取策略。

## 2. 管理员账号

在 Supabase Authentication 中创建邮箱密码用户。然后在 SQL Editor 给该用户
添加管理员角色：

```sql
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'your-admin@example.com';
```

也可以把管理员邮箱加入 `ADMIN_EMAILS`，多个邮箱用逗号分隔。生产环境建议同时
设置 `app_metadata.role = admin`。

## 3. 环境变量

```dotenv
NEXT_PUBLIC_SITE_URL=https://wedding.example.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_EMAILS=your-admin@example.com
GALLERY_ACCESS_CODE_HASH=
GALLERY_COOKIE_SECRET=RANDOM_SECRET
RATE_LIMIT_SECRET=ANOTHER_RANDOM_SECRET
```

`SUPABASE_SERVICE_ROLE_KEY` 只允许配置在服务端部署环境，禁止放入浏览器代码、
截图、公开仓库或 `NEXT_PUBLIC_*` 变量。

生成随机密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

生成相册访问码哈希：

```bash
node -e "const c=require('crypto'),code='CHANGE_ME',salt=c.randomBytes(16).toString('hex');console.log('scrypt:'+salt+':'+c.scryptSync(code,salt,32).toString('hex'))"
```

把 `CHANGE_ME` 替换为真实访问码，只保存输出哈希，不保存明文。

未设置 `GALLERY_ACCESS_CODE_HASH` 时，相册不要求访问码。设置哈希时必须同时设置
`GALLERY_COOKIE_SECRET`。

## 4. Vercel 部署

1. 将仓库导入 Vercel。
2. Framework Preset 选择 Next.js。
3. 在 Production、Preview、Development 环境分别填写上述变量。
4. 部署后把 `NEXT_PUBLIC_SITE_URL` 更新为正式 HTTPS 域名并重新部署。
5. 在 Supabase Authentication URL Configuration 中添加：

```text
https://wedding.example.com
https://wedding.example.com/admin
```

6. 验证 `/admin/login`、RSVP、留言、CSV 导出和照片上传。

## 5. Cloudflare 部署

这个项目使用 Next.js Route Handlers、服务器 Cookie 和 Node.js 加密 API。
在 Cloudflare 平台上，推荐使用 **Cloudflare Workers + OpenNext**，而不是纯静态
Pages 导出。

典型流程：

```bash
npm install --save-dev @opennextjs/cloudflare wrangler
npx opennextjs-cloudflare build
npx wrangler deploy
```

在 Cloudflare Dashboard 的 Workers & Pages 设置中配置相同环境变量，并把
`SUPABASE_SERVICE_ROLE_KEY`、`GALLERY_COOKIE_SECRET` 和
`RATE_LIMIT_SECRET` 标记为 Secret。

如果必须使用传统 Cloudflare Pages：

- 将表单和后台 API 移到 Supabase Edge Functions 或独立 Worker。
- 把 Next.js 改为静态导出。
- 管理登录、签名图片 URL 和限流不能继续依赖当前 Route Handlers。

因此，完整功能部署目标是 Vercel 或 Cloudflare Workers/OpenNext；传统 Pages
只适合拆分后的静态前台。

## 6. 图片存储

后台上传会：

- 仅接受 JPEG、PNG、WebP、AVIF。
- 限制单文件不超过 15 MB。
- 使用 UUID 生成 Storage 路径。
- 将对象保存在私有 `wedding-media` bucket。
- 公开页面只获取 30 分钟有效的签名 URL。

上线前建议把原图先导出为长边 2400–3200 px、质量 80–88 的 WebP 或 AVIF。

## 7. 婚礼回顾上线

婚礼前 `/memories` 默认返回 404。婚礼结束后：

1. 在后台“照片管理”上传到 `memories` 集合。
2. 在“网站设置”勾选“开启婚礼回顾页面”。
3. 检查视频链接或上传文件的访问权限。
4. 清理不再需要的相册访问码 Cookie 或更新访问码。

## 8. 上线检查

- 使用真实姓名、日期、地址和电话替换演示内容。
- 使用有权发布的真实婚礼照片。
- 确认 RSVP 表无法从匿名 Supabase 客户端读取。
- 确认普通 Auth 用户无法访问管理策略。
- 测试拒绝出席、多人、儿童、停车和饮食忌口场景。
- 导出一次 CSV 并用 Excel/WPS 检查中文编码。
- 测试移动网络下的首屏和相册加载。
- 为 Supabase 开启数据库备份，并定期导出 RSVP。
