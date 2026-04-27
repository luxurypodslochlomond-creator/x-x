import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

// SORTED — Investor & Partner Press Release
// Designed for ESG-focused investors, financial services contacts, HSBC-adjacent partners

export default function SortedInvestorPress() {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('pr-body')?.innerText || '';
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
      if (y > 275) { doc.addPage(); y = margin; }
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    addText('INVESTOR & PARTNER BRIEF — APRIL 2026', 8, true, [80, 80, 80], 2);
    addText('CONFIDENTIAL — NOT FOR GENERAL DISTRIBUTION', 8, false, [180, 80, 20], 6);
    divider();
    addText('SORTED — Access to Justice at Scale', 20, true, [20, 20, 20], 4);
    addText('AI-Powered Legal Clarity for 5.1 Billion People With Unmet Justice Needs', 12, false, [100, 100, 100], 8);
    divider();

    addText('EXECUTIVE SUMMARY', 9, true, [220, 80, 20], 3);
    addText('SORTED is a subscription SaaS product that delivers AI-powered legal document decoding, reply drafting, and dispute resolution guidance — in any language, for any jurisdiction, on any device. It is live, generating revenue, and built on a data-sovereign architecture that stores nothing. The addressable market is 5.1 billion people with unmet justice needs (World Justice Project). The UK alone has 7 million adults in severe financial distress.', 11, false, [50, 50, 50], 8);

    addText('THE ESG CASE', 9, true, [220, 80, 20], 3);
    addText('SORTED directly addresses three UN Sustainable Development Goals: SDG 1 (No Poverty), SDG 10 (Reduced Inequalities), and SDG 16 (Peace, Justice and Strong Institutions). It is built as a Community Interest Company — profit is a mechanism for impact, not an end in itself. No data is harvested. No surveillance. No corporate capture of vulnerable user data. This is the rarest thing in AI: a product with a genuine social contract.', 11, false, [50, 50, 50], 8);

    addText('FINANCIAL MODEL', 9, true, [220, 80, 20], 3);
    addText('Revenue: £9.99/month subscription (Stripe). Infrastructure: serverless, near-zero marginal cost per user. No human staff required to serve users. The model scales to millions of users on existing architecture. B2B licensing pathway exists for legal aid organisations, financial institutions, insurance providers, and HR platforms.', 11, false, [50, 50, 50], 8);

    addText('B2B OPPORTUNITY — FINANCIAL SERVICES', 9, true, [220, 80, 20], 3);
    addText('SORTED is a natural fit for banks, insurers, and HR platforms as a white-label employee/customer benefit. Consider: a bank\'s most financially distressed customers receive enforcement letters, bailiff notices, and court summons they cannot understand. SORTED, embedded as a white-label tool, reduces escalation, reduces write-offs, and demonstrates measurable ESG commitment to regulators and shareholders. We are open to partnership conversations.', 11, false, [50, 50, 50], 8);

    addText('TRACTION', 9, true, [220, 80, 20], 3);
    addText('• Live globally — no waitlist, no invitation required\n• Three free uses before £9.99/month paywall\n• Stripe integration live in real payment mode\n• Jurisdiction detection: UK, US, Australia, EU, 20+ territories\n• Language support: any written language\n• No server storage of document content — zero liability exposure', 11, false, [50, 50, 50], 8);

    addText('THE TEAM & PLATFORM', 9, true, [220, 80, 20], 3);
    addText('SORTED is built and operated by Universal Frequency 51 (UF51) — a Glasgow-based social impact technology company. The UF51 platform includes PetSounds51 (therapeutic sound for animals), CB51 (AI artist management), Learn51 (free education for every child), and environmental action tools. UF51 is a Community Interest Company in formation.', 11, false, [50, 50, 50], 8);

    divider();
    addText('CONTACT', 9, true, [220, 80, 20], 3);
    addText('Email: family@uf51.love', 11, false, [50, 50, 50], 2);
    addText('SORTED: uf51.love/Sorted', 11, false, [50, 50, 50], 2);
    addText('Platform: uf51.love', 11, false, [50, 50, 50], 8);
    addText('— END —', 10, true, [180, 180, 180], 0);

    doc.save('SORTED-Investor-Brief-April-2026.pdf');
    setSaving(false);
  };

  const stats = [
    { value: '5.1B', label: 'People with unmet justice needs', source: 'World Justice Project' },
    { value: '£9.99', label: 'Per month — less than one solicitor minute', source: '' },
    { value: '92%', label: 'US civil legal problems get no professional help', source: 'Legal Services Corporation' },
    { value: '7M', label: 'UK adults in severe financial distress', source: 'Joseph Rowntree Foundation' },
    { value: 'SDG 1/10/16', label: 'UN Sustainable Development Goals addressed', source: '' },
    { value: '£0', label: 'Marginal server cost per additional user', source: '' },
  ];

  const esgPoints = [
    { sdg: 'SDG 1', title: 'No Poverty', body: 'SORTED directly intervenes in the cascade from legal letter → missed deadline → escalation → financial crisis → poverty. A single decoded bailiff notice can prevent eviction.' },
    { sdg: 'SDG 10', title: 'Reduced Inequalities', body: 'Access to legal clarity has been a privilege of the wealthy for centuries. SORTED makes it universally available for less than a cup of coffee per month.' },
    { sdg: 'SDG 16', title: 'Peace, Justice & Strong Institutions', body: 'Informed citizens make better decisions. SORTED reduces the chaos that flows from legal illiteracy — fewer missed court dates, fewer avoidable debt spirals, fewer children in crisis.' },
  ];

  const b2bAngles = [
    { title: 'Banks & Lenders', body: 'White-label SORTED for customers in arrears. Reduce write-offs. Demonstrate ESG commitment to regulators. Your most distressed customers are receiving letters they cannot understand — we fix that.' },
    { title: 'Insurers', body: 'Embed SORTED in home, legal expenses, or employer insurance products as a value-added benefit. Reduce claims from missed deadlines. Measurable policyholder impact.' },
    { title: 'HR Platforms & Employers', body: 'Employees in financial distress are 34% less productive (CIPD). SORTED as an employee benefit reduces financial anxiety at the source. One letter decoded = one crisis avoided.' },
    { title: 'Legal Aid & Charities', body: 'White-label or subsidised access for Citizens Advice, Shelter, StepChange, and similar organisations. We are open to grant-funded partnership arrangements.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', color: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,8,15,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(249,115,22,0.2)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SortedIcon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>INVESTOR & PARTNER BRIEF</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePDF} disabled={saving}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: 6, padding: '7px 14px', cursor: 'pointer' }}>
            {saving ? 'SAVING…' : '↓ DOWNLOAD PDF'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: copied ? '#22c55e' : '#f97316', background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.08)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(249,115,22,0.2)'}`, borderRadius: 6, padding: '7px 14px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY TEXT'}
          </motion.button>
          <a href="mailto:family@uf51.love?subject=SORTED — Investor Enquiry"
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '7px 14px', textDecoration: 'none' }}>
            CONTACT
          </a>
        </div>
      </header>

      {/* CONFIDENTIAL BANNER */}
      <div style={{ background: 'rgba(249,115,22,0.06)', borderBottom: '1px solid rgba(249,115,22,0.1)', padding: '8px 20px', textAlign: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(249,115,22,0.6)' }}>INVESTOR & PARTNER BRIEF — APRIL 2026 — PLEASE DO NOT FORWARD WITHOUT PERMISSION</span>
      </div>

      <div id="pr-body" style={{ maxWidth: 780, margin: '0 auto', padding: '48px 20px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              <Chip text="INVESTOR BRIEF" color="#f97316" />
              <Chip text="APRIL 2026" color="rgba(255,255,255,0.2)" />
              <Chip text="ESG ALIGNED" color="#22c55e" />
              <Chip text="LIVE PRODUCT" color="#06b6d4" />
            </div>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              SORTED — Access to Justice<br />
              <span style={{ color: '#f97316' }}>at the price of a coffee</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0, maxWidth: 640, borderLeft: '3px solid rgba(249,115,22,0.4)', paddingLeft: 16 }}>
              5.1 billion people have unmet justice needs. We built an AI tool that gives them legal clarity in seconds — subscription-funded, data-sovereign, zero marginal cost per user. This brief is for investors and partners who understand what that means.
            </p>
          </div>

          <HR />

          {/* STATS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
            {stats.map(({ value, label, source }) => (
              <div key={value} style={{ padding: '20px 16px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.18)', borderRadius: 12 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#f97316', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.4 }}>{label}</div>
                {source && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>{source}</div>}
              </div>
            ))}
          </div>

          {/* ESG */}
          <Section label="ESG ALIGNMENT — THREE UN SDGs">
            <p style={bodyStyle}>SORTED directly addresses three UN Sustainable Development Goals, with measurable, immediate impact on real people's lives — not theoretical future impact.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              {esgPoints.map(({ sdg, title, body }) => (
                <div key={sdg} style={{ padding: '18px 20px', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#22c55e', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 4, padding: '2px 8px', letterSpacing: '0.1em' }}>{sdg}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{title}</span>
                  </div>
                  <p style={{ ...bodyStyle, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* FINANCIAL MODEL */}
          <Section label="FINANCIAL MODEL">
            <p style={bodyStyle}>Revenue is <strong style={{ color: '#fff' }}>subscription-based</strong> — £9.99/month via Stripe. Infrastructure is serverless with near-zero marginal cost per additional user. This is a product that scales without headcount.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              {[
                ['Revenue model', 'Monthly subscription — Stripe'],
                ['Price point', '£9.99/month'],
                ['Free tier', '3 uses — frictionless onboarding'],
                ['Marginal cost per user', 'Near zero — serverless'],
                ['Paywall trigger', 'After 3 free uses'],
                ['Data liability', 'Zero — nothing stored'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4, letterSpacing: '0.06em' }}>{k.toUpperCase()}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{v}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* B2B */}
          <Section label="B2B OPPORTUNITY — FINANCIAL SERVICES & ESG PARTNERS">
            <p style={bodyStyle}>The B2C product is live. The B2B licensing pathway is clear and ready for the right partner. SORTED is a natural white-label fit for any organisation with financially distressed customers, employees, or members.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginTop: 16 }}>
              {b2bAngles.map(({ title, body }) => (
                <div key={title} style={{ padding: '18px', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#06b6d4', marginBottom: 8, letterSpacing: '0.06em' }}>{title.toUpperCase()}</div>
                  <p style={{ ...bodyStyle, margin: 0, fontSize: 13 }}>{body}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ARCHITECTURE / DATA SOVEREIGNTY */}
          <Section label="WHY DATA SOVEREIGNTY IS THE MOAT">
            <p style={bodyStyle}>Every major AI company monetises user data. SORTED does the opposite — and makes that the product. When users submit their most sensitive legal and financial documents, they need to know nothing is kept. We built this as a technical guarantee, not a policy.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              {[
                'Document content is processed in memory — never written to disk or database',
                'No document is used to train any AI model',
                'No third party receives user document content',
                'Subscription data (payment only) is handled by Stripe — not stored by UF51',
                'Zero regulatory liability exposure for stored sensitive content',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <span style={{ color: '#22c55e', fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ABOUT UF51 */}
          <Section label="ABOUT UNIVERSAL FREQUENCY 51">
            <p style={bodyStyle}>Universal Frequency 51 (UF51) is a Glasgow-based social impact technology company. The platform includes SORTED (access to justice), PetSounds51 (therapeutic sound for animals), CB51 (AI artist management), and Learn51 (free education for every child on Earth). Every product is built on a data-sovereign, subscription-funded model — no surveillance, no corporate capture.</p>
            <p style={bodyStyle}>UF51 is a Community Interest Company in formation. We are open to partnership, investment, and white-label conversations.</p>
          </Section>

          <HR />

          {/* CONTACT */}
          <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>GET IN TOUCH</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 10px' }}>Serious conversations only.</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 20px' }}>Investment, white-label partnership, B2B licensing, media. We respond within 24 hours.</p>
            <a href="mailto:family@uf51.love?subject=SORTED — Investor Enquiry"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#f97316', color: '#000', fontWeight: 900, fontSize: 13, letterSpacing: '0.06em', borderRadius: 10, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              Product live at <a href="https://uf51.love/Sorted" style={{ color: '#f97316', textDecoration: 'none' }}>uf51.love/Sorted</a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
const bodyStyle = { fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.8 };

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: '#f97316', marginBottom: 14 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}
function HR() { return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '36px 0' }} />; }
function Chip({ text, color }) {
  return <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color, border: `1px solid ${color}50`, borderRadius: 4, padding: '3px 9px' }}>{text}</span>;
}
function SortedIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="7" width="24" height="18" rx="3" stroke="#f97316" strokeWidth="1.8" fill="none" />
      <path d="M9 13h12M9 17h8" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 5v4M15 4v5M21 5v4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}