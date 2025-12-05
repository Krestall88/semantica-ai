'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '@/types/service';
import { Modal } from './Modal';
import { OrderForm } from './OrderForm';

type FormData = {
  name: string;
  contact: string;
  description: string;
};

type ViewMode = 'details' | 'order';

type Currency = 'RUB' | 'USD';

// Extended service type for the modal with all required fields
interface ModalService extends Omit<Service, 'includes' | 'forWhom'> {
  title: string;
  description: string;
  modalTitle: string;
  modalDescription: string;
  includes: string[];
  forWhom: string[];
  price: number;
}

interface ServiceModalProps {
  service: ModalService;
  onClose: () => void;
  currency: Currency;
  usdRate: number;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  currency,
  usdRate = 0,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const formatPrice = (price: number): string => {
    if (currency === 'USD' && usdRate > 0) {
      const priceUsd = price / usdRate * 1.05; // 5% markup
      return `$${Math.ceil(priceUsd / 5) * 5}`; // Round to nearest 5
    }
    return `${price.toLocaleString()} ₽`;
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
      alert(t('error_submitting_form', 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже или свяжитесь с нами через Telegram.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-2xl mx-auto">
        {isSubmitted ? (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">{t('order_sent')}</h2>
            <p className="text-gray-300 mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t('order_sent_description') }} />
            <p className="text-sm text-gray-500 mb-6">
              {t('order_sent_note')}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('button_close', 'Закрыть')}
            </button>
          </div>
        ) : viewMode === 'details' ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">{service.modalTitle || service.title}</h2>
              <p className="text-gray-300 mb-6">{service.modalDescription || service.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{t('included')}:</h3>
                <ul className="space-y-2">
                  {service.includes.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{t('for_whom')}:</h3>
                <ul className="space-y-2">
                  {service.forWhom.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <div>
                  <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
                  <span className="text-gray-400 ml-2 text-sm">
                    {currency === 'USD' ? 'USD' : 'RUB'}
                  </span>
                </div>
                <button
                  onClick={handleOrderClick}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {t('button_order')}
                </button>
              </div>
            </div>
          </div>
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
