# Shohojog — Social Development Events Platform

**Live Site:** https://your-live-site-url.vercel.app

Shohojog (meaning "helping hands") is a community-driven event management
platform where anyone can create, join and track social service events near
them — from winter clothes distributions to cleanup drives and plantations.

## Key Features

- **Create, Join & Track Events** — Any logged-in user can create a social
  service event (with future-date validation) and join events hosted by
  others; every join is stored in the database and visible in the *Joined
  Events* page, sorted by event date.
- **Secure Authentication** — Email/password registration with uppercase,
  lowercase and length validation, Google social login, protected private
  routes (page reloads never kick a logged-in user back to the login page)
  and JWT-based API authorization.
- **Owner-Only Event Management** — Organizers can update or delete their own
  events from the *Manage Events* page; ownership is enforced on the server
  with a dedicated owner-verification middleware.
- **Curated Home Experience** — Themed banner, feature showcase, latest six
  upcoming events straight from MongoDB, community photo gallery and a
  newsletter section.
- **Dark / Light Theme Toggle** — A single click switches the entire
  application between a warm light theme and a cosy dark theme.
- **Polished UX** — Responsive design for mobile/tablet/desktop, loading
  skeletons everywhere data is fetched, custom modal confirmations and toast
  notifications (never the default browser alert), and an intuitive profile
  update flow.

## Tech Stack

| Layer  | Technologies                                                        |
| ------ | -------------------------------------------------------------------- |
| Client | Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, BetterAuth  |
| API    | Express.js, TypeScript, MongoDB, JWT (jose)                          |

## Getting Started

```bash
# client
cd client && npm install && npm run dev

# server
cd server && npm install && npm run dev
```

Configure the environment files (`.env.local` for the client, `.env` for the
server) from the provided `.example` values: `MONGODB_URI`,
`BETTER_AUTH_SECRET`, Google OAuth credentials and the API base URL.
