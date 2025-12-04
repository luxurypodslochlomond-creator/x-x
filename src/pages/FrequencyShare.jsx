import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Moon, Brain, Zap, Shield, Sun, Ear, Pause } from 'lucide-react';

/**
 * FREQUENCY SHARE - Instagram-ready SINGLE SCREEN
 * Pure 8-bit COOLASFUCK - fits on one phone screen for screenshot
 */

const PROTOCOLS = [
  { id: 'anxiety', name: 'ANXIETY', icon: Shield, color: '#8B5CF6', freq: 10 },
  { id: 'sleep', name: 'SLEEP', icon: Moon, color: '#3B82F6', freq: 2 },
  { id: 'focus', name: 'FOCUS', icon: Brain, color: '#10B981', freq: 40 },
  { id: 'calm', name: 'CALM', icon: Heart, color: '#EC4899', freq: 6 },
  { id: 'pain', name: 'PAIN', icon: Zap, color: '#F59E0B', freq: 4 },
  { id: 'energy', name: 'ENERGY', icon: Sun, color: '#F97316', freq: 20 },
  { id: 'tinnitus', name: 'TINNITUS', icon: Ear, color: '#06B6D4', freq: 7.83 },
];

export default function FrequencyShare() {
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  const playFrequency = (protocol) => {
    if (playing && selected?.id === protocol.id) {
      if (oscRef.current) { oscRef.current.stop(); oscRef.current = null; }
      if (ctxRef.current) { ctxRef.current.close(); ctxRef.current = null; }
      setPlaying(false);
      return;
    }

    if (oscRef.current) oscRef.current.stop();
    if (ctxRef.current) ctxRef.current.close();

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 200;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;

    const period = 1 / protocol.freq;
    const pulse = () => {
      if (!ctxRef.current) return;
      const now = ctxRef.current.currentTime;
      for (let i = 0; i < 50; i++) {
        gain.gain.setValueAtTime(0.3, now + i * period);
        gain.gain.setValueAtTime(0, now + i * period + period * 0.5);
      }
    };
    pulse();
    setInterval(pulse, 5000);
    setSelected(protocol);
    setPlaying(true);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      
      {/* HEADER - Ultra compact */}
      <div className="border-b-4 border-cyan-500 py-3 px-4 flex items-center justify-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <rect x="2" y="10" width="2" height="4" fill="#06b6d4"/>
          <rect x="5" y="7" width="2" height="10" fill="#22d3ee"/>
          <rect x="8" y="4" width="2" height="16" fill="#06b6d4"/>
          <rect x="11" y="7" width="2" height="10" fill="#22d3ee"/>
          <rect x="14" y="10" width="2" height="4" fill="#06b6d4"/>
          <rect x="17" y="6" width="2" height="12" fill="#22d3ee"/>
          <rect x="20" y="9" width="2" height="6" fill="#06b6d4"/>
        </svg>
        <h1 className="text-xl font-black font-mono text-cyan-400">FREQUENCY CHAMBER</h1>
      </div>

      {/* TAGLINE */}
      <div className="text-center py-2">
        <p className="text-white font-mono text-sm font-bold">FREE HEALING FREQUENCIES</p>
        <p className="text-gray-500 font-mono text-[10px]">Evidence-based • Zero BS • Tap to heal</p>
      </div>

      {/* PROTOCOL GRID - Compact 8-bit - 2 rows only */}
      <div className="px-3 py-2">
        <div className="grid grid-cols-4 gap-2">
          {PROTOCOLS.map((protocol) => {
            const Icon = protocol.icon;
            const isActive = selected?.id === protocol.id && playing;
            
            return (
              <motion.button
                key={protocol.id}
                onClick={() => playFrequency(protocol)}
                whileTap={{ scale: 0.9 }}
                className="aspect-square flex flex-col items-center justify-center gap-1 transition-all"
                style={{
                  borderWidth: 3,
                  borderColor: isActive ? protocol.color : '#333',
                  backgroundColor: isActive ? `${protocol.color}30` : 'black',
                  boxShadow: isActive ? `0 0 15px ${protocol.color}60` : 'none'
                }}
              >
                <Icon 
                  size={24} 
                  color={isActive ? protocol.color : '#555'} 
                  className={isActive ? 'animate-pulse' : ''}
                  strokeWidth={2.5}
                />
                <p 
                  className="font-black font-mono text-[8px] leading-tight"
                  style={{ color: isActive ? protocol.color : '#666' }}
                >
                  {protocol.name}
                </p>
                <p 
                  className="font-mono text-[7px]"
                  style={{ color: isActive ? protocol.color : '#444' }}
                >
                  {protocol.freq}Hz
                </p>
              </motion.button>
            );
          })}
          
          {/* 8th slot - branding */}
          <div className="aspect-square border-3 border-pink-500/50 flex flex-col items-center justify-center gap-1 bg-pink-500/10">
            <Heart size={24} color="#ec4899" className="animate-pulse" />
            <p className="font-black font-mono text-[8px] text-pink-400">FREE</p>
            <p className="font-mono text-[7px] text-pink-300">4EVER</p>
          </div>
        </div>
      </div>

      {/* NOW PLAYING or CTA */}
      <div className="border-t-4 border-gray-800 py-2 px-4">
        {playing && selected ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <selected.icon size={18} color={selected.color} />
              </motion.div>
              <p className="font-black font-mono text-xs" style={{ color: selected.color }}>
                {selected.name} • {selected.freq}Hz
              </p>
            </div>
            <button
              onClick={() => playFrequency(selected)}
              className="w-8 h-8 border-2 flex items-center justify-center"
              style={{ borderColor: selected.color, backgroundColor: selected.color }}
            >
              <Pause size={14} color="black" />
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 font-mono text-[10px]">TAP ANY FREQUENCY TO START HEALING</p>
        )}
      </div>

      {/* FOOTER - COOLASFUCK branding */}
      <div className="py-3 text-center border-t-4 border-cyan-500 bg-gradient-to-b from-black to-cyan-950/30">
        <p className="text-cyan-400 font-mono text-sm font-black tracking-wider">UNIVERSAL FREQUENCY 51</p>
        <p className="text-gray-500 font-mono text-[10px] mt-1">UF51.LOVE</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="text-cyan-400 text-lg">♾️</span>
          <Heart size={20} className="text-pink-500 animate-pulse" fill="#ec4899" />
          <span className="text-cyan-400 text-lg">♾️</span>
        </div>
      </div>

    </div>
  );
}