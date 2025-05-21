'use client';

import { FC } from 'react';
import { Service } from '@/types/services';

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceModal: FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const price = service.priceRub;
  const currencySymbol = '₽';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-2xl leading-6 font-bold mb-4">
                  {service.modalTitle || service.title}
                </h3>
                <div className="mt-4">
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold mb-6">
                    {price.toLocaleString()} {currencySymbol}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Включено:</h4>
                      <ul className="space-y-2">
                        {service.includes.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Для кого:</h4>
                      <ul className="space-y-2">
                        {service.forWhom.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
