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

const FeaturedVideo = ({ video }: { video: (typeof videos)[0] }) => {
  return (
    <a
      key={video.id}
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card-hover aspect-video relative block cursor-pointer group rounded-2xl overflow-hidden animate-fade-in"
      aria-label={video.title}
    >
      <img
        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        }}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/30 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(185,166,243,0.4)]">
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </div>
      </div>
    </a>
  );
};

const Thumbnail = ({
  video,
  active,
  onClick,
}: {
  video: (typeof videos)[0];
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play ${video.title}`}
      className={`relative aspect-video rounded-xl overflow-hidden flex-1 group transition-all duration-300 hover:scale-[1.04] shadow-md hover:shadow-lg ${
        active ? "ring-2 ring-primary/60 shadow-[0_0_20px_rgba(185,166,243,0.35)]" : "ring-1 ring-black/5"
      }`}
    >
      <img
        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center ring-1 ring-white/30">
          <Play className="w-3 h-3 text-white fill-white ml-0.5" />
        </div>
      </div>
    </button>
  );
};

const NeonCTA = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative inline-flex items-center justify-center rounded-full p-[1.5px] transition-transform duration-300 hover:scale-[1.03]"
  >
    <span
      className="absolute inset-0 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "conic-gradient(from 0deg, #b9a6f3, #67e8f9, #bef264, #b9a6f3)",
        filter: "blur(0.5px)",
      }}
      aria-hidden
    />
    <span
      className="absolute -inset-1 rounded-full opacity-40 group-hover:opacity-70 blur-md transition-opacity duration-300"
      style={{
        background:
          "conic-gradient(from 0deg, #b9a6f3, #67e8f9, #bef264, #b9a6f3)",
      }}
      aria-hidden
    />
    <span className="relative inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0a0a0a] text-white text-base font-semibold tracking-tight">
      {label}
    </span>
  </button>
);

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeId, setActiveId] = useState(videos[0].id);
  const activeVideo = videos.find((v) => v.id === activeId) ?? videos[0];

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

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <NeonCTA
                label="Book a Slot"
                onClick={() =>
                  window.open(
                    "https://calendly.com/aditya_das/triggerx-aditya-das-consultation",
                    "_blank"
                  )
                }
              />
              <NeonCTA
                label="My FREE Courses"
                onClick={() => window.open("https://agentsspace.shop/", "_blank")}
              />
            </div>
          </div>

          {/* Right — Video Showcase */}
          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col gap-3 w-full max-w-md">
              <FeaturedVideo key={activeVideo.id} video={activeVideo} />
              <div className="flex gap-3">
                {videos
                  .filter((v) => v.id !== activeId)
                  .map((video) => (
                    <Thumbnail
                      key={video.id}
                      video={video}
                      active={false}
                      onClick={() => setActiveId(video.id)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
