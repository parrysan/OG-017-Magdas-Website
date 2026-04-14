import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Hero } from '@/components/ds/Hero';
import { Section, SectionTitle } from '@/components/ds/Section';
import { CityCard } from '@/components/ds/CityCard';
import { CategoryTile } from '@/components/ds/CategoryTile';
import { ListingCard } from '@/components/ds/ListingCard';
import { StatBlock } from '@/components/ds/StatBlock';
import { CTAPanel } from '@/components/ds/CTAPanel';
import { Button } from '@/components/ds/Button';
import { Footer } from '@/components/ds/Footer';

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

      <Section id="explore" bg="secondary" padding="lg">
        <SectionTitle subtitle={t('cities.subtitle')}>
          {t('cities.title')}
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[var(--spacing-4)]">
          {cities.map((city) => (
            <CityCard key={city} name={t(`cities.${city}`)} image={`/images/cities/${city}.jpg`} />
          ))}
        </div>
      </Section>

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

      <Section bg="secondary" padding="lg">
        <SectionTitle subtitle={t('featured.subtitle')}>
          {t('featured.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-6)]">
          {listingKeys.map((key) => (
            <ListingCard
              key={key}
              listing={{
                image: `/images/listings/${key}.jpg`,
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

      <Section bg="dark" padding="lg">
        <SectionTitle subtitle={t('whyPoland.subtitle')}>
          {t('whyPoland.title')}
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-8)]">
          {(['gdp', 'population', 'fdi', 'yields'] as const).map((stat) => (
            <StatBlock
              key={stat}
              value={t(`whyPoland.stats.${stat}.value`)}
              label={t(`whyPoland.stats.${stat}.label`)}
              detail={t(`whyPoland.stats.${stat}.detail`)}
            />
          ))}
        </div>
      </Section>

      <Section bg="secondary" padding="lg">
        <div className="max-w-2xl">
          <SectionTitle subtitle={t('forAgents.subtitle')}>
            {t('forAgents.title')}
          </SectionTitle>
          <Button href={`${localePath}/kontakt`} pill size="lg">
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
            <Button href={`${localePath}/kontakt`} pill size="lg">
              {t('contactStrip.ctaInvestor')}
            </Button>
            <Button href={`${localePath}/kontakt`} variant="outline" pill size="lg">
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
