// Импорт необходимых библиотек и иконок
import React, { useState } from 'react';
import { X, User, Mail, Camera } from 'lucide-react';
import { ProfileData } from '../types';

// Интерфейс пропсов для модального окна профиля
interface ProfileModalProps {
  isOpen: boolean; // Флаг открытия модального окна
  onClose: () => void; // Функция закрытия модального окна
  profile: ProfileData; // Данные профиля пользователя
  onSave: (profile: ProfileData) => void; // Функция сохранения изменений профиля
}

// Основной компонент модального окна профиля
export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profile, onSave }) => {
  // Локальное состояние для данных формы
  const [formData, setFormData] = useState<ProfileData>(profile);

  // Если модальное окно закрыто, не рендерим ничего
  if (!isOpen) return null;

  // Обработчик сохранения изменений профиля
  const handleSave = () => {
    onSave(formData); // Передача данных родительскому компоненту
    onClose(); // Закрытие модального окна
  };

  return (
    // Оверлей модального окна с размытым фоном
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Основной контейнер модального окна */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md mx-4">
        {/* Заголовок модального окна с кнопкой закрытия */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          {/* Кнопка закрытия модального окна */}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Основное содержимое формы */}
        <div className="space-y-6">
          {/* Секция аватара пользователя */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {/* Аватар с градиентным фоном */}
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              {/* Кнопка изменения аватара */}
              <button className="absolute -bottom-1 -right-1 p-1.5 bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors">
                <Camera size={14} />
              </button>
            </div>
          </div>

          {/* Поле ввода имени */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <User size={16} />
              <span>Display Name</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          {/* Поле ввода email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <Mail size={16} />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-end space-x-3 mt-8">
          {/* Кнопка отмены */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          {/* Кнопка сохранения изменений */}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};