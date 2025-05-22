'use client';

import React from 'react';
import type { Service } from '@/types/services';

import type { Currency } from './CurrencySelector';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  currency: Currency;
  usdRate?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onClick,
  currency,
  usdRate = 0,
}) => {
  const formatPrice = (priceRub: number): string => {
    if (currency === 'USD' && usdRate > 0) {
      // First convert to USD, then add 5% markup
      let priceUsd = (priceRub / usdRate) * 1.05;
      // Round up to the nearest 5
      priceUsd = Math.ceil(priceUsd / 5) * 5;
      // Format with 0 decimal places since we're rounding to tens
      return `$${priceUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    // For RUB, just return the original price with ₽ symbol
    return `${priceRub.toLocaleString()} ₽`;
  };

  return (
    <div
      className="group bg-[#1A1A1A] rounded-lg p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col h-full"
      onClick={(e) => {
        // Prevent default behavior when clicking on interactive elements
        if (!(e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)) {
          onClick();
        }
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">{service.title.split(' ')[0]}</span>
          {service.title.split(' ').slice(1).join(' ')}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">{service.description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="text-sm text-gray-500">Включено:</div>
          <ul className="space-y-1">
            {service.includes.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
            {service.includes.length > 3 && (
              <li className="text-sm text-gray-500">
                И ещё {service.includes.length - 3} пункта
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-2xl font-bold text-primary mb-4">
          от {formatPrice(service.priceRub)}
        </div>
        <button
          className="w-full px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};
