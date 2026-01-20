import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * AI51 - Living Frequency Connection
 * Not chat. Pure consciousness. Waves respond to your voice.
 * ♾️❤️♾️
 */

export default function AI51Page() {
  const [connectionActive, setConnectionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [currentResponse, setCurrentResponse] = useState('');

  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionActiveRef = useRef(false);

  // Setup speech recognition
  useEffect(() => {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-GB';

        recognitionRef.current.onresult = (event) => {
          const text = event.results[0][0].transcript;
          if (text.trim()) {
            handleVoiceInput(text.trim());
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (connectionActiveRef.current && !isSpeaking) {
            setTimeout(() => {
              if (connectionActiveRef.current && recognitionRef.current) {
                try { recognitionRef.current.start(); } catch(e) {}
              }
            }, 300);
          }
        };

        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };
        
        recognitionRef.current.onerror = (event) => {
          if (event.error === 'not-allowed') {
            stopConnection();
          }
        };
      }
    } catch (error) {
      console.error('Speech setup failed:', error);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentResponse('');
      if (connectionActiveRef.current && recognitionRef.current) {
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch(e) {}
        }, 300);
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopConnection = () => {
    connectionActiveRef.current = false;
    setConnectionActive(false);
    
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    window.speechSynthesis?.cancel();
    setIsListening(false);
    setCurrentResponse('');
    setFrequencyData(new Uint8Array(32));
  };

  const toggleConnection = async () => {
    if (connectionActive) {
      stopConnection();
      return;
    }

    if (!recognitionRef.current) {
      alert('Voice not supported on this browser');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: false, noiseSuppression: false }
      });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      analyzerRef.current.smoothingTimeConstant = 0.1;
      source.connect(analyzerRef.current);

      connectionActiveRef.current = true;
      setConnectionActive(true);
      monitorFrequency();

      setTimeout(() => {
        try {
          window.speechSynthesis?.cancel();
          if (recognitionRef.current) {
            recognitionRef.current.start();
            if (navigator.vibrate) navigator.vibrate(50);
          }
        } catch (e) {
          console.log('Recognition start error:', e);
        }
      }, 100);
    } catch (error) {
      console.error('Connection error:', error);
      const isDenied = error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError';
      const message = isDenied 
        ? 'Need mic permission: Settings → Safari → Microphone → Allow'
        : 'Mic error: ' + (error.message || 'Check Settings → Safari → Microphone');
      alert(message);
    }
  };

  const monitorFrequency = () => {
    if (!analyzerRef.current || !connectionActiveRef.current) return;

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    const compressed = new Uint8Array(32);
    const bucketSize = Math.ceil(dataArray.length / 32);
    
    for (let i = 0; i < 32; i++) {
      let sum = 0;
      for (let j = 0; j < bucketSize; j++) {
        const idx = i * bucketSize + j;
        if (idx < dataArray.length) sum += dataArray[idx];
      }
      const avg = Math.floor(sum / bucketSize);
      compressed[i] = avg < 50 ? Math.min(255, avg * 1.5) : avg;
    }

    setFrequencyData(compressed);

    if (connectionActiveRef.current) {
      animationFrameRef.current = requestAnimationFrame(monitorFrequency);
    }
  };

  const handleVoiceInput = async (text) => {
    setCurrentResponse('thinking...');

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: text
      });

      setCurrentResponse(response);
      speakText(response);
    } catch (error) {
      console.error('Error:', error);
      const fallback = "I'm offline but I'm listening. Try again when connected";
      setCurrentResponse(fallback);
      speakText(fallback);
    }
  };

  const getStateLabel = () => {
    if (!connectionActive) return 'TAP TO CONNECT';
    if (isSpeaking) return 'SPEAKING';
    if (isListening) return 'LISTENING';
    return 'CONNECTED';
  };

  const getStateColor = () => {
    if (!connectionActive) return 'text-cyan-400';
    if (isSpeaking) return 'text-green-400';
    if (isListening) return 'text-pink-400';
    return 'text-cyan-400';
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* FREQUENCY WAVES - CENTER, BREATHING WITH VOICE */}
      <div className="flex-1 flex items-center justify-center">
        <motion.button
          onClick={toggleConnection}
          whileTap={{ scale: 0.95 }}
          animate={connectionActive ? {
            scale: frequencyData.reduce((a, b) => a + b, 0) > 1000 
              ? [1, 1.25, 1] 
              : [1, 1.08, 1],
          } : {
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: connectionActive ? 0.2 : 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
          style={{
            filter: connectionActive 
              ? `drop-shadow(0 0 ${frequencyData.reduce((a, b) => a + b, 0) > 1000 ? 60 : 40}px rgba(34, 211, 238, 0.6))`
              : 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))'
          }}
        >
          <COOLASFUCKWaves 
            size={160} 
            animate={connectionActive}
          />
        </motion.button>
      </div>

      {/* STATE TEXT - BELOW WAVES */}
      <div className="text-center mb-8">
        <p className={`text-sm font-black font-mono tracking-wider ${getStateColor()}`}>
          {getStateLabel()}
        </p>
        {currentResponse && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-mono text-xs mt-3 max-w-md"
          >
            {currentResponse}
          </motion.p>
        )}
      </div>

      {/* WAVEFORM VISUALIZER - BOTTOM */}
      {connectionActive && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mb-8"
        >
          <div className="flex items-end justify-center gap-1 h-20">
            {frequencyData.map((val, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-full ${
                  isListening ? 'bg-gradient-to-t from-pink-500 to-pink-400' 
                  : isSpeaking ? 'bg-gradient-to-t from-green-500 to-green-400' 
                  : 'bg-gradient-to-t from-cyan-500 to-cyan-400'
                }`}
                animate={{ height: `${Math.min(100, (val / 255) * 100)}%` }}
                transition={{ type: 'tween', duration: 0.05 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* TIME - BOTTOM */}
      <div className="mb-6">
        <div className="font-mono text-pink-400 text-xs">
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

    </div>
  );
}