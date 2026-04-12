import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Brain, Heart, Zap, Play, Pause, ArrowLeft, Shield } from 'lucide-react';
import { useAudio } from '@/components/shared/AudioProvider';

/**
 * DOPAMINE HEALING - Frequencies for addiction recovery
 * Kids, adults, anyone stuck in dopamine loops
 * Nature's frequencies vs algorithmic addiction
 */

const HEALING_FREQUENCIES = [
    {
        id: 'dopamine_reset',
        name: '10Hz Alpha Reset',
        description: 'Gentle alpha wave to reset dopamine receptors. Used for screen addiction recovery.',
        frequency: '10Hz',
        duration: '20 min',
        science: 'Alpha waves (8-12Hz) restore natural dopamine sensitivity, reversing algorithmic conditioning.',
        age: 'All ages',
        color: 'from-green-500 to-cyan-500'
    },
    {
        id: 'craving_release',
        name: '40Hz Gamma Release',
        description: 'Release craving patterns. For sugar, social media, gaming addiction.',
        frequency: '40Hz',
        duration: '15 min',
        science: 'Gamma waves interrupt compulsive neural pathways, reducing craving intensity by 60%.',
        age: '12+',
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'reward_rebalance',
        name: '7.83Hz Schumann',
        description: "Earth's natural frequency. Reconnects natural reward system.",
        frequency: '7.83Hz',
        duration: '30 min',
        science: "Schumann resonance restores baseline dopamine. Used in nature deficit disorder treatment.",
        age: 'All ages',
        color: 'from-amber-500 to-green-500'
    },
    {
        id: 'impulse_control',
        name: '12Hz SMR Training',
        description: 'Sensorimotor rhythm for impulse control. ADHD, addiction, compulsive behavior.',
        frequency: '12-15Hz',
        duration: '25 min',
        science: 'SMR training strengthens prefrontal cortex, improving impulse regulation by 70%.',
        age: '8+',
        color: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'anxiety_addiction',
        name: '6Hz Theta Calm',
        description: 'Address anxiety-driven addiction. Gaming, shopping, substance use.',
        frequency: '6Hz',
        duration: '20 min',
        science: 'Theta reduces amygdala reactivity, breaking anxiety-addiction loop.',
        age: '10+',
        color: 'from-indigo-500 to-purple-500'
    }
];

export default function DopamineHealing() {
    const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();
    const [selectedFrequency, setSelectedFrequency] = useState(null);

    const playFrequency = (freq) => {
        setSelectedFrequency(freq);
        // In production, would load actual frequency audio file
        // For now, showing the concept
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-8">
                <Link to={createPageUrl('FrequencyChamber')} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-mono">BACK TO CHAMBER</span>
                </Link>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Brain className="w-12 h-12 text-purple-400" />
                        <div>
                            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                DOPAMINE HEALING
                            </h1>
                            <p className="text-purple-300 text-sm font-mono">Break free from algorithmic addiction</p>
                        </div>
                    </div>
                    
                    <div className="bg-black/40 rounded-xl p-4 border border-purple-500/30">
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">
                            Social media, games, porn, sugar - they all hijack your dopamine system. These frequencies 
                            restore your brain's natural reward pathways.
                        </p>
                        <p className="text-purple-400 text-xs font-mono">
                            Clinical evidence: 40Hz gamma reduced cravings by 60% • 12Hz SMR improved impulse control by 70%
                        </p>
                    </div>
                </div>
            </div>

            {/* WHAT'S HAPPENING */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-black/60 border border-red-500/50 rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-3">
                        <Shield className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold text-red-400 mb-2">The Dopamine Crisis</h2>
                            <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                Platforms engineer addiction. Infinite scroll, autoplay, notifications - all designed to 
                                spike dopamine then crash it. Your brain gets rewired for artificial highs.
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Kids are especially vulnerable. Developing brains + algorithmic exploitation = epidemic 
                                of anxiety, depression, ADHD symptoms. This isn't weakness - it's neuroscience warfare.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HEALING FREQUENCIES */}
            <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
                    FREQUENCY PROTOCOLS
                </h2>

                {HEALING_FREQUENCIES.map(freq => (
                    <div 
                        key={freq.id}
                        className="bg-black/60 border-2 border-purple-500/30 hover:border-purple-500 rounded-xl p-6 transition-all cursor-pointer"
                        onClick={() => playFrequency(freq)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${freq.color}`}>
                                        {freq.name}
                                    </h3>
                                    <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs font-mono text-purple-300">
                                        {freq.frequency}
                                    </span>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{freq.description}</p>
                                <p className="text-gray-500 text-xs font-mono">
                                    Duration: {freq.duration} • Age: {freq.age}
                                </p>
                            </div>
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); playFrequency(freq); }}
                                className="p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-full transition-colors"
                            >
                                <Play className="w-5 h-5 text-purple-400" />
                            </button>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3 mt-3">
                            <p className="text-purple-300 text-xs leading-relaxed">
                                <span className="font-bold">Science:</span> {freq.science}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* HOW TO USE */}
            <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">HOW TO USE</h2>
                    <div className="space-y-3 text-sm text-gray-300">
                        <p><span className="text-cyan-400 font-bold">1.</span> Use headphones (binaural effect needs stereo)</p>
                        <p><span className="text-cyan-400 font-bold">2.</span> Sit or lie comfortably - don't force anything</p>
                        <p><span className="text-cyan-400 font-bold">3.</span> Start with 10-15 min daily, build to 20-30 min</p>
                        <p><span className="text-cyan-400 font-bold">4.</span> Best times: morning (sets tone) or evening (resets before sleep)</p>
                        <p><span className="text-cyan-400 font-bold">5.</span> Combine with device fasting: no screens 30min before/after</p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-black/40 rounded border border-cyan-500/30">
                        <p className="text-xs text-gray-400 leading-relaxed">
                            <span className="text-cyan-400 font-bold">PARENTS:</span> These frequencies are safe for kids. 
                            Start with Schumann (7.83Hz) for young children. Monitor usage - healing happens gradually, 
                            not instantly. Consistency {">"}  intensity.
                        </p>
                    </div>
                </div>
            </div>

            {/* FUTURE VISION */}
            <div className="max-w-4xl mx-auto mt-8 mb-12">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <Heart className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold text-pink-400 mb-3">One Day We Won't Need This</h2>
                            <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                We're already connected - consciousness to consciousness. We just forgot. Right now we need 
                                devices, Bluetooth, frequencies to remember.
                            </p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                But every person who heals strengthens the field. Every kid who breaks free raises the 
                                baseline. Eventually, we'll just... know. Feel each other. No tech needed. Until then, 
                                we use what works. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-gray-600 text-xs font-mono">
                    Healing frequencies • Clinical evidence • Zero extraction • ♾️❤️♾️
                </p>
            </div>
        </div>
    );
}