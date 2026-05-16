import { ArrowRight, ArrowUpRight, Sparkles, Network, GraduationCap, ShieldCheck, TrendingUp, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/triggerx-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#fafaf7] pt-20 pb-0">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute top-40 -right-20 w-[520px] h-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(190,242,100,0.18) 0%, transparent 70%)", filter: "blur(70px)" }}
      />

      {/* ========== Top CTA Card ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="relative rounded-[36px] overflow-hidden border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(79,70,229,0.25)]">
          {/* card glows */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)", filter: "blur(50px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-1/3 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(190,242,100,0.30) 0%, transparent 70%)", filter: "blur(60px)" }}
          />

          {/* Decorative flower illustrations */}
          <svg className="pointer-events-none absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 opacity-90 z-10" viewBox="0 0 100 100" fill="none">
            <path d="M50 55 Q48 70 46 88" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 60 Q40 65 35 78" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M50 60 Q60 65 65 78" stroke="#84cc16" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="38" cy="30" r="7" fill="#f97316" />
            <circle cx="52" cy="22" r="7" fill="#fb923c" />
            <circle cx="62" cy="34" r="7" fill="#f97316" />
            <circle cx="45" cy="42" r="7" fill="#fb923c" />
            <circle cx="58" cy="48" r="6" fill="#ea580c" />
          </svg>
          <svg className="pointer-events-none absolute top-3 right-4 w-16 h-16 md:w-20 md:h-20 opacity-90 z-10" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="28" rx="11" ry="16" fill="#c4b5fd" />
            <ellipse cx="72" cy="50" rx="16" ry="11" fill="#a78bfa" />
            <ellipse cx="50" cy="72" rx="11" ry="16" fill="#c4b5fd" />
            <ellipse cx="28" cy="50" rx="16" ry="11" fill="#a78bfa" />
            <circle cx="50" cy="50" r="8" fill="#fde68a" />
          </svg>
          <svg className="pointer-events-none absolute bottom-4 left-6 w-14 h-14 md:w-16 md:h-16 opacity-90 z-10" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="32" rx="10" ry="14" fill="#93c5fd" />
            <ellipse cx="68" cy="50" rx="14" ry="10" fill="#60a5fa" />
            <ellipse cx="50" cy="68" rx="10" ry="14" fill="#93c5fd" />
            <ellipse cx="32" cy="50" rx="14" ry="10" fill="#60a5fa" />
            <circle cx="50" cy="50" r="7" fill="#fcd34d" />
          </svg>
          <svg className="pointer-events-none absolute bottom-2 right-2 w-24 h-24 md:w-28 md:h-28 opacity-90 z-10" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="22" rx="14" ry="20" fill="#86efac" />
            <ellipse cx="78" cy="50" rx="20" ry="14" fill="#4ade80" />
            <ellipse cx="50" cy="78" rx="14" ry="20" fill="#86efac" />
            <ellipse cx="22" cy="50" rx="20" ry="14" fill="#4ade80" />
            <circle cx="50" cy="50" r="11" fill="#fef3c7" stroke="#facc15" strokeWidth="1.5" />
          </svg>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 md:p-14">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                Build AI Systems That Actually Drive Revenue
              </h2>
              <p className="mt-5 text-base md:text-lg text-gray-600 max-w-lg">
                Automate lead generation, conversations, follow-ups, and operations with custom AI workflows.
              </p>
              <div className="mt-8">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-6 py-3.5 text-sm font-medium hover:bg-black transition-all shadow-lg shadow-gray-900/20"
                >
                  Book A Free Audit Call
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right — Interactive stats visual */}
            <div className="relative h-[380px] md:h-[420px]">
              {/* connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none" preserveAspectRatio="none">
                <line x1="80" y1="80" x2="200" y2="200" stroke="url(#fg1)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="320" y1="80" x2="200" y2="200" stroke="url(#fg1)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="70" y1="320" x2="200" y2="200" stroke="url(#fg1)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="330" y1="320" x2="200" y2="200" stroke="url(#fg1)" strokeWidth="1.5" strokeDasharray="4 4" />
                <defs>
                  <linearGradient id="fg1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#bef264" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>

              {/* orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[260px] h-[260px] rounded-full border border-violet-200/50" />
                <div className="absolute w-[160px] h-[160px] rounded-full border border-lime-200/60" />
              </div>

              {/* Center logo node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-3xl bg-white shadow-xl shadow-violet-500/30 border border-black/5 flex items-center justify-center p-3">
                <img src={logo} alt="Triggerx AI" className="w-full h-full object-contain" />
              </div>

              {/* Stat card 1 — top left */}
              <div className="absolute top-0 left-0 bg-white rounded-2xl shadow-lg shadow-violet-200/60 border border-black/5 px-4 py-3 flex items-center gap-3 hover:-translate-y-1 hover:shadow-violet-300/70 transition-all animate-[float_6s_ease-in-out_infinite]">
                <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Briefcase className="w-4.5 h-4.5 text-violet-600" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 leading-tight">18+</div>
                  <div className="text-[10px] text-gray-500 leading-tight">Businesses Work With Us</div>
                </div>
              </div>

              {/* Stat card 2 — top right */}
              <div className="absolute top-2 right-0 bg-white rounded-2xl shadow-lg shadow-lime-200/60 border border-black/5 px-4 py-3 flex items-center gap-3 hover:-translate-y-1 hover:shadow-lime-300/70 transition-all animate-[float_7s_ease-in-out_infinite_0.5s]">
                <div className="w-9 h-9 rounded-xl bg-lime-100 flex items-center justify-center">
                  <GraduationCap className="w-4.5 h-4.5 text-lime-700" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 leading-tight">50+</div>
                  <div className="text-[10px] text-gray-500 leading-tight">People Taught</div>
                </div>
              </div>

              {/* Stat card 3 — bottom left */}
              <div className="absolute bottom-2 left-0 bg-white rounded-2xl shadow-lg shadow-violet-200/60 border border-black/5 px-4 py-3 flex items-center gap-3 hover:-translate-y-1 hover:shadow-violet-300/70 transition-all animate-[float_8s_ease-in-out_infinite_1s]">
                <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                  <Heart className="w-4.5 h-4.5 text-lime-300" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 leading-tight">97%</div>
                  <div className="text-[10px] text-gray-500 leading-tight">Client Satisfaction</div>
                </div>
              </div>

              {/* Stat card 4 — bottom right */}
              <div className="absolute bottom-0 right-2 bg-white rounded-2xl shadow-lg shadow-lime-200/60 border border-black/5 px-4 py-3 flex items-center gap-3 hover:-translate-y-1 hover:shadow-lime-300/70 transition-all animate-[float_6.5s_ease-in-out_infinite_1.5s]">
                <div className="w-9 h-9 rounded-xl bg-lime-100 flex items-center justify-center">
                  <DollarSign className="w-4.5 h-4.5 text-lime-700" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 leading-tight">$50K+</div>
                  <div className="text-[10px] text-gray-500 leading-tight">Generated For Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Footer Columns ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-black/5 shadow-md shadow-violet-500/20 flex items-center justify-center p-1">
                <img src={logo} alt="Triggerx AI" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-gray-900 tracking-tight">TRIGGERX AI</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              AI automation systems for modern businesses, agencies, and fast-growing teams.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#community" className="hover:text-gray-900 transition-colors">Community</a></li>
              <li><a href="#careers" className="hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#roi" className="hover:text-gray-900 transition-colors">ROI Calculator</a></li>
              <li><a href="#cases" className="hover:text-gray-900 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Socials</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="https://adityadasn8n.gumroad.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors"><span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-[13px] leading-none">G</span> Gumroad</a></li>
              <li><a href="https://www.reddit.com/user/Both_Meaning_517/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.284.913 2.961.913.677 0 2.116-.071 2.961-.913a.331.331 0 0 0 0-.463.33.33 0 0 0-.463 0c-.547.547-1.592.591-2.498.591s-1.951-.044-2.498-.591a.326.326 0 0 0-.232-.095z" /></svg> Reddit</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors"><Youtube className="w-3.5 h-3.5" /> YouTube</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">
              Get AI automation insights, system updates, and new resources.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full bg-white border border-black/10 pl-4 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative border-t border-black/5 py-6 flex flex-wrap justify-center md:justify-between items-center gap-3 text-sm text-gray-600">
          <div>© 2026 TRIGGERX AI</div>
          <div className="flex items-center gap-3">
            <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy</a>
            <span className="text-gray-300">·</span>
            <a href="/terms-of-service" className="hover:text-gray-900 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* ========== Large faded TRIGGERX AI typography ========== */}
      <div className="relative z-0 flex justify-center select-none pointer-events-none overflow-hidden" style={{ lineHeight: 0.85 }}>
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(to right, #fafaf7, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(to left, #fafaf7, transparent)" }} />
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-36 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)", filter: "blur(30px)" }} />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(190,242,100,0.10) 0%, transparent 70%)", filter: "blur(30px)" }} />
        <span
          className="font-extrabold tracking-tighter whitespace-nowrap translate-y-[35%]"
          style={{
            fontSize: "clamp(5rem, 15vw, 14rem)",
            color: "rgba(15,23,42,0.07)",
          }}
        >
          TRIGGERX AI
        </span>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
