'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Currency } from '@/types/services';
import { CurrencySelector } from './CurrencySelector';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onUsdRateChange: (rate: number) => void;
  onContactClick: () => void;
}

export const Header: FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onUsdRateChange,
  onContactClick,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 bg-gray-900 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Semantica AI
          </Link>
          <div className="flex items-center space-x-8">
            <CurrencySelector
              currency={currency}
              onCurrencyChange={onCurrencyChange}
              onUsdRateChange={onUsdRateChange}
            />
            <button
              onClick={onContactClick}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition-colors"
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
