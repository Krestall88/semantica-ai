import { FC } from 'react';
import Link from 'next/link';
import { Currency } from '@/types/services';

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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 bg-gray-900 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Semantica AI
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
            Услуги
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">
            Цены
          </Link>
          <button
            onClick={onContactClick}
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Контакты
          </button>
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="bg-transparent text-gray-300 hover:text-blue-400 transition-colors border-none focus:ring-0"
          >
            <option value="RUB">₽ RUB</option>
            <option value="USD">$ USD</option>
          </select>
        </nav>
      </div>
    </header>
  );
};
