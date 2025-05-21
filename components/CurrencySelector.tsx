'use client';

import React from 'react';

export type Currency = 'RUB' | 'USD';

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  showLanguage?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  onCurrencyChange,
  showLanguage = false,
}) => {
  return (
    <div className="flex gap-2">
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
        className="appearance-none bg-transparent text-gray-300 hover:text-primary transition-colors cursor-pointer pl-2 pr-8 py-1 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
      >
        <option value="RUB">₽ RUB</option>
        <option value="USD">$ USD</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
      {showLanguage && (
        <div className="relative">
          <select
            className="appearance-none bg-transparent text-gray-300 hover:text-primary transition-colors cursor-pointer pl-2 pr-8 py-1 border border-gray-700 rounded-lg focus:outline-none focus:border-primary opacity-50"
            disabled
          >
            <option value="RU">🌐 RU</option>
            <option value="EN">🌐 EN</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
