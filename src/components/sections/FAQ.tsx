import { useState } from "react";
import { Plus, Minus, MessageCircle, ArrowUpRight } from "lucide-react";
import FAQChatDialog from "./FAQChatDialog";

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

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-[#faf8ff] to-white">
      {/* Decorative lavender glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-200/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]">
            Got questions?
            <br />
            <span className="text-slate-900">We've got answers</span>
          </h2>
        </div>

        {/* FAQ cards */}
        <div className="space-y-5">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`relative transition-all duration-500 ease-out ${isOpen ? item.rotation : "rotate-0"}`}
              >
                {/* Lavender glow behind active card */}
                {isOpen && (
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-violet-300/40 via-indigo-200/30 to-transparent blur-2xl -z-10"
                  />
                )}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left rounded-2xl bg-white border transition-all duration-300 ${
                    isOpen
                      ? "border-violet-200/80 shadow-[0_20px_50px_-20px_rgba(139,92,246,0.35)]"
                      : "border-slate-200/70 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_30px_-10px_rgba(15,23,42,0.12)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6">
                    <h3 className="text-base md:text-lg font-medium text-slate-900">
                      {item.q}
                    </h3>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? "bg-slate-900 border-slate-900 text-white rotate-180"
                          : "bg-white border-slate-200 text-slate-700"
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
                      <p className="px-6 md:px-8 pb-6 md:pb-7 text-sm md:text-[15px] leading-relaxed text-slate-600 max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA support box */}
        <div className="mt-16 md:mt-20">
          <div className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-violet-200/80 via-white to-indigo-200/60 shadow-[0_20px_60px_-25px_rgba(139,92,246,0.35)]">
            <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#faf8ff] to-[#f3efff] px-6 md:px-10 py-7 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 overflow-hidden">
              <div aria-hidden className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-300/20 blur-3xl" />
              <div className="flex items-start md:items-center gap-4 relative">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-white border border-violet-100 shadow-sm flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-slate-900">
                    Still have questions?
                  </h4>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Try our AI assistant or book a quick strategy call.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
              >
                Chat with AI
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <FAQChatDialog open={chatOpen} onOpenChange={setChatOpen} />
    </section>
  );
};

export default FAQ;
