import { describe, expect, it } from "vitest";

import {
  defaultSiteContent,
  defaultSiteContentByLocale,
} from "@/lib/content/site";

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

  it("provides practical weather and accommodation guidance", () => {
    const guide = Object.fromEntries(
      defaultSiteContent.guide.map((item) => [item.title, item.description]),
    );

    expect(guide["住宿建议"]).toContain("希尔顿欢朋酒店");
    expect(guide["天气提醒"]).toContain("根据当天气温增减衣物");
    expect(guide).not.toHaveProperty("着装建议");
    expect(guide).not.toHaveProperty("公共交通");
    expect(guide).not.toHaveProperty("停车信息");
  });

  it("provides Taizhou travel and Taixing food recommendations", () => {
    expect(defaultSiteContent.travel.map((item) => item.title)).toEqual([
      "泰兴国家古银杏森林公园",
      "溱湖国家湿地公园",
      "凤城河风景区与望海楼",
    ]);
    expect(defaultSiteContent.travel.map((item) => item.title)).not.toContain(
      "黄桥古镇与战役纪念馆",
    );
    expect(defaultSiteContent.travel.map((item) => item.meta)).toEqual([
      "免费开放",
      "成人票参考约 ¥78",
      "望海楼日场成人票参考约 ¥35",
    ]);
    expect(defaultSiteContent.travelDisclaimer).toContain("景区当日公示");

    expect(defaultSiteContent.food.map((item) => item.title)).toEqual([
      "黄桥烧饼",
      "宣堡小馄饨",
      "曲霞汤包",
    ]);
  });

  it("puts complete transport information in a dedicated collection", () => {
    expect(defaultSiteContent.transport.map((item) => item.title)).toEqual([
      "泰州站",
      "扬州泰州国际机场",
      "泰兴汽车客运站",
      "自驾前往",
    ]);
    expect(defaultSiteContent.transport[0].description).toContain("约 1 小时");
    expect(defaultSiteContent.transport[0].description).toContain("约 60 元");
    expect(defaultSiteContent.transport[0].description).toContain("好友同行");
    expect(defaultSiteContent.transport[1].description).toContain(
      "约 1 小时 10 分钟",
    );
    expect(defaultSiteContent.transport[1].description).toContain("约 130 元");
    expect(defaultSiteContent.transport[3].description).toContain(
      "泰州泰兴希尔顿欢朋酒店",
    );
    expect(defaultSiteContent.holidayTravelNote).toContain("很抱歉");
    expect(defaultSiteContent.holidayTravelNote).toContain("格外感谢");
    expect(defaultSiteContent.holidayTravelNote).not.toContain("提前出发");
  });

  it("does not expose legacy invitation mockups as story photos", () => {
    expect(defaultSiteContent.story.map((item) => item.image)).not.toEqual(
      expect.arrayContaining([
        "/images/gallery/story-02.jpg",
        "/images/gallery/story-03.jpg",
        "/images/gallery/story-04.jpg",
      ]),
    );
  });

  it("provides complete English wedding defaults", () => {
    const english = defaultSiteContentByLocale.en;

    expect(english.identity).toMatchObject({
      groom: "Hao Wu",
      bride: "Lu Wang",
      title: "Hao Wu & Lu Wang",
    });
    expect(english.wedding).toMatchObject({
      date: "2026-10-06T12:00:00+08:00",
      city: "Taixing",
      venue: "Hampton by Hilton Taizhou Taixing",
    });
    expect(
      english.navigation.find((item) => item.href === "/guide")?.label,
    ).toBe("Guest Guide");
    expect(english.story).toHaveLength(defaultSiteContent.story.length);
    expect(english.travel).toHaveLength(defaultSiteContent.travel.length);
    expect(english.food).toHaveLength(defaultSiteContent.food.length);
    expect(english.transport).toHaveLength(defaultSiteContent.transport.length);
    expect(english.guide.map((item) => item.kind)).toEqual([
      "accommodation",
      "weather",
      "contact",
    ]);
    expect(english.transport.map((item) => item.kind)).toEqual([
      "train",
      "airport",
      "coach",
      "driving",
    ]);
  });
});
