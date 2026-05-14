import { useInView } from "react-intersection-observer";
import { Brain, Zap, Target, Lightbulb } from "lucide-react";
const toolLogos = [{
  src: "/lovable-uploads/bd3e7234-5007-4e6c-b9fc-188cfa57c917.png",
  alt: "Network Tool"
}, {
  src: "/lovable-uploads/82d002fe-727c-4c9e-b367-19c1287c8d9f.png",
  alt: "Custom Tool"
}, {
  src: "/lovable-uploads/ad595bf3-7830-4f98-8e0e-68bea550af70.png",
  alt: "Custom Tool"
}, {
  src: "/lovable-uploads/3fd056b5-f485-47e7-a373-b3b104214614.png",
  alt: "VAPI"
}, {
  src: "/lovable-uploads/growth-logo.jpg",
  alt: "Growth Analytics"
}, {
  src: "/lovable-uploads/custom-logo.png",
  alt: "Custom Tool"
}];
const AnimatedLogosSection = () => {
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  return <div ref={ref} className="mt-20 py-12 overflow-hidden">
      <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap max-w-6xl mx-auto px-4">
        {toolLogos.map((logo, index) => {
        const isLeftSide = index < toolLogos.length / 2;
        return <div key={index} className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${inView ? 'opacity-100 translate-x-0 scale-100' : `opacity-0 scale-75 ${isLeftSide ? '-translate-x-32 md:-translate-x-48' : 'translate-x-32 md:translate-x-48'}`}`} style={{
          transitionDelay: `${index * 150}ms`
        }}>
              <div className="glass-card-hover p-6 cursor-pointer group gradient-border">
                <img src={logo.src} alt={logo.alt} className="w-16 h-16 md:w-20 md:h-20 object-contain group-hover:brightness-110 transition-all duration-300" />
              </div>
            </div>;
      })}
      </div>
    </div>;
};
const skills = [{
  name: "AI Agents Development",
  percentage: 95,
  icon: Brain
}, {
  name: "n8n Automation",
  percentage: 90,
  icon: Zap
}, {
  name: "Chatbot Development",
  percentage: 88,
  icon: Target
}, {
  name: "Workflow Optimization",
  percentage: 92,
  icon: Lightbulb
}];
const About = () => {
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  return <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Full Width Text Content */}
        

        {/* Tools & Technologies */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">Your <span className="gradient-text">projects</span> deserves better tools</h3>
          
        </div>

        {/* Animated Logos Section */}
        <AnimatedLogosSection />
      </div>
    </section>;
};
export default About;
