"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, SendHorizonal } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    setEmail("");
    toast.success("You are on the list! See you in your inbox.");
  }

  return (
    <section className="bg-base-200 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="card overflow-hidden border border-base-content/10 bg-gradient-to-br from-primary/90 to-primary text-primary-content shadow-xl">
          <div className="card-body items-center gap-4 p-8 text-center md:p-12">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/15">
              <Mail className="h-7 w-7" />
            </div>
            <h2 className="section-heading">Never miss a volunteer call</h2>
            <p className="max-w-xl opacity-85">
              Subscribe to our newsletter and get the newest social development
              events in your inbox every week. No spam, just community.
            </p>
            <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="input input-bordered h-12 flex-1 text-base-content"
                disabled={subscribed}
              />
              <button
                type="submit"
                disabled={subscribed}
                className="btn btn-neutral h-12 rounded-full px-8"
              >
                <SendHorizonal className="h-4 w-4" />
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
