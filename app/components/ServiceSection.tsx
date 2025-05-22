'use client';

import { FC } from 'react';
import { Service } from '@/types/services';
import { ServiceCard } from './ServiceCard';
import { FadeIn } from './FadeIn';

interface ServiceSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

export const ServiceSection: FC<ServiceSectionProps> = ({
  services,
  onServiceClick,
}) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                onClick={() => onServiceClick(service)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
