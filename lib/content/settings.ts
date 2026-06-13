import { getRepository } from "@/lib/repositories";
import type { Locale } from "@/lib/i18n/locale";
import type { SiteSetting } from "@/lib/repositories/types";

import {
  defaultSiteContentByLocale,
  type SiteContent,
} from "./site";

function objectValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function mergeSiteSettings(
  base: SiteContent,
  settings: SiteSetting[],
  locale: Locale = "zh",
): SiteContent {
  const content = structuredClone(base);

  for (const setting of settings) {
    const value = objectValue(setting.value);

    if (setting.key === "site.hero" && value) {
      if (typeof value.image === "string") {
        content.hero.image = value.image;
      }
    }
    if (setting.key === "site.wedding" && value) {
      if (typeof value.date === "string") content.wedding.date = value.date;
      if (typeof value.mapUrl === "string") {
        content.wedding.mapUrl = value.mapUrl;
      }
      if (typeof value.hotelUrl === "string") {
        content.wedding.hotelUrl = value.hotelUrl;
      }
    }
    if (setting.key === "gallery.access" && value) {
      Object.assign(content.gallery, value);
    }
    if (setting.key === "memories.enabled" && value) {
      if (typeof value.enabled === "boolean") {
        content.memories.enabled = value.enabled;
      }
    }
    if (setting.key === "music.track" && value) {
      if (typeof value.enabled === "boolean") {
        content.music.enabled = value.enabled;
      }
      if (typeof value.src === "string") content.music.src = value.src;
    }
  }

  const suffix = locale === "en" ? ".en" : "";
  for (const setting of settings) {
    const value = objectValue(setting.value);
    switch (setting.key) {
      case `site.identity${suffix}`:
        if (value) Object.assign(content.identity, value);
        break;
      case `site.hero${suffix}`:
        if (value) {
          if (locale === "zh") {
            Object.assign(content.hero, value);
          } else {
            if (typeof value.eyebrow === "string") {
              content.hero.eyebrow = value.eyebrow;
            }
            if (typeof value.invitationLabel === "string") {
              content.hero.invitationLabel = value.invitationLabel;
            }
          }
        }
        break;
      case `site.wedding${suffix}`:
        if (value) {
          if (locale === "zh") {
            Object.assign(content.wedding, value);
          } else {
            const localizedKeys = [
              "lunarDate",
              "ceremonyTime",
              "receptionTime",
              "city",
              "venue",
              "address",
              "schedule",
            ] as const;
            for (const key of localizedKeys) {
              if (value[key] !== undefined) {
                Object.assign(content.wedding, { [key]: value[key] });
              }
            }
          }
        }
        break;
      case `site.story${suffix}`:
        if (Array.isArray(setting.value)) {
          content.story = setting.value as SiteContent["story"];
        }
        break;
      case `site.guide${suffix}`:
        if (Array.isArray(setting.value)) {
          content.guide = setting.value as SiteContent["guide"];
        }
        break;
      case `site.travel${suffix}`:
        if (Array.isArray(setting.value)) {
          content.travel = setting.value as SiteContent["travel"];
        } else if (value) {
          if (Array.isArray(value.items)) {
            content.travel = value.items as SiteContent["travel"];
          }
          if (typeof value.disclaimer === "string") {
            content.travelDisclaimer = value.disclaimer;
          }
        }
        break;
      case `site.food${suffix}`:
        if (Array.isArray(setting.value)) {
          content.food = setting.value as SiteContent["food"];
        } else if (value && Array.isArray(value.items)) {
          content.food = value.items as SiteContent["food"];
        }
        break;
      case `site.transport${suffix}`:
        if (Array.isArray(setting.value)) {
          content.transport = setting.value as SiteContent["transport"];
        } else if (value) {
          if (Array.isArray(value.items)) {
            content.transport = value.items as SiteContent["transport"];
          }
          if (typeof value.holidayNote === "string") {
            content.holidayTravelNote = value.holidayNote;
          }
        }
        break;
      case `site.navigation${suffix}`:
        if (Array.isArray(setting.value)) {
          content.navigation = setting.value as SiteContent["navigation"];
        }
        break;
      case `site.memories${suffix}`:
        if (value) {
          if (typeof value.title === "string") {
            content.memories.title = value.title;
          }
          if (typeof value.description === "string") {
            content.memories.description = value.description;
          }
        }
        break;
    }
  }

  const date = new Date(content.wedding.date);
  if (!Number.isNaN(date.getTime())) {
    content.wedding.displayDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join(".");
  }

  return content;
}

export async function getSiteContent(
  locale: Locale = "zh",
): Promise<SiteContent> {
  const settings = await getRepository().listSettings();
  return mergeSiteSettings(defaultSiteContentByLocale[locale], settings, locale);
}

export async function getAllSiteContent(): Promise<
  Record<Locale, SiteContent>
> {
  const settings = await getRepository().listSettings();
  return {
    zh: mergeSiteSettings(defaultSiteContentByLocale.zh, settings, "zh"),
    en: mergeSiteSettings(defaultSiteContentByLocale.en, settings, "en"),
  };
}
