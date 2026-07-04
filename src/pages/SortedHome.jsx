import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

const GOLD = '#c6995c';

export default function SortedHome() {
  const { isPaid: isPremium } = useSortedUsage();

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#f9f8f6',
      color: '#1c1c1e',
      overflowX: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* HERO — calm, direct, human */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ padding: '24px 20px 0', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}
      >
        <h1 style={{
          fontSize: 'clamp(24px, 6.5vw, 32px)', fontWeight: 700, lineHeight: 1.2,
          margin: 0, letterSpacing: '-0.02em',
        }}>
          Got a scary letter?
        </h1>
        <p style={{
          fontSize: 15, color: 'rgba(28,28,30,0.5)', margin: '6px 0 0', fontWeight: 400, lineHeight: 1.4,
        }}>
          Paste it. We'll tell you what it means — in plain English.
        </p>
      </motion.div>

      {/* INPUT */}
      <div style={{ padding: '18px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedV2Flow />
      </div>

      {/* COUNTER */}
      <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* VAULT */}
      <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />
      </div>

      {!isPremium && (
        <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
          <SortedForLifeCard />
        </div>
      )}

      <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedHelplines />
      </div>

      {/* FOOTER */}
      <div style={{ padding: '28px 20px 36px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.35)', fontWeight: 500, fontSize: 12 }}>FAQ</Link>
          <span style={{ color: 'rgba(28,28,30,0.1)' }}>·</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.35)', fontWeight: 500, fontSize: 12 }}>Terms</Link>
          <span style={{ color: 'rgba(28,28,30,0.1)' }}>·</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.35)', fontWeight: 500, fontSize: 12 }}>Privacy</Link>
          <span style={{ color: 'rgba(28,28,30,0.1)' }}>·</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.35)', fontWeight: 500, fontSize: 12 }}>About</Link>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(28,28,30,0.22)', margin: 0 }}>
          Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}