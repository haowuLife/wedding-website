import { describe, expect, it } from "vitest";

import { defaultSiteContent } from "@/lib/content/site";

describe("defaultSiteContent", () => {
  it("provides the public navigation and disabled memories state", () => {
    expect(defaultSiteContent.navigation.map((item) => item.href)).toContain(
      "/rsvp",
    );
    expect(defaultSiteContent.memories.enabled).toBe(false);
  });
});
