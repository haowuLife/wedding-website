import { describe, expect, it } from "vitest";

import { mergeSiteSettings } from "@/lib/content/settings";
import {
  defaultSiteContent,
  defaultSiteContentByLocale,
} from "@/lib/content/site";

describe("mergeSiteSettings", () => {
  it("applies persisted identity, wedding, and memories overrides", () => {
    const content = mergeSiteSettings(defaultSiteContent, [
      {
        key: "site.identity",
        value: { groom: "新郎", bride: "新娘", title: "新郎 & 新娘" },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
      {
        key: "site.wedding",
        value: { venue: "新的酒店" },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
      {
        key: "memories.enabled",
        value: { enabled: true },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
    ]);

    expect(content.identity.title).toBe("新郎 & 新娘");
    expect(content.wedding.venue).toBe("新的酒店");
    expect(content.memories.enabled).toBe(true);
  });

  it("keeps Chinese and English content overrides separate", () => {
    const settings = [
      {
        key: "site.identity",
        value: { title: "中文标题" },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
      {
        key: "site.identity.en",
        value: { title: "Custom English Couple" },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
      {
        key: "site.wedding",
        value: {
          date: "2026-10-06T13:00:00+08:00",
          venue: "中文酒店",
          mapUrl: "https://example.com/map",
        },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
      {
        key: "site.wedding.en",
        value: { venue: "Custom English Venue" },
        updatedAt: "2026-06-12T00:00:00.000Z",
      },
    ];

    const chinese = mergeSiteSettings(
      defaultSiteContentByLocale.zh,
      settings,
      "zh",
    );
    const english = mergeSiteSettings(
      defaultSiteContentByLocale.en,
      settings,
      "en",
    );

    expect(chinese.identity.title).toBe("中文标题");
    expect(chinese.wedding.venue).toBe("中文酒店");
    expect(english.identity.title).toBe("Custom English Couple");
    expect(english.identity.title).not.toBe("中文标题");
    expect(english.wedding.venue).toBe("Custom English Venue");
    expect(english.wedding.date).toBe("2026-10-06T13:00:00+08:00");
    expect(english.wedding.mapUrl).toBe("https://example.com/map");
  });

  it("falls back to built-in English copy when English settings are absent", () => {
    const english = mergeSiteSettings(
      defaultSiteContentByLocale.en,
      [
        {
          key: "site.identity",
          value: { title: "只修改中文" },
          updatedAt: "2026-06-12T00:00:00.000Z",
        },
      ],
      "en",
    );

    expect(english.identity.title).toBe("Hao Wu & Lu Wang");
  });
});
