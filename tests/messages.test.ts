import { describe, expect, it } from "vitest";

import { getMessages, publicMessages } from "@/lib/i18n/messages";

describe("publicMessages", () => {
  it("provides matching Chinese and English public message sections", () => {
    expect(Object.keys(publicMessages.en)).toEqual(
      Object.keys(publicMessages.zh),
    );
    expect(getMessages("zh").languageSwitcher.label).toBe("选择语言");
    expect(getMessages("en").languageSwitcher.label).toBe("Choose language");
  });

  it("contains English form, gallery, and accessibility copy", () => {
    const english = getMessages("en");

    expect(english.rsvp.nameLabel).toBe("Name");
    expect(english.guestbook.submitLabel).toBe("Send Your Wishes");
    expect(english.gallery.closePreviewLabel).toBe("Close photo preview");
    expect(english.countdown.days).toBe("Days");
    expect(english.header.openMenuLabel).toBe("Open menu");
  });
});
