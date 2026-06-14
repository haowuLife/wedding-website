"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { PublicMessages } from "@/lib/i18n/messages";

type YouyouMessages = PublicMessages["youyou"];

function PawStamp() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="size-full"
      fill="currentColor"
      aria-hidden
    >
      <ellipse cx="32" cy="41" rx="16" ry="14" />
      <circle cx="12" cy="24" r="7" />
      <circle cx="27" cy="14" r="7" />
      <circle cx="43" cy="14" r="7" />
      <circle cx="55" cy="27" r="7" />
    </svg>
  );
}

function YouyouPortrait({
  messages,
}: {
  messages: YouyouMessages;
}) {
  const reduceMotion = useReducedMotion();
  const [stampKey, setStampKey] = useState<number | null>(null);
  const nextStampKey = useRef(0);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (clearTimer.current) clearTimeout(clearTimer.current);
    },
    [],
  );

  function showPawStamp() {
    nextStampKey.current += 1;
    setStampKey(nextStampKey.current);

    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setStampKey(null), 1_500);
  }

  return (
    <div className="relative mx-auto w-fit shrink-0">
      <button
        type="button"
        onClick={showPawStamp}
        aria-label={messages.avatarActionLabel}
        className="focus-ring group relative block size-36 overflow-hidden rounded-full border-[0.45rem] border-[var(--color-blush)] bg-[var(--color-blush)] shadow-[0_1rem_2.5rem_rgba(185,79,83,0.14)] sm:size-44"
      >
        <Image
          src="/images/youyou/youyou-portrait.jpg"
          alt={messages.imageAlt}
          fill
          sizes="(min-width: 640px) 176px, 144px"
          className="object-cover object-[72%_50%] transition-transform duration-500 group-hover:scale-[1.035]"
        />
      </button>

      {stampKey !== null ? (
        <motion.span
          key={stampKey}
          data-testid="youyou-paw-stamp"
          className="pointer-events-none absolute -right-4 -top-3 z-10 size-16 text-[var(--color-coral)] drop-shadow-[0_0.5rem_0.75rem_rgba(185,79,83,0.18)] sm:size-20"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: -18, scale: 0.55 }
          }
          animate={
            reduceMotion
              ? { opacity: [0, 1, 1, 0] }
              : {
                  opacity: [0, 1, 1, 0],
                  rotate: [-18, 4, 0, 0],
                  scale: [0.55, 1.08, 1, 1],
                }
          }
          transition={{ duration: 1.5, times: [0, 0.2, 0.78, 1] }}
          aria-hidden
        >
          <PawStamp />
        </motion.span>
      ) : null}
    </div>
  );
}

export function YouyouCard({
  variant,
  context = "rsvp",
  messages,
}: {
  variant: "family" | "steward";
  context?: "rsvp" | "guide";
  messages: YouyouMessages;
}) {
  if (variant === "family") {
    return (
      <article
        data-testid="youyou-family-card"
        className="romantic-card mx-auto grid max-w-5xl items-center gap-8 overflow-hidden p-7 sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 md:p-12"
      >
        <YouyouPortrait messages={messages} />
        <div className="text-center md:text-left">
          <p className="eyebrow">{messages.familyEyebrow}</p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,7vw,3.75rem)] font-normal leading-tight tracking-[0.035em]">
            {messages.familyTitle}
          </h2>
          <span
            className="mx-auto mt-5 block h-0.5 w-14 bg-[var(--color-coral)] md:mx-0"
            aria-hidden
          />
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg md:leading-9">
            {messages.familyDescription}
          </p>
        </div>
      </article>
    );
  }

  return (
    <aside
      data-testid={`youyou-${context}-steward`}
      className="romantic-card mx-auto grid max-w-4xl items-center gap-7 overflow-hidden border-[var(--color-romantic-line)] bg-white p-6 sm:p-8 md:grid-cols-[1fr_auto] md:gap-10 md:p-10"
    >
      <div className="text-center md:text-left">
        <h2 className="eyebrow">{messages.stewardTitle}</h2>
        <p className="mt-4 font-serif text-2xl font-medium leading-relaxed tracking-[0.04em] text-[var(--color-ink)] sm:text-3xl">
          {messages.welcome}
        </p>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base sm:leading-8">
          {context === "guide"
            ? messages.guideDescription
            : messages.rsvpDescription}
        </p>
      </div>
      <div className="md:order-last">
        <YouyouPortrait messages={messages} />
      </div>
    </aside>
  );
}
