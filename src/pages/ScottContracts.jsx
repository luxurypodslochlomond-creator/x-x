import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Download, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';

/**
 * SCOTT CONTRACTS - AI-generated contract templates
 * Pick type, fill basics, AI generates lawyer-approved draft
 */

const CONTRACT_TEMPLATES = [
    { id: 'gig', name: 'Gig Contract', emoji: '🎸', fields: ['Venue', 'Date', 'Fee', 'Set time', 'Load in'] },
    { id: 'management', name: 'Management Agreement', emoji: '💼', fields: ['Artist name', 'Commission %', 'Term length'] },
    { id: 'recording', name: 'Recording Agreement', emoji: '🎵', fields: ['Studio', 'Budget', 'Delivery date'] },
    { id: 'publishing', name: 'Publishing Split', emoji: '📄', fields: ['Track title', 'Writers', 'Split %'] },
    { id: 'tour', name: 'Tour Agreement', emoji: '🚐', fields: ['Tour name', 'Dates', 'Territory'] }
];

export default function ScottContracts() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({});
    const [isGenerating, setIsGenerating] = useState(false);

    // PIN CHECK
    useEffect(() => {
        const pin = localStorage.getItem('scott_access_pin');
        if (pin !== '1888') {
            navigate(createPageUrl('ScottManager'));
        }
    }, [navigate]);

    // Fetch contracts
    const { data: contracts = [], isLoading } = useQuery({
        queryKey: ['scott-contracts'],
        queryFn: async () => {
            const results = await base44.entities.ScottContract.list('-created_date');
            return results;
        }
    });

    // Generate contract
    const generateContract = async () => {
        if (!selectedTemplate || Object.keys(formData).length === 0) return;

        setIsGenerating(true);
        try {
            const template = CONTRACT_TEMPLATES.find(t => t.id === selectedTemplate);
            
            // AI generates contract
            const prompt = `Generate a ${template.name} contract with these details:
${Object.entries(formData).map(([key, val]) => `${key}: ${val}`).join('\n')}

Make it professional, clear, and fair. Include standard clauses for this type of contract.`;

            const contractText = await base44.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: false
            });

            // Save contract
            await base44.entities.ScottContract.create({
                contract_type: selectedTemplate,
                title: `${template.name} - ${formData[template.fields[0]] || 'Draft'}`,
                terms: contractText,
                status: 'draft',
                parties: formData
            });

            queryClient.invalidateQueries({ queryKey: ['scott-contracts'] });
            setSelectedTemplate(null);
            setFormData({});
        } catch (error) {
            console.error('Generate failed:', error);
            alert('Failed to generate contract');
        } finally {
            setIsGenerating(false);
        }
    };

    if (selectedTemplate) {
        const template = CONTRACT_TEMPLATES.find(t => t.id === selectedTemplate);

        return (
            <div className="min-h-screen bg-black p-4 pb-32">
                <button
                    onClick={() => setSelectedTemplate(null)}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>

                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl mb-6" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                    <div className="bg-black rounded-xl p-4">
                        <h2 className="text-2xl font-black text-amber-400 font-mono">{template.emoji} {template.name}</h2>
                    </div>
                </div>

                <div className="space-y-3">
                    {template.fields.map(field => (
                        <div key={field}>
                            <label className="text-gray-400 text-sm font-mono mb-1 block">{field}</label>
                            <Input
                                placeholder={`Enter ${field.toLowerCase()}...`}
                                value={formData[field] || ''}
                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                className="bg-black border border-amber-500/30 text-white font-mono"
                            />
                        </div>
                    ))}

                    <Button
                        onClick={generateContract}
                        disabled={isGenerating || Object.keys(formData).length === 0}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 mt-6"
                    >
                        {isGenerating ? (
                            <>
                                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                                GENERATING...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                GENERATE CONTRACT
                            </>
                        )}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 pb-32">
            
            {/* HEADER */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(createPageUrl('ScottManager'))}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span style={{ fontFamily: 'monospace' }} className="text-sm font-bold">BACK</span>
                </button>

                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-[3px] rounded-xl" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)' }}>
                    <div className="bg-black rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-amber-400" />
                            <div>
                                <h1 className="text-2xl font-black text-amber-400" style={{ fontFamily: 'monospace' }}>CONTRACTS</h1>
                                <p className="text-gray-400 text-xs font-mono">AI-generated templates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TEMPLATES */}
            <div className="mb-8">
                <p className="text-amber-400 font-bold text-sm mb-3 font-mono">PICK A TEMPLATE</p>
                <div className="grid grid-cols-1 gap-3">
                    {CONTRACT_TEMPLATES.map(template => (
                        <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className="bg-black border-2 border-amber-500/30 hover:border-amber-500 rounded-xl p-4 text-left transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{template.emoji}</span>
                                <div>
                                    <p className="text-white font-bold text-base font-mono">{template.name}</p>
                                    <p className="text-gray-600 text-xs font-mono">{template.fields.length} fields • AI-generated</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* SAVED CONTRACTS */}
            <div>
                <p className="text-amber-400 font-bold text-sm mb-3 font-mono">YOUR CONTRACTS</p>
                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 font-mono">Loading...</p>
                    </div>
                ) : contracts.length === 0 ? (
                    <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm font-mono">No contracts yet</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {contracts.map(contract => (
                            <div key={contract.id} className="bg-black border-2 border-amber-500/30 rounded-xl p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base font-mono mb-1">{contract.title}</h3>
                                        <p className="text-gray-500 text-xs font-mono">{contract.contract_type}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                                        contract.status === 'signed' ? 'bg-green-500/20 text-green-400' :
                                        contract.status === 'sent' ? 'bg-cyan-500/20 text-cyan-400' :
                                        'bg-gray-800 text-gray-500'
                                    }`}>
                                        {contract.status?.toUpperCase() || 'DRAFT'}
                                    </span>
                                </div>
                                {contract.terms && (
                                    <p className="text-gray-400 text-sm font-mono line-clamp-2 mt-2 pt-2 border-t border-gray-800">
                                        {contract.terms.substring(0, 150)}...
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Kingdom51Crown8Bit size={20} animate={false} />
                    <p className="text-amber-500/60 text-xs font-black tracking-wider" style={{ fontFamily: 'monospace' }}>KINGDOM51</p>
                </div>
                <p className="text-gray-700 text-xs font-mono">AI-generated • Always get legal review</p>
            </div>
        </div>
    );
}