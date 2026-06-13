import { describe, expect, it } from "vitest";

import { parseLocale } from "@/lib/i18n/locale";

describe("parseLocale", () => {
  it("defaults missing and invalid values to Chinese", () => {
    expect(parseLocale(undefined)).toBe("zh");
    expect(parseLocale("fr")).toBe("zh");
  });

  it("accepts the supported locales", () => {
    expect(parseLocale("zh")).toBe("zh");
    expect(parseLocale("en")).toBe("en");
  });
});
