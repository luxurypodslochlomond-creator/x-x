import React from 'react';
import ZappInfoShell from '@/components/zapp/ZappInfoShell';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-black mb-3" style={{ color: '#c4b5fd' }}>{title}</h2>
    <div className="text-white/60 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function ZappAbout() {
  return (
    <ZappInfoShell
      current="About"
      title="What is ZAPP?"
      subtitle={<p>Built by Universal Frequency 51 · UF51</p>}
    >
      <Section title="✨ The idea">
        <p>ZAPP lets any kid — or adult — describe any idea and watch it turn into a real, working, playable app in seconds.</p>
        <p>No code. No account. No ads. No nonsense. Just pure creative freedom.</p>
      </Section>

      <Section title="👧 Who it's for">
        <p>ZAPP is built primarily for children aged 8–13. We believe every child on Earth deserves the ability to build something — not just consume content.</p>
        <p>Adults are welcome too. The experience is designed to feel magical at any age.</p>
      </Section>

      <Section title="🔒 Safety first">
        <p>ZAPP is designed with children in mind:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>No account required — ever</li>
          <li>No personal data collected from kids</li>
          <li>No advertising of any kind</li>
          <li>No in-app purchases targeting children</li>
          <li>All generated apps run in a sandboxed environment — they can't access your device, camera, contacts, or files</li>
          <li>All feedback inside generated games is kind and encouraging — never harsh</li>
        </ul>
      </Section>

      <Section title="🤖 How it works">
        <p>You describe an idea. Our AI (powered by Google Gemini) builds a complete, working HTML app — games, puzzles, art tools, music makers — and renders it instantly in your browser.</p>
        <p>Everything runs locally in your browser. The AI does the hard part. You get to play the result in seconds.</p>
      </Section>

      <Section title="🏆 Hall of Fame">
        <p>Kids can optionally save their creation to the ZAPP Hall of Fame — a public gallery where anyone can play and remix each other's apps.</p>
        <p>Saving is always optional. You only share a first name (optional). Nothing else is collected.</p>
      </Section>

      <Section title="🌍 Who built this?">
        <p>ZAPP is part of the Universal Frequency 51 (UF51) platform — a not-for-profit ecosystem of tools that heal, educate, and empower people.</p>
        <p>We believe technology should feel like a superpower, not a trap. ZAPP is our way of giving that superpower to kids — for free, forever.</p>
      </Section>
    </ZappInfoShell>
  );
}