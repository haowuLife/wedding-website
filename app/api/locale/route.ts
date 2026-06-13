import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { isSameOrigin } from "@/lib/domain/request";
import { localeCookieName } from "@/lib/i18n/locale";

const localeSchema = z.object({
  locale: z.enum(["zh", "en"]),
});

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "Invalid origin" }, { status: 403 });
  }

  const result = localeSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!result.success) {
    return Response.json({ ok: false, error: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(localeCookieName, result.data.locale, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}
