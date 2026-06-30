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
      {open && <div style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(26,18,8,0.68)' }}>{children}</div>}
    </div>
  );
};

const NeverItem = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
    <span style={{ color: '#e63', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
    <span style={{ fontSize: 14, color: 'rgba(26,18,8,0.68)' }}>{text}</span>
  </div>
);

export default function SortedPrivacy() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 580, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.5px' }}>SORTED</span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#f5a623', background: 'rgba(245,166,35,0.12)', padding: '3px 8px', borderRadius: 4 }}>PRIVACY</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.38)', margin: 0 }}>Last updated: May 2026 · Universal Frequency 51 CIC · Scotland, UK</p>
      </div>

      {/* TL;DR */}
      <div style={{ background: '#1a1208', borderRadius: 12, padding: '18px 20px', marginBottom: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: '#f5a623', margin: '0 0 10px', textTransform: 'uppercase' }}>TL;DR</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            "Files uploaded for analysis — your vault stays private to you.",
            "No login required. No tracking cookies. No selling your data.",
            "We never sell your data. To anyone. Ever.",
            "Delete your vault or your server data anytime — it's yours.",
            "You're covered under UK GDPR, EU GDPR, and CCPA.",
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#f5a623', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Big statement */}
      <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: 10, padding: '16px 18px', marginBottom: 32 }}>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(26,18,8,0.6)', margin: 0 }}>
          Privacy isn't a legal checkbox for us — it's the whole point. We designed SORTED so trust stays in your hands — your vault is yours, your data is yours, and you can delete it whenever you choose. Full details below.
        </p>
      </div>

      <Section title="1. What We Collect">
        <p style={{ margin: '0 0 10px' }}><strong>Almost nothing.</strong> No name. No email. No location. No account required. Your document is sent securely to an AI model for analysis. The decoded result is saved to your private vault — on your device by default, and (if you subscribe) encrypted on our servers, accessible only to you. We don't keep copies of your original letters.</p>
        <p style={{ margin: 0 }}>If you subscribe, Stripe handles your payment. We receive confirmation a payment was made — not your card details. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>Stripe's privacy policy</a> applies to that transaction.</p>
      </Section>

      <Section title="2. How We Use AI">
        <p style={{ margin: '0 0 10px' }}>Your document is processed by a large language model (LLM) via encrypted HTTPS. Our AI provider's terms explicitly prohibit training on API-submitted data — your content is processed and immediately discarded, never retained.</p>
        <p style={{ margin: 0 }}>We may create fully anonymised pattern summaries — e.g. "a debt letter was submitted" — with zero names, amounts, dates, or identifying info. These cannot be traced back to you, and help us improve future advice quality.</p>
      </Section>

      <Section title="3. What We Never Do">
        <div style={{ marginTop: 4 }}>
          <NeverItem text="Keep copies of your original letters on our servers" />
          <NeverItem text="Sell, rent, or share your data with anyone" />
          <NeverItem text="Use your documents to train AI models" />
          <NeverItem text="Share your info with advertisers or marketers" />
          <NeverItem text="Require an account, login, or email address" />
          <NeverItem text="Use tracking cookies or advertising trackers" />
          <NeverItem text="Build a profile about you over time" />
        </div>
      </Section>

      <Section title="4. Your Control — Local Storage">
        <p style={{ margin: '0 0 10px' }}>If you save cases using the "My Cases" feature, the decoded results live in your private vault — on your device by default, and (if you subscribe) encrypted on our servers, accessible only to you. You own them completely, and can delete them anytime.</p>
        <p style={{ margin: 0 }}>Close the tab — your session is gone. Hit <strong>"Clear all my data"</strong> to wipe your local case history, or <strong>"Delete my server data"</strong> to wipe any saved cases from our servers. It's all yours to control.</p>
      </Section>

      <Section title="5. GDPR, UK & International Rights">
        <p style={{ margin: '0 0 10px' }}>SORTED is operated by Universal Frequency 51 CIC, Scotland, UK — subject to <strong>UK GDPR</strong> and the Data Protection Act 2018. Our privacy footprint is minimal by design.</p>
        <p style={{ margin: '0 0 10px' }}><strong>EU users:</strong> Your rights under EU GDPR fully apply — access, rectify, or erase any personal data we hold. In practice we hold almost none, but email us to confirm.</p>
        <p style={{ margin: '0 0 10px' }}><strong>California (USA):</strong> CCPA rights apply. We do not sell personal information. Ever.</p>
        <p style={{ margin: '0 0 10px' }}><strong>Global users (100+ countries):</strong> We designed SORTED for everyone, everywhere. The same privacy protections apply regardless of where you are. No data is retained. No profiling. No exceptions.</p>
        <p style={{ margin: 0 }}>Wherever you are — your data is yours. That's not a legal formality. That's how we built it.</p>
      </Section>

      <Section title="6. Data Transfers">
        When your document is processed, it may transit servers outside the UK or EU. This happens under appropriate safeguards (standard contractual clauses or equivalent). The AI provider does not retain your data under their API terms.
      </Section>

      <Section title="7. Children">
        SORTED is not directed at children under 13. We don't knowingly collect data from children. If a young person needs help with a letter, a parent or guardian should use the tool on their behalf.
      </Section>

      <Section title="8. Contact & Complaints">
        <p style={{ margin: '0 0 10px' }}>Questions? Email <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a> — a real person will reply.</p>
        <p style={{ margin: 0 }}>UK users can also contact the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>ICO (ico.org.uk)</a>. EU users can contact their national data protection authority.</p>
      </Section>

      <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(245,166,35,0.2)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.3)', margin: 0 }}>
          Universal Frequency 51 CIC — built to help people, not harvest them. ♾️❤️
        </p>
      </div>
    </div>
  );
}