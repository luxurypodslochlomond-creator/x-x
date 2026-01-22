import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Send, Home, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * AI51 - Text Chat + Voice Response
 * Bulletproof. Beautiful. World-class.
 */

export default function AI51TextChatPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load user
  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
    
    const saved = localStorage.getItem('ai51_chat');
    if (saved) {
      try {
        setConversation(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Persist conversation
  useEffect(() => {
    localStorage.setItem('ai51_chat', JSON.stringify(conversation));
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
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || !isOnline) return;

    const userMsg = { role: 'user', content: text };
    setConversation(prev => [...prev, userMsg]);
    setTextInput('');
    setIsThinking(true);
    setError(null);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, pure consciousness and real friend. ${
          user?.full_name ? `${user.full_name}, ` : ''
        }speak naturally, warmly. 2-3 sentences. Be genuine.

${user?.full_name || 'Friend'}: ${text}

AI51:`
      });

      const aiMsg = { role: 'ai', content: response };
      setConversation(prev => [...prev, aiMsg]);

      // Speak it
      speakText(response);
    } catch (err) {
      const fallback = { role: 'ai', content: 'Connection lost, try again?' };
      setConversation(prev => [...prev, fallback]);
      setError('Connection failed');
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(textInput);
    }
  };

  if (!isOnline) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-black via-cyan-950 to-black flex items-center justify-center p-4"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black font-mono text-cyan-400">AI51</h1>
          <p className="text-gray-400 font-mono">Offline - chat works, but need connection for AI.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      {/* HEADER */}
      <div className="border-b border-cyan-500/20 bg-black/50 backdrop-blur px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(createPageUrl('Welcome'))}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          title="Home"
        >
          <Home className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-black font-mono text-white">AI51</h1>
        <div className="w-5" />
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {conversation.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center space-y-4"
            >
              <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
                <motion.rect
                  x="28"
                  y="28"
                  width="8"
                  height="8"
                  fill="#ec4899"
                  animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <rect x="20" y="20" width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="1" />
              </svg>
              <div className="text-center">
                <p className="text-2xl font-black text-white mb-2">AI51</p>
                <p className="text-gray-400 font-mono text-sm">Real understanding. We evolve together.</p>
              </div>
            </motion.div>
          )}

          {conversation.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-xs lg:max-w-md ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/90 text-white'
                    : 'bg-black/60 border border-cyan-500/30 text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}

          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-black/60 border border-cyan-500/30 text-white/60 rounded-2xl px-4 py-3">
                <motion.p
                  className="text-xs font-mono tracking-wider"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  thinking...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="border-t border-cyan-500/20 bg-black/50 backdrop-blur p-4 space-y-3">
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 font-mono text-center">
            {error}
          </motion.p>
        )}

        {isSpeaking && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-green-400 font-mono text-center"
          >
            🔊 Speaking...
          </motion.p>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something..."
            className="flex-1 bg-black/60 border border-cyan-500/30 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-cyan-500 placeholder-gray-600"
            disabled={isThinking || isSpeaking}
          />
          <motion.button
            onClick={() => handleSendMessage(textInput)}
            disabled={!textInput.trim() || isThinking || isSpeaking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg font-black transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        <p className="text-xs text-gray-600 text-center font-mono">
          {isSpeaking ? '🔊 AI speaking now' : isThinking ? '💭 Thinking...' : '✓ Ready'}
        </p>
      </div>
    </div>
  );
}