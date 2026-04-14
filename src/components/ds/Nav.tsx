/**
 * OS-000 Nav Component — Rozanowska variant
 * Sticky, transparent over hero (dark bg), solid on scroll.
 * Includes LanguageSwitcher and CTA button.
 */
'use client';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavLink { label: string; href: string; }

export function Nav({
  brand,
  brandHref = '/',
  links = [] as NavLink[],
  cta,
  ctaHref,
  className = '',
}: {
  brand: string;
  brandHref?: string;
  links?: NavLink[];
  cta?: string;
  ctaHref?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled
    ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]'
    : 'bg-black/30 backdrop-blur-sm';

  const textColor = scrolled ? 'text-[var(--color-gray-900)]' : 'text-white';
  const linkColor = scrolled
    ? 'text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)]'
    : 'text-white/80 hover:text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} ${className}`}>
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)] flex items-center justify-between h-16">
        {/* Brand */}
        <a href={brandHref} className={`font-[var(--font-primary)] text-[var(--text-xl)] font-[var(--weight-bold)] no-underline transition-colors ${textColor}`}>
          {brand}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-[var(--spacing-8)]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-[var(--text-sm)] font-[var(--weight-medium)] transition-colors no-underline ${linkColor}`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: language switcher + CTA */}
        <div className="hidden md:flex items-center gap-[var(--spacing-4)]">
          <LanguageSwitcher className={textColor} />
          {cta && <Button href={ctaHref} size="sm" pill>{cta}</Button>}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 ${textColor}`}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <path d="M6 6l12 12M6 18L18 6" />
              : <path d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[var(--color-border-subtle)] px-[var(--spacing-6)] py-[var(--spacing-4)]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="block py-[var(--spacing-3)] text-[var(--text-base)] text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)] no-underline"
            >
              {label}
            </a>
          ))}
          <div className="pt-[var(--spacing-4)] flex items-center justify-between">
            <LanguageSwitcher />
            {cta && <Button href={ctaHref} pill>{cta}</Button>}
          </div>
        </div>
      )}
    </nav>
  );
}
