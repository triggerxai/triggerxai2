import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import saasImg from "@/assets/service-saas.jpg";
import voiceChatImg from "@/assets/service-voice-chat.jpg";
import consultingImg from "@/assets/service-content.png";
import leadGenImg from "@/assets/service-lead-gen.jpg";

const services = [
  {
    label: "AI Service",
    title: "Custom AI Systems & Business Dashboards",
    description:
      "Build tailored AI tools and dashboards that automate workflows and drive business decisions.",
    image: saasImg,
    steps: [
      { title: "Workflow Mapping", desc: "Analyze your business processes and needs." },
      { title: "System Design", desc: "Create custom dashboards and automation logic." },
      { title: "AI Integration", desc: "Add intelligence to automate tasks and decisions." },
      { title: "Deployment & Scaling", desc: "Launch and scale across your operations." },
    ],
  },
  {
    label: "AI Service",
    title: "AI-Powered Customer Conversations & Voice Agents",
    description:
      "Capture, qualify, and convert leads automatically with AI-powered voice agents and conversational systems that work across calls, chat, WhatsApp, and your CRM.",
    image: voiceChatImg,
    steps: [
      { title: "Lead Capture & Qualification", desc: "Instantly engages visitors, collects information, and qualifies prospects before they reach your team." },
      { title: "AI Voice & Chat Conversations", desc: "Handles inbound calls, website chat, WhatsApp, and social media conversations 24/7." },
      { title: "Appointment Booking & Follow-Ups", desc: "Automatically books meetings, sends reminders, and follows up with leads until they're ready to buy." },
      { title: "CRM Sync & Human Handoff", desc: "Logs conversations, updates your CRM, and transfers qualified leads to the right team member when needed." },
    ],
  },
  {
    label: "AI Service",
    title: "AI-Powered Content Systems For Fast-Growing Brands , Agencies & Creators",
    description:
      "Automatically discover trends, create platform-specific content, and publish across your social channels — all without manual work.",
    image: consultingImg,
    steps: [
      { title: "Trend Discovery", desc: "Finds trending topics in your niche using real-time search data." },
      { title: "Smart Filtering", desc: "Keeps only content relevant to your brand." },
      { title: "AI Content Creation", desc: "Generates posts, captions, and visuals — Reels, images, UGC style." },
      { title: "Auto Publishing", desc: "Posts directly to Instagram, LinkedIn, Twitter & more." },
    ],
  },
  {
    label: "AI Service",
    title: "AI-Powered Lead Generation Systems",
    description:
      "Automatically discover, qualify, nurture, and convert leads using fully automated AI workflows.",
    image: leadGenImg,
    steps: [
      { title: "Lead Discovery", desc: "Finds qualified prospects automatically from multiple sources." },
      { title: "AI Qualification", desc: "Filters high-intent leads based on your business criteria." },
      { title: "Automated Follow-Ups", desc: "Sends personalized outreach and revives cold leads automatically." },
      { title: "Meeting Booking", desc: "Books qualified meetings directly into your calendar." },
    ],
  },
];

const liquidVariants = [
  "liquid-purple-blue",
  "liquid-blue-pink",
  "liquid-orange-red",
  "liquid-yellow-orange",
];

const ServiceRow = ({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const reversed = index % 2 === 1;
  const variantClass = liquidVariants[0];

  const handleBookCall = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    window.open(
      "https://calendly.com/aditya_das/triggerx-aditya-das-consultation",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const isUgcSection = service.title === "AI-Powered Content Systems For Fast-Growing Brands , Agencies & Creators";

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 ${
        isUgcSection ? "md:grid-cols-[1fr_1.35fr]" : "md:grid-cols-2"
      } gap-10 ${isUgcSection ? "md:gap-10" : "md:gap-16"} items-center transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Text */}
      <div className={`${reversed ? "md:order-2" : "md:order-1"} max-w-lg`}>
        <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight">
          {service.title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {service.description}
        </p>
        {service.steps && (
          <ul className="mt-5 space-y-3">
            {service.steps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleBookCall}
          className={`liquid-btn ${variantClass} mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium`}
        >
          Book A Audit Call
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <div className={`${reversed ? "md:order-1" : "md:order-2"} flex justify-center`}>
        <div className={`relative rounded-2xl overflow-hidden border border-border/60 bg-muted/30 ${
          isUgcSection ? "w-full" : "w-full"
        }`}>
          <img
            src={service.image}
            alt={service.title}
            width={1024}
            height={768}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center max-w-4xl mx-auto mb-12 md:mb-14 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
            We Build <span className="text-primary">Flagship AI</span> Infrastructure for Business
          </h2>
        </div>

        {/* Service rows */}
        <div className="space-y-16 md:space-y-20">
          {services.map((service, idx) => (
            <ServiceRow key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
