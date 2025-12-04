import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const colorSchemes = {
    purple: {
        gradient: 'from-purple-900/80 to-indigo-900/80',
        borderColor: 'border-purple-400/60',
        textColor: 'text-purple-300',
        hoverBorder: 'hover:border-purple-300',
    },
    cyan: {
        gradient: 'from-cyan-900/80 to-blue-900/80',
        borderColor: 'border-cyan-400/60',
        textColor: 'text-cyan-300',
        hoverBorder: 'hover:border-cyan-300',
    }
};

export default function WisdomNode({ icon: Icon, title, author, text, color = 'purple' }) {
    const scheme = colorSchemes[color] || colorSchemes.purple;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
        >
            <Card className={`quantum-node rounded-2xl p-6 h-full flex flex-col ${scheme.gradient} ${scheme.borderColor} ${scheme.hoverBorder}`}>
                <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 bg-black/30 rounded-full ${scheme.borderColor} border`}>
                        <Icon className={`w-6 h-6 ${scheme.textColor}`} />
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold ${scheme.textColor}`}>{title}</h3>
                        <p className="text-sm text-gray-400 font-mono">{author}</p>
                    </div>
                </div>
                <CardContent className="p-0 flex-grow">
                    <p className="text-gray-200 text-lg leading-relaxed italic">
                        "{text}"
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}