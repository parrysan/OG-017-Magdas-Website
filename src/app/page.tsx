import { Nav } from '@/components/ds/Nav';
import { Hero } from '@/components/ds/Hero';
import { Section, SectionTitle } from '@/components/ds/Section';
import { Card, CardTitle, CardBody } from '@/components/ds/Card';
import { Button } from '@/components/ds/Button';
import { Footer } from '@/components/ds/Footer';

export default function Home() {
  return (
    <main>
      <Nav
        brand="Magda"
        links={[
          { label: 'Opportunities', href: '#opportunities' },
          { label: 'Markets', href: '#markets' },
          { label: 'About', href: '#about' },
        ]}
        cta="Get in Touch"
        ctaHref="#contact"
      />

      <Hero
        headline="Curated Investment Opportunities in Poland"
        subtitle="Premium commercial real estate, carefully selected for serious investors. Warsaw and beyond."
        cta="Explore Opportunities"
        ctaHref="#opportunities"
        secondaryCta="Submit a Property"
        secondaryCtaHref="#contact"
        variant="centered"
      />

      <Section id="opportunities" bg="secondary" padding="lg">
        <SectionTitle
          align="center"
          subtitle="Handpicked commercial and investment properties across Poland's most dynamic markets."
        >
          Featured Opportunities
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-6)]">
          <Card variant="bordered">
            <CardTitle>Warsaw Business District</CardTitle>
            <CardBody>
              Class A office space in Mokotów. 2,400 m² across three floors with established tenant base yielding 7.2% net.
            </CardBody>
            <div className="mt-[var(--spacing-4)]">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </Card>
          <Card variant="bordered">
            <CardTitle>Kraków Logistics Hub</CardTitle>
            <CardBody>
              12,000 m² warehouse facility near A4 motorway. Triple-net lease with multinational tenant. 8.1% cap rate.
            </CardBody>
            <div className="mt-[var(--spacing-4)]">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </Card>
          <Card variant="bordered">
            <CardTitle>Wrocław Mixed-Use</CardTitle>
            <CardBody>
              Ground-floor retail with 24 residential units above. Central location, fully let. Strong cash flow from day one.
            </CardBody>
            <div className="mt-[var(--spacing-4)]">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="markets" padding="lg">
        <SectionTitle
          subtitle="Poland offers some of Europe's strongest fundamentals for commercial real estate investment."
        >
          Why Poland
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-8)]">
          {[
            { stat: '5.3%', label: 'GDP Growth', detail: 'Fastest-growing major EU economy' },
            { stat: '38M', label: 'Population', detail: 'Largest market in Central Europe' },
            { stat: '€4.2B', label: 'FDI Inflow', detail: 'Annual foreign direct investment' },
            { stat: '7-9%', label: 'Yields', detail: 'Commercial property cap rates' },
          ].map(({ stat, label, detail }) => (
            <div key={label} className="text-center">
              <p className="text-[var(--text-4xl)] font-[var(--weight-bold)] text-[var(--color-cta)] mb-[var(--spacing-2)]">{stat}</p>
              <p className="text-[var(--text-lg)] font-[var(--weight-medium)] text-[var(--color-text)] mb-[var(--spacing-1)]">{label}</p>
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" bg="secondary" padding="lg">
        <div className="max-w-2xl">
          <SectionTitle subtitle="Warsaw-based commercial real estate advisor connecting international investors with Poland's best opportunities.">
            About Magda
          </SectionTitle>
          <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--spacing-6)]">
            With deep knowledge of Poland&apos;s commercial property markets and a network spanning developers, institutional owners, and private investors, Magda provides a curated, trust-first approach to real estate investment.
          </p>
          <p className="text-[var(--text-base)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
            Every opportunity is vetted. Every introduction is intentional. No marketplace noise — just carefully selected properties and the advisory support to make informed decisions.
          </p>
        </div>
      </Section>

      <Section id="contact" padding="lg">
        <SectionTitle
          align="center"
          subtitle="Whether you're looking to invest or have a property to present, start with a conversation."
        >
          Get in Touch
        </SectionTitle>
        <div className="flex justify-center gap-[var(--spacing-4)]">
          <Button size="lg">Investor Inquiry</Button>
          <Button variant="outline" size="lg">Submit a Property</Button>
        </div>
      </Section>

      <Footer
        brand="Magda Real Estate"
        variant="simple"
      />
    </main>
  );
}
