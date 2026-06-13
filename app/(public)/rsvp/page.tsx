import type { Metadata } from "next";

import { RsvpForm } from "@/components/forms/rsvp-form";
import { getSiteContent } from "@/lib/content/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.rsvp,
    description: messages.rsvp.introduction,
  };
}

export default async function RsvpPage() {
  const locale = await getLocale();
  const content = await getSiteContent(locale);
  const messages = getMessages(locale).rsvp;

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
        <header>
          <p className="eyebrow">{messages.eyebrow}</p>
          <h1 className="display-title mt-6">{messages.title}</h1>
          <p className="mt-7 leading-8 text-[var(--color-muted)]">
            {messages.introduction}
          </p>
          <div className="mt-10 border-l border-[var(--color-champagne)] pl-5 text-sm leading-7 text-[var(--color-muted)]">
            <p>
              {messages.datePrefix}
              {content.wedding.displayDate}
            </p>
            <p>
              {messages.venuePrefix}
              {content.wedding.venue}
            </p>
          </div>
        </header>
        <div className="border-t border-[var(--color-line)] pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
          <RsvpForm messages={messages} />
        </div>
      </div>
    </div>
  );
}
