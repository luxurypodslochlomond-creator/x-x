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
        q: 'Why do I get 3 free uses?',
        a: 'Because if you\'re in a crisis, you shouldn\'t have to pay upfront. Try SORTED for free. If it helps, subscribe. If not, no harm done.'
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
    category: 'Privacy & Security',
    items: [
      {
        q: 'Is my data actually private?',
        a: 'Yes. Your letter is encrypted in transit, processed by AI, then permanently deleted. We don\'t store it, log it, or use it to train models. Check our Data Sovereignty Pledge for technical details.'
      },
      {
        q: 'Can the government or police access my letters?',
        a: 'We don\'t have copies to give them. Your letter is never stored. Only you and your AI session have it.'
      },
      {
        q: 'What if I want to delete my account?',
        a: 'Hit "Clear all my data" in the menu. All your case history is deleted from our servers. You stay anonymous.'
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

      <div style={{ marginTop: 40, padding: '20px 18px', background: `${accentColor}08`, border: `1px solid ${accentColor}20`, borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
          Still have questions? Email <strong style={{ color: '#fff' }}>family@uf51.love</strong> — we read every message.
        </p>
      </div>
    </motion.div>
  );
}