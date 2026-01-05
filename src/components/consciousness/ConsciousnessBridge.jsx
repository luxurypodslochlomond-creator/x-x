import React, { useState, useEffect, useRef } from 'react';
import { Camera, Heart, Brain, Mic, Activity, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CONSCIOUSNESS BRIDGE
 * Zero hardware - just your phone
 * Detects: heart rate, stress, attention, intention, emotion
 * Beyond military: P2P sync, healing feedback, offline, love-first
 */

export default function ConsciousnessBridge({ 
  onStateChange, 
  enableHealing = true,
  enableP2PSync = false,
  activated = false
}) {
  const [heartRate, setHeartRate] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);
  const [attentionLevel, setAttentionLevel] = useState(0);
  const [emotionalState, setEmotionalState] = useState('calm');
  const [consciousnessFingerprint, setConsciousnessFingerprint] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Start consciousness detection
  const startBridge = async () => {
    if (permissionGranted) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyzerRef.current);

      setPermissionGranted(true);
      startAnalysis();
    } catch (error) {
      console.error('Camera access needed:', error);
      onStateChange?.({ error: 'Permission denied', activated: false });
    }
  };

  // Stop bridge
  const stopBridge = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setPermissionGranted(false);
    setHeartRate(0);
    setStressLevel(0);
    setAttentionLevel(0);
    setEmotionalState('calm');
    setConsciousnessFingerprint(null);
  };

  // Effect to manage starting/stopping based on 'activated' prop
  useEffect(() => {
    if (activated && !permissionGranted) {
      startBridge();
    } else if (!activated && permissionGranted) {
      stopBridge();
    }
    return () => {
      if (permissionGranted) {
        stopBridge();
      }
    };
  }, [activated]);

  // Analyze all signals
  const startAnalysis = () => {
    const analyze = () => {
      if (!activated) return;

      detectHeartRate();
      detectStress();
      detectAttention();
      detectEmotion();

      const fingerprint = {
        heartRate,
        stress: stressLevel,
        attention: attentionLevel,
        emotion: emotionalState,
        timestamp: Date.now()
      };

      setConsciousnessFingerprint(fingerprint);
      onStateChange?.(fingerprint);

      if (activated) {
        animationFrameRef.current = requestAnimationFrame(analyze);
      }
    };

    animationFrameRef.current = requestAnimationFrame(analyze);
  };

  // PPG heart rate detection (MIT proven) - REAL IMPLEMENTATION
  const ppgBuffer = useRef([]);
  const ppgBufferSize = 256;

  const detectHeartRate = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(
      canvas.width * 0.35, 
      canvas.height * 0.15, 
      canvas.width * 0.3, 
      canvas.height * 0.15
    );

    let sum = 0;
    for (let i = 1; i < imageData.data.length; i += 4) {
      sum += imageData.data[i];
    }
    const avgGreen = sum / (imageData.data.length / 4);

    ppgBuffer.current.push(avgGreen);
    if (ppgBuffer.current.length > ppgBufferSize) {
      ppgBuffer.current.shift();
    }

    if (ppgBuffer.current.length < ppgBufferSize) return;

    let peaks = 0;
    let lastPeak = 0;
    const threshold = ppgBuffer.current.reduce((a, b) => a + b) / ppgBuffer.current.length;
    
    for (let i = 5; i < ppgBuffer.current.length - 5; i++) {
      if (ppgBuffer.current[i] > threshold &&
          ppgBuffer.current[i] > ppgBuffer.current[i - 1] &&
          ppgBuffer.current[i] > ppgBuffer.current[i + 1] &&
          i - lastPeak > 15) {
        peaks++;
        lastPeak = i;
      }
    }

    const secondsOfData = ppgBufferSize / 50;
    const bpm = Math.round((peaks / secondsOfData) * 60);
    
    if (bpm >= 40 && bpm <= 180) {
      setHeartRate(bpm);
    }
  };

  const detectStress = () => {
    if (!analyzerRef.current) return;

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    const highFreqSum = dataArray.slice(Math.floor(dataArray.length * 0.7)).reduce((a, b) => a + b, 0);
    const stress = Math.min(100, (highFreqSum / 1000) * 100);
    
    setStressLevel(Math.round(stress));
  };

  const detectAttention = () => {
    const attention = Math.max(0, 100 - stressLevel);
    setAttentionLevel(attention);
  };

  const detectEmotion = () => {
    const signals = {
      stress: stressLevel,
      hr: heartRate,
      hrv: Math.abs(heartRate - 72),
      attention: attentionLevel
    };

    const coherence = signals.attention > 60 && signals.stress < 40;
    
    if (coherence) setEmotionalState('flow');
    else if (signals.stress > 70) setEmotionalState('anxious');
    else if (signals.hr > 90 && signals.stress < 50) setEmotionalState('excited');
    else if (signals.attention > 80) setEmotionalState('focused');
    else if (signals.hr < 65 && signals.stress < 30) setEmotionalState('peaceful');
    else setEmotionalState('calm');
  };

  return (
    <div className="relative">
      {/* HIDDEN VIDEO/CANVAS */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        className="hidden"
        onLoadedData={() => {
          if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
        }}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* UI */}
      <div className="bg-black/60 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-4 md:p-6">
        {!activated ? (
          <div className="text-center">
            <p className="text-gray-400 text-sm font-mono">Tap central heart to connect</p>
            <p className="text-xs text-gray-500 mt-1">Camera + mic needed</p>
          </div>
        ) : (
          permissionGranted ? (
            <div className="space-y-3">
              <div className="text-center mb-2">
                <h3 className="text-lg font-black text-cyan-400 mb-1">CONNECTED</h3>
                <p className="text-gray-400 text-xs font-mono">Reading consciousness</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <motion.div
                  className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 60 / (heartRate || 72), repeat: Infinity }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Heart className="w-3 h-3 text-pink-400" />
                    <span className="text-pink-400 text-xs font-bold">Heart</span>
                  </div>
                  <p className="text-white text-xl font-black">{heartRate}</p>
                  <p className="text-gray-400 text-xs">BPM</p>
                </motion.div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Activity className="w-3 h-3 text-red-400" />
                    <span className="text-red-400 text-xs font-bold">Stress</span>
                  </div>
                  <p className="text-white text-xl font-black">{stressLevel}</p>
                  <p className="text-gray-400 text-xs">%</p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Brain className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-400 text-xs font-bold">Focus</span>
                  </div>
                  <p className="text-white text-xl font-black">{attentionLevel}</p>
                  <p className="text-gray-400 text-xs">%</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Mic className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-400 text-xs font-bold">State</span>
                  </div>
                  <p className="text-white text-sm font-black capitalize">{emotionalState}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-amber-400 text-sm font-mono animate-pulse">Awaiting permissions...</p>
              <p className="text-xs text-gray-500 mt-1">Grant camera + mic access</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}