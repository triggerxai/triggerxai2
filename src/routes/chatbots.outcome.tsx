import { createFileRoute } from "@tanstack/react-router";
import ChatbotOutcome from "@/pages/ChatbotOutcome";

export const Route = createFileRoute("/chatbots/outcome")({
  component: ChatbotOutcome,
});
