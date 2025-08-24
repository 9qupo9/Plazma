// Импорт необходимых библиотек и иконок
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Интерфейс пропсов для компонента блока кода
interface CodeBlockProps {
  code: string; // Код для отображения
  language?: string; // Язык программирования (опционально)
}

// Основной компонент блока кода с подсветкой синтаксиса
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  // Состояние для отслеживания копирования в буфер обмена
  const [copied, setCopied] = useState(false);

  // Функция копирования кода в буфер обмена
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true); // Показать уведомление об успешном копировании
      setTimeout(() => setCopied(false), 2000); // Скрыть уведомление через 2 секунды
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Простая подсветка синтаксиса для популярных языков программирования
  const highlightCode = (code: string, lang: string) => {
    // Словарь ключевых слов для разных языков программирования
    const keywords = {
      javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export'],
      python: ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except'],
      typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'interface', 'type'],
    };

    let highlighted = code;
    // Получение ключевых слов для текущего языка или JavaScript по умолчанию
    const langKeywords = keywords[lang as keyof typeof keywords] || keywords.javascript;

    // Подсветка ключевых слов синим цветом
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-blue-400">${keyword}</span>`);
    });

    // Подсветка строк изумрудным цветом
    highlighted = highlighted.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-emerald-400">$1$2$1</span>');
    
    // Подсветка комментариев серым цветом
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm, '<span class="text-gray-500">$1</span>');

    return highlighted;
  };

  return (
    // Основной контейнер блока кода
    <div className="relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      {/* Заголовок блока кода с названием языка и кнопкой копирования */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        {/* Название языка программирования */}
        <span className="text-sm text-gray-400 font-mono">{language}</span>
        
        {/* Кнопка копирования кода */}
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          {/* Иконка меняется в зависимости от состояния копирования */}
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      {/* Область с кодом */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          {/* Код с подсветкой синтаксиса */}
          <code 
            className="text-gray-100 font-mono"
            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
          />
        </pre>
      </div>
    </div>
  );
};