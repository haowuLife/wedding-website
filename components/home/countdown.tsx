"use client";

import { useEffect, useState } from "react";

import { getCountdown, type CountdownValue } from "@/lib/domain/countdown";
import type { PublicMessages } from "@/lib/i18n/messages";

const emptyCountdown: CountdownValue = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function Countdown({
  target,
  messages,
}: {
  target: string;
  messages: PublicMessages["countdown"];
}) {
  const [value, setValue] = useState(emptyCountdown);
  const labels: Array<[keyof CountdownValue, string]> = [
    ["days", messages.days],
    ["hours", messages.hours],
    ["minutes", messages.minutes],
    ["seconds", messages.seconds],
  ];

  useEffect(() => {
    const weddingDate = new Date(target);
    const update = () => setValue(getCountdown(new Date(), weddingDate));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  return (
    <div
      className="grid grid-cols-4"
      aria-label={messages.ariaLabel}
    >
      {labels.map(([key, label], index) => (
        <div
          key={key}
          className="relative px-2 text-center sm:px-4"
        >
          <span className="block font-serif text-2xl font-normal leading-none tracking-[0.04em] text-[var(--color-ink)] sm:text-3xl">
            {String(value[key]).padStart(2, "0")}
          </span>
          <span className="mt-2 block text-[0.58rem] font-medium tracking-[0.2em] text-[var(--color-muted)] uppercase sm:text-[0.62rem]">
            {label}
          </span>
          {index < labels.length - 1 ? (
            <span
              aria-hidden
              className="absolute right-0 top-1/2 h-7 w-px -translate-y-1/2 bg-[var(--color-coral)] opacity-35"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
