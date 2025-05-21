import React, { useState } from 'react';

interface ContactFormProps {
  onClose: () => void;
  onPrivacyClick: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose, onPrivacyClick }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Общая заявка',
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] rounded-2xl p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold mb-2">🚀 Хотите понять, как это работает для вас?</h2>
            <p className="text-gray-400 mb-6">
              Оставьте заявку — мы вернёмся с вариантом решения без обязательств.
              <br />
              Просто покажем, что можно сделать для вас за 7 дней.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="email / ник в Telegram / номер для WhatsApp"
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
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2A2A2A] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                  placeholder='Например: "нужен сайт для онлайн-курса", "хочу чат-бот для консультаций", "нужна автоматизация постинга в Instagram"'
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3 relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправляем...
                  </span>
                ) : (
                  'Получить предложение'
                )}
              </button>
              
              <div className="text-xs text-gray-500 text-center mt-4">
                Нажимая "Получить предложение", вы соглашаетесь с {' '}
                <button 
                  type="button" 
                  onClick={onPrivacyClick} 
                  className="text-primary hover:underline"
                >
                  политикой конфиденциальности
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Заявка отправлена</h2>
            <p className="text-gray-400 mb-4">
              Мы получили вашу задачу и уже думаем над решением.
              <br />
              Ответим в течение 1 рабочего дня с конкретным предложением — без звонков и без давления.
            </p>
            <p className="text-xs text-gray-500">
              Если хотите что-то уточнить — нажмите Telegram-кнопку внизу справа и напишите напрямую менеджеру.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
