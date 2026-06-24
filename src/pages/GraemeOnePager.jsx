import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Partner Brief
// One page. No graphs. No corporate deck energy.
// A letter to someone who's ready to build something real.

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
    addText('PARTNER BRIEF — JUNE 2026', 7, true, [160, 150, 135], 6);

    // HERO
    addText('Three products. Built and ready.', 15, true, [40, 35, 30], 2);
    addText('Looking for the person who will help them fly.', 11, false, [100, 90, 75], 4);
    addText('I build technology that heals — animals, people, the planet. Three products are in production — two are payment-ready via Stripe and Apple Pay, one needs work. No paying subscribers yet. I am honest about where I am: the tech is real, the markets are real, but I cannot finish and launch this alone. I need a partner. Not investment — a partner. Someone with the commercial reach I do not have.', 9, false, [80, 70, 60], 6);

    divider();

    // THREE PRODUCTS — compact
    addText('1. PETSOUNDS51 — Animal Acoustic Therapy', 11, true, [180, 130, 20], 2);
    addText('Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis on published veterinary neuroscience — no app, no hardware, works offline. Market: $259B pet care, 6.1% CAGR. Price: £29.99/year. Target: 100K subscribers = £3M/year. B2B: vets, insurers, pet brands.', 9, false, [80, 70, 60], 2);
    addText('Moat: Species-specific real-time frequency synthesis in the browser. Competitors use pre-recorded playlists. Nobody else does this.', 8, true, [120, 100, 80], 4);

    addText('2. SORTED — Access to Justice AI', 11, true, [200, 100, 10], 2);
    addText('AI decodes any legal letter into plain language, writes replies, guides disputes. Any language, any jurisdiction. Documents processed in memory — never stored. Market: $849B legal services, $25B legal tech. Price: £9.99/month. Target: 50K subscribers = £6M/year. B2B: banks, insurers, councils, housing associations.', 9, false, [80, 70, 60], 2);
    addText('Moat: Zero data storage architecture. Competitors store documents and create liability. We never touch them. That is the defensible layer.', 8, true, [120, 100, 80], 4);

    addText('3. EARTH51 — Verified ESG Impact', 11, true, [30, 150, 80], 2);
    addText('Kids photograph litter they collect. AI verifies it (fraud detection, weight estimation). They earn tokens for rewards. Every pickup generates verified, reportable ESG data. Market: $1.3T environmental services, $30B+ ESG spend (mandated). Target: 50 councils + brand sponsors = £1M+ year one. B2B: councils, brands, schools, supermarkets.', 9, false, [80, 70, 60], 2);
    addText('Moat: The verification layer, not the litter picking. AI-verified impact data with fraud detection, COPPA compliant. No competitor combines gamified collection + verified ESG reporting + child-safe data.', 8, true, [120, 100, 80], 4);

    divider();

    // WHY NOW
    addText('WHY NOW', 10, true, [40, 35, 30], 2);
    addText('All three products are BUILT — not concepts. Two are payment-ready. Earth51 needs refinement before launch. Pet wellness is exploding. Access to justice is in crisis. Environmental action is a mandated corporate priority. UF51 owns the intersection. The right partner accelerates at the exact moment these markets converge.', 9, false, [80, 70, 60], 6);

    divider();

    // THE DEAL
    addText('THE DEAL — £40K OVER 6 MONTHS', 10, true, [180, 130, 20], 3);
    addText('Month 1: £20K upfront — runway to finalize products and prepare for market entry through your channels.', 9, false, [80, 70, 60], 2);
    addText('Month 3: £20K — after first milestone. Products market-ready, first subscribers coming through your channels.', 9, false, [80, 70, 60], 2);
    addText('Month 6: Products live. Revenue flowing. Equal partnership proven.', 9, false, [80, 70, 60], 4);
    addText('This is runway, not a salary. I have invested years of unpaid time and personal funds into these products. The £40K lets me focus 100% for 3 months, with your input shaping the commercial direction. After that, products go through your channels and we both win. 10% of all revenue goes to our Community Interest Company — formed and registered. A new company will be incorporated for this partnership, clean and separate.', 9, false, [80, 70, 60], 6);

    divider();

    // THE HONEST CLOSE
    addText('WHY THIS, WHY YOU', 10, true, [40, 35, 30], 2);
    addText('This is not a pitch to one person. I am looking for a serious commercial partner — someone who has the distribution, the relationships, and the conviction to help get these products to market. Someone who sees what I see and is ready to build something real, not just advise.', 9, false, [80, 70, 60], 3);
    addText('I am a dad in Glasgow. This morning I was picking up litter with Georgie, then taking her to football. That is not a pitch line — that is Earth51. That is the mission, lived, with my kids. I have three products in production, live payment infrastructure, and a mission I will not compromise on. What I do not have is the commercial reach to get these finished and into the world. That is the gap. That is why I am asking.', 9, false, [80, 70, 60], 3);
    addText('This is not a vendor deal. It is not an investment pitch. It is an equal partnership — your commercial expertise and distribution, my built products and mission. £40K of fair runway, 3 months to get market-ready, then products go through your channels and revenue flows. No egos, no hidden terms. Two people deciding if this makes sense.', 9, false, [80, 70, 60], 6);

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
      moat: 'Species-specific real-time frequency synthesis in the browser. Competitors use pre-recorded playlists. Nobody else does this.',
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
      moat: 'Zero data storage architecture. Competitors store documents and create liability. We never touch them.',
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
      moat: 'The verification layer, not the litter picking. AI-verified impact data with fraud detection, COPPA compliant.',
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

      <div id="graeme-body" style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 44px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.035em', margin: '0 0 20px', color: '#2a2520' }}>
              Three products.<br />
              <span style={{ color: '#b8860b' }}>Not finished.</span><br />
              Not ready to fly alone.
            </h1>
            <p style={{ fontSize: 15, color: '#6b6055', lineHeight: 1.75, margin: 0, maxWidth: 580, borderLeft: '3px solid rgba(184,134,11,0.3)', paddingLeft: 18 }}>
              I build technology that heals — animals, people, the planet. Three products are in production — two are payment-ready via Stripe and Apple Pay, one needs work. No paying subscribers yet. I am honest about where I am: the tech is real, the markets are real, but I cannot finish and launch this alone. <strong style={{ color: '#2a2520' }}>I need a partner.</strong> Not investment — a partner. Someone with the commercial reach I do not have.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* THREE PRODUCTS — clean, compact */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#a09588', marginBottom: 20 }}>THE PRODUCTS</div>
            {products.map((p, idx) => (
              <div key={p.name} style={{ marginBottom: 24, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: 9, fontWeight: 800, color: '#c9bca8', marginRight: 8 }}>{idx + 1}</span>
                    <span style={{ fontSize: 19, fontWeight: 900, color: p.color, letterSpacing: '-0.02em' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#a09588' }}>{p.tagline.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.65, margin: '0 0 14px' }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12, fontSize: 11 }}>
                  <span style={{ color: '#8a7d6f' }}><strong style={{ color: p.color }}>{p.market}</strong></span>
                  <span style={{ color: '#8a7d6f' }}><strong style={{ color: '#2a2520' }}>{p.price}</strong></span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(184,134,11,0.04)', borderRadius: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', color: p.color, flexShrink: 0, paddingTop: 2 }}>TARGET →</span>
                  <span style={{ fontSize: 12, color: '#2a2520', fontWeight: 600 }}>{p.target}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', color: '#2a2520', flexShrink: 0, paddingTop: 2 }}>MOAT →</span>
                  <span style={{ fontSize: 12, color: '#6b6055', lineHeight: 1.5 }}>{p.moat}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* WHY NOW */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520', marginBottom: 14 }}>WHY NOW</div>
            <p style={{ fontSize: 14, color: '#6b6055', lineHeight: 1.8, margin: 0, padding: '18px 20px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              All three products are <strong style={{ color: '#2a2520' }}>BUILT</strong> — not concepts. Two are payment-ready. Earth51 needs refinement before launch. Pet wellness is exploding. Access to justice is in crisis. Environmental action is a <strong style={{ color: '#1e8a4e' }}>mandated corporate priority</strong>. UF51 owns the intersection. The right partner accelerates at the exact moment these markets converge.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* THE DEAL */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#b8860b', marginBottom: 14 }}>THE DEAL — £40K OVER 6 MONTHS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Month 1', value: '£20K upfront', detail: 'Runway to finalize products, prepare for market entry through your channels' },
                { label: 'Month 3', value: '£20K', detail: 'After first milestone — products market-ready, first subscribers through your channels' },
                { label: 'Month 6', value: 'Live + proven', detail: 'Revenue flowing, equal partnership established', green: true },
              ].map(step => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#fff', border: `1px solid ${step.green ? 'rgba(30,138,78,0.2)' : 'rgba(0,0,0,0.06)'}`, borderRadius: 10 }}>
                  <div style={{ width: 52, textAlign: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: step.green ? '#1e8a4e' : '#b8860b' }}>{step.label}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#2a2520', letterSpacing: '-0.01em' }}>{step.value}</div>
                    <div style={{ fontSize: 11, color: '#8a7d6f', marginTop: 2, lineHeight: 1.4 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.65, margin: 0, padding: '12px 16px', background: 'rgba(184,134,11,0.04)', borderRadius: 8, fontStyle: 'italic' }}>
              This is runway, not a salary. I have invested years of unpaid time and personal funds. The £40K lets me focus 100% for 3 months, with your input shaping commercial direction. <strong style={{ color: '#2a2520' }}>10% of all revenue goes to our CIC</strong> — formed and registered. A new company will be incorporated for this partnership, clean and separate.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* WHY THIS, WHY YOU — the human close */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520', marginBottom: 14 }}>WHY THIS, WHY YOU</div>
            <div style={{ padding: '24px 26px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <p style={{ fontSize: 14, color: '#6b6055', lineHeight: 1.85, margin: '0 0 16px' }}>
                This is not a pitch to one person. I am looking for a serious commercial partner — someone who has the distribution, the relationships, and the conviction to help get these products to market. Someone who sees what I see and is ready to build something real, not just advise.
              </p>
                <p style={{ fontSize: 14, color: '#6b6055', lineHeight: 1.85, margin: '0 0 16px' }}>
                  I am a dad in Glasgow. This morning I was picking up litter with Georgie, then taking her to football. That is not a pitch line — that is Earth51. That is the mission, lived, with my kids. I have three products in production, live payment infrastructure, and a mission I will not compromise on. What I do not have is the commercial reach to get these finished and into the world. <strong style={{ color: '#2a2520' }}>That is the gap. That is why I am asking.</strong>
                </p>
                <p style={{ fontSize: 14, color: '#6b6055', lineHeight: 1.85, margin: 0 }}>
                  This is not a vendor deal. It is not an investment pitch. It is an equal partnership — your commercial expertise and distribution, my products and mission. £40K of fair runway, 3 months to get market-ready, then products go through your channels and revenue flows. No egos, no hidden terms. Just two people deciding if this makes sense.
                </p>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

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