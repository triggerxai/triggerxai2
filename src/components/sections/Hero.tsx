import { useEffect, useState } from "react";
import { LineChart, TrendingUp, Hourglass, UsersRound, ClipboardCheck, type LucideIcon } from "lucide-react";

type HeroCard = {
  id: string;
  number: string;
  label: string;
  icon: LucideIcon;
  top: string;
  left: string;
  width: string;
  rotate: number;
  delay: number;
  z: number;
  depth: 0 | 1 | 2;
  variant: "dark" | "light";
  highlight?: boolean;
};

// Monochrome floating cards: alternating dark/light for premium contrast
const heroCards: HeroCard[] = [
  { id: "money",   number: "01", label: "Generate\nMore Money", icon: LineChart,      top: "0%",  left: "30%", width: "210px", rotate: -2, delay: 0.05, z: 20, depth: 1, variant: "light" },
  { id: "roi",     number: "02", label: "Boost ROI",            icon: TrendingUp,     top: "18%", left: "44%", width: "215px", rotate: 1,  delay: 0.18, z: 30, depth: 1, variant: "dark" },
  { id: "time",    number: "03", label: "Save\nMore Time",      icon: Hourglass,      top: "30%", left: "4%",  width: "230px", rotate: -2, delay: 0.32, z: 60, depth: 2, variant: "dark", highlight: true },
  { id: "clients", number: "04", label: "Get Extra\nClient",    icon: UsersRound,     top: "38%", left: "52%", width: "200px", rotate: 1,  delay: 0.46, z: 40, depth: 1, variant: "light" },
  { id: "hiring",  number: "05", label: "Less\nHiring",         icon: ClipboardCheck, top: "62%", left: "32%", width: "200px", rotate: -1, delay: 0.6,  z: 35, depth: 1, variant: "dark" },
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative px-3 sm:px-6 md:px-8 lg:px-10 pt-20 md:pt-28 pb-6 md:pb-10">
      <div
        className="relative mx-auto w-full max-w-[1400px] overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
        style={{
          borderRadius: 'clamp(28px, 3vw, 40px)',
          padding: 'clamp(20px, 3vw, 56px) clamp(16px, 3vw, 48px)',
          background:
            'linear-gradient(135deg, rgba(250,243,232,0.85) 0%, rgba(255,255,255,0.92) 45%, rgba(237,233,254,0.78) 100%)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 80px -30px rgba(31,41,55,0.18), 0 12px 40px -16px rgba(167,139,250,0.18)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
      {/* Monochrome background behind cards */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
        {/* Orbit Ring 1 — monochrome */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-black/[0.035] opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-dot orbit-dot-1">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-800/25 shadow-lg shadow-black/10 orbit-pulse" />
          </div>
        </div>

        {/* Orbit Ring 2 — monochrome */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-black/[0.025] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-dot orbit-dot-2">
            <div className="w-2 h-2 rounded-full bg-neutral-800/20 shadow-lg shadow-black/10 orbit-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Orbit Ring 3 — monochrome */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-black/[0.018] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="orbit-dot orbit-dot-3">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900/18 shadow-lg shadow-black/5 orbit-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Subtle dark radial glow behind card stack */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-neutral-900/[0.04] blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Left: Headline */}
          <div className="md:col-span-7 text-left">
            <h1 className="font-display-hero text-[2.5rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.8rem]" style={{ color: '#1f2937' }}>
              Fire Your{" "}
              <span className="relative inline-block whitespace-nowrap" style={{ color: '#6b7280' }}>
                <span className="relative z-10">Lazy Employees</span>
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-2 top-1/2 h-[3px] -translate-y-1/2 rotate-[-6deg] origin-center pointer-events-none rounded-full"
                  style={{ background: '#ef4444' }}
                />
              </span>
              <br />
              Deploy{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -mx-1 -my-0.5 -z-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, rgba(196,181,253,0.55) 0%, rgba(196,181,253,0.7) 40%, rgba(216,233,168,0.55) 100%)',
                    borderRadius: '14px 22px 16px 24px / 18px 14px 22px 16px',
                    transform: 'rotate(-1deg)',
                    filter: 'blur(0.3px)',
                  }}
                />
                <span className="relative z-10" style={{ color: '#0f172a' }}>
                  AI Employees
                </span>
              </span>{" "}
              Instead
            </h1>
            <div
              className="mt-7 flex flex-col items-start gap-2.5"
              style={{ fontFamily: "'Inter', 'Sora', sans-serif" }}
            >
              {[
                { text: "AI employees that work 24/7 without burnout", tint: "lavender" },
                { text: "Built to handle the work your team shouldn't", tint: "lime" },
              ].map((badge) => {
                const isLavender = badge.tint === "lavender";
                const accent = isLavender ? "#a78bfa" : "#a3c266";
                const accentBg = isLavender ? "rgba(196,181,253,0.22)" : "rgba(216,233,168,0.32)";
                return (
                  <div
                    key={badge.text}
                    className="group inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      padding: "8px 14px 8px 10px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.78)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow: `0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 24px -10px rgba(31,41,55,0.12), 0 0 0 1px rgba(15,23,42,0.04), 0 6px 18px -8px ${isLavender ? "rgba(167,139,250,0.28)" : "rgba(163,194,102,0.28)"}`,
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center shrink-0"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 6,
                        background: accentBg,
                        color: accent,
                      }}
                      aria-hidden="true"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      className="text-[12.5px] md:text-[13px] font-medium whitespace-nowrap"
                      style={{ color: "#1f2937", letterSpacing: "-0.005em" }}
                    >
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Floating card stack */}
          <div className="md:col-span-5 relative flex items-center justify-center md:justify-end min-h-[420px] md:min-h-[520px]">
            {/* Glassmorphism blur backdrop behind cards */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-[44px] pointer-events-none"
              style={{
                background: 'rgba(0,0,0,0.02)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            />

            <div className="relative w-full max-w-[480px] h-[480px] md:h-[520px]">
              {heroCards.map((card, i) => {
                const Icon = card.icon;
                const isDark = card.variant === "dark";
                const isHighlight = card.highlight;

                // Monochrome card styling
                const cardBg = isHighlight ? "#111111" : isDark ? "#000000" : "#FFFFFF";
                const cardText = isDark || isHighlight ? "#FFFFFF" : "#000000";
                const cardBorder = isDark || isHighlight
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.05)";
                const cardShadow = isDark || isHighlight
                  ? "0 32px 64px -16px rgba(0,0,0,0.45), 0 12px 24px -8px rgba(0,0,0,0.25)"
                  : "0 32px 64px -16px rgba(0,0,0,0.10), 0 12px 24px -8px rgba(0,0,0,0.05)";
                const cardHoverShadow = isDark || isHighlight
                  ? "0 44px 80px -16px rgba(0,0,0,0.55), 0 18px 36px -8px rgba(0,0,0,0.30), 0 0 60px rgba(255,255,255,0.04)"
                  : "0 44px 80px -16px rgba(0,0,0,0.14), 0 18px 36px -8px rgba(0,0,0,0.07)";

                return (
                  <div
                    key={card.id}
                    className="absolute will-change-transform"
                    style={{
                      top: card.top,
                      left: card.left,
                      zIndex: card.z,
                      width: card.width,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? `rotate(${card.rotate}deg)` : `translateY(28px) rotate(${card.rotate}deg)`,
                      transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${card.delay}s, opacity 0.9s ease-out ${card.delay}s`,
                    }}
                  >
                    {/* Independent floating wrapper */}
                    <div
                      className="animate-float-subtle"
                      style={{
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${4.2 + i * 0.5}s`,
                      }}
                    >
                      <div
                        className="rounded-[20px] cursor-default"
                        style={{
                          padding: isHighlight ? "24px 24px 22px" : "20px 22px",
                          background: cardBg,
                          boxShadow: cardShadow,
                          border: cardBorder,
                          color: cardText,
                          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.transform = 'translateY(-8px) scale(1.03)';
                          el.style.boxShadow = cardHoverShadow;
                          if (isDark || isHighlight) {
                            el.style.filter = 'brightness(1.06)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.transform = 'translateY(0) scale(1)';
                          el.style.boxShadow = cardShadow;
                          el.style.filter = 'none';
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-col gap-1.5">
                            <span
                              className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase"
                              style={{ color: cardText, opacity: 0.35 }}
                            >
                              {card.number}
                            </span>
                            <p
                              className={`font-sans font-semibold leading-[1.2] whitespace-pre-line ${isHighlight ? "text-[16px] md:text-[17px]" : "text-[14px] md:text-[15px]"}`}
                              style={{
                                letterSpacing: '-0.01em',
                                color: cardText,
                              }}
                            >
                              {card.label}
                            </p>
                          </div>
                          <div
                            className="flex items-center justify-center shrink-0"
                            style={{
                              width: isHighlight ? 32 : 26,
                              height: isHighlight ? 32 : 26,
                              borderRadius: 8,
                              background: isDark || isHighlight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                            }}
                          >
                            <Icon
                              strokeWidth={1.5}
                              style={{
                                width: isHighlight ? 18 : 15,
                                height: isHighlight ? 18 : 15,
                                color: cardText,
                                opacity: 0.85,
                              }}
                            />
                          </div>
                        </div>
                        {isHighlight && (
                          <div className="mt-5">
                            <span
                              className="font-sans leading-none block"
                              style={{
                                fontSize: '3.2rem',
                                fontWeight: 700,
                                letterSpacing: '-0.04em',
                                color: '#FFFFFF',
                              }}
                            >
                              75%
                            </span>
                            <p className="font-sans text-[11px] font-medium mt-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                              Average time saved
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
