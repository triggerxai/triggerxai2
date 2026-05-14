import { useEffect } from "react";

const ClientPortal = () => {
  useEffect(() => {
    document.title = "Client Portal — FLUXARO × TRIGGERX AI";
    const prevBg = document.body.style.background;
    document.body.style.background = "#0a0a0a";
    return () => { document.body.style.background = prevBg; };
  }, []);

  return (
    <main className="w-screen min-h-screen bg-[#0a0a0a] m-0 p-0 overflow-hidden">
      <iframe
        src="/client-portal.html"
        title="Client Portal Application"
        className="block w-full border-0"
        style={{ height: "100vh", background: "#0a0a0a" }}
      />
    </main>
  );
};

export default ClientPortal;
