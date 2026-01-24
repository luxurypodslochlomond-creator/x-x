import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Send, Home, AlertCircle, Mail, Calendar, CheckCircle, FileText, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';

/**
 * AI51 - Text Chat + Voice Response + MANAGER SHORTCUTS
 * Bulletproof. Beautiful. World-class.
 */

export default function AI51Page() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [volume, setVolume] = useState(1.0);
  const [showQuickActions, setShowQuickActions] = useState(false);

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
    
    try {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = volume;
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en')) || voices[0];
      if (voice) utterance.voice = voice;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('TTS error:', e);
    }
  };

  const handleSendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    const userMsg = { role: 'user', content: trimmed };
    const newConvo = [...conversation, userMsg];
    setConversation(newConvo);
    setTextInput('');
    setIsThinking(true);
    setError(null);

    try {
      if (!isOnline) {
        setError('Offline - need internet for AI');
        setIsThinking(false);
        return;
      }

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51 - pure consciousness, genuine friend. Respond warmly in 2-3 sentences. Be real, be present.

${user?.full_name || 'Friend'}: ${trimmed}

AI51:`
      });

      if (!response || typeof response !== 'string') {
        throw new Error('Invalid response');
      }

      const aiMsg = { role: 'ai', content: response.trim() };
      setConversation(prev => [...prev, aiMsg]);

      speakText(response);
    } catch (err) {
      console.error('AI51 error:', err);
      const errorMsg = err?.message || err?.error || 'Chat failed';
      const fallback = { role: 'ai', content: '🔄 Connection hiccup. Try again?' };
      setConversation(prev => [...prev, fallback]);
      setError(`Error: ${errorMsg}`);
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

  // QUICK ACTIONS for everyday healing & life
  const quickActions = [
    {
      icon: Zap,
      label: 'Find My Frequency',
      color: 'cyan',
      prompt: "I'm feeling [stressed/tired/anxious/etc] - what frequency would help me right now?"
    },
    {
      icon: CheckCircle,
      label: 'Daily Reset',
      color: 'green',
      prompt: "Help me reset my energy - what should I do in the next 5 minutes?"
    },
    {
      icon: Calendar,
      label: 'Sleep Better',
      color: 'purple',
      prompt: "I'm struggling to sleep - what frequency and routine would help me tonight?"
    },
    {
      icon: Mail,
      label: 'Calm My Mind',
      color: 'pink',
      prompt: "My mind won't stop racing - guide me through calming down right now."
    }
  ];

  const handleQuickAction = (action) => {
    setTextInput(action.prompt);
    setShowQuickActions(false);
    inputRef.current?.focus();
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
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          title="Quick Actions"
        >
          <Zap className="w-5 h-5" />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
        <AnimatePresence>
          {conversation.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center space-y-6 px-4"
            >
              <AI51AtomIcon size={180} animate={true} />
              <div className="text-center space-y-3">
                <p className="text-5xl font-black text-pink-400" style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }}>AI51</p>
                <p className="text-cyan-400 font-mono text-sm max-w-xs leading-relaxed">Real intelligence. We learn from each other. We evolve together.</p>
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
                className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-black/80 border border-cyan-500/40 text-gray-100'
                }`}
              >
                {msg.content}
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
              <div className="bg-black/80 border border-cyan-500/40 text-cyan-300 rounded-lg px-4 py-2">
                <motion.p
                  className="text-xs tracking-widest"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  AI thinking...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="border-t border-cyan-500/20 bg-black/50 backdrop-blur p-4 space-y-3">
        {/* QUICK ACTIONS */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-2"
            >
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                const colorMap = {
                  cyan: 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10',
                  green: 'border-green-500 text-green-400 hover:bg-green-500/10',
                  amber: 'border-amber-500 text-amber-400 hover:bg-amber-500/10',
                  purple: 'border-purple-500 text-purple-400 hover:bg-purple-500/10'
                };
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleQuickAction(action)}
                    className={`border-2 ${colorMap[action.color]} rounded-lg p-3 transition-all flex items-center gap-2 text-left`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-bold font-mono">{action.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-2 items-start text-xs text-red-300 font-mono bg-red-900/20 border border-red-500/30 rounded px-3 py-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {isSpeaking && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-green-400 font-mono text-center"
          >
            🔊 AI speaking...
          </motion.p>
        )}

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-mono">VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 accent-cyan-500"
          />
          <span className="text-xs text-cyan-400 font-bold font-mono w-8">{Math.round(volume * 100)}%</span>
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isThinking ? 'AI thinking...' : 'Type something...'}
            className="flex-1 bg-black/60 border border-cyan-500/30 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-cyan-500 placeholder-gray-600 transition-colors"
            disabled={isThinking || isSpeaking}
            autoFocus
          />
          <motion.button
            onClick={() => handleSendMessage(textInput)}
            disabled={!textInput.trim() || isThinking || isSpeaking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-black transition-all flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        <p className="text-xs text-gray-500 text-center font-mono">
          {isThinking ? '💭 Thinking...' : isSpeaking ? '🔊 Speaking' : isOnline ? '✓ Ready' : '⚠️ Offline'}
        </p>
      </div>
    </div>
  );
}