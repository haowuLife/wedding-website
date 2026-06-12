import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteContent } from "@/lib/content/settings";

export default async function SettingsPage() {
  const content = await getSiteContent();
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-black/45">SETTINGS</p>
      <h1 className="mt-2 font-serif text-4xl tracking-[0.08em]">网站设置</h1>
      <SettingsForm content={content} />
    </div>
  );
}
