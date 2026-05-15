import { useNavigate } from "@/lib/router-compat";
import { ArrowLeft, Phone, TrendingUp, CalendarCheck, BarChart3, ShieldCheck, RefreshCw } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const VoiceAgentOutcome = () => {
  usePageMeta({ title: "AI Voice Agent Outcomes — Triggerx AI", description: "Discover what Triggerx AI voice agents deliver: 24/7 inbound call handling, qualified leads, and reduced operational overhead.", canonical: "/voice-agent/outcome" });
  const navigate = useNavigate();

  const outcomes = [
    { icon: Phone, title: "Instant Lead Contact", desc: "AI calls new leads within seconds — no more missed opportunities from delayed follow-ups." },
    { icon: CalendarCheck, title: "Auto-Booked Appointments", desc: "Leads get booked directly into your calendar without human intervention." },
    { icon: TrendingUp, title: "Higher Show-Up Rates", desc: "Automated reminders and follow-up calls for no-shows dramatically reduce missed appointments." },
    { icon: BarChart3, title: "CRM Always Up-to-Date", desc: "Every call, outcome, and lead status syncs automatically to your CRM." },
    { icon: ShieldCheck, title: "AI Objection Handling", desc: "Voice agent handles common objections naturally, increasing conversion rates." },
    { icon: RefreshCw, title: "Scalable Call Volume", desc: "Handle hundreds of calls simultaneously without hiring additional staff." },
  ];

  return (
    <section className="min-h-screen px-4 py-16" style={{ backgroundColor: '#FBF7F0' }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity" style={{ color: '#5C4033' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2D1B0E' }}>AI Voice Agent System — Outcome</h1>
        <p className="text-base mb-12" style={{ color: '#5C4033' }}>The measurable business results you'll see after deploying our AI Voice Agent.</p>

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

export default VoiceAgentOutcome;
