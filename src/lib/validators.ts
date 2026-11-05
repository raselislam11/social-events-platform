export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  return null;
}

export function validateUrl(url: string): string | null {
  if (!url) return "Thumbnail URL is required";
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "Thumbnail must be a valid http(s) URL";
    }
    return null;
  } catch {
    return "Thumbnail must be a valid image URL";
  }
}

export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
  return null;
}

export function validateFutureDate(dateInput: string): string | null {
  if (!dateInput) return "Event date is required";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(dateInput);
  chosen.setHours(0, 0, 0, 0);
  if (Number.isNaN(chosen.getTime())) return "Event date is invalid";
  if (chosen < today) return "Event date cannot be in the past";
  return null;
}

export function isEventPast(dateInput: string): boolean {
  const endOfDay = new Date(dateInput);
  if (Number.isNaN(endOfDay.getTime())) return false;
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < Date.now();
}
