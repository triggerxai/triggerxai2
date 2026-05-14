interface TypingIndicatorProps {
  avatarSrc?: string;
}

const TypingIndicator = ({ avatarSrc }: TypingIndicatorProps) => {
  return (
    <div className="flex items-start gap-2">
      {avatarSrc && (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-purple-500/30">
          <img 
            src={avatarSrc} 
            alt="Assistant" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1 border border-white/[0.08] shadow-lg">
        <div className="flex gap-1">
          <span 
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" 
            style={{ animationDelay: '0ms', animationDuration: '0.6s' }} 
          />
          <span 
            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" 
            style={{ animationDelay: '150ms', animationDuration: '0.6s' }} 
          />
          <span 
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" 
            style={{ animationDelay: '300ms', animationDuration: '0.6s' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
