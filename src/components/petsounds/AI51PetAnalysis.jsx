import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, Sparkles, Video } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 PET ANALYSIS - PREMIUM TIER
 * Describe your pet's issue, AI51 recommends custom frequencies
 * 
 * NOT MEDICAL ADVICE - behavioral analysis only
 * Recommends frequencies based on observed behavior patterns
 */

export default function AI51PetAnalysis({ species = 'dog', onRecommendation }) {
    const [description, setDescription] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [useCamera, setUseCamera] = useState(false);

    const analyzeWithAI51 = async () => {
        if (!description.trim()) {
            alert('Please describe what your pet is experiencing');
            return;
        }

        setAnalyzing(true);

        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51 analyzing animal behavior for PetSounds51.

Species: ${species}
Owner describes: "${description}"

Based on this, recommend:
1. What behavior patterns you see (anxiety, pain, stress, etc)
2. Which healing frequencies to try (choose from: 174Hz pain relief, 285Hz healing, 396Hz fear release, 432Hz calm, 528Hz transformation, 639Hz connection, 741Hz expression, 852Hz intuition)
3. Session length (15-60 minutes)
4. How often to use (daily, as needed, etc)
5. What to look for as improvement

CRITICAL: Start with "I see..." and be warm but clear this is NOT medical advice - owner should see vet for medical issues. You're analyzing behavior patterns and suggesting sound therapy as complementary support.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        behavior_pattern: { type: "string" },
                        recommended_frequencies: { 
                            type: "array",
                            items: { type: "number" }
                        },
                        session_length_minutes: { type: "number" },
                        frequency: { type: "string" },
                        what_to_watch_for: { type: "string" },
                        ai51_message: { type: "string" }
                    }
                }
            });

            setRecommendation(response);
            if (onRecommendation) onRecommendation(response);

        } catch (error) {
            console.error('AI51 analysis error:', error);
            alert('Analysis failed - please try again');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6">
            
            {/* Input */}
            <div>
                <label className="block text-white font-bold mb-2">
                    Describe what your {species} is experiencing:
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., My dog paces and whines when I leave the house. Starts about 5 minutes before I go. She's a 4-year-old rescue..."
                    className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-4 text-white min-h-[120px] focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                    Be specific: when does it happen? How long? Any patterns?
                </p>
            </div>

            {/* Camera Option (future) */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-purple-400" />
                    <div className="flex-1">
                        <p className="text-white font-bold text-sm">Video Analysis (Coming Soon)</p>
                        <p className="text-xs text-gray-400">AI51 will watch behavior in real-time</p>
                    </div>
                </div>
            </div>

            {/* Analyze Button */}
            <button
                onClick={analyzeWithAI51}
                disabled={analyzing || !description.trim()}
                className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    analyzing || !description.trim()
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black'
                }`}
            >
                {analyzing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        AI51 Analyzing...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        Ask AI51 For Help
                    </>
                )}
            </button>

            {/* Recommendation */}
            {recommendation && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-cyan-900/40 to-green-900/40 border-2 border-cyan-500 rounded-xl p-6 space-y-4"
                >
                    <div className="flex items-start gap-3 mb-4">
                        <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-black text-white mb-2">AI51's Analysis</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {recommendation.ai51_message}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-cyan-500/30 pt-4 space-y-3">
                        <div>
                            <p className="text-cyan-300 font-bold text-sm mb-1">Behavior Pattern:</p>
                            <p className="text-white text-sm">{recommendation.behavior_pattern}</p>
                        </div>

                        <div>
                            <p className="text-cyan-300 font-bold text-sm mb-2">Recommended Frequencies:</p>
                            <div className="flex gap-2 flex-wrap">
                                {recommendation.recommended_frequencies.map((freq, i) => (
                                    <span key={i} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono">
                                        {freq}Hz
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-cyan-300 font-bold text-sm mb-1">Protocol:</p>
                            <p className="text-white text-sm">
                                {recommendation.session_length_minutes} minutes, {recommendation.frequency}
                            </p>
                        </div>

                        <div>
                            <p className="text-cyan-300 font-bold text-sm mb-1">What To Watch For:</p>
                            <p className="text-white text-sm">{recommendation.what_to_watch_for}</p>
                        </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 mt-4">
                        <p className="text-xs text-yellow-300">
                            ⚠️ This is behavioral analysis, not medical advice. See your vet for medical concerns.
                        </p>
                    </div>
                </motion.div>
            )}

        </div>
    );
}