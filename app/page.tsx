'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ContactForm } from '../components/ContactForm';
import { PrivacyPolicy } from '../components/PrivacyPolicy';

// Кейсы - обновленные по вашему описанию
const cases = [
  {
    id: 'haccp',
    title: 'FlowOne HACCP — Система управления безопасностью на пищевом производстве',
    tag: 'Производство',
    description:
      'Комплексная система управления HACCP-процессами для пекарен, кондитерских и пищевых производств. Готовность к проверкам Роспотребнадзора за 5 минут.',
    features: [
      'Журналы температур с автоматической цветовой индикацией отклонений',
      'Ежедневный медосмотр персонала и контроль допуска к работе',
      'Реестр документов с контролем сроков действия сертификатов',
      'Пакет для проверки — все документы одной кнопкой',
      'Матрица рисков HACCP и контроль критических точек',
      'Режим проверки с фиксацией всех действий аудитора'
    ],
    result:
      'Экономия 10-15 часов в месяц на документации. Готовность к проверке в любой момент. Избежание штрафов от 10 000 до 1 000 000 рублей.',
    images: ['haccp-1.jpg', 'haccp-2.jpg', 'haccp-3.jpg']
  },
  {
    id: 'beauty',
    title: 'Beauty Services — Telegram Mini App для бьюти-салона',
    tag: 'Telegram Mini App',
    description:
      'Современное приложение для записи на бьюти-услуги прямо в Telegram. Telegram Mini Apps — это веб-приложения, которые работают внутри мессенджера без установки. Клиенты записываются в пару кликов, а салон получает готовую систему бронирования.',
    features: [
      'Каталог из 23 услуг: маникюр, педикюр, макияж, брови, волосы, уход за лицом',
      'Онлайн-запись с выбором даты и времени',
      'Галерея работ для каждой услуги с реальными фото',
      'Личный кабинет с историей записей и статистикой',
      'AI-консультант для подбора услуг',
      'Админ-панель для управления записями и клиентами'
    ],
    result:
      'Клиенты записываются без звонков и переписок. Салон экономит время администратора. Все записи и клиенты в одной системе.',
    images: ['beauty-1.jpg', 'beauty-2.jpg', 'beauty-3.jpg']
  },
  {
    id: 'cleaning',
    title: 'Система управления для клининговой компании',
    tag: 'B2B Сервис',
    description:
      'Внутренняя система контроля и учёта для клининговой компании, работающей с промышленными и коммерческими объектами.',
    features: [
      'Учет объектов и чек-листы на основе техкарт',
      'Заявки от заказчика через простую форму',
      'Ежедневные чек-листы менеджера с фотоотчётами',
      'Учёт инвентаря и химии',
      'Telegram-уведомления о просрочках',
      'Отчёты и история всех действий'
    ],
    result:
      'Руководство видит всё: от заявок до химии. Менеджеры не теряются и не забывают. Качество уборки подтверждено фактами.',
    images: ['cleaning-1.jpg', 'cleaning-2.jpg', 'cleaning-3.jpg']
  },
  {
    id: 'production',
    title: 'Производственные журналы (хлебозавод)',
    tag: 'Производство',
    description: 'Цифровизация производственных журналов для контроля ежедневных процессов на производстве.',
    features: [
      'Удобный календарь и навигация по датам',
      'Журналы температуры и состояния оборудования',
      'Журнал здоровья сотрудников',
      'Электронная подпись записей',
      'Экспорт в PDF и архив за любой день',
      'Интеграции с 1С, весами, датчиками'
    ],
    result: 'Цифровизация 21 журнала, устранение ошибок ручного заполнения, прозрачность смены для руководителя.',
    images: ['production-1.jpg', 'production-2.jpg', 'production-3.jpg']
  },
  {
    id: 'distribution',
    title: 'Система снабжения и дистрибуции продуктов',
    tag: 'Логистика',
    description: 'Цифровая система для компаний по снабжению и дистрибуции продуктов питания.',
    features: [
      'Заказ продукции с завода',
      'Приём товара на складе с контролем',
      'Работа агентов с остатками и сроками',
      'Подготовка заказов и отгрузка',
      'Мобильное приложение для водителей',
      'Аналитика и финансы в одном отчёте'
    ],
    result: 'Единая система вместо Bitrix, WhatsApp и Excel. Полный контроль от заказа до доставки.',
    images: ['distribution-1.jpg', 'distribution-2.jpg', 'distribution-3.jpg']
  },
  {
    id: 'documents',
    title: 'Модуль документооборота',
    tag: 'Документооборот',
    description: 'Модуль для управления документами с ролями, статусами и маршрутами согласования.',
    features: [
      'Загрузка и хранение документов',
      'Аккуратная структура разделов',
      'Роли и уровни доступа',
      'Статусы и движение документов',
      'Маршруты согласования',
      'Журнал действий и событий'
    ],
    result: 'Все документы в одном месте с контролем версий, доступов и сроков согласования.',
    images: ['documents-1.jpg', 'documents-2.jpg', 'documents-3.jpg']
  }
];

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAuditForm, setShowAuditForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [imageModal, setImageModal] = useState<{
    caseIndex: number;
    imageIndex: number;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

   const openImageModal = useCallback((caseIndex: number, imageIndex: number) => {
    setImageModal({ caseIndex, imageIndex });
  }, []);

  const closeImageModal = useCallback(() => {
    setImageModal(null);
  }, []);

  const showPrevImage = useCallback(() => {
    if (!imageModal) return;
    const currentCase = cases[imageModal.caseIndex];
    const total = currentCase.images.length;
    const nextIndex = (imageModal.imageIndex - 1 + total) % total;
    setImageModal({ ...imageModal, imageIndex: nextIndex });
  }, [imageModal]);

  const showNextImage = useCallback(() => {
    if (!imageModal) return;
    const currentCase = cases[imageModal.caseIndex];
    const total = currentCase.images.length;
    const nextIndex = (imageModal.imageIndex + 1) % total;
    setImageModal({ ...imageModal, imageIndex: nextIndex });
  }, [imageModal]);

  useEffect(() => {
    if (!imageModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeImageModal();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrevImage();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageModal, closeImageModal, showPrevImage, showNextImage]);

  // Услуги
  const services = [
    'ERP/CRM-системы под ключ',
    'Управление производством',
    'Логистические системы',
    'Заявки и маршрутизация',
    'Управление персоналом и процессами',
    'Склад, учёт, отчёты',
    'Telegram-боты и мини-апп',
    'AI-модули (ассистенты, классификация)',
    'Автоматизация на уровне компании',
    'Интеграции: API, телефония, 1С'
  ];

  // Преимущества
  const advantages = [
    { icon: '🎯', title: 'Индивидуальная разработка', desc: 'Под ваши процессы, не под шаблон' },
    { icon: '⚡', title: 'Быстрое внедрение MVP', desc: '10-20 дней до первой версии' },
    { icon: '🤖', title: 'Больше автоматизаций', desc: 'Меньше ручной работы' },
    { icon: '💰', title: 'Доступная стоимость', desc: 'Без подписки и скрытых платежей' },
    { icon: '🎨', title: 'Простой интерфейс', desc: 'Понятен без обучения' },
    { icon: '🔗', title: 'Любые интеграции', desc: 'API, 1С, телефония, боты' },
    { icon: '🛠', title: 'Бесплатное сопровождение', desc: '1-3 месяца после внедрения' },
    { icon: '✅', title: 'Честные сроки', desc: 'Без "доделок вечность"' }
  ];

  // Этапы работы
  const workStages = [
    {
      num: '01',
      title: 'Аудит процессов',
      desc: 'Проводим экспресс-аудит: изучаем ваши процессы, задаём уточняющие вопросы, формируем полную картину.',
      duration: '1-2 дня'
    },
    {
      num: '02',
      title: 'Проектный план и КП',
      desc: 'Формируем структуру будущей системы, этапы, сроки и смету. Согласовываем план работ.',
      duration: '1-3 дня'
    },
    {
      num: '03',
      title: 'Согласование ТЗ',
      desc: 'Уточняем требования, собираем данные, формируем чёткое ТЗ без лишней бюрократии. Фиксируем границы проекта.',
      duration: '2-4 дня'
    },
    {
      num: '04',
      title: 'Договор и старт разработки',
      desc: 'Подписание договора, оплата предоплаты, запуск работ.',
      duration: '1 день'
    },
    {
      num: '05',
      title: 'Разработка MVP',
      desc: 'Создаём базовую версию системы, проектируем БД, подключаем ключевые интеграции. Показываем промежуточную версию.',
      duration: '10-20 дней'
    },
    {
      num: '06',
      title: 'Финальная разработка',
      desc: 'Полный функционал, автоматизации и доработки по результатам тестирования.',
      duration: '1-2 месяца (зависит от сложности проекта)'
    },
    {
      num: '07',
      title: 'Запуск, обучение и поддержка',
      desc: 'Ввод в эксплуатацию, обучение команды, сопровождение и оперативные доработки.',
      duration: '1-3 месяца'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <nav className="container-custom py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={scrollToTop}
          >
            <Image src="/logo-white.svg" alt="SemanticaAI" width={36} height={36} />
            <span className="text-xl font-bold">SemanticaAI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">О нас</button>
            <button onClick={() => scrollToSection('cases')} className="text-gray-300 hover:text-white transition-colors">Кейсы</button>
            <button onClick={() => scrollToSection('process')} className="text-gray-300 hover:text-white transition-colors">Процесс</button>
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Услуги</button>
            <button onClick={() => scrollToSection('contacts')} className="text-gray-300 hover:text-white transition-colors">Контакты</button>
            <button onClick={() => setShowContactForm(true)} className="btn btn-primary animate-pulse-glow">
              Оставить заявку
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-strong border-t border-white/10">
            <div className="container-custom py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('about')} className="text-left text-gray-300 hover:text-white py-2">О нас</button>
              <button onClick={() => scrollToSection('cases')} className="text-left text-gray-300 hover:text-white py-2">Кейсы</button>
              <button onClick={() => scrollToSection('process')} className="text-left text-gray-300 hover:text-white py-2">Процесс</button>
              <button onClick={() => scrollToSection('services')} className="text-left text-gray-300 hover:text-white py-2">Услуги</button>
              <button onClick={() => scrollToSection('contacts')} className="text-left text-gray-300 hover:text-white py-2">Контакты</button>
              <button onClick={() => { setShowContactForm(true); setIsMobileMenuOpen(false); }} className="btn btn-primary w-full">
                Оставить заявку
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 md:pt-28 pb-12 md:pb-16 hero-gradient grid-bg relative overflow-hidden">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left - Text */}
              <div>
                <div className="badge mb-6">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Принимаем новые проекты
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Индивидуальные операционные системы для бизнеса
                  <span className="block text-gray-400 text-xl md:text-2xl lg:text-3xl mt-4 font-normal">
                    — мы закрываем хаос в операционке
                  </span>
                </h1>
                
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Создаём управленческие системы, которые закрывают реальные процессы компании: заявки, производство, логистика, задачи, аналитика, контроль сотрудников, автоматизации и AI-модули.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setShowAuditForm(true)}
                    className="btn btn-primary btn-hero"
                  >
                    Заказать экспресс-аудит
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => scrollToSection('cases')}
                    className="btn btn-secondary btn-hero"
                  >
                    Посмотреть кейсы
                  </button>
                </div>
              </div>

              {/* Right - Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
                  
                  {/* Main visual */}
                  <div className="relative bg-[#12121A] rounded-3xl border border-white/10 p-8 h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                        <span className="text-4xl">⚡</span>
                      </div>
                      <h3 className="text-2xl font-bold gradient-text">SemanticaAI</h3>
                      <p className="text-gray-400 mt-2">Операционные системы</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-blue-400">7+</div>
                        <div className="text-sm text-gray-400">лет опыта</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-purple-400">10-20</div>
                        <div className="text-sm text-gray-400">дней до MVP</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-green-400">20+</div>
                        <div className="text-sm text-gray-400">проектов</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-cyan-400">24/7</div>
                        <div className="text-sm text-gray-400">поддержка</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-black/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Студия прикладной автоматизации
              </h2>
              <p className="text-lg text-gray-400">
                Создаём индивидуальные ERP/CRM-системы, которые на 100% повторяют процессы компании.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card p-5">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold mb-2">Проектируем с нуля</h3>
                <p className="text-gray-400 text-sm">Система под ваши процессы, а не вы под систему.</p>
              </div>
              <div className="card p-5">
                <div className="text-2xl mb-3">🎨</div>
                <h3 className="text-lg font-semibold mb-2">Простые интерфейсы</h3>
                <p className="text-gray-400 text-sm">Любой сотрудник разберётся без обучения.</p>
              </div>
              <div className="card p-5">
                <div className="text-2xl mb-3">⚙️</div>
                <h3 className="text-lg font-semibold mb-2">Автоматизации</h3>
                <p className="text-gray-400 text-sm">Экономим часы рутинной работы.</p>
              </div>
              <div className="card p-5">
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="text-lg font-semibold mb-2">AI-модули</h3>
                <p className="text-gray-400 text-sm">ИИ только там, где это даёт результат.</p>
              </div>
              <div className="card p-5">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold mb-2">MVP за 10–20 дней</h3>
                <p className="text-gray-400 text-sm">Быстрый запуск рабочей версии.</p>
              </div>
              <div className="card card-highlight p-5">
                <div className="text-2xl mb-3">💼</div>
                <h3 className="text-lg font-semibold mb-2">Ваш инструмент</h3>
                <p className="text-gray-400 text-sm">Не «CRM», а конкретный инструмент управления.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Мы закрываем хаос в операционке</h2>
              <p className="text-lg text-gray-400">Знакомые проблемы? Мы их решаем.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
             
              {/* Solutions */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold mb-4 text-green-400">✓ Решения</h3>
                {[
                  'Единый интерфейс для всех процессов',
                  'Система сама напоминает, считает, контролирует',
                  'Автоматический учёт, отчёты, зарплаты, статусы',
                  'Маршрутизация задач между сотрудниками',
                  'Интеграции (Telegram, телефония, склад, API)',
                  'Система, понятная каждому без обучения'
                ].map((solution, i) => (
                  <div key={i} className="solution-item">
                    <span className="text-green-400 text-lg">✓</span>
                    <span className="text-gray-300 text-sm">{solution}</span>
                  </div>
                ))}
              </div>

              {/* Problems */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold mb-4 text-red-400">❌ Проблемы</h3>
                {[
                  'Данные в Excel, WhatsApp, Google Таблицах',
                  'Сотрудники забывают, теряют, не фиксируют',
                  'Каждый отдел работает в своей системе',
                  'Процессы не прозрачны — руководитель всё тянет вручную',
                  'Автоматизации отсутствуют или работают криво',
                  'Bitrix/1C/Мегаплан: слишком сложно, много лишнего'
                ].map((problem, i) => (
                  <div key={i} className="problem-item">
                    <span className="text-red-400 text-lg">✕</span>
                    <span className="text-gray-300 text-sm">{problem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section id="cases" className="py-16 bg-black/30">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Кейсы</h2>
              <p className="text-lg text-gray-400">Реальные проекты, реальные результаты</p>
              <p className="text-sm text-gray-400 mt-2">
                Подробнее о внедрениях — в нашей группе Telegram, ссылка в блоке «Контакты».
              </p>
            </div>

            <div className="space-y-8">
              {cases.map((caseItem, index) => (
                <div key={index} className="case-card">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Images */}
                    <div className="bg-[#0D0D12] p-6 lg:p-8">
                      <div className="grid grid-cols-3 gap-3 h-full">
                        {caseItem.images.map((img, i) => (
                          <div 
                            key={i} 
                            className="relative bg-white/5 rounded-xl overflow-hidden aspect-[4/3] border border-white/10 cursor-zoom-in hover:border-blue-500/60 transition-colors"
                            onClick={() => openImageModal(index, i)}
                          >
                            <Image 
                              src={`/cases/${caseItem.id}/${img}`}
                              alt={`${caseItem.title} - скриншот ${i + 1}`}
                              fill
                              sizes="(min-width: 1024px) 33vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <div className="badge mb-3">{caseItem.tag}</div>
                      <h3 className="text-xl font-bold mb-3">{caseItem.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{caseItem.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {caseItem.features.slice(0, 4).map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 text-sm">•</span>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-green-400 text-sm">
                          <span className="font-medium">Результат:</span> {caseItem.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Process Section */}
        <section id="process" className="py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Как мы работаем</h2>
              <p className="text-lg text-gray-400">От идеи до работающей системы</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workStages.map((stage, index) => (
                <div key={index} className="relative bg-white/[0.02] rounded-xl border border-white/5 p-5 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                      {stage.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{stage.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{stage.desc}</p>
                      <span className="text-xs text-blue-400">{stage.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-white/5">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Бесплатное сопровождение после внедрения</h3>
                  <p className="text-gray-400">Поддержка, доработки и консультации</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">от 1 до 3 месяцев</div>
                  <div className="text-sm text-gray-400">сроки обсуждаемы</div>
                </div>
               
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Что мы делаем</h2>
              <p className="text-lg text-gray-400">Полный спектр решений для автоматизации</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <span key={index} className="service-tag">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 bg-black/30">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Преимущества</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {advantages.map((adv, index) => (
                <div key={index} className="advantage-card">
                  <span className="text-2xl">{adv.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{adv.title}</h3>
                    <p className="text-xs text-gray-400">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="offer-card p-6 md:p-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="badge mb-4">Специальное предложение</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Экспресс-аудит одного процесса
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Готово в этот же день. За 1 день вы получите:
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {[
                      'Карту процесса',
                      'Выявленные узкие места',
                      'Точки автоматизации',
                      'Оценку сроков и бюджета'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <span className="text-green-400 text-xs">✓</span>
                        </span>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <div className="inline-block bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-1">Стоимость</p>
                    <div className="text-4xl font-bold mb-1">
                      <span className="gradient-text">Бесплатно</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-6"> </p>
                    
                    <button 
                      onClick={() => setShowAuditForm(true)}
                      className="btn btn-accent w-full"
                    >
                      Получить аудит
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Images Modal */}
        {imageModal && (() => {
          const currentCase = cases[imageModal.caseIndex];
          const currentImage = currentCase.images[imageModal.imageIndex];
          return (
            <div
              className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center px-4"
              onClick={closeImageModal}
            >
              <div
                className="relative max-w-5xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeImageModal}
                  className="absolute -top-10 right-0 text-gray-400 hover:text-white"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
                <div className="relative w-full aspect-video bg-[#050509] rounded-2xl overflow-hidden border border-white/20">
                  <Image
                    src={`/cases/${currentCase.id}/${currentImage}`}
                    alt={`${currentCase.title} - скриншот`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                  <button
                    type="button"
                    onClick={showPrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg"
                    aria-label="Предыдущий скриншот"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg"
                    aria-label="Следующий скриншот"
                  >
                    ›
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <div className="truncate mr-2">{currentCase.title}</div>
                  <div>
                    {imageModal.imageIndex + 1} / {currentCase.images.length}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Contacts Section */}
        <section id="contacts" className="py-16 bg-black/30">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Контакты</h2>
              <p className="text-lg text-gray-400">Свяжитесь с нами</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-4 gap-4 mb-8">
                <a 
                  href="https://t.me/Nikolai_Perepichko" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-5 text-center hover:border-blue-500/50"
                >
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="font-semibold text-sm mb-1">Telegram</h3>
                  <p className="text-blue-400 text-xs">@Nikolai_Perepichko</p>
                </a>

                <a 
                  href="https://wa.me/79123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-5 text-center hover:border-green-500/50"
                >
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="font-semibold text-sm mb-1">WhatsApp</h3>
                  <p className="text-green-400 text-xs">Написать</p>
                </a>

                <a 
                  href="mailto:perepichko.nik@gmail.com"
                  className="card p-5 text-center hover:border-purple-500/50"
                >
                  <div className="text-3xl mb-3">✉️</div>
                  <h3 className="font-semibold text-sm mb-1">Email</h3>
                  <p className="text-purple-400 text-xs">perepichko.nik@gmail.com</p>
                </a>

                <a 
                  href="https://t.me/SemanticaAI/68" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card p-5 text-center hover:border-cyan-500/50"
                >
                  <div className="text-3xl mb-3">👥</div>
                  <h3 className="font-semibold text-sm mb-1">Группа в Telegram</h3>
                  <p className="text-cyan-400 text-xs">Подробнее о внедрениях</p>
                </a>
              </div>

             
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 cta-gradient">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Готовы навести порядок в операционке?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Закажите консультацию и узнайте, как автоматизировать ваши процессы
            </p>
            <button 
              onClick={() => setShowContactForm(true)}
              className="btn btn-primary btn-lg"
            >
              Получить консультацию
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-white.svg" alt="SemanticaAI" width={28} height={28} />
              <span className="font-bold text-sm">SemanticaAI</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <button 
                onClick={() => setShowPrivacyPolicy(true)}
                className="hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </button>
              <span>© 2025 SemanticaAI</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showContactForm && (
        <ContactForm 
          onClose={() => setShowContactForm(false)} 
          onPrivacyClick={() => {
            setShowContactForm(false);
            setShowPrivacyPolicy(true);
          }}
        />
      )}

      {showAuditForm && (
        <AuditForm 
          onClose={() => setShowAuditForm(false)}
          onPrivacyClick={() => {
            setShowAuditForm(false);
            setShowPrivacyPolicy(true);
          }}
        />
      )}

      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
}

// Audit Form Component
function AuditForm({ onClose, onPrivacyClick }: { onClose: () => void; onPrivacyClick: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    process: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'audit',
          service: 'Экспресс-аудит процесса',
          name: formData.name,
          contact: formData.contact,
          description: formData.process
        }),
      });

      if (!response.ok) throw new Error('Failed to send');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка. Попробуйте связаться через Telegram.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#12121A] rounded-2xl p-6 max-w-md w-full relative border border-white/10">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            <div className="badge mb-3">Бесплатно</div>
            <h2 className="text-xl font-bold mb-2">Экспресс-аудит процесса</h2>
            <p className="text-gray-400 text-sm mb-5">
              Опишите процесс для автоматизации. Результат — в тот же день.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                  placeholder="Ваше имя"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Telegram / Телефон</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="input"
                  required
                  placeholder="@username или +7..."
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Какой процесс разобрать?</label>
                <textarea
                  value={formData.process}
                  onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                  className="input min-h-[80px] resize-none"
                  required
                  placeholder="Обработка заявок, учёт на складе..."
                  disabled={isLoading}
                />
              </div>
              
              <button type="submit" className="btn btn-accent w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Отправка...
                  </span>
                ) : 'Заказать аудит'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <button type="button" onClick={onPrivacyClick} className="text-blue-400 hover:underline">
                  политикой конфиденциальности
                </button>
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold mb-2">Заявка отправлена!</h2>
            <p className="text-gray-400 text-sm mb-4">
              Свяжусь в течение 2 часов в рабочее время.
            </p>
            <button onClick={onClose} className="btn btn-secondary">
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
