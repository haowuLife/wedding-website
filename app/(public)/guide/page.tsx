import {
  BedIcon,
  CloudSunIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

import { RecommendationSection } from "@/components/guide/recommendation-section";
import { TransportSection } from "@/components/guide/transport-section";
import { Reveal } from "@/components/motion/reveal";
import { getSiteContent } from "@/lib/content/settings";

export const metadata: Metadata = {
  title: "宾客指南",
};

const iconByTitle = {
  住宿建议: BedIcon,
  天气提醒: CloudSunIcon,
  婚礼联系人: PhoneIcon,
};

export default async function GuidePage() {
  const content = await getSiteContent();
  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Guest Guide</p>
        <h1 className="display-title mt-6">宾客指南</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          除了婚礼当天的信息，我们也整理了几处风景与泰兴味道，
          希望这趟秋日之行多一些轻松的小停留。
        </p>
      </header>

      <div className="mx-auto mt-16 max-w-5xl md:mt-24">
        {content.guide.map((item) => {
          const Icon =
            iconByTitle[item.title as keyof typeof iconByTitle] ?? PhoneIcon;
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

        <RecommendationSection
          eyebrow="Around Taizhou"
          title="泰州旅行推荐"
          description="如果时间允许，可以在泰兴与泰州市区慢慢走走。以下行程适合半日或一日轻松安排。"
          items={content.travel}
          disclaimer={content.travelDisclaimer}
          testId="travel-section"
        />

        <RecommendationSection
          eyebrow="Taste of Taixing"
          title="泰兴美食推荐"
          description="从酥香点心到一碗热汤，挑几样本地味道，也算把这趟相聚好好记在味蕾里。"
          items={content.food}
          testId="food-section"
        />

        <TransportSection
          items={content.transport}
          holidayNote={content.holidayTravelNote}
        />
      </div>
    </div>
  );
}
