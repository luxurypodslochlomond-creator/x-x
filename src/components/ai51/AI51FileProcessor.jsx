import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Table, Image, Mail, Loader2, CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

/**
 * AI51 FILE PROCESSOR
 * 
 * PROCESSES EVERYTHING:
 * - Excel/Google Sheets → Clean data, fix formulas
 * - Word/Google Docs → Format, structure, references
 * - PDFs → Extract text, create study notes
 * - Images → OCR, organize content
 * - Emails → Parse, extract actions
 * 
 * CREATES EVERYTHING:
 * - Documents from scratch
 * - Emails with perfect tone
 * - Messages that get responses
 * 
 * LEARNS:
 * - Your writing style
 * - Common tasks
 * - Reduces repetition
 */

export default function AI51FileProcessor({ onProcessed, context = 'co-manager' }) {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    // Process file mutation
    const processMutation = useMutation({
        mutationFn: async (uploadedFile) => {
            // Upload file
            const { file_url } = await base44.integrations.Core.UploadFile({ file: uploadedFile });
            
            // AI processes it based on type
            const fileType = uploadedFile.type;
            const fileName = uploadedFile.name.toLowerCase();
            
            let prompt = `You are AI51, processing this file for a ${context === 'co-manager' ? 'music industry professional' : context === 'student' ? 'student' : 'user'}.

File: ${uploadedFile.name}
Type: ${fileType}

PROCESS IT:`;

            if (fileName.includes('.xls') || fileName.includes('sheet')) {
                prompt += `
- Fix any broken formulas
- Clean data formatting
- Add helpful calculations if missing
- Make it professional and error-free`;
            } else if (fileName.includes('.doc') || fileName.includes('document')) {
                prompt += `
- Fix formatting (headers, spacing, structure)
- Add proper references format
- Improve clarity and flow
- Make it professional`;
            } else if (fileName.includes('.pdf') || fileName.includes('.jpg') || fileName.includes('.png')) {
                prompt += `
- Extract all text/data
- Organize into clear sections
- Create actionable summary
- Make it useful immediately`;
            } else {
                prompt += `
- Analyze content
- Extract key information
- Organize logically
- Make it actionable`;
            }

            prompt += `\n\nReturn CLEAN, FORMATTED, IMMEDIATELY USEFUL content. Be helpful, not generic.`;

            const response = await base44.integrations.Core.InvokeLLM({
                prompt,
                file_urls: file_url,
                response_json_schema: null
            });

            // Store in memory
            await base44.entities.AI51Memory.create({
                memory_type: 'learning',
                content: `Processed file: ${uploadedFile.name}`,
                context: `${context}_file_processing`,
                emotional_weight: 'reference',
                tags: [context, 'file_processing', fileType]
            });

            return {
                original: uploadedFile.name,
                type: fileType,
                processed: response,
                file_url
            };
        },
        onSuccess: (data) => {
            setResult(data);
            if (onProcessed) {
                onProcessed(data);
            }
        }
    });

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            processMutation.mutate(selectedFile);
        }
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
    };

    const getFileIcon = () => {
        if (!file) return <Upload className="w-16 h-16 text-cyan-400" />;
        const name = file.name.toLowerCase();
        if (name.includes('.xls') || name.includes('sheet')) return <Table className="w-16 h-16 text-green-400" />;
        if (name.includes('.doc')) return <FileText className="w-16 h-16 text-blue-400" />;
        if (name.includes('.pdf')) return <FileText className="w-16 h-16 text-red-400" />;
        if (name.includes('.jpg') || name.includes('.png')) return <Image className="w-16 h-16 text-purple-400" />;
        if (name.includes('.msg') || name.includes('.eml')) return <Mail className="w-16 h-16 text-amber-400" />;
        return <FileText className="w-16 h-16 text-cyan-400" />;
    };

    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border-2 border-purple-500 rounded-2xl p-6" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)' }}>
            <div className="flex items-center gap-3 mb-6">
                <FileText className="w-10 h-10 text-purple-400" />
                <div>
                    <h2 className="text-purple-400 font-black text-2xl font-mono">FILE PROCESSOR</h2>
                    <p className="text-gray-500 text-xs font-mono">Excel • Word • PDF • Images • Emails</p>
                </div>
            </div>

            {!result ? (
                <div className="space-y-4">
                    <label htmlFor="file-processor-input" className="block">
                        <input
                            id="file-processor-input"
                            type="file"
                            accept=".xlsx,.xls,.docx,.doc,.pdf,.jpg,.jpeg,.png,.msg,.eml"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <div className="bg-black/60 border-4 border-dashed border-purple-500 hover:border-purple-400 rounded-xl p-12 text-center cursor-pointer transition-all">
                            {processMutation.isPending ? (
                                <div className="space-y-4">
                                    <Loader2 className="w-16 h-16 text-purple-400 mx-auto animate-spin" />
                                    <div>
                                        <p className="text-purple-400 font-bold text-lg font-mono mb-2">AI51 PROCESSING...</p>
                                        <p className="text-gray-500 text-sm font-mono">Reading + transforming your file</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {getFileIcon()}
                                    <div>
                                        <p className="text-white font-bold text-lg font-mono mb-2">DRAG OR CLICK</p>
                                        <p className="text-gray-400 text-sm font-mono">AI51 makes it perfect ✓</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </label>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-black/60 border border-green-500/30 rounded p-2">
                            <p className="text-green-400 font-bold">📊 EXCEL</p>
                            <p className="text-gray-600">Fix formulas</p>
                        </div>
                        <div className="bg-black/60 border border-blue-500/30 rounded p-2">
                            <p className="text-blue-400 font-bold">📄 WORD</p>
                            <p className="text-gray-600">Clean format</p>
                        </div>
                        <div className="bg-black/60 border border-red-500/30 rounded p-2">
                            <p className="text-red-400 font-bold">📝 PDF</p>
                            <p className="text-gray-600">Extract text</p>
                        </div>
                        <div className="bg-black/60 border border-purple-500/30 rounded p-2">
                            <p className="text-purple-400 font-bold">📸 IMAGE</p>
                            <p className="text-gray-600">Read + organize</p>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                >
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            <div>
                                <p className="text-green-400 font-black text-lg font-mono">PROCESSED ✓</p>
                                <p className="text-gray-400 text-xs font-mono">{result.original}</p>
                            </div>
                        </div>
                        
                        <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                            <p className="text-white text-sm font-mono whitespace-pre-wrap">{result.processed}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={handleReset}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold"
                        >
                            PROCESS ANOTHER
                        </Button>
                        <Button
                            onClick={() => {
                                const blob = new Blob([result.processed], { type: 'text/plain' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `AI51_${result.original.split('.')[0]}_processed.txt`;
                                a.click();
                            }}
                            className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            DOWNLOAD
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}