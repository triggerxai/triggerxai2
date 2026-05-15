import { useState, useEffect } from "react";
import { useLocation } from "@/lib/router-compat";
import { Menu, X, Calculator, ArrowUpRight } from "lucide-react";
import ROICalculator from "./ROICalculator";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isROIOpen, setIsROIOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const boxShadow = isScrolled
    ? "0 10px 28px rgba(15,23,42,0.10)"
    : "0 6px 18px rgba(15,23,42,0.06)";

  const boxStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid rgba(15,23,42,0.06)",
    boxShadow,
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-5 px-4 pointer-events-none">
        <div className="mx-auto flex items-center justify-center gap-2 md:gap-3 w-fit pointer-events-auto transition-all duration-500">
          {/* Logo box */}
          <a
            href="/"
            className="flex items-center gap-2.5 shrink-0 rounded-2xl px-4 h-12 transition-all duration-500"
            style={boxStyle}
          >
            <img
              src="/lovable-uploads/14bcde09-cf75-409a-bcbf-e346efc47a4f.png"
              alt="Triggerx AI Logo"
              className="w-7 h-7 object-contain"
            />
            <span
              className="text-base md:text-[17px]"
              style={{
                fontFamily: "'Inter', 'Sora', sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#0a0a0a",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              Triggerx Ai
            </span>
          </a>

          {/* Center nav capsule */}
          <div
            className="relative hidden md:flex items-center h-12 rounded-2xl px-2"
            style={boxStyle}
          >
            <NavPill
              label="Community"
              href="https://www.skool.com/agents-space-1751"
              external
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

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-2">
            <SocialIcon
              href="https://twitter.com"
              label="X (Twitter)"
              boxStyle={boxStyle}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com"
              label="Instagram"
              boxStyle={boxStyle}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </SocialIcon>
          </div>

          {/* Book a Call */}
          <button
            onClick={() =>
              window.open(
                "https://calendly.com/aditya_das/triggerx-aditya-das-consultation",
                "_blank"
              )
            }
            data-click-sound
            className="hidden md:inline-flex items-center px-6 h-12 rounded-2xl text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)]"
            style={{
              background: "#0a0a0a",
              color: "#ffffff",
              fontFamily: "'Inter', 'Sora', sans-serif",
              letterSpacing: "-0.005em",
            }}
          >
            Book a Call
            <span
              className="ml-2.5 inline-flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: "rgba(255,255,255,0.10)",
              }}
            >
              <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" style={{ color: "#ffffff", opacity: 0.9 }} />
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl"
            style={boxStyle}
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
              className="rounded-3xl p-3 space-y-1.5"
              style={boxStyle}
            >
              <MobilePill
                label="Community"
                href="https://www.skool.com/agents-space-1751"
                external
                onClose={() => setIsMobileMenuOpen(false)}
              />
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
                className="w-full text-center px-5 py-3 rounded-2xl text-white text-sm font-medium"
                style={{ background: "#0a0a0a" }}
              >
                Book a Call
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

      <ROICalculator open={isROIOpen} onClose={() => setIsROIOpen(false)} />
    </>
  );
};

const NavPill = ({
  label, href, external, onClick, icon, active,
}: { label: string; href?: string; external?: boolean; onClick?: () => void; icon?: React.ReactNode; active?: boolean }) => {
  const classes = `relative flex items-center gap-1.5 rounded-xl text-[14px] transition-all duration-300 hover:bg-[#f5f5f7] ${
    active ? "text-black font-bold" : "text-[#0a0a0a] font-semibold"
  }`;
  const styleProps: React.CSSProperties = {
    fontFamily: "'Inter', 'Sora', sans-serif",
    letterSpacing: "-0.005em",
    padding: "8px 16px",
  };
  const inner = <>{icon}{label}</>;
  if (onClick) {
    return <button onClick={onClick} data-click-sound className={classes} style={styleProps}>{inner}</button>;
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-click-sound className={classes} style={styleProps}>
      {inner}
    </a>
  );
};

const SocialIcon = ({
  href, label, children, boxStyle,
}: { href: string; label: string; children: React.ReactNode; boxStyle: React.CSSProperties }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    data-click-sound
    className="flex items-center justify-center w-12 h-12 rounded-2xl text-[#0a0a0a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(167,139,250,0.25)]"
    style={boxStyle}
  >
    {children}
  </a>
);

const MobilePill = ({
  label, href, external, onClick, onClose, icon,
}: { label: string; href?: string; external?: boolean; onClick?: () => void; onClose?: () => void; icon?: React.ReactNode }) => {
  const classes =
    "w-full flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#f5f5f7] text-[#0a0a0a] text-sm font-semibold hover:bg-[#ececef] transition-colors";
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
