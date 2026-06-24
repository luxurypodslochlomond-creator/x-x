import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { FileText, ExternalLink, Database, FlaskConical, Scale, Shield } from 'lucide-react';

// UF51 — Evidence Pack
// Hard data. Cited sources. No hype.
// The research dossier that builds belief while someone decompresses in Italy.

const Source = ({ children }) => (
  <span style={{ fontSize: 9, color: '#8a7d6f', fontStyle: 'italic' }}> — {children}</span>
);

const Stat = ({ value, label, source }) => (
  <div style={{ padding: '18px 16px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10 }}>
    <div style={{ fontSize: 24, fontWeight: 900, color: '#2a2520', letterSpacing: '-0.02em', marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 10, fontWeight: 700, color: '#6b6055', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4, marginBottom: 6 }}>{label}</div>
    {source && <div style={{ fontSize: 8, color: '#a09588', fontStyle: 'italic' }}>{source}</div>}
  </div>
);

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

    addText('UF51', 22, true, [40, 35, 30], 1);
    addText('EVIDENCE PACK — JUNE 2026', 7, true, [160, 150, 135], 4);
    addText('Market data, published research, and technical facts.', 11, false, [100, 90, 75], 6);

    divider();

    // MARKET INTELLIGENCE
    addText('1. MARKET INTELLIGENCE', 12, true, [40, 35, 30], 3);

    addText('PETSOUNDS51 — Pet Care & Animal Wellness', 10, true, [184, 134, 11], 2);
    addText('Global pet care market: $273.42 billion (2025), projected to $289.17 billion in 2026.', 9, false, [80, 70, 60], 1);
    addText('Source: Fortune Business Insights, Pet Care Market Report 2026.', 8, false, [140, 130, 115], 1);
    addText('UK pet population: 13.5M dogs, 12.5M cats, 38% of households acquired a new pet recently.', 9, false, [80, 70, 60], 1);
    addText('Source: UK Pet Food (PFMA), 2024 Pet Population Data.', 8, false, [140, 130, 115], 1);
    addText('US pet industry: $158 billion (2025). Source: APPA State of the Industry Report 2025.', 9, false, [80, 70, 60], 3);

    addText('SORTED — Legal Technology & Access to Justice', 10, true, [196, 100, 10], 2);
    addText('Global legal technology market: $29.81 billion (2025), projected to $73.32 billion by 2035 (CAGR ~9.4%).', 9, false, [80, 70, 60], 1);
    addText('Source: Precedence Research, Legal Technology Market 2025.', 8, false, [140, 130, 115], 1);
    addText('Legal AI market: $1.9 billion (2024), CAGR 13.1% through 2034. Source: GM Insights, Legal AI Market Report.', 9, false, [80, 70, 60], 3);

    addText('EARTH51 — ESG & Environmental Services', 10, true, [30, 138, 78], 2);
    addText('Corporate ESG reporting is now mandatory for large EU companies under CSRD (2025 reporting cycle for FY2024).', 9, false, [80, 70, 60], 1);
    addText('Source: European Commission CSRD; Baker Tilly ESG Reporting Analysis 2025.', 8, false, [140, 130, 115], 1);
    addText('61% of global companies committed to ESG reporting in 2024 (up from 60% in 2023). Source: Atrius State of Corporate Sustainability 2025.', 9, false, [80, 70, 60], 1);
    addText('Annual green bond issuance: ~$700 billion. Source: Responsible Alpha, Corporate Sustainability Reporting 2025.', 9, false, [80, 70, 60], 6);

    divider();

    // SCIENTIFIC RESEARCH
    addText('2. SCIENTIFIC RESEARCH BACKING', 12, true, [40, 35, 30], 3);
    addText('The science behind PetSounds51 is not invented. It builds on published, peer-reviewed research:', 9, false, [80, 70, 60], 3);

    addText('• Noise anxiety in dogs is a clinically recognised condition with established treatment protocols.', 9, false, [80, 70, 60], 1);
    addText('  Source: PMC (NIH), "Therapy and Prevention of Noise Fears in Dogs — A Review" (2023).', 8, false, [140, 130, 115], 2);

    addText('• Music as a perioperative, non-pharmacological intervention in dogs and cats is an active area of veterinary research.', 9, false, [80, 70, 60], 1);
    addText('  Source: Frontiers in Veterinary Science, 2025.', 8, false, [140, 130, 115], 2);

    addText('• Psychoacoustically designed music reduced anxiety behaviours in dogs by 70%, compared to 36% with conventional music.', 9, false, [80, 70, 60], 1);
    addText('  Source: iCalmPet Research (based on Through a Dog\'s Ear studies).', 8, false, [140, 130, 115], 2);

    addText('• Bioacoustic music (Through a Dog\'s Ear) is clinically validated and used in veterinary practice.', 9, false, [80, 70, 60], 1);
    addText('  Source: IVC Journal, "Three-Pronged Approach to Sound Sensitivity in Dogs and Cats."', 8, false, [140, 130, 115], 6);

    divider();

    // ACCESS TO JUSTICE CRISIS
    addText('3. THE ACCESS TO JUSTICE CRISIS', 12, true, [40, 35, 30], 3);
    addText('SORTED exists because the system is broken. This is not opinion — it is documented:', 9, false, [80, 70, 60], 3);

    addText('• 92% of low-income civil legal problems receive no or insufficient legal assistance.', 9, false, [80, 70, 60], 1);
    addText('  Source: Legal Services Corporation, The Justice Gap Report.', 8, false, [140, 130, 115], 2);

    addText('• 40%+ of civil legal aid providers exited the sector between 2011 and 2024, creating "legal aid deserts."', 9, false, [80, 70, 60], 1);
    addText('  Source: ILFM, "The Crisis in Legal Aid and How Technology Can Help."', 8, false, [140, 130, 115], 2);

    addText('• 69% of people have no access to a local community care legal aid provider; 88% for education law.', 9, false, [80, 70, 60], 1);
    addText('  Source: The Law Society, Legal Aid Deserts (UK).', 8, false, [140, 130, 115], 2);

    addText('• Criminal legal aid firms: solicitor numbers fallen 30%+ since 2014/15.', 9, false, [80, 70, 60], 1);
    addText('  Source: Institute for Government, Performance Tracker 2025.', 8, false, [140, 130, 115], 6);

    divider();

    // TECHNICAL FACTS
    addText('4. TECHNICAL FACTS — WHAT IS ACTUALLY BUILT', 12, true, [40, 35, 30], 3);
    addText('PetSounds51: Browser-native real-time audio synthesis. No app download, no hardware. Works offline (PWA). Species-specific frequency protocols for dogs, cats, horses. Stripe checkout live (£29.99/year and £9.99/month).', 9, false, [80, 70, 60], 3);
    addText('SORTED: AI-powered document decoder. Processes legal letters in memory — zero data storage architecture. Multi-language, multi-jurisdiction. PWA with offline case vault (local storage). Stripe checkout live (£9.99/month, £9.99 one-time lifetime).', 9, false, [80, 70, 60], 3);
    addText('Earth51: AI-verified litter collection with fraud detection and weight estimation. COPPA-compliant (child-safe data). Token reward system. Generates verified, reportable ESG impact data. Needs refinement before launch.', 9, false, [80, 70, 60], 6);

    divider();

    // CREDIBILITY ANCHORS
    addText('5. CREDIBILITY & COMPLIANCE ANCHORS', 12, true, [40, 35, 30], 3);
    addText('• Community Interest Company (CIC): Formed and registered. 10% of all revenue committed to CIC mission.', 9, false, [80, 70, 60], 2);
    addText('• Stripe: Live payment infrastructure (not test mode). Real transactions processing.', 9, false, [80, 70, 60], 2);
    addText('• COPPA compliant: Earth51 designed for child-safe data from day one.', 9, false, [80, 70, 60], 2);
    addText('• GDPR/CCPA aligned: SORTED processes documents in memory — never stores user data.', 9, false, [80, 70, 60], 2);
    addText('• Open source architecture: Built on transparent, auditable technology stack.', 9, false, [80, 70, 60], 6);

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
          <Database size={20} style={{ color: '#b8860b' }} />
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

          {/* INTRO */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.035em', margin: '0 0 16px', color: '#2a2520' }}>
              The data behind<br /><span style={{ color: '#b8860b' }}>the decision.</span>
            </h1>
            <p style={{ fontSize: 14, color: '#6b6055', lineHeight: 1.75, margin: 0, maxWidth: 580, borderLeft: '3px solid rgba(184,134,11,0.3)', paddingLeft: 18 }}>
              Every claim in the Partner Brief is backed by publicly available research. This pack compiles the market data, scientific studies, and technical facts — sourced and citable. No invented numbers. No spin.
            </p>
          </div>

          {/* 1. MARKET INTELLIGENCE */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Database size={14} style={{ color: '#b8860b' }} />
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520' }}>1. MARKET INTELLIGENCE</span>
            </div>

            {/* PetSounds51 */}
            <div style={{ marginBottom: 24, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#b8860b', margin: '0 0 14px', letterSpacing: '-0.02em' }}>PetSounds51 — Pet Care & Animal Wellness</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 14 }}>
                <Stat value="$273B" label="Global pet care market (2025)" source="Fortune Business Insights" />
                <Stat value="13.5M" label="UK dogs (2024)" source="UK Pet Food / PFMA" />
                <Stat value="12.5M" label="UK cats (2024)" source="UK Pet Food / PFMA" />
                <Stat value="$158B" label="US pet industry (2025)" source="APPA" />
              </div>
              <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.6, margin: 0 }}>
                The pet care market is one of the few consumer markets that grew through recession and continues accelerating. Humanisation of pets drives spending on wellness, anxiety, and behavioural health — exactly where PetSounds51 sits.
              </p>
            </div>

            {/* SORTED */}
            <div style={{ marginBottom: 24, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#c47200', margin: '0 0 14px', letterSpacing: '-0.02em' }}>SORTED — Legal Technology & Access to Justice</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 14 }}>
                <Stat value="$29.8B" label="Legal tech market (2025)" source="Precedence Research" />
                <Stat value="$73.3B" label="Projected by 2035" source="Precedence Research" />
                <Stat value="$1.9B" label="Legal AI market (2024)" source="GM Insights" />
                <Stat value="13.1%" label="Legal AI CAGR" source="GM Insights" />
              </div>
              <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.6, margin: 0 }}>
                Legal tech is one of the fastest-growing B2B sectors. AI-powered document processing is the frontier — and the access-to-justice crisis (see below) creates enormous public-sector and consumer demand.
              </p>
            </div>

            {/* Earth51 */}
            <div style={{ padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#1e8a4e', margin: '0 0 14px', letterSpacing: '-0.02em' }}>Earth51 — ESG & Environmental Services</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 14 }}>
                <Stat value="Mandatory" label="ESG reporting (EU CSRD)" source="European Commission" />
                <Stat value="61%" label="Companies reporting ESG (2024)" source="Atrius 2025" />
                <Stat value="$700B" label="Annual green bond issuance" source="Responsible Alpha" />
              </div>
              <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.6, margin: 0 }}>
                ESG reporting is no longer optional for large companies — it is regulated. Verified, fraud-proof environmental impact data is a genuine market need. Earth51 generates exactly that data, gamified through children's litter picks.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 2. SCIENTIFIC RESEARCH */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <FlaskConical size={14} style={{ color: '#b8860b' }} />
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520' }}>2. SCIENTIFIC RESEARCH BACKING</span>
            </div>
            <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.7, margin: '0 0 20px' }}>
              The science behind PetSounds51 is not invented. It builds on published, peer-reviewed research in veterinary psychoacoustics and animal behavioural science:
            </p>
            {[
              {
                finding: 'Noise anxiety in dogs is a clinically recognised condition with established treatment protocols.',
                source: 'PMC (NIH) — "Therapy and Prevention of Noise Fears in Dogs: A Review" (2023)',
              },
              {
                finding: 'Music as a perioperative, non-pharmacological intervention in dogs and cats is an active area of veterinary research.',
                source: 'Frontiers in Veterinary Science (2025)',
              },
              {
                finding: 'Psychoacoustically designed music reduced anxiety behaviours in dogs by 70%, vs 36% with conventional music.',
                source: 'iCalmPet Research / Through a Dog\'s Ear studies',
              },
              {
                finding: 'Bioacoustic music is clinically validated and used in veterinary practice to reduce stress.',
                source: 'IVC Journal — "Three-Pronged Approach to Sound Sensitivity"',
              },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 12, padding: '16px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10 }}>
                <p style={{ fontSize: 13, color: '#2a2520', fontWeight: 600, lineHeight: 1.6, margin: '0 0 8px' }}>{r.finding}</p>
                <p style={{ fontSize: 11, color: '#8a7d6f', margin: 0 }}>
                  <ExternalLink size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  {r.source}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 3. ACCESS TO JUSTICE CRISIS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Scale size={14} style={{ color: '#b8860b' }} />
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520' }}>3. THE ACCESS TO JUSTICE CRISIS</span>
            </div>
            <p style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.7, margin: '0 0 20px' }}>
              SORTED exists because the system is broken. This is not opinion — it is documented:
            </p>
            {[
              { stat: '92%', text: 'of low-income civil legal problems receive no or insufficient legal assistance.', source: 'Legal Services Corporation — The Justice Gap Report' },
              { stat: '40%+', text: 'of civil legal aid providers exited the sector between 2011–2024, creating "legal aid deserts."', source: 'ILFM — Crisis in Legal Aid' },
              { stat: '69%', text: 'of people have no access to a local community care legal aid provider (88% for education law).', source: 'The Law Society — Legal Aid Deserts (UK)' },
              { stat: '30%+', text: 'decline in criminal legal aid solicitors since 2014/15.', source: 'Institute for Government — Performance Tracker 2025' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 12, padding: '16px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#c47200', letterSpacing: '-0.02em', flexShrink: 0, minWidth: 60 }}>{d.stat}</div>
                <div>
                  <p style={{ fontSize: 13, color: '#2a2520', fontWeight: 600, lineHeight: 1.5, margin: '0 0 6px' }}>{d.text}</p>
                  <p style={{ fontSize: 10, color: '#8a7d6f', margin: 0 }}>{d.source}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* 4. TECHNICAL FACTS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <FileText size={14} style={{ color: '#b8860b' }} />
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520' }}>4. TECHNICAL FACTS — WHAT IS ACTUALLY BUILT</span>
            </div>
            {[
              {
                name: 'PetSounds51',
                color: '#b8860b',
                points: [
                  'Browser-native real-time audio synthesis (no pre-recorded playlists)',
                  'No app download, no hardware — works as PWA, offline-capable',
                  'Species-specific frequency protocols for dogs, cats, horses',
                  'Stripe checkout live: £29.99/year and £9.99/month',
                ],
              },
              {
                name: 'SORTED',
                color: '#c47200',
                points: [
                  'AI-powered legal document decoder — any language, any jurisdiction',
                  'Zero data storage architecture: documents processed in memory, never stored',
                  'PWA with offline case vault (local storage, user-owned)',
                  'Stripe checkout live: £9.99/month and £9.99 one-time lifetime',
                ],
              },
              {
                name: 'Earth51',
                color: '#1e8a4e',
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
                <h3 style={{ fontSize: 16, fontWeight: 900, color: p.color, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{p.name}</h3>
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

          {/* 5. CREDIBILITY ANCHORS */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Shield size={14} style={{ color: '#b8860b' }} />
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#2a2520' }}>5. CREDIBILITY & COMPLIANCE ANCHORS</span>
            </div>
            {[
              'Community Interest Company (CIC): Formed and registered. 10% of all revenue committed to CIC mission.',
              'Stripe: Live payment infrastructure (not test mode). Real transactions processing.',
              'COPPA compliant: Earth51 designed for child-safe data from day one.',
              'GDPR/CCPA aligned: SORTED processes documents in memory — never stores user data.',
              'Open source architecture: Built on transparent, auditable technology stack.',
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start', padding: '14px 18px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10 }}>
                <Shield size={14} style={{ color: '#1e8a4e', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: '#6b6055', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 36px' }} />

          {/* FOOTER */}
          <div style={{ padding: '8px 0' }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em', color: '#2a2520' }}>Brian Hughes</h2>
            <p style={{ fontSize: 11, color: '#a09588', margin: 0, lineHeight: 1.6 }}>
              Glasgow, Scotland · uf51.love · CIC formed<br />
              All market data sourced from publicly available industry reports. Full sources cited inline.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}