"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import SectionHeading from "@/components/shared/SectionHeading";
import { authClient } from "@/lib/auth-client";
import { validateUrl } from "@/lib/validators";

function ProfileContent() {
  const router = useRouter();
  const { data: session, refetch: refetchSession } = authClient.useSession();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [errors, setErrors] = useState<{ name?: string; photoURL?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session) return;
    setName(session.user.name ?? "");
    setPhotoURL(session.user.image ?? "");
  }, [session]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { name?: string; photoURL?: string } = {};
    if (!name.trim()) nextErrors.name = "Name is required";
    if (photoURL.trim()) {
      const urlIssue = validateUrl(photoURL);
      if (urlIssue) nextErrors.photoURL = "Photo must be a valid http(s) URL";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: photoURL.trim() || undefined,
      });
      if (error) {
        toast.error(error.message ?? "Could not update profile");
      } else {
        toast.success("Profile updated successfully!");
        refetchSession();
        router.refresh();
      }
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const user = session?.user;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <SectionHeading
        title="My profile"
        subtitle="This is how the community sees you. Keep your name and photo up to date."
      />

      <div className="card mx-auto mt-10 w-full border border-base-content/10 bg-base-100 shadow-xl">
        <div className="card-body gap-5">
          <div className="flex items-center gap-4">
            { }
            <img
              src={user.image ?? "/logo.svg"}
              alt={user.name}
              className="h-20 w-20 rounded-full border-2 border-primary/60 object-cover"
            />
            <div>
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-sm opacity-70">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4" noValidate>
            <div>
              <label className="label mb-1 block text-sm font-semibold" htmlFor="profile-name">
                Display Name
              </label>
              <input
                id="profile-name"
                type="text"
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
              {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
            </div>

            <div>
              <label className="label mb-1 block text-sm font-semibold" htmlFor="profile-image">
                Profile Picture URL
              </label>
              <input
                id="profile-image"
                type="url"
                className={`input input-bordered w-full ${errors.photoURL ? "input-error" : ""}`}
                value={photoURL}
                onChange={(e) => {
                  setPhotoURL(e.target.value);
                  setErrors((prev) => ({ ...prev, photoURL: undefined }));
                }}
              />
              {errors.photoURL && <p className="mt-1 text-xs text-error">{errors.photoURL}</p>}
            </div>

            <button type="submit" disabled={saving} className="btn btn-primary btn-block">
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
};

export default ProfilePage;
