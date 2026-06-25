import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Commercial Partner Brief
// Facts. Numbers. Markets. No bullshit.

export default function GraemeOnePager() {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('graeme-body')?.innerText || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePDF = () => {
    setSaving(true);
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 18;
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

    const divider = () => {
      doc.setDrawColor(225, 220, 210);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;
    };

    // HEADER
    addText('UF51', 22, true, [40, 35, 30], 1);
    addText('COMMERCIAL PARTNER BRIEF — JUNE 2026', 7, true, [160, 150, 135], 6);

    // SUMMARY
    addText('Three products. Built and live. Need a partner.', 15, true, [40, 35, 30], 2);
    addText('I built three products. Two take payments. None have subscribers yet — because I am a builder, not a salesman. You bring the channels, I bring the products. 50/50.', 9, false, [80, 70, 60], 4);
    addText('KEY FACTS:  3 products live  |  2 Stripe-ready  |  £0 subscribers — yet', 9, true, [30, 138, 78], 6);

    divider();

    // THREE PRODUCTS
    addText('1. PETSOUNDS51 — Animal Acoustic Therapy', 11, true, [180, 130, 20], 2);
    addText('Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis on published veterinary neuroscience. Market: $259B pet care. Price: £29.99/year.', 9, false, [80, 70, 60], 2);
    addText('Why it wins: Species-specific real-time frequency synthesis in the browser. Competitors use pre-recorded playlists.', 8, true, [120, 100, 80], 4);

    addText('2. SORTED — Access to Justice AI', 11, true, [200, 100, 10], 2);
    addText('AI decodes any legal letter into plain language, writes replies, guides disputes. Documents processed in memory — never stored. Market: $849B legal services. Price: £9.99/month.', 9, false, [80, 70, 60], 2);
    addText('Why it wins: Zero data storage architecture. Competitors store documents and create liability.', 8, true, [120, 100, 80], 4);

    addText('3. EARTH51 — Verified ESG Impact', 11, true, [30, 150, 80], 2);
    addText('Kids photograph litter they collect. AI verifies it (fraud detection, weight estimation). Every pickup generates verified, reportable ESG data. Market: $1.3T environmental services. B2B: councils, brands, schools.', 9, false, [80, 70, 60], 2);
    addText('Why it wins: AI-verified impact data with fraud detection, COPPA compliant.', 8, true, [120, 100, 80], 4);

    divider();

    // THE DEAL
    addText('THE OFFER', 10, true, [180, 130, 20], 3);
    addText('50% of the new company. £40K. Paid over 6 months.', 12, true, [40, 35, 30], 3);
    addText('You own half. I own half. You bring the distribution, I keep building. Both of us have skin in the game from day one — £20K in months 1–3, £20K in months 4–6, then revenue flows through your channels.', 9, false, [80, 70, 60], 3);
    addText('10% of all revenue goes to the CIC. New company incorporated clean and separate. Straightforward terms, no hidden clauses.', 9, false, [80, 70, 60], 6);

    divider();

    addText('Brian Hughes — family@uf51.love', 11, true, [40, 35, 30], 1);
    addText('Glasgow, Scotland · uf51.love · CIC formed · New company to be incorporated', 8, false, [120, 110, 95], 0);

    doc.save('UF51-Partner-Brief-June-2026.pdf');
    setSaving(false);
  };

  const products = [
    {
      name: 'PetSounds51',
      tagline: 'Animal Acoustic Therapy',
      color: '#b8860b',
      desc: 'Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis on published veterinary neuroscience — no app, no hardware, works offline.',
      market: '$259B pet care · 6.1% CAGR',
      price: '£29.99/year',
      target: '100K subscribers = £3M/year',
      b2b: 'Vets, insurers, pet brands',
      moat: 'Species-specific real-time frequency synthesis in the browser. Competitors use pre-recorded playlists.',
    },
    {
      name: 'SORTED',
      tagline: 'Access to Justice AI',
      color: '#c47200',
      desc: 'AI decodes any legal letter into plain language, writes replies, guides disputes. Any language, any jurisdiction. Documents processed in memory — never stored.',
      market: '$849B legal · $25B legal tech',
      price: '£9.99/month',
      target: '50K subscribers = £6M/year',
      b2b: 'Banks, insurers, councils, housing',
      moat: 'Zero data storage architecture. Competitors store documents and create liability.',
    },
    {
      name: 'Earth51',
      tagline: 'Verified ESG Impact',
      color: '#1e8a4e',
      desc: 'Kids photograph litter they collect. AI verifies it (fraud detection, weight estimation). Every pickup generates verified, reportable ESG data.',
      market: '$1.3T env services · $30B+ ESG',
      price: 'B2B contracts',
      target: '50 councils + brands = £1M+ yr 1',
      b2b: 'Councils, brands, schools, supermarkets',
      moat: 'AI-verified impact data with fraud detection, COPPA compliant.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a2520', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em', color: '#2a2520' }}>UF51</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: '#a09588' }}>PARTNER BRIEF</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#fff', background: '#2a2520', border: '1px solid #2a2520', borderRadius: 6, padding: '9px 20px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: copied ? '#1e8a4e' : '#6b6055', background: copied ? 'rgba(30,138,78,0.08)' : 'rgba(0,0,0,0.03)', border: `1px solid ${copied ? 'rgba(30,138,78,0.2)' : 'rgba(0,0,0,0.08)'}`, borderRadius: 6, padding: '9px 20px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=UF51 Partnership"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#6b6055', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 6, padding: '9px 20px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            CONTACT
          </a>
        </div>
      </header>

      <div id="graeme-body" style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO — 3 punchy lines, no wall of text */}
          <div style={{ marginBottom: 44 }}>
            <h1 style={{ fontSize: 'clamp(30px, 6vw, 46px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.035em', margin: '0 0 14px', color: '#2a2520' }}>
              Three products.<br />
              <span style={{ color: '#b8860b' }}>Built and live.</span><br />
              Need a partner.
            </h1>
            <p style={{ fontSize: 15, color: '#6b6055', lineHeight: 1.6, margin: 0 }}>
              I built three products. Two take payments. None have subscribers yet — because I'm a builder, not a salesman. <strong style={{ color: '#2a2520' }}>You bring the channels, I bring the products. 50/50.</strong>
            </p>
          </div>

          {/* KEY FACTS — kept tight */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 44 }}>
            {[
              { stat: '3', label: 'Products live' },
              { stat: '2', label: 'Stripe-ready' },
              { stat: '£0', label: 'Subscribers — yet' },
            ].map((f, i) => (
              <div key={i} style={{ padding: '14px 10px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#2a2520', letterSpacing: '-0.02em', marginBottom: 2 }}>{f.stat}</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: '#8a7d6f', textTransform: 'uppercase', lineHeight: 1.3 }}>{f.label}</div>
              </div>
            ))}
          </div>

          {/* THREE PRODUCTS — simplified, punchy */}
          <div style={{ marginBottom: 44 }}>
            {products.map((p, idx) => (
              <div key={p.name} style={{ marginBottom: 14, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 19, fontWeight: 900, color: p.color, letterSpacing: '-0.02em' }}>{p.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#a09588' }}>{p.tagline.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.55, margin: '0 0 12px' }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: p.color, background: 'rgba(184,134,11,0.06)', padding: '4px 10px', borderRadius: 6 }}>{p.market}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#2a2520', background: 'rgba(0,0,0,0.04)', padding: '4px 10px', borderRadius: 6 }}>{p.price}</span>
                </div>
                <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                  <strong style={{ color: '#2a2520', fontStyle: 'normal' }}>Why it wins:</strong> {p.moat}
                </p>
              </div>
            ))}
          </div>

          {/* THE DEAL — one clean section, no repetition */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ padding: '24px 26px', background: 'rgba(184,134,11,0.06)', border: '1px solid rgba(184,134,11,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#b8860b', marginBottom: 12 }}>THE OFFER</div>
              <div style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: 900, color: '#2a2520', letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.1 }}>
                50% of the new company.<br />£40K. Paid over 6 months.
              </div>
              <p style={{ fontSize: 14, color: '#6b6055', lineHeight: 1.6, margin: '0 0 16px' }}>
                You own half. I own half. You bring the distribution, I keep building. Both of us have skin in the game from day one — <strong style={{ color: '#2a2520' }}>£20K in months 1–3, £20K in months 4–6</strong>, then revenue flows through your channels.
              </p>
              <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.5, margin: 0 }}>
                10% of all revenue goes to the CIC. New company incorporated clean and separate. Straightforward terms, no hidden clauses.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div style={{ textAlign: 'left', padding: '8px 0' }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em', color: '#2a2520' }}>Brian Hughes</h2>
            <p style={{ fontSize: 12, color: '#a09588', margin: '0 0 16px', lineHeight: 1.6 }}>
              Glasgow, Scotland · CIC formed · New company to be incorporated for this partnership
            </p>
            <a href="mailto:family@uf51.love?subject=UF51 Partnership"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#2a2520', color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', borderRadius: 8, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 14, fontSize: 11, color: '#c9bca8' }}>
              Live at <a href="https://uf51.love" style={{ color: '#b8860b', textDecoration: 'none' }}>uf51.love</a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

function UF51Icon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <path d="M8 15 L11 15 L12.5 9 L14 21 L15.5 11 L17 19 L18.5 13 L20 17 L22 15" stroke="#b8860b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}