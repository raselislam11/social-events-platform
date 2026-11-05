"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { validateEmail } from "@/lib/validators";
import SocialButton from "./SocialLoginButton";

const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const emailIssue = validateEmail(email);
    setEmailError(emailIssue);
    if (emailIssue) return;
    if (!password) {
      setFormError("Password is required");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging you in...");
    authClient.signIn
      .email({ email, password })
      .then(({ error }) => {
        if (error) {
          toast.error(error.message ?? "Login failed", { id: toastId });
          setFormError(error.message ?? "Login failed");
          return;
        }
        toast.success("Login successful", { id: toastId });
        return Swal.fire({
          icon: "success",
          toast: true,
          position: "top-end",
          title: "Welcome back!",
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true,
        }).then(() => {
          router.push(redirect);
          router.refresh();
        });
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="card w-full max-w-md border border-base-content/10 bg-base-100 shadow-xl">
      <div className="card-body gap-4">
        <div className="text-center">
          <h1 className="section-heading !text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm opacity-70">
            Log in to create events, volunteer and make an impact.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={`input input-bordered w-full ${emailError ? "input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="mt-1 text-xs text-error">{emailError}</p>}
          </div>

          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {formError && (
            <div className="alert alert-error py-2 text-sm">
              <span>{formError}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-block">
            <LogIn className="h-4 w-4" />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs opacity-50">
          <span className="h-px flex-1 bg-base-content/20" />
          OR
          <span className="h-px flex-1 bg-base-content/20" />
        </div>

        <SocialButton callbackUrl={redirect} />

        <p className="text-center text-sm opacity-80">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="link link-primary font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
