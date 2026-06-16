import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionMemory } from '../hooks/useSessionMemory';
import { base44 } from '@/api/base44Client';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
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
import { Trash2, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { DecodeIcon, ReplyToolIcon, ScamToolIcon, ConflictToolIcon, ContractToolIcon, CasesIcon, ArrowLeft, ArrowRight, CameraIcon, SortedMark, F51Mark, BoltIcon, TargetIcon, PinIcon, LockIcon, MailIcon, CouncilIcon, EmployerIcon, LandlordIcon, CourtIcon } from '@/components/family51/SortedIcons';

// ─── PHOTO BUTTON — triggers camera/file picker, uploads, passes file URL ──────
function PhotoButton({ onPhotoSelected }) {
  const fileRef = React.useRef(null);
  const [uploading, setUpLoading] = React.useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUpLoading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onPhotoSelected && onPhotoSelected(file_url);
    } catch {
      onPhotoSelected && onPhotoSelected(null);
    }
    setUpLoading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ display: 'none' }} />
      <div onClick={handleClick} style={{ flex: 0, padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(245,166,35,0.3)', background: 'rgba(245,166,35,0.08)', color: '#f5a623', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', opacity: uploading ? 0.5 : 1 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
        {uploading ? 'UPLOADING...' : 'SNAP PHOTO'}
      </div>
    </>
  );
}

// ─── FAMILY51 ────────────────────────────────────────────────────────────────
// Instant. Like pressing play. No reading first. v2
// ────────────────────────────────────────────────────────────────────────────

export default function Family51Page() {
  const location = useLocation();
  const { saveState, getState } = useSessionMemory('family51');
  const [showWhy, setShowWhy] = useState(() => getState('showWhy') || false);
  const [showHistory, setShowHistory] = useState(() => getState('showHistory') || false);
  const [showFAQ, setShowFAQ] = useState(() => getState('showFAQ') || false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPaySuccess, setShowPaySuccess] = useState(false);
  const [showMauro, setShowMauro] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isLocked, remaining, recordUse } = useSortedUsage();
  const geoPrice = useSortedGeoPrice();
  const engineRef = useRef(null);

  // Save state silently on change
  useEffect(() => { saveState('showWhy', showWhy); }, [showWhy, saveState]);
  useEffect(() => { saveState('showHistory', showHistory); }, [showHistory, saveState]);
  useEffect(() => { saveState('showFAQ', showFAQ); }, [showFAQ, saveState]);

  // Load case count from localStorage for badge + first visit onboarding
  useEffect(() => {
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
    } catch {}
    // Show onboarding only on first ever visit — skip in builder iframe
    // Onboarding removed — tool is the first thing people see now
  }, []);

  // Detect URL params (Stripe success, cases, upgrade) — reactive via React Router location
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('sorted') === 'success') {
      setShowPaySuccess(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (params.get('cases') === '1') {
      setShowHistory(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (params.get('upgrade') === '1') {
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => {
        const el = document.getElementById('sorted-upgrade');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [location.search]);

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
      // Latin America
      'America/Sao_Paulo': { country: 'Brazil', flag: '🇧🇷', code: 'BR', jurisdiction: 'Brazilian law · PROCON · CDC consumer code' },
      'America/Fortaleza': { country: 'Brazil', flag: '🇧🇷', code: 'BR', jurisdiction: 'Brazilian law · PROCON · CDC consumer code' },
      'America/Manaus': { country: 'Brazil', flag: '🇧🇷', code: 'BR', jurisdiction: 'Brazilian law · PROCON · CDC consumer code' },
      'America/Mexico_City': { country: 'Mexico', flag: '🇲🇽', code: 'MX', jurisdiction: 'Mexican law · PROFECO consumer protection' },
      'America/Monterrey': { country: 'Mexico', flag: '🇲🇽', code: 'MX', jurisdiction: 'Mexican law · PROFECO consumer protection' },
      'America/Santiago': { country: 'Chile', flag: '🇨🇱', code: 'CL', jurisdiction: 'Chilean law · SERNAC consumer service · PDI · Ley del Consumidor' },
      'America/Buenos_Aires': { country: 'Argentina', flag: '🇦🇷', code: 'AR', jurisdiction: 'Argentine law · Defensa del Consumidor · INDECOPI' },
      'America/Argentina/Buenos_Aires': { country: 'Argentina', flag: '🇦🇷', code: 'AR', jurisdiction: 'Argentine law · Defensa del Consumidor' },
      'America/Bogota': { country: 'Colombia', flag: '🇨🇴', code: 'CO', jurisdiction: 'Colombian law · SIC consumer protection' },
      'America/Lima': { country: 'Peru', flag: '🇵🇪', code: 'PE', jurisdiction: 'Peruvian law · INDECOPI consumer protection' },
      'America/Caracas': { country: 'Venezuela', flag: '🇻🇪', code: 'VE', jurisdiction: 'Venezuelan law' },
      'America/La_Paz': { country: 'Bolivia', flag: '🇧🇴', code: 'BO', jurisdiction: 'Bolivian law' },
      'America/Asuncion': { country: 'Paraguay', flag: '🇵🇾', code: 'PY', jurisdiction: 'Paraguayan law' },
      'America/Montevideo': { country: 'Uruguay', flag: '🇺🇾', code: 'UY', jurisdiction: 'Uruguayan law · ADECO' },
      'America/Guayaquil': { country: 'Ecuador', flag: '🇪🇨', code: 'EC', jurisdiction: 'Ecuadorian law · SICE' },
      'America/Guatemala': { country: 'Guatemala', flag: '🇬🇹', code: 'GT', jurisdiction: 'Guatemalan law' },
      'America/Costa_Rica': { country: 'Costa Rica', flag: '🇨🇷', code: 'CR', jurisdiction: 'Costa Rican law · MEIC' },
      'America/Panama': { country: 'Panama', flag: '🇵🇦', code: 'PA', jurisdiction: 'Panamanian law · ACODECO' },
      // Africa
      'Africa/Lagos': { country: 'Nigeria', flag: '🇳🇬', code: 'NG', jurisdiction: 'Nigerian law · FCCPC consumer protection' },
      'Africa/Nairobi': { country: 'Kenya', flag: '🇰🇪', code: 'KE', jurisdiction: 'Kenyan law · CAK consumer protection' },
      'Africa/Johannesburg': { country: 'South Africa', flag: '🇿🇦', code: 'ZA', jurisdiction: 'SA law · National Consumer Commission · NCC' },
      'Africa/Accra': { country: 'Ghana', flag: '🇬🇭', code: 'GH', jurisdiction: 'Ghanaian law · Consumer Protection Agency' },
      'Africa/Abidjan': { country: 'Ivory Coast', flag: '🇨🇮', code: 'CI', jurisdiction: 'Ivorian law' },
      'Africa/Dar_es_Salaam': { country: 'Tanzania', flag: '🇹🇿', code: 'TZ', jurisdiction: 'Tanzanian law · TFDA' },
      'Africa/Kampala': { country: 'Uganda', flag: '🇺🇬', code: 'UG', jurisdiction: 'Ugandan law' },
      'Africa/Addis_Ababa': { country: 'Ethiopia', flag: '🇪🇹', code: 'ET', jurisdiction: 'Ethiopian law' },
      'Africa/Cairo': { country: 'Egypt', flag: '🇪🇬', code: 'EG', jurisdiction: 'Egyptian law · Consumer Protection Agency' },
      'Africa/Casablanca': { country: 'Morocco', flag: '🇲🇦', code: 'MA', jurisdiction: 'Moroccan law' },
      'Africa/Tunis': { country: 'Tunisia', flag: '🇹🇳', code: 'TN', jurisdiction: 'Tunisian law' },
      // Middle East & Central Asia
      'Europe/Istanbul': { country: 'Turkey', flag: '🇹🇷', code: 'TR', jurisdiction: 'Turkish law · Tüketici Hakem Heyeti' },
      'Asia/Riyadh': { country: 'Saudi Arabia', flag: '🇸🇦', code: 'SA', jurisdiction: 'Saudi law · MOCI consumer protection' },
      'Asia/Kuwait': { country: 'Kuwait', flag: '🇰🇼', code: 'KW', jurisdiction: 'Kuwaiti law' },
      'Asia/Karachi': { country: 'Pakistan', flag: '🇵🇰', code: 'PK', jurisdiction: 'Pakistani law · Competition Commission' },
      'Asia/Dhaka': { country: 'Bangladesh', flag: '🇧🇩', code: 'BD', jurisdiction: 'Bangladeshi law · DNCRP' },
      'Asia/Colombo': { country: 'Sri Lanka', flag: '🇱🇰', code: 'LK', jurisdiction: 'Sri Lankan law · Consumer Affairs Authority' },
      'Asia/Kathmandu': { country: 'Nepal', flag: '🇳🇵', code: 'NP', jurisdiction: 'Nepali law' },
      // Europe (additional)
      'Europe/Warsaw': { country: 'Poland', flag: '🇵🇱', code: 'PL', jurisdiction: 'Polish law · UOKiK consumer protection' },
      'Europe/Stockholm': { country: 'Sweden', flag: '🇸🇪', code: 'SE', jurisdiction: 'Swedish law · Konsumentverket' },
      'Europe/Oslo': { country: 'Norway', flag: '🇳🇴', code: 'NO', jurisdiction: 'Norwegian law · Forbrukerrådet' },
      'Europe/Copenhagen': { country: 'Denmark', flag: '🇩🇰', code: 'DK', jurisdiction: 'Danish law · Forbrugerrådet' },
      'Europe/Helsinki': { country: 'Finland', flag: '🇫🇮', code: 'FI', jurisdiction: 'Finnish law · Kilpailu- ja kuluttajavirasto' },
      'Europe/Lisbon': { country: 'Portugal', flag: '🇵🇹', code: 'PT', jurisdiction: 'Portuguese law · DECO · Livro de Reclamações' },
      'Europe/Athens': { country: 'Greece', flag: '🇬🇷', code: 'GR', jurisdiction: 'Greek law · EFPOLIS consumer protection' },
      'Europe/Prague': { country: 'Czech Republic', flag: '🇨🇿', code: 'CZ', jurisdiction: 'Czech law · ČOI consumer inspection' },
      'Europe/Budapest': { country: 'Hungary', flag: '🇭🇺', code: 'HU', jurisdiction: 'Hungarian law · NFH consumer authority' },
      'Europe/Bucharest': { country: 'Romania', flag: '🇷🇴', code: 'RO', jurisdiction: 'Romanian law · ANPC consumer protection' },
      'Europe/Sofia': { country: 'Bulgaria', flag: '🇧🇬', code: 'BG', jurisdiction: 'Bulgarian law · CPC' },
      'Europe/Kiev': { country: 'Ukraine', flag: '🇺🇦', code: 'UA', jurisdiction: 'Ukrainian law' },
      'Europe/Moscow': { country: 'Russia', flag: '🇷🇺', code: 'RU', jurisdiction: 'Russian law · Rospotrebnadzor' },
      // Asia Pacific (additional)
      'Pacific/Auckland': { country: 'New Zealand', flag: '🇳🇿', code: 'NZ', jurisdiction: 'NZ law · Consumer NZ · Disputes Tribunal' },
      'Australia/Brisbane': { country: 'Australia', flag: '🇦🇺', code: 'AU', jurisdiction: 'Australian law · ACCC · Fair Trading' },
      'Australia/Perth': { country: 'Australia', flag: '🇦🇺', code: 'AU', jurisdiction: 'Australian law · ACCC · Fair Trading' },
      'Asia/Hong_Kong': { country: 'Hong Kong', flag: '🇭🇰', code: 'HK', jurisdiction: 'HK law · Consumer Council · EMSD' },
      'Asia/Shanghai': { country: 'China', flag: '🇨🇳', code: 'CN', jurisdiction: 'Chinese law · SAMR consumer protection · 12315 hotline' },
      'Asia/Taipei': { country: 'Taiwan', flag: '🇹🇼', code: 'TW', jurisdiction: 'Taiwanese law · Consumer Protection Commission' },
    };

    let detected = geoMap[tz] || { country: 'United Kingdom', code: 'GB', jurisdiction: 'UK law' };
    
    // Remove flags from all entries
    delete detected.flag;
    setSelectedLocation(detected);

    // For GB: use HTTPS ipapi to detect Scotland/Wales within UK
    if (detected.code === 'GB') {
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
          const region = (data.region || '').toLowerCase();
          const city = (data.city || '').toLowerCase();
          const scottish = ['scotland','highland','grampian','tayside','fife','lothian','strathclyde','borders','dumfries','argyll','orkney','shetland','edinburgh','glasgow','aberdeen','dundee','inverness','stirling','perth','falkirk','ayr','paisley','motherwell','hamilton','livingston'];
          const welsh = ['wales','cardiff','swansea','newport','wrexham','gwynedd','conwy','powys','ceredigion','pembrokeshire','carmarthenshire'];
          if (scottish.some(k => region.includes(k) || city.includes(k))) {
            setSelectedLocation({ country: 'Scotland', code: 'SCT', jurisdiction: 'Scots law · Scottish Legal Aid Board · Citizens Advice Scotland' });
          } else if (welsh.some(k => region.includes(k) || city.includes(k))) {
            setSelectedLocation({ country: 'Wales', code: 'WLS', jurisdiction: 'England & Wales law · Citizens Advice Wales' });
          } else if ((data.region_code || '') === 'NIR' || city.includes('belfast') || city.includes('derry')) {
            setSelectedLocation({ country: 'Northern Ireland', code: 'NIR', jurisdiction: 'Northern Ireland law · Law Centre NI · Citizens Advice NI' });
          }
          // else stays as United Kingdom
        })
        .catch(() => {}); // silent fail — stays as UK, user can tap "Change"
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', color: '#1a1208', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden', maxWidth: '100vw' }}>
      {/* Color palette: warm orange (#f97316) + light cream (#faf8f5) + deep brown (#1a1208) */}
      <style>{`
        /* Native-feeling touches */
        .sorted-tap-btn { transition: opacity 0.08s; }
        .sorted-tap-btn:active { opacity: 0.5; }
        @media (hover: hover) { .sorted-tap-btn:hover { opacity: 0.85; } }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Disable pull-to-refresh on mobile */
        body { overscroll-behavior-y: contain; }

        /* Hardware acceleration for animations */
        .hw-accel { transform: translateZ(0); will-change: transform; }

        /* Disable text selection on buttons */
        button { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }

        /* Instant tap feedback */
        .tap-feedback { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
        .tap-feedback:active { transform: scale(0.94); }
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

      <AnimatePresence mode="sync">

         {/* ── FAQ SECTION ────────────────────────────────────── */}
         {showFAQ && (
           <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
             <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-start', padding: '16px 20px 0' }}>
               <button onClick={() => setShowFAQ(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,18,8,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 5 }}>
                 <ArrowLeft />
                 BACK
               </button>
             </div>
             <SortedFAQ accentColor="#f5a623" />
           </motion.div>
         )}

         {/* ── WHY SECTION ────────────────────────────────────── */}
         {showWhy && (
           <motion.div key="why" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ maxWidth: 520, margin: '0 auto', padding: '16px 20px 60px' }}>
             <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-start' }}>
               <button onClick={() => setShowWhy(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,18,8,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 5 }}>
                 <ArrowLeft />
                 BACK
               </button>
             </div>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.6)', marginBottom: 14 }}>THE PROBLEM</div>
              <h2 style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                <span style={{ color: '#1a1208' }}>Official letters</span>{' '}
                <span style={{ color: '#f5a623' }}>leave people stuck.</span>
              </h2>
            </div>

            {/* STATS CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
              <StatCard number="5.1B" label="people worldwide with unmet justice needs — two thirds of humanity" source="World Justice Project 2023" color="#f5a623" />
              <StatCard number="92%" label="of serious civil legal problems in the USA receive no professional help" source="Legal Services Corp. 2022" color="#f5a623" />
              <StatCard number="73%" label="of people referred to bailiffs have a mental health condition" source="Money & Mental Health Institute" color="#f5a623" />
              <StatCard number="£1.7B" label="UK civil legal aid budget cut by over 40% since LASPO 2013 — millions left without help" source="Law Society 2023" color="#f5a623" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              <ProblemCard icon={<CouncilIcon />} title="Councils" desc="Planning refusals. Enforcement notices. Tax demands." />
              <ProblemCard icon={<EmployerIcon />} title="Employers" desc="Redundancy letters. Disciplinary notices. Contract changes." />
              <ProblemCard icon={<LandlordIcon />} title="Landlords" desc="Eviction warnings. Deposit disputes. Rent increases." />
              <ProblemCard icon={<CourtIcon />} title="Courts" desc="Summons. Judgments. Legal jargon you don't understand." />
            </div>
            <div style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 14, color: '#1a1208', margin: 0, lineHeight: 1.6 }}>
                <strong>You freeze.</strong> Read it 10 times. Still don't understand. Panic.
              </p>
            </div>
            <div style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.18)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f5a623', marginBottom: 8 }}>REAL TALK</div>
              <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.8)', margin: 0, lineHeight: 1.6 }}>
                Some people <strong>bury their head in the sand.</strong> Don't open the letter. Hope it goes away. It doesn't.
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.55)', margin: '12px 0 0', lineHeight: 1.5 }}>
                That's when deadlines pass. Legal action follows. Things get worse.
              </p>
            </div>
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.6)', marginBottom: 14 }}>THE SOLUTION</div>
              <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.6 }}>
                SORTED decodes it in <strong>your language</strong>. Shows you what it means. Lists what to do next. You're not alone anymore.
              </p>
            </div>

            <SortedAbout />

          </motion.div>
         )}

         {/* ── HOME: ONE CLEAR ACTION ─────────────────── */}
         {!isLocked && !showWhy && !showFAQ && !showHistory && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ maxWidth: 520, margin: '0 auto', padding: '20px 20px 80px' }}>

            {/* STRIPE SUCCESS — premium celebration */}
            <AnimatePresence>
              {showPaySuccess && (
                <SortedPremiumSuccess onDismiss={() => setShowPaySuccess(false)} />
              )}
            </AnimatePresence>

            {/* HERO — one line, confident */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} style={{ marginBottom: 18, textAlign: 'center' }}>
              <h1 style={{ fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 6px', color: '#1a1208' }}>
                Paste, type, or snap a photo of any letter
              </h1>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(26,18,8,0.5)', margin: 0 }}>
                We'll tell you what it means and what to do next.
              </p>
            </motion.div>

            {/* PRIMARY TOOLS — the core flow: decode → reply */}
            <div style={{ marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {/* DECODE */}
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                onClick={() => { if (navigator.vibrate) navigator.vibrate(10); engineRef.current && engineRef.current.open('letter'); }}
                className="tap-feedback"
                style={{
                  cursor: 'pointer', padding: '16px 14px', borderRadius: 16,
                  border: '2px solid rgba(245,166,35,0.35)', background: 'rgba(245,166,35,0.05)',
                  WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(245,166,35,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <DecodeIcon color="#f5a623" size={16} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', letterSpacing: '-0.01em', marginBottom: 4 }}>Decode</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.45)', lineHeight: 1.4, marginBottom: 10 }}>Understand any letter in plain English</div>
                <div style={{ width: '100%', padding: '10px 0', borderRadius: 10, background: '#f5a623', color: '#fff', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.06em' }}>
                  START →
                </div>
              </motion.div>

              {/* REPLY */}
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                onClick={() => { if (navigator.vibrate) navigator.vibrate(10); engineRef.current && engineRef.current.open('reply'); }}
                className="tap-feedback"
                style={{
                  cursor: 'pointer', padding: '16px 14px', borderRadius: 16,
                  border: '2px solid rgba(37,99,235,0.35)', background: 'rgba(37,99,235,0.04)',
                  WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <ReplyToolIcon color="#2563eb" size={16} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', letterSpacing: '-0.01em', marginBottom: 4 }}>Reply</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.45)', lineHeight: 1.4, marginBottom: 10 }}>Write a professional reply — right tone, right words</div>
                <div style={{ width: '100%', padding: '10px 0', borderRadius: 10, background: '#2563eb', color: '#fff', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: '0.06em' }}>
                  WRITE →
                </div>
              </motion.div>
            </div>

            {/* PHOTO BUTTON ROW — quick snap for decode */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <PhotoButton onPhotoSelected={(fileUrl) => {
                  engineRef.current && engineRef.current.open('letter', { triggerPhoto: true, prefillFileUrl: fileUrl });
                }} />
                <div style={{ flex: 1, padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(26,18,8,0.15)', background: '#fff', color: 'rgba(26,18,8,0.55)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => engineRef.current && engineRef.current.open('letter')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/></svg>
                  PASTE TEXT INSTEAD
                </div>
              </div>
            </motion.div>

            {/* SECONDARY: other tools */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.35)', margin: '0 0 10px', textAlign: 'center' }}>SOMETHING ELSE?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { id: 'scam', label: 'Check a scam', color: '#ef4444', icon: <ScamToolIcon color="#ef4444" size={14} /> },
                  { id: 'conflict', label: 'Dispute help', color: '#059669', icon: <ConflictToolIcon color="#059669" size={14} /> },
                  { id: 'contract', label: 'Check contract', color: '#7c3aed', icon: <ContractToolIcon color="#7c3aed" size={14} /> },
                ].map(({ id, label, color, icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => { if (navigator.vibrate) navigator.vibrate(8); engineRef.current && engineRef.current.open(id); }}
                    whileTap={{ scale: 0.96 }}
                    className="tap-feedback"
                    style={{
                      padding: '14px 8px', borderRadius: 12, fontSize: 11, fontWeight: 800,
                      letterSpacing: '0.04em', cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${color}25`, background: `${color}05`, color,
                      WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    }}
                  >
                    {icon}
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* PRIVACY — tiny */}
            <div style={{ marginBottom: 20, padding: '8px 12px', borderRadius: 8, background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <rect x="1.5" y="5" width="9" height="6" rx="1" stroke="#f5a623" strokeWidth="1.1" />
                <path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#f5a623" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 10, color: 'rgba(26,18,8,0.45)', letterSpacing: '0.03em' }}>Nothing stored. No account. No trace. {geoPrice.inline} when you're ready for unlimited.</span>
            </div>

            <SortedLiveCounter />

            {/* MY CASES */}
            {(() => {
              let caseCount = 0;
              try { caseCount = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]').length; } catch {}
              return caseCount > 0 ? (
                <motion.button
                  onClick={() => setShowHistory(true)}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', marginBottom: 14, padding: '14px 18px', borderRadius: 14, border: '1.5px solid rgba(245,166,35,0.35)', background: 'rgba(245,166,35,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CasesIcon color="#f5a623" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208', letterSpacing: '-0.01em' }}>My Cases</div>
                      <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.45)' }}>{caseCount} saved</div>
                    </div>
                  </div>
                  <ArrowRight />
                </motion.button>
              ) : null;
            })()}

            {/* FOOTER LINKS — tiny */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8, fontSize: 10, color: 'rgba(26,18,8,0.3)', fontWeight: 600 }}>
              <button onClick={() => setShowWhy(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>About</button>
              <button onClick={() => setShowFAQ(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>FAQ</button>
              <a href="/SortedTerms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
              <a href="/SortedPrivacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            </div>

          </motion.div>
         )}

        {/* ── CASE HISTORY ──────────────────────────────────── */}
         {showHistory && (
           <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
             <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-start', padding: '16px 20px 0' }}>
               <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,18,8,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 5 }}>
                 <ArrowLeft />
                 BACK
               </button>
             </div>
             <SortedCaseHistory
               key={showHistory}
               isPremium={!isLocked}
               onContinue={(caseItem) => {
                 setShowHistory(false);
                 let parsed = null;
                 try { parsed = JSON.parse(caseItem.ai_result); } catch {}
                 if (caseItem.tool === 'letter') {
                   const ctx = {
                     sender: parsed?.sender || 'Unknown',
                     summary: parsed?.letter_summary || caseItem.summary || '',
                     deadline: parsed?.key_deadline || '',
                     what_this_means: parsed?.what_this_means || '',
                     action_steps: parsed?.action_steps || [],
                     severity: parsed?.severity || '',
                     financial_impact: parsed?.financial_impact || '',
                     suggested_tone: parsed?.suggested_tone || 'calm',
                     related_case_id: caseItem.id,
                   };
                   engineRef.current && engineRef.current.open('reply', ctx);
                 } else if (caseItem.tool === 'reply') {
                   const ctx = {
                     related_case_id: caseItem.related_case_id || caseItem.id,
                     summary: caseItem.summary || '',
                     reply_summary: parsed?.subject_line || '',
                     reply_body: parsed?.letter_body || '',
                     situation_hint: parsed?.letter_body
                       ? `I sent a reply (subject: ${parsed.subject_line || 'reply'}) but they ignored it.\n\nMy reply:\n${parsed.letter_body?.slice(0, 500)}`
                       : `I sent a reply about ${caseItem.summary || 'my situation'} but they ignored it.`,
                   };
                   engineRef.current && engineRef.current.open('conflict', ctx);
                 }
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



        {/* ── LOCATION PICKER MODAL ─────────────── */}
        <AnimatePresence>
          {showLocationPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
              onClick={() => setShowLocationPicker(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={e => e.stopPropagation()}
                style={{ width: '100%', maxWidth: 520, background: '#faf8f5', borderRadius: '20px 20px 0 0', padding: '24px 20px 40px', maxHeight: '75vh', overflowY: 'auto' }}
              >
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.4)', marginBottom: 8 }}>YOUR LOCATION</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#1a1208', marginBottom: 16 }}>Where are you?</div>
                {[
                  { country: 'Scotland', code: 'SCT', jurisdiction: 'Scots law · Scottish Legal Aid Board · Citizens Advice Scotland' },
                  { country: 'England', code: 'ENG', jurisdiction: 'England & Wales law · Citizens Advice · Legal Aid Agency' },
                  { country: 'Wales', code: 'WLS', jurisdiction: 'England & Wales law · Citizens Advice Wales · Welsh Government rights' },
                  { country: 'Northern Ireland', code: 'NIR', jurisdiction: 'Northern Ireland law · Law Centre NI · Citizens Advice NI' },
                  { country: 'Ireland', code: 'IE', jurisdiction: 'Irish law' },
                  { country: 'United States', code: 'US', jurisdiction: 'US law' },
                  { country: 'Canada', code: 'CA', jurisdiction: 'Canadian law' },
                  { country: 'Australia', code: 'AU', jurisdiction: 'Australian law · ACCC · Fair Trading' },
                  { country: 'New Zealand', code: 'NZ', jurisdiction: 'NZ law · Consumer NZ · Disputes Tribunal' },
                  { country: 'India', code: 'IN', jurisdiction: 'Indian law' },
                  { country: 'South Africa', code: 'ZA', jurisdiction: 'SA law · National Consumer Commission · NCC' },
                  { country: 'Nigeria', code: 'NG', jurisdiction: 'Nigerian law · FCCPC consumer protection' },
                  { country: 'Kenya', code: 'KE', jurisdiction: 'Kenyan law · CAK consumer protection' },
                  { country: 'Germany', code: 'DE', jurisdiction: 'German law' },
                  { country: 'France', code: 'FR', jurisdiction: 'French law' },
                  { country: 'Spain', code: 'ES', jurisdiction: 'Spanish law' },
                  { country: 'Italy', code: 'IT', jurisdiction: 'Italian law' },
                  { country: 'Netherlands', code: 'NL', jurisdiction: 'Dutch law' },
                  { country: 'UAE', code: 'AE', jurisdiction: 'UAE law' },
                  { country: 'Singapore', code: 'SG', jurisdiction: 'Singapore law' },
                  { country: 'Philippines', code: 'PH', jurisdiction: 'Philippine law' },
                  { country: 'Brazil', code: 'BR', jurisdiction: 'Brazilian law · PROCON · CDC consumer code' },
                  { country: 'Mexico', code: 'MX', jurisdiction: 'Mexican law · PROFECO consumer protection' },
                ].map(loc => (
                  <button
                    key={loc.code}
                    onClick={() => { setSelectedLocation(loc); setShowLocationPicker(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '12px 14px', marginBottom: 6, borderRadius: 10, border: selectedLocation?.code === loc.code ? '1.5px solid #f5a623' : '1px solid rgba(26,18,8,0.1)', background: selectedLocation?.code === loc.code ? 'rgba(245,166,35,0.08)' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1208' }}>{loc.country}</div>
                      <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.45)' }}>{loc.jurisdiction.split('·')[0].trim()}</div>
                    </div>
                    {selectedLocation?.code === loc.code && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f5a623' }} />}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                style={{ width: '100%', maxWidth: 520, background: '#faf8f5', border: '1px solid rgba(245,166,35,0.2)', borderRadius: '20px 20px 0 0', padding: '28px 24px 40px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.4)', marginBottom: 4 }}>AI HELPDESK</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.02em' }}>SORTED AI</div>
                  </div>
                  <button onClick={() => setShowMauro(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,18,8,0.3)', fontSize: 20, lineHeight: 1 }}>
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
                <span style={{ color: '#1a1208' }}>You decoded it.</span><br />
                <span style={{ color: '#f5a623' }}>Now act on it.</span>
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(26,18,8,0.65)', margin: '0 0 12px', lineHeight: 1.6 }}>
                You got your 10 free uses. You understand what the letter means now. That's the hardest part done. Premium helps you finish it — draft the reply, resolve the dispute, follow through. {geoPrice.inline}/month.
              </p>
              <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', margin: '0 0 4px', lineHeight: 1.5 }}>
                Cancel anytime. Nothing stored. Not legal advice.
              </p>
            </div>

            <SortedForLifeCard compact />

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => setShowMauro(true)}
                style={{ width: '100%', textAlign: 'center', fontSize: 13, color: 'rgba(26,18,8,0.45)', fontWeight: 600, padding: '12px', borderRadius: 8, border: '1px solid rgba(26,18,8,0.12)', background: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
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



// ─── WHY ROW ═══════════════════════════════════════════════════════════════
// (icons now imported from SortedIcons)
function WhyRow({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span style={{ flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center' }}>{icon}</span>
      <span style={{ fontSize: 14, color: 'rgba(26,18,8,0.65)', lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function StatCard({ number, label, color = '#f5a623', source }) {
  return (
    <div style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 12, padding: 16, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 900, color }}>{number}</div>
      <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.4 }}>{label}</p>
      {source && <p style={{ fontSize: 9, color: 'rgba(26,18,8,0.3)', margin: 0, marginTop: 4 }}>{source}</p>}
    </div>
  );
}

function ProblemCard({ icon, title, desc }) {
  return (
    <div style={{ paddingLeft: 16, borderLeft: '2px solid rgba(245,166,35,0.25)' }}>
      <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1208', marginBottom: 4 }}>{title}</div>
      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─── ICONS NOW IMPORTED FROM SortedIcons ─────────────────────