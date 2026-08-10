import React from 'react';
import { motion } from 'framer-motion';
import { COLOR, FONT, RADIUS, SPACE, SHADOW } from '@/components/family51/sortedDesignSystem';

const { gold: GOLD, ink: INK, paper: PAPER, muted: MUTED, border: BORDER, green: GREEN } = COLOR;

const CONTACT_EMAIL = 'family@uf51.love';

// ─── DATA ────────────────────────────────────────────────────────────────────

// The well-defined beneficiary group — who SORTED is FOR.
const BENEFICIARIES = [
  {
    group: 'People who cannot read the letter',
    size: '6.6m adults in England (1 in 6) have very low literacy skills',
    need: 'A formal letter from a court, council or creditor is a closed door. They need it opened in plain English — not a referral to a form they also cannot read.',
    source: 'OECD PIAAC 2023 / National Literacy Trust, 2024',
  },
  {
    group: 'People who cannot read it in English',
    size: '313,000+ in Scotland alone (5.8%); millions UK-wide',
    need: 'Benefits decisions, tenancy notices and court summons arrive in English. The letter is technically "received". The meaning never lands.',
    source: 'Scotland\'s Census 2022',
  },
  {
    group: 'People in poverty & debt',
    size: 'Social-welfare legal aid down ~57% since 2012',
    need: 'They face DWP, councils and creditors alone. By the time they reach a human adviser, the deadline has usually passed.',
    source: 'IFS, 2024 (comparing to pre-LASPO 2012-13 levels)',
  },
  {
    group: 'Older & vulnerable adults',
    size: '1.9m older people scammed; £7.4bn total losses; ~£4,000 average per victim',
    need: 'Highest scam exposure, lowest digital confidence, often isolated. They need to know what is real and where to report it — instantly.',
    source: 'Independent Age, "The hidden cost of scams" (2024)',
  },
  {
    group: 'ADHD & neurodivergent adults',
    size: '~2.5m in England (incl. undiagnosed)',
    need: 'The avoidance loop turns a deadline into a crisis before the envelope is even opened. They need the letter decoded in seconds, not scheduled around.',
    source: 'Priory Group / NHS data',
  },
  {
    group: 'Carers & family advocates',
    size: '1 in 8 UK adults is an unpaid carer',
    need: 'They decode letters on behalf of someone they love, with no training. They need a tool that reads it for them — and hands to a human when it matters.',
    source: 'Carers UK',
  },
];

// The referral partners — the CHANNEL. Each has a reach number and a gap SORTED fills.
const REFERRAL_PARTNERS = [
  {
    name: 'Citizens Advice',
    reach: '2.71m people helped with one-to-one advice per year (England & Wales, 2024-25)',
    role: 'The gold standard for trust. Advisers triage, but operate on opening hours and appointment slots.',
    gap: 'Demand outstrips capacity — advisers report letters arriving already past deadline, and by the time someone works up the courage to call, the crisis has compounded. SORTED intercepts at the moment of fear.',
    source: 'Citizens Advice annual impact report, 2024-25',
  },
  {
    name: 'StepChange & debt charities',
    reach: 'StepChange supported over 160,000 people with full debt advice in 2025',
    role: 'Debt advice for people already in crisis. Every client brings a stack of letters they do not understand.',
    gap: 'Advisers spend the first session just decoding the paperwork. SORTED pre-decodes it — so the human hour is spent on the solution, not the reading.',
    source: 'StepChange Impact Report, 2025',
  },
  {
    name: 'Housing associations',
    reach: '4.0m social-rented homes in England',
    role: 'Tenants receive eviction notices, rent-arrears letters, section 21s — and freeze.',
    gap: 'Housing officers cannot reach every tenant before the deadline. SORTED lets the association hand every tenant a decoder — one link, no IT, no setup.',
    source: 'MHCLG / English Housing Survey',
  },
  {
    name: 'Faith & community groups',
    reach: 'Churches, mosques, gurdwaras are the first call for help',
    role: 'Trusted, present, but not legally trained. People bring their letters here before anywhere else.',
    gap: 'They have compassion but not the tools. SORTED gives them a way to help instantly — in any language — and route the complex cases up.',
    source: 'Community partner fieldwork',
  },
];

// The referral pathway — partner → individual → decoded → human if needed.
const PATHWAY = [
  {
    step: '01',
    title: 'Partner hands SORTED to the person',
    detail: 'A council, debt charity, housing association or faith group shares one link. No app, no account, no setup, no IT. The adviser does not become a bottleneck.',
  },
  {
    step: '02',
    title: 'The person pastes their letter',
    detail: 'On any phone, in any of 40+ languages. They do not need to know what kind of letter it is — SORTED works it out. Takes ten seconds.',
  },
  {
    step: '03',
    title: 'SORTED decodes it in plain language',
    detail: 'What it says. What it means. How urgent it is. What to do today. In English or their own language. Identity redacted on the device before any AI touches it.',
  },
  {
    step: '04',
    title: 'Complex cases route back to the human',
    detail: 'When a case needs a person, SORTED flags it. The adviser steps in with the letter already understood — so the human hour solves the problem, instead of reading it.',
  },
];

// Financial viability — the economics, plainly.
const ECONOMICS = [
  {
    tier: 'Free-to-start',
    price: '£0',
    who: 'Every individual. 10 uses, no card, no account.',
    why: 'The door stays open. No paywall between a scared person and the decode. This is the acquisition engine — not a limitation.',
  },
  {
    tier: 'Sorted For Life',
    price: '£9.99 one-time',
    who: 'People who need SORTED permanently — carers, recurring disputes, vulnerable, older, low-income.',
    why: 'One payment, lifetime access. Priced so the people who need it most can afford it. This is the live product, not a projection.',
  },
  {
    tier: 'Organisation licence',
    price: 'Per-seat / per-client-served',
    who: 'Advice centres, housing associations, debt charities.',
    why: 'One adviser reaches ten times more people. The B2B2C pathway is how SORTED reaches people who will never find it on their own — and it is open from day one. Grant-funded access for hardship.',
  },
];

// Showcase of potential — projected reach, honestly modelled.
const PROJECTIONS = [
  { period: 'Year 1', reach: '5,000 individuals', via: 'Direct launch + 3 partner pilots', note: 'Proof of the model. Anonymous pattern data starts flowing.' },
  { period: 'Year 3', reach: '150,000 individuals', via: '20+ referral partners, white-label for 3 orgs', note: 'Break-even on B2B licences alone. B2C subscription covers R&D.' },
  { period: 'Year 5', reach: 'Reaching advice clients nationwide', via: 'National advice-network deployment', note: 'The ambition: every person handed a scary letter in the UK can decode it the same hour — free, no matter their language or income.' },
];

const VIABILITY_POINTS = [
  { point: 'Marginal cost per decode is near-zero', why: 'AI inference at scale costs pence. One adviser licence serves thousands of clients.' },
  { point: 'The need is recurring, not one-off', why: 'People do not stop receiving letters. Lifetime access and org licences compound.' },
  { point: 'B2B2C is the distribution moat', why: 'A partner hands SORTED to every client. We do not pay to acquire — we are distributed by the trusted organisations people already turn to.' },
  { point: 'Hardship access does not break the model', why: 'Free-to-start and lifetime tiers are supported by the margin on paying users and org licences — by design, not by charity.' },
];

// Global context — the problem is not UK-only. SORTED is jurisdiction-agnostic.
const GLOBAL = {
  headline: '5.1 billion people — two-thirds of the world — lack meaningful access to justice',
  source: 'Task Force on Justice / HiiL / SDG16+ Pathfinders',
  note: 'The UK figures above are a slice of a global pattern. SORTED auto-detects the jurisdiction and works in 40+ languages, so the same tool that decodes a Glasgow council letter can decode a court notice in Lagos, a tenancy dispute in Toronto, or a benefits decision in Brisbane.',
};

// International equivalents — where readers beyond the UK can get human help.
const INTERNATIONAL_HELP = [
  { region: 'United States', route: '211 (dial 2-1-1) for local services; Legal Aid Society / Legal Services Corporation for free legal help.' },
  { region: 'Canada', route: 'Pro Bono Ontario, Community Legal Education Ontario (CLEO), and provincial Legal Aid commissions.' },
  { region: 'Australia', route: 'State Legal Aid commissions, Financial Rights Legal Centre, and the National Debt Helpline (1800 007 007).' },
  { region: 'European Union', route: 'National consumer protection authorities and the European Consumer Centres (ECC-Net) for cross-border disputes.' },
  { region: 'Global south', route: 'UNDP / UN Women legal aid programmes, and community paralegal networks (e.g. Namati).' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SortedReferralShowcase() {
  return (
    <div style={{ minHeight: '100dvh', background: PAPER, color: INK, fontFamily: FONT.family, WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ── HERO ──────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${GOLD}0d`, border: `1px solid ${GOLD}30`, borderRadius: 20, padding: '5px 14px', marginBottom: 22 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: '0.12em' }}>REFERRAL & BENEFICIARY SHOWCASE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 6.5vw, 40px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 18px', color: INK }}>
            Who SORTED is for. Who sends them.<br />How it stays standing.
          </h1>

          <p style={{ fontSize: 17, color: INK, lineHeight: 1.6, margin: '0 0 14px', fontWeight: 600 }}>
            A funder-ready map of the <span style={{ color: GOLD }}>beneficiary group</span>, the <span style={{ color: GOLD }}>referral partners</span> who reach them, the pathway from partner to person, and the financial viability that makes it sustainable.
          </p>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: '0 0 0' }}>
            Every figure is cited. This is the document for conversations with Citizens Advice, debt charities, housing associations and funders.
          </p>

          <div style={{ marginTop: 24, padding: '16px 18px', background: '#fff', border: `1px solid ${GOLD}40`, borderLeft: `3px solid ${GOLD}`, borderRadius: 10 }}>
            <p style={{ fontSize: 15, color: INK, lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
              SORTED exists for one person: the one who <span style={{ color: GOLD, fontWeight: 800 }}>cannot read the letter, cannot pay for help, and cannot wait</span>. Everyone else — the partners, the funders, the paying users — exists to make sure that person gets help first. That is the whole point. The economics below exist only to keep that promise standing.
            </p>
          </div>
          <p style={{ fontSize: 12, color: MUTED, margin: '12px 0 0', fontStyle: 'italic' }}>UK-first. Pilot-ready for advice networks across the country — then everywhere. Registered Community Interest Company (CIC) since November 2025 — mission-locked, asset-locked.</p>
          <div style={{ height: 2, width: 56, background: GOLD, marginTop: 22, borderRadius: 2 }} />
        </motion.div>

        <Divider />

        {/* ── 01 · THE BENEFICIARY GROUP ────────────────────── */}
        <Section tag="01 · The Beneficiary Group" title="A well-defined group, one shared failure point: a letter they cannot act on alone.">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {BENEFICIARIES.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                style={{ padding: '20px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 6 }}>{b.group}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: GOLD, marginBottom: 8 }}>{b.size}</div>
                <p style={{ fontSize: 14.5, color: MUTED, lineHeight: 1.6, margin: '0 0 8px' }}>{b.need}</p>
                <p style={{ fontSize: 11, color: 'rgba(28,28,30,0.5)', margin: 0 }}>Source: {b.source}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── 02 · REFERRAL PARTNERS ───────────────────────── */}
        <Section tag="02 · Referral Partners" title="The trusted organisations who already reach these people — and the gap SORTED fills for them.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {REFERRAL_PARTNERS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: RADIUS.card, padding: '18px 20px' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: GREEN, marginBottom: 10 }}>Reach: {p.reach}</div>
                <p style={{ fontSize: 14, color: INK, lineHeight: 1.55, margin: '0 0 10px' }}>{p.role}</p>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>The gap SORTED fills</div>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.55, margin: '0 0 10px' }}>{p.gap}</p>
                <p style={{ fontSize: 11, color: 'rgba(28,28,30,0.5)', margin: 0 }}>Source: {p.source}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── 03 · THE PATHWAY ──────────────────────────────── */}
        <Section tag="03 · The Referral Pathway" title="Partner hands it over. Person pastes the letter. Complex cases come back to the human.">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PATHWAY.map((s, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: GOLD, marginTop: 1 }}>{s.step}</div>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: INK, marginBottom: 5 }}>{s.title}</div>
                  <p style={{ fontSize: 14.5, color: MUTED, lineHeight: 1.55, margin: 0 }}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 04 · FINANCIAL VIABILITY ──────────────────────── */}
        <Section tag="04 · Financial Viability" title="Three ways in. One model that serves everyone and pays for itself.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 20 }}>
            {ECONOMICS.map((e, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: RADIUS.card, padding: '18px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{e.tier}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 8 }}>{e.price}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>{e.who}</div>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.55, margin: 0 }}>{e.why}</p>
              </div>
            ))}
          </div>
          <div style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}22`, borderRadius: RADIUS.card, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', marginBottom: 12 }}>Why it stands up</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VIABILITY_POINTS.map((v, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flexShrink: 0, color: GREEN, marginTop: 3 }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 3 }}>{v.point}</div>
                    <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.5, margin: 0 }}>{v.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 05 · SHOWCASE OF POTENTIAL ────────────────────── */}
        <Section tag="05 · Showcase of Potential" title="A modelled path — measured in people helped, not growth.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PROJECTIONS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', gap: 16, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: RADIUS.card, padding: '18px 20px' }}>
                <div style={{ flexShrink: 0, minWidth: 72 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: GOLD, textTransform: 'uppercase' }}>{p.period}</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 5 }}>{p.reach}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 4 }}>via {p.via}</div>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, margin: 0 }}>{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(28,28,30,0.55)', margin: '16px 0 0', lineHeight: 1.5, fontStyle: 'italic' }}>
            Projections are modelled, not promised. Year 1 is the only one that is a commitment; the rest are the trajectory the model is built to reach.
          </p>
        </Section>

        {/* ── 06 · GLOBAL CONTEXT ───────────────────────────── */}
        <Section tag="06 · Global Context" title="The UK figures are a slice of a global pattern.">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}28`, borderRadius: RADIUS.card, padding: '22px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 800, color: INK, lineHeight: 1.25, marginBottom: 10 }}>{GLOBAL.headline}</div>
            <p style={{ fontSize: 11, color: 'rgba(28,28,30,0.5)', margin: '0 0 14px' }}>Source: {GLOBAL.source}</p>
            <p style={{ fontSize: 14.5, color: MUTED, lineHeight: 1.6, margin: 0 }}>{GLOBAL.note}</p>
          </motion.div>

          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: GOLD, textTransform: 'uppercase', marginBottom: 12 }}>Where to get human help — beyond the UK</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {INTERNATIONAL_HELP.map((h, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{ flexShrink: 0, minWidth: 110, fontSize: 14, fontWeight: 800, color: INK }}>{h.region}</div>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.55, margin: 0 }}>{h.route}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(28,28,30,0.55)', margin: '14px 0 0', lineHeight: 1.5, fontStyle: 'italic' }}>
            SORTED is not a substitute for a qualified adviser in complex cases — it is the first step that gets a person to the right human, in any language, in any country.
          </p>
        </Section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section style={{ marginTop: 48 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}28`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Start the conversation</div>
            <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.15 }}>
              A defined group. A clear channel. A model that pays for itself.
            </h2>
            <p style={{ fontSize: 15, color: MUTED, margin: '0 0 28px', lineHeight: 1.6 }}>
              If you advise, refer or fund people who receive letters they cannot act on, SORTED is built to sit between them and the crisis. Email us — we'll set up a pilot, free.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}?subject=SORTED%20Referral%20Showcase%20%E2%80%94%20Conversation`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: INK, color: GOLD, fontWeight: 800, fontSize: 14, letterSpacing: '0.04em', borderRadius: 12, padding: '14px 26px', textDecoration: 'none' }}>
              {CONTACT_EMAIL}
            </a>
          </motion.div>
        </section>

        <p style={{ marginTop: 32, fontSize: 11, color: 'rgba(28,28,30,0.5)', lineHeight: 1.6, borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
          Compiled {new Date().getFullYear()} for SORTED / UF51. All figures verified against primary sources at time of writing. This showcase pairs with the Research Brief (evidence) and the For Organisations page (the pilot offer).
        </p>
      </div>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Section({ tag, title, children }) {
  return (
    <section style={{ marginTop: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>{tag}</div>
      <h2 style={{ fontSize: 'clamp(20px, 4.5vw, 24px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.01em', margin: '0 0 20px', color: INK }}>{title}</h2>
      {children}
    </section>
  );
}

function Divider() {
  return (
    <div style={{ height: 1, background: BORDER, marginTop: 40 }} />
  );
}