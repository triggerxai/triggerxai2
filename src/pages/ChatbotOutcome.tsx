import { useNavigate } from "@/lib/router-compat";
import { ArrowLeft, MessageCircle, TrendingUp, Users, Clock, Target, Zap } from "lucide-react";

const ChatbotOutcome = () => {
  const navigate = useNavigate();

  const outcomes = [
    { icon: TrendingUp, title: "3x More Leads Captured", desc: "AI chatbot engages every visitor 24/7, capturing leads you'd otherwise lose." },
    { icon: Clock, title: "Instant Response Time", desc: "No more waiting — customers get answers in seconds, not hours." },
    { icon: Users, title: "Reduced Support Load", desc: "Automate 70%+ of repetitive queries, freeing your team for high-value tasks." },
    { icon: Target, title: "Smart Lead Qualification", desc: "AI scores and routes leads based on intent, ensuring your sales team talks to the right people." },
    { icon: MessageCircle, title: "Multi-Platform Presence", desc: "One system covers Website, Instagram, Facebook, WhatsApp, and LinkedIn." },
    { icon: Zap, title: "Faster Sales Cycle", desc: "Auto appointment booking and instant follow-ups shorten time-to-close." },
  ];

  return (
    <section className="min-h-screen px-4 py-16" style={{ backgroundColor: '#FBF7F0' }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity" style={{ color: '#5C4033' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2D1B0E' }}>AI ChatBot System — Outcome</h1>
        <p className="text-base mb-12" style={{ color: '#5C4033' }}>Here's the business impact you can expect after deploying our AI ChatBot System.</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {outcomes.map((item, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white/80" style={{ boxShadow: '0 2px 12px rgba(139,115,85,0.08)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-700 mb-3">
                <item.icon size={16} />
              </div>
              <h3 className="text-base font-semibold mb-1" style={{ color: '#2D1B0E' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: '#5C4033' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotOutcome;
