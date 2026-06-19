import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StatCard = ({ number, label, source }) => (
  <div style={{
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 12,
    padding: '16px 18px',
    marginBottom: 10,
  }}>
    <div style={{ fontSize: 28, fontWeight: 900, color: '#d4760a', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 4 }}>{number}</div>
    <div style={{ fontSize: 13, color: '#1a1208', fontWeight: 600, lineHeight: 1.5, marginBottom: 4 }}>{label}</div>
    {source && <div style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', fontWeight: 500 }}>{source}</div>}
  </div>
);

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M20 6L9 17l-5-5" stroke="#d4760a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#d4760a" strokeWidth="1.8"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#d4760a" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.2" fill="#d4760a"/>
  </svg>
);

export default function SortedAboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', color: '#1a1208', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        {/* Back */}
        <Link
          to="/Sorted"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'rgba(26,18,8,0.4)', letterSpacing: '0.08em', textDecoration: 'none', marginBottom: 28 }}
        >
          <ArrowLeft size={14} />
          BACK
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.5px' }}>The facts.</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.55)', margin: 0, lineHeight: 1.6 }}>
            Why SORTED exists — and why it matters more than most people realise.
          </p>
        </div>

        {/* The problem — debt & worry */}
        <div style={{ background: '#1a1208', borderRadius: 14, padding: '24px 22px', marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: '#d4760a', margin: '0 0 14px', textTransform: 'uppercase' }}>The problem is bigger than you think</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.5 }}>
            Most people deal with debt letters, housing threats, and legal notices completely alone.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.75 }}>
            Not because they don't care — because they can't afford help. A letter from a bailiff, a council notice, a tenancy dispute, an employer's legal threat. They all look terrifying. Most aren't. But without plain-English guidance, panic sets in — and that's when people make expensive, avoidable mistakes.
          </p>
        </div>

        {/* Stats */}
        <StatCard
          number="5.1 billion"
          label="People worldwide with unmet legal needs — nearly two-thirds of humanity."
          source="World Justice Project, 2023"
        />
        <StatCard
          number="−90%"
          label="Drop in UK civil legal aid cases since 2012. From ~1 million to just 110,000 per year."
          source="UK Parliament POST Briefing, 2025"
        />
        <StatCard
          number="80%"
          label="Of UK family court cases now have at least one person with no legal representation at all."
          source="Law Society, 2024"
        />
        <StatCard
          number="£14.9bn"
          label="Household debt in the UK referred to debt advice services in 2023. Most people face it alone."
          source="StepChange Debt Charity, 2023"
        />

        {/* Globally */}
        <div style={{ background: 'rgba(212,118,10,0.06)', border: '1px solid rgba(212,118,10,0.18)', borderRadius: 12, padding: '18px 20px', marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#d4760a', margin: '0 0 8px' }}>This isn't just a UK problem</p>
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.75 }}>
            In the US, 80% of low-income Americans' legal needs go unmet. In India, over 300 million people live without any meaningful access to justice. Across sub-Saharan Africa, Latin America, and Southeast Asia, the story is the same — laws exist but help doesn't. SORTED works in any language, in any country. That's not an accident.
          </p>
        </div>

        {/* Privacy — mathematically private */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '18px 20px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <LockIcon />
            <p style={{ fontSize: 13, fontWeight: 800, color: '#1a1208', margin: 0 }}>Mathematically private — not just a promise</p>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.62)', margin: 0, lineHeight: 1.75 }}>
            Most tools say "we take your privacy seriously." We built ours so there's nothing to take. Your documents are processed and immediately discarded. No account. No profile. No data trail. We can't hand over what we never held — and that matters most to people in situations where they genuinely fear who might be watching.
          </p>
        </div>

        {/* Why we built it */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', margin: '0 0 14px' }}>What we believe</p>
          {[
            'Legal help is a human right — not a luxury for those who can afford it.',
            'Debt and worry are often the same crisis. A decoded letter reduces both.',
            'Privacy isn\'t a feature — it\'s the foundation. Especially for the vulnerable.',
            'Plain language is an act of respect for people already under pressure.',
            'If you can\'t afford it, we\'ve still got you. That\'s the whole point.',
          ].map((principle, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
              <Check />
              <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.72)', lineHeight: 1.65 }}>{principle}</span>
            </div>
          ))}
        </div>

        {/* Who we are */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', margin: '0 0 12px' }}>Who we are</p>
          {[
            { label: 'Organisation', value: 'Universal Frequency 51 CIC' },
            { label: 'Location', value: 'Scotland, United Kingdom' },
            { label: 'Structure', value: 'Community Interest Company — any profit goes back into the mission' },
            { label: 'Mission', value: 'Legal help for everyone, everywhere, regardless of income or language' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(26,18,8,0.07)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(26,18,8,0.38)', minWidth: 90, flexShrink: 0 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#1a1208', lineHeight: 1.55 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.08)', borderRadius: 10, padding: '14px 16px', marginBottom: 28 }}>
          <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.45)', margin: 0, lineHeight: 1.65 }}>
            <strong style={{ color: 'rgba(26,18,8,0.6)' }}>Important:</strong> SORTED is not a law firm and does not provide legal advice. We help you understand documents and your options. For anything involving court proceedings, always consult a qualified solicitor or legal aid service in your country.
          </p>
        </div>

        {/* Contact */}
        <div style={{ textAlign: 'center', padding: '20px', background: '#1a1208', borderRadius: 14, marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '0 0 8px' }}>Questions, partnerships, press enquiries?</p>
          <a
            href="mailto:family@uf51.love"
            style={{ fontSize: 15, fontWeight: 800, color: '#d4760a', textDecoration: 'none' }}
          >
            family@uf51.love
          </a>
        </div>

        {/* Footer nav */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'nowrap', paddingBottom: 32 }}>
          {[
            { label: 'FAQ', href: '/SortedFAQ' },
            { label: 'Terms', href: '/SortedTerms' },
            { label: 'Privacy', href: '/SortedPrivacy' },
            { label: 'Global', href: '/SortedGlobalAccess' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{ fontSize: 11, fontWeight: 600, color: 'rgba(26,18,8,0.38)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{label}</a>
          ))}
        </div>

      </div>
    </div>
  );
}