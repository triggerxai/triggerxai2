import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const testimonials = [{
  name: "Michael Chen",
  role: "Operations Director",
  company: "GlobalTrade Inc",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  rating: 5,
  text: "The workflow automation Aditya implemented saved us 40 hours per week in manual data entry. His attention to detail and understanding of our business needs was exceptional. Highly recommended!",
  project: "B2B Business Automation"
}, {
  name: "Emily Rodriguez",
  role: "Marketing Manager",
  company: "GrowthHub Agency",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  rating: 5,
  text: "Our lead generation increased by 300% after implementing Aditya's AI agent system. The quality of leads improved dramatically, and our conversion rates are through the roof. Amazing work!",
  project: "Lead Generation AI Agent"
}, {
  name: "David Park",
  role: "Founder",
  company: "InnovateLab",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  rating: 5,
  text: "Working with Aditya was a game-changer for our startup. His AI automation solutions helped us scale operations without hiring additional staff. Professional, reliable, and incredibly skilled.",
  project: "Complete Business Automation"
}];
const Testimonials = () => {
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);
  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };
  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };
  return <section id="testimonials" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            
          </h2>
          
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          

          {/* Navigation Arrows */}
          
        </div>
      </div>
    </section>;
};
export default Testimonials;