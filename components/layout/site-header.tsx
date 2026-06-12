"use client";

import { ListIcon, MusicNotesIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { defaultSiteContent } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 transition-colors md:h-20 md:px-8",
          isHome
            ? "text-[var(--color-ink)]"
            : "border-b border-[var(--color-line)] bg-[color:var(--color-ivory)/0.92] text-[var(--color-ink)] backdrop-blur-xl",
        )}
      >
        {isHome ? (
          <nav
            className="flex items-center gap-2 text-[9px] tracking-[0.12em] text-[var(--color-champagne)] sm:gap-4 sm:text-[11px]"
            aria-label="首页快捷导航"
          >
            {defaultSiteContent.navigation.slice(1, 4).map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap"
              >
                {item.label}
                {index < 2 ? (
                  <span className="ml-2 opacity-45 sm:ml-4">|</span>
                ) : null}
              </Link>
            ))}
          </nav>
        ) : (
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.2em] md:text-xl"
            aria-label="返回首页"
          >
            C & L
          </Link>
        )}

        <nav
          className={cn(
            "hidden items-center gap-7 lg:flex",
            isHome && "lg:hidden",
          )}
          aria-label="主导航"
        >
          {defaultSiteContent.navigation.slice(1, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.12em] transition-opacity hover:opacity-55"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-current/35 transition-colors hover:bg-white/30 md:size-10"
            aria-label="背景音乐暂未启用"
            title="背景音乐暂未启用"
          >
            <MusicNotesIcon size={17} weight="light" aria-hidden />
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/30 md:size-10"
            onClick={() => setOpen(true)}
            aria-label="打开菜单"
            aria-expanded={open}
          >
            <ListIcon size={24} weight="light" aria-hidden />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-[var(--color-ivory)] transition duration-500",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <span className="font-serif text-lg tracking-[0.2em]">C & L</span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full"
            onClick={() => setOpen(false)}
            aria-label="关闭菜单"
          >
            <XIcon size={26} weight="light" aria-hidden />
          </button>
        </div>
        <nav
          className="mx-auto flex max-w-xl flex-col px-8 pb-10 pt-10"
          aria-label="移动导航"
        >
          {defaultSiteContent.navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-[var(--color-line)] py-5"
            >
              <span className="font-serif text-2xl tracking-[0.08em]">
                {item.label}
              </span>
              <span className="text-xs text-[var(--color-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
