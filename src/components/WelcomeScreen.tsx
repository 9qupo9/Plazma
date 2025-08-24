// Импорт необходимых библиотек и иконок
import React from 'react';
import { motion } from 'framer-motion'; // Библиотека для анимаций
import { Code, MessageSquare, Zap, Sparkles, Brain } from 'lucide-react';

// Интерфейс пропсов для экрана приветствия
interface WelcomeScreenProps {
  onStartChat: () => void; // Функция для начала чата
}

// Основной компонент экрана приветствия
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  // Массив возможностей ИИ для отображения на экране
  const capabilities = [
    {
      icon: <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Natural Conversation",
      description: "Engage in human-like conversations with advanced AI understanding"
    },
    {
      icon: <Code className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Developer Support",
      description: "Development assistance powered by Plasma"
    },
    {
      icon: <Brain className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Problem Solving",
      description: "Break down complex problems and provide step-by-step solutions"
    },
    {
      icon: <Zap className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Instant Responses",
      description: "Get quick, accurate answers to your questions and queries"
    }
  ];

  // Варианты анимации для различных элементов

  // Анимация основного контейнера
  const containerVariants = {
    hidden: { opacity: 0 }, // Скрытое состояние
    visible: {
      opacity: 1, // Видимое состояние
      transition: {
        staggerChildren: 0.8 // Задержка между анимациями дочерних элементов
      }
    }
  };

  // Анимация элементов героической секции
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50, // Смещение вниз
      scale: 0.8 // Уменьшенный размер
    },
    visible: {
      opacity: 1,
      y: 0, // Возврат в исходную позицию
      scale: 1, // Нормальный размер
      transition: {
        duration: 0.8 // Длительность анимации
      }
    }
  };

  // Анимация сетки возможностей
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Задержка между карточками
        delayChildren: 1.6 // Общая задержка перед началом
      }
    }
  };

  // Анимация отдельных карточек возможностей
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30, // Смещение вниз
      scale: 0.9 // Слегка уменьшенный размер
    },
    visible: {
      opacity: 1,
      y: 0, // Исходная позиция
      scale: 1, // Нормальный размер
      transition: {
        duration: 0.6 // Длительность анимации
      }
    }
  };

  return (
    <div className="flex-1 flex items-start lg:items-center justify-center p-4 lg:p-8 overflow-y-auto pt-4 pb-8 lg:pt-4 lg:pb-4 relative">


      <motion.div
        className="max-w-6xl mx-auto text-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section - без кнопки */}
        <motion.div
          className="mb-4 lg:mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center mb-2 lg:mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <div className="relative group">
              <div className="flex items-center justify-center">
                <motion.img
                  src="/log.png"
                  alt="Plasma AI Logo"
                  className="w-32 h-32 lg:w-40 lg:h-40"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
              </div>
              {/* Звезда для мобильной версии */}
              <motion.div
                className="absolute -top-1 -right-1 lg:hidden"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Sparkles size={24} className="text-green-400 animate-pulse" />
              </motion.div>

              {/* Звезда для компьютерной версии */}
              <motion.div
                className="hidden lg:block absolute"
                style={{
                  top: '10px',
                  right: '-20px'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Sparkles size={28} className="text-green-400 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 lg:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-pulse">
              Plasma AI
            </span>
          </motion.h1>

          <motion.p
            className="text-sm lg:text-xl xl:text-2xl text-gray-300 mb-4 lg:mb-10 max-w-4xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Your intelligent AI assistant powered by advanced language models.
          </motion.p>
        </motion.div>

        {/* Capabilities Grid - Mobile: Single Column with reduced width, Desktop: 4 columns */}
        <div className="w-4/5 mx-auto lg:w-full">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-8"
            variants={gridVariants}
          >
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                className="group p-2 lg:p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl lg:rounded-2xl hover:bg-gray-800/60 hover:border-green-600/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20"
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  className="flex items-center justify-center w-8 h-8 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-600/20 to-green-600/20 text-green-400 rounded-xl lg:rounded-2xl mb-2 lg:mb-5 mx-auto group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {capability.icon}
                </motion.div>
                <h3 className="text-sm lg:text-xl font-bold text-white mb-1 lg:mb-3 group-hover:text-green-300 transition-colors">
                  {capability.title}
                </h3>
                <p className="text-gray-400 text-xs lg:text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Start Button - появляется после всех карточек */}
        <motion.button
          onClick={onStartChat}
          className="inline-flex items-center space-x-3 px-8 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-green-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.9, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={24} />
          <span>Start Chatting</span>
          <Sparkles size={20} className="opacity-75" />
        </motion.button>
      </motion.div>
    </div>
  );
};