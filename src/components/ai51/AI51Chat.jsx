import React, { useState, useRef, useEffect } from 'react';
import { Mic, Heart, Volume2, VolumeX, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AI51ChatHistory from './AI51ChatHistory';

/**
 * AI51 - PROFESSIONAL P2P VOICE + TEXT
 * Live waveform visualizer + full chat visible + real-time state
 * ♾️❤️
 */

export default function AI51Chat({ onMessageSend, isThinking, conversation, localMemory }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [connectionActive, setConnectionActive] = useState(false);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionActiveRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

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

        if (event.results[current].isFinal && text.trim()) {
          onMessageSend(text.trim());
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (e) => {
        if (e.error === 'not-allowed') {
          alert('Mic blocked - check Settings → Safari → Microphone');
          stopConnection();
        }
        setIsListening(false);
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
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (!voiceEnabled || conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      speakText(lastMsg.content);
    }
  }, [conversation, voiceEnabled]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
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
    utterance.onerror = () => setIsSpeaking(false);
    
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
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 64;
      source.connect(analyzerRef.current);

      connectionActiveRef.current = true;
      setConnectionActive(true);
      monitorFrequency();

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

  const monitorFrequency = () => {
    if (!analyzerRef.current || !connectionActiveRef.current) return;

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);
    
    const compressed = new Uint8Array(32);
    const bucketSize = Math.floor(dataArray.length / 32);
    for (let i = 0; i < 32; i++) {
      let sum = 0;
      for (let j = 0; j < bucketSize; j++) {
        sum += dataArray[i * bucketSize + j];
      }
      compressed[i] = Math.floor(sum / bucketSize);
    }
    
    setFrequencyData(compressed);

    if (connectionActiveRef.current) {
      animationFrameRef.current = requestAnimationFrame(monitorFrequency);
    }
  };

  const getState = () => {
    if (!connectionActive) return { label: 'TAP TO CONNECT', color: 'text-cyan-400', dot: 'bg-cyan-400' };
    if (isThinking) return { label: 'THINKING', color: 'text-amber-400', dot: 'bg-amber-400' };
    if (isSpeaking) return { label: 'SPEAKING', color: 'text-green-400', dot: 'bg-green-400' };
    if (isListening) return { label: 'LISTENING', color: 'text-pink-400', dot: 'bg-pink-400' };
    return { label: 'READY', color: 'text-cyan-400', dot: 'bg-cyan-400' };
  };

  const state = getState();

  return (
    <div className="flex flex-col h-screen bg-black">
      
      <AI51ChatHistory 
        localMemory={localMemory}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onLoadChat={(chat) => {
          // Load conversation from history
          if (chat.messages) {
            // onMessageSend prop should handle loading past conversation
            // For now, just show it was loaded
            console.log('Loaded chat:', chat);
          }
        }}
      />
      
      {/* HEADER - STATE + CONTROLS */}
      <div className="bg-black border-b border-cyan-500/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            className={`w-2 h-2 rounded-full ${state.dot}`}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className={`font-mono text-sm font-bold ${state.color}`}>{state.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setShowHistory(true)}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-500/60 bg-black/40 hover:bg-cyan-500/10 transition-all"
          >
            <Clock className="w-4 h-4 text-cyan-400" />
          </motion.button>
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
      </div>

      {/* CHAT HISTORY - SCROLLABLE */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {conversation.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-600 text-sm font-mono">Connect and start talking</p>
          </div>
        ) : (
          conversation.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`rounded-xl px-4 py-2 max-w-xs ${
                msg.role === 'user'
                  ? 'bg-cyan-500/20 text-white border border-cyan-400/50'
                  : 'bg-pink-500/20 text-white border border-pink-400/50'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* LIVE TRANSCRIPT */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-cyan-500/10 border-t border-cyan-500/30 px-4 py-3"
        >
          <p className="text-cyan-300 font-mono text-sm">{transcript}</p>
        </motion.div>
      )}

      {/* WAVEFORM VISUALIZER */}
      <div className="flex-shrink-0 bg-black border-t border-cyan-500/20 px-4 py-3 flex items-end justify-center gap-1 h-14">
        {connectionActive ? (
          frequencyData.map((val, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${
                isListening ? 'bg-pink-400' : isSpeaking ? 'bg-green-400' : 'bg-cyan-400'
              }`}
              animate={{ height: `${Math.min(100, (val / 255) * 100)}%` }}
              transition={{ type: 'tween', duration: 0.05 }}
            />
          ))
        ) : (
          <svg width="80" height="40" viewBox="0 0 80 40" className="opacity-30">
            {[...Array(16)].map((_, i) => (
              <rect
                key={i}
                x={i * 5}
                y="15"
                width="3"
                height="10"
                fill="rgba(34, 211, 238, 0.3)"
              />
            ))}
          </svg>
        )}
      </div>

      {/* MAIN BUTTON */}
      <div className="flex-shrink-0 bg-black border-t border-cyan-500/20 p-4 flex justify-center">
        <motion.button
          className="w-20 h-20 rounded-full flex items-center justify-center relative"
          onClick={toggleConnection}
          disabled={isThinking}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: connectionActive 
              ? ['0 0 30px rgba(236, 72, 153, 0.4)', '0 0 50px rgba(236, 72, 153, 0.6)', '0 0 30px rgba(236, 72, 153, 0.4)']
              : ['0 0 20px rgba(34, 211, 238, 0.2)', '0 0 35px rgba(34, 211, 238, 0.4)', '0 0 20px rgba(34, 211, 238, 0.2)']
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            background: connectionActive 
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05))' 
              : 'radial-gradient(circle, rgba(34, 211, 238, 0.15), rgba(34, 211, 238, 0.05))',
            border: '2px solid',
            borderColor: connectionActive ? 'rgba(236, 72, 153, 0.5)' : 'rgba(34, 211, 238, 0.5)'
          }}
        >
          {connectionActive ? (
            <Heart className={`w-8 h-8 ${isListening ? 'text-pink-400' : 'text-cyan-400'}`} strokeWidth={1.5} />
          ) : (
            <Mic className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
          )}
        </motion.button>
      </div>

      {/* TEXT INPUT */}
      <div className="flex-shrink-0 bg-black border-t border-cyan-500/20 p-3 flex gap-2">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && textInput.trim()) {
              onMessageSend(textInput.trim());
              setTextInput('');
            }
          }}
          placeholder="Type here..."
          className="flex-1 bg-black/40 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/60"
        />
        <motion.button
          onClick={() => {
            if (textInput.trim()) {
              onMessageSend(textInput.trim());
              setTextInput('');
            }
          }}
          whileTap={{ scale: 0.9 }}
          disabled={!textInput.trim()}
          className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}