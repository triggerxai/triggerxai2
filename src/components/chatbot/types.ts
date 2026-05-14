export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  buttons?: QuickReplyButton[];
}

export interface QuickReplyButton {
  label: string;
  action: string;
  value?: string;
}

export interface ChatState {
  currentFlow: string | null;
  context: Record<string, any>;
  showLeadForm: boolean;
}

export interface ChatResponse {
  messages: ChatMessage[];
  newState: ChatState;
}
