import { NextRequest } from "next/server";

import {
  consumeRateLimit,
  hashClientIp,
  isHoneypotTriggered,
} from "@/lib/domain/anti-spam";
import {
  getClientIp,
  isSameOrigin,
  validationError,
} from "@/lib/domain/request";
import { rsvpSchema } from "@/lib/domain/rsvp";
import { getRepository } from "@/lib/repositories";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "请求来源无效" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ ok: false, error: "请求格式无效" }, { status: 415 });
  }

  const payload: unknown = await request.json().catch(() => null);
  if (
    payload &&
    typeof payload === "object" &&
    isHoneypotTriggered((payload as Record<string, unknown>).website)
  ) {
    return Response.json({ ok: true });
  }

  const allowed = await consumeRateLimit(
    "rsvp",
    hashClientIp(getClientIp(request)),
    5,
  );
  if (!allowed) {
    return Response.json(
      { ok: false, error: "提交过于频繁，请稍后再试" },
      { status: 429 },
    );
  }

  const result = rsvpSchema.safeParse(payload);
  if (!result.success) return validationError(result.error.issues);

  const value = result.data;
  await getRepository().upsertGuest({
    name: value.name,
    phone: value.phone,
    phoneNormalized: value.phone,
    attending: value.attending,
    guestCount: value.guestCount,
    message: value.message,
  });

  return Response.json({ ok: true }, { status: 201 });
}
