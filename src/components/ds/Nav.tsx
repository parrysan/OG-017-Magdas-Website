/**
 * OS-000 Nav Component — Rozanowska variant
 * White header, slightly transparent on scroll.
 * Brand shrinks when scrolled. Inline PL/EN switcher.
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-white'
      } ${className}`}
    >
      <div className={`max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)] flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'h-16' : 'h-20'
      }`}>
        {/* Brand */}
        <a
          href={brandHref}
          className="font-[var(--font-primary)] font-[var(--weight-bold)] no-underline text-[var(--color-text)] transition-all duration-300 origin-left"
          style={{ fontSize: scrolled ? '1.125rem' : '1.5rem' }}
        >
          {brand}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-[var(--spacing-8)]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors no-underline"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: PL / EN + CTA */}
        <div className="hidden md:flex items-center gap-[var(--spacing-6)]">
          <LanguageSwitcher className="text-[var(--color-text)]" />
          {cta && <Button href={ctaHref} size="sm">{cta}</Button>}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--color-text)]"
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
              className="block py-[var(--spacing-3)] text-[var(--text-base)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline"
            >
              {label}
            </a>
          ))}
          <div className="pt-[var(--spacing-4)] flex items-center justify-between">
            <LanguageSwitcher className="text-[var(--color-text)]" />
            {cta && <Button href={ctaHref}>{cta}</Button>}
          </div>
        </div>
      )}
    </nav>
  );
}
