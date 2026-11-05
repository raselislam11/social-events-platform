import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, UserRound, UsersRound } from "lucide-react";
import JoinButton from "@/components/events/JoinButton";
import { API_URL } from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import { isEventPast } from "@/lib/validators";
import type { EventItem } from "@/types";

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function getEvent(id: string): Promise<EventItem | null> {
  try {
    const res = await fetch(`${API_URL}/api/events/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as EventItem;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: EventDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) return { title: "Event not found" };
  return { title: event.title };
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="section-heading">Event not found</h1>
        <p className="mt-3 text-sm opacity-70">
          This event may have been removed by its organizer or the link is broken.
        </p>
        <Link href="/upcoming-events" className="btn btn-primary mt-6 rounded-full">
          <ArrowLeft className="h-4 w-4" />
          Back to upcoming events
        </Link>
      </div>
    );
  }

  const past = isEventPast(event.eventDate);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/upcoming-events"
        className="btn btn-ghost btn-sm mb-6 rounded-full"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <article className="card overflow-hidden border border-base-content/10 bg-base-100 shadow-xl">
        <figure>
          { }
          <img
            src={event.thumbnail}
            alt={event.title}
            className="h-64 w-full object-cover md:h-96"
          />
        </figure>

        <div className="card-body gap-5 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-secondary font-bold">{event.eventType}</span>
            <span
              className={`badge font-bold ${
                past
                  ? "badge-error badge-outline"
                  : "badge-success badge-outline"
              }`}
            >
              {past ? "Event ended" : "Upcoming event"}
            </span>
            <span className="badge badge-ghost">
              <UsersRound className="mr-1 h-3.5 w-3.5" />
              {event.joinedCount ?? 0} joined
            </span>
          </div>

          <h1 className="section-heading !text-3xl md:!text-4xl">{event.title}</h1>

          <div className="grid gap-3 rounded-box bg-base-200/70 p-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-60">Event Date</p>
                <p className="text-sm font-bold">{formatEventDate(event.eventDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-60">Location</p>
                <p className="text-sm font-bold">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10">
                <UserRound className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold opacity-60">Organized by</p>
                <p className="truncate text-sm font-bold">
                  {event.creatorName || event.creatorEmail}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold">About this event</h2>
            <p className="mt-2 leading-7 opacity-85">{event.description}</p>
          </div>

          <div className="max-w-xs">
            <JoinButton eventId={event._id} eventPast={past} />
          </div>
        </div>
      </article>
    </div>
  );
}
