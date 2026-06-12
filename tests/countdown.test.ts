import { describe, expect, it } from "vitest";

import { getCountdown } from "@/lib/domain/countdown";

describe("getCountdown", () => {
  it("returns calendar units before the wedding", () => {
    expect(
      getCountdown(
        new Date("2026-10-17T08:27:30+08:00"),
        new Date("2026-10-18T10:28:00+08:00"),
      ),
    ).toEqual({
      days: 1,
      hours: 2,
      minutes: 0,
      seconds: 30,
    });
  });

  it("clamps an elapsed wedding countdown to zero", () => {
    expect(
      getCountdown(
        new Date("2026-10-19T00:00:00+08:00"),
        new Date("2026-10-18T10:28:00+08:00"),
      ),
    ).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});
