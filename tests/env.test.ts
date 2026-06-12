import { describe, expect, it } from "vitest";

import { getDataMode } from "@/lib/domain/env";

describe("getDataMode", () => {
  it("selects demo mode when Supabase variables are absent", () => {
    expect(getDataMode({})).toBe("demo");
  });

  it("selects supabase mode only when all required variables exist", () => {
    expect(
      getDataMode({
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon",
        SUPABASE_SERVICE_ROLE_KEY: "service",
      }),
    ).toBe("supabase");
  });
});
