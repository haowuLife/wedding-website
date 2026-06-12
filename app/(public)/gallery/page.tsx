import type { Metadata } from "next";
import { cookies } from "next/headers";

import { GalleryAccessGate } from "@/components/gallery/gallery-access-gate";
import { GalleryExperience } from "@/components/gallery/gallery-experience";
import {
  galleryCookieName,
  verifyGallerySession,
} from "@/lib/domain/gallery-access";
import { getDisplayPhotos } from "@/lib/repositories/photo-service";

export const metadata: Metadata = {
  title: "婚纱照",
};

export default async function GalleryPage() {
  const accessHash = process.env.GALLERY_ACCESS_CODE_HASH;
  const secret = process.env.GALLERY_COOKIE_SECRET;
  if (accessHash && secret) {
    const cookieStore = await cookies();
    const session = cookieStore.get(galleryCookieName)?.value;
    if (!verifyGallerySession(session, secret)) {
      return <GalleryAccessGate />;
    }
  }

  const photos = await getDisplayPhotos("gallery");

  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Gallery</p>
        <h1 className="display-title mt-6">婚纱照</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          晨光、山野与一起走过的寻常日子，都成为我们想长久保存的画面。
        </p>
      </header>
      <div className="mx-auto mt-14 max-w-6xl md:mt-20">
        <GalleryExperience photos={photos} />
      </div>
    </div>
  );
}
