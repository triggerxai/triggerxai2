import { useState } from "react";
import { Plus, Minus, ArrowUpRight, Calendar } from "lucide-react";
import FAQChatDialog from "./FAQChatDialog";
import founderAvatar from "@/assets/founder-avatar.jpeg";

interface FAQItem {
  q: string;
  a: string;
  rotation: string;
}

const FAQS: FAQItem[] = [
  {
    q: "What specific AI tools do you implement?",
    a: "We use Vapi, Retell AI, and ElevenLabs for voice. OpenAI and Claude for intelligence. n8n, Make, and Zapier for automation. We integrate with HubSpot, Salesforce, GoHighLevel, and custom CRMs.",
    rotation: "-rotate-[1.2deg]",
  },
  {
    q: "How much does a custom implementation cost?",
    a: "Pricing is based on ROI, not hours. We qualify fit during the free audit and give you a clear projection before discussing investment.",
    rotation: "rotate-[0.6deg]",
  },
  {
    q: "What results can we expect?",
    a: "Results depend on lead volume, conversion rates, and deal value. We audit first and provide realistic projections before building anything.",
    rotation: "-rotate-[0.8deg]",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);

  const scrollToBookCall = () => {
    const el = document.getElementById("book-call");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className="relative py-16 md:py-20 overflow-hidden">
      {/* Decorative brand glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Got questions?
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">We've got answers</span>
          </h2>
        </div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-[minmax(280px,380px)_1fr] gap-8 lg:gap-12 items-stretch">
          {/* LEFT — CTA Card */}
          <div className="relative group">
            <div aria-hidden className="absolute -inset-2 rounded-[32px] bg-gradient-to-br from-primary/30 via-accent/15 to-transparent blur-2xl -z-10 opacity-70" />
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-card via-background to-secondary border border-border p-7 md:p-8 flex flex-col shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-25px_hsl(var(--primary)/0.45)] overflow-hidden">
              <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/15 blur-3xl" />
              <div aria-hidden className="absolute -bottom-20 -left-16 w-52 h-52 rounded-full bg-accent/15 blur-3xl" />

              {/* Avatar */}
              <div className="relative">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-card shadow-lg">
                  <img
                    src={founderAvatar}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 left-16 w-4 h-4 rounded-full bg-accent border-2 border-card" />
              </div>

              <h3 className="mt-6 text-2xl md:text-[26px] font-semibold tracking-tight text-foreground leading-tight">
                Book a 15 min call
              </h3>
              <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-muted-foreground">
                Have questions? Let's discuss your automation goals before getting started.
              </p>

              <div className="mt-auto pt-7 relative">
                <button
                  onClick={scrollToBookCall}
                  className="group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Free Call
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — FAQ accordions */}
          <div className="space-y-5">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-500 ease-out ${isOpen ? item.rotation : "rotate-0"}`}
                >
                  {isOpen && (
                    <div
                      aria-hidden
                      className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-2xl -z-10"
                    />
                  )}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={`w-full text-left rounded-2xl bg-card border transition-all duration-300 ${
                      isOpen
                        ? "border-primary/30 shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.35)]"
                        : "border-border shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_30px_-10px_rgba(15,23,42,0.10)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6">
                      <h3 className="text-base md:text-lg font-medium text-foreground">
                        {item.q}
                      </h3>
                      <span
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? "bg-gradient-to-br from-primary to-accent border-transparent text-primary-foreground rotate-180"
                            : "bg-card border-border text-foreground/70"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </div>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 md:px-8 pb-6 md:pb-7 text-sm md:text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FAQChatDialog open={chatOpen} onOpenChange={setChatOpen} />
    </section>
  );
};

export default FAQ;
