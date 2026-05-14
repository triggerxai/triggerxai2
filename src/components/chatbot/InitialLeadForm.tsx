import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface InitialLeadFormProps {
  onSubmit: (data: { fullName: string; email: string; interest: string }) => void;
}

const InitialLeadForm = ({ onSubmit }: InitialLeadFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    interest: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.interest.trim()) {
      newErrors.interest = "Please tell us what you're interested in";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Save lead to edge function (which saves to Google Sheet)
      await supabase.functions.invoke('save-lead', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          interest: formData.interest
        }
      });
    } catch (error) {
      console.error('Error saving lead:', error);
    }
    
    setIsSubmitting(false);
    onSubmit(formData);
  };

  return (
    <div className="p-6 glass-card m-4 rounded-xl">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Welcome to Trigger X! 👋
        </h3>
        <p className="text-sm text-muted-foreground">
          Please share your details to start chatting with us.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className={`bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 ${errors.fullName ? 'border-destructive' : ''}`}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 ${errors.email ? 'border-destructive' : ''}`}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <Textarea
            placeholder="What are you interested in? *"
            value={formData.interest}
            onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
            rows={3}
            className={`bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 resize-none ${errors.interest ? 'border-destructive' : ''}`}
          />
          {errors.interest && (
            <p className="text-xs text-destructive mt-1">{errors.interest}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Start Chatting →"}
        </Button>
        
        <p className="text-[10px] text-muted-foreground text-center">
          By continuing, you agree to our{" "}
          <a 
            href="https://docs.google.com/document/d/1OA-8UMMbSPP5-qkzRSjEslt4YZJM64X4j086Ms-hcno/edit?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </a>
          {" "}and{" "}
          <a 
            href="https://docs.google.com/document/d/1XnfTvIQj4QtYvx4WXFjtdvAniRIaCAGv_ZndKE4Ry_E/edit?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Terms of Service
          </a>
        </p>
      </form>
    </div>
  );
};

export default InitialLeadForm;
