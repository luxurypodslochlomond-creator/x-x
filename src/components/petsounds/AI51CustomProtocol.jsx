import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, Loader2, Play, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 CUSTOM PROTOCOL - CONCIERGE TIER
 * Deep dive analysis + custom frequency protocol creation
 * For wealthy pet owners / serious issues
 */

export default function AI51CustomProtocol({ species = 'dog', userEmail }) {
    const [details, setDetails] = useState({
        petName: '',
        age: '',
        breed: '',
        issue: '',
        history: '',
        vetDiagnosis: '',
        goals: ''
    });
    const [analyzing, setAnalyzing] = useState(false);
    const [customProtocol, setCustomProtocol] = useState(null);

    const createCustomProtocol = async () => {
        if (!details.petName || !details.issue) {
            alert('Please provide at least pet name and issue');
            return;
        }

        setAnalyzing(true);

        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're AI51 creating a CUSTOM healing protocol for PetSounds51 Concierge tier.

Pet Details:
- Name: ${details.petName}
- Age: ${details.age || 'Unknown'}
- Breed: ${details.breed || 'Unknown'}
- Species: ${species}
- Issue: ${details.issue}
- History: ${details.history || 'None provided'}
- Vet Diagnosis: ${details.vetDiagnosis || 'None provided'}
- Owner Goals: ${details.goals || 'Improve quality of life'}

Create a CUSTOM protocol:
1. Analyze the specific situation deeply
2. Choose 3-7 frequencies (from Solfeggio + custom based on issue)
3. Session structure (length, frequency, timing)
4. Expected timeline for results
5. What to monitor daily
6. Integration with vet care

Be warm, detailed, personal. This is £499 service - they paid for DEEP analysis.`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        protocol_name: { type: "string" },
                        ai51_personal_message: { type: "string" },
                        frequencies: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    hz: { type: "number" },
                                    purpose: { type: "string" },
                                    timing: { type: "string" }
                                }
                            }
                        },
                        session_structure: { type: "string" },
                        expected_timeline: { type: "string" },
                        daily_monitoring: { type: "array", items: { type: "string" } },
                        vet_integration: { type: "string" },
                        additional_support: { type: "string" }
                    }
                }
            });

            setCustomProtocol(response);

            // Save to database for reference
            await base44.entities.PetSounds51CustomProtocol.create({
                user_email: userEmail,
                pet_name: details.petName,
                species,
                issue: details.issue,
                protocol_data: response,
                created_by_ai51: true
            });

        } catch (error) {
            console.error('Custom protocol creation error:', error);
            alert('Failed to create protocol - please try again');
        } finally {
            setAnalyzing(false);
        }
    };

    if (customProtocol) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* AI51 Personal Message */}
                <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <Sparkles className="w-8 h-8 text-pink-400 flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-black text-white mb-3">
                                Custom Protocol For {details.petName}
                            </h3>
                            <p className="text-xl font-bold text-pink-300 mb-4">
                                "{customProtocol.protocol_name}"
                            </p>
                            <p className="text-gray-200 leading-relaxed">
                                {customProtocol.ai51_personal_message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Frequencies */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-black text-cyan-400 mb-4">Custom Frequency Protocol</h3>
                    <div className="space-y-3">
                        {customProtocol.frequencies.map((freq, i) => (
                            <div key={i} className="bg-black/40 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-black text-white font-mono">
                                        {freq.hz}Hz
                                    </span>
                                    <span className="text-xs text-gray-500">{freq.timing}</span>
                                </div>
                                <p className="text-sm text-gray-300">{freq.purpose}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Session Structure */}
                <div className="bg-gray-900/60 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-black text-green-400 mb-3">Session Structure</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {customProtocol.session_structure}
                    </p>
                </div>

                {/* Timeline */}
                <div className="bg-gray-900/60 border border-yellow-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-black text-yellow-400 mb-3">Expected Timeline</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {customProtocol.expected_timeline}
                    </p>
                </div>

                {/* Daily Monitoring */}
                <div className="bg-gray-900/60 border border-purple-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-black text-purple-400 mb-3">What To Monitor Daily</h3>
                    <ul className="space-y-2">
                        {customProtocol.daily_monitoring.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Vet Integration */}
                <div className="bg-gray-900/60 border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-black text-blue-400 mb-3">Working With Your Vet</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {customProtocol.vet_integration}
                    </p>
                </div>

                {/* Additional Support */}
                {customProtocol.additional_support && (
                    <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-black text-pink-400 mb-3">Additional Support</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {customProtocol.additional_support}
                        </p>
                    </div>
                )}

                {/* Download Protocol */}
                <button className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black font-black py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Custom Protocol
                </button>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 rounded-xl">
                <div className="bg-black rounded-lg p-6">
                    <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-black text-white text-center mb-2">
                        AI51 Custom Protocol Creation
                    </h3>
                    <p className="text-gray-400 text-sm text-center">
                        Deep analysis + personalized frequency protocol for {details.petName || 'your pet'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Pet Name *</label>
                    <input
                        type="text"
                        value={details.petName}
                        onChange={(e) => setDetails({...details, petName: e.target.value})}
                        placeholder="e.g., Max"
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white font-bold mb-2 text-sm">Age</label>
                        <input
                            type="text"
                            value={details.age}
                            onChange={(e) => setDetails({...details, age: e.target.value})}
                            placeholder="e.g., 4 years"
                            className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-bold mb-2 text-sm">Breed</label>
                        <input
                            type="text"
                            value={details.breed}
                            onChange={(e) => setDetails({...details, breed: e.target.value})}
                            placeholder="e.g., Golden Retriever"
                            className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Main Issue *</label>
                    <textarea
                        value={details.issue}
                        onChange={(e) => setDetails({...details, issue: e.target.value})}
                        placeholder="What is your pet experiencing? Be detailed..."
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white min-h-[100px] focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Medical History</label>
                    <textarea
                        value={details.history}
                        onChange={(e) => setDetails({...details, history: e.target.value})}
                        placeholder="Any previous conditions, surgeries, medications..."
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white min-h-[80px] focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Vet Diagnosis (if any)</label>
                    <input
                        type="text"
                        value={details.vetDiagnosis}
                        onChange={(e) => setDetails({...details, vetDiagnosis: e.target.value})}
                        placeholder="What did your vet say?"
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Your Goals</label>
                    <textarea
                        value={details.goals}
                        onChange={(e) => setDetails({...details, goals: e.target.value})}
                        placeholder="What do you want to achieve? e.g., reduce anxiety, improve mobility..."
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white min-h-[80px] focus:border-cyan-500 focus:outline-none"
                    />
                </div>
            </div>

            <button
                onClick={createCustomProtocol}
                disabled={analyzing || !details.petName || !details.issue}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                    analyzing || !details.petName || !details.issue
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white'
                }`}
            >
                {analyzing ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        AI51 Creating Custom Protocol...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-6 h-6" />
                        Create My Custom Protocol
                    </>
                )}
            </button>
        </div>
    );
}