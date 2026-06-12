import { describe, expect, it } from "vitest";

import { isAdminIdentity } from "@/lib/domain/auth";

describe("isAdminIdentity", () => {
  it("accepts an explicit admin app role", () => {
    expect(
      isAdminIdentity(
        { email: "owner@example.com", appMetadata: { role: "admin" } },
        [],
      ),
    ).toBe(true);
  });

  it("accepts an allowlisted email and rejects a regular user", () => {
    expect(
      isAdminIdentity(
        { email: "couple@example.com", appMetadata: {} },
        ["couple@example.com"],
      ),
    ).toBe(true);
    expect(
      isAdminIdentity(
        { email: "guest@example.com", appMetadata: {} },
        ["couple@example.com"],
      ),
    ).toBe(false);
  });
});
