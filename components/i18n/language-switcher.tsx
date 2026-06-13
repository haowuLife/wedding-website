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
        className="flex h-9 items-center rounded-full border border-current/35 bg-[color:var(--color-ivory)/0.58] p-0.5 text-[10px] font-medium tracking-[0.08em] backdrop-blur-sm md:h-10 md:text-[11px]"
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
                "grid h-7 min-w-8 place-items-center rounded-full px-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-champagne)] disabled:opacity-55 md:h-8 md:min-w-10",
                selected
                  ? "bg-[var(--color-champagne)] text-white"
                  : "text-current hover:bg-white/35",
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
          className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-[var(--color-ivory)] px-3 py-2 text-right text-xs leading-5 text-red-800 shadow-lg"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
