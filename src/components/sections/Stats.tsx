import { useInView } from "react-intersection-observer";
import { Bot, Eye, Users } from "lucide-react";

const stats = [
  { value: "75+", label: "Agentic Systems Built", icon: Bot, href: "https://adityadasn8n.gumroad.com/" },
  { value: "1.7M+", label: "Media Views", icon: Eye, href: "https://www.youtube.com/@aditya_das_222" },
  { value: "41K+", label: "Ai Community", icon: Users, href: "https://web.facebook.com/share/g/1DsprQbnKh/" },
];

const Stats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="pt-2 pb-10 md:pb-14 px-4 relative z-10">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <a
              href={stat.href}
              target="_blank"
              rel="noopener noreferrer"
              key={stat.label}
              className={`glass-card-hover text-center px-3 py-3 transition-all duration-700 cursor-pointer hover:scale-105 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-0.5">
                {stat.value}
              </div>
              <p className="text-xs font-medium text-foreground/80">{stat.label}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
