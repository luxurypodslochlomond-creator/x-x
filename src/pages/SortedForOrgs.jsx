import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLOR, FONT } from '@/components/family51/sortedDesignSystem';

const { gold: GOLD, ink: INK, paper: PAPER, muted: MUTED, border: BORDER } = COLOR;

// ─── SORTED FOR ORGANISATIONS ─────────────────────────────────────────────────
// B2B landing — community advice centres, debt charities, housing associations,
// faith groups, vulnerable support orgs — globally
// ──────────────────────────────────────────────────────────────────────────────

const CONTACT_EMAIL = 'family@uf51.love';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=SORTED%20Pilot%20Request%20%E2%80%94%20Organisation&body=Hi%2C%0A%0AI%20represent%20[Organisation%20Name]%20and%20we%20support%20people%20who%20receive%20official%20letters%20they%20find%20difficult%20to%20understand.%0A%0AWe%20would%20like%20to%20explore%20a%20free%20pilot%20of%20SORTED%20for%20our%20team%20%2F%20clients.%0A%0AOur%20organisation%3A%0AApproximate%20number%20of%20people%20we%20support%3A%0ACountry%3A%0A%0ABest%20way%20to%20reach%20us%3A%0A`;

const orgs = [
  { icon: <AdviceIcon />, title: 'Community Advice Centres', desc: 'Advisers drowning in letter backlogs. Clients who came in too late because they were scared to open the envelope.' },
  { icon: <DebtIcon />, title: 'Debt Charities', desc: 'StepChange, CAP, Christians Against Poverty — millions of clients, all getting letters they don\'t understand.' },
  { icon: <HousingIcon />, title: 'Housing Associations', desc: 'Tenants receive eviction notices, rent arrears letters, section 21s — and freeze. SORTED unfreezes them.' },
  { icon: <FaithIcon />, title: 'Faith Groups', desc: 'Churches, mosques, gurdwaras are the first call for help. They need tools — not just compassion.' },
  { icon: <SupportIcon />, title: 'Vulnerable Support Orgs', desc: 'Domestic abuse survivors, mental health services, addiction recovery — all receive official letters in crisis.' },
];

const stats = [
  { number: '5.1B', label: 'people worldwide with unmet justice needs', source: 'World Justice Project' },
  { number: '92%', label: 'of serious US legal problems receive no help', source: 'Legal Services Corp.' },
  { number: '73%', label: 'of people referred to bailiffs have a mental health condition', source: 'Money & Mental Health' },
  { number: '40+', label: 'languages SORTED works in — any letter, anywhere', source: 'SORTED' },
];

const pillars = [
  { icon: <SpeedIcon />, title: 'Instant for your clients', desc: 'No app download. No account. Paste the letter. Understand it in seconds. Works on any phone.' },
  { icon: <PrivacyIcon />, title: 'Private by design', desc: 'The full analysis stays on your client\'s device. Only anonymous patterns — no names, no addresses, no amounts — help us improve. GDPR-aligned by design. Anonymised reporting for you, nothing that identifies a person.' },
  { icon: <GlobalIcon />, title: 'Any language. Any country.', desc: 'Your clients speak Urdu, Somali, Spanish, Romanian. SORTED works in all of them — same quality, same clarity.' },
  { icon: <ScaleIcon />, title: 'Scales without hiring', desc: 'One adviser can now support ten times more people. SORTED handles the letter. You handle the person.' },
];

const labelStyle = { fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', marginBottom: 18 };

export default function SortedForOrgs() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100dvh', background: PAPER, color: INK, fontFamily: FONT.family, WebkitFontSmoothing: 'antialiased' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px 0' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${GOLD}0d`, border: `1px solid ${GOLD}30`, borderRadius: 20, padding: '5px 14px', marginBottom: 22 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: '0.12em' }}>FOR ORGANISATIONS</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 18px', color: INK }}>
            Your clients are getting <span style={{ color: GOLD }}>scary letters.</span><br />They're not opening them.
          </h1>

          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.65, margin: '0 0 14px' }}>
            By the time they come to you — the deadline has passed. The case has escalated. The damage is done.
          </p>
          <p style={{ fontSize: 16, color: INK, lineHeight: 1.6, margin: '0 0 32px', fontWeight: 600 }}>
            SORTED intercepts at the <span style={{ color: GOLD }}>moment of fear</span> — before it becomes a crisis.
          </p>

          <a href={MAILTO} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: INK, color: GOLD, fontWeight: 800, fontSize: 14, letterSpacing: '0.04em', borderRadius: 10, padding: '14px 26px', textDecoration: 'none' }}>
            <MailIcon />
            Request a free pilot
          </a>
        </motion.div>
      </section>

      <Divider />

      {/* ── STATS ────────────────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
        <p style={labelStyle}>The scale of the problem</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}1c`, borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: 800, color: GOLD, marginBottom: 6 }}>{s.number}</div>
              <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.45 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: 'rgba(28,28,30,0.45)', margin: '6px 0 0' }}>{s.source}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── WHO THIS IS FOR ──────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
        <p style={labelStyle}>Who we work with</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {orgs.map((org, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>{org.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 5 }}>{org.title}</div>
                <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.55 }}>{org.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
        <p style={labelStyle}>Why SORTED works for organisations</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: 16, padding: '18px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12 }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 5 }}>{p.title}</div>
                <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── THE MODEL ────────────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
        <p style={labelStyle}>How we work with organisations</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { step: '01', title: 'Free pilot', desc: 'We give your team or clients free unlimited access. No contracts, no setup, no IT.' },
            { step: '02', title: 'Your clients use it directly', desc: 'No app needed. Share a link. They paste their letter. They get clarity. You get less crisis calls.' },
            { step: '03', title: 'Agree a model that works', desc: 'Per-seat licence, per-client-served, or grant-funded access. We\'ll find what works for your budget.' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: GOLD, letterSpacing: '0.06em', minWidth: 28, marginTop: 2 }}>{m.step}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{m.title}</div>
                <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EVIDENCE LINK ─────────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '40px auto 0', padding: '0 24px' }}>
        <a href="/SortedResearchBrief" style={{ textDecoration: 'none' }}>
          <div style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}22`, borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flexShrink: 0, fontSize: 18, color: GOLD }}>⌖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>Read the evidence</div>
              <div style={{ fontSize: 14, color: INK, fontWeight: 600, lineHeight: 1.45 }}>The full research brief — nine cited strands behind every figure on this page.</div>
            </div>
            <div style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>→</div>
          </div>
        </a>
      </section>

      {/* ── CTA BLOCK ────────────────────────────────────────── */}
      <section style={{ maxWidth: 640, margin: '40px auto 0', padding: '0 24px 72px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}28`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Start a conversation</div>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 800, color: INK, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.15 }}>
            Ready to run a pilot?
          </h2>
          <p style={{ fontSize: 15, color: MUTED, margin: '0 0 28px', lineHeight: 1.6 }}>
            No sales process. No demo call required. Just email us, tell us about your organisation, and we'll get you set up — free.
          </p>

          <a href={MAILTO} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: INK, color: GOLD, fontWeight: 800, fontSize: 14, letterSpacing: '0.04em', borderRadius: 10, padding: '14px 26px', textDecoration: 'none', marginBottom: 16 }}>
            <MailIcon />
            Email us to start a pilot
          </a>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: MUTED }}>{CONTACT_EMAIL}</span>
            <button onClick={copyEmail}
              style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: copied ? '#16a34a' : GOLD, background: copied ? 'rgba(22,163,74,0.08)' : `${GOLD}0d`, border: `1px solid ${copied ? 'rgba(22,163,74,0.3)' : `${GOLD}40`}`, cursor: 'pointer', padding: '5px 10px', borderRadius: 6 }}>
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: 640, margin: '40px auto 0', padding: '0 24px' }}>
      <div style={{ height: 1, background: BORDER }} />
    </div>
  );
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M2 3.5L8 7.5L14 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function AdviceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke={GOLD} strokeWidth="1.3" />
      <path d="M7 8.5c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.2-.7 2.24-1.714 2.74L10 12v1.5" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="15.5" r="0.7" fill={GOLD} />
    </svg>
  );
}
function DebtIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5" width="16" height="11" rx="2" stroke={GOLD} strokeWidth="1.3" />
      <path d="M6 9h8M6 12h5" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <path d="M7 5V4a3 3 0 016 0v1" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function HousingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 18h14M5 18v-8M15 18v-8M10 4L3 10H17L10 4Z" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="13" width="4" height="5" rx="0.5" stroke={GOLD} strokeWidth="1.2" />
    </svg>
  );
}
function FaithIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2v16M4 8h12" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 12c-2.5 2.5-6 3-6 3s1-3.5 3.5-5" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 17.5S3 13.5 3 8.5a4.5 4.5 0 019-0.5 4.5 4.5 0 019 .5c0 5-7 9-7 9H10z" stroke={GOLD} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function SpeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 10L8.5 13.5L15 6.5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="8.5" stroke={GOLD} strokeWidth="1.2" opacity="0.3" />
    </svg>
  );
}
function PrivacyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="8" rx="1.5" stroke={GOLD} strokeWidth="1.3" />
      <path d="M7 9V6.5a3 3 0 016 0V9" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="10" cy="13" r="1.2" fill={GOLD} />
    </svg>
  );
}
function GlobalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke={GOLD} strokeWidth="1.3" />
      <path d="M10 1.5C10 1.5 7 5.5 7 10s3 8.5 3 8.5M10 1.5C10 1.5 13 5.5 13 10s-3 8.5-3 8.5" stroke={GOLD} strokeWidth="1.1" opacity="0.5" />
      <path d="M1.5 10h17" stroke={GOLD} strokeWidth="1.1" opacity="0.5" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v14M5 17h10" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 5L4 8l-1.5 4c0 1.5 3 1.5 3 0L4 8" stroke={GOLD} strokeWidth="1.1" strokeLinejoin="round" opacity="0.7" />
      <path d="M10 5l6 3 1.5 4c0 1.5-3 1.5-3 0L16 8" stroke={GOLD} strokeWidth="1.1" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}