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
      background: '#f8f6f3',
      color: '#1a1a1a',
      overflowX: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    }}>
      {/* HERO — clean, bold, system font. No serif. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ padding: '32px 20px 0', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}
      >
        <h1 style={{
          fontSize: 'clamp(26px, 7vw, 36px)', fontWeight: 700, lineHeight: 1.1,
          margin: 0, color: '#1a1a1a', letterSpacing: '-0.02em',
        }}>
          Whatever it is —{' '}
          <span style={{ color: GOLD }}>we've got you.</span>
        </h1>
        <p style={{
          fontSize: 14, color: 'rgba(26,26,26,0.4)', margin: '10px 0 0', fontWeight: 400,
        }}>
          Scary letter, stuck dispute, weird message — paste it, we'll sort it.
        </p>
      </motion.div>

      {/* THE INPUT */}
      <div style={{ padding: '24px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedV2Flow />
      </div>

      {/* LIVE COUNTER */}
      <div style={{ padding: '24px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* CASE VAULT */}
      <div style={{ padding: '24px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />
      </div>

      {/* SUBSCRIPTION */}
      {!isPremium && (
        <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
          <SortedForLifeCard />
        </div>
      )}

      {/* HELPLINES */}
      <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedHelplines />
      </div>

      {/* FOOTER */}
      <div style={{ padding: '32px 20px 40px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(26,26,26,0.35)', fontWeight: 500, fontSize: 12 }}>FAQ</Link>
          <span style={{ color: 'rgba(26,26,26,0.1)', fontSize: 9 }}>·</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(26,26,26,0.35)', fontWeight: 500, fontSize: 12 }}>Terms</Link>
          <span style={{ color: 'rgba(26,26,26,0.1)', fontSize: 9 }}>·</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(26,26,26,0.35)', fontWeight: 500, fontSize: 12 }}>Privacy</Link>
          <span style={{ color: 'rgba(26,26,26,0.1)', fontSize: 9 }}>·</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(26,26,26,0.35)', fontWeight: 500, fontSize: 12 }}>About</Link>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(26,26,26,0.22)', margin: 0 }}>
          Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}