import { createFileRoute } from "@tanstack/react-router";
import ROIPage from "@/pages/ROIPage";

export const Route = createFileRoute("/ROI")({
  head: () => ({
    meta: [
      { title: "ROI Calculator — Triggerx AI" },
      { name: "description", content: "Calculate the ROI of AI Voice Agents, Workflow Automation, Chatbots, and Lead Qualification systems in seconds." },
      { property: "og:title", content: "ROI Calculator — Triggerx AI" },
      { property: "og:description", content: "See your potential monthly value, annual return, and payback period from AI automation." },
    ],
  }),
  component: ROIPage,
});
