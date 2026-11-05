"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Pencil, UsersRound } from "lucide-react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import SectionHeading from "@/components/shared/SectionHeading";
import DeleteConfirmButton from "@/components/events/DeleteConfirmModal";
import EmptyState from "@/components/shared/EmptyState";
import { EventCardSkeleton } from "@/components/shared/Skeletons";
import { useMyEvents } from "@/hooks/useEvents";
import { formatEventDate } from "@/lib/format";
import { isEventPast } from "@/lib/validators";

function ManageEventsContent() {
  const { events, loading, refetch } = useMyEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading
        title="Manage your events"
        subtitle="All the events you have created as an organizer. You can update details or remove any of them."
      />

      <div className="mt-10">
        {loading ? (
          <EventCardSkeleton count={3} />
        ) : events === null ? (
          <EmptyState
            title="Could not load your events"
            message="The event service seems unreachable right now. Please try again in a moment."
            actionHref="/manage-events"
            actionLabel="Retry"
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="You have not created any events"
            message="Organize your first social service event — cleanup, plantation, donation or anything your community needs."
            actionHref="/create-event"
            actionLabel="Create your first event"
          />
        ) : (
          <div className="card-grid">
            {events.map((event) => (
              <article
                key={event._id}
                className="card flex-col h-full border border-base-content/10 bg-base-100 shadow transition-transform duration-200 hover:-translate-y-1"
              >
                <figure className="relative h-48 w-full overflow-hidden rounded-t-box max-lg:rounded-b-none">
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
                  {isEventPast(event.eventDate) && (
                    <span className="badge badge-error absolute right-3 top-3 border-none font-bold">
                      Ended
                    </span>
                  )}
                </figure>
                <div className="card-body flex-1 gap-2 p-5">
                  <h3 className="line-clamp-2 text-lg font-bold leading-snug">
                    {event.title}
                  </h3>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                    {formatEventDate(event.eventDate)}
                  </p>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">{event.location}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <UsersRound className="h-4 w-4 shrink-0 text-primary" />
                    {event.joinedCount ?? 0} volunteers joined
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-3">
                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="btn btn-ghost btn-sm rounded-full border border-base-content/15"
                    >
                      View
                    </Link>
                    <Link
                      href={`/manage-events/${event._id}/edit`}
                      className="btn btn-primary btn-sm rounded-full"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Update
                    </Link>
                    <DeleteConfirmButton
                      eventId={event._id}
                      eventTitle={event.title}
                      onDeleted={refetch}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ManageEventsPage = () => {
  return (
    <PrivateRoute>
      <ManageEventsContent />
    </PrivateRoute>
  );
};

export default ManageEventsPage;
