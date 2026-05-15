import { useState } from "react";
import { useNavigate } from "@/lib/router-compat";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { X, Download, FileText, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

import resources, { type ResourceConfig } from "@/config/resources";
import { usePageMeta } from "@/hooks/use-page-meta";

const Resources = () => {
  usePageMeta({ title: "Free AI Resources & Guides — Triggerx AI", description: "Download free Triggerx AI resources: AI implementation guides, n8n roadmaps, and curated tool lists for modern businesses.", canonical: "/resources" });
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<ResourceConfig | null>(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "" });
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource) return;
    if (!/^\+\d{7,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))) {
      setPhoneError("Please enter your phone number with country code (e.g., +8801712345678)");
      return;
    }
    setPhoneError("");
    setIsSubmitting(true);

    try {
      await supabase.functions.invoke("save-resource-lead", {
        body: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resourceTitle: selectedResource.title,
        },
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedResource(null);
    setFormData({ fullName: "", email: "", phone: "" });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 mb-8 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium tracking-wide uppercase mb-6">
              <FileText className="w-3.5 h-3.5" />
              Free Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Resource Hub
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Guides, templates, and resources to help you leverage AI automation for your business.
            </p>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {resource.badge && (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-gray-800">
                        <Download className="w-3 h-3" />
                        {resource.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {resource.description}
                  </p>
                  <button
                    onClick={() => setSelectedResource(resource)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors group/btn"
                  >
                    Get Free Resource
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div>
              {/* Modal Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedResource.thumbnail}
                    alt={selectedResource.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {selectedResource.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">Free Resource</p>
                  </div>
                </div>
              {isSubmitted ? (
                <p className="text-sm text-gray-500">
                  Your resource is ready to download.
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Enter your details below to unlock the download.
                </p>
              )}
              </div>

              {isSubmitted ? (
                /* Download State */
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Click the button below to download your resource.
                  </p>
                  {(selectedResource.pdfUrl || selectedResource.externalUrl) && (
                    <a
                      href={selectedResource.externalUrl || selectedResource.pdfUrl}
                      {...(selectedResource.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Now
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setPhoneError(""); }}
                      placeholder="+8801712345678"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    />
                    {phoneError && (
                      <p className="text-xs text-red-500 mt-1">{phoneError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Resources;
