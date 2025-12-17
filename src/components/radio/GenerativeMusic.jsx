import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * GENERATIVE MUSIC PLAYER
 * Simple AI-created music using Web Audio API
 * 8-bit melodies + beats made from sine waves
 */

const SCALES = {
  minor: [0, 2, 3, 5, 7, 8, 10], // Natural minor
  major: [0, 2, 4, 5, 7, 9, 11], // Major
  pentatonic: [0, 2, 4, 7, 9], // Pentatonic
};

const GENRES = [
  { id: 'chill', name: 'Chill Vibes', bpm: 85, scale: 'minor', baseNote: 220 },
  { id: 'upbeat', name: '8-Bit Energy', bpm: 140, scale: 'pentatonic', baseNote: 440 },
  { id: 'ambient', name: 'Ambient Float', bpm: 60, scale: 'major', baseNote: 174 },
  { id: 'house', name: 'Simple House', bpm: 125, scale: 'minor', baseNote: 261.63 },
];

export default function GenerativeMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0]);
  const [volume, setVolume] = useState(0.3);
  
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const masterGainRef = useRef(null);
  const melodyIntervalRef = useRef(null);
  const bassIntervalRef = useRef(null);

  useEffect(() => {
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  const getFrequency = (scale, baseNote, degree) => {
    const scalePattern = SCALES[scale];
    const octave = Math.floor(degree / scalePattern.length);
    const note = scalePattern[degree % scalePattern.length];
    return baseNote * Math.pow(2, (octave * 12 + note) / 12);
  };

  const playNote = (ctx, frequency, duration, gainNode, type = 'sine') => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.value = frequency;
    
    // ADSR envelope
    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
    noteGain.gain.exponentialRampToValueAtTime(0.1, now + duration * 0.3); // Decay/Sustain
    noteGain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Release
    
    osc.connect(noteGain);
    noteGain.connect(gainNode);
    
    osc.start(now);
    osc.stop(now + duration);
    
    return osc;
  };

  const startMusic = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      ctxRef.current = ctx;
      
      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;
      
      const nodes = [];
      const genre = selectedGenre;
      const beatDuration = 60 / genre.bpm;
      
      // MELODY LINE
      let melodyDegree = 0;
      const melodyPattern = [0, 2, 3, 2, 5, 3, 2, 0]; // Simple pattern
      
      const playMelody = () => {
        const degree = melodyPattern[melodyDegree % melodyPattern.length];
        const freq = getFrequency(genre.scale, genre.baseNote * 2, degree);
        const note = playNote(ctx, freq, beatDuration * 0.8, masterGain, 'square');
        nodes.push(note);
        melodyDegree++;
      };
      
      melodyIntervalRef.current = setInterval(playMelody, beatDuration * 1000);
      
      // BASS LINE
      let bassDegree = 0;
      const bassPattern = [0, 0, 3, 3]; // Root and third
      
      const playBass = () => {
        const degree = bassPattern[bassDegree % bassPattern.length];
        const freq = getFrequency(genre.scale, genre.baseNote / 2, degree);
        const note = playNote(ctx, freq, beatDuration * 1.8, masterGain, 'sine');
        nodes.push(note);
        bassDegree++;
      };
      
      bassIntervalRef.current = setInterval(playBass, beatDuration * 2000);
      
      // KICK DRUM (simple)
      let kickBeat = 0;
      const kickPattern = [1, 0, 0, 0, 1, 0, 0, 0]; // Four-on-floor
      
      const playKick = () => {
        if (kickPattern[kickBeat % kickPattern.length]) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.frequency.setValueAtTime(150, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          
          gain.gain.setValueAtTime(1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          
          osc.connect(gain);
          gain.connect(masterGain);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.5);
          nodes.push(osc);
        }
        kickBeat++;
      };
      
      setInterval(playKick, beatDuration * 1000);
      
      // HI-HAT (noise burst)
      let hatBeat = 0;
      const hatPattern = [0, 1, 0, 1]; // Offbeat
      
      const playHat = () => {
        if (hatPattern[hatBeat % hatPattern.length]) {
          const bufferSize = ctx.sampleRate * 0.1;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          
          const hatGain = ctx.createGain();
          hatGain.gain.setValueAtTime(0.1, ctx.currentTime);
          hatGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 8000;
          
          noise.connect(filter);
          filter.connect(hatGain);
          hatGain.connect(masterGain);
          
          noise.start();
          noise.stop(ctx.currentTime + 0.1);
          nodes.push(noise);
        }
        hatBeat++;
      };
      
      setInterval(playHat, beatDuration * 1000);
      
      nodesRef.current = nodes;
      setIsPlaying(true);
      
    } catch (err) {
      console.error('Music generation error:', err);
      alert('Audio error - tap again');
    }
  };

  const stopMusic = () => {
    if (melodyIntervalRef.current) clearInterval(melodyIntervalRef.current);
    if (bassIntervalRef.current) clearInterval(bassIntervalRef.current);
    
    nodesRef.current.forEach(node => {
      try {
        node.stop?.();
        node.disconnect?.();
      } catch(e) {}
    });
    
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    
    nodesRef.current = [];
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => stopMusic();
  }, []);

  return (
    <div className="bg-black border-4 border-cyan-500 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-cyan-400" />
        <div>
          <h3 className="text-xl font-black font-mono text-cyan-400">AI MUSIC GENERATOR</h3>
          <p className="text-sm text-gray-400 font-mono">Simple 8-bit generative music</p>
        </div>
      </div>

      {!isPlaying ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {GENRES.map(genre => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className={`p-4 border-2 font-mono text-sm transition-all ${
                  selectedGenre.id === genre.id
                    ? 'border-cyan-500 bg-cyan-500/20 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-cyan-500/50'
                }`}
              >
                <Music className="w-5 h-5 mx-auto mb-2" />
                {genre.name}
              </button>
            ))}
          </div>

          <button
            onClick={startMusic}
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black font-mono text-lg border-2 border-cyan-400 flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            CREATE MUSIC
          </button>

          <div className="bg-amber-900/20 border-2 border-amber-500/50 p-3">
            <p className="text-amber-400 text-xs font-mono">
              ⚡ Simple AI music using sine waves - not professional quality but REAL generative music
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-cyan-900/30 border-2 border-cyan-500 p-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              <Music className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
            </motion.div>
            <p className="text-cyan-400 font-black font-mono">PLAYING: {selectedGenre.name}</p>
            <p className="text-gray-400 text-xs font-mono mt-1">{selectedGenre.bpm} BPM</p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-400 text-sm font-mono">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#22d3ee' }}
            />
            <span className="text-gray-400 font-mono text-sm w-12">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <button
            onClick={stopMusic}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black font-mono text-lg border-2 border-red-400 flex items-center justify-center gap-3"
          >
            <Pause className="w-6 h-6" />
            STOP
          </button>
        </div>
      )}
    </div>
  );
}