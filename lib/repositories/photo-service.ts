import { isDemoMode } from "@/lib/domain/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import { getRepository } from ".";
import type { Photo } from "./types";

export async function getDisplayPhotos(
  collection: Photo["collection"] = "gallery",
): Promise<Photo[]> {
  const photos = await getRepository().listPublicPhotos(collection);
  if (isDemoMode()) return photos;

  const client = createSupabaseAdminClient();
  return Promise.all(
    photos.map(async (photo) => {
      if (photo.mediaType === "video" || photo.imageUrl.startsWith("http")) {
        return photo;
      }
      const { data, error } = await client.storage
        .from("wedding-media")
        .createSignedUrl(photo.imageUrl, 60 * 30);
      if (error) throw new Error(error.message);
      return { ...photo, imageUrl: data.signedUrl };
    }),
  );
}

export async function getDisplayAllPhotos(): Promise<Photo[]> {
  const [gallery, memories] = await Promise.all([
    getDisplayPhotos("gallery"),
    getDisplayPhotos("memories"),
  ]);
  return [...gallery, ...memories];
}
