import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'SemanticaAI — Индивидуальные операционные системы для бизнеса',
    template: '%s | SemanticaAI',
  },
  description: "Создаём индивидуальные ERP/CRM-системы под ваши процессы. Заявки, производство, логистика, автоматизации, AI-модули. MVP за 10-20 дней. Без коробочных решений.",
  keywords: "ERP система, CRM разработка, автоматизация бизнеса, операционная система для бизнеса, управление производством, логистика, AI автоматизация, no-code разработка, индивидуальная CRM",
  authors: [{ name: "Николай Перепичко" }],
  creator: "SemanticaAI",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "SemanticaAI",
    title: "SemanticaAI — Индивидуальные операционные системы для бизнеса",
    description: "Создаём ERP/CRM-системы, которые на 100% повторяют процессы вашей компании. MVP за 10-20 дней.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SemanticaAI — Операционные системы для бизнеса",
    description: "Индивидуальные ERP/CRM-системы под ваши процессы. Без коробок и лишних функций.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
