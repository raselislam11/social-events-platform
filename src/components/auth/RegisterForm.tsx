"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { UserRoundPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { validateEmail, validatePassword, validateUrl } from "@/lib/validators";
import SocialButton from "./SocialLoginButton";

interface RegisterFormState {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}

const initialForm: RegisterFormState = {
  name: "",
  email: "",
  photoURL: "",
  password: "",
};

const passwordsRule =
  "Password must contain an uppercase letter, a lowercase letter and be at least 6 characters.";

const RegisterForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/";

  const [form, setForm] = useState<RegisterFormState>(initialForm);
  const [errors, setErrors] = useState<Partial<RegisterFormState>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function setField(field: keyof RegisterFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<RegisterFormState> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    const emailIssue = validateEmail(form.email);
    if (emailIssue) nextErrors.email = emailIssue;
    if (form.photoURL) {
      const urlIssue = validateUrl(form.photoURL);
      if (urlIssue) nextErrors.photoURL = "Photo URL must be a valid link";
    }
    const passwordIssue = validatePassword(form.password);
    if (passwordIssue) nextErrors.password = passwordIssue;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) {
      setFormError(passwordsRule);
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account...");
    authClient.signUp
      .email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.photoURL || undefined,
      })
      .then(({ error }) => {
        if (error) {
          const message = error.message ?? "Registration failed";
          toast.error(message, { id: toastId });
          setFormError(message);
          return;
        }
        toast.success("Registration successful", { id: toastId });
        Swal.fire({
          icon: "success",
          toast: true,
          position: "top-end",
          title: "Account created. Welcome to Shohojog!",
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

  const inputClass = (field: keyof RegisterFormState) =>
    `input input-bordered w-full ${errors[field] ? "input-error" : ""}`;

  return (
    <div className="card w-full max-w-md border border-base-content/10 bg-base-100 shadow-xl">
      <div className="card-body gap-4">
        <div className="text-center">
          <h1 className="section-heading !text-3xl">Join the movement</h1>
          <p className="mt-2 text-sm opacity-70">
            Create your account and start serving your community today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="reg-name">
              Name
            </label>
            <input
              id="reg-name"
              type="text"
              placeholder="Rasel Islam"
              autoComplete="name"
              className={inputClass("name")}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
          </div>

          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="reg-email">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass("email")}
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
          </div>

          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="reg-photo">
              Photo URL
            </label>
            <input
              id="reg-photo"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              className={inputClass("photoURL")}
              value={form.photoURL}
              onChange={(e) => setField("photoURL", e.target.value)}
            />
            {errors.photoURL && <p className="mt-1 text-xs text-error">{errors.photoURL}</p>}
          </div>

          <div>
            <label className="label mb-1 block text-sm font-semibold" htmlFor="reg-password">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={inputClass("password")}
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
            />
            {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
          </div>

          {formError && (
            <div className="alert alert-error py-2 text-sm">
              <span>{formError}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-block">
            <UserRoundPlus className="h-4 w-4" />
            {loading ? "Registering..." : "Create account"}
          </button>
        </form>

        <div className="flex items-center gap-3 text-xs opacity-50">
          <span className="h-px flex-1 bg-base-content/20" />
          OR
          <span className="h-px flex-1 bg-base-content/20" />
        </div>

        <SocialButton callbackUrl={redirect} />

        <p className="text-center text-sm opacity-80">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
