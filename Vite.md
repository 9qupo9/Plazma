# Решение проблем с Vite

## Основные ошибки и их решения

### 1. Ошибка "No matching HTML proxy module found"
Возникает из-за повреждения кеша Vite или конфликта зависимостей.

### 2. Ошибка "X-Frame-Options may only be set via an HTTP header"
Проблема с заголовками безопасности в dev-сервере.

### 3. Ошибка "@react-refresh does not provide an export named 'injectIntoGlobalHook'"
Конфликт с плагином React Refresh.

### 4. Ошибка "Failed to load resource: 500 (Internal Server Error)"
Проблемы с загрузкой ресурсов или модулей.

## Пошаговое решение проблем:

**1. Очистка кеша Vite (PowerShell):**
```powershell
if (Test-Path "node_modules\.vite") { Remove-Item -Recurse -Force "node_modules\.vite" }
```

**2. Исправление зависимостей:**
```cmd
npm audit fix
```

**3. Создание недостающих файлов:**
- Добавить `public/vite.svg` (иконка)
- Проверить структуру проекта

**4. Обновленная конфигурация `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true
    })
  ],
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false
    },
    headers: {
      'X-Frame-Options': 'SAMEORIGIN'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      }
    }
  },
  define: {
    global: 'globalThis',
  }
});
```

### Частые причины проблем:

- Повреждение кеша Vite
- Отсутствие файлов ресурсов (иконки, изображения)
- Неправильная конфигурация React плагина
- Проблемы с заголовками безопасности
- Конфликты зависимостей
- Проблемы с путями в Windows (кириллица в пути)

### Профилактика:

- Регулярно очищайте кеш при странном поведении
- Используйте английские пути для проектов
- Обновляйте зависимости осторожно
- Проверяйте наличие всех необходимых файлов ресурсов
- Настраивайте правильные заголовки безопасности

### Полезные команды:

```cmd
# Запуск с принудительной перезагрузкой и очисткой кэша
npm run dev -- --force --clearScreen false

# Проверка зависимостей
npm audit

# Очистка и переустановка
rmdir /s /q node_modules & npm install
```