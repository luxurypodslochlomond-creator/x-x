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

function BuzzTripAboutContent() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-2xl mx-auto">
      <Link to="/BuzzTrip" className="text-green-400 text-sm font-mono hover:text-green-300 mb-8 block">← Back to BuzzTrip</Link>

      <h1 className="text-4xl font-black mb-2">How BuzzTrip Works</h1>
      <p className="text-green-400 font-mono text-sm tracking-widest mb-10">THE SCIENCE. SIMPLE.</p>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-black text-green-400 mb-2">What is the vagus nerve?</h2>
          <p className="text-gray-400 leading-relaxed">
            The vagus nerve is the longest nerve in your body. It runs from your brainstem down through your heart, lungs and gut.
            It controls your "rest and repair" state — the opposite of fight-or-flight. When it's active, you feel calm. When it's not, you feel wired, anxious, or sick.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-green-400 mb-2">Why breathing works instantly</h2>
          <p className="text-gray-400 leading-relaxed">
            A long exhale directly activates the vagus nerve. This is called the "diving reflex." Within 60-90 seconds of extended exhaling,
            your heart rate slows, your cortisol drops, and your body shifts from sympathetic to parasympathetic state. This is 40+ years of published science.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-green-400 mb-2">Why we add sound</h2>
          <p className="text-gray-400 leading-relaxed">
            Low frequency tones (60-130Hz) played through headphones stimulate the auricular branch of the vagus nerve — the part that runs through your ear canal.
            Clinical studies show auricular vagal stimulation reduces anxiety, craving intensity, and withdrawal distress. We use simple isochronic tones. No binaural complexity.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-green-400 mb-2">Why the screen colour matters</h2>
          <p className="text-gray-400 leading-relaxed">
            Chromotherapy research shows cool greens and blues calm the nervous system by reducing cortisol and activating the parasympathetic response.
            Our sessions match screen colour to the protocol — green for anxiety, cyan for withdrawal, deep blue for sleep.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-black text-green-400 mb-2">Does it work for withdrawal?</h2>
          <p className="text-gray-400 leading-relaxed">
            A 2025 PubMed study confirmed: <em>"Noninvasive VNS reduces withdrawal-related affective distress and improves functional outcomes in Alcohol Use Disorder."</em>
            Active clinical trials are running at UCSD for opioid use disorder. The mechanism is real.
          </p>
        </div>

        <div className="border border-green-500/20 rounded-xl p-5">
          <p className="text-gray-500 text-sm leading-relaxed">
            BuzzTrip is not a medical device. It does not diagnose, treat, or cure any condition.
            It provides breathing and audio tools based on published research. Always consult a healthcare professional for serious withdrawal symptoms.
            Built by Universal Frequency 51. Free forever.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BuzzTripAbout() {
  return (
    <Suspense fallback={<BuzzTripLoader />}>
      <BuzzTripAboutContent />
    </Suspense>
  );
}