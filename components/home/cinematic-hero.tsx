"use client";

import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { SiteContent } from "@/lib/content/site";
import type { PublicMessages } from "@/lib/i18n/messages";

import { Countdown } from "./countdown";

function getEnglishSignature(identity: SiteContent["identity"]) {
  const isEnglish = /^[\u0000-\u007f]+$/.test(
    `${identity.groom}${identity.bride}`,
  );

  if (!isEnglish) return "Hao & Lu";

  const firstName = (name: string) => name.trim().split(/\s+/)[0];
  return `${firstName(identity.groom)} & ${firstName(identity.bride)}`;
}

export function CinematicHero({
  content,
  messages,
}: {
  content: SiteContent;
  messages: PublicMessages;
}) {
  const reduceMotion = useReducedMotion();
  const { hero, identity, wedding } = content;
  const signature = getEnglishSignature(identity);

  return (
    <section className="relative bg-[var(--color-ivory)] pt-[4.5rem] md:pt-20">
      <div className="relative lg:min-h-[calc(100svh-5rem)]">
        <div className="relative h-[43svh] min-h-[20rem] overflow-hidden lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
          <motion.div
            className="absolute inset-0 origin-[58%_42%]"
            initial={false}
            animate={
              reduceMotion
                ? { scale: 1.04 }
                : {
                    scale: [1.04, 1.09],
                    x: ["0%", "-0.35%"],
                    y: ["0%", "-0.2%"],
                  }
            }
            transition={{
              duration: 18,
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
              className="object-cover object-[56%_38%] sm:object-[58%_40%] lg:object-[66%_47%]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(51,43,41,0.02)_0%,rgba(51,43,41,0)_58%,rgba(51,43,41,0.16)_100%)]" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(51,43,41,0.12)_0%,rgba(51,43,41,0.02)_48%,rgba(51,43,41,0)_72%)] lg:block" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[96rem] px-4 pb-20 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:items-end lg:px-[6vw] lg:pb-[7vh]">
          <motion.div
            data-testid="hero-invitation-card"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="romantic-card -mt-10 w-full max-w-xl bg-[color:var(--color-card)/0.94] p-5 backdrop-blur-md sm:p-8 lg:mt-0 lg:max-w-[36rem] lg:bg-[color:var(--color-card)/0.9] lg:p-10"
          >
            <div className="flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.28em] text-[var(--color-coral)]">
              <span className="h-px w-9 bg-current" aria-hidden />
              <span>{hero.eyebrow}</span>
            </div>

            <h1 className="mt-4 font-serif text-[clamp(2.15rem,10vw,5rem)] font-normal leading-[1.06] tracking-[0.04em] text-[var(--color-ink)] sm:mt-5">
              {identity.title}
            </h1>
            <p className="font-script mt-1 text-2xl leading-none text-[var(--color-coral)] sm:text-4xl">
              {signature}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-[var(--color-line)] py-3 text-[0.66rem] tracking-[0.17em] text-[var(--color-muted)] sm:mt-6 sm:gap-x-6 sm:py-4 sm:text-[0.7rem] sm:tracking-[0.2em]">
              <span className="font-medium text-[var(--color-coral-deep)]">
                SAVE THE DATE
              </span>
              <span aria-hidden className="size-1 rounded-full bg-[var(--color-coral)]" />
              <span>{wedding.displayDate}</span>
              <span aria-hidden className="size-1 rounded-full bg-[var(--color-coral)]" />
              <span>{wedding.city}</span>
            </div>

            <div className="mt-4 sm:mt-5">
              <Countdown target={wedding.date} messages={messages.countdown} />
            </div>

            <Link
              href="/details"
              className="romantic-primary-button mt-5 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-[var(--color-coral)] px-7 py-2.5 text-xs font-medium tracking-[0.18em] text-white transition hover:bg-[var(--color-coral-deep)] sm:mt-6 sm:min-h-12 sm:w-auto sm:py-3"
            >
              {hero.invitationLabel}
              <ArrowRightIcon size={17} weight="light" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>

      <a
        href="#invitation"
        className="absolute bottom-0 left-1/2 z-20 grid size-14 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-[var(--color-coral)] text-white shadow-[0_0.8rem_2rem_rgba(185,79,83,0.24)] transition hover:bg-[var(--color-coral-deep)]"
        aria-label={messages.hero.scrollLabel}
      >
        <ArrowDownIcon size={22} weight="light" aria-hidden />
      </a>
    </section>
  );
}
