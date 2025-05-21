import { FC } from 'react';
import { Service, Currency } from '@/types/services';

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
  const formatPrice = (price: number) => {
    if (currency === 'USD') {
      return `$${price.toFixed(2)}`;
    }
    return `₽${(price * usdRate).toFixed(2)}`;
  };

  return (
    <section id="services" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Наши услуги
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onServiceClick(service)}
          >
            <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
            <p className="text-gray-300 mb-4">{service.shortDescription}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-bold">
                {formatPrice(service.priceUSD)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onServiceClick(service);
                }}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded transition-colors"
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
