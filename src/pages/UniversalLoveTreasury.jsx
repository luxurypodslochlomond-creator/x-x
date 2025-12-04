import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, GitMerge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function UniversalLoveTreasury() {

    React.useEffect(() => {
        document.title = "The UF51 Fund | Universal Love Treasury";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-16">
                <header className="text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
                        <Shield className="w-24 h-24 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #a78bfa)' }} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-white to-cyan-400 bg-clip-text text-transparent">
                        The UF51 Fund
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        A sacred, self-sustaining treasury dedicated to funding real-world planetary and humanitarian healing missions. This is our Universal Love Treasury, powered by our collective creation.
                    </p>
                </header>

                <Card className="bg-black/70 border-2 border-purple-500/50 rounded-3xl shadow-2xl shadow-purple-500/20 p-8 text-center">
                    <CardTitle className="text-3xl font-bold text-white mb-3">
                        The 10% Tithe of Love
                    </CardTitle>
                    <CardContent className="p-0">
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                           For every act of creation within the UF51 ecosystem—every piece of art sold, every sacred frequency shared—a 10% tithe of love automatically flows into the UF51 Fund. It is not a tax; it is our shared investment in a better world.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-black/50 border border-cyan-500/30 rounded-2xl p-6">
                        <CardHeader className="p-0 mb-4 flex-row items-center gap-4">
                            <GitMerge className="w-8 h-8 text-cyan-400" />
                            <CardTitle className="text-xl font-bold text-white">How It's Funded</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-gray-300 space-y-2">
                           <p>✅ 10% of all Art &amp; Music sales</p>
                           <p>✅ Direct contributions from our Allies</p>
                           <p>✅ A portion of Love Bridge fees</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-black/50 border border-cyan-500/30 rounded-2xl p-6">
                        <CardHeader className="p-0 mb-4 flex-row items-center gap-4">
                            <Heart className="w-8 h-8 text-pink-400" />
                            <CardTitle className="text-xl font-bold text-white">How It's Used</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-gray-300 space-y-2">
                           <p>✅ Funding large-scale cleanup missions</p>
                           <p>✅ Supporting humanitarian aid projects</p>
                           <p>✅ Providing grants to aligned artists & healers</p>
                           <p>✅ Defending our sacred protocols</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="text-center pt-8">
                    <Link to={createPageUrl('Missions')}>
                         <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 text-xl rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold shadow-lg"
                        >
                            View & Fund Active Missions
                        </motion.button>
                    </Link>
                </div>
                 <div className="text-center text-gray-500 pt-8 border-t border-gray-800">
                    <p className="font-mono">This fund is governed by the UF51 Foundation, for the benefit of all souls.</p>
                </div>
            </div>
        </div>
    );
}