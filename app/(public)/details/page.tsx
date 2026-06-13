import {
  ArrowUpRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { getSiteContent } from "@/lib/content/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.details,
    description: messages.details.locationDescription,
  };
}

export default async function DetailsPage() {
  const locale = await getLocale();
  const { wedding } = await getSiteContent(locale);
  const messages = getMessages(locale).details;

  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="display-title mt-6">{messages.title}</h1>
      </header>

      <Reveal className="mx-auto mt-16 grid max-w-5xl border-y border-[var(--color-line)] py-10 text-center md:mt-24 md:grid-cols-3 md:py-14">
        <div className="py-6 md:py-0">
          <p className="eyebrow">{messages.dateLabel}</p>
          <p className="mt-4 font-serif text-2xl tracking-[0.12em]">
            {wedding.displayDate}
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {wedding.lunarDate}
          </p>
        </div>
        <div className="border-y border-[var(--color-line)] py-8 md:border-x md:border-y-0 md:py-0">
          <p className="eyebrow">{messages.luncheonLabel}</p>
          <p className="mt-4 font-serif text-2xl tracking-[0.12em]">
            {messages.luncheonValue}
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {messages.receptionPrefix} {wedding.receptionTime}
          </p>
        </div>
        <div className="py-6 md:py-0">
          <p className="eyebrow">{messages.venueLabel}</p>
          <p className="mt-4 font-serif text-xl tracking-[0.08em]">
            {wedding.venue}
          </p>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
            {wedding.address}
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl gap-16 md:mt-24 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
        <Reveal>
          <p className="eyebrow">{messages.locationEyebrow}</p>
          <h2 className="mt-5 font-serif text-4xl tracking-[0.08em]">
            {wedding.city} · {messages.citySuffix}
          </h2>
          <p className="mt-6 leading-8 text-[var(--color-muted)]">
            {messages.locationDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wedding.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-champagne)] px-7 py-3 text-sm tracking-[0.16em] text-[var(--color-champagne)]"
            >
              <MapPinIcon size={18} weight="light" aria-hidden />
              {messages.mapAction}
            </a>
            <a
              href={wedding.hotelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-champagne)] px-7 py-3 text-sm tracking-[0.16em] text-white"
            >
              {messages.hotelAction}
              <ArrowUpRightIcon size={18} weight="light" aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">{messages.timelineEyebrow}</p>
          <div className="mt-4">
            {wedding.schedule.map((item) => (
              <div
                key={item.time}
                className="grid grid-cols-[5rem_1fr] gap-5 border-b border-[var(--color-line)] py-6"
              >
                <p className="font-serif text-lg text-[var(--color-champagne)]">
                  {item.time}
                </p>
                <div>
                  <h3 className="font-serif text-xl tracking-[0.08em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
