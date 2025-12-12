import React, { useState } from 'react';
import { Search, Loader2, Mail, Phone, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import ScottContactMatcher from './ScottContactMatcher';
import ScottClearanceEmailDraft from './ScottClearanceEmailDraft';

/**
 * SAMPLE ANALYZER
 * Search who owns a sample + get direct contact route
 * No BS, straight to the point
 */

export default function ScottSampleAnalyzer() {
    const [isOpen, setIsOpen] = useState(false);
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [yourArtist, setYourArtist] = useState('');
    const [yourTrack, setYourTrack] = useState('');
    const [result, setResult] = useState(null);
    const [labelName, setLabelName] = useState('');
    const [publisherName, setPublisherName] = useState('');

    const analyzeMutation = useMutation({
        mutationFn: async () => {
            const prompt = `You are a music industry professional helping to identify sample clearance contacts.

SAMPLE INFO:
Song: "${songName}"
Artist: "${artistName}"

TASK: Research and provide:
1. Who owns the MASTER RECORDING (record label)
2. Who owns the COMPOSITION/PUBLISHING (publisher/songwriter)
3. Direct contact info (email/phone if publicly available)
4. Estimated clearance cost range
5. Best route to approach them
6. Professional talking points for initial contact

Be SPECIFIC and ACTIONABLE. If you can't find exact contacts, provide the label/publisher name and how to reach them.

Use real industry knowledge. Format as clear sections.`;

            const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: true
            });

            return response;
        },
        onSuccess: (data) => {
            setResult(data);
            // Extract label/publisher names from result for contact matching
            const labelMatch = data.match(/label[:\s]+([^\n]+)/i);
            const publisherMatch = data.match(/publisher[:\s]+([^\n]+)/i);
            if (labelMatch) setLabelName(labelMatch[1].trim());
            if (publisherMatch) setPublisherName(publisherMatch[1].trim());
        }
    });

    const handleAnalyze = () => {
        if (!songName.trim() || !artistName.trim()) return;
        setResult(null);
        analyzeMutation.mutate();
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full text-left bg-black border-2 border-cyan-500 hover:border-cyan-400 rounded-lg p-4 transition-all"
                style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}
            >
                <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                        <p className="text-white text-sm font-bold font-mono">Sample Search & Analysis</p>
                        <p className="text-cyan-400 text-xs font-mono">Find who owns it + get contacts</p>
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto p-4">
                    <div className="max-w-2xl mx-auto py-8">
                        <div className="bg-black border-2 border-cyan-500 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-cyan-400 font-mono">SAMPLE ANALYZER</h2>
                                <button
                                    onClick={() => { setIsOpen(false); setResult(null); }}
                                    className="text-gray-400 hover:text-white font-mono text-sm"
                                >
                                    CLOSE ✕
                                </button>
                            </div>

                            {/* INPUT FORM */}
                            <div className="space-y-3 mb-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-gray-400 text-xs font-mono mb-1 block">YOUR ARTIST</label>
                                        <Input
                                            value={yourArtist}
                                            onChange={(e) => setYourArtist(e.target.value)}
                                            placeholder="e.g., YES AND MAYBE"
                                            className="bg-black border-gray-800 text-white font-mono"
                                            disabled={analyzeMutation.isPending}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-xs font-mono mb-1 block">YOUR TRACK</label>
                                        <Input
                                            value={yourTrack}
                                            onChange={(e) => setYourTrack(e.target.value)}
                                            placeholder="e.g., New Single"
                                            className="bg-black border-gray-800 text-white font-mono"
                                            disabled={analyzeMutation.isPending}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs font-mono mb-1 block">SAMPLE SONG</label>
                                    <Input
                                        value={songName}
                                        onChange={(e) => setSongName(e.target.value)}
                                        placeholder="e.g., Apache"
                                        className="bg-black border-gray-800 text-white font-mono"
                                        disabled={analyzeMutation.isPending}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs font-mono mb-1 block">SAMPLE ARTIST</label>
                                    <Input
                                        value={artistName}
                                        onChange={(e) => setArtistName(e.target.value)}
                                        placeholder="e.g., The Incredible Bongo Band"
                                        className="bg-black border-gray-800 text-white font-mono"
                                        disabled={analyzeMutation.isPending}
                                    />
                                </div>
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={!songName.trim() || !artistName.trim() || analyzeMutation.isPending}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold font-mono"
                                >
                                    {analyzeMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            SEARCHING...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-4 h-4 mr-2" />
                                            ANALYZE SAMPLE
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* RESULTS */}
                            {result && (
                                <div className="space-y-4">
                                    {/* CHECK EXISTING CONTACTS FIRST */}
                                    <ScottContactMatcher 
                                        labelName={labelName} 
                                        publisherName={publisherName} 
                                    />

                                    <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <p className="text-green-400 font-bold font-mono">ANALYSIS COMPLETE</p>
                                        </div>
                                        
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            <div className="text-white text-sm font-mono whitespace-pre-wrap leading-relaxed">
                                                {result}
                                            </div>
                                        </div>

                                        {/* EMAIL DRAFTER */}
                                        <div className="mt-6 pt-6 border-t border-gray-800">
                                            <p className="text-gray-400 text-xs font-mono mb-3">DRAFT CLEARANCE EMAIL:</p>
                                            <ScottClearanceEmailDraft
                                                sampleSong={songName}
                                                sampleArtist={artistName}
                                                yourArtist={yourArtist}
                                                trackTitle={yourTrack}
                                                labelContact={labelName}
                                                publisherContact={publisherName}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {analyzeMutation.isError && (
                                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                    <p className="text-red-400 text-sm font-mono">Search failed. Check your connection and try again.</p>
                                </div>
                            )}

                            {/* TIPS */}
                            {!result && !analyzeMutation.isPending && (
                                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                                    <p className="text-cyan-400 font-bold text-xs font-mono mb-2">💡 TIPS</p>
                                    <ul className="text-gray-400 text-xs font-mono space-y-1">
                                        <li>• Be specific with song + artist names</li>
                                        <li>• AI searches live data for contacts</li>
                                        <li>• Results include talking points for negotiation</li>
                                        <li>• Save results to track clearance progress</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}