import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Trash2, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

const Section = ({ icon, title, children }) => (
  <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(245,166,35,0.15)', paddingBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{ color: '#f5a623' }}>{icon}</div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#1a1208', letterSpacing: '-0.01em' }}>{title}</h2>
    </div>
    <div style={{ color: 'rgba(26,18,8,0.65)', fontSize: 15, lineHeight: 1.75 }}>{children}</div>
  </div>
);

const Honest = ({ label, children }) => (
  <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: 10, padding: '14px 18px', marginBottom: 12 }}>
    <span style={{ fontWeight: 800, color: '#f5a623', fontSize: 13 }}>{label} </span>
    <span style={{ color: 'rgba(26,18,8,0.75)', fontSize: 14, lineHeight: 1.65 }}>{children}</span>
  </div>
);

const Check = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
    <CheckCircle style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }} size={16} />
    <span style={{ color: 'rgba(26,18,8,0.75)', fontSize: 15, lineHeight: 1.6 }}>{children}</span>
  </div>
);

const Warn = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
    <AlertTriangle style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} size={16} />
    <span style={{ color: 'rgba(26,18,8,0.65)', fontSize: 15, lineHeight: 1.6 }}>{children}</span>
  </div>
);

export default function SortedPrivacy() {
  useEffect(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.style.viewTransitionName = 'page-transition';
      });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '40px 20px 80px', fontFamily: 'system-ui, sans-serif', color: '#1a1208' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Shield size={32} style={{ color: '#f5a623' }} />
          <h1 style={{ margin: 0, fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: 900, letterSpacing: '-0.02em', color: '#1a1208' }}>
            SORTED — Data Sovereignty Pledge
          </h1>
        </div>
        <p style={{ color: 'rgba(26,18,8,0.65)', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
          Your data is yours. Full stop. Here's exactly what happens — honest, plain English, no corporate waffle.
        </p>
        <p style={{ color: 'rgba(26,18,8,0.4)', fontSize: 13, marginTop: 12 }}>Last updated: April 2026</p>
      </div>

      {/* THE PLEDGE */}
      <div style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.08), rgba(245,166,35,0.03))', border: '2px solid rgba(245,166,35,0.3)', borderRadius: 16, padding: '28px 24px', marginBottom: 48 }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1a1208', lineHeight: 1.7, fontStyle: 'italic' }}>
          "Whatever you're going through — we're on your side. Your letter, your situation, your data — all of it stays yours. We will never share it, sell it, or use it for anything other than helping you. Not now, not ever, not for any price."
        </p>
        <p style={{ margin: '16px 0 0', fontSize: 13, color: 'rgba(26,18,8,0.4)', fontWeight: 600 }}>— The SORTED Pledge</p>
      </div>

      {/* WHAT HAPPENS TO YOUR LETTER */}
      <Section icon={<Eye size={22} />} title="What actually happens to your letter">
        <p style={{ marginTop: 0 }}>When you paste or upload a letter, here's the exact journey — nothing hidden:</p>
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#f5a623', color: '#fff', fontWeight: 900, fontSize: 12, borderRadius: 4, padding: '2px 8px', flexShrink: 0, marginTop: 2 }}>1</span>
            <span style={{ color: 'rgba(26,18,8,0.75)' }}>Your letter text is sent over HTTPS (encrypted in transit, like online banking) to an AI model for analysis.</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#f5a623', color: '#fff', fontWeight: 900, fontSize: 12, borderRadius: 4, padding: '2px 8px', flexShrink: 0, marginTop: 2 }}>2</span>
            <span style={{ color: 'rgba(26,18,8,0.75)' }}>The AI reads it, generates your breakdown, and sends the result back.</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#f5a623', color: '#fff', fontWeight: 900, fontSize: 12, borderRadius: 4, padding: '2px 8px', flexShrink: 0, marginTop: 2 }}>3</span>
            <span style={{ color: 'rgba(26,18,8,0.75)' }}>Your letter content is immediately discarded. We never log it, store it, or look at it.</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#22c55e', color: '#fff', fontWeight: 900, fontSize: 12, borderRadius: 4, padding: '2px 8px', flexShrink: 0, marginTop: 2 }}>✓</span>
            <span style={{ color: 'rgba(26,18,8,0.75)' }}>The result lives in your browser only. Nothing is saved anywhere unless you choose to email it to yourself.</span>
          </div>
        </div>
      </Section>

      {/* HONEST DISCLOSURE */}
      <Section icon={<AlertTriangle size={22} />} title="The honest bit — what we can't fully control">
        <p style={{ marginTop: 0 }}>We'll never hide anything from you. Here's the part most apps don't tell you:</p>
        <Honest label="AI Provider:">
          Your letter is processed by an AI model (via our infrastructure partner). Their API terms state they do not train on API data — but we cannot independently audit that. We're honest about this gap.
        </Honest>
        <Honest label="HTTPS only:">
          Your letter is encrypted in transit — but it is not end-to-end encrypted in a way that prevents the AI from reading it. That's unavoidable if you want AI to understand it. We disclose this clearly rather than hiding it.
        </Honest>
        <Honest label="Our roadmap:">
          We are committed to moving toward on-device AI processing as the technology matures — meaning your letter would never leave your device at all. We'll get there. We promise.
        </Honest>
      </Section>

      {/* PATTERN LEARNING — ANONYMIZED ONLY */}
      <Section icon={<Heart size={22} />} title="We learn from patterns — anonymously">
        <p style={{ marginTop: 0 }}>We do something most legal apps won't tell you: we use anonymized case patterns to get smarter.</p>
        <p>Here's how it works — completely transparent:</p>
        <div style={{ margin: '20px 0', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '16px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#22c55e', margin: '0 0 10px' }}>The Anonymization:</p>
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', margin: '0 0 10px', lineHeight: 1.65 }}>
            After we analyze your letter, we create an <strong>anonymized summary</strong>. We strip out: names, emails, amounts, dates, addresses. What's left? The pattern — the type of problem, the severity, what advice worked.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.65 }}>
            Think of it like case law. "Smith v. Jones" becomes "Claimant v. Defendant" — the legal reasoning stays valuable forever.
          </p>
        </div>
        <p style={{ marginTop: 16, marginBottom: 12, color: 'rgba(26,18,8,0.65)' }}>Why? Because it makes us smarter. After 1,000 cases, we spot patterns that help the next person:</p>
        <ul style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', lineHeight: 1.75, paddingLeft: 20, margin: 0 }}>
          <li>"Last 50 council tax letters like this — these 3 clauses always backfire"</li>
          <li>"Employment contracts with this language? People get better outcomes if they push back on X"</li>
          <li>"Debt letters from this organization — here's what actually works"</li>
        </ul>
        <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8 }}>
          <p style={{ fontSize: 12, color: 'rgba(34,197,94,0.9)', margin: 0, fontWeight: 600 }}>✓ You benefit twice: once when SORTED helps you, again when your anonymized pattern helps the next person.</p>
        </div>
      </Section>

      {/* WHAT WE DO AND DON'T DO */}
      <Section icon={<Lock size={22} />} title="What we do — and what we never do">
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontWeight: 700, color: '#22c55e', marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>WE DO:</p>
          <Check>Encrypt all data in transit (HTTPS)</Check>
          <Check>Discard your letter content immediately after analysis</Check>
          <Check>Create anonymized patterns to improve future advice — no PII included</Check>
          <Check>Let you clear all local data at any time — one button, instant, total</Check>
          <Check>Work without requiring any account or login</Check>
          <Check>Store zero cookies or trackers on your device</Check>
          <Check>Tell you exactly what happens — like this page</Check>
        </div>
        <div>
          <p style={{ fontWeight: 700, color: '#ef4444', marginBottom: 12, fontSize: 14, letterSpacing: '0.05em' }}>WE NEVER:</p>
          <Warn>Store your letter content anywhere</Warn>
          <Warn>Sell your data — to anyone, ever, for any reason</Warn>
          <Warn>Use your documents to train AI models</Warn>
          <Warn>Share your information with third parties for marketing</Warn>
          <Warn>Link your usage to your identity</Warn>
          <Warn>Use dark patterns to hide what we're doing</Warn>
        </div>
      </Section>

      {/* DATA SOVEREIGNTY */}
      <Section icon={<Heart size={22} />} title="Data sovereignty is a fundamental right">
        <p style={{ marginTop: 0 }}>
          We believe your data is an extension of yourself — as personal as your body, your thoughts, your home. The idea that corporations can harvest, sell, and weaponise your private moments without consent is one of the defining injustices of our time.
        </p>
        <p>
          SORTED exists for people in difficult moments. Someone who can't make sense of a court letter. Someone who can't afford a solicitor. Someone who just needs to understand what's happening to them. The last thing they need is their moment of vulnerability becoming a data point in someone's ad engine.
        </p>
        <p style={{ margin: 0 }}>
          We will always put you first. We will always be honest when we fall short. And we will never stop improving until your data is so protected it can't be touched by anyone — including us.
        </p>
      </Section>

      {/* YOUR CONTROL */}
      <Section icon={<Trash2 size={22} />} title="Your control — right now">
        <p style={{ marginTop: 0 }}>You don't need to wait for us to protect your privacy. You have full control today:</p>
        <Check>Close the tab — everything is gone. No account, no trace.</Check>
        <Check>Use the "Clear all my data" button in the menu to wipe any local usage data instantly.</Check>
        <Check>Never create an account — SORTED works completely without one.</Check>
        <Check>Use a private/incognito browser window for maximum isolation.</Check>
      </Section>

      {/* CONTACT */}
      <div style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#1a1208' }}>Questions? Challenge us.</p>
        <p style={{ margin: '0 0 16px', color: 'rgba(26,18,8,0.55)', fontSize: 14 }}>If you think we're falling short of this pledge, tell us. We mean it.</p>
        <a href="mailto:family@uf51.love" style={{ color: '#f5a623', fontWeight: 700, fontSize: 15 }}>family@uf51.love</a>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(26,18,8,0.35)', fontSize: 12, marginTop: 40 }}>
        SORTED is part of Universal Frequency 51 — built to help people, not harvest them.
      </p>
    </div>
    </div>
  );
}