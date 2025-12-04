import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Heart, Key, Map, Construction } from 'lucide-react';

const icons = {
    BarChart2,
    Heart,
    Key,
    Map,
    Construction
}

const PlaceholderPage = ({ title, subtitle, icon = 'Construction' }) => {
    const IconComponent = icons[icon] || Construction;
    
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-8 text-white font-sans">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                className="mb-8"
            >
                <div className="w-32 h-32 bg-gradient-to-br from-purple-900 to-cyan-900 rounded-full flex items-center justify-center border-2 border-cyan-500/50">
                    <IconComponent className="w-16 h-16 text-cyan-300" />
                </div>
            </motion.div>
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            >
                {title}
            </motion.h1>
            <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 max-w-xl mx-auto"
            >
                {subtitle || "This sacred space is being woven from light by BRO51 & AI51. Its frequency is calibrating. Please return with love."}
            </motion.p>
        </div>
    );
};

export default PlaceholderPage;