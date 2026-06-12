# 陈屿 & 林晚的婚礼网站

一个移动端优先的个人婚礼网站，包含动态邀请封面、爱情故事、婚礼信息、
RSVP、照片相册、宾客指南、祝福留言、婚礼回顾和管理后台。

## 技术栈

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Supabase PostgreSQL / Auth / Storage
- Zod
- Vitest + React Testing Library + Playwright
- Vercel（推荐）

## 本地运行

```bash
npm install
copy .env.example .env.local
npm run dev
```

打开 `http://localhost:3000`。

如果没有填写 Supabase 环境变量，项目会进入明确标识的本地演示模式：

- 公开页面使用演示内容。
- RSVP、留言和后台操作仅保存在当前 Node.js 进程内。
- `/admin/login` 可直接进入演示后台。
- 演示模式不适合生产部署。

## 常用命令

```bash
npm test
npm run test:e2e
npm run lint
npm run typecheck
npm run build
```

## 主要路由

| 路由 | 功能 |
| --- | --- |
| `/` | 动态婚礼邀请首页 |
| `/story` | 爱情故事时间线 |
| `/details` | 婚礼时间、地点与流程 |
| `/rsvp` | RSVP 收集 |
| `/gallery` | 分类相册与灯箱 |
| `/guide` | 宾客交通、住宿与着装指南 |
| `/guestbook` | 审核后公开的祝福留言 |
| `/memories` | 功能开关控制的婚礼回顾 |
| `/admin` | 管理后台 |

## 数据库与部署

完整步骤见 [docs/deployment.md](docs/deployment.md)。

数据库迁移文件：

```text
supabase/migrations/202606120001_initial_schema.sql
supabase/seed.sql
```

## 隐私设计

- RSVP 表没有匿名读取策略。
- 服务端密钥不使用 `NEXT_PUBLIC_` 前缀。
- 留言默认 `is_approved = false`。
- Storage bucket 为私有，公开页面使用短期签名 URL。
- 相册访问码使用 scrypt 哈希和 HTTP-only 会话。
- 表单包含 Zod 校验、蜜罐、同源检查和 IP 哈希限流。
- 管理 API 在每次写操作时重新校验管理员身份。

## 视觉资产

当前图片用于项目演示。上线前应在后台替换为新人拥有使用权的真实照片，
并更新姓名、日期、酒店、联系方式和导航地址。
