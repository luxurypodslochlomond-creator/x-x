import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATS = [
  { number: '7M+', label: 'UK adults in severe financial stress right now', color: '#f97316' },
  { number: '73%', label: 'of people who get bailiff visits have mental health problems', color: '#ef4444' },
  { number: '£0', label: 'most people can afford for a solicitor to read a letter', color: '#eab308' },
  { number: '1 in 3', label: 'UK adults have ignored an official letter out of fear', color: '#06b6d4' },
];

const GLOBAL_STATS = [
  { flag: '🇬🇧', country: 'UK', stat: '7M+ in financial distress. Legal aid virtually eliminated.' },
  { flag: '🇺🇸', country: 'USA', stat: '80% of low-income people get no legal help they need.' },
  { flag: '🇮🇳', country: 'India', stat: '400M people face legal issues with zero access to counsel.' },
  { flag: '🌍', country: 'Global', stat: '5.1 billion people have inadequate access to justice.' },
];

const LANGUAGES = [
  'English', 'Welsh', 'Polish', 'Urdu', 'Punjabi', 'Bengali',
  'Gujarati', 'Arabic', 'Somali', 'Romanian', 'Hindi', 'Portuguese',
  'French', 'Spanish', 'Mandarin', '+ any language',
];

const CURRENCIES = ['£ GBP', '$ USD', '€ EUR', '₹ INR', '﷼ SAR', '$ AUD', 'R ZAR', '+ all major'];

export default function SortedAbout() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 32 }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.97 }}
        style={{
          width: '100%', padding: '13px 18px', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
          color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
        }}
      >
        <span>WHY SORTED EXISTS</span>
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
            <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* THE PROBLEM */}
              <div>
                <SectionLabel text="THE PROBLEM" color="#ef4444" />
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '10px 0 16px' }}>
                  Millions of people receive official letters every day — from tax authorities, bailiffs, courts, landlords, 
                  employers — and have absolutely no idea what they mean or what to do. Legal advice costs 
                  £200–£500/hour. Citizens Advice has a 3-week wait. So people freeze. They ignore the letter. 
                  The problem gets worse.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {STATS.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      style={{
                        border: `1px solid ${s.color}25`, borderRadius: 12,
                        padding: '14px 16px', background: `${s.color}08`,
                      }}
                    >
                      <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{s.number}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.45 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* GLOBAL REACH */}
              <div>
                <SectionLabel text="THIS ISN'T JUST A UK PROBLEM" color="#06b6d4" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                  {GLOBAL_STATS.map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      <span style={{ fontSize: 20 }}>{g.flag}</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#06b6d4', letterSpacing: '0.08em', marginBottom: 2 }}>{g.country}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{g.stat}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LANGUAGES */}
              <div>
                <SectionLabel text="ANY LANGUAGE. ZERO BARRIERS." color="#22c55e" />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '8px 0 12px', lineHeight: 1.6 }}>
                  Paste your letter in any language. Get your answer in any language. 
                  English your second language? No problem. We've got you.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {LANGUAGES.map((lang, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(34,197,94,0.7)', background: 'rgba(34,197,94,0.06)' }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* CURRENCIES */}
              <div>
                <SectionLabel text="ALL CURRENCIES ACCEPTED" color="#eab308" />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '8px 0 12px', lineHeight: 1.6 }}>
                  Stripe handles payments in 135+ currencies. Wherever you are in the world — subscribe and get help instantly.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {CURRENCIES.map((c, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(234,179,8,0.2)', color: 'rgba(234,179,8,0.7)', background: 'rgba(234,179,8,0.06)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* THE ANSWER */}
              <div style={{ border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, padding: '18px 18px', background: 'rgba(249,115,22,0.05)' }}>
                <SectionLabel text="THE ANSWER" color="#f97316" />
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '10px 0 0' }}>
                  SORTED uses the same AI that law firms quietly use to review documents — available to everyone, 
                  in every language, for less than a coffee a week. No solicitor. No wait. No jargon. 
                  Just clarity, instantly, when you need it most.
                </p>
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