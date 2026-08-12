import React from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKSpeaker, COOLASFUCKHeadphones } from '@/components/shared/COOLASFUCKIcon';

const PEER_REVIEWED_IDS = ['anxiety', 'depression', 'loneliness', 'focus', 'sleep', 'tinnitus_notch', 'root_canal_pain', 'brown_noise', 'box_breathing', 'buzzstop'];
const EXPERIMENTAL_IDS = ['tinnitus_sweep', 'earth', 'calm', 'muscle_tension'];
const TRADITIONAL_IDS = ['chest_heart', 'nerve_pain', 'inflammation', 'bro51_heart_boost', 'bro51_full_body', 'bro51_gut_repair', 'cat_healing', 'solfeggio_396', 'solfeggio_417', 'solfeggio_639', 'solfeggio_741', 'solfeggio_852', 'solfeggio_963'];

function WaveformIcon({ waveform, color }) {
  if (waveform === 'sine') return (
    <svg width="50" height="20" viewBox="0 0 40 16"><path d="M0,8 Q5,2 10,8 T20,8 T30,8 T40,8" stroke={color} strokeWidth="2.5" fill="none" /></svg>
  );
  if (waveform === 'square') return (
    <svg width="50" height="20" viewBox="0 0 40 16"><path d="M0,12 L0,4 L8,4 L8,12 L16,12 L16,4 L24,4 L24,12 L32,12 L32,4 L40,4" stroke={color} strokeWidth="2.5" fill="none" /></svg>
  );
  if (waveform === 'sawtooth') return (
    <svg width="50" height="20" viewBox="0 0 40 16"><path d="M0,12 L8,4 L8,12 L16,4 L16,12 L24,4 L24,12 L32,4 L32,12 L40,4" stroke={color} strokeWidth="2.5" fill="none" /></svg>
  );
  if (waveform === 'triangle') return (
    <svg width="50" height="20" viewBox="0 0 40 16"><path d="M0,12 L4,4 L8,12 L12,4 L16,12 L20,4 L24,12 L28,4 L32,12 L36,4 L40,12" stroke={color} strokeWidth="2.5" fill="none" /></svg>
  );
  return null;
}

export default function FrequencyCard({ freq, index, onPlay, isRecommended, allFrequencies }) {
  return (
    <motion.button
      key={freq.id}
      onClick={() => freq.isBuzzStop ? onPlay(freq, true) : onPlay(freq)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-8 border-4 bg-black hover:bg-white/5 transition-all relative text-left h-full sticky"
      style={{
        top: `${(index % 3) * 20}px`,
        borderColor: freq.color,
        boxShadow: isRecommended
          ? `0 0 40px ${freq.color}, 0 0 60px ${freq.color}80`
          : `0 0 20px ${freq.color}40`,
        backgroundColor: isRecommended ? `${freq.color}10` : 'black'
      }}
    >
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black text-xs font-black px-3 py-1.5 rounded">
          AI51 ✓
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <freq.icon size={44} animate={false} />
          {freq.device === 'speaker' && <COOLASFUCKSpeaker size={20} animate={false} />}
          {freq.device === 'headphones' && <COOLASFUCKHeadphones size={20} animate={false} />}
          {freq.device === 'both' && (
            <>
              <COOLASFUCKSpeaker size={20} animate={false} />
              <COOLASFUCKHeadphones size={20} animate={false} />
            </>
          )}
        </div>
        <div className="bg-white/10 px-3 py-1.5 rounded">
          <p className="text-sm font-black font-mono" style={{ color: freq.color }}>
            {freq.timer}
          </p>
        </div>
      </div>

      <div className="mb-2">
        {PEER_REVIEWED_IDS.includes(freq.id) && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/15 border border-green-500/50 rounded text-[10px] font-black text-green-400 font-mono">✓ PEER-REVIEWED</span>
        )}
        {EXPERIMENTAL_IDS.includes(freq.id) && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/15 border border-cyan-500/50 rounded text-[10px] font-black text-cyan-400 font-mono">🔬 EXPERIMENTAL</span>
        )}
        {TRADITIONAL_IDS.includes(freq.id) && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/15 border border-amber-500/50 rounded text-[10px] font-black text-amber-400 font-mono">◈ TRADITIONAL PRACTICE</span>
        )}
      </div>

      <p className="text-xl font-black" style={{ color: freq.color }}>
        {freq.name}
      </p>
      <p className="text-gray-500 text-sm font-mono mt-2">
        {freq.displayHz || (freq.hz ? `${freq.hz} Hz` : '')} {freq.isSweep ? '• sweep' : freq.isNotch ? '• notch filter' : `• ${freq.waveform}`}
      </p>
      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
        {freq.description}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <WaveformIcon waveform={freq.waveform} color={freq.color} />
        <span className="text-xs text-gray-500 font-mono uppercase">{freq.waveform}</span>
      </div>

      {freq.stackWith && freq.stackWith.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-[10px] text-gray-600 font-mono mb-1">STACK WITH:</p>
          <div className="flex flex-wrap gap-1">
            {freq.stackWith.map((stackId) => {
              const stackFreq = allFrequencies.find(f => f.id === stackId);
              return stackFreq ? (
                <div key={stackId} className="bg-white/5 px-2 py-0.5 rounded">
                  <p className="text-[9px] font-bold font-mono" style={{ color: stackFreq.color }}>
                    {stackFreq.name.split(' ')[0]}
                  </p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </motion.button>
  );
}