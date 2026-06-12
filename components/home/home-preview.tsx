import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import type { SiteContent } from "@/lib/content/site";

const previews = [
  {
    eyebrow: "Our Story",
    title: "从一次偶遇，到一生同行",
    description:
      "那些被时间温柔收藏的瞬间，组成了我们想与你分享的故事。",
    href: "/story",
    image: "/images/gallery/story-01.jpg",
  },
  {
    eyebrow: "Wedding Details",
    title: "相约泰兴的金秋",
    description:
      "仪式、午宴、交通与住宿信息，都已为你整理在这份宾客指南中。",
    href: "/details",
    image: "/images/gallery/story-03.jpg",
  },
];

export function HomePreview({ content }: { content: SiteContent }) {
  return (
    <div id="invitation">
      <section className="px-5 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Dear Family & Friends</p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.5] tracking-[0.12em] md:text-6xl">
            我们要结婚了
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-9 text-[var(--color-muted)] md:text-lg">
            从相遇到相爱，我们走过许多平凡而珍贵的日子。
            如今想邀请最重要的你，在金秋的泰兴，一同见证新的开始。
          </p>
          <div className="mx-auto mt-10 h-px w-20 bg-[var(--color-champagne)]" />
          <p className="mt-8 font-serif text-xl tracking-[0.2em] text-[var(--color-champagne)]">
            {content.wedding.displayDate}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl space-y-24 px-5 pb-28 md:px-10">
        {previews.map((preview, index) => (
          <Reveal
            key={preview.href}
            className="grid items-center gap-9 md:grid-cols-2 md:gap-16"
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden ${
                index % 2 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={preview.image}
                alt=""
                fill
                sizes="(min-width: 768px) 44vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className={index % 2 ? "md:order-1" : ""}>
              <p className="eyebrow">{preview.eyebrow}</p>
              <h2 className="mt-5 font-serif text-4xl leading-snug tracking-[0.08em] md:text-5xl">
                {preview.title}
              </h2>
              <p className="mt-6 max-w-lg leading-8 text-[var(--color-muted)]">
                {preview.description}
              </p>
              <Link
                href={preview.href}
                className="mt-8 inline-flex items-center gap-3 border-b border-[var(--color-champagne)] pb-2 text-sm tracking-[0.18em] text-[var(--color-champagne)]"
              >
                了解更多
                <ArrowUpRightIcon size={17} weight="light" aria-hidden />
              </Link>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="bg-[var(--color-ivory-deep)] px-5 py-24 text-center md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow">Will You Join Us?</p>
          <h2 className="mt-6 font-serif text-4xl tracking-[0.1em] md:text-6xl">
            期待与你相见
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-[var(--color-muted)]">
            请尽早告诉我们，你是否能来到现场，方便我们为你准备席位。
          </p>
          <Link
            href="/rsvp"
            className="mt-9 inline-flex rounded-full bg-[var(--color-champagne)] px-10 py-4 text-sm tracking-[0.22em] text-white"
          >
            填写 RSVP
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
