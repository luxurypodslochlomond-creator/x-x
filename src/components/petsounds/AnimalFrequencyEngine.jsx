import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const ANIMAL_PROTOCOLS = {
  fireworks: {
    name: 'Fireworks Anxiety',
    hz: 40,
    carrier: 200,
    waveform: 'sine',
    description: 'Calm during loud noises',
    color: '#ec4899',
    timer: '15 min'
  },
  separation: {
    name: 'Separation Anxiety',
    hz: 432,
    waveform: 'sine',
    description: 'Safe when you\'re away',
    color: '#06b6d4',
    timer: '20 min'
  },
  arthritis: {
    name: 'Arthritis Pain Relief',
    hz: 174,
    waveform: 'square',
    description: 'Ease joint pain',
    color: '#f59e0b',
    timer: '12 min'
  },
  surgery: {
    name: 'Post-Surgery Recovery',
    hz: 528,
    waveform: 'sine',
    description: 'Speed healing',
    color: '#10b981',
    timer: '20 min'
  },
  travel: {
    name: 'Travel Stress',
    hz: 396,
    waveform: 'triangle',
    description: 'Car, plane, vet visits',
    color: '#a855f7',
    timer: '10 min'
  },
  herd: {
    name: 'Herd Calm',
    hz: 7.83,
    carrier: 432,
    waveform: 'sine',
    description: 'Reduce stress for many animals',
    color: '#22c55e',
    timer: '30 min'
  }
};

export default function AnimalFrequencyEngine({ protocol = 'fireworks', species = 'dog', onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [timer, setTimer] = useState(0);
  const [timerTarget, setTimerTarget] = useState(null);

  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);

  const freq = ANIMAL_PROTOCOLS[protocol] || ANIMAL_PROTOCOLS.fireworks;

  const play = async () => {
    stop();
    
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') await ctx.resume();
      
      audioCtxRef.current = ctx;
      const nodes = [];

      // MASTER GAIN
      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;

      // ANALYSER FOR VISUALIZER
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      // PRIMARY FREQUENCY
      const carrier = freq.carrier || freq.hz;
      const osc = ctx.createOscillator();
      osc.type = freq.waveform;
      osc.frequency.value = carrier;
      const gain = ctx.createGain();
      gain.gain.value = 0.4;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      nodes.push(osc, gain);

      // SUBHARMONIC (half - deep healing)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.value = carrier * 0.5;
      const subGain = ctx.createGain();
      subGain.gain.value = 0.4;
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start();
      nodes.push(subOsc, subGain);

      // 2ND HARMONIC (double)
      const harm2Osc = ctx.createOscillator();
      harm2Osc.type = 'sine';
      harm2Osc.frequency.value = carrier * 2;
      const harm2Gain = ctx.createGain();
      harm2Gain.gain.value = 0.25;
      harm2Osc.connect(harm2Gain);
      harm2Gain.connect(masterGain);
      harm2Osc.start();
      nodes.push(harm2Osc, harm2Gain);

      // 3RD HARMONIC (triple)
      const harm3Osc = ctx.createOscillator();
      harm3Osc.type = 'sine';
      harm3Osc.frequency.value = carrier * 3;
      const harm3Gain = ctx.createGain();
      harm3Gain.gain.value = 0.2;
      harm3Osc.connect(harm3Gain);
      harm3Gain.connect(masterGain);
      harm3Osc.start();
      nodes.push(harm3Osc, harm3Gain);

      // AMBIENT BED - healing field
      const ambientFreqs = [
        carrier * 0.25,
        carrier * 0.66,
        carrier * 1.5,
        carrier * 2.5
      ];

      ambientFreqs.forEach((f) => {
        const ambOsc = ctx.createOscillator();
        ambOsc.type = 'sine';
        ambOsc.frequency.value = f;
        const ambGain = ctx.createGain();
        ambGain.gain.value = 0.03;
        ambOsc.connect(ambGain);
        ambGain.connect(masterGain);
        ambOsc.start();
        nodes.push(ambOsc, ambGain);
      });

      nodesRef.current = nodes;
      setIsPlaying(true);
      setTimer(0);

      // TIMER
      timerRef.current = setInterval(() => {
        setTimer(t => {
          const newTime = t + 1;
          if (timerTarget && newTime >= timerTarget) {
            stop();
            return newTime;
          }
          return newTime;
        });
      }, 1000);

      console.log(`✓ Playing ${freq.name} for ${species}`);
      drawVisualizer();
    } catch (err) {
      alert('Audio blocked - try again');
    }
  };

  const stop = () => {
    nodesRef.current.forEach(n => {
      try { n.stop?.(); n.disconnect?.(); } catch(e) {}
    });
    nodesRef.current = [];

    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    analyserRef.current = null;
    setIsPlaying(false);
    setTimer(0);
  };

  const drawVisualizer = () => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let time = 0;

    const draw = () => {
      if (!isPlaying) return;
      requestAnimationFrame(draw);

      time += 0.02;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxSize = Math.min(canvas.width, canvas.height) * 0.4;

      const pulse = Math.sin(time * 1.5) * 0.5 + 0.5;
      const coreRadius = maxSize + (pulse * (maxSize * 0.3));

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      gradient.addColorStop(0, freq.color);
      gradient.addColorStop(0.5, freq.color + '80');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = freq.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxSize * 0.6 + (pulse * maxSize * 0.2), 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.fillStyle = freq.color;
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('HEALING', centerX, centerY + 40);
    };

    draw();
  };

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    nodesRef.current.forEach(node => {
      if (node?.gain && audioCtxRef.current) {
        try {
          node.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
        } catch (e) {}
      }
    });
  }, [volume]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black text-white rounded-xl p-6">
      {!isPlaying && (
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-3xl font-black mb-2" style={{ color: freq.color }}>
              {freq.name}
            </h2>
            <p className="text-gray-400 font-mono mb-3">{freq.hz} Hz • {freq.waveform}</p>
            <p className="text-gray-300 mb-4">{freq.psychology}</p>
          </div>

          <button
            onClick={() => play()}
            className="w-full py-4 rounded-lg font-black flex items-center justify-center gap-3 transition-all"
            style={{
              backgroundColor: freq.color,
              color: '#000',
              boxShadow: `0 0 30px ${freq.color}`
            }}
          >
            <Play className="w-6 h-6" />
            START HEALING
          </button>

          <div className="grid grid-cols-2 gap-3">
            {[5, 10, 15, 20].map(mins => (
              <button
                key={mins}
                onClick={() => {
                  play();
                  setTimerTarget(mins * 60);
                }}
                className="py-2 border border-white/20 hover:border-white/40 rounded-lg text-sm font-bold transition-all"
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-6">
          <canvas
            ref={canvasRef}
            className="w-full h-48 rounded-lg mb-4"
          />

          <div className="flex items-center justify-between bg-gray-900/60 p-4 rounded-lg">
            <div>
              <p className="text-2xl font-black" style={{ color: freq.color }}>
                {formatTime(timer)}
              </p>
              {timerTarget && (
                <p className="text-xs text-gray-400">/ {formatTime(timerTarget)}</p>
              )}
            </div>
            <button
              onClick={stop}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all"
            >
              STOP
            </button>
          </div>

          <div className="flex items-center gap-3 bg-gray-900/60 p-3 rounded-lg">
            <VolumeX className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-mono">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}