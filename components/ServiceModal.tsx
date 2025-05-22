'use client';

import React, { useState } from 'react';
import type { Service } from '@/types/services';
import { Modal } from './Modal';
import { OrderForm } from './OrderForm';

type FormData = {
  name: string;
  contact: string;
  description: string;
};

type ViewMode = 'details' | 'order';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (priceRub: number): string => {
    return `${priceRub.toLocaleString()} ₽`;
  };

  const handleOrderClick = () => {
    setViewMode('order');
  };

  const handleBackToDetails = () => {
    setViewMode('details');
  };

  const handleOrderSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: service.title,
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами через Telegram.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-2xl mx-auto">
        {isSubmitted ? (
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
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : viewMode === 'details' ? (
          <>
            <h2 className="text-3xl font-bold mb-2">{service.modalTitle || service.title}</h2>
            <p className="text-gray-400 mb-6">{service.modalDescription || service.description}</p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Что включено:</h3>
              <ul className="space-y-2">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Для кого:</h3>
              <ul className="space-y-2">
                {service.forWhom.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div>
                <div className="text-sm text-gray-500 mb-1">Цена:</div>
                <div className="text-2xl font-bold text-primary">
                  от {formatPrice(service.priceRub)}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleOrderClick}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Заказать
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </>
        ) : (
          <OrderForm
            service={service}
            onClose={handleBackToDetails}
            onSubmit={handleOrderSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </Modal>
  );
};
