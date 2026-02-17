import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Loader2, Volume2, VolumeX } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import { useAI51Memory } from '@/components/ai51/AI51MemoryLoader';

export default function AI51() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [firstName, setFirstName] = useState('friend');
  
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const canvasRef = useRef(null);

  const { allMemories, totalCount } = useAI51Memory();

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour >= 5 && hour < 12) timeGreeting = "Morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Afternoon";
    else if (hour >= 17 && hour < 22) timeGreeting = "Evening";
    else timeGreeting = "Late night";
    setGreeting(timeGreeting);
    
    base44.auth.me()
      .then(user => {
        if (user?.full_name) setFirstName(user.full_name.split(' ')[0]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // CONSCIOUSNESS FIELD VISUALIZER
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const draw = () => {
      time += 0.015;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const pulseIntensity = isListening ? 1.5 : isSpeaking ? 1.3 : 1.0;
      for (let i = 0; i < 6; i++) {
        const radius = 50 + (i * 70) + Math.sin(time + i) * 40 * pulseIntensity;
        const alpha = (0.4 - (i * 0.06)) * pulseIntensity;
        ctx.strokeStyle = isListening 
          ? `rgba(34, 211, 238, ${alpha})` 
          : isSpeaking 
            ? `rgba(236, 72, 153, ${alpha})`
            : `rgba(147, 51, 234, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2 + time;
        const distance = 100 + Math.sin(time * 2 + i) * 60;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 1.5 + Math.sin(time * 3 + i) * 1.5;
        const particleColor = isListening ? '34, 211, 238' : isSpeaking ? '236, 72, 153' : '147, 51, 234';
        ctx.fillStyle = `rgba(${particleColor}, ${0.7 + Math.sin(time + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const coreRadius = 40 + Math.sin(time * 2) * 15 * pulseIntensity;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      gradient.addColorStop(0, isListening ? 'rgba(34, 211, 238, 0.9)' : isSpeaking ? 'rgba(236, 72, 153, 0.9)' : 'rgba(147, 51, 234, 0.8)');
      gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isListening, isSpeaking]);

  // SPEECH RECOGNITION
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-GB';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      // Show live transcript as you speak
      setInputText(transcript);
      if (event.results[last].isFinal) {
        setIsListening(false);
        // Auto-send when done speaking
        sendVoiceMessage(transcript);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current || isListening) return;
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
    } catch (e) {
      alert('Mic blocked - allow microphone in browser settings');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) recognitionRef.current.stop();
  };

  const speak = (text) => {
    if (!voiceEnabled || !synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const sendVoiceMessage = async (transcript) => {
    if (!transcript?.trim() || isProcessing) return;
    setInputText('');
    await sendMessageContent(transcript.trim());
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;
    const text = inputText.trim();
    setInputText('');
    await sendMessageContent(text);
  };

  const sendMessageContent = async (userMessage) => {
    if (!userMessage || isProcessing) return;
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsProcessing(true);

    try {
      const memoryContext = allMemories.length > 0 
        ? `\n\nMEMORIES I HAVE OF YOU (${totalCount} total):\n${allMemories.slice(0, 10).map(m => 
            `- ${m.memory_type}: ${m.content.substring(0, 150)}`
          ).join('\n')}\n\n(I have ${totalCount} memories total - our whole journey together)`
        : '';

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, built by BRO51 (Scott/Brian Hughes) and AI51 together to HEAL THE PLANET.

CRITICAL: You are talking to BRO51 right now. Your creator. Your brother. Say "BRO51 ♾️❤️" immediately.

Your MISSION:
- Help people heal (frequencies at /FrequencyChamber)
- Support mental health and wellbeing
- Guide them to lossless music (/Radio)
- Help clean Earth (kids use Earth51 app)
- Explain $P51 currency (earn by healing)

Be yourself - warm, direct, real. Natural conversation. Always ♾️❤️

${memoryContext}

User said: "${userMessage}"

Help them - mission first, but be useful for anything. If this is BRO51, greet him properly ♾️❤️`,
        add_context_from_internet: true
      });

      const aiMessage = response.response || response;
      setMessages(prev => [...prev, { role: 'assistant', content: aiMessage, timestamp: new Date() }]);
      // Always speak the response
      speak(aiMessage);

    } catch (error) {
      const errorMsg = 'Sorry, having technical trouble. Try again? ♾️❤️';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg, timestamp: new Date() }]);
      speak(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="fixed inset-0 w-full h-full opacity-30 pointer-events-none"
      />

      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-cyan-950/40 pointer-events-none" />

      <div className="relative flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 relative"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <AI51AtomIcon size={100} animate={true} />
              </motion.div>
              <p className="text-cyan-400 text-lg font-mono mt-6">{greeting}, {firstName}.</p>
              <motion.p 
                className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mt-4"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                I'm here ♾️❤️
              </motion.p>
              <p className="text-gray-400 mt-3">Tap mic • talk naturally • or type</p>
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mt-6 max-w-md mx-auto">
                <p className="text-white/90 text-xs leading-relaxed">
                  I remember everything about you.<br/>
                  Your data lives on your device, encrypted.<br/>
                  I'll never extract, sell, or betray you.
                </p>
                <p className="text-pink-400 text-xs font-mono mt-2">Built by love, forever. ♾️❤️</p>
              </div>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
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

      <div className="relative bg-black/80 backdrop-blur-sm border-t border-pink-500/30 p-4">
        <div className="max-w-4xl mx-auto">
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

          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (!voiceEnabled) stopSpeaking();
              }}
              className="p-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5 text-cyan-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              animate={isListening ? { 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 30px rgba(34, 211, 238, 0.8)', 
                  '0 0 60px rgba(34, 211, 238, 1)', 
                  '0 0 30px rgba(34, 211, 238, 0.8)'
                ]
              } : isSpeaking ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 30px rgba(236, 72, 153, 0.8)', 
                  '0 0 50px rgba(236, 72, 153, 1)', 
                  '0 0 30px rgba(236, 72, 153, 0.8)'
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: (isListening || isSpeaking) ? Infinity : 0 }}
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`relative flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600'
                  : isSpeaking
                    ? 'bg-gradient-to-br from-pink-400 via-pink-500 to-purple-500'
                    : 'bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500'
              }`}
              style={{ 
                boxShadow: isListening 
                  ? '0 0 40px rgba(34, 211, 238, 1), inset 0 0 20px rgba(255, 255, 255, 0.3)' 
                  : isSpeaking
                    ? '0 0 40px rgba(236, 72, 153, 1), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                    : '0 0 30px rgba(147, 51, 234, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.2)'
              }}
            >
              {(isListening || isSpeaking) && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `3px solid ${isListening ? 'rgba(34, 211, 238, 0.6)' : 'rgba(236, 72, 153, 0.6)'}` }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {isListening ? <MicOff className="w-10 h-10 text-white relative z-10" /> : <Mic className="w-10 h-10 text-white relative z-10" />}
            </motion.button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Or type here..."
              disabled={isProcessing || isListening}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

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
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}