import { useState, useEffect, useRef } from "react";

const GiftPopup = () => {
  const [phase, setPhase] = useState<"hidden" | "entering" | "visible" | "exiting">("hidden");
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase("entering"), 6000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (phase === "entering") {
      const t = setTimeout(() => setPhase("visible"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "visible") {
      const hideTimer = setTimeout(() => setPhase("exiting"), 6000);
      return () => clearTimeout(hideTimer);
    }
    if (phase === "exiting") {
      const t = setTimeout(() => setPhase("hidden"), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <a
      ref={ref}
      href="https://adityadasn8n.gumroad.com/l/fueask"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-1/2 -translate-y-1/2 z-[9998] flex items-center gap-3 px-6 py-4 rounded-l-2xl font-bold text-base text-white no-underline transition-all duration-300 ease-out hover:scale-105"
      style={{
        right: phase === "exiting" ? "-300px" : "0px",
        background: "linear-gradient(135deg, #FF7A18, #FFB347)",
        boxShadow: "0 8px 24px rgba(255, 122, 24, 0.35), 0 2px 8px rgba(0, 0, 0, 0.12)",
        transition: "right 0.5s ease-in-out, transform 0.2s ease, box-shadow 0.3s ease",
        animation: phase === "entering" ? "slide-in-right 0.5s ease-out" : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 122, 24, 0.5), 0 0 16px rgba(255, 179, 71, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 122, 24, 0.35), 0 2px 8px rgba(0, 0, 0, 0.12)";
      }}
    >
      <span className="text-lg">🎁</span>
      <span>Press Here to Unlock Gift</span>
    </a>
  );
};

export default GiftPopup;
