import {
  BedIcon,
  CloudSunIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { RecommendationSection } from "@/components/guide/recommendation-section";
import { TransportSection } from "@/components/guide/transport-section";
import { Reveal } from "@/components/motion/reveal";
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
  const messages = getMessages(locale).guide;
  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="display-title mt-6">{messages.title}</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-5xl md:mt-24">
        {content.guide.map((item) => {
          const Icon = iconByKind[item.kind] ?? PhoneIcon;
          return (
            <Reveal
              key={item.title}
              className="grid gap-5 border-b border-[var(--color-line)] py-9 md:grid-cols-[5rem_13rem_1fr] md:items-start"
            >
              <Icon
                size={32}
                weight="light"
                className="text-[var(--color-champagne)]"
                aria-hidden
              />
              <h2 className="font-serif text-2xl tracking-[0.08em]">
                {item.title}
              </h2>
              <div>
                <p className="leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
                {item.action ? (
                  <a
                    href={item.action.href}
                    className="mt-4 inline-block border-b border-[var(--color-champagne)] pb-1 text-sm tracking-[0.14em] text-[var(--color-champagne)]"
                  >
                    {item.action.label}
                  </a>
                ) : null}
              </div>
            </Reveal>
          );
        })}

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
