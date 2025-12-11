import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle, FileText } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

/**
 * QUICK CAPTURE - PHOTOGRAPH ANYTHING
 * Receipts, contracts, venue details, gig sheets
 * AI extracts everything → auto-creates events/tasks/invoices
 * ZERO INFORMATION LOSS
 */

export default function ScottQuickCapture({ onComplete }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const processImage = async (file) => {
        setIsProcessing(true);
        setResult(null);
        
        try {
            // Upload file
            const uploadResult = await base44.integrations.Core.UploadFile({ file });
            const fileUrl = uploadResult.file_url;

            // Extract text from image using AI
            const ocrPrompt = `Extract ALL text from this image. This might be:
- A gig offer or venue details
- A receipt or invoice
- Contract details
- Tour schedule
- Visa documents
- Any handwritten notes

Return EXACTLY what you see, word for word. Preserve structure.`;

            const extractedText = await base44.integrations.Core.InvokeLLM({
                prompt: ocrPrompt,
                file_urls: [fileUrl]
            });

            // Send to AI Coordinator for smart routing
            const coordinatorResult = await base44.functions.invoke('scottAICoordinator', {
                input_text: extractedText,
                input_type: 'photo_ocr',
                file_url: fileUrl
            });

            setResult(coordinatorResult);
            
            // Show success then close
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 3000);

        } catch (error) {
            console.error('Capture error:', error);
            alert('Error: ' + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) processImage(file);
    };

    if (result?.success) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <div className="bg-black border-4 border-green-500 p-8 max-w-md w-full text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-green-400 font-mono mb-4">CAPTURED</h3>
                    <p className="text-white font-mono mb-6">
                        AI created {result.created?.length || 0} items
                    </p>
                    <div className="space-y-2">
                        {result.created?.map((item, idx) => (
                            <div key={idx} className="bg-green-900/20 border border-green-500/50 p-3 text-left">
                                <p className="text-green-400 text-xs font-mono font-bold uppercase">{item.type.replace('_', ' ')}</p>
                                <p className="text-white text-sm font-mono mt-1">
                                    {item.event?.title || item.task?.title || item.invoice?.description || 'Saved'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }

    if (isProcessing) {
        return (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-black border-4 border-amber-500 p-8 max-w-md w-full text-center">
                    <Loader2 className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-spin" />
                    <h3 className="text-2xl font-black text-amber-400 font-mono mb-2">PROCESSING</h3>
                    <p className="text-gray-500 font-mono text-sm">AI reading image...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3">
            {/* Camera */}
            <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-all border-4 border-black shadow-2xl"
                style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' }}
            >
                <Camera className="w-8 h-8 text-black" />
            </button>
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Upload */}
            <button
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center transition-all border-4 border-black shadow-xl"
            >
                <FileText className="w-6 h-6 text-black" />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}