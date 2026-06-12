import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getAdminIdentity } from "@/lib/domain/auth";
import { isSameOrigin } from "@/lib/domain/request";
import { getRepository } from "@/lib/repositories";

const updateSchema = z.object({
  isApproved: z.boolean().optional(),
  isHidden: z.boolean().optional(),
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
  await getRepository().updateMessage(id, result.data);
  revalidatePath("/guestbook");
  revalidatePath("/admin/messages");
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
  await getRepository().deleteMessage(id);
  revalidatePath("/guestbook");
  revalidatePath("/admin/messages");
  return Response.json({ ok: true });
}
