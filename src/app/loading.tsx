import { EventCardSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="skeleton h-8 w-72 bg-base-300" />
        <div className="skeleton h-4 w-96 bg-base-300" />
      </div>
      <EventCardSkeleton count={6} />
    </div>
  );
}
