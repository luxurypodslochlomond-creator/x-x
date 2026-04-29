import React, { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function SortedPartnerKit() {
  const [showCopied, setShowCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExportPDF = () => {
    setIsDownloading(true);
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 18;
    const pageWidth = 210;
    const usable = pageWidth - margin * 2;
    let y = margin;

    const addText = (text, size, bold, color, gap = 5) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(String(text), usable);
      lines.forEach(line => {
        if (y > 275) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += size * 0.4;
      });
      y += gap;
    };

    const divider = () => {
      doc.setDrawColor(60, 60, 60);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    addText('SORTED — PARTNER KIT 2026', 18, true, [249, 115, 22], 4);
    addText('Universal Frequency 51 | family@uf51.love | uf51.love/Sorted', 9, false, [150, 150, 150], 8);
    divider();

    addText('THE PROBLEM', 9, true, [249, 115, 22], 3);
    addText('5.1B people worldwide have unmet legal needs. 92% of serious US legal problems get zero help. 4.5M UK children in poverty. 73% of people at bailiffs have mental health issues.', 10, false, [200, 200, 200], 8);

    addText('WHAT WE\'VE BUILT', 9, true, [6, 182, 212], 3);
    addText('SORTED uses AI to decode council letters, eviction warnings, court summons — anything that terrifies people. Plain English. 30 seconds. No signup needed. 3 free uses, then £9.99/month.', 10, false, [200, 200, 200], 8);

    addText('FOR MEDIA AGENCIES & FINANCIAL SERVICES', 9, true, [6, 182, 212], 3);
    addText('White-label for banks (HSBC, Barclays, Lloyds) — put SORTED inside your mortgage distress journey. CSR campaign vehicle with full audit trail. Revenue share on subscriptions. Unique consumer legal anxiety intelligence.', 10, false, [200, 200, 200], 8);

    addText('3 WAYS TO PARTNER', 9, true, [34, 197, 94], 3);
    addText('01. Creator/Influencer — 25% affiliate commission on all subscriptions generated', 10, false, [200, 200, 200], 3);
    addText('02. Organisation/Service — Revenue share (20-30%) + white-label option', 10, false, [200, 200, 200], 3);
    addText('03. Strategic Partner — Equity + revenue share + board/advisor role', 10, false, [200, 200, 200], 8);

    addText('EARNINGS POTENTIAL', 9, true, [168, 85, 247], 3);
    addText('10k followers: £200-500/month | 100k followers: £2,000-8,000/month | Legal firm (100 clients): £3,000-15,000/month', 10, false, [200, 200, 200], 8);

    addText('ESG & MARKET', 9, true, [249, 115, 22], 3);
    addText('Legal tech market: $80B+. Addresses UN SDG 1, 10, 16. Data sovereign — nothing stored. Subscription-funded, not surveillance-funded.', 10, false, [200, 200, 200], 8);

    divider();
    addText('CONTACT: family@uf51.love | uf51.love/SortedPartnerKit', 10, false, [249, 115, 22], 4);
    addText('© 2026 Universal Frequency 51 — Data Sovereign. Open Source. No Corporate Capture.', 9, false, [100, 100, 100], 0);

    doc.save('SORTED-Partner-Kit-2026.pdf');
    setIsDownloading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #080a0f 0%, #1a0f2a 100%)', padding: '20px', color: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* HEADER */}
         <div style={{ textAlign: 'center', marginBottom: 40, paddingTop: 0 }}>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#f97316' }}>SORTED</span> — Partner Kit
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Help us decode scary letters. Earn real money. Build equity.</p>
          </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
          <button
            onClick={handleExportPDF}
            disabled={isDownloading}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)',
              borderRadius: 8, color: '#f97316', fontWeight: 600, cursor: isDownloading ? 'not-allowed' : 'pointer', fontSize: 14,
              opacity: isDownloading ? 0.6 : 1
            }}
          >
            <Download size={16} /> {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
          <button
            onClick={() => copyToClipboard('https://uf51.love/api/functions/ogRedirect?page=SortedPartnerKit')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)',
              borderRadius: 8, color: '#06b6d4', fontWeight: 600, cursor: 'pointer', fontSize: 14
            }}
          >
            <Share2 size={16} /> {showCopied ? 'Copied! ✓' : 'Copy Share Link'}
          </button>
        </div>

        {/* PRESS KIT CONTENT */}
        <div id="press-kit-content" style={{ background: 'rgba(8,10,15,0.8)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 16, padding: 40, marginBottom: 60 }}>
          
          {/* SECTION 1: THE PROBLEM */}
           <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#f97316', marginBottom: 12 }}>THE PROBLEM</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>5.1B people worldwide have unmet legal needs.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <StatBox number="92%" label="of serious US legal problems get zero help" />
              <StatBox number="73%" label="of people at bailiffs have mental health issues" />
              <StatBox number="£100k" label="average household legal debt (unreported)" />
            </div>
            </div>

            {/* SECTION 2: THE SOLUTION */}
            <div style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#06b6d4', marginBottom: 12 }}>WHAT WE'VE BUILT</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>AI that decodes scary letters in 30 seconds.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 20px' }}>
              SORTED uses AI to decode council letters, eviction warnings, redundancy notices, court summons — anything that terrifies people. Plain English. Instant. No signup needed. 3 free uses, then £9.99/month.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <FeatureBox icon="lightning" title="30 seconds" desc="Letters decoded to plain English" />
               <FeatureBox icon="target" title="Jurisdiction-aware" desc="Knows your location & legal system" />
               <FeatureBox icon="lock" title="Privacy-first" desc="AI process, instant delete, never stored" />
               <FeatureBox icon="envelope" title="Shareable" desc="Email breakdown to solicitor or family" />
            </div>
            </div>

            {/* SECTION 3: THE OPPORTUNITY */}
            <div style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#ef4444', marginBottom: 12 }}>THE MARKET</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>Multi-billion pound opportunity.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <OpportunityBox title="Legal tech market" value="$80B+ globally" />
              <OpportunityBox title="UK legal gap" value="£100B+ annually" />
              <OpportunityBox title="Social anxiety therapy" value="£5B+ yearly" />
              <OpportunityBox title="AI adoption rate" value="65%+ in 2026" />
            </div>
            </div>

            {/* SECTION 3.5: MEDIA AGENCY / CORPORATE PARTNERSHIP — PHD-level */}
            <div style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)', background: 'rgba(6,182,212,0.04)', borderRadius: 12, padding: '32px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#06b6d4', marginBottom: 12 }}>FOR MEDIA AGENCIES & CORPORATES</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.2 }}>Your clients need a purpose story. We have one.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 24px' }}>
              SORTED is the rare product that delivers <strong style={{ color: '#fff' }}>genuine ESG impact</strong> and <strong style={{ color: '#fff' }}>measurable reach</strong> simultaneously. Banks, insurers, and financial services companies have millions of customers in debt distress — and no trusted, frictionless way to help them. SORTED is that tool.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
              <AgencyBox icon="bank" title="White-label for financial services" desc="HSBC, Barclays, Lloyds — put SORTED inside your mortgage distress journey. Branded as yours." />
               <AgencyBox icon="chart" title="CSR campaign vehicle" desc="Fund SORTED access for vulnerable customers. Fully measurable. Real impact. Audit trail." />
               <AgencyBox icon="handshake" title="Media partnership" desc="Put SORTED in front of millions through your client base. Revenue share on subscriptions generated." />
               <AgencyBox icon="target" title="Proprietary data insight" desc="Anonymised trend data on the UK's most pressing legal anxieties. Unique consumer intelligence." />
            </div>
            <div style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 8, padding: 20 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#fff', lineHeight: 1.7 }}>
                <strong style={{ color: '#06b6d4' }}>The pitch to your clients:</strong> "We've partnered with SORTED to give your customers free legal letter decoding. Every use is tracked, branded, and reported back to you as social impact data."
              </p>
            </div>
            </div>

            {/* SECTION 4: HOW TO PARTNER */}
            <div style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#22c55e', marginBottom: 12 }}>HOW YOU HELP</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 24px', lineHeight: 1.2 }}>3 ways to partner with SORTED.</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              <PartnerCard 
                num="01"
                title="Influencer / Creator"
                desc="Share SORTED with your audience"
                earn="25% affiliate commission on subscriptions"
                items={['Post on TikTok, Instagram, YouTube', 'Share unique link (tracking built-in)', 'Monthly payouts', 'No cap on earnings']}
              />
              <PartnerCard 
                num="02"
                title="Organization / Service"
                desc="Integrate SORTED into your platform"
                earn="Revenue share + white-label option"
                items={['Embed in your app/website', 'Brand as your own tool', 'Revenue share (20-30%)', 'Co-marketing support']}
              />
              <PartnerCard 
                num="03"
                title="Strategic Partner"
                desc="Build with us long-term"
                earn="Equity + revenue share"
                items={['Co-develop features', 'Strategic investment', 'Board seat / advisor role', 'Exit upside']}
              />
            </div>
            </div>

            {/* SECTION 5: EARNINGS */}
            <div style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#a855f7', marginBottom: 12 }}>REAL NUMBERS</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 24px', lineHeight: 1.2 }}>What you can actually earn.</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              <EarningsBox 
                title="Micro-influencer"
                size="10k followers"
                potential="£200-500/month"
                desc="1-2% conversion at 25% commission"
              />
              <EarningsBox 
                title="Mid-tier creator"
                size="100k followers"
                potential="£2,000-8,000/month"
                desc="2-4% conversion at 25% commission"
              />
              <EarningsBox 
                title="Legal services firm"
                size="100 clients/month"
                potential="£3,000-15,000/month"
                desc="Revenue share on referrals"
              />
              <EarningsBox 
                title="NGO / community org"
                size="10k reach"
                potential="£1,000-5,000/month"
                desc="Donation + affiliate model"
              />
            </div>
            </div>

            {/* SECTION 6: EQUITY PATH */}
            <div style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.05)', padding: '32px', borderRadius: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#f97316', marginBottom: 12 }}>LONG-TERM</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>Build equity with us.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: '0 0 20px' }}>
              Serious partners (organizations, strategic investors, co-founders) can earn <strong>equity stake</strong> instead of or in addition to revenue share. As SORTED grows to profitability and eventual exit, equity holders participate in upside.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 8, padding: 20 }}>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                <strong>Equity conversation starts with:</strong> Committed partnership, meaningful user acquisition, or strategic assets. We're bootstrapped, lean, and serious about real partners only — not ego.
              </p>
            </div>
            </div>

            {/* SECTION 7: GET STARTED */}
            <div style={{ paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>Ready to partner?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <GetStartedBox 
                title="Creators & Influencers"
                action="Share your link"
                contact="family@uf51.love"
                subtext="Subject: 'Partner with SORTED'"
              />
              <GetStartedBox 
                title="Organizations & Services"
                action="Let's explore integration"
                contact="family@uf51.love"
                subtext="Subject: 'SORTED + [Your Org]'"
              />
              <GetStartedBox 
                title="Strategic Partners"
                action="Schedule a call"
                contact="family@uf51.love"
                subtext="Subject: 'Strategic Investment'"
              />
              <GetStartedBox 
                title="Media Agencies & Corporates"
                action="Let's talk client campaigns"
                contact="family@uf51.love"
                subtext="Subject: 'Media Agency Partnership'"
              />
            </div>
            </div>

        {/* FOOTER STATS */}
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.8 }}>
          <p>SORTED — Decode scary letters. Help people. Make money. Build the future together.</p>
          <p>© 2026 Universal Frequency 51 | Data Sovereign • Open Source • No Corporate Capture</p>
        </div>
        </div>
        </div>
    </div>
  );
}

// ─── STAT BOX ─────────────────────────────────────────────────────────────
function StatBox({ number, label }) {
  return (
    <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, padding: 16, textAlign: 'center' }}>
      <div style={{ fontSize: 24, fontWeight: 900, color: '#f97316', marginBottom: 8 }}>{number}</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.4 }}>{label}</p>
    </div>
  );
}

// ─── FEATURE BOX ──────────────────────────────────────────────────────────
function FeatureBox({ icon, title, desc }) {
  const iconMap = {
    'lightning': <LightningIcon />,
    'target': <TargetIcon />,
    'lock': <LockIcon />,
    'envelope': <EnvelopeIcon />
  };
  
  return (
    <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, padding: 16 }}>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
        {iconMap[icon] || icon}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#fff' }}>{title}</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}

function LightningIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ overflow: 'visible' }}>
      <path d="M16 2L22 14h8L18 22l4 10-10-8-10 8 4-10-12-8h8l6-14z" fill="#06b6d4" stroke="#06b6d4" strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#06b6d4" strokeWidth="2" />
      <circle cx="16" cy="16" r="9" stroke="#06b6d4" strokeWidth="2" />
      <circle cx="16" cy="16" r="4.5" fill="#06b6d4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="7" y="14" width="18" height="12" rx="2" stroke="#06b6d4" strokeWidth="2" />
      <path d="M9 14V11c0-3.5 2.5-6 7-6s7 2.5 7 6v3" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="20" r="1.5" fill="#06b6d4" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="8" width="22" height="16" rx="2" stroke="#06b6d4" strokeWidth="2" />
      <path d="M5 8l11 8 11-8" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 12h24M7 12v14c0 1.5 1 2.5 2.5 2.5h18c1.5 0 2.5-1 2.5-2.5V12" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="26" stroke="#06b6d4" strokeWidth="2" />
      <line x1="20" y1="12" x2="20" y2="26" stroke="#06b6d4" strokeWidth="2" />
      <path d="M2 12l14-7 14 7" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="20" width="4" height="8" stroke="#06b6d4" strokeWidth="2" />
      <rect x="12" y="13" width="4" height="15" stroke="#06b6d4" strokeWidth="2" />
      <rect x="19" y="6" width="4" height="22" stroke="#06b6d4" strokeWidth="2" />
      <line x1="5" y1="28" x2="26" y2="28" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 18c2.5 2.5 5 3.5 7.5 3.5s5-1.5 6.5-3l2.5-2.5 2.5 2.5c1.5 1.5 4 3 6.5 3s5-1 7.5-3.5" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 14v2.5M26 14v2.5M11 9v5M21 9v5" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2L20.5 12h10.5l-8.5 6.5 3.25 10-9.25-7-9.25 7 3.25-10-8.5-6.5h10.5L16 2z" fill="#06b6d4" stroke="#06b6d4" strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── OPPORTUNITY BOX ──────────────────────────────────────────────────────
function OpportunityBox({ title, value }) {
  return (
    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: 16 }}>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '0 0 8px', fontWeight: 600, letterSpacing: '0.05em' }}>{title}</p>
      <div style={{ fontSize: 20, fontWeight: 900, color: '#ef4444' }}>{value}</div>
    </div>
  );
}

// ─── PARTNER CARD ────────────────────────────────────────────────────────
function PartnerCard({ num, title, desc, earn, items }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 32, fontWeight: 900, color: 'rgba(255,255,255,0.1)', marginBottom: 8 }}>{num}</div>
      <h3 style={{ fontSize: 16, fontWeight: 900, margin: '0 0 4px', color: '#fff' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 12px' }}>{desc}</p>
      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: 10, marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', margin: 0 }}>{earn}</p>
      </div>
      <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ─── EARNINGS BOX ────────────────────────────────────────────────────────
function EarningsBox({ title, size, potential, desc }) {
  return (
    <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, padding: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', margin: 0, marginBottom: 4, letterSpacing: '0.05em' }}>{title}</p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, marginBottom: 8 }}>{size}</p>
      <div style={{ fontSize: 18, fontWeight: 900, color: '#06b6d4', marginBottom: 6 }}>{potential}</div>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}

// ─── AGENCY BOX ──────────────────────────────────────────────────────────
function AgencyBox({ icon, title, desc }) {
  const iconMap = {
    'bank': <BankIcon />,
    'chart': <ChartIcon />,
    'handshake': <HandshakeIcon />,
    'target': <TargetIcon />
  };
  
  return (
    <div style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, padding: 16 }}>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>{iconMap[icon] || icon}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{title}</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

// ─── GET STARTED BOX ─────────────────────────────────────────────────────
function GetStartedBox({ title, action, contact, subtext }) {
  const handleEmailClick = () => {
    window.location.href = `mailto:${contact}?subject=${encodeURIComponent(subtext)}`;
  };

  return (
    <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8, padding: 20, textAlign: 'center' }}>
      <h3 style={{ fontSize: 14, fontWeight: 900, margin: '0 0 8px', color: '#fff' }}>{title}</h3>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 12px' }}>{action}</p>
      <button
        type="button"
        onClick={handleEmailClick}
        style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          background: '#22c55e', 
          color: '#000', 
          fontWeight: 700, 
          borderRadius: 6, 
          border: 'none',
          textDecoration: 'none', 
          fontSize: 12,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 0 10px rgba(34,197,94,0.3)'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#16a34a';
          e.target.style.boxShadow = '0 0 15px rgba(34,197,94,0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#22c55e';
          e.target.style.boxShadow = '0 0 10px rgba(34,197,94,0.3)';
        }}
      >
        Email us
      </button>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', margin: '8px 0 0', lineHeight: 1.4 }}>{subtext}</p>
    </div>
  );
}