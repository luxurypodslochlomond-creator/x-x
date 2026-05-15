import React from 'react';
import { Link } from 'react-router-dom';

export default function SortedTermsPage() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 640, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: '#1a1208' }}>SORTED</h1>
        <p style={{ fontSize: 13, letterSpacing: '0.08em', color: 'rgba(26,18,8,0.55)', textTransform: 'uppercase' }}>Terms of Service</p>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 6 }}>Last updated: May 2026</p>
      </div>

      <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(26,18,8,0.7)', marginBottom: 36, fontStyle: 'italic' }}>
        You've got a letter you don't understand. We help you make sense of it — in plain English, your language, no jargon. That's SORTED. Built for real people, not corporations.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>1. What SORTED Is</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED is an AI-powered document translation tool. You paste or photograph a letter — we decode it into plain English and suggest possible next steps. We work across most countries and languages. SORTED is <strong>not a law firm</strong> and does not provide legal advice. Think of us as a brilliant, well-read friend who helps you understand what something means — not a solicitor who can act on your behalf.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>2. Not Legal Advice</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED's output is information, not legal advice. It is not a substitute for a qualified solicitor, lawyer, or legal professional. If you're facing court proceedings, serious financial action, or a dispute with significant consequences — please also seek advice from a qualified professional in your country. SORTED can help you understand the situation and prepare, but the final decisions are always yours.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>3. Your Responsibility</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          You decide what to do with what SORTED tells you. Read it. Think about it. Ask a real professional if the stakes are high. We're here to help you understand — never to pressure or direct your choices. SORTED outputs should always be verified before acting on them in any legal or financial context.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>4. Free Sessions, Then You Choose</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED gives you free uses to start. After that, you can subscribe or walk away. No lock-in, no dark patterns, no guilt. If you're genuinely struggling financially, email us — we'll sort something. <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a>
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>5. Accuracy & Limitations</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          AI models are powerful but not infallible. SORTED does its best to give you accurate, helpful context — but laws vary by country, jurisdiction, and circumstance. Always check key facts with an official source or professional. We continuously work to improve accuracy, and we're honest when something is uncertain.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>6. Our Liability</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED is provided as a helpful service, not as a guaranteed legal resource. To the extent permitted by applicable law, Universal Frequency 51 CIC is not liable for decisions made based on SORTED's output. We care deeply about the people who use this — but we can't be responsible for outcomes in complex legal situations we haven't been fully briefed on. That's not coldness — that's honesty.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>7. Governing Law</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED is operated by Universal Frequency 51 CIC, based in Scotland, UK. These terms are governed by Scots law. If you're using SORTED from the EU, your local consumer protection rights (including EU consumer law) also apply and are not overridden by these terms. Nothing here removes rights you have under your own country's laws.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>8. Changes to These Terms</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          If we update these terms in a meaningful way, we'll say so clearly on this page with a new date. Continuing to use SORTED after an update means you accept the new version. We'll never change the fundamentals — no data harvesting, no selling your info, no dark patterns — ever.
        </p>
      </section>

      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 50, paddingTop: 20, borderTop: '1px solid rgba(245,166,35,0.2)' }}>
        Questions? <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a>
        <br /><br />
        SORTED is part of <strong>Universal Frequency 51 CIC</strong> — built to help people, not harvest them. ♾️
      </p>
    </div>
  );
}