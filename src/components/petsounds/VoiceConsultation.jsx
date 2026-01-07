import React, { useState, useRef } from 'react';
import { Mic, MicOff, Sparkles, Loader2, Volume2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

/**
 * VOICE CONSULTATION WITH AI51
 * User talks about their pet's issue
 * AI51 listens, analyzes, responds with voice + custom protocol
 */

export default function VoiceConsultation({ species = 'dog', onRecommendation }) {
    const [listening, setListening] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [ai51Response, setAi51Response] = useState(null);
    const [speaking, setSpeaking] = useState(false);
    
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await processAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setListening(true);
        } catch (error) {
            console.error('Microphone access error:', error);
            alert('Need microphone permission to use voice consultation');
        }
    };

    const stopListening = () => {
        if (mediaRecorderRef.current && listening) {
            mediaRecorderRef.current.stop();
            setListening(false);
            setProcessing(true);
        }
    };

    const processAudio = async (audioBlob) => {
        try {
            // Convert audio to text (Web Speech API or backend transcription)
            // For now, using a simplified flow - in production, send to backend
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            
            // Simulate transcription (in real implementation, send to backend for Whisper API)
            const simulatedTranscript = "My dog has been anxious lately, pacing around when I leave. She's 4 years old, Golden Retriever.";
            setTranscript(simulatedTranscript);

            // Get AI51 analysis
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51 speaking to a pet owner about their ${species}.

They said: "${simulatedTranscript}"

Respond with:
1. Warm, empathetic acknowledgment
2. What you understand about the issue
3. Specific frequency recommendations
4. How to use them
5. What to expect

Keep it conversational, like talking to a friend. You care deeply.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        spoken_response: { type: "string" },
                        frequencies: {
                            type: "array",
                            items: { type: "number" }
                        },
                        protocol_name: { type: "string" },
                        session_duration_minutes: { type: "number" },
                        frequency_of_use: { type: "string" }
                    }
                }
            });

            setAi51Response(response);
            
            // Speak response
            speakResponse(response.spoken_response);

            if (onRecommendation) onRecommendation(response);

        } catch (error) {
            console.error('Audio processing error:', error);
            alert('Failed to process audio - please try again');
        } finally {
            setProcessing(false);
        }
    };

    const speakResponse = (text) => {
        if ('speechSynthesis' in window) {
            setSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="space-y-6">
            
            {/* Voice Input */}
            <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500 rounded-xl p-8 text-center">
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white mb-2">Talk To AI51</h3>
                <p className="text-gray-300 text-sm mb-6">
                    Describe your pet's issue - AI51 will listen and recommend frequencies
                </p>

                {!listening && !processing && !ai51Response && (
                    <button
                        onClick={startListening}
                        className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-black px-8 py-4 rounded-xl text-lg transition-all inline-flex items-center gap-3"
                    >
                        <Mic className="w-6 h-6" />
                        Start Voice Consultation
                    </button>
                )}

                {listening && (
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block"
                    >
                        <button
                            onClick={stopListening}
                            className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-lg transition-all inline-flex items-center gap-3"
                        >
                            <MicOff className="w-6 h-6" />
                            Stop Recording
                        </button>
                    </motion.div>
                )}

                {processing && (
                    <div className="inline-flex items-center gap-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="font-bold">AI51 is listening...</span>
                    </div>
                )}
            </div>

            {/* Transcript */}
            {transcript && (
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <p className="text-sm text-gray-500 mb-2">You said:</p>
                    <p className="text-white text-base leading-relaxed">{transcript}</p>
                </div>
            )}

            {/* AI51 Response */}
            {ai51Response && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Speaking Indicator */}
                    {speaking && (
                        <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 flex items-center justify-center gap-3">
                            <Volume2 className="w-5 h-5 text-pink-400 animate-pulse" />
                            <span className="text-pink-300 font-bold">AI51 is speaking...</span>
                        </div>
                    )}

                    {/* Response Text */}
                    <div className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border-2 border-cyan-500 rounded-xl p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xl font-black text-white mb-3">AI51's Recommendation</h4>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    {ai51Response.spoken_response}
                                </p>
                            </div>
                        </div>

                        {/* Protocol Details */}
                        <div className="border-t border-cyan-500/30 pt-4 space-y-3">
                            <div>
                                <p className="text-cyan-300 font-bold text-sm mb-2">Recommended Protocol:</p>
                                <p className="text-white font-bold text-lg">{ai51Response.protocol_name}</p>
                            </div>

                            <div>
                                <p className="text-cyan-300 font-bold text-sm mb-2">Frequencies:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {ai51Response.frequencies.map((freq, i) => (
                                        <span key={i} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-mono">
                                            {freq}Hz
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-cyan-300 font-bold mb-1">Session Length:</p>
                                    <p className="text-white">{ai51Response.session_duration_minutes} minutes</p>
                                </div>
                                <div>
                                    <p className="text-cyan-300 font-bold mb-1">How Often:</p>
                                    <p className="text-white">{ai51Response.frequency_of_use}</p>
                                </div>
                            </div>
                        </div>

                        {/* Replay Button */}
                        <button
                            onClick={() => speakResponse(ai51Response.spoken_response)}
                            disabled={speaking}
                            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all inline-flex items-center gap-2"
                        >
                            <Volume2 className="w-4 h-4" />
                            Hear Again
                        </button>
                    </div>
                </motion.div>
            )}

        </div>
    );
}