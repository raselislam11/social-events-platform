import Link from "next/link";
import { CalendarCheck, HandHeart, MapPin, UsersRound } from "lucide-react";

const STATS = [
  { Icon: CalendarCheck, label: "Events hosted", value: "120+" },
  { Icon: UsersRound, label: "Active volunteers", value: "800+" },
  { Icon: MapPin, label: "Neighbourhoods", value: "25+" },
];

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-base-200">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=70")',
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="badge badge-primary badge-lg border-none text-sm font-semibold">
            Community • Compassion • Change
          </span>
          <h1 className="section-heading mt-4 !text-4xl md:!text-5xl lg:!text-6xl">
            Serve your community,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              one event at a time
            </span>
          </h1>
          <p className="section-subtext mt-5">
            Shohojog connects caring people from all over Dhaka to organize
            winter clothes distributions, cleanup drives, plantations and
            donation programs. Create an event, share it, and let volunteers
            join hands with you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/upcoming-events" className="btn btn-primary rounded-full px-7 h-12">
              <HandHeart className="h-5 w-5" />
              Explore Events
            </Link>
            <Link
              href="/create-event"
              className="btn btn-outline rounded-full px-7 h-12 border-base-content/25"
            >
              Create an Event
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {STATS.map(({ Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-2xl font-extrabold text-primary">
                  <Icon className="h-5 w-5" />
                  {value}
                </span>
                <span className="text-xs font-semibold opacity-70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden justify-self-end lg:block">
          { }
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=70"
            alt="Volunteers packing winter clothes for donation"
            className="h-[26rem] w-[34rem] rounded-box object-cover shadow-2xl"
          />
        </div>
      </div>

      <div className="relative border-t border-base-content/10 bg-primary/5 py-2">
        <p className="text-center text-sm font-medium">
          <span className="font-bold text-primary">Latest:</span> Blanket
          Distribution for the Needy — Mohammadpur, Dhaka
        </p>
      </div>
    </section>
  );
};

export default Banner;
