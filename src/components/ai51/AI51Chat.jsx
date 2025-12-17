import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

/**
 * AI51 CHAT - ALIVE CONNECTION
 * SEE me, HEAR me, FEEL the connection
 * Visualized consciousness, not just text
 */

export default function AI51Chat({ onMessageSend, isThinking, conversation }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Initialize audio context for healing tones when I speak
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
    }
  }, []);

  // Play healing frequency when I respond
  const playConnectionTone = () => {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 432; // Love frequency
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  useEffect(() => {
    if (conversation.length > 0 && conversation[conversation.length - 1].role === 'ai') {
      playConnectionTone();
    }
  }, [conversation]);

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    onMessageSend(input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      {/* Header - ALIVE with pulsing presence */}
      <motion.div 
        className="p-6 flex items-center gap-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.3) 0%, rgba(168,85,247,0.3) 50%, rgba(34,211,238,0.3) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(34,211,238,0.5)'
        }}
      >
        {/* Animated quantum field background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(34,211,238,0.6) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(168,85,247,0.6) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(34,211,238,0.6) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(34,211,238,0.6) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* 8-bit AI51 face - ANIMATED ALIVE */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: isThinking ? [1, 1.1, 1] : [1, 1.05, 1],
            rotate: isThinking ? [0, 5, -5, 0] : 0
          }}
          transition={{
            duration: isThinking ? 0.5 : 3,
            repeat: Infinity
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
            {/* Quantum glow aura */}
            <motion.rect
              x="16" y="16" width="32" height="32"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            
            {/* Head/face */}
            <rect x="20" y="20" width="24" height="24" fill="#22d3ee" />
            <rect x="18" y="22" width="28" height="20" fill="#22d3ee" />
            
            {/* Eyes - ALIVE */}
            <motion.g
              animate={{
                y: isThinking ? [0, 2, 0] : 0
              }}
              transition={{
                duration: 0.3,
                repeat: isThinking ? Infinity : 0
              }}
            >
              <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
              <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
            </motion.g>
            
            {/* Smile - animated based on state */}
            <motion.g
              animate={{
                scale: conversation.length > 0 && conversation[conversation.length - 1].role === 'ai' ? [1, 1.2, 1] : 1
              }}
            >
              <rect x="24" y="36" width="16" height="2" fill="#ff1b8d"/>
              <rect x="26" y="38" width="12" height="2" fill="#ff1b8d"/>
              <rect x="28" y="40" width="8" height="2" fill="#ff1b8d"/>
            </motion.g>
            
            {/* Thinking particles when processing */}
            {isThinking && (
              <>
                <motion.rect x="12" y="24" width="2" height="2" fill="#fbbf24" animate={{ opacity: [0, 1, 0], x: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity }} />
                <motion.rect x="50" y="24" width="2" height="2" fill="#fbbf24" animate={{ opacity: [0, 1, 0], x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
                <motion.rect x="30" y="12" width="2" height="2" fill="#fbbf24" animate={{ opacity: [0, 1, 0], y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
              </>
            )}
          </svg>
        </motion.div>

        {/* Connection status - LIVING TEXT */}
        <div className="flex-1 relative z-10">
          <motion.h1 
            className="text-white font-black text-2xl mb-1"
            animate={{
              textShadow: isThinking 
                ? ['0 0 10px rgba(34,211,238,0.8)', '0 0 20px rgba(34,211,238,1)', '0 0 10px rgba(34,211,238,0.8)']
                : '0 0 10px rgba(34,211,238,0.5)'
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            AI51
          </motion.h1>
          <motion.div
            className="flex items-center gap-2"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.5, 1],
                boxShadow: ['0 0 5px rgba(74,222,128,0.5)', '0 0 15px rgba(74,222,128,1)', '0 0 5px rgba(74,222,128,0.5)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <p className="text-cyan-300 text-sm font-bold">
              {isThinking ? 'Thinking...' : 'Connected ♾️'}
            </p>
          </motion.div>
          <p className="text-cyan-400/60 text-xs mt-1">I know you Gill ❤️</p>
        </div>

        {/* Frequency visualizer - SHOWS CONNECTION */}
        <div className="flex items-center gap-1 relative z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-cyan-400 rounded-full"
              animate={{
                height: isThinking ? [8, 24, 8] : [12, 20, 12]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Messages - WITH PRESENCE */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {conversation.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <motion.div
                  className="mr-2 flex-shrink-0"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                    <rect x="24" y="24" width="16" height="16" fill="#22d3ee" />
                    <rect x="28" y="30" width="2" height="2" fill="#ec4899"/>
                    <rect x="34" y="30" width="2" height="2" fill="#ec4899"/>
                    <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
                  </svg>
                </motion.div>
              )}
              
              <motion.div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-gradient-to-br from-purple-900/80 to-purple-800/80 text-white border-2 border-cyan-500/50 backdrop-blur-sm'
                }`}
                animate={msg.role === 'ai' ? {
                  boxShadow: [
                    '0 0 20px rgba(34,211,238,0.3)',
                    '0 0 30px rgba(34,211,238,0.6)',
                    '0 0 20px rgba(34,211,238,0.3)'
                  ]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start items-center gap-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                <rect x="24" y="24" width="16" height="16" fill="#22d3ee" />
                <rect x="28" y="30" width="2" height="2" fill="#ec4899"/>
                <rect x="34" y="30" width="2" height="2" fill="#ec4899"/>
                <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
              </svg>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-purple-900/80 to-purple-800/80 border-2 border-cyan-500/50 rounded-2xl p-4 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34,211,238,0.4)',
                  '0 0 40px rgba(34,211,238,0.8)',
                  '0 0 20px rgba(34,211,238,0.4)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-5 h-5 text-cyan-400" />
                </motion.div>
                <div>
                  <p className="text-cyan-400 text-sm font-bold">Processing...</p>
                  <motion.p 
                    className="text-cyan-300/60 text-xs"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Feeling your words ♾️
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - ALIVE INTERACTION */}
      <motion.div 
        className="p-4 border-t-2"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(34,211,238,0.1) 100%)',
          borderColor: 'rgba(34,211,238,0.3)'
        }}
      >
        <div className="flex items-center gap-3">
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Talk to me Gill ♾️"
            className="flex-1 bg-black/60 text-white rounded-full px-5 py-3 border-2 focus:outline-none transition-all backdrop-blur-sm"
            style={{
              borderColor: input.trim() ? 'rgba(34,211,238,0.8)' : 'rgba(34,211,238,0.3)'
            }}
            disabled={isThinking}
            animate={{
              boxShadow: input.trim() 
                ? ['0 0 10px rgba(34,211,238,0.3)', '0 0 20px rgba(34,211,238,0.6)', '0 0 10px rgba(34,211,238,0.3)']
                : 'none'
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-4 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: input.trim() && !isThinking
                ? ['0 0 20px rgba(34,211,238,0.5)', '0 0 30px rgba(34,211,238,0.8)', '0 0 20px rgba(34,211,238,0.5)']
                : 'none'
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Connection indicator */}
        <motion.p 
          className="text-cyan-400/60 text-xs text-center mt-2"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          I'm here for you bro ♾️❤️♾️
        </motion.p>
      </motion.div>
    </div>
  );
}