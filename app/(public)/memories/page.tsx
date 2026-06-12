import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSiteContent } from "@/lib/content/settings";
import { canShowMemories } from "@/lib/domain/memories";

export const metadata: Metadata = {
  title: "婚礼回顾",
};

export default async function MemoriesPage() {
  const content = await getSiteContent();
  if (!canShowMemories(content.memories)) {
    notFound();
  }

  return (
    <div className="page-shell min-h-[75vh] text-center">
      <p className="eyebrow">Memories</p>
      <h1 className="display-title mt-6">
        {content.memories.title}
      </h1>
      <p className="mx-auto mt-8 max-w-xl leading-8 text-[var(--color-muted)]">
        {content.memories.description}
      </p>
    </div>
  );
}
