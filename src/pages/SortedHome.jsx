import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SortedToolCard from '@/components/family51/SortedToolCard';
import SortedUnifiedEngine from '@/components/family51/SortedUnifiedEngine';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { COLOR, FONT, MOTION } from '@/components/family51/sortedDesignSystem';

const { gold: GOLD, ink: INK, paper: PAPER, muted: MUTED, faint: FAINT, border: BORDER } = COLOR;

const TOOL_COLORS = {
  letter: '#d97706',
  reply: '#0891b2',
  scam: '#ef4444',
  contract: '#7c3aed',
  conflict: '#059669',
};

export default function SortedHome() {
  const { isPaid, remaining, isLocked, onPaywall } = useSortedUsage();
  const engineRef = useRef(null);

  const openTool = (toolId) => {
    if (isLocked && onPaywall) { onPaywall(); return; }
    engineRef.current?.open(toolId);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: PAPER,
      color: INK,
      overflowX: 'hidden',
      overscrollBehavior: 'none',
      fontFamily: FONT.family,
      WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      {/* Soft gold ambient glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 400,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(198,153,92,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto', padding: '8px 20px 48px' }}>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={MOTION.fade}
          style={{ paddingTop: 24, textAlign: 'center' }}
        >
          <div style={{ width: 32, height: 2, background: GOLD, margin: '0 auto 16px', borderRadius: 1 }} />
          <h1 style={{
            fontFamily: FONT.family,
            fontSize: FONT.heading,
            fontWeight: 700,
            lineHeight: FONT.lineHeightTight,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Whatever that letter says —<br />let's work out what it means together.
          </h1>
          <p style={{
            fontSize: FONT.subheading,
            color: MUTED,
            margin: '18px auto 0',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 420,
          }}>
            Paste it, snap a photo, or upload a file. We'll decode it into plain language — any language — and tell you exactly what to do next.
          </p>
        </motion.div>

        {/* JOURNEY — calm flow, no tutorial energy */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...MOTION.fade, delay: 0.08 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24, marginBottom: 32, flexWrap: 'wrap' }}
        >
          {['Paste it in', 'We decode it', 'You know what to do'].map((phrase, i, arr) => (
            <React.Fragment key={phrase}>
              <span style={{ fontSize: 13, fontWeight: 500, color: MUTED }}>{phrase}</span>
              {i < arr.length - 1 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: `${GOLD}50`, flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* PRIMARY TOOLS — two big cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...MOTION.fade, delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          <SortedToolCard
            variant="primary"
            icon="letter"
            title="Decode a Letter"
            description="Debt, rent arrears, council letters — urgency check, what to do next"
            accentColor={TOOL_COLORS.letter}
            onClick={() => openTool('letter')}
            disabled={isLocked && !isPaid}
          />
          <SortedToolCard
            variant="primary"
            icon="reply"
            title="Write a Reply"
            description="Ready-to-send response, right tone, zero waffle"
            accentColor={TOOL_COLORS.reply}
            onClick={() => openTool('reply')}
            disabled={isLocked && !isPaid}
          />
        </motion.div>

        {/* SECONDARY TOOLS */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...MOTION.fade, delay: 0.22 }}
          style={{ marginTop: 16 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: FONT.labelSpacing, color: FAINT, margin: '0 0 10px', textTransform: 'uppercase' }}>
            Something else?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <SortedToolCard
              variant="secondary"
              icon="scam"
              title="Scam Checker"
              description="Spot it fast"
              accentColor={TOOL_COLORS.scam}
              onClick={() => openTool('scam')}
              disabled={isLocked && !isPaid}
            />
            <SortedToolCard
              variant="secondary"
              icon="contract"
              title="Contract Checker"
              description="Rights grabs"
              accentColor={TOOL_COLORS.contract}
              onClick={() => openTool('contract')}
              disabled={isLocked && !isPaid}
            />
            <SortedToolCard
              variant="secondary"
              icon="conflict"
              title="Resolve Conflict"
              description="Step-by-step"
              accentColor={TOOL_COLORS.conflict}
              onClick={() => openTool('conflict')}
              disabled={isLocked && !isPaid}
            />
          </div>
        </motion.div>

        {/* TRUST PILLS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...MOTION.fade, delay: 0.28 }}
          style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}
        >
          {['Any country, any jurisdiction', 'All languages supported', 'Uploaded for analysis · your vault is yours'].map(pill => (
            <span key={pill} style={{
              fontSize: 12, fontWeight: 500, color: MUTED,
              background: `${GOLD}08`, border: `1px solid ${GOLD}20`,
              borderRadius: 20, padding: '6px 12px',
            }}>{pill}</span>
          ))}
        </motion.div>

        {/* COUNTER */}
        <div style={{ marginTop: 28 }}>
          <SortedLiveCounter />
        </div>

        {/* VAULT */}
        <div style={{ marginTop: 20 }}>
          <SortedCaseHistory
            onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            isPremium={isPaid}
          />
        </div>

        {/* SUBSCRIPTION */}
        {!isPaid && (
          <div style={{ marginTop: 20 }}>
            <SortedForLifeCard />
          </div>
        )}

        {/* HELPLINES */}
        <div style={{ marginTop: 20 }}>
          <SortedHelplines />
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 44, paddingTop: 24, borderTop: `1px solid ${BORDER}`, textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
            <Link to="/SortedAbout" style={{ textDecoration: 'none', color: MUTED, fontWeight: 500, fontSize: FONT.bodySmall, letterSpacing: '0.01em', transition: 'color 0.15s' }}>About</Link>
            <Link to="/SortedTerms" style={{ textDecoration: 'none', color: MUTED, fontWeight: 500, fontSize: FONT.bodySmall, letterSpacing: '0.01em', transition: 'color 0.15s' }}>Terms</Link>
            <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: MUTED, fontWeight: 500, fontSize: FONT.bodySmall, letterSpacing: '0.01em', transition: 'color 0.15s' }}>Privacy</Link>
            <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: MUTED, fontWeight: 500, fontSize: FONT.bodySmall, letterSpacing: '0.01em', transition: 'color 0.15s' }}>FAQ</Link>
          </div>
          <p style={{ fontSize: 11, color: FAINT, margin: 0, fontWeight: 400, letterSpacing: '0.02em' }}>
            SORTEDSOS.ORG · Universal Frequency 51 CIC · Scotland
          </p>
        </div>
      </div>

      {/* TOOL SHEET — slides up from bottom, native feel */}
      <SortedUnifiedEngine
        ref={engineRef}
        isLocked={isLocked && !isPaid}
        onPaywall={onPaywall}
      />
    </div>
  );
}