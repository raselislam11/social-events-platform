import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import RecentEvents from "@/components/home/RecentEvents";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import { API_URL } from "@/lib/api";
import type { EventItem } from "@/types";

export const dynamic = "force-dynamic";

async function getRecentEvents(): Promise<EventItem[] | null> {
  try {
    const res = await fetch(`${API_URL}/api/events/upcoming?limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as EventItem[];
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const events = await getRecentEvents();

  return (
    <>
      <Banner />
      <Features />
      <RecentEvents events={events} />
      <Gallery />
      <Newsletter />
    </>
  );
}
