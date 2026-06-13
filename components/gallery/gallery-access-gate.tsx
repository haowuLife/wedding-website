"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import type { PublicMessages } from "@/lib/i18n/messages";

export function GalleryAccessGate({
  messages,
}: {
  messages: PublicMessages["gallery"];
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const code = new FormData(event.currentTarget).get("code");
    try {
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
        setError(messages.accessError);
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError(messages.accessError);
      setSubmitting(false);
    }
  }

  return (
    <div className="page-shell grid min-h-[72vh] place-items-center">
      <form
        onSubmit={handleSubmit}
        className="romantic-card w-full max-w-md px-6 py-10 text-center sm:px-10 sm:py-12"
      >
        <p className="eyebrow">Private Gallery</p>
        <h1 className="mt-5 font-serif text-4xl tracking-[0.1em]">
          {messages.accessTitle}
        </h1>
        <p className="mt-5 leading-8 text-[var(--color-muted)]">
          {messages.accessDescription}
        </p>
        <label htmlFor="gallery-code" className="sr-only">
          {messages.accessCodeLabel}
        </label>
        <input
          id="gallery-code"
          name="code"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          className="field mt-8 text-center tracking-[0.4em] focus:border-[var(--color-coral)]"
          required
        />
        {error ? (
          <p
            role="alert"
            className="mt-3 text-sm text-[var(--color-coral-deep)]"
          >
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="romantic-primary-button mt-7 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? messages.accessSubmitting : messages.accessSubmit}
        </button>
      </form>
    </div>
  );
}
