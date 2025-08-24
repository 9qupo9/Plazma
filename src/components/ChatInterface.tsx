// Импорт необходимых библиотек и компонентов
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Menu, X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { Chat } from '../types';



// Интерфейс пропсов для компонента чата
interface ChatInterfaceProps {
  chat: Chat; // Объект чата с сообщениями
  isTyping: boolean; // Флаг состояния печати
  onSendMessage: (message: string) => void; // Функция отправки сообщения
  sidebarOpen?: boolean; // Состояние боковой панели (опционально)
  onToggleSidebar?: () => void; // Функция переключения боковой панели (опционально)
}

// Основной компонент интерфейса чата
export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chat,
  isTyping,
  onSendMessage,
  sidebarOpen = false,
  onToggleSidebar
}) => {
  // Состояние для хранения текста в поле ввода
  const [inputValue, setInputValue] = useState('');

  // Ссылки на DOM элементы для управления прокруткой и фокусом
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Функция автоматической прокрутки к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Эффект для автоматической прокрутки при новых сообщениях или печати
  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, isTyping]);

  // Обработчик отправки сообщения через форму
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Проверка на пустое сообщение и лимит символов
    if (inputValue.trim() && inputValue.length <= 300) {
      onSendMessage(inputValue.trim());
      setInputValue(''); // Очистка поля ввода после отправки
    }
  };

  // Обработчик нажатия клавиш в поле ввода
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Отправка сообщения по Enter (без Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    // Основной контейнер интерфейса чата
    <div className="flex-1 flex flex-col h-full border-consistent-top">
      {/* Заголовок чата - фиксированный */}
      <div
        className="flex-shrink-0 bg-gray-900/95 backdrop-blur-sm border-consistent-bottom"
        style={{ 
          padding: '15.5px 16px'
        }}
      >
        {/* Контейнер элементов заголовка */}
        <div className="flex items-center space-x-3">
          {/* Кнопка мобильного меню - показывается только на мобильных устройствах */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-10 h-10 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 text-white rounded-xl transition-colors shadow-lg border border-gray-700/50 flex items-center justify-center"
            >
              {/* Иконка меню: X при открытом сайдбаре, Menu при закрытом */}
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}

          {/* Аватар чата с градиентным фоном */}
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>

          {/* Информация о чате */}
          <div className="flex-1 min-w-0">
            {/* Название чата с обрезкой длинных заголовков */}
            <h2 className="text-lg font-semibold text-white truncate">
              {chat.title.length > 10 ? chat.title.substring(0, 10) + '...' : chat.title}
            </h2>
            {/* Статистика чата */}
            <p className="text-sm text-gray-400">
              {chat.messages.length} messages • Active now
            </p>
          </div>
        </div>
      </div>

      {/* Область сообщений - прокручиваемая */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 bg-gradient-to-b from-transparent to-gray-950/20 min-h-0">
        {/* Отображение всех сообщений чата с анимацией появления */}
        {chat.messages.map((message, index) => (
          <div key={message.id} className={`animate-in slide-in-from-bottom-4 duration-500`} style={{ animationDelay: `${index * 100}ms` }}>
            <ChatMessage message={message} />
          </div>
        ))}

        {/* Индикатор печати ИИ */}
        {isTyping && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <ChatMessage
              message={{
                id: 'typing', // Временный ID для индикатора печати
                content: '',
                sender: 'ai',
                timestamp: new Date(),
              }}
              isTyping={true}
            />
          </div>
        )}

        {/* Невидимый элемент для автоматической прокрутки к концу */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed - Область ввода SMS с точными параметрами */}
      <div
        className="flex-shrink-0 bg-gray-900/95 backdrop-blur-sm border-consistent-top"
        style={{
          // Внутренние отступы области ввода
          paddingTop: '4.5px', // Верхний отступ
          paddingBottom: '8px', // Нижний отступ
          paddingLeft: '4px', // Левый отступ (px-1)
          paddingRight: '4px', // Правый отступ (px-1)

          // Позиционирование области ввода
          position: 'relative', // Относительное позиционирование
          bottom: '0px', // Прикреплена к низу контейнера
          left: '0px', // Левый край
          right: '0px', // Правый край
          width: '100%', // Полная ширина

          // Дополнительные параметры
          zIndex: 10 // Поверх сообщений
        }}
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Контейнер для поля ввода и кнопки отправки SMS */}
          <div
            className="flex items-center"
            style={{
              // Расстояние между элементами
              gap: '12px', // space-x-3 equivalent (12px между полем ввода и кнопкой)

              // Выравнивание
              alignItems: 'center', // Вертикальное выравнивание по центру
              justifyContent: 'flex-start', // Горизонтальное выравнивание слева

              // Позиционирование контейнера
              position: 'relative',
              width: '100%',
              maxWidth: '1024px', // max-w-4xl equivalent
              margin: '0 auto' // Центрирование контейнера
            }}
          >
            {/* Контейнер поля ввода текста */}
            <div className="flex-1 relative">
              {/* Многострочное поле ввода сообщения */}
              <textarea
                ref={inputRef}
                value={inputValue}
                disabled={isTyping}
                onChange={(e) => {
                  // Ограничение на максимальное количество символов
                  if (e.target.value.length <= 300) {
                    setInputValue(e.target.value);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything... (Max 300 characters, Press Enter to send)"
                className={`w-full px-4 py-2 lg:px-5 lg:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 resize-none transition-all shadow-lg hover:shadow-xl text-sm lg:text-base ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
                rows={1}
                style={{
                  minHeight: '44px', // Минимальная высота поля
                  maxHeight: '120px', // Максимальная высота поля
                }}
              />

              {/* Счетчик символов с цветовой индикацией */}
              <div className={`absolute bottom-2 right-2 text-xs transition-colors ${inputValue.length > 250
                ? inputValue.length >= 300
                  ? 'text-red-400' // Красный при достижении лимита
                  : 'text-yellow-400' // Желтый при приближении к лимиту
                : 'text-gray-500' // Серый в обычном состоянии
                }`}>
                {inputValue.length}/300
              </div>
            </div>

            {/* SMS Send Button - Точные параметры расположения */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping || inputValue.length > 300}
              className="hidden md:flex bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-400 text-white rounded-2xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed items-center justify-center shadow-lg hover:shadow-xl hover:shadow-green-500/25"
              style={{
                // Размеры кнопки
                width: '52px',
                height: '52px',
                minWidth: '52px',
                minHeight: '52px',

                // Позиционирование
                marginLeft: '12px', // Отступ от поля ввода (space-x-3)
                position: 'relative',
                right: '0px', // Расположение справа от поля ввода
                top: '-3px', // Вертикальное выравнивание по центру

                // Дополнительные параметры
                flexShrink: 0, // Не сжимается при недостатке места
                borderRadius: '16px', // rounded-2xl equivalent
                zIndex: 1 // Поверх других элементов
              }}
            >
              {isTyping ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};