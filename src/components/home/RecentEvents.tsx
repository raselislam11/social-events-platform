import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import EventCard from "@/components/events/EventCard";
import EmptyState from "@/components/shared/EmptyState";
import { EventItem } from "@/types";

const RecentEvents = async ({ events }: { events: EventItem[] | null }) => {
  return (
    <section className="bg-base-200 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Recent upcoming events"
          subtitle="The next six volunteer opportunities happening in your city — straight from the community."
        />

        {events === null ? (
          <div className="mt-12">
            <EmptyState
              title="Connection issue"
              message="We could not reach the event service right now. Please try again shortly."
              actionHref="/"
              actionLabel="Reload"
            />
          </div>
        ) : events.length === 0 ? (
          <div className="mt-12">
            <EmptyState
              title="No upcoming events yet"
              message="Be the first to create one and bring your community together."
              actionHref="/create-event"
              actionLabel="Create the first event"
            />
          </div>
        ) : (
          <div className="card-grid mt-12">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/upcoming-events" className="btn btn-outline rounded-full px-8 h-12 border-base-content/25">
            View all upcoming events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;
