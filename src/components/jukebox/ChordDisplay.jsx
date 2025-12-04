import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ChordDisplay({ track, currentTime, isPlaying }) {
  const [chords, setChords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);

  // Load chords when track changes
  useEffect(() => {
    if (!track) {
      setChords([]);
      return;
    }

    const loadChords = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await base44.functions.invoke('analyzeChords', {
          trackTitle: track.title,
          artist: track.artist,
          duration: track.duration || 240
        });

        if (response.data?.success && response.data?.chords) {
          setChords(response.data.chords);
        } else {
          throw new Error('Failed to get chords');
        }
      } catch (err) {
        console.error('Chord loading error:', err);
        setError('Could not load chords. Try again.');
      } finally {
        setLoading(false);
      }
    };

    loadChords();
  }, [track?.id]);

  // Update current chord based on playback time
  useEffect(() => {
    if (!chords.length || !isPlaying) return;

    // Find the chord that should be showing now
    let index = 0;
    for (let i = chords.length - 1; i >= 0; i--) {
      if (currentTime >= chords[i].time) {
        index = i;
        break;
      }
    }
    setCurrentChordIndex(index);
  }, [currentTime, chords, isPlaying]);

  if (!track) return null;

  if (loading) {
    return (
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-orange-900/95 to-amber-900/95 backdrop-blur-xl border-4 border-orange-500 rounded-2xl p-8 text-center">
        <Loader2 className="w-12 h-12 text-orange-400 animate-spin mx-auto mb-4" />
        <p className="text-white font-black text-xl font-mono">Analyzing chords...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-red-900/95 to-orange-900/95 backdrop-blur-xl border-4 border-red-500 rounded-2xl p-6 text-center">
        <p className="text-white font-bold">{error}</p>
      </div>
    );
  }

  if (!chords.length) return null;

  const currentChord = chords[currentChordIndex];
  const upcomingChords = chords.slice(currentChordIndex + 1, currentChordIndex + 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full px-4"
    >
      <div className="bg-gradient-to-r from-orange-900/95 to-amber-900/95 backdrop-blur-xl border-4 border-orange-500 rounded-2xl p-6 shadow-2xl">
        
        {/* Current Section */}
        <div className="text-center mb-4">
          <p className="text-orange-300 font-mono text-sm mb-1">{currentChord.section}</p>
        </div>

        {/* Current Chord - BIG */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChordIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-6"
          >
            <div className="text-8xl font-black text-white font-mono mb-2">
              {currentChord.chord}
            </div>
            <div className="flex items-center justify-center gap-2 text-orange-300">
              <Music className="w-4 h-4" />
              <span className="font-mono text-sm">
                {Math.floor(currentChord.time / 60)}:{String(Math.floor(currentChord.time % 60)).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Upcoming Chords */}
        {upcomingChords.length > 0 && (
          <div className="border-t-2 border-orange-500/30 pt-4">
            <p className="text-orange-300 text-xs font-mono mb-2 text-center">COMING UP:</p>
            <div className="flex gap-3 justify-center">
              {upcomingChords.map((chord, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-black text-orange-200 font-mono">
                    {chord.chord}
                  </div>
                  <div className="text-xs text-orange-400 font-mono">
                    {Math.floor(chord.time / 60)}:{String(Math.floor(chord.time % 60)).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-4 bg-black/30 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-400"
            style={{
              width: `${((currentChordIndex + 1) / chords.length) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-center text-xs text-orange-300 mt-2 font-mono">
          Chord {currentChordIndex + 1} of {chords.length}
        </p>
      </div>
    </motion.div>
  );
}