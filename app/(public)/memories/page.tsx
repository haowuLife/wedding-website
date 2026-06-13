import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryExperience } from "@/components/gallery/gallery-experience";
import { getSiteContent } from "@/lib/content/settings";
import { canShowMemories } from "@/lib/domain/memories";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { getDisplayPhotos } from "@/lib/repositories/photo-service";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.memories,
    description: messages.metadata.description,
  };
}

export default async function MemoriesPage() {
  const locale = await getLocale();
  const content = await getSiteContent(locale);
  const messages = getMessages(locale);
  if (!canShowMemories(content.memories)) {
    notFound();
  }
  const media = await getDisplayPhotos("memories", locale);
  const photos = media.filter((item) => item.mediaType === "image");
  const videos = media.filter((item) => item.mediaType === "video");

  return (
    <div className="page-shell min-h-[75vh]">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.memories.eyebrow}</p>
        <h1 className="page-heading mt-6">{content.memories.title}</h1>
        <p className="mx-auto mt-8 max-w-xl leading-8 text-[var(--color-muted)]">
          {content.memories.description}
        </p>
      </header>

      <div className="mx-auto mt-14 max-w-6xl md:mt-20">
        {videos.length ? (
          <div className="mb-14 grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <figure
                key={video.id}
                className="romantic-card overflow-hidden p-2"
              >
                <video
                  src={video.imageUrl}
                  controls
                  preload="metadata"
                  className="aspect-video w-full rounded-[1rem] bg-[#2b1b1a] object-cover"
                />
                <figcaption className="px-4 py-4 font-serif text-lg tracking-[0.04em]">
                  {video.title}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        {photos.length ? (
          <GalleryExperience photos={photos} messages={messages.gallery} />
        ) : (
          <p className="romantic-card py-12 text-center text-[var(--color-muted)]">
            {messages.memories.emptyLabel}
          </p>
        )}
      </div>
    </div>
  );
}
