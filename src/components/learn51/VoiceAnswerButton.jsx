import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';

export default function VoiceAnswerButton({ onTranscription }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser doesn\'t support voice input bro. Try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + t + ' ');
        } else {
          interim += t;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      if (transcript && onTranscription) {
        onTranscription(transcript);
      }
    }
  };

  const reset = () => {
    setTranscript('');
  };

  return (
    <div className="w-full space-y-3">
      <motion.button
        onClick={listening ? stopListening : startListening}
        whileTap={{ scale: 0.95 }}
        className="w-full rounded-3xl font-black py-4 flex items-center justify-center gap-2 relative overflow-hidden"
        style={{
          background: listening
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#fff',
          fontSize: 16,
          boxShadow: listening ? '0 0 30px #ef444460, 0 0 60px #ef444430' : '0 0 20px #3b82f650',
        }}
      >
        {listening && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <Square className="w-5 h-5 fill-current" />
          </motion.div>
        )}
        {!listening && <Mic className="w-5 h-5" />}
        <span>{listening ? 'Listening...' : 'Speak your answer 🎙️'}</span>
      </motion.button>

      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '3px solid #3b82f6' }}
        >
          <p className="text-sm font-bold mb-2 opacity-70">You said:</p>
          <p className="font-bold text-white leading-relaxed mb-2">{transcript}</p>
          <button
            onClick={reset}
            className="text-xs font-black text-blue-400 hover:text-blue-300"
          >
            ← Clear
          </button>
        </motion.div>
      )}
    </div>
  );
}