import { useState, useEffect, useRef, useCallback } from "react";
import { Send, MessageCircle, X, Bot, User, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chatbot/types";
import { getAIResponse } from "@/components/chatbot/chatFlows";
import ReactMarkdown from "react-markdown";
import triggerxLogo from "@/assets/triggerx-logo.webp";

const CALENDLY_LINK = "https://calendly.com/aditya_das/triggerx-aditya-das-consultation";
const WHATSAPP_LINK = "https://wa.me/8801317003255?text=" + encodeURIComponent("Hi Aditya, I'm interested in AI automation for my business!");

type ChatPhase = "ask_name" | "main" | "chatbot_options" | "voice_options";

interface FAQChatDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MAIN_BUTTONS = [
  { label: "AI Chatbots", action: "ai_chatbots" },
  { label: "AI Voice Agents", action: "ai_voice" },
  { label: "Book a Call", action: "book_call" },
  { label: "Talk to Human", action: "talk_human" },
];

const FAQChatDialog = ({ open, onOpenChange }: FAQChatDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("ask_name");
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivitySent = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // Initialize
  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      hasInitialized.current = true;
      setMessages([{
        id: "welcome",
        content: "Hi there.\nWelcome to **Triggerx AI**.\n\nBefore we start, may I know what's your name?",
        isUser: false,
        timestamp: new Date(),
      }]);
      setPhase("ask_name");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (inactivitySent.current || phase === "ask_name") return;
    inactivityTimer.current = setTimeout(() => {
      if (!inactivitySent.current) {
        inactivitySent.current = true;
        setMessages(prev => [...prev, {
          id: "inactivity-" + Date.now(),
          content: "Curious how AI automation could help your business?\n\nI can show you how companies use AI to capture leads and automate support.",
          isUser: false,
          timestamp: new Date(),
          buttons: MAIN_BUTTONS,
        }]);
      }
    }, 20000);
  }, [phase]);

  useEffect(() => {
    if (isOpen && phase !== "ask_name") resetInactivityTimer();
    return () => { if (inactivityTimer.current) clearTimeout(inactivityTimer.current); };
  }, [isOpen, phase, resetInactivityTimer]);

  const addBotMessage = async (msg: ChatMessage) => {
    setIsTyping(true);
    const delay = msg.content.length < 100 ? 600 : 1200;
    await new Promise(r => setTimeout(r, delay));
    setIsTyping(false);
    setMessages(prev => [...prev, msg]);
  };

  const handleButtonClick = async (label: string, action: string) => {
    resetInactivityTimer();
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: label,
      isUser: true,
      timestamp: new Date(),
    }]);

    switch (action) {
      case "ai_chatbots":
        setPhase("chatbot_options");
        await addBotMessage({
          id: Date.now().toString(),
          content: "Great choice! What would you like to know about our **AI Chatbot System**?",
          isUser: false,
          timestamp: new Date(),
           buttons: [
            { label: "Features", action: "chatbot_features" },
            { label: "Results", action: "chatbot_results" },
            { label: "Back", action: "back_main" },
          ],
        });
        break;

      case "ai_voice":
        setPhase("voice_options");
        await addBotMessage({
          id: Date.now().toString(),
          content: "Awesome! What would you like to know about our **AI Voice Agent System**?",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Features", action: "voice_features" },
            { label: "Results", action: "voice_results" },
            { label: "Back", action: "back_main" },
          ],
        });
        break;

      case "chatbot_features":
        await addBotMessage({
          id: Date.now().toString(),
          content: "The full chatbot features are already listed on the website.\n\nPlease check the **AI Chatbot System** section to see all capabilities.\n\nWant to explore something else?",
          isUser: false,
          timestamp: new Date(),
          buttons: MAIN_BUTTONS,
        });
        setPhase("main");
        break;

      case "chatbot_results":
        await addBotMessage({
          id: Date.now().toString(),
          content: "Here's what businesses typically achieve with AI chatbots:\n\n- 24/7 instant customer replies\n- Faster lead capture\n- Reduced support workload\n- Higher response speed\n- Improved customer experience\n\nMany businesses see **better conversions** and **faster support resolution** after implementing automation.",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Book a Call", action: "book_call" },
            { label: "Back", action: "back_main" },
          ],
        });
        setPhase("main");
        break;

      case "voice_features":
        await addBotMessage({
          id: Date.now().toString(),
          content: "The full AI Voice Agent features are listed on the website.\n\nPlease check the **AI Voice Agent System** section for the detailed capabilities.\n\nAnything else I can help with?",
          isUser: false,
          timestamp: new Date(),
          buttons: MAIN_BUTTONS,
        });
        setPhase("main");
        break;

      case "voice_results":
        await addBotMessage({
          id: Date.now().toString(),
          content: "Businesses use AI voice agents to:\n\n- Automatically call new leads\n- Book appointments instantly\n- Follow up with missed prospects\n- Handle rescheduling or cancellations\n- Reduce manual sales calls\n\nThis helps teams **close leads faster** and **scale outreach automatically**.",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Book a Call", action: "book_call" },
            { label: "Back", action: "back_main" },
          ],
        });
        setPhase("main");
        break;

      case "book_call":
        await addBotMessage({
          id: Date.now().toString(),
          content: "Want to discuss automation for your business?\n\nBook a free 45-minute consultation with our team.",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Click here to book a call", action: "open_calendly" },
            { label: "Back", action: "back_main" },
          ],
        });
        break;

      case "open_calendly":
        window.open(CALENDLY_LINK, "_blank");
        await addBotMessage({
          id: Date.now().toString(),
          content: "Great. I've opened the booking page for you.\n\nPick a time that works best. Is there anything else I can help with?",
          isUser: false,
          timestamp: new Date(),
          buttons: MAIN_BUTTONS,
        });
        setPhase("main");
        break;

      case "talk_human":
        await addBotMessage({
          id: Date.now().toString(),
          content: "No problem. You can talk directly with us on WhatsApp.",
          isUser: false,
          timestamp: new Date(),
          buttons: [
            { label: "Chat on WhatsApp", action: "open_whatsapp" },
            { label: "Back", action: "back_main" },
          ],
        });
        break;

      case "open_whatsapp":
        window.open(WHATSAPP_LINK, "_blank");
        await addBotMessage({
          id: Date.now().toString(),
          content: "I've opened WhatsApp for you.\n\nAnything else I can help with?",
          isUser: false,
          timestamp: new Date(),
          buttons: MAIN_BUTTONS,
        });
        setPhase("main");
        break;

      case "back_main":
        await addBotMessage({
          id: Date.now().toString(),
          content: `Sure${userName ? ` ${userName}` : ""}! What would you like to explore?`,
          isUser: false,
          timestamp: new Date(),
          buttons: MAIN_BUTTONS,
        });
        setPhase("main");
        break;

      default:
        break;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userInput = input.trim();
    setInput("");
    resetInactivityTimer();

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: userInput,
      isUser: true,
      timestamp: new Date(),
    }]);

    // Handle name phase
    if (phase === "ask_name") {
      const name = userInput.split(" ")[0];
      setUserName(name);
      setPhase("main");
      await addBotMessage({
        id: Date.now().toString(),
        content: `Hello ${name}. How can I help you today?`,
        isUser: false,
        timestamp: new Date(),
        buttons: MAIN_BUTTONS,
      });
      return;
    }

    // Free-text → AI response
    setIsTyping(true);
    try {
      const history = messages
        .filter(m => m.id !== "welcome")
        .slice(-10)
        .map(m => `${m.isUser ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");
      const contextMessage = history
        ? `Previous conversation:\n${history}\n\nUser: ${userInput}`
        : userInput;

      const aiResponse = await getAIResponse(contextMessage);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        buttons: MAIN_BUTTONS,
      }]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Sorry, I'm having a moment. Please try again or use the options below.",
        isUser: false,
        timestamp: new Date(),
        buttons: MAIN_BUTTONS,
      }]);
    }
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px] max-h-[85vh] p-0 overflow-hidden border border-gray-200/80 bg-white shadow-2xl shadow-gray-200/50 rounded-2xl gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-200 border border-violet-100">
                <img src={triggerxLogo} alt="Triggerx AI" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">Triggerx AI Assistant</h3>
              <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Online now
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-violet-50 text-violet-600 px-2 py-1 rounded-full font-semibold border border-violet-100">
            AI Powered
          </span>
        </div>

        {/* Messages Area */}
        <div className="flex flex-col h-[55vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2.5 ${message.isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {!message.isUser && (
                  <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 mt-1 shadow-sm border border-violet-100">
                    <img src={triggerxLogo} alt="Bot" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-md shadow-md border border-primary/20"
                      : "bg-white text-gray-700 border border-gray-100 rounded-bl-md shadow-sm"
                  }`}
                >
                  {message.isUser ? (
                    <p className="whitespace-pre-wrap text-primary-foreground">{message.content}</p>
                  ) : (
                    <div className="prose prose-sm prose-gray max-w-none [&>p]:mb-1.5 [&>p:last-child]:mb-0 [&>ul]:mb-1 [&>ul]:mt-1">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
                {message.isUser && (
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start animate-in fade-in duration-200">
                <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 mt-1 shadow-sm border border-violet-100">
                  <img src={triggerxLogo} alt="Bot" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5 border border-gray-100 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {lastMessage?.buttons && !isTyping && (
            <div className="px-4 py-3 flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50/50">
              {lastMessage.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button.label, button.action)}
                  className="text-xs font-medium rounded-full px-3.5 py-2 border border-violet-200 text-violet-700 bg-white hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 shadow-sm hover:shadow"
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2 items-center bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
              <Input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                placeholder={phase === "ask_name" ? "Type your name..." : "Ask me anything about AI automation…"}
                disabled={isTyping}
                className="flex-1 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-gray-800 p-0 h-auto"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={isTyping || !input.trim()}
                className="shrink-0 h-8 w-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-sm disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3 pt-1 bg-white">
          <p className="text-[10px] text-gray-300 text-center">
            Powered by <span className="text-violet-400 font-medium">Triggerx AI</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FAQChatDialog;
