import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '@/types/services';

interface OrderFormProps {
  service: Service;
  onClose: () => void;
  onSubmit: (data: { name: string; contact: string; description: string }) => Promise<void>;
  isLoading: boolean;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  service,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{service.title}</h2>
      <p className="text-gray-400">{service.description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            {t('orderform_name_label', 'Имя')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('orderform_name_placeholder', 'Ваше имя')}
            className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-2">
            {t('orderform_contact_label', 'Способ связи')}
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder={t('orderform_contact_placeholder', 'email / Telegram / WhatsApp')}
            className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            {t('orderform_description_label', 'Опишите, что нужно — в 1–2 предложениях')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
            placeholder={t('orderform_description_placeholder', 'Например: "нужен сайт для курсов с кабинетом" или "бот для приема заявок в Telegram"')}
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
            {t('button_back', 'Назад')}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? t('button_sending', 'Отправка...') : t('button_submit_order', 'Отправить заявку')}
          </button>
        </div>
      </form>
    </div>
  );
};
