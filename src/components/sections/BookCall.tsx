import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface BookCallProps {
  className?: string;
}

const BookCall = ({ className }: BookCallProps = {}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Cal.com inline embed script
    const script = document.createElement('script');
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.Cal) {
        // @ts-ignore
        window.Cal("init", "inline-embed", { origin: "https://app.cal.com" });
        // @ts-ignore
        window.Cal.ns["inline-embed"]("inline", {
          elementOrSelector: "#cal-inline-embed",
          calLink: "aditya-das-zstju9/45min",
          layout: "month_view"
        });
        // @ts-ignore
        window.Cal.ns["inline-embed"]("ui", {
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="book-call" className={`py-20 px-4 sm:px-6 lg:px-8 pb-32 ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        <div 
          ref={ref} 
          className={`text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">Book a </span>
            <span className="gradient-text">Free Discovery Call</span>
            <span className="text-foreground"> with Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Let's discuss how AI automation can transform your business. Schedule a 45-minute consultation to explore opportunities tailored to your needs.
          </p>
          
          {/* Cal.com inline embed */}
          <div 
            id="cal-inline-embed"
            className="w-full max-w-4xl mx-auto"
            style={{ minHeight: "630px" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default BookCall;
