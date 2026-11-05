"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import type { JoinRecord } from "@/types";

interface JoinButtonProps {
  eventId: string;
  eventPast: boolean;
}

const JoinButton = ({ eventId, eventPast }: JoinButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [joined, setJoined] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [joining, setJoining] = useState(false);

  const checkJoinedState = async (targetId: string) => {
    setChecking(true);
    try {
      const data = await api<JoinRecord[]>(`/api/joined?eventId=${targetId}`);
      setJoined(data.length > 0);
    } catch {
      setJoined(false);
    } finally {
      setChecking(false);
    }
  };

  if (!isPending && session && joined === null && !checking) {
    void checkJoinedState(eventId);
  }

  if (isPending || checking || (session && joined === null)) {
    return <div className="skeleton h-12 w-44 rounded-full bg-base-300" />;
  }

  if (!session) {
    async function handleLoginFirst() {
      toast.error("Please log in to join this event");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
    return (
      <button
        type="button"
        onClick={handleLoginFirst}
        disabled={eventPast}
        className="btn btn-primary btn-block h-12 rounded-full px-8"
      >
        <LogIn className="h-4 w-4" />
        {eventPast ? "Event Ended" : "Join Event"}
      </button>
    );
  }

  if (joined) {
    return (
      <button disabled className="btn btn-success btn-block h-12 rounded-full px-8">
        <CalendarCheck className="h-4 w-4" />
        You have joined this event
      </button>
    );
  }

  async function handleJoin() {
    if (eventPast) return;
    setJoining(true);
    try {
      await api("/api/joined", { method: "POST", body: JSON.stringify({ eventId }) });
      toast.success("You joined this event! See you there.");
      setJoined(true);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not join the event";
      toast.error(message);
    } finally {
      setJoining(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={joining || eventPast}
      className="btn btn-primary btn-block h-12 rounded-full px-8"
    >
      <CalendarCheck className="h-4 w-4" />
      {eventPast ? "Event Ended" : joining ? "Joining..." : "Join Event"}
    </button>
  );
};

export default JoinButton;
