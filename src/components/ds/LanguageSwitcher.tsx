'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  pl: 'PL',
  en: 'EN',
};

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/').filter(Boolean);
    if (routing.locales.includes(segments[0] as any)) {
      segments[0] = newLocale === routing.defaultLocale ? '' : newLocale;
    } else {
      segments.unshift(newLocale === routing.defaultLocale ? '' : newLocale);
    }
    const newPath = '/' + segments.filter(Boolean).join('/') || '/';
    router.push(newPath);
    setOpen(false);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[var(--text-sm)] font-medium opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Change language"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {localeLabels[locale]}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-md)] border border-[var(--color-gray-200)] py-1 min-w-[80px] z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`block w-full text-left px-4 py-2 text-[var(--text-sm)] cursor-pointer transition-colors ${
                loc === locale
                  ? 'text-[var(--color-cta)] font-medium bg-[var(--color-gray-50)]'
                  : 'text-[var(--color-gray-900)] hover:bg-[var(--color-gray-50)]'
              }`}
            >
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
