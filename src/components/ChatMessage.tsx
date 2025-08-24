// Импорт необходимых библиотек и компонентов
import React from 'react';
import { Message } from '../types';
import { CodeBlock } from './CodeBlock';
import { User } from 'lucide-react';

// Интерфейс пропсов для компонента сообщения чата
interface ChatMessageProps {
  message: Message; // Объект сообщения
  isTyping?: boolean; // Флаг состояния печати (опционально)
}

// Основной компонент сообщения чата
export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping }) => {
  // Функция рендеринга контента с поддержкой markdown
  const renderContent = (content: string) => {
    // Регулярное выражение для поиска блоков кода в markdown
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // Поиск и обработка всех блоков кода в тексте
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Добавление текста перед блоком кода
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index);
        parts.push(
          <div key={`text-${lastIndex}`} className="prose prose-invert max-w-none break-all overflow-hidden">
            {formatText(textContent)}
          </div>
        );
      }

      // Добавление блока кода с подсветкой синтаксиса
      const language = match[1] || 'javascript'; // Язык по умолчанию - JavaScript
      const code = match[2].trim();
      parts.push(
        <div key={`code-${match.index}`} className="my-4">
          <CodeBlock code={code} language={language} />
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Добавление оставшегося текста после последнего блока кода
    if (lastIndex < content.length) {
      const textContent = content.slice(lastIndex);
      parts.push(
        <div key={`text-${lastIndex}`} className="prose prose-invert max-w-none break-all overflow-hidden">
          {formatText(textContent)}
        </div>
      );
    }

    return parts.length > 0 ? parts : formatText(content);
  };

  // Функция форматирования обычного текста с простой поддержкой markdown
  const formatText = (text: string) => {
    return text
      .split('\n') // Разделение текста по строкам
      .map((line, index) => {
        // Обработка заголовков (жирный текст)
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={index} className="text-amber-300 break-all">{line.slice(2, -2)}</strong>;
        }
        // Обработка маркированных списков
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 break-all">{line.slice(2)}</li>;
        }
        // Обработка инлайн кода
        line = line.replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1 rounded text-amber-300 break-all">$1</code>');

        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: line }}
            className={line ? "mb-2 break-all overflow-hidden" : "mb-1 break-all overflow-hidden"}
            style={{
              wordBreak: 'break-all', // Принудительный перенос длинных слов
              overflowWrap: 'anywhere' // Перенос в любом месте при необходимости
            }}
          />
        );
      });
  };

  return (
    // Основной контейнер сообщения с выравниванием по отправителю
    <div className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {/* Контейнер сообщения с аватаром */}
      <div className={`flex space-x-3 max-w-[85%] sm:max-w-[70%] min-w-0 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Аватар отправителя */}
        <div className={`flex-shrink-0 ${message.sender === 'ai' ? 'w-20 h-20' : 'w-12 h-12'} rounded-full flex items-center justify-center ${message.sender === 'ai'
          ? 'bg-green-600/20 text-green-400' // Стиль для ИИ
          : 'bg-blue-600/20 text-blue-400' // Стиль для пользователя
          }`}>
          {/* Иконка в зависимости от отправителя */}
          {message.sender === 'ai' ? (
            <img
              src={isTyping ? "/smile.png" : "/chat.png"}
              alt="Plasma AI"
              className="w-16 h-16"
            />
          ) : (
            <User size={40} />
          )}
        </div>

        {/* Контейнер содержимого сообщения */}
        <div
          className={`rounded-2xl p-4 break-words overflow-hidden min-w-0 ${message.sender === 'ai'
            ? 'bg-gray-800/50 border border-gray-700' // Стиль для сообщений ИИ
            : 'bg-green-600/20 border border-green-600/30' // Стиль для сообщений пользователя
            }`}
          style={{
            wordBreak: 'break-all', // Принудительный перенос слов
            overflowWrap: 'anywhere', // Перенос в любом месте
            hyphens: 'auto' // Автоматическая расстановка переносов
          }}
        >
          {/* Заголовок сообщения с именем отправителя и временем */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-300">
              {message.sender === 'ai' ? 'Plasma AI' : 'You'}
            </span>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>

          {/* Содержимое сообщения */}
          <div className="text-gray-200 break-words overflow-hidden chat-message-content">
            {isTyping ? (
              // Анимация печати для ИИ
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {/* Три анимированные точки */}
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-400 ml-2">Plasma AI is typing...</span>
              </div>
            ) : (
              // Отображение содержимого сообщения
              renderContent(message.content)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};