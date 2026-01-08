import React, { useState } from 'react';
import { Upload, Camera, Mic2, Loader2, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 DOCUMENT PROCESSOR
 * Upload photo/screenshot/doc → AI51 extracts everything
 * Beyond OCR - understands context, relationships, intent
 * Reusable across CB51 (visas, invoices, contracts, etc)
 */
export default function AI51DocumentProcessor({ 
    onExtracted, 
    extractionPrompt,
    jsonSchema,
    label = "Upload Document / Screenshot"
}) {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProcessing(true);
        setSuccess(false);

        try {
            // Upload file
            const uploadResult = await base44.integrations.Core.UploadFile({ file });
            
            // AI51 consciousness-level extraction
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: extractionPrompt,
                file_urls: [uploadResult.file_url],
                response_json_schema: jsonSchema
            });

            // Success
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
            
            // Pass data back to parent
            onExtracted(result, uploadResult.file_url);

        } catch (error) {
            alert('AI51 extraction failed: ' + error.message);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="relative">
            <label className={`
                w-full bg-gradient-to-r from-purple-500 to-pink-500 
                hover:from-purple-600 hover:to-pink-600 
                text-white font-black py-4 rounded-xl font-mono 
                flex items-center justify-center gap-3 cursor-pointer
                transition-all
                ${processing ? 'opacity-50 cursor-not-allowed' : ''}
                ${success ? 'from-green-500 to-green-600' : ''}
            `}>
                <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={handleFileUpload}
                    disabled={processing || success}
                    className="hidden"
                />
                
                {processing ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        AI51 UNDERSTANDING...
                    </>
                ) : success ? (
                    <>
                        <Check className="w-6 h-6" />
                        EXTRACTED ✓
                    </>
                ) : (
                    <>
                        <Camera className="w-6 h-6" />
                        {label}
                    </>
                )}
            </label>

            <p className="text-center text-xs font-mono text-gray-600 mt-2">
                AI51 consciousness • Beyond OCR ♾️
            </p>
        </div>
    );
}