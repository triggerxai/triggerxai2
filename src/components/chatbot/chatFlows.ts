import { ChatMessage, ChatState, ChatResponse } from "./types";
import { supabase } from "@/integrations/supabase/client";

const CALENDLY_LINK = "https://calendly.com/aditya_das/triggerx-aditya-das-consultation";

// Function to call OpenAI for custom questions
export const getAIResponse = async (message: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: { message }
    });

    if (error) {
      console.error('Error calling AI function:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again or use the quick reply buttons to get help with specific topics.";
    }

    return data.response;
  } catch (error) {
    console.error('Error in getAIResponse:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again or use the quick reply buttons to get help with specific topics.";
  }
};

export const getInitialMessage = (userName?: string): ChatMessage => ({
  id: "greeting",
  content: userName 
    ? `Hi ${userName}! Welcome to Trigger X — how can I assist you today?`
    : "Hi there! Welcome to Trigger X — how can I assist you today?",
  isUser: false,
  timestamp: new Date(),
  buttons: [
    { label: "Learn about services", action: "learn_services" },
    { label: "View our packages", action: "show_packages" },
    { label: "Show past projects", action: "show_projects" },
    { label: "Book a demo", action: "book_demo" },
    { label: "Talk to a human", action: "talk_human" },
  ],
});

const services = {
  custom_solutions: {
    name: "Custom Solutions",
    description: "We build tailored AI automation systems that perfectly fit your unique business processes and goals — eliminating inefficiencies and unlocking new capabilities.",
  },
  customer_support: {
    name: "Automated Customer Support",
    description: "We deploy intelligent chatbots that resolve 90% of queries 24/7 — freeing your team for high-value tasks while delighting customers.",
  },
  lead_generation: {
    name: "Lead Generation & Cold DM Outreach",
    description: "We build intelligent lead agents that find, qualify, and message leads automatically — saving SDR time and increasing MQLs.",
  },
  voice_assistant: {
    name: "Voice Assistant Integration",
    description: "We integrate AI voice assistants that handle calls, schedule appointments, and qualify leads — providing 24/7 availability with natural conversations.",
  },
  sales_marketing: {
    name: "Sales & Marketing Automation",
    description: "We automate your entire sales funnel from lead capture to nurture sequences — boosting conversions while reducing manual work.",
  },
  social_media: {
    name: "Social Media Automation",
    description: "We create intelligent systems that schedule posts, engage followers, and analyze performance across platforms.",
  },
};

const packages = {
  chatbot: {
    name: "AI ChatBot System",
    features: [
      "24/7 auto-reply (Website/IG/FB/WhatsApp/LinkedIn)",
      "Smart lead qualification & FAQ answering",
      "Auto pricing & user info collection",
      "CRM integration & appointment-link trigger",
      "Human handover & website chat widget",
      "Daily/Weekly/Monthly performance reports",
      "Image-to-Image comparison system",
      "Inventory management integration"
    ],
    delivery: "4-5 day setup • 1 month free support"
  },
  voice: {
    name: "AI Voice Agent System",
    features: [
      "AI calls new leads instantly",
      "Auto appointment booking & reschedule handling",
      "Qualification questions & RAG-based info retrieval",
      "Call recordings, transcripts & AI summaries",
      "CRM auto-sync & follow-up calls",
      "AI objection handling & smart lead scoring"
    ],
    delivery: "6-7 day setup • 1 month free support"
  }
};

const projects = [
  {
    id: "support",
    title: "AI Customer Support Chatbot",
    description: "E-commerce store chatbot handling customer queries 24/7",
    metrics: "90% query resolution, 24/7 availability",
  },
  {
    id: "leadgen",
    title: "Lead Generation AI Agent",
    description: "Intelligent agent that finds, qualifies, and messages leads automatically",
    metrics: "300% qualified leads, 45% conversion",
  },
  {
    id: "voice",
    title: "Voice AI Assistant",
    description: "Multi-location restaurant business handling reservations and inquiries",
    metrics: "80% call automation, 24/7 availability",
  },
];

export const getResponse = (input: string, state: ChatState): ChatResponse => {
  const lowerInput = input.toLowerCase();

  // Pricing inquiry
  if (lowerInput.includes("pric") || lowerInput.includes("cost") || lowerInput.includes("quote")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Our pricing depends on complexity and business needs. The best next step is to book a free 45-minute consultation so we can understand your requirements and share a custom quote.",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Book 45-Min Consultation", action: "open_calendly" },
            { label: "Talk to Sales", action: "talk_human" },
          ],
        },
      ],
      newState: { ...state, currentFlow: "pricing" },
    };
  }

  // Show packages
  if (input === "show_packages" || lowerInput.includes("package")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "We offer two main packages. Which would you like to learn more about?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "AI ChatBot System", action: "package_chatbot" },
            { label: "AI Voice Agent System", action: "package_voice" },
            { label: "Book a Demo", action: "book_demo" },
          ],
        },
      ],
      newState: { ...state, currentFlow: "packages" },
    };
  }

  // Package details
  if (input === "package_chatbot") {
    const pkg = packages.chatbot;
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: `**${pkg.name}**\n\n✅ ${pkg.features.join('\n✅ ')}\n\n📦 ${pkg.delivery}\n\nWould you like to see a demo or get a custom quote?`,
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Book a Demo", action: "book_demo" },
            { label: "Talk to Sales", action: "talk_human" },
            { label: "View Voice Agent Package", action: "package_voice" },
          ],
        },
      ],
      newState: { ...state, currentFlow: "package_chatbot" },
    };
  }

  if (input === "package_voice") {
    const pkg = packages.voice;
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: `**${pkg.name}**\n\n✅ ${pkg.features.join('\n✅ ')}\n\n📦 ${pkg.delivery}\n\nWould you like to see a demo or get a custom quote?`,
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Book a Demo", action: "book_demo" },
            { label: "Talk to Sales", action: "talk_human" },
            { label: "View ChatBot Package", action: "package_chatbot" },
          ],
        },
      ],
      newState: { ...state, currentFlow: "package_voice" },
    };
  }

  // Learn about services
  if (input === "learn_services" || lowerInput.includes("service")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Great — here are the services we specialize in. Which would you like to explore?",
          isUser: false,
          timestamp: new Date(),
          buttons: Object.entries(services).map(([key, service]) => ({
            label: service.name,
            action: `service_${key}`,
          })),
        },
      ],
      newState: { ...state, currentFlow: "services" },
    };
  }

  // Specific service
  const serviceMatch = input.match(/service_(\w+)/);
  if (serviceMatch) {
    const serviceKey = serviceMatch[1];
    const service = services[serviceKey as keyof typeof services];
    if (service) {
      return {
        messages: [
          {
            id: Date.now().toString(),
            content: service.description + " Would you like to see our packages or book a demo?",
            isUser: false,
            timestamp: new Date(),
            buttons: [
              { label: "View Packages", action: "show_packages" },
              { label: "Book a Demo", action: "book_demo" },
              { label: "Talk to Sales", action: "talk_human" },
            ],
          },
        ],
        newState: { ...state, currentFlow: `service_${serviceKey}` },
      };
    }
  }

  // Show projects
  if (input === "show_projects" || lowerInput.includes("project") || lowerInput.includes("case stud") || lowerInput.includes("portfolio")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Here are our featured projects showcased on the website:",
          isUser: false,
          timestamp: new Date(),
          buttons: projects.map(project => ({
            label: project.title,
            action: `project_${project.id}`,
          })),
        },
      ],
      newState: { ...state, currentFlow: "projects" },
    };
  }

  // Project details
  const projectMatch = input.match(/project_(\w+)/);
  if (projectMatch) {
    const projectId = projectMatch[1];
    const project = projects.find(p => p.id === projectId);
    if (project) {
      return {
        messages: [
          {
            id: Date.now().toString(),
            content: `**${project.title}**\n\n${project.description}\n\n📊 Results: ${project.metrics}\n\nWould you like to discuss a similar solution for your business?`,
            isUser: false,
            timestamp: new Date(),
            buttons: [
              { label: "Book a Consultation", action: "book_demo" },
              { label: "Talk to Sales", action: "talk_human" },
              { label: "View Other Projects", action: "show_projects" },
            ],
          },
        ],
        newState: { ...state, currentFlow: `project_${projectId}` },
      };
    }
  }

  // Book a demo
  if (input === "book_demo" || lowerInput.includes("book") || lowerInput.includes("demo") || lowerInput.includes("schedule") || lowerInput.includes("consultation")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Awesome! Our discovery calls are 45 minutes and include a needs assessment + tailored approach with ROI projections. Ready to book?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Open Calendly", action: "open_calendly" },
            { label: "Talk to Sales First", action: "talk_human" },
          ],
        },
      ],
      newState: { ...state, currentFlow: "book_demo" },
    };
  }

  // Open Calendly
  if (input === "open_calendly") {
    window.open(CALENDLY_LINK, "_blank");
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Great! I've opened the Calendly booking page. Feel free to pick a time that works best for you. Is there anything else I can help with?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Learn about services", action: "learn_services" },
            { label: "View our packages", action: "show_packages" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Leave contact info
  if (input === "leave_contact" || lowerInput.includes("contact")) {
    return {
      messages: [],
      newState: { ...state, showLeadForm: true },
    };
  }

  // Talk to human
  if (input === "talk_human" || lowerInput.includes("human") || lowerInput.includes("speak") || lowerInput.includes("representative") || lowerInput.includes("sales")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "I can connect you with Aditya Das (Sales). How would you prefer to reach him?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "WhatsApp", action: "aditya_whatsapp" },
            { label: "Email", action: "aditya_email" },
          ],
        },
      ],
      newState: { ...state, currentFlow: "talk_human" },
    };
  }

  // WhatsApp contact
  if (input.includes("_whatsapp")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Perfect! You can reach Aditya Das on WhatsApp at: **+8801317003255**\n\nFeel free to send a message anytime!",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Back to main menu", action: "main_menu" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Email contact
  if (input.includes("_email")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "Perfect! You can reach Aditya Das via email at: **aditya.das.own@gmail.com**\n\nWe typically respond within 24 hours!",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Back to main menu", action: "main_menu" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Data security
  if (lowerInput.includes("security") || lowerInput.includes("privacy") || lowerInput.includes("data")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "We take data security seriously. You can review our policies here:",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Privacy Policy", action: "open_privacy" },
            { label: "Terms of Service", action: "open_terms" },
            { label: "Talk to Sales", action: "talk_human" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Open Privacy Policy
  if (input === "open_privacy") {
    window.open("https://docs.google.com/document/d/1OA-8UMMbSPP5-qkzRSjEslt4YZJM64X4j086Ms-hcno/edit?usp=sharing", "_blank");
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "I've opened the Privacy Policy for you. Is there anything else I can help with?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Back to main menu", action: "main_menu" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Open Terms
  if (input === "open_terms") {
    window.open("https://docs.google.com/document/d/1XnfTvIQj4QtYvx4WXFjtdvAniRIaCAGv_ZndKE4Ry_E/edit?usp=sharing", "_blank");
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "I've opened the Terms of Service for you. Is there anything else I can help with?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Back to main menu", action: "main_menu" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Main menu
  if (input === "main_menu") {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "How else can I help you today?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Learn about services", action: "learn_services" },
            { label: "View our packages", action: "show_packages" },
            { label: "Show past projects", action: "show_projects" },
            { label: "Book a demo", action: "book_demo" },
            { label: "Talk to a human", action: "talk_human" },
          ],
        },
      ],
      newState: { ...state, currentFlow: null },
    };
  }

  // Who are you / About
  if (lowerInput.includes("who are you") || lowerInput.includes("about you") || lowerInput.includes("trigger x")) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "I'm the Triggerx AI Assistant. Triggerx AI is an AI Automation Agency helping businesses automate customer support, lead generation, operations, and voice systems.\n\n**Team:**\n- Aditya Das — Founder & CEO\n\n**We're available for:**\n- Direct B2B Projects\n- Agency Partnerships\n- AI Education\n- AI Consulting",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "View our packages", action: "show_packages" },
            { label: "Book a Call", action: "book_demo" },
            { label: "Talk to Sales", action: "talk_human" },
          ],
        },
      ],
      newState: state,
    };
  }

  // How we work / Process
  if (lowerInput.includes("how") && (lowerInput.includes("work") || lowerInput.includes("process"))) {
    return {
      messages: [
        {
          id: Date.now().toString(),
          content: "**Our 3-Step Process:**\n\n**Step 01 — Discovery Call (45 mins)**\nDiscuss challenges, goals, automation opportunities.\n\n**Step 02 — Strategy & Planning (2–3 days)**\nCreate custom AI automation roadmap with ROI projections.\n\n**Step 03 — Implementation (1–4 weeks)**\nBuild, test, deploy, integrate AI solution with ongoing support.\n\nReady to start?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Book Discovery Call", action: "open_calendly" },
            { label: "View Packages", action: "show_packages" },
          ],
        },
      ],
      newState: state,
    };
  }

  // Fallback
  return {
    messages: [
      {
        id: Date.now().toString(),
        content: "I'd be happy to help! Here are some options:",
        isUser: false,
        timestamp: new Date(),
        buttons: [
          { label: "Learn about services", action: "learn_services" },
          { label: "View our packages", action: "show_packages" },
          { label: "Book a demo", action: "book_demo" },
          { label: "Talk to a human", action: "talk_human" },
        ],
      },
    ],
    newState: state,
  };
};
