import { FC } from 'react';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="bg-gray-800 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">О нас</h3>
            <p className="text-gray-300">
              Мы помогаем бизнесу развиваться с помощью современных ИИ-технологий
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <button
              onClick={onContactClick}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Связаться с нами
            </button>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Социальные сети</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
