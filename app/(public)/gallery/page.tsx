import type { Metadata } from "next";
import { cookies } from "next/headers";

import { GalleryAccessGate } from "@/components/gallery/gallery-access-gate";
import { GalleryExperience } from "@/components/gallery/gallery-experience";
import {
  galleryCookieName,
  verifyGallerySession,
} from "@/lib/domain/gallery-access";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { getDisplayPhotos } from "@/lib/repositories/photo-service";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: messages.metadata.pages.gallery,
    description: messages.gallery.introduction,
  };
}

export default async function GalleryPage() {
  const locale = await getLocale();
  const messages = getMessages(locale).gallery;
  const accessHash = process.env.GALLERY_ACCESS_CODE_HASH;
  const secret = process.env.GALLERY_COOKIE_SECRET;
  if (accessHash && secret) {
    const cookieStore = await cookies();
    const session = cookieStore.get(galleryCookieName)?.value;
    if (!verifyGallerySession(session, secret)) {
      return <GalleryAccessGate messages={messages} />;
    }
  }

  const photos = await getDisplayPhotos("gallery", locale);

  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{messages.eyebrow}</p>
        <h1 className="display-title mt-6">{messages.title}</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          {messages.introduction}
        </p>
      </header>
      <div className="mx-auto mt-14 max-w-6xl md:mt-20">
        <GalleryExperience photos={photos} messages={messages} />
      </div>
    </div>
  );
}
