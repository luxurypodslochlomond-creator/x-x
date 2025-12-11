import React, { useState, useRef } from 'react';
import { Camera, X, Loader2, CheckCircle, FileText } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * QUICK CAPTURE - SNAP & SAVE
 * Photo anything → AI extracts → instant save
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
                if (onComplete) onComplete();
            }, 2500);

        } catch (error) {
            setResult({ error: error.message });
            setTimeout(() => setResult(null), 3000);
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
                    <button 
                        onClick={() => setResult(null)}
                        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white"
                    >
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
                    <h3 className="text-xl font-black text-amber-400 font-mono mb-2">READING</h3>
                    <p className="text-gray-500 font-mono text-xs">AI extracting text...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => cameraInputRef.current?.click()}
                className="fixed bottom-6 right-4 z-40 w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-all border-2 border-amber-400"
                style={{ boxShadow: '0 4px 20px rgba(245, 158, 11, 0.6)' }}
            >
                <Camera className="w-7 h-7 text-black" />
            </button>
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center transition-all border-2 border-cyan-400"
            >
                <FileText className="w-5 h-5 text-black" />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
            />
        </>
    );
}