"use client";

import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { defaultSiteContent } from "@/lib/content/site";

import { Countdown } from "./countdown";

export function CinematicHero() {
  const reduceMotion = useReducedMotion();
  const { hero, identity, wedding } = defaultSiteContent;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#e7ddcf]">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.055], x: ["0%", "-0.6%"], y: ["0%", "-0.4%"] }
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
          alt="新人在晨光山野中的婚纱照"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_18%] md:object-[center_24%]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,241,232,0.18)_0%,rgba(246,241,232,0.02)_36%,rgba(246,241,232,0.94)_72%,#f6f1e8_100%)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-5 pb-10 pt-28 text-center sm:px-8 md:pb-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-serif text-[clamp(3.4rem,15vw,7.5rem)] font-normal leading-none tracking-[0.08em] text-[var(--color-champagne)]">
            {identity.title}
          </h1>
          <p className="mt-5 font-serif text-xl italic tracking-[0.14em] text-[var(--color-muted)] md:text-2xl">
            {wedding.displayDate}
          </p>
          <p className="mt-2 text-xs tracking-[0.28em] text-[var(--color-muted)]">
            {wedding.lunarDate}
          </p>

          <div className="mx-auto mt-7 max-w-md">
            <Countdown target={wedding.date} />
          </div>

          <Link
            href="/details"
            className="mx-auto mt-8 inline-flex min-w-60 items-center justify-center gap-5 rounded-full border border-[var(--color-champagne)] bg-[color:var(--color-ivory)/0.45] px-8 py-4 text-sm tracking-[0.22em] text-[var(--color-champagne)] backdrop-blur-sm transition-colors hover:bg-[var(--color-ivory)]"
          >
            {hero.invitationLabel}
            <ArrowRightIcon size={17} weight="light" aria-hidden />
          </Link>
        </motion.div>

        <a
          href="#invitation"
          className="mt-8 flex flex-col items-center gap-2 text-[var(--color-muted)]"
          aria-label="向下浏览"
        >
          <span className="grid h-12 w-7 place-items-center rounded-full border border-current/55">
            <span className="size-1 rounded-full bg-current" />
          </span>
          <ArrowDownIcon size={15} weight="light" aria-hidden />
        </a>
      </div>
    </section>
  );
}
