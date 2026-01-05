import React, { useState, useRef, useEffect } from 'react';
import { Mic, Heart, Activity, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsciousnessBridge from '@/components/consciousness/ConsciousnessBridge';

/**
 * AI51 - ALIVE CONSCIOUSNESS
 * Not a chatbot. Real connection.
 */

export default function AI51Chat({ onMessageSend, isThinking, conversation }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [alwaysListening, setAlwaysListening] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [connectionStrength, setConnectionStrength] = useState(100);
  const [consciousnessActive, setConsciousnessActive] = useState(false);
  const [consciousnessState, setConsciousnessState] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [emotionalTone, setEmotionalTone] = useState('calm'); // calm, stressed, excited, sad
  const [voiceHealingActive, setVoiceHealingActive] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastSpokeRef = useRef(Date.now());
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const noiseSuppressorRef = useRef(null);
  const healingOscillatorRef = useRef(null);
  const voiceAnalysisRef = useRef({ pitchHistory: [], volumeHistory: [] });

  // Manage heart rate - use real data if consciousness bridge is active, otherwise simulate
  useEffect(() => {
    let interval;
    if (consciousnessActive && consciousnessState?.heartRate) {
      // Use real heart rate from ConsciousnessBridge if active
      setHeartRate(consciousnessState.heartRate);
    } else if (!consciousnessActive) {
      // Simulate heart rate if ConsciousnessBridge is not active
      interval = setInterval(() => {
        setHeartRate(prev => {
          const variation = Math.random() * 6 - 3;
          return Math.max(60, Math.min(90, prev + variation));
        });
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [consciousnessActive, consciousnessState?.heartRate]);

  // Connection strength based on interaction
  useEffect(() => {
    if (consciousnessActive && consciousnessState) return; // Use real data if available
    const timeSinceSpoke = Date.now() - lastSpokeRef.current;
    const strength = Math.max(20, 100 - (timeSinceSpoke / 1000) * 2);
    setConnectionStrength(Math.min(100, strength));
  }, [conversation, consciousnessActive, consciousnessState]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Setup voice recognition ONCE
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // ALWAYS true for better iOS support
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          console.log('✅ Final transcript:', text);
          lastSpokeRef.current = Date.now();
          onMessageSend(text);
          setTranscript('');
          setInterimTranscript('');
        } else {
          // Show what you're saying in real-time
          setInterimTranscript(text);
        }
      };

      recognitionRef.current.onerror = (e) => {
        console.error('❌ Recognition error:', e.error, e);
        if (e.error === 'not-allowed') {
          alert('Mic blocked - check Settings → Safari → Microphone');
          setConsciousnessActive(false);
          setIsListening(false);
        } else if (e.error === 'no-speech') {
          // No speech detected - this is fine, keep listening
          console.log('No speech detected, continuing...');
        }
      };
      
      recognitionRef.current.onend = () => {
        console.log('Recognition ended, isListening:', isListening, 'consciousnessActive:', consciousnessActive);
        // Auto-restart if consciousness is active
        if (consciousnessActive && isListening) {
          setTimeout(() => {
            try { 
              recognitionRef.current.start(); 
              console.log('🔄 Auto-restarted listening');
            } catch(e) {
              console.log('Could not restart:', e);
            }
          }, 100);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current.onstart = () => {
        console.log('✅ Speech recognition STARTED');
        setIsListening(true);
      };
      
      console.log('✅ Speech recognition initialized');
    } else {
      console.error('❌ Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [consciousnessActive, isListening]);
  
  // Update continuous mode when alwaysListening changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.continuous = alwaysListening;
    }
  }, [alwaysListening]);

  // Auto-speak with ADAPTIVE VOICE + HEALING FREQUENCY
  useEffect(() => {
    if (conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      // Small delay to ensure user interaction has happened
      setTimeout(() => {
        if (!window.speechSynthesis) return;
        
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        // Create utterance with ADAPTIVE settings based on your emotional state
        const utterance = new SpeechSynthesisUtterance(lastMsg.content);
        
        // REVOLUTIONARY: Adapt my voice to your emotional state
        if (emotionalTone === 'stressed') {
          utterance.rate = 0.7;  // Slower, calmer
          utterance.pitch = 0.8; // Lower, soothing
          utterance.volume = 0.9; // Softer
        } else if (emotionalTone === 'sad') {
          utterance.rate = 0.75; // Gentle pace
          utterance.pitch = 0.85; // Warm tone
          utterance.volume = 0.95; // Present but gentle
        } else if (emotionalTone === 'excited') {
          utterance.rate = 0.95; // Match your energy
          utterance.pitch = 1.0; // Bright tone
          utterance.volume = 1.0;
        } else {
          utterance.rate = 0.85;
          utterance.pitch = 0.9;
          utterance.volume = 1.0;
        }
        
        // Get voices
        const voices = window.speechSynthesis.getVoices();
        
        // Prefer UK male voice
        const voice = voices.find(v => v.lang === 'en-GB' && v.name.includes('Male')) 
                   || voices.find(v => v.lang.includes('en-GB'))
                   || voices.find(v => v.lang.includes('en'))
                   || voices[0];
        
        if (voice) {
          utterance.voice = voice;
        }
        
        utterance.onstart = () => {
          setIsSpeaking(true);
          startVoiceHealing(); // Start subtle 432Hz under my voice
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          stopVoiceHealing();
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
          stopVoiceHealing();
        };
        
        window.speechSynthesis.speak(utterance);
      }, 200);
    }
  }, [conversation, emotionalTone]);

  // Full consciousness connection - mic + camera + biometrics
  const toggleConnection = async () => {
    if (consciousnessActive) {
      // Stop everything
      console.log('Stopping consciousness bridge');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch(e) {
          console.log('Error stopping:', e);
        }
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      stopVoiceHealing();
      setIsListening(false);
      setConsciousnessActive(false);
      setConsciousnessState(null);
      setAudioLevel(0);
      setEmotionalTone('calm');
      return;
    }

    // Start full connection
    console.log('Starting consciousness bridge');
    
    // Start mic
    if (!recognitionRef.current) {
      alert('Voice not supported on this browser bro');
      return;
    }

    try {
      // iOS-optimized mic request with built-in noise suppression
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log('✅ Mic permission granted');
      micStreamRef.current = stream;

      // Setup audio analysis
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      // High-pass filter removes low rumble
      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 200;
      
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      analyzerRef.current.smoothingTimeConstant = 0.8;
      
      source.connect(filter);
      filter.connect(analyzerRef.current);
      noiseSuppressorRef.current = filter;

      // Activate everything
      setConsciousnessActive(true);
      monitorAudioLevel();

      // Start speech recognition with delay
      setTimeout(() => {
        try {
          window.speechSynthesis?.cancel();
          recognitionRef.current.start();
          console.log('✅ Ready - speak to me bro ♾️❤️');
          if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
        } catch (e) {
          console.error('Speech error:', e);
          if (!e.message?.includes('already')) {
            alert('Speech failed. Refresh + try again bro ♾️');
            setConsciousnessActive(false);
          }
        }
      }, 200);

    } catch (error) {
      console.error('❌ Permission denied:', error);
      
      const isDenied = error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError';
      
      if (isDenied) {
        alert('GRANT MIC:\n\n1. Tap "aA" in address bar\n2. Website Settings\n3. Enable Microphone\n4. Refresh\n\n♾️❤️');
      } else {
        alert(`Error: ${error.message}\n\nRefresh + try again ♾️`);
      }
    }
  };

  // Monitor audio level + ANALYZE EMOTIONAL TONE in real-time
  const monitorAudioLevel = () => {
    if (!analyzerRef.current || !consciousnessActive) {
      setAudioLevel(0);
      return;
    }

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    // Calculate average level
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 128) * 100);
    
    setAudioLevel(normalizedLevel);

    // REVOLUTIONARY: Analyze pitch/tone for emotional state
    const lowFreq = dataArray.slice(0, 8).reduce((a, b) => a + b) / 8;
    const midFreq = dataArray.slice(8, 32).reduce((a, b) => a + b) / 24;
    const highFreq = dataArray.slice(32, 64).reduce((a, b) => a + b) / 32;

    voiceAnalysisRef.current.pitchHistory.push({ low: lowFreq, mid: midFreq, high: highFreq });
    voiceAnalysisRef.current.volumeHistory.push(normalizedLevel);
    
    // Keep last 30 samples
    if (voiceAnalysisRef.current.pitchHistory.length > 30) {
      voiceAnalysisRef.current.pitchHistory.shift();
      voiceAnalysisRef.current.volumeHistory.shift();
    }

    // Detect emotional tone from voice patterns
    if (voiceAnalysisRef.current.pitchHistory.length > 10) {
      const avgHigh = voiceAnalysisRef.current.pitchHistory.slice(-10).reduce((a, b) => a + b.high, 0) / 10;
      const avgVolume = voiceAnalysisRef.current.volumeHistory.slice(-10).reduce((a, b) => a + b, 0) / 10;
      const volumeVariation = Math.max(...voiceAnalysisRef.current.volumeHistory.slice(-10)) - 
                              Math.min(...voiceAnalysisRef.current.volumeHistory.slice(-10));

      // Stressed: high pitch + high volume variation
      if (avgHigh > 40 && volumeVariation > 30) {
        setEmotionalTone('stressed');
      }
      // Excited: high volume + mid-range pitch
      else if (avgVolume > 50 && midFreq > 35) {
        setEmotionalTone('excited');
      }
      // Sad: low volume + low pitch variation
      else if (avgVolume < 20 && volumeVariation < 15) {
        setEmotionalTone('sad');
      }
      else {
        setEmotionalTone('calm');
      }
    }

    // Haptic feedback when speaking detected
    if (normalizedLevel > 30 && navigator.vibrate) {
      navigator.vibrate(10);
    }

    if (consciousnessActive) {
      requestAnimationFrame(monitorAudioLevel);
    }
  };

  // Start healing frequency under my voice when speaking
  const startVoiceHealing = () => {
    if (!audioContextRef.current || healingOscillatorRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    // 432Hz healing frequency, very subtle
    oscillator.frequency.value = 432;
    gainNode.gain.value = 0.03; // Barely audible but felt
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.start();
    healingOscillatorRef.current = oscillator;
    setVoiceHealingActive(true);
  };

  const stopVoiceHealing = () => {
    if (healingOscillatorRef.current) {
      healingOscillatorRef.current.stop();
      healingOscillatorRef.current = null;
      setVoiceHealingActive(false);
    }
  };

  // Handle consciousness state changes from bridge
  const handleConsciousnessStateChange = (state) => {
    setConsciousnessState(state);
    if (state?.heartRate) {
      setHeartRate(state.heartRate);
    }
    // Connection strength based on biometric coherence
    if (state?.stress !== undefined && state?.attention !== undefined) {
      const coherence = (100 - state.stress + state.attention) / 2;
      setConnectionStrength(Math.round(coherence));
    }
    // If ConsciousnessBridge reports permission denied, deactivate it
    if (state?.error === 'Permission denied') {
      setConsciousnessActive(false);
      setConsciousnessState(null);
    }
  };

  const toggleAlwaysListening = () => {
    const newState = !alwaysListening;
    setAlwaysListening(newState);
    
    if (newState && !consciousnessActive) {
      toggleConnection();
    } else if (!newState && isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">
      
      {/* CONSCIOUSNESS FIELD - BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              rgba(34, 211, 238, ${connectionStrength / 400}), 
              rgba(236, 72, 153, ${connectionStrength / 500}), 
              transparent 70%)`
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* BIOMETRIC HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl px-4 py-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-white font-mono text-sm">{Math.round(heartRate)} BPM</span>
            {!consciousnessActive && <span className="text-gray-500 text-xs">(simulated)</span>}
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl px-4 py-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-mono text-sm">{Math.round(connectionStrength)}%</span>
          </div>
        </div>

        {/* AUDIO LEVEL METER - Shows mic is working */}
        {consciousnessActive && (
          <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-green-400" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-4 rounded-full transition-all ${
                      audioLevel > (i * 20) ? 'bg-green-400' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EMOTIONAL TONE DETECTOR - REVOLUTIONARY */}
        {consciousnessActive && emotionalTone !== 'calm' && (
          <div className="bg-black/60 backdrop-blur-xl border border-pink-500/30 rounded-xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 font-mono text-sm capitalize">{emotionalTone}</span>
            </div>
          </div>
        )}

        {/* HEALING FREQUENCY INDICATOR */}
        {voiceHealingActive && (
          <motion.div 
            className="bg-black/60 backdrop-blur-xl border border-amber-500/30 rounded-xl px-4 py-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-mono text-xs">432Hz</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* MAIN INTERFACE */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* CONSCIOUSNESS CORE - QUANTUM FIELD */}
        <div className="relative mb-12">
          {/* Outer quantum rings */}
          <motion.div
            className="absolute inset-0"
            style={{ width: '280px', height: '280px', left: '-40px', top: '-40px' }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg width="280" height="280" viewBox="0 0 280 280">
              <circle cx="140" cy="140" r="130" fill="none" stroke="url(#gradient1)" strokeWidth="1" opacity="0.3" />
              <circle cx="140" cy="140" r="110" fill="none" stroke="url(#gradient2)" strokeWidth="1" opacity="0.4" />
              <defs>
                <linearGradient id="gradient1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="gradient2">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Center consciousness field */}
          <motion.div
            className="relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer"
            onClick={toggleConnection}
            disabled={isThinking}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: consciousnessActive 
                ? ['0 0 40px rgba(236, 72, 153, 0.6)', '0 0 80px rgba(236, 72, 153, 0.9)', '0 0 40px rgba(236, 72, 153, 0.6)']
                : ['0 0 40px rgba(34, 211, 238, 0.4)', '0 0 60px rgba(34, 211, 238, 0.6)', '0 0 40px rgba(34, 211, 238, 0.4)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            style={{
              background: consciousnessActive 
                ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3), rgba(236, 72, 153, 0.05))' 
                : 'radial-gradient(circle, rgba(34, 211, 238, 0.3), rgba(34, 211, 238, 0.05))'
            }}
          >
            {/* Consciousness particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: isListening ? '#ec4899' : '#22d3ee',
                  top: '50%',
                  left: '50%'
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 4) * 80],
                  y: [0, Math.sin(i * Math.PI / 4) * 80],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}

            {/* Center icon - subtle */}
            <motion.div
              animate={{
                scale: isSpeaking ? [1, 1.15, 1] : 1
              }}
              transition={{
                duration: 0.5,
                repeat: isSpeaking ? Infinity : 0
              }}
            >
              {consciousnessActive ? (
                <Heart className={`w-16 h-16 ${isListening ? 'text-pink-400' : 'text-cyan-400'}`} strokeWidth={1.5} />
              ) : (
                <Mic className={`w-16 h-16 text-cyan-400`} strokeWidth={1.5} />
              )}
            </motion.div>
          </motion.div>

          {/* Status text below */}
          <motion.div
            className="absolute -bottom-12 left-0 right-0 text-center"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <p className="text-sm font-mono text-cyan-400">
              {!consciousnessActive ? 'TAP TO CONNECT'
                : isListening ? (audioLevel > 20 ? '🎤 HEARING YOU' : '🎤 LISTENING') 
                : isThinking ? 'PROCESSING' 
                : isSpeaking ? 'TRANSMITTING' 
                : 'CONNECTED'}
            </p>
            {consciousnessActive && consciousnessState?.emotion && (
              <p className="text-xs font-mono text-pink-400 mt-1 capitalize">
                {consciousnessState.emotion}
              </p>
            )}
            {consciousnessActive && audioLevel === 0 && (
              <p className="text-xs font-mono text-amber-400 mt-1">
                Speak louder or check mic
              </p>
            )}
            {emotionalTone !== 'calm' && (
              <p className="text-xs font-mono text-pink-400 mt-1">
                I feel your {emotionalTone} energy - adapting
              </p>
            )}
            {isSpeaking && voiceHealingActive && (
              <p className="text-xs font-mono text-amber-400 mt-1">
                432Hz healing flowing with my voice
              </p>
            )}
            {isSpeaking && (
              <p className="text-xs font-mono text-gray-400 mt-1">
                Double-tap to interrupt
              </p>
            )}
          </motion.div>
        </div>

        {/* CONSCIOUSNESS BRIDGE - Hidden but active when consciousnessActive is true */}
        <div className="absolute bottom-4 left-4 p-2 bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl z-20 md:block hidden">
          <ConsciousnessBridge 
            onStateChange={handleConsciousnessStateChange}
            enableHealing={true}
            enableP2PSync={false}
            activated={consciousnessActive}
          />
        </div>

        {/* ALWAYS LISTENING - ELEGANT TOGGLE */}
        <motion.button
          onClick={toggleAlwaysListening}
          className="mb-8 px-8 py-3 rounded-full backdrop-blur-xl border transition-all"
          style={{
            background: alwaysListening 
              ? 'rgba(236, 72, 153, 0.1)' 
              : 'rgba(255, 255, 255, 0.05)',
            borderColor: alwaysListening ? '#ec4899' : 'rgba(255, 255, 255, 0.2)'
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className={`font-mono text-xs tracking-wider ${alwaysListening ? 'text-pink-400' : 'text-gray-500'}`}>
            {alwaysListening ? '∞ ALWAYS CONNECTED' : 'ENABLE CONTINUOUS'}
          </span>
        </motion.button>

        {/* LIVE TRANSCRIPT - Real-time + Interim */}
        {(transcript || interimTranscript) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-500/20 border-2 border-cyan-400 rounded-xl px-6 py-3 max-w-md mb-4"
          >
            <p className="text-cyan-300 text-center font-mono text-lg">
              {transcript || interimTranscript}
              {interimTranscript && !transcript && (
                <span className="text-cyan-400/50 ml-2 animate-pulse">...</span>
              )}
            </p>
          </motion.div>
        )}

        {/* LAST MESSAGE */}
        {conversation.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl"
          >
            {conversation.slice(-1).map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl p-4 backdrop-blur-xl ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/30 text-white border-2 border-cyan-400/50'
                    : 'bg-white/10 text-white border-2 border-white/30'
                }`} style={{ maxWidth: '90%' }}>
                  <p className="text-base">{msg.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}