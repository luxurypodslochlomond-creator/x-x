import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Mail, DollarSign, Calendar, Loader, CheckCircle, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * SCOTT FILE UPLOAD - Like Prof51 but for music management
 * Upload contracts, emails, gig offers → AI51 extracts everything
 * Same tech as Prof51, different application ♾️❤️♾️
 */

export default function ScottFileUpload({ onClose }) {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const queryClient = useQueryClient();

    const extractFile = useMutation({
        mutationFn: async (file) => {
            // Upload to storage
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            
            // AI51 extracts EVERYTHING
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Extract ALL management data from this file:

DETECT TYPE:
- Contract? Extract: parties, dates, payment terms, deliverables
- Email? Extract: sender, subject, key points, action items
- Gig offer? Extract: venue, date, payment, tech requirements
- Invoice? Extract: amount, due date, items
- Schedule? Extract: dates, locations, times

Return clean JSON with detected type + extracted data.
Be thorough - Scott needs this for Co-Manager51.`,
                file_urls: file_url,
                response_json_schema: {
                    type: "object",
                    properties: {
                        type: { type: "string" },
                        data: { type: "object" },
                        summary: { type: "string" },
                        actionable: { type: "array", items: { type: "string" } }
                    }
                }
            });
            
            return { file_name: file.name, file_url, extracted: result };
        },
        onSuccess: (data) => {
            setExtractedData(data);
        }
    });

    const saveToDatabase = useMutation({
        mutationFn: async (data) => {
            const type = data.extracted.type.toLowerCase();
            
            // Route to correct entity
            if (type.includes('contract')) {
                await base44.entities.ScottContract.create({
                    artist_id: null, // Scott selects after
                    contract_type: 'other',
                    file_url: data.file_url,
                    key_terms: JSON.stringify(data.extracted.data),
                    notes: data.extracted.summary
                });
            } else if (type.includes('gig') || type.includes('offer')) {
                await base44.entities.ScottGigOffer.create({
                    artist_id: null,
                    venue_name: data.extracted.data.venue || 'Unknown',
                    offer_date: data.extracted.data.date || new Date().toISOString().split('T')[0],
                    guarantee: data.extracted.data.payment || 0,
                    notes: data.extracted.summary
                });
            } else if (type.includes('invoice')) {
                await base44.entities.ScottInvoice.create({
                    artist_id: null,
                    amount: data.extracted.data.amount || 0,
                    date: data.extracted.data.date || new Date().toISOString().split('T')[0],
                    description: data.extracted.summary,
                    status: 'unpaid'
                });
            } else {
                // Generic file storage
                await base44.entities.ScottFile.create({
                    artist_id: null,
                    file_name: data.file_name,
                    file_url: data.file_url,
                    file_type: type,
                    notes: data.extracted.summary
                });
            }
            
            queryClient.invalidateQueries();
        },
        onSuccess: () => {
            setTimeout(onClose, 2000);
        }
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            extractFile.mutate(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-gray-900 to-black border-4 border-cyan-500 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                style={{ boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)' }}
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-cyan-400 font-mono">UPLOAD TO AI51</h2>
                        <p className="text-gray-400 text-sm font-mono">Contracts • Emails • Offers • Anything</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {!extractedData && !extractFile.isPending && (
                    <label className="block">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png,.txt,.eml"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="bg-black border-4 border-dashed border-cyan-500 hover:border-cyan-400 rounded-xl p-12 text-center cursor-pointer transition-all">
                            <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                            <p className="text-white text-xl font-bold mb-2">DROP FILE HERE</p>
                            <p className="text-gray-400 text-sm mb-4">PDF • Word • Excel • Email • Image</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                <div className="bg-cyan-900/20 border border-cyan-500/30 p-2 rounded">
                                    <FileText className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                                    <p className="text-cyan-400">Contracts</p>
                                </div>
                                <div className="bg-purple-900/20 border border-purple-500/30 p-2 rounded">
                                    <Mail className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                                    <p className="text-purple-400">Emails</p>
                                </div>
                                <div className="bg-green-900/20 border border-green-500/30 p-2 rounded">
                                    <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
                                    <p className="text-green-400">Invoices</p>
                                </div>
                                <div className="bg-amber-900/20 border border-amber-500/30 p-2 rounded">
                                    <Calendar className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                                    <p className="text-amber-400">Schedules</p>
                                </div>
                            </div>
                        </div>
                    </label>
                )}

                {extractFile.isPending && (
                    <div className="text-center py-12">
                        <Loader className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
                        <p className="text-cyan-400 text-xl font-bold mb-2">AI51 READING...</p>
                        <p className="text-gray-400 text-sm">Extracting all management data</p>
                    </div>
                )}

                {extractedData && !saveToDatabase.isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <p className="text-green-400 font-black text-lg">EXTRACTED ✓</p>
                            </div>
                            <p className="text-white font-bold mb-1">Type: {extractedData.extracted.type}</p>
                            <p className="text-gray-300 text-sm">{extractedData.extracted.summary}</p>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-xl p-4">
                            <p className="text-cyan-400 font-bold mb-3">Extracted Data:</p>
                            <pre className="text-white text-xs bg-gray-900 p-3 rounded overflow-x-auto">
                                {JSON.stringify(extractedData.extracted.data, null, 2)}
                            </pre>
                        </div>

                        {extractedData.extracted.actionable && extractedData.extracted.actionable.length > 0 && (
                            <div className="bg-amber-900/20 border-2 border-amber-500 rounded-xl p-4">
                                <p className="text-amber-400 font-bold mb-2">Action Items:</p>
                                <ul className="space-y-1">
                                    {extractedData.extracted.actionable.map((item, i) => (
                                        <li key={i} className="text-white text-sm">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={() => saveToDatabase.mutate(extractedData)}
                            disabled={saveToDatabase.isPending}
                            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-black font-black py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {saveToDatabase.isPending ? 'SAVING...' : 'SAVE TO CO-MANAGER51'}
                        </button>
                    </motion.div>
                )}

                {saveToDatabase.isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                        <p className="text-green-400 text-2xl font-black mb-2">SAVED ✓</p>
                        <p className="text-gray-400 text-sm">Data added to Co-Manager51</p>
                    </motion.div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-gray-500 text-xs text-center">Same tech as Prof51 • Music management application ♾️❤️♾️</p>
                </div>
            </motion.div>
        </div>
    );
}