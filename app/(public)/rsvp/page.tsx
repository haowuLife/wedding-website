import type { Metadata } from "next";

import { RsvpForm } from "@/components/forms/rsvp-form";
import { YouyouCard } from "@/components/youyou/youyou-card";
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
  const allMessages = getMessages(locale);
  const messages = allMessages.rsvp;

  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="page-heading mt-6">{messages.title}</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm leading-7 text-[var(--color-muted)] sm:flex-row sm:gap-8">
          <p>
            {messages.datePrefix}
            {content.wedding.displayDate}
          </p>
          <span
            className="hidden size-1 rounded-full bg-[var(--color-coral)] sm:block"
            aria-hidden
          />
          <p>
            {messages.venuePrefix}
            {content.wedding.venue}
          </p>
        </div>
      </header>

      <div className="mt-12 md:mt-16">
        <YouyouCard
          variant="steward"
          context="rsvp"
          messages={allMessages.youyou}
        />
      </div>

      <div className="romantic-card mx-auto mt-8 max-w-3xl p-6 sm:p-10 md:mt-10 md:p-12">
        <RsvpForm messages={messages} />
      </div>
    </div>
  );
}
