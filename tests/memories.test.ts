import { describe, expect, it } from "vitest";

import { canShowMemories } from "@/lib/domain/memories";

describe("canShowMemories", () => {
  it("only exposes memories when explicitly enabled", () => {
    expect(canShowMemories({ enabled: false })).toBe(false);
    expect(canShowMemories({ enabled: true })).toBe(true);
  });
});
