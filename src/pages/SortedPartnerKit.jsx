import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';

export default function SortedPartnerKit() {
  const [showCopied, setShowCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Load html2pdf from CDN
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
    }
  }, []);

  const handleExportPDF = async () => {
    try {
      setIsDownloading(true);
      if (!window.html2pdf) {
        alert('PDF library loading. Please try again in a moment.');
        setIsDownloading(false);
        return;
      }
      
      const element = document.getElementById('press-kit-content');
      const opt = {
        margin: 10,
        filename: 'SORTED-Partner-Kit-2026.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      await window.html2pdf().set(opt).from(element).save();
      setIsDownloading(false);
    } catch (error) {
      console.error('PDF export error:', error);
      setIsDownloading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #080a0f 0%, #1a0f2a 100%)', padding: '20px', color: '#fff' }}>
      {/* STICKY HEADER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 20px', marginBottom: 20, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.06)" />
            <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.25)" />
            <circle cx="15" cy="19" r="0.8" fill="#f97316" />
          </svg>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>PARTNER KIT</div>
          </div>
        </div>
      </div>
      
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40, paddingTop: 0 }}>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#f97316' }}>SORTED</span> — Partner Kit
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Help us decode scary letters. Earn real money. Build equity.</p>
        </motion.div>

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
            onClick={() => copyToClipboard(window.location.href)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)',
              borderRadius: 8, color: '#06b6d4', fontWeight: 600, cursor: 'pointer', fontSize: 14
            }}
          >
            <Share2 size={16} /> {showCopied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* PRESS KIT CONTENT */}
        <div id="press-kit-content" style={{ background: 'rgba(8,10,15,0.8)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 16, padding: 40, marginBottom: 60 }}>
          
          {/* SECTION 1: THE PROBLEM */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#f97316', marginBottom: 12 }}>THE PROBLEM</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>5.1B people worldwide have unmet legal needs.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <StatBox number="92%" label="of serious US legal problems get zero help" />
              <StatBox number="73%" label="of people at bailiffs have mental health issues" />
              <StatBox number="4.5M" label="UK children in poverty (2024/25 record)" />
              <StatBox number="£100k" label="average household legal debt (unreported)" />
            </div>
          </motion.div>

          {/* SECTION 2: THE SOLUTION */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#06b6d4', marginBottom: 12 }}>WHAT WE'VE BUILT</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>AI that decodes scary letters in 30 seconds.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 20px' }}>
              SORTED uses AI to decode council letters, eviction warnings, redundancy notices, court summons — anything that terrifies people. Plain English. Instant. No signup needed. 3 free uses, then £9.99/month.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <FeatureBox icon="⚡" title="30 seconds" desc="Letters decoded to plain English" />
              <FeatureBox icon="🎯" title="Jurisdiction-aware" desc="Knows your location & legal system" />
              <FeatureBox icon="🔒" title="Privacy-first" desc="AI process, instant delete, never stored" />
              <FeatureBox icon="📧" title="Shareable" desc="Email breakdown to solicitor or family" />
            </div>
          </motion.div>

          {/* SECTION 3: THE OPPORTUNITY */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#ef4444', marginBottom: 12 }}>THE MARKET</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.2 }}>Multi-billion pound opportunity.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <OpportunityBox title="Legal tech market" value="$80B+ globally" />
              <OpportunityBox title="UK legal gap" value="£100B+ annually" />
              <OpportunityBox title="Social anxiety therapy" value="£5B+ yearly" />
              <OpportunityBox title="AI adoption rate" value="65%+ in 2026" />
            </div>
          </motion.div>

          {/* SECTION 4: HOW TO PARTNER */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
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
          </motion.div>

          {/* SECTION 5: EARNINGS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
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
          </motion.div>

          {/* SECTION 6: EQUITY PATH */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ marginBottom: 48, paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.05)', padding: '32px', borderRadius: 12 }}>
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
          </motion.div>

          {/* SECTION 7: GET STARTED */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ paddingTop: 40, borderTop: '1px solid rgba(249,115,22,0.2)' }}>
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
            </div>
          </motion.div>

        </div>

        {/* FOOTER STATS */}
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.8 }}>
          <p>SORTED — Decode scary letters. Help people. Make money. Build the future together.</p>
          <p>© 2026 Universal Frequency 51 | Data Sovereign • Open Source • No Corporate Capture</p>
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
    '⚡': <LightningIcon />,
    '🎯': <TargetIcon />,
    '🔒': <LockIcon />,
    '📧': <EnvelopeIcon />
  };
  
  return (
    <div style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, padding: 16 }}>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
        {iconMap[icon] || icon}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#fff' }}>{title}</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}

function LightningIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2l5 9h6l-8 6 3 9-8-6-8 6 3-9-8-6h6l5-9z" fill="#06b6d4" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" stroke="#06b6d4" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="8" stroke="#06b6d4" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="4" fill="#06b6d4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="12" width="16" height="10" rx="2" stroke="#06b6d4" strokeWidth="1.5" />
      <path d="M8 12V9c0-3 2-5 6-5s6 2 6 5v3" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="17" r="1.5" fill="#06b6d4" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="20" height="14" rx="2" stroke="#06b6d4" strokeWidth="1.5" />
      <path d="M4 6l10 7 10-7" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 8, padding: 16 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', margin: 0, marginBottom: 4, letterSpacing: '0.05em' }}>{title}</p>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, marginBottom: 8 }}>{size}</p>
      <div style={{ fontSize: 18, fontWeight: 900, color: '#a855f7', marginBottom: 6 }}>{potential}</div>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.4 }}>{desc}</p>
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