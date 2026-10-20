import React, { useState } from 'react';
import { motion } from 'framer-motion';

// PetSounds51 — Investor & Partner Press Release
// Designed for ESG investors, pet care market, HSBC-adjacent / financial services

export default function PetSounds51InvestorPress() {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('ps-pr-body')?.innerText || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePDF = async () => {
    setSaving(true);
    const { jsPDF } = await import('jspdf');
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

    const divider = () => {
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    addText('INVESTOR & PARTNER BRIEF — APRIL 2026', 8, true, [80, 80, 80], 2);
    addText('PETSOUNDS51 — Animal Therapeutic Audio Platform', 20, true, [20, 20, 20], 4);
    addText('The $259B pet care market has no dominant player in science-backed acoustic therapy. We built one.', 12, false, [100, 100, 100], 8);
    divider();

    addText('EXECUTIVE SUMMARY', 9, true, [212, 160, 23], 3);
    addText('PetSounds51 is a browser-native psychoacoustic therapy platform for dogs, cats, and horses. It generates species-specific therapeutic audio in real time — no app download, no hardware, no prescription required. It is live, subscription-funded at £29.99/year, and sitting at the intersection of a $259B pet care market, a $2B+ animal anxiety treatment segment, and the ESG agenda of every major financial institution that needs measurable, verifiable social and environmental impact.', 11, false, [50, 50, 50], 8);

    addText('THE MARKET', 9, true, [212, 160, 23], 3);
    addText('Global pet care market: $259 billion (2025), growing at 6.1% CAGR. Animal anxiety treatment: $2B+ and expanding rapidly as pharmaceutical options face regulatory scrutiny and owner resistance. 67% of UK households own a pet. The average UK pet owner spends over £1,000/year. PetSounds51 price point: £29.99/year — impulse-buy territory for any pet owner who has just paid £50 for a vet consultation.', 11, false, [50, 50, 50], 8);

    addText('THE TECHNOLOGY', 9, true, [212, 160, 23], 3);
    addText('The synthesis engine runs entirely in the browser using the Web Audio API. It generates layered isochronic tones, species-tuned EQ filtering, binaural beats, and bio-mimetic signals (heartbeat rhythms, white noise spectra) in real time. There are no pre-recorded audio files. No streaming. No server dependency during sessions. Works offline once loaded. This is not a meditation app repurposed for pets — it is built from the ground up around published veterinary neuroscience.', 11, false, [50, 50, 50], 8);

    addText('THE ESG CASE', 9, true, [212, 160, 23], 3);
    addText('Animal welfare is a rapidly growing ESG metric. The RSPCA, Blue Cross, and equivalent organisations globally are under-resourced and over-subscribed. PetSounds51 offers a scalable, non-pharmaceutical intervention that reduces anxiety, reduces unnecessary vet visits, and directly improves animal wellbeing at scale. For investors with ESG mandates, this is measurable, verifiable impact — not greenwash.', 11, false, [50, 50, 50], 8);

    addText('B2B LICENSING', 9, true, [212, 160, 23], 3);
    addText('Vet surgeries, pet insurers, animal shelters, and pet care brands are the B2B targets. Any vet surgery can offer PetSounds51 as a post-operative or anxiety management tool — reducing return visits and improving outcomes. Pet insurers can embed it as a policyholder benefit. The platform exists. The licensing model is ready. The right partner unlocks the channel.', 11, false, [50, 50, 50], 8);

    divider();
    addText('Contact: family@uf51.love | uf51.love/PetSounds51', 11, false, [50, 50, 50], 4);
    addText('— END —', 10, true, [180, 180, 180], 0);

    doc.save('PetSounds51-Investor-Brief-April-2026.pdf');
    setSaving(false);
  };

  const stats = [
    { value: '$259B', label: 'Global pet care market (2025)', source: 'Grand View Research' },
    { value: '6.1%', label: 'CAGR — pet care market growth', source: '' },
    { value: '70%+', label: 'Dogs show anxiety-related behaviours', source: 'ASPCA / Applied Animal Behaviour Science' },
    { value: '$2B+', label: 'Animal anxiety treatment market', source: '' },
    { value: '£29.99', label: 'Full annual access — impulse-buy price point', source: '' },
    { value: '£0', label: 'Side effects. Safe alongside vet treatment', source: '' },
    { value: '67%', label: 'UK households own a pet', source: 'PFMA 2024' },
    { value: '3', label: 'Species: dogs, cats, horses', source: '' },
  ];

  const b2bAngles = [
    { title: 'Vet Surgeries', body: 'Prescribe PetSounds51 as a post-operative recovery tool or anxiety management protocol. Reduces return consultations. Improves owner satisfaction. Demonstrable animal welfare commitment.' },
    { title: 'Pet Insurers', body: 'Embed as a policyholder benefit. Reduces anxiety-related claims. Measurable welfare impact for ESG reporting. Differentiated product offering in a commoditised market.' },
    { title: 'Animal Shelters', body: 'Subsidised or white-label access to reduce stress in rescue animals. Improved rehoming outcomes. Measurable welfare data for charity impact reporting.' },
    { title: 'Pet Care Brands', body: 'Co-branded protocol partnerships for premium pet food, supplement, and accessory brands seeking evidence-based welfare credentials.' },
  ];

  const techPoints = [
    'Real-time psychoacoustic synthesis — not pre-recorded audio',
    'Species-tuned EQ filtering for dog, cat, and horse hearing biology',
    'Isochronic tones, binaural beats, bio-mimetic heartbeat rhythms',
    'Web Audio API — browser-native, no installation, works offline',
    'AI Smart Finder: 3 questions → matched protocol → science explained',
    'Anonymous session data captured — building research dataset from day one',
  ];

  const goldColor = '#d4a017';
  const goldBorder = 'rgba(212,160,23,0.25)';
  const goldBg = 'rgba(212,160,23,0.06)';

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', color: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,8,15,0.97)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${goldBorder}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PawIcon color={goldColor} />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: goldColor }}>PetSounds51</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(212,160,23,0.6)' }}>INVESTOR & PARTNER BRIEF</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', background: goldBg, border: `1px solid ${goldBorder}`, borderRadius: 6, padding: '7px 14px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ DOWNLOAD PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: copied ? '#22c55e' : goldColor, background: copied ? 'rgba(34,197,94,0.1)' : goldBg, border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : goldBorder}`, borderRadius: 6, padding: '7px 14px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY TEXT'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=PetSounds51 — Investor Enquiry"
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '7px 14px', textDecoration: 'none' }}>
            CONTACT
          </a>
        </div>
      </header>

      {/* BANNER */}
      <div style={{ background: goldBg, borderBottom: `1px solid ${goldBorder}`, padding: '8px 20px', textAlign: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(212,160,23,0.5)' }}>INVESTOR & PARTNER BRIEF — APRIL 2026 — PLEASE DO NOT FORWARD WITHOUT PERMISSION</span>
      </div>

      <div id="ps-pr-body" style={{ maxWidth: 780, margin: '0 auto', padding: '48px 20px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              <Chip text="INVESTOR BRIEF" color={goldColor} />
              <Chip text="APRIL 2026" color="rgba(255,255,255,0.2)" />
              <Chip text="ESG ALIGNED" color="#22c55e" />
              <Chip text="LIVE PRODUCT" color="#06b6d4" />
              <Chip text="$259B MARKET" color={goldColor} />
            </div>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              The pet care market is $259 billion.<br />
              <span style={{ color: goldColor }}>Nobody owns acoustic animal therapy.</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0, maxWidth: 640, borderLeft: `3px solid ${goldBorder}`, paddingLeft: 16 }}>
              Over 70% of dogs exhibit anxiety-related behaviours. Vet prescriptions for animal anxiety have grown 300%+ in a decade. PetSounds51 is the drug-free, science-backed alternative — browser-native, no hardware, £29.99/year. Live and generating revenue.
            </p>
          </div>

          <HR color={goldBorder} />

          {/* STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 48 }}>
            {stats.map(({ value, label, source }) => (
              <div key={value} style={{ padding: '18px 14px', background: goldBg, border: `1px solid ${goldBorder}`, borderRadius: 12 }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: goldColor, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6, lineHeight: 1.4 }}>{label}</div>
                {source && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>{source}</div>}
              </div>
            ))}
          </div>

          {/* THE TECHNOLOGY */}
          <Section label="THE TECHNOLOGY" accent={goldColor}>
            <p style={bodyStyle}>PetSounds51 runs entirely in the browser. No app. No hardware. No installation. The synthesis engine generates layered psychoacoustic protocols in real time — built specifically for animal neurobiology, not adapted from human wellness tools.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {techPoints.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <span style={{ color: goldColor, fontSize: 14, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ESG */}
          <Section label="THE ESG CASE" accent={goldColor}>
            <p style={bodyStyle}>Animal welfare is a growing priority for institutional ESG frameworks. PetSounds51 offers a non-pharmaceutical, scalable intervention that:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              {[
                'Reduces unnecessary veterinary visits — measurable environmental and financial impact',
                'Eliminates pharmaceutical dependency for anxiety management in animals',
                'Provides verifiable welfare data from real-world sessions — not modelled estimates',
                'Is available to any pet owner globally at impulse-buy price point — no barrier to access',
                'Built by a Community Interest Company — profit serves mission, not shareholders',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.12)', borderRadius: 8 }}>
                  <span style={{ color: '#22c55e', fontSize: 14, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* B2B */}
          <Section label="B2B LICENSING — THE NEXT PHASE" accent={goldColor}>
            <p style={bodyStyle}>The B2C product is live. The B2B pathway is clear. Every vet surgery, pet insurer, animal shelter, and premium pet care brand in the world is a potential partner.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginTop: 14 }}>
              {b2bAngles.map(({ title, body }) => (
                <div key={title} style={{ padding: '18px', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.12)', borderRadius: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#06b6d4', marginBottom: 8, letterSpacing: '0.06em' }}>{title.toUpperCase()}</div>
                  <p style={{ ...bodyStyle, margin: 0, fontSize: 13 }}>{body}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ABOUT UF51 */}
          <Section label="ABOUT UNIVERSAL FREQUENCY 51" accent={goldColor}>
            <p style={bodyStyle}>Universal Frequency 51 (UF51) is a Glasgow-based social impact technology company. PetSounds51 sits within a platform that also includes SORTED (access to justice AI), CB51 (AI artist management), and Learn51 (free education for every child). Every product is subscription-funded, data-sovereign, and built on a zero-surveillance architecture. UF51 is a Community Interest Company in formation.</p>
          </Section>

          <HR color={goldBorder} />

          {/* CONTACT */}
          <div style={{ background: goldBg, border: `1px solid ${goldBorder}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>GET IN TOUCH</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 10px' }}>Let's talk.</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 20px' }}>Investment, white-label, B2B licensing, vet partnerships, media. Response within 24 hours.</p>
            <a href="mailto:family@uf51.love?subject=PetSounds51 — Investor Enquiry"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: goldColor, color: '#000', fontWeight: 900, fontSize: 13, letterSpacing: '0.06em', borderRadius: 10, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              Live at <a href="https://uf51.love/PetSounds51" style={{ color: goldColor, textDecoration: 'none' }}>uf51.love/PetSounds51</a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
const bodyStyle = { fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.8 };

function Section({ label, children, accent = '#f97316' }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: accent, marginBottom: 14 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}
function HR({ color = 'rgba(255,255,255,0.06)' }) { return <div style={{ height: 1, background: color, margin: '36px 0' }} />; }
function Chip({ text, color }) {
  return <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color, border: `1px solid ${color}50`, borderRadius: 4, padding: '3px 9px' }}>{text}</span>;
}
function PawIcon({ color }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="17" r="8" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="8" cy="9" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="22" cy="9" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="6" r="2" stroke={color} strokeWidth="1.3" fill="none" />
      <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="1.3" fill="none" />
    </svg>
  );
}