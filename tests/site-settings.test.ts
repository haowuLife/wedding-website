import { describe, expect, it } from "vitest";

import { mergeSiteSettings } from "@/lib/content/settings";
import { defaultSiteContent } from "@/lib/content/site";

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
});
