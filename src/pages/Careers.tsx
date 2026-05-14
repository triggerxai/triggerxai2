import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "@/lib/router-compat";

const Careers = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-24 px-4 text-center max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
          Careers at Triggerx AI
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto">
          We are not hiring right now, but you can submit your portfolio for future opportunities.
        </p>
        <a
          href="https://form.typeform.com/to/NpuxZgwk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 hover:shadow-lg transition-all duration-300"
        >
          Submit Your Portfolio
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
