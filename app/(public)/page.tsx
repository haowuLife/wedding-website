import { CinematicHero } from "@/components/home/cinematic-hero";
import { HomePreview } from "@/components/home/home-preview";
import { getSiteContent } from "@/lib/content/settings";

export default async function HomePage() {
  const content = await getSiteContent();
  return (
    <>
      <CinematicHero content={content} />
      <HomePreview content={content} />
    </>
  );
}
