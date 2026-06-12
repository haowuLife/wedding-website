import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminIdentity } from "@/lib/domain/auth";
import { isDemoMode } from "@/lib/domain/env";

export default async function AdminLoginPage() {
  const admin = await getAdminIdentity();
  if (admin && !isDemoMode()) redirect("/admin");

  return (
    <div className="grid min-h-screen place-items-center bg-[var(--color-ivory)] px-5 py-16">
      <div className="w-full max-w-md">
        <p className="eyebrow text-center">Wedding Admin</p>
        <h1 className="mt-5 text-center font-serif text-4xl tracking-[0.12em]">
          管理员登录
        </h1>
        <div className="mt-10 border-y border-[var(--color-line)] py-10">
          <AdminLoginForm demoMode={isDemoMode()} />
        </div>
      </div>
    </div>
  );
}
