import {
  BedIcon,
  CloudSunIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { RecommendationSection } from "@/components/guide/recommendation-section";
import { TransportSection } from "@/components/guide/transport-section";
import { Reveal } from "@/components/motion/reveal";
import { YouyouCard } from "@/components/youyou/youyou-card";
import { getSiteContent } from "@/lib/content/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.guide,
    description: messages.guide.introduction,
  };
}

const iconByKind = {
  accommodation: BedIcon,
  weather: CloudSunIcon,
  contact: PhoneIcon,
};

export default async function GuidePage() {
  const locale = await getLocale();
  const content = await getSiteContent(locale);
  const allMessages = getMessages(locale);
  const messages = allMessages.guide;
  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="page-heading display-title mt-5">{messages.title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-5xl md:mt-24">
        <YouyouCard
          variant="steward"
          context="guide"
          messages={allMessages.youyou}
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          {content.guide.map((item, index) => {
            const Icon = iconByKind[item.kind] ?? PhoneIcon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="romantic-card h-full rounded-[1.5rem] border border-white/80 bg-white p-7 shadow-[0_18px_45px_rgba(77,46,40,0.09)] md:p-8">
                  <span className="grid size-12 place-items-center rounded-full bg-[var(--color-coral)]/10">
                    <Icon
                      size={25}
                      weight="light"
                      className="text-[var(--color-coral-deep)]"
                      aria-hidden
                    />
                  </span>
                  <h2 className="mt-6 font-serif text-2xl tracking-[0.08em]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                  {item.action ? (
                    <a
                      href={item.action.href}
                      className="mt-5 inline-block border-b border-[var(--color-coral)] pb-1 text-sm tracking-[0.14em] text-[var(--color-coral-deep)]"
                    >
                      {item.action.label}
                    </a>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>

        <RecommendationSection
          eyebrow={messages.travelEyebrow}
          title={messages.travelTitle}
          description={messages.travelDescription}
          items={content.travel}
          disclaimer={content.travelDisclaimer}
          testId="travel-section"
        />

        <RecommendationSection
          eyebrow={messages.foodEyebrow}
          title={messages.foodTitle}
          description={messages.foodDescription}
          items={content.food}
          testId="food-section"
        />

        <TransportSection
          items={content.transport}
          holidayNote={content.holidayTravelNote}
          messages={messages}
        />
      </div>
    </div>
  );
}
