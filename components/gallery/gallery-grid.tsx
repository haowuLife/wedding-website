"use client";

import Image from "next/image";

import type { PublicMessages } from "@/lib/i18n/messages";
import type { Photo } from "@/lib/repositories/types";

export function GalleryGrid({
  photos,
  onSelect,
  messages,
}: {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
  messages: PublicMessages["gallery"];
}) {
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-5">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          aria-label={`${messages.viewPrefix}${photo.title}`}
          onClick={() => onSelect(photo)}
          className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] border border-[var(--color-line)] bg-white p-1 text-left shadow-[0_1rem_2.5rem_rgba(95,60,55,0.08)] transition hover:-translate-y-1 hover:shadow-[0_1.4rem_3rem_rgba(95,60,55,0.14)] md:mb-5"
        >
          <div
            className={`relative overflow-hidden rounded-[1rem] ${
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
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#3f2422]/85 via-[#5d3530]/15 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <p className="font-serif tracking-[0.08em] text-[var(--color-champagne-light)]">
                {photo.title}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
