import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.5px' }}>SORTED</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#d4760a', background: 'rgba(212,118,10,0.1)', padding: '3px 8px', borderRadius: 4 }}>ABOUT</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.38)', margin: 0 }}>Built by Universal Frequency 51 CIC · Scotland, UK</p>
        </div>

        {/* Origin story */}
        <div style={{ background: '#1a1208', borderRadius: 14, padding: '24px 22px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', color: '#d4760a', margin: '0 0 14px', textTransform: 'uppercase' }}>Why we built this</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.4 }}>
            Most people can't afford a solicitor. Most letters look more terrifying than they are.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.7 }}>
            We built SORTED because a scary letter at midnight shouldn't send you into panic. It should send you to SORTED — which decodes it in seconds, tells you exactly what to do, and helps you respond. No account. No jargon. No extraction.
          </p>
        </div>

        {/* The gap */}
        <div style={{ background: 'rgba(212,118,10,0.06)', border: '1px solid rgba(212,118,10,0.2)', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#d4760a', margin: '0 0 8px' }}>The problem is enormous</p>
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.7 }}>
            There's a <strong>£100 billion annual gap</strong> in UK legal aid. Two-thirds of people with serious legal problems get zero professional help. Across the world, 5.1 billion people have no meaningful access to justice. SORTED is our answer to that — starting small, thinking big.
          </p>
        </div>

        {/* Who we are */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', margin: '0 0 12px' }}>Who we are</p>
          {[
            { label: 'Organisation', value: 'Universal Frequency 51 CIC' },
            { label: 'Location', value: 'Scotland, United Kingdom' },
            { label: 'Structure', value: 'Community Interest Company — profit used for public good' },
            { label: 'Mission', value: 'Legal help for everyone, everywhere, regardless of income' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(26,18,8,0.07)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(26,18,8,0.4)', minWidth: 90, flexShrink: 0 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#1a1208', lineHeight: 1.5 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', margin: '0 0 12px' }}>What we believe</p>
          {[
            'Legal help is a human right, not a luxury',
            'Privacy isn\'t a feature — it\'s the foundation',
            'Plain language is an act of respect',
            'Technology should empower, not extract',
            'If you can\'t afford it, we\'ve still got you',
          ].map((principle, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#d4760a', fontWeight: 900, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.72)', lineHeight: 1.6 }}>{principle}</span>
            </div>
          ))}
        </div>

        {/* Not legal advice disclaimer */}
        <div style={{ background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.1)', borderRadius: 10, padding: '14px 16px', marginBottom: 28 }}>
          <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: 'rgba(26,18,8,0.7)' }}>Important:</strong> SORTED is not a law firm and does not provide legal advice. We help you understand documents and your options. For anything involving court proceedings, always consult a qualified solicitor or legal aid service.
          </p>
        </div>

        {/* Contact */}
        <div style={{ textAlign: 'center', padding: '20px', background: '#1a1208', borderRadius: 14 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 10px' }}>Questions, feedback, press enquiries?</p>
          <a
            href="mailto:family@uf51.love"
            style={{ fontSize: 15, fontWeight: 800, color: '#d4760a', textDecoration: 'none' }}
          >
            family@uf51.love
          </a>
        </div>

        {/* Footer nav */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 28, flexWrap: 'nowrap' }}>
          {[
            { label: 'FAQ', href: '/SortedFAQ' },
            { label: 'Terms', href: '/SortedTerms' },
            { label: 'Privacy', href: '/SortedPrivacy' },
            { label: 'Global', href: '/SortedGlobalAccess' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{ fontSize: 11, fontWeight: 600, color: 'rgba(26,18,8,0.4)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{label}</a>
          ))}
        </div>

      </div>
    </div>
  );
}