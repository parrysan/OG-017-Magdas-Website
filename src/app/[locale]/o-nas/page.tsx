import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Section, SectionTitle } from '@/components/ds/Section';
import { Button } from '@/components/ds/Button';
import { Footer } from '@/components/ds/Footer';
import Image from 'next/image';

const PLACEHOLDER = '/images/placeholder.svg';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const localePath = locale === 'pl' ? '' : `/${locale}`;
  const values = ['curation', 'discretion', 'market'] as const;

  return (
    <main>
      <Nav
        brand="Rozanowska"
        brandHref={`/${locale === 'pl' ? '' : locale}`}
        links={[
          { label: t('nav.opportunities'), href: `${localePath}/oferty` },
          { label: t('nav.about'), href: `${localePath}/o-nas` },
          { label: t('nav.contact'), href: `${localePath}/kontakt` },
        ]}
        cta={t('nav.cta')}
        ctaHref={`${localePath}/kontakt`}
      />

      <div className="h-16" />

      <Section bg="default" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-12)] items-start">
          <div className="relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden">
            <Image
              src={PLACEHOLDER}
              alt="Magda Rozanowska"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h1 className="font-[var(--font-primary)] text-[var(--text-4xl)] font-[var(--weight-bold)] text-[var(--color-text)] mb-[var(--spacing-4)]" style={{ lineHeight: '1.07' }}>
              {t('about.title')}
            </h1>
            <p className="text-[var(--text-lg)] text-[var(--color-cta)] font-[var(--weight-medium)] mb-[var(--spacing-8)]">
              {t('about.intro')}
            </p>
            <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-4)]">
              {t('about.bio1')}
            </p>
            <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
              {t('about.bio2')}
            </p>
          </div>
        </div>
      </Section>

      <Section bg="secondary" padding="lg">
        <SectionTitle align="center">
          {t('about.howTitle')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-8)]">
          {values.map((v) => (
            <div key={v} className="text-center">
              <h3 className="text-[var(--text-xl)] font-[var(--weight-semibold)] text-[var(--color-text)] mb-[var(--spacing-3)]">
                {t(`about.values.${v}.title`)}
              </h3>
              <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
                {t(`about.values.${v}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="dark" padding="lg">
        <div className="text-center">
          <h2 className="text-[var(--text-3xl)] font-[var(--weight-bold)] text-white mb-[var(--spacing-6)]" style={{ lineHeight: '1.14' }}>
            {t('contactStrip.title')}
          </h2>
          <Button href={`${localePath}/kontakt`} pill size="lg">
            {t('about.cta')}
          </Button>
        </div>
      </Section>

      <Footer brand="Rozanowska" variant="simple" />
    </main>
  );
}
