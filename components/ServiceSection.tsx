import { FC } from 'react';
import { Service } from '@/types/services';
import { ServiceCard } from './ServiceCard';
import type { Currency } from './CurrencySelector';

interface ServiceSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
  currency: Currency;
  usdRate?: number;
}

export const ServiceSection: FC<ServiceSectionProps> = ({
  services,
  onServiceClick,
  currency,
  usdRate,
}) => {
  return (
    <section id="services" className="container mx-auto px-4 py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-4">
        {services.map((service, index) => (
          <ServiceCard
            key={`${service.title}-${index}`}
            service={service}
            onClick={() => onServiceClick(service)}
            currency={currency}
            usdRate={usdRate}
          />
        ))}
      </div>
    </section>
  );
};
