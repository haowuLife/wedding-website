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

      <div className="mt-10 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
        {items.map((item, index) => {
          const Icon = iconByKind[item.kind] ?? CarIcon;
          return (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className="bg-[var(--color-ivory)] p-7 md:p-9"
            >
              <Icon
                size={30}
                weight="light"
                className="text-[var(--color-champagne)]"
                aria-hidden
              />
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
                  className="mt-5 inline-flex items-center gap-2 border-b border-[var(--color-champagne)] pb-1 text-xs tracking-[0.14em] text-[var(--color-champagne)]"
                >
                  {item.action.label}
                  <ArrowUpRightIcon size={15} weight="light" aria-hidden />
                </a>
              ) : null}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 bg-[var(--color-ivory-deep)] px-7 py-9 text-center md:px-14 md:py-12">
        <p className="eyebrow">{messages.noteEyebrow}</p>
        <p className="mx-auto mt-5 max-w-3xl font-serif text-xl leading-9 tracking-[0.05em] md:text-2xl md:leading-10">
          {holidayNote}
        </p>
      </Reveal>
    </section>
  );
}
