import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
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
        <Suspense fallback={<div className="skeleton h-[36rem] w-full max-w-md rounded-xl bg-base-300" />}>
          <RegisterForm />
        </Suspense>
        <div className="hidden flex-1 flex-col justify-center rounded-box border border-base-content/10 bg-primary/10 p-10 lg:flex">
          <h2 className="section-heading !text-3xl">Become a Shohojog member</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 opacity-80">
            <li>&bull; Create and manage your events under your name</li>
            <li>&bull; Join drives near you with one click</li>
            <li>&bull; Hosts decide the goal; volunteers count on you</li>
          </ul>
          { }
          <img
            src="https://images.unsplash.com/photo-1593113630400-ea428892f966?auto=format&fit=crop&w=800&q=60"
            alt="Volunteers preparing relief boxes"
            className="mt-8 h-56 w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
