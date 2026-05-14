import { Button } from "@/components/ui/button";
import { QuickReplyButton } from "./types";

interface QuickRepliesProps {
  buttons: QuickReplyButton[];
  onSelect: (label: string, value?: string) => void;
}

const QuickReplies = ({ buttons, onSelect }: QuickRepliesProps) => {
  return (
    <div className="px-4 py-3 flex flex-wrap gap-2 border-t border-white/[0.06]">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(button.label, button.action)}
          className="text-xs rounded-full border-purple-500/30 text-purple-300 bg-white/[0.04] hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/50 backdrop-blur-sm transition-all duration-200"
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickReplies;
