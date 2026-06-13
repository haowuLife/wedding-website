import Link from "next/link";

import { CoupleSignature } from "@/components/layout/couple-signature";
import type { SiteContent } from "@/lib/content/site";
import type { PublicMessages } from "@/lib/i18n/messages";

export function SiteFooter({
  content,
  messages,
}: {
  content: SiteContent;
  messages: PublicMessages;
}) {
  return (
    <footer className="border-t border-[var(--color-romantic-line)] bg-white px-6 py-12 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-9 md:flex-row md:items-end md:justify-between">
        <div>
          <CoupleSignature names={content.identity} />
          <p className="mt-4 text-xs tracking-[0.16em] text-[var(--color-muted)] sm:text-sm">
            {content.wedding.displayDate} · {content.wedding.city}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link
            href="/rsvp"
            className="font-medium text-[var(--color-coral-deep)] underline decoration-[var(--color-coral)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-ink)]"
          >
            RSVP
          </Link>
          <Link
            href="/guestbook"
            className="font-medium text-[var(--color-coral-deep)] underline decoration-[var(--color-coral)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-ink)]"
          >
            {messages.footer.guestbookLabel}
          </Link>
          <Link
            href="/admin"
            className="text-xs tracking-[0.08em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            {messages.footer.adminLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
