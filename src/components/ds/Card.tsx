/**
 * OS-000 Card Component
 * Variants: default, elevated, bordered, ghost
 */
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'ghost';
  hover?: boolean;
  className?: string;
  [key: string]: any;
}

export function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}: CardProps) {
  const base = 'rounded-[var(--radius-lg)] p-[var(--spacing-6)] transition-all duration-[var(--transition-base)]';

  const variants: Record<string, string> = {
    default: 'bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]',
    elevated: 'bg-[var(--color-bg-card)] shadow-[var(--shadow-md)]',
    bordered: 'bg-[var(--color-bg-card)] border-2 border-[var(--color-border)]',
    ghost: 'bg-transparent',
  };

  const hoverClass = hover
    ? 'hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5'
    : '';

  return (
    <div className={`${base} ${variants[variant]} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Card subcomponents for structured content
 */
interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full rounded-[var(--radius-md)] mb-[var(--spacing-4)] object-cover ${className}`}
    />
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`font-[var(--font-primary)] text-[var(--text-xl)] font-[var(--weight-bold)] leading-[var(--leading-snug)] text-[var(--color-text)] mb-[var(--spacing-2)] ${className}`}>
      {children}
    </h3>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <p className={`text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] ${className}`}>
      {children}
    </p>
  );
}
