"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/api";

interface DeleteButtonProps {
  eventId: string;
  eventTitle: string;
  onDeleted?: () => void;
}

const DeleteConfirmButton = ({ eventId, eventTitle, onDeleted }: DeleteButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    const result = await Swal.fire({
      title: "Delete this event?",
      text: `"${eventTitle}" will be permanently removed along with its join records.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });
    if (!result.isConfirmed) return;

    setDeleting(true);
    try {
      await api(`/api/events/${eventId}`, { method: "DELETE" });
      toast.success("Event deleted successfully");
      onDeleted?.();
      router.refresh();
      if (pathname !== "/manage-events") router.push("/manage-events");
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The event has been removed.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={confirmDelete}
      disabled={deleting}
      className="btn btn-error btn-sm rounded-full"
      aria-label={`Delete ${eventTitle}`}
    >
      <Trash2 className="h-4 w-4" />
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteConfirmButton;
