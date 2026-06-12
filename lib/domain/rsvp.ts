import { z } from "zod";

export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("86") && digits.length === 13
    ? digits.slice(2)
    : digits;
}

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(1, "请填写姓名").max(80, "姓名过长"),
    phone: z
      .string()
      .trim()
      .transform(normalizePhone)
      .refine((value) => /^1[3-9]\d{9}$/.test(value), "请输入有效手机号"),
    attending: z.boolean(),
    guestCount: z.coerce.number().int().min(0).max(10),
    hasChildren: z.boolean(),
    needParking: z.boolean(),
    dietaryRestrictions: z.string().trim().max(500, "饮食说明过长"),
    message: z.string().trim().max(1000, "留言过长"),
    website: z.string().max(0).optional().default(""),
  })
  .transform((value) => ({
    ...value,
    guestCount: value.attending ? Math.max(1, value.guestCount) : 0,
    hasChildren: value.attending ? value.hasChildren : false,
    needParking: value.attending ? value.needParking : false,
  }));

export type RsvpPayload = z.infer<typeof rsvpSchema>;
