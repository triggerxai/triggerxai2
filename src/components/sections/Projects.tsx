import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowLeft, ArrowRight, Scale, TrendingUp, ShoppingBag, ShieldCheck, X, Rocket } from "lucide-react";
import lawFirmImg from "@/assets/case-law-firm.png";
import peImg from "@/assets/case-private-equity.png";
import elaraImg from "@/assets/case-elara-dashboard.png";
import insuranceImg from "@/assets/case-insurance.png";

interface ProjectsProps {
  className?: string;
  onOpenROI?: () => void;
}

interface CaseDetail {
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  techStack: { label: string; value: string; description: string }[];
  roi: string;
}

interface CaseStudy {
  category: string;
  company: string;
  location: string;
  system: string;
  icon: typeof Scale;
  image: string | null;
  tint: string;
  ring: string;
  detail: CaseDetail;
}

const placeholder = "Placeholder text here. Add your detailed case study content for this section.";

const caseStudies: CaseStudy[] = [
  {
    category: "Law Firm",
    company: "Hargrove & Ellison LLP",
    location: "New York, NY",
    system: "AI-Powered Client CRM & Case Pipeline",
    icon: Scale,
    image: lawFirmImg,
    tint: "#F3EEFF",
    ring: "#E5D9FF",
    detail: {
      overview: placeholder,
      challenge: placeholder,
      solution: placeholder,
      results: placeholder,
      techStack: [
        { label: "IDE", value: "Claude Code", description: "AI-native terminal IDE. Every line of this system was scaffolded, debugged, and deployed through Claude Code. It's not an assistant — [...]" },
        { label: "Backend", value: "Node.js + Express", description: "REST API architecture. Hosted on Railway with auto-deploy from GitHub. Handles all case logic, status transitions, and webhook[...]" },
        { label: "Database", value: "PostgreSQL via Supabase", description: "Row-level security enforced at the DB layer — each attorney only sees their own client data. Real-time subscriptions [...]" },
        { label: "Auth", value: "Supabase Auth", description: "Role-based access control with three tiers: Partner (full access), Associate (assigned cases only), Paralegal (read + document upload[...]" },
        { label: "AI Layer", value: "Claude API (Anthropic)", description: "Powers three core features: automatic case summary generation on intake, AI-drafted follow-up emails based on case stage[...]" },
        { label: "Automations", value: "n8n (self-hosted)", description: "Workflow engine running on a private VPS. Triggers fire on Supabase webhooks — e.g. when a case moves to Pre-Trial, n8n [...]" },
        { label: "Email", value: "Resend API", description: "Transactional email delivery. All client-facing follow-up emails route through Resend with open tracking and bounce handling." },
        { label: "Frontend", value: "Next.js + Tailwind CSS", description: "Server-side rendered dashboard. Clean, minimal UI built to match the firm's existing brand identity." },
        { label: "Hosting", value: "Vercel + Railway", description: "Frontend on Vercel (edge-deployed, zero cold starts). Backend API on Railway with environment variable management and private n[...]" },
      ],
      roi: placeholder,
    },
  },
  {
    category: "Private Equity Firm",
    company: "Vantage Capital Partners",
    location: "Chicago, IL",
    system: "Central Portfolio Intelligence Dashboard",
    icon: TrendingUp,
    image: peImg,
    tint: "#EEF7E0",
    ring: "#DCEFC0",
    detail: {
      overview: placeholder,
      challenge: placeholder,
      solution: placeholder,
      results: placeholder,
      techStack: [
        { label: "IDE", value: "Claude Code", description: "AI-native terminal IDE. Every line of this system was scaffolded, debugged, and deployed through Claude Code. It's not an assistant — [...]" },
        { label: "Data Ingestion", value: "Python ETL — Pandas + SQLAlchemy", description: "14 separate data pipelines, one per portfolio company. Mix of REST API integrations, SFTP CSV ingestio[...]" },
        { label: "Database", value: "PostgreSQL on Supabase", description: "Materialized views pre-aggregate portfolio metrics for sub-100ms dashboard load times. Schema versioned with Alembic. Fu[...]" },
        { label: "AI Deal Scoring", value: "Claude API (Anthropic)", description: "Deal teasers (PDFs or text) are parsed and passed to Claude with a structured prompt containing Vantage's histori[...]" },
        { label: "Report Generation", value: "Python-docx + Jinja2", description: "Quarterly board reports auto-generated from live DB data. Jinja2 templates handle narrative sections; python-docx[...]" },
        { label: "Frontend", value: "React + Recharts + AG Grid", description: "IRR trend charts and AUM waterfall in Recharts. Portfolio company table in AG Grid (enables column sorting, filterin[...]" },
        { label: "Auth", value: "Auth0", description: "Partner-level accounts require hardware MFA (YubiKey or Authenticator app). JWT tokens short-lived (15 min) with refresh token rotation. Role[...]" },
        { label: "Scheduler", value: "APScheduler on AWS EC2", description: "Nightly ETL jobs at 2AM CT. Failure alerts fire to a dedicated Slack channel via webhook. Missed jobs trigger a retry a[...]" },
        { label: "Hosting", value: "AWS EC2 + Vercel + Supabase", description: "ETL and report generation on a t3.medium EC2 instance. Frontend on Vercel (global CDN). DB on Supabase managed Postg[...]" },
      ],
      roi: placeholder,
    },
  },
  {
    category: "E-Commerce / Retail Brand",
    company: "Elara Home & Living",
    location: "Los Angeles, CA",
    system: "AI Customer Retention & Post-Purchase Automation Dashboard",
    icon: ShoppingBag,
    image: elaraImg,
    tint: "#FFF3E8",
    ring: "#FCE2CB",
    detail: {
      overview: "Elara Home & Living is a fast-growing e-commerce brand focused on premium home decor and lifestyle products. Despite strong traffic and steady order volume, the company was losing significant revenue due to abandoned carts, weak customer retention, and inconsistent post-purchase engagement.\n\nWe built a fully automated AI-powered retention system that segments customers, personalizes communication, and maximizes customer lifetime value without requiring manual marketing intervention.",
      challenge: "The team faced several growth bottlenecks:\n\n• High abandoned cart rate (30%+ of initiated checkouts)\n• Low repeat purchase frequency (1.2 orders per customer annually)\n• Generic email campaigns with poor engagement (2.1% open rate)\n• No customer segmentation strategy\n• Limited visibility into retention performance\n• Manual campaign management consuming 40+ marketing hours weekly",
      solution: "We designed and deployed a complete AI-powered retention infrastructure that automatically:\n\n• Detects abandoned carts in real time via Shopify webhooks\n• Segments customers based on RFM (Recency, Frequency, Monetary) analysis\n• Generates AI-powered product recommendations using purchase history\n• Launches personalized email and SMS campaigns via Klaviyo\n• Tracks revenue attribution per automation flow\n• Provides a live performance dashboard for the marketing team\n\nThe system processes 100% of customer events and operates continuously with zero manual intervention.",
      results: "• Increased customer retention by 34% (repeat purchase rate improved from 1.2 to 1.6 orders/customer)\n• Abandoned cart recovery revenue: $115,000+ per 90 days\n• Post-purchase email open rate improved to 68% (from 2.1%)\n• Reduced manual campaign management by 85% (4 hours/week vs 40 hours/week)\n• AI recommendations driving 4.2x higher average order value\n• Dashboard provides real-time ROI tracking per automation flow",
      techStack: [
        { label: "AI Development", value: "Claude Code", description: "AI-native development environment used to scaffold, debug, and deploy the entire system." },
        { label: "Events & Webhooks", value: "Shopify Admin API", description: "Connected real-time customer and order activity through orders/create, customers/update, checkouts/create webhooks." },
        { label: "Customer Communication", value: "Klaviyo API", description: "Handles email automation, SMS automation, dynamic segmentation, and personalized campaign delivery at scale." },
        { label: "AI Personalization", value: "Claude API (Anthropic)", description: "Generates product recommendations, personalizes email content, and creates segment-specific retention messaging." },
        { label: "Customer Segmentation", value: "Python RFM Engine", description: "Automatically classifies customers into VIP, At-Risk, New, and Lapsed segments based on purchasing behavior." },
        { label: "Database", value: "PostgreSQL", description: "Stores customer segment history, AI-generated content cache, automation event logs, and revenue attribution data." },
        { label: "Event Processing", value: "Express.js", description: "Handles Shopify webhook validation, event routing, and automation trigger logic." },
        { label: "Analytics Dashboard", value: "Next.js", description: "Marketing team dashboard showing revenue by automation, segment growth trends, AI recommendation performance, and retention metrics." },
        { label: "Infrastructure", value: "Railway + Vercel", description: "Python services and Express backend on Railway. Dashboard and frontend on Vercel for global CDN delivery." },
      ],
      roi: "The system generated $115,000+ in abandoned cart recovery revenue within the first 90 days, with an implementation cost of $8,500. This represents a 1,353% ROI in the first quarter alone. Ongoing operational cost is minimal (under $200/month for infrastructure).",
    },
  },
  {
    category: "Insurance Agency",
    company: "Pinnacle Risk Advisors",
    location: "Atlanta, GA",
    system: "AI Voice Agent & Policy Renewal Automation System",
    icon: ShieldCheck,
    image: insuranceImg,
    tint: "#E8F2FF",
    ring: "#CFE2FB",
    detail: {
      overview: placeholder,
      challenge: placeholder,
      solution: placeholder,
      results: placeholder,
      techStack: [{ label: "Tech Stack", value: "Coming soon", description: placeholder }],
      roi: placeholder,
    },
  },
];

const Projects = ({ className }: ProjectsProps = {}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const updateState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (card) {
      const step = card.offsetWidth + 24;
      setActiveIndex(Math.round(el.scrollLeft / step));
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const openCase = openIndex !== null ? caseStudies[openIndex] : null;

  return (
    <section
      id="projects"
      className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 ${className || ""}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`flex items-end justify-between gap-6 mb-10 md:mb-12 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center md:text-left flex-1">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
              style={{ color: "#111111" }}
            >
              Case Studies
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mb-2"
              style={{ color: "#6B7280" }}
            >
              Real results from real businesses powered by our AI automation systems.
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(15,23,42,0.08)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
              }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: "#1f2937" }} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: "#111111",
                border: "1px solid #111111",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
              }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <style>{`section#projects div::-webkit-scrollbar{display:none;}`}</style>

          {caseStudies.map((cs, index) => {
            const Icon = cs.icon;
            const isActive = index === activeIndex;
            return (
              <div
                key={cs.company}
                data-card
                className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] will-change-transform"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? `translateY(0) scale(${isActive ? 1 : 0.96})`
                    : "translateY(40px)",
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                <div
                  className="relative rounded-3xl p-2.5 h-full flex flex-col transition-all duration-300 ease-out group cursor-pointer"
                  style={{
                    background: cs.tint,
                    border: `1px solid ${cs.ring}`,
                    boxShadow: isActive
                      ? "0 18px 38px rgba(17,17,17,0.09)"
                      : "0 8px 22px rgba(17,17,17,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 22px 44px rgba(17,17,17,0.11)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isActive
                      ? "0 18px 38px rgba(17,17,17,0.09)"
                      : "0 8px 22px rgba(17,17,17,0.05)";
                  }}
                  onClick={() => setOpenIndex(index)}
                >
                  {/* Image area — show full image with contain */}
                  <div
                    className="rounded-2xl overflow-hidden relative"
                    style={{
                      aspectRatio: "16 / 10",
                      background: `linear-gradient(135deg, ${cs.tint} 0%, rgba(255,255,255,0.85) 100%)`,
                      border: `1px solid ${cs.ring}`,
                    }}
                  >
                    {cs.image ? (
                      <img
                        src={cs.image}
                        alt={`${cs.company} — ${cs.system}`}
                        loading="lazy"
                        className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{
                          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.75)",
                            border: `1px solid ${cs.ring}`,
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 6px 18px rgba(17,17,17,0.06)",
                          }}
                        >
                          <Icon className="w-8 h-8" style={{ color: "#1f2937", opacity: 0.75 }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="rounded-2xl p-4 mt-2.5 flex flex-col flex-grow"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 2px 10px rgba(17,17,17,0.04)",
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1.5"
                      style={{ color: "#9CA3AF" }}
                    >
                      {cs.category}
                    </span>
                    <h3
                      className="text-lg font-bold leading-snug mb-1"
                      style={{ color: "#111111" }}
                    >
                      {cs.company}
                    </h3>
                    <p className="text-xs mb-1" style={{ color: "#374151", fontWeight: 500 }}>
                      {cs.location}
                    </p>
                    <p
                      className="text-xs leading-relaxed mb-4 flex-grow"
                      style={{ color: "#6B7280" }}
                    >
                      {cs.system}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenIndex(index);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 self-start hover:gap-2"
                      style={{ color: "#111111" }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(15,23,42,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "#1f2937" }} />
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40"
            style={{ background: "#111111" }}
          >
            <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {openCase && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{
            background: "rgba(17,17,17,0.55)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.25s ease-out",
          }}
          onClick={() => setOpenIndex(null)}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
          `}</style>
          <div
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${openCase.tint} 0%, #FFFFFF 60%)`,
              border: `1px solid ${openCase.ring}`,
              boxShadow: "0 30px 80px rgba(17,17,17,0.25)",
              animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            >
              <X className="w-4 h-4" style={{ color: "#1f2937" }} />
            </button>

            <div className="p-8 sm:p-10 flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: `1px solid ${openCase.ring}`,
                  boxShadow: "0 10px 30px rgba(17,17,17,0.08)",
                  animation: "floatY 3s ease-in-out infinite",
                }}
              >
                <Rocket className="w-9 h-9" style={{ color: "#111111" }} />
              </div>
              <style>{`@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>

              <span
                className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                style={{ color: "#6B7280" }}
              >
                {openCase.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight" style={{ color: "#111111" }}>
                🚀 Coming Soon
              </h3>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "#374151" }}>
                We're currently preparing this case study. Check back soon for the full breakdown, results, tech stack, and implementation details.
              </p>

              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.03]"
                style={{
                  background: "#111111",
                  color: "#ffffff",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-7">
    <h4
      className="text-xs font-bold tracking-[0.18em] uppercase mb-3 pb-2"
      style={{ color: "#111111", borderBottom: "1px solid rgba(17,17,17,0.08)" }}
    >
      {title}
    </h4>
    {children}
  </div>
);

export default Projects;
