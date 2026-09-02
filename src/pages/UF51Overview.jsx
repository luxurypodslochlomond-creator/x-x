import React from 'react';
import { motion } from 'framer-motion';

// UF51 — Four products, one calm platform.
// A credible, print-ready overview for people who might help fund the build.
// No "we're raising" language — just: these products are real, and good enough.

const PAPER = '#faf8f5';
const INK = '#1a1208';
const INK_SOFT = 'rgba(26,18,8,0.62)';
const INK_FAINT = 'rgba(26,18,8,0.40)';
const LINE = 'rgba(26,18,8,0.10)';

const PRODUCTS = [
  {
    name: 'PetSounds51',
    tagline: 'Sound therapy for anxious pets — built on peer-reviewed research.',
    accent: '#d4a017',
    icon: '🐾',
    problem:
      'Pet anxiety is widespread and under-treated. An estimated 70% of dogs show signs of anxiety — separation, fireworks, travel, vet visits. Owners feel helpless, drug options are limited or last-resort, and a single behaviour consult can cost £200+.',
    solution:
      'Acoustic sound-therapy protocols delivered through a simple web app. No device, no account needed to start — the Separation Anxiety protocol is free. A growing library of targeted protocols covers the most common triggers. Owners get a calm pet without drugs, gates, or guilt.',
    technology:
      'Frequency-based audio therapy grounded in peer-reviewed research. Runs in the browser, works offline, device-local — no pet or owner data leaves the phone. PWA-installable, subscription-tiered. No special hardware.',
    market: {
      global: 'Global pet care market ≈ $260B+; the pet wellness/mental-health segment is the fastest-growing slice.',
      addressable: 'Tens of millions of households with an anxious pet. UK alone has ~13M dogs. Repeat, low-churn subscription.',
    },
    traction: 'Live and free to use; paid tiers built and ready (pre-revenue). Peer-reviewed whitepaper, press centre, and a live response dataset.',
    differentiation: 'Not generic calming playlists on Spotify — targeted, protocol-based, and research-grounded. Free to start with no account; non-pharmaceutical and owner-administered.',
    monetisation: 'Freemium: free Separation Anxiety protocol; annual / monthly subscription for the full protocol library.',
    partner: 'Retail & vet distribution — a natural fit with Pets at Home (UK’s largest pet retailer): in-store QR, app bundling, vet-channel referral.',
    keywords: ['pet anxiety', 'separation anxiety', 'non-pharmaceutical', 'vet-researched', 'Pets at Home', 'pet wellness', 'subscription'],
  },
  {
    name: 'SORTED',
    tagline: 'Decodes any scary letter into plain English — in seconds, any language.',
    accent: '#ea580c',
    icon: '✉️',
    problem:
      'Millions receive frightening letters — council tax, debt, eviction, parking, benefits, court — and don’t understand them. UK legal aid has collapsed; the cost-of-living crisis has multiplied the volume. People freeze, miss deadlines, and get worse outcomes. Language barriers make it worse.',
    solution:
      'Paste or photograph any letter → a plain-English explanation in seconds: what it really means, the deadline that matters, what happens if you ignore it, step-by-step actions, and free local help. Any language. Includes a reply writer, a conflict helper, and a scam checker. Nothing is stored.',
    technology:
      'LLM-powered with a privacy-first architecture: personal identity is redacted on the user’s device before the AI ever sees the text, then re-attached locally for the user’s reply. Jurisdiction-aware (geo-detected) advice. Web-based, no account needed for the free tier, works on any phone.',
    market: {
      global: 'The global legal-aid gap covers billions of people with no access to affordable legal help.',
      addressable: 'Anyone with a frightening letter — a population that grows with every rate rise and every enforcement cycle.',
    },
    traction: 'Live; paid “for life” tier live in Stripe; 100+ real letters decoded to date. Case history, live help counter, and anonymised pattern-learning that improves the advice over time.',
    differentiation: 'Not ChatGPT-for-legal — purpose-built, jurisdiction-aware, and private by design (identity redacted on-device before the AI sees it). Built for the scared user, not the curious one.',
    monetisation: 'Freemium with a daily free limit; one-off “for life” + monthly subscription for unlimited use.',
    partner: 'Banks & financial services — offer SORTED to customers in arrears as part of FCA Consumer Duty / vulnerable-customer support. Financial inclusion, ESG, and regulatory duty in one move.',
    keywords: ['legal aid', 'financial inclusion', 'vulnerable customers', 'FCA Consumer Duty', 'cost-of-living', 'debt', 'plain English', 'banks', 'ESG'],
  },
  {
    name: 'earth51 — Litter Picking',
    tagline: 'Snap it, clean it, earn it — civic action that rewards itself.',
    accent: '#16a34a',
    icon: '🌍',
    problem:
      'Litter and fly-tipping blight communities; councils are underfunded and reactive; civic engagement is low; and kids are disconnected from their environment. The good people already picking up litter do it for free and get nothing back.',
    solution:
      'Snap a photo of litter → AI verifies the cleanup → log it → earn tokens (P51) redeemable for real value. earth51.love is a kid-friendly AI litter scanner. Community missions turn cleanup into a shared, gamified, rewarding act.',
    technology:
      'AI image verification, geo-tagged cleanups, and a token economy (P51) with IPFS-backed proof of impact. Device-local privacy, works on any phone. Open and gamified by design.',
    market: {
      global: 'Global environmental / civic-tech spend is rising fast across local government, ESG budgets, and schools.',
      addressable: 'Every community, every council, every school. UK councils spend £1B+/yr on street cleansing — a fraction redirected to prevention and engagement pays for itself.',
    },
    traction: '63 real cleanups logged; P51 token economy live (33 transactions, ~518 P51 moved); kid-facing scanner (earth51.love) shipping.',
    differentiation: 'Not a "report it" council app — it rewards the doer, not the problem. AI verification + token reward + a kid scanner in one loop.',
    monetisation: 'Token economy (P51) redeemable for real value; B2G/B2B partnerships with councils, ESG budgets, and schools.',
    partner: 'Local government, ESG corporate volunteering, and schools — a measurable, shareable environmental-impact channel.',
    keywords: ['environment', 'civic tech', 'ESG', 'local government', 'schools', 'gamification', 'token economy', 'community'],
  },
  {
    name: 'ZAPP',
    tagline: 'Kids describe an idea — AI builds a real app. No accounts, no risk.',
    accent: '#7c3aed',
    icon: '⚡',
    problem:
      'Kids want to build with technology, but coding is a high barrier. Most “kid” tools are locked-down games, not real creation. Parents are wary of accounts, data, and unsafe AI. COPPA makes real kids’ products hard to do right.',
    solution:
      'A kid says what they want in words → AI builds a real, playable app instantly. No accounts (COPPA-compliant), device-local memory, animal “buddy” mascots, and a remix gallery. Every app carries an honest stamp: “An AI made this — it can be wrong. Check with a grown-up if it matters.”',
    technology:
      'AI app generation behind a server-side kid-safety layer: PII stripping, harmful-intent blocking, and an output HTML sandbox that blocks external/network calls. Device-local storage for memory and buddy state. Web-based, no accounts.',
    market: {
      global: 'Global EdTech ≈ $100B+; kids’ coding and creative-AI tools are among the fastest-growing segments.',
      addressable: 'Every child with a phone or tablet — a global, evergreen audience of first-time builders.',
    },
    traction: '10 real apps built by kids; 87 total plays; remix gallery live. Free to every child, by design.',
    differentiation: 'Not Scratch or Code.org — no learning curve; a real, playable app from a single sentence. Kid-safety layer, no accounts, honest AI disclaimer.',
    monetisation: 'Free for kids; future school / distributor licensing.',
    partner: 'Schools, parents, and EdTech distributors — a safe, account-free entry point to AI literacy.',
    keywords: ['kids', 'EdTech', 'AI literacy', 'COPPA', 'creativity', 'safe AI', 'no accounts'],
  },
];

const ECOSYSTEM = {
  thread:
    'Four products, one calm platform. Every UF51 product shares the same principles: no account needed to start, works on any phone, free tier forever, device-local privacy, and open source. The same privacy-first, AI-powered, offline-capable core powers all four — so each new product is faster and cheaper to ship than the last.',
  stack: [
    'React + AI (LLM & vision)',
    'Privacy-first architecture (on-device redaction, device-local storage)',
    'Token economy (P51) with IPFS-backed proof',
    'Offline-capable PWA — installable, works on poor signal',
    'Open source',
  ],
  proof: [
    'Real products, live today — not decks',
    'Real usage: 100+ letters decoded, 63 cleanups, 10 kid-built apps',
    'Peer-reviewed research foundation (PetSounds51)',
    'Honest privacy — nothing stored unless it has to be',
  ],
};

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', color: INK_FAINT, margin: '0 0 4px', textTransform: 'uppercase' }}>{label}</p>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: INK_SOFT, margin: 0 }}>{children}</p>
    </div>
  );
}

function Proof({ n, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontSize: 18, fontWeight: 900, color: INK, letterSpacing: '-0.02em' }}>{n}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: INK_FAINT, letterSpacing: '0.04em' }}>{label}</span>
    </div>
  );
}

function ProductCard({ p, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        background: '#fff',
        border: `1px solid ${LINE}`,
        borderLeft: `4px solid ${p.accent}`,
        borderRadius: 14,
        padding: '20px 22px',
        marginBottom: 16,
        breakInside: 'avoid',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 22 }}>{p.icon}</span>
        <h3 style={{ fontSize: 19, fontWeight: 800, color: INK, margin: 0, letterSpacing: '-0.01em' }}>{p.name}</h3>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: p.accent, margin: '0 0 14px' }}>{p.tagline}</p>

      <Section label="The problem">{p.problem}</Section>
      <Section label="The solution">{p.solution}</Section>
      <Section label="The technology">{p.technology}</Section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', color: INK_FAINT, margin: '0 0 4px', textTransform: 'uppercase' }}>Market — global</p>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: INK_SOFT, margin: 0 }}>{p.market.global}</p>
        </div>
        <div>
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', color: INK_FAINT, margin: '0 0 4px', textTransform: 'uppercase' }}>Market — addressable</p>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: INK_SOFT, margin: 0 }}>{p.market.addressable}</p>
        </div>
      </div>

      <Section label="Why this, not the rest">{p.differentiation}</Section>
      <Section label="How it earns">{p.monetisation}</Section>
      <Section label="Why it’s real">{p.traction}</Section>
      <Section label="Partnership angle">{p.partner}</Section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
        {p.keywords.map(k => (
          <span key={k} style={{ fontSize: 10, fontWeight: 700, color: INK_SOFT, background: `${p.accent}12`, border: `1px solid ${p.accent}33`, borderRadius: 999, padding: '3px 9px' }}>{k}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function UF51Overview() {
  return (
    <div style={{ background: PAPER, color: INK, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; } }`}</style>

      {/* PRINT BAR */}
      <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 10, background: PAPER, borderBottom: `1px solid ${LINE}`, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: INK_FAINT, letterSpacing: '0.08em' }}>UF51 · PRODUCT OVERVIEW</span>
        <button
          onClick={() => window.print()}
          style={{ fontSize: 12, fontWeight: 800, color: '#fff', background: INK, border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', letterSpacing: '0.04em' }}
        >
          Save as PDF →
        </button>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 48px' }}>
        {/* HEADER */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: INK_FAINT, margin: '0 0 8px', textTransform: 'uppercase' }}>Universal Frequency 51</p>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: INK, margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Four products. One calm platform.</h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: INK_SOFT, margin: '0 0 16px', maxWidth: 620 }}>
            PetSounds51, SORTED, earth51, and ZAPP — four live products built on one privacy-first, AI-powered core. Each solves a real problem for real people, today.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PRODUCTS.map(p => (
              <span key={p.name} style={{ fontSize: 11, fontWeight: 700, color: INK, background: '#fff', border: `1px solid ${p.accent}55`, borderRadius: 999, padding: '4px 12px' }}>{p.icon} {p.name}</span>
            ))}
          </div>

          {/* HONEST PROOF STRIP — real numbers from the live system, no spin */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 22px', marginTop: 16, padding: '12px 16px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12 }}>
            <Proof n="4" label="live products" />
            <Proof n="100+" label="letters decoded" />
            <Proof n="63" label="cleanups logged" />
            <Proof n="10" label="apps built by kids" />
            <Proof n="87" label="plays" />
          </div>
        </div>

        {/* ECOSYSTEM THREAD */}
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px 22px', marginBottom: 24 }}>
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', color: INK_FAINT, margin: '0 0 6px', textTransform: 'uppercase' }}>The thread</p>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: INK_SOFT, margin: '0 0 16px' }}>{ECOSYSTEM.thread}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', color: INK_FAINT, margin: '0 0 6px', textTransform: 'uppercase' }}>Shared technology</p>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 12.5, lineHeight: 1.6, color: INK_SOFT }}>
                {ECOSYSTEM.stack.map(s => <li key={s} style={{ marginBottom: 3 }}>{s}</li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', color: INK_FAINT, margin: '0 0 6px', textTransform: 'uppercase' }}>Why it’s credible</p>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 12.5, lineHeight: 1.6, color: INK_SOFT }}>
                {ECOSYSTEM.proof.map(s => <li key={s} style={{ marginBottom: 3 }}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        {PRODUCTS.map((p, i) => <ProductCard key={p.name} p={p} index={i} />)}

        {/* CLOSING */}
        <div style={{ marginTop: 24, padding: '20px 22px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, textAlign: 'center' }}>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: INK_SOFT, margin: '0 0 6px' }}>
            Live products, real usage, honest privacy. Free to start, built to last.
          </p>
          <p style={{ fontSize: 11, color: INK_FAINT, margin: 0, letterSpacing: '0.04em' }}>Universal Frequency 51 · open source · privacy-first</p>
        </div>
      </div>
    </div>
  );
}