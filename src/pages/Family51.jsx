import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionMemory } from '../hooks/useSessionMemory';
import { Link } from 'react-router-dom';
import { Menu, X, Eye, Scale, Trash2, Mail } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import { useRef } from 'react';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';
import SortedAbout from '@/components/family51/SortedAbout';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedLoader from '@/components/family51/SortedLoader';
import SortedFAQ from '@/components/family51/SortedFAQ';
import MauroChat from '@/components/family51/MauroChat';
import SortedOnboarding from '@/components/family51/SortedOnboarding';
import SortedJourneyBar from '@/components/family51/SortedJourneyBar';
import SortedShareMoment from '@/components/family51/SortedShareMoment';
import SortedPremiumSuccess from '@/components/family51/SortedPremiumSuccess';

// ─── FAMILY51 ────────────────────────────────────────────────────────────────
// Instant. Like pressing play. No reading first. v2
// ────────────────────────────────────────────────────────────────────────────

export default function Family51Page() {
  const { saveState, getState } = useSessionMemory('family51');
  const [menuOpen, setMenuOpen] = useState(() => getState('menuOpen') || false);
  const [showWhy, setShowWhy] = useState(() => getState('showWhy') || false);
  const [showHistory, setShowHistory] = useState(() => getState('showHistory') || false);
  const [showFAQ, setShowFAQ] = useState(() => getState('showFAQ') || false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPaySuccess, setShowPaySuccess] = useState(false);
  const [caseCount, setCaseCount] = useState(0);
  const [showMauro, setShowMauro] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isLocked, remaining, recordUse } = useSortedUsage();
  const geoPrice = useSortedGeoPrice();
  const engineRef = useRef(null);

  // Save state silently on change
  useEffect(() => { saveState('menuOpen', menuOpen); }, [menuOpen, saveState]);
  useEffect(() => { saveState('showWhy', showWhy); }, [showWhy, saveState]);
  useEffect(() => { saveState('showHistory', showHistory); }, [showHistory, saveState]);
  useEffect(() => { saveState('showFAQ', showFAQ); }, [showFAQ, saveState]); 

  // Load case count from localStorage for badge + first visit onboarding
  useEffect(() => {
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
      setCaseCount(cases.length);
    } catch {}
    // Show onboarding only on first ever visit — skip in builder iframe
    const inIframe = window.self !== window.top;
    const seen = localStorage.getItem('sorted_onboarding_done');
    if (!seen && !inIframe) setShowOnboarding(true);
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

  const handleBack = () => {
    setShowWhy(false);
    setShowHistory(false);
    setShowFAQ(false);
  };

  useEffect(() => {
    document.title = 'SORTED — We\'ve Got You';
    
    // Auto-detect location from timezone/language
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language || '';

    const geoMap = {
      'Europe/London': { country: 'United Kingdom', flag: '🇬🇧', code: 'GB', jurisdiction: 'UK law' },
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
      'Asia/Manila': { country: 'Philippines', flag: '🇵🇭', code: 'PH', jurisdiction: 'Philippine law' },
      'Asia/Jakarta': { country: 'Indonesia', flag: '🇮🇩', code: 'ID', jurisdiction: 'Indonesian law' },
      'Asia/Kuala_Lumpur': { country: 'Malaysia', flag: '🇲🇾', code: 'MY', jurisdiction: 'Malaysian law' },
      'Asia/Bangkok': { country: 'Thailand', flag: '🇹🇭', code: 'TH', jurisdiction: 'Thai law' },
      'Asia/Ho_Chi_Minh': { country: 'Vietnam', flag: '🇻🇳', code: 'VN', jurisdiction: 'Vietnamese law' },
      'Asia/Seoul': { country: 'South Korea', flag: '🇰🇷', code: 'KR', jurisdiction: 'South Korean law' },
      'Asia/Tokyo': { country: 'Japan', flag: '🇯🇵', code: 'JP', jurisdiction: 'Japanese law' },
      'America/Sao_Paulo': { country: 'Brazil', flag: '🇧🇷', code: 'BR', jurisdiction: 'Brazilian law' },
      'America/Mexico_City': { country: 'Mexico', flag: '🇲🇽', code: 'MX', jurisdiction: 'Mexican law' },
      'Africa/Lagos': { country: 'Nigeria', flag: '🇳🇬', code: 'NG', jurisdiction: 'Nigerian law' },
      'Africa/Nairobi': { country: 'Kenya', flag: '🇰🇪', code: 'KE', jurisdiction: 'Kenyan law' },
      'Africa/Johannesburg': { country: 'South Africa', flag: '🇿🇦', code: 'ZA', jurisdiction: 'SA law' },
      'Europe/Istanbul': { country: 'Turkey', flag: '🇹🇷', code: 'TR', jurisdiction: 'Turkish law' },
    };

    const detected = geoMap[tz] || { country: 'United Kingdom', flag: '🇬🇧', code: 'GB', jurisdiction: 'UK law' };
    setSelectedLocation(detected);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0a08', color: '#fef3e2', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden', maxWidth: '100vw' }}>
      <style>{`
        .sorted-tap-btn { transition: opacity 0.08s; }
        .sorted-tap-btn:active { opacity: 0.5; }
        @media (hover: hover) { .sorted-tap-btn:hover { opacity: 0.85; } }
      `}</style>

      {/* ONBOARDING — first visit only */}
      <AnimatePresence>
        {showOnboarding && (
          <SortedOnboarding onDone={() => {
            localStorage.setItem('sorted_onboarding_done', '1');
            setShowOnboarding(false);
          }} />
        )}
      </AnimatePresence>

      {/* ── STICKY HEADER ──────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(13,10,8,0.98)', backdropFilter: 'blur(24px)', borderBottom: '1.5px solid rgba(245,166,35,0.2)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.div whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'opacity 0.15s' }} onClick={() => { setShowWhy(false); setShowHistory(false); setShowFAQ(false); setMenuOpen(false); }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <SortedMark />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#ffffff' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', color: '#f5a623', opacity: 0.85 }}>WE'VE GOT YOU</div>
          </div>
        </motion.div>

        <div style={{ flex: 1 }} />

         {showWhy || showHistory || showFAQ ? (
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
               style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#f5a623', background: 'rgba(245,166,35,0.1)', border: '1.5px solid rgba(245,166,35,0.3)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
             >
               FAQ
             </motion.button>
             <motion.button
               onClick={() => { setShowHistory(true); setShowFAQ(false); setShowWhy(false); setMenuOpen(false); }}
               whileTap={{ scale: 0.95 }}
               title="My Cases"
               style={{ position: 'relative', width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(245,166,35,0.3)', background: 'rgba(245,166,35,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', WebkitTapHighlightColor: 'transparent' }}
               >
               <CasesIcon />
               {caseCount > 0 && (
                 <div style={{ position: 'absolute', top: -4, right: -4, minWidth: 14, height: 14, borderRadius: 7, background: '#f5a623', border: '1.5px solid #0d0a08', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                   <span style={{ fontSize: 8, fontWeight: 900, color: '#0d0a08', lineHeight: 1 }}>{caseCount > 9 ? '9+' : caseCount}</span>
                 </div>
               )}
             </motion.button>
             <motion.button
               onClick={() => { setShowWhy(true); setMenuOpen(false); }}
               whileTap={{ scale: 0.95 }}
               title="Why SORTED?"
               style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(245,166,35,0.2)', background: 'rgba(245,166,35,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,166,35,0.6)', fontSize: 14, fontWeight: 900, fontStyle: 'italic', WebkitTapHighlightColor: 'transparent' }}
             >
               ?
             </motion.button>
             <motion.button onClick={() => setMenuOpen(!menuOpen)} whileTap={{ scale: 0.92 }} style={{ background: menuOpen ? 'rgba(245,166,35,0.12)' : 'rgba(254,243,226,0.04)', border: `1.5px solid ${menuOpen ? 'rgba(245,166,35,0.6)' : 'rgba(245,166,35,0.25)'}`, borderRadius: 10, cursor: 'pointer', padding: '7px 10px', color: '#f5a623', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.18s' }}>
               {menuOpen ? <X className="w-4 h-4" /> : <><Menu className="w-4 h-4" /><span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', fontFamily: 'monospace' }}>MENU</span></>}
             </motion.button>
           </div>
         )}
       </header>

       {/* ── HAMBURGER MENU ──────────────────────────────────── */}
       <AnimatePresence>
         {menuOpen && !showWhy && !showFAQ && (
           <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }} style={{ position: 'sticky', top: 54, zIndex: 49, background: 'rgba(13,10,8,0.97)', backdropFilter: 'blur(24px)', borderBottom: '1.5px solid rgba(245,166,35,0.15)', padding: '0 20px' }}>
                 <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
               <button onClick={() => { setShowWhy(true); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, color: '#fef3e2', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(245,166,35,0.08)', width: '100%', textAlign: 'left', letterSpacing: '0.02em', transition: 'all 0.12s' }} onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'} onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                 <WhyIcon />
                 Why we built this
               </button>
               <button onClick={() => { setShowFAQ(true); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, color: '#fef3e2', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(245,166,35,0.08)', width: '100%', textAlign: 'left', letterSpacing: '0.02em', transition: 'all 0.12s' }} onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'} onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                 <FAQIcon />
                 FAQ &amp; How It Works
               </button>
               <Link to="/SortedTerms" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, color: '#fef3e2', textDecoration: 'none', borderBottom: '1px solid rgba(245,166,35,0.08)', letterSpacing: '0.02em', transition: 'all 0.12s' }} onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'} onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                  <Scale className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Terms
                </Link>
                <Link to="/SortedPrivacy" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(0,212,255,0.06)', letterSpacing: '0.02em', transition: 'all 0.12s' }} onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'} onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                  <Eye className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Privacy
                </Link>
                <button onClick={() => { setShowMauro(true); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(0,212,255,0.06)', letterSpacing: '0.02em', width: '100%', textAlign: 'left', transition: 'all 0.12s' }} onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'} onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                  <Mail className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Say hi to SORTED AI
                </button>
                {/* PRIVACY NOTE */}
                <div style={{ padding: '11px 0', borderBottom: '1px solid rgba(245,166,35,0.06)' }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6 }}>
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
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', letterSpacing: '0.02em', transition: 'all 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all my data &amp; reset
                </button>
                </div>
                </motion.div>
                )}
                </AnimatePresence>

      <AnimatePresence mode="wait">

         {/* ── FAQ SECTION ────────────────────────────────────── */}
         {showFAQ && (
           <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }}>
             <SortedFAQ accentColor="#f5a623" />
           </motion.div>
         )}

         {/* ── WHY SECTION ────────────────────────────────────── */}
         {showWhy && (
           <motion.div key="why" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }} style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>THE PROBLEM</div>
              <h2 style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                <span style={{ color: '#fff' }}>Official letters</span>{' '}
                <span style={{ color: '#f5a623' }}>terrify people.</span>
              </h2>
            </div>

            {/* STATS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
              <StatCard number="5.1B" label="people worldwide with unmet justice needs — two thirds of humanity" source="World Justice Project 2023" />
              <StatCard number="92%" label="of serious civil legal problems in the USA receive no professional help" source="Legal Services Corp. 2022" />
              <StatCard number="73%" label="of people referred to bailiffs have a mental health condition" source="Money & Mental Health Institute" />
              <StatCard number="£1.7B" label="UK civil legal aid budget cut by over 40% since LASPO 2013 — millions left without help" source="Law Society 2023" color="#60a5fa" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              <ProblemCard icon={<CouncilIcon />} title="Councils" desc="Planning refusals. Enforcement notices. Tax demands." />
              <ProblemCard icon={<EmployerIcon />} title="Employers" desc="Redundancy letters. Disciplinary notices. Contract changes." />
              <ProblemCard icon={<LandlordIcon />} title="Landlords" desc="Eviction warnings. Deposit disputes. Rent increases." />
              <ProblemCard icon={<CourtIcon />} title="Courts" desc="Summons. Judgments. Legal jargon you don't understand." />
            </div>
            <div style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.6 }}>
                <strong>You freeze.</strong> Read it 10 times. Still don't understand. Panic.
              </p>
            </div>
            <div style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.12)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f5a623', marginBottom: 8 }}>REAL TALK</div>
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

         {/* ── HOME: PREMIUM, FAST, CONFIDENT ─────────────────── */}
         {!isLocked && !menuOpen && !showWhy && !showFAQ && !showHistory && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ maxWidth: 520, margin: '0 auto', padding: '16px 20px 60px' }}>

            {/* STRIPE SUCCESS — premium celebration */}
            <AnimatePresence>
              {showPaySuccess && (
                <SortedPremiumSuccess onDismiss={() => setShowPaySuccess(false)} />
              )}
            </AnimatePresence>

            {/* HERO — clear + compact */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f5a623', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5, opacity: 0.8 }}>Letters · Scams · Disputes · Replies</div>
              <h1 style={{ fontSize: 'clamp(22px, 6.5vw, 32px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0, color: '#fef3e2' }}>
                Got a scary letter?<br />
                <span style={{ color: '#f5a623' }}>We'll sort it.</span>
                <span style={{ color: 'rgba(254,243,226,0.4)', fontSize: 'clamp(13px, 3.5vw, 16px)', fontWeight: 600, marginLeft: 8 }}>Plain English. Seconds.</span>
              </h1>
            </motion.div>

            {/* PRIVACY TRUST — single line, compact */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.06 }} style={{ marginBottom: 14, padding: '8px 12px', background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                <rect x="1.5" y="5" width="9" height="6" rx="1" stroke="#f5a623" strokeWidth="1.1" />
                <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#f5a623" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#f5a623' }}>Nothing leaves your device</span>
              <span style={{ fontSize: 11, color: 'rgba(254,243,226,0.3)' }}>· No account. No storage. Ever.</span>
            </motion.div>

            {/* 4 TOOL BUTTONS — 2x2 grid */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[
                { id: 'letter',   label: 'Decode a letter',  sub: 'Paste or photo it',     color: '#f5a623',
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h4" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { id: 'scam',     label: 'Is it a scam?',    sub: 'Instant verdict. Free.', color: '#f5a623',
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(245,166,35,0.1)"/><path d="M12 8v4M12 16h.01" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/></svg> },
                { id: 'reply',    label: 'Write a reply',    sub: 'We draft it for you',   color: '#f5a623',
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { id: 'conflict', label: 'In a dispute?',    sub: 'Navigate it together',  color: '#f5a623',
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#f5a623" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              ].map(({ id, label, sub, color, icon }) => (
                <motion.button
                  key={id}
                  onClick={() => { if (navigator.vibrate) navigator.vibrate(10); engineRef.current && engineRef.current.open(id); }}
                  className="sorted-tap-btn"
                  whileTap={{ scale: 0.95 }}
                  style={{
                    textAlign: 'left', cursor: 'pointer',
                    padding: '15px 13px', borderRadius: 14,
                    border: '1.5px solid rgba(245,166,35,0.2)',
                    background: 'rgba(245,166,35,0.04)',
                    WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                    display: 'flex', flexDirection: 'column', gap: 8, minHeight: 100,
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#fef3e2', marginBottom: 2, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{label}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(254,243,226,0.38)', lineHeight: 1.35 }}>{sub}</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* TRUST STRIP — jurisdiction & free uses only */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
              <TrustPill text="Your local law" />
              <TrustPill text="10 free uses" />
            </motion.div>

            {/* HOW IT WORKS — always visible */}
            <div style={{ marginBottom: 24, padding: '16px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', margin: '0 0 12px' }}>HOW IT WORKS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <WhyRow icon={<WRBolt />} text="Paste, type or photo any letter — plain English in seconds" />
                <WhyRow icon={<WRTarget />} text="Exact next steps, deadlines, who to contact — zero jargon" />
                <WhyRow icon={<WRPin />} text="Knows your country and local legal bodies automatically" />
                <WhyRow icon={<WRLock />} text="Scam checker — photo or paste any message for an instant verdict. Free forever." />
                <WhyRow icon={<WRLock />} text="Nothing stored, nothing logged, nothing sold. Ever." />
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', margin: '12px 0 0', lineHeight: 1.5 }}>
                10 free uses — no card, no signup. Then <strong style={{ color: 'rgba(255,255,255,0.4)' }}>{geoPrice.inline}</strong> for unlimited. Cancel anytime.
              </p>
            </div>



            <SortedLiveCounter />

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <button onClick={() => { try { localStorage.clear(); } catch {} window.location.reload(); }} style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.15)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Trash2 size={10} /> CLEAR ALL MY DATA
              </button>
            </div>

          </motion.div>
        )}

        {/* ── CASE HISTORY ──────────────────────────────────── */}
         {showHistory && (
           <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }}>
             <SortedCaseHistory
               isPremium={!isLocked}
               onContinue={() => {
                 setShowHistory(false);
               }}
             />
           </motion.div>
         )}

        {/* ── TOOL VIEW: UNIFIED ENGINE ──────────────────────────── */}
        <SortedUnifiedEngine
          ref={engineRef}
          geoPrice={geoPrice}
          recordUse={recordUse}
        />



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

        {/* ── PAYWALL — earned, not punishing ───────────── */}
        {isLocked && (
          <motion.div
            key="paywall"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}
          >
            {/* Paywall content - just show upgrade prompt */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
              {/* No completed tools tracking needed in paywall — SortedUnifiedEngine handles it */}
              </div>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="18" width="28" height="18" rx="4" stroke="#f5a623" strokeWidth="2" fill="rgba(245,166,35,0.08)" />
                  <path d="M13 18V13a7 7 0 0114 0" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" strokeDasharray="4 3" />
                  <circle cx="20" cy="27" r="3" fill="#f5a623" opacity="0.9" />
                  <path d="M20 30v2" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 6vw, 34px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                <span style={{ color: '#fff' }}>You decoded it.</span><br />
                <span style={{ color: '#f5a623' }}>Now act on it.</span>
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 0 12px', lineHeight: 1.6 }}>
                You got your 10 free decodes. You understand what the letter means now. That's the hardest part done. Premium helps you finish it — draft the reply, resolve the dispute, follow through. {geoPrice.inline}/month.
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 4px', lineHeight: 1.5 }}>
                Cancel anytime. Nothing stored. Not legal advice.
              </p>
            </div>

            <SortedForLifeCard compact />

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => setShowMauro(true)}
                style={{ width: '100%', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600, padding: '12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
              >
                Got questions? Talk to SORTED AI
              </button>
            </div>
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
      <span style={{ fontSize: 12, color: 'rgba(254,243,226,0.65)', lineHeight: 1.45 }}>{text}</span>
    </div>
  );
}

// ─── WHY ROW ICONS (custom SVG, no emoji) ────────────────────────────────────
function WRBolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 1.5L3 7.5h4L4.5 12.5L11 6H7L8.5 1.5Z" stroke="#f5a623" strokeWidth="1.3" strokeLinejoin="round" fill="rgba(245,166,35,0.15)" />
    </svg>
  );
}
function WRTarget() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="#f5a623" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="3" stroke="#f5a623" strokeWidth="1.2" opacity="0.6" />
      <circle cx="7" cy="7" r="1" fill="#f5a623" />
    </svg>
  );
}
function WRPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="4" stroke="#f5a623" strokeWidth="1.2" fill="none" />
      <circle cx="7" cy="5" r="1.6" fill="#f5a623" />
      <path d="M7 9v3.5" stroke="#f5a623" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
function WRLock() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6.5" width="9" height="6" rx="1.2" stroke="#f5a623" strokeWidth="1.2" fill="rgba(245,166,35,0.1)" />
      <path d="M4.5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="1" fill="#f5a623" />
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
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f5a623' }} />
      <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(254,243,226,0.5)', letterSpacing: '0.05em' }}>{text}</span>
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

function TalkIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 8h24a2 2 0 012 2v12a2 2 0 01-2 2H20l-6 4v-4H6a2 2 0 01-2-2V10a2 2 0 012-2z" stroke={color} strokeWidth="1.5" fill={`${color}12`} />
      <path d="M11 16h14M11 20h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="26" cy="14" r="1" fill={color} opacity="0.8" />
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
      <circle cx="8" cy="3" r="1" fill="#f5a623" />
      <path d="M8 5v4M5 14h6" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="2" y="7" width="12" height="6" rx="1.5" stroke="#f5a623" strokeWidth="1.2" fill="none" />
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

function StatCard({ number, label, color = '#f5a623', source }) {
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
    <div style={{ paddingLeft: 16, borderLeft: '2px solid rgba(245,166,35,0.25)' }}>
      <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─── SORTED MARK ICON ─────────────────────────────────────────
function SortedMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#ffffff" strokeWidth="1.8" fill="rgba(255,255,255,0.06)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f5a623" strokeWidth="1.4" fill="rgba(245,166,35,0.25)" />
      <circle cx="15" cy="19" r="0.8" fill="#f5a623" />
    </svg>
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
      <rect x="2" y="4" width="11" height="9" rx="1.2" stroke="#f5a623" strokeWidth="1.2" fill="none" />
      <path d="M5 4V3a2.5 2.5 0 015 0v1" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M4.5 8h6M4.5 10.5h4" stroke="#f5a623" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#f5a623" strokeWidth="1.2" fill="none" />
      <path d="M8 5v1M8 8v3" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.5" fill="#f5a623" opacity="0.8" />
    </svg>
  );
}