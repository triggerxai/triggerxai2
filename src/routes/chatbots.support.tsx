import { createFileRoute } from "@tanstack/react-router";
import ChatbotSupport from "@/pages/ChatbotSupport";

export const Route = createFileRoute("/chatbots/support")({
  component: ChatbotSupport,
});
