"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarPlus, Save } from "lucide-react";
import { api } from "@/lib/api";
import { todayInputValue } from "@/lib/format";
import { validateFutureDate, validateUrl } from "@/lib/validators";
import type { EventFormData, EventItem } from "@/types";

interface EventFormProps {
  mode: "create" | "update";
  initial?: EventItem;
}

const emptyForm: EventFormData = {
  title: "",
  description: "",
  eventType: "Cleanup Drive",
  thumbnail: "",
  location: "",
  eventDate: "",
};

const EventForm = ({ mode, initial }: EventFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<EventFormData>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          eventType: initial.eventType,
          thumbnail: initial.thumbnail,
          location: initial.location,
          eventDate: initial.eventDate.split("T")[0],
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof EventFormData>(field: K, value: EventFormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof EventFormData, string>> = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    else if (form.title.trim().length < 5)
      nextErrors.title = "Title should be at least 5 characters";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    else if (form.description.trim().length < 20)
      nextErrors.description = "Description should be at least 20 characters";
    if (!form.location.trim()) nextErrors.location = "Location is required";
    const thumbnailIssue = validateUrl(form.thumbnail);
    if (thumbnailIssue) nextErrors.thumbnail = thumbnailIssue;
    const dateIssue = validateFutureDate(form.eventDate);
    if (dateIssue) nextErrors.eventDate = dateIssue;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) {
      setFormError("Please fix the highlighted fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "create") {
        await api<EventItem>("/api/events", {
          method: "POST",
          body: JSON.stringify(form),
        });
        toast.success("Event created successfully!");
        router.push("/upcoming-events");
      } else if (initial) {
        await api<EventItem>(`/api/events/${initial._id}`, {
          method: "PATCH",
          body: JSON.stringify(form),
        });
        toast.success("Event updated successfully!");
        router.push("/manage-events");
      }
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
      setFormError(message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field: keyof EventFormData) =>
    `input input-bordered w-full ${errors[field] ? "input-error" : ""}`;

  return (
    <div className="card mx-auto w-full max-w-3xl border border-base-content/10 bg-base-100 shadow-xl">
      <div className="card-body gap-3">
        <h1 className="section-heading !text-3xl text-center">
          {mode === "create" ? "Create an Event" : "Update Event"}
        </h1>
        <p className="mx-auto max-w-xl text-center text-sm opacity-70">
          {mode === "create"
            ? "Fill in the details below and let volunteers find your social service event."
            : `Editing "${initial?.title}" — update any field and save your changes.`}
        </p>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4" noValidate>
          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="event-title">
              Event Title
            </label>
            <input
              id="event-title"
              type="text"
              placeholder="Winter Clothes Distribution - Mirpur 10"
              className={inputClass("title")}
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
            {errors.title && <p className="mt-1 text-xs text-error">{errors.title}</p>}
          </div>

          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="event-desc">
              Description
            </label>
            <textarea
              id="event-desc"
              rows={5}
              placeholder="Describe the purpose, activities and who can join this event..."
              className={`textarea textarea-bordered w-full ${errors.description ? "textarea-error" : ""}`}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-error">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label mb-1 block text-sm font-semibold" htmlFor="event-type">
                Event Type
              </label>
              <select
                id="event-type"
                className="select select-bordered w-full"
                value={form.eventType}
                onChange={(e) => setField("eventType", e.target.value)}
              >
                {[
                  "Cleanup Drive",
                  "Plantation",
                  "Donation",
                  "Winter Relief",
                  "Blood Donation",
                  "Health Camp",
                  "Education Program",
                  "Safety Workshop",
                ].map((type) => (
                  <option key={type} value={type} className="bg-base-100">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label mb-1 block text-sm font-semibold" htmlFor="event-date">
                Event Date
              </label>
              <input
                id="event-date"
                type="date"
                min={todayInputValue()}
                className={inputClass("eventDate")}
                value={form.eventDate}
                onChange={(e) => setField("eventDate", e.target.value)}
              />
              {errors.eventDate && (
                <p className="mt-1 text-xs text-error">{errors.eventDate}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label mb-1 block text-sm font-semibold" htmlFor="event-thumb">
                Thumbnail Image URL
              </label>
              <input
                id="event-thumb"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                className={inputClass("thumbnail")}
                value={form.thumbnail}
                onChange={(e) => setField("thumbnail", e.target.value)}
              />
              {errors.thumbnail && (
                <p className="mt-1 text-xs text-error">{errors.thumbnail}</p>
              )}
            </div>

            <div>
              <label className="label mb-1 block text-sm font-semibold" htmlFor="event-loc">
                Location
              </label>
              <input
                id="event-loc"
                type="text"
                placeholder="Mohammadpur, Dhaka"
                className={inputClass("location")}
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-error">{errors.location}</p>
              )}
            </div>
          </div>

          {form.thumbnail && !errors.thumbnail && (
            <div className="rounded-box border border-base-content/10 p-2">
              { }
              <img
                src={form.thumbnail}
                alt="Thumbnail preview"
                className="h-40 w-full rounded-lg object-cover"
              />
            </div>
          )}

          {formError && (
            <div className="alert alert-error py-2 text-sm">
              <span>{formError}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-block">
            {mode === "create" ? (
              <CalendarPlus className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {loading
              ? mode === "create"
                ? "Creating event..."
                : "Saving changes..."
              : mode === "create"
                ? "Create Event"
                : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
