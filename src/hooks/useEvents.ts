"use client";

import { useCallback, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { api, clearJwtToken } from "@/lib/api";
import type { EventItem, JoinRecord } from "@/types";

export function useMyEvents() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<EventItem[]>("/api/events/mine");
      setEvents(data);
    } catch {
      clearJwtToken();
      const data = await api<EventItem[]>("/api/events/mine").catch(() => null);
      setEvents(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!session) return;
    void load();
  }, [isPending, session, load]);

  return { events, loading, refetch: load, session };
}

export function useMyJoins() {
  const [joins, setJoins] = useState<JoinRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = authClient.useSession();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<JoinRecord[]>("/api/joined");
      setJoins(data);
    } catch {
      clearJwtToken();
      const data = await api<JoinRecord[]>("/api/joined").catch(() => null);
      setJoins(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!session) return;
    void load();
  }, [isPending, session, load]);

  return { joins, loading, refetch: load, session };
}
