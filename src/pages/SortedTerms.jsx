import React, { useState } from 'react';

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 24, borderBottom: '1px solid rgba(245,166,35,0.15)', paddingBottom: 24 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? 10 : 0 }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: '#c47f0a' }}>{title}</span>
        <span style={{ fontSize: 18, color: '#f5a623', lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(26,18,8,0.68)', margin: 0 }}>{children}</p>}
    </div>
  );
};

export default function SortedTermsPage() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 580, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.5px' }}>SORTED</span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#f5a623', background: 'rgba(245,166,35,0.12)', padding: '3px 8px', borderRadius: 4 }}>TERMS</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.38)', margin: 0 }}>Last updated: May 2026 · Universal Frequency 51 CIC · Scotland, UK</p>
      </div>

      {/* TL;DR */}
      <div style={{ background: '#1a1208', borderRadius: 12, padding: '18px 20px', marginBottom: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: '#f5a623', margin: '0 0 10px', textTransform: 'uppercase' }}>TL;DR</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            "We decode scary letters into plain English. We're not lawyers.",
            "You decide what to do. We just help you understand.",
            "3 free uses. Then £9.99/month or walk away — no guilt, no lock-in.",
            "If you can't afford it, email us. We'll sort something.",
            "We never store your documents. Ever.",
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#f5a623', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Intro */}
      <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: 10, padding: '16px 18px', marginBottom: 32 }}>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(26,18,8,0.6)', margin: 0 }}>
          The full version is below — plain English, no legalese. If something doesn't make sense, email us.
        </p>
      </div>

      <Section title="1. What SORTED Is">
        SORTED is an AI-powered document decoder — not a law firm. We translate complex letters into plain English and suggest possible next steps. Think of us as a brilliant, well-read friend who helps you understand what something means. For serious legal matters, also speak to a qualified professional in your country.
      </Section>

      <Section title="2. Not Legal Advice">
        SORTED's output is information, not legal advice. It doesn't replace a solicitor, lawyer, or legal professional. For anything involving court, significant debt, or complex disputes — use SORTED to understand your situation, then seek qualified help. The decisions are always yours.
      </Section>

      <Section title="3. Accuracy">
        AI is powerful but not perfect. Laws vary by country and circumstance. SORTED does its best — but always verify key facts before acting, especially in financial or legal situations. We're honest when something is uncertain.
      </Section>

      <Section title="4. Free Sessions, Then You Choose">
        You get 3 free uses to start. After that, subscribe or walk away — no lock-in, no dark patterns. If you're genuinely struggling financially, email us at <a href="mailto:family@uf51.love" style={{ color: '#f5a623', fontWeight: 600, textDecoration: 'none' }}>family@uf51.love</a> and we'll sort something.
      </Section>

      <Section title="5. Cancelling Your Subscription">
        Cancel anytime — no questions, no fees, no dark patterns. You keep access until the end of your billing period. To cancel, email <a href="mailto:family@uf51.love" style={{ color: '#f5a623', fontWeight: 600, textDecoration: 'none' }}>family@uf51.love</a> or cancel directly through your payment settings. EU and UK users: you have a 14-day cooling-off right on new subscriptions under consumer law.
      </Section>

      <Section title="6. Our Liability">
        SORTED is provided as a helpful service. To the extent permitted by applicable law, Universal Frequency 51 CIC is not liable for decisions made based on SORTED's output in complex legal situations we haven't been fully briefed on. This isn't coldness — it's honesty about what an AI decoder can and can't do.
      </Section>

      <Section title="7. Global Users">
        SORTED works in 100+ countries. We try to give you advice relevant to your local law, but we're a Scottish CIC — not a multi-jurisdictional law firm. Always verify local specifics with a qualified professional in your country. Your local consumer protection rights always apply and are never overridden by these terms.
      </Section>

      <Section title="8. Governing Law">
        These terms are governed by Scots law (Scotland, UK). EU users: your rights under EU consumer law fully apply. Nothing here removes rights you have under your own country's laws — including statutory cooling-off periods, distance selling regulations, or consumer protection statutes.
      </Section>

      <Section title="9. Changes">
        If we update these terms meaningfully, we'll update the date above. We'll never change our core commitments: no data harvesting, no selling your info, no dark patterns. Ever.
      </Section>

      <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(245,166,35,0.2)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.45)', margin: 0 }}>
          Questions? <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a>
        </p>
        <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.3)', margin: 0 }}>
          Universal Frequency 51 CIC — built to help people, not harvest them. ♾️
        </p>
      </div>
    </div>
  );
}