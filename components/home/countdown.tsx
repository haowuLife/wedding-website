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
      className="grid grid-cols-4 divide-x divide-[var(--color-line)]"
      aria-label={messages.ariaLabel}
    >
      {labels.map(([key, label]) => (
        <div key={key} className="px-3 text-center sm:px-5">
          <span className="block font-serif text-lg font-light tracking-[0.08em] sm:text-2xl">
            {String(value[key]).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-xs tracking-[0.24em] text-[var(--color-muted)]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
