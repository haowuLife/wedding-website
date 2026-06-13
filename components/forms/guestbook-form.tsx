"use client";

import { FormEvent, useState } from "react";

import type { PublicMessages } from "@/lib/i18n/messages";

export function GuestbookForm({
  messages,
}: {
  messages: PublicMessages["guestbook"];
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
      };
      if (!response.ok || !result.ok) {
        setError(messages.submitError);
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setError(messages.networkError);
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="border-y border-[var(--color-line)] py-12 text-center">
        <h2 className="font-serif text-3xl tracking-[0.1em]">
          {messages.successTitle}
        </h2>
        <p className="mt-4 leading-8 text-[var(--color-muted)]">
          {messages.successDescription}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label htmlFor="guestbook-name" className="text-sm tracking-[0.1em]">
          {messages.nameLabel}
        </label>
        <input
          id="guestbook-name"
          name="name"
          required
          maxLength={80}
          className="field mt-2"
        />
      </div>
      <div>
        <label htmlFor="guestbook-message" className="text-sm tracking-[0.1em]">
          {messages.messageLabel}
        </label>
        <textarea
          id="guestbook-message"
          name="message"
          required
          maxLength={500}
          rows={5}
          className="field mt-2 resize-y"
        />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="guestbook-website">Website</label>
        <input
          id="guestbook-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-[var(--color-champagne)] px-9 py-4 text-sm tracking-[0.18em] text-white disabled:opacity-50"
      >
        {status === "submitting"
          ? messages.submittingLabel
          : messages.submitLabel}
      </button>
    </form>
  );
}
