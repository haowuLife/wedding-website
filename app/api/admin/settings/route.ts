import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getAdminIdentity } from "@/lib/domain/auth";
import { isSameOrigin } from "@/lib/domain/request";
import { getRepository } from "@/lib/repositories";

const updateSchema = z.object({
  key: z.enum([
    "site.identity",
    "site.hero",
    "site.wedding",
    "site.story",
    "site.guide",
    "site.navigation",
    "gallery.access",
    "memories.enabled",
    "music.track",
  ]),
  value: z.unknown(),
});

export async function PATCH(request: NextRequest) {
  if (!(await getAdminIdentity())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }
  const result = updateSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!result.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }
  await getRepository().updateSetting(result.data.key, result.data.value);
  [
    "/",
    "/story",
    "/details",
    "/guide",
    "/rsvp",
    "/memories",
    "/admin/settings",
  ].forEach((path) => revalidatePath(path));
  return Response.json({ ok: true });
}
