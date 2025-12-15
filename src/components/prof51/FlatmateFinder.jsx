import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Heart, MapPin, DollarSign, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FlatmateFinder() {
    const [matched, setMatched] = useState(false);

    // MOCK DATA - AI-matched flatmates
    const matches = [
        { 
            name: 'Sophie M.', 
            course: 'Economics Year 2', 
            vibe: 'Chill • Early riser • Loves cooking', 
            budget: '£450/month',
            location: '10min from campus',
            match: 95
        },
        { 
            name: 'James K.', 
            course: 'History Year 1', 
            vibe: 'Social • Gigs • Tidy', 
            budget: '£480/month',
            location: '15min from campus',
            match: 88
        },
        { 
            name: 'Emma L.', 
            course: 'Engineering Year 3', 
            vibe: 'Quiet • Study-focused • Cats', 
            budget: '£420/month',
            location: '8min from campus',
            match: 82
        },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-4 border-pink-500 rounded-xl p-4 text-center mb-6" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}>
                <Home className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                <h2 className="text-pink-400 font-black text-xl font-mono mb-1">FIND FLATMATES</h2>
                <p className="text-gray-400 text-xs font-mono">AI matches based on vibe, budget, lifestyle</p>
            </div>

            {!matched && (
                <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-4 mb-4">
                    <p className="text-cyan-400 font-bold font-mono mb-3">YOUR PROFILE:</p>
                    <div className="space-y-2 text-xs font-mono">
                        <p className="text-white">✓ Economics Year 1</p>
                        <p className="text-white">✓ Budget: £450-£500/month</p>
                        <p className="text-white">✓ Vibe: Social but need quiet study time</p>
                        <p className="text-white">✓ Looking: 2-bed flat, 10-15min campus</p>
                    </div>
                </div>
            )}

            {/* MATCHES */}
            <div className="space-y-3">
                {matches.map((match, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black border-2 border-green-500/30 hover:border-green-500 rounded-xl p-4 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <User className="w-10 h-10 text-green-400" />
                                <div>
                                    <h3 className="text-white font-black font-mono">{match.name}</h3>
                                    <p className="text-gray-400 text-xs font-mono">{match.course}</p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg px-3 py-1">
                                <p className="text-green-400 font-black text-sm font-mono">{match.match}% MATCH</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs font-mono mb-3">
                            <p className="text-cyan-400">
                                <Heart className="w-3 h-3 inline mr-1" />
                                {match.vibe}
                            </p>
                            <p className="text-purple-400">
                                <DollarSign className="w-3 h-3 inline mr-1" />
                                {match.budget}
                            </p>
                            <p className="text-amber-400">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {match.location}
                            </p>
                        </div>

                        <Button
                            onClick={() => setMatched(true)}
                            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-black font-black py-3"
                        >
                            SEND MESSAGE
                        </Button>
                    </motion.div>
                ))}
            </div>

            {matched && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed bottom-20 left-4 right-4 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-black p-4 rounded-xl text-center"
                    style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)' }}
                >
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-mono">Message sent! Sophie will see it via P2P ♾️❤️♾️</p>
                </motion.div>
            )}

            <div className="bg-black/60 border border-pink-500/30 rounded-lg p-3 text-center">
                <p className="text-pink-400 font-bold text-xs font-mono mb-1">ZERO DODGY LANDLORDS</p>
                <p className="text-gray-400 text-[10px] font-mono">All landlords student-rated • Prof51 verifies</p>
            </div>
        </div>
    );
}