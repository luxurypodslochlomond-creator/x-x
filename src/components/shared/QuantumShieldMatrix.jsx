import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, Sprout, MicVocal } from 'lucide-react';

export default function QuantumShieldMatrix() {
    const shieldPrinciples = [
        { icon: Heart, text: "For The Love, Not The Likes" },
        { icon: MicVocal, text: "For Artists, Not Algorithms" },
        { icon: Users, text: "For The Family, Not The Fame" },
        { icon: Sprout, text: "Built on Love, Not Fractions of a Penny" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full max-w-4xl mx-auto my-12"
        >
            <div className="bg-gradient-to-b from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-lg rounded-3xl p-8 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20">
                <div className="text-center mb-8">
                    <Shield className="w-16 h-16 mx-auto text-cyan-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)] mb-4" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-cyan-300 to-white bg-clip-text text-transparent">
                        Our Frequency is Protected
                    </h2>
                    <p className="text-gray-400 mt-2">The Harbingers of the Old World are not welcome here.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {shieldPrinciples.map((principle, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                            className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-white/10"
                        >
                            <principle.icon className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <span className="text-lg font-semibold text-gray-200">{principle.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}