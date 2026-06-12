import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

import {
  createGallerySession,
  galleryCookieName,
  verifyAccessCode,
} from "@/lib/domain/gallery-access";
import { isSameOrigin } from "@/lib/domain/request";

const accessSchema = z.object({
  code: z.string().min(1).max(100),
});

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "请求来源无效" }, { status: 403 });
  }
  const storedHash = process.env.GALLERY_ACCESS_CODE_HASH;
  const secret = process.env.GALLERY_COOKIE_SECRET;
  if (!storedHash || !secret) {
    return Response.json({ ok: true });
  }

  const result = accessSchema.safeParse(await request.json().catch(() => null));
  if (!result.success || !verifyAccessCode(result.data.code, storedHash)) {
    return Response.json(
      { ok: false, error: "访问码不正确，请重新输入" },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    galleryCookieName,
    createGallerySession(secret),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 12,
      path: "/gallery",
    },
  );
  return Response.json({ ok: true });
}
