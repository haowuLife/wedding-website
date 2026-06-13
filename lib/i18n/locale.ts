import { cookies } from "next/headers";

export const localeCookieName = "wedding_locale";

export type Locale = "zh" | "en";

export function parseLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : "zh";
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return parseLocale(cookieStore.get(localeCookieName)?.value);
}
