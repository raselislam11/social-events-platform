export function EventCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card h-full border border-base-content/10 bg-base-200/50">
          <div className="skeleton h-48 w-full rounded-t-box bg-base-300" />
          <div className="card-body gap-3">
            <div className="skeleton h-5 w-24 bg-base-300" />
            <div className="skeleton h-6 w-3/4 bg-base-300" />
            <div className="skeleton h-4 w-2/3 bg-base-300" />
            <div className="skeleton h-10 w-full bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LineSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 w-full bg-base-300" />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="card mx-auto max-w-5xl border border-base-content/10">
      <div className="skeleton h-72 w-full rounded-t-box md:h-96 bg-base-300" />
      <div className="card-body gap-4">
        <div className="skeleton h-6 w-28 bg-base-300" />
        <div className="skeleton h-9 w-2/3 bg-base-300" />
        <div className="skeleton h-4 w-full bg-base-300" />
        <div className="skeleton h-4 w-5/6 bg-base-300" />
        <div className="skeleton h-12 w-44 bg-base-300" />
      </div>
    </div>
  );
}
