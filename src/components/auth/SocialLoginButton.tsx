"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SocialButton = ({ callbackUrl = "/" }: { callbackUrl?: string }) => {
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch {
      toast.error("Google login failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="btn btn-outline btn-block"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M12 5.29c1.99 0 3.3.86 4.06 1.62l3.02-3.02C17.22 2.11 14.83 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.56 2.77C6.62 7.17 9.07 5.29 12 5.29z"
        />
        <path
          fill="#4285F4"
          d="M23.5 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.55 5.55 0 0 1-2.41 3.62l3.7 2.87c2.17-2 3.74-4.96 3.74-8.73z"
        />
        <path
          fill="#FBBC05"
          d="M5.74 14.16A7.16 7.16 0 0 1 5.36 12c0-.75.13-1.47.36-2.16l-3.55-2.76A11.55 11.55 0 0 0 .5 12c0 1.85.44 3.6 1.24 5.19l3.99-.29c-.45-.8-.79-1.71-.99-.74z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.7-2.87c-1.02.69-2.3 1.09-3.58 1.09-2.93 0-5.38-1.88-6.26-4.5l-3.99 3.07C3.99 20.53 7.7 23 12 23z"
        />
      </svg>
      {loading ? "Redirecting..." : "Continue with Google"}
    </button>
  );
};

export default SocialButton;
