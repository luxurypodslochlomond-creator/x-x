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
      background: 'linear-gradient(180deg, #fdf9f0 0%, #faf6ef 40%, #f6f3ee 100%)',
      color: '#1a1a1a',
      overflowX: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* WARM GLOW — behind the box */}
      <div style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* THE SCREEN — box is the hero, not marketing copy */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px 16px 8px',
        maxWidth: 560,
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        minHeight: 'calc(100dvh - 80px)',
      }}>
        {/* App-style title — not marketing, just identity */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 700, lineHeight: 1.1,
            margin: '0 0 20px', color: '#1a1a1a', letterSpacing: '-0.025em',
            fontFamily: "'Fraunces', Georgia, serif",
            textAlign: 'center',
          }}
        >
          Whatever that letter says —{' '}
          <em style={{ color: ACCENT_COLOR, fontStyle: 'italic', fontWeight: 600 }}>we've got you.</em>
        </motion.h1>

        {/* THE BOX — dominant, fills the screen */}
        <SortedV2Flow />

        {/* Live counter — compact, sits right under the box like app status */}
        <div style={{ marginTop: 12 }}>
          <SortedLiveCounter />
        </div>
      </div>

      {/* BELOW THE FOLD — compact secondary content */}
      <div style={{
        maxWidth: 560, margin: '0 auto', width: '100%',
        padding: '8px 16px 24px', position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(26,18,8,0.06)',
      }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />

        {!isPremium && (
          <div style={{ marginTop: 16 }}>
            <SortedForLifeCard />
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <SortedHelplines />
        </div>

        {/* Minimal links — no footer, just quiet text */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center',
          marginTop: 20, flexWrap: 'wrap',
        }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>FAQ</Link>
          <span style={{ color: 'rgba(26,18,8,0.12)', fontSize: 9 }}>·</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>Terms</Link>
          <span style={{ color: 'rgba(26,18,8,0.12)', fontSize: 9 }}>·</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>Privacy</Link>
          <span style={{ color: 'rgba(26,18,8,0.12)', fontSize: 9 }}>·</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,18,8,0.35)', fontWeight: 600, fontSize: 11 }}>About</Link>
        </div>
        <p style={{ fontSize: 9, color: 'rgba(26,18,8,0.22)', margin: '8px 0 0', textAlign: 'center', letterSpacing: '0.06em' }}>
          Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}