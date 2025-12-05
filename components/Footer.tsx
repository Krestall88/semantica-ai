import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: FC<FooterProps> = ({ onContactClick }) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer_about_title', 'О нас')}</h3>
            <p className="text-gray-300">
              {t('footer_about_text', 'Мы помогаем бизнесу развиваться с помощью современных ИИ-технологий')}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer_contacts_title', 'Контакты')}</h3>
            <button
              onClick={onContactClick}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {t('footer_contacts_button', 'Связаться с нами')}
            </button>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer_social_title', 'Социальные сети')}</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {t('footer_twitter', 'Twitter')}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {t('footer_linkedin', 'LinkedIn')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
