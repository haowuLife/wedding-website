import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { isSameOrigin } from "@/lib/domain/request";

describe("isSameOrigin", () => {
  it("uses forwarded host information behind a trusted deployment proxy", () => {
    const request = new NextRequest("http://localhost:3000/api/rsvp", {
      headers: {
        origin: "http://127.0.0.1:3000",
        host: "localhost:3000",
        "x-forwarded-host": "127.0.0.1:3000",
        "x-forwarded-proto": "http",
      },
    });

    expect(isSameOrigin(request)).toBe(true);
  });
});
