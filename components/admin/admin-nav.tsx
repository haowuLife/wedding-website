"use client";

import {
  GearIcon,
  ImagesIcon,
  LayoutIcon,
  SignOutIcon,
  UsersIcon,
  ChatCircleTextIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "概览", icon: LayoutIcon },
  { href: "/admin/guests", label: "宾客", icon: UsersIcon },
  { href: "/admin/messages", label: "留言", icon: ChatCircleTextIcon },
  { href: "/admin/photos", label: "照片", icon: ImagesIcon },
  { href: "/admin/settings", label: "设置", icon: GearIcon },
];

export function AdminNav({
  email,
  demoMode,
}: {
  email: string;
  demoMode: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    if (!demoMode) {
      const { createSupabaseBrowserClient } = await import(
        "@/lib/supabase/client"
      );
      await createSupabaseBrowserClient().auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="border-b border-black/10 bg-[#26231f] text-white md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col p-5 md:p-7">
        <Link href="/" className="font-serif text-xl tracking-[0.16em]">
          W & W
        </Link>
        <p className="mt-2 text-xs tracking-[0.14em] text-white/45">
          WEDDING ADMIN
        </p>
        <nav className="mt-6 flex gap-2 overflow-x-auto md:mt-12 md:flex-col">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm transition",
                  active
                    ? "bg-white text-[#26231f]"
                    : "text-white/65 hover:bg-white/8 hover:text-white",
                )}
              >
                <Icon size={19} weight="light" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden border-t border-white/10 pt-6 md:block">
          <p className="truncate text-xs text-white/45">{email}</p>
          <button
            type="button"
            onClick={signOut}
            className="mt-4 flex items-center gap-3 text-sm text-white/65 hover:text-white"
          >
            <SignOutIcon size={18} weight="light" aria-hidden />
            退出登录
          </button>
        </div>
      </div>
    </aside>
  );
}
