import { describe, expect, it } from "vitest";

import { defaultSiteContent } from "@/lib/content/site";

describe("defaultSiteContent", () => {
  it("provides the public navigation and disabled memories state", () => {
    expect(defaultSiteContent.navigation.map((item) => item.href)).toContain(
      "/rsvp",
    );
    expect(defaultSiteContent.memories.enabled).toBe(false);
  });

  it("uses Wu Hao and Wang Lu's Taixing luncheon details", () => {
    expect(defaultSiteContent.identity).toMatchObject({
      groom: "吴昊",
      bride: "王璐",
      title: "吴昊 & 王璐",
    });
    expect(defaultSiteContent.wedding).toMatchObject({
      date: "2026-10-06T12:00:00+08:00",
      displayDate: "2026.10.06",
      city: "泰兴",
      venue: "泰州泰兴希尔顿欢朋酒店",
      address: "江苏省泰州市泰兴市文昌中路1号",
      hotelUrl:
        "https://www.hilton.com/zh-hans/hotels/ytytxhx-hampton-taizhou-taixing/",
    });
  });
});
