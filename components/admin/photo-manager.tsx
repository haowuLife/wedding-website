"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import type { Photo } from "@/lib/repositories/types";

export function PhotoManager({ photos }: { photos: Photo[] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const response = await fetch("/api/admin/photos", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    setSubmitting(false);
    if (response.ok) {
      event.currentTarget.reset();
      router.refresh();
    }
  }

  async function remove(id: string) {
    if (!window.confirm("确认删除这张照片？")) return;
    await fetch(`/api/admin/photos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function update(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await fetch(`/api/admin/photos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: form.get("category"),
        sortOrder: Number(form.get("sortOrder")),
        isPublic: form.get("isPublic") === "on",
      }),
    });
    router.refresh();
  }

  return (
    <>
      <form
        onSubmit={upload}
        className="mt-8 grid gap-4 rounded-2xl bg-white p-6 md:grid-cols-2"
      >
        <input
          name="title"
          placeholder="照片标题"
          required
          className="rounded-xl border border-black/10 px-4 py-3 text-sm"
        />
        <input
          name="category"
          placeholder="分类，如 晨光"
          required
          className="rounded-xl border border-black/10 px-4 py-3 text-sm"
        />
        <input
          name="description"
          placeholder="照片说明"
          className="rounded-xl border border-black/10 px-4 py-3 text-sm md:col-span-2"
        />
        <select
          name="mediaType"
          value={mediaType}
          onChange={(event) =>
            setMediaType(event.target.value === "video" ? "video" : "image")
          }
          className="rounded-xl border border-black/10 px-4 py-3 text-sm"
        >
          <option value="image">图片</option>
          <option value="video">视频链接</option>
        </select>
        <select
          name="collection"
          className="rounded-xl border border-black/10 px-4 py-3 text-sm"
        >
          <option value="gallery">婚纱照相册</option>
          <option value="memories">婚礼回顾</option>
        </select>
        {mediaType === "image" ? (
          <input
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            required
            className="rounded-xl border border-black/10 px-4 py-3 text-sm"
          />
        ) : (
          <input
            name="videoUrl"
            type="url"
            placeholder="https://cdn.example.com/wedding.mp4"
            required
            className="rounded-xl border border-black/10 px-4 py-3 text-sm"
          />
        )}
        <label className="flex items-center gap-3 text-sm">
          <input
            name="isPublic"
            type="checkbox"
            defaultChecked
            className="size-4 accent-[var(--color-champagne)]"
          />
          公开展示
        </label>
        <button
          disabled={submitting}
          className="rounded-xl bg-[#2d2924] px-5 py-3 text-sm text-white disabled:opacity-50"
        >
          {submitting ? "上传中..." : "上传照片"}
        </button>
      </form>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo) => (
          <article key={photo.id} className="overflow-hidden rounded-2xl bg-white">
            {photo.mediaType === "video" ? (
              <video
                src={photo.imageUrl}
                controls
                preload="metadata"
                className="aspect-[4/3] w-full bg-black object-cover"
              />
            ) : (
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, 45vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl">{photo.title}</h2>
                  <p className="mt-1 text-xs text-black/45">
                    {photo.category} · {photo.collection}
                  </p>
                </div>
                <button
                  onClick={() => remove(photo.id)}
                  className="text-xs text-red-700"
                >
                  删除
                </button>
              </div>
              <form
                onSubmit={(event) => update(event, photo.id)}
                className="mt-5 grid grid-cols-[1fr_5rem] gap-2"
              >
                <input
                  name="category"
                  defaultValue={photo.category}
                  aria-label={`${photo.title} 分类`}
                  className="rounded-lg border border-black/10 px-3 py-2 text-xs"
                />
                <input
                  name="sortOrder"
                  type="number"
                  min="0"
                  defaultValue={photo.sortOrder}
                  aria-label={`${photo.title} 排序`}
                  className="rounded-lg border border-black/10 px-3 py-2 text-xs"
                />
                <label className="flex items-center gap-2 text-xs">
                  <input
                    name="isPublic"
                    type="checkbox"
                    defaultChecked={photo.isPublic}
                  />
                  公开
                </label>
                <button className="rounded-lg bg-black/7 px-3 py-2 text-xs">
                  保存
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
