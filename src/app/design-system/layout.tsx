import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-primary)' }}>
        <NextIntlClientProvider locale="en" messages={{}}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
