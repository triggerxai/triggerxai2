import { useNavigate } from "@/lib/router-compat";
import { ArrowLeft, Calendar, Headphones, Video, CheckCircle } from "lucide-react";

const ChatbotSupport = () => {
  const navigate = useNavigate();

  const steps = [
    { icon: Calendar, title: "7–8 Day Setup", desc: "We build, configure, and deploy your entire AI chatbot system within 7–8 business days." },
    { icon: Video, title: "Training + Handover Video", desc: "You'll receive a full walkthrough video so your team knows exactly how to manage the system." },
    { icon: Headphones, title: "1 Month Free Support", desc: "Post-launch, we provide 30 days of complimentary support to fine-tune and optimize." },
    { icon: CheckCircle, title: "Ongoing Maintenance Available", desc: "Need long-term support? We offer flexible maintenance plans to keep your system running smoothly." },
  ];

  return (
    <section className="min-h-screen px-4 py-16" style={{ backgroundColor: '#FBF7F0' }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity" style={{ color: '#5C4033' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#2D1B0E' }}>AI ChatBot System — Support</h1>
        <p className="text-base mb-12" style={{ color: '#5C4033' }}>Everything about our setup process, onboarding, and post-launch support.</p>

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

export default ChatbotSupport;
