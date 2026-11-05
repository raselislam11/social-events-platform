import { CalendarX2 } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}

const EmptyState = ({ title, message, actionHref, actionLabel }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-box border border-base-content/10 bg-base-200/50 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10">
        <CalendarX2 className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="max-w-sm text-sm opacity-70">{message}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="btn btn-primary btn-sm mt-2">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;
