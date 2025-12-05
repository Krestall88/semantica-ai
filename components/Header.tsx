import { FC } from 'react';
import Link from 'next/link';
import { Currency } from '@/types/services';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onContactClick: () => void;
}

export const Header: FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onContactClick,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 bg-gray-900 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Semantica AI
        </Link>
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
            {t('menu_services', 'Услуги')}
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">
            {t('menu_pricing', 'Цены')}
          </Link>
          <button
            onClick={onContactClick}
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            {t('menu_contact', 'Связаться')}
          </button>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="bg-transparent text-gray-300 hover:text-blue-400 transition-colors border-none focus:ring-0"
          >
            <option value="RUB">₽ RUB</option>
            <option value="USD">$ USD</option>
          </select>
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-transparent text-gray-300 hover:text-blue-400 transition-colors border-none focus:ring-0 ml-4"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
            <option value="tr">TR</option>
          </select>
        </nav>
      </div>
    </header>
  );
};
