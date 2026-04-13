/**
 * OS-000 Section Component
 * Wrapper for content sections with consistent spacing and max-width.
 */
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  bg?: 'default' | 'secondary' | 'muted' | 'accent';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  className?: string;
  [key: string]: any;
}

export function Section({
  children,
  id,
  bg = 'default',
  padding = 'default',
  className = '',
  ...props
}: SectionProps) {
  const backgrounds: Record<string, string> = {
    default: 'bg-[var(--color-bg)]',
    secondary: 'bg-[var(--color-bg-secondary)]',
    muted: 'bg-[var(--color-bg-muted)]',
    accent: 'bg-[var(--color-accent)] text-[var(--color-text-inverse)]',
  };

  const paddings: Record<string, string> = {
    none: '',
    sm: 'py-[var(--spacing-8)]',
    default: 'py-[var(--spacing-16)]',
    lg: 'py-[var(--spacing-24)]',
  };

  return (
    <section
      id={id}
      className={`w-full px-[var(--spacing-6)] ${backgrounds[bg]} ${paddings[padding]} ${className}`}
      {...props}
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        {children}
      </div>
    </section>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({ children, subtitle, align = 'left', className = '' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-[var(--spacing-10)] ${alignment} ${className}`}>
      <h2 className="font-[var(--font-primary)] text-[var(--text-3xl)] font-[var(--weight-bold)] leading-[var(--leading-snug)] text-[var(--color-text)]">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-[var(--spacing-4)] text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
