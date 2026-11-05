import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-7xl font-black tracking-tighter text-primary">404</p>
      <h1 className="section-heading">Page not found</h1>
      <p className="max-w-md text-sm opacity-70">
        The page you are looking for has moved, been removed, or never existed.
        Let&apos;s get you back to something meaningful.
      </p>
      <Link href="/" className="btn btn-primary mt-2">
        Back to home
      </Link>
    </div>
  );
}
