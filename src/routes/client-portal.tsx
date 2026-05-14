import { createFileRoute } from "@tanstack/react-router";
import ClientPortal from "@/pages/ClientPortal";

export const Route = createFileRoute("/client-portal")({
  component: ClientPortal,
});
