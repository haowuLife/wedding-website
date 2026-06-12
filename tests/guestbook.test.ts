import { describe, expect, it } from "vitest";

import { guestbookSchema } from "@/lib/domain/guestbook";
import { isHoneypotTriggered } from "@/lib/domain/anti-spam";

describe("guestbook validation", () => {
  it("accepts a concise blessing", () => {
    expect(
      guestbookSchema.parse({
        name: "小满",
        message: "愿你们长长久久。",
        website: "",
      }),
    ).toEqual({
      name: "小满",
      message: "愿你们长长久久。",
      website: "",
    });
  });

  it("rejects an oversized message", () => {
    expect(() =>
      guestbookSchema.parse({
        name: "小满",
        message: "祝".repeat(501),
        website: "",
      }),
    ).toThrow();
  });

  it("detects a filled honeypot", () => {
    expect(isHoneypotTriggered("https://spam.example")).toBe(true);
    expect(isHoneypotTriggered("")).toBe(false);
  });
});
