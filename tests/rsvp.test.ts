import { describe, expect, it } from "vitest";

import { normalizePhone, rsvpSchema } from "@/lib/domain/rsvp";

describe("RSVP validation", () => {
  it("normalizes a Chinese mobile number with country code and spaces", () => {
    expect(normalizePhone("+86 138 0000 1024")).toBe("13800001024");
  });

  it("forces dependent fields off when a guest declines", () => {
    const result = rsvpSchema.parse({
      name: "周清",
      phone: "13800001024",
      attending: false,
      guestCount: 4,
      hasChildren: true,
      needParking: true,
      dietaryRestrictions: "",
      message: "",
      website: "",
    });

    expect(result).toMatchObject({
      attending: false,
      guestCount: 0,
      hasChildren: false,
      needParking: false,
    });
  });

  it("rejects invalid mobile numbers", () => {
    expect(() =>
      rsvpSchema.parse({
        name: "周清",
        phone: "123",
        attending: true,
        guestCount: 1,
        hasChildren: false,
        needParking: false,
        dietaryRestrictions: "",
        message: "",
        website: "",
      }),
    ).toThrow();
  });
});
