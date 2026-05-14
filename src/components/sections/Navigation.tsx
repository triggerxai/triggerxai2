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
          className={`max-w-5xl mx-auto flex items-center justify-between gap-3 pointer-events-auto rounded-2xl backdrop-blur-md transition-all duration-500 pl-4 pr-2 py-2 md:pl-5 md:pr-2 md:py-2 ${
            isScrolled
              ? "shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              : "shadow-[0_6px_20px_rgba(15,23,42,0.06)]"
          }`}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(15,23,42,0.06)',
          }}
        >
          {/* Logo (left) */}
          <a href="/" className="flex items-center gap-2 shrink-0">
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

          {/* Centered nav links (no inner pill, minimal) */}
          <div className="hidden md:flex items-center gap-1">
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

          {/* Right: Let's Talk (black pill) */}
          <button
            onClick={() =>
              window.open(
                "https://calendly.com/aditya_das/triggerx-aditya-das-consultation",
                "_blank"
              )
            }
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)]"
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
            className="md:hidden p-2 rounded-lg bg-black/5 border border-black/5"
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
    "flex items-center gap-1.5 rounded-full text-[14px] transition-all duration-200";
  const state = active
    ? "text-[#0f172a] font-semibold"
    : "text-[#52525b] font-medium hover:text-[#0f172a]";
  const classes = `${base} ${state}`;
  const styleProps: React.CSSProperties = {
    fontFamily: "'Inter', 'Sora', sans-serif",
    letterSpacing: '-0.005em',
    padding: '8px 14px',
  };
  if (onClick) {
    return <button onClick={onClick} className={classes} style={styleProps}>{icon}{label}</button>;
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes} style={styleProps}>
      {icon}{label}
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
