export const EVENT_TYPES = [
  "Cleanup Drive",
  "Plantation",
  "Donation",
  "Winter Relief",
  "Blood Donation",
  "Health Camp",
  "Education Program",
  "Safety Workshop",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdAt?: string;
  updatedAt?: string;
  creatorId: string;
  creatorEmail: string;
  creatorName?: string;
  joinedCount?: number;
}

export type EventFormData = Pick<
  EventItem,
  "title" | "description" | "eventType" | "thumbnail" | "location" | "eventDate"
>;

export interface JoinRecord {
  _id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  userImage?: string;
  eventTitle: string;
  eventType: string;
  eventThumbnail: string;
  eventLocation: string;
  eventDate: string;
  eventIdDate?: string;
  joinedAt: string;
}

export interface ApiError {
  success: false;
  message: string;
}
