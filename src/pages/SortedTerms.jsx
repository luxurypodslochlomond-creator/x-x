import React from 'react';
import { Link } from 'react-router-dom';

export default function SortedTermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', fontSize: '16px', lineHeight: 1.6, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#1a1208' }}>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,248,245,0.98)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(245,166,35,0.3)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/Sorted" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(26,18,8,0.5)', textDecoration: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          BACK
        </Link>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.1em', color: '#1a1208' }}>SORTED</div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#d97706' }}>TERMS OF SERVICE</div>
      </header>

      <div style={{ padding: '40px 20px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: '#1a1208' }}>SORTED</h1>
        <p style={{ fontSize: 13, letterSpacing: '0.08em', color: 'rgba(26,18,8,0.55)' }}>TERMS OF SERVICE</p>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)', marginBottom: 32 }}>
        You've got a letter you don't understand. We help you make sense of it. That's it. That's SORTED.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>We're Not Lawyers</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          SORTED uses AI to decode letters into plain English. We can't give legal advice. If you're facing court or a serious legal fight, see a real solicitor. SORTED is your first step, not your only step.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>You Own Your Responsibility</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          You decide what to do with what SORTED tells you. Read it. Think about it. Ask a real person if you're unsure. We're here to help you understand, not to make your decisions.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>Free Sessions, Then You Choose</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          Try SORTED for free. After that, you can subscribe or walk away. No lock-in. No judgement.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>We're Not Liable for Your Choices</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          SORTED is provided as-is. No guarantees. If something goes wrong, that's on us to know and on you to verify. Use it at your own risk.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>We'll Update These Anytime</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          If things change, we'll tell you. Continuing to use SORTED means you agree to the new version.
        </p>
      </section>

      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 50, paddingTop: 20, borderTop: '1px solid rgba(245,166,35,0.2)' }}>
        Questions? <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a>
      </p>
    </div>
    </div>
  );
}