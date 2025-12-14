import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Music, Search, AlertCircle, Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * SCOTT SAMPLE TOOLS - MOBILE-FRIENDLY ACCORDION
 * No modals - expandable sections instead
 */

export default function ScottSampleTools() {
    const [expanded, setExpanded] = useState(null);
    const [uploadingAudio, setUploadingAudio] = useState(false);
    const [identifyResult, setIdentifyResult] = useState(null);

    const tools = [
        {
            id: 'identifier',
            icon: Music,
            title: 'Audio Sample Identifier',
            desc: 'Upload audio → AI identifies it',
            color: 'purple',
            content: (
                <div className="p-4 space-y-3">
                    {uploadingAudio ? (
                        <div className="text-center py-8">
                            <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-3 animate-spin" />
                            <p className="text-purple-400 text-sm font-mono">Identifying audio...</p>
                        </div>
                    ) : identifyResult ? (
                        <div className="space-y-3">
                            {identifyResult.identified ? (
                                <>
                                    <div className="bg-green-900/20 border border-green-500 p-3 rounded">
                                        <p className="text-green-400 font-bold font-mono text-sm mb-2">✓ IDENTIFIED</p>
                                        <p className="text-white font-mono text-base mb-1">{identifyResult.song_title}</p>
                                        <p className="text-gray-400 font-mono text-sm">{identifyResult.artist}</p>
                                        {identifyResult.album && <p className="text-gray-500 font-mono text-xs mt-1">{identifyResult.album} ({identifyResult.release_year})</p>}
                                    </div>
                                    <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
                                        <p className="text-purple-400 font-bold font-mono text-xs mb-2">RIGHTS HOLDERS:</p>
                                        <p className="text-gray-400 font-mono text-xs">Master: {identifyResult.master_owner}</p>
                                        <p className="text-gray-400 font-mono text-xs">Publishing: {identifyResult.publishing_owner}</p>
                                    </div>
                                    <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded">
                                        <p className="text-amber-400 font-bold font-mono text-xs mb-2">ESTIMATED COSTS:</p>
                                        <p className="text-gray-400 font-mono text-xs">Upfront: £{identifyResult.estimated_clearance_cost_gbp?.toLocaleString() || '???'}</p>
                                        <p className="text-gray-400 font-mono text-xs">Royalty: ~{identifyResult.estimated_royalty_percentage}% of track revenue</p>
                                    </div>
                                    {identifyResult.notes && (
                                        <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                                            <p className="text-gray-400 font-mono text-xs">{identifyResult.notes}</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-red-900/20 border border-red-500 p-3 rounded text-center">
                                    <p className="text-red-400 font-mono text-sm mb-2">Could not identify sample</p>
                                    <p className="text-gray-500 font-mono text-xs">Try clearer audio or contact rights holders manually</p>
                                </div>
                            )}
                            <button
                                onClick={() => setIdentifyResult(null)}
                                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white font-mono rounded text-sm"
                            >
                                TRY ANOTHER
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center py-8">
                                <p className="text-gray-400 text-sm font-mono mb-3">Upload audio file</p>
                                <input
                                    type="file"
                                    accept="audio/mp3,audio/wav,audio/m4a,audio/mpeg"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        
                                        setUploadingAudio(true);
                                        try {
                                            const { file_url } = await base44.integrations.Core.UploadFile({ file });
                                            const result = await base44.functions.invoke('identifyAudioSample', { file_url });
                                            setIdentifyResult(result.data);
                                        } catch (error) {
                                            alert('Failed to identify audio');
                                            console.error(error);
                                        } finally {
                                            setUploadingAudio(false);
                                        }
                                    }}
                                    id="audio-upload"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="audio-upload"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg cursor-pointer"
                                >
                                    <Upload className="w-5 h-5" />
                                    CHOOSE FILE
                                </label>
                                <p className="text-gray-600 text-xs font-mono mt-2">MP3, WAV, M4A</p>
                            </div>
                            <div className="bg-purple-900/20 border border-purple-500/30 rounded p-3">
                                <p className="text-purple-400 text-xs font-mono font-bold mb-1">HOW IT WORKS:</p>
                                <p className="text-gray-400 text-xs font-mono">AI identifies song → Shows rights holders → Estimates clearance cost</p>
                            </div>
                        </>
                    )}
                </div>
            )
        },
        {
            id: 'analyzer',
            icon: Search,
            title: 'Sample Search',
            desc: 'Find who owns it + get contacts',
            color: 'cyan',
            content: (
                <div className="p-4 space-y-3">
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Song name (e.g., Apache)"
                            className="w-full bg-black border border-gray-800 rounded px-3 py-2 text-white text-sm font-mono"
                        />
                        <input
                            type="text"
                            placeholder="Artist name"
                            className="w-full bg-black border border-gray-800 rounded px-3 py-2 text-white text-sm font-mono"
                        />
                        <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-mono rounded-lg text-sm">
                            SEARCH
                        </button>
                    </div>
                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-3">
                        <p className="text-cyan-400 text-xs font-mono font-bold mb-1">FINDS:</p>
                        <p className="text-gray-400 text-xs font-mono">Label • Publisher • Contacts • Cost estimate</p>
                    </div>
                </div>
            )
        },
        {
            id: 'guide',
            icon: AlertCircle,
            title: 'How Clearance Works',
            desc: 'Legal guide + contacts',
            color: 'amber',
            content: (
                <div className="p-4 space-y-3">
                    <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
                        <p className="text-red-400 font-bold text-xs font-mono mb-2">⚠️ YOU NEED TWO LICENSES:</p>
                        <p className="text-gray-400 text-xs font-mono mb-1">1. Master recording (from label)</p>
                        <p className="text-gray-400 text-xs font-mono">2. Composition (from publisher)</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-amber-400 font-bold text-xs font-mono">UK CONTACTS:</p>
                        <div className="bg-black border border-amber-500/30 rounded p-2">
                            <p className="text-white text-xs font-mono">PPL: 0207 534 1000</p>
                            <p className="text-white text-xs font-mono">PRS: 0800 072 0808</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-cyan-400 font-bold text-xs font-mono">USA CONTACTS:</p>
                        <div className="bg-black border border-cyan-500/30 rounded p-2">
                            <p className="text-white text-xs font-mono">ASCAP: +1 212-621-6000</p>
                            <p className="text-white text-xs font-mono">BMI: +1 212-220-3000</p>
                        </div>
                    </div>

                    <div className="bg-amber-900/20 border border-amber-500/30 rounded p-3">
                        <p className="text-amber-400 text-xs font-mono font-bold mb-1">COSTS (UK):</p>
                        <p className="text-gray-400 text-xs font-mono">£500-£10k upfront + 5-50% royalties</p>
                    </div>

                    <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
                        <p className="text-red-400 font-bold text-xs font-mono mb-1">WITHOUT CLEARANCE:</p>
                        <p className="text-gray-400 text-xs font-mono">Track gets taken down. You get sued. They take 100% of revenue.</p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-2">
            {tools.map(tool => {
                const isExpanded = expanded === tool.id;
                const Icon = tool.icon;
                
                const borderColor = tool.color === 'purple' ? 'border-purple-500' : tool.color === 'cyan' ? 'border-cyan-500' : 'border-amber-500';
                const textColor = tool.color === 'purple' ? 'text-purple-400' : tool.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400';
                
                return (
                    <div key={tool.id} className={`bg-black border-2 ${borderColor} rounded-lg overflow-hidden`}>
                        <button
                            onClick={() => setExpanded(isExpanded ? null : tool.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-gray-900/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${textColor} flex-shrink-0`} />
                                <div className="text-left">
                                    <p className="text-white text-sm font-bold font-mono">{tool.title}</p>
                                    <p className={`${textColor} text-xs font-mono`}>{tool.desc}</p>
                                </div>
                            </div>
                            {isExpanded ? (
                                <ChevronDown className={`w-5 h-5 ${textColor} flex-shrink-0`} />
                            ) : (
                                <ChevronRight className={`w-5 h-5 ${textColor} flex-shrink-0`} />
                            )}
                        </button>
                        
                        {isExpanded && (
                            <div className="border-t-2 border-gray-900">
                                {tool.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}