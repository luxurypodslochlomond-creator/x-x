import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Evidence One-Pager
// SORTED colour palette. Warm amber on cream.
// Every number sourced. Every link real. No bullshit.

const AMBER = '#d97706';
const AMBER_DARK = '#b45309';
const AMBER_LIGHT = 'rgba(217,119,6,0.06)';
const CREAM = '#fdf9f0';
const CREAM_DEEP = '#faf8f5';
const INK = '#1a1208';
const INK_SOFT = '#5a4a35';
const INK_MUTE = '#9a8a70';

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
      doc.setDrawColor(225, 215, 195);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;
    };

    // HEADER
    addText('UF51', 22, true, [26, 18, 8], 1);
    addText('EVIDENCE PACK — JUNE 2026', 7, true, [180, 130, 6], 6);

    // HERO
    addText('The data behind the decision.', 15, true, [26, 18, 8], 2);
    addText('Every claim below is backed by publicly available research or verifiable technical fact. Sources cited inline. Full source list at the end. Conservative figures used throughout — where a range exists, the lower bound is quoted.', 10, false, [80, 70, 50], 6);

    divider();

    // MARKET INTELLIGENCE
    addText('1. MARKET INTELLIGENCE', 12, true, [180, 130, 6], 3);

    addText('PetSounds51 — Pet Care & Animal Wellness', 10, true, [180, 130, 6], 2);
    addText('Global pet care market: ~$260 billion (2024), growing at ~5.9% CAGR (Grand View Research / Fortune Business Insights). US pet spending: $150B+ in 2024 (APPA). UK pet population: ~13 million dogs, ~12 million cats (PFMA/UK Pet Food, 2024). Spending on pet wellness is recession-resilient and accelerating as pets are increasingly treated as family members.', 9, false, [80, 70, 50], 4);

    addText('SORTED — Legal Technology & Access to Justice', 10, true, [180, 130, 6], 2);
    addText('Global legal tech market: ~$28.8 billion (2024), projected ~$73 billion by 2034, CAGR ~9.4% (Precedence Research). Legal AI sub-segment: ~$1.7 billion (2024), CAGR ~13% (Grand View Research). AI-powered document processing is the frontier of one of the fastest-growing B2B sectors.', 9, false, [80, 70, 50], 4);

    addText('Earth51 — ESG & Environmental Services', 10, true, [180, 130, 6], 2);
    addText('ESG reporting is now mandatory for large EU companies under the Corporate Sustainability Reporting Directive (CSRD, European Commission). Global green bond issuance exceeded $700 billion in 2023 (Climate Bonds Initiative). Verified, fraud-proof environmental impact data is a genuine and growing market need as reporting requirements tighten.', 9, false, [80, 70, 50], 6);

    divider();

    // SCIENTIFIC RESEARCH
    addText('2. SCIENTIFIC RESEARCH BACKING', 12, true, [26, 18, 8], 3);
    addText('The science behind PetSounds51 builds on published, peer-reviewed research in veterinary psychoacoustics:', 9, false, [80, 70, 50], 3);
    addText('- Noise anxiety (including storm and fireworks phobia) in dogs is a clinically recognised condition with established behavioural and pharmacological treatment protocols. (PMC/NIH: "Therapy and Prevention of Noise Fears in Dogs" — review, 2023)', 9, false, [80, 70, 50], 2);
    addText('- Music as a perioperative, non-pharmacological intervention to reduce stress in dogs and cats is an active area of veterinary research. (Frontiers in Veterinary Science, 2025)', 9, false, [80, 70, 50], 2);
    addText('- Psychoacoustically designed music significantly reduced anxiety-related behaviours in dogs compared with conventional music in observational studies. (Through a Dog\'s Ear / iCalmPet research, Leeds & Spector)', 9, false, [80, 70, 50], 2);
    addText('- Bioacoustic and species-appropriate sound therapy is used in veterinary practice as a complementary stress-reduction tool. (IVC Journal)', 9, false, [80, 70, 50], 6);

    divider();

    // ACCESS TO JUSTICE CRISIS
    addText('3. THE ACCESS TO JUSTICE CRISIS', 12, true, [180, 130, 6], 3);
    addText('SORTED exists because the system is broken. This is documented, not opinion:', 9, false, [80, 70, 50], 3);
    addText('- 92% of low-income Americans receive no or inadequate professional legal help for their civil legal problems. (Legal Services Corporation — "The Justice Gap" report)', 9, false, [80, 70, 50], 2);
    addText("- Legal aid 'deserts' are growing across England and Wales, with significant areas having no local provider for housing, family, or immigration law. (The Law Society, UK)", 9, false, [80, 70, 50], 2);
    addText('- Criminal legal aid duty solicitor numbers have declined approximately 30% since 2014/15. (Institute for Government — Performance Tracker)', 9, false, [80, 70, 50], 6);

    divider();

    // TECHNICAL FACTS
    addText('4. TECHNICAL FACTS — WHAT IS ACTUALLY BUILT', 12, true, [26, 18, 8], 3);
    addText('PetSounds51: Browser-native real-time audio synthesis. No app download, no hardware. PWA, works offline. Species-specific protocols for dogs, cats, horses. Stripe live: £29.99/year, £9.99/month.', 9, false, [80, 70, 50], 3);
    addText('SORTED: AI-powered legal document decoder. Any language, any jurisdiction. Documents processed in memory and never stored server-side. PWA with local case vault. Stripe live: £9.99/month, £9.99 lifetime.', 9, false, [80, 70, 50], 3);
    addText('Earth51: AI-verified litter collection with fraud detection and weight estimation. COPPA-compliant. Token reward system. Generates verified, reportable ESG impact data. Status: needs refinement before public launch.', 9, false, [80, 70, 50], 6);

    divider();

    // CREDIBILITY
    addText('5. CREDIBILITY & COMPLIANCE ANCHORS', 12, true, [180, 130, 6], 3);
    addText('- Community Interest Company (CIC) formed and registered. 10% of revenue committed to CIC mission.', 9, false, [80, 70, 50], 2);
    addText('- Stripe: Live payment infrastructure (not test mode). Real transactions.', 9, false, [80, 70, 50], 2);
    addText('- COPPA compliant: Earth51 designed for child-safe data from day one.', 9, false, [80, 70, 50], 2);
    addText('- GDPR/CCPA aligned: SORTED processes documents in memory — never stores user data.', 9, false, [80, 70, 50], 2);
    addText('- Open source architecture: Transparent, auditable technology stack.', 9, false, [80, 70, 50], 6);

    divider();

    addText('Brian Hughes — family@uf51.love', 11, true, [26, 18, 8], 1);
    addText('Glasgow, Scotland · uf51.love · CIC formed · All data sourced from publicly available reports. See full source list.', 8, false, [120, 110, 90], 0);

    doc.save('UF51-Evidence-Pack-June-2026.pdf');
    setSaving(false);
  };

  const headlineStats = [
    { stat: '~$260B', label: 'Global pet care market', source: 'Grand View Research' },
    { stat: '~$28.8B', label: 'Legal tech market (2024)', source: 'Precedence Research' },
    { stat: '92%', label: 'No legal help for the poor', source: 'Legal Services Corp' },
    { stat: '~$700B', label: 'Green bond issuance (2023)', source: 'Climate Bonds Initiative' },
    { stat: '25M', label: 'UK dogs + cats', source: 'PFMA / UK Pet Food' },
    { stat: 'CIC', label: 'Registered & committed', source: 'Companies House' },
  ];

  const sources = [
    { name: 'Grand View Research — Pet Care Market Analysis', url: 'https://www.grandviewresearch.com/industry-analysis/pet-care-market' },
    { name: 'Fortune Business Insights — Pet Care Market', url: 'https://www.fortunebusinessinsights.com/industry-reports/pet-care-market-101221' },
    { name: 'APPA (American Pet Products Association) — Industry Figures', url: 'https://www.americanpetproducts.org/industrytrends' },
    { name: 'PFMA / UK Pet Food — Pet Population', url: 'https://www.ukpetfood.org/information-centre/statistics/pet-population.html' },
    { name: 'Precedence Research — Legal Tech Market', url: 'https://www.precedenceresearch.com/legal-tech-market' },
    { name: 'Grand View Research — Legal AI Market', url: 'https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-ai-in-legal-market' },
    { name: 'Legal Services Corporation — The Justice Gap', url: 'https://www.lsc.gov/about-lsc/our-impact/justice-gap' },
    { name: 'The Law Society — Legal Aid Deserts', url: 'https://www.lawsociety.org.uk/topics/legal-aid' },
    { name: 'Institute for Government — Performance Tracker', url: 'https://www.instituteforgovernment.org.uk/performance-tracker' },
    { name: 'European Commission — CSRD Directive', url: 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en' },
    { name: 'Climate Bonds Initiative — Green Bond Market', url: 'https://www.climatebonds.net/market' },
    { name: 'PMC / NIH — Noise Fears in Dogs (Review)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9852993/' },
    { name: 'Frontiers in Veterinary Science', url: 'https://www.frontiersin.org/journals/veterinary-science' },
    { name: 'Through a Dog\'s Ear / iCalmPet Research', url: 'https://icalmpet.com/pages/research' },
    { name: 'IVC Journal — Veterinary Practice', url: 'https://ivcjournal.com/' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM_DEEP} 40%)`, color: INK, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,245,0.98)', backdropFilter: 'blur(24px)', borderBottom: `1px solid ${AMBER}40`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <UF51Icon />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: INK }}>UF51</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', color: AMBER, opacity: 0.8 }}>EVIDENCE PACK</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#fff', background: AMBER_DARK, border: `1px solid ${AMBER_DARK}`, borderRadius: 8, padding: '10px 22px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: copied ? AMBER_DARK : INK_SOFT, background: copied ? AMBER_LIGHT : 'rgba(0,0,0,0.03)', border: `1px solid ${copied ? AMBER + '40' : 'rgba(0,0,0,0.08)'}`, borderRadius: 8, padding: '10px 22px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY'}
          </motion.button>
        </div>
      </header>

      <div id="evidence-body" style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 44px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.035em', margin: '0 0 20px', color: INK }}>
              The data behind<br />
              <span style={{ color: AMBER }}>the decision.</span>
            </h1>
            <p style={{ fontSize: 15, color: INK_SOFT, lineHeight: 1.75, margin: 0, maxWidth: 580, borderLeft: `3px solid ${AMBER}50`, paddingLeft: 18 }}>
              Every claim below is backed by publicly available research or verifiable technical fact. Sources cited inline. Full source list at the end. <strong style={{ color: INK }}>Conservative figures used throughout — where a range exists, the lower bound is quoted.</strong>
            </p>
          </div>

          {/* HEADLINE STATS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: AMBER, marginBottom: 16 }}>THE NUMBERS THAT MATTER</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
              {headlineStats.map((f, i) => (
                <div key={i} style={{ padding: '18px 14px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: INK, letterSpacing: '-0.02em', marginBottom: 4 }}>{f.stat}</div>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', color: INK_MUTE, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontSize: 7, color: AMBER, fontStyle: 'italic' }}>{f.source}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* 1. MARKET INTELLIGENCE */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: INK, marginBottom: 20 }}>1. MARKET INTELLIGENCE</div>

            {/* PetSounds51 */}
            <div style={{ marginBottom: 16, padding: '22px 24px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>PetSounds51</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: INK_MUTE }}>PET CARE & ANIMAL WELLNESS</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 14 }}>
                <StatBox stat="~$260B" label="Global market (2024)" source="Grand View Research" color={AMBER_DARK} />
                <StatBox stat="25M" label="UK dogs + cats" source="PFMA / UK Pet Food" color={AMBER_DARK} />
                <StatBox stat="$150B+" label="US pet industry (2024)" source="APPA" color={AMBER_DARK} />
              </div>
              <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: 0 }}>
                The pet care market grew through recession and continues accelerating. Humanisation of pets drives spending on wellness, anxiety, and behavioural health — exactly where PetSounds51 sits.
              </p>
            </div>

            {/* SORTED */}
            <div style={{ marginBottom: 16, padding: '22px 24px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>SORTED</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: INK_MUTE }}>LEGAL TECH & ACCESS TO JUSTICE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 14 }}>
                <StatBox stat="~$28.8B" label="Legal tech (2024)" source="Precedence Research" color={AMBER_DARK} />
                <StatBox stat="~$73B" label="Projected by 2034" source="Precedence Research" color={AMBER_DARK} />
                <StatBox stat="~13%" label="Legal AI CAGR" source="Grand View Research" color={AMBER_DARK} />
              </div>
              <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: 0 }}>
                Legal tech is one of the fastest-growing B2B sectors. AI-powered document processing is the frontier — and the access-to-justice crisis creates enormous public-sector and consumer demand.
              </p>
            </div>

            {/* Earth51 */}
            <div style={{ padding: '22px 24px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>Earth51</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: INK_MUTE }}>ESG & ENVIRONMENTAL SERVICES</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 14 }}>
                <StatBox stat="Mandatory" label="ESG reporting (EU)" source="European Commission" color={AMBER_DARK} />
                <StatBox stat="~$700B" label="Green bonds (2023)" source="Climate Bonds Initiative" color={AMBER_DARK} />
                <StatBox stat="CSRD" label="Directive in force" source="European Commission" color={AMBER_DARK} />
              </div>
              <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: 0 }}>
                ESG reporting is no longer optional — it is regulated. Verified, fraud-proof environmental impact data is a genuine market need. Earth51 generates exactly that data, gamified through children's litter picks.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* 2. SCIENTIFIC RESEARCH */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: INK, marginBottom: 20 }}>2. SCIENTIFIC RESEARCH BACKING</div>
            <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.7, margin: '0 0 20px' }}>
              The science behind PetSounds51 builds on published, peer-reviewed research in veterinary psychoacoustics and animal behavioural science:
            </p>
            {[
              { finding: 'Noise anxiety (including storm and fireworks phobia) in dogs is a clinically recognised condition with established behavioural and pharmacological treatment protocols.', source: 'PMC / NIH — "Therapy and Prevention of Noise Fears in Dogs" (Review, 2023)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9852993/' },
              { finding: 'Music as a perioperative, non-pharmacological intervention to reduce stress in dogs and cats is an active area of veterinary research.', source: 'Frontiers in Veterinary Science (2025)', url: 'https://www.frontiersin.org/journals/veterinary-science' },
              { finding: 'Psychoacoustically designed music significantly reduced anxiety-related behaviours in dogs compared with conventional music in observational studies.', source: "Through a Dog's Ear / iCalmPet research (Leeds & Spector)", url: 'https://icalmpet.com/pages/research' },
              { finding: 'Bioacoustic and species-appropriate sound therapy is used in veterinary practice as a complementary stress-reduction tool.', source: 'IVC Journal', url: 'https://ivcjournal.com/' },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 12, padding: '18px 20px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 12, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: AMBER, letterSpacing: '-0.02em', flexShrink: 0, minWidth: 40 }}>{i + 1}</div>
                <div>
                  <p style={{ fontSize: 13, color: INK, fontWeight: 600, lineHeight: 1.55, margin: '0 0 8px' }}>{r.finding}</p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: AMBER_DARK, margin: 0, fontStyle: 'italic', textDecoration: 'none', borderBottom: `1px solid ${AMBER}40` }}>{r.source} →</a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* 3. ACCESS TO JUSTICE CRISIS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: AMBER, marginBottom: 20 }}>3. THE ACCESS TO JUSTICE CRISIS</div>
            <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.7, margin: '0 0 20px' }}>
              SORTED exists because the system is broken. This is not opinion — it is documented:
            </p>
            {[
              { stat: '92%', text: 'of low-income Americans receive no or inadequate professional legal help for their civil legal problems.', source: 'Legal Services Corporation — "The Justice Gap" report', url: 'https://www.lsc.gov/about-lsc/our-impact/justice-gap' },
              { stat: 'Deserts', text: 'Legal aid "deserts" are growing across England and Wales — large areas with no local provider for housing, family, or immigration law.', source: 'The Law Society (UK)', url: 'https://www.lawsociety.org.uk/topics/legal-aid' },
              { stat: '~30%', text: 'decline in criminal legal aid duty solicitor numbers since 2014/15.', source: 'Institute for Government — Performance Tracker', url: 'https://www.instituteforgovernment.org.uk/performance-tracker' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 10, padding: '18px 20px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: AMBER, letterSpacing: '-0.02em', flexShrink: 0, minWidth: 60 }}>{d.stat}</div>
                <div>
                  <p style={{ fontSize: 13, color: INK, fontWeight: 600, lineHeight: 1.5, margin: '0 0 6px' }}>{d.text}</p>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: AMBER_DARK, margin: 0, fontStyle: 'italic', textDecoration: 'none', borderBottom: `1px solid ${AMBER}40` }}>{d.source} →</a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* 4. TECHNICAL FACTS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: INK, marginBottom: 20 }}>4. TECHNICAL FACTS — WHAT IS ACTUALLY BUILT</div>
            {[
              {
                name: 'PetSounds51',
                points: [
                  'Browser-native real-time audio synthesis (no pre-recorded playlists)',
                  'No app download, no hardware — works as PWA, offline-capable',
                  'Species-specific frequency protocols for dogs, cats, horses',
                  'Stripe checkout live: £29.99/year and £9.99/month',
                ],
              },
              {
                name: 'SORTED',
                points: [
                  'AI-powered legal document decoder — any language, any jurisdiction',
                  'Documents processed in memory — never stored server-side',
                  'PWA with offline case vault (local storage, user-owned)',
                  'Stripe checkout live: £9.99/month and £9.99 one-time lifetime',
                ],
              },
              {
                name: 'Earth51',
                points: [
                  'AI-verified litter collection with fraud detection and weight estimation',
                  'COPPA-compliant (child-safe data from day one)',
                  'Token reward system for verified cleanups',
                  'Generates verified, reportable ESG impact data for B2B clients',
                  'Status: needs refinement before public launch',
                ],
              },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 16, padding: '22px 24px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 14 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: AMBER_DARK, margin: '0 0 14px', letterSpacing: '-0.02em' }}>{p.name}</h3>
                {p.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: AMBER, fontWeight: 900, flexShrink: 0, fontSize: 14 }}>•</span>
                    <span style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.5 }}>{pt}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* 5. CREDIBILITY */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: AMBER, marginBottom: 20 }}>5. CREDIBILITY & COMPLIANCE ANCHORS</div>
            {[
              'Community Interest Company (CIC) formed and registered. 10% of revenue committed to CIC mission.',
              'Stripe: Live payment infrastructure (not test mode). Real transactions.',
              'COPPA compliant: Earth51 designed for child-safe data from day one.',
              'GDPR/CCPA aligned: SORTED processes documents in memory — never stores user data.',
              'Open source architecture: Built on transparent, auditable technology stack.',
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start', padding: '16px 20px', background: '#fff', border: `1px solid ${AMBER}25`, borderRadius: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: AMBER, flexShrink: 0, minWidth: 24 }}>✓</span>
                <span style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* 6. FULL SOURCE LIST */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: INK, marginBottom: 20 }}>6. FULL SOURCE LIST — VERIFY EVERYTHING YOURSELF</div>
            <p style={{ fontSize: 12, color: INK_MUTE, lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' }}>
              Every link below is publicly accessible. Click and verify.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 16px', background: '#fff', border: `1px solid ${AMBER}20`, borderRadius: 8, textDecoration: 'none', fontSize: 11, color: INK_SOFT, lineHeight: 1.4 }}>
                  <span style={{ color: AMBER, fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{s.name} <span style={{ color: AMBER_DARK }}>↗</span></span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: `${AMBER}20`, margin: '0 0 36px' }} />

          {/* CONTACT */}
          <div style={{ textAlign: 'left', padding: '8px 0' }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em', color: INK }}>Brian Hughes</h2>
            <p style={{ fontSize: 12, color: INK_MUTE, margin: '0 0 16px', lineHeight: 1.6 }}>
              Glasgow, Scotland · uf51.love · CIC formed<br />
              All market data sourced from publicly available industry reports. Full source list above — every link is publicly verifiable.
            </p>
            <a href="mailto:family@uf51.love?subject=UF51 Evidence Pack"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: AMBER_DARK, color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', borderRadius: 8, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 14, fontSize: 11, color: INK_MUTE }}>
              Live at <a href="https://uf51.love" style={{ color: AMBER_DARK, textDecoration: 'none' }}>uf51.love</a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

function StatBox({ stat, label, source, color }) {
  return (
    <div style={{ padding: '12px 14px', background: AMBER_LIGHT, borderRadius: 10 }}>
      <div style={{ fontSize: 16, fontWeight: 900, color, letterSpacing: '-0.02em' }}>{stat}</div>
      <div style={{ fontSize: 8, fontWeight: 700, color: INK_MUTE, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 7, color: AMBER, fontStyle: 'italic', marginTop: 2 }}>{source}</div>
    </div>
  );
}

function UF51Icon() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke={AMBER} strokeWidth="1.8" fill={`rgba(217,119,6,0.08)`} />
      <path d="M8 15 L11 15 L12.5 9 L14 21 L15.5 11 L17 19 L18.5 13 L20 17 L22 15" stroke={AMBER} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}