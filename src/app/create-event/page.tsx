"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";
import EventForm from "@/components/events/EventForm";

const CreateEventPage = () => {
  return (
    <PrivateRoute>
      <div className="mx-auto max-w-7xl px-4 py-14">
        <EventForm mode="create" />
      </div>
    </PrivateRoute>
  );
};

export default CreateEventPage;
