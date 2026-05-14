import { useInView } from "react-intersection-observer";
import gumroadLogo from "@/assets/gumroad-logo-color.png";
import riwhapLogo from "@/assets/riwhap-logo.png";
import vividautomateLogo from "@/assets/vividautomate-logo.jpg";
import teamEonLogo from "@/assets/team-eon-logo.jpg";
import agentsSpaceLogo from "@/assets/agents-space-logo.png";
import snbdHostLogo from "@/assets/snbd-host-logo.png";
import fluxaroLogo from "@/assets/fluxaro-logo.png";

const logos = [
  { src: gumroadLogo, alt: "Gumroad", href: "https://adityadasn8n.gumroad.com/", label: null },
  { src: riwhapLogo, alt: "RiWhap", href: null, label: null },
  { src: teamEonLogo, alt: "Team EON", href: null, label: "Team EON" },
  { src: vividautomateLogo, alt: "VividAutomate", href: "https://vividautomate.com/", label: "VividAutomate", rounded: true },
  { src: agentsSpaceLogo, alt: "Agents Space", href: null, label: "Agents Space", rounded: true },
  { src: snbdHostLogo, alt: "SNBD HOST", href: null, label: null },
  { src: fluxaroLogo, alt: "Fluxaro", href: null, label: null },
];

const LogoItem = ({ logo }: { logo: typeof logos[number] }) => {
  return (
    <div className="flex items-center gap-2 shrink-0 px-8">
      <img
        src={logo.src}
        alt={logo.alt}
        className={`h-10 md:h-12 w-auto object-contain ${logo.rounded ? "rounded-lg" : ""}`}
      />
      {logo.label && (
        <span className="text-xl md:text-2xl font-bold text-foreground select-none whitespace-nowrap">
          {logo.label}
        </span>
      )}
    </div>
  );
};

const TrustedBy = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`py-10 md:py-12 px-4 transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Trusted by
        </h2>

        <div className="relative overflow-hidden group">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused]">
            {/* Render logos twice for seamless loop */}
            {[...logos, ...logos].map((logo, i) => (
              <LogoItem key={i} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
