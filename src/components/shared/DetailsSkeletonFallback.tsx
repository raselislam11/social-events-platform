import { EventCardSkeleton, DetailsSkeleton } from "@/components/shared/Skeletons";

interface DetailsSkeletonFallbackProps {
  kind: "details" | "grid";
}

const DetailsSkeletonFallback = ({ kind }: DetailsSkeletonFallbackProps) => {
  if (kind === "grid") {
    return <EventCardSkeleton count={6} />;
  }
  return <DetailsSkeleton />;
};

export default DetailsSkeletonFallback;
