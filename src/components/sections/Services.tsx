import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import saasImg from "@/assets/service-saas.jpg";
import voiceImg from "@/assets/service-voice.jpg";
import chatbotImg from "@/assets/service-chatbot.jpg";
import consultingImg from "@/assets/service-consulting.jpg";

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
    title: "AI Voice Agents That Handle Calls",
    description:
      "Automate inbound and outbound calls to qualify leads, book appointments, and sync data.",
    image: voiceImg,
    steps: [
      { title: "Call Handling", desc: "Answer and manage incoming calls 24/7." },
      { title: "Lead Qualification", desc: "Ask questions and filter quality leads." },
      { title: "Appointment Booking", desc: "Schedule calls directly into your calendar." },
      { title: "CRM Sync", desc: "Store call data, transcripts, and summaries." },
    ],
  },
  {
    label: "AI Service",
    title: "AI-Powered Customer Conversations",
    description:
      "Engage, qualify, and convert your leads automatically with intelligent AI conversations across your website, WhatsApp, and CRM.",
    image: chatbotImg,
    steps: [
      { title: "Smart Responses", desc: "Answers questions using your business knowledge." },
      { title: "Lead Capture", desc: "Collects user info and qualifies prospects automatically." },
      { title: "Multi-Channel", desc: "Works on website, WhatsApp, Instagram, and more." },
      { title: "Human Handoff", desc: "Transfers to your team when needed." },
    ],
  },
  {
    label: "AI Service",
    title: "AI-Powered Social Media Management",
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

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-1000 ${
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
          service.title === "AI-Powered Customer Conversations"
            ? "w-[94%]"
            : service.title === "AI-Powered Social Media Management"
            ? "w-[92%]"
            : "w-full"
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
