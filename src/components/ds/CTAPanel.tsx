import { Button } from './Button';

interface CTAPanelProps {
  headline: string;
  subtitle?: string;
  cta: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function CTAPanel({
  headline,
  subtitle,
  cta,
  ctaHref = '#',
  secondaryCta,
  secondaryCtaHref,
  className = '',
}: CTAPanelProps) {
  return (
    <div className={`section-dark py-[var(--spacing-24)] px-[var(--spacing-6)] ${className}`}>
      <div className="max-w-[var(--container-max)] mx-auto">
        <h2 className="text-[var(--text-3xl)] lg:text-[var(--text-4xl)] font-[var(--weight-bold)] text-white mb-[var(--spacing-4)] leading-[1.14]">
          {headline}
        </h2>
        {subtitle && (
          <p className="text-[var(--text-lg)] text-white/70 max-w-2xl mb-[var(--spacing-8)] leading-[var(--leading-relaxed)]">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-[var(--spacing-4)]">
          <Button href={ctaHref} pill size="lg">{cta}</Button>
          {secondaryCta && (
            <Button href={secondaryCtaHref} variant="outline" pill size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              {secondaryCta}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
