'use client';

import { FC } from 'react';
import { Service, Currency } from '@/types/services';
import { ServiceCard } from './ServiceCard';
import { FadeIn } from './FadeIn';

interface ServiceSectionProps {
  services: Service[];
  currency: Currency;
  usdRate: number;
  onServiceClick: (service: Service) => void;
}

export const ServiceSection: FC<ServiceSectionProps> = ({
  services,
  currency,
  usdRate,
  onServiceClick,
}) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-12">
            Наши услуги
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              currency={currency}
              usdRate={usdRate}
              onClick={() => onServiceClick(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
