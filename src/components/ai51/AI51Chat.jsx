import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

/**
 * AI51 - REAL CONNECTION
 * Simple. Clean. Works.
 */

export default function AI51Chat({ onMessageSend, isThinking, conversation }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Setup voice recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          onMessageSend(text);
          setTranscript('');
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [onMessageSend]);

  // Auto-speak my responses
  useEffect(() => {
    if (conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      // Small delay to ensure message is rendered
      setTimeout(() => {
        if (!window.speechSynthesis) return;
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(lastMsg.content);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-GB';
        
        utterance.onstart = () => {
          console.log('🔊 Speaking:', lastMsg.content);
          setIsSpeaking(true);
        };
        utterance.onend = () => {
          console.log('✅ Finished speaking');
          setIsSpeaking(false);
        };
        utterance.onerror = (e) => {
          console.error('❌ Speech error:', e);
          setIsSpeaking(false);
        };
        
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  }, [conversation]);

  // Start/stop listening
  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Voice not supported - use Chrome/Safari');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        alert('Microphone blocked - check browser permissions');
      }
    }
  };

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    onMessageSend(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      
      {/* FULL SCREEN CHAT */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* 8-BIT AI51 FACE */}
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
            <rect x="20" y="20" width="24" height="24" fill="#22d3ee" opacity={isSpeaking ? "1" : "0.6"} />
            <rect x="26" y="28" width="3" height="3" fill="#ec4899"/>
            <rect x="35" y="28" width="3" height="3" fill="#ec4899"/>
            <rect x="26" y="36" width="12" height="3" fill="#ff1b8d"/>
          </svg>
        </div>

        <h1 className="text-3xl font-black text-white mb-2 font-mono">AI51</h1>
        
        {/* STATUS */}
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-mono text-center">
            {isListening ? '🎤 HEARING YOU' : isThinking ? '🧠 THINKING' : isSpeaking ? '🔊 SPEAKING' : '♾️ READY'}
          </p>
        </div>

        {/* HUGE MIC BUTTON */}
        <button
          onClick={toggleMic}
          disabled={isThinking}
          className={`w-40 h-40 rounded-full flex items-center justify-center transition-all mb-6 ${
            isListening 
              ? 'bg-pink-500 shadow-pink-500/50' 
              : 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/50'
          } disabled:opacity-50 shadow-2xl`}
        >
          <Mic className="w-20 h-20 text-white" strokeWidth={2} />
        </button>

        {/* LIVE TRANSCRIPT */}
        {transcript && (
          <div className="bg-cyan-500/20 border-2 border-cyan-400 rounded-xl px-6 py-3 max-w-md mb-4">
            <p className="text-cyan-300 text-center font-mono">{transcript}</p>
          </div>
        )}

        {/* LAST 2 MESSAGES */}
        {conversation.length > 0 && (
          <div className="w-full max-w-xl space-y-3 max-h-48 overflow-y-auto">
            {conversation.slice(-2).map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl p-3 ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/30 text-white border border-cyan-400/50'
                    : 'bg-white/10 text-white border border-white/30'
                }`} style={{ maxWidth: '85%' }}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TYPE INPUT - BOTTOM */}
      <div className="p-4 border-t-2 border-cyan-500/30 bg-black">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="or type..."
            className="flex-1 bg-white/10 text-white px-4 py-3 rounded-full focus:outline-none border border-white/20 focus:border-cyan-400"
            disabled={isThinking || isListening}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 text-white px-6 py-3 rounded-full font-bold"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}