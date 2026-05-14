import { useInView } from "react-intersection-observer";
import { Bot, Users, Mic, Video } from "lucide-react";

interface ProjectsProps {
  className?: string;
  onOpenROI?: () => void;
}

const projects = [
  {
    title: "AI Customer Support Chatbot",
    client: "Ecommerce store",
    description:
      "24/7 AI chatbot handling customer queries with 90% resolution rate without human intervention.",
    tools: ["OpenAI GPT", "WhatsApp API", "Zendesk", "Python"],
    results: "90% query resolution, 60% support cost reduction",
    image: "/lovable-uploads/ai-chatbot-case-study.png",
    category: "Chatbot Development",
    icon: Bot,
  },
  {
    title: "Lead Generation AI Agent",
    client: "Marketing Agency",
    description:
      "Intelligent lead scoring and outreach system that increased qualified leads by 300%.",
    tools: ["OpenAI", "LinkedIn API", "HubSpot", "n8n"],
    results: "300% increase in qualified leads, 45% conversion rate",
    image: "/lovable-uploads/lead-gen-case-study.png",
    category: "Lead Generation",
    icon: Users,
  },
  {
    title: "Voice AI Assistant",
    client: "Multi-Location Restaurant Business",
    description:
      "Voice-enabled ordering system that handles phone orders and reservations automatically.",
    tools: ["OpenAI Whisper", "ElevenLabs", "Twilio", "POS Integration"],
    results: "24/7 availability, 80% order accuracy improvement",
    image: "/lovable-uploads/voice-ai-case-study.png",
    category: "Voice AI",
    icon: Mic,
  },
  {
    title: "AI UGC Ad Creation System",
    client: "Ecommerce Brand",
    description:
      "AI system that turns one product image into multiple high-converting UGC video ads automatically.",
    tools: ["OpenAI", "Runway ML", "n8n", "CapCut API"],
    results: "10x faster ad production, 70% reduction in cost",
    image: "/lovable-uploads/voice-ai-case-study.png",
    category: "UGC Ads Automation",
    icon: Video,
  },
];

const Projects = ({ className, onOpenROI }: ProjectsProps = {}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="projects"
      className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 ${className || ""}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header — matches Our Process */}
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
            Success Stories
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-4"
            style={{ color: "#6B7280" }}
          >
            Real results from real businesses powered by our AI automation
            systems.
          </p>
          <p
            className="text-sm tracking-widest uppercase"
            style={{ color: "#9CA3AF" }}
          >
            Proven impact across industries
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className="will-change-transform"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? "rotateY(0deg) translateY(0px)"
                    : "rotateY(85deg) translateY(40px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.8s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${index * 200}ms`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="relative rounded-2xl p-7 transition-all duration-300 ease-out h-full flex flex-col group"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                  }}
                >
                  {/* Category badge with icon */}
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-lg"
                      style={{ backgroundColor: "rgba(15,23,42,0.08)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#1f2937" }} />
                    </div>
                    <span
                      className="text-xs font-medium tracking-wider uppercase"
                      style={{ color: "#94a3b8" }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold mb-3 leading-tight"
                    style={{ color: "#1f2937" }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-xs font-medium mb-4"
                    style={{ color: "#94a3b8" }}
                  >
                    {project.client}
                  </p>

                  <p
                    className="text-sm leading-relaxed mb-5 flex-grow"
                    style={{ color: "#6b7280" }}
                  >
                    {project.description}
                  </p>

                  {/* Results badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold self-start"
                    style={{
                      backgroundColor: "rgba(15,23,42,0.06)",
                      color: "#1f2937",
                      border: "1px solid rgba(15,23,42,0.1)",
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
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    {project.results}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onOpenROI}
            className="px-8 py-3.5 rounded-full text-sm md:text-base font-medium transition-all duration-300"
            style={{
              backgroundColor: "#111111",
              color: "#FFFFFF",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#222222";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#111111";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
            }}
          >
            Calculate How Much Revenue You're Losing
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
