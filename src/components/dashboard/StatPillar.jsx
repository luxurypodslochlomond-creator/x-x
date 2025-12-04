import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function StatPillar({ icon: Icon, title, value, color }) {
    const colors = {
        green: 'from-green-800/80 to-teal-900/80 border-green-400/50',
        blue: 'from-blue-800/80 to-indigo-900/80 border-blue-400/50',
        red: 'from-red-800/80 to-pink-900/80 border-red-400/50',
        yellow: 'from-yellow-800/80 to-orange-900/80 border-yellow-400/50'
    };
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="h-full"
        >
            <Card className={`bg-gradient-to-b ${colors[color]} text-white border rounded-2xl shadow-2xl h-full flex flex-col justify-between p-4 backdrop-blur-sm`}>
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <h3 className="font-bold text-lg text-gray-200">{title}</h3>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-black text-white">{value}</p>
                </div>
            </Card>
        </motion.div>
    );
}