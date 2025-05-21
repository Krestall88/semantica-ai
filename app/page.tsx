'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceModal } from '../components/ServiceModal';
import { ContactForm } from '../components/ContactForm';
import { PackageOrderForm } from '../components/PackageOrderForm';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import { CurrencySelector, type Currency } from '../components/CurrencySelector';
import { services } from '@/data/services';

export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    description: string;
    price: string;
  } | null>(null);
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleOpenContactForm = (event: CustomEvent) => {
      const serviceTitle = event.detail?.service || '';
      setShowContactForm(true);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('openContactForm', handleOpenContactForm as EventListener);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('openContactForm', handleOpenContactForm as EventListener);
    };
  }, []);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
  };

  const handlePackageSelect = (pkg: { name: string; description: string; price: string }) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedService(null);
    setSelectedPackage(null);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setSelectedPackage(null);
  };

  const handlePackageSubmit = async (formData: { name: string; contact: string; description: string }): Promise<void> => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'package',
          service: selectedPackage?.name || 'Неизвестный пакет',
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Возвращаем undefined, так как функция должна возвращать Promise<void>
      return;
    } catch (error) {
      console.error('Error submitting package form:', error);
      throw error; // Ошибка будет обработана в компоненте формы
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePrivacyPolicyClick = () => {
    setShowPrivacyPolicy(true);
  };

  const handleClosePrivacyPolicy = () => {
    setShowPrivacyPolicy(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
          >
            <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold text-white">Semantica AI</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a href="#process" className="text-gray-300 hover:text-primary transition-colors">Как мы работаем</a>
            <a href="#services" className="text-gray-300 hover:text-primary transition-colors">Услуги</a>
            <CurrencySelector
              currency={currency}
              onCurrencyChange={setCurrency}
              showLanguage={true}
            />
            <button
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary animate-pulse-glow"
            >
              Оставить заявку
            </button>
          </div>

          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[85vh] pt-32 px-6 md:px-12 lg:px-24 gradient-bg">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Автоматизируем ваш бизнес за 7 дней — без кода и лишней бюрократии
              </h1>
              <p className="text-xl text-gray-400">
              Создаём сайты, чат-ботов, автоматизации и визуальные решения под ключ с помощью ИИ и no-code.
                Увеличьте продажи и освободите время уже на этой неделе.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="btn btn-primary"
                >
                  Запустить проект за 7 дней
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <Image
                src="/hero-image.svg"
                alt="Hero illustration"
                fill
                className="object-contain animate-float"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4">
                <div className="w-20 h-10 relative">
                  <Image 
                    src="/brands/autodesk.svg" 
                    alt="Autodesk" 
                    fill 
                    className="object-contain opacity-50 hover:opacity-100 transition-opacity" 
                  />
                </div>
                <div className="w-20 h-10 relative">
                  <Image 
                    src="/brands/intuit.svg" 
                    alt="Intuit" 
                    fill 
                    className="object-contain opacity-50 hover:opacity-100 transition-opacity" 
                  />
                </div>
                <div className="w-20 h-10 relative">
                  <Image 
                    src="/brands/walmart.svg" 
                    alt="Walmart" 
                    fill 
                    className="object-contain opacity-50 hover:opacity-100 transition-opacity" 
                  />
                </div>
                <div className="w-20 h-10 relative">
                  <Image 
                    src="/brands/zoom.svg" 
                    alt="Zoom" 
                    fill 
                    className="object-contain opacity-50 hover:opacity-100 transition-opacity" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ключевые решения */}
        <section className="py-20 bg-[#1A1A1A]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Наши ключевые решения</h2>
              <p className="text-xl text-gray-400">Все услуги — без кода, быстро и с упором на результат.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Сайты под ключ */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-6">🔹 Сайты под ключ</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Визитки, лендинги, многостраничники
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    CRM, оплата, аналитика
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Готово за 7 дней
                  </li>
                </ul>
              </div>

              {/* Автоматизация */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-6">🔹 Автоматизация</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Создание контента, автопостинг
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Боты, рассылки, интеграции
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    AI + no-code без лишней рутины
                  </li>
                </ul>
              </div>

              {/* Визуальное оформление */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-6">🔹 Визуальное оформление</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    AI-фотосессии, аватары
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Соцсети и баннеры
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Уникальный стиль под ваш бренд
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-12">
              Наши услуги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  onClick={() => handleServiceClick(service)}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Комбинированные пакеты */}
        <section className="py-20 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-4">
              Комбинированные <span className="text-primary">пакеты</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12">Выберите оптимальное решение для вашего бизнеса</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-primary transition-colors">
                <h3 className="text-2xl font-bold mb-4">🔵 Старт</h3>
                <p className="text-gray-400 mb-6">Идеально для малого бизнеса и индивидуальных предпринимателей</p>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">✅ Включено:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Сайт-визитка или лендинг
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Базовый дизайн
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      До 5 страниц
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Базовая SEO-оптимизация
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Хостинг на 1 год
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">✗</span>
                      ИИ-ассистент
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">✗</span>
                      Интеграция с CRM
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-500 mr-2">✗</span>
                      Расширенная аналитика
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-4">49 900 ₽</div>
                  <button 
                    onClick={() => handlePackageSelect({
                      name: 'Старт',
                      description: 'Идеально для малого бизнеса и индивидуальных предпринимателей',
                      price: '49 900 ₽'
                    })} 
                    className="btn btn-primary w-full"
                  >
                    Выбрать пакет
                  </button>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-b from-[#221012] to-[#150E1F] p-8 rounded-lg border-2 border-[#4D1C23] transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Популярный выбор</div>
                <h3 className="text-2xl font-bold mb-4">🔎 Бизнес</h3>
                <p className="text-gray-300 mb-6">Оптимальное решение для развивающегося бизнеса</p>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">✅ Включено:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Многостраничный сайт
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Премиум-дизайн
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      До 20 страниц
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Расширенная SEO-оптимизация
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Хостинг на 1 год
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      ИИ-ассистент
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Интеграция с CRM
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Базовая аналитика
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-4">99 900 ₽</div>
                  <button 
                    onClick={() => handlePackageSelect({
                      name: 'Бизнес',
                      description: 'Оптимальное решение для развивающегося бизнеса',
                      price: '99 900 ₽'
                    })} 
                    className="btn btn-primary w-full"
                  >
                    Выбрать пакет
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-primary transition-colors">
                <h3 className="text-2xl font-bold mb-4">⬛ Премиум</h3>
                <p className="text-gray-400 mb-6">Комплексное решение для крупного бизнеса</p>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">✅ Включено:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Корпоративный портал
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Уникальный дизайн
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Неограниченное количество страниц
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Полная SEO-оптимизация
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Хостинг на 2 года
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Продвинутый ИИ-ассистент
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Интеграция со всеми системами
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Расширенная аналитика
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-4">249 900 ₽</div>
                  <button 
                    onClick={() => handlePackageSelect({
                      name: 'Премиум',
                      description: 'Комплексное решение для крупного бизнеса',
                      price: '249 900 ₽'
                    })} 
                    className="btn btn-primary w-full"
                  >
                    Выбрать пакет
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Почему с нами просто, быстро и эффективно */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-6">
              Почему с нами просто, быстро и эффективно
            </h2>
            <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
              Мы не тратим ваше время на брифы и маркетинговые сессии. Мы берём задачу и решаем её — с помощью ИИ и no-code. Чётко. Без лишнего.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Быстрый запуск за 7–14 дней</h3>
                <p className="text-gray-400">Без недель обсуждений, правок и ожиданий. Мы автоматизировали сбор, разработку и запуск. Большинство проектов стартуют в течение недели.</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">Гарантия результата, а не процесса</h3>
                <p className="text-gray-400">Никакой "консультационной" пыли в глаза. Мы не рассуждаем — мы делаем. Каждый проект проверяется вручную и дорабатывается до полного "ОК".</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Честные и понятные цены</h3>
                <p className="text-gray-400">Вы платите за результат, а не за часы и гипотезы. Стоимость фиксируется заранее, без "доплат за срочность" и "ещё одну итерацию".</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">Умные ИИ-решения внутри</h3>
                <p className="text-gray-400">Контент, визуал, автоматизация и чат-боты — всё создаём и внедряем с использованием нейросетей и no-code инструментов. Быстро и прозрачно.</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-2">Поддержка без пауз</h3>
                <p className="text-gray-400">Связь в Telegram 24/7 — без тикетов и ожиданий. Мы не прячемся за CRM: вы всегда знаете, кто отвечает за ваш проект.</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Безопасность и конфиденциальность</h3>
                <p className="text-gray-400">Все ваши данные, доступы и процессы — под защитой. Мы работаем только в проверенных сервисах и соблюдаем цифровую гигиену.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-16">
              Просто, быстро и по шагам
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Вы оставляете заявку</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Мы обсуждаем задачи и утверждаем ТЗ</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Через 7 дней вы получаете решение</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Внедрение, поддержка и рост</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-12">
              О нас говорят
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-4">👩‍💼</div>
                <h3 className="text-xl font-semibold mb-2">Анна, владелица онлайн-школы</h3>
                <p className="text-gray-400">«Ребята внедрили автопостинг и сделали лендинг. Всё за 6 дней! Экономлю 3 часа в день — фантастика.»</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-4">🧑‍💻</div>
                <h3 className="text-xl font-semibold mb-2">Дмитрий, сооснователь стартапа</h3>
                <p className="text-gray-400">«Без единой строки кода мы получили полноценный сайт с CRM и ботами. Очень крутой подход к задаче.»</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold mb-2">Егор, бизнес-тренер</h3>
                <p className="text-gray-400">«AI-фото и оформление соцсетей — теперь мой Instagram выглядит как у топ-экспертов. Спасибо за скорость и качество!»</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Whom Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-12">
              Кому мы особенно полезны
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">🎯</div>
                <p className="text-xl">Экспертам, которые хотят продавать через контент</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">🚀</div>
                <p className="text-xl">Стартапам, которым нужен сайт за неделю</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">📱</div>
                <p className="text-xl">Блогерам и наставникам — для оформления и автоматизации</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">💼</div>
                <p className="text-xl">Владельцам малого бизнеса — для ускорения процессов</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Готовы сэкономить время и запустить бизнес на максимум?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Оставьте заявку — покажем, как ваш бизнес может расти с ИИ и no-code
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary btn-lg"
            >
              Оставить заявку
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Left Column */}
            <div>
              <div 
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={scrollToTop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
              >
                <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
                <span className="text-xl font-bold text-white">Semantica AI</span>
              </div>
              <p className="text-gray-400">AI-решения для бизнеса без кода. За 7 дней.</p>
            </div>
            
            {/* Middle Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#process" className="text-gray-400 hover:text-primary transition-colors">Как мы работаем</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-primary transition-colors">Услуги</a>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="text-gray-400 hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
                  >
                    Оставить заявку
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handlePrivacyPolicyClick}
                    className="text-gray-400 hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
                  >
                    Политика конфиденциальности
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.07-3.48 3.84-1.61 4.64-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.02.14-.01.3-.02.43z"/>
                  </svg>
                  <a 
                    href="https://t.me/Nikolai_Perepichko" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    @Nikolai_Perepichko
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a 
                    href="mailto:perepichko.nik@gmail.com" 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    perepichko.nik@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span className="text-gray-400">Пн–Вс, 09:00–21:00</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500">© 2025 Semantica AI. Все права защищены</p>
          </div>
        </div>
      </footer>

      {/* Telegram Button */}
      <a
        href="https://t.me/Nikolai_Perepichko"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#0088cc] hover:bg-[#0099dd] text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.07-3.48 3.84-1.61 4.64-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.02.14-.01.3-.02.43z"/>
        </svg>
      </a>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={handleCloseModal}
          currency={currency}
          onPrivacyClick={handlePrivacyPolicyClick}
        />
      )}
      
      {showContactForm && (
        <ContactForm 
          onClose={() => setShowContactForm(false)} 
          onPrivacyClick={handlePrivacyPolicyClick}
        />
      )}
      
      {selectedPackage && (
        <PackageOrderForm
          packageName={selectedPackage.name}
          packageDescription={selectedPackage.description}
          price={selectedPackage.price}
          onClose={closeModal}
          onSubmit={handlePackageSubmit}
        />
      )}
      
      {showPrivacyPolicy && (
        <PrivacyPolicy
          onClose={handleClosePrivacyPolicy}
        />
      )}
    </div>
  );
}