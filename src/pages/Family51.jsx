import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Eye, Scale, Trash2, Mail } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';
import SortedAbout from '@/components/family51/SortedAbout';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedLoader from '@/components/family51/SortedLoader';
import SortedFAQ from '@/components/family51/SortedFAQ';
import MauroChat from '@/components/family51/MauroChat';

// ─── FAMILY51 ────────────────────────────────────────────────────────────────
// Instant. Like pressing play. No reading first.
// ────────────────────────────────────────────────────────────────────────────

export default function Family51Page() {
  const [activeTool, setActiveTool] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [slideDir, setSlideDir] = useState(1);
  const [prefillContext, setPrefillContext] = useState(null);
  const [showPaySuccess, setShowPaySuccess] = useState(false);
  const [caseCount, setCaseCount] = useState(0);
  const [showMauro, setShowMauro] = useState(false);
  const { isLocked, remaining, recordUse } = useSortedUsage();
  const geoPrice = useSortedGeoPrice();

  // Load case count from localStorage for badge
  useEffect(() => {
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
      setCaseCount(cases.length);
    } catch {}
  }, []);

  // Detect Stripe success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sorted') === 'success') {
      setShowPaySuccess(true);
      // Clean the URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleToolOpen = (toolId, handoffData = null) => {
    // Allow handoff between tools even if locked — locking only blocks starting new work from home
    setSlideDir(1);
    setActiveTool(toolId);
    setPrefillContext(handoffData);
    setMenuOpen(false);
    setShowHistory(false);
    setShowWhy(false);
    setShowFAQ(false);
  };

  const handleBack = () => {
    setSlideDir(-1);
    setActiveTool(null);
    setShowWhy(false);
    setShowHistory(false);
    setShowFAQ(false);
    setPrefillContext(null);
  };

  useEffect(() => {
    document.title = 'SORTED — We\'ve Got You';
    
    // Auto-detect location from timezone/language
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language || '';

    const geoMap = {
      'Europe/London': { country: 'United Kingdom', flag: '🇬🇧', code: 'GB', jurisdiction: 'English law' },
      'Europe/Dublin': { country: 'Ireland', flag: '🇮🇪', code: 'IE', jurisdiction: 'Irish law' },
      'America/New_York': { country: 'United States', flag: '🇺🇸', code: 'US', jurisdiction: 'US law' },
      'America/Chicago': { country: 'United States', flag: '🇺🇸', code: 'US', jurisdiction: 'US law' },
      'America/Denver': { country: 'United States', flag: '🇺🇸', code: 'US', jurisdiction: 'US law' },
      'America/Los_Angeles': { country: 'United States', flag: '🇺🇸', code: 'US', jurisdiction: 'US law' },
      'America/Toronto': { country: 'Canada', flag: '🇨🇦', code: 'CA', jurisdiction: 'Canadian law' },
      'America/Vancouver': { country: 'Canada', flag: '🇨🇦', code: 'CA', jurisdiction: 'Canadian law' },
      'Australia/Sydney': { country: 'Australia', flag: '🇦🇺', code: 'AU', jurisdiction: 'Australian law' },
      'Australia/Melbourne': { country: 'Australia', flag: '🇦🇺', code: 'AU', jurisdiction: 'Australian law' },
      'Pacific/Auckland': { country: 'New Zealand', flag: '🇳🇿', code: 'NZ', jurisdiction: 'NZ law' },
      'Europe/Paris': { country: 'France', flag: '🇫🇷', code: 'FR', jurisdiction: 'French law' },
      'Europe/Berlin': { country: 'Germany', flag: '🇩🇪', code: 'DE', jurisdiction: 'German law' },
      'Europe/Madrid': { country: 'Spain', flag: '🇪🇸', code: 'ES', jurisdiction: 'Spanish law' },
      'Europe/Rome': { country: 'Italy', flag: '🇮🇹', code: 'IT', jurisdiction: 'Italian law' },
      'Europe/Amsterdam': { country: 'Netherlands', flag: '🇳🇱', code: 'NL', jurisdiction: 'Dutch law' },
      'Asia/Dubai': { country: 'UAE', flag: '🇦🇪', code: 'AE', jurisdiction: 'UAE law' },
      'Asia/Kolkata': { country: 'India', flag: '🇮🇳', code: 'IN', jurisdiction: 'Indian law' },
      'Asia/Singapore': { country: 'Singapore', flag: '🇸🇬', code: 'SG', jurisdiction: 'Singapore law' },
      'Africa/Johannesburg': { country: 'South Africa', flag: '🇿🇦', code: 'ZA', jurisdiction: 'SA law' },
    };

    const detected = geoMap[tz] || { country: 'United Kingdom', flag: '🇬🇧', code: 'GB', jurisdiction: 'English law' };
    setSelectedLocation(detected);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── STICKY HEADER ──────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button onClick={() => { setActiveTool(null); setShowWhy(false); setShowHistory(false); }} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <F51Mark />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>WE'VE GOT YOU</div>
          </div>
        </motion.button>

         {activeTool || showWhy || showHistory || showFAQ ? (
           <motion.button
             onClick={handleBack}
             whileTap={{ scale: 0.95 }}
             style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer' }}
           >
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
             BACK
           </motion.button>
         ) : (
           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
             <motion.button
               onClick={() => { setShowFAQ(true); setMenuOpen(false); }}
               whileTap={{ scale: 0.95 }}
               style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 6, padding: '5px 10px', cursor: 'pointer' }}
             >
               FAQ
             </motion.button>
             <motion.button
               onClick={() => { setShowHistory(true); setShowFAQ(false); setShowWhy(false); setMenuOpen(false); }}
               whileTap={{ scale: 0.95 }}
               title="My Cases"
               style={{ position: 'relative', width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
             >
               <CasesIcon />
               {caseCount > 0 && (
                 <div style={{ position: 'absolute', top: -4, right: -4, minWidth: 14, height: 14, borderRadius: 7, background: '#f97316', border: '1.5px solid #080a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                   <span style={{ fontSize: 8, fontWeight: 900, color: '#000', lineHeight: 1 }}>{caseCount > 9 ? '9+' : caseCount}</span>
                 </div>
               )}
             </motion.button>
             <motion.button
               onClick={() => { setShowWhy(true); setMenuOpen(false); }}
               whileTap={{ scale: 0.95 }}
               title="Why SORTED?"
               style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 900, fontStyle: 'italic' }}
             >
               ?
             </motion.button>
             <motion.button onClick={() => setMenuOpen(!menuOpen)} whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#f97316', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
               {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
             </motion.button>
           </div>
         )}
       </header>

       {/* ── HAMBURGER MENU ──────────────────────────────────── */}
       <AnimatePresence>
         {menuOpen && !activeTool && !showWhy && !showFAQ && (
           <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ position: 'sticky', top: 52, zIndex: 49, background: 'rgba(8,10,15,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px' }}>
             <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
               <button onClick={() => { setShowWhy(true); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.07)', width: '100%', textAlign: 'left', letterSpacing: '0.01em' }}>
                 <WhyIcon />
                 Why SORTED?
               </button>
               <button onClick={() => { setShowFAQ(true); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.07)', width: '100%', textAlign: 'left', letterSpacing: '0.01em' }}>
                 <FAQIcon />
                 FAQ &amp; How It Works
               </button>
               <Link to="/SortedForOrgs" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <PartnerIcon />
                  For Organisations
                </Link>
               <Link to="/SortedPartnerKit" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <PartnerIcon />
                  Partner Kit
                </Link>
               <Link to="/SortedPressRelease" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <FAQIcon />
                  Press Release
                </Link>
               <Link to="/SortedInvestorPress" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <FAQIcon />
                  Investor Brief
                </Link>
               <Link to="/SortedTerms" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <Scale className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Terms
                </Link>
                <Link to="/SortedPrivacy" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <Eye className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Privacy
                </Link>
                <a href="mailto:family@uf51.love" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)', letterSpacing: '0.01em' }}>
                  <Mail className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Contact
                </a>
                {/* PRIVACY NOTE */}
                <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.6 }}>
                    Your letter is processed by AI then immediately discarded. Nothing is stored, logged, or sold. Nothing leaves your session except what you choose to email yourself.
                  </p>
                </div>
                {/* NUCLEAR CLEAR */}
                <button
                  onClick={() => {
                    try { localStorage.clear(); } catch {}
                    setMenuOpen(false);
                    window.location.reload();
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', letterSpacing: '0.01em' }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all my data &amp; reset
                </button>
                </div>
                </motion.div>
                )}
                </AnimatePresence>

      <AnimatePresence mode="wait">

         {/* ── WHY SECTION ────────────────────────────────────── */}
         {showFAQ && !activeTool && (
           <motion.div key="faq" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
             <SortedFAQ accentColor="#f97316" />
           </motion.div>
         )}

         {showWhy && !activeTool && (
           <motion.div key="why" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>THE PROBLEM</div>
              <h2 style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                <span style={{ color: '#fff' }}>Official letters</span>{' '}
                <span style={{ color: '#f97316' }}>terrify people.</span>
              </h2>
            </div>

            {/* STATS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
              <StatCard number="5.1B" label="people worldwide with unmet justice needs — two thirds of humanity" source="World Justice Project" />
              <StatCard number="92%" label="of serious legal problems in the USA receive no legal help at all" source="Legal Services Corp." />
              <StatCard number="73%" label="of people referred to bailiffs have a mental health condition" source="Money & Mental Health" />
              <StatCard number="£100B+" label="annual UK legal aid spending gap — unmet demand" source="Law Society Intelligence" color="#ef4444" />
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
                SORTED decodes it in <strong>your language</strong>. Shows you what it means. Lists what to do next. You're not alone anymore.
              </p>
            </div>

            <SortedAbout />

          </motion.div>
         )}

         {/* ── HOME: 3 BIG BUTTONS, NOTHING ELSE ─────────────── */}
         {!activeTool && !isLocked && !menuOpen && !showWhy && !showFAQ && !showHistory && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}>

            {/* STRIPE SUCCESS BANNER */}
            {showPaySuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 24, padding: '16px 20px', borderRadius: 14, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)', textAlign: 'center' }}
              >
                <p style={{ fontSize: 14, fontWeight: 800, color: '#22c55e', margin: '0 0 4px', letterSpacing: '0.04em' }}>You're SORTED — welcome aboard.</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Unlimited access is now unlocked. Go decode something.</p>
                <button onClick={() => setShowPaySuccess(false)} style={{ marginTop: 10, fontSize: 10, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}>DISMISS</button>
              </motion.div>
            )}

            {/* HEADLINE — SHORT AND SHARP */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* FREE BADGE — lead with this */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 20, padding: '5px 14px', marginBottom: 18 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#22c55e', letterSpacing: '0.12em' }}>TRY FREE — NO CARD NEEDED</span>
                </div>
                <h1 style={{ fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                    <span style={{ color: '#fff' }}>Got a scary</span>{' '}
                    <span style={{ color: '#f97316' }}>letter?</span><br />
                    <span style={{ color: '#fff' }}>Need a</span>{' '}
                    <span style={{ color: '#06b6d4' }}>reply?</span><br />
                    <span style={{ color: '#fff' }}>Stuck in a</span>{' '}
                    <span style={{ color: '#ef4444' }}>dispute?</span>
                  </h1>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '16px 0 0', lineHeight: 1.55, fontWeight: 500 }}>
                    SORTED reads your letter and tells you <strong style={{ color: '#fff' }}>exactly what it means</strong> and <strong style={{ color: '#fff' }}>exactly what to do</strong> — in your language, in seconds.
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '8px 0 0' }}>
                    No jargon. No judgement. Any language. Any country.
                  </p>
              </motion.div>
            </div>

            {/* WHY SORTED — INLINE VALUE PROP */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 28, background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 14, padding: '16px 18px' }}
            >
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>WHAT SORTED DOES</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <WhyRow icon={<WRBolt />} text="Snap a photo with your phone or paste the text — decoded in seconds" />
                <WhyRow icon={<WRTarget />} text="Exact steps to take, and by when — no walls of text" />
                <WhyRow icon={<WRPin />} text="Knows your location, jurisdiction & relevant bodies automatically" />
                <WhyRow icon={<WRLock />} text="Your letter is processed by AI and immediately discarded — never stored, never sold, never used to train anything" />
                <WhyRow icon={<WRMail />} text="Email the breakdown to yourself — then forward it to a family member, solicitor, or advice worker. We never email third parties on your behalf (that would risk your privacy)." />
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '12px 0 0', lineHeight: 1.5 }}>
                3 free uses — no card, no signup. Then <strong style={{ color: 'rgba(255,255,255,0.5)' }}>{geoPrice.inline}</strong> if you want unlimited. Cancel anytime.
              </p>
            </motion.div>

            {/* THREE GIANT BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <BigButton
                delay={0.05}
                color="#f97316"
                onClick={() => handleToolOpen('letter')}
                icon={<DocIcon color="#f97316" />}
                label="DECODE A LETTER"
                sub="Paste it. Understand it in seconds."
                tag={isLocked ? '🔒 LOCKED' : 'FREE'}
              />

              <BigButton
                delay={0.1}
                color="#06b6d4"
                onClick={() => handleToolOpen('reply')}
                icon={<ReplyIcon color="#06b6d4" />}
                label="WRITE MY REPLY"
                sub="We write it for you. Copy and send."
                tag={isLocked ? '🔒 LOCKED' : 'FREE'}
              />

              <BigButton
                delay={0.15}
                color="#ef4444"
                onClick={() => handleToolOpen('conflict')}
                icon={<ConflictIcon color="#ef4444" />}
                label="DISPUTE HELP"
                sub="Neighbour. Employer. Landlord. We fight back."
                tag={isLocked ? '🔒 LOCKED' : 'FREE'}
              />

            </div>

            {/* INSTANT TRUST — tiny, below the fold */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
            >
              {selectedLocation && <TrustPill text={selectedLocation.country} />}
              <TrustPill text="Any language" />
              <TrustPill text="Nothing stored" />
            </motion.div>

            {/* CLEAR DATA — always visible, in design */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: 20, textAlign: 'center' }}
            >
              <button
                onClick={() => { try { localStorage.clear(); } catch {} window.location.reload(); }}
                style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Trash2 size={11} />
                CLEAR ALL MY DATA
              </button>
            </motion.div>

            <SortedLiveCounter />

            <SortedForLifeCard />

          </motion.div>
        )}

        {/* ── CASE HISTORY ──────────────────────────────────── */}
        {showHistory && !activeTool && (
          <motion.div key="history" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <SortedCaseHistory />
          </motion.div>
        )}

        {/* ── TOOL VIEW ─────────────────────────────────────── */}
        {activeTool && (
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: slideDir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDir * -30 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: 560, margin: '0 auto', padding: '28px 20px 60px' }}
          >
            {/* TOOL TITLE BAR */}
            <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                {activeTool === 'letter' ? 'DECODE A LETTER' : activeTool === 'reply' ? 'WRITE MY REPLY' : 'DISPUTE HELP'}
              </p>
            </div>

            {activeTool === 'letter' && (
              <Family51LetterDecoder
                accentColor="#f97316"
                onResult={recordUse}
                onHandoff={(data) => handleToolOpen('reply', data)}
              />
            )}
            {activeTool === 'reply' && (
              <Family51ReplyWriter
                accentColor="#06b6d4"
                onResult={recordUse}
                prefillContext={prefillContext}
                suggestedTone={prefillContext?.suggestedTone || prefillContext?.suggested_tone}
                relatedCaseId={prefillContext?.related_case_id}
                onHandoff={() => handleToolOpen('conflict', { related_case_id: prefillContext?.related_case_id })}
              />
            )}
            {activeTool === 'conflict' && (
              <Family51ConflictHelper
                accentColor="#ef4444"
                onResult={recordUse}
                prefillContext={prefillContext}
              />
            )}

            {/* BOTTOM NAV — switch tools without going back */}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
              {[
                { id: 'letter',   label: 'DECODE', color: '#f97316' },
                { id: 'reply',    label: 'REPLY',  color: '#06b6d4' },
                { id: 'conflict', label: 'DISPUTE', color: '#ef4444' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => handleToolOpen(t.id)}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.15s',
                    border: `1px solid ${activeTool === t.id ? t.color + '60' : 'rgba(255,255,255,0.08)'}`,
                    background: activeTool === t.id ? `${t.color}15` : 'transparent',
                    color: activeTool === t.id ? t.color : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── MAURO AI HELPDESK MODAL ─────────────── */}
        <AnimatePresence>
          {showMauro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 0 0' }}
              onClick={() => setShowMauro(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
                style={{ width: '100%', maxWidth: 520, background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px 20px 0 0', padding: '28px 24px 40px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>AI HELPDESK</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>SORTED AI</div>
                  </div>
                  <button onClick={() => setShowMauro(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: 20, lineHeight: 1 }}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <MauroChat />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PAYWALL — shown when locked ───────────── */}
        {!activeTool && isLocked && (
          <motion.div
            key="paywall"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ marginBottom: 16 }}></div>
              <h1 style={{ fontSize: 'clamp(24px, 6vw, 34px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
                <span style={{ color: '#fff' }}>You've used your</span>{' '}
                <span style={{ color: '#f97316' }}>3 free decodes.</span>
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
                We know how stressful this stuff is. That's exactly why we built SORTED — so you don't have to face it alone.
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '12px 0 0', lineHeight: 1.5 }}>
                {geoPrice.inline} · cancel any time · no small print
              </p>
            </div>
            <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:family@uf51.love?subject=Can't afford SORTED right now" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#eab308', textDecoration: 'none', fontWeight: 600, padding: '12px', borderRadius: 8, border: '1px solid rgba(234,179,8,0.3)', background: 'rgba(234,179,8,0.06)', transition: 'all 0.15s', letterSpacing: '0.02em' }}>Can't afford it? Email us — we'll sort it.</a>
              <button
                onClick={() => setShowMauro(true)}
                style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600, padding: '12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'all 0.15s', letterSpacing: '0.02em' }}
              >
                Talk to SORTED AI — got questions?
              </button>
            </div>
            <SortedForLifeCard compact />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── WHY ROW ─────────────────────────────────────────────────────────────────
function WhyRow({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span style={{ flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center' }}>{icon}</span>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>{text}</span>
    </div>
  );
}

// ─── WHY ROW ICONS (custom SVG, no emoji) ────────────────────────────────────
function WRBolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 1.5L3 7.5h4L4.5 12.5L11 6H7L8.5 1.5Z" stroke="#f97316" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(249,115,22,0.15)" />
    </svg>
  );
}
function WRTarget() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="#f97316" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="3" stroke="#f97316" strokeWidth="1.2" opacity="0.6" />
      <circle cx="7" cy="7" r="1" fill="#f97316" />
    </svg>
  );
}
function WRPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5C5.07 1.5 3.5 3.07 3.5 5c0 2.625 3.5 7 3.5 7S10.5 7.625 10.5 5c0-1.93-1.57-3.5-3.5-3.5Z" stroke="#f97316" strokeWidth="1.2" fill="rgba(249,115,22,0.15)" />
      <circle cx="7" cy="5" r="1.2" fill="#f97316" />
    </svg>
  );
}
function WRLock() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6.5" width="9" height="6" rx="1.2" stroke="#f97316" strokeWidth="1.2" fill="rgba(249,115,22,0.1)" />
      <path d="M4.5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="1" fill="#f97316" />
    </svg>
  );
}
function WRMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1.2" stroke="#f97316" strokeWidth="1.2" fill="rgba(249,115,22,0.1)" />
      <path d="M2 3.5L7 7.5L12 3.5" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
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
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer', padding: '22px 22px',
        borderRadius: 16, border: `1px solid ${hovered ? color + '80' : color + '30'}`,
        background: hovered ? `${color}12` : `${color}07`,
        transition: 'border 0.12s, background 0.12s, box-shadow 0.12s', display: 'flex', alignItems: 'center', gap: 18,
        boxShadow: hovered ? `0 0 30px ${color}20` : 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
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
      {/* Briefcase body */}
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.06)" />
      {/* Briefcase handle */}
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Centre clasp */}
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.25)" />
      {/* Clasp lock dot */}
      <circle cx="15" cy="19" r="0.8" fill="#f97316" />
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

function StatCard({ number, label, color = '#f97316', source }) {
  return (
    <div style={{ background: `${color}08`, border: `1px solid ${color}30`, borderRadius: 12, padding: 16, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 900, color }}>{number}</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4 }}>{label}</p>
      {source && <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', margin: 0, marginTop: 4 }}>{source}</p>}
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

function PartnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="5" cy="4" r="1.5" stroke="#f97316" strokeWidth="1.2" />
      <circle cx="11" cy="4" r="1.5" stroke="#f97316" strokeWidth="1.2" />
      <path d="M5 5.5v3a1 1 0 001 1h4a1 1 0 001-1v-3" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 11.5h8M5 13h6" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CasesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2" y="4" width="11" height="9" rx="1.2" stroke="#f97316" strokeWidth="1.2" fill="none" />
      <path d="M5 4V3a2.5 2.5 0 015 0v1" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M4.5 8h6M4.5 10.5h4" stroke="#f97316" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#f97316" strokeWidth="1.2" fill="none" />
      <path d="M8 5v1M8 8v3" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.5" fill="#f97316" opacity="0.8" />
    </svg>
  );
}