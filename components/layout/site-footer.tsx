import Link from "next/link";

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
    <footer className="border-t border-[var(--color-line)] px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-3xl tracking-[0.12em]">
            {content.identity.title}
          </p>
          <p className="mt-3 text-sm tracking-[0.18em] text-[var(--color-muted)]">
            {content.wedding.displayDate} · {content.wedding.city}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--color-muted)]">
          <Link href="/rsvp" className="transition-colors hover:text-current">
            RSVP
          </Link>
          <Link
            href="/guestbook"
            className="transition-colors hover:text-current"
          >
            {messages.footer.guestbookLabel}
          </Link>
          <Link href="/admin" className="transition-colors hover:text-current">
            {messages.footer.adminLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
