import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/pages/ComingSoon";

export const Route = createFileRoute("/testimonials")({
  component: ComingSoon,
});
