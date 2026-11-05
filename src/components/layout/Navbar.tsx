"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck, CalendarPlus, ChevronDown, ClipboardList, LogIn, LogOut, Menu, UserRound, type LucideIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { clearJwtToken } from "@/lib/api";
import { useMyEvents, useMyJoins } from "@/hooks/useEvents";
import ThemeToggle from "./ThemeToggle";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => setProfileOpen(false), [pathname]);
  useEffect(() => setMenuOpen(false), [pathname]);

  const user = session?.user;
  const { events } = useMyEvents();
  const { joins } = useMyJoins();

  async function handleLogout() {
    await authClient.signOut();
    clearJwtToken();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `btn btn-sm rounded-full ${
      isActive(href) ? "btn-primary" : "btn-ghost"
    }`;

  interface DropdownItem {
    href: string;
    label: string;
    icon: LucideIcon;
    count?: number | null;
  }

  const dropdownLinks: DropdownItem[] = [
    { href: "/create-event", label: "Create Event", icon: CalendarPlus },
    {
      href: "/manage-events",
      label: "Manage Events",
      icon: ClipboardList,
      count: events?.length ?? null,
    },
    {
      href: "/joined-events",
      label: "Joined Events",
      icon: CalendarCheck,
      count: joins?.length ?? null,
    },
    { href: "/profile", label: "My Profile", icon: UserRound },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-base-content/10 bg-base-100/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4">
        <Link href="/" className="flex items-center gap-2">
          { }
          <img src="/logo.svg" alt="Shohojog logo" className="h-9 w-9" />
          <span className="text-xl font-extrabold tracking-tight">
            Shoho<span className="text-primary">jog</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {PUBLIC_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-24 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div className="flex items-center">
                <button
                  type="button"
                  tabIndex={0}
                  title={user.name ?? "Profile"}
                  aria-label="Open profile menu"
                  onClick={() => setProfileOpen((open) => !open)}
                  className="btn btn-circle btn-ghost ring-2 ring-primary/40 ring-offset-1 ring-offset-base-100"
                >
                  { }
                  <img
                    src={user.image ?? "/logo.svg"}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </button>
                <button
                  type="button"
                  tabIndex={0}
                  aria-label="Toggle profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((open) => !open)}
                  className="btn btn-sm btn-ghost gap-0 px-1"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {profileOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content z-50 mt-3 w-64 rounded-box border border-base-content/10 bg-base-200 p-3 shadow-lg"
                >
                  <li className="menu-title flex flex-row items-center gap-2 normal-case">
                    { }
                    <img
                      src={user.image ?? "/logo.svg"}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="flex flex-col">
                      <span className="truncate text-sm font-bold text-base-content">
                        {user.name}
                      </span>
                      <span className="truncate text-xs font-normal opacity-60">
                        {user.email}
                      </span>
                    </span>
                  </li>
                  <div className="my-1 h-px w-full bg-base-content/10" />
                  {dropdownLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setProfileOpen(false)}>
                        <item.icon className="h-4 w-4" />
                        {item.label}
                        {typeof item.count === "number" && (
                          <span className="ml-auto badge badge-sm badge-primary badge-outline font-bold">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                  <div className="my-1 h-px w-full bg-base-content/10" />
                  <li>
                    <button type="button" onClick={handleLogout} className="text-error">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm rounded-full px-6">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="btn btn-ghost btn-circle md:hidden lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mx-4 mb-3 flex flex-col gap-1 rounded-box border border-base-content/10 bg-base-200 p-2 shadow md:hidden lg:hidden">
          {PUBLIC_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              {dropdownLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="btn btn-ghost btn-sm justify-start rounded-full"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {typeof item.count === "number" && (
                    <span className="ml-auto badge badge-sm badge-primary badge-outline font-bold">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-ghost btn-sm justify-start rounded-full text-error"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
