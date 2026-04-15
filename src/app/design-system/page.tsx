import Image from 'next/image';

export const metadata = {
  title: 'Design System — Rozanowska.com',
  robots: 'noindex',
};

const personas = [
  {
    name: 'Klaus Richter',
    role: 'Family Office Director',
    location: 'Munich, Germany',
    image: '/images/personas/foreign-allocator.png',
    label: 'The Foreign Allocator',
    goal: 'Diversify into CEE real estate with a trusted local advisor who speaks his financial language.',
    needs: [
      'English-first experience with Euro pricing',
      'Macro investment thesis — why Poland, why now',
      'Pre-vetted, curated opportunities with ROI data',
    ],
    primary: true,
  },
  {
    name: 'Tomasz Kowalski',
    role: 'Private Investor & Developer',
    location: 'Warsaw, Poland',
    image: '/images/personas/warsaw-insider.png',
    label: 'The Warsaw Insider',
    goal: 'Access off-market deals and advisory on larger transactions before they hit the open market.',
    needs: [
      'Off-market positioning and mandate-based matching',
      'Discretion — competitors can\'t know what he\'s buying',
      'Proof of Magda\'s network and market access',
    ],
    primary: false,
  },
  {
    name: 'Barbara Nowak',
    role: 'Commercial Asset Owner',
    location: 'Warsaw, Poland',
    image: '/images/personas/property-owner.png',
    label: 'The Property Owner',
    goal: 'Find the right buyer through a discreet, selective process — not a public portal listing.',
    needs: [
      'Advisory on positioning, pricing, and buyer targeting',
      'Application-based submission, not self-serve listing',
      'Confidence that Magda curates, not lists everything',
    ],
    primary: false,
  },
];

const questions = [
  {
    number: '01',
    question: 'Do these three people feel real?',
    detail: 'Are you already talking to people like the Foreign Allocator, the Warsaw Insider, and the Property Owner — or is one of these aspirational?',
  },
  {
    number: '02',
    question: 'Which persona matters most right now?',
    detail: 'If you could only attract one of these three in the next 6 months, which one would move your business forward the fastest?',
  },
  {
    number: '03',
    question: 'Off-market — is this real?',
    detail: 'Do you currently have access to off-market opportunities, or is this something you\'re building toward? This is the biggest differentiator on the site, so we need to know how hard to lean into it.',
  },
  {
    number: '04',
    question: 'Language priority',
    detail: 'Do you expect more initial traction from Polish clients or international ones? This determines which language version gets the most attention first.',
  },
  {
    number: '05',
    question: 'What\'s missing?',
    detail: 'Is there a type of client or deal you\'re already getting that doesn\'t fit these three personas?',
  },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f4f5f2' }}>
      {/* Header */}
      <header className="py-8 px-6" style={{ backgroundColor: '#1a1f1e' }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
              Design System
            </p>
            <h1 className="text-2xl font-bold mt-1" style={{ color: '#ffffff', fontFamily: 'var(--font-primary)' }}>
              Rozanowska.com
            </h1>
          </div>
          <a
            href="/pl"
            className="text-sm no-underline transition-opacity hover:opacity-100"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            ← Back to site
          </a>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Personas Section */}
        <section className="py-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#4e6359', fontFamily: 'var(--font-body)' }}>
            Target Audience
          </p>
          <h2 className="text-[1.75rem] font-bold mb-4" style={{ color: '#2d3435', fontFamily: 'var(--font-primary)' }}>
            Who are we designing for?
          </h2>
          <p className="text-base mb-10 max-w-2xl" style={{ color: '#5a6061', fontFamily: 'var(--font-body)', lineHeight: '1.65' }}>
            Three core personas define the website&apos;s audience. Each has distinct motivations, pain points, and paths through the site. Review the infographic below and consider the questions that follow.
          </p>

          {/* Infographic */}
          <div className="rounded-sm overflow-hidden shadow-lg">
            <Image
              src="/images/personas-infographic.png"
              alt="Rozanowska.com Target Personas — The Foreign Allocator, The Warsaw Insider, The Property Owner"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Avatars & Personas Section */}
        <section className="pb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#4e6359', fontFamily: 'var(--font-body)' }}>
            Design System
          </p>
          <h2 className="text-[1.75rem] font-bold mb-4" style={{ color: '#2d3435', fontFamily: 'var(--font-primary)' }}>
            Avatars &amp; Personas
          </h2>
          <p className="text-base mb-10 max-w-2xl" style={{ color: '#5a6061', fontFamily: 'var(--font-body)', lineHeight: '1.65' }}>
            These personas guide our UX priorities, content strategy, and design decisions — ensuring the site speaks credibly to serious investors and property owners in the Polish real estate market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((p) => (
              <div
                key={p.name}
                className="bg-white overflow-hidden"
                style={{ borderTop: p.primary ? '4px solid #4e6359' : '4px solid #dce0d8' }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#4e6359' }}>
                    {p.label}
                  </p>
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#2d3435', fontFamily: 'var(--font-primary)' }}>
                    {p.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#8a9192' }}>
                    {p.role}<br />{p.location}
                  </p>
                  <p className="text-sm mb-4" style={{ color: '#5a6061', lineHeight: '1.6' }}>
                    <strong>Goal:</strong> {p.goal}
                  </p>
                  <ul className="space-y-2">
                    {p.needs.map((need, i) => (
                      <li key={i} className="text-sm flex gap-2" style={{ color: '#8a9192' }}>
                        <span>•</span>
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Questions Section */}
        <section className="pb-20">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#4e6359', fontFamily: 'var(--font-body)' }}>
            For Discussion
          </p>
          <h2 className="text-[1.75rem] font-bold mb-10" style={{ color: '#2d3435', fontFamily: 'var(--font-primary)' }}>
            Questions for Magda
          </h2>

          <div className="space-y-0">
            {questions.map((q) => (
              <div
                key={q.number}
                className="py-8 flex gap-6 items-start"
                style={{ borderBottom: '1px solid #dce0d8' }}
              >
                <span
                  className="text-sm font-bold flex-shrink-0 w-8"
                  style={{ color: '#4e6359', fontFamily: 'var(--font-body)' }}
                >
                  {q.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#2d3435', fontFamily: 'var(--font-primary)' }}>
                    {q.question}
                  </h3>
                  <p className="text-base" style={{ color: '#5a6061', fontFamily: 'var(--font-body)', lineHeight: '1.65' }}>
                    {q.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ backgroundColor: '#1a1f1e' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Rozanowska.com Design System — Internal document. Not for public distribution.
          </p>
        </div>
      </footer>
    </main>
  );
}
