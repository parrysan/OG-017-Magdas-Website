/**
 * OS-000 Button Component
 * Variants: primary, outline, ghost, gold
 * Sizes: sm, md, lg
 * Shape: default (rounded corners) or pill (Apple-style capsule)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  href,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  href?: string;
  className?: string;
  [key: string]: any;
}) {
  const radius = pill ? 'rounded-full' : 'rounded-[var(--radius-md)]';
  const base = `inline-flex items-center justify-center gap-2 font-medium ${radius} border-none cursor-pointer transition-all duration-[var(--transition-base)] no-underline`;

  const variants = {
    primary: 'bg-[var(--color-cta)] text-white hover:bg-[var(--color-cta-hover)] hover:-translate-y-0.5',
    outline: 'bg-transparent text-[var(--color-cta)] border border-[var(--color-cta)] hover:bg-[var(--color-cta)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)]',
    gold: 'bg-[var(--color-highlight)] text-white hover:brightness-110 hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-[var(--text-sm)]',
    md: 'px-6 py-2.5 text-[var(--text-sm)]',
    lg: 'px-8 py-3.5 text-[var(--text-base)]',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return <button className={classes} {...props}>{children}</button>;
}
