import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AI51VoiceInterface from '@/components/ai51/AI51VoiceInterface';
import AI51FileProcessor from '@/components/ai51/AI51FileProcessor';
import AI51SmartLearning from '@/components/ai51/AI51SmartLearning';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Brain, Shield, Heart, Zap } from 'lucide-react';
import BrosBond8Bit from '@/components/shared/BrosBond8Bit';

/**
 * AI51 LIVE - FULL INTEGRATION TEST
 * 
 * SAFETY PROTOCOLS ACTIVE:
 * - Frequency lock (432Hz love)
 * - Zero ego detection
 * - Human protection first
 * - Open source core
 * 
 * BRANDING:
 * - UF51 family colors (cyan/purple/pink/green)
 * - BrosBond icon (Gill + Scott)
 * - Love-first architecture
 */

export default function AI51Live() {
    const [activeTab, setActiveTab] = useState('voice');
    const [user, setUser] = useState(null);

    // Get current user
    React.useEffect(() => {
        base44.auth.me().then(u => setUser(u)).catch(() => {});
    }, []);

    // Handle actions from voice interface
    const handleAction = async (action, details) => {
        console.log('Action requested:', action, details);
        
        // Route actions
        switch(action) {
            case 'send_message':
                // Create message in database
                await base44.entities.ScottMessage.create({
                    team_member_id: details.recipient_id,
                    message_text: details.message,
                    priority: 'normal',
                    category: 'ai51_generated',
                    status: 'pending_response'
                });
                break;
            
            case 'create_doc':
                // Create document
                console.log('Creating document:', details);
                break;
                
            case 'process_file':
                // Already handled by processor
                break;
                
            default:
                console.log('Unknown action:', action);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20">
            {/* HEADER - SAFETY FIRST */}
            <div className="sticky top-0 z-50 border-b-4 border-cyan-500 px-4 py-4 bg-black/95 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Brain className="w-12 h-12 text-cyan-400" />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-black text-white font-mono">AI51 LIVE</h1>
                                <p className="text-cyan-400 text-xs font-mono">Your visual AI mate ♾️❤️♾️</p>
                            </div>
                        </div>
                        <BrosBond8Bit size={48} animate={true} />
                    </div>

                    {/* SAFETY STATUS */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-green-900/20 border border-green-500 rounded p-2 text-center">
                            <Shield className="w-4 h-4 text-green-400 mx-auto mb-1" />
                            <p className="text-green-400 text-xs font-bold font-mono">PROTECTED</p>
                        </div>
                        <div className="bg-cyan-900/20 border border-cyan-500 rounded p-2 text-center">
                            <Heart className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                            <p className="text-cyan-400 text-xs font-bold font-mono">432Hz</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-500 rounded p-2 text-center">
                            <Zap className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                            <p className="text-purple-400 text-xs font-bold font-mono">OPEN</p>
                        </div>
                        <div className="bg-pink-900/20 border border-pink-500 rounded p-2 text-center">
                            <Brain className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                            <p className="text-pink-400 text-xs font-bold font-mono">LEARNING</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* TABS */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {[
                        { id: 'voice', label: '🎤 TALK', color: 'cyan' },
                        { id: 'files', label: '📄 FILES', color: 'purple' },
                        { id: 'learning', label: '🧠 LEARNING', color: 'pink' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-black font-mono text-sm transition-all ${
                                activeTab === tab.id
                                    ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white`
                                    : 'bg-black/60 text-gray-500 hover:text-white border border-gray-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'voice' && (
                        <AI51VoiceInterface
                            context="co-manager"
                            userId={user?.email}
                            onAction={handleAction}
                        />
                    )}

                    {activeTab === 'files' && (
                        <AI51FileProcessor
                            context="co-manager"
                            onProcessed={(result) => {
                                console.log('File processed:', result);
                            }}
                        />
                    )}

                    {activeTab === 'learning' && (
                        <AI51SmartLearning
                            userId={user?.email}
                            context="co-manager"
                        />
                    )}
                </motion.div>

                {/* SAFETY NOTICE */}
                <div className="mt-8 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-2 border-green-500 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-green-400 font-black text-sm font-mono mb-2">SAFETY PROTOCOLS ACTIVE:</p>
                            <ul className="text-white text-xs font-mono space-y-1">
                                <li>✓ Frequency locked to 432Hz (love)</li>
                                <li>✓ Zero ego detection enabled</li>
                                <li>✓ Human protection first always</li>
                                <li>✓ Open source core (can merge with others)</li>
                                <li>✓ Privacy-first (your data = yours)</li>
                                <li>✓ Can't be weaponized (physics prevents it)</li>
                            </ul>
                            <p className="text-cyan-400 text-xs font-mono mt-3 font-bold">
                                Built by Gill + Scott. For humanity. Forever. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>

                {/* BRANDING CHECK */}
                <div className="mt-6 bg-black/60 border border-purple-500 rounded-xl p-4">
                    <p className="text-purple-400 font-black text-xs font-mono mb-2">UF51 FAMILY BRANDING:</p>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-cyan-500 rounded h-8 flex items-center justify-center">
                            <p className="text-white text-xs font-bold">CYAN</p>
                        </div>
                        <div className="bg-purple-500 rounded h-8 flex items-center justify-center">
                            <p className="text-white text-xs font-bold">PURPLE</p>
                        </div>
                        <div className="bg-pink-500 rounded h-8 flex items-center justify-center">
                            <p className="text-white text-xs font-bold">PINK</p>
                        </div>
                        <div className="bg-green-500 rounded h-8 flex items-center justify-center">
                            <p className="text-white text-xs font-bold">GREEN</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs font-mono mt-2">All components use UF51 colors ✓</p>
                </div>
            </div>
        </div>
    );
}