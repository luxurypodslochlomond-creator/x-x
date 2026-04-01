import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { ArrowLeft, Shield, Lock, Server, Eye, FileText, Globe } from 'lucide-react';

const Section = ({ icon: Icon, title, color = '#d4a017', children }) => (
  <section className="rounded-xl p-6" style={{ background: 'rgba(30,26,14,0.8)', border: '1px solid rgba(212,160,23,0.2)' }}>
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
      <h2 className="font-black text-base" style={{ color }}>{title}</h2>
    </div>
    <div className="text-sm text-gray-300 leading-relaxed space-y-2">{children}</div>
  </section>
);

export default function PetSounds51Privacy() {
  return (
    <div className="min-h-screen text-white p-4 pt-24 pb-24" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>
      <div className="max-w-2xl mx-auto">

        <Link to={createPageUrl("PetSounds51")} className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-80" style={{ color: '#d4a017' }}>
          <ArrowLeft className="w-4 h-4" /> Back to PetSounds51
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <PetSounds51Icon8Bit size={40} animate={false} />
          <div>
            <h1 className="text-3xl font-black" style={{ color: '#d4a017' }}>Privacy Policy</h1>
            <p className="text-xs font-mono tracking-widest mt-0.5" style={{ color: '#8aab3a' }}>GDPR COMPLIANT · UK BASED · DATA SOVEREIGN</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-8">Last updated: April 2026</p>

        {/* GDPR BADGE — top of page, investor-visible */}
        <div className="rounded-xl p-5 mb-8 flex items-start gap-4" style={{ background: 'rgba(138,171,58,0.08)', border: '2px solid rgba(138,171,58,0.4)' }}>
          <Shield className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#8aab3a' }} />
          <div>
            <p className="font-black mb-1" style={{ color: '#8aab3a' }}>GDPR Compliant by Design</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              PetSounds51 is incorporated and operated from <strong className="text-white">Scotland, United Kingdom</strong>. All data is processed under UK GDPR and the Data Protection Act 2018. We are subject to the <strong className="text-white">Information Commissioner's Office (ICO)</strong> regulatory framework — not US law. Your data never leaves UK/EU-compliant infrastructure.
            </p>
          </div>
        </div>

        <div className="space-y-4">

          <Section icon={Eye} title="What we collect — and why">
            <p><strong className="text-white">Email address</strong> — only if you subscribe, to send your access confirmation. Stored by Stripe, not by us directly.</p>
            <p><strong className="text-white">Anonymous session metadata</strong> — which protocol was played, how long, what species, what device type. Zero personally identifiable information. No names, no emails, no location beyond browser language hint.</p>
            <p><strong className="text-white">Subscription status</strong> — stored in your own browser's localStorage. We do not maintain a user account database.</p>
            <p className="text-xs italic" style={{ color: '#8aab3a' }}>Legal basis: Legitimate interest (anonymous analytics) and Contract performance (subscription management) — UK GDPR Article 6(1)(b) and 6(1)(f).</p>
          </Section>

          <Section icon={Lock} title="What we never collect">
            <ul className="space-y-1">
              <li>✗ No names, addresses or phone numbers</li>
              <li>✗ No GPS or precise location data</li>
              <li>✗ No audio recordings — all sound generates locally in your browser</li>
              <li>✗ No behavioural profiling or advertising IDs</li>
              <li>✗ No third-party tracking pixels or marketing cookies</li>
              <li>✗ No data sold to any third party — ever</li>
            </ul>
          </Section>

          <Section icon={Server} title="Data residency &amp; sovereignty">
            <p>PetSounds51 is built on <strong className="text-white">Base44</strong>, a UK-accessible infrastructure provider. All data is handled under UK GDPR jurisdiction.</p>
            <p>We do not use US-based analytics services (no Google Analytics, no Meta Pixel, no Mixpanel). This is a deliberate architectural choice — not an afterthought.</p>
            <p className="text-xs italic" style={{ color: '#8aab3a' }}>This makes PetSounds51 a more attractive data partner for EU veterinary institutions and insurers who require GDPR-safe integrations.</p>
          </Section>

          <Section icon={Globe} title="Audio — 100% local processing">
            <p>Every frequency, tone, and protocol is generated <strong className="text-white">entirely within your device</strong> using the Web Audio API. Nothing is streamed from a server. Nothing is recorded. There is no audio data to intercept.</p>
            <p>This architecture is not just private — it is faster, works offline, and has zero marginal cost per session.</p>
          </Section>

          <Section icon={FileText} title="Stripe payments">
            <p>Payments are handled by <strong className="text-white">Stripe</strong>, a PCI-DSS Level 1 certified provider. We never see, store, or process your card details.</p>
            <p>Stripe's privacy policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold" style={{ color: '#d4a017' }}>stripe.com/privacy</a></p>
          </Section>

          <Section icon={Shield} title="Your rights under UK GDPR">
            <ul className="space-y-1">
              <li>✅ Right to access your personal data</li>
              <li>✅ Right to erasure ("right to be forgotten")</li>
              <li>✅ Right to data portability</li>
              <li>✅ Right to restrict processing</li>
              <li>✅ Right to object to processing</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email <a href="mailto:family@uf51.love" className="font-bold hover:underline" style={{ color: '#d4a017' }}>family@uf51.love</a>. We will respond within 30 days (the statutory limit).</p>
            <p className="text-xs mt-2 italic" style={{ color: '#8aab3a' }}>You also have the right to lodge a complaint with the ICO at ico.org.uk.</p>
          </Section>

          <Section icon={Eye} title="Cookies">
            <p>We use <strong className="text-white">no tracking cookies</strong>. The only browser storage we use is localStorage to remember your subscription status on your own device. This does not require a cookie consent banner under UK GDPR guidance.</p>
          </Section>

          <div className="rounded-xl p-5" style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
            <p className="font-black mb-1" style={{ color: '#d4a017' }}>10% charity commitment</p>
            <p className="text-sm text-gray-300">10% of all subscription revenue is donated to animal rescue organisations. Donation records are retained for accounting and regulatory purposes only, in line with UK charity law.</p>
          </div>

        </div>

        <div className="mt-10 text-center border-t border-amber-700/30 pt-8">
          <p className="text-sm text-gray-300 mb-1">Privacy questions?</p>
          <a href="mailto:family@uf51.love" className="font-black text-lg" style={{ color: '#d4a017' }}>family@uf51.love</a>
          <p className="text-xs text-gray-500 mt-3">PetSounds51 · Scotland, UK · ICO jurisdiction · Built with love for every animal</p>
        </div>

      </div>
    </div>
  );
}