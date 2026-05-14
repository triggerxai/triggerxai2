import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import founderImage from "@/assets/founder-new.png";

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`
          }>

          {/* Left — Text */}
          <div className="space-y-6 text-center md:text-left md:flex md:flex-col md:justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
              Founder-led.
              <br />
              Builder-operated.
              <br />
              Outcome-obsessed.
            </h2>

            <div className="space-y-1">
              


            </div>

            <p className="text-foreground/60 leading-relaxed max-w-md">
              Turns ambiguous ideas into production systems — fast. Known for
              clean execution, scalable automation builds, and an obsession with
              real business outcomes.
            </p>

            <div className="pt-2">
              <button
                onClick={() =>
                  window.open("https://www.youtube.com/@aditya_das_222", "_blank")
                }
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe me on Youtube
              </button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="flex justify-center md:justify-end pt-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15 w-[21.12rem] md:w-[24.96rem]">
              <img
                alt="Aditya Das"
                className="w-full h-auto object-cover select-none pointer-events-none"
                src={founderImage}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default Contact;