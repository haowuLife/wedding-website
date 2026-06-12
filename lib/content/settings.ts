import { getRepository } from "@/lib/repositories";
import type { SiteSetting } from "@/lib/repositories/types";

import { defaultSiteContent, type SiteContent } from "./site";

function objectValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function mergeSiteSettings(
  base: SiteContent,
  settings: SiteSetting[],
): SiteContent {
  const content = structuredClone(base);
  for (const setting of settings) {
    const value = objectValue(setting.value);
    switch (setting.key) {
      case "site.identity":
        if (value) Object.assign(content.identity, value);
        break;
      case "site.hero":
        if (value) Object.assign(content.hero, value);
        break;
      case "site.wedding":
        if (value) {
          Object.assign(content.wedding, value);
          if (typeof value.date === "string") {
            const date = new Date(value.date);
            if (!Number.isNaN(date.getTime())) {
              content.wedding.displayDate = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
              ].join(".");
            }
          }
        }
        break;
      case "site.story":
        if (Array.isArray(setting.value)) {
          content.story = setting.value as SiteContent["story"];
        }
        break;
      case "site.guide":
        if (Array.isArray(setting.value)) {
          content.guide = setting.value as SiteContent["guide"];
        }
        break;
      case "site.navigation":
        if (Array.isArray(setting.value)) {
          content.navigation = setting.value as SiteContent["navigation"];
        }
        break;
      case "gallery.access":
        if (value) Object.assign(content.gallery, value);
        break;
      case "memories.enabled":
        if (value) Object.assign(content.memories, value);
        break;
      case "music.track":
        if (value) Object.assign(content.music, value);
        break;
    }
  }
  return content;
}

export async function getSiteContent(): Promise<SiteContent> {
  const settings = await getRepository().listSettings();
  return mergeSiteSettings(defaultSiteContent, settings);
}
