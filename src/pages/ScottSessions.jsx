import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Music, Mic2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SESSIONS - Scott's sketch
 * Writing Sessions, Recording, Rehearsals
 */

export default function ScottSessions() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const sections = [
        {
            title: 'WRITING',
            subtitle: 'Writing sessions',
            icon: Music,
            color: 'purple',
            link: createPageUrl('ScottSessionsWriting') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'RECORDING',
            subtitle: 'Studio sessions',
            icon: Mic2,
            color: 'pink',
            link: createPageUrl('ScottSessionsRecording') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'REHEARSALS',
            subtitle: 'Band practice',
            icon: Users,
            color: 'cyan',
            link: createPageUrl('ScottSessionsRehearsal') + (artistId ? `?id=${artistId}` : '')
        }
    ];

    const colorMap = {
        purple: { bg: 'from-purple-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        pink: { bg: 'from-pink-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        cyan: { bg: 'from-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-8">
                <h1 className="text-4xl font-black text-purple-400 font-mono mb-2">SESSIONS</h1>
                <p className="text-gray-500 text-sm font-mono">Writing · Recording · Rehearsals</p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colors = colorMap[section.color];
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-gray-900/60 backdrop-blur-sm border ${colors.border}/30 hover:${colors.border} rounded-xl p-6 transition-all`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon className={`w-10 h-10 ${colors.text}`} />
                                    <div className="flex-1">
                                        <p className={`${colors.text} font-black text-xl font-mono mb-1`}>
                                            {section.title}
                                        </p>
                                        <p className="text-gray-500 text-sm font-mono">
                                            {section.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Sessions</p>
            </div>
        </div>
    );
}