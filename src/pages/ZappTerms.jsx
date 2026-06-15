import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Bolt = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bolt-g-t" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#bolt-g-t)" />
  </svg>
);

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-white font-bold text-sm">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
      </button>
      {open && <div className="pb-4 text-white/50 text-sm leading-relaxed space-y-2">{children}</div>}
    </div>
  );
};

export default function ZappTerms() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0f', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-10">
          <Link to="/Zapp" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bolt />
            <span className="font-black text-xl" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ZAPP</span>
          </Link>
          <span className="text-white/20 text-sm">/ Terms of Use</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <h1 className="text-3xl font-black text-white mb-2">Terms of Use</h1>
          <p className="text-white/30 text-xs mb-2">Last updated: June 2026</p>
          <p className="text-white/30 text-xs mb-10">Governed by the laws of Scotland, United Kingdom</p>

          {/* TL;DR */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <p className="text-violet-300 font-black text-sm mb-2">TL;DR — Plain English</p>
            <ul className="text-white/60 text-sm space-y-1 list-disc pl-4">
              <li>ZAPP is free. No catch.</li>
              <li>No account needed. No personal data collected from children.</li>
              <li>What you build is yours. We don't own it.</li>
              <li>We're not responsible if an AI-generated game has a bug.</li>
              <li>Don't use it to do anything harmful or illegal.</li>
              <li>If you save to the Hall of Fame, it's public and remixable by others.</li>
            </ul>
          </div>

          <Section title="1. Who can use ZAPP">
            <p>ZAPP is free to use for anyone. It is primarily designed for children aged 8–13, under parental or guardian supervision where appropriate.</p>
            <p>Children under 13 should use ZAPP with a parent or guardian's knowledge. We do not knowingly collect personal data from children under 13. See our Privacy Policy.</p>
            <p>By using ZAPP you agree to these terms. If you are using ZAPP on behalf of a child, you accept these terms on their behalf.</p>
          </Section>

          <Section title="2. What ZAPP does">
            <p>ZAPP uses AI (Google Gemini, operated by Google LLC) to generate HTML web applications based on your text descriptions. These apps run entirely in your browser in a sandboxed iframe — they cannot access your device hardware, files, camera, contacts, or any personal data.</p>
            <p>AI-generated content may occasionally produce unexpected results. ZAPP is provided as-is. We make no guarantees that every generated app will work perfectly.</p>
          </Section>

          <Section title="3. Your content">
            <p>Ideas you type into ZAPP belong to you. We do not claim ownership of your ideas or the apps generated from them.</p>
            <p>If you choose to save an app to the Hall of Fame, it becomes publicly visible and remixable by other ZAPP users. By saving, you grant ZAPP a non-exclusive licence to display and allow remixing of that app within the ZAPP platform.</p>
            <p>You must not submit ideas that are harmful, abusive, sexually explicit, or illegal.</p>
          </Section>

          <Section title="4. AI-generated content">
            <p>Apps are generated by artificial intelligence. We do not manually review every app before it is displayed. We moderate saved Hall of Fame apps and will remove anything inappropriate.</p>
            <p>If you see content in the Hall of Fame that shouldn't be there, contact us at hello@universalfrequency51.com.</p>
          </Section>

          <Section title="5. No advertising. No purchases.">
            <p>ZAPP contains no advertising of any kind. We will never show ads to children.</p>
            <p>There are no in-app purchases or paid features targeting children within the ZAPP experience.</p>
          </Section>

          <Section title="6. Liability">
            <p>ZAPP is provided free of charge, as-is, without warranties of any kind. Universal Frequency 51 (UF51) is not liable for any loss or damage arising from your use of ZAPP or from AI-generated content.</p>
            <p>We are not liable for any content generated by the AI that may be unexpected, inaccurate, or unsuitable — although we take all reasonable steps to prevent this via our AI prompting and moderation.</p>
          </Section>

          <Section title="7. Changes to these terms">
            <p>We may update these terms from time to time. The current version is always available at this page. Continued use of ZAPP after changes constitutes acceptance.</p>
          </Section>

          <Section title="8. Contact">
            <p>Universal Frequency 51 · Scotland, UK</p>
            <p>Email: hello@universalfrequency51.com</p>
          </Section>

          <div className="flex flex-wrap gap-3 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link to="/ZappAbout" className="text-white/30 hover:text-white/60 text-xs transition-colors">About ZAPP</Link>
            <span className="text-white/10">·</span>
            <Link to="/ZappPrivacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <span className="text-white/10">·</span>
            <Link to="/Zapp" className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">← Back to ZAPP</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}