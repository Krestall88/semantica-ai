'use client';

import React from 'react';
import type { Currency } from './CurrencySelector';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  features: PricingFeature[];
  isPopular?: boolean;
  onSelect: () => void;
  currency: Currency;
  usdRate: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  features,
  isPopular = false,
  onSelect,
  currency,
  usdRate,
}) => {
  const formatPrice = (priceRub: number): string => {
    if (currency === 'USD') {
      const priceUsd = Math.round(priceRub / usdRate);
      return `$${priceUsd.toLocaleString()}`;
    }
    return `${priceRub.toLocaleString()} ₽`;
  };
  return (
    <div className={`price-card ${isPopular ? 'popular' : ''}`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm px-4 py-1 rounded-full">
          Популярный выбор
        </span>
      )}
      
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="mb-8">
        <span className="text-4xl font-bold">{formatPrice(price)}</span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.included ? (
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className={feature.included ? 'text-gray-300' : 'text-gray-400'}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onSelect}
        className={`w-full btn ${isPopular ? 'btn-animated' : 'btn-secondary'}`}
      >
        Выбрать пакет
      </button>
    </div>
  );
};
