import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowLeft, ArrowRight, Scale, TrendingUp, ShoppingBag, ShieldCheck, X } from "lucide-react";
import lawFirmImg from "@/assets/case-law-firm.png";
import peImg from "@/assets/case-private-equity.png";

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
        { label: "IDE", value: "Claude Code", description: "AI-native terminal IDE. Every line of this system was scaffolded, debugged, and deployed through Claude Code. It's not an assistant — it's our core build environment." },
        { label: "Backend", value: "Node.js + Express", description: "REST API architecture. Hosted on Railway with auto-deploy from GitHub. Handles all case logic, status transitions, and webhook ingestion." },
        { label: "Database", value: "PostgreSQL via Supabase", description: "Row-level security enforced at the DB layer — each attorney only sees their own client data. Real-time subscriptions used for live case status updates." },
        { label: "Auth", value: "Supabase Auth", description: "Role-based access control with three tiers: Partner (full access), Associate (assigned cases only), Paralegal (read + document upload)." },
        { label: "AI Layer", value: "Claude API (Anthropic)", description: "Powers three core features: automatic case summary generation on intake, AI-drafted follow-up emails based on case stage, and deadline risk flagging from document content." },
        { label: "Automations", value: "n8n (self-hosted)", description: "Workflow engine running on a private VPS. Triggers fire on Supabase webhooks — e.g. when a case moves to Pre-Trial, n8n sends a templated client email via Resend." },
        { label: "Email", value: "Resend API", description: "Transactional email delivery. All client-facing follow-up emails route through Resend with open tracking and bounce handling." },
        { label: "Frontend", value: "Next.js + Tailwind CSS", description: "Server-side rendered dashboard. Clean, minimal UI built to match the firm's existing brand identity." },
        { label: "Hosting", value: "Vercel + Railway", description: "Frontend on Vercel (edge-deployed, zero cold starts). Backend API on Railway with environment variable management and private networking." },
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
        { label: "IDE", value: "Claude Code", description: "AI-native terminal IDE. Every line of this system was scaffolded, debugged, and deployed through Claude Code. It's not an assistant — it's our core build environment." },
        { label: "Data Ingestion", value: "Python ETL — Pandas + SQLAlchemy", description: "14 separate data pipelines, one per portfolio company. Mix of REST API integrations, SFTP CSV ingestion, and QuickBooks Online API for financial data. Runs nightly via APScheduler." },
        { label: "Database", value: "PostgreSQL on Supabase", description: "Materialized views pre-aggregate portfolio metrics for sub-100ms dashboard load times. Schema versioned with Alembic. Full audit log on all data mutations." },
        { label: "AI Deal Scoring", value: "Claude API (Anthropic)", description: "Deal teasers (PDFs or text) are parsed and passed to Claude with a structured prompt containing Vantage's historical acquisition criteria. Returns a 0–100 fit score with reasoning breakdown by category." },
        { label: "Report Generation", value: "Python-docx + Jinja2", description: "Quarterly board reports auto-generated from live DB data. Jinja2 templates handle narrative sections; python-docx handles table population and formatting. Output is a fully formatted Word document." },
        { label: "Frontend", value: "React + Recharts + AG Grid", description: "IRR trend charts and AUM waterfall in Recharts. Portfolio company table in AG Grid (enables column sorting, filtering, and export). All data fetched from Supabase REST API." },
        { label: "Auth", value: "Auth0", description: "Partner-level accounts require hardware MFA (YubiKey or Authenticator app). JWT tokens short-lived (15 min) with refresh token rotation. Role-based access: Partner vs Analyst vs Viewer." },
        { label: "Scheduler", value: "APScheduler on AWS EC2", description: "Nightly ETL jobs at 2AM CT. Failure alerts fire to a dedicated Slack channel via webhook. Missed jobs trigger a retry after 30 minutes." },
        { label: "Hosting", value: "AWS EC2 + Vercel + Supabase", description: "ETL and report generation on a t3.medium EC2 instance. Frontend on Vercel (global CDN). DB on Supabase managed Postgres with daily backups." },
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
    image: null,
    tint: "#FFF3E8",
    ring: "#FCE2CB",
    detail: {
      overview: placeholder,
      challenge: placeholder,
      solution: placeholder,
      results: placeholder,
      techStack: [{ label: "Tech Stack", value: "Coming soon", description: placeholder }],
      roi: placeholder,
    },
  },
  {
    category: "Insurance Agency",
    company: "Pinnacle Risk Advisors",
    location: "Atlanta, GA",
    system: "AI Voice Agent & Policy Renewal Automation System",
    icon: ShieldCheck,
    image: null,
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
      <div className="max-w-5xl mx-auto">
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
                className="snap-start shrink-0 w-[82%] sm:w-[66%] md:w-[calc((100%-1.5rem)/2)] will-change-transform"
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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: `linear-gradient(180deg, ${openCase.tint} 0%, #FFFFFF 35%)`,
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

            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="mb-8">
                <span
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "#6B7280" }}
                >
                  {openCase.category}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight" style={{ color: "#111111" }}>
                  {openCase.company}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "#374151" }}>
                  {openCase.location} · {openCase.system}
                </p>
              </div>

              {/* Image */}
              {openCase.image && (
                <div
                  className="rounded-2xl overflow-hidden mb-8"
                  style={{
                    background: `linear-gradient(135deg, ${openCase.tint} 0%, rgba(255,255,255,0.85) 100%)`,
                    border: `1px solid ${openCase.ring}`,
                  }}
                >
                  <img
                    src={openCase.image}
                    alt={openCase.company}
                    className="w-full h-auto object-contain p-4"
                    style={{ maxHeight: "420px" }}
                  />
                </div>
              )}

              {/* Sections */}
              {[
                { title: "Company Overview", body: openCase.detail.overview },
                { title: "Challenge", body: openCase.detail.challenge },
                { title: "Solution", body: openCase.detail.solution },
                { title: "Results", body: openCase.detail.results },
              ].map((s) => (
                <Section key={s.title} title={s.title}>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#374151" }}>
                    {s.body}
                  </p>
                </Section>
              ))}

              {/* Tech Stack */}
              <Section title="Tech Stack">
                <div className="grid gap-3 sm:grid-cols-2">
                  {openCase.detail.techStack.map((t) => (
                    <div
                      key={t.label + t.value}
                      className="rounded-2xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: `1px solid ${openCase.ring}`,
                      }}
                    >
                      <div
                        className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1"
                        style={{ color: "#9CA3AF" }}
                      >
                        {t.label}
                      </div>
                      <div className="text-sm font-bold mb-1.5" style={{ color: "#111111" }}>
                        {t.value}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                        {t.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="ROI / Business Impact">
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#374151" }}>
                  {openCase.detail.roi}
                </p>
              </Section>
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
