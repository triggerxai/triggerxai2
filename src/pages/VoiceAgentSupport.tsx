import { useNavigate } from "@/lib/router-compat";
import { ArrowLeft, Calendar, Headphones, Users, CheckCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const VoiceAgentSupport = () => {
  usePageMeta({ title: "AI Voice Agent Setup & Support — Triggerx AI", description: "Triggerx AI deploys your AI voice agent fast with full training, handover, and post-launch support.", canonical: "/voice-agent/support" });
  const navigate = useNavigate();

  const steps = [
    { icon: Calendar, title: "10–12 Day Setup", desc: "Full voice agent build, integration, and deployment completed within 10–12 business days." },
    { icon: Users, title: "Onboarding + Handover", desc: "Comprehensive onboarding session with your team so everyone is aligned and confident." },
    { icon: Headphones, title: "Priority WhatsApp / Slack Support", desc: "Get direct access to our team via WhatsApp or Slack for fast, priority assistance." },
    { icon: CheckCircle, title: "Ongoing Optimization", desc: "We continuously monitor and refine your voice agent to improve performance over time." },
  ];

  return (
    <section className="min-h-screen px-4 py-16" style={{ backgroundColor: '#FBF7F0' }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity" style={{ color: '#5C4033' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2D1B0E' }}>AI Voice Agent System — Support</h1>
        <p className="text-base mb-12" style={{ color: '#5C4033' }}>Our setup process, onboarding, and dedicated support for the Voice Agent system.</p>

        <div className="space-y-5">
          {steps.map((item, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white/80 flex gap-4 items-start" style={{ boxShadow: '0 2px 12px rgba(139,115,85,0.08)' }}>
              <div className="w-9 h-9 min-w-[2.25rem] rounded-full flex items-center justify-center bg-blue-100 text-blue-700">
                <item.icon size={16} />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1" style={{ color: '#2D1B0E' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#5C4033' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceAgentSupport;
