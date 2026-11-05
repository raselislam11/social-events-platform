import { CalendarPlus, MapPinned, ShieldCheck, UserCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const FEATURES = [
  {
    Icon: CalendarPlus,
    title: "Create Events Easily",
    text: "Publish a social development event in under a minute — pick a type, add the location and a future date.",
  },
  {
    Icon: UserCheck,
    title: "Join With One Click",
    text: "Found an event near you? Log in and join instantly so organizers can count you in.",
  },
  {
    Icon: MapPinned,
    title: "Local & Location-Based",
    text: "Mirpur, Mohammadpur, Dhanmondi — discover social service events happening right around your neighbourhood.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe & Owner-Only Editing",
    text: "Advanced verification keeps data faithful. Manage your own events and never worry about others editing them.",
  },
];

const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <SectionHeading
        title="Why volunteers choose Shohojog"
        subtitle="A community-first platform built for NGOs, student clubs and everyday heroes."
      />

      <div className="card-grid mt-12">
        {FEATURES.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="card h-full border border-base-content/10 bg-base-100 shadow transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="card-body gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-box bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm leading-6 opacity-75">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
