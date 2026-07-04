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
const INK = '#1c1c1e';
const MUTED = 'rgba(28,28,30,0.6)';

export default function SortedHome() {
  const { isPaid: isPremium } = useSortedUsage();

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#fcfaf6',
      color: INK,
      overflowX: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* HERO — warm, human, direct */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ padding: '28px 24px 0', textAlign: 'center', maxWidth: 560, margin: '0 auto' }}
      >
        <h1 style={{
          fontSize: 'clamp(26px, 6vw, 32px)', fontWeight: 700, lineHeight: 1.2,
          margin: 0, letterSpacing: '-0.02em',
        }}>
          Got a letter you don't understand?
        </h1>
        <p style={{
          fontSize: 17, color: MUTED, margin: '12px 0 0', fontWeight: 400, lineHeight: 1.5,
        }}>
          Paste it, snap a photo, or upload a file. We'll explain it in plain language — any language — and tell you what to do next.
        </p>
      </motion.div>

      {/* PROCESS STEPS — bigger, clearer journey guide */}
      <div style={{ padding: '24px 24px 0', maxWidth: 560, margin: '0 auto' }}>
        <ProcessSteps />
      </div>

      {/* INPUT — the hero surface */}
      <div style={{ padding: '20px 24px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedV2Flow />
      </div>

      {/* COUNTER — quiet trust signal */}
      <div style={{ padding: '32px 24px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedLiveCounter />
      </div>

      {/* VAULT */}
      <div style={{ padding: '24px 24px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedCaseHistory
          onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          isPremium={isPremium}
        />
      </div>

      {!isPremium && (
        <div style={{ padding: '24px 24px 0', maxWidth: 560, margin: '0 auto' }}>
          <SortedForLifeCard />
        </div>
      )}

      <div style={{ padding: '24px 24px 0', maxWidth: 560, margin: '0 auto' }}>
        <SortedHelplines />
      </div>

      {/* FOOTER */}
      <div style={{ padding: '36px 24px 48px', textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <Link to="/SortedFAQ" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.5)', fontWeight: 500, fontSize: 14 }}>FAQ</Link>
          <span style={{ color: 'rgba(28,28,30,0.15)' }}>·</span>
          <Link to="/SortedTerms" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.5)', fontWeight: 500, fontSize: 14 }}>Terms</Link>
          <span style={{ color: 'rgba(28,28,30,0.15)' }}>·</span>
          <Link to="/SortedPrivacy" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.5)', fontWeight: 500, fontSize: 14 }}>Privacy</Link>
          <span style={{ color: 'rgba(28,28,30,0.15)' }}>·</span>
          <Link to="/SortedAbout" style={{ textDecoration: 'none', color: 'rgba(28,28,30,0.5)', fontWeight: 500, fontSize: 14 }}>About</Link>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(28,28,30,0.3)', margin: 0 }}>
          Universal Frequency 51 CIC · Scotland
        </p>
      </div>
    </div>
  );
}

// ── Process Steps — bigger, clearer, easier to read ──
function ProcessSteps() {
  const steps = [
    { num: 1, label: 'Paste your letter' },
    { num: 2, label: 'Get plain language' },
    { num: 3, label: 'Know your next step' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0,
    }}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            flexShrink: 0, width: 100,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: `2px solid ${GOLD}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: GOLD,
              background: `${GOLD}0A`,
            }}>{step.num}</div>
            <span style={{
              fontSize: 13, fontWeight: 500, color: MUTED,
              textAlign: 'center', lineHeight: 1.3,
            }}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 2,
              background: `${GOLD}40`,
              marginTop: 19,
              minWidth: 20,
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}