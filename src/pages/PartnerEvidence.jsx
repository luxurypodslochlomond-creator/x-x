import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// UF51 — Evidence One-Pager
// Simple. Custom. Honest. Amber on cream.
// Numbers are real, but context is achievable — not unicorn fantasy.

const AMBER = '#d97706';
const AMBER_DARK = '#b45309';
const CREAM = '#fdf9f0';
const CREAM_DEEP = '#faf8f5';
const INK = '#1a1208';
const INK_SOFT = '#5a4a35';
const INK_MUTE = '#9a8a70';
const BORDER = 'rgba(217,119,6,0.18)';

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
      doc.setDrawColor(225, 215, 195);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    addText('UF51', 22, true, [26, 18, 8], 1);
    addText('EVIDENCE — JUNE 2026', 8, true, [180, 130, 6], 8);

    addText('Small team. Real products. Honest numbers.', 14, true, [26, 18, 8], 3);
    addText('Three products are live and taking real payments via Stripe. This page exists to give you context — what is built, what the markets look like, and what is honestly achievable. No unicorn projections. Sourced figures throughout.', 10, false, [80, 70, 50], 8);

    divider();

    // WHAT'S LIVE
    addText('WHAT IS ACTUALLY LIVE', 11, true, [180, 130, 6], 4);

    addText('PetSounds51', 10, true, [26, 18, 8], 2);
    addText('Sound therapy for anxious pets. Browser-native, no app download. Species-specific protocols for dogs, cats, horses. Live on Stripe: £29.99/year, £9.99/month.', 9, false, [80, 70, 50], 4);

    addText('SORTED', 10, true, [26, 18, 8], 2);
    addText('Legal document decoder — any language, any jurisdiction. Documents processed in memory, never stored. PWA with local case vault. Live on Stripe: £9.99/month, £9.99 lifetime.', 9, false, [80, 70, 50], 4);

    addText('Earth51', 10, true, [26, 18, 8], 2);
    addText('AI-verified litter collection with fraud detection. COPPA-compliant. Generates verified ESG impact data. Status: functional but needs refinement before public launch.', 9, false, [80, 70, 50], 8);

    divider();

    // MARKET CONTEXT
    addText('MARKET CONTEXT (WHY THESE PRODUCTS)', 11, true, [180, 130, 6], 4);

    addText('Pet care is a growing, recession-resilient market. Global market ~$263B (2024, Grand View Research). UK has ~13M dogs and ~12M cats (PFMA / UK Pet Food). Spending on pet wellness accelerates as pets are treated as family.', 9, false, [80, 70, 50], 4);

    addText('Legal tech is growing fast — ~$29B (2025), projected ~$73B by 2035, CAGR ~9.4% (Precedence Research). The access-to-justice crisis creates real demand: 92% of low-income Americans get no or inadequate legal help (Legal Services Corporation). UK legal aid deserts are expanding (The Law Society).', 9, false, [80, 70, 50], 4);

    addText('ESG reporting is now regulated. The EU CSRD makes sustainability reporting mandatory for large companies (European Commission). Global green bond issuance reached ~$700B in 2024 (BIS / Climate Bonds Initiative). Verified environmental data is a genuine need.', 9, false, [80, 70, 50], 8);

    divider();

    // SCIENCE
    addText('THE SCIENCE (PETSOUNDS51)', 11, true, [180, 130, 6], 4);
    addText('- Noise anxiety in dogs (fireworks, storms) is a clinically recognised condition with established treatment protocols. (PMC / NIH, 2023)', 9, false, [80, 70, 50], 2);
    addText('- Music as a non-pharmacological stress-reduction intervention for dogs and cats is an active area of veterinary research. (Frontiers in Veterinary Science)', 9, false, [80, 70, 50], 2);
    addText('- Psychoacoustically designed music reduced anxiety behaviours in dogs in observational studies. (Through a Dog\'s Ear / iCalmPet, Leeds & Spector)', 9, false, [80, 70, 50], 8);

    divider();

    // WHAT'S ACHIEVABLE
    addText('WHAT IS HONESTLY ACHIEVABLE', 11, true, [180, 130, 6], 4);
    addText("This is not a pitch to capture a $263B market. It is a small operation building useful tools that people pay for. The achievable path is: grow each product's paying user base organically through community trust and partner networks. PetSounds51 at £29.99/year needs ~3,400 subscribers to reach £100k/year. SORTED at £9.99/month needs ~840 subscribers for the same. These are not big numbers — they are achievable with focused community-driven growth, not paid ad blitzes. The market data above confirms the demand exists. The question is reaching people, not whether they exist.", 9, false, [80, 70, 50], 8);

    divider();

    addText('Brian Hughes — family@uf51.love', 11, true, [26, 18, 8], 1);
    addText('Glasgow, Scotland · uf51.love · CIC formed · All figures sourced from publicly available research.', 8, false, [120, 110, 90], 0);

    doc.save('UF51-Evidence-June-2026.pdf');
    setSaving(false);
  };

  const sources = [
    { name: 'Grand View Research — Pet Care Market', url: 'https://www.grandviewresearch.com/industry-analysis/pet-care-market' },
    { name: 'PFMA / UK Pet Food — Pet Population', url: 'https://www.ukpetfood.org/information-centre/statistics/pet-population.html' },
    { name: 'APPA — US Pet Industry Figures', url: 'https://americanpetproducts.org/industry-trends-and-stats' },
    { name: 'Precedence Research — Legal Tech Market', url: 'https://www.precedenceresearch.com/legal-tech-market' },
    { name: 'Legal Services Corporation — The Justice Gap', url: 'https://justicegap.lsc.gov/resource/2022-justice-gap-report/' },
    { name: 'The Law Society — Legal Aid Deserts', url: 'https://www.lawsociety.org.uk/topics/legal-aid' },
    { name: 'European Commission — CSRD Directive', url: 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en' },
    { name: 'Bank for International Settlements — Green Bonds', url: 'https://www.bis.org/publ/qtrpdf/r_qt2503d.pdf' },
    { name: 'PMC / NIH — Noise Fears in Dogs (2023)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9852993/' },
    { name: 'Through a Dog\'s Ear / iCalmPet Research', url: 'https://icalmpet.com/pages/research' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM_DEEP} 40%)`, color: INK, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* SIMPLE HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,245,0.98)', backdropFilter: 'blur(24px)', borderBottom: `1px solid ${BORDER}`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.06em', color: INK }}>UF51</div>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', color: AMBER, opacity: 0.7 }}>EVIDENCE</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: AMBER_DARK, border: 'none', borderRadius: 8, padding: '9px 18px', cursor: 'pointer' }}>
            {saving ? '…' : '↓ PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 700, color: copied ? AMBER_DARK : INK_SOFT, background: copied ? 'rgba(217,119,6,0.08)' : 'transparent', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '9px 18px', cursor: 'pointer' }}>
            {copied ? '✓' : 'COPY'}
          </motion.button>
        </div>
      </header>

      <div id="evidence-body" style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px 72px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px', color: INK }}>
              Small team.<br />
              <span style={{ color: AMBER }}>Real products.</span><br />
              Honest numbers.
            </h1>
            <p style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
              Three products are live and taking real payments via Stripe. This page gives you context — what is built, what the markets look like, and what is honestly achievable. No unicorn projections. Every figure is sourced.
            </p>
          </div>

          {/* WHAT'S LIVE */}
          <Section label="WHAT IS ACTUALLY LIVE">
            <ProductRow name="PetSounds51" tag="PET WELLNESS" price="£29.99/yr · £9.99/mo">
              Sound therapy for anxious pets. Browser-native, no app download. Species-specific protocols for dogs, cats, horses. Live on Stripe.
            </ProductRow>
            <ProductRow name="SORTED" tag="LEGAL TECH" price="£9.99/mo · £9.99 lifetime">
              Legal document decoder — any language, any jurisdiction. Documents processed in memory, never stored. PWA with local case vault.
            </ProductRow>
            <ProductRow name="Earth51" tag="ESG / ENVIRONMENT" price="Pre-launch">
              AI-verified litter collection with fraud detection. COPPA-compliant. Generates verified ESG impact data. Needs refinement before public launch.
            </ProductRow>
          </Section>

          <Divider />

          {/* MARKET CONTEXT */}
          <Section label="MARKET CONTEXT">
            <ContextRow title="Pet Care">
              Global market ~$263B (2024). UK has ~13M dogs, ~12M cats. Spending on pet wellness accelerates as pets are treated as family. Recession-resilient.
              <Cite>Grand View Research · PFMA / UK Pet Food</Cite>
            </ContextRow>
            <ContextRow title="Legal Tech">
              ~$29B (2025), projected ~$73B by 2035. 92% of low-income Americans get no or inadequate legal help. UK legal aid deserts are expanding. Real demand exists.
              <Cite>Precedence Research · Legal Services Corporation · The Law Society</Cite>
            </ContextRow>
            <ContextRow title="ESG Reporting">
              EU CSRD makes sustainability reporting mandatory for large companies. Global green bond issuance ~$700B (2024). Verified environmental data is a genuine need.
              <Cite>European Commission · BIS / Climate Bonds Initiative</Cite>
            </ContextRow>
          </Section>

          <Divider />

          {/* SCIENCE */}
          <Section label="THE SCIENCE (PETSOUNDS51)">
            <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: '0 0 16px' }}>
              The science builds on published, peer-reviewed research:
            </p>
            <Bullet>Noise anxiety in dogs (fireworks, storms) is a clinically recognised condition with established treatment protocols. <Cite inline>PMC / NIH, 2023</Cite></Bullet>
            <Bullet>Music as a non-pharmacological stress-reduction intervention for dogs and cats is an active area of veterinary research. <Cite inline>Frontiers in Veterinary Science</Cite></Bullet>
            <Bullet>Psychoacoustically designed music reduced anxiety behaviours in dogs in observational studies. <Cite inline>Through a Dog's Ear / iCalmPet</Cite></Bullet>
          </Section>

          <Divider />

          {/* WHAT'S ACHIEVABLE */}
          <Section label="WHAT IS HONESTLY ACHIEVABLE">
            <div style={{ padding: '20px 22px', background: 'rgba(217,119,6,0.04)', borderLeft: `3px solid ${AMBER}`, borderRadius: 8 }}>
              <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.7, margin: 0 }}>
                This is not a pitch to capture a $263B market. It is a small operation building useful tools that people pay for.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, margin: '16px 0', flexWrap: 'wrap' }}>
              <AchievableStat figure="~3,400" label="PS51 subscribers = £100k/yr" />
              <AchievableStat figure="~840" label="SORTED subscribers = £100k/yr" />
            </div>
            <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: 0 }}>
              These are not big numbers. They are achievable with focused, community-driven growth — not paid ad blitzes. The market data confirms the demand exists. The question is reaching people, not whether they exist.
            </p>
          </Section>

          <Divider />

          {/* SOURCES */}
          <Section label="VERIFY EVERYTHING YOURSELF">
            <p style={{ fontSize: 11, color: INK_MUTE, lineHeight: 1.5, margin: '0 0 12px', fontStyle: 'italic' }}>
              Every link below is publicly accessible. Click and verify.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', gap: 8, padding: '8px 12px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 6, textDecoration: 'none', fontSize: 11, color: INK_SOFT, lineHeight: 1.3 }}>
                  <span style={{ color: AMBER, fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{s.name} <span style={{ color: AMBER_DARK }}>↗</span></span>
                </a>
              ))}
            </div>
          </Section>

          <Divider />

          {/* CONTACT */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.02em', color: INK }}>Brian Hughes</h2>
            <p style={{ fontSize: 12, color: INK_MUTE, margin: '0 0 14px', lineHeight: 1.6 }}>
              Glasgow, Scotland · uf51.love · CIC formed
            </p>
            <a href="mailto:family@uf51.love?subject=UF51 Evidence"
              style={{ display: 'inline-block', padding: '12px 24px', background: AMBER_DARK, color: '#fff', fontWeight: 700, fontSize: 12, borderRadius: 8, textDecoration: 'none' }}>
              family@uf51.love
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// — SIMPLE COMPONENTS —

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', color: AMBER, marginBottom: 16 }}>{label}</div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: BORDER, margin: '0 0 32px' }} />;
}

function ProductRow({ name, tag, price, children }) {
  return (
    <div style={{ marginBottom: 12, padding: '18px 20px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>{name}</span>
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', color: INK_MUTE }}>{tag}</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: AMBER, whiteSpace: 'nowrap' }}>{price}</span>
      </div>
      <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.55, margin: 0 }}>{children}</p>
    </div>
  );
}

function ContextRow({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 style={{ fontSize: 13, fontWeight: 800, color: INK, margin: '0 0 6px' }}>{title}</h3>
      <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.6, margin: 0 }}>{children}</p>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
      <span style={{ color: AMBER, fontWeight: 900, flexShrink: 0, fontSize: 13 }}>•</span>
      <span style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.55 }}>{children}</span>
    </div>
  );
}

function Cite({ children, inline }) {
  return (
    <span style={{
      display: inline ? 'inline' : 'block',
      fontSize: 10,
      color: AMBER_DARK,
      fontStyle: 'italic',
      marginTop: inline ? 0 : 4,
    }}>{children}</span>
  );
}

function AchievableStat({ figure, label }) {
  return (
    <div style={{ flex: '1 1 200px', padding: '14px 16px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, textAlign: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: AMBER_DARK, letterSpacing: '-0.02em' }}>{figure}</div>
      <div style={{ fontSize: 9, fontWeight: 700, color: INK_MUTE, letterSpacing: '0.04em', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function UF51Icon() {
  return (
    <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke={AMBER} strokeWidth="1.8" fill="rgba(217,119,6,0.08)" />
      <path d="M8 15 L11 15 L12.5 9 L14 21 L15.5 11 L17 19 L18.5 13 L20 17 L22 15" stroke={AMBER} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}