import {
  AirplaneTiltIcon,
  ArrowUpRightIcon,
  BusIcon,
  CarIcon,
  TrainIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/motion/reveal";
import type { TransportItem } from "@/lib/content/site";
import type { PublicMessages } from "@/lib/i18n/messages";

const iconByKind = {
  train: TrainIcon,
  airport: AirplaneTiltIcon,
  coach: BusIcon,
  driving: CarIcon,
};

export function TransportSection({
  items,
  holidayNote,
  messages,
}: {
  items: TransportItem[];
  holidayNote: string;
  messages: PublicMessages["guide"];
}) {
  return (
    <section
      className="mt-24 border-t border-[var(--color-line)] pt-20 md:mt-32 md:pt-28"
      data-testid="transport-section"
    >
      <Reveal className="max-w-2xl">
        <p className="eyebrow">{messages.transportEyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl tracking-[0.08em] md:text-5xl">
          {messages.transportTitle}
        </h2>
        <p className="mt-5 leading-8 text-[var(--color-muted)]">
          {messages.transportDescription}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item, index) => {
          const Icon = iconByKind[item.kind] ?? CarIcon;
          return (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className="romantic-card rounded-[1.5rem] border border-white/80 bg-white p-7 shadow-[0_18px_45px_rgba(77,46,40,0.09)] md:p-9"
            >
              <span className="grid size-12 place-items-center rounded-full bg-[var(--color-coral)]/10">
                <Icon
                  size={25}
                  weight="light"
                  className="text-[var(--color-coral-deep)]"
                  aria-hidden
                />
              </span>
              <h3 className="mt-5 font-serif text-2xl tracking-[0.06em]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
              {item.action ? (
                <a
                  href={item.action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border-b border-[var(--color-coral)] pb-1 text-xs tracking-[0.14em] text-[var(--color-coral-deep)]"
                >
                  {item.action.label}
                  <ArrowUpRightIcon size={15} weight="light" aria-hidden />
                </a>
              ) : null}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="romantic-card mt-10 overflow-hidden rounded-[1.75rem] text-center">
        <div className="bg-[#fff0ef] px-7 py-9 md:px-14 md:py-12">
          <p className="eyebrow">{messages.noteEyebrow}</p>
          <p className="mx-auto mt-5 max-w-3xl font-serif text-xl leading-9 tracking-[0.05em] md:text-2xl md:leading-10">
            {holidayNote}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
