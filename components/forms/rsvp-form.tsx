"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";

type FieldErrors = Record<string, string>;

export function RsvpForm() {
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    setFieldErrors({});
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      attending,
      guestCount: attending ? Number(form.get("guestCount") || 1) : 0,
      needParking: attending && form.get("needParking") === "on",
      message: form.get("message") ?? "",
      website: form.get("website") ?? "",
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        fields?: FieldErrors;
      };
      if (!response.ok || !result.ok) {
        setError(result.error ?? "提交失败，请稍后再试");
        setFieldErrors(result.fields ?? {});
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setError("网络连接失败，请稍后再试");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center" aria-live="polite">
        <CheckCircleIcon
          size={52}
          weight="light"
          className="mx-auto text-[var(--color-champagne)]"
          aria-hidden
        />
        <h2 className="mt-6 font-serif text-4xl tracking-[0.1em]">
          谢谢你的回复
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-8 text-[var(--color-muted)]">
          我们已经收到你的 RSVP。期待在泰兴的金秋与你相见。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="姓名" name="name" error={fieldErrors.name} required />
        <Field
          label="手机号"
          name="phone"
          type="tel"
          inputMode="tel"
          error={fieldErrors.phone}
          required
        />
      </div>

      <fieldset>
        <legend className="text-sm tracking-[0.12em]">是否参加婚礼</legend>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            [true, "欣然参加"],
            [false, "遗憾缺席"],
          ].map(([value, label]) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => setAttending(Boolean(value))}
              className={`rounded-full border px-5 py-3 text-sm tracking-[0.12em] transition ${
                attending === value
                  ? "border-[var(--color-champagne)] bg-[var(--color-champagne)] text-white"
                  : "border-[var(--color-line)]"
              }`}
              aria-pressed={attending === value}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {attending ? (
        <>
          <div>
            <label
              htmlFor="guestCount"
              className="text-sm tracking-[0.12em]"
            >
              参加人数
            </label>
            <select
              id="guestCount"
              name="guestCount"
              className="field mt-2"
              defaultValue="1"
            >
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <option key={count} value={count}>
                  {count} 人
                </option>
              ))}
            </select>
          </div>

          <div>
            <CheckField name="needParking" label="需要停车位" />
          </div>
        </>
      ) : null}

      <TextAreaField
        name="message"
        label="祝福留言"
        placeholder="想对我们说的话"
        error={fieldErrors.message}
      />

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[var(--color-champagne)] px-8 py-4 text-sm tracking-[0.2em] text-white disabled:opacity-50"
      >
        {status === "submitting" ? "提交中..." : "提交 RSVP"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm tracking-[0.12em]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="field mt-2"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckField({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-3 border-b border-[var(--color-line)] py-3 text-sm tracking-[0.08em]">
      <input
        type="checkbox"
        name={name}
        className="size-4 accent-[var(--color-champagne)]"
      />
      {label}
    </label>
  );
}

function TextAreaField({
  name,
  label,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm tracking-[0.12em]">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        className="field mt-2 resize-y"
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
