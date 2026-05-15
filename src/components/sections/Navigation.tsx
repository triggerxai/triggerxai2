import { useState, useEffect } from "react";
import { useLocation } from "@/lib/router-compat";
import { Menu, X, Calculator, ArrowUpRight } from "lucide-react";
import FAQChatDialog from "./FAQChatDialog";
import ROICalculator from "./ROICalculator";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isROIOpen, setIsROIOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-5 px-4 pointer-events-none">
        <div
          className={`mx-auto flex items-center justify-center gap-2 md:gap-3 w-fit pointer-events-auto transition-all duration-500 ${
            isScrolled ? "md:py-1" : "md:py-2"
          }`}
        >
          {/* Logo box (left) */}
          <a
            href="/"
            className={`flex items-center gap-2.5 shrink-0 pointer-events-auto rounded-2xl px-3.5 py-2 md:justify-self-start transition-all duration-500 ${
              isScrolled
                ? "shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
                : "shadow-[0_6px_20px_rgba(15,23,42,0.06)]"
            }`}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(15,23,42,0.06)',
            }}
          >
            <img
              src="/lovable-uploads/14bcde09-cf75-409a-bcbf-e346efc47a4f.png"
              alt="Triggerx AI Logo"
              className="w-7 h-7 md:w-8 md:h-8 object-contain"
            />
            <span
              className="text-base md:text-lg"
              style={{
                fontFamily: "'Inter', 'Sora', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: '#0f172a',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Triggerx Ai
            </span>
          </a>

          {/* Center glowing glass capsule */}
          <div className="relative hidden md:flex md:justify-self-center items-center">
            {/* Ambient outer glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -m-4 rounded-full blur-2xl opacity-80"
              style={{
                background:
                  'radial-gradient(50% 80% at 20% 50%, rgba(196,181,253,0.55) 0%, rgba(196,181,253,0) 70%), radial-gradient(50% 80% at 80% 50%, rgba(216,233,168,0.55) 0%, rgba(216,233,168,0) 70%), radial-gradient(40% 80% at 50% 50%, rgba(167,224,219,0.40) 0%, rgba(167,224,219,0) 70%)',
              }}
            />
            <div
              className={`relative flex items-center gap-1.5 rounded-full px-2 py-1.5 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                isScrolled
                  ? "shadow-[0_14px_36px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]"
                  : "shadow-[0_10px_28px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
              }`}
              style={{
                background:
                  'linear-gradient(120deg, rgba(221,214,254,0.75) 0%, rgba(214,234,222,0.78) 50%, rgba(220,240,196,0.75) 100%)',
                border: '1px solid rgba(255,255,255,0.7)',
              }}
            >
              {/* Tiny sparkle dots */}
              <span aria-hidden className="pointer-events-none absolute inset-0">
                <span className="absolute top-2 left-[18%] w-[2px] h-[2px] rounded-full bg-white/70" />
                <span className="absolute bottom-3 left-[32%] w-[2px] h-[2px] rounded-full bg-white/60" />
                <span className="absolute top-3 left-[55%] w-[1.5px] h-[1.5px] rounded-full bg-white/70" />
                <span className="absolute bottom-2 left-[72%] w-[2px] h-[2px] rounded-full bg-white/60" />
                <span className="absolute top-2 right-[8%] w-[1.5px] h-[1.5px] rounded-full bg-white/70" />
              </span>
              <NavPill
                label="Community"
                href="https://www.skool.com/agents-space-1751"
                external
              />
              <NavPill label="FAQs" onClick={() => setIsFAQOpen(true)} />
              <NavPill
                label="Resource Hub"
                href="/resources"
                active={location.pathname.startsWith("/resources")}
              />
              <NavPill
                label="Careers"
                href="/careers"
                active={location.pathname.startsWith("/careers")}
              />
              <NavPill
                label="ROI Cal"
                icon={<Calculator className="w-3.5 h-3.5" />}
                onClick={() => setIsROIOpen(true)}
              />
            </div>
          </div>

          {/* Right: Book a Call */}
          <button
            onClick={() =>
              window.open(
                "https://calendly.com/aditya_das/triggerx-aditya-das-consultation",
                "_blank"
              )
            }
            className="hidden md:inline-flex md:justify-self-end items-center px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)] pointer-events-auto"
            style={{
              background: '#0a0a0a',
              color: '#ffffff',
              fontFamily: "'Inter', 'Sora', sans-serif",
              letterSpacing: '-0.005em',
            }}
          >
            Book a Call
            <span
              className="ml-2 inline-flex items-center justify-center"
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: 'rgba(255,255,255,0.10)',
              }}
            >
              <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" style={{ color: '#ffffff', opacity: 0.9 }} />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 backdrop-blur border border-black/5 shadow-sm pointer-events-auto"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#0f172a]" />
            ) : (
              <Menu className="w-5 h-5 text-[#0f172a]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 mx-auto max-w-7xl pointer-events-auto">
            <div
              className="rounded-3xl p-3 space-y-1.5 backdrop-blur-md border border-black/5 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 235, 220, 0.95) 0%, rgba(232, 240, 232, 0.95) 100%)',
              }}
            >
              <MobilePill
                label="Community"
                href="https://www.skool.com/agents-space-1751"
                external
                onClose={() => setIsMobileMenuOpen(false)}
              />
              <MobilePill
                label="FAQs"
                onClick={() => { setIsFAQOpen(true); setIsMobileMenuOpen(false); }}
              />
              <MobilePill label="Resource Hub" href="/resources" onClose={() => setIsMobileMenuOpen(false)} />
              <MobilePill label="Careers" href="/careers" onClose={() => setIsMobileMenuOpen(false)} />
              <MobilePill
                label="ROI Cal"
                icon={<Calculator className="w-4 h-4" />}
                onClick={() => { setIsROIOpen(true); setIsMobileMenuOpen(false); }}
              />
              <button
                onClick={() => {
                  window.open("https://calendly.com/aditya_das/triggerx-aditya-das-consultation", "_blank");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center px-5 py-3 rounded-full text-white text-sm font-medium"
                style={{ background: 'linear-gradient(135deg, #1a2e1f 0%, #0f1a13 100%)' }}
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <FAQChatDialog open={isFAQOpen} onOpenChange={setIsFAQOpen} />
      <ROICalculator open={isROIOpen} onClose={() => setIsROIOpen(false)} />
    </>
  );
};

const NavPill = ({
  label, href, external, onClick, icon, active,
}: { label: string; href?: string; external?: boolean; onClick?: () => void; icon?: React.ReactNode; active?: boolean }) => {
  const base =
    "relative flex items-center gap-1.5 rounded-full text-[13.5px] transition-all duration-300 backdrop-blur-md";
  const state = active
    ? "text-[#a16207] font-semibold"
    : "text-[#b45309] font-medium hover:text-[#854d0e]";
  const classes = `${base} ${state} group`;
  const styleProps: React.CSSProperties = {
    fontFamily: "'Inter', 'Sora', sans-serif",
    letterSpacing: '-0.005em',
    padding: '7px 14px',
    background: active
      ? 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.70) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 100%)',
    border: '1px solid rgba(255,255,255,0.6)',
    boxShadow: active
      ? 'inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(167,139,250,0.22)'
      : 'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 8px rgba(15,23,42,0.04)',
  };
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(245,243,255,0.75) 50%, rgba(243,250,235,0.75) 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px rgba(167,139,250,0.22)',
        }}
      />
      <span className="relative z-10 flex items-center gap-1.5">{icon}{label}</span>
    </>
  );
  if (onClick) {
    return <button onClick={onClick} className={classes} style={styleProps}>{inner}</button>;
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes} style={styleProps}>
      {inner}
    </a>
  );
};

const MobilePill = ({
  label, href, external, onClick, onClose, icon,
}: { label: string; href?: string; external?: boolean; onClick?: () => void; onClose?: () => void; icon?: React.ReactNode }) => {
  const classes =
    "w-full flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 text-gray-800 text-sm font-medium hover:bg-white transition-colors";
  if (onClick) {
    return <button onClick={onClick} className={classes}>{icon}{label}</button>;
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={onClose} className={classes}>
      {icon}{label}
    </a>
  );
};

export default Navigation;
