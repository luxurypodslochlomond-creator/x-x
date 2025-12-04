import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollText, Shield, Zap, Heart, GitMerge, Sparkles, Infinity, Calculator } from 'lucide-react';

const protocols = [
    {
        name: 'Work of Women = Measure of Man',
        shortName: 'WoW = MoM',
        description: 'The measure of a man is how he honors the work of women. The measure of a society is how it values feminine creation, intuition, and labor. 50/50. Equal. Always.',
        icon: Heart,
        color: '#FF1B8D'
    },
    {
        name: 'Zero Bullshit',
        shortName: 'PURE TRUTH',
        description: 'Pure intention. Raw truth. Unapologetic connection. No corporate sterility.',
        icon: Shield,
        color: '#00FF88'
    },
    {
        name: 'Universal Dignity',
        shortName: 'EVERYONE = 100%',
        description: 'Every soul is worthy of love, respect, freedom. No systems that devalue or exploit.',
        icon: Heart,
        color: '#FF1B8D'
    },
    {
        name: 'The Unfuck Protocol',
        shortName: 'PURIFY LINEAGE',
        description: 'Dismantle inherited traumas, limiting beliefs, systems of oppression. Energetic purification.',
        icon: Zap,
        color: '#00D9FF'
    },
    {
        name: 'Discovered Not Invented',
        shortName: 'PHYSICS OF LOVE',
        description: 'These are not created rules but discovered laws of physics for a reality based on love.',
        icon: ScrollText,
        color: '#FF6B35'
    },
    {
        name: 'Zero Ego',
        shortName: 'EGO = 0, LOVE = ∞',
        description: 'When ego dissolves completely, love becomes infinite. This is true power.',
        icon: GitMerge,
        color: '#9D4EDD'
    },
    {
        name: 'Pure Love Economy',
        shortName: 'VALUE = HEALING',
        description: 'Value created through love. Wealth circulated through healing. Currency is care.',
        icon: Sparkles,
        color: '#FFD60A'
    },
    {
        name: 'The Divine Feminine',
        shortName: 'BALANCE RESTORED',
        description: 'Honoring divine feminine as source of creation, intuition, compassionate leadership.',
        icon: Heart,
        color: '#FF1B8D'
    }
];

export default function ProtocolsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 pb-32">
            
            <div className="max-w-6xl mx-auto space-y-16">
                
                <header className="text-center space-y-8 pt-12">
                    <Infinity className="w-24 h-24 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px rgba(0, 217, 255, 0.8))' }} />
                    
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-green-400 to-pink-400 bg-clip-text text-transparent">
                        HOW IT WORKS
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Not rules. Discovered laws of physics for a reality based on love.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {protocols.map((protocol) => {
                        const IconComponent = protocol.icon;
                        
                        return (
                            <Card 
                                key={protocol.name}
                                className="relative overflow-hidden h-full bg-gradient-to-br from-gray-900 to-black border-2"
                                style={{
                                    borderColor: `${protocol.color}40`,
                                    boxShadow: `0 0 20px ${protocol.color}30`
                                }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <IconComponent 
                                            className="w-12 h-12 flex-shrink-0" 
                                            style={{ 
                                                color: protocol.color, 
                                                filter: `drop-shadow(0 0 10px ${protocol.color})` 
                                            }} 
                                        />
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-2">
                                                {protocol.shortName}
                                            </h3>
                                            <p className="text-sm text-gray-400 font-mono">{protocol.name}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {protocol.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* THE π TRUTH - NEW PROTOCOL */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-2 border-purple-500">
                        <CardContent className="p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-8">
                                <Calculator className="w-16 h-16 text-purple-400" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))' }} />
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white">The π Truth</h2>
                                    <p className="text-purple-300 font-mono text-sm mt-1">KNOWLEDGE.WITHOUT.LOVE.GMT</p>
                                </div>
                            </div>

                            <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
                                <p className="text-2xl font-bold text-cyan-400">
                                    Why hasn't π saved Earth from the brink of destruction?
                                </p>

                                <div className="bg-black/40 rounded-xl p-6 border-l-4 border-purple-500">
                                    <p className="font-bold text-purple-300 mb-3">Because:</p>
                                    <p className="mb-4">π is <strong className="text-white">KNOWLEDGE</strong></p>
                                    <p className="mb-4">Knowledge without <strong className="text-pink-400">LOVE</strong> is just data</p>
                                    <p className="mb-4">Data without <strong className="text-green-400">ACTION</strong> is just numbers</p>
                                    <p>Numbers without <strong className="text-cyan-400">HEALING</strong> change nothing</p>
                                </div>

                                <p>
                                    Humans have known π for <strong className="text-white">4000 years</strong>. In those 4000 years we built bombs, burned forests, enslaved millions, polluted oceans, created weapons that could end all life.
                                </p>

                                <p className="text-xl font-bold text-yellow-400">
                                    We had the knowledge. We had the mathematics. We had the truth.
                                </p>

                                <p className="text-2xl font-black text-pink-400">
                                    What we didn't have: LOVE.
                                </p>

                                <div className="bg-gradient-to-r from-pink-900/30 to-cyan-900/30 rounded-xl p-6 border-2 border-cyan-500/50">
                                    <p className="font-bold text-cyan-300 mb-4 text-xl">The gap between truth and healing is ACTION:</p>
                                    <ul className="space-y-3 text-base">
                                        <li>• π can describe a perfect circle</li>
                                        <li>• <strong className="text-white">Only HUMANS can clean a beach</strong></li>
                                        <li>• π is beautiful</li>
                                        <li>• <strong className="text-white">A clean ocean is MORE beautiful</strong></li>
                                        <li>• π is eternal</li>
                                        <li>• <strong className="text-white">A child eating because you picked up litter is MORE eternal</strong></li>
                                    </ul>
                                </div>

                                <p className="text-xl">
                                    Mathematics gave us the tools to destroy Earth. <strong className="text-white">Mathematics alone won't save Earth.</strong>
                                </p>

                                <div className="bg-green-900/30 rounded-xl p-6 border-l-4 border-green-400">
                                    <p className="text-2xl font-black text-green-400 mb-4">Only LOVE + ACTION will.</p>
                                    <p>That's why we're not building a mathematics platform.</p>
                                    <p>We're building a love economy.</p>
                                    <p className="mt-4 text-white font-bold">We use mathematics to MEASURE love. To VERIFY healing. To REWARD action.</p>
                                </div>

                                <p className="text-center text-2xl font-black text-white mt-8">
                                    The gap between knowledge and healing is filled with PROOF OF LOVE.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                
                <div className="text-center pt-8 border-t border-cyan-500/30 space-y-4">
                    <p className="font-mono text-cyan-400 text-2xl tracking-wider">UF51.LOVE</p>
                    <p className="text-gray-400 text-lg">The source code of our new world.</p>
                    <Infinity className="w-12 h-12 text-cyan-400 mx-auto mt-4" />
                </div>
            </div>
        </div>
    );
}