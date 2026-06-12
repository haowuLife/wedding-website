import type { Metadata } from "next";

import { RsvpForm } from "@/components/forms/rsvp-form";

export const metadata: Metadata = {
  title: "RSVP",
};

export default function RsvpPage() {
  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
        <header>
          <p className="eyebrow">Répondez S&apos;il Vous Plaît</p>
          <h1 className="display-title mt-6">期待你的回复</h1>
          <p className="mt-7 leading-8 text-[var(--color-muted)]">
            请在 2026 年 9 月 18 日前完成回复。你的信息只用于婚礼安排，不会公开展示。
          </p>
          <div className="mt-10 border-l border-[var(--color-champagne)] pl-5 text-sm leading-7 text-[var(--color-muted)]">
            <p>婚礼日期：2026 年 10 月 18 日</p>
            <p>婚礼地点：杭州木守西溪酒店</p>
          </div>
        </header>
        <div className="border-t border-[var(--color-line)] pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
          <RsvpForm />
        </div>
      </div>
    </div>
  );
}
