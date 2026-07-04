import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

const GOLD = '#d4a574';

export default function SortedHome() {
  const { isPaid: isPremium } = useSortedUsage();

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#f8f6f3',
      color: '#1a1a1a',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* SUBTLE GOLD GLOW — like candlelight from above */}
      <div style={{
        position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(212,165,116,0.07) 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* HERO — minimal. Just the promise. No instructions, no marketing. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: '36px 20px 4px', textAlign: 'center', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <p style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.32em',
          color: GOLD, margin: '0 0 18px', opacity: 0.6,
        }}>
          SORTEDSOS
        </p>
        <h1 style={{
          fontSize: 'clamp(28px, 7.5vw, 42px)', fontWeight: 700, lineHeight: 1.05,
          margin: 0, color: '#1a1a1a', letterSpacing: '-0.03em',
          fontFamily: "'Fraunces', Georgia, serif",
        }}>
          Whatever it is —{' '}
          <em style={{ color: GOLD, fontStyle: 'italic', fontWeight: 600 }}>we've got you.</em>
        </h1>
      </motion.div>

      {/* THE BOX — the hero. Right where your thumb expects it. */}
      <div style={{ padding: '24px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedV2Flow />
      </div>

      {/* Quiet reassurance */}
      <div style={{ padding: '20px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SortedLiveCounter />
      </div>

      {/* Everything below flows naturally — generous spacing, clearly secondary */}
      <div style={{ padding: '28px 20px 0', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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

      {/* Quiet footer */}
      <div style={{ padding: '32px 20px 36px', textAlign: 'center', maxWidth: 540, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>FAQ</Link>
          <span style={{ color: 'rgba(26,18,8,0.1)', fontSize: 9 }}>·</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>Terms</Link>
          <span style={{ color: 'rgba(26,18,8,0.1)', fontSize: 9 }}>·</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>Privacy</Link>
          <span style={{ color: 'rgba(26,18,8,0.1)', fontSize: 9 }}>·</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>About</Link>
        </div>
        <p style={{ fontSize: 9, color: 'rgba(26,18,8,0.22)', margin: 0, letterSpacing: '0.08em' }}>
          Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}