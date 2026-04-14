'use client';
/**
 * OS-000 Footer Component
 * Variants: simple (one-line), columns (multi-column links)
 */
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  brand: string;
  year?: number;
  columns?: FooterColumn[];
  variant?: 'simple' | 'columns';
  className?: string;
}

export function Footer({
  brand,
  year = new Date().getFullYear(),
  columns = [],
  variant = 'simple',
  className = '',
}: FooterProps) {
  if (variant === 'simple') {
    return (
      <footer className={`w-full bg-[#1a1f1e] py-[var(--spacing-8)] ${className}`}>
        <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)] flex flex-col sm:flex-row items-center justify-between gap-[var(--spacing-4)]">
          <p className="text-[var(--text-sm)]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            &copy; {year} {brand}. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`w-full bg-[#1a1f1e] py-[var(--spacing-16)] ${className}`}>
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-8)] mb-[var(--spacing-12)]">
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-[var(--font-primary)] text-[var(--text-sm)] font-[var(--weight-bold)] mb-[var(--spacing-4)] uppercase tracking-[var(--tracking-caps)]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {title}
              </h4>
              <ul className="list-none p-0 m-0 space-y-[var(--spacing-2)]">
                {links.map(({ label, href }, i) => (
                  <li key={`${label}-${i}`}>
                    <a href={href} className="text-[var(--text-sm)] no-underline transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }} onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-[var(--spacing-6)]" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-[var(--text-sm)]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            &copy; {year} {brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
