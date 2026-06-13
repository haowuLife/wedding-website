import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getAdminIdentity } from "@/lib/domain/auth";
import { isDemoMode } from "@/lib/domain/env";
import { isSameOrigin } from "@/lib/domain/request";
import { getRepository } from "@/lib/repositories";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const updateSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  titleEn: z.string().trim().max(120).nullable().optional(),
  description: z.string().trim().max(500).optional(),
  descriptionEn: z.string().trim().max(500).nullable().optional(),
  category: z.string().trim().min(1).max(80).optional(),
  sortOrder: z.coerce.number().int().min(0).max(10000).optional(),
  isPublic: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
  const { id } = await params;
  await getRepository().updatePhoto(id, result.data);
  revalidatePath("/gallery");
  revalidatePath("/memories");
  revalidatePath("/admin/photos");
  return Response.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminIdentity())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }
  const { id } = await params;
  const repository = getRepository();
  const photo = (await repository.listPhotos()).find((item) => item.id === id);
  if (!photo) return Response.json({ error: "Not found" }, { status: 404 });

  if (!isDemoMode() && !photo.imageUrl.startsWith("http")) {
    await createSupabaseAdminClient().storage
      .from("wedding-media")
      .remove([photo.imageUrl]);
  }
  await repository.deletePhoto(id);
  revalidatePath("/gallery");
  revalidatePath("/memories");
  revalidatePath("/admin/photos");
  return Response.json({ ok: true });
}
