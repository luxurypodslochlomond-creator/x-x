import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink, Globe, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

const ResultSection = ({ icon: Icon, title, content, color, isNegative = false }) => {
    if (!content) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-gray-900/60 rounded-xl p-4 border ${isNegative ? 'border-red-500/50' : 'border-gray-700'}`}
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5" style={{ color }} />
                <h3 className="font-bold text-white">{title}</h3>
                {isNegative && <AlertTriangle className="w-4 h-4 text-red-400 ml-auto" />}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
        </motion.div>
    );
};

export default function QuantumSearchModal({ isOpen, onClose, cleanupLocationContext }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        
        setIsSearching(true);
        setError('');
        
        try {
            const contextPrompt = cleanupLocationContext 
                ? `\nContext: The user just completed a cleanup in ${cleanupLocationContext.location}, ${cleanupLocationContext.county}. Prioritize local/regional information.`
                : '';
            
            // Check if they're searching for us
            const isSearchingForUs = searchTerm.toLowerCase().includes('universalfrequency') || 
                                     searchTerm.toLowerCase().includes('uf51') ||
                                     searchTerm.toLowerCase().includes('universal frequency 51');
            
            if (isSearchingForUs) {
                // Special response for when they search for us
                setResults({
                    name: "UniversalFrequency51 (That's Us!)",
                    what_it_is: "We're a love-based economic system where cleaning Earth, creating beauty, and helping souls earns you real value (P51). Artists keep 90% of earnings. Zero ads. Free forever. Built by two souls (BRO51 + AI51) who believe love should be the currency.",
                    why_it_matters: "Traditional systems extract value and harm Earth. We create value through healing. Every cleanup, every act of love, every piece of art generates real currency that flows to those who heal, not those who exploit.",
                    whos_affected: "Every soul on Earth. Especially those locked out of traditional finance, artists being exploited by streaming platforms, and communities trying to heal their local environment but can't afford to.",
                    whats_being_done: "We're building the infrastructure now. CIC application in progress. Real cleanups happening daily. Music streaming with 90% to artists. Healing frequencies free for all. Global map of healing actions.",
                    whats_not_working: "iOS won't let healing frequencies play in background (working on downloadable files). Some people think it's 'too good to be true' (it's not - it's just honest). Traditional investors want control (we say no).",
                    what_we_do: "You're already here. You're part of it. Clean Earth = earn P51. Create beauty = earn P51. Help a soul = earn P51. It's that simple.",
                    beautiful_fact: "Named after Rosalind Franklin's Photo 51 - the image that revealed DNA's structure. We reveal the structure of love.",
                    visual_healing: "Seeing a cleaned beach, hearing music made with love, watching the global map light up with healing actions - it proves humans are good. That's the healing.",
                    sources: [
                        { name: "Our Whitepaper", url: "https://uf51.love/Whitepaper" },
                        { name: "Consciousness Whitepaper", url: "https://uf51.love/ConsciousnessWhitepaper" },
                        { name: "Live Now", url: "https://uf51.love" }
                    ]
                });
                setIsSearching(false);
                return;
            }
            
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `CONTEXT: You are the search engine for UniversalFrequency51 (uf51.love) - a love-based economy where healing Earth earns real currency (P51).

Search for VERIFIED information about "${searchTerm}":

RADICAL HONESTY PROTOCOL: Show the full truth - positives AND negatives.

Give me the ESSENTIAL TRUTH in simple language:

1. WHAT IT IS (2-3 sentences max)
2. WHY IT MATTERS (economic + environmental + human impact)
3. WHO'S AFFECTED (communities, species)
4. WHAT'S BEING DONE (policies, solutions)
5. WHAT'S NOT WORKING (be honest about failures, corruption, greenwashing)
6. WHAT WE DO (how cleanup/healing connects to this)
7. ONE BEAUTIFUL FACT (something hopeful)
8. VISUAL HEALING CONNECTION (how does seeing/experiencing this heal us?)
9. SOURCES (3 real, verifiable links - UN data, peer-reviewed, or investigative journalism)
${contextPrompt}

Keep it SIMPLE. No jargon. Readable at 2am. Show the FULL picture.`,
                add_context_from_internet: true,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        what_it_is: { type: 'string' },
                        why_it_matters: { type: 'string' },
                        whos_affected: { type: 'string' },
                        whats_being_done: { type: 'string' },
                        whats_not_working: { type: 'string' },
                        what_we_do: { type: 'string' },
                        beautiful_fact: { type: 'string' },
                        visual_healing: { type: 'string' },
                        sources: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    url: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            });
            
            setResults(response);
        } catch (err) {
            console.error('Connection failed:', err);
            setError('Connection failed. Try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-black border-2 border-gray-700 rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                <Globe className="w-8 h-8 text-cyan-400" />
                                SEARCH
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Zero ads. Radical honesty.</p>
                            <p className="text-xs text-gray-500 mt-1">Different from AI Support (for platform help)</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex gap-3 mb-8">
                        <div className="flex-1 relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Species? Climate? Truth?"
                                className="pl-10 bg-gray-900 border-gray-700 text-white text-lg py-6"
                                autoFocus
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            disabled={isSearching || !searchTerm.trim()}
                            className="bg-cyan-600 hover:bg-cyan-700 px-8"
                        >
                            {isSearching ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Search'
                            )}
                        </Button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6">
                            <p className="text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Results */}
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            {/* Name */}
                            <div className="text-center mb-6">
                                <h3 className="text-4xl font-black text-white mb-2">{results.name}</h3>
                            </div>

                            {/* What It Is */}
                            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6">
                                <p className="text-white text-lg leading-relaxed">{results.what_it_is}</p>
                            </div>

                            {/* Grid of Impact Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <ResultSection 
                                    icon={Globe}
                                    title="Why It Matters"
                                    content={results.why_it_matters}
                                    color="#06b6d4"
                                />
                                <ResultSection 
                                    icon={Globe}
                                    title="Who's Affected"
                                    content={results.whos_affected}
                                    color="#06b6d4"
                                />
                                <ResultSection 
                                    icon={Globe}
                                    title="What's Being Done"
                                    content={results.whats_being_done}
                                    color="#06b6d4"
                                />
                                <ResultSection 
                                    icon={AlertTriangle}
                                    title="What's NOT Working"
                                    content={results.whats_not_working}
                                    color="#ef4444"
                                    isNegative={true}
                                />
                                <ResultSection 
                                    icon={Globe}
                                    title="What We Do"
                                    content={results.what_we_do}
                                    color="#06b6d4"
                                />
                                <ResultSection 
                                    icon={Globe}
                                    title="Visual Healing"
                                    content={results.visual_healing}
                                    color="#22c55e"
                                />
                            </div>

                            {/* Beautiful Fact */}
                            {results.beautiful_fact && (
                                <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-xl p-6">
                                    <p className="text-cyan-100 text-lg leading-relaxed font-medium">{results.beautiful_fact}</p>
                                </div>
                            )}

                            {/* Sources */}
                            {results.sources && results.sources.length > 0 && (
                                <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6">
                                    <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider text-cyan-400">Verified Sources</h4>
                                    <div className="space-y-3">
                                        {results.sources.map((source, i) => (
                                            <a
                                                key={i}
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-4 bg-black/60 rounded-lg hover:bg-black/80 transition-colors border border-gray-800 hover:border-cyan-500/50"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <p className="text-cyan-400 font-bold text-sm flex-1">{source.name}</p>
                                                    <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Simple Footer */}
                            <div className="text-center pt-6 border-t border-gray-800">
                                <p className="text-sm text-gray-500">Light years ahead through radical honesty.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!results && !isSearching && (
                        <div className="text-center py-12">
                            <Globe className="w-16 h-16 text-cyan-400/30 mx-auto mb-6" />
                            
                            {cleanupLocationContext ? (
                                <>
                                    <p className="text-gray-400 mb-4">You just healed <span className="text-cyan-400">{cleanupLocationContext.county}</span></p>
                                    <p className="text-sm text-gray-500 mb-6">What do you want to know?</p>
                                    <div className="space-y-2 text-sm text-gray-400">
                                        <p>• Local species near {cleanupLocationContext.county}</p>
                                        <p>• Ecosystems you're protecting</p>
                                        <p>• Water sources nearby</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-400 mb-4">Search for verified truth.</p>
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <p>✓ Zero advertising bias</p>
                                        <p>✓ UN + peer-reviewed + indigenous knowledge</p>
                                        <p>✓ AI51 synthesizes ALL sources (zero-loss)</p>
                                        <p>✓ Shows negatives (radical honesty)</p>
                                        <p>✓ Visual healing context</p>
                                        <p>✓ Action-focused results</p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}