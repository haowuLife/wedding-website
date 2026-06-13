import { describe, expect, it } from "vitest";

import { localizePhoto } from "@/lib/repositories/photo-service";
import type { Photo } from "@/lib/repositories/types";

const photo = {
  id: "photo-1",
  title: "晨光",
  titleEn: "Morning Light",
  description: "山谷里的第一束光",
  descriptionEn: null,
  imageUrl: "/images/gallery/story-01.jpg",
  category: "晨光",
  sortOrder: 1,
  isPublic: true,
  collection: "gallery",
  mediaType: "image",
  createdAt: "2026-06-01T00:00:00.000Z",
} satisfies Photo;

describe("localizePhoto", () => {
  it("uses available English metadata and falls back field by field", () => {
    expect(localizePhoto(photo, "en")).toEqual(
      expect.objectContaining({
        title: "Morning Light",
        description: "山谷里的第一束光",
        category: "晨光",
        imageUrl: "/images/gallery/story-01.jpg",
      }),
    );
  });

  it("keeps Chinese metadata on the Chinese site", () => {
    expect(localizePhoto(photo, "zh")).toEqual(
      expect.objectContaining({
        title: "晨光",
        description: "山谷里的第一束光",
      }),
    );
  });
});
