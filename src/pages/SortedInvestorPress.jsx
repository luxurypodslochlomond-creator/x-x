import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// SORTED — Investor & Partner Brief
// Simple. Facts. No fluff.

export default function SortedInvestorPress() {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('pr-body')?.innerText || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePDF = () => {
    setSaving(true);
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 20;
    const pageWidth = 210;
    const usable = pageWidth - margin * 2;
    let y = margin;

    const addText = (text, size, bold, color, gap = 5) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, usable);
      lines.forEach(line => {
        if (y > 275) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += size * 0.4;
      });
      y += gap;
    };

    addText('SORTED — INVESTOR BRIEF', 9, true, [80, 80, 80], 2);
    addText('Access to Justice at the Price of a Coffee', 14, true, [249, 115, 22], 8);
    addText('The problem: 5.1 billion people have unmet justice needs.\nThe solution: AI-powered legal clarity — subscription-funded, data-sovereign, live.\nThe market: £9.99/month × millions of users = infinite scale with zero marginal cost.', 11, false, [100, 100, 100], 12);
    
    addText('PRODUCT FACTS', 9, true, [249, 115, 22], 3);
    addText('• 3 free uses — no card required\n• £9.99/month subscription (Stripe, live payment mode)\n• Decode letters, write replies, resolve disputes\n• Works in any language, any jurisdiction\n• Document content: processed in memory, never stored\n• No AI training on user data\n• Zero server liability exposure', 10, false, [80, 80, 80], 12);

    addText('FINANCIAL MODEL', 9, true, [249, 115, 22], 3);
    addText('Revenue: £9.99/month subscription\nMarginal cost: Near zero (serverless)\nInfrastructure: Scales to millions on existing architecture\nData liability: Zero — nothing stored\nB2B pathway: White-label for banks, insurers, HR platforms', 10, false, [80, 80, 80], 12);

    addText('TRACTION', 9, true, [249, 115, 22], 3);
    addText('• Live globally — no waitlist\n• Stripe integration live in production\n• Jurisdiction detection: 20+ territories\n• Community Interest Company in formation\n• Platform: SORTED + PetSounds51 + CB51 + Learn51', 10, false, [80, 80, 80], 12);

    addText('CONTACT', 9, true, [249, 115, 22], 3);
    addText('family@uf51.love\nProduct: uf51.love/Sorted\nPlatform: uf51.love', 11, false, [80, 80, 80], 0);

    doc.save('SORTED-Investor-Brief.pdf');
    setSaving(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', color: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,8,15,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(249,115,22,0.2)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SortedIcon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>INVESTOR BRIEF</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: 6, padding: '7px 14px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: copied ? '#22c55e' : '#f97316', background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.08)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(249,115,22,0.2)'}`, borderRadius: 6, padding: '7px 14px', cursor: 'pointer' }}>
            {copied ? '✓' : 'COPY'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=SORTED — Investor Enquiry"
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '7px 14px', textDecoration: 'none' }}>
            CONTACT
          </a>
        </div>
      </header>

      {/* CONFIDENTIAL BANNER */}
      <div style={{ background: 'rgba(249,115,22,0.06)', borderBottom: '1px solid rgba(249,115,22,0.1)', padding: '8px 20px', textAlign: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(249,115,22,0.6)' }}>APRIL 2026 — ESG ALIGNED — LIVE PRODUCT</span>
      </div>

      <div id="pr-body" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 20px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px', color: '#fff' }}>
              Access to Justice<br />
              <span style={{ color: '#f97316' }}>at the price of a coffee</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0, borderLeft: '3px solid rgba(249,115,22,0.4)', paddingLeft: 16 }}>
              5.1 billion people can't understand their legal letters. SORTED decodes them in seconds. Subscription-funded. Data-sovereign. Live.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '36px 0' }} />

          {/* QUICK STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
            {[
              { value: '5.1B', label: 'Unmet justice needs' },
              { value: '£9.99', label: 'Monthly subscription' },
              { value: '3 FREE', label: 'Uses — no card' },
            ].map(({ value, label }) => (
              <div key={value} style={{ padding: '16px 12px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.18)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#f97316', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* PRODUCT */}
          <Section label="PRODUCT">
            <p style={bodyStyle}>Decode any legal letter, write professional replies, get dispute guidance. Works in any language, any jurisdiction. Three free uses before £9.99/month paywall. Live globally, no waitlist.</p>
          </Section>

          {/* DATA SOVEREIGNTY */}
          <Section label="DATA SOVEREIGNTY IS THE MOAT">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Document content: processed in memory — never stored',
                'Never used to train any AI model',
                'Zero server storage liability',
                'Stripe handles payments only — not UF51',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <span style={{ color: '#22c55e', fontSize: 12, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* FINANCIALS */}
          <Section label="FINANCIALS">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Revenue', '£9.99/month Stripe'],
                ['Marginal cost', 'Near zero'],
                ['Scale', 'Serverless — infinite'],
                ['Paywall', '3 free uses'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4, letterSpacing: '0.06em' }}>{k.toUpperCase()}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{v}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* TRACTION */}
          <Section label="TRACTION">
            <ul style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Live globally — Stripe production mode</li>
              <li>Jurisdiction detection: 20+ territories</li>
              <li>Part of Universal Frequency 51 platform</li>
              <li>Community Interest Company in formation</li>
            </ul>
          </Section>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '36px 0' }} />

          {/* CONTACT */}
          <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>GET IN TOUCH</div>
            <a href="mailto:family@uf51.love?subject=SORTED — Investor Enquiry"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#f97316', color: '#000', fontWeight: 900, fontSize: 13, letterSpacing: '0.06em', borderRadius: 8, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              Live at <a href="https://uf51.love/Sorted" style={{ color: '#f97316', textDecoration: 'none' }}>uf51.love/Sorted</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const bodyStyle = { fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.8 };

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: '#f97316', marginBottom: 12 }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function SortedIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="7" width="24" height="18" rx="3" stroke="#f97316" strokeWidth="1.8" fill="none" />
      <path d="M9 13h12M9 17h8" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 5v4M15 4v5M21 5v4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}