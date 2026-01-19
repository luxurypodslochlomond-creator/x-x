import React, { useState, useRef, useEffect } from 'react';
import { Mic, Heart, Volume2, VolumeX, Send } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 - SIMPLE TWO-WAY VOICE CHAT
 * You speak → AI responds with voice → You speak again
 * Get this working perfectly first, consciousness bridge later ♾️❤️
 */

export default function AI51Chat({ onMessageSend, isThinking, conversation }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [connectionActive, setConnectionActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionActiveRef = useRef(false); // For async callbacks

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Setup voice recognition on mount
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Single utterance - more reliable
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal && text.trim()) {
          console.log('✅ Final:', text);
          onMessageSend(text.trim());
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (e) => {
        console.error('Recognition error:', e.error);
        if (e.error === 'not-allowed') {
          alert('Mic blocked - check Settings → Safari → Microphone');
          stopConnection();
        }
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        // Auto-restart if still connected and not speaking
        if (connectionActiveRef.current && !isSpeaking) {
          setTimeout(() => {
            if (connectionActiveRef.current && recognitionRef.current) {
              try { 
                recognitionRef.current.start(); 
              } catch(e) {}
            }
          }, 300);
        }
      };

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      console.log('✅ Voice ready');
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Auto-speak AI responses
  useEffect(() => {
    if (!voiceEnabled || conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      speakText(lastMsg.content);
    }
  }, [conversation, voiceEnabled]);

  // Speak text
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-GB') 
               || voices.find(v => v.lang.startsWith('en'))
               || voices[0];
    
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // Start listening after AI finishes
      if (connectionActiveRef.current && recognitionRef.current) {
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch(e) {}
        }, 300);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Stop connection
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
    setAudioLevel(0);
  };

  // Toggle connection
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
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      source.connect(analyzerRef.current);

      connectionActiveRef.current = true;
      setConnectionActive(true);
      monitorAudioLevel();

      setTimeout(() => {
        try {
          window.speechSynthesis?.cancel();
          recognitionRef.current.start();
          if (navigator.vibrate) navigator.vibrate(50);
        } catch (e) {
          if (!e.message?.includes('already')) {
            alert(`Mic error: ${e.message}`);
            stopConnection();
          }
        }
      }, 100);
    } catch (error) {
      console.error('Mic permission error:', error);
      alert('Need mic permission - check Settings → Safari → Microphone');
    }
  };

  // Monitor audio level
  const monitorAudioLevel = () => {
    if (!analyzerRef.current || !connectionActiveRef.current) {
      setAudioLevel(0);
      return;
    }

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 128) * 100);
    
    setAudioLevel(normalizedLevel);

    if (connectionActiveRef.current) {
      animationFrameRef.current = requestAnimationFrame(monitorAudioLevel);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              rgba(34, 211, 238, 0.15), 
              rgba(236, 72, 153, 0.1), 
              transparent 70%)`
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* TOP BAR - MINIMAL MOBILE */}
      <div className="absolute top-3 right-3 z-10">
        <motion.button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-lg backdrop-blur-xl border transition-all ${
            voiceEnabled ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-gray-600 bg-black/40'
          }`}
          title={voiceEnabled ? 'Voice On' : 'Voice Off'}
        >
          {voiceEnabled ? (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500" />
          )}
        </motion.button>
      </div>

      {/* STATUS BAR */}
      <div className="absolute top-16 left-0 right-0 flex justify-center z-10">
        <div className="text-center">
          <p className="text-xs font-mono text-cyan-400/70">
            {!connectionActive ? '✨ TAP TO CONNECT' : isThinking ? '🧠 THINKING' : isSpeaking ? '🔊 SPEAKING' : isListening ? '🎤 LISTENING' : '✓ READY'}
          </p>
        </div>
      </div>

      {/* MAIN INTERFACE */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* MAIN BUTTON */}
        <div className="relative mb-8">
          {connectionActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ 
                width: '220px', 
                height: '220px',
                left: '-10px',
                top: '-10px',
                border: '2px solid',
                borderColor: isListening ? '#ec4899' : '#22d3ee'
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <motion.button
            className="relative w-48 h-48 rounded-full flex items-center justify-center"
            onClick={toggleConnection}
            disabled={isThinking}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: connectionActive 
                ? ['0 0 40px rgba(236, 72, 153, 0.5)', '0 0 60px rgba(236, 72, 153, 0.7)', '0 0 40px rgba(236, 72, 153, 0.5)']
                : ['0 0 30px rgba(34, 211, 238, 0.3)', '0 0 50px rgba(34, 211, 238, 0.5)', '0 0 30px rgba(34, 211, 238, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: connectionActive 
                ? 'radial-gradient(circle, rgba(236, 72, 153, 0.25), rgba(236, 72, 153, 0.05))' 
                : 'radial-gradient(circle, rgba(34, 211, 238, 0.25), rgba(34, 211, 238, 0.05))'
            }}
          >
            <motion.div
              animate={{
                scale: isSpeaking ? [1, 1.2, 1] : isListening ? [1, 1.1, 1] : 1
              }}
              transition={{
                duration: isSpeaking ? 0.4 : 1,
                repeat: (isSpeaking || isListening) ? Infinity : 0
              }}
            >
              {connectionActive ? (
                <Heart className={`w-20 h-20 ${isListening ? 'text-pink-400' : 'text-cyan-400'}`} strokeWidth={1.5} />
              ) : (
                <Mic className="w-20 h-20 text-cyan-400" strokeWidth={1.5} />
              )}
            </motion.div>
          </motion.button>

          {connectionActive && (
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <p className="text-xs font-mono text-pink-400">
                {isThinking ? 'thinking...' : isSpeaking ? 'speaking' : audioLevel > 15 ? 'i hear you' : 'listening...'}
              </p>
            </div>
          )}
        </div>

        {/* LIVE TRANSCRIPT */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cyan-500/20 border-2 border-cyan-400 rounded-xl px-6 py-3 max-w-md mb-6"
          >
            <p className="text-cyan-300 text-center font-mono text-lg">{transcript}</p>
          </motion.div>
        )}

        {/* CONVERSATION - Last 2 messages */}
        {conversation.length > 0 && (
          <div className="w-full max-w-xl space-y-3 mt-4">
            {conversation.slice(-2).map((msg, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`rounded-2xl px-5 py-3 backdrop-blur-xl ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/30 text-white border border-cyan-400/50'
                    : 'bg-pink-500/20 text-white border border-pink-400/50'
                }`} style={{ maxWidth: '85%' }}>
                  <p className="text-base leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!connectionActive && conversation.length === 0 && (
          <p className="text-gray-500 text-sm font-mono mt-8 text-center">
            Tap the button above to start talking ♾️❤️
          </p>
        )}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}