import { useState, useCallback } from 'react';
import { Chat, Message } from '../types';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Защита от множественных кликов

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    return newChat.id;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!activeChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message
    setChats(prev => prev.map(chat => 
      chat.id === activeChat 
        ? { 
            ...chat, 
            messages: [...chat.messages, userMessage],
            updatedAt: new Date(),
            title: chat.messages.length === 0 ? content.slice(0, 30) + '...' : chat.title
          }
        : chat
    ));

    // Simulate AI typing
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: 'ai',
        timestamp: new Date(),
      };

      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { 
              ...chat, 
              messages: [...chat.messages, aiMessage],
              updatedAt: new Date()
            }
          : chat
      ));
      
      setIsTyping(false);
    }, 2000);
  }, [activeChat]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      `Thank you for your message: "${userMessage}". I'm Plasma AI, here to help you with various tasks and questions.`,
      `I understand you're asking about: "${userMessage}". Let me provide you with a comprehensive response with some code examples:\n\n\`\`\`javascript\nconst response = {\n  message: "${userMessage}",\n  timestamp: new Date(),\n  helpful: true\n};\nconsole.log(response);\n\`\`\`\n\nThis demonstrates how I can help with coding tasks!`,
      `Regarding "${userMessage}" - here's what I can tell you:\n\n**Key Points:**\n- Point 1: Detailed explanation\n- Point 2: Additional context\n- Point 3: Further insights\n\nWould you like me to elaborate on any of these points?`,
      `Great question about "${userMessage}"! Here's a Python example:\n\n\`\`\`python\ndef process_query(query):\n    \"\"\"Process user query and return response\"\"\"\n    return f"Processing: {query}"\n\nresult = process_query("${userMessage}")\nprint(result)\n\`\`\`\n\nThis shows how I can help with different programming languages!`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const deleteChat = useCallback((chatId: string) => {
    // Защита от множественных кликов - если уже удаляем этот чат, игнорируем
    if (isDeleting === chatId) {
      return;
    }

    // Устанавливаем флаг удаления
    setIsDeleting(chatId);

    // Удаляем чат через небольшую задержку для предотвращения множественных кликов
    setTimeout(() => {
      setChats(prev => {
        const filteredChats = prev.filter(chat => chat.id !== chatId);
        
        // Если это был последний чат, создаем дефолтный чат
        if (filteredChats.length === 0) {
          const defaultChat: Chat = {
            id: Date.now().toString(),
            title: 'New Chat',
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          // Устанавливаем дефолтный чат как активный
          setActiveChat(defaultChat.id);
          setIsDeleting(null); // Сбрасываем флаг удаления
          return [defaultChat];
        }
        
        // Если удаляемый чат был активным, выбираем первый из оставшихся
        if (activeChat === chatId && filteredChats.length > 0) {
          setActiveChat(filteredChats[0].id);
        }
        
        setIsDeleting(null); // Сбрасываем флаг удаления
        return filteredChats;
      });
    }, 100); // Небольшая задержка для предотвращения множественных кликов
  }, [activeChat, isDeleting]);

  const getCurrentChat = useCallback(() => {
    return chats.find(chat => chat.id === activeChat) || null;
  }, [chats, activeChat]);

  return {
    chats,
    activeChat,
    isTyping,
    isDeleting, // Добавляем состояние удаления
    createNewChat,
    sendMessage,
    deleteChat,
    setActiveChat,
    getCurrentChat,
  };
};