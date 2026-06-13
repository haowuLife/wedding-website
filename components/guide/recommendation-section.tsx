import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import type { RecommendationItem } from "@/lib/content/site";

export function RecommendationSection({
  eyebrow,
  title,
  description,
  items,
  disclaimer,
  testId,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: RecommendationItem[];
  disclaimer?: string;
  testId: string;
}) {
  return (
    <section className="mt-24 md:mt-32" data-testid={testId}>
      <Reveal className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl tracking-[0.08em] md:text-5xl">
          {title}
        </h2>
        <p className="mt-5 leading-8 text-[var(--color-muted)]">
          {description}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-7 md:grid-cols-3 md:gap-6">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className="h-full">
            <article className="romantic-card group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-[0_18px_45px_rgba(77,46,40,0.1)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-ivory-deep)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                {item.meta ? (
                  <p className="text-xs tracking-[0.16em] text-[var(--color-coral)]">
                    {item.meta}
                  </p>
                ) : null}
                <h3 className="mt-3 font-serif text-2xl leading-snug tracking-[0.06em]">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
                {item.action ? (
                  <a
                    href={item.action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-2 border-b border-[var(--color-coral)] pb-1 text-xs tracking-[0.14em] text-[var(--color-coral-deep)]"
                  >
                    {item.action.label}
                    <ArrowUpRightIcon size={15} weight="light" aria-hidden />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {disclaimer ? (
        <p className="mt-8 text-xs leading-6 text-[var(--color-muted)]">
          * {disclaimer}
        </p>
      ) : null}
    </section>
  );
}
