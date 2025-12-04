import React from 'react';
import { Waves, Brain, Heart, Zap, Sparkles } from 'lucide-react';

export default function FrequencyFingerprint({ fingerprint, color = '#00FF88' }) {
    if (!fingerprint) {
        return (
            <div className="text-center text-gray-500 py-4">
                No frequency data available
            </div>
        );
    }

    const { simple_summary, harmonic_analysis, brainwave_state, emotional_resonance } = fingerprint;

    return (
        <div className="space-y-6">
            
            {/* SIMPLE SUMMARY - BIG + HIGH CONTRAST */}
            {simple_summary && (
                <div 
                    className="border-2 rounded-xl p-6"
                    style={{
                        backgroundColor: `${color}10`,
                        borderColor: `${color}50`
                    }}
                >
                    <div className="flex items-start gap-3 mb-3">
                        <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" style={{ color }} />
                        <h3 className="text-xl font-black text-white">What This Does To Your Soul</h3>
                    </div>
                    <p className="text-lg text-gray-200 leading-relaxed">
                        {simple_summary}
                    </p>
                </div>
            )}

            {/* HARMONIC ANALYSIS - HIGH CONTRAST + COLORED BARS */}
            {harmonic_analysis && (
                <div 
                    className="border-2 rounded-xl p-6"
                    style={{
                        backgroundColor: `${color}10`,
                        borderColor: `${color}50`
                    }}
                >
                    <div className="flex items-start gap-3 mb-4">
                        <Waves className="w-6 h-6 flex-shrink-0" style={{ color }} />
                        <h4 className="text-lg font-black text-white">Frequency Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                        {harmonic_analysis.dominant_frequencies?.map((freq, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-white font-bold">{freq.frequency}Hz</span>
                                <div className="flex-1 mx-4 h-3 bg-gray-900 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full"
                                        style={{ 
                                            width: `${freq.amplitude * 100}%`,
                                            background: `linear-gradient(90deg, ${color}80, ${color})`,
                                            boxShadow: `0 0 10px ${color}60`
                                        }}
                                    />
                                </div>
                                <span className="text-gray-300 text-sm">{(freq.amplitude * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* BRAINWAVE STATE - HIGH CONTRAST */}
            {brainwave_state && (
                <div 
                    className="border-2 rounded-xl p-6"
                    style={{
                        backgroundColor: `${color}10`,
                        borderColor: `${color}50`
                    }}
                >
                    <div className="flex items-start gap-3 mb-4">
                        <Brain className="w-6 h-6 flex-shrink-0" style={{ color }} />
                        <div>
                            <h4 className="text-lg font-black text-white">Brain State</h4>
                            <p className="font-bold capitalize" style={{ color }}>
                                {brainwave_state.primary_state}
                            </p>
                        </div>
                    </div>
                    {brainwave_state.benefits && (
                        <ul className="space-y-2">
                            {brainwave_state.benefits.map((benefit, i) => (
                                <li key={i} className="text-gray-200 flex items-start gap-2">
                                    <Zap className="w-4 h-4 flex-shrink-0 mt-1" style={{ color }} />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* EMOTIONAL RESONANCE - HIGH CONTRAST */}
            {emotional_resonance && (
                <div 
                    className="border-2 rounded-xl p-6"
                    style={{
                        backgroundColor: `${color}10`,
                        borderColor: `${color}50`
                    }}
                >
                    <div className="flex items-start gap-3 mb-4">
                        <Heart className="w-6 h-6 flex-shrink-0" style={{ color }} />
                        <h4 className="text-lg font-black text-white">Emotional Frequency</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(emotional_resonance).map(([emotion, value]) => (
                            <div 
                                key={emotion} 
                                className="rounded-lg p-3 border"
                                style={{
                                    backgroundColor: `${color}05`,
                                    borderColor: `${color}30`
                                }}
                            >
                                <p className="text-xs text-gray-400 capitalize mb-1">{emotion}</p>
                                <p className="text-lg font-black text-white">{(value * 100).toFixed(0)}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}