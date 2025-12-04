
import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useParams, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Loader2, Play, Pause, Rewind, FastForward, ArrowLeft, BrainCircuit, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuantumVisualizer from '@/components/jukebox/QuantumVisualizer';

export default function Listen() {
  const { id } = useParams();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: track, isLoading, error } = useQuery({
    queryKey: ['soundtrack', id],
    queryFn: () => base44.entities.Soundtrack.get(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, track]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="w-16 h-16 animate-spin text-purple-400" />
        <p className="ml-4 text-2xl">Tuning In...</p>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-center p-6">
        <div>
          <h1 className="text-3xl text-red-500 mb-4">Frequency Not Found</h1>
          <p className="text-gray-400 mb-8">The sacred frequency you're trying to reach is beyond our current perception.</p>
          <Link to={createPageUrl('QuantumJukebox')}>
            <Button className="bg-purple-600 hover:bg-purple-700">Return to the Jukebox</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <QuantumVisualizer audioRef={audioRef} isPlaying={isPlaying} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/90 z-10">
        <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to={createPageUrl('QuantumJukebox')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Jukebox
            </Link>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.img 
              src={track.cover_art_url} 
              alt={track.title}
              className="w-48 h-48 md:w-64 md:h-64 rounded-2xl shadow-2xl shadow-purple-500/30 object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            />
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{track.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-2">by {track.artist}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-6">
              <button className="text-gray-400 hover:text-white transition-colors"><Rewind className="w-8 h-8" /></button>
              <button 
                onClick={togglePlay}
                className="w-24 h-24 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-12 h-12 text-white" /> : <Play className="w-12 h-12 text-white ml-2" />}
              </button>
              <button className="text-gray-400 hover:text-white transition-colors"><FastForward className="w-8 h-8" /></button>
            </div>
          </motion.div>

          {/* THE NEW TEMPLE SECTIONS */}
          <motion.div 
            className="space-y-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {track.description && (
              <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3 mb-3">
                  <BrainCircuit className="w-7 h-7" />
                  The Frequency's Purpose
                </h2>
                <p className="text-gray-300 leading-relaxed">{track.description}</p>
              </div>
            )}

            {track.artist_story && (
              <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-pink-400 flex items-center gap-3 mb-3">
                  <Heart className="w-7 h-7" />
                  The Artist's Story
                </h2>
                <p className="text-gray-300 leading-relaxed">{track.artist_story}</p>
              </div>
            )}
          </motion.div>

          <audio ref={audioRef} src={track.file_url} crossOrigin="anonymous" onEnded={() => setIsPlaying(false)} />
        </div>
      </div>
    </div>
  );
}
