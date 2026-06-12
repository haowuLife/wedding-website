import type { Guest } from "@/lib/repositories/types";

function escapeCsv(value: unknown): string {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function createGuestsCsv(guests: Guest[]): string {
  const headers = [
    "姓名",
    "手机号",
    "是否参加",
    "参加人数",
    "需要停车",
    "祝福留言",
    "提交时间",
  ];
  const rows = guests.map((guest) => [
    guest.name,
    guest.phone,
    guest.attending ? "是" : "否",
    guest.guestCount,
    guest.needParking ? "是" : "否",
    guest.message,
    guest.createdAt,
  ]);
  return `\uFEFF${[headers, ...rows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\r\n")}`;
}
