import { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'website',
    icon: '💻',
    titleKey: 'services.website.title',
    descriptionKey: 'services.website.description',
    includes: [
      'services.website.includes.design',
      'services.website.includes.platform',
      'services.website.includes.integrations',
      'services.website.includes.content',
      'services.website.includes.hosting',
      'services.website.includes.support'
    ],
    price: 25000,
    priceRub: 45000,
    forWhom: [
      'services.audience.experts',
      'services.audience.online_schools',
      'services.audience.small_business',
      'services.audience.personal_brand'
    ],
    modalTitleKey: 'services.website.modal_title',
    modalDescriptionKey: 'services.website.modal_description'
  },
  {
    id: 'content',
    icon: '🤖',
    titleKey: 'services.content.title',
    descriptionKey: 'services.content.description',
    includes: [
      'services.content.includes.topics',
      'services.content.includes.generation',
      'services.content.includes.seo',
      'services.content.includes.visuals',
      'services.content.includes.autoposting'
    ],
    price: 15000,
    priceRub: 25000,
    forWhom: [
      'services.audience.experts',
      'services.audience.marketers',
      'services.audience.online_schools',
      'services.audience.infobusiness',
      'services.audience.personal_brand'
    ],
    modalTitleKey: 'services.content.modal_title',
    modalDescriptionKey: 'services.content.modal_description'
  },
  {
    id: 'assistant',
    icon: '🤝',
    titleKey: 'services.assistant.title',
    descriptionKey: 'services.assistant.description',
    includes: [
      'services.assistant.includes.setup',
      'services.assistant.includes.integration',
      'services.assistant.includes.scenarios',
      'services.assistant.includes.leads',
      'services.assistant.includes.training'
    ],
    price: 20000,
    priceRub: 35000,
    forWhom: [
      'services.audience.infobusiness',
      'services.audience.consultants',
      'services.audience.service_companies',
      'services.audience.small_business',
      'services.audience.online_schools'
    ],
    modalTitleKey: 'services.assistant.modal_title',
    modalDescriptionKey: 'services.assistant.modal_description'
  },
  {
    id: 'branding',
    icon: '🎨',
    titleKey: 'services.branding.title',
    descriptionKey: 'services.branding.description',
    includes: [
      'services.branding.includes.covers',
      'services.branding.includes.templates',
      'services.branding.includes.guide',
      'services.branding.includes.avatar',
      'services.branding.includes.generation'
    ],
    price: 10000,
    priceRub: 15000,
    forWhom: [
      'services.audience.personal_brand',
      'services.audience.startups',
      'services.audience.small_business',
      'services.audience.experts'
    ],
    modalTitleKey: 'services.branding.modal_title',
    modalDescriptionKey: 'services.branding.modal_description'
  },
  {
    id: 'analytics',
    icon: '📈',
    titleKey: 'services.analytics.title',
    descriptionKey: 'services.analytics.description',
    includes: [
      'services.analytics.includes.dashboards',
      'services.analytics.includes.data',
      'services.analytics.includes.forecasting',
      'services.analytics.includes.integration',
      'services.analytics.includes.automation'
    ],
    price: 18000,
    priceRub: 30000,
    forWhom: [
      'services.audience.marketers',
      'services.audience.analysts',
      'services.audience.managers',
      'services.audience.enterprise',
      'services.audience.small_business'
    ],
    modalTitleKey: 'services.analytics.modal_title',
    modalDescriptionKey: 'services.analytics.modal_description'
  },
  {
    id: 'custom',
    icon: '🚀',
    titleKey: 'services.custom.title',
    descriptionKey: 'services.custom.description',
    includes: [
      'services.custom.includes.analysis',
      'services.custom.includes.tools',
      'services.custom.includes.implementation',
      'services.custom.includes.training',
      'services.custom.includes.support'
    ],
    price: 30000,
    priceRub: 50000,
    forWhom: [
      'services.audience.complex_business',
      'services.audience.startups',
      'services.audience.enterprise',
      'services.audience.small_business'
    ],
    modalTitleKey: 'services.custom.modal_title',
    modalDescriptionKey: 'services.custom.modal_description'
  }
];
