import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/locale/route";

function localeRequest(
  locale: string,
  origin = "http://localhost:3000",
) {
  return new NextRequest("http://localhost:3000/api/locale", {
    method: "POST",
    headers: {
      origin,
      host: "localhost:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify({ locale }),
  });
}

describe("POST /api/locale", () => {
  it("sets a non-persistent locale cookie", async () => {
    const response = await POST(localeRequest("en"));
    const cookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(cookie).toContain("wedding_locale=en");
    expect(cookie).toContain("Path=/");
    expect(cookie.toLowerCase()).toContain("samesite=lax");
    expect(cookie.toLowerCase()).not.toContain("expires=");
    expect(cookie.toLowerCase()).not.toContain("max-age=");
  });

  it("rejects unsupported locales", async () => {
    const response = await POST(localeRequest("fr"));

    expect(response.status).toBe(400);
  });

  it("rejects cross-origin requests", async () => {
    const response = await POST(
      localeRequest("en", "https://malicious.example"),
    );

    expect(response.status).toBe(403);
  });
});
