import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import SortedTrustStrip from '@/components/family51/SortedTrustStrip';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

const ACCENT_COLOR = '#d97706';

export default function SortedHome() {
  const { isPremium } = useSortedUsage();

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf6ef 30%, #f8f5f0 100%)', color: '#1a1a1a', overflowX: 'hidden', position: 'relative' }}>

      {/* WARM GLOW — subtle decorative element at top */}
      <div style={{
        position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: '32px 20px 4px', textAlign: 'center', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16,
          padding: '6px 14px', borderRadius: 20,
          background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.15)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT_COLOR, display: 'inline-block' }} />
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: ACCENT_COLOR }}>ANY LETTER · ANY LANGUAGE · ANY COUNTRY</span>
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 700, lineHeight: 1.08,
          margin: '0 0 14px', color: '#1a1a1a', letterSpacing: '-0.025em',
          fontFamily: "'Fraunces', Georgia, serif",
        }}>
          Whatever that letter says —{' '}
          <em style={{ color: ACCENT_COLOR, fontStyle: 'italic', fontWeight: 600 }}>we've got you.</em>
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(26,18,8,0.5)', lineHeight: 1.55, margin: 0, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
          Paste it, snap a photo, or tell us what's happening. We'll decode it into plain language and tell you exactly what to do next.
        </p>
      </motion.div>

      {/* THE ONE INPUT */}
      <div style={{ padding: '24px 20px 4px', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedV2Flow />
      </div>

      {/* WARM WHISPER — replaces the numbered steps. Feels human, not instructional. */}
      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <p style={{
          fontSize: 13, color: 'rgba(26,18,8,0.38)', margin: 0, lineHeight: 1.5,
          fontWeight: 500, fontStyle: 'italic',
          fontFamily: "'Fraunces', Georgia, serif",
        }}>
          Paste it. We read it. You know what to do.
        </p>
      </div>

      {/* LIVE COUNTER */}
      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedLiveCounter />
      </div>

      {/* YOUR CASES */}
      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />
      </div>

      {/* PAYWALL */}
      {!isPremium && (
        <div style={{ padding: '24px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SortedForLifeCard />
        </div>
      )}

      {/* HELPLINES */}
      <div style={{ padding: '0 20px 20px', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedHelplines />
      </div>

      <SortedTrustStrip />

      {/* FOOTER */}
      <div style={{ padding: '32px 20px 28px', textAlign: 'center', marginTop: 12, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>FAQ</Link>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Terms</Link>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>Privacy</Link>
          <span style={{ color: 'rgba(26,18,8,0.15)', fontSize: 10 }}>•</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.5)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>About</Link>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.3)', margin: 0, letterSpacing: '0.08em' }}>
          Built by Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}