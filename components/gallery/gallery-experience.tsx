"use client";

import { useMemo, useState } from "react";

import type { Photo } from "@/lib/repositories/types";

import { GalleryGrid } from "./gallery-grid";
import { GalleryLightbox } from "./gallery-lightbox";

export function GalleryExperience({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState("全部");
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const categories = useMemo(
    () => ["全部", ...new Set(photos.map((photo) => photo.category))],
    [photos],
  );
  const filteredPhotos =
    category === "全部"
      ? photos
      : photos.filter((photo) => photo.category === category);

  return (
    <>
      <div
        className="mb-10 flex gap-2 overflow-x-auto pb-2"
        aria-label="照片分类"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-label={`筛选${item}`}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm tracking-[0.12em] ${
              category === item
                ? "border-[var(--color-champagne)] bg-[var(--color-champagne)] text-white"
                : "border-[var(--color-line)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <GalleryGrid photos={filteredPhotos} onSelect={setActivePhoto} />
      {activePhoto ? (
        <GalleryLightbox
          photo={activePhoto}
          photos={filteredPhotos}
          onChange={setActivePhoto}
          onClose={() => setActivePhoto(null)}
        />
      ) : null}
    </>
  );
}
