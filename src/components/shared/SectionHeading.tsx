interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className = "" }: SectionHeadingProps) => {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="section-heading">{title}</h2>
      <span className="section-heading-accent" aria-hidden="true" />
      {subtitle ? (
        <p className="section-subtext mx-auto mt-3">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
