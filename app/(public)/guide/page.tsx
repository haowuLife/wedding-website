import {
  BedIcon,
  CarIcon,
  CoatHangerIcon,
  PhoneIcon,
  TrainIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { getSiteContent } from "@/lib/content/settings";

export const metadata: Metadata = {
  title: "宾客指南",
};

const icons = [TrainIcon, CarIcon, BedIcon, CoatHangerIcon, PhoneIcon];

export default async function GuidePage() {
  const content = await getSiteContent();
  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Guest Guide</p>
        <h1 className="display-title mt-6">宾客指南</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          为了让这趟秋日之行更从容，我们整理了抵达婚礼前可能需要的信息。
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-4xl md:mt-24">
        {content.guide.map((item, index) => {
          const Icon = icons[index];
          return (
            <Reveal
              key={item.title}
              className="grid gap-5 border-b border-[var(--color-line)] py-9 md:grid-cols-[5rem_13rem_1fr] md:items-start"
            >
              <Icon
                size={32}
                weight="light"
                className="text-[var(--color-champagne)]"
                aria-hidden
              />
              <h2 className="font-serif text-2xl tracking-[0.08em]">
                {item.title}
              </h2>
              <div>
                <p className="leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
                {item.action ? (
                  <a
                    href={item.action.href}
                    className="mt-4 inline-block border-b border-[var(--color-champagne)] pb-1 text-sm tracking-[0.14em] text-[var(--color-champagne)]"
                  >
                    {item.action.label}
                  </a>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
