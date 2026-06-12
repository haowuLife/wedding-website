import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import { getAdminIdentity } from "@/lib/domain/auth";
import { isDemoMode } from "@/lib/domain/env";
import { isSameOrigin } from "@/lib/domain/request";
import { getRepository } from "@/lib/repositories";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const extensions: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

export async function POST(request: NextRequest) {
  if (!(await getAdminIdentity())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !allowedTypes.has(file.type)) {
    return Response.json({ error: "Unsupported image" }, { status: 400 });
  }
  if (file.size > 15 * 1024 * 1024) {
    return Response.json({ error: "Image is too large" }, { status: 400 });
  }

  const collection =
    form.get("collection") === "memories" ? "memories" : "gallery";
  let imageUrl = "/images/gallery/story-01.jpg";
  if (!isDemoMode()) {
    const extension = extensions[file.type];
    imageUrl = `${collection}/${randomUUID()}${extension}`;
    const { error } = await createSupabaseAdminClient().storage
      .from("wedding-media")
      .upload(imageUrl, file, { contentType: file.type, upsert: false });
    if (error) throw new Error(error.message);
  }

  const existing = await getRepository().listPhotos(collection);
  const photo = await getRepository().createPhoto({
    title: String(form.get("title") || "未命名照片"),
    description: String(form.get("description") || ""),
    imageUrl,
    category: String(form.get("category") || "未分类"),
    sortOrder: existing.length + 1,
    isPublic: form.get("isPublic") === "on",
    collection,
    mediaType: "image",
  });
  revalidatePath("/gallery");
  revalidatePath("/memories");
  revalidatePath("/admin/photos");
  return Response.json({ ok: true, photo }, { status: 201 });
}
