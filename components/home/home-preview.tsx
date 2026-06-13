import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import type { SiteContent } from "@/lib/content/site";
import type { PublicMessages } from "@/lib/i18n/messages";

const previewAssets = [
  {
    href: "/story",
    image: "/images/gallery/story-01.jpg",
  },
  {
    href: "/details",
    image: "/images/gallery/story-03-clean.webp",
  },
  {
    href: "/guide",
    image: "/images/guide/taixing-ginkgo-forest.webp",
  },
];

export function HomePreview({
  content,
  messages,
}: {
  content: SiteContent;
  messages: PublicMessages["home"];
}) {
  return (
    <div id="invitation">
      <section className="px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{messages.invitationEyebrow}</p>
          <h2 className="mt-6 font-serif text-5xl leading-[1.4] tracking-[0.1em] md:text-7xl">
            {messages.invitationTitle}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-9 text-[var(--color-muted)] md:text-lg">
            {messages.invitationDescription}
          </p>
          <div className="mx-auto mt-10 h-px w-20 bg-[var(--color-champagne)]" />
          <p className="mt-8 font-serif text-xl tracking-[0.2em] text-[var(--color-champagne)]">
            {content.wedding.displayDate}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-5 pb-28 md:px-10">
        {previewAssets.map((asset, index) => {
          const preview = messages.previews[index];
          return (
          <Reveal
            key={asset.href}
            className="grid items-center gap-9 md:grid-cols-2 md:gap-16"
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden ${
                index % 2 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={asset.image}
                alt=""
                fill
                sizes="(min-width: 768px) 44vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className={index % 2 ? "md:order-1" : ""}>
              <p className="eyebrow">{preview.eyebrow}</p>
              <h2 className="mt-5 font-serif text-5xl leading-snug tracking-[0.06em] md:text-6xl">
                {preview.title}
              </h2>
              <p className="mt-6 max-w-lg leading-8 text-[var(--color-muted)]">
                {preview.description}
              </p>
              <Link
                href={asset.href}
                className="mt-8 inline-flex items-center gap-3 border-b border-[var(--color-champagne)] pb-2 text-sm tracking-[0.18em] text-[var(--color-champagne)]"
              >
                {preview.actionLabel}
                <ArrowUpRightIcon size={17} weight="light" aria-hidden />
              </Link>
            </div>
          </Reveal>
          );
        })}
      </section>

      <section className="bg-[var(--color-ivory-deep)] px-5 py-24 text-center md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow">{messages.rsvpEyebrow}</p>
          <h2 className="mt-6 font-serif text-5xl tracking-[0.08em] md:text-7xl">
            {messages.rsvpTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-[var(--color-muted)]">
            {messages.rsvpDescription}
          </p>
          <Link
            href="/rsvp"
            className="mt-9 inline-flex rounded-full bg-[var(--color-champagne)] px-10 py-4 text-sm tracking-[0.22em] text-white"
          >
            {messages.rsvpAction}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
