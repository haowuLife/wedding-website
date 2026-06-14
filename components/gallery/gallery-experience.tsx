"use client";

import { useMemo, useState } from "react";

import type { PublicMessages } from "@/lib/i18n/messages";
import type { Photo } from "@/lib/repositories/types";

import { GalleryGrid } from "./gallery-grid";
import { GalleryLightbox } from "./gallery-lightbox";

const allCategories = "__all__";

export function GalleryExperience({
  photos,
  messages,
}: {
  photos: Photo[];
  messages: PublicMessages["gallery"];
}) {
  const [category, setCategory] = useState(allCategories);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const categories = useMemo(
    () => [allCategories, ...new Set(photos.map((photo) => photo.category))],
    [photos],
  );
  const filteredPhotos =
    category === allCategories
      ? photos
      : photos.filter((photo) => photo.category === category);
  const categoryLabel = (item: string) =>
    item === allCategories
      ? messages.allCategory
      : (messages.categoryNames[item] ?? item);

  return (
    <>
      <div
        className="romantic-filter-bar mb-10 flex gap-2 overflow-x-auto rounded-full p-2"
        aria-label={messages.categoryLabel}
      >
        {categories.map((item) => {
          const label = categoryLabel(item);
          return (
            <button
              key={item}
              type="button"
              aria-label={`${messages.filterPrefix}${label}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              style={
                category === item
                  ? {
                      backgroundColor: "var(--color-coral)",
                      color: "var(--color-ink)",
                    }
                  : undefined
              }
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm tracking-[0.1em] transition-colors ${
                category === item
                  ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-[var(--color-ink)] shadow-sm"
                  : "border-transparent bg-white text-[var(--color-muted)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral-deep)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <GalleryGrid
        photos={filteredPhotos}
        onSelect={setActivePhoto}
        messages={messages}
      />
      {activePhoto ? (
        <GalleryLightbox
          photo={activePhoto}
          photos={filteredPhotos}
          onChange={setActivePhoto}
          onClose={() => setActivePhoto(null)}
          messages={messages}
        />
      ) : null}
    </>
  );
}
