import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import I18nProvider from '../components/I18nProvider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Semantica AI | Умное агентство нового формата",
  description: "Создаём сайты, визуальный стиль, автоматизируем контент и процессы, внедряем ИИ-ассистентов — всё за 7–14 дней и без единой строчки кода.",
  keywords: "сайт под ключ, ИИ для бизнеса, автоконтент для Instagram, ИИ-бот для бизнеса, no-code website, AI content automation"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#0A0A0A] text-white`}>
        <I18nProvider>
            {children}
          </I18nProvider>
      </body>
    </html>
  );
}
