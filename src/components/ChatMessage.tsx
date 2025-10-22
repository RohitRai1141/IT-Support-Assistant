import React from 'react';
import { Card, CardContent } from './ui/card';
import { ChatMessage as ChatMessageType } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} gap-1.5 w-full`}
    >
      <Card
        className={`min-w-9 max-w-[320px] px-[15px] py-2.5 border border-solid border-[#444446] ${
          message.sender === 'user'
            ? 'bg-[#007aff] rounded-[12px_12px_0px_12px]'
            : 'bg-[#2d2d2e] rounded-[12px_12px_12px_0px]'
        }`}
      >
        <CardContent className="p-0">
          <p className="font-message-text font-[number:var(--message-text-font-weight)] text-[#f2f2f7] text-[length:var(--message-text-font-size)] tracking-[var(--message-text-letter-spacing)] leading-[var(--message-text-line-height)] whitespace-pre-line">
            {message.text}
          </p>
        </CardContent>
      </Card>

      <div className="py-1">
        <p className="font-caption-2 font-[number:var(--caption-2-font-weight)] text-[#aaaaaa] text-[length:var(--caption-2-font-size)] text-right tracking-[var(--caption-2-letter-spacing)] leading-[var(--caption-2-line-height)]">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};