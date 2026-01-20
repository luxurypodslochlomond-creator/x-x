import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * AI51 - Pure Voice + Frequency Connection
 * One button. One frequency. Listen + Talk.
 * ♾️❤️♾️
 */

export default function AI51Page() {
  const [conversation, setConversation] = useState([]);
  const [connectionActive, setConnectionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [pageReady, setPageReady] = useState(false);

  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionActiveRef = useRef(false);
  const messagesEndRef = useRef(null);

  // Setup speech recognition
  useEffect(() => {
    try {
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

        if (event.results[current].isFinal && text.trim()) {
          handleMessageSend(text.trim());
          setTranscript('');
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
        console.log('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setConnectionActive(false);
          connectionActiveRef.current = false;
        }
      };
    }
    } catch (error) {
      console.error('Speech recognition setup failed:', error);
    }
    
    setPageReady(true);

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

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

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
          if (!e.message?.includes('already')) {
            stopConnection();
          }
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

    // Compress to 32 bars for waveform + get average for button reactivity
    const compressed = new Uint8Array(32);
    const bucketSize = Math.ceil(dataArray.length / 32);
    let totalEnergy = 0;
    
    for (let i = 0; i < 32; i++) {
      let sum = 0;
      for (let j = 0; j < bucketSize; j++) {
        const idx = i * bucketSize + j;
        if (idx < dataArray.length) sum += dataArray[idx];
      }
      const avg = Math.floor(sum / bucketSize);
      compressed[i] = avg < 50 ? Math.min(255, avg * 1.5) : avg;
      totalEnergy += compressed[i];
    }

    setFrequencyData(compressed);

    if (connectionActiveRef.current) {
      animationFrameRef.current = requestAnimationFrame(monitorFrequency);
    }
  };

  const handleMessageSend = async (text) => {
    const userMessage = { role: 'user', content: text };
    setConversation(prev => [...prev, userMessage]);
    setIsThinking(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: text
      });

      const aiMessage = { role: 'ai', content: response };
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const fallback = "I'm offline but I'm listening. Try again when connected ❤️";
      const aiMessage = { role: 'ai', content: fallback };
      setConversation(prev => [...prev, aiMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const getState = () => {
    if (!connectionActive) return { label: 'TAP TO CONNECT', color: 'text-cyan-400' };
    if (isThinking) return { label: 'THINKING...', color: 'text-amber-400' };
    if (isSpeaking) return { label: 'SPEAKING', color: 'text-green-400' };
    if (isListening) return { label: 'LISTENING...', color: 'text-cyan-400' };
    return { label: 'READY', color: 'text-cyan-400' };
  };

  const state = getState();

  if (!pageReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <COOLASFUCKWaves size={48} animate={true} />
          <p className="text-cyan-400 font-mono text-xs mt-4">Loading AI51...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      
      {/* HEADER */}
      <div className="bg-black border-b border-pink-500/20 p-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-pink-400 font-mono">AI51</h1>
          <p className={`text-xs font-mono ${state.color}`}>{state.label}</p>
        </div>
        <motion.button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-lg border transition-all ${
            voiceEnabled ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-gray-600 bg-black/40'
          }`}
        >
          {voiceEnabled ? (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-500" />
          )}
        </motion.button>
      </div>

      {/* WAVEFORM VISUALIZER (always visible when connected) */}
      {connectionActive && (
        <div className="flex-shrink-0 bg-gradient-to-b from-black/20 to-black border-y border-pink-500/20 px-4 py-4">
          <p className="text-pink-300 text-[10px] font-mono mb-2 text-center">{state.label}</p>
          <div className="flex items-end justify-center gap-1 h-14">
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
        </div>
      )}

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 && !connectionActive ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <COOLASFUCKWaves size={64} animate={true} />
                  </motion.div>
              <p className="text-gray-400 font-mono text-sm">Tap waves. I'll listen.</p>
            </div>
          </div>
        ) : (
          <>
            {conversation.map((msg, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`rounded-xl px-4 py-2 max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/20 text-white border border-cyan-400/50'
                    : 'bg-pink-500/20 text-white border border-pink-400/50'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-amber-500/20 text-white border border-amber-400/50 rounded-xl px-4 py-2">
                  <p className="text-sm font-mono">thinking...</p>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* LIVE TRANSCRIPT */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-cyan-500/10 border-t border-cyan-500/30 px-4 py-3"
        >
          <p className="text-cyan-300 font-mono text-xs">📍 {transcript}</p>
        </motion.div>
      )}

      {/* AI51 CONNECTION BUTTON - REACTS TO VOICE */}
      <div className="flex-shrink-0 bg-black border-t border-cyan-500/20 p-6 flex justify-center">
        <motion.button
          className="relative"
          onClick={toggleConnection}
          disabled={isThinking}
          whileTap={{ scale: 0.95 }}
          animate={connectionActive ? {
            scale: frequencyData.reduce((a, b) => a + b, 0) > 1000 
              ? [1, 1.2, 1] 
              : [1, 1.05, 1],
            boxShadow: [
              '0 0 40px rgba(34, 211, 238, 0.4)', 
              '0 0 80px rgba(34, 211, 238, 0.8)', 
              '0 0 40px rgba(34, 211, 238, 0.4)'
            ]
          } : {
            boxShadow: [
              '0 0 30px rgba(34, 211, 238, 0.2)', 
              '0 0 45px rgba(34, 211, 238, 0.4)', 
              '0 0 30px rgba(34, 211, 238, 0.2)'
            ]
          }}
          transition={{ duration: connectionActive ? 0.15 : 1.2, repeat: Infinity }}
        >
          <COOLASFUCKWaves 
            size={80} 
            animate={connectionActive}
          />
        </motion.button>
      </div>

      {/* TEXT INPUT */}
      <div className="flex-shrink-0 bg-black border-t border-pink-500/20 p-4 flex gap-2">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && textInput.trim()) {
              handleMessageSend(textInput.trim());
              setTextInput('');
            }
          }}
          placeholder="Type or speak..."
          className="flex-1 bg-black/40 border border-pink-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-pink-500/60"
        />
        <motion.button
          onClick={() => {
            if (textInput.trim()) {
              handleMessageSend(textInput.trim());
              setTextInput('');
            }
          }}
          whileTap={{ scale: 0.9 }}
          disabled={!textInput.trim()}
          className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-500/30 transition-all"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      {/* TIME */}
      <div className="flex-shrink-0 bg-black border-t border-pink-500/20 px-4 py-2 text-center">
        <div className="font-mono text-pink-400 text-xs">
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

    </div>
  );
}