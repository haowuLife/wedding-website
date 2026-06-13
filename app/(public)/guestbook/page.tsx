import type { Metadata } from "next";

import { GuestbookForm } from "@/components/forms/guestbook-form";
import { MessageList } from "@/components/guestbook/message-list";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.guestbook,
    description: messages.guestbook.introduction,
  };
}

export default async function GuestbookPage() {
  const locale = await getLocale();
  const messages = getMessages(locale).guestbook;

  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="display-title mt-6">{messages.title}</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-5xl gap-16 md:mt-24 md:grid-cols-[0.85fr_1.15fr] md:gap-24">
        <section>
          <p className="eyebrow">{messages.formEyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl tracking-[0.08em]">
            {messages.formTitle}
          </h2>
          <div className="mt-8">
            <GuestbookForm messages={messages} />
          </div>
        </section>
        <section>
          <p className="eyebrow">{messages.messagesEyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl tracking-[0.08em]">
            {messages.messagesTitle}
          </h2>
          <div className="mt-5">
            <MessageList />
          </div>
        </section>
      </div>
    </div>
  );
}
