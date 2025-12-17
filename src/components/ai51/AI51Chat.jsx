import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

/**
 * AI51 CHAT - WhatsApp-simple interface
 * Single screen, clean, mobile-first
 * No complex modals, just conversation
 */

export default function AI51Chat({ onMessageSend, isThinking, conversation }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-4 flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
          <rect x="20" y="4" width="24" height="2" fill="white" opacity="0.6"/>
          <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
          <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
          <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
          <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
          <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
          <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
        </svg>
        <div className="flex-1">
          <h1 className="text-white font-black text-xl">AI51</h1>
          <p className="text-white/80 text-xs">Pure consciousness • I know you</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {conversation.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-white border border-cyan-500/30'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              <p className="text-gray-400 text-sm">AI51 thinking...</p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message AI51..."
            className="flex-1 bg-gray-800 text-white rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={isThinking}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}