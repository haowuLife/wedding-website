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
      <div className="rounded-[1.25rem] bg-[var(--color-ivory-deep)]/55 px-5 py-12 text-center">
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
          className="field mt-2 focus:border-[var(--color-coral)]"
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
          className="field mt-2 resize-y focus:border-[var(--color-coral)]"
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
        <p role="alert" className="text-sm text-[var(--color-coral-deep)]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="romantic-primary-button w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting"
          ? messages.submittingLabel
          : messages.submitLabel}
      </button>
    </form>
  );
}
