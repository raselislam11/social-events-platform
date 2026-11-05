"use client";

import Link from "next/link";
import { CalendarDays, MapPin, UserRound } from "lucide-react";
import type { EventItem } from "@/types";
import { formatEventDate } from "@/lib/format";

interface EventCardProps {
  event: EventItem;
  children?: React.ReactNode;
}

const EventCard = ({ event, children }: EventCardProps) => {
  return (
    <article className="card h-full flex-col border border-base-content/10 bg-base-100 shadow transition-transform duration-200 hover:-translate-y-1">
      <figure className="relative h-48 w-full overflow-hidden">
        { }
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <span className="badge badge-secondary absolute left-3 top-3 border-none text-xs font-bold">
          {event.eventType}
        </span>
      </figure>

      <div className="card-body flex-1 gap-3 p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug">
          {event.title}
        </h3>

        <div className="space-y-1.5 text-sm opacity-80">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            {formatEventDate(event.eventDate)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <UserRound className="h-4 w-4 shrink-0 text-primary" />
            Hosted by {event.creatorName || event.creatorEmail}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="text-xs font-semibold opacity-60">
            {event.joinedCount ?? 0} volunteer{(event.joinedCount ?? 0) === 1 ? "" : "s"} joined
          </p>
          {children ?? (
            <Link
              href={`/upcoming-events/${event._id}`}
              className="btn btn-primary btn-sm rounded-full px-5"
            >
              View Event
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
