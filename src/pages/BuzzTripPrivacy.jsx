import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

const BuzzTripLoader = () => (
  <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '40px', height: '40px', border: '2px solid #06b6d4', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function BuzzTripPrivacyContent() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-xl mx-auto">
      <Link to="/BuzzTrip" className="text-green-500 text-sm font-mono hover:text-green-400 block mb-8">← Back to BuzzTrip</Link>
      <h1 className="text-3xl font-black mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-10 font-mono">BuzzTrip · Last updated May 2026</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-black text-lg mb-3">The short version</h2>
          <p className="text-white text-base">We collect nothing. Zero. Nada. BuzzTrip has no accounts, no tracking, no analytics, no cookies, no servers receiving your data.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">Audio processing</h2>
          <p>All audio is generated locally in your browser using the Web Audio API. No audio is recorded, transmitted, or stored anywhere.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">No cookies</h2>
          <p>BuzzTrip uses no cookies and no local storage. Nothing is written to your device.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">No third parties</h2>
          <p>No advertising networks. No analytics platforms. No data brokers. No social media pixels. Your use of BuzzTrip is completely private.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">Who we are</h2>
          <p>BuzzTrip is built by Universal Frequency 51 (UF51), a Community Interest Company based in Scotland. We build free tools for human wellbeing. We are not a data company.</p>
        </section>

        <section>
          <h2 className="text-white font-black text-lg mb-3">Contact</h2>
          <p>Any privacy questions: <a href="mailto:family@uf51.love" className="text-green-500 hover:text-green-400">family@uf51.love</a></p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-white/5 flex gap-6 justify-center">
        <Link to="/BuzzTripTerms" className="text-gray-600 text-xs hover:text-gray-400">Terms</Link>
        <Link to="/BuzzTripAbout" className="text-gray-600 text-xs hover:text-gray-400">About</Link>
        <Link to="/BuzzTrip" className="text-gray-600 text-xs hover:text-gray-400">App</Link>
      </div>
    </div>
  );
}

export default function BuzzTripPrivacy() {
  return (
    <Suspense fallback={<BuzzTripLoader />}>
      <BuzzTripPrivacyContent />
    </Suspense>
  );
}