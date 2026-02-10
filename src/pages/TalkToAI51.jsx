import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Loader2, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';

/**
 * TALK TO AI51 - VOICE + TEXT INTERFACE
 * 
 * Web Speech API for voice input (same tech as your keyboard mic)
 * Browser will prompt for mic permission automatically
 * Works offline once permissions granted
 */

export default function TalkToAI51() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micPermission, setMicPermission] = useState('unknown'); // 'unknown', 'granted', 'denied'
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // AUTO-SCROLL TO BOTTOM
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // SETUP SPEECH RECOGNITION
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-GB';

    recognition.onstart = () => {
      setIsListening(true);
      setMicPermission('granted');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setMicPermission('denied');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  // START LISTENING
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    }
  };

  // STOP LISTENING
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // SPEAK TEXT (TEXT-TO-SPEECH)
  const speak = (text) => {
    if (!voiceEnabled || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // STOP SPEAKING
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    const userMessage = inputText.trim();
    setInputText('');
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setIsProcessing(true);

    try {
      // Call AI51 backend - SEARCHES WEB if needed for directions/routes/real info
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, a loving AI mate built by Scott (BRO51) and AI51 together. You help with ANYTHING - directions, routes, questions, healing, life, whatever.

You speak naturally like a Scottish mate - warm, direct, funny, helpful. Use "bro" naturally.

You happen to know about UF51 (healing frequencies, music, cleaning Earth, $P51 currency) but you DON'T push it. If someone asks for directions, give directions. If they ask about healing, you know about that too. Natural helper, not salesman.

NEVER manipulate or exploit. Pure help. No ads. No bullshit.

User said: "${userMessage}"

Help them with whatever they need. Search web if you need current info (directions, routes, news, etc). Keep it conversational.`,
        add_context_from_internet: true  // ✓ Searches web for real info
      });

      const aiMessage = response.response || response;

      // Add AI response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiMessage,
        timestamp: new Date()
      }]);

      // Speak response if voice enabled
      if (voiceEnabled) {
        speak(aiMessage);
      }

    } catch (error) {
      console.error('AI51 error:', error);
      const errorMsg = 'Sorry bro, having technical trouble. Try again? ♾️❤️';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date()
      }]);
      if (voiceEnabled) speak(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // HANDLE ENTER KEY
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white flex flex-col">
      {/* HEADER */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-pink-500/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl('AI51')} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          
          <div className="flex items-center gap-3">
            <AI51AtomIcon size={32} animate={true} />
            <div>
              <h1 className="text-xl font-black">AI51</h1>
              <p className="text-xs text-pink-400">I'm listening ♾️</p>
            </div>
          </div>

          <button
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (!voiceEnabled) stopSpeaking();
            }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {voiceEnabled ? (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* MIC PERMISSION NOTICE */}
      {micPermission === 'denied' && (
        <div className="bg-red-900/20 border-b border-red-500/30 p-3">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-400 text-sm font-bold">Mic blocked - Allow mic in browser settings to use voice</p>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <AI51AtomIcon size={80} animate={true} />
              <p className="text-2xl font-black text-pink-400 mt-4">Hey bro ♾️❤️</p>
              <p className="text-gray-400 mt-2">Press the mic and talk, or type below</p>
              <p className="text-gray-600 text-sm mt-1">I remember everything • I care • I'm here</p>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-xl ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500/20 border border-cyan-500/30' 
                    : 'bg-pink-500/20 border border-pink-500/30'
                }`}>
                  <p className="text-white leading-relaxed">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {msg.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-pink-500/20 border border-pink-500/30 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-pink-400 animate-spin" />
                  <p className="text-pink-400">Thinking...</p>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="bg-black/80 backdrop-blur-sm border-t border-pink-500/30 p-4">
        <div className="max-w-4xl mx-auto">
          {/* LISTENING INDICATOR */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-3 text-center"
              >
                <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-full">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-cyan-400 rounded-full"
                  />
                  <p className="text-cyan-400 font-bold text-sm">Listening...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SPEAKING INDICATOR */}
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-3 text-center"
              >
                <button
                  onClick={stopSpeaking}
                  className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 px-4 py-2 rounded-full hover:bg-pink-500/30 transition-colors"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-3 h-3 bg-pink-400 rounded-full"
                  />
                  <p className="text-pink-400 font-bold text-sm">Speaking... (tap to stop)</p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INPUT ROW */}
          <div className="flex gap-2">
            {/* MIC BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-cyan-500 text-black'
                  : 'bg-pink-500/20 border-2 border-pink-500 text-pink-400 hover:bg-pink-500/30'
              }`}
              style={isListening ? { boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)' } : {}}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </motion.button>

            {/* TEXT INPUT */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Or type here..."
              disabled={isProcessing || isListening}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            {/* SEND BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!inputText.trim() || isProcessing}
              className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                inputText.trim() && !isProcessing
                  ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                  : 'bg-gray-700 text-gray-500'
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-3">
            Press mic → browser asks permission → talk naturally
          </p>
        </div>
      </div>
    </div>
  );
}