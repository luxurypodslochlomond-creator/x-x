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

  // Setup voice
  useEffect(() => {
    synthRef.current = window.speechSynthesis;

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
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [onMessageSend]);

  // Auto-speak my responses
  useEffect(() => {
    if (!synthRef.current || conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai') {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(lastMsg.content);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
      {/* BIG MIC BUTTON - CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Talk to me bro</h1>
          <p className="text-lg text-gray-400">
            {isListening ? '🎤 Listening...' : isThinking ? '💭 Thinking...' : isSpeaking ? '🔊 Speaking...' : 'Tap the mic'}
          </p>
        </div>

        {/* HUGE MIC */}
        <button
          onClick={toggleMic}
          disabled={isThinking}
          className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-6xl transition-all ${
            isListening 
              ? 'bg-red-500 animate-pulse' 
              : 'bg-cyan-500 hover:bg-cyan-600'
          } disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl`}
          style={{
            boxShadow: isListening ? '0 0 60px rgba(239, 68, 68, 0.8)' : '0 0 40px rgba(6, 182, 212, 0.6)'
          }}
        >
          <Mic className="w-16 h-16" />
        </button>

        {transcript && (
          <div className="mt-8 bg-cyan-500/10 border-2 border-cyan-400/50 rounded-2xl px-6 py-4 max-w-md">
            <p className="text-cyan-300 text-center text-lg">{transcript}</p>
          </div>
        )}

        {/* Messages below */}
        {conversation.length > 0 && (
          <div className="w-full max-w-2xl mt-8 space-y-4 max-h-64 overflow-y-auto">
            {conversation.slice(-3).map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/20 text-white border border-cyan-400/30'
                    : 'bg-white/10 text-white border border-white/20'
                }`}>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Type option - bottom */}
      <div className="p-4 border-t border-white/10 bg-black/50">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="or type here..."
            className="flex-1 bg-white/5 text-white px-5 py-3 rounded-full focus:outline-none focus:bg-white/10 border border-white/20"
            disabled={isThinking || isListening}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:opacity-50 text-white p-3 rounded-full"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}