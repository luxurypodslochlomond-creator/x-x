import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: 'Why SORTED Is Different',
    items: [
      {
        q: 'How is SORTED different from ChatGPT or Google?',
        a: 'ChatGPT gives explanations. SORTED gives you action. We decode legal jargon, identify what\'s being asked of you, cite actual legal bodies (HMRC, courts, councils), and tell you step-by-step what to do — and by when. Plus: your vault stays yours — files uploaded for analysis, results saved privately to you, anonymized patterns used to improve advice.'
      },
      {
        q: 'Why don\'t I just hire a solicitor?',
        a: 'Solicitors cost £150–400/hour. SORTED costs £9.99/month. The World Justice Project estimates 5.1 billion people worldwide have unmet justice needs. In the UK alone, civil legal aid cases collapsed 90% since 2012 — from nearly 1 million a year to just 110,000 by 2024/25. That\'s a global crisis, not just a British one. We bridge that gap, instantly.'
      },
      {
        q: 'Is this actually legal advice?',
        a: 'No. We\'re not lawyers. But we decode what lawyers would charge £500 to explain, and we help you understand your options. For serious cases (court proceedings, etc.), we recommend you then take our decoded letter to a real solicitor — you\'ll understand the issue way better, and their time will be cheaper.'
      },
      {
        q: 'What actually happens to my letter?',
        a: 'Honest answer: your letter is processed by AI to decode it. The result is saved to your device\'s local case vault (so you can reference it later). If you\'re a subscriber, it\'s also saved encrypted to your private account — accessible only to you. We don\'t sell it, share it, or use it for training in an identifiable way. Anonymized patterns (no names, emails, amounts, dates) are kept to improve advice for future users. You can clear your vault anytime.'
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
        a: 'Any language. Upload a letter in Spanish, French, Arabic, Mandarin, Tagalog, Polish — SORTED decodes it and replies in plain language. If the law applies in a different country to where you are, just mention it in your message and we\'ll handle it accordingly.'
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
        q: 'Why do I get 10 free uses a day?',
        a: 'Because if you\'re in a difficult moment, you shouldn\'t have to pay upfront — and a one-time trial isn\'t enough for a crisis that unfolds over days. You get 10 free decodes every day, resetting overnight. That covers most real situations without a card. If it helps, subscribe for unlimited. If not, no harm done.'
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. No contract, no lock-in. Cancel anytime and you keep access until the end of your billing period. Email us at family@uf51.love if you have any payment questions — we\'ll always do right by you.'
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
        a: 'Yes — but let\'s be precise. Your letter is encrypted in transit and processed by AI. The decoded result is saved to your device (local vault) and, if you\'re a subscriber, to your private account (encrypted, only you can access it). We never sell or share your data. Anonymized patterns (stripped of names, emails, amounts, dates) are retained to improve advice — but you\'re never identified. You can clear your vault anytime. Full details on our Privacy page.'
      },
      {
        q: 'What do you mean by "anonymized patterns"?',
        a: 'After we decode your letter, we strip out your identity — names, emails, addresses, NI and account numbers, phone numbers. But we keep the substance: the amount owed, the deadline, the legal issue, what advice worked. Hiding WHO you are protects you; hiding WHAT happened would protect the other side. So we only ever hide the who. What\'s left is legal reasoning — like published case law — that helps us get smarter without ever pointing back to a person.'
      },
      {
        q: 'Can I opt out of pattern learning?',
        a: 'Currently no — but the anonymization is strict, and you\'re never identified. If you\'re uncomfortable even with anonymized learning, hit "Clear all my data" and we delete everything. We\'re open to adding a toggle in future.'
      },
      {
        q: 'Can the government or police access my letters?',
        a: 'We don\'t keep copies of your original letters. Your letter is uploaded for analysis and the result lives in your private vault — on your device, and encrypted on our servers only if you subscribe. You can delete everything anytime.'
      },
      {
        q: 'What if I want to delete my data?',
        a: 'In your case vault, tap "Delete my server data" — all cases stored on our servers are wiped instantly. Your local device vault is unaffected (use "Wipe entire vault" for that). You stay completely anonymous — we never sell or share your data.'
      }
    ]
  }
];

export default function SortedFAQ({ accentColor = '#f97316' }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 60px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.4)', marginBottom: 14 }}>GOT QUESTIONS?</div>
        <h2 style={{ fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
          <span style={{ color: '#1a1208' }}>Honest answers</span>{' '}
          <span style={{ color: accentColor }}>from people who built this</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FAQ_ITEMS.map((category, catIdx) => (
          <div key={catIdx} style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${openCategory === catIdx ? accentColor + '50' : 'rgba(26,18,8,0.12)'}`, background: openCategory === catIdx ? `${accentColor}08` : 'rgba(26,18,8,0.02)' }}>
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
              <div style={{ transform: `rotate(${openCategory === catIdx ? 180 : 0}deg)`, transition: 'transform 0.2s' }}>
                <ChevronDown size={18} color={accentColor} />
              </div>
            </button>

            {/* ITEMS */}
            {openCategory === catIdx && (
              <div style={{ borderTop: `1px solid ${accentColor}20`, background: `${accentColor}04` }}>
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
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1208', textAlign: 'left', lineHeight: 1.4 }}>
                          {item.q}
                        </span>
                        <div style={{ transform: `rotate(${openItem === `${catIdx}-${itemIdx}` ? 180 : 0}deg)`, transition: 'transform 0.2s', flexShrink: 0, marginTop: 2 }}>
                          <ChevronDown size={14} color={accentColor} />
                        </div>
                      </button>

                      {openItem === `${catIdx}-${itemIdx}` && (
                        <div style={{ borderTop: `1px solid ${accentColor}10`, background: `${accentColor}06`, padding: '12px 18px' }}>
                          <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0, lineHeight: 1.6 }}>
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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

          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1a1208', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Can't afford it right now?<br />
            <span style={{ color: '#d97706' }}>We've still got you.</span>
          </h3>

          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', margin: '0 0 20px', lineHeight: 1.65 }}>
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
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(26,18,8,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(26,18,8,0.04)', border: '1px solid rgba(26,18,8,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L8.5 5H12L9 7.5L10 11L7 9L4 11L5 7.5L2 5H5.5L7 1.5Z" stroke="rgba(26,18,8,0.3)" strokeWidth="1.1" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.4)', margin: 0, lineHeight: 1.5 }}>
              Hardship access is currently funded by UF51. We're actively seeking bank &amp; financial services partners to sponsor free access at scale — making legal help truly universal.
            </p>
          </div>

        </div>
      </div>

      <div style={{ marginTop: 12, padding: '14px 18px', background: `${accentColor}05`, border: `1px solid ${accentColor}12`, borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)', margin: 0, lineHeight: 1.6 }}>
          Got a question not answered here? Email <strong style={{ color: '#d97706' }}>family@uf51.love</strong> — we'll answer and add it to the FAQ.
        </p>
      </div>
    </div>
  );
}