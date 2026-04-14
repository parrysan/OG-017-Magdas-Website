import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/ds/Nav';
import { Section, SectionTitle } from '@/components/ds/Section';
import { ContactForm } from '@/components/ds/ContactForm';
import { Footer } from '@/components/ds/Footer';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <SectionTitle align="center" subtitle={t('contact.subtitle')}>
          {t('contact.title')}
        </SectionTitle>
        <ContactForm
          tabs={[
            { key: 'investor', label: t('contact.tabs.investor') },
            { key: 'owner', label: t('contact.tabs.owner') },
            { key: 'general', label: t('contact.tabs.general') },
          ]}
          fields={{
            name: t('contact.fields.name'),
            email: t('contact.fields.email'),
            phone: t('contact.fields.phone'),
            message: t('contact.fields.message'),
            submit: t('contact.fields.submit'),
          }}
          placeholders={{
            investor: t('contact.investorPlaceholder'),
            owner: t('contact.ownerPlaceholder'),
            general: t('contact.generalPlaceholder'),
          }}
        />
      </Section>

      <Footer brand="Rozanowska" variant="simple" />
    </main>
  );
}
