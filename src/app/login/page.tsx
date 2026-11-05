import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="relative grid min-h-[80vh] place-items-center px-4 py-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1600&q=60")',
        }}
      />
      <div className="relative flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-stretch">
        <div className="hidden flex-1 flex-col justify-center rounded-box border border-base-content/10 bg-primary/10 p-10 lg:flex">
          <h2 className="section-heading !text-3xl">
            Join hands that lift communities
          </h2>
          <p className="mt-4 text-sm leading-7 opacity-80">
            Winter clothes distribution, blanket drives, city cleanups and
            plantation programs — log in to be part of neighbourhood-level
            change.
          </p>
          { }
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=60"
            alt="Volunteers working together"
            className="mt-8 h-56 w-full rounded-xl object-cover"
          />
        </div>
        <Suspense fallback={<div className="skeleton h-[32rem] w-full max-w-md rounded-xl bg-base-300" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
