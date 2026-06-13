"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { CoupleSignature } from "@/components/layout/couple-signature";
import type { NavigationItem } from "@/lib/content/site";
import type { PublicMessages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export function SiteHeader({
  locale,
  navigation,
  messages,
}: {
  locale: Locale;
  navigation: NavigationItem[];
  messages: PublicMessages;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const labels = messages.header;

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <>
      <header
        data-site-header
        className="fixed inset-x-0 top-0 z-50 h-[4.5rem] border-b border-[var(--color-romantic-line)] bg-white/95 text-[var(--color-ink)] shadow-[0_0.5rem_2rem_rgb(185_79_83/0.05)] backdrop-blur-xl md:h-20"
      >
        <div className="relative mx-auto flex h-full max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
          <Link
            href="/"
            className="shrink-0 rounded-md"
            aria-label={labels.returnHomeLabel}
          >
            <CoupleSignature locale={locale} compact />
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex xl:gap-7"
            aria-label={labels.mainNavigationLabel}
            data-testid="desktop-navigation"
          >
            {navigation.slice(1).map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap py-2 text-xs font-medium tracking-[0.08em] text-[var(--color-muted)] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-[var(--color-coral)] after:transition-transform hover:text-[var(--color-coral-deep)] xl:text-sm",
                    active
                      ? "text-[var(--color-coral-deep)] after:scale-x-100"
                      : "after:scale-x-0",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
            />
            <button
              ref={menuButtonRef}
              type="button"
              className="grid size-10 place-items-center rounded-full text-[var(--color-coral-deep)] transition-colors hover:bg-[var(--color-blush)] lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={labels.openMenuLabel}
              aria-expanded={open}
              aria-controls="mobile-navigation-dialog"
              data-testid="mobile-menu-button"
            >
              <ListIcon size={24} weight="regular" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation-dialog"
        className={cn(
          "fixed inset-0 z-[60] bg-[var(--color-warm-white)] transition duration-300 lg:hidden",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={labels.mobileNavigationLabel}
        aria-hidden={!open}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-[var(--color-romantic-line)] bg-white px-4 sm:px-6 md:h-20 md:px-8">
          <CoupleSignature locale={locale} compact />
          <button
            ref={closeButtonRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-[var(--color-coral-deep)] transition-colors hover:bg-[var(--color-blush)]"
            onClick={() => {
              setOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-label={labels.closeMenuLabel}
            tabIndex={open ? 0 : -1}
          >
            <XIcon size={25} weight="regular" aria-hidden />
          </button>
        </div>
        <nav
          className="mx-auto flex max-w-xl flex-col px-6 pb-10 pt-7 sm:px-8 sm:pt-10"
          aria-label={labels.mobileNavigationLabel}
        >
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "flex items-baseline justify-between border-b border-[var(--color-romantic-line)] py-5 transition-colors hover:text-[var(--color-coral-deep)]",
                isActive(item.href) && "text-[var(--color-coral-deep)]",
              )}
            >
              <span className="font-serif text-2xl font-medium tracking-[0.06em]">
                {item.label}
              </span>
              <span className="text-xs tracking-[0.14em] text-[var(--color-muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
