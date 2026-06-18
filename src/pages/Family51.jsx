import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedPremiumSuccess from '@/components/family51/SortedPremiumSuccess';
import MauroChat from '@/components/family51/MauroChat';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedAbout from '@/components/family51/SortedAbout';
import SortedFAQ from '@/components/family51/SortedFAQ';
import SortedOnboarding from '@/components/family51/SortedOnboarding';
import SortedFollowUp from '@/components/family51/SortedFollowUp';
import SortedPhotoButton from '@/components/family51/SortedPhotoButton';
import SortedFileUploadButton from '@/components/family51/SortedFileUploadButton';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedTrustRow from '@/components/family51/SortedTrustRow';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

function loadLocation() {
  try {
    const stored = localStorage.getItem('sorted_location');
    return stored ? JSON.parse(stored) : { jurisdiction: 'UK law', country: 'UK' };
  } catch { return { jurisdiction: 'UK law', country: 'UK' }; }
}

export default function Family51Page() {
  const [activeView, setActiveView] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCases, setShowCases] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(loadLocation);
  const [followUpInput, setFollowUpInput] = useState('');
  const engineRef = useRef(null);
  const geoPrice = useSortedGeoPrice();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgrade') === '1') setShowPaywall(true);
    if (params.get('cases') === '1') setShowCases(true);
  }, []);

  const { isLocked, remaining, recordUse, loaded } = useSortedUsage();

  // Handle "Snap a Photo" result from onboarding
  const handleOnboardingPhoto = (fileUrl) => {
    setShowOnboarding(false);
    setTimeout(() => engineRef.current?.open('letter', { triggerPhoto: true, prefillFileUrl: fileUrl }), 100);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf8f5 40%)', color: '#1a1208', position: 'relative' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '20px 16px 60px' }}>

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} style={{ marginBottom: 16, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 5px', color: '#1a1208' }}>
            Paste, type, snap a photo or upload a file
          </h1>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(26,18,8,0.5)', margin: 0 }}>
            We'll decode it into plain language — any language — then tell you exactly what to do.
          </p>
        </motion.div>

        {/* PRIMARY TOOLS */}
        <div style={{ marginBottom: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <SortedToolCard variant="primary" icon="letter" title="Decode a Letter" description="Plain English breakdown, urgency check, what to actually do" accentColor="#f5a623" onClick={() => engineRef.current?.open('letter')} />
          <SortedToolCard variant="primary" icon="reply" title="Write a Reply" description="Ready-to-send response, right tone, zero waffle" accentColor="#2563eb" onClick={() => engineRef.current?.open('reply')} />
        </div>

        {/* DIVIDER */}
        <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)' }} />
        </div>

        {/* QUICK INPUT ROW */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <SortedPhotoButton onPhotoSelected={(fileUrl) => engineRef.current?.open('letter', { triggerPhoto: true, prefillFileUrl: fileUrl })} />
            <SortedFileUploadButton onFileSelected={(fileUrl) => engineRef.current?.open('letter', { triggerPhoto: false, prefillFileUrl: fileUrl })} />
            <div
              onClick={() => engineRef.current?.open('letter')}
              style={{
                padding: '11px 6px', borderRadius: 10, border: '1px solid rgba(26,18,8,0.15)', background: '#fff',
                color: 'rgba(26,18,8,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.12s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 3px 8px rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/></svg>
              TYPE / PASTE
            </div>
          </div>
        </motion.div>

        {/* SECONDARY TOOLS */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(26,18,8,0.07)' }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(26,18,8,0.28)', whiteSpace: 'nowrap' }}>SOMETHING ELSE?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(26,18,8,0.07)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <SortedToolCard variant="secondary" icon="scam" title="Scam Checker" description="Spot it fast" onClick={() => engineRef.current?.open('scam')} />
            <SortedToolCard variant="secondary" icon="contract" title="Contract Checker" description="Rights grabs" onClick={() => engineRef.current?.open('contract')} />
            <SortedToolCard variant="secondary" icon="conflict" title="Resolve Conflict" description="Step-by-step" onClick={() => engineRef.current?.open('conflict')} />
          </div>
        </div>

        {/* TRUST ROW */}
        <SortedTrustRow selectedLocation={selectedLocation} geoPrice={geoPrice} onShowLocationPicker={setShowLocationPicker} />

        {/* LIVE COUNTER */}
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <SortedLiveCounter />
        </div>

        {/* CASE HISTORY */}
        <div style={{ marginBottom: 28, padding: '14px 16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(26,18,8,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <button onClick={() => setShowCases(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'rgba(26,18,8,0.5)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}>
              YOUR CASES {showCases ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          </div>
          <AnimatePresence>
            {showCases && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                <SortedCaseHistory onFollowUp={(input) => { setFollowUpInput(input); setShowFollowUp(true); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ABOUT — always visible, the why matters */}
        <div style={{ marginBottom: 28 }}>
          <SortedAbout />
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 28 }}>
          <button onClick={() => setShowFAQ(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'rgba(26,18,8,0.45)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', marginBottom: 8 }}>
            FAQ & HOW IT WORKS {showFAQ ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
          <AnimatePresence>{showFAQ && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}><SortedFAQ /></motion.div>}</AnimatePresence>
        </div>

        {/* MAURO CHAT */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(26,18,8,0.07)' }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(26,18,8,0.28)', whiteSpace: 'nowrap' }}>SORTED AI — ASK ANYTHING</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(26,18,8,0.07)' }} />
          </div>
          <div style={{ borderRadius: 14, padding: '14px 16px', background: '#fff', border: '1px solid rgba(249,115,22,0.15)' }}>
            <MauroChat />
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(245,166,35,0.15)' }} />
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(26,18,8,0.25)' }}>SORTED FOR LIFE</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(245,166,35,0.15)' }} />
        </div>

        {/* SORTED FOR LIFE CARD */}
        <SortedForLifeCard geoPrice={geoPrice} />

        {/* FOOTER LINKS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, paddingBottom: 16 }}>
          <Link to="/SortedFAQ" style={{ fontSize: 11, color: 'rgba(26,18,8,0.35)', textDecoration: 'none' }}>FAQ</Link>
          <Link to="/SortedTerms" style={{ fontSize: 11, color: 'rgba(26,18,8,0.35)', textDecoration: 'none' }}>Terms</Link>
          <Link to="/SortedPrivacy" style={{ fontSize: 11, color: 'rgba(26,18,8,0.35)', textDecoration: 'none' }}>Privacy</Link>
        </div>
      </div>

      {/* TOOL ENGINE */}
      <SortedUnifiedEngine ref={engineRef} geoPrice={geoPrice} recordUse={recordUse} isLocked={isLocked} onPaywall={() => setShowPaywall(true)} />

      {/* LOCATION PICKER MODAL */}
      <AnimatePresence>
        {showLocationPicker && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowLocationPicker(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 520, maxHeight: '80vh', overflowY: 'auto', background: '#fdf9f0', borderRadius: '20px 20px 0 0', padding: '24px 20px 40px' }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(26,18,8,0.15)', margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: 18, fontWeight: 900, color: '#1a1208', margin: '0 0 4px' }}>Where are you?</h2>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', margin: '0 0 20px' }}>This helps us give you accurate legal references.</p>
              {[
                { label: 'England & Wales', value: 'England & Wales · UK law', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
                { label: 'Scotland', value: 'Scotland · Scots law', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
                { label: 'Northern Ireland', value: 'Northern Ireland · NI law', flag: '🇬🇧' },
                { label: 'Ireland', value: 'Ireland · Irish law', flag: '🇮🇪' },
              ].map(loc => (
                <button
                  key={loc.value}
                  onClick={() => {
                    const newLoc = { jurisdiction: loc.value, country: loc.label.split('·')[0]?.trim() };
                    setSelectedLocation(newLoc);
                    localStorage.setItem('sorted_location', JSON.stringify(newLoc));
                    setShowLocationPicker(false);
                  }}
                  style={{
                    width: '100%', padding: '14px 16px', marginBottom: 8, borderRadius: 12,
                    border: `1.5px solid ${selectedLocation?.jurisdiction === loc.value ? '#f5a623' : 'rgba(26,18,8,0.1)'}`,
                    background: selectedLocation?.jurisdiction === loc.value ? 'rgba(245,166,35,0.06)' : '#fff',
                    cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 700, color: '#1a1208',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{loc.flag}</span> {loc.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM SUCCESS MODAL */}
      <AnimatePresence>{showSuccess && <SortedPremiumSuccess onDismiss={() => setShowSuccess(false)} onEnter={() => { setShowSuccess(false); engineRef.current?.open('letter'); }} />}</AnimatePresence>

      {/* PAYWALL — upgrade from any state */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPaywall(false)} style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 400 }}>
              <SortedForLifeCard geoPrice={geoPrice} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOLLOW-UP DRAWER */}
      <AnimatePresence>
        {showFollowUp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFollowUp(false)} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 520 }}>
              <SortedFollowUp prefillInput={followUpInput} onClose={() => setShowFollowUp(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}