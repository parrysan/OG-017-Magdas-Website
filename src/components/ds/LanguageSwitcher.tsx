'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  pl: 'PL',
  en: 'EN',
};

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/').filter(Boolean);
    if (routing.locales.includes(segments[0] as any)) {
      segments[0] = newLocale === routing.defaultLocale ? '' : newLocale;
    } else {
      segments.unshift(newLocale === routing.defaultLocale ? '' : newLocale);
    }
    const newPath = '/' + segments.filter(Boolean).join('/') || '/';
    router.push(newPath);
  }

  return (
    <div className={`flex items-center gap-1 text-[var(--text-sm)] font-[var(--weight-medium)] ${className}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40 select-none">/</span>}
          <button
            onClick={() => switchLocale(loc)}
            className={`cursor-pointer transition-opacity ${
              loc === locale ? 'opacity-100 font-[var(--weight-semibold)]' : 'opacity-50 hover:opacity-80'
            }`}
          >
            {localeLabels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
