import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATS = [
  { number: '7M+', label: 'UK adults in severe financial distress right now', color: '#f97316', source: 'Joseph Rowntree Foundation, 2024–25' },
  { number: '73%', label: 'of people referred to bailiffs have a diagnosed mental health condition', color: '#ef4444', source: 'Money & Mental Health Policy Institute' },
  { number: '92%', label: 'of serious civil legal problems in the USA receive no legal help at all', color: '#eab308', source: 'Legal Services Corporation Justice Gap Report' },
  { number: '5.1B', label: 'people worldwide have unmet justice needs — two thirds of all humanity', color: '#06b6d4', source: 'World Justice Project (situation has worsened since measurement)' },
];

const GLOBAL_STATS = [
  { country: 'UK', stat: '4.5 million children living in poverty (2024 record high). 7M+ adults in severe financial distress. Legal aid cut by 40% since 2012. 73% of bailiff referrals involve people with mental health conditions.', source: 'BBC / JRF / Money & Mental Health Policy Institute' },
  { country: 'EUROPE', stat: '19.5 million children in the EU at risk of poverty or social exclusion. 240+ children fall into poverty every day across Europe. Legal aid thresholds exclude most working families.', source: 'Eurostat 2024 / Save the Children 2024' },
  { country: 'USA', stat: '92% of serious civil legal problems faced by low-income Americans receive no or insufficient legal help. Eviction is the #1 case type — 288,000 cases in 2024 alone.', source: 'Legal Services Corporation (LSC) Justice Gap Report 2022 / 2024 LAIR Report' },
  { country: 'GLOBAL', stat: '5.1 billion people — two-thirds of the world\'s population — have at least one unmet justice need. This includes housing, debt, family, employment, and government disputes.', source: 'World Justice Project / Task Force on Justice — situation has significantly worsened since 2019' },
];

const CHILDREN_STATS = [
  { number: '4.5M', label: 'children in poverty in the UK — a 2024 record high', color: '#f97316' },
  { number: '500K', label: 'children in families in debt to the DWP right now', color: '#ef4444' },
  { number: '19.5M', label: 'children across the EU at risk of poverty or social exclusion', color: '#eab308' },
  { number: '240+', label: 'children pushed into poverty every single day in Europe', color: '#22c55e' },
];

const LANGUAGES = ['English', 'Welsh', 'Polish', 'Urdu', 'Punjabi', 'Bengali', 'Gujarati', 'Arabic', 'Somali', 'Romanian', 'Hindi', 'Portuguese', 'French', 'Spanish', 'Mandarin', '+ any language'];
const CURRENCIES = ['£ GBP', '$ USD', '€ EUR', '₹ INR', '﷼ SAR', '$ AUD', 'R ZAR', '+ all major'];

export default function SortedAbout() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 0 }}>
      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.6)', lineHeight: 1.65, margin: '0 0 12px' }}>
        Millions of people get scary official letters every day and have no idea what to do. Legal advice costs £200/hour. Citizens Advice has a 3-week wait. So people freeze — and things get worse. <span style={{ fontWeight: 700, color: '#d97706' }}>SORTED is the thing you can reach for right now when that happens.</span>
      </p>

      <div style={{ borderRadius: 14, padding: '16px 18px', marginBottom: 14, background: 'linear-gradient(135deg, rgba(245,166,35,0.06) 0%, rgba(245,166,35,0.02) 100%)', border: '1.5px solid rgba(245,166,35,0.15)' }}>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.7)', lineHeight: 1.65, margin: 0 }}>
          <strong style={{ color: '#1a1208' }}>What SORTED does:</strong> AI reads your letter, explains it in plain language — any language — and tells you exactly what to do. Same AI that law firms use. No solicitor. No wait. No jargon. Just clarity, instantly, when you need it most.
        </p>
      </div>

      <motion.button onClick={() => setOpen(!open)} whileTap={{ scale: 0.97 }} style={{ width: '100%', padding: '13px 18px', borderRadius: 14, border: '1.5px solid rgba(26,18,8,0.1)', background: 'rgba(26,18,8,0.02)', color: 'rgba(26,18,8,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em' }}>
        <span>WHY WE BUILT THIS</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <SectionLabel text="THE PROBLEM" color="#ef4444" />
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.55)', margin: '10px 0 14px', lineHeight: 1.65 }}>Millions of people receive official letters every day and have no idea what they mean or what to do.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {STATS.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} style={{ border: `1px solid ${s.color}25`, borderRadius: 12, padding: '14px 16px', background: `${s.color}08` }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{s.number}</div>
                      <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.55)', lineHeight: 1.45 }}>{s.label}</div>
                      <div style={{ fontSize: 9, color: 'rgba(26,18,8,0.3)', marginTop: 6, lineHeight: 1.3 }}>Source: {s.source}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel text="THE CHILDREN — THIS IS WHO WE'RE FIGHTING FOR" color="#f97316" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {CHILDREN_STATS.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} style={{ border: `1px solid ${s.color}25`, borderRadius: 10, padding: '12px 14px', background: `${s.color}08` }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.number}</div>
                      <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.55)', lineHeight: 1.4 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(26,18,8,0.3)', marginTop: 8 }}>Sources: JRF · HRW · Eurostat · Save the Children · BBC / DWP data — figures current as of 2025/26</div>
              </div>

              <div>
                <SectionLabel text="THIS ISN'T JUST A UK PROBLEM" color="#06b6d4" />
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

              <div>
                <SectionLabel text="ANY LANGUAGE. ZERO BARRIERS." color="#22c55e" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {LANGUAGES.map((lang, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.2)', color: 'rgba(34,197,94,0.7)', background: 'rgba(34,197,94,0.06)' }}>{lang}</span>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel text="ALL CURRENCIES ACCEPTED" color="#eab308" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {CURRENCIES.map((c, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(234,179,8,0.2)', color: 'rgba(234,179,8,0.7)', background: 'rgba(234,179,8,0.06)' }}>{c}</span>
                  ))}
                </div>
              </div>

              <div style={{ border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, padding: '18px 18px', background: 'rgba(249,115,22,0.05)' }}>
                <SectionLabel text="THE ANSWER" color="#f97316" />
                <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.7)', lineHeight: 1.7, margin: '10px 0 0' }}>SORTED uses the same AI that law firms quietly use to review documents — available to everyone, in every language, for less than a coffee a week. No solicitor. No wait. No jargon. Just clarity, instantly, when you need it most.</p>
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
      <div style={{ width: 20, height: 1, background: color, opacity: 0.4 }} />{text}<div style={{ flex: 1, height: 1, background: color, opacity: 0.1 }} />
    </div>
  );
}