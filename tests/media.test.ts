import { describe, expect, it } from "vitest";

import { isAllowedVideoUrl } from "@/lib/domain/media";

describe("isAllowedVideoUrl", () => {
  it("accepts direct HTTPS video URLs", () => {
    expect(isAllowedVideoUrl("https://cdn.example.com/wedding.mp4")).toBe(true);
    expect(isAllowedVideoUrl("https://cdn.example.com/wedding.webm")).toBe(
      true,
    );
  });

  it("rejects non-HTTPS and non-video URLs", () => {
    expect(isAllowedVideoUrl("http://cdn.example.com/wedding.mp4")).toBe(false);
    expect(isAllowedVideoUrl("javascript:alert(1)")).toBe(false);
    expect(isAllowedVideoUrl("https://example.com/page")).toBe(false);
  });
});
