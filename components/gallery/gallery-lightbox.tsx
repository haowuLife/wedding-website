"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import type { PublicMessages } from "@/lib/i18n/messages";
import type { Photo } from "@/lib/repositories/types";

export function GalleryLightbox({
  photo,
  photos,
  onChange,
  onClose,
  messages,
}: {
  photo: Photo;
  photos: Photo[];
  onChange: (photo: Photo) => void;
  onClose: () => void;
  messages: PublicMessages["gallery"];
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const currentIndex = photos.findIndex((item) => item.id === photo.id);

  function go(offset: number) {
    const nextIndex = (currentIndex + offset + photos.length) % photos.length;
    onChange(photos[nextIndex]);
  }

  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={messages.previewLabel}
      className="fixed inset-0 z-[80] grid place-items-center bg-[#2b1b1a]/95 p-4 text-white backdrop-blur-md"
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const delta = event.clientX - pointerStart.current;
        if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
        pointerStart.current = null;
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label={messages.closePreviewLabel}
        onClick={onClose}
        className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-white/30 bg-white/10 transition-colors hover:border-[var(--color-coral-deep)] hover:bg-[var(--color-coral-deep)]"
      >
        <XIcon size={24} weight="light" aria-hidden />
      </button>
      <button
        type="button"
        aria-label={messages.previousPhotoLabel}
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:border-[var(--color-coral-deep)] hover:bg-[var(--color-coral-deep)] md:left-7"
      >
        <ArrowLeftIcon size={24} weight="light" aria-hidden />
      </button>
      <figure className="w-full max-w-5xl">
        <div className="relative mx-auto h-[72svh] w-full">
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        <figcaption className="mt-4 text-center">
          <p className="font-serif text-xl tracking-[0.1em] text-[var(--color-champagne-light)]">
            {photo.title}
          </p>
          <p className="mt-1 text-sm text-white/65">{photo.description}</p>
        </figcaption>
      </figure>
      <button
        type="button"
        aria-label={messages.nextPhotoLabel}
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:border-[var(--color-coral-deep)] hover:bg-[var(--color-coral-deep)] md:right-7"
      >
        <ArrowRightIcon size={24} weight="light" aria-hidden />
      </button>
    </div>
  );
}
