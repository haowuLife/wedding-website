"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function GalleryAccessGate() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const code = new FormData(event.currentTarget).get("code");
    const response = await fetch("/api/gallery/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const result = (await response.json()) as {
      ok: boolean;
      error?: string;
    };
    if (!response.ok || !result.ok) {
      setError(result.error ?? "访问码错误");
      setSubmitting(false);
      return;
    }
    router.refresh();
  }

  return (
    <div className="page-shell grid min-h-[72vh] place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border-y border-[var(--color-line)] py-12 text-center"
      >
        <p className="eyebrow">Private Gallery</p>
        <h1 className="mt-5 font-serif text-4xl tracking-[0.1em]">
          输入相册访问码
        </h1>
        <p className="mt-5 leading-8 text-[var(--color-muted)]">
          这是一份只与亲友分享的影像记录。
        </p>
        <label htmlFor="gallery-code" className="sr-only">
          相册访问码
        </label>
        <input
          id="gallery-code"
          name="code"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          className="field mt-8 text-center tracking-[0.4em]"
          required
        />
        {error ? (
          <p role="alert" className="mt-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-7 rounded-full bg-[var(--color-champagne)] px-9 py-4 text-sm tracking-[0.18em] text-white disabled:opacity-50"
        >
          {submitting ? "验证中..." : "进入相册"}
        </button>
      </form>
    </div>
  );
}
