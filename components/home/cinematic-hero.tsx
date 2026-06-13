"use client";

import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { SiteContent } from "@/lib/content/site";
import type { PublicMessages } from "@/lib/i18n/messages";

import { Countdown } from "./countdown";

export function CinematicHero({
  content,
  messages,
}: {
  content: SiteContent;
  messages: PublicMessages;
}) {
  const reduceMotion = useReducedMotion();
  const { hero, identity, wedding } = content;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#e7ddcf]">
      <motion.div
        className="absolute inset-0 origin-[50%_43%]"
        initial={false}
        animate={
          reduceMotion
            ? { scale: 1.32, x: "0%", y: "0%" }
            : {
                scale: [1.32, 1.39],
                x: ["0%", "-0.5%"],
                y: ["0%", "-0.3%"],
              }
        }
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Image
          src={hero.image}
          alt={messages.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_44%] md:object-[center_47%] lg:object-[66%_47%]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,241,232,0.18)_0%,rgba(246,241,232,0.02)_36%,rgba(246,241,232,0.94)_72%,#f6f1e8_100%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(246,241,232,0.96)_0%,rgba(246,241,232,0.74)_28%,rgba(246,241,232,0.08)_62%,rgba(246,241,232,0)_100%)] lg:block" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-5 pb-10 pt-28 text-center sm:px-8 md:pb-14 lg:items-start lg:justify-center lg:px-[8vw] lg:pb-20 lg:pt-28 lg:text-left">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-3 font-serif text-[clamp(2.8rem,12vw,7.5rem)] font-normal leading-none tracking-[0.08em] text-[var(--color-champagne)] lg:whitespace-nowrap lg:text-[clamp(4rem,6vw,6.5rem)] lg:tracking-[0.04em]">
            {identity.title}
          </h1>
          <p className="mt-5 font-serif text-xl italic tracking-[0.14em] text-[var(--color-muted)] md:text-2xl">
            {wedding.displayDate}
          </p>
          <p className="mt-2 text-xs tracking-[0.28em] text-[var(--color-muted)]">
            {wedding.lunarDate}
          </p>

          <div className="mx-auto mt-7 max-w-md lg:mx-0">
            <Countdown
              target={wedding.date}
              messages={messages.countdown}
            />
          </div>

          <Link
            href="/details"
            className="mx-auto mt-7 inline-flex min-w-40 items-center justify-center gap-4 rounded-full border border-[var(--color-champagne)] bg-[color:var(--color-ivory)/0.45] px-6 py-3 text-xs tracking-[0.2em] text-[var(--color-champagne)] backdrop-blur-sm transition-colors hover:bg-[var(--color-ivory)] lg:mx-0"
          >
            {hero.invitationLabel}
            <ArrowRightIcon size={17} weight="light" aria-hidden />
          </Link>
        </motion.div>

        <a
          href="#invitation"
          className="mt-8 flex flex-col items-center gap-2 text-[var(--color-muted)] lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2"
          aria-label={messages.hero.scrollLabel}
        >
          <span className="grid h-12 w-7 place-items-center rounded-full border border-current/55">
            <span className="size-1 rounded-full bg-current" />
          </span>
          <ArrowDownIcon size={15} weight="light" aria-hidden />
          <span className="text-[9px] leading-4 tracking-[0.18em]">
            {messages.hero.scrollLine1}
            <br />
            {messages.hero.scrollLine2}
          </span>
        </a>
      </div>
    </section>
  );
}
