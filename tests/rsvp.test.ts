import { describe, expect, it } from "vitest";

import { normalizePhone, rsvpSchema } from "@/lib/domain/rsvp";

describe("RSVP validation", () => {
  it("normalizes a Chinese mobile number with country code and spaces", () => {
    expect(normalizePhone("+86 138 0000 1024")).toBe("13800001024");
  });

  it("accepts the simplified RSVP payload and resets attendance details", () => {
    const result = rsvpSchema.parse({
      name: "周清",
      phone: "13800001024",
      attending: false,
      guestCount: 4,
      needParking: true,
      message: "",
      website: "",
    });

    expect(result).toMatchObject({
      attending: false,
      guestCount: 0,
      needParking: false,
    });
    expect(result).not.toHaveProperty("hasChildren");
    expect(result).not.toHaveProperty("dietaryRestrictions");
  });

  it("rejects invalid mobile numbers", () => {
    expect(() =>
      rsvpSchema.parse({
        name: "周清",
        phone: "123",
        attending: true,
        guestCount: 1,
        needParking: false,
        message: "",
        website: "",
      }),
    ).toThrow();
  });
});
