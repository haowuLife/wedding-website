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
        <h1 className="page-heading display-title mt-5">{messages.title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>

      <div className="relative mx-auto mt-16 max-w-5xl md:mt-24">
        <div className="absolute bottom-6 left-2.5 top-6 w-0.5 rounded-full bg-[var(--color-coral)] md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-16 md:space-y-24">
          {content.story.map((item, index) => (
            <Reveal
              key={`${item.date}-${item.title}`}
              className="relative grid gap-0 pl-9 md:grid-cols-2 md:items-center md:gap-20 md:pl-0"
            >
              <span className="absolute left-[3px] top-9 z-10 size-4 rounded-full border-4 border-white bg-[var(--color-coral)] shadow-[0_0_0_1px_var(--color-coral)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_22px_55px_rgba(77,46,40,0.12)] ${
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
                className={`romantic-card relative z-10 -mt-10 ml-4 rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-[0_18px_45px_rgba(77,46,40,0.11)] md:ml-0 md:mt-0 md:p-9 ${
                  index % 2 ? "md:order-1 md:text-right" : ""
                }`}
              >
                <p className="font-serif text-base italic tracking-[0.15em] text-[var(--color-coral)] md:text-lg">
                  {item.date}
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-[0.08em] md:mt-4 md:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:mt-5 md:text-base md:leading-8">
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
