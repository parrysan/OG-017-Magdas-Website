import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Hero } from '@/components/ds/Hero';
import { Section, SectionTitle } from '@/components/ds/Section';
import { CategoryTile } from '@/components/ds/CategoryTile';
import { WhyPolandSection } from '@/components/ds/WhyPolandSection';
import { CTAPanel } from '@/components/ds/CTAPanel';
import { Button } from '@/components/ds/Button';
import { Footer } from '@/components/ds/Footer';
import { CitiesCarousel } from '@/components/ds/CitiesCarousel';
import { FeaturedCarousel } from '@/components/ds/FeaturedCarousel';

const cities = ['warsaw', 'krakow', 'wroclaw', 'tricity', 'poznan'] as const;
const categories = ['commercial', 'investment', 'land', 'residential'] as const;
const listingKeys = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const localePath = locale === 'pl' ? '' : `/${locale}`;

  return (
    <main>
      <Nav
        brand="Rozanowska.com"
        brandHref={`/${locale === 'pl' ? '' : locale}`}
        links={[
          { label: t('nav.opportunities'), href: `${localePath}/oferty` },
          { label: t('nav.explorePoland'), href: '#explore' },
          { label: t('nav.about'), href: `${localePath}/o-nas` },
          { label: t('nav.contact'), href: `${localePath}/kontakt` },
        ]}
        cta={t('nav.cta')}
        ctaHref={`${localePath}/kontakt`}
      />

      <Hero
        headline={t('hero.headline')}
        subtitle={t('hero.subtitle')}
        cta={t('hero.cta')}
        ctaHref={`${localePath}/oferty`}
        image="/images/hero/warsaw-skyline.jpg"
        imageAlt="Warsaw skyline"
        variant="cinematic"
      />

      <CitiesCarousel
        id="explore"
        title={t('cities.title')}
        subtitle={t('cities.subtitle')}
        actionLabel={t('cities.action')}
        cities={cities.map((city) => ({
          id: city,
          name: t(`cities.${city}`),
          region: t(`cities.region_${city}`),
          image: `/images/cities/${city}.jpg`,
        }))}
      />

      <Section bg="default" padding="lg">
        <SectionTitle subtitle={t('categories.subtitle')}>
          {t('categories.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-6)]">
          {categories.map((cat) => (
            <CategoryTile key={cat} name={t(`categories.${cat}`)} image={`/images/categories/${cat}.jpg`} />
          ))}
        </div>
      </Section>

      <FeaturedCarousel
        title={t('featured.title')}
        listings={listingKeys.map((key) => ({
          id: key,
          image: `/images/listings/${key}.jpg`,
          title: t(`featured.listings.${key}.title`),
          location: t(`featured.listings.${key}.location`),
          category: t(`featured.listings.${key}.category`),
          price: t(`featured.listings.${key}.price`),
          roi: t(`featured.listings.${key}.roi`),
          occupancy: t(`featured.listings.${key}.occupancy`),
        }))}
      />

      <WhyPolandSection
        title={t('whyPoland.title')}
        subtitle={t('whyPoland.subtitle')}
        stats={(['gdp', 'population', 'fdi', 'yields'] as const).map((stat) => ({
          value: t(`whyPoland.stats.${stat}.value`),
          label: t(`whyPoland.stats.${stat}.label`),
          detail: t(`whyPoland.stats.${stat}.detail`),
        }))}
      />

      <Section bg="secondary" padding="lg">
        <div className="max-w-2xl">
          <SectionTitle subtitle={t('forAgents.subtitle')}>
            {t('forAgents.title')}
          </SectionTitle>
          <Button href={`${localePath}/kontakt`} size="lg">
            {t('forAgents.cta')}
          </Button>
        </div>
      </Section>

      <CTAPanel
        headline={t('offMarket.title')}
        subtitle={t('offMarket.subtitle')}
        cta={t('offMarket.cta')}
        ctaHref={`${localePath}/kontakt`}
      />

      <Section bg="default" padding="lg">
        <div>
          <SectionTitle subtitle={t('contactStrip.subtitle')}>
            {t('contactStrip.title')}
          </SectionTitle>
          <div className="flex flex-wrap gap-[var(--spacing-4)]">
            <Button href={`${localePath}/kontakt`} size="lg">
              {t('contactStrip.ctaInvestor')}
            </Button>
            <Button href={`${localePath}/kontakt`} variant="outline" size="lg">
              {t('contactStrip.ctaOwner')}
            </Button>
          </div>
        </div>
      </Section>

      <Footer
        brand="Rozanowska.com"
        variant="columns"
        columns={[
          {
            title: t('footer.columns.cities'),
            links: cities.map((c) => ({ label: t(`cities.${c}`), href: '#' })),
          },
          {
            title: t('footer.columns.categories'),
            links: categories.map((c) => ({ label: t(`categories.${c}`), href: '#' })),
          },
          {
            title: t('footer.columns.company'),
            links: [
              { label: t('nav.about'), href: `${localePath}/o-nas` },
              { label: t('nav.contact'), href: `${localePath}/kontakt` },
            ],
          },
          {
            title: t('footer.columns.legal'),
            links: [
              { label: t('footer.privacy'), href: '#' },
              { label: t('footer.terms'), href: '#' },
              { label: t('footer.cookies'), href: '#' },
            ],
          },
        ]}
      />
    </main>
  );
}
