import React, { useState, useRef } from 'react';
import { Camera, Mic, Upload, Mail, Zap, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCOTT QUICK CAPTURE
 * 📸 Photo → AI extracts → Creates tasks/events
 * 🎤 Voice note → Transcribed → AI extracts
 * 📧 Forward email text
 * ADHD-friendly: ONE tap, done.
 */

export default function ScottQuickCapture({ onCaptureComplete }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [captureType, setCaptureType] = useState(null);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // PHOTO CAPTURE → OCR → AI
    const handlePhotoCapture = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);
        setCaptureType('photo');

        try {
            // Upload photo
            const { file_url } = await base44.integrations.Core.UploadFile({ file });

            // OCR with AI
            const ocrPrompt = `Extract ALL text from this image. It might be:
- Screenshot of email/WhatsApp
- Photo of contract/document
- Handwritten note
- Receipt

Return the text exactly as it appears.`;

            const ocrResult = await base44.integrations.Core.InvokeLLM({
                prompt: ocrPrompt,
                file_urls: [file_url],
                response_json_schema: {
                    type: "object",
                    properties: {
                        extracted_text: { type: "string" }
                    }
                }
            });

            // Send to AI Coordinator
            const coordinatorResult = await base44.functions.invoke('scottAICoordinator', {
                input_text: ocrResult.extracted_text,
                input_type: 'photo_ocr',
                file_url: file_url
            });

            setResult(coordinatorResult.data);
            onCaptureComplete?.(coordinatorResult.data);
        } catch (error) {
            console.error('Photo capture error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    // VOICE NOTE → TRANSCRIBE → AI
    const startVoiceRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await processVoiceNote(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setCaptureType('voice');
        } catch (error) {
            alert('Microphone access needed');
        }
    };

    const stopVoiceRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const processVoiceNote = async (audioBlob) => {
        setIsProcessing(true);

        try {
            // Upload audio
            const audioFile = new File([audioBlob], 'voice_note.webm', { type: 'audio/webm' });
            const { file_url } = await base44.integrations.Core.UploadFile({ file: audioFile });

            // Transcribe with AI
            const transcriptionPrompt = `Transcribe this audio exactly. It's a voice note from Scott, a music manager. He might be saying:
- "Remind me to call Dave about Friday gig"
- "Sophie needs PA system at Barras"
- Quick notes about artists/events

Return the transcription.`;

            const transcription = await base44.integrations.Core.InvokeLLM({
                prompt: transcriptionPrompt,
                file_urls: [file_url],
                response_json_schema: {
                    type: "object",
                    properties: {
                        transcribed_text: { type: "string" }
                    }
                }
            });

            // Send to AI Coordinator
            const coordinatorResult = await base44.functions.invoke('scottAICoordinator', {
                input_text: transcription.transcribed_text,
                input_type: 'voice_transcription',
                file_url: file_url
            });

            setResult(coordinatorResult.data);
            onCaptureComplete?.(coordinatorResult.data);
        } catch (error) {
            console.error('Voice note error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* QUICK CAPTURE BUTTONS */}
            {!isProcessing && !result && (
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-2 p-4 bg-cyan-900/20 border-2 border-cyan-500 hover:bg-cyan-900/40 active:scale-95 transition-all"
                    >
                        <Camera className="w-8 h-8 text-cyan-400" />
                        <span className="text-sm font-mono font-bold text-cyan-400">PHOTO</span>
                        <span className="text-xs text-gray-400">Email/Contract</span>
                    </button>

                    <button
                        onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                        className={`flex flex-col items-center gap-2 p-4 border-2 active:scale-95 transition-all ${
                            isRecording 
                                ? 'bg-red-900/40 border-red-500 animate-pulse' 
                                : 'bg-pink-900/20 border-pink-500 hover:bg-pink-900/40'
                        }`}
                    >
                        <Mic className="w-8 h-8 text-pink-400" />
                        <span className="text-sm font-mono font-bold text-pink-400">
                            {isRecording ? 'TAP TO STOP' : 'VOICE NOTE'}
                        </span>
                        <span className="text-xs text-gray-400">Quick brain dump</span>
                    </button>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                className="hidden"
            />

            {/* PROCESSING */}
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-purple-900/20 border-2 border-purple-500 p-6 text-center"
                >
                    <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-3 animate-spin" />
                    <p className="text-purple-400 font-mono font-bold">AI PROCESSING...</p>
                    <p className="text-gray-400 text-sm font-mono mt-1">
                        {captureType === 'photo' ? 'Reading text from photo' : 'Transcribing voice note'}
                    </p>
                </motion.div>
            )}

            {/* RESULT */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-900/20 border-4 border-green-500 p-4"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-green-400" />
                            <p className="font-mono font-bold text-green-400">✓ CREATED</p>
                        </div>

                        <div className="space-y-2 text-sm">
                            {result.created?.map((item, i) => (
                                <div key={i} className="bg-black/40 p-2">
                                    <p className="text-green-300 font-mono">
                                        {item.type.replace(/_/g, ' ').toUpperCase()}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {item.event?.title || item.task?.title || item.invoice?.description || 'Saved'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => { setResult(null); setCaptureType(null); }}
                            className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white font-mono text-sm"
                        >
                            DONE
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}