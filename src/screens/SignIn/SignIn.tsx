import { XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { ChatMessage } from "../../components/ChatMessage";
import { ChatInput } from "../../components/ChatInput";
import { useChat } from "../../hooks/useChat";

export const SignIn = (): JSX.Element => {
  const { messages, isLoading, sendMessage, showHelp } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <main className="flex flex-col h-screen bg-[#242426]">
      {/* Header */}
      <header className="flex h-20 items-center justify-between px-2.5 py-2 bg-[#242426] border-b border-[#444446]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/safety-icon.png" alt="Safety Bot" />
              <AvatarFallback className="bg-[#007aff] text-white">SB</AvatarFallback>
            </Avatar>

            <h1 className="font-heading-1 font-[number:var(--heading-1-font-weight)] text-[#f2f2f7] text-[length:var(--heading-1-font-size)] tracking-[var(--heading-1-letter-spacing)] leading-[var(--heading-1-line-height)]">
              Safety Induction Bot
            </h1>
          </div>

          <div className="w-[8.16px] h-[8.16px] bg-[#0b84ff] rounded-[64px]" />
        </div>

        <div className="flex items-start gap-3">
          <XIcon className="w-5 h-5 text-[#f2f2f7] cursor-pointer hover:opacity-70 transition-opacity" />
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 pt-[20px] px-[30px] bg-[#242426] overflow-hidden">
        <ScrollArea className="h-full w-full pr-4" ref={scrollAreaRef}>
          <div className="flex flex-col w-full">
            {/* Timestamp */}
            <div className="h-[47px] relative mb-4">
              <div className="absolute top-[15px] left-0 font-caption-1 font-[number:var(--caption-1-font-weight)] text-[#aaaaaa] text-[length:var(--caption-1-font-size)] tracking-[var(--caption-1-letter-spacing)] leading-[var(--caption-1-line-height)]">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 w-full pb-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-1.5 w-full">
                  <div className="min-w-9 max-w-[238px] px-[15px] py-2.5 border border-solid border-[#444446] bg-[#2d2d2e] rounded-[12px_12px_12px_0px]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#aaaaaa] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#aaaaaa] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#aaaaaa] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ScrollBar orientation="vertical" className="bg-[#2d2d2e] w-3.5">
            <div className="w-3 h-10 bg-[#545456] rounded-md mx-auto" />
          </ScrollBar>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={sendMessage}
        onShowHelp={showHelp}
        isLoading={isLoading}
      />
    </main>
  );
};