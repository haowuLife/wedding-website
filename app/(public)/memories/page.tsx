import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryExperience } from "@/components/gallery/gallery-experience";
import { getSiteContent } from "@/lib/content/settings";
import { canShowMemories } from "@/lib/domain/memories";
import { getDisplayPhotos } from "@/lib/repositories/photo-service";

export const metadata: Metadata = {
  title: "婚礼回顾",
};

export default async function MemoriesPage() {
  const content = await getSiteContent();
  if (!canShowMemories(content.memories)) {
    notFound();
  }
  const media = await getDisplayPhotos("memories");
  const photos = media.filter((item) => item.mediaType === "image");
  const videos = media.filter((item) => item.mediaType === "video");

  return (
    <div className="page-shell min-h-[75vh] text-center">
      <p className="eyebrow">Memories</p>
      <h1 className="display-title mt-6">
        {content.memories.title}
      </h1>
      <p className="mx-auto mt-8 max-w-xl leading-8 text-[var(--color-muted)]">
        {content.memories.description}
      </p>
      <div className="mx-auto mt-16 max-w-6xl text-left">
        {videos.length ? (
          <div className="mb-14 grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <figure key={video.id}>
                <video
                  src={video.imageUrl}
                  controls
                  preload="metadata"
                  className="aspect-video w-full bg-black object-cover"
                />
                <figcaption className="mt-3 font-serif text-lg">
                  {video.title}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {photos.length ? (
          <GalleryExperience photos={photos} />
        ) : (
          <p className="border-y border-[var(--color-line)] py-12 text-center text-[var(--color-muted)]">
            婚礼影像正在整理中，稍后再来看看。
          </p>
        )}
      </div>
    </div>
  );
}
