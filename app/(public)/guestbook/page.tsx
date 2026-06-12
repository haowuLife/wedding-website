import type { Metadata } from "next";

import { GuestbookForm } from "@/components/forms/guestbook-form";
import { MessageList } from "@/components/guestbook/message-list";

export const metadata: Metadata = {
  title: "祝福留言",
};

export default function GuestbookPage() {
  return (
    <div className="page-shell">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Guestbook</p>
        <h1 className="display-title mt-6">祝福留言</h1>
        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-muted)]">
          无论你是否来到现场，都欢迎在这里留下想对我们说的话。
        </p>
      </header>

      <div className="mx-auto mt-16 grid max-w-5xl gap-16 md:mt-24 md:grid-cols-[0.85fr_1.15fr] md:gap-24">
        <section>
          <p className="eyebrow">Leave A Note</p>
          <h2 className="mt-5 font-serif text-3xl tracking-[0.08em]">
            写下你的祝福
          </h2>
          <div className="mt-8">
            <GuestbookForm />
          </div>
        </section>
        <section>
          <p className="eyebrow">With Love</p>
          <h2 className="mt-5 font-serif text-3xl tracking-[0.08em]">
            来自亲友的心意
          </h2>
          <div className="mt-5">
            <MessageList />
          </div>
        </section>
      </div>
    </div>
  );
}
