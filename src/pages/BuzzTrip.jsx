import React, { useEffect, Suspense } from 'react';
import { lazy } from 'react';

const BuzzTripEngine = lazy(() => import('../components/buzztrip/BuzzTripEngine'));

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

export default function BuzzTrip() {
  useEffect(() => {
    document.title = 'BuzzTrip — Vagal Reset Engine';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
    metaDesc.content = 'Reset your nervous system in minutes. Free. No device. No login. Breathing + sound therapy backed by peer-reviewed science.';
  }, []);

  return (
    <Suspense fallback={<BuzzTripLoader />}>
      <BuzzTripEngine />
    </Suspense>
  );
}