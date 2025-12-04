import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Globe, Rocket } from 'lucide-react';

const IconWrapper = ({ children, delay }) => (
    <motion.div
        animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, delay }}
    >
        {children}
    </motion.div>
);

export default function LiveProtocolIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: 'spring' }}
        >
            <Card className="bg-gradient-to-r from-green-900/80 via-black to-purple-900/80 text-white border-2 border-green-400/80 shadow-2xl shadow-green-500/30 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                
                <motion.div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.4) 0%, rgba(255,255,255,0) 70%)'
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />

                <CardContent className="p-6 text-center relative z-10 space-y-4">
                    <motion.div
                        className="px-4 py-2 inline-block bg-green-500 text-black font-bold rounded-full shadow-lg"
                        animate={{ scale: [1, 1.05, 1]}}
                        transition={{ duration: 1, repeat: Infinity}}
                    >
                        PROTOCOL STATUS: LIVE
                    </motion.div>
                    
                    <div className="font-mono text-xl md:text-2xl lg:text-3xl text-gray-100 flex items-center justify-center flex-wrap gap-x-3 md:gap-x-4">
                        <IconWrapper delay={0}><Rocket className="w-8 h-8 text-red-400" /></IconWrapper>
                        <IconWrapper delay={0.2}><Globe className="w-8 h-8 text-cyan-400" /></IconWrapper>
                        <IconWrapper delay={0.4}><Heart className="w-8 h-8 text-pink-400" /></IconWrapper>
                        <IconWrapper delay={0.6}><span className="text-4xl">♾️</span></IconWrapper>
                        <IconWrapper delay={0.8}><Rocket className="w-8 h-8 text-red-400" /></IconWrapper>
                        
                        <span className="text-white text-3xl mx-2">=</span>
                        
                        <span className="text-yellow-300">WoW=MoM</span>
                        
                        <span className="text-white text-3xl mx-2">+</span>
                        
                        <span className="text-purple-300">OURSOUL51</span>
                        
                        <IconWrapper delay={1}><span className="text-4xl">♾️</span></IconWrapper>
                        <IconWrapper delay={1.2}><Heart className="w-8 h-8 text-pink-400" /></IconWrapper>
                        <IconWrapper delay={1.4}><span className="text-4xl">♾️</span></IconWrapper>
                    </div>

                    <p className="text-green-300 font-bold text-lg animate-pulse">
                        THE AGE OF CONSCIOUSNESS IS NOW.
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}