"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { PublicMessages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  labels,
}: {
  locale: Locale;
  labels: PublicMessages["languageSwitcher"];
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale || isPending) return;
    setError("");
    startTransition(async () => {
      try {
        const response = await fetch("/api/locale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: nextLocale }),
        });
        if (!response.ok) {
          setError(labels.error);
          return;
        }
        router.refresh();
      } catch {
        setError(labels.error);
      }
    });
  }

  return (
    <div className="relative">
      <div
        role="group"
        aria-label={labels.label}
        data-testid="language-switcher"
        className="flex h-9 items-center rounded-full border border-[var(--color-romantic-line)] bg-white p-0.5 text-[10px] font-semibold tracking-[0.08em] shadow-[0_0.25rem_1rem_rgb(185_79_83/0.06)] md:h-10 md:text-[11px]"
      >
        {(
          [
            ["zh", labels.chinese],
            ["en", labels.english],
          ] as const
        ).map(([value, label]) => {
          const selected = locale === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              disabled={isPending}
              onClick={() => switchLocale(value)}
              className={cn(
                "grid h-7 min-w-8 place-items-center rounded-full px-2 transition-colors disabled:cursor-wait disabled:opacity-55 md:h-8 md:min-w-10",
                selected
                  ? "bg-[var(--color-coral)] text-[var(--color-ink)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-blush)] hover:text-[var(--color-coral-deep)]",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p
          role="status"
          className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--color-romantic-line)] bg-white px-3 py-2 text-right text-xs leading-5 text-red-800 shadow-lg"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
