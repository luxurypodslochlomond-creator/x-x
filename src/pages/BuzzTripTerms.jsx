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

export default function BuzzTripTerms() {
  useEffect(() => {
    document.title = 'Terms of Use — BuzzTrip';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ background: 'radial-gradient(ellipse at top, #001a0a 0%, #000 60%)' }}>
      <div className="flex items-center px-5 pt-5 pb-2">
        <Link to="/BuzzTrip" className="text-green-400 text-sm hover:text-green-300 transition-colors">← Back to BuzzTrip</Link>
      </div>

      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full space-y-6">
        <h1 className="text-4xl font-black text-white">Terms of Use</h1>
        <p className="text-green-400 font-mono text-sm tracking-widest">VAGAL RESET ENGINE</p>

        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Service Description</h2>
            <p>BuzzTrip is a free, web-based tool designed to support nervous system reset through guided breathing and audio frequencies. It is not a medical device and does not diagnose, treat, cure, or prevent any disease.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Medical Disclaimer</h2>
            <p>BuzzTrip is provided for educational and wellness purposes only. If you have a medical condition, are pregnant, or take medications, consult a healthcare provider before use. In a crisis, contact emergency services or a crisis helpline immediately.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">User Responsibility</h2>
            <p>You use BuzzTrip at your own risk. Users must be in a safe environment and able to stop at any time. Do not use while driving or operating machinery. Stop immediately if you experience discomfort.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Data & Privacy</h2>
            <p>BuzzTrip does not store, track, or collect personal data. No user accounts are required. Your experience is private and stays on your device. See our Privacy Policy for details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
            <p>BuzzTrip and its creators are not liable for any direct, indirect, or consequential damages arising from use of this tool. Use it responsibly and at your own discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Free Forever</h2>
            <p>BuzzTrip is free and will remain free. No paywalls, no ads, no data selling. Built on peer-reviewed science and open-source principles.</p>
          </section>

          <div className="pt-4 mt-6 border-t border-white/10">
            <p className="text-xs text-gray-600">Not a medical device · Free forever · No data stored</p>
            <p className="text-xs text-gray-600 mt-2">Questions? Email <a href="mailto:family@uf51.love" className="text-green-400 hover:text-green-300">family@uf51.love</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}