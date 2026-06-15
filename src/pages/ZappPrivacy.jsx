import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Bolt = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bolt-g-p" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#bolt-g-p)" />
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

export default function ZappPrivacy() {
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
          <span className="text-white/20 text-sm">/ Privacy Policy</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-white/30 text-xs mb-2">Last updated: June 2026</p>
          <p className="text-white/30 text-xs mb-10">Universal Frequency 51 · Scotland, UK · Compliant with UK GDPR and COPPA</p>

          {/* TL;DR */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <p className="text-green-400 font-black text-sm mb-2">TL;DR — The honest version</p>
            <ul className="text-white/60 text-sm space-y-1 list-disc pl-4">
              <li>We do not collect personal data from children.</li>
              <li>No account, no email, no name required to use ZAPP.</li>
              <li>The only optional data: a first name if you choose to save to Hall of Fame.</li>
              <li>Your idea prompts are sent to Google's AI (Gemini) to generate the app — this is necessary for the service to work.</li>
              <li>We do not sell data. Ever. To anyone.</li>
              <li>We use no advertising cookies or tracking pixels.</li>
            </ul>
          </div>

          <Section title="1. Who we are">
            <p>ZAPP is operated by Universal Frequency 51 (UF51), based in Scotland, United Kingdom.</p>
            <p>Contact: hello@universalfrequency51.com</p>
          </Section>

          <Section title="2. What data we collect — and what we don't">
            <p><strong className="text-white">What we collect:</strong></p>
            <ul className="list-disc pl-4 space-y-1 mt-1">
              <li>The text ideas you type into ZAPP — sent to Google Gemini to generate your app. These are not stored by us after generation unless you save to the Hall of Fame.</li>
              <li>If you save to the Hall of Fame: the app title, the idea text, the generated HTML, and optionally a first name only. No surname, email, or contact information.</li>
              <li>Standard server logs (IP address, browser type, timestamp) — retained for up to 30 days for security purposes only.</li>
            </ul>
            <p className="mt-3"><strong className="text-white">What we do NOT collect:</strong></p>
            <ul className="list-disc pl-4 space-y-1 mt-1">
              <li>No email addresses</li>
              <li>No passwords</li>
              <li>No account information</li>
              <li>No location data</li>
              <li>No device identifiers for tracking</li>
              <li>No biometric data</li>
              <li>No payment information (ZAPP is free)</li>
            </ul>
          </Section>

          <Section title="3. Children's privacy (COPPA & UK GDPR-K)">
            <p>ZAPP is designed for children. We take this responsibility seriously.</p>
            <p>We do not knowingly collect personal information from children under 13. We do not require any personal information to use ZAPP. The optional Hall of Fame name field should contain only a first name — parents and guardians should supervise this.</p>
            <p>If you believe a child has submitted personal information that should be removed, contact us at hello@universalfrequency51.com and we will remove it promptly.</p>
            <p>We do not use children's data for any form of advertising, profiling, or commercial purposes.</p>
          </Section>

          <Section title="4. AI processing — Google Gemini">
            <p>Your app idea text is sent to Google's Gemini AI to generate the app. This is a third-party service operated by Google LLC.</p>
            <p>We do not send any personal data to Google — only the creative idea text you type.</p>
            <p>Google's data processing is governed by their own privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">policies.google.com/privacy</a></p>
            <p>ZAPP is built on the Base44 platform. Base44's privacy policy applies to platform-level infrastructure: <a href="https://base44.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">base44.com/privacy</a></p>
          </Section>

          <Section title="5. Cookies and tracking">
            <p>ZAPP uses no advertising cookies and no third-party tracking pixels.</p>
            <p>We use only essential session cookies necessary for the platform to function. These are not used for tracking or profiling.</p>
          </Section>

          <Section title="6. Hall of Fame — public content">
            <p>If you choose to save your creation to the Hall of Fame, the following is made public: the app title, the idea text, the generated app, and your optional first name.</p>
            <p>Anyone can view and remix Hall of Fame apps. Do not include personal information in your app title, idea text, or creator name.</p>
            <p>We reserve the right to remove any Hall of Fame entry that contains personal information, inappropriate content, or violates our Terms of Use.</p>
          </Section>

          <Section title="7. Data retention">
            <p>Hall of Fame entries are retained indefinitely unless you request removal.</p>
            <p>To request removal of a Hall of Fame entry, contact us at hello@universalfrequency51.com with the app title and creation date.</p>
            <p>Server logs are retained for up to 30 days.</p>
          </Section>

          <Section title="8. Your rights (UK GDPR)">
            <p>Under UK GDPR, you have the right to: access any personal data we hold about you; request correction or deletion; object to processing; lodge a complaint with the ICO (Information Commissioner's Office, ico.org.uk).</p>
            <p>Since we collect minimal data and no accounts are required, most of these rights are satisfied by the nature of our service. Contact hello@universalfrequency51.com for any data requests.</p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>We may update this Privacy Policy from time to time. The current version is always available at this page. We will not make changes that reduce your privacy protections without clear notice.</p>
          </Section>

          <div className="flex flex-wrap gap-3 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link to="/ZappAbout" className="text-white/30 hover:text-white/60 text-xs transition-colors">About ZAPP</Link>
            <span className="text-white/10">·</span>
            <Link to="/ZappTerms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Use</Link>
            <span className="text-white/10">·</span>
            <Link to="/Zapp" className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">← Back to ZAPP</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}