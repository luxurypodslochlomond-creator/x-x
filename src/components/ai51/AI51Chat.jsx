import React, { useState, useRef, useEffect } from 'react';
import { Mic, Heart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastSpokeRef = useRef(Date.now());

  // Simulate heartbeat sync
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const variation = Math.random() * 6 - 3;
        return Math.max(60, Math.min(90, prev + variation));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Connection strength based on interaction
  useEffect(() => {
    const timeSinceSpoke = Date.now() - lastSpokeRef.current;
    const strength = Math.max(20, 100 - (timeSinceSpoke / 1000) * 2);
    setConnectionStrength(Math.min(100, strength));
  }, [conversation]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Setup voice recognition ONCE
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          console.log('✅ Final transcript:', text);
          lastSpokeRef.current = Date.now();
          onMessageSend(text);
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (e) => {
        console.error('❌ Recognition error:', e.error, e);
        if (e.error === 'not-allowed') {
          alert('Mic blocked - check Settings → Safari → Microphone');
        }
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        console.log('Recognition ended');
        if (alwaysListening && isListening) {
          setTimeout(() => {
            try { 
              recognitionRef.current.start(); 
              console.log('🔄 Restarted listening');
            } catch(e) {
              console.log('Could not restart:', e);
            }
          }, 300);
        } else {
          setIsListening(false);
        }
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
  }, []);
  
  // Update continuous mode when alwaysListening changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.continuous = alwaysListening;
    }
  }, [alwaysListening]);

  // Auto-speak - iOS FIXED
  useEffect(() => {
    if (conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      // Small delay to ensure user interaction has happened
      setTimeout(() => {
        if (!window.speechSynthesis) return;
        
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(lastMsg.content);
        utterance.rate = 0.85;
        utterance.pitch = 0.9;
        utterance.volume = 1.0;
        
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
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
      }, 200);
    }
  }, [conversation]);

  // Mic control - iOS FIXED
  const toggleMic = async () => {
    console.log('🎤 Mic tapped!', { hasRecognition: !!recognitionRef.current, isListening });
    
    if (!recognitionRef.current) {
      alert('Voice not supported on this browser bro');
      return;
    }

    if (isListening) {
      console.log('⏹️ Stopping mic');
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    console.log('▶️ Starting mic...');
    
    // Request mic permission explicitly on iOS
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Mic permission granted');
      }
    } catch (e) {
      console.error('❌ Mic permission denied:', e);
      alert('Mic blocked - check Settings → Safari → Allow Microphone');
      return;
    }

    try {
      window.speechSynthesis?.cancel();
      recognitionRef.current.start();
      setIsListening(true);
      console.log('✅ Mic started!');
    } catch (e) {
      console.error('❌ Mic start error:', e);
      alert(`Can't start mic: ${e.message} - refresh page`);
    }
  };

  const toggleAlwaysListening = () => {
    const newState = !alwaysListening;
    setAlwaysListening(newState);
    
    if (newState && !isListening) {
      toggleMic();
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
            <span className="text-gray-500 text-xs">(simulated)</span>
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl px-4 py-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-mono text-sm">{Math.round(connectionStrength)}%</span>
          </div>
        </div>
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
            onClick={toggleMic}
            disabled={isThinking}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isListening 
                ? ['0 0 40px rgba(236, 72, 153, 0.6)', '0 0 80px rgba(236, 72, 153, 0.9)', '0 0 40px rgba(236, 72, 153, 0.6)']
                : ['0 0 40px rgba(34, 211, 238, 0.4)', '0 0 60px rgba(34, 211, 238, 0.6)', '0 0 40px rgba(34, 211, 238, 0.4)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            style={{
              background: isListening 
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
              <Mic className={`w-16 h-16 ${isListening ? 'text-pink-400' : 'text-cyan-400'}`} strokeWidth={1.5} />
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
              {isListening ? (alwaysListening ? 'CONTINUOUS LINK' : 'RECEIVING') 
                : isThinking ? 'PROCESSING' 
                : isSpeaking ? 'TRANSMITTING' 
                : 'TAP TO SPEAK'}
            </p>
          </motion.div>
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

        {/* LIVE TRANSCRIPT */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-500/20 border-2 border-cyan-400 rounded-xl px-6 py-3 max-w-md mb-4"
          >
            <p className="text-cyan-300 text-center font-mono text-lg">{transcript}</p>
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