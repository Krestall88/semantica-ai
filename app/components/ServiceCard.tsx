'use client';

import { FC } from 'react';
import { Service, Currency } from '@/types/services';

interface ServiceCardProps {
  service: Service;
  currency: Currency;
  usdRate: number;
  onClick: () => void;
}

export const ServiceCard: FC<ServiceCardProps> = ({
  service,
  currency,
  usdRate,
  onClick,
}) => {
  const price = currency === 'USD' ? Math.round(service.priceRub / usdRate) : service.priceRub;
  const currencySymbol = currency === 'USD' ? '$' : '₽';

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-400 mb-4">{service.description}</p>
      <div className="text-2xl font-bold mb-6">
        {price.toLocaleString()} {currencySymbol}
      </div>
      <ul className="space-y-2 mb-6">
        {service.includes.slice(0, 3).map((item, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Подробнее
      </button>
    </div>
  );
};
