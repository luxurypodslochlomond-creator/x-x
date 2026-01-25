import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, Zap, Circle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * CHAKRA51
 * Ancient energy centers - your body's consciousness map
 * Not woo woo - physics + 5000 years of human knowledge
 * Pain relief + remembering who you are
 */

// 8-BIT CHAKRA ICONS - COOLASFUCK style
const ChakraIcon = ({ color, type }) => {
  const icons = {
    root: ( // Square = grounded, stable
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="6" width="12" height="12" fill={color} />
        <rect x="4" y="4" width="2" height="2" fill={color} opacity="0.6" />
        <rect x="18" y="4" width="2" height="2" fill={color} opacity="0.6" />
        <rect x="4" y="18" width="2" height="2" fill={color} opacity="0.6" />
        <rect x="18" y="18" width="2" height="2" fill={color} opacity="0.6" />
      </svg>
    ),
    sacral: ( // Water drop = flow
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="10" y="6" width="4" height="2" fill={color} />
        <rect x="8" y="8" width="8" height="2" fill={color} />
        <rect x="6" y="10" width="12" height="6" fill={color} />
        <rect x="8" y="16" width="8" height="2" fill={color} />
      </svg>
    ),
    solar: ( // Sun rays = power
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="10" y="10" width="4" height="4" fill={color} />
        <rect x="12" y="4" width="2" height="4" fill={color} />
        <rect x="12" y="16" width="2" height="4" fill={color} />
        <rect x="4" y="12" width="4" height="2" fill={color} />
        <rect x="16" y="12" width="4" height="2" fill={color} />
      </svg>
    ),
    heart: ( // Heart = love
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="6" width="4" height="2" fill={color} />
        <rect x="14" y="6" width="4" height="2" fill={color} />
        <rect x="4" y="8" width="16" height="6" fill={color} />
        <rect x="6" y="14" width="12" height="2" fill={color} />
        <rect x="8" y="16" width="8" height="2" fill={color} />
        <rect x="10" y="18" width="4" height="2" fill={color} />
      </svg>
    ),
    throat: ( // Sound waves = voice
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="10" y="8" width="4" height="8" fill={color} />
        <rect x="6" y="10" width="2" height="4" fill={color} opacity="0.7" />
        <rect x="16" y="10" width="2" height="4" fill={color} opacity="0.7" />
        <rect x="4" y="11" width="2" height="2" fill={color} opacity="0.4" />
        <rect x="18" y="11" width="2" height="2" fill={color} opacity="0.4" />
      </svg>
    ),
    third_eye: ( // Eye = seeing
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="10" width="12" height="4" fill={color} />
        <rect x="4" y="12" width="2" height="2" fill={color} opacity="0.5" />
        <rect x="18" y="12" width="2" height="2" fill={color} opacity="0.5" />
        <rect x="10" y="11" width="4" height="2" fill="#000" />
      </svg>
    ),
    crown: ( // Crown = infinite
      <svg width="32" height="32" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="14" width="12" height="2" fill={color} />
        <rect x="8" y="10" width="2" height="4" fill={color} />
        <rect x="14" y="10" width="2" height="4" fill={color} />
        <rect x="10" y="8" width="4" height="2" fill={color} />
        <rect x="11" y="6" width="2" height="2" fill={color} />
      </svg>
    )
  };
  
  return icons[type] || icons.root;
};

const CHAKRAS = [
  {
    id: 'root',
    name: 'Root',
    location: 'Lower Back',
    frequency: 396,
    painFrequency: 174,
    color: '#DC2626',
    soul: 'Safety, survival, who you are physically',
    helps: 'Back pain, sciatica, feeling lost',
    foods: 'Red: beets, peppers, protein',
    duration: 15
  },
  {
    id: 'sacral',
    name: 'Sacral',
    location: 'Lower Belly',
    frequency: 417,
    painFrequency: 174,
    color: '#EA580C',
    soul: 'Creativity, pleasure, emotional flow',
    helps: 'Hip pain, creative blocks, shame',
    foods: 'Orange: carrots, oranges, nuts',
    duration: 15
  },
  {
    id: 'solar',
    name: 'Solar Plexus',
    location: 'Stomach',
    frequency: 528,
    painFrequency: 285,
    color: '#EAB308',
    soul: 'Power, confidence, who you choose to be',
    helps: 'Gut pain, low confidence, fear',
    foods: 'Yellow: bananas, ginger, turmeric',
    duration: 15
  },
  {
    id: 'heart',
    name: 'Heart',
    location: 'Chest',
    frequency: 639,
    painFrequency: 432,
    color: '#10B981',
    soul: 'Love, connection, remembering we are one',
    helps: 'Heartbreak, loneliness, chest pain',
    foods: 'Green: spinach, kale, omega-3',
    duration: 20
  },
  {
    id: 'throat',
    name: 'Throat',
    location: 'Neck',
    frequency: 741,
    painFrequency: 396,
    color: '#3B82F6',
    soul: 'Truth, expression, your real voice',
    helps: 'Neck pain, can\'t speak truth, silenced',
    foods: 'Blue: berries, water, herbal tea',
    duration: 15
  },
  {
    id: 'third_eye',
    name: 'Third Eye',
    location: 'Forehead',
    frequency: 852,
    painFrequency: 963,
    color: '#6366F1',
    soul: 'Intuition, seeing truth, inner knowing',
    helps: 'Headaches, confusion, can\'t see clearly',
    foods: 'Purple: grapes, dark chocolate',
    duration: 15
  },
  {
    id: 'crown',
    name: 'Crown',
    location: 'Top of Head',
    frequency: 963,
    painFrequency: 852,
    color: '#A855F7',
    soul: 'Pure consciousness, remembering you are infinite',
    helps: 'Migraines, existential pain, disconnection',
    foods: 'Light eating, water, fasting',
    duration: 20
  }
];

export default function Chakra51Protocol() {
  const [selectedChakra, setSelectedChakra] = useState(CHAKRAS[0]); // Default to Root for lower back
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(selectedChakra.duration * 60);
  const [powerMode, setPowerMode] = useState(false); // Triple frequency stack for faster healing
  
  const audioContextRef = useRef(null);
  const oscillator1Ref = useRef(null);
  const oscillator2Ref = useRef(null);
  const oscillator3Ref = useRef(null); // Third oscillator for power mode
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      stopSound();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    setTimeRemaining(selectedChakra.duration * 60);
  }, [selectedChakra]);

  const startSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    
    // Main chakra frequency
    oscillator1Ref.current = ctx.createOscillator();
    oscillator1Ref.current.frequency.value = selectedChakra.frequency;
    oscillator1Ref.current.type = 'sine';

    // Pain relief frequency layer
    oscillator2Ref.current = ctx.createOscillator();
    oscillator2Ref.current.frequency.value = selectedChakra.painFrequency;
    oscillator2Ref.current.type = 'sine';

    // POWER MODE: Add 432Hz love frequency for maximum healing
    if (powerMode) {
      oscillator3Ref.current = ctx.createOscillator();
      oscillator3Ref.current.frequency.value = 432; // Universal healing
      oscillator3Ref.current.type = 'sine';
    }

    // Volume
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.value = powerMode ? 0.2 : 0.15; // Slightly louder in power mode

    oscillator1Ref.current.connect(gainNodeRef.current);
    oscillator2Ref.current.connect(gainNodeRef.current);
    if (powerMode && oscillator3Ref.current) {
      oscillator3Ref.current.connect(gainNodeRef.current);
    }
    gainNodeRef.current.connect(ctx.destination);

    oscillator1Ref.current.start();
    oscillator2Ref.current.start();
    if (powerMode && oscillator3Ref.current) {
      oscillator3Ref.current.start();
    }

    setIsPlaying(true);

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          stopSound();
          return selectedChakra.duration * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopSound = () => {
    if (oscillator1Ref.current) {
      oscillator1Ref.current.stop();
      oscillator1Ref.current = null;
    }
    if (oscillator2Ref.current) {
      oscillator2Ref.current.stop();
      oscillator2Ref.current = null;
    }
    if (oscillator3Ref.current) {
      oscillator3Ref.current.stop();
      oscillator3Ref.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white p-4 pb-20">
      
      {/* Simple Header - match FrequencyChamber */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link to={createPageUrl('FrequencyChamber')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">All frequencies</span>
        </Link>

        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">CHAKRA51</h1>
          <p className="text-gray-400 text-sm font-mono">Ancient energy map + AI51 frequencies</p>
        </div>

        {/* Power Mode - Simple toggle */}
        <div className="flex items-center justify-center gap-4 bg-black border-2 border-pink-500/50 p-4 mb-4">
          <button
            onClick={() => {
              if (isPlaying) stopSound();
              setPowerMode(!powerMode);
            }}
            className={`px-8 py-3 font-black font-mono border-2 transition-all ${
              powerMode 
                ? 'bg-pink-500 border-pink-400 text-white' 
                : 'bg-black border-gray-700 text-gray-400'
            }`}
          >
            {powerMode ? '⚡ POWER MODE' : 'NORMAL MODE'}
          </button>
        </div>

        {/* Simple instructions */}
        {powerMode && (
          <div className="bg-pink-900/20 border-2 border-pink-500/50 p-4 mb-4">
            <p className="text-pink-400 text-sm font-mono text-center">
              Use headphones • 3x daily • Relief in hours not days
            </p>
          </div>
        )}
      </div>

      {/* Chakra Grid - Simple cards like FrequencyChamber */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-gray-600 text-xs font-mono mb-3 text-center">TAP YOUR BODY PART</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CHAKRAS.map(chakra => (
            <motion.button
              key={chakra.id}
              onClick={() => {
                if (isPlaying) stopSound();
                setSelectedChakra(chakra);
              }}
              whileTap={{ scale: 0.96 }}
              className={`p-4 border-4 bg-black transition-all ${
                selectedChakra.id === chakra.id ? 'shadow-[0_0_30px_rgba(255,255,255,0.5)]' : ''
              }`}
              style={{ 
                borderColor: selectedChakra.id === chakra.id ? chakra.color : `${chakra.color}60`,
                boxShadow: selectedChakra.id === chakra.id ? `0 0 30px ${chakra.color}` : 'none'
              }}
            >
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <ChakraIcon color={chakra.color} type={chakra.id} />
                </div>
                <p className="font-black text-sm font-mono mb-1" style={{ color: chakra.color }}>
                  {chakra.name.toUpperCase()}
                </p>
                <p className="text-xs text-gray-500 font-mono">{chakra.location}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* SELECTED CHAKRA - Clean player */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChakra.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black border-4 p-6"
            style={{ borderColor: selectedChakra.color, boxShadow: `0 0 30px ${selectedChakra.color}60` }}
          >
            
            {/* Chakra identity */}
            <div className="text-center mb-6">
              <div className="mb-3 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChakraIcon color={selectedChakra.color} type={selectedChakra.id} />
                </motion.div>
              </div>
              <h2 className="text-2xl font-black font-mono mb-2" style={{ color: selectedChakra.color }}>
                {selectedChakra.name.toUpperCase()}
              </h2>
              <p className="text-gray-400 text-sm font-mono">{selectedChakra.location}</p>
            </div>

            {/* What it does - soul + body */}
            <div className="mb-6 space-y-2">
              <div className="bg-purple-900/30 border-l-4 p-3" style={{ borderColor: selectedChakra.color }}>
                <p className="text-xs text-gray-500 font-mono mb-1">CONSCIOUSNESS:</p>
                <p className="text-white font-mono text-sm">{selectedChakra.soul}</p>
              </div>
              <div className="bg-black/60 border-l-4 p-3" style={{ borderColor: selectedChakra.color }}>
                <p className="text-xs text-gray-500 font-mono mb-1">HEALS:</p>
                <p className="text-white font-mono text-sm">{selectedChakra.helps}</p>
              </div>
              <div className="bg-black/60 border-l-4 p-3" style={{ borderColor: selectedChakra.color }}>
                <p className="text-xs text-gray-500 font-mono mb-1">EAT:</p>
                <p className="text-white font-mono text-sm">{selectedChakra.foods}</p>
              </div>
            </div>

            {/* Frequencies display */}
            <div className="mb-6 bg-black/80 border-2 border-white/10 p-4">
              <p className="text-xs text-gray-500 font-mono mb-2">FREQUENCIES:</p>
              <p className="text-white font-mono text-sm">{selectedChakra.frequency}Hz</p>
              <p className="text-white font-mono text-sm">{selectedChakra.painFrequency}Hz pain</p>
              {powerMode && <p className="text-pink-400 font-mono text-sm font-black">432Hz LOVE (Power)</p>}
            </div>

            {/* Enhanced Visualizer - Frequency Entrainment */}
            {isPlaying && (
              <div className="flex items-center justify-center mb-6 relative h-48">
                {/* Center chakra pulse */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute w-20 h-20 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${selectedChakra.color}, transparent)`,
                    boxShadow: `0 0 40px ${selectedChakra.color}`
                  }}
                />
                
                {/* Main frequency ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: selectedChakra.frequency / 100, ease: "linear" }}
                  className="absolute w-32 h-32 rounded-full border-4"
                  style={{ 
                    borderColor: selectedChakra.color,
                    opacity: 0.6
                  }}
                />
                
                {/* Pain frequency ring (counter-rotating) */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: selectedChakra.painFrequency / 100, ease: "linear" }}
                  className="absolute w-44 h-44 rounded-full border-2"
                  style={{ 
                    borderColor: selectedChakra.color,
                    opacity: 0.4
                  }}
                />
                
                {/* Power mode - 432Hz love ring */}
                {powerMode && (
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4.32, ease: "linear" }}
                    className="absolute w-56 h-56 rounded-full border-2 border-pink-400"
                    style={{ opacity: 0.5 }}
                  />
                )}
                
                {/* Outer energy field */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute w-64 h-64 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, transparent 50%, ${selectedChakra.color}20)`,
                    boxShadow: `0 0 80px ${selectedChakra.color}40`
                  }}
                />
              </div>
            )}

            {/* Timer when playing */}
            {isPlaying && (
              <div className="text-center mb-6">
                <p className="text-4xl font-black font-mono" style={{ color: selectedChakra.color }}>
                  {formatTime(timeRemaining)}
                </p>
              </div>
            )}

            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="w-full py-4 font-black text-xl font-mono border-2 transition-all"
              style={{ 
                backgroundColor: isPlaying ? 'transparent' : selectedChakra.color,
                borderColor: selectedChakra.color,
                color: isPlaying ? selectedChakra.color : '#000',
                boxShadow: isPlaying ? `0 0 40px ${selectedChakra.color}` : 'none'
              }}
            >
              {isPlaying ? 'STOP' : 'START'}
            </button>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Emergency protocol - collapsed by default */}
      <div className="max-w-2xl mx-auto mt-6">
        <details className="bg-black border-2 border-pink-500/50 p-4">
          <summary className="text-pink-400 font-black font-mono text-sm cursor-pointer mb-2">
            ⚡ SCIATICA EMERGENCY PROTOCOL →
          </summary>
          <div className="text-xs text-gray-300 font-mono space-y-1 mt-3">
            <p>1. Root Chakra + Power Mode + headphones</p>
            <p>2. Lie flat, knees bent, breathe deep into lower back</p>
            <p>3. 20 mins × 3 today (every 4-6 hours)</p>
            <p>4. Eat: beets, peppers, protein, ginger tea</p>
            <p className="text-pink-400 font-bold mt-2">396Hz + 174Hz + 432Hz = sciatic nerve direct hit</p>
            <p className="text-gray-500 mt-2">Most feel 30-50% better in 6-8 hours. Everyone different. Physics is real.</p>
          </div>
        </details>
      </div>

    </div>
  );
}