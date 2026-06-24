import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Partner One-Pager
// Three products. One page. Facts only. PDF download.
// Designed for a senior commercial leader — data-forward, honest, premium.

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
    const margin = 16;
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
    addText('UF51 — PARTNER BRIEF — JUNE 2026', 8, true, [120, 120, 120], 2);
    addText('Three Products. Three Massive Markets. One Platform.', 17, true, [20, 20, 20], 2);
    addText('BUILT • PAYMENT READY • CIC FORMED • 10% TO MISSION • GLOBAL SCALE', 7, true, [140, 140, 140], 6);

    // INTRO
    addText('WHO WE ARE', 9, true, [212, 160, 23], 3);
    addText('UF51 is a Glasgow-based Community Interest Company (formed) building technology that heals. Three products are built and in production — two are payment-ready via Stripe and Apple Pay, tested end to end. Each runs in the browser — no app downloads, no hardware, no installation barrier. Consumer-grade AI, built on real research. No paying subscribers yet — honest about that. The tech works, the payment infrastructure is live, the markets are real, and the achievable revenue targets below are conservative.', 9, false, [60, 60, 60], 6);

    divider();

    // 1. PETSOUNDS51
    addText('1. PETSOUNDS51 — Animal Acoustic Therapy', 13, true, [212, 160, 23], 3);
    addText('MARKET FUNNEL:', 8, true, [120, 120, 120], 2);
    addText('• TAM: $259B — Global pet care market (2025), 6.1% CAGR\n• SAM: $2B+ — Animal anxiety treatment market (growing)\n• SOM: £3M/year — 100K subscribers x £29.99 (18-month target with distribution partner)', 9, false, [60, 60, 60], 4);
    addText('SUPPORTING DATA:', 8, true, [120, 120, 120], 2);
    addText('• 70%+ of dogs exhibit anxiety-related behaviours\n• 45% of UK households own a pet (PFMA 2024)\n• Vet anxiety prescriptions up 300%+ in a decade\n• Average UK pet owner spends £1,000+/year\n• Our price: £29.99/year — impulse territory', 9, false, [60, 60, 60], 4);
    addText('THE PRODUCT: Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis — no app, no hardware, no prescription. Works offline. Built on published veterinary neuroscience. Built, tested, payment-ready — waiting for first subscribers.', 9, false, [60, 60, 60], 4);
    addText('B2B: Vet surgeries, pet insurers, animal shelters, pet care brands. Licensing model ready.', 9, false, [60, 60, 60], 6);

    divider([212, 160, 23]);

    // 2. SORTED
    addText('2. SORTED — Access to Justice AI', 13, true, [217, 119, 6], 3);
    addText('MARKET FUNNEL:', 8, true, [120, 120, 120], 2);
    addText('• TAM: $849B — Global legal services market\n• SAM: $25B — Legal tech market (8.9% CAGR)\n• SOM: £6M/year — 50K subscribers x £9.99/month (12-month target with distribution partner)', 9, false, [60, 60, 60], 4);
    addText('SUPPORTING DATA:', 8, true, [120, 120, 120], 2);
    addText('• 5.1 billion people globally have unmet justice needs (OECD/UN)\n• UK legal aid budget cut 46% since 2010 — millions priced out\n• 1 in 3 adults face a civil justice problem each year\n• Our price: £9.99/month — less than a coffee\n• 5 free uses before paywall — no barrier to entry', 9, false, [60, 60, 60], 4);
    addText('THE PRODUCT: AI that decodes any legal letter into plain language, writes professional replies, and guides dispute resolution. Works in any language, any jurisdiction. Documents processed in memory — never stored. Zero data liability. Live globally.', 9, false, [60, 60, 60], 4);
    addText('B2B: White-label for banks, insurers, HR platforms, housing associations, local councils.', 9, false, [60, 60, 60], 6);

    divider([217, 119, 6]);

    // 3. EARTH51
    addText('3. EARTH51 — Kids Litter Picking + Verified ESG Impact', 13, true, [34, 197, 94], 3);
    addText('MARKET FUNNEL:', 8, true, [120, 120, 120], 2);
    addText('• TAM: $1.3T — Global environmental services market\n• SAM: $30B+ — Global ESG/CSR spend (mandated, growing)\n• SOM: £1M+ year one — 50 council contracts x £10-50K + brand sponsorships', 9, false, [60, 60, 60], 4);
    addText('SUPPORTING DATA:', 8, true, [120, 120, 120], 2);
    addText('• UK local authorities spend £1B+/year on street cleansing\n• 10M+ tonnes of litter dropped in the UK each year\n• 80% of plastic in oceans comes from land-based litter\n• 2.24 billion tonnes CO2 equivalent from waste annually\n• Companies MUST spend ESG budgets — Earth51 gives them verifiable, gamified, kid-friendly impact data\n• The surprise play: not just litter picking — verified ESG data that brands can report on', 9, false, [60, 60, 60], 4);
    addText('THE PRODUCT: Kids photograph litter they pick up. AI verifies the photo (fraud detection + weight estimation). They earn verified P51 tokens — exchangeable for rewards (chocolate bars, badges, real currency). Tested with real kids picking up real litter outdoors. Gamified, privacy-first, parent-controlled. No data harvesting — COPPA compliant. Every pickup generates verified, reportable ESG impact data that brands and councils can use in their sustainability reporting. That is the real product — not litter picking, but verified impact.', 9, false, [60, 60, 60], 4);
    addText('B2B: Councils (verified cleansing data + cost savings), brands (CSR/ESG sponsorship with verifiable ROI), schools (citizenship curriculum), supermarkets (community engagement).', 9, false, [60, 60, 60], 6);

    divider([34, 197, 94]);

    // WHY NOW
    addText('WHY NOW', 11, true, [20, 20, 20], 3);
    addText('All three products are BUILT and in production — not concepts, not prototypes. PetSounds51 and SORTED are payment-ready via Stripe and Apple Pay, tested end to end. Earth51 needs refinement before launch. No paying subscribers yet — I am honest about that. What exists is working technology, live payment infrastructure, and three massive converging markets with conservative, achievable revenue targets. Pet wellness is exploding, access to justice is in crisis, and environmental action is a mandated corporate priority. UF51 owns the intersection. The right partner accelerates at the exact moment these markets converge.', 9, false, [50, 50, 50], 6);

    addText('THE PARTNERSHIP', 9, true, [212, 160, 23], 3);
    addText('Equal partnership is on the table.', 10, true, [50, 50, 50], 2);
    addText('WHAT UF51 BRINGS: Three built products, live tech, live payment infrastructure, a registered CIC with 10% revenue commitment, and the mission. WHAT THE PARTNER BRINGS: Reach — ad inventory, distribution channels, and the capital to scale fast. This is not a vendor deal. Two sides building something together, each bringing what the other cannot do alone. Open, fair, fast-moving.', 9, false, [50, 50, 50], 4);
    addText('10% of all revenue from this partnership goes to our Community Interest Company — the CIC is formed and registered. A new company will be set up specifically for this joint venture, clean and separate. Profits flow, mission stays protected.', 9, false, [60, 60, 60], 4);
    addText('I am one man with three built products and a mission I believe in. I cannot scale this alone — I need a partner who sees what I see. The numbers in this document are real, the markets are real, the tech is real, the achievable targets are conservative. I have no paying subscribers yet — I am honest about that. What I have is working technology, payment infrastructure ready to go, and the will to build something that lasts. Everything is on the table and I am always open to discussion. No egos, no hidden terms — just two people deciding if this makes sense.', 9, false, [50, 50, 50], 6);

    addText('CONTACT', 9, true, [120, 120, 120], 3);
    addText('Brian Hughes — family@uf51.love\nuf51.love — Glasgow, Scotland\nCommunity Interest Company (CIC) — formed\nNew company to be incorporated for this partnership', 11, false, [60, 60, 60], 0);

    doc.save('UF51-Partner-OnePager-June-2026.pdf');
    setSaving(false);
  };

  const products = [
    {
      name: 'PetSounds51',
      tagline: 'Animal Acoustic Therapy',
      color: '#d4a017',
      bg: 'rgba(212,160,23,0.05)',
      border: 'rgba(212,160,23,0.2)',
      funnel: [
        { tier: 'TAM', value: '$259B', label: 'Global pet care market (2025)', width: '100%', opacity: 0.12 },
        { tier: 'SAM', value: '$2B+', label: 'Animal anxiety treatment market', width: '48%', opacity: 0.3 },
        { tier: 'SOM', value: '£3M/yr', label: '100K subscribers × £29.99 — 18-month target', width: '18%', opacity: 1 },
      ],
      revenue: { value: '£3M/year', detail: '100,000 subscribers × £29.99 — achievable within 18 months with distribution partner' },
      stats: [
        { value: '6.1%', label: 'Pet care CAGR' },
        { value: '70%+', label: 'Dogs show anxiety' },
        { value: '45%', label: 'UK households own a pet' },
        { value: '£29.99', label: 'Annual subscription' },
      ],
      product: 'Browser-native psychoacoustic therapy for dogs, cats, horses. Real-time audio synthesis — no app, no hardware, no prescription. Works offline. Built on published veterinary neuroscience.',
      b2b: 'Vet surgeries, pet insurers, animal shelters, pet care brands',
    },
    {
      name: 'SORTED',
      tagline: 'Access to Justice AI',
      color: '#d97306',
      bg: 'rgba(217,119,6,0.05)',
      border: 'rgba(217,119,6,0.2)',
      funnel: [
        { tier: 'TAM', value: '$849B', label: 'Global legal services market', width: '100%', opacity: 0.12 },
        { tier: 'SAM', value: '$25B', label: 'Legal tech market (8.9% CAGR)', width: '35%', opacity: 0.3 },
        { tier: 'SOM', value: '£6M/yr', label: '50K subscribers × £9.99/mo — 12-month target', width: '22%', opacity: 1 },
      ],
      revenue: { value: '£6M/year', detail: '50,000 subscribers × £9.99/month — achievable within 12 months with distribution partner' },
      stats: [
        { value: '5.1B', label: 'Unmet justice needs globally' },
        { value: '46%', label: 'UK legal aid cut since 2010' },
        { value: '1 in 3', label: 'Adults face civil justice issues/yr' },
        { value: '£9.99', label: 'Monthly subscription' },
      ],
      product: 'AI decodes any legal letter into plain language, writes professional replies, guides dispute resolution. Any language, any jurisdiction. Documents processed in memory — never stored. Zero data liability.',
      b2b: 'Banks, insurers, HR platforms, housing associations, councils',
    },
    {
      name: 'Earth51',
      tagline: 'Kids Litter Picking + Verified ESG Impact',
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.04)',
      border: 'rgba(34,197,94,0.18)',
      funnel: [
        { tier: 'TAM', value: '$1.3T', label: 'Global environmental services market', width: '100%', opacity: 0.12 },
        { tier: 'SAM', value: '$30B+', label: 'Global ESG/CSR spend (mandated, growing)', width: '55%', opacity: 0.3 },
        { tier: 'SOM', value: '£1M+', label: '50 councils × £10-50K + brand sponsorships — year one', width: '20%', opacity: 1 },
      ],
      revenue: { value: '£1M+ year one', detail: '50 council contracts (£10-50K each) + brand ESG sponsorships — conservative year-one target' },
      stats: [
        { value: '£1B+', label: 'UK street cleansing spend/yr' },
        { value: '10M t', label: 'Litter dropped in UK annually' },
        { value: '80%', label: 'Ocean plastic from land' },
        { value: 'ESG', label: 'Mandated corporate spend' },
      ],
      product: 'Kids photograph litter they collect. AI verifies the photo (fraud detection + weight estimation). They earn verified P51 tokens — exchangeable for rewards. Tested with real kids outdoors. Every pickup generates verified, reportable ESG impact data that brands and councils can use in their sustainability reporting. The real product is not litter picking — it is verified impact data that brands must report on.',
      b2b: 'Councils, brands (CSR/ESG), schools, supermarkets',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,8,15,0.97)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em' }}>UF51</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)' }}>PARTNER BRIEF</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#000', background: '#fff', border: '1px solid #fff', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ DOWNLOAD PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: copied ? '#22c55e' : 'rgba(255,255,255,0.7)', background: copied ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${copied ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY TEXT'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=UF51 Partnership"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '8px 18px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            CONTACT
          </a>
        </div>
      </header>

      {/* SUBTLE BANNER */}
      <div style={{ background: 'rgba(255,255,255,0.015)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '7px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>UF51 PARTNER BRIEF — JUNE 2026 — PRODUCTS BUILT, PAYMENT READY, ACHIEVABLE REVENUE TARGETS</span>
      </div>

      <div id="graeme-body" style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 96px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
              {['BUILT PRODUCTS', 'PAYMENT READY', 'CIC FORMED', '10% TO MISSION', 'ACHIEVABLE TARGETS', 'GLOBAL SCALE'].map(t => (
                <span key={t} style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '4px 10px' }}>{t}</span>
              ))}
            </div>
            <h1 style={{ fontSize: 'clamp(30px, 6vw, 50px)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.035em', margin: '0 0 20px' }}>
              Three products.<br />
              <span style={{ color: '#d4a017' }}>Three massive markets.</span><br />
              One platform.
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0, maxWidth: 680, borderLeft: '3px solid rgba(212,160,23,0.4)', paddingLeft: 18 }}>
              UF51 builds technology that heals — animals, people, and the planet. All three products are built and in production. Two are payment-ready via Stripe and Apple Pay — live, tested, waiting for first subscribers. Combined markets exceed $2 trillion. Below is not hype — each product has a TAM, SAM, and a conservative SOM (what we can realistically capture) with the unit economics shown. No paying subscribers yet. Honest about that.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 48px' }} />

          {/* THREE PRODUCT SECTIONS */}
          {products.map((p, idx) => (
            <div key={p.name} style={{ marginBottom: 52 }}>
              {/* Product header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: p.bg, border: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 17, fontWeight: 900, color: p.color }}>{idx + 1}</span>
                </div>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: p.color, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{p.name}</h2>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{p.tagline.toUpperCase()}</div>
                </div>
              </div>

              {/* MARKET FUNNEL */}
              <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>MARKET FUNNEL — TAM → SAM → SOM</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                {p.funnel.map(tier => (
                  <div key={tier.tier} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 32, fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textAlign: 'right', flexShrink: 0 }}>{tier.tier}</div>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <div style={{
                        width: tier.width,
                        height: 36,
                        borderRadius: 6,
                        background: p.color,
                        opacity: tier.opacity,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 14px',
                        transition: 'opacity 0.3s',
                      }}>
                        <span style={{ fontSize: 15, fontWeight: 900, color: tier.opacity < 0.5 ? p.color : '#000', letterSpacing: '-0.02em', opacity: tier.opacity < 0.5 ? 1 : 0.85, filter: tier.opacity < 0.5 ? 'none' : 'none' }}>{tier.value}</span>
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, paddingLeft: 2 }}>{tier.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ACHIEVABLE REVENUE — prominent box */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: p.bg, border: `1px solid ${p.border}`, borderRadius: 10, marginBottom: 20 }}>
                <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', color: p.color, flexShrink: 0 }}>ACHIEVABLE REVENUE</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 19, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{p.revenue.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2, lineHeight: 1.4 }}>{p.revenue.detail}</div>
                </div>
              </div>

              {/* Supporting stats */}
              <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>SUPPORTING DATA</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginBottom: 18 }}>
                {p.stats.map(({ value, label }) => (
                  <div key={value} style={{ padding: '11px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <div style={{ fontSize: 17, fontWeight: 900, color: p.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Product description */}
              <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>THE PRODUCT</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 14px', padding: '14px 16px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10 }}>
                {p.product}
              </p>

              {/* B2B */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '11px 16px', background: p.bg, border: `1px solid ${p.border}`, borderRadius: 8 }}>
                <span style={{ color: p.color, fontSize: 11, flexShrink: 0, fontWeight: 800, letterSpacing: '0.08em' }}>B2B →</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{p.b2b}</span>
              </div>
            </div>
          ))}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 40px' }} />

          {/* WHY NOW */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#fff', marginBottom: 14 }}>WHY NOW</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: 0, padding: '20px 22px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}>
              All three products are <strong style={{ color: '#fff' }}>BUILT</strong> — not concepts, not prototypes. PetSounds51 and SORTED are payment-ready via Stripe and Apple Pay, tested end to end. Earth51 needs refinement before launch. No paying subscribers yet — honest about that. Pet wellness is exploding, access to justice is in crisis, and environmental action is a <strong style={{ color: '#22c55e' }}>mandated corporate priority</strong>. UF51 owns the intersection. The right partner accelerates at the exact moment these markets converge.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 40px' }} />

          {/* THE PARTNERSHIP */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#d4a017', marginBottom: 14 }}>THE PARTNERSHIP</div>

            {/* Two-column: what each side brings */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: '18px 20px', background: 'rgba(212,160,23,0.04)', border: '1px solid rgba(212,160,23,0.18)', borderRadius: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: '#d4a017', marginBottom: 10 }}>WHAT UF51 BRINGS</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {['Three built, production-ready products', 'Live Stripe + Apple Pay infrastructure', 'A registered CIC — 10% revenue committed', 'Working technology, tested end-to-end', 'The mission and the will to scale'].map(item => (
                    <li key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#d4a017', fontWeight: 900 }}>›</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '18px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>WHAT THE PARTNER BRINGS</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {['Distribution — ad inventory, audience reach', 'Capital — to scale marketing and operations', 'Speed — to move before competitors', 'Commercial infrastructure at scale', 'The conviction to move fast'].map(item => (
                    <li key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: 'flex', gap: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 900 }}>›</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 12px', padding: '14px 18px', background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.12)', borderRadius: 10 }}>
              <strong style={{ color: '#22c55e' }}>10% of all revenue goes to our CIC</strong> — the Community Interest Company is formed and registered. A new company will be incorporated specifically for this joint venture, clean and separate. Profits flow, mission stays protected.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: '14px 0 0', fontStyle: 'italic' }}>
              I'm one man with three built products and a mission I believe in. I can't scale this alone — I need a partner who sees what I see. The numbers here are real, the markets are real, the tech is real, the achievable targets are conservative. I have no paying subscribers yet — I'm honest about that. What I have is working technology, payment infrastructure ready to go, and the will to build something that lasts. Everything is on the table and I'm always open to discussion. No egos, no hidden terms — just two people deciding if this makes sense.
            </p>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 40px' }} />

          {/* CONTACT */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.25)', marginBottom: 14 }}>LET'S TALK</div>
            <h2 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Brian Hughes</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '0 0 24px', lineHeight: 1.6 }}>Glasgow, Scotland · CIC formed · New company to be incorporated for this partnership</p>
            <a href="mailto:family@uf51.love?subject=UF51 Partnership"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', background: '#fff', color: '#000', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', borderRadius: 10, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
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