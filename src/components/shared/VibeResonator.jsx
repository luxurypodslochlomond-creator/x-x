import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Waves, Zap, Heart, Sun, Star, Sparkles } from 'lucide-react';

const VIBE_FREQUENCIES = {
  peaceful: { color: 'from-blue-400 to-cyan-500', icon: Waves, emoji: '🌊', description: 'Ocean Soul Frequency' },
  energetic: { color: 'from-orange-400 to-red-500', icon: Zap, emoji: '⚡', description: 'Lightning Bolt Energy' },
  loving: { color: 'from-pink-400 to-rose-500', icon: Heart, emoji: '❤️', description: 'Pure Love Vibration' },
  creative: { color: 'from-purple-400 to-indigo-500', icon: Sparkles, emoji: '✨', description: 'Cosmic Creation Mode' },
  uplifting: { color: 'from-yellow-400 to-orange-400', icon: Sun, emoji: '☀️', description: 'Solar Power Frequency' },
  magical: { color: 'from-violet-400 to-purple-500', icon: Star, emoji: '🌟', description: 'Quantum Magic Resonance' }
};

export default function VibeResonator({ currentTrack, userEnergy }) {
  const [dominantVibe, setDominantVibe] = useState('creative');
  const [vibeIntensity, setVibeIntensity] = useState(75);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // QUANTUM VIBE DETECTION - based on music, time, user energy
    const detectVibe = () => {
      const hour = new Date().getHours();
      const trackTitle = currentTrack?.title?.toLowerCase() || '';
      
      let detectedVibe = 'creative'; // default COOLASFUCK frequency
      let intensity = Math.random() * 50 + 50; // 50-100% intensity

      // TIME-BASED VIBE DETECTION
      if (hour >= 6 && hour < 12) detectedVibe = 'uplifting'; // Morning energy
      else if (hour >= 12 && hour < 18) detectedVibe = 'energetic'; // Afternoon power
      else if (hour >= 18 && hour < 22) detectedVibe = 'loving'; // Evening love
      else detectedVibe = 'magical'; // Night magic

      // MUSIC-BASED VIBE ENHANCEMENT
      if (trackTitle.includes('love') || trackTitle.includes('heart')) detectedVibe = 'loving';
      else if (trackTitle.includes('energy') || trackTitle.includes('power')) detectedVibe = 'energetic';
      else if (trackTitle.includes('peace') || trackTitle.includes('calm')) detectedVibe = 'peaceful';
      else if (trackTitle.includes('create') || trackTitle.includes('art')) detectedVibe = 'creative';

      // HOUSE MUSIC = AUTOMATIC HIGH ENERGY
      if (trackTitle.includes('house') || trackTitle.includes('club')) {
        detectedVibe = 'energetic';
        intensity = Math.min(100, intensity + 30);
      }

      setDominantVibe(detectedVibe);
      setVibeIntensity(intensity);
    };

    detectVibe();
    const interval = setInterval(detectVibe, 15000); // Re-detect every 15 seconds
    return () => clearInterval(interval);
  }, [currentTrack]);

  useEffect(() => {
    // Generate floating vibe particles
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 2 + 1
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, [dominantVibe]);

  const currentVibeData = VIBE_FREQUENCIES[dominantVibe];
  const VibeIcon = currentVibeData.icon;

  return (
    <div className="relative w-full h-32 rounded-3xl overflow-hidden border border-white/10">
      {/* Dynamic Gradient Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${currentVibeData.color} opacity-60`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, particle.speed * 5, 0],
            scale: [1, particle.size, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Central Vibe Display */}
      <div className="relative z-10 h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-4xl"
          >
            {currentVibeData.emoji}
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">{currentVibeData.description}</h3>
            <p className="text-white/80 text-sm">Frequency: {Math.round(vibeIntensity)}% Pure</p>
          </div>
        </div>

        {/* Intensity Bars */}
        <div className="flex items-end gap-1 h-16">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-white/60 rounded-full"
              animate={{
                height: vibeIntensity > (i + 1) * 12 ? `${20 + i * 5}px` : '8px',
                opacity: vibeIntensity > (i + 1) * 12 ? 0.9 : 0.3
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Frequency Text */}
      <div className="absolute bottom-2 right-4 text-xs text-white/60 font-mono">
        VIBEVIBE51.GMT
      </div>
    </div>
  );
}