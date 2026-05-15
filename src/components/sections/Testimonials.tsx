import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Triggerx AI completely changed how we handle lead follow-up. What used to take hours is now fully automated.",
    name: "Sarah K.",
    role: "Marketing Agency",
    initials: "SK",
  },
  {
    text: "The AI voice assistant reduced missed calls and increased booked appointments within the first week.",
    name: "Daniel R.",
    role: "Dental Clinic",
    initials: "DR",
  },
  {
    text: "We replaced multiple manual workflows with one automated system. Huge time saver.",
    name: "Michael T.",
    role: "SaaS Founder",
    initials: "MT",
  },
  {
    text: "Our support response time dropped dramatically after implementing their AI systems.",
    name: "Olivia M.",
    role: "Ecommerce Brand",
    initials: "OM",
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
              "{getCard(0).text}"
            </p>

            <div className="flex items-center gap-4 mt-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-foreground"
                  style={{ background: "var(--gradient-accent)" }}>
                  {getCard(0).initials}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{getCard(0).name}</div>
                <div className="text-sm text-muted-foreground">{getCard(0).role}</div>
              </div>
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
