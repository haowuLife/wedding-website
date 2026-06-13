import type { Metadata } from "next";

import { CinematicHero } from "@/components/home/cinematic-hero";
import { HomePreview } from "@/components/home/home-preview";
import { getSiteContent } from "@/lib/content/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const messages = getMessages(await getLocale());
  return {
    title: { absolute: messages.metadata.siteTitle },
    description: messages.metadata.description,
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const content = await getSiteContent(locale);
  const messages = getMessages(locale);
  return (
    <>
      <CinematicHero content={content} messages={messages} />
      <HomePreview content={content} messages={messages.home} />
    </>
  );
}
