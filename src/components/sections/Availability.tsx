import { useInView } from "react-intersection-observer";
import { Briefcase, Users, GraduationCap, Lightbulb } from "lucide-react";

interface AvailabilityProps {
  className?: string;
}

const availabilityOptions = [
  {
    number: "01",
    title: "Direct B2B Projects",
    description: "Business AI implementation tailored to your operations and goals.",
    icon: Briefcase,
  },
  {
    number: "02",
    title: "Agency Partnerships",
    description: "Collaborative AI solutions for agencies and their clients.",
    icon: Users,
  },
  {
    number: "03",
    title: "AI Education",
    description: "Hands-on training and workshops for teams adopting AI.",
    icon: GraduationCap,
  },
  {
    number: "04",
    title: "AI Consulting",
    description: "Strategic advisory to identify and prioritize AI opportunities.",
    icon: Lightbulb,
  },
];

const Availability = ({ className }: AvailabilityProps = {}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 ${className || ""}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-14 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
            style={{ color: "#111111" }}
          >
            We Are Available For
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-4"
            style={{ color: "#6B7280" }}
          >
            Whether you need a build partner or a strategic advisor, we've got
            you covered.
          </p>
          <p
            className="text-sm tracking-widest uppercase"
            style={{ color: "#9CA3AF" }}
          >
            Flexible engagement models
          </p>
        </div>

        {/* Stacked Scroll Cards */}
        <div className="relative">
          {availabilityOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={option.number}
                className="sticky"
                style={{
                  top: `${120 + index * 40}px`,
                  zIndex: index + 1,
                  marginBottom: index < availabilityOptions.length - 1 ? "60px" : "0",
                }}
              >
                <div
                  className={`rounded-2xl p-8 lg:p-10 transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: `0 ${8 + index * 4}px ${30 + index * 10}px rgba(0,0,0,${0.06 + index * 0.03})`,
                  }}
                >
                  {/* Number */}
                  <span
                    className="text-xs font-mono tracking-widest mb-6 block"
                    style={{ color: "#9CA3AF" }}
                  >
                    {option.number}
                  </span>

                  {/* Icon */}
                  <div className="mb-6">
                    <Icon
                      className="w-7 h-7"
                      strokeWidth={1.5}
                      style={{ color: "#111111" }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: "#111111" }}
                  >
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#6B7280" }}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Availability;
