import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

const BuzzTripLoader = () => (
  <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
    <div style={{ fontSize: '48px', animation: 'infinity-pulse 1.5s ease-in-out infinite' }}>♾️❤️</div>
    <div style={{ fontSize: '14px', color: '#10b981', fontFamily: 'monospace', letterSpacing: '2px' }}>LOADING</div>
    <style>{`
      @keyframes infinity-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.15); }
      }
    `}</style>
  </div>
);

function BuzzTripTermsContent() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-xl mx-auto">
      <Link to="/BuzzTrip" className="text-green-500 text-sm font-mono hover:text-green-400 block mb-8">← Back to BuzzTrip</Link>
      <h1 className="text-3xl font-black mb-2">Terms of Use</h1>
      <p className="text-gray-500 text-sm mb-10 font-mono">BuzzTrip · Last updated May 2026</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-black text-lg mb-3">1. What BuzzTrip is</h2>
          <p>BuzzTrip is a free breathing pacer and audio tool designed to support relaxation, stress relief, and sleep. It uses scientifically supported breathing ratios and audio frequencies to encourage parasympathetic nervous system activation.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">2. What BuzzTrip is not</h2>
          <p>BuzzTrip is <strong className="text-white">not a medical device</strong>. It does not diagnose, treat, cure or prevent any medical condition. It is not a substitute for professional medical advice, therapy, or emergency services.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">3. Your responsibility</h2>
          <p>By using BuzzTrip you confirm you are using it voluntarily and at your own discretion. If you have a diagnosed condition (cardiac, respiratory, psychiatric or otherwise), please consult your doctor before use.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">4. In a crisis</h2>
          <p>If you are in immediate danger or crisis, please contact emergency services (999 in the UK, 911 in the US) or a crisis line such as <a href="https://www.samaritans.org" className="text-green-500 hover:text-green-400" target="_blank" rel="noopener noreferrer">Samaritans (116 123)</a>.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">5. No data collection</h2>
          <p>BuzzTrip stores no personal data. No account required. No tracking. Audio runs entirely in your browser.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">6. Free forever</h2>
          <p>BuzzTrip is a free public tool built by Universal Frequency 51 (UF51), a Community Interest Company. It will remain free forever.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">7. Contact</h2>
          <p>Questions? <a href="mailto:family@uf51.love" className="text-green-500 hover:text-green-400">family@uf51.love</a></p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-white/5 flex gap-6 justify-center">
        <Link to="/BuzzTripPrivacy" className="text-gray-600 text-xs hover:text-gray-400">Privacy</Link>
        <Link to="/BuzzTripAbout" className="text-gray-600 text-xs hover:text-gray-400">About</Link>
        <Link to="/BuzzTrip" className="text-gray-600 text-xs hover:text-gray-400">App</Link>
      </div>
    </div>
  );
}

export default function BuzzTripTerms() {
  return (
    <Suspense fallback={<BuzzTripLoader />}>
      <BuzzTripTermsContent />
    </Suspense>
  );
}