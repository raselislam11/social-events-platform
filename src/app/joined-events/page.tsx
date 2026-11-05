"use client";

import Link from "next/link";
import { CalendarCheck, CalendarDays, MapPin } from "lucide-react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import { EventCardSkeleton } from "@/components/shared/Skeletons";
import { useMyJoins } from "@/hooks/useEvents";
import { formatEventDate, formatJoinedDate } from "@/lib/format";
import { isEventPast } from "@/lib/validators";

function JoinedEventsContent() {
  const { joins, loading } = useMyJoins();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeading
        title="Events you joined"
        subtitle="All volunteer programs you have signed up for, sorted by event date — find the nearest drive and show up!"
      />

      <div className="mt-10 space-y-4">
        {loading ? (
          <EventCardSkeleton count={3} />
        ) : joins === null ? (
          <EmptyState
            title="Could not load your joined events"
            message="The service seems unreachable right now. Please try again in a moment."
            actionHref="/joined-events"
            actionLabel="Retry"
          />
        ) : joins.length === 0 ? (
          <EmptyState
            title="No joined events yet"
            message="Browse upcoming community events and join the ones that speak to you."
            actionHref="/upcoming-events"
            actionLabel="Explore events"
          />
        ) : (
          joins.map((join) => {
            const past = isEventPast(join.eventDate);
            return (
              <article
                key={join._id}
                className="card flex-row gap-4 border border-base-content/10 bg-base-100 shadow p-4"
              >
                { }
                <img
                  src={join.eventThumbnail}
                  alt={join.eventTitle}
                  className="h-28 w-28 flex-none rounded-lg object-cover sm:h-32 sm:w-44"
                  loading="lazy"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge badge-secondary badge-sm border-none font-bold">
                      {join.eventType}
                    </span>
                    <span
                      className={`badge badge-sm font-bold ${
                        past ? "badge-error badge-outline" : "badge-success badge-outline"
                      }`}
                    >
                      {past ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                  <h3 className="line-clamp-1 text-lg font-bold">{join.eventTitle}</h3>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                    {formatEventDate(join.eventDate)}
                  </p>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">{join.eventLocation}</span>
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span className="flex items-center gap-1.5 text-xs opacity-60">
                      <CalendarCheck className="h-3.5 w-3.5" />
                      Joined on {formatJoinedDate(join.joinedAt)}
                    </span>
                    <Link
                      href={`/upcoming-events/${join.eventId}`}
                      className="btn btn-primary btn-xs rounded-full px-4"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

const JoinedEventsPage = () => {
  return (
    <PrivateRoute>
      <JoinedEventsContent />
    </PrivateRoute>
  );
};

export default JoinedEventsPage;
