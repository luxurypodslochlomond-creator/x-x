import React, { useState, useEffect } from 'react';
import { Brain, Zap, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * AI51 SMART GIG FILTER
 * Best filtering on Earth and beyond bro ♾️❤️
 * 
 * Learns from Scott's decisions, filters noise, shows only relevant offers
 * Simple YES/NO/MAYBE with confidence and reasons
 */

export default function AI51GigFilter({ offer, artist }) {
    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [pastDecisions, setPastDecisions] = useState([]);

    useEffect(() => {
        // Load past decisions for learning
        const loadPastDecisions = async () => {
            try {
                const accepted = await base44.entities.ScottGigOffer.filter({ 
                    artist_id: offer.artist_id,
                    status: 'accepted_by_band'
                });
                const rejected = await base44.entities.ScottGigOffer.filter({ 
                    artist_id: offer.artist_id,
                    status: 'rejected_by_band'
                });
                setPastDecisions({ accepted, rejected });
            } catch (error) {
                console.error('Error loading decisions:', error);
            }
        };
        loadPastDecisions();
    }, [offer.artist_id]);

    const analyzeOffer = async () => {
        setAnalyzing(true);
        try {
            // AI51 analyzes the offer
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You are AI51, the smartest booking filter in the universe. Analyze this gig offer for ${artist?.name || 'this artist'}.

**OFFER DETAILS:**
- Venue: ${offer.venue}
- Location: ${offer.city}, ${offer.country}
- Date: ${offer.date}
- Fee: £${offer.fee}
- Capacity: ${offer.capacity || 'Unknown'}
- Promoter: ${offer.promoter || 'Unknown'}
${offer.requirements ? `- Requirements: ${offer.requirements}` : ''}

**ARTIST INFO:**
- Genre: ${artist?.genre || 'Unknown'}
- Rate: ${artist?.rate || 'Unknown'}
- Bio: ${artist?.bio || 'No bio'}

**PAST DECISIONS (LEARNING DATA):**
${pastDecisions.accepted?.length > 0 ? `Accepted: ${pastDecisions.accepted.slice(0, 3).map(o => `${o.venue} (£${o.fee}, ${o.city})`).join(', ')}` : 'No accepted gigs yet'}
${pastDecisions.rejected?.length > 0 ? `Rejected: ${pastDecisions.rejected.slice(0, 3).map(o => `${o.venue} (£${o.fee}, ${o.city})`).join(', ')}` : 'No rejected gigs yet'}

**ANALYSIS:**
1. Does the fee match their rate?
2. Is the venue quality good?
3. Is location convenient? (avoid remote gigs unless fee is high)
4. Does capacity match their level?
5. Is the promoter known/reputable?
6. Do requirements seem reasonable?
7. Does it fit past acceptance patterns?

**YOUR RESPONSE:**
Give a clear recommendation: "YES" (book it now), "MAYBE" (discuss with band), or "NO" (decline).
Be Scott's trusted co-manager - filter noise, only show quality.
Provide 2-3 bullet points why, keep it simple.
Include confidence score 1-100.

Return JSON:
{
  "recommendation": "YES" or "MAYBE" or "NO",
  "confidence": 85,
  "reasons": ["Reason 1", "Reason 2"],
  "vibe": "Brief one-liner vibe check"
}`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        recommendation: { type: ["string", "null"] },
                        confidence: { type: ["number", "null"] },
                        reasons: { type: ["array", "null"], items: { type: "string" } },
                        vibe: { type: ["string", "null"] }
                    }
                }
            });

            setAnalysis(response);
        } catch (error) {
            console.error('AI51 analysis error:', error);
            setAnalysis({ 
                recommendation: "MAYBE", 
                confidence: 50, 
                reasons: ["Couldn't analyze - check manually bro"], 
                vibe: "Error analyzing" 
            });
        }
        setAnalyzing(false);
    };

    // Auto-analyze on mount
    useEffect(() => {
        if (offer && artist && !analysis && !analyzing) {
            analyzeOffer();
        }
    }, [offer, artist]);

    if (!analysis && !analyzing) {
        return (
            <button
                onClick={analyzeOffer}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
                <Brain className="w-5 h-5" />
                AI51 ANALYZE
            </button>
        );
    }

    if (analyzing) {
        return (
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-pink-400 animate-pulse" />
                <div>
                    <p className="text-pink-400 font-black font-mono text-sm">AI51 ANALYZING...</p>
                    <p className="text-gray-400 text-xs font-mono">Checking quality + learning patterns</p>
                </div>
            </div>
        );
    }

    const getRecommendationStyle = () => {
        switch (analysis.recommendation) {
            case 'YES':
                return {
                    icon: CheckCircle,
                    gradient: 'from-green-500/20 to-cyan-500/20',
                    border: 'border-green-500',
                    text: 'text-green-400',
                    glow: 'shadow-lg shadow-green-500/50'
                };
            case 'MAYBE':
                return {
                    icon: AlertTriangle,
                    gradient: 'from-amber-500/20 to-yellow-500/20',
                    border: 'border-amber-500',
                    text: 'text-amber-400',
                    glow: 'shadow-lg shadow-amber-500/50'
                };
            case 'NO':
                return {
                    icon: XCircle,
                    gradient: 'from-red-500/20 to-pink-500/20',
                    border: 'border-red-500',
                    text: 'text-red-400',
                    glow: 'shadow-lg shadow-red-500/50'
                };
            default:
                return {
                    icon: Brain,
                    gradient: 'from-gray-500/20 to-gray-600/20',
                    border: 'border-gray-500',
                    text: 'text-gray-400',
                    glow: ''
                };
        }
    };

    const style = getRecommendationStyle();
    const Icon = style.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-r ${style.gradient} border-2 ${style.border} rounded-lg p-5 ${style.glow}`}
        >
            {/* HEADER - AI51 RECOMMENDATION */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Brain className={`w-7 h-7 ${style.text}`} />
                    <div>
                        <p className={`${style.text} font-black text-xl font-mono`}>
                            AI51: {analysis.recommendation}
                        </p>
                        <p className="text-gray-400 text-xs font-mono">{analysis.vibe}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${style.text}`} />
                    <span className={`${style.text} font-black font-mono text-lg`}>
                        {analysis.confidence}%
                    </span>
                </div>
            </div>

            {/* CONFIDENCE BAR */}
            <div className="bg-black/60 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${
                        analysis.recommendation === 'YES' 
                            ? 'from-green-500 to-cyan-500'
                            : analysis.recommendation === 'MAYBE'
                                ? 'from-amber-500 to-yellow-500'
                                : 'from-red-500 to-pink-500'
                    }`}
                />
            </div>

            {/* REASONS */}
            <div className="space-y-2">
                {analysis.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <Icon className={`w-4 h-4 ${style.text} mt-0.5 flex-shrink-0`} />
                        <p className="text-white text-sm font-mono">{reason}</p>
                    </div>
                ))}
            </div>

            {/* LEARNING INDICATOR */}
            {pastDecisions.accepted?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-gray-500 text-xs font-mono">
                        📊 Learned from {pastDecisions.accepted.length} accepted + {pastDecisions.rejected?.length || 0} rejected gigs
                    </p>
                </div>
            )}
        </motion.div>
    );
}