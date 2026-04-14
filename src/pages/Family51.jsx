import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Eye, Scale } from 'lucide-react';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import SortedAbout from '@/components/family51/SortedAbout';

// ─── FAMILY51 ────────────────────────────────────────────────────────────────
// Instant. Like pressing play. No reading first.
// ────────────────────────────────────────────────────────────────────────────

export default function Family51Page() {
  const [activeTool, setActiveTool] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const { isLocked, remaining, recordUse } = useSortedUsage();

  const handleToolOpen = (toolId) => {
    if (isLocked) return; // blocked — paywall shown below
    setActiveTool(toolId);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.title = 'SORTED — We\'ve Got You';
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── STICKY HEADER ──────────────────────────────────── */}
       <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
         <motion.button onClick={() => { setActiveTool(null); setShowWhy(false); }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
           <F51Mark />
           <div style={{ lineHeight: 1 }}>
             <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>SORTED</div>
             <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>WE'VE GOT YOU</div>
           </div>
         </motion.button>

         {activeTool || showWhy ? (
           <motion.button
             onClick={() => { setActiveTool(null); setShowWhy(false); }}
             whileTap={{ scale: 0.95 }}
             style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer' }}
           >
             BACK
           </motion.button>
         ) : (
           <motion.button onClick={() => setMenuOpen(!menuOpen)} whileTap={{ scale: 0.95 }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f97316' }}>
             {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </motion.button>
         )}
       </header>

       {/* ── HAMBURGER MENU ──────────────────────────────────── */}
       <AnimatePresence>
         {menuOpen && !activeTool && !showWhy && (
           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: 'sticky', top: 52, zIndex: 49, background: 'rgba(8,10,15,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px' }}>
             <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
               <button onClick={() => { setShowWhy(true); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 13, fontWeight: 600, color: '#f97316', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', width: '100%', textAlign: 'left' }}>
                 <WhyIcon />
                 Why SORTED?
               </button>
               <a href="/Family51Terms" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                 <Scale className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                 Terms of Service
               </a>
               <a href="/Family51Privacy" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                 <Eye className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                 Privacy Policy
               </a>
               <a href="mailto:family@uf51.love" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 13, fontWeight: 600, color: '#f97316', textDecoration: 'none' }}>
                 <EmailIcon />
                 family@uf51.love
               </a>
             </div>
           </motion.div>
         )}
       </AnimatePresence>

      <AnimatePresence mode="wait">

         {/* ── WHY SECTION ────────────────────────────────────── */}
         {showWhy && !activeTool && (
          <motion.div key="why" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>THE PROBLEM</div>
              <h2 style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                <span style={{ color: '#fff' }}>Official letters</span>{' '}
                <span style={{ color: '#f97316' }}>terrify people.</span>
              </h2>
            </div>

            {/* STATS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
              <StatCard number="7M+" label="UK adults in severe financial stress right now" />
              <StatCard number="73%" label="of people who get bailiff visits have mental health problems" />
              <StatCard number="£0" label="most people can afford for a solicitor to read a letter" />
              <StatCard number="1in3" label="UK adults have ignored an official letter out of fear" color="#06b6d4" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              <ProblemCard icon={<CouncilIcon />} title="Councils" desc="Planning refusals. Enforcement notices. Tax demands." />
              <ProblemCard icon={<EmployerIcon />} title="Employers" desc="Redundancy letters. Disciplinary notices. Contract changes." />
              <ProblemCard icon={<LandlordIcon />} title="Landlords" desc="Eviction warnings. Deposit disputes. Rent increases." />
              <ProblemCard icon={<CourtIcon />} title="Courts" desc="Summons. Judgments. Legal jargon you don't understand." />
            </div>
            <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.6 }}>
                <strong>You freeze.</strong> Read it 10 times. Still don't understand. Panic.
              </p>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#ef4444', marginBottom: 8 }}>REAL TALK</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.6 }}>
                Some people <strong>bury their head in the sand.</strong> Don't open the letter. Hope it goes away. It doesn't.
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '12px 0 0', lineHeight: 1.5 }}>
                That's when deadlines pass. Legal action follows. Things get worse.
              </p>
            </div>
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>THE SOLUTION</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.6 }}>
                SORTED decodes it in <strong>plain English</strong>. Shows you what it means. Lists what to do next. You're not alone anymore.
              </p>
            </div>
          </motion.div>
         )}

         {/* ── HOME: 3 BIG BUTTONS, NOTHING ELSE ─────────────── */}
         {!activeTool && !isLocked && !menuOpen && !showWhy && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}>

            {/* HEADLINE — SHORT AND SHARP */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>WHAT DO YOU NEED?</div>
                <h1 style={{ fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                    <span style={{ color: '#fff' }}>Got a scary</span>{' '}
                    <span style={{ color: '#f97316' }}>letter?</span><br />
                    <span style={{ color: '#fff' }}>Need a</span>{' '}
                    <span style={{ color: '#06b6d4' }}>reply?</span><br />
                    <span style={{ color: '#fff' }}>Stuck in a</span>{' '}
                    <span style={{ color: '#ef4444' }}>dispute?</span>
                  </h1>
              </motion.div>
            </div>

            {/* THREE GIANT BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <BigButton
                delay={0.05}
                color="#f97316"
                onClick={() => handleToolOpen('letter')}
                icon={<DocIcon color="#f97316" />}
                label="DECODE A LETTER"
                sub="Paste it. Understand it in seconds."
                tag={isLocked ? '🔒' : remaining <= 1 ? `${remaining} LEFT` : 'FREE'}
              />

              <BigButton
                delay={0.1}
                color="#06b6d4"
                onClick={() => handleToolOpen('reply')}
                icon={<ReplyIcon color="#06b6d4" />}
                label="WRITE MY REPLY"
                sub="We write it for you. Copy and send."
                tag={isLocked ? '🔒' : remaining <= 1 ? `${remaining} LEFT` : 'FREE'}
              />

              <BigButton
                delay={0.15}
                color="#ef4444"
                onClick={() => handleToolOpen('conflict')}
                icon={<ConflictIcon color="#ef4444" />}
                label="DISPUTE HELP"
                sub="Neighbour. Employer. Landlord. We fight back."
                tag={isLocked ? '🔒' : remaining <= 1 ? `${remaining} LEFT` : 'FREE'}
              />

            </div>

            {/* INSTANT TRUST — tiny, below the fold */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}
            >
              <TrustPill text="Any language" />
              <TrustPill text="All currencies" />
              <TrustPill text="Nothing stored" />
            </motion.div>

            <SortedAbout />

            <SortedForLifeCard />

          </motion.div>
        )}

        {/* ── TOOL VIEW ─────────────────────────────────────── */}
        {activeTool && (
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ maxWidth: 560, margin: '0 auto', padding: '28px 20px 60px' }}
          >
            {activeTool === 'letter'   && <Family51LetterDecoder   accentColor="#f97316" onResult={recordUse} />}
            {activeTool === 'reply'    && <Family51ReplyWriter     accentColor="#06b6d4" onResult={recordUse} />}
            {activeTool === 'conflict' && <Family51ConflictHelper  accentColor="#ef4444" onResult={recordUse} />}
          </motion.div>
        )}

        {/* ── PAYWALL — shown when locked ───────────── */}
        {!activeTool && isLocked && (
          <motion.div
            key="paywall"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>YOU'RE NOT DONE YET</div>
              <h1 style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
                <span style={{ color: '#fff' }}>1 free decode</span>{' '}
                <span style={{ color: '#f97316' }}>used.</span>
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>
                Subscribe to keep going — we're right here with you.
              </p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <a href="mailto:family@uf51.love?subject=Can't afford SORTED right now" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#06b6d4', textDecoration: 'none', fontWeight: 600, padding: '12px', borderRadius: 8, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)', marginBottom: 16, transition: 'all 0.15s' }} onMouseEnter={(e) => { e.target.style.background = 'rgba(6,182,212,0.12)'; e.target.style.borderColor = 'rgba(6,182,212,0.6)'; }} onMouseLeave={(e) => { e.target.style.background = 'rgba(6,182,212,0.05)'; e.target.style.borderColor = 'rgba(6,182,212,0.3)'; }}>💙 Can't afford it? We can help.</a>
            </div>
            <SortedForLifeCard compact />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── BIG BUTTON ───────────────────────────────────────────────────────────────
function BigButton({ color, onClick, icon, label, sub, tag, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer', padding: '22px 22px',
        borderRadius: 16, border: `1px solid ${hovered ? color + '80' : color + '30'}`,
        background: hovered ? `${color}12` : `${color}07`,
        transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 18,
        boxShadow: hovered ? `0 0 30px ${color}25` : 'none',
      }}
    >
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>{label}</span>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color, border: `1px solid ${color}50`, borderRadius: 4, padding: '2px 6px' }}>{tag}</span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4 }}>{sub}</p>
      </div>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.15s' }}>
        <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

// ─── TRUST PILLS ─────────────────────────────────────────────────────────────
function TrustPill({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
      <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>{text}</span>
    </div>
  );
}

// ─── CUSTOM ICONS ────────────────────────────────────────────────────────────
function F51Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="2" y="4" width="26" height="22" rx="4" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M6 11h18M6 16h18" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M10 20h10" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="8" r="4" fill="#f97316" />
    </svg>
  );
}

function DocIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="8" y="4" width="20" height="28" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M13 11h10M13 16h10M13 21h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="27" cy="27" r="6" fill={color} />
      <path d="M25 27l1.5 1.5L29 25" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReplyIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="8" width="28" height="20" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M10 16h16M10 20h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M30 14l-5-4v8l5-4z" fill={color} />
    </svg>
  );
}

function ConflictIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="13" cy="13" r="7" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="23" cy="23" r="7" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M18 8v4M18 24v4M8 18h4M24 18h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function WhyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3" r="1" fill="currentColor" />
      <path d="M8 5v4M5 14h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="2" y="7" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M2 3.5L8 7.5L14 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function StatCard({ number, label, color = '#f97316' }) {
  return (
    <div style={{ background: 'rgba(249,115,22,0.08)', border: `1px solid ${color}30`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 900, color, marginBottom: 6 }}>{number}</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4 }}>{label}</p>
    </div>
  );
}

function ProblemCard({ icon, title, desc }) {
  return (
    <div style={{ paddingLeft: 16, borderLeft: '2px solid rgba(249,115,22,0.3)' }}>
      <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{desc}</p>
    </div>
  );
}

// Custom problem icons
function CouncilIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="1" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <rect x="6" y="10" width="3" height="4" fill="#f97316" opacity="0.6" />
      <rect x="10.5" y="9" width="3" height="5" fill="#f97316" opacity="0.6" />
      <rect x="15" y="10" width="3" height="4" fill="#f97316" opacity="0.6" />
      <path d="M8 6L8 4M12 6L12 4M16 6L16 4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function EmployerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="11" rx="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="6.5" r="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="6.5" r="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="6.5" r="1.5" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M7 13v2M12 13v2M17 13v2" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function LandlordIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 20h16M7 20V9M17 20V9M10 20V11M14 20V11M12 5L5 9H19L12 5Z" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="1.5" fill="#f97316" opacity="0.6" />
    </svg>
  );
}

function CourtIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 4v4M12 4v4M18 4v4M4 9h16M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M9 13h6" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 17l2 2 4-4" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}