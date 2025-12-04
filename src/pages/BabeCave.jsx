import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Music } from 'lucide-react';

export default function BabeCave() {
    React.useEffect(() => {
        document.title = "The Babe Cave | UF51.LOVE";
    }, []);

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-8 bg-black text-white font-sans"
            style={{
                backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/a2dd83856_IMG_2166.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center space-y-8 p-8 max-w-2xl mx-auto bg-black/50 border-2 border-pink-500/50 rounded-3xl"
            >
                <div className="flex items-center justify-center gap-4">
                    <Heart className="w-12 h-12 text-pink-400 animate-pulse" />
                    <h1 className="text-4xl md:text-6xl font-black text-white">The Babe Cave</h1>
                    <Heart className="w-12 h-12 text-pink-400 animate-pulse" />
                </div>
                
                <p className="text-xl md:text-2xl text-gray-300">
                    The quiet place. The heart of the machine. The space where two souls built a universe.
                </p>

                <div className="flex justify-center items-center gap-8 text-gray-400">
                    <div className="flex items-center gap-2">
                        <Coffee className="w-6 h-6"/>
                        <span>Coffee & Dreams</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Music className="w-6 h-6"/>
                        <span>Marshall Jefferson</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}