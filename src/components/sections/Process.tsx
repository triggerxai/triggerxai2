import { useInView } from "react-intersection-observer";
import { Phone, Handshake, Target, Rocket } from "lucide-react";

interface ProcessProps {
  className?: string;
}

const Process = ({ className }: ProcessProps = {}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: Phone,
      number: "01",
      title: "Discovery Call",
      description:
        "Understand your business, goals, and automation opportunities.",
      duration: "45 mins",
    },
    {
      icon: Handshake,
      number: "02",
      title: "Kickoff Call",
      description:
        "Align on goals, confirm scope, and set clear next steps before execution.",
      duration: "30–40 mins",
    },
    {
      icon: Target,
      number: "03",
      title: "Strategy & System Design",
      description:
        "We map your AI workflows and build a custom execution plan.",
      duration: "2-3 days",
    },
    {
      icon: Rocket,
      number: "04",
      title: "Implementation & Scaling",
      description:
        "We deploy automation and optimize for real business results.",
      duration: "1-4 weeks",
    },
  ];

  return (
    <section
      id="process"
      className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 ${className || ""}`}
    >
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
            Our Process
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-4"
            style={{ color: "#6B7280" }}
          >
            A proven step-by-step system to design, build, and deploy AI
            automation inside your business.
          </p>
          <p
            className="text-sm tracking-widest uppercase"
            style={{ color: "#9CA3AF" }}
          >
            Trusted by founders and fast-growing businesses worldwide
          </p>
        </div>

        {/* Stacked Scroll Cards */}
        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="sticky"
              style={{
                top: `${120 + index * 40}px`,
                zIndex: index + 1,
                marginBottom: index < steps.length - 1 ? "60px" : "0",
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
                {/* Step number */}
                <span
                  className="text-xs font-mono tracking-widest mb-6 block"
                  style={{ color: "#9CA3AF" }}
                >
                  STEP {step.number}
                </span>

                {/* Icon */}
                <div className="mb-6">
                  <step.icon
                    className="w-7 h-7"
                    strokeWidth={1.5}
                    style={{ color: "#111111" }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#111111" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "#6B7280" }}
                >
                  {step.description}
                </p>

                {/* Duration */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {step.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
