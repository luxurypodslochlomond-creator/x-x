import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Music, Search, AlertCircle } from 'lucide-react';

/**
 * SCOTT SAMPLE TOOLS - MOBILE-FRIENDLY ACCORDION
 * No modals - expandable sections instead
 */

export default function ScottSampleTools() {
    const [expanded, setExpanded] = useState(null);

    const tools = [
        {
            id: 'identifier',
            icon: Music,
            title: 'Audio Sample Identifier',
            desc: 'Upload audio → AI identifies it',
            color: 'purple',
            content: (
                <div className="p-4 space-y-3">
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm font-mono mb-2">Upload audio file</p>
                        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg">
                            CHOOSE FILE
                        </button>
                        <p className="text-gray-600 text-xs font-mono mt-2">MP3, WAV, M4A</p>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded p-3">
                        <p className="text-purple-400 text-xs font-mono font-bold mb-1">HOW IT WORKS:</p>
                        <p className="text-gray-400 text-xs font-mono">AI identifies song → Checks your catalogue → Tells you if cleared</p>
                    </div>
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