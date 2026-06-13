import { SettingsForm } from "@/components/admin/settings-form";
import { getAllSiteContent } from "@/lib/content/settings";

export default async function SettingsPage() {
  const contentByLocale = await getAllSiteContent();
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-black/45">SETTINGS</p>
      <h1 className="mt-2 font-serif text-4xl tracking-[0.08em]">
        网站设置
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-black/50">
        分别维护中文与英文内容。日期、图片和外部链接由两种语言共用。
      </p>
      <SettingsForm contentByLocale={contentByLocale} />
    </div>
  );
}
