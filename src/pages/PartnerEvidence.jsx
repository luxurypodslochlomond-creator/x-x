import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Evidence One-Pager
// Everything he needs to read in Italy, on one page.
// Market data. Published research. Technical facts. All cited.
// Same warm, human design as the Partner Brief.

export default function PartnerEvidence() {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('evidence-body')?.innerText || '';
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
    addText('EVIDENCE PACK — JUNE 2026', 7, true, [160, 150, 135], 6);

    // HERO
    addText('The data behind the decision.', 15, true, [40, 35, 30], 2);
    addText('Every claim in the Partner Brief is backed by publicly available research. This is the compiled evidence — market data, scientific studies, and technical facts. No invented numbers. No spin.', 10, false, [80, 70, 60], 6);

    divider();

    // MARKET INTELLIGENCE
    addText('1. MARKET INTELLIGENCE', 12, true, [40, 35, 30], 3);

    addText('PetSounds51 — Pet Care & Animal Wellness', 10, true, [184, 134, 11], 2);
    addText('Global pet care market: $273.42 billion (2025), projected $289.17B in 2026 (Fortune Business Insights). US pet industry: $158B (2025, APPA). UK: 13.5M dogs, 12.5M cats — 38% of households acquired new pets recently (UK Pet Food/PFMA). Pet wellness spending is recession-proof and accelerating through humanisation of pets.', 9, false, [80, 70, 60], 4);

    addText('SORTED — Legal Technology & Access to Justice', 10, true, [196, 100, 10], 2);
    addText('Global legal tech market: $29.81B (2025) -> $73.32B by 2035, CAGR ~9.4% (Precedence Research). Legal AI market: $1.9B (2024), CAGR 13.1% through 2034 (GM Insights). AI-powered document processing is the frontier of the fastest-growing B2B sector.', 9, false, [80, 70, 60], 4);

    addText('Earth51 — ESG & Environmental Services', 10, true, [30, 138, 78], 2);
    addText('ESG reporting is now mandatory for large EU companies under CSRD (2025 cycle, European Commission). 61% of global companies committed to ESG reporting in 2024 (Atrius). Annual green bond issuance: ~$700B (Responsible Alpha). Verified, fraud-proof environmental impact data is a genuine market need.', 9, false, [80, 70, 60], 6);

    divider();

    // SCIENTIFIC RESEARCH
    addText('2. SCIENTIFIC RESEARCH BACKING', 12, true, [40, 35, 30], 3);
    addText('The science behind PetSounds51 is not invented. It builds on published, peer-reviewed research:', 9, false, [80, 70, 60], 3);
    addText('- Noise anxiety in dogs is a clinically recognised condition with established treatment protocols. (PMC/NIH, 2023)', 9, false, [80, 70, 60], 2);
    addText('- Music as a perioperative, non-pharmacological intervention in dogs and cats is active veterinary research. (Frontiers in Veterinary Science, 2025)', 9, false, [80, 70, 60], 2);
    addText('- Psychoacoustically designed music reduced anxiety behaviours in dogs by 70%, vs 36% with conventional music. (iCalmPet / Through a Dog\'s Ear studies)', 9, false, [80, 70, 60], 2);
    addText('- Bioacoustic music is clinically validated and used in veterinary practice to reduce stress. (IVC Journal)', 9, false, [80, 70, 60], 6);

    divider();

    // ACCESS TO JUSTICE CRISIS
    addText('3. THE ACCESS TO JUSTICE CRISIS', 12, true, [40, 35, 30], 3);
    addText('SORTED exists because the system is broken. This is documented, not opinion:', 9, false, [80, 70, 60], 3);
    addText('- 92% of low-income civil legal problems receive no or insufficient legal assistance. (Legal Services Corporation — The Justice Gap Report)', 9, false, [80, 70, 60], 2);
    addText('- 40%+ of civil legal aid providers exited the sector between 2011-2024, creating "legal aid deserts." (ILFM)', 9, false, [80, 70, 60], 2);
    addText('- 69% of people have no access to a local community care legal aid provider; 88% for education law. (The Law Society, UK)', 9, false, [80, 70, 60], 2);
    addText('- Criminal legal aid solicitor numbers fallen 30%+ since 2014/15. (Institute for Government, 2025)', 9, false, [80, 70, 60], 6);

    divider();

    // TECHNICAL FACTS
    addText('4. TECHNICAL FACTS — WHAT IS ACTUALLY BUILT', 12, true, [40, 35, 30], 3);
    addText('PetSounds51: Browser-native real-time audio synthesis. No app, no hardware. PWA, offline. Species-specific protocols for dogs, cats, horses. Stripe live: £29.99/yr, £9.99/mo.', 9, false, [80, 70, 60], 3);
    addText('SORTED: AI-powered legal document decoder. Any language, any jurisdiction. Zero data storage — documents processed in memory, never stored. PWA with offline case vault (local storage). Stripe live: £9.99/mo, £9.99 lifetime.', 9, false, [80, 70, 60], 3);
    addText('Earth51: AI-verified litter collection with fraud detection and weight estimation. COPPA-compliant. Token reward system. Generates verified, reportable ESG impact data. Needs refinement before launch.', 9, false, [80, 70, 60], 6);

    divider();

    // CREDIBILITY
    addText('5. CREDIBILITY & COMPLIANCE ANCHORS', 12, true, [40, 35, 30], 3);
    addText('- CIC formed and registered. 10% of all revenue committed to CIC mission.', 9, false, [80, 70, 60], 2);
    addText('- Stripe: Live payment infrastructure (not test mode). Real transactions.', 9, false, [80, 70, 60], 2);
    addText('- COPPA compliant: Earth51 designed for child-safe data from day one.', 9, false, [80, 70, 60], 2);
    addText('- GDPR/CCPA aligned: SORTED processes documents in memory — never stores data.', 9, false, [80, 70, 60], 2);
    addText('- Open source architecture: Transparent, auditable technology stack.', 9, false, [80, 70, 60], 6);

    divider();

    addText('Brian Hughes — family@uf51.love', 11, true, [40, 35, 30], 1);
    addText('Glasgow, Scotland · uf51.love · CIC formed · All data sourced from publicly available industry reports.', 8, false, [120, 110, 95], 0);

    doc.save('UF51-Evidence-Pack-June-2026.pdf');
    setSaving(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a2520', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em', color: '#2a2520' }}>UF51</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: '#a09588' }}>EVIDENCE PACK</div>
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
        </div>
      </header>

      <div id="evidence-body" style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 44px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.035em', margin: '0 0 20px', color: '#2a2520' }}>
              The data behind<br />
              <span style={{ color: '#b8860b' }}>the decision.</span>
            </h1>
            <p style={{ fontSize: 15, color: '#6b6055', lineHeight: 1.75, margin: 0, maxWidth: 580, borderLeft: '3px solid rgba(184,134,11,0.3)', paddingLeft: 18 }}>
              Every claim in the Partner Brief is backed by publicly available research. This is the compiled evidence — market data, scientific studies, and technical facts. <strong style={{ color: '#2a2520' }}>No invented numbers. No spin.</strong>
            </p>
          </div>

          {/* HEADLINE STATS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#1e8a4e', marginBottom: 16 }}>THE NUMBERS THAT MATTER</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
              {[
                { stat: '$273B', label: 'Global pet care market', source: 'Fortune Business Insights' },
                { stat: '$29.8B', label: 'Legal tech market (2025)', source: 'Precedence Research' },
                { stat: '92%', label: 'No legal help for the poor', source: 'Legal Services Corp' },
                { stat: '70%', label: 'Anxiety reduction in dogs', source: 'iCalmPet Research' },
                { stat: '$700B', label: 'Annual green bond issuance', source: 'Responsible Alpha' },
                { stat: '26M', label: 'UK dogs + cats', source: 'UK Pet Food/PFMA' },
              ].map((f, i) => (
                <div key={i} style={{ padding: '16px 14px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#2a2520', letterSpacing: '-0.02em', marginBottom: 4 }}>{f.stat}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', color: '#8a7d6f', textTransform: 'uppercase', lineHeight: 1.3, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 7, color: '#b8860b', fontStyle: 'italic' }}>{f.source}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 1. MARKET INTELLIGENCE */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520', marginBottom: 20 }}>1. MARKET INTELLIGENCE</div>

            {/* PetSounds51 */}
            <div style={{ marginBottom: 16, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 19, fontWeight: 900, color: '#b8860b', letterSpacing: '-0.02em' }}>PetSounds51</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#a09588' }}>PET CARE & ANIMAL WELLNESS</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '10px 12px', background: 'rgba(184,134,11,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#b8860b', letterSpacing: '-0.02em' }}>$273B</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>Global market (2025)</div>
                  <div style={{ fontSize: 7, color: '#b8860b', fontStyle: 'italic', marginTop: 2 }}>Fortune Business Insights</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(184,134,11,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#b8860b', letterSpacing: '-0.02em' }}>26M</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>UK dogs + cats</div>
                  <div style={{ fontSize: 7, color: '#b8860b', fontStyle: 'italic', marginTop: 2 }}>UK Pet Food / PFMA</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(184,134,11,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#b8860b', letterSpacing: '-0.02em' }}>$158B</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>US pet industry</div>
                  <div style={{ fontSize: 7, color: '#b8860b', fontStyle: 'italic', marginTop: 2 }}>APPA 2025</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.65, margin: 0 }}>
                The pet care market grew through recession and continues accelerating. Humanisation of pets drives spending on wellness, anxiety, and behavioural health — exactly where PetSounds51 sits.
              </p>
            </div>

            {/* SORTED */}
            <div style={{ marginBottom: 16, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 19, fontWeight: 900, color: '#c47200', letterSpacing: '-0.02em' }}>SORTED</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#a09588' }}>LEGAL TECH & ACCESS TO JUSTICE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '10px 12px', background: 'rgba(196,114,0,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#c47200', letterSpacing: '-0.02em' }}>$29.8B</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>Legal tech (2025)</div>
                  <div style={{ fontSize: 7, color: '#c47200', fontStyle: 'italic', marginTop: 2 }}>Precedence Research</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(196,114,0,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#c47200', letterSpacing: '-0.02em' }}>$73.3B</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>Projected by 2035</div>
                  <div style={{ fontSize: 7, color: '#c47200', fontStyle: 'italic', marginTop: 2 }}>Precedence Research</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(196,114,0,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#c47200', letterSpacing: '-0.02em' }}>13.1%</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>Legal AI CAGR</div>
                  <div style={{ fontSize: 7, color: '#c47200', fontStyle: 'italic', marginTop: 2 }}>GM Insights</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.65, margin: 0 }}>
                Legal tech is one of the fastest-growing B2B sectors. AI-powered document processing is the frontier — and the access-to-justice crisis creates enormous public-sector and consumer demand.
              </p>
            </div>

            {/* Earth51 */}
            <div style={{ padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 19, fontWeight: 900, color: '#1e8a4e', letterSpacing: '-0.02em' }}>Earth51</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#a09588' }}>ESG & ENVIRONMENTAL SERVICES</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '10px 12px', background: 'rgba(30,138,78,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#1e8a4e', letterSpacing: '-0.02em' }}>Mandatory</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>ESG reporting (EU)</div>
                  <div style={{ fontSize: 7, color: '#1e8a4e', fontStyle: 'italic', marginTop: 2 }}>European Commission</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(30,138,78,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#1e8a4e', letterSpacing: '-0.02em' }}>61%</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>Companies reporting</div>
                  <div style={{ fontSize: 7, color: '#1e8a4e', fontStyle: 'italic', marginTop: 2 }}>Atrius 2025</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(30,138,78,0.04)', borderRadius: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#1e8a4e', letterSpacing: '-0.02em' }}>$700B</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#8a7d6f', textTransform: 'uppercase' }}>Green bonds/yr</div>
                  <div style={{ fontSize: 7, color: '#1e8a4e', fontStyle: 'italic', marginTop: 2 }}>Responsible Alpha</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.65, margin: 0 }}>
                ESG reporting is no longer optional — it is regulated. Verified, fraud-proof environmental impact data is a genuine market need. Earth51 generates exactly that data, gamified through children's litter picks.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 2. SCIENTIFIC RESEARCH */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520', marginBottom: 20 }}>2. SCIENTIFIC RESEARCH BACKING</div>
            <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.7, margin: '0 0 20px' }}>
              The science behind PetSounds51 is not invented. It builds on published, peer-reviewed research in veterinary psychoacoustics and animal behavioural science:
            </p>
            {[
              { finding: 'Noise anxiety in dogs is a clinically recognised condition with established treatment protocols.', source: 'PMC (NIH) — "Therapy and Prevention of Noise Fears in Dogs: A Review" (2023)' },
              { finding: 'Music as a perioperative, non-pharmacological intervention in dogs and cats is an active area of veterinary research.', source: 'Frontiers in Veterinary Science (2025)' },
              { finding: 'Psychoacoustically designed music reduced anxiety behaviours in dogs by 70%, vs 36% with conventional music.', source: 'iCalmPet Research / Through a Dog\'s Ear studies' },
              { finding: 'Bioacoustic music is clinically validated and used in veterinary practice to reduce stress.', source: 'IVC Journal — "Three-Pronged Approach to Sound Sensitivity"' },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 12, padding: '16px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#b8860b', letterSpacing: '-0.02em', flexShrink: 0, minWidth: 40 }}>{i + 1}</div>
                <div>
                  <p style={{ fontSize: 13, color: '#2a2520', fontWeight: 600, lineHeight: 1.55, margin: '0 0 8px' }}>{r.finding}</p>
                  <p style={{ fontSize: 11, color: '#8a7d6f', margin: 0, fontStyle: 'italic' }}>{r.source}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 3. ACCESS TO JUSTICE CRISIS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#c47200', marginBottom: 20 }}>3. THE ACCESS TO JUSTICE CRISIS</div>
            <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.7, margin: '0 0 20px' }}>
              SORTED exists because the system is broken. This is not opinion — it is documented:
            </p>
            {[
              { stat: '92%', text: 'of low-income civil legal problems receive no or insufficient legal assistance.', source: 'Legal Services Corporation — The Justice Gap Report' },
              { stat: '40%+', text: 'of civil legal aid providers exited the sector between 2011–2024, creating "legal aid deserts."', source: 'ILFM — Crisis in Legal Aid' },
              { stat: '69%', text: 'of people have no access to a local community care legal aid provider (88% for education law).', source: 'The Law Society — Legal Aid Deserts (UK)' },
              { stat: '30%+', text: 'decline in criminal legal aid solicitors since 2014/15.', source: 'Institute for Government — Performance Tracker 2025' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 10, padding: '16px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#c47200', letterSpacing: '-0.02em', flexShrink: 0, minWidth: 60 }}>{d.stat}</div>
                <div>
                  <p style={{ fontSize: 13, color: '#2a2520', fontWeight: 600, lineHeight: 1.5, margin: '0 0 6px' }}>{d.text}</p>
                  <p style={{ fontSize: 10, color: '#8a7d6f', margin: 0, fontStyle: 'italic' }}>{d.source}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 4. TECHNICAL FACTS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520', marginBottom: 20 }}>4. TECHNICAL FACTS — WHAT IS ACTUALLY BUILT</div>
            {[
              {
                name: 'PetSounds51', color: '#b8860b',
                points: [
                  'Browser-native real-time audio synthesis (no pre-recorded playlists)',
                  'No app download, no hardware — works as PWA, offline-capable',
                  'Species-specific frequency protocols for dogs, cats, horses',
                  'Stripe checkout live: £29.99/year and £9.99/month',
                ],
              },
              {
                name: 'SORTED', color: '#c47200',
                points: [
                  'AI-powered legal document decoder — any language, any jurisdiction',
                  'Zero data storage: documents processed in memory, never stored',
                  'PWA with offline case vault (local storage, user-owned)',
                  'Stripe checkout live: £9.99/month and £9.99 one-time lifetime',
                ],
              },
              {
                name: 'Earth51', color: '#1e8a4e',
                points: [
                  'AI-verified litter collection with fraud detection and weight estimation',
                  'COPPA-compliant (child-safe data from day one)',
                  'Token reward system for verified cleanups',
                  'Generates verified, reportable ESG impact data for B2B clients',
                  'Status: needs refinement before public launch',
                ],
              },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 16, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, color: p.color, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{p.name}</h3>
                {p.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: p.color, fontWeight: 900, flexShrink: 0, fontSize: 13 }}>•</span>
                    <span style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.5 }}>{pt}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 5. CREDIBILITY */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#1e8a4e', marginBottom: 20 }}>5. CREDIBILITY & COMPLIANCE ANCHORS</div>
            {[
              'Community Interest Company (CIC): Formed and registered. 10% of all revenue committed to CIC mission.',
              'Stripe: Live payment infrastructure (not test mode). Real transactions processing.',
              'COPPA compliant: Earth51 designed for child-safe data from day one.',
              'GDPR/CCPA aligned: SORTED processes documents in memory — never stores user data.',
              'Open source architecture: Built on transparent, auditable technology stack.',
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start', padding: '14px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#1e8a4e', flexShrink: 0, minWidth: 24 }}>✓</span>
                <span style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* CONTACT */}
          <div style={{ textAlign: 'left', padding: '8px 0' }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em', color: '#2a2520' }}>Brian Hughes</h2>
            <p style={{ fontSize: 12, color: '#a09588', margin: '0 0 16px', lineHeight: 1.6 }}>
              Glasgow, Scotland · uf51.love · CIC formed<br />
              All market data sourced from publicly available industry reports. Full sources cited inline.
            </p>
            <a href="mailto:family@uf51.love?subject=UF51 Evidence Pack"
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