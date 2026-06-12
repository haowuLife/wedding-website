import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { defaultSiteContent } from "@/lib/content/site";
import { canShowMemories } from "@/lib/domain/memories";

export const metadata: Metadata = {
  title: "婚礼回顾",
};

export default function MemoriesPage() {
  if (!canShowMemories(defaultSiteContent.memories)) {
    notFound();
  }

  return (
    <div className="page-shell min-h-[75vh] text-center">
      <p className="eyebrow">Memories</p>
      <h1 className="display-title mt-6">
        {defaultSiteContent.memories.title}
      </h1>
      <p className="mx-auto mt-8 max-w-xl leading-8 text-[var(--color-muted)]">
        {defaultSiteContent.memories.description}
      </p>
    </div>
  );
}
