import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

import { getAdminIdentity } from "@/lib/domain/auth";
import { isDemoMode } from "@/lib/domain/env";
import { isSameOrigin } from "@/lib/domain/request";
import { getRepository } from "@/lib/repositories";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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
