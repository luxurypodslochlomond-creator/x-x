import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import SortedV2Flow from '@/components/family51/SortedV2Flow';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';
import SortedCaseHistory from '@/components/family51/SortedCaseHistory';
import SortedForLifeCard from '@/components/family51/SortedForLifeCard';
import SortedHelplines from '@/components/family51/SortedHelplines';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

const GOLD = '#c6995c';
const INK = '#1c1c1e';
const MUTED = 'rgba(28,28,30,0.45)';
const NEUTRAL_BORDER = '#e0dace';

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
        style={{ padding: '20px 20px 0', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}
      >
        <h1 style={{
          fontSize: 'clamp(22px, 6vw, 28px)', fontWeight: 700, lineHeight: 1.25,
          margin: 0, letterSpacing: '-0.02em',
        }}>
          Whatever that letter says — let's work out what it means together.
        </h1>
        <p style={{
          fontSize: 14, color: 'rgba(28,28,30,0.5)', margin: '8px 0 0', fontWeight: 400, lineHeight: 1.5,
        }}>
          Paste it, snap a photo, or upload a file. We'll decode it into plain language — any language — and tell you exactly what to do next.
        </p>
      </motion.div>

      {/* PROCESS STEPS — static visual guide */}
      <div style={{ padding: '20px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <ProcessSteps />
      </div>

      {/* INPUT */}
      <div style={{ padding: '16px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <SortedV2Flow />
      </div>

      {/* SOMETHING ELSE? */}
      <div style={{ padding: '28px 20px 0', maxWidth: 520, margin: '0 auto' }}>
        <p style={{
          textAlign: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          color: 'rgba(198,153,92,0.6)', margin: '0 0 14px',
        }}>
          SOMETHING ELSE?
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <SomethingElseCard
            color="#e67f7f"
            label="Scam check"
            sub="Is it real?"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L22 20 L2 20 Z" stroke="#e67f7f" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <path d="M12 9 L12 14" stroke="#e67f7f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.8" fill="#e67f7f" />
              </svg>
            }
          />
          <SomethingElseCard
            color="#7f7fe6"
            label="Contract"
            sub="Fine print?"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 2 L18 2 L18 22 L6 22 Z" stroke="#7f7fe6" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <path d="M9 7 L15 7 M9 11 L15 11 M9 15 L13 15" stroke="#7f7fe6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
          />
          <SomethingElseCard
            color="#7fe6bd"
            label="Conflict"
            sub="Way through?"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L20 6 L20 12 C20 17 16 21 12 22 C8 21 4 17 4 12 L4 6 Z" stroke="#7fe6bd" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              </svg>
            }
          />
        </div>
        <p style={{
          fontSize: 11, color: MUTED, textAlign: 'center', margin: '10px 0 0', lineHeight: 1.4,
        }}>
          Just paste it above — SORTED figures out what it is.
        </p>
      </div>

      {/* COUNTER */}
      <div style={{ padding: '24px 20px 0', maxWidth: 520, margin: '0 auto' }}>
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

// ── Process Steps — static visual guide matching the mockup ──
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
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            flexShrink: 0, width: 90,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: `1.5px solid ${GOLD}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: GOLD,
              background: `${GOLD}08`,
            }}>{step.num}</div>
            <span style={{
              fontSize: 10, fontWeight: 500, color: 'rgba(28,28,30,0.45)',
              textAlign: 'center', lineHeight: 1.3,
            }}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 1.5,
              background: `${GOLD}30`,
              marginTop: 13,
              minWidth: 16,
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Something Else Card — visual indicator for what SORTED handles ──
function SomethingElseCard({ color, label, sub, icon }) {
  return (
    <div style={{
      flex: 1, borderRadius: 16, padding: '16px 8px',
      border: `1.5px solid ${color}40`,
      background: `${color}08`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      textAlign: 'center',
    }}>
      {icon}
      <span style={{ fontSize: 12, fontWeight: 600, color: INK }}>{label}</span>
      <span style={{ fontSize: 10, color: 'rgba(28,28,30,0.4)' }}>{sub}</span>
    </div>
  );
}