"use client";

import Image from "next/image";

import type { Photo } from "@/lib/repositories/types";

export function GalleryGrid({
  photos,
  onSelect,
}: {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}) {
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-5">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          aria-label={`查看${photo.title}`}
          onClick={() => onSelect(photo)}
          className="group relative mb-3 block w-full break-inside-avoid overflow-hidden text-left md:mb-5"
        >
          <div
            className={`relative ${
              index % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              sizes="(min-width: 768px) 31vw, 48vw"
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/25 p-3 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <p className="font-serif tracking-[0.08em]">{photo.title}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
