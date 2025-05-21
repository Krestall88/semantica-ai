'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';

interface PackageOrderFormProps {
  packageName: string;
  packageDescription: string;
  price: string;
  onClose: () => void;
  onSubmit: (data: { name: string; contact: string; description: string }) => Promise<void>;
}

export const PackageOrderForm: React.FC<PackageOrderFormProps> = ({
  packageName,
  packageDescription,
  price,
  onClose,
  onSubmit,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами через Telegram.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Modal onClose={onClose}>
        <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-2xl mx-auto">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">✅ Заявка отправлена</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Мы получили вашу задачу и уже думаем над решением.<br/>
              Ответим в течение 1 рабочего дня с конкретным предложением — без звонков и без давления.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Если хотите что-то уточнить — нажмите Telegram-кнопку внизу справа и напишите напрямую менеджеру.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">{packageName}</h2>
        <p className="text-gray-300 mb-2">{packageDescription}</p>
        <div className="text-2xl font-bold text-primary mb-6">{price}</div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ваше имя"
              className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-2">
              Способ связи
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="email / Telegram / WhatsApp"
              className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Опишите, что нужно — в 1–2 предложениях
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
              placeholder='Например: "нужен сайт для курсов с кабинетом" или "бот для приема заявок в Telegram"'
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              disabled={isLoading}
            >
              Назад
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
