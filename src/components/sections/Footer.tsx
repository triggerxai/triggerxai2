import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-white pt-16 pb-0" style={{ height: "280px" }}>
      {/* Scroll to top button */}
      







      

      {/* Footer links */}
      <div className="flex justify-center items-center gap-3 mb-10 text-base font-medium" style={{ letterSpacing: "0.5px" }}>
        <span className="text-gray-600">© 2026 TRIGGERX AI</span>
        <span className="text-gray-400">·</span>
        <a href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
        <span className="text-gray-400">·</span>
        <a href="/terms-of-service" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
      </div>

      {/* Large cropped background typography */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center select-none pointer-events-none" style={{ lineHeight: 0.85 }}>
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(to right, white, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(to left, white, transparent)" }} />
        {/* Left glow */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-36 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)", filter: "blur(30px)" }} />
        {/* Right glow */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <span
          className="font-extrabold tracking-tighter whitespace-nowrap translate-y-[45%]"
          style={{
            fontSize: "clamp(5rem, 15vw, 14rem)",
            color: "rgba(15,23,42,0.07)"
          }}>
          
          TRIGGERX AI
        </span>
      </div>
    </footer>);

};

export default Footer;