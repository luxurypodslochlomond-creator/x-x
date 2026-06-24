import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Partner One-Pager for Graeme / TV Ad Company
// Three products. One page. Facts only. PDF download.

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

    const divider = (color = [200, 200, 200]) => {
      doc.setDrawColor(...color);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;
    };

    // HEADER
    addText('UNIVERSAL FREQUENCY 51 — PARTNER BRIEF', 8, true, [120, 120, 120], 2);
    addText('Three Products. One Mission. Live Now.', 18, true, [20, 20, 20], 3);
    addText('Prepared for Graeme / TV Ad Partnership — June 2026', 9, false, [140, 140, 140], 6);

    // INTRO
    addText('WHO WE ARE', 9, true, [212, 160, 23], 3);
    addText('UF51 is a Glasgow-based Community Interest Company building technology that heals. Three products are live, subscription-funded, and sitting in massive underserved markets. Each is data-sovereign, browser-native, and built for global scale from day one.', 10, false, [60, 60, 60], 6);

    divider();

    // 1. PETSOUNDS51
    addText('1. PETSOUNDS51 — Animal Acoustic Therapy', 13, true, [212, 160, 23], 3);
    addText('THE MARKET:', 9, true, [120, 120, 120], 2);
    addText('• Global pet care market: $259 billion (2025), 6.1% CAGR\n• Animal anxiety treatment market: $2B+ and growing\n• 70%+ of dogs exhibit anxiety-related behaviours\n• 67% of UK households own a pet\n• Vet anxiety prescriptions up 300%+ in a decade\n• Average UK pet owner spends £1,000+/year\n• Our price: £29.99/year — impulse territory', 9, false, [60, 60, 60], 4);
    addText('THE PRODUCT: Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis — no app, no hardware, no prescription. Works offline. Built on published veterinary neuroscience. Live and generating revenue.', 9, false, [60, 60, 60], 4);
    addText('B2B: Vet surgeries, pet insurers, animal shelters, pet care brands. Licensing model ready.', 9, false, [60, 60, 60], 6);

    divider([212, 160, 23]);

    // 2. SORTED
    addText('2. SORTED — Access to Justice AI', 13, true, [217, 119, 6], 3);
    addText('THE MARKET:', 9, true, [120, 120, 120], 2);
    addText('• 5.1 billion people globally have unmet justice needs (OECD/UN)\n• UK legal aid budget cut 46% since 2010 — millions priced out\n• 1 in 3 adults face a civil justice problem each year\n• Global legal services market: $849 billion\n• Legal tech market: $25B+, growing 8.9% CAGR\n• Our price: £9.99/month — less than a coffee\n• 5 free uses before paywall — no barrier to entry', 9, false, [60, 60, 60], 4);
    addText('THE PRODUCT: AI that decodes any legal letter into plain language, writes professional replies, and guides dispute resolution. Works in any language, any jurisdiction. Documents processed in memory — never stored. Zero data liability. Live globally.', 9, false, [60, 60, 60], 4);
    addText('B2B: White-label for banks, insurers, HR platforms, housing associations, local councils.', 9, false, [60, 60, 60], 6);

    divider([217, 119, 6]);

    // 3. EARTH51
    addText('3. EARTH51 — Kids Litter Picking + Verified Rewards', 13, true, [34, 197, 94], 3);
    addText('THE MARKET:', 9, true, [120, 120, 120], 2);
    addText('• UK local authorities spend £1B+/year on street cleansing\n• Global environmental services market: $1.3 trillion\n• 2.24 billion tonnes of CO2 equivalent from waste annually\n• 80% of plastic in oceans comes from land-based litter\n• 10M+ tonnes of litter dropped in the UK each year\n• Schools, councils, and brands all need verified, gamified impact data\n• ESG/CSR spend: $30B+ globally and rising', 9, false, [60, 60, 60], 4);
    addText('THE PRODUCT: Kids photograph litter they pick up. AI verifies the photo (fraud detection + weight estimation). They earn verified P51 tokens — exchangeable for rewards (chocolate bars, badges, real currency). Tested with real kids picking up real litter outdoors. Gamified, privacy-first, parent-controlled. No data harvesting — COPPA compliant.', 9, false, [60, 60, 60], 4);
    addText('B2B: Councils (verified cleansing data), brands (CSR/ESG sponsorship), schools (citizenship curriculum), supermarkets (community engagement).', 9, false, [60, 60, 60], 6);

    divider([34, 197, 94]);

    // WHY NOW
    addText('WHY NOW', 11, true, [20, 20, 20], 3);
    addText('All three products are LIVE — not concepts, not prototypes. Subscription revenue is flowing via Stripe (production mode). The TV ad company partnership comes at the exact moment these markets are converging: pet wellness is exploding, access to justice is in crisis, and environmental action is a mandated corporate priority. UF51 owns the intersection.', 10, false, [50, 50, 50], 6);

    addText('CONTACT', 9, true, [120, 120, 120], 3);
    addText('Brian Hughes — family@uf51.love\nuf51.love — Glasgow, Scotland\nCommunity Interest Company (CIC) in formation', 11, false, [60, 60, 60], 0);

    doc.save('UF51-Partner-OnePager-June-2026.pdf');
    setSaving(false);
  };

  const products = [
    {
      name: 'PetSounds51',
      tagline: 'Animal Acoustic Therapy',
      color: '#d4a017',
      bg: 'rgba(212,160,23,0.06)',
      border: 'rgba(212,160,23,0.25)',
      market: [
        { value: '$259B', label: 'Global pet care market (2025)' },
        { value: '6.1%', label: 'CAGR — pet care growth' },
        { value: '$2B+', label: 'Animal anxiety treatment' },
        { value: '70%+', label: 'Dogs show anxiety behaviours' },
        { value: '67%', label: 'UK households own a pet' },
        { value: '£29.99', label: 'Annual subscription — impulse price' },
      ],
      product: 'Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis — no app, no hardware, no prescription. Works offline. Built on published veterinary neuroscience.',
      b2b: 'Vet surgeries, pet insurers, animal shelters, pet care brands',
    },
    {
      name: 'SORTED',
      tagline: 'Access to Justice AI',
      color: '#d97306',
      bg: 'rgba(217,119,6,0.06)',
      border: 'rgba(217,119,6,0.25)',
      market: [
        { value: '5.1B', label: 'People with unmet justice needs' },
        { value: '$849B', label: 'Global legal services market' },
        { value: '$25B', label: 'Legal tech market (8.9% CAGR)' },
        { value: '46%', label: 'UK legal aid cut since 2010' },
        { value: '1 in 3', label: 'Adults face civil justice issues/yr' },
        { value: '£9.99', label: 'Monthly subscription — coffee price' },
      ],
      product: 'AI decodes any legal letter into plain language, writes professional replies, guides dispute resolution. Any language, any jurisdiction. Documents processed in memory — never stored. Zero data liability.',
      b2b: 'Banks, insurers, HR platforms, housing associations, councils',
    },
    {
      name: 'Earth51',
      tagline: 'Kids Litter Picking + Verified Rewards',
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.05)',
      border: 'rgba(34,197,94,0.22)',
      market: [
        { value: '£1B+', label: 'UK street cleansing spend/year' },
        { value: '$1.3T', label: 'Global environmental services' },
        { value: '$30B+', label: 'Global ESG/CSR spend' },
        { value: '10M t', label: 'Litter dropped in UK annually' },
        { value: '80%', label: 'Ocean plastic from land sources' },
        { value: 'P51', label: 'Verified tokens → real rewards' },
      ],
      product: 'Kids photograph litter they collect. AI verifies the photo (fraud detection + weight estimation). They earn verified P51 tokens — exchangeable for chocolate bars, badges, real currency. Tested with real kids outdoors. Privacy-first, COPPA compliant, parent-controlled.',
      b2b: 'Councils, brands (CSR/ESG), schools, supermarkets',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', color: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,8,15,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900 }}>UF51</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)' }}>PARTNER ONE-PAGER</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: '#000', background: '#fff', border: '1px solid #fff', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ DOWNLOAD PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: copied ? '#22c55e' : '#fff', background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY TEXT'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=UF51 Partnership — Graeme Introduction"
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '8px 16px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            CONTACT
          </a>
        </div>
      </header>

      {/* BANNER */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 20px', textAlign: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>PREPARED FOR GRAEME / TV AD PARTNERSHIP — JUNE 2026 — ALL PRODUCTS LIVE</span>
      </div>

      <div id="graeme-body" style={{ maxWidth: 820, margin: '0 auto', padding: '48px 20px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {['LIVE PRODUCTS', 'SUBSCRIPTION REVENUE', 'CIC FORMING', 'DATA SOVEREIGN', 'GLOBAL SCALE'].map(t => (
                <span key={t} style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '3px 8px' }}>{t}</span>
              ))}
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 46px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              Three products.<br />
              <span style={{ color: '#d4a017' }}>Three massive markets.</span><br />
              One platform.
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0, maxWidth: 640, borderLeft: '3px solid rgba(255,255,255,0.1)', paddingLeft: 16 }}>
              UF51 builds technology that heals — animals, people, and the planet. All three products are live, subscription-funded, and sitting in trillion-dollar markets with no dominant player. This is the data Graeme asked for.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 48px' }} />

          {/* THREE PRODUCT CARDS */}
          {products.map((p, idx) => (
            <div key={p.name} style={{ marginBottom: 44 }}>
              {/* Product header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: p.bg, border: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: p.color }}>{idx + 1}</span>
                </div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, color: p.color, lineHeight: 1.1 }}>{p.name}</h2>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{p.tagline.toUpperCase()}</div>
                </div>
              </div>

              {/* Market stats */}
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>THE MARKET</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, marginBottom: 16 }}>
                {p.market.map(({ value, label }) => (
                  <div key={value} style={{ padding: '12px 12px', background: p.bg, border: `1px solid ${p.border}`, borderRadius: 8 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: p.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 5, lineHeight: 1.3 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Product description */}
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>THE PRODUCT</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 14px', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                {p.product}
              </p>

              {/* B2B */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: p.bg, border: `1px solid ${p.border}`, borderRadius: 8 }}>
                <span style={{ color: p.color, fontSize: 12, flexShrink: 0, fontWeight: 800 }}>B2B →</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{p.b2b}</span>
              </div>
            </div>
          ))}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 36px' }} />

          {/* WHY NOW */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: '#fff', marginBottom: 12 }}>WHY NOW</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: 0, padding: '18px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              All three products are <strong style={{ color: '#fff' }}>LIVE</strong> — not concepts, not prototypes. Subscription revenue is flowing via Stripe (production mode). Pet wellness is exploding, access to justice is in crisis, and environmental action is a mandated corporate priority. UF51 owns the intersection. The TV ad partnership arrives at the exact moment these markets converge.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 36px' }} />

          {/* CONTACT */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>LET'S TALK</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 10px' }}>Brian Hughes</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 20px' }}>Glasgow, Scotland · Community Interest Company (CIC) in formation</p>
            <a href="mailto:family@uf51.love?subject=UF51 Partnership — Graeme Introduction"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#fff', color: '#000', fontWeight: 900, fontSize: 13, letterSpacing: '0.06em', borderRadius: 10, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              Live at <a href="https://uf51.love" style={{ color: '#d4a017', textDecoration: 'none' }}>uf51.love</a>
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
      <circle cx="15" cy="15" r="13" stroke="#d4a017" strokeWidth="1.5" fill="none" />
      <path d="M8 15 L11 15 L12.5 9 L14 21 L15.5 11 L17 19 L18.5 13 L20 17 L22 15" stroke="#d4a017" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}