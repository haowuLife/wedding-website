import Link from "next/link";

import { getRepository } from "@/lib/repositories";

export default async function GuestsPage({
  searchParams,
}: {
  searchParams: Promise<{ attending?: string; q?: string }>;
}) {
  const query = await searchParams;
  const guests = await getRepository().listGuests();
  const filtered = guests.filter((guest) => {
    const matchesAttendance =
      !query.attending ||
      query.attending === "all" ||
      String(guest.attending) === query.attending;
    const keyword = query.q?.trim().toLowerCase();
    const matchesKeyword =
      !keyword ||
      guest.name.toLowerCase().includes(keyword) ||
      guest.phone.includes(keyword);
    return matchesAttendance && matchesKeyword;
  });

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.16em] text-black/45">GUESTS</p>
          <h1 className="mt-2 font-serif text-4xl tracking-[0.08em]">
            RSVP 宾客
          </h1>
        </div>
        <Link
          href="/api/admin/export"
          className="rounded-full bg-[#2d2924] px-6 py-3 text-center text-sm text-white"
        >
          导出 CSV
        </Link>
      </div>
      <form className="mt-8 grid gap-3 rounded-2xl bg-white p-4 sm:grid-cols-[1fr_12rem_auto]">
        <input
          name="q"
          defaultValue={query.q}
          placeholder="搜索姓名或手机号"
          className="rounded-xl border border-black/10 px-4 py-3 text-sm"
        />
        <select
          name="attending"
          defaultValue={query.attending ?? "all"}
          className="rounded-xl border border-black/10 px-4 py-3 text-sm"
        >
          <option value="all">全部回复</option>
          <option value="true">确认参加</option>
          <option value="false">遗憾缺席</option>
        </select>
        <button className="rounded-xl bg-[var(--color-champagne)] px-5 py-3 text-sm text-white">
          筛选
        </button>
      </form>
      <div className="mt-5 overflow-x-auto rounded-2xl bg-white">
        <table className="min-w-[640px] w-full text-left text-sm">
          <thead className="border-b border-black/8 text-black/45">
            <tr>
              {["姓名", "手机号", "出席", "人数", "留言"].map((title) => (
                <th key={title} className="px-5 py-4 font-normal">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((guest) => (
              <tr key={guest.id} className="border-b border-black/6 align-top">
                <td className="px-5 py-4 font-medium">{guest.name}</td>
                <td className="px-5 py-4">{guest.phone}</td>
                <td className="px-5 py-4">
                  {guest.attending ? "参加" : "缺席"}
                </td>
                <td className="px-5 py-4">{guest.guestCount}</td>
                <td className="max-w-64 px-5 py-4">{guest.message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
