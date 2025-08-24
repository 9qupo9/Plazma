// Импорт необходимых библиотек и компонентов
import React, { useState } from 'react';
import { ChevronDown, User, LogOut, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';
import { ProfileModal } from './ProfileModal';
import { ProfileData } from '../types';

// CSS стили для анимации наклона логотипа на мобильных устройствах
const mobileLogoStyles = `
  @keyframes tilt {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }
  
  @media (max-width: 1023px) {
    .mobile-tilt {
      animation: tilt 4s ease-in-out infinite;
    }
  }
`;

// Основной компонент навигационной панели
export const NavigationBar: React.FC = () => {
  // Хук для работы с кошельком
  const { walletState, connectWallet, disconnectWallet, shortenAddress } = useWallet();

  // Состояния для управления UI элементами
  const [showDropdown, setShowDropdown] = useState(false); // Показать/скрыть выпадающее меню
  const [showProfile, setShowProfile] = useState(false); // Показать/скрыть модальное окно профиля

  // Состояние профиля пользователя с данными по умолчанию
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Anonymous User',
    email: 'user@example.com',
  });

  // Обработчик сохранения изменений профиля
  const handleProfileSave = (newProfile: ProfileData) => {
    setProfile(newProfile);
  };

  return (
    <>
      {/* CSS стили для мобильной анимации */}
      <style>{mobileLogoStyles}</style>

      {/* Основная навигационная панель */}
      <nav className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40 border-consistent-bottom">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Левая сторона - Логотип и название проекта */}
            <div className="flex items-center space-x-3">
              {/* Анимированный логотип проекта */}
              <motion.div
                className="relative group cursor-pointer"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <div className="flex items-center justify-center">
                  <img src="/log.png" alt="Plasma AI Logo" className="w-12 h-12 lg:w-14 lg:h-14" />
                </div>
              </motion.div>

              {/* Название проекта */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Plasma AI
              </h1>
            </div>

            {/* Правая сторона - скрыто */}
            <div className="flex items-center">
              {/* Кнопка Connect Wallet скрыта */}
            </div>
          </div>
        </div>
      </nav>

      {/* Модальное окно профиля */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        profile={profile}
        onSave={handleProfileSave}
      />
    </>
  );
};