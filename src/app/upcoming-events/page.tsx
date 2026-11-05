import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/shared/EmptyState";
import EventDetailsSkeletonFallback from "@/components/shared/DetailsSkeletonFallback";
import { API_URL } from "@/lib/api";
import type { EventItem } from "@/types";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

export const dynamic = "force-dynamic";

async function getUpcomingEvents(): Promise<EventItem[] | null> {
  try {
    const res = await fetch(`${API_URL}/api/events/upcoming`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as EventItem[];
  } catch {
    return null;
  }
}

export default async function UpcomingEventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading
        title="Upcoming events in your community"
        subtitle="Every social service event created by members of Shohojog — join the ones that inspire you."
      />

      <div className="mt-12">
        {events === null ? (
          <EventDetailsSkeletonFallback kind="grid" />
        ) : events.length === 0 ? (
          <EmptyState
            title="No upcoming events"
            message="All upcoming drives have wrapped up. Create an event or check back soon."
            actionHref="/create-event"
            actionLabel="Create an event"
          />
        ) : (
          <div className="card-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
