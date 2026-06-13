import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { GalleryExperience } from "@/components/gallery/gallery-experience";
import { getMessages } from "@/lib/i18n/messages";
import type { Photo } from "@/lib/repositories/types";

const photos: Photo[] = [
  {
    id: "1",
    title: "晨光",
    titleEn: null,
    description: "第一束光",
    descriptionEn: null,
    imageUrl: "/images/gallery/story-01.jpg",
    category: "晨光",
    sortOrder: 1,
    isPublic: true,
    collection: "gallery",
    mediaType: "image",
    createdAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "山野",
    titleEn: null,
    description: "远山",
    descriptionEn: null,
    imageUrl: "/images/gallery/story-02.jpg",
    category: "山野",
    sortOrder: 2,
    isPublic: true,
    collection: "gallery",
    mediaType: "image",
    createdAt: "2026-06-01T00:00:00.000Z",
  },
];

afterEach(() => {
  cleanup();
});

describe("GalleryExperience", () => {
  it("filters categories and closes the lightbox", async () => {
    const user = userEvent.setup();
    render(
      <GalleryExperience
        photos={photos}
        messages={getMessages("zh").gallery}
      />,
    );

    await user.click(screen.getByRole("button", { name: "筛选山野" }));
    expect(screen.queryByRole("button", { name: "查看晨光" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "查看山野" }));
    expect(screen.getByRole("dialog", { name: "照片预览" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "关闭照片预览" }));
    expect(screen.queryByRole("dialog", { name: "照片预览" })).toBeNull();
  });

  it("localizes category and lightbox controls without changing photo data", async () => {
    const user = userEvent.setup();
    render(
      <GalleryExperience
        photos={photos}
        messages={getMessages("en").gallery}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Filter by Outdoors" }),
    );
    expect(screen.queryByRole("button", { name: "View 晨光" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "View 山野" }));
    expect(
      screen.getByRole("dialog", { name: "Photo preview" }),
    ).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Close photo preview" }),
    );
    expect(
      screen.queryByRole("dialog", { name: "Photo preview" }),
    ).toBeNull();
  });
});
