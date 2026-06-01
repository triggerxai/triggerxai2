import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Play, Pause } from "lucide-react";
import videoAsset from "@/assets/testimonial-video.mp4.asset.json";

const testimonials = [
  {
    text: "We were spending ₹40,000/month on a follow-up team that was still missing calls. Indrajit built us a voice AI system in 6 days. First week live 14 booked site visits we would have lost. The ROI conversation was over after that.",
    name: "Ravi Nambiar",
    role: "Director, Nambiar Properties — Dubai",
    initials: "RN",
  },
  {
    text: "Law firms don't move fast. Ours does now. Every inbound inquiry gets a response in under 2 minutes, qualified before it reaches any of my associates. We've cut intake time by 70% and our close rate on consultations went up immediately.",
    name: "Melissa Oduya",
    role: "Founder, ClearPath Legal — Lagos & London",
    initials: "MO",
  },
  {
    text: "I was skeptical about AI for client-facing work. What Fluxaro built wasn't a chatbot it was a system. Our WhatsApp response flow now handles 200+ leads a month without a single human touching it until the lead is warm. Game changer.",
    name: "Tomáš Beneš",
    role: "CEO, GrowStack Agency — Prague",
    initials: "TB",
  },
  {
    text: "Appointment booking was our biggest bottleneck. Patients would call, get missed, and book with a competitor. Now our AI handles booking 24/7, sends reminders, reschedules automatically. No-show rate dropped 40% in the first month.",
    name: "Priya Subramaniam",
    role: "Operations Head, HealthFirst Clinics — Bangalore",
    initials: "PS",
  },
  {
    text: "I run 3 gym locations. Following up on trial signups manually was killing us. Fluxaro automated the entire sequence WhatsApp, SMS, the works. Paid membership conversions went up 28% in 6 weeks. Wish I'd done this 2 years ago.",
    name: "Jake Corrigan",
    role: "Founder, Corrigan Fitness — Manchester",
    initials: "JC",
  },
  {
    text: "In finance, speed and trust are everything. The qualification system Fluxaro built screens leads before they ever reach my team. We only speak to serious prospects now. My team's time is worth a lot this system respects that.",
    name: "Anwar Khalidi",
    role: "MD, Khalidi Capital Advisors — Riyadh",
    initials: "AK",
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIdx((i) => (i + 1) % testimonials.length),
      5500
    );
    return () => clearInterval(t);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const active = testimonials[activeIdx];

  return (
    <section id="testimonials" ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, hsl(var(--glow-lavender) / 0.45), transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-20 w-[460px] h-[460px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, hsl(var(--glow-lime) / 0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/60 backdrop-blur border border-border text-foreground/70">
            Testimonials
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Loved by founders and modern teams.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real businesses using AI systems to automate operations, save time, and scale faster.
          </p>
        </div>

        {/* Grid: side cards + centered video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left column */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {[0, 1, 2].map((offset) => {
              const i = (activeIdx + 1 + offset) % testimonials.length;
              const t = testimonials[i];
              return (
                <TestimonialCard
                  key={`l-${i}`}
                  t={t}
                  delay={offset * 80}
                  inView={inView}
                />
              );
            })}
          </div>

          {/* Center: featured video + active quote */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div
              className={`relative rounded-3xl overflow-hidden border border-white/80 shadow-2xl transition-all duration-700 ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, hsl(258 40% 96%), hsl(0 0% 100%))",
                aspectRatio: "16 / 10",
              }}
            >
              <video
                ref={videoRef}
                src={videoAsset.url}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              {/* Overlay gradient */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* Play button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video testimonial" : "Play video testimonial"}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
              >
                <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur border border-white shadow-2xl transition-transform duration-300 hover:scale-110">
                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-foreground relative" />
                  ) : (
                    <Play className="w-8 h-8 text-foreground ml-1 relative" fill="currentColor" />
                  )}
                </span>
              </button>

              {/* Category badge */}
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground/70 border border-white/60 shadow-sm">
                Real Estate — Australia
              </div>
            </div>

            {/* Active testimonial quote */}
            <div
              className="relative rounded-3xl border border-white/80 p-6 md:p-8 shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(0 0% 100% / 0.9), hsl(258 40% 98% / 0.8))",
                backdropFilter: "blur(20px)",
              }}
            >
              <p className="text-base md:text-lg font-medium leading-relaxed text-foreground/90 select-none">
                {active.text}
              </p>
              <div className="mt-6">
                <div className="font-semibold text-foreground text-sm select-none">
                  {active.name}
                </div>
                <div className="text-xs text-muted-foreground select-none">
                  {active.role}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {[3, 4, 5].map((offset) => {
              const i = (activeIdx + 1 + offset) % testimonials.length;
              const t = testimonials[i];
              return (
                <TestimonialCard
                  key={`r-${i}`}
                  t={t}
                  delay={offset * 80}
                  inView={inView}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  t,
  delay,
  inView,
}: {
  t: { text: string; name: string; role: string; initials: string };
  delay: number;
  inView: boolean;
}) => {
  return (
    <div
      className={`rounded-2xl border border-white/70 p-6 shadow-lg transition-all duration-500 flex-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: "linear-gradient(135deg, hsl(0 0% 100% / 0.85), hsl(258 40% 98% / 0.7))",
        backdropFilter: "blur(20px)",
      }}
    >
      <p className="text-[15px] leading-relaxed text-foreground/85 line-clamp-5 select-none">
        {t.text}
      </p>
      <div className="mt-5">
        <div className="font-semibold text-foreground text-sm select-none">
          {t.name}
        </div>
        <div className="text-[11px] text-muted-foreground select-none">
          {t.role}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
