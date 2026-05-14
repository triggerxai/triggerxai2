import { Instagram, Twitter, Youtube, Linkedin, Facebook } from "lucide-react";
import { useInView } from "react-intersection-observer";
const SocialMedia = ({ className = "" }: { className?: string }) => {
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const socialLinks = [{
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/aditya_das_222/profilecard/?igsh=MXd3OGF1am5ibnRjZA==",
    color: "from-purple-500 via-pink-500 to-orange-500",
    hoverGlow: "hover:shadow-pink-500/50"
  }, {
    name: "X (Twitter)",
    icon: Twitter,
    url: "https://x.com/Aditya_das_222",
    color: "from-blue-400 to-blue-600",
    hoverGlow: "hover:shadow-blue-500/50"
  }, {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCUYswYm83k_1PYdN-1NAk4Q",
    color: "from-red-500 to-red-600",
    hoverGlow: "hover:shadow-red-500/50"
  }, {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/aditya-das-aiagent/",
    color: "from-blue-500 to-blue-700",
    hoverGlow: "hover:shadow-blue-600/50"
  }, {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/share/1C4qX9FLtF/",
    color: "from-blue-600 to-indigo-600",
    hoverGlow: "hover:shadow-indigo-500/50"
  }, {
    name: "Gumroad",
    icon: null,
    url: "https://adityadasn8n.gumroad.com/",
    color: "from-pink-400 to-pink-600",
    hoverGlow: "hover:shadow-pink-500/50",
    isCustomText: true,
    customLetter: "G"
  }, {
    name: "Medium",
    icon: null,
    url: "https://medium.com/@aditya.das.222",
    color: "from-green-400 to-green-600",
    hoverGlow: "hover:shadow-green-500/50",
    isCustomText: true,
    customLetter: "M"
  }];
  return <>
      {/* Section Title - Completely outside the social media section */}
      <div className="px-4 pb-8">
        <h3 ref={ref} className={`text-3xl md:text-4xl font-bold text-foreground text-center transition-all duration-1000 max-w-7xl mx-auto ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Get more <span className="gradient-text">info</span> about us
        </h3>
      </div>

      {/* Social Media Icons Section */}
      <section className={`py-8 px-4 glass-card mx-4 mb-4 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-wrap justify-center items-center gap-6 md:gap-8 py-4 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`group relative transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} style={{
              transitionDelay: `${index * 100}ms`
            }} aria-label={social.name}>
                  {/* Icon only - no background box */}
                  <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-500 group-hover:scale-125">
                    {social.isCustomText ? <span className={`text-3xl font-bold text-muted-foreground group-hover:text-primary transition-all duration-500`}>
                        {social.customLetter}
                      </span> : Icon && <Icon className={`w-8 h-8 text-muted-foreground group-hover:text-primary transition-all duration-500`} />}
                  </div>

                  {/* Label on hover */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-foreground font-medium whitespace-nowrap">
                      {social.name}
                    </span>
                  </div>
                </a>;
          })}
          </div>
        </div>
      </section>
    </>;
};
export default SocialMedia;
