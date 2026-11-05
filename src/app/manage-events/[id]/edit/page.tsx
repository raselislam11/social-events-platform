"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import EventForm from "@/components/events/EventForm";
import { EventCardSkeleton } from "@/components/shared/Skeletons";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import type { EventItem } from "@/types";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

function EditEventContent({ eventId }: { eventId: string }) {
  const { data: session, isPending } = authClient.useSession();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (isPending || !session) return;
    fetch(`${API_URL}/api/events/${eventId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("not found"))))
      .then((data: EventItem) => {
        if (data.creatorEmail !== session.user.email) {
          setForbidden(true);
        } else {
          setEvent(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [eventId, isPending, session]);

  if (loading || isPending || !session) {
    return (
      <div className="px-4">
        <EventCardSkeleton count={1} />
      </div>
    );
  }

  if (forbidden || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-error/10">
          <ShieldAlert className="h-8 w-8 text-error" />
        </div>
        <h1 className="section-heading mt-4">Not allowed</h1>
        <p className="mt-2 text-sm opacity-70">
          You can only update events that you created yourself.
        </p>
        <Link href="/manage-events" className="btn btn-primary mt-6 rounded-full">
          <ArrowLeft className="h-4 w-4" />
          Back to my events
        </Link>
      </div>
    );
  }

  return <EventForm mode="update" initial={event} />;
}

const EditEventPage = ({ params }: EditEventPageProps) => {
  const { id } = use(params);

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-14">
        <EditEventContent eventId={id} />
      </div>
    </PrivateRoute>
  );
};

export default EditEventPage;
