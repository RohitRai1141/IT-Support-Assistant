import { useState, useCallback } from 'react';
import { ChatMessage, ChatState } from '../types/chat';
import { SafetyService } from '../services/safetyService';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        sender: 'assistant',
        text: 'Welcome to Safety Induction! I can help you with safety policies and procedures.',
        timestamp: new Date()
      }
    ],
    isLoading: false
  });

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    // Add user message
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    try {
      // Get response from safety service
      const response = await SafetyService.searchSafetyInfo(text.trim());

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Sorry, I encountered an error. Please make sure the JSON server is running on port 3001.',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }));
    }
  }, []);

  const showHelp = useCallback(() => {
    const topics = SafetyService.getAllTopics();
    const helpMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'assistant',
      text: `Here are the available safety topics:\n\n${topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n')}\n\nJust type any keyword related to these topics!`,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, helpMessage]
    }));
  }, []);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    sendMessage,
    showHelp
  };
};
