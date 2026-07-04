import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

const ACCENT_COLOR = '#d97706';

export default function SortedHome() {
  const { isPremium } = useSortedUsage();

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg, #fdf9f0 0%, #faf6ef 30%, #f8f5f0 100%)',
      color: '#1a1a1a',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* WARM GLOW */}
      <div style={{
        position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* HERO — compact, at the top, like a messaging app header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ padding: '28px 20px 4px', textAlign: 'center', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <h1 style={{
          fontSize: 'clamp(26px, 6.5vw, 36px)', fontWeight: 700, lineHeight: 1.08,
          margin: '0 0 12px', color: '#1a1a1a', letterSpacing: '-0.025em',
          fontFamily: "'Fraunces', Georgia, serif",
        }}>
          Whatever that letter says —{' '}
          <em style={{ color: ACCENT_COLOR, fontStyle: 'italic', fontWeight: 600 }}>we've got you.</em>
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.45)', lineHeight: 1.5, margin: 0, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          Paste it, snap a photo, or tell us what's happening.
        </p>
      </motion.div>

      {/* THE BOX — right at the top, where your thumb expects it */}
      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedV2Flow />
      </div>

      {/* Live counter — quiet, right under the box */}
      <div style={{ padding: '16px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedLiveCounter />
      </div>

      {/* Everything below flows naturally — no divider, no hard split */}
      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />
      </div>

      {!isPremium && (
        <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SortedForLifeCard />
        </div>
      )}

      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedHelplines />
      </div>

      {/* Quiet links at the bottom — no footer block */}
      <div style={{ padding: '24px 20px 28px', textAlign: 'center', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.4)', fontWeight: 600, fontSize: 11 }}>FAQ</Link>
          <span style={{ color: 'rgba(26,18,8,0.12)', fontSize: 9 }}>·</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.4)', fontWeight: 600, fontSize: 11 }}>Terms</Link>
          <span style={{ color: 'rgba(26,18,8,0.12)', fontSize: 9 }}>·</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.4)', fontWeight: 600, fontSize: 11 }}>Privacy</Link>
          <span style={{ color: 'rgba(26,18,8,0.12)', fontSize: 9 }}>·</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.4)', fontWeight: 600, fontSize: 11 }}>About</Link>
        </div>
        <p style={{ fontSize: 9, color: 'rgba(26,18,8,0.25)', margin: 0, letterSpacing: '0.06em' }}>
          Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}