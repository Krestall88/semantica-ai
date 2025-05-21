'use client';

import { FC } from 'react';
import Link from 'next/link';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Semantica AI</h3>
            <p className="text-gray-400">
              Создавайте цифровую инфраструктуру с помощью искусственного интеллекта
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Веб-разработка
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                  ИИ-ассистенты
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Автоматизация
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Компания</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Связаться
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://t.me/Nikolai_Perepichko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:info@semantica.ai" className="text-gray-400 hover:text-white transition-colors">
                  info@semantica.ai
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Semantica AI. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
