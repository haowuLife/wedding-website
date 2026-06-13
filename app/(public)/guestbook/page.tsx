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
        <h1 className="page-heading mt-6">{messages.title}</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl items-start gap-12 md:mt-20 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
        <section className="romantic-card p-6 sm:p-9">
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
          <div className="mt-8">
            <MessageList />
          </div>
        </section>
      </div>
    </div>
  );
}
