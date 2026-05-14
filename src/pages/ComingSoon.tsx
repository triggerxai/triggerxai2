import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Sparkles } from "lucide-react";
import { Link } from "@/lib/router-compat";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-40 blur-3xl animate-pulse" 
          style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-40 blur-3xl animate-pulse" 
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)', animationDelay: '1s' }} 
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Coming Soon
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
          We're working on something amazing! Our testimonials section is being crafted to showcase the incredible results our clients have achieved.
        </p>

        {/* Notification hint */}
        <div className="flex items-center justify-center gap-2 text-foreground/50 mb-10">
          <Bell className="w-5 h-5" />
          <span>Stay tuned for updates</span>
        </div>

        {/* Back Button */}
        <Link to="/">
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-6 text-lg font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
