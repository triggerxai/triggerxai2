import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { TrendingUp, Users, Clock, Zap } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: 2000,
    suffix: "+",
    label: "Hours Saved Monthly",
    description: "Automated workflows for clients"
  },
  {
    icon: TrendingUp,
    value: 300,
    suffix: "%",
    label: "Average ROI Increase",
    description: "Measurable business impact"
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Businesses Transformed",
    description: "Across multiple industries"
  },
  {
    icon: Zap,
    value: 95,
    suffix: "%",
    label: "Client Satisfaction",
    description: "5-star ratings and referrals"
  }
];

const Metrics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Proven Results That Matter
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real impact, measurable outcomes. See how we've helped businesses achieve extraordinary growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MetricCard = ({ metric, index, inView }: { 
  metric: typeof metrics[0], 
  index: number,
  inView: boolean 
}) => {
  const [count, setCount] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = metric.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= metric.value) {
        setCount(metric.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, metric.value]);

  return (
    <div
      className={`relative group transition-all duration-700 delay-${index * 100}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-primary" />
          </div>

          <div className="mb-2">
            <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {count}{metric.suffix}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-1 text-foreground">
            {metric.label}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {metric.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
