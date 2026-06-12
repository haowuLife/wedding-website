import Link from "next/link";

import { defaultSiteContent } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-3xl tracking-[0.12em]">
            {defaultSiteContent.identity.title}
          </p>
          <p className="mt-3 text-sm tracking-[0.18em] text-[var(--color-muted)]">
            {defaultSiteContent.wedding.displayDate} · 杭州
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
            留下祝福
          </Link>
          <Link href="/admin" className="transition-colors hover:text-current">
            管理
          </Link>
        </div>
      </div>
    </footer>
  );
}
