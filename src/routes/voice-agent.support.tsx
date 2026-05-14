import { createFileRoute } from "@tanstack/react-router";
import VoiceAgentSupport from "@/pages/VoiceAgentSupport";

export const Route = createFileRoute("/voice-agent/support")({
  component: VoiceAgentSupport,
});
