'use client';

import { Inter } from "next/font/google";
import { useTranslation } from 'react-i18next';
import I18nProvider from '../components/I18nProvider';
import { ReactNode, useEffect } from 'react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

function LanguageHandler({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  // Update the HTML lang attribute when language changes
  useEffect(() => {
    const updateHtmlLang = (lng: string) => {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
      }
    };

    // Set initial language
    updateHtmlLang(i18n.language);
    
    // Listen for language changes
    i18n.on('languageChanged', updateHtmlLang);
    
    return () => {
      i18n.off('languageChanged', updateHtmlLang);
    };
  }, [i18n]);

  return <>{children}</>;
}

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-[#0A0A0A] text-white`}>
        <I18nProvider>
          <LanguageHandler>
            {children}
          </LanguageHandler>
        </I18nProvider>
      </body>
    </html>
  );
}
