import { describe, expect, it } from "vitest";

import {
  createAccessCodeHash,
  createGallerySession,
  verifyAccessCode,
  verifyGallerySession,
} from "@/lib/domain/gallery-access";

describe("gallery access", () => {
  it("verifies a scrypt access-code hash", () => {
    const hash = createAccessCodeHash("1026", "fixed-salt");
    expect(verifyAccessCode("1026", hash)).toBe(true);
    expect(verifyAccessCode("0000", hash)).toBe(false);
  });

  it("rejects expired signed sessions", () => {
    const secret = "test-secret";
    const session = createGallerySession(secret, 1000, 60);
    expect(verifyGallerySession(session, secret, 1059)).toBe(true);
    expect(verifyGallerySession(session, secret, 1061)).toBe(false);
  });
});
