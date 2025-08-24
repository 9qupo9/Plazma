// Импорт необходимых библиотек и иконок
import React from 'react';
import { Github, MessageCircle } from 'lucide-react';

// Основной компонент подвала сайта
export const Footer: React.FC = () => {
  return (
    // Основной контейнер подвала
    <footer className="bg-gray-900/95 backdrop-blur-sm border-consistent-top">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-1 sm:py-4">
        {/* Мобильная версия - компактная структура */}
        <div className="block sm:hidden space-y-1">
          {/* Верхняя строка - Created with ♥ for Plasma project по центру */}
          <div className="text-xs text-gray-300 text-center w-full" style={{ lineHeight: '14px' }}>
            Created with <span className="text-red-400 animate-pulse">♥</span> for{' '}
            <span className="text-green-600 font-medium hover:text-green-500 transition-colors">Plasma project</span>
          </div>

          {/* Средняя строка - Created by Unity Nodes слева, социальные кнопки справа */}
          <div className="flex items-center justify-between w-full">
            {/* Created by Unity Nodes - слева */}
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-400" style={{ lineHeight: '14px' }}>Created by</span>
              <span className="text-xs font-medium text-white bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent" style={{ lineHeight: '14px' }}>
                Unity Nodes
              </span>
            </div>

            {/* Социальные кнопки - справа */}
            <div className="flex items-center space-x-1">
              {/* Ссылка на GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all transform hover:scale-110 active:scale-95"
                title="GitHub"
              >
                <Github size={18} />
              </a>

              {/* Ссылка на Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all transform hover:scale-110 active:scale-95"
                title="Discord"
              >
                <MessageCircle size={18} />
              </a>

              {/* Ссылка на X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all transform hover:scale-110 active:scale-95"
                title="X (Twitter)"
              >
                {/* SVG иконка X (Twitter) - оптимизированная */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Нижняя строка - Копирайт по центру */}
          <div className="text-sm text-gray-400 text-center w-full" style={{ lineHeight: '16px' }}>
            © 2025 <span className="text-green-500 font-medium">Plasma AI</span> All rights reserved
          </div>
        </div>

        {/* Десктопная версия - оригинальная */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Левая сторона - Копирайт */}
          <div className="text-sm text-gray-400" style={{ lineHeight: '16px' }}>
            © 2025 <span className="text-green-500 font-medium">Plasma AI</span> All rights reserved
          </div>

          {/* Центр - Сообщение с сердечком */}
          <div className="text-sm text-gray-300 text-center" style={{ lineHeight: '16px' }}>
            Created with <span className="text-red-400 animate-pulse">♥</span> for{' '}
            <span className="text-green-600 font-medium hover:text-green-500 transition-colors">Plasma project</span>
          </div>

          {/* Правая сторона - Создатель и социальные ссылки */}
          <div className="flex items-center space-x-4">
            {/* Информация о создателе */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400" style={{ lineHeight: '16px' }}>Created by</span>
              <span className="text-sm font-medium text-white bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent" style={{ lineHeight: '16px' }}>
                Unity Nodes
              </span>
            </div>

            {/* Группа социальных ссылок */}
            <div className="flex items-center space-x-1">
              {/* Ссылка на GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all transform hover:scale-110"
                title="GitHub"
              >
                <Github size={16} />
              </a>

              {/* Ссылка на Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all transform hover:scale-110"
                title="Discord"
              >
                <MessageCircle size={16} />
              </a>

              {/* Ссылка на X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all transform hover:scale-110"
                title="X (Twitter)"
              >
                {/* SVG иконка X (Twitter) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};