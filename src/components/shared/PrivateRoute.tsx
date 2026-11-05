"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import EventDetailsFallback from "./DetailsSkeletonFallback";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14">
        <EventDetailsFallback kind="details" />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
