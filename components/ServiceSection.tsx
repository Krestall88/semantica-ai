'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from './ServiceCard';
import type { Service } from '@/types/service';
import type { Currency } from './CurrencySelector';

interface ServiceSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
  currency: Currency;
  usdRate: number;
}

export function ServiceSection({ services, onServiceClick, currency, usdRate }: ServiceSectionProps) {
  const { t } = useTranslation();

  // Get translated services
  const translatedServices = services.map(service => {
    // Handle includes which can be an array or object
    let translatedIncludes: string[] = [];
    if (Array.isArray(service.includes)) {
      translatedIncludes = service.includes;
    } else {
      // If it's an object, get the values
      translatedIncludes = Object.values(service.includes as Record<string, string>);
    }

    return {
      ...service,
      title: t(`services.${service.id}.title`),
      description: t(`services.${service.id}.description`),
      includes: translatedIncludes,
      forWhom: service.forWhom.map(key => t(key)),
    };
  });

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => onServiceClick(service)}
              currency={currency}
              usdRate={usdRate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
