import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";

const defaultNames: Record<Locale, { groom: string; bride: string }> = {
  zh: { groom: "吴昊", bride: "王璐" },
  en: { groom: "Hao Wu", bride: "Lu Wang" },
};

export function CoupleSignature({
  locale = "zh",
  names,
  compact = false,
  className,
}: {
  locale?: Locale;
  names?: { groom: string; bride: string };
  compact?: boolean;
  className?: string;
}) {
  const localizedNames = names ?? defaultNames[locale];

  return (
    <span
      className={cn(
        "inline-flex text-left",
        compact
          ? "flex-col items-start gap-0 sm:flex-row sm:items-center sm:gap-3"
          : "flex-col items-start gap-1",
        className,
      )}
      data-compact={compact}
    >
      <span
        className={cn(
          "font-serif whitespace-nowrap font-medium tracking-[0.08em] text-[var(--color-ink)]",
          compact ? "text-[0.72rem] sm:text-sm" : "text-base sm:text-lg",
        )}
      >
        {localizedNames.groom} & {localizedNames.bride}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "font-script whitespace-nowrap text-[var(--color-coral-deep)]",
          compact ? "text-xl sm:text-2xl" : "text-3xl",
        )}
      >
        Hao & Lu
      </span>
    </span>
  );
}
