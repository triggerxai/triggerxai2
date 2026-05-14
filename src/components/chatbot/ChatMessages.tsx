import { ChatMessage } from "./types";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: ChatMessage[];
  avatarSrc?: string;
}

const ChatMessages = ({ messages, avatarSrc }: ChatMessagesProps) => {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-2",
            message.isUser ? "justify-end" : "justify-start"
          )}
        >
          {/* Bot Avatar */}
          {!message.isUser && avatarSrc && (
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1 ring-1 ring-purple-500/30">
              <img 
                src={avatarSrc} 
                alt="Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div
            className={cn(
              "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              message.isUser
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md shadow-lg shadow-purple-500/20"
                : "bg-white/[0.06] backdrop-blur-md text-gray-100 border border-white/[0.08] rounded-bl-md shadow-lg"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
