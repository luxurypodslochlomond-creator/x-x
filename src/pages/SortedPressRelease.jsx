import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// ─── SORTED PRESS RELEASE — 25 APRIL 2026 ────────────────────────────────────

export default function SortedPressRelease() {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('pr-body')?.innerText || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      if (y > 275) { doc.addPage(); y = margin; }
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    // Header
    addText('FOR IMMEDIATE RELEASE — 25 APRIL 2026', 8, true, [180, 80, 20], 2);
    addText('PRESS RELEASE', 8, false, [150, 150, 150], 6);
    divider();

    // Headline
    addText('New AI tool decodes scary official letters — and refuses to keep your data', 18, true, [20, 20, 20], 4);

    // Standfirst
    addText('SORTED launches today — an AI-powered tool that translates threatening letters from councils, courts, employers and landlords into plain English in seconds. Unlike every other AI tool on the market, it stores nothing, logs nothing, and sells nothing. Your letter is gone the moment you get your answer.', 11, false, [90, 90, 90], 8);
    divider();

    // Body
    addText('GLASGOW / LONDON, 25 April 2026 — Universal Frequency 51 (UF51) today announces the public launch of SORTED, a data-sovereign AI tool that decodes official letters, drafts replies, and helps users navigate disputes — in any language, for any jurisdiction, on any device.', 11, false, [50, 50, 50], 6);

    addText('The tool costs £9.99 per month. A solicitor costs £200 per hour. SORTED is for everyone who has ever received a brown envelope and felt their stomach drop.', 11, false, [50, 50, 50], 8);

    addText('THE PROBLEM', 9, true, [220, 80, 20], 3);
    addText('According to the World Justice Project, 5.1 billion people — two thirds of humanity — have unmet justice needs. In the United States alone, the Legal Services Corporation found that 92% of serious civil legal problems receive no professional legal help whatsoever. In the UK, 7 million adults are in severe financial distress, and the Money and Mental Health Policy Institute has found that 73% of people referred to bailiff action have a diagnosed mental health condition. A record 4.5 million children in the UK are living in poverty — many in households where a single enforcement notice or eviction letter triggers a cascade of crisis decisions made without any legal guidance.', 11, false, [50, 50, 50], 8);

    addText('People bury letters. They read them ten times. They don\'t understand them. They panic. Deadlines pass. Legal action follows. Things get worse.', 11, false, [50, 50, 50], 8);

    addText('THE INNOVATION', 9, true, [220, 80, 20], 3);
    addText('SORTED is built on radical data sovereignty. When a user submits a letter — by photo, upload, or paste — the AI analyses it, produces a structured breakdown in plain English, and the document is immediately and permanently discarded. No data is stored. No document content is logged. Nothing is used to train any model. Nothing is sold to any third party.', 11, false, [50, 50, 50], 6);

    addText('"Every other AI tool on the market is a surveillance business dressed up as a helper. SORTED is the opposite. We process your most sensitive documents and we refuse to keep them. That\'s not just a feature — it\'s a commitment."', 11, false, [80, 80, 80], 8);

    addText('THREE TOOLS IN ONE', 9, true, [220, 80, 20], 3);
    addText('SORTED launches with three integrated tools: Decode a Letter (plain-English breakdown with urgency level, deadlines, and recommended action); Write My Reply (professionally drafted responses, tailored by tone and jurisdiction); and Dispute Help (structured guidance for neighbour disputes, employment conflicts, tenancy issues, and more). Ten uses are free. Full access is £9.99 per month.', 11, false, [50, 50, 50], 8);

    addText('ETHICAL AI — WHAT IT ACTUALLY MEANS', 9, true, [220, 80, 20], 3);
    addText('SORTED is part of the Universal Frequency 51 ecosystem — a Glasgow-based social impact technology platform. Every product is built on the same ethical foundation: no surveillance, no data harvest, no corporate capture. The SaaS model is subscription-funded — not surveillance-funded.', 11, false, [50, 50, 50], 8);

    addText('AVAILABILITY', 9, true, [220, 80, 20], 3);
    addText('Available now at uf51.love/Sorted — no download, no installation, no account required for three free uses. Live globally, optimised for mobile.', 11, false, [50, 50, 50], 8);

    divider();

    addText('STATISTICS & SOURCES', 9, true, [150, 150, 150], 3);
    addText('• 5.1 billion people with unmet justice needs — World Justice Project', 10, false, [100, 100, 100], 2);
    addText('• 92% of serious US civil legal problems receive no professional help — Legal Services Corporation', 10, false, [100, 100, 100], 2);
    addText('• 7 million UK adults in severe financial distress — Joseph Rowntree Foundation 2024–25', 10, false, [100, 100, 100], 2);
    addText('• 73% of people referred to bailiffs have a mental health condition — Money & Mental Health Policy Institute', 10, false, [100, 100, 100], 2);
    addText('• 4.5 million children in UK poverty — Joseph Rowntree Foundation 2024–25', 10, false, [100, 100, 100], 2);

    divider();

    addText('PRESS CONTACT', 9, true, [220, 80, 20], 3);
    addText('Email: family@uf51.love', 11, false, [50, 50, 50], 2);
    addText('Platform: uf51.love', 11, false, [50, 50, 50], 2);
    addText('SORTED: uf51.love/Sorted', 11, false, [50, 50, 50], 2);
    addText('Media pack available on request.', 10, false, [130, 130, 130], 8);

    addText('— END —', 10, true, [180, 180, 180], 0);

    doc.save('SORTED-Press-Release-25-April-2026.pdf');
    setSaving(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,10,15,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(249,115,22,0.15)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BriefcaseIcon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>PRESS RELEASE</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ SAVE PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: copied ? '#22c55e' : '#f97316', background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.08)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(249,115,22,0.25)'}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY TEXT'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=Press Release — SORTED Launch 25 April 2026"
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '5px 12px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            EMAIL
          </a>
        </div>
      </header>

      {/* OUTLET TARGETS */}
      <div style={{ background: 'rgba(249,115,22,0.04)', borderBottom: '1px solid rgba(249,115,22,0.1)', padding: '10px 20px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)' }}>PITCH TO:</span>
          {['The Guardian', 'Wired UK', 'BBC Technology', 'The Big Issue', 'TechCrunch', 'The Times Tech'].map(o => (
            <span key={o} style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 4, padding: '2px 8px' }}>{o}</span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div id="pr-body" style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

          {/* META TAGS */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            <Tag text="FOR IMMEDIATE RELEASE" color="#f97316" />
            <Tag text="25 APRIL 2026" color="rgba(255,255,255,0.25)" />
            <Tag text="NO EMBARGO" color="rgba(255,255,255,0.25)" />
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>PRESS RELEASE</div>

          {/* HEADLINE */}
          <h1 style={{ fontSize: 'clamp(22px, 5vw, 34px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 14px', color: '#fff' }}>
            New AI tool decodes scary official letters —{' '}
            <span style={{ color: '#f97316' }}>and refuses to keep your data</span>
          </h1>

          {/* STANDFIRST */}
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 32px', fontStyle: 'italic', borderLeft: '3px solid rgba(249,115,22,0.35)', paddingLeft: 16 }}>
            SORTED launches today — an AI-powered tool that translates threatening letters from councils, courts, employers and landlords into plain English in seconds. Unlike every other AI tool on the market, it stores nothing, logs nothing, and sells nothing. Your letter is gone the moment you get your answer.
          </p>

          <Divider />

          <PRSection label="RELEASE">
            <PRBody><strong style={{ color: '#fff' }}>GLASGOW / LONDON, 25 April 2026</strong> — Universal Frequency 51 (UF51) today announces the public launch of <strong style={{ color: '#f97316' }}>SORTED</strong>, a data-sovereign AI tool that decodes official letters, drafts replies, and helps users navigate disputes — in any language, for any jurisdiction, on any device.</PRBody>
            <PRBody>The tool costs £9.99 per month. A solicitor costs £200 per hour. SORTED is for everyone who has ever received a brown envelope and felt their stomach drop.</PRBody>
          </PRSection>

          <PRSection label="THE PROBLEM">
            <PRBody>According to the World Justice Project, <Highlight>5.1 billion people</Highlight> — two thirds of humanity — have unmet justice needs. In the United States alone, the Legal Services Corporation found that <Highlight>92% of serious civil legal problems</Highlight> receive no professional legal help whatsoever. In the UK, <Highlight>7 million adults</Highlight> are in severe financial distress, and the Money and Mental Health Policy Institute has found that <Highlight>73% of people</Highlight> referred to bailiff action have a diagnosed mental health condition.</PRBody>
            <PRBody>A 2024/25 Joseph Rowntree Foundation report identified a record <Highlight>4.5 million children</Highlight> living in poverty in the UK — many in households where a single enforcement notice or eviction letter triggers a cascade of crisis decisions made without any legal guidance.</PRBody>
            <PRBody>People bury letters. They read them ten times. They don't understand them. They panic. Deadlines pass. Legal action follows. Things get worse.</PRBody>
          </PRSection>

          <PRSection label="THE INNOVATION">
            <PRBody>SORTED is built on a single principle: <strong style={{ color: '#fff' }}>radical data sovereignty</strong>. When a user submits a letter — by photo, upload, or paste — the AI analyses it, produces a structured breakdown in plain English, and the document is immediately and permanently discarded. No data is stored. No content is logged. Nothing is used to train any model. Nothing is sold to any third party.</PRBody>
            <Quote>"Every other AI tool on the market is a surveillance business dressed up as a helper. SORTED is the opposite. We process your most sensitive documents and we refuse to keep them. That's not just a feature — it's a commitment."</Quote>
            <PRBody>The tool automatically detects the user's jurisdiction — UK, US, Australia, EU, and 20+ territories — and tailors its advice accordingly. It supports any written language and works on any device without installation.</PRBody>
          </PRSection>

          <PRSection label="THREE TOOLS IN ONE">
            <PRBody>SORTED launches with three integrated tools: <strong style={{ color: '#fff' }}>Decode a Letter</strong> — plain-English breakdown with urgency level, deadlines, and recommended action; <strong style={{ color: '#fff' }}>Write My Reply</strong> — professionally drafted responses tailored by tone and jurisdiction; and <strong style={{ color: '#fff' }}>Dispute Help</strong> — structured guidance for neighbour disputes, employment conflicts, tenancy issues, and more.</PRBody>
            <PRBody>Ten uses are free — no card, no signup. Full access is £9.99 per month — less than one cup of coffee at most UK café chains.</PRBody>
          </PRSection>

          <PRSection label="ETHICAL AI — WHAT IT ACTUALLY MEANS">
            <PRBody>SORTED is part of the Universal Frequency 51 ecosystem — a Glasgow-based social impact technology platform building AI tools for environmental action, animal welfare, music, education, and access to justice. Every product is built on the same foundation: no surveillance, no data harvest, no corporate capture. SORTED is subscription-funded — not surveillance-funded.</PRBody>
            <PRBody>The platform does not require account creation to use the free tier. Users who subscribe can save case history — but all original document content remains non-existent on UF51's servers.</PRBody>
          </PRSection>

          <PRSection label="AVAILABILITY">
            <PRBody>SORTED is available now at <strong style={{ color: '#f97316' }}>uf51.love/Sorted</strong> — no download, no installation, no account required for three free uses. The platform is live globally and optimised for mobile.</PRBody>
          </PRSection>

          <Divider />

          {/* ABOUT */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>ABOUT UNIVERSAL FREQUENCY 51</div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.7 }}>Universal Frequency 51 (UF51) is a Glasgow-based social impact technology platform building AI-powered tools that put people first. The UF51 ecosystem includes PetSounds51 (therapeutic sound for animals), CB51 (AI artist management), SORTED (access to justice), Learn51 (free education for every child), and a suite of environmental action tools. All products are built on a data-sovereign foundation. UF51 is a Community Interest Company in formation.</p>
          </div>

          {/* STATS */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: 14 }}>STATISTICS & SOURCES</div>
            {[
              ['5.1 billion people with unmet justice needs', 'World Justice Project / Task Force on Justice'],
              ['92% of serious US civil legal problems receive no professional help', 'Legal Services Corporation Justice Gap Report'],
              ['7 million UK adults in severe financial distress', 'Joseph Rowntree Foundation, 2024–25'],
              ['73% of people referred to bailiffs have a mental health condition', 'Money and Mental Health Policy Institute'],
              ['4.5 million children in UK poverty — a record high', 'Joseph Rowntree Foundation, 2024–25'],
            ].map(([stat, src]) => (
              <div key={stat} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: 2 }}>{stat}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Source: {src}</div>
              </div>
            ))}
          </div>

          {/* CONTACT */}
          <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.18)', borderRadius: 10, padding: 20, marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: '#f97316', marginBottom: 14 }}>PRESS CONTACT</div>
            {[
              ['Email', 'family@uf51.love', 'mailto:family@uf51.love'],
              ['Platform', 'uf51.love', 'https://uf51.love'],
              ['SORTED', 'uf51.love/Sorted', 'https://uf51.love/Sorted'],
              ['Media pack', 'Email to request assets', 'mailto:family@uf51.love?subject=Press Assets — SORTED'],
            ].map(([label, value, href]) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', width: 70, flexShrink: 0 }}>{label}</span>
                <a href={href} style={{ fontSize: 13, color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>{value}</a>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.3em' }}>— END —</div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function PRSection({ label, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: '#f97316', marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}
function PRBody({ children }) {
  return <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.8 }}>{children}</p>;
}
function Highlight({ children }) {
  return <strong style={{ color: '#f97316' }}>{children}</strong>;
}
function Quote({ children }) {
  return <blockquote style={{ borderLeft: '3px solid rgba(249,115,22,0.4)', paddingLeft: 16, margin: '4px 0', fontStyle: 'italic', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{children}</blockquote>;
}
function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '28px 0' }} />;
}
function Tag({ text, color }) {
  return <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color, border: `1px solid ${color}40`, borderRadius: 4, padding: '3px 8px' }}>{text}</span>;
}
function BriefcaseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="none" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="17" width="6" height="4" rx="1" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.2)" />
    </svg>
  );
}