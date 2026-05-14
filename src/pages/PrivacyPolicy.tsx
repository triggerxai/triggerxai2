import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Triggerx Ai</p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">We collect information that you provide directly to us, including when you:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Schedule discovery calls or consultations</li>
                <li>Interact with our AI chatbots or voice AI assistants during demos</li>
                <li>Submit forms on our website or landing pages</li>
                <li>Subscribe to newsletters, updates, or social media channels</li>
                <li>Contact us for support, inquiries, or technical assistance</li>
                <li>Request pricing, demos, or project proposals</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">We may also collect limited technical data such as device information, browser type, and usage analytics to improve our website.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Trigger X uses the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Provide, operate, and improve our AI automation services</li>
                <li>Process payments, transactions, and project onboarding</li>
                <li>Send updates, technical notices, alerts, and support messages</li>
                <li>Respond to comments, questions, and customer service requests</li>
                <li>Analyze service performance and user interactions</li>
                <li>Develop new AI products, automations, and workflow solutions</li>
                <li>Personalize demos, recommendations, and project planning</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">Your data is used solely to deliver and improve our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">We implement industry-standard technical and organizational safeguards to protect your personal information against:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Unauthorized access</li>
                <li>Alteration or deletion</li>
                <li>Disclosure of confidential data</li>
                <li>Misuse or unauthorized processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">For client projects, we follow security measures that align with your company policies, API key handling requirements, and relevant compliance standards.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Trigger X does not sell, trade, or rent your personal information to third parties. We only share information with:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Trusted service providers who assist in running our operations</li>
                <li>Platforms required for project delivery (e.g., CRM tools, automation platforms, call providers)</li>
                <li>Payment processors when necessary</li>
                <li>Legal authorities if required by applicable law</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">All service providers must agree to handle your information securely and confidentially.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. AI Chatbot & Voice AI Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">When you interact with our AI systems (chatbots, lead-gen agents, voice assistants):</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Conversations may be logged for improvement, training, and quality assurance</li>
                <li>Data is processed securely through compliant AI platforms</li>
                <li>No voice or chat data is sold or used for unrelated purposes</li>
                <li>You may request deletion of your interaction data at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">For enterprise clients, custom data-retention and privacy rules can be implemented upon request.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Trigger X uses cookies and similar tracking technologies to:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Improve website performance</li>
                <li>Analyze visitor interactions</li>
                <li>Personalize browsing experience</li>
                <li>Store user preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">You can configure your browser to decline cookies or notify you when one is being used.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li><strong className="text-foreground">Access:</strong> Request a copy of your data</li>
                <li><strong className="text-foreground">Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong className="text-foreground">Deletion:</strong> Request removal of your data ("right to be forgotten")</li>
                <li><strong className="text-foreground">Restriction:</strong> Limit how we process your data</li>
                <li><strong className="text-foreground">Objection:</strong> Opt-out of certain processing activities</li>
                <li><strong className="text-foreground">Withdrawal of Consent:</strong> At any time, for data processed on the basis of consent</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">To exercise any of these rights, simply contact us using the details below.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">If you have any questions about this Privacy Policy or wish to submit a data request, contact:</p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                <strong className="text-foreground">Triggerx Ai — Privacy Team</strong><br />
                Email:{" "}
                <a href="mailto:aditya.das.own@gmail.com" className="text-primary hover:underline font-medium">
                  aditya.das.own@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
