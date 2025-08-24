export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
}

export interface ProfileData {
  name: string;
  email: string;
  avatar?: string;
}