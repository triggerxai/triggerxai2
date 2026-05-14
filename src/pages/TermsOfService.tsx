import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">Triggerx Ai</p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using any services provided by Triggerx Ai, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms govern your use of our AI automation, chatbot development, lead-generation systems, voice AI solutions, and integration services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Triggerx Ai provides AI-powered automation and digital workflow solutions, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>AI Customer Support Chatbots (website, WhatsApp, Instagram, Messenger, LinkedIn)</li>
                <li>Lead Generation AI Agents for outreach, scoring, and qualification</li>
                <li>Voice AI Assistants for phone orders, reservations, and inbound/outbound calls</li>
                <li>CRM automation & n8n workflow development</li>
                <li>Custom AI integrations (OpenAI, APIs, webhooks, databases)</li>
                <li>AI strategy, consulting, and implementation support</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Service scopes may vary depending on the client's requirements and business objectives.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                All pricing is customized based on project scope, complexity, and expected outcomes. Payment structure (upfront, milestone-based, subscription, or retainer) is defined during the discovery call and finalized in the project proposal.
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Deep-dive or technical consultation sessions may require an advance fee.</li>
                <li>Work begins only after the agreed initial payment or deposit is received.</li>
                <li>Late payments may delay delivery timelines.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Upon full payment, clients receive ownership of all custom-built workflows, automation logic, AI prompt systems, and integrations created specifically for their project.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">Trigger X retains ownership of:</p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Internal frameworks, tools, modules, and reusable components</li>
                <li>General automation methodologies</li>
                <li>AI prompt libraries not exclusive to the client</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                These may be reused in future projects unless explicitly restricted in a separate written agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Privacy & Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Trigger X follows industry-standard practices for secure handling of client data. We ensure:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Data is processed only for delivering the agreed services</li>
                <li>Confidential business information is protected</li>
                <li>API keys and credentials remain secure and encrypted when needed</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Clients are responsible for providing correct, legal, and secure access credentials for integrations. Refer to our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</a>{" "}
                for additional details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Service Level Commitments</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Triggerx Ai adheres to delivery timelines mutually agreed upon in the project contract. Our commitments include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>On-time delivery of project milestones</li>
                <li>Documentation, training, and onboarding after system deployment</li>
                <li>Dedicated support in the defined project period</li>
                <li>Uptime expectations for hosted solutions (when applicable)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Enterprise clients may receive advanced support options such as on-call availability or higher uptime SLAs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Triggerx Ai's total liability is limited to the amount the client paid for the specific services rendered. Triggerx Ai is not liable for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Revenue loss caused by platform/API changes outside our control</li>
                <li>Issues arising from third-party tools (CRM, APIs, hosting providers, etc.)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Clients are responsible for ensuring compliance with all applicable laws, including data usage and communication regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Either party may terminate the agreement with written notice. Upon termination:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1.5 ml-2">
                <li>Clients receive all completed work and documentation</li>
                <li>No refunds are provided for completed or in-progress work unless stated in the contract</li>
                <li>Any pending invoices must be cleared before transfer of deliverables</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Triggerx Ai may terminate services if a client violates terms, misuses the system, or engages in abusive or fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms of Service, you may contact us at:
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                <strong className="text-foreground">Triggerx Ai</strong><br />
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

export default TermsOfService;
