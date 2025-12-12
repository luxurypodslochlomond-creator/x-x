import React, { useState, useRef } from 'react';
import { Camera, Mic, Plus, X, Loader2, CheckCircle, FileText, MicOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCOTT QUICK TOOLS - ONE BUTTON TO RULE THEM ALL
 * Tap to expand: Voice or Camera
 */

export default function ScottQuickTools({ onComplete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const [transcript, setTranscript] = useState('');
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // === VOICE COMMAND ===
    const startVoice = () => {
        setIsOpen(false);
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice not supported');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = async (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            setIsProcessing(true);
            
            try {
                const response = await base44.integrations.Core.InvokeLLM({
                    prompt: `Convert voice command to task: "${text}"\n\nReturn: type (task/event), title, date, priority, notes`,
                    response_json_schema: {
                        type: "object",
                        properties: {
                            type: { type: "string" },
                            title: { type: "string" },
                            date: { type: "string" },
                            priority: { type: "string" },
                            notes: { type: "string" }
                        }
                    }
                });

                if (response.type === 'task') {
                    await base44.entities.ScottTask.create({
                        title: response.title,
                        status: 'todo',
                        priority: response.priority || 'medium',
                        notes: response.notes
                    });
                }

                setTranscript('✓ Saved');
                setTimeout(() => {
                    setTranscript('');
                    setIsProcessing(false);
                    setIsListening(false);
                    if (onComplete) onComplete();
                }, 1500);
            } catch (error) {
                setTranscript('✗ Failed');
                setTimeout(() => {
                    setTranscript('');
                    setIsProcessing(false);
                    setIsListening(false);
                }, 2000);
            }
        };

        recognition.start();
    };

    // === CAMERA CAPTURE ===
    const processImage = async (file) => {
        setIsProcessing(true);
        setResult(null);
        
        try {
            const uploadResult = await base44.integrations.Core.UploadFile({ file });
            const fileUrl = uploadResult.file_url;

            const extractedText = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract ALL text from this image (gig offer, receipt, contract, notes). Return word for word.`,
                file_urls: [fileUrl]
            });

            const coordinatorResult = await base44.functions.invoke('scottAICoordinator', {
                input_text: extractedText,
                input_type: 'photo_ocr',
                file_url: fileUrl
            });

            setResult(coordinatorResult);
            setTimeout(() => {
                setResult(null);
                setIsProcessing(false);
                if (onComplete) onComplete();
            }, 2500);

        } catch (error) {
            setResult({ error: error.message });
            setTimeout(() => {
                setResult(null);
                setIsProcessing(false);
            }, 3000);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    // === RESULT SCREENS ===
    if (result?.success) {
        return (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                <div className="bg-black border-4 border-green-500 rounded-xl p-6 max-w-md w-full">
                    <button 
                        onClick={() => { setResult(null); if (onComplete) onComplete(); }}
                        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-xl font-black text-green-400 font-mono mb-3 text-center">SAVED</h3>
                    <p className="text-white font-mono text-sm text-center mb-4">
                        Created {result.created?.length || 0} items
                    </p>
                    <div className="space-y-2">
                        {result.created?.map((item, idx) => (
                            <div key={idx} className="bg-green-900/20 border border-green-500/50 rounded p-2">
                                <p className="text-green-400 text-xs font-mono font-bold">{item.type.replace('_', ' ').toUpperCase()}</p>
                                <p className="text-white text-xs font-mono mt-1">
                                    {item.event?.title || item.task?.title || item.invoice?.description || 'OK'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (result?.error) {
        return (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                <div className="bg-black border-4 border-red-500 rounded-xl p-6 max-w-md w-full text-center">
                    <button onClick={() => setResult(null)} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                    <X className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <h3 className="text-xl font-black text-red-400 font-mono mb-2">FAILED</h3>
                    <p className="text-white font-mono text-xs">{result.error}</p>
                </div>
            </div>
        );
    }

    if (isProcessing) {
        return (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                <div className="bg-black border-4 border-amber-500 rounded-xl p-6 max-w-md w-full text-center">
                    <Loader2 className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-spin" />
                    <h3 className="text-xl font-black text-amber-400 font-mono mb-2">PROCESSING</h3>
                    <p className="text-gray-500 font-mono text-xs">
                        {isListening ? 'AI listening...' : 'AI reading...'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* EXPANDED OPTIONS */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Voice */}
                        <motion.button
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0, y: 20 }}
                            onClick={startVoice}
                            className="fixed bottom-44 right-6 z-40 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center border-2 border-purple-400"
                            style={{ boxShadow: '0 4px 20px rgba(147, 51, 234, 0.6)' }}
                        >
                            <Mic className="w-6 h-6 text-white" />
                        </motion.button>

                        {/* Camera */}
                        <motion.button
                            initial={{ scale: 0, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0, y: 20 }}
                            transition={{ delay: 0.05 }}
                            onClick={() => cameraInputRef.current?.click()}
                            className="fixed bottom-44 right-24 z-40 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center border-2 border-amber-400"
                            style={{ boxShadow: '0 4px 20px rgba(245, 158, 11, 0.6)' }}
                        >
                            <Camera className="w-6 h-6 text-black" />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>

            {/* MAIN FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{ rotate: isOpen ? 45 : 0 }}
                className="fixed bottom-32 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 flex items-center justify-center border-4 border-black"
                style={{ boxShadow: '0 4px 30px rgba(245, 158, 11, 0.8)' }}
            >
                <Plus className="w-8 h-8 text-white" />
            </motion.button>

            {/* Hidden inputs */}
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
            />

            {transcript && (
                <div className="fixed bottom-52 right-6 bg-black border-2 border-purple-500 rounded-lg p-2 z-40">
                    <p className="text-xs text-white font-mono whitespace-nowrap">{transcript}</p>
                </div>
            )}
        </>
    );
}