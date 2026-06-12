"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { GuestbookMessage } from "@/lib/repositories/types";

export function MessageManager({
  initialMessages,
}: {
  initialMessages: GuestbookMessage[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function mutate(
    id: string,
    method: "PATCH" | "DELETE",
    body?: Record<string, boolean>,
  ) {
    setBusy(id);
    await fetch(`/api/admin/messages/${id}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    setBusy(null);
    router.refresh();
  }

  return (
    <div className="mt-8 space-y-4">
      {initialMessages.map((message) => (
        <article key={message.id} className="rounded-2xl bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{message.name}</p>
              <p className="mt-1 text-xs text-black/40">
                {new Date(message.createdAt).toLocaleString("zh-CN")}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                message.isHidden
                  ? "bg-black/8 text-black/45"
                  : message.isApproved
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
              }`}
            >
              {message.isHidden
                ? "已隐藏"
                : message.isApproved
                  ? "已公开"
                  : "待审核"}
            </span>
          </div>
          <p className="mt-5 leading-8">{message.message}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {!message.isApproved ? (
              <button
                disabled={busy === message.id}
                onClick={() =>
                  mutate(message.id, "PATCH", {
                    isApproved: true,
                    isHidden: false,
                  })
                }
                className="rounded-full bg-emerald-700 px-4 py-2 text-xs text-white"
              >
                通过
              </button>
            ) : null}
            <button
              disabled={busy === message.id}
              onClick={() =>
                mutate(message.id, "PATCH", {
                  isHidden: !message.isHidden,
                })
              }
              className="rounded-full border border-black/10 px-4 py-2 text-xs"
            >
              {message.isHidden ? "取消隐藏" : "隐藏"}
            </button>
            <button
              disabled={busy === message.id}
              onClick={() => mutate(message.id, "DELETE")}
              className="rounded-full border border-red-200 px-4 py-2 text-xs text-red-700"
            >
              删除
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
