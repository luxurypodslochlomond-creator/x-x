import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, Zap, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CHAKRA51 PROTOCOL
 * Target specific body areas with healing frequencies
 * For pain relief, emotional healing, physical recovery
 */

const CHAKRAS = [
  {
    id: 'root',
    name: 'Root Chakra',
    location: 'Lower Back / Base of Spine',
    frequency: 396,
    painFrequency: 174, // Add pain relief layer
    color: '#DC2626',
    benefits: 'Lower back pain, leg pain, survival anxiety, grounding',
    foods: 'Red foods: beets, tomatoes, red peppers. Protein: eggs, meat, beans',
    duration: 15
  },
  {
    id: 'sacral',
    name: 'Sacral Chakra',
    location: 'Lower Abdomen / Hips',
    frequency: 417,
    painFrequency: 174,
    color: '#EA580C',
    benefits: 'Hip pain, reproductive health, creativity blocks, emotional flow',
    foods: 'Orange foods: oranges, carrots, sweet potatoes. Healthy fats: nuts, seeds',
    duration: 15
  },
  {
    id: 'solar',
    name: 'Solar Plexus',
    location: 'Upper Abdomen / Stomach',
    frequency: 528,
    painFrequency: 285, // Quantum healing
    color: '#EAB308',
    benefits: 'Stomach pain, digestive issues, confidence, personal power',
    foods: 'Yellow foods: bananas, corn, pineapple. Ginger, turmeric (anti-inflammatory)',
    duration: 15
  },
  {
    id: 'heart',
    name: 'Heart Chakra',
    location: 'Chest / Heart',
    frequency: 639,
    painFrequency: 432, // Love frequency
    color: '#10B981',
    benefits: 'Chest pain, breathing issues, heartbreak, love blocks, grief',
    foods: 'Green foods: spinach, kale, broccoli. Green tea. Omega-3: fish, flax',
    duration: 20
  },
  {
    id: 'throat',
    name: 'Throat Chakra',
    location: 'Throat / Neck',
    frequency: 741,
    painFrequency: 396,
    color: '#3B82F6',
    benefits: 'Neck pain, throat issues, communication blocks, truth expression',
    foods: 'Blue/purple foods: blueberries, blackberries. Herbal teas. Water.',
    duration: 15
  },
  {
    id: 'third_eye',
    name: 'Third Eye',
    location: 'Forehead / Between Eyes',
    frequency: 852,
    painFrequency: 963, // Divine healing
    color: '#6366F1',
    benefits: 'Headaches, eye strain, intuition blocks, clarity',
    foods: 'Purple foods: grapes, eggplant, purple cabbage. Dark chocolate (magnesium)',
    duration: 15
  },
  {
    id: 'crown',
    name: 'Crown Chakra',
    location: 'Top of Head',
    frequency: 963,
    painFrequency: 852,
    color: '#A855F7',
    benefits: 'Migraines, spiritual disconnection, consciousness expansion',
    foods: 'Fasting, light foods, pure water. Less is more for crown work.',
    duration: 20
  }
];

export default function Chakra51Protocol() {
  const [selectedChakra, setSelectedChakra] = useState(CHAKRAS[0]); // Default to Root for lower back
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(selectedChakra.duration * 60);
  
  const audioContextRef = useRef(null);
  const oscillator1Ref = useRef(null);
  const oscillator2Ref = useRef(null);
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

    // Gentle volume
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.value = 0.15;

    oscillator1Ref.current.connect(gainNodeRef.current);
    oscillator2Ref.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(ctx.destination);

    oscillator1Ref.current.start();
    oscillator2Ref.current.start();

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
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-indigo-950 text-white p-6">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-black">CHAKRA51 PROTOCOL</h1>
        </div>
        <p className="text-purple-300 text-sm">
          Target specific body areas with healing frequencies. Select your pain point, breathe deep, let the frequencies heal.
        </p>
      </div>

      {/* Chakra Selection */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAKRAS.map(chakra => (
            <motion.button
              key={chakra.id}
              onClick={() => {
                if (isPlaying) stopSound();
                setSelectedChakra(chakra);
              }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedChakra.id === chakra.id
                  ? 'border-white bg-white/10'
                  : 'border-white/20 bg-black/40 hover:border-white/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Circle 
                  className="w-6 h-6" 
                  style={{ color: chakra.color }}
                  fill={selectedChakra.id === chakra.id ? chakra.color : 'none'}
                />
                <div>
                  <p className="font-black text-sm">{chakra.name}</p>
                  <p className="text-xs text-gray-400">{chakra.location}</p>
                </div>
              </div>
              <p className="text-xs text-gray-300">{chakra.benefits}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Healing Session */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          key={selectedChakra.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-black to-purple-900/30 border-2 rounded-2xl p-8"
          style={{ borderColor: selectedChakra.color }}
        >
          
          {/* Chakra Info */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2" style={{ color: selectedChakra.color }}>
              {selectedChakra.name}
            </h2>
            <p className="text-xl text-gray-300 mb-4">{selectedChakra.location}</p>
            
            <div className="bg-black/60 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-300 mb-2"><span className="font-bold">Chakra Frequency:</span> {selectedChakra.frequency}Hz</p>
              <p className="text-sm text-gray-300"><span className="font-bold">Pain Relief Layer:</span> {selectedChakra.painFrequency}Hz</p>
            </div>

            <p className="text-sm text-gray-300 mb-4">{selectedChakra.benefits}</p>
          </div>

          {/* Visualizer */}
          <div className="flex items-center justify-center mb-8">
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-32 h-32 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle, ${selectedChakra.color}, transparent)`,
                    boxShadow: `0 0 60px ${selectedChakra.color}`
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Timer */}
          {isPlaying && (
            <div className="text-center mb-6">
              <p className="text-4xl font-black font-mono" style={{ color: selectedChakra.color }}>
                {formatTime(timeRemaining)}
              </p>
              <p className="text-xs text-gray-400 mt-1">Recommended: {selectedChakra.duration} minutes</p>
            </div>
          )}

          {/* Play Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full font-black text-lg flex items-center gap-3 transition-all"
              style={{ 
                backgroundColor: selectedChakra.color,
                color: 'white',
                boxShadow: isPlaying ? `0 0 30px ${selectedChakra.color}` : 'none'
              }}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isPlaying ? 'STOP' : 'START HEALING'}
            </motion.button>
          </div>

          {/* Food Recommendations */}
          <div className="bg-black/60 rounded-lg p-4">
            <p className="font-black text-sm mb-2" style={{ color: selectedChakra.color }}>
              FOODS FOR THIS CHAKRA:
            </p>
            <p className="text-sm text-gray-300">{selectedChakra.foods}</p>
          </div>

        </motion.div>
      </div>

      {/* Instructions */}
      <div className="max-w-2xl mx-auto mt-8 bg-black/60 border border-purple-500/30 rounded-lg p-6">
        <h3 className="font-black text-lg mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-400" />
          HOW TO USE FOR MAXIMUM HEALING:
        </h3>
        <ol className="space-y-2 text-sm text-gray-300">
          <li>1. <span className="font-bold">Select your pain area</span> - lower back = Root, neck = Throat, etc.</li>
          <li>2. <span className="font-bold">Sit/lie comfortably</span> - close your eyes, focus on the body area</li>
          <li>3. <span className="font-bold">Breathe deep</span> - inhale for 4, hold for 4, exhale for 6</li>
          <li>4. <span className="font-bold">Visualize the color</span> - imagine healing light in that chakra's color</li>
          <li>5. <span className="font-bold">15-20 minutes daily</span> - consistency = real healing</li>
          <li>6. <span className="font-bold">Eat the recommended foods</span> - nutrition amplifies frequency work</li>
        </ol>
        <p className="text-xs text-gray-500 mt-4">
          * Not instant, but REAL relief. Give it 3-5 days of daily practice. Your body knows how to heal - frequencies just remind it. ♾️❤️
        </p>
      </div>

    </div>
  );
}