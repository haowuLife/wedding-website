import { isDemoMode } from "@/lib/domain/env";
import type { Locale } from "@/lib/i18n/locale";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import { getRepository } from ".";
import type { Photo } from "./types";

export function localizePhoto(photo: Photo, locale: Locale): Photo {
  if (locale === "zh") return photo;
  return {
    ...photo,
    title: photo.titleEn?.trim() || photo.title,
    description: photo.descriptionEn?.trim() || photo.description,
  };
}

export async function getDisplayPhotos(
  collection: Photo["collection"] = "gallery",
  locale: Locale = "zh",
): Promise<Photo[]> {
  const photos = await getRepository().listPublicPhotos(collection);
  if (isDemoMode()) {
    return photos.map((photo) => localizePhoto(photo, locale));
  }

  const client = createSupabaseAdminClient();
  return Promise.all(
    photos.map(async (photo) => {
      if (photo.mediaType === "video" || photo.imageUrl.startsWith("http")) {
        return localizePhoto(photo, locale);
      }
      const { data, error } = await client.storage
        .from("wedding-media")
        .createSignedUrl(photo.imageUrl, 60 * 30);
      if (error) throw new Error(error.message);
      return localizePhoto(
        { ...photo, imageUrl: data.signedUrl },
        locale,
      );
    }),
  );
}

export async function getDisplayAllPhotos(): Promise<Photo[]> {
  const [gallery, memories] = await Promise.all([
    getDisplayPhotos("gallery", "zh"),
    getDisplayPhotos("memories", "zh"),
  ]);
  return [...gallery, ...memories];
}
