import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { COLOR, FONT } from '@/components/family51/sortedDesignSystem';

const { gold: GOLD, ink: INK, paper: PAPER, muted: MUTED, border: BORDER } = COLOR;

// SORTED — Investor & Partner Brief (ESG)
// Restyled to the SORTED paper system — one app, one feel.

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
    addText('Access to Justice at the Price of a Coffee', 14, true, [198, 153, 92], 8);
    addText('The problem: 5.1 billion people have unmet justice needs.\nThe solution: AI-powered legal clarity — subscription-funded, data-sovereign, live.\nThe market: £9.99/month × millions of users = infinite scale with zero marginal cost.', 11, false, [100, 100, 100], 12);

    addText('PRODUCT FACTS', 9, true, [198, 153, 92], 3);
    addText('• 10 free uses — no card required\n• £9.99/month subscription (Stripe, live payment mode)\n• Decode letters, write replies, resolve disputes\n• Works in any language, any jurisdiction\n• Document content: processed in memory, never stored\n• No AI training on user data\n• Zero server liability exposure', 10, false, [80, 80, 80], 12);

    addText('FINANCIAL MODEL', 9, true, [198, 153, 92], 3);
    addText('Revenue: £9.99/month subscription\nMarginal cost: Near zero (serverless)\nInfrastructure: Scales to millions on existing architecture\nData liability: Zero — nothing stored\nB2B pathway: White-label for banks, insurers, HR platforms', 10, false, [80, 80, 80], 12);

    addText('TRACTION', 9, true, [198, 153, 92], 3);
    addText('• Live globally — no waitlist\n• Stripe integration live in production\n• Jurisdiction detection: 20+ territories\n• Community Interest Company in formation\n• Platform: SORTED + PetSounds51 + CB51 + Learn51', 10, false, [80, 80, 80], 12);

    addText('CONTACT', 9, true, [198, 153, 92], 3);
    addText('family@uf51.love\nuf51.love/Sorted', 11, false, [80, 80, 80], 0);

    doc.save('SORTED-Investor-Brief.pdf');
    setSaving(false);
  };

  const bodyStyle = { fontSize: 15, color: MUTED, margin: 0, lineHeight: 1.75 };

  return (
    <div style={{ minHeight: '100dvh', background: PAPER, color: INK, fontFamily: FONT.family, WebkitFontSmoothing: 'antialiased' }}>
      <div id="pr-body" style={{ maxWidth: 640, margin: '0 auto', padding: '8px 20px 64px' }}>

        {/* ACTION BAR */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginBottom: 24 }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', color: GOLD, background: `${GOLD}0d`, border: `1px solid ${GOLD}40`, borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}>
            {saving ? 'Saving…' : '↓ PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', color: copied ? '#16a34a' : GOLD, background: copied ? 'rgba(22,163,74,0.08)' : `${GOLD}0d`, border: `1px solid ${copied ? 'rgba(22,163,74,0.3)' : `${GOLD}40`}`, borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </motion.button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {/* EYEBROW */}
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: GOLD, textTransform: 'uppercase', marginBottom: 12 }}>
            Investor &amp; Partner Brief · ESG aligned · Live product
          </div>

          {/* HERO */}
          <h1 style={{ fontSize: 'clamp(26px, 6vw, 40px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 16px', color: INK }}>
            Access to Justice<br />
            <span style={{ color: GOLD }}>at the price of a coffee</span>
          </h1>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7, margin: 0, borderLeft: `3px solid ${GOLD}55`, paddingLeft: 14 }}>
            5.1 billion people can't understand their legal letters. SORTED decodes them in seconds. Subscription-funded. Data-sovereign. Live.
          </p>

          <div style={{ height: 1, background: BORDER, margin: '28px 0' }} />

          {/* QUICK STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 32 }}>
            {[
              { value: '5.1B', label: 'Unmet justice needs' },
              { value: '£9.99', label: 'Monthly subscription' },
              { value: '10 FREE', label: 'Uses — no card' },
            ].map(({ value, label }) => (
              <div key={value} style={{ padding: '18px 12px', background: `${GOLD}08`, border: `1px solid ${GOLD}22`, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* PRODUCT */}
          <Section label="Product">
            <p style={bodyStyle}>Decode any legal letter, write professional replies, get dispute guidance. Works in any language, any jurisdiction. Ten free uses before £9.99/month paywall. Live globally, no waitlist.</p>
          </Section>

          {/* DATA SOVEREIGNTY */}
          <Section label="Data sovereignty is the moat">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Document content: processed in memory — never stored',
                'Never used to train any AI model',
                'Zero server storage liability',
                'Stripe handles payments only — not UF51',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  <span style={{ color: '#16a34a', fontSize: 14, flexShrink: 0, lineHeight: 1.6 }}>✓</span>
                  <span style={{ fontSize: 14, color: INK, lineHeight: 1.55 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* FINANCIALS */}
          <Section label="Financials">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ['Revenue', '£9.99/month Stripe'],
                ['Marginal cost', 'Near zero'],
                ['Scale', 'Serverless — infinite'],
                ['Paywall', '10 free uses'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '14px 16px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: MUTED, marginBottom: 4, letterSpacing: '0.06em' }}>{k.toUpperCase()}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>{v}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* TRACTION */}
          <Section label="Traction">
            <ul style={{ ...bodyStyle, margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Live globally — Stripe production mode</li>
              <li>Jurisdiction detection: 20+ territories</li>
              <li>Part of Universal Frequency 51 platform</li>
              <li>Community Interest Company in formation</li>
            </ul>
          </Section>

          <div style={{ height: 1, background: BORDER, margin: '28px 0' }} />

          {/* CONTACT */}
          <div style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}30`, borderRadius: 14, padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: MUTED, marginBottom: 14 }}>GET IN TOUCH</div>
            <a href="mailto:family@uf51.love?subject=SORTED — Investor Enquiry"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: INK, color: GOLD, fontWeight: 800, fontSize: 14, letterSpacing: '0.04em', borderRadius: 10, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 12, fontSize: 13, color: MUTED }}>
              Live at <a href="https://uf51.love/Sorted" style={{ color: GOLD, textDecoration: 'none' }}>uf51.love/Sorted</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: GOLD, marginBottom: 12 }}>{label.toUpperCase()}</div>
      <div>{children}</div>
    </div>
  );
}