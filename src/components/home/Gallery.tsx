import SectionHeading from "@/components/shared/SectionHeading";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=60",
    alt: "Volunteers sorting donated winter clothes",
  },
  {
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=800&q=60",
    alt: "Team of volunteers packing relief boxes",
  },
  {
    src: "https://images.unsplash.com/photo-1593113630400-ea428892f966?auto=format&fit=crop&w=800&q=60",
    alt: "Community members preparing donation packages",
  },
  {
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Planning session before a community cleanup drive",
  },
  {
    src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Volunteers discussing the next plantation program",
  },
  {
    src: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Organizers spreading awareness about an event",
  },
  {
    src: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Volunteers coordinating an event schedule together",
  },
  {
    src: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Community organizers celebrating a successful drive",
  },
  {
    src: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Volunteers sharing responsibilities for a donation event",
  },
];

const Gallery = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <SectionHeading
        title="Moments from our drives"
        subtitle="Real photographs of our community organizing, organizing relief packages and celebrating volunteers."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {PHOTOS.map((photo, index) => (
          <div
            key={photo.src}
            className={`group relative aspect-square overflow-hidden rounded-box border border-base-content/10 ${
              index === 0 ? "col-span-2 aspect-auto md:aspect-square" : ""
            }`}
          >
            { }
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="absolute bottom-0 translate-y-2 p-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {photo.alt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
