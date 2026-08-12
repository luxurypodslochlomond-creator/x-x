import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKHeadphones, COOLASFUCKSpeaker } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';
import FrequencyAIRouter from '@/components/healing/FrequencyAIRouter';
import NowPlayingOverlay from '@/components/healing/NowPlayingOverlay';
import SacredGeometryBackground from '@/components/healing/SacredGeometryBackground';
import useFrequencyEngine from '@/components/healing/useFrequencyEngine';

const BuzzStopEngine = lazy(() => import('@/components/healing/BuzzStopEngine'));
const FrequencyP2PShare = lazy(() => import('@/components/healing/FrequencyP2PShare'));
import FrequencyInfoPanels from '@/components/healing/FrequencyInfoPanels';
import FrequencyCard from '@/components/healing/FrequencyCard';
import { FREQUENCIES } from '@/components/healing/frequencyData';

/**
 * FREQUENCY CHAMBER — Mind · Body · Soul
 * AI-designed audio protocols. Free forever. Works offline.
 *
 * Audio engine lives in useFrequencyEngine() — this file is pure UI.
 */
export default function FrequencyChamber() {
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const [showSmartTV, setShowSmartTV] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [ai51Recommendation, setAI51Recommendation] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDataControls, setShowDataControls] = useState(false);
  const [showBuzzStop, setShowBuzzStop] = useState(false);
  const [cardsReady, setCardsReady] = useState(false);

  const {
    isPlaying, selected, timer, volume, setVolume,
    currentSweepFreq, timerTarget, setTimerTarget, timerTargetRef,
    play, stop, formatTime, canvasRef
  } = useFrequencyEngine();

  // DEFER CARD GRID — header + AIRouter paint first
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setCardsReady(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  // OFFLINE DETECTION + SYNC QUEUE
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      try {
        const queue = JSON.parse(localStorage.getItem('uf51_offline_queue') || '[]');
        if (queue.length > 0) {
          for (const item of queue) {
            try {
              if (item.type === 'FrequencyPlay') {
                await base44.entities.FrequencyPlay.create(item.data);
              }
            } catch (e) {}
          }
          localStorage.removeItem('uf51_offline_queue');
        }
      } catch (e) {}
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (navigator.onLine) handleOnline();
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // OG META TAGS for social sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const freqId = params.get('freq');
    const freq = freqId ? FREQUENCIES.find(f => f.id === freqId) : null;

    const ogTitle = freq
      ? `${freq.name} • ${freq.hz} Hz • Free Healing`
      : 'Frequency Chamber • Free Healing Frequencies • UF51';
    const ogDescription = freq
      ? `${freq.description}. Play now, no login needed, works 100% offline.`
      : 'Free healing frequencies for pain, anxiety, sleep, focus + more. 100% offline. No login. No servers.';
    const publishedDomain = window.location.hostname.includes('base44.app') ? 'uf51.love' : window.location.origin;
    const ogImage = `https://${publishedDomain}/api/functions/serveFrequencyOGImage?freq=${freqId || 'generic'}`;
    const ogUrl = window.location.href;

    setMetaTag('og:title', ogTitle);
    setMetaTag('og:description', ogDescription);
    setMetaTag('og:image', ogImage);
    setMetaTag('og:url', ogUrl);
    setMetaTag('og:type', 'website');
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle);
    setMetaTag('twitter:description', ogDescription);
    setMetaTag('twitter:image', ogImage);
  }, []);

  const setMetaTag = (property, content) => {
    let meta = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(property.includes(':') ? 'property' : 'name', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8 text-center px-2 relative">
        <SacredGeometryBackground color="#d4a017" opacity={0.04} />
        <div className="relative z-10">
        <div className="flex flex-col items-center gap-2 mb-4">
          <COOLASFUCKWaves size={48} animate={true} />
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Mind · Body · Soul
          </h1>
          <p className="text-cyan-400 font-bold text-sm sm:text-base font-mono tracking-widest">AI-DESIGNED AUDIO PROTOCOLS</p>
          <p className="text-gray-400 text-xs sm:text-sm font-mono">Built on peer-reviewed neuroscience. MIT · Stanford · NHS-aligned.</p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="px-2 py-1 bg-green-500/10 border border-green-500/40 rounded text-[10px] font-bold text-green-400 font-mono">✓ NO ACCOUNT</span>
            <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/40 rounded text-[10px] font-bold text-cyan-400 font-mono">✓ NO TRACKING</span>
            <span className="px-2 py-1 bg-pink-500/10 border border-pink-500/40 rounded text-[10px] font-bold text-pink-400 font-mono">✓ FREE FOREVER</span>
            <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/40 rounded text-[10px] font-bold text-purple-400 font-mono">✓ WORKS OFFLINE</span>
          </div>
          <p className="text-white/40 text-xs mt-1 italic">Just you. Nobody knows you're here.</p>

          {!isOnline && (
            <div className="px-2 py-1 bg-green-500/20 border border-green-500 rounded text-[10px] font-bold text-green-400 font-mono">
              OFFLINE ✓
            </div>
          )}
        </div>
        <p className="text-gray-400 text-base sm:text-lg mb-4">AI-designed audio protocols for pain, anxiety, depression, loneliness, sleep + more. Built on published neuroscience. Free forever. Works offline.</p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeviceFilter('all')}
            className={`px-3 py-2 rounded-lg font-bold font-mono text-xs sm:text-sm border-2 transition-all ${
              deviceFilter === 'all'
                ? 'bg-cyan-500 border-cyan-500 text-black'
                : 'bg-black border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60'
            }`}
          >
            ALL
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeviceFilter('speaker')}
            className={`px-3 py-2 rounded-lg font-bold font-mono text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              deviceFilter === 'speaker'
                ? 'bg-green-500 border-green-500 text-black'
                : 'bg-black border-green-500/30 text-green-400 hover:border-green-500/60'
            }`}
          >
            <COOLASFUCKSpeaker size={16} animate={deviceFilter === 'speaker'} />
            <span>SPEAKERS / TV</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeviceFilter('headphones')}
            className={`px-3 py-2 rounded-lg font-bold font-mono text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              deviceFilter === 'headphones'
                ? 'bg-pink-500 border-pink-500 text-black'
                : 'bg-black border-pink-500/30 text-pink-400 hover:border-pink-500/60'
            }`}
          >
            <COOLASFUCKHeadphones size={16} animate={deviceFilter === 'headphones'} />
            HEADPHONES
          </motion.button>
        </div>
        </div>
      </div>

      {/* PLAYING NOW - FULLSCREEN */}
      <AnimatePresence>
        {isPlaying && selected && (
          <NowPlayingOverlay
            selected={selected}
            timer={timer}
            timerTarget={timerTarget}
            volume={volume}
            setVolume={setVolume}
            formatTime={formatTime}
            stop={stop}
            currentSweepFreq={currentSweepFreq}
            setTimerTarget={setTimerTarget}
            timerTargetRef={timerTargetRef}
            canvasRef={canvasRef}
          />
        )}
      </AnimatePresence>

      {/* AI ROUTER + FREQUENCY GRID */}
      {!isPlaying && (
      <>
      <FrequencyAIRouter frequencies={FREQUENCIES} onSelect={(freq) => freq.isBuzzStop ? setShowBuzzStop(true) : play(freq)} />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsReady ? (
        FREQUENCIES
          .filter(freq => {
            if (deviceFilter === 'all') return true;
            if (deviceFilter === 'speaker') return freq.device === 'speaker' || freq.device === 'both';
            if (deviceFilter === 'headphones') return freq.device === 'headphones' || freq.device === 'both';
            return true;
          })
          .map((freq, index) => (
          <FrequencyCard
            key={freq.id}
            freq={freq}
            index={index}
            onPlay={(f, isBuzz) => isBuzz ? setShowBuzzStop(true) : play(f)}
            isRecommended={ai51Recommendation?.frequencyId === freq.id}
            allFrequencies={FREQUENCIES}
          />
        ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20 text-gray-600 font-mono text-xs">Tuning in…</div>
        )}
        </div>

        <FrequencyInfoPanels
          showHowItWorks={showHowItWorks} setShowHowItWorks={setShowHowItWorks}
          showDataControls={showDataControls} setShowDataControls={setShowDataControls}
          showSmartTV={showSmartTV} setShowSmartTV={setShowSmartTV}
          showScience={showScience} setShowScience={setShowScience}
        />

      </div>
      </>
      )}

      {/* BUZZSTOP ENGINE MODAL */}
      <AnimatePresence>
        {showBuzzStop && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
              <div className="flex justify-end mb-2">
                <button onClick={() => setShowBuzzStop(false)}
                  className="text-gray-500 hover:text-white font-mono text-xs border border-gray-700 px-3 py-1 hover:border-gray-400 transition-colors">
                  ✕ CLOSE
                </button>
              </div>
              <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>}>
                <BuzzStopEngine onStop={() => setShowBuzzStop(false)} />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* P2P SHARE MODAL */}
      <AnimatePresence>
        {showShare && selected && (
          <Suspense fallback={null}>
            <FrequencyP2PShare
              frequency={selected}
              timer={timer}
              onClose={() => setShowShare(false)}
            />
          </Suspense>
        )}
      </AnimatePresence>

    </div>
  );
}