import manusAiCover from "@/assets/manus-ai-cover.png";
import aiSystemsCover from "@/assets/6-ai-systems-cover.png";
import top10AiToolsCover from "@/assets/top-10-ai-tools-cover.png";
import n8nRoadmapCover from "@/assets/n8n-roadmap-cover.png";

export interface ResourceConfig {
  title: string;
  description: string;
  thumbnail: string;
  pdfUrl?: string;
  externalUrl?: string;
  badge?: string;
}

/**
 * Add new resources here — the Resource Hub page renders from this array automatically.
 */
const resources: ResourceConfig[] = [
  {
    title: "Why Manus AI Is Better Than OpenClaw and Claude",
    description:
      "A full breakdown of why Manus AI is the next-gen agent — simpler setup, zero API keys, and built for professionals, not developers.",
    thumbnail: manusAiCover,
    pdfUrl: "/resources/The_Frictionless_Agent.pdf",
    badge: "FREE",
  },
  {
    title: "6 AI Systems Every Business Must Implement in 2026",
    description:
      "Instead of spending hours researching AI tools and automation strategies, this guide gives you a simple roadmap to the most impactful AI systems businesses should adopt in 2026.\n\n",
    thumbnail: aiSystemsCover,
    pdfUrl: "/resources/6-AI-Systems-2026.pdf",
    badge: "FREE",
  },
  {
    title: "Top 10 AI Tools You Must Try in 2026",
    description:
      "AI is moving FAST — and if you're not using the right tools, you're already behind. Here are 10 powerful AI tools that can automate work, boost productivity, and scale your business.",
    thumbnail: top10AiToolsCover,
    externalUrl: "https://docs.google.com/document/d/1d6MSOT9FfwiJrvTDpCnAMFAcFNculWcJHoB03-VdN7s/edit?tab=t.0#heading=h.iag4j6ou5fq2",
    badge: "FREE",
  },
  {
    title: "AI Generalist Roadmap: n8n & Automation",
    description:
      "Most people jump straight into n8n without knowing the basics. They get confused, frustrated, and quit. I did the same. Then I realized there's a sequence to learning this stuff.\n",
    thumbnail: n8nRoadmapCover,
    externalUrl: "https://www.notion.so/aditya-das/AI-Generalist-Roadmap-n8n-Automation-No-Code-2e94ae9e65f28001910ecfc749cf2bed?source=copy_link",
    badge: "FREE",
  },
];

export default resources;
