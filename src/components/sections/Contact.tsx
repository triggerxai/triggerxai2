import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";
import { useState } from "react";

const videos = [
  {
    id: "ThoMIzQPeao",
    url: "https://youtu.be/ThoMIzQPeao",
    title: "Triggerx AI Video 1",
  },
  {
    id: "onCkjp8XZGA",
    url: "https://youtu.be/onCkjp8XZGA",
    title: "Triggerx AI Video 2",
  },
  {
    id: "Nm2_fhDDzwg",
    url: "https://youtu.be/Nm2_fhDDzwg",
    title: "Triggerx AI Video 3",
  },
];

const VideoCard = ({ video }: { video: (typeof videos)[0] }) => {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card-hover aspect-video relative block cursor-pointer group"
      aria-label={video.title}
    >
      <img
        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/30 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(185,166,243,0.35)]">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
      </div>
    </a>
  );
};

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left — Text */}
          <div className="space-y-6 text-center md:text-left md:flex md:flex-col md:justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
              Founder-led.
              <br />
              Builder-operated.
              <br />
              Outcome-obsessed.
            </h2>

            <p className="text-foreground/60 leading-relaxed max-w-md mx-auto md:mx-0">
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
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe me on Youtube
              </button>
            </div>
          </div>

          {/* Right — Video Stack */}
          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col gap-4 w-full max-w-md">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
