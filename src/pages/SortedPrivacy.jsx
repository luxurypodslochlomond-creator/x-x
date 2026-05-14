import React from 'react';

export default function SortedPrivacy() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: '#1a1208' }}>SORTED</h1>
        <p style={{ fontSize: 13, letterSpacing: '0.08em', color: 'rgba(26,18,8,0.55)' }}>PRIVACY POLICY</p>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 8 }}>Last updated: April 2026</p>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>What We Collect</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          We don't collect or store anything. Your letter is sent to an AI for analysis, then immediately discarded. The result lives only in your browser.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>How We Use AI</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          Your letter is processed by an AI model via encrypted HTTPS. The AI provider's terms state they don't train on API data. We create anonymized patterns (no names, emails, amounts, dates) to improve future advice.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>What We Never Do</h2>
        <ul style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)', paddingLeft: 20, margin: 0 }}>
          <li>Store your letter content</li>
          <li>Sell your data to anyone</li>
          <li>Use your documents to train AI models</li>
          <li>Share your information with third parties for marketing</li>
          <li>Require an account or login</li>
          <li>Use cookies or trackers</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>Your Control</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          Close the tab — everything is gone. Use the "Clear all my data" button anytime. No account needed.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>Contact</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(26,18,8,0.65)' }}>
          Questions? <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a>
        </p>
      </section>

      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 50, paddingTop: 20, borderTop: '1px solid rgba(245,166,35,0.2)' }}>
        SORTED is part of Universal Frequency 51 — built to help people, not harvest them.
      </p>
    </div>
  );
}