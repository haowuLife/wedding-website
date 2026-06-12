import { describe, expect, it } from "vitest";

import { summarizeGuests } from "@/lib/domain/admin-summary";
import type { Guest } from "@/lib/repositories/types";

const baseGuest: Guest = {
  id: "1",
  name: "周清",
  phone: "13800001024",
  phoneNormalized: "13800001024",
  attending: true,
  guestCount: 2,
  message: "",
  createdAt: "2026-06-01T00:00:00.000Z",
  updatedAt: "2026-06-01T00:00:00.000Z",
};

describe("summarizeGuests", () => {
  it("counts responses and total attending people", () => {
    expect(
      summarizeGuests([
        baseGuest,
        { ...baseGuest, id: "2", attending: true, guestCount: 3 },
        { ...baseGuest, id: "3", attending: false, guestCount: 0 },
      ]),
    ).toEqual({
      responses: 3,
      attendingResponses: 2,
      declinedResponses: 1,
      attendingPeople: 5,
    });
  });
});
