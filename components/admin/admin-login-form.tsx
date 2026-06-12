"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ demoMode }: { demoMode: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (demoMode) {
    return (
      <div className="text-center">
        <div className="rounded-xl bg-[var(--color-ivory-deep)] p-5 text-sm leading-7 text-[var(--color-muted)]">
          当前未配置 Supabase，后台以本地演示模式运行。数据不会持久化到云端。
        </div>
        <Link
          href="/admin"
          className="mt-7 inline-flex w-full justify-center rounded-full bg-[var(--color-champagne)] px-8 py-4 text-sm tracking-[0.16em] text-white"
        >
          进入演示后台
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const { createSupabaseBrowserClient } = await import(
      "@/lib/supabase/client"
    );
    const { error: authError } =
      await createSupabaseBrowserClient().auth.signInWithPassword({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
    if (authError) {
      setError("邮箱或密码不正确");
      setSubmitting(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label htmlFor="email" className="text-sm tracking-[0.1em]">
          管理员邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="field mt-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm tracking-[0.1em]">
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field mt-2"
        />
      </div>
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[var(--color-champagne)] px-8 py-4 text-sm tracking-[0.16em] text-white disabled:opacity-50"
      >
        {submitting ? "登录中..." : "登录"}
      </button>
    </form>
  );
}
