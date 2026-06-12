import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { getAdminIdentity } from "@/lib/domain/auth";
import { isDemoMode } from "@/lib/domain/env";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminIdentity();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-[#322f2a]">
      <AdminNav email={admin.email} demoMode={isDemoMode()} />
      <div className="md:pl-64">
        {isDemoMode() ? (
          <div className="bg-[#b38c53] px-5 py-2 text-center text-xs tracking-[0.12em] text-white">
            本地演示模式 · 配置 Supabase 后启用真实数据与登录
          </div>
        ) : null}
        <div className="p-5 md:p-10">{children}</div>
      </div>
    </div>
  );
}
