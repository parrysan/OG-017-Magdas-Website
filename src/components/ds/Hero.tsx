/**
 * OS-000 Hero Component
 * Variants: centered, left, split, cinematic
 * Cinematic: full-viewport background image with dark overlay.
 */
import Image from 'next/image';
import { Button } from './Button';

interface HeroProps {
  headline: string;
  subtitle?: string;
  cta?: string;
  ctaHref?: string;
  ctaVariant?: 'primary' | 'outline' | 'ghost' | 'gold';
  secondaryCta?: string;
  secondaryCtaHref?: string;
  image?: string;
  imageAlt?: string;
  variant?: 'centered' | 'left' | 'split' | 'cinematic';
  className?: string;
}

export function Hero({
  headline,
  subtitle,
  cta,
  ctaHref,
  ctaVariant = 'primary',
  secondaryCta,
  secondaryCtaHref,
  image,
  imageAlt = '',
  variant = 'centered',
  className = '',
}: HeroProps) {
  if (variant === 'cinematic') {
    return (
      <section className={`relative w-full min-h-screen flex items-center justify-center ${className}`}>
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-[var(--container-max)] mx-auto px-[var(--spacing-6)] text-center pt-16">
          <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-[var(--weight-bold)] text-white mb-[var(--spacing-6)] max-w-4xl mx-auto" style={{ lineHeight: '1.07', letterSpacing: '-0.028em' }}>
            {headline}
          </h1>
          {subtitle && (
            <p className="text-[var(--text-lg)] lg:text-[var(--text-xl)] text-white/75 mb-[var(--spacing-8)] max-w-2xl mx-auto leading-[var(--leading-relaxed)]">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-[var(--spacing-4)]">
            {cta && <Button href={ctaHref} variant={ctaVariant} size="lg" pill>{cta}</Button>}
            {secondaryCta && (
              <Button href={secondaryCtaHref} variant="outline" size="lg" pill className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                {secondaryCta}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={`w-full py-[var(--spacing-20)] px-[var(--spacing-6)] ${className}`}>
        <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-12)] items-center">
          <div>
            <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-[var(--weight-bold)] leading-[var(--leading-tight)] text-[var(--color-text)] mb-[var(--spacing-6)]">
              {headline}
            </h1>
            {subtitle && (
              <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-8)] max-w-lg">
                {subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-[var(--spacing-4)]">
              {cta && <Button href={ctaHref} variant={ctaVariant} size="lg" pill>{cta}</Button>}
              {secondaryCta && <Button href={secondaryCtaHref} variant="outline" size="lg" pill>{secondaryCta}</Button>}
            </div>
          </div>
          {image && (
            <div className="relative aspect-[4/3]">
              <Image src={image} alt={imageAlt} fill className="object-cover rounded-[var(--radius-xl)]" sizes="50vw" />
            </div>
          )}
        </div>
      </section>
    );
  }

  const alignment = variant === 'centered' ? 'text-center items-center' : 'text-left items-start';

  return (
    <section className={`w-full py-[var(--spacing-20)] px-[var(--spacing-6)] ${className}`}>
      <div className={`max-w-[var(--container-max)] mx-auto flex flex-col ${alignment}`}>
        <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-[var(--weight-bold)] leading-[var(--leading-tight)] text-[var(--color-text)] mb-[var(--spacing-6)] max-w-3xl">
          {headline}
        </h1>
        {subtitle && (
          <p className="text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-8)] max-w-2xl">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-[var(--spacing-4)]">
          {cta && <Button href={ctaHref} variant={ctaVariant} size="lg" pill>{cta}</Button>}
          {secondaryCta && <Button href={secondaryCtaHref} variant="outline" size="lg" pill>{secondaryCta}</Button>}
        </div>
      </div>
    </section>
  );
}
