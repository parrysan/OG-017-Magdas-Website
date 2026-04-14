import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Section, SectionTitle } from '@/components/ds/Section';
import { ListingCard } from '@/components/ds/ListingCard';
import { CTAPanel } from '@/components/ds/CTAPanel';
import { Footer } from '@/components/ds/Footer';

const PLACEHOLDER = '/images/placeholder.svg';
const listingKeys = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'] as const;

export default async function OpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const localePath = locale === 'pl' ? '' : `/${locale}`;

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
        <SectionTitle align="center" subtitle={t('opportunities.subtitle')}>
          {t('opportunities.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-6)]">
          {listingKeys.map((key) => (
            <ListingCard
              key={key}
              listing={{
                image: PLACEHOLDER,
                title: t(`featured.listings.${key}.title`),
                location: t(`featured.listings.${key}.location`),
                category: t(`featured.listings.${key}.category`),
                price: t(`featured.listings.${key}.price`),
                roi: t(`featured.listings.${key}.roi`),
                area: t(`featured.listings.${key}.area`),
                status: t(`featured.listings.${key}.status`),
              }}
              ctaLabel={t('featured.viewDetails')}
            />
          ))}
        </div>
      </Section>

      <CTAPanel
        headline={t('offMarket.title')}
        subtitle={t('offMarket.subtitle')}
        cta={t('offMarket.cta')}
        ctaHref={`${localePath}/kontakt`}
      />

      <Footer brand="Rozanowska" variant="simple" />
    </main>
  );
}
