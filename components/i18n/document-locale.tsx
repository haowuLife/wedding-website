"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n/locale";

export function DocumentLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  return null;
}
