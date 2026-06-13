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
    <div
      id="invitation"
      data-testid="home-preview"
      className="modern-romantic-home bg-[var(--color-ivory)]"
    >
      <section className="px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{messages.invitationEyebrow}</p>
          <h2 className="mt-6 font-serif text-[clamp(2.8rem,10vw,5.5rem)] font-normal leading-[1.2] tracking-[0.06em]">
            {messages.invitationTitle}
          </h2>
          <span
            className="mx-auto mt-7 block h-0.5 w-14 bg-[var(--color-coral)]"
            aria-hidden
          />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-9 text-[var(--color-muted)] md:text-lg">
            {messages.invitationDescription}
          </p>
          <p className="mt-9 font-serif text-xl tracking-[0.18em] text-[var(--color-coral)] md:text-2xl">
            {content.wedding.displayDate}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl space-y-28 px-5 pb-32 sm:px-8 md:space-y-40 md:px-10 md:pb-44">
        {previewAssets.map((asset, index) => {
          const preview = messages.previews[index];
          const imageOrder = index % 2 ? "md:order-2" : "";
          const copyOrder = index % 2 ? "md:order-1" : "";

          return (
            <Reveal
              key={asset.href}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--color-ivory-deep)] ${imageOrder}`}
              >
                <Image
                  src={asset.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 36rem, (min-width: 768px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                />
              </div>

              <div className={`${copyOrder} md:px-3 lg:px-6`}>
                <span
                  className="mb-5 block h-0.5 w-12 bg-[var(--color-coral)]"
                  aria-hidden
                />
                <p className="eyebrow">{preview.eyebrow}</p>
                <h2 className="mt-5 max-w-xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.22] tracking-[0.035em]">
                  {preview.title}
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-[var(--color-muted)] md:text-lg md:leading-9">
                  {preview.description}
                </p>
                <Link
                  href={asset.href}
                  className="mt-8 inline-flex items-center gap-3 border-b border-[var(--color-coral)] pb-2 text-sm font-medium tracking-[0.14em] text-[var(--color-coral-deep)] transition hover:text-[var(--color-coral)]"
                >
                  {preview.actionLabel}
                  <ArrowUpRightIcon size={17} weight="light" aria-hidden />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </section>

      <section className="bg-[var(--color-ivory-deep)] px-5 py-28 text-center md:px-10 md:py-40">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow">{messages.rsvpEyebrow}</p>
          <h2 className="mt-6 font-serif text-[clamp(2.8rem,9vw,5rem)] font-normal tracking-[0.05em]">
            {messages.rsvpTitle}
          </h2>
          <span
            className="mx-auto mt-7 block h-0.5 w-14 bg-[var(--color-coral)]"
            aria-hidden
          />
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
            {messages.rsvpDescription}
          </p>
          <Link
            href="/rsvp"
            className="romantic-primary-button mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-coral)] px-10 py-4 text-sm font-medium tracking-[0.18em] text-white transition hover:bg-[var(--color-coral-deep)]"
          >
            {messages.rsvpAction}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
