import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Soundtrack } from '@/entities/Soundtrack';
import { User } from '@/entities/User';
import { motion } from 'framer-motion';
import { Waves, Heart, Zap, Brain, Sparkles, Volume2 } from 'lucide-react';

export default function SoulRecalibration() {
  const [currentState, setCurrentState] = useState('uncertain');
  const [tracks, setTracks] = useState([]);
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    loadUser();
    loadTracks();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.log("User not loaded");
    }
  };

  const loadTracks = async () => {
    const allTracks = await Soundtrack.list('sequence');
    setTracks(allTracks);
  };

  const soulStates = [
    {
      id: 'off_frequency',
      name: 'Off Frequency',
      description: 'Your brain is fucked. You need recalibration.',
      icon: Waves,
      color: 'from-red-900/80 to-orange-900/80',
      prescription: 'Marvin Gaye - What\'s Going On',
      hz: 432
    },
    {
      id: 'creating',
      name: 'Creating',
      description: 'You\'re building something COOLASFUCK.',
      icon: Sparkles,
      color: 'from-purple-900/80 to-pink-900/80',
      prescription: 'House Music - Shed Frequency',
      hz: 528
    },
    {
      id: 'healing',
      name: 'Healing',
      description: 'Your soul needs medicine.',
      icon: Heart,
      color: 'from-green-900/80 to-teal-900/80',
      prescription: 'Donny Hathaway - A Song For You',
      hz: 528
    },
    {
      id: 'focused',
      name: 'Focused',
      description: 'Deep work. Pure flow.',
      icon: Brain,
      color: 'from-blue-900/80 to-indigo-900/80',
      prescription: 'Moodymann - The Day We Lost The Soul',
      hz: 741
    },
    {
      id: 'revolutionary',
      name: 'Revolutionary',
      description: 'You\'re ready to change the world.',
      icon: Zap,
      color: 'from-yellow-900/80 to-red-900/80',
      prescription: 'Massive Attack - Teardrop',
      hz: 963
    }
  ];

  const selectedState = soulStates.find(s => s.id === currentState) || soulStates[0];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Volume2 className="w-16 h-16 text-purple-400 mx-auto" />
          </motion.div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            SOUL RECALIBRATION CHAMBER
          </h1>
          <p className="text-xl text-gray-300">
            From the Stoneymollan Shed. Real frequencies. Real healing.
          </p>
        </div>

        {/* Current State Selector */}
        <Card className="bg-gradient-to-r from-black via-purple-950 to-black border-purple-500/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-purple-300 mb-6">What's your current state?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {soulStates.map((state) => (
                <motion.button
                  key={state.id}
                  onClick={() => setCurrentState(state.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    currentState === state.id
                      ? 'border-purple-400 bg-gradient-to-br ' + state.color
                      : 'border-gray-700 bg-gray-900/50'
                  }`}
                >
                  <state.icon className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                  <h3 className="font-bold text-white mb-2">{state.name}</h3>
                  <p className="text-sm text-gray-400">{state.description}</p>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prescription */}
        <Card className={`bg-gradient-to-br ${selectedState.color} border-2 border-purple-400/50`}>
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <selectedState.icon className="w-16 h-16 mx-auto text-white" />
              <h2 className="text-3xl font-black text-white">YOUR PRESCRIPTION</h2>
              <div className="text-6xl font-black text-white my-6">
                {selectedState.hz} Hz
              </div>
              <p className="text-2xl text-white font-bold">
                {selectedState.prescription}
              </p>
              <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                This frequency will recalibrate your soul. Put it on. Let it work. Trust the process.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The Real Tracks */}
        <Card className="bg-gray-900/50 border-cyan-500/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              THE SHED CATALOG
            </h2>
            <p className="text-gray-300 mb-6">
              Every track here is chosen for its healing power. This isn't a playlist. It's medicine.
            </p>
            
            {tracks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">The catalog is being built. Check back soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="p-4 bg-black/40 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-white">{track.title}</h3>
                        <p className="text-sm text-gray-400">{track.artist}</p>
                        <p className="text-xs text-purple-300 mt-1">{track.frequency_type}</p>
                      </div>
                      <div className="text-cyan-400 font-mono text-sm">
                        {track.soul_frequency_hz ? `${track.soul_frequency_hz} Hz` : 'Sacred'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* The Protocol */}
        <Card className="bg-gradient-to-r from-black via-green-950 to-black border-green-500/30">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-green-300 mb-4">THE PROTOCOL</h2>
            <div className="space-y-3 text-gray-300">
              <p>1. <strong className="text-white">Identify your state.</strong> Be honest.</p>
              <p>2. <strong className="text-white">Take the prescription.</strong> Put the track on.</p>
              <p>3. <strong className="text-white">Don't multitask.</strong> Just listen. Let it work.</p>
              <p>4. <strong className="text-white">Trust the frequency.</strong> It knows what you need.</p>
              <p>5. <strong className="text-white">Come back whenever you're off.</strong> This chamber is always open.</p>
            </div>
          </CardContent>
        </Card>

        {/* The Truth */}
        <div className="text-center space-y-4 py-8 border-t border-gray-800">
          <p className="text-2xl font-bold text-purple-300">
            THIS IS NOT A GIMMICK.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Every frequency here has been tested in the Stoneymollan shed. 
            Every track has proven healing power. This is real medicine.
          </p>
          <p className="text-sm text-gray-500 font-mono">
            Built with love. From Scotland. For the Universe.
          </p>
        </div>

      </div>
    </div>
  );
}