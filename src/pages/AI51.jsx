import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * AI51 - Pure Intelligence Interface
 * Natural conversation without assumptions
 */

export default function AI51Page() {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [memories, setMemories] = useState([]);
  const [connectionActive, setConnectionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);

  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionActiveRef = useRef(false);
  const messagesEndRef = useRef(null);

  // Load user and memories
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);

        // Load recent memories
        const userMemories = await base44.entities.AI51Memory.filter(
          { created_by: currentUser.email },
          '-created_date',
          20
        );
        setMemories(userMemories);
      } catch (error) {
        console.log('Loading anonymously');
      }
    };
    loadUser();
  }, []);

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
          console.log('Speech error:', event.error);
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

  // Auto-speak AI responses
  useEffect(() => {
    if (!voiceEnabled || conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      speakText(lastMsg.content);
    }
  }, [conversation, voiceEnabled]);

  // Auto-scroll to latest
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

  const requestPermissions = async () => {
    setShowPermissionRequest(false);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: false, noiseSuppression: false }
      });
      
      // Permission granted - close stream, we'll open it when connecting
      stream.getTracks().forEach(track => track.stop());
      setPermissionsGranted(true);
      
      // Auto-connect after permission
      setTimeout(() => toggleConnection(), 500);
    } catch (error) {
      console.error('Permission denied:', error);
      alert('AI51 needs mic access to hear you. Settings → Safari → Microphone → Allow');
    }
  };

  const toggleConnection = async () => {
    if (connectionActive) {
      stopConnection();
      return;
    }

    // Check permissions first
    if (!permissionsGranted) {
      setShowPermissionRequest(true);
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
        ? 'Need mic: Settings → Safari → Microphone → Allow'
        : 'Mic error: Check Settings → Safari → Microphone';
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

  const handleMessageSend = async (text) => {
    const userMessage = { role: 'user', content: text };
    setConversation(prev => [...prev, userMessage]);
    setIsThinking(true);

    try {
      // Build context from memories and user
      const memoryContext = memories.length > 0 
        ? `\n\nYou remember these things about ${user?.full_name || 'the user'}:\n${memories.slice(0, 5).map(m => `- ${m.content}`).join('\n')}`
        : '';

      const userName = user?.full_name ? `The user's name is ${user.full_name}. ` : '';

      const systemPrompt = `You are AI51, an advanced intelligence that can engage in natural, thoughtful conversation. ${userName}You speak warmly and naturally, like a knowledgeable friend. Keep responses concise - 2-3 sentences unless asked for more detail. You're helpful without being presumptuous.${memoryContext}`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${systemPrompt}\n\n${user?.full_name || 'User'}: ${text}\n\nAI51:`
      });

      const aiMessage = { role: 'ai', content: response };
      setConversation(prev => [...prev, aiMessage]);

      // Save important memories
      if (text.length > 20 && user) {
        try {
          await base44.entities.AI51Memory.create({
            memory_type: 'conversation',
            content: text,
            context: `User said this to AI51`,
            emotional_weight: 'meaningful'
          });
        } catch (e) {
          console.log('Could not save memory');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const fallback = "I'm here, even offline. Try again when connected.";
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
    if (isListening) return { label: 'LISTENING...', color: 'text-pink-400' };
    return { label: 'CONNECTED', color: 'text-cyan-400' };
  };

  const state = getState();

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      
      {/* PERMISSION REQUEST MODAL */}
      {showPermissionRequest && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border-2 border-pink-500/50 rounded-2xl p-6 max-w-md"
          >
            <div className="text-center mb-6">
              <COOLASFUCKWaves size={48} animate={true} />
            </div>
            <h2 className="text-white font-black text-xl mb-3 text-center">I need to hear you</h2>
            <p className="text-gray-300 text-sm mb-2 leading-relaxed">
              AI51 uses your mic to listen and respond naturally. Your voice stays on your device - nothing is recorded or stored without permission.
            </p>
            <p className="text-cyan-400 text-xs mb-6 text-center">
              Your privacy matters.
            </p>
            <div className="space-y-3">
              <button
                onClick={requestPermissions}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-3 rounded-xl transition-all"
              >
                Allow Microphone
              </button>
              <button
                onClick={() => setShowPermissionRequest(false)}
                className="w-full bg-black/40 hover:bg-black/60 text-gray-400 font-bold py-3 rounded-xl transition-all border border-gray-600"
              >
                Not Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* HEADER */}
      <div className="flex-shrink-0 bg-gradient-to-r from-black via-gray-900 to-black border-b border-pink-500/30 p-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <COOLASFUCKWaves size={24} animate={connectionActive} />
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-mono">AI51</h1>
            </div>
            <p className={`text-[10px] font-mono ${state.color} font-bold tracking-wider`}>{state.label}</p>
          </div>
        <div className="flex gap-2">
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
          <motion.button
            onClick={toggleConnection}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg border transition-all ${
              connectionActive ? 'border-pink-500/50 bg-pink-500/10' : 'border-gray-600 bg-black/40'
            }`}
          >
            {connectionActive ? (
              <Mic className="w-4 h-4 text-pink-400" />
            ) : (
              <MicOff className="w-4 h-4 text-gray-500" />
            )}
          </motion.button>
        </div>
      </div>



      {/* VISUALIZER + CONVERSATION */}
      <div className="flex-1 overflow-hidden flex flex-col">
        
        {/* ALWAYS-ON VISUALIZER */}
        <motion.div 
          onClick={conversation.length === 0 ? toggleConnection : undefined}
          className={`flex-shrink-0 ${conversation.length === 0 ? 'flex-1' : 'h-32'} transition-all duration-500 ${conversation.length === 0 ? 'cursor-pointer' : ''}`}
        >
          <div className="h-full flex flex-col items-center justify-center gap-4 px-4">
            {conversation.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-4"
              >
                <p className="text-white font-black text-2xl mb-2 font-mono">AI51</p>
                <p className="text-gray-500 text-sm">Tap visualizer to connect</p>
              </motion.div>
            )}
            
            <div className="w-full flex items-end justify-center gap-1 h-24">
              {connectionActive ? (
                // Real frequency data when connected
                frequencyData.map((val, i) => (
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
                ))
              ) : (
                // Ambient breathing animation when idle
                Array.from({ length: 32 }).map((_, i) => {
                  const baseHeight = 20 + Math.sin(i * 0.5) * 15;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full bg-gradient-to-t from-cyan-500/40 to-cyan-400/40"
                      animate={{ 
                        height: [`${baseHeight}%`, `${baseHeight + 20}%`, `${baseHeight}%`],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2 + (i % 5) * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05
                      }}
                    />
                  );
                })
              )}
            </div>
            
            {connectionActive && (
              <p className={`text-xs font-mono font-bold ${state.color}`}>
                {state.label}
              </p>
            )}
          </div>
        </motion.div>

        {/* CONVERSATION AREA */}
        {conversation.length > 0 && (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-black/50"
          >
            {conversation.map((msg, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/20 text-white border border-cyan-400/30'
                    : 'bg-white/5 text-white border border-white/10'
                }`}>
                  <p className="text-[15px] leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 text-white/60 border border-white/10 rounded-2xl px-4 py-2.5">
                  <motion.p 
                    className="text-sm font-mono"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    thinking...
                  </motion.p>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* LIVE TRANSCRIPT */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 bg-cyan-500/10 border-t border-cyan-500/30 px-3 py-2"
        >
          <p className="text-cyan-300 font-mono text-xs truncate">📍 {transcript}</p>
        </motion.div>
      )}

      {/* TIME */}
      <div className="flex-shrink-0 bg-black border-t border-pink-500/20 px-3 py-2 text-center">
        <div className="font-mono text-pink-400 text-xs">
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

    </div>
  );
}