import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: 'Why SORTED Is Different',
    items: [
      {
        q: 'How is SORTED different from ChatGPT or Google?',
        a: 'ChatGPT gives explanations. SORTED gives you action. We decode legal jargon, identify what\'s being asked of you, cite actual legal bodies (HMRC, courts, councils), and tell you step-by-step what to do — and by when. Plus: nothing is stored or trained on your data. Ever.'
      },
      {
        q: 'Why don\'t I just hire a solicitor?',
        a: 'Solicitors cost £150-400/hour. SORTED costs £9.99/month. There\'s a £100 billion annual gap in UK legal aid — two-thirds of people with serious legal problems get zero help. We bridge that gap instantly.'
      },
      {
        q: 'Is this actually legal advice?',
        a: 'No. We\'re not lawyers. But we decode what lawyers would charge £500 to explain, and we help you understand your options. For serious cases (court proceedings, etc.), we recommend you then take our decoded letter to a real solicitor — you\'ll understand the issue way better, and their time will be cheaper.'
      },
      {
        q: 'Why do you say "nothing is stored"?',
        a: 'Your letter is processed by AI, then immediately deleted. We don\'t log it, train on it, or sell it. You can email the result to yourself if you want to keep it — we never keep a copy. This is data sovereignty: your data is yours alone.'
      }
    ]
  },
  {
    category: 'How It Works',
    items: [
      {
        q: 'Can I upload a photo or do I have to paste text?',
        a: 'Both. Take a photo of the letter with your phone, upload it, and our AI reads it. Or paste the text directly. Works with PDFs too.'
      },
      {
        q: 'What languages do you support?',
        a: 'Any language. Upload a letter in Spanish, French, Arabic, Mandarin — SORTED decodes it and replies in English (or you can ask for your native language). Jurisdiction-aware too — we know the laws of the UK, US, Canada, Australia, and more.'
      },
      {
        q: 'How long does it take?',
        a: 'Seconds. Upload or paste, hit decode, and you get a breakdown in plain English — what the letter means, what\'s at stake, and what to do next.'
      },
      {
        q: 'Can I email SORTED\'s reply directly to the person?',
        a: 'Not directly — we don\'t send emails on your behalf (that\'s risky for your privacy). You email it to yourself, read it, then forward it to whoever needs it. You control who sees what.'
      }
    ]
  },
  {
    category: 'Real Use Cases',
    items: [
      {
        q: 'Eviction notice from my landlord',
        a: 'SORTED breaks down what they\'re claiming, your legal rights in your jurisdiction, how much notice they\'re required to give, and what you can do (challenge it, negotiate, document everything). Then we help you draft a reply.'
      },
      {
        q: 'Redundancy letter from work',
        a: 'We decode severance terms, spot dodgy clauses, identify your statutory rights (consultation, notice periods, redundancy pay), and help you write a response protecting your position.'
      },
      {
        q: 'Debt collector demand letter',
        a: 'We identify if the demand is valid (they must prove the debt, statute of limitations applies), what your rights are, and help you respond without admitting liability.'
      },
      {
        q: 'Council fine or planning enforcement',
        a: 'We decode the allegation, show you the appeal timeline, identify if it\'s legally sound, and help you draft an appeal or challenge.'
      },
      {
        q: 'Neighbour dispute letter (boundary, noise, etc.)',
        a: 'SORTED maps the legal issue, shows you your neighbour law rights, and helps you escalate appropriately (mediation, solicitor letter, small claims court).'
      },
      {
        q: 'Court summons or legal claim',
        a: 'We break down the claim, your deadline to respond, what you need to do, and help you prepare a response or gather evidence.'
      }
    ]
  },
  {
    category: 'Pricing & Access',
    items: [
      {
        q: 'Why do I get 10 free uses?',
        a: 'Because if you\'re in a crisis, you shouldn\'t have to pay upfront. Try SORTED for free. Decode 10 scary letters, prove it works for you, then decide. If it helps, subscribe. If not, no harm done.'
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. No contract, no lock-in. Cancel from your account instantly. We\'ll refund overpayment if you cancel mid-month.'
      },
      {
        q: 'What if I can\'t afford £9.99/month?',
        a: 'Email us at family@uf51.love. We have hardship options. Legal help shouldn\'t be gatekept by price.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes. If SORTED doesn\'t help, we refund. We\'re confident it will, but if it doesn\'t for you, no stress.'
      }
    ]
  },
  {
    category: 'AI, Accuracy & Hallucinations',
    items: [
      {
        q: 'Can AI make things up? What about hallucinations?',
        a: 'Yes — AI can hallucinate. It can invent phone numbers, misquote legislation, or be confidently wrong. SORTED takes this seriously. We\'ve built in explicit anti-hallucination rules: if the AI isn\'t certain of a phone number or law, it flags it with "(verify this)" and tells you to search rather than give a wrong number. We\'d rather say "check this" than mislead you on something legal.'
      },
      {
        q: 'How accurate is SORTED\'s legal information?',
        a: 'Very good for understanding what a letter means and what your options are. Less reliable for exact statute numbers or specific case law. Think of SORTED like a brilliant, well-read friend who knows the system — not a qualified solicitor. For anything court-critical, use our output to brief a real lawyer. You\'ll save hours of billable time.'
      },
      {
        q: 'What if SORTED gives me wrong advice?',
        a: 'We\'re clear: we\'re not lawyers and this isn\'t legal advice. SORTED helps you understand and act — but on anything high-stakes (eviction proceedings, court defence, fraud allegations), cross-check with Citizens Advice, a solicitor, or a legal aid charity. We\'ll tell you who to call in the result itself.'
      },
      {
        q: 'Why should I trust SORTED over a Google search?',
        a: 'Google gives you general information. SORTED reads YOUR actual letter, identifies YOUR specific situation, jurisdiction, and deadlines, then gives you a personalised action plan. It\'s the difference between a textbook and a conversation with someone who\'s read your exact problem.'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    items: [
      {
        q: 'Is my data actually private?',
        a: 'Yes. Your letter is encrypted in transit, processed by AI, then permanently deleted. We don\'t store it, log it, or use it to train models. We do create anonymized case patterns (no names, emails, amounts) to improve advice for future users — but you\'re never identified. Check our Data Sovereignty Pledge for full details.'
      },
      {
        q: 'What do you mean by "anonymized patterns"?',
        a: 'After we decode your letter, we extract the pattern (letter type, severity, what advice worked) and strip out all personally identifiable info (your name, email, amounts, dates, addresses). What\'s left is the legal reasoning — like published case law. This helps us get smarter without compromising your privacy.'
      },
      {
        q: 'Can I opt out of pattern learning?',
        a: 'Currently no — but the anonymization is strict, and you\'re never identified. If you\'re uncomfortable even with anonymized learning, hit "Clear all my data" and we delete everything. We\'re open to adding a toggle in future.'
      },
      {
        q: 'Can the government or police access my letters?',
        a: 'We don\'t have copies to give them. Your letter is never stored. Only you and your AI session have it.'
      },
      {
        q: 'What if I want to delete my data?',
        a: 'Hit "Clear all my data" in the menu. Your case history is wiped from this device instantly. You stay completely anonymous — we have nothing stored on our servers to delete.'
      }
    ]
  }
];

export default function SortedFAQ({ accentColor = '#f97316' }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 60px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>GOT QUESTIONS?</div>
        <h2 style={{ fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
          <span style={{ color: '#fff' }}>Honest answers</span>{' '}
          <span style={{ color: accentColor }}>from people who built this</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FAQ_ITEMS.map((category, catIdx) => (
          <div key={catIdx} style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${openCategory === catIdx ? accentColor + '40' : 'rgba(255,255,255,0.08)'}`, background: openCategory === catIdx ? `${accentColor}08` : 'rgba(255,255,255,0.02)' }}>
            {/* CATEGORY HEADER */}
            <button
              onClick={() => setOpenCategory(openCategory === catIdx ? null : catIdx)}
              style={{
                width: '100%', padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 800, color: accentColor, letterSpacing: '0.05em' }}>
                {category.category}
              </span>
              <motion.div
                animate={{ rotate: openCategory === catIdx ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} color={accentColor} />
              </motion.div>
            </button>

            {/* ITEMS */}
            <AnimatePresence>
              {openCategory === catIdx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ borderTop: `1px solid ${accentColor}20`, background: `${accentColor}04` }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} style={{ borderBottom: itemIdx < category.items.length - 1 ? `1px solid ${accentColor}15` : 'none' }}>
                        <button
                          onClick={() => setOpenItem(openItem === `${catIdx}-${itemIdx}` ? null : `${catIdx}-${itemIdx}`)}
                          style={{
                            width: '100%', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, transition: 'all 0.2s'
                          }}
                        >
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', textAlign: 'left', lineHeight: 1.4 }}>
                            {item.q}
                          </span>
                          <motion.div
                            animate={{ rotate: openItem === `${catIdx}-${itemIdx}` ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ flexShrink: 0, marginTop: 2 }}
                          >
                            <ChevronDown size={14} color={accentColor} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {openItem === `${catIdx}-${itemIdx}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.15 }}
                              style={{ borderTop: `1px solid ${accentColor}10`, background: `${accentColor}06`, padding: '12px 18px' }}
                            >
                              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* HARDSHIP CARD */}
      <div style={{ marginTop: 24, borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.09) 0%, rgba(180,160,60,0.05) 100%)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 18, padding: '28px 24px' }}>
          
          {/* Top badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308', flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', color: '#eab308' }}>HARDSHIP ACCESS</span>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Can't afford it right now?<br />
            <span style={{ color: '#eab308' }}>We've still got you.</span>
          </h3>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '0 0 20px', lineHeight: 1.65 }}>
            No forms. No means testing. No judgment. Just email us — tell us what's going on — and we'll sort out free access. Simple as that.
          </p>

          <a
            href="mailto:family@uf51.love?subject=Hardship access — I need help but can't afford SORTED right now"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '14px 20px', borderRadius: 12,
              background: 'rgba(234,179,8,0.08)',
              border: '1px solid rgba(234,179,8,0.35)',
              color: '#eab308', fontWeight: 800, fontSize: 14, textDecoration: 'none',
              letterSpacing: '0.02em', transition: 'all 0.15s'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="3" width="13" height="10" rx="1.2" stroke="#eab308" strokeWidth="1.3" fill="none" />
              <path d="M2 4L8 8.5L14 4" stroke="#eab308" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            family@uf51.love
          </a>

          {/* Sponsor seed */}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L8.5 5H12L9 7.5L10 11L7 9L4 11L5 7.5L2 5H5.5L7 1.5Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', margin: 0, lineHeight: 1.5 }}>
              Hardship access is currently funded by UF51. We're actively seeking bank &amp; financial services partners to sponsor free access at scale — making legal help truly universal.
            </p>
          </div>

        </div>
      </div>

      <div style={{ marginTop: 12, padding: '14px 18px', background: `${accentColor}05`, border: `1px solid ${accentColor}12`, borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
          Got a question not answered here? Email <strong style={{ color: 'rgba(255,255,255,0.6)' }}>family@uf51.love</strong> — we'll answer and add it to the FAQ.
        </p>
      </div>
    </motion.div>
  );
}