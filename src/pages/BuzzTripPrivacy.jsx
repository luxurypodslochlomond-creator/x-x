import React, { useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

const BuzzTripLoader = () => (
  <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ animation: 'pulse 1.5s ease-in-out infinite', fontSize: '24px', fontWeight: 'bold', color: '#ec4899' }}>
      ♾️ BuzzTrip loading...
    </div>
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </div>
);

export default function BuzzTripPrivacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — BuzzTrip';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ background: 'radial-gradient(ellipse at top, #001a0a 0%, #000 60%)' }}>
      <div className="flex items-center px-5 pt-5 pb-2">
        <Link to="/BuzzTrip" className="text-green-400 text-sm hover:text-green-300 transition-colors">← Back to BuzzTrip</Link>
      </div>

      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full space-y-6">
        <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-green-400 font-mono text-sm tracking-widest">ZERO DATA COLLECTION</p>

        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">What We Collect</h2>
            <p>BuzzTrip collects nothing. No user accounts. No tracking. No cookies. No personal data. Everything happens on your device, in your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How Data Stays Private</h2>
            <p>Because we don't collect data, we can't lose it, sell it, or be hacked for it. Your breathing patterns, your sessions, your health history—it's all private and local to your device.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Third Parties</h2>
            <p>We don't share data with third parties because we don't collect it. No analytics vendors, no ad platforms, no cloud services tracking your usage.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">GDPR & Legal</h2>
            <p>GDPR, CCPA, and other data protection laws don't apply to us because we're not a data controller. We have no personal data to manage, retain, or delete.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Changes to This Policy</h2>
            <p>We commit to keeping BuzzTrip zero-data forever. If that ever changes, we'll notify you immediately and let you opt out or leave.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Questions?</h2>
            <p>If you have privacy concerns, email <a href="mailto:family@uf51.love" className="text-green-400 hover:text-green-300">family@uf51.love</a>.</p>
          </section>

          <div className="pt-4 mt-6 border-t border-white/10">
            <p className="text-xs text-gray-600">Not a medical device · Free forever · No data stored</p>
          </div>
        </div>
      </div>
    </div>
  );
}