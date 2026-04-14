'use client';

import { BeamsBackground } from '@/components/ui/beams-background';

interface Stat {
  value: string;
  label: string;
  detail: string;
}

interface WhyPolandSectionProps {
  title: string;
  subtitle: string;
  stats: Stat[];
}

export function WhyPolandSection({ title, subtitle, stats }: WhyPolandSectionProps) {
  return (
    <BeamsBackground intensity="subtle">
      <div className="py-[var(--spacing-24)]">
        <div className="max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)]">
          <div className="mb-[var(--spacing-10)]">
            <h2 className="font-[var(--font-primary)] text-[1.75rem] font-[var(--weight-bold)] leading-[var(--leading-snug)]" style={{ color: '#ffffff' }}>
              {title}
            </h2>
            <p className="mt-[var(--spacing-4)] text-[var(--text-lg)] leading-[var(--leading-relaxed)] max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-8)]">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-[var(--font-primary)] text-[var(--text-4xl)] font-[var(--weight-bold)]" style={{ color: '#ffffff', lineHeight: '1.1' }}>
                  {stat.value}
                </p>
                <p className="text-[var(--text-base)] font-[var(--weight-semibold)] mt-[var(--spacing-2)]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {stat.label}
                </p>
                <p className="text-[var(--text-sm)] mt-[var(--spacing-1)]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
}
