import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { getSiteContent } from "@/lib/content/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.story,
    description: messages.story.introduction,
  };
}

export default async function StoryPage() {
  const locale = await getLocale();
  const content = await getSiteContent(locale);
  const messages = getMessages(locale).story;
  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="display-title mt-6">{messages.title}</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>

      <div className="relative mx-auto mt-20 max-w-5xl md:mt-28">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-[var(--color-line)] md:left-1/2" />
        <div className="space-y-20 md:space-y-28">
          {content.story.map((item, index) => (
            <Reveal
              key={item.date}
              className="relative grid gap-7 pl-10 md:grid-cols-2 md:gap-20 md:pl-0"
            >
              <span className="absolute left-[7px] top-3 size-3 rounded-full border-2 border-[var(--color-ivory)] bg-[var(--color-champagne)] md:left-1/2 md:-translate-x-1/2" />
              <div
                className={`relative aspect-[4/5] overflow-hidden ${
                  index % 2 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`self-center ${
                  index % 2 ? "md:order-1 md:text-right" : ""
                }`}
              >
                <p className="font-serif text-lg italic tracking-[0.15em] text-[var(--color-champagne)]">
                  {item.date}
                </p>
                <h2 className="mt-4 font-serif text-3xl tracking-[0.1em] md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-5 leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
