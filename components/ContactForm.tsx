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
    business: '',
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
          type: 'consultation',
          service: 'Консультация по автоматизации',
          name: formData.name,
          contact: formData.contact,
          description: `Бизнес: ${formData.business}\n\nОписание: ${formData.description}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке. Попробуйте связаться через Telegram.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-2xl p-8 max-w-lg w-full relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            <div className="badge mb-4">Бесплатно</div>
            <h2 className="text-2xl font-bold mb-2">Консультация по автоматизации</h2>
            <p className="text-gray-400 mb-6">
              Расскажите о вашем бизнесе и процессах — я подготовлю рекомендации и покажу, что можно автоматизировать.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                  placeholder="Ваше имя"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-2">
                  Telegram / Телефон
                </label>
                <input
                  type="text"
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="input"
                  placeholder="@username или +7..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="business" className="block text-sm font-medium text-gray-300 mb-2">
                  Сфера бизнеса
                </label>
                <input
                  id="business"
                  type="text"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="input"
                  placeholder="Производство, логистика, услуги..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Что хотите автоматизировать?
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[100px] resize-none"
                  placeholder="Опишите процессы или проблемы, которые хотите решить..."
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  'Получить консультацию'
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <button 
                  type="button" 
                  onClick={onPrivacyClick} 
                  className="text-blue-400 hover:underline"
                >
                  политикой конфиденциальности
                </button>
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Заявка отправлена!</h2>
            <p className="text-gray-400 mb-6">
              Свяжусь с вами в течение 2 часов в рабочее время.
            </p>
            <button onClick={onClose} className="btn btn-secondary">
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
