import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const LeadForm = ({ onSubmit, onCancel }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    industry: "",
    budget: "",
    description: "",
    contactMethod: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="absolute inset-0 bg-background z-10 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="fullName" className="text-xs">Full Name *</Label>
          <Input
            id="fullName"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="companyName" className="text-xs">Business / Company Name *</Label>
          <Input
            id="companyName"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-xs">Business Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-xs">Phone (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="industry" className="text-xs">Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecommerce">E-Commerce</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="budget" className="text-xs">Monthly Tech/Automation Budget</Label>
          <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<1k">Less than $1k</SelectItem>
              <SelectItem value="1k-5k">$1k - $5k</SelectItem>
              <SelectItem value="5k-10k">$5k - $10k</SelectItem>
              <SelectItem value="10k+">$10k+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="text-xs">Short Description of Need</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="contactMethod" className="text-xs">Preferred Contact Method</Label>
          <Select value={formData.contactMethod} onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="call">Phone Call</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">Submit</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By submitting, you consent to receiving messages from Trigger X about this inquiry.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
