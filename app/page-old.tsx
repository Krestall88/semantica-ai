'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ServiceModal } from '../components/ServiceModal';
import { ContactForm } from '../components/ContactForm';
import { PackageOrderForm } from '../components/PackageOrderForm';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import { CurrencySelector, type Currency } from '../components/CurrencySelector';
import { services } from '@/data/services';
import type { Service } from '@/types/service';
import { ServiceSection } from '../components/ServiceSection';

export default function Home() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    description: string;
    price: string;
  } | null>(null);
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [usdRate, setUsdRate] = useState<number>(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatPrice = (price: string): string => {
    if (currency === 'USD' && usdRate > 0) {
      const priceNum = parseInt(price.replace(/\D/g, '')) / usdRate * 1.05; // 5% наценка
      return `$${Math.ceil(priceNum / 5) * 5}`; // Округление до 5
    }
    return price;
  };

  useEffect(() => {
    // Fetch USD to RUB exchange rate from our API
    const fetchUsdRate = async () => {
      try {
        const response = await fetch('/api/usd-rate');
        const data = await response.json();
        setUsdRate(data.rate || 0);
      } catch (error) {
        console.error('Failed to fetch USD rate:', error);
        setUsdRate(0);
      }
    };

    fetchUsdRate();
    // Refresh rate every 5 minutes
    const interval = setInterval(fetchUsdRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOpenContactForm = () => {
      setShowContactForm(true);
    };

    window.addEventListener('openContactForm', handleOpenContactForm as EventListener);

    return () => {
      window.removeEventListener('openContactForm', handleOpenContactForm as EventListener);
    };
  }, []);

  const handleServiceClick = (service: Service) => {
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
            <a href="#why-us" className="text-gray-300 hover:text-primary transition-colors">{t('menu_how_we_work', 'Как мы работаем')}</a>
            <a href="#services" className="text-gray-300 hover:text-primary transition-colors">{t('menu_services', 'Услуги')}</a>
            <CurrencySelector
              currency={currency}
              onCurrencyChange={setCurrency}
              showLanguage={true}
            />
            <button
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary animate-pulse-glow"
            >
              {t('button_submit_request', 'Оставить заявку')}
            </button>
          </div>

          <button 
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="{t('menu', 'Меню')}"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Мобильное меню */}
          <div className={`fixed inset-0 bg-black/90 z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <a 
              href="#why-us" 
              className="text-2xl text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('menu_how_we_work', 'Как мы работаем')}
            </a>
            <a 
              href="#services" 
              className="text-2xl text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('menu_services', 'Услуги')}
            </a>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <CurrencySelector
                currency={currency}
                onCurrencyChange={setCurrency}
                showLanguage={false}
              />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[85vh] pt-32 px-6 md:px-12 lg:px-24 gradient-bg">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('hero_title', 'AI-система для бизнеса под ключ')}
              </h1>
              <p className="text-xl text-gray-400">
                {t('hero_subtitle')}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="btn btn-primary"
                >
                  {t('hero_cta_primary')} →
                </button>
                <a
                  href="#solutions"
                  className="btn btn-secondary border border-gray-600 hover:border-primary text-gray-200 hover:text-white"
                >
                  {t('hero_cta_secondary')}
                </a>
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
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('key_solutions_title')}</h2>
              <p className="text-xl text-gray-400">{t('key_solutions_subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Сайты под ключ */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-6">🔹 {t('solutions_sites_title')}</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_sites_b1')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_sites_b2')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_sites_b3')}
                  </li>
                </ul>
              </div>

              {/* Автоматизация */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-6">🔹 {t('solutions_auto_title')}</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_auto_b1')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_auto_b2')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_auto_b3')}
                  </li>
                </ul>
              </div>

              {/* Визуальное оформление */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-6">🔹 {t('solutions_visual_title')}</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_visual_b1')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_visual_b2')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('solutions_visual_b3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-8">
              {t('our_services')}
            </h2>
            <ServiceSection
              services={services}
              onServiceClick={handleServiceClick}
              currency={currency}
              usdRate={usdRate}
            />
          </div>
        </section>

        {/* Цифровая система под ключ */}
        <section className="py-20 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-primary">Цифровая система</span> для управления бизнесом
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Автоматизируем рутину и систематизируем процессы в едином решении
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Карточка 1: Что входит */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="text-4xl mb-6 text-primary">📋</div>
                <h3 className="text-2xl font-semibold mb-6">Что входит в систему</h3>
                <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Продажи: заявки, учёт оплат, статусы, уведомления</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Логистика: маршруты, распределение, контроль водителей</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Финансы: доходы, расходы, долги, документы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Управление: роли, права, аналитика, дашборды</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-4">Интеграции: 1С, Excel, WhatsApp, CRM, API</p>
                </div>
              </div>

              {/* Карточка 2: Преимущества */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="text-4xl mb-6 text-primary">✨</div>
                <h3 className="text-2xl font-semibold mb-6">Преимущества</h3>
                <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Всё в одном месте — никаких разрозненных сервисов</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Автоматизация рутинных операций</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Контроль всех бизнес-процессов онлайн</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>Аналитика и отчётность в реальном времени</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400">Настраиваем под ваш бизнес</p>
                </div>
              </div>

              {/* Карточка 3: Заявка */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col">
                <div className="text-4xl mb-6 text-primary">🚀</div>
                <h3 className="text-2xl font-semibold mb-4">Получите разбор вашего бизнеса</h3>
                <p className="text-gray-300 mb-6">
                  Оставьте заявку и получите бесплатный аудит ваших процессов с расчётом эффективности внедрения
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold">от</span>
                    <span className="text-4xl font-bold">{formatPrice('300 000 ₽')}</span>
                  </div>
                  
                  <button 
                    onClick={() => handlePackageSelect({
                      name: 'Разработка цифровой системы',
                      description: 'Индивидуальное решение для автоматизации бизнес-процессов',
                      price: 'от 300 000 ₽'
                    })}
                    className="btn btn-primary w-full py-4 text-lg font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Получить разбор
                  </button>
                  
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    Свяжемся в течение 2 часов в рабочее время
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-semibold mb-6">Кому подходит наше решение</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  Малый и средний бизнес
                </span>
                <span className="px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  Онлайн-школы и коучи
                </span>
                <span className="px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  Сервисные компании
                </span>
                <span className="px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                  Стартапы на этапе MVP
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Почему с нами просто, быстро и эффективно */}
        <section id="why-us" className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-6">
              {t('why_us_title', 'Почему с нами просто, быстро и эффективно')}
            </h2>
            <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12">
              {t('why_us_subtitle', 'Мы не тратим ваше время на брифы и маркетинговые сессии. Мы берём задачу и решаем её — с помощью ИИ и no-code. Чётко. Без лишнего.')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">{t('why_us_fast_title', 'Быстрый запуск за 7–14 дней')}</h3>
                <p className="text-gray-400">{t('why_us_fast_desc', 'Без недель обсуждений, правок и ожиданий. Мы автоматизировали сбор, разработку и запуск. Большинство проектов стартуют в течение недели.')}</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">{t('why_us_guarantee_title', 'Гарантия результата, а не процесса')}</h3>
                <p className="text-gray-400">{t('why_us_guarantee_desc', 'Никакая "консультационная" пыль в глаза. Мы не рассуждаем — мы делаем. Каждый проект проверяется вручную и дорабатывается до полного "ОК".')}</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">{t('why_us_prices_title', 'Честные и понятные цены')}</h3>
                <p className="text-gray-400">{t('why_us_prices_desc', 'Вы платите за результат, а не за часы и гипотезы. Стоимость фиксируется заранее, без "доплат за срочность" и "ещё одну итерацию".')}</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">{t('why_us_ai_title', 'Умные ИИ-решения внутри')}</h3>
                <p className="text-gray-400">{t('why_us_ai_desc', 'Контент, визуал, автоматизация и чат-боты — всё создаём и внедряем с использованием нейросетей и no-code инструментов. Быстро и прозрачно.')}</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-2">{t('why_us_support_title', 'Поддержка без пауз')}</h3>
                <p className="text-gray-400">{t('why_us_support_desc', 'Связь в Telegram 24/7 — без тикетов и ожиданий. Мы не прячемся за CRM: вы всегда знаете, кто отвечает за ваш проект.')}</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-primary text-2xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">{t('why_us_security_title', 'Безопасность и конфиденциальность')}</h3>
                <p className="text-gray-400">{t('why_us_security_desc', 'Все ваши данные, доступы и процессы — под защитой. Мы работаем только в проверенных сервисах и соблюдаем цифровую гигиену.')}</p>
              </div>
            </div>
          </div>
        </section>

        
        {/* How We Work Section */}
        <section id="how-we-work" className="py-20 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Как мы запускаем AI-систему под ключ
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                От первого диалога до работающей системы в вашем бизнесе — без хаоса и потерь времени.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Step 1 */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🧠</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">1. Разбираем процессы</h3>
                    <p className="text-gray-300">
                      На бесплатной консультации изучаем вашу бизнес-модель, проблемы, ручной труд и цели. 
                      Показываем, что можно улучшить уже сейчас.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📍</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">2. Проектируем систему</h3>
                    <p className="text-gray-300">
                      Делаем карту процессов, выбираем инструменты, прописываем логику, роли, права. 
                      Учитываем масштаб, команду, интеграции.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⚙️</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">3. Собираем и внедряем</h3>
                    <p className="text-gray-300">
                      Создаём решение на no-code: от CRM и складского учёта — до логистики, заявок и аналитики. 
                      Интегрируем с 1С, ботами, API и AI.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#2A2A2A] rounded-2xl p-8 hover:bg-[#333] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🚀</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">4. Обучаем и запускаем</h3>
                    <p className="text-gray-300">
                      Показываем, как пользоваться системой. Обучаем сотрудников, пишем инструкции. 
                      Поддерживаем после запуска и докручиваем под реальные кейсы.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-12">
              {t('for_whom_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">🎯</div>
                <p className="text-xl">{t('for_whom_1')}</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">🚀</div>
                <p className="text-xl">{t('for_whom_2')}</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">📱</div>
                <p className="text-xl">{t('for_whom_3')}</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-primary text-2xl">💼</div>
                <p className="text-xl">{t('for_whom_4')}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
            <h2 className="text-4xl font-bold mb-6">
              {t('cta_title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('cta_subtitle')}
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary btn-lg"
            >
              {t('button_submit_request', 'Оставить заявку')}
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
              <p className="text-gray-400">{t('footer_tagline', 'AI-решения для бизнеса без кода. За 7 дней.')}</p>
            </div>
            
            {/* Middle Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer_navigation', 'Навигация')}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#process" className="text-gray-400 hover:text-primary transition-colors">{t('menu_how_we_work', 'Как мы работаем')}</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-primary transition-colors">{t('menu_services', 'Услуги')}</a>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="text-gray-400 hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
                  >
                    {t('button_submit_request', 'Оставить заявку')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handlePrivacyPolicyClick}
                    className="text-gray-400 hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
                  >
                    {t('privacy_policy', 'Политика конфиденциальности')}
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer_contacts', 'Контакты')}</h3>
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
                  <span className="text-gray-400">{t('working_hours', 'Пн–Вс, 09:00–21:00')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500">© 2025 Semantica AI. {t('all_rights_reserved', 'Все права защищены')}</p>
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
          service={{
            ...selectedService,
            title: t(selectedService.titleKey),
            description: t(selectedService.descriptionKey),
            modalTitle: t(selectedService.modalTitleKey),
            modalDescription: t(selectedService.modalDescriptionKey),
            includes: Array.isArray(selectedService.includes) 
              ? selectedService.includes.map(key => t(key as string))
              : Object.values(selectedService.includes).map((key: string) => t(key)),
            forWhom: selectedService.forWhom.map(key => t(key as string))
          }}
          onClose={handleCloseModal}
          currency={currency}
          usdRate={usdRate}
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
          currency={currency}
          usdRate={usdRate}
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