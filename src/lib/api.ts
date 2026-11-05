import { authClient } from "./auth-client";
import type { ApiError } from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

let cachedToken: { value: string; at: number } | null = null;
const TOKEN_TTL_MS = 10 * 60 * 1000;

export async function getJwtToken(): Promise<string | null> {
  if (cachedToken && Date.now() - cachedToken.at < TOKEN_TTL_MS) {
    return cachedToken.value;
  }
  try {
    const { data } = await authClient.token();
    const token = data?.token ?? null;
    if (token) cachedToken = { value: token, at: Date.now() };
    else cachedToken = null;
    return token;
  } catch {
    cachedToken = null;
    return null;
  }
}

export function clearJwtToken() {
  cachedToken = null;
}

interface ApiOptions extends Omit<RequestInit, "headers"> {
  headers?: HeadersInit;
  auth?: boolean;
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = options;
  const finalHeaders = new Headers(headers);
  if (rest.body && !(rest.body instanceof FormData)) {
    finalHeaders.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = await getJwtToken();
    if (token) finalHeaders.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(`${API_URL}${path}`, { ...rest, headers: finalHeaders });
  let payload: unknown = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }
  if (!res.ok) {
    const message =
      (payload as ApiError | null)?.message ?? `Request failed with status ${res.status}`;
    const error = new Error(message) as Error & { status: number };
    error.status = res.status;
    throw error;
  }
  return payload as T;
}
