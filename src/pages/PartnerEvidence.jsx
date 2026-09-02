import React, { useState } from 'react';
import { motion } from 'framer-motion';

// UF51 — Evidence One-Pager
// Zero ego. Calm. One page. That's it.

const AMBER = '#d97706';
const AMBER_DARK = '#b45309';
const CREAM = '#fdf9f0';
const CREAM_DEEP = '#faf8f5';
const INK = '#1a1208';
const INK_SOFT = '#5a4a35';
const INK_MUTE = '#9a8a70';
const BORDER = 'rgba(217,119,6,0.18)';

export default function PartnerEvidence() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const lines = [
      'UF51 — EVIDENCE',
      '',
      'Four products. Two live on Stripe. Two live and free.',
      '',
      'PetSounds51 — Sound therapy for anxious pets. £29.99/yr, £9.99/mo. Live on Stripe.',
      'SORTED — Legal document decoder. Any language. Nothing stored. £9.99/mo, £9.99 lifetime. Live on Stripe.',
      'Earth51 — AI-verified litter collection. ESG impact data. Live and free.',
      'ZAPP — Kids describe an idea, AI builds a real app. No accounts, COPPA-safe. Live and free.',
      '',
      'THE MARKETS',
      'Pet Care: ~$182B (2025) → ~$284B by 2033. UK ~13M dogs, ~12M cats. Pet-retail/vet partnership = mass reach.',
      'Legal Tech: ~$29B (2025) → ~$73B by 2035. 92% of low-income Americans get no or inadequate help. CAB/bank partnership could keep SORTED free and pay for itself.',
      'ESG: EU CSRD mandatory. Green bonds ~$650B in 2025. Earth51 turns real cleanups into reportable ESG evidence.',
      'EdTech: ~$197B (2025) → ~$353B by 2030. ZAPP gives every kid a builder. School/EdTech distributor = reach at near-zero cost.',
      '',
      'RIGHT PARTNERSHIPS: PetSounds51 → pet retailers/vet chains/animal charities (~£12bn UK pet spend, 31,000 vets). SORTED → advice charities/high-street banks/housing associations (2.7M helped by advice charities/yr). Earth51 → ESG-led banks/councils/sustainability teams. ZAPP → schools/EdTech distributors/youth charities.',
      '',
      'ACHIEVABLE: ~3,400 PS51 subs or ~840 SORTED subs = £100k/yr. That is ~1 in 4,000 UK dog owners, or ~1 in 63,000 UK adults — tiny fractions of a real market, community-driven not ad spend.',
      '',
      'VERIFY YOURSELF',
      ...sources.map((s, i) => `${i + 1}. ${s.name} — ${s.url}`),
      '',
      'family@uf51.love — Glasgow, Scotland — CIC formed',
    ].join('\n');
    navigator.clipboard.writeText(lines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Browser print-to-PDF keeps every <a> as a real clickable link in the saved PDF.
  const handlePDF = () => window.print();

  const sources = [
    { name: 'Grand View Research — Pet Care Market', url: 'https://www.grandviewresearch.com/industry-analysis/pet-care-market' },
    { name: 'PFMA / UK Pet Food — Pet Population', url: 'https://www.ukpetfood.org/information-centre/statistics/pet-population.html' },
    { name: 'Precedence Research — Legal Tech Market', url: 'https://www.precedenceresearch.com/legal-technology-market' },
    { name: 'Legal Services Corporation — The Justice Gap', url: 'https://justicegap.lsc.gov/resource/2022-justice-gap-report/' },
    { name: 'European Commission — CSRD Directive', url: 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en' },
    { name: 'Climate Bonds Initiative — Green Bonds', url: 'https://www.climatebonds.net/news-events/press-room/press-releases/sustainable-debt-market-nears-usd7-trillion-aligned-issuance-demonstrating-strong-global-momentum' },
    { name: 'MarketsandMarkets — EdTech Market', url: 'https://www.marketsandmarkets.com/Market-Reports/educational-technology-ed-tech-market-1066.html' },
    { name: 'Statista — UK Pet Spend', url: 'https://www.statista.com/topics/10264/pet-food-market-in-the-uk/' },
    { name: 'RCVS — UK Vet Register', url: 'https://www.rcvs.org.uk/about-us/news-and-views/news/surveys-of-the-professions-2024-reports-published' },
    { name: 'Citizens Advice — Annual Impact', url: 'https://www.citizensadvice.org.uk/about-us/information/all-our-impact/' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM_DEEP} 40%)`, color: INK, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          footer, [class*="footer"], [class*="Footer"], #root > div > footer { display: none !important; }
        }
      `}</style>

      {/* CALM HEADER */}
      <header className="no-print" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,245,0.98)', backdropFilter: 'blur(24px)', borderBottom: `1px solid ${BORDER}`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.06em', color: INK }}>UF51</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF}
            style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: AMBER_DARK, border: 'none', borderRadius: 8, padding: '9px 18px', cursor: 'pointer' }}>
            ↓ PDF
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 700, color: copied ? AMBER_DARK : INK_SOFT, background: copied ? 'rgba(217,119,6,0.08)' : 'transparent', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '9px 18px', cursor: 'pointer' }}>
            {copied ? '✓' : 'COPY'}
          </motion.button>
        </div>
      </header>

      <div id="evidence-body" style={{ maxWidth: 560, margin: '0 auto', padding: '32px 24px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO — calm, short */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 14px', color: INK }}>
              Four products.<br />
              <span style={{ color: AMBER }}>Two live on Stripe.</span><br />
              Two live and free.
            </h1>
            <p style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
              What's built, the markets it serves, and what's honestly achievable with the right partnerships. Every figure is sourced — verify it yourself.
            </p>
          </div>

          {/* WHAT'S LIVE */}
          <Section label="WHAT IS LIVE">
            <FactRow title="PetSounds51" tag="PET WELLNESS" price="£29.99/yr">
              Sound therapy for anxious pets. Browser-native. Dogs, cats, horses. Live on Stripe.
            </FactRow>
            <FactRow title="SORTED" tag="LEGAL TECH" price="£9.99/mo">
              Legal document decoder. Any language. Nothing stored. Live on Stripe.
            </FactRow>
            <FactRow title="Earth51" tag="ENVIRONMENT" price="Live · free">
              AI-verified litter collection. ESG impact data. Token economy. Live and free.
            </FactRow>
            <FactRow title="ZAPP" tag="EDTECH" price="Live · free">
              Kids describe an idea — AI builds a real app. No accounts, COPPA-safe. Live and free.
            </FactRow>
          </Section>

          <Divider />

          {/* MARKETS — short */}
          <Section label="THE MARKETS">
            <MarketRow title="Pet Care" line1="~$182B global market (2025) → ~$284B by 2033." line2="UK: ~13.5M dogs, ~12.5M cats. Recession-resilient. A pet-retail or vet partnership = mass reach without ad spend." cite="Grand View Research · PFMA" />
            <MarketRow title="Legal Tech" line1="~$29B (2025) → ~$73B by 2035." line2="92% of low-income Americans get no or inadequate legal help. A CAB or bank partnership could keep SORTED free for those who need it — and pay for itself in a year." cite="Precedence Research · LSC" />
            <MarketRow title="ESG Reporting" line1="EU CSRD makes sustainability reporting mandatory." line2="Green bonds ~$650B in 2025 alone. Earth51 turns real cleanups into reportable ESG evidence." cite="European Commission · Climate Bonds" />
            <MarketRow title="EdTech" line1="~$197B (2025) → ~$353B by 2030." line2="ZAPP gives every kid a builder — no account, no risk. A school or EdTech distributor = reach at near-zero cost." cite="MarketsandMarkets" />
          </Section>

          <Divider />

          {/* RIGHT PARTNERSHIPS — categories, no name-dropping */}
          <Section label="RIGHT PARTNERSHIPS">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <PartnerCard product="PetSounds51" partners="Pet retailers · vet chains · animal charities" scale="~£12bn UK pet spend · 31,000 vets" />
              <PartnerCard product="SORTED" partners="Advice charities · high-street banks · housing associations" scale="2.7M helped by advice charities/yr" />
              <PartnerCard product="Earth51" partners="ESG-led banks · councils · corporate sustainability teams" />
              <PartnerCard product="ZAPP" partners="Schools · EdTech distributors · youth charities" />
            </div>
          </Section>

          <Divider />

          {/* ACHIEVABLE — short */}
          <Section label="WHAT IS ACHIEVABLE">
            <div style={{ display: 'flex', gap: 12, margin: '0 0 16px', flexWrap: 'wrap' }}>
              <Stat figure="~3,400" label="PS51 subs = £100k/yr" />
              <Stat figure="~840" label="SORTED subs = £100k/yr" />
            </div>
            <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: '0 0 10px' }}>
              That's ~1 in every 4,000 UK dog owners for PetSounds51 — and ~1 in 63,000 UK adults for SORTED. Tiny fractions of a real market, achievable with community-driven growth and the right partnerships, not ad spend.
            </p>
            <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: 0 }}>
              Every product also builds a data asset: SORTED's anonymised cases sharpen the advice over time; Earth51's verified cleanups become reportable ESG evidence.
            </p>
          </Section>

          <Divider />

          {/* SOURCES + CONTACT — combined to keep it to 2 pages */}
          <Section label="VERIFY YOURSELF">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
              {sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', gap: 6, padding: '5px 10px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 6, textDecoration: 'none', fontSize: 10, color: INK_SOFT, lineHeight: 1.3 }}>
                  <span style={{ color: AMBER, fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{s.name} <span style={{ color: AMBER_DARK }}>↗</span></span>
                </a>
              ))}
            </div>

            {/* CONTACT inline */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
              <p style={{ fontSize: 11, color: INK_MUTE, margin: 0, lineHeight: 1.6 }}>
                Glasgow, Scotland · Open to licensing partnerships
              </p>
              <a href="mailto:family@uf51.love?subject=UF51 Partnership"
                style={{ display: 'inline-block', padding: '9px 22px', background: AMBER_DARK, color: '#fff', fontWeight: 700, fontSize: 11, borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                family@uf51.love
              </a>
            </div>
          </Section>

        </motion.div>
      </div>
    </div>
  );
}

// — SIMPLE COMPONENTS —

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', color: AMBER, marginBottom: 14 }}>{label}</div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: BORDER, margin: '0 0 16px' }} />;
}

function FactRow({ title, tag, price, children }) {
  return (
    <div style={{ marginBottom: 6, padding: '10px 14px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>{title}</span>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', color: INK_MUTE }}>{tag}</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: AMBER, whiteSpace: 'nowrap' }}>{price}</span>
      </div>
      <p style={{ fontSize: 12, color: INK_SOFT, lineHeight: 1.5, margin: 0 }}>{children}</p>
    </div>
  );
}

function MarketRow({ title, line1, line2, cite }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h3 style={{ fontSize: 12, fontWeight: 800, color: INK, margin: '0 0 4px' }}>{title}</h3>
      <p style={{ fontSize: 12, color: INK_SOFT, lineHeight: 1.5, margin: 0 }}>{line1}</p>
      <p style={{ fontSize: 12, color: INK_SOFT, lineHeight: 1.5, margin: '2px 0 0' }}>{line2}</p>
      <span style={{ fontSize: 10, color: AMBER_DARK, fontStyle: 'italic', marginTop: 4, display: 'block' }}>{cite}</span>
    </div>
  );
}

function PartnerCard({ product, partners, scale }) {
  return (
    <div style={{ padding: '8px 10px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 900, color: AMBER_DARK, marginBottom: 2 }}>{product}</div>
      <div style={{ fontSize: 10, color: INK_SOFT, lineHeight: 1.4 }}>{partners}</div>
      {scale && <div style={{ fontSize: 10, fontWeight: 700, color: INK, marginTop: 3 }}>{scale}</div>}
    </div>
  );
}

function Stat({ figure, label }) {
  return (
    <div style={{ flex: '1 1 180px', padding: '12px 14px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, textAlign: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>{figure}</div>
      <div style={{ fontSize: 9, fontWeight: 700, color: INK_MUTE, letterSpacing: '0.04em', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function UF51Icon() {
  return (
    <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke={AMBER} strokeWidth="1.8" fill="rgba(217,119,6,0.08)" />
      <path d="M8 15 L11 15 L12.5 9 L14 21 L15.5 11 L17 19 L18.5 13 L20 17 L22 15" stroke={AMBER} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}