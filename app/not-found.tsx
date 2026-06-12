import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell grid min-h-[72vh] place-items-center text-center">
      <div>
        <p className="eyebrow">Not Found</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[0.12em]">暂未开放</h1>
        <p className="mx-auto mt-6 max-w-md leading-8 text-[var(--color-muted)]">
          这部分内容还在准备中，请先回到婚礼邀请首页。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-[var(--color-champagne)] px-7 py-3 text-sm tracking-[0.18em]"
        >
          返回首页
        </Link>
      </div>
    </section>
  );
}
