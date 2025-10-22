import React, { useState, KeyboardEvent } from 'react';
import { ImageIcon, MicIcon, SendIcon, HelpCircleIcon } from 'lucide-react';
import { Input } from './ui/input';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onShowHelp: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onShowHelp, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 px-2.5 py-3 bg-[#242426] border-t border-[#444446]">
      <button 
        className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
        onClick={onShowHelp}
        title="Show available topics"
      >
        <HelpCircleIcon className="w-6 h-6 text-[#aaaaaa]" />
      </button>

      <button className="w-6 h-6 flex items-center justify-center opacity-50 cursor-not-allowed">
        <ImageIcon className="w-6 h-6 text-[#aaaaaa]" />
      </button>

      <div className="relative flex-1 h-9">
        <Input
          className="h-9 bg-[#2d2d2e] rounded-[29px] px-4 text-[#f2f2f7] border-none focus:ring-2 focus:ring-[#007aff] placeholder-[#aaaaaa]"
          placeholder="Ask about safety policies..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </div>

      <button 
        className="w-7 h-7 flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-50"
        onClick={handleSend}
        disabled={!inputValue.trim() || isLoading}
      >
        <SendIcon className="w-5 h-5 text-[#007aff]" />
      </button>
    </div>
  );
};