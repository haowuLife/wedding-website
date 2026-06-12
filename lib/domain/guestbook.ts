import { z } from "zod";

export const guestbookSchema = z.object({
  name: z.string().trim().min(1, "请填写姓名").max(80, "姓名过长"),
  message: z
    .string()
    .trim()
    .min(2, "请写下祝福")
    .max(500, "祝福留言不能超过 500 字"),
  website: z.string().max(0).optional().default(""),
});

export type GuestbookPayload = z.infer<typeof guestbookSchema>;
