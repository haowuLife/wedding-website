import { describe, expect, it } from "vitest";

import { createGuestsCsv } from "@/lib/domain/csv";
import type { Guest } from "@/lib/repositories/types";

const guest: Guest = {
  id: "1",
  name: '周"清',
  phone: "13800001024",
  phoneNormalized: "13800001024",
  attending: true,
  guestCount: 2,
  message: "期待见面",
  createdAt: "2026-06-01T00:00:00.000Z",
  updatedAt: "2026-06-01T00:00:00.000Z",
};

describe("createGuestsCsv", () => {
  it("adds a UTF-8 BOM and escapes quotes and commas", () => {
    const csv = createGuestsCsv([guest]);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv).toContain('"周""清"');
    expect(csv).not.toContain("需要停车");
    expect(csv).not.toContain("携带儿童");
    expect(csv).not.toContain("饮食忌口");
  });
});
