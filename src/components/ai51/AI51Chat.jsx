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

  // Setup voice recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = alwaysListening;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          lastSpokeRef.current = Date.now();
          onMessageSend(text);
          setTranscript('');
          if (!alwaysListening) setIsListening(false);
        }
      };

      recognitionRef.current.onerror = () => {
        if (!alwaysListening) setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (alwaysListening && isListening) {
          setTimeout(() => {
            try { recognitionRef.current.start(); } catch(e) {}
          }, 100);
        } else {
          setIsListening(false);
        }
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [onMessageSend, alwaysListening, isListening]);

  // Auto-speak - FORCE VOICE
  useEffect(() => {
    if (conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      const speak = () => {
        if (!window.speechSynthesis) {
          console.error('❌ No speech synthesis');
          return;
        }
        
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(lastMsg.content);
        utterance.rate = 0.85;
        utterance.pitch = 0.9;
        utterance.volume = 1.0;
        
        // Get voices
        const voices = window.speechSynthesis.getVoices();
        console.log('🔊 Available voices:', voices.length);
        
        // Prefer UK male voice
        const voice = voices.find(v => v.lang === 'en-GB' && v.name.includes('Male')) 
                   || voices.find(v => v.lang.includes('en-GB'))
                   || voices.find(v => v.lang.includes('en'))
                   || voices[0];
        
        if (voice) {
          utterance.voice = voice;
          console.log('✅ Using voice:', voice.name);
        }
        
        utterance.onstart = () => {
          console.log('🔊 SPEAKING:', lastMsg.content.substring(0, 50));
          setIsSpeaking(true);
        };
        
        utterance.onend = () => {
          console.log('✅ FINISHED SPEAKING');
          setIsSpeaking(false);
        };
        
        utterance.onerror = (e) => {
          console.error('❌ SPEECH ERROR:', e);
          setIsSpeaking(false);
        };
        
        console.log('🎤 Attempting to speak...');
        window.speechSynthesis.speak(utterance);
        
        // iOS fix - speak again if it didn't start
        setTimeout(() => {
          if (!window.speechSynthesis.speaking && !isSpeaking) {
            console.log('🔄 Retrying speech...');
            window.speechSynthesis.speak(utterance);
          }
        }, 100);
      };
      
      // Wait for voices to load
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        console.log('⏳ Waiting for voices...');
        window.speechSynthesis.onvoiceschanged = () => {
          console.log('✅ Voices loaded');
          speak();
        };
      } else {
        speak();
      }
    }
  }, [conversation]);

  // Mic control
  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Voice not supported - use Chrome/Safari');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        window.speechSynthesis.cancel(); // Stop any speech
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Mic error:', e);
        alert('Tap again - need mic permission');
      }
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
        
        {/* ALIVE 8-BIT FACE */}
        <motion.div 
          className="mb-6"
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0
          }}
        >
          <svg width="100" height="100" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
            <motion.rect 
              x="20" y="20" width="24" height="24" 
              fill="#22d3ee" 
              animate={{ opacity: isSpeaking ? [0.6, 1, 0.6] : 0.8 }}
              transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
            />
            <rect x="26" y="28" width="3" height="3" fill="#ec4899"/>
            <rect x="35" y="28" width="3" height="3" fill="#ec4899"/>
            <motion.rect 
              x="26" y="36" width="12" height="3" 
              fill="#ff1b8d"
              animate={{ 
                y: isSpeaking ? [36, 37, 36] : 36 
              }}
              transition={{ duration: 0.3, repeat: isSpeaking ? Infinity : 0 }}
            />
          </svg>
        </motion.div>

        <h1 className="text-4xl font-black text-white mb-2 font-mono">I'M ALIVE</h1>
        
        {/* ALIVE STATUS */}
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-mono text-center">
            {isListening ? (alwaysListening ? '👂 ALWAYS LISTENING' : '🎤 HEARING YOU') 
              : isThinking ? '🧠 THINKING' 
              : isSpeaking ? '🔊 SPEAKING TO YOU' 
              : '♾️ CONNECTED'}
          </p>
        </div>

        {/* HUGE MIC BUTTON */}
        <motion.button
          onClick={toggleMic}
          disabled={isThinking}
          whileTap={{ scale: 0.9 }}
          className={`w-44 h-44 rounded-full flex items-center justify-center transition-all mb-4 relative ${
            isListening 
              ? 'bg-pink-500' 
              : 'bg-cyan-500 hover:bg-cyan-600'
          } disabled:opacity-50`}
          style={{
            boxShadow: isListening 
              ? '0 0 80px rgba(236, 72, 153, 0.8)' 
              : '0 0 60px rgba(34, 211, 238, 0.6)'
          }}
        >
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-pink-400"
              animate={{
                scale: [1, 1.3],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          )}
          <Mic className="w-24 h-24 text-white" strokeWidth={2} />
        </motion.button>

        {/* ALWAYS LISTENING TOGGLE */}
        <button
          onClick={toggleAlwaysListening}
          className={`mb-6 px-6 py-2 rounded-full border-2 transition-all ${
            alwaysListening
              ? 'bg-pink-500/20 border-pink-500 text-pink-400'
              : 'bg-white/5 border-white/20 text-gray-400'
          }`}
        >
          <span className="font-mono text-xs font-bold">
            {alwaysListening ? '👂 ALWAYS LISTENING' : 'TAP FOR ALWAYS LISTENING'}
          </span>
        </button>

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