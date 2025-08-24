// Импорт необходимых библиотек и иконок
import React from 'react';
import { Plus, MessageSquare, Trash2, Sparkles } from 'lucide-react';
import { Chat } from '../types';

// Интерфейс пропсов для компонента боковой панели
interface SidebarProps {
  chats: Chat[]; // Массив чатов для отображения
  activeChat: string | null; // ID активного чата
  isDeleting: string | null; // ID чата, который сейчас удаляется
  onCreateChat: () => void; // Функция создания нового чата
  onSelectChat: (chatId: string) => void; // Функция выбора чата
  onDeleteChat: (chatId: string) => void; // Функция удаления чата
}

// Основной компонент боковой панели с чатами
export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  isDeleting, // Добавляем состояние удаления
  onCreateChat,
  onSelectChat,
  onDeleteChat,
}) => {
  // Сортировка чатов по дате последнего обновления (новые сверху)
  const sortedChats = [...chats].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    // Основной контейнер боковой панели
    <div className="w-80 lg:w-80 sm:w-72 bg-gray-900/95 backdrop-blur-sm flex flex-col h-full shadow-2xl border-consistent-right">
      {/* Заголовок с кнопкой создания нового чата */}
      <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-consistent-bottom">
        {/* Кнопка создания нового чата */}
        <button
          onClick={onCreateChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25"
        >
          <Plus size={18} />
          <span>New Chat</span>
          <Sparkles size={16} className="opacity-75" />
        </button>
      </div>

      {/* Список чатов */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Если чатов нет - показываем заглушку */}
        {sortedChats.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 px-4">
            {/* Иконка-заглушка */}
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-green-400/60" />
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">No chats yet</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Start your first conversation with Plasma AI to unlock the power of intelligent assistance
            </p>
          </div>
        ) : (
          // Отображение списка чатов
          sortedChats.map((chat, index) => (
            <div
              key={chat.id}
              className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeChat === chat.id
                ? 'bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-green-500/30 shadow-lg shadow-green-500/10' // Стиль активного чата
                : 'hover:bg-gray-800/60 border border-transparent hover:border-gray-700/50' // Стиль обычного чата
                } ${index === 0 ? 'ring-1 ring-green-500/20' : ''}`} // Выделение самого нового чата
              onClick={() => onSelectChat(chat.id)}
            >
              {/* Содержимое карточки чата */}
              <div className="flex items-start space-x-3">
                {/* Иконка чата */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeChat === chat.id
                    ? 'bg-green-500/20 text-green-400' // Стиль для активного чата
                    : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300' // Стиль для обычного чата
                    }`}>
                    <MessageSquare size={16} />
                  </div>
                </div>

                {/* Информация о чате */}
                <div className="flex-1 min-w-0">
                  {/* Название чата с обрезкой */}
                  <h3 className={`text-sm font-medium truncate mb-1 ${activeChat === chat.id ? 'text-white' : 'text-gray-200 group-hover:text-white'
                    }`}>
                    {chat.title.length > 10 ? chat.title.substring(0, 10) + '...' : chat.title}
                  </h3>

                  {/* Метаинформация чата */}
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{chat.messages.length} messages</span>
                    <span>•</span>
                    <span>{chat.updatedAt.toLocaleDateString()}</span>
                  </div>

                  {/* Превью последнего сообщения */}
                  {chat.messages.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {chat.messages[chat.messages.length - 1].content.substring(0, 50)}...
                    </p>
                  )}
                </div>
              </div>

              {/* Кнопка удаления чата - всегда видимая в компьютерной версии */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Предотвращение выбора чата при клике на удаление
                  // Блокируем клик если чат уже удаляется
                  if (isDeleting !== chat.id) {
                    onDeleteChat(chat.id);
                  }
                }}
                disabled={isDeleting === chat.id} // Блокируем кнопку если чат удаляется
                className={`absolute top-3 right-3 lg:top-2 lg:right-2 p-3 lg:p-3 transition-all rounded-xl lg:rounded-xl w-12 h-12 lg:w-12 lg:h-12 flex items-center justify-center ${isDeleting === chat.id
                  ? 'text-gray-400 bg-gray-500/10 cursor-not-allowed' // Стиль для удаляющегося чата
                  : 'text-red-500 hover:text-red-400 lg:text-red-500 lg:hover:text-red-400 lg:opacity-100 bg-transparent hover:bg-red-500/10 lg:bg-transparent lg:hover:bg-red-500/20' // Обычный стиль
                  }`}
                style={{ boxShadow: 'none' }}
                title={isDeleting === chat.id ? "Удаление..." : "Удалить чат"} // Динамическая подсказка
              >
                {/* Показываем спиннер при удалении или обычную иконку */}
                {isDeleting === chat.id ? (
                  <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
                ) : (
                  <>
                    {/* Увеличенная иконка для лучшей видимости */}
                    <Trash2 size={20} className="lg:hidden" />
                    <Trash2 size={20} className="hidden lg:block" />
                  </>
                )}
              </button>

              {/* Индикатор активного чата */}
              {activeChat === chat.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-green-500 rounded-r-full" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Подвал боковой панели */}
      <div className="p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 border-consistent-top">
        <div className="text-xs text-gray-500 text-center">
          {/* Статистика чатов */}
          <p className="mb-1">Total chats: {chats.length}</p>
          {/* Брендинг */}
          <p className="text-green-400/70">Powered by Plasma AI</p>
        </div>
      </div>
    </div>
  );
};