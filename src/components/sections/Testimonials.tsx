import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    text: "I was skeptical about AI for client-facing work. What Fluxaro built wasn't a chatbot — it was a system. Our WhatsApp response flow now handles 200+ leads a month without a single human touching it until the lead is warm. Game changer.",
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
    text: "I run 3 gym locations. Following up on trial signups manually was killing us. Fluxaro automated the entire sequence — WhatsApp, SMS, the works. Paid membership conversions went up 28% in 6 weeks. Wish I'd done this 2 years ago.",
    name: "Jake Corrigan",
    role: "Founder, Corrigan Fitness — Manchester",
    initials: "JC",
  },
  {
    text: "In finance, speed and trust are everything. The qualification system Fluxaro built screens leads before they ever reach my team. We only speak to serious prospects now. My team's time is worth a lot — this system respects that.",
    name: "Anwar Khalidi",
    role: "MD, Khalidi Capital Advisors — Riyadh",
    initials: "AK",
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [auto]);

  const go = (dir: number) => {
    setAuto(false);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const getCard = (offset: number) => testimonials[(index + offset) % testimonials.length];

  return (
    <section id="testimonials" ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, hsl(var(--glow-lavender) / 0.45), transparent)" }} />
      <div className="pointer-events-none absolute bottom-0 -right-20 w-[460px] h-[460px] rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, hsl(var(--glow-lime) / 0.4), transparent)" }} />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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

        {/* Stacked cards */}
        <div className={`relative h-[340px] md:h-[300px] flex items-center justify-center transition-all duration-700 delay-150 ${inView ? "opacity-100" : "opacity-0"}`}>
          {/* Back card 2 */}
          <div className="absolute w-[88%] md:w-[70%] h-full rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl"
            style={{ transform: "rotate(-6deg) translateY(28px) scale(0.92)" }} />
          {/* Back card 1 */}
          <div className="absolute w-[92%] md:w-[76%] h-full rounded-3xl bg-white/55 backdrop-blur-xl border border-white/70 shadow-xl"
            style={{ transform: "rotate(3deg) translateY(14px) scale(0.96)" }} />

          {/* Active card */}
          <div
            key={index}
            className="relative w-full md:w-[80%] h-full rounded-3xl border border-white/80 shadow-2xl p-8 md:p-12 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1 animate-fade-in"
            style={{
              background: "linear-gradient(135deg, hsl(0 0% 100% / 0.85), hsl(258 40% 98% / 0.75))",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-lg md:text-2xl font-medium leading-relaxed text-foreground/90">
              {getCard(0).text}
            </p>

            <div className="mt-6">
              <div className="font-semibold text-foreground">{getCard(0).name}</div>
              <div className="text-sm text-muted-foreground">{getCard(0).role}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full bg-white/70 backdrop-blur border border-border hover:bg-white transition-all hover:-translate-y-0.5 shadow-sm flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAuto(false); setIndex(i); }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-foreground" : "w-2 bg-foreground/30"}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full bg-white/70 backdrop-blur border border-border hover:bg-white transition-all hover:-translate-y-0.5 shadow-sm flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
