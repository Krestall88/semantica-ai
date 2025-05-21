import { FC } from 'react';
import { Service } from '@/types/services';

interface ServiceSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

export const ServiceSection: FC<ServiceSectionProps> = ({
  services,
  onServiceClick,
}) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} ₽`;
  };

  return (
    <section id="services" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Наши услуги
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => onServiceClick(service)}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(service.priceRub)}
                </span>
                <span className="text-sm text-gray-500">за проект</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
