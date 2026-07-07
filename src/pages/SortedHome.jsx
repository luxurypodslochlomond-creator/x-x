import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { COLOR, FONT, MOTION, baseStyle } from '@/components/family51/sortedDesignSystem';

export default function SortedHome() {
  const { isPaid: isPremium } = useSortedUsage();

  return (
    <div style={baseStyle}>
      {/* Soft gold ambient glow at top — premium, warm, not clinical */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 400,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(198,153,92,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* HERO — confident, not pleading. Like a premium product. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={MOTION.fade}
          style={{ padding: '52px 24px 0', textAlign: 'center', maxWidth: 560, margin: '0 auto' }}
        >
          {/* Gold hairline — crafted, not decorative */}
          <div style={{
            width: 32, height: 2, background: COLOR.gold,
            margin: '0 auto 20px', borderRadius: 1,
          }} />

          <div style={{
            fontSize: FONT.label, fontWeight: FONT.labelWeight, letterSpacing: FONT.labelSpacing,
            color: COLOR.gold, textTransform: 'uppercase', marginBottom: 18,
          }}>
            SORTED
          </div>

          <h1 style={{
            fontFamily: FONT.display,
            fontSize: FONT.heading, fontWeight: 600, lineHeight: FONT.lineHeightTight,
            margin: 0, letterSpacing: '-0.025em',
            fontOpticalSizing: 'auto',
          }}>
            We read the fine print<br />so you don't have to.
          </h1>

          <p style={{
            fontSize: FONT.subheading, color: COLOR.muted,
            margin: '22px auto 0', fontWeight: 400, lineHeight: 1.5, maxWidth: 420,
          }}>
            Scary letter. Legal jargon. Contract you're about to sign. Paste it — get clarity in seconds.
          </p>
        </motion.div>

        {/* INPUT — the hero surface, generous breathing room */}
        <div style={{ padding: '36px 24px 0', maxWidth: 600, margin: '0 auto' }}>
          <SortedV2Flow />
        </div>

        {/* COUNTER — quiet, real, not theatrical */}
        <div style={{ padding: '40px 24px 0', maxWidth: 600, margin: '0 auto' }}>
          <SortedLiveCounter />
        </div>

        {/* VAULT */}
        <div style={{ padding: '32px 24px 0', maxWidth: 600, margin: '0 auto' }}>
          <SortedCaseHistory
            onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            isPremium={isPremium}
          />
        </div>

        {!isPremium && (
          <div style={{ padding: '24px 24px 0', maxWidth: 600, margin: '0 auto' }}>
            <SortedForLifeCard />
          </div>
        )}

        <div style={{ padding: '24px 24px 0', maxWidth: 600, margin: '0 auto' }}>
          <SortedHelplines />
        </div>

        {/* FOOTER — clean, confident */}
        <div style={{ padding: '48px 24px 48px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: COLOR.muted, fontWeight: 500, fontSize: FONT.bodySmall }}>FAQ</Link>
            <Link to="/SortedTerms" style={{ textDecoration: 'none', color: COLOR.muted, fontWeight: 500, fontSize: FONT.bodySmall }}>Terms</Link>
            <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: COLOR.muted, fontWeight: 500, fontSize: FONT.bodySmall }}>Privacy</Link>
            <Link to="/SortedAbout" style={{ textDecoration: 'none', color: COLOR.muted, fontWeight: 500, fontSize: FONT.bodySmall }}>About</Link>
          </div>
          <p style={{ fontSize: FONT.bodySmall, color: COLOR.faint, margin: 0, fontWeight: 400 }}>
            Universal Frequency 51 CIC · Scotland
          </p>
        </div>
      </div>
    </div>
  );
}