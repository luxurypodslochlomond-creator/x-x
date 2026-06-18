import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATS = [
  { number: '7M+', label: 'UK adults in severe financial distress', color: '#f97316', source: 'Joseph Rowntree Foundation, 2024–25' },
  { number: '73%', label: 'of bailiff referrals have a mental health condition', color: '#ef4444', source: 'Money & Mental Health Policy Institute' },
  { number: '92%', label: 'of serious civil legal problems get no legal help', color: '#eab308', source: 'Legal Services Corporation Justice Gap Report' },
  { number: '5.1B', label: 'people worldwide have unmet justice needs', color: '#06b6d4', source: 'World Justice Project' },
];

const GLOBAL_STATS = [
  {
    country: 'UK',
    stat: '4.5 million children in poverty (2024 record). 7M+ adults in severe distress. Legal aid cut by 40% since 2012.',
    source: 'BBC / JRF / Money & Mental Health Policy Institute'
  },
  {
    country: 'EUROPE',
    stat: '19.5 million children at risk of poverty. 240+ children pushed into poverty every day across Europe.',
    source: 'Eurostat 2024 / Save the Children 2024'
  },
  {
    country: 'USA',
    stat: '92% of serious civil legal problems get no or insufficient help. 288,000 eviction cases in 2024.',
    source: 'LSC Justice Gap Report 2022 / 2024 LAIR Report'
  },
  {
    country: 'GLOBAL',
    stat: '5.1 billion people — two-thirds of humanity — have at least one unmet justice need.',
    source: 'World Justice Project / Task Force on Justice'
  },
];

const LANGUAGES = [
  'English', 'Welsh', 'Polish', 'Urdu', 'Punjabi', 'Bengali',
  'Gujarati', 'Arabic', 'Somali', 'Romanian', 'Hindi', 'Portuguese',
  'French', 'Spanish', 'Mandarin', '+ any language',
];

export default function SortedAbout() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Short intro — always visible, more punch */}
      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.6)', lineHeight: 1.7, margin: '0 0 14px' }}>
        Millions of people get scary official letters every day — from bailiffs, courts, landlords, employers — and have no idea what they mean or what to do. Legal advice costs £200/hour. Citizens Advice has a 3-week wait. So people freeze, ignore the letter, and things spiral. <span style={{ fontWeight: 700, color: '#d97706' }}>SORTED is the thing you can reach for right now when that happens.</span>
      </p>

      {/* The Answer — prominent, always visible */}
      <div style={{
        borderRadius: 14, padding: '16px 18px', marginBottom: 14,
        background: 'linear-gradient(135deg, rgba(245,166,35,0.06) 0%, rgba(245,166,35,0.02) 100%)',
        border: '1.5px solid rgba(245,166,35,0.15)',
      }}>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.7)', lineHeight: 1.65, margin: 0 }}>
          <strong style={{ color: '#1a1208' }}>What SORTED does:</strong> AI reads your letter, explains it in plain language — any language — and tells you exactly what to do. Same AI that law firms use. No solicitor. No wait. No jargon. Just clarity, instantly, when you need it most.
        </p>
      </div>

      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.97 }}
        style={{
          width: '100%', padding: '13px 18px', borderRadius: 14,
          border: '1.5px solid rgba(26,18,8,0.1)',
          background: 'rgba(26,18,8,0.02)',
          color: 'rgba(26,18,8,0.4)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
        }}
      >
        <span>THE BIGGER PICTURE</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* THE PROBLEM */}
              <div>
                <SectionLabel text="THE PROBLEM" color="#ef4444" />
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.55)', margin: '10px 0 14px', lineHeight: 1.65 }}>
                  Millions of people receive official letters every day — from tax authorities, bailiffs, courts, landlords, 
                  employers — and have absolutely no idea what they mean or what to do. Legal advice costs 
                  £200–£500/hour. Citizens Advice has a 3-week wait. So people freeze and the problem gets worse.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {STATS.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      style={{
                        border: `1px solid ${s.color}22`, borderRadius: 12,
                        padding: '14px 16px', background: `${s.color}08`,
                      }}
                    >
                      <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{s.number}</div>
                      <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.55)', lineHeight: 1.45 }}>{s.label}</div>
                      <div style={{ fontSize: 9, color: 'rgba(26,18,8,0.3)', marginTop: 6, lineHeight: 1.3 }}>Source: {s.source}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CHILDREN */}
              <div>
                <SectionLabel text="WHO WE'RE FIGHTING FOR" color="#f97316" />
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', margin: '8px 0 12px', lineHeight: 1.6 }}>
                  Every family that freezes when a letter arrives has children watching. 4.5 million kids in the UK alone.
                </p>
                <div style={{ fontSize: 9, color: 'rgba(26,18,8,0.3)', marginTop: 4 }}>Sources: JRF · HRW · Eurostat · Save the Children · BBC / DWP data — 2025/26</div>
              </div>

              {/* GLOBAL REACH */}
              <div>
                <SectionLabel text="NOT JUST A UK PROBLEM" color="#06b6d4" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                  {GLOBAL_STATS.map((g, i) => (
                    <div key={i} style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(26,18,8,0.08)', background: 'rgba(26,18,8,0.02)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#0891b2', letterSpacing: '0.08em', marginBottom: 4 }}>{g.country}</div>
                      <div style={{ fontSize: 12, color: 'rgba(26,18,8,0.6)', lineHeight: 1.5 }}>{g.stat}</div>
                      <div style={{ fontSize: 9, color: 'rgba(26,18,8,0.3)', marginTop: 6 }}>Source: {g.source}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LANGUAGES */}
              <div>
                <SectionLabel text="ANY LANGUAGE. ZERO BARRIERS." color="#22c55e" />
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', margin: '8px 0 12px', lineHeight: 1.6 }}>
                  Paste your letter in any language. Get your answer in any language. 
                  English your second language? No problem.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {LANGUAGES.map((lang, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(34,197,94,0.7)', background: 'rgba(34,197,94,0.06)' }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionLabel({ text, color }) {
  return (
    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 20, height: 1, background: color, opacity: 0.4 }} />
      {text}
      <div style={{ flex: 1, height: 1, background: color, opacity: 0.1 }} />
    </div>
  );
}