import { createFileRoute } from "@tanstack/react-router";
import VoiceAgentOutcome from "@/pages/VoiceAgentOutcome";

export const Route = createFileRoute("/voice-agent/outcome")({
  component: VoiceAgentOutcome,
});
