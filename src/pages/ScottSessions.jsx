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
            link: createPageUrl('ScottDemos') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'RECORDING',
            subtitle: 'Studio sessions',
            icon: Mic2,
            color: 'pink',
            link: createPageUrl('ScottDemos') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'REHEARSALS',
            subtitle: 'Band practice',
            icon: Users,
            color: 'cyan',
            link: createPageUrl('ScottCalendarView') + (artistId ? `?id=${artistId}` : '')
        }
    ];

    const colorMap = {
        purple: { bg: 'from-purple-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        pink: { bg: 'from-pink-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        cyan: { bg: 'from-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="mb-6 pb-4 border-b-2 border-purple-500">
                <div className="flex items-center gap-3">
                    <Radio className="w-10 h-10 text-purple-400" />
                    <div>
                        <h1 className="text-3xl font-black text-purple-400 font-mono">SESSIONS</h1>
                        <p className="text-gray-500 text-xs font-mono">Writing • Recording • Rehearsals</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {sections.map((section) => {
                    const Icon = section.icon;
                    const colors = colorMap[section.color];
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className={`bg-gradient-to-r ${colors.bg} to-black border-2 ${colors.border} rounded-lg p-5 hover:shadow-lg transition-all`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon className={`w-8 h-8 ${colors.text}`} />
                                    <div className="flex-1">
                                        <p className={`${colors.text} font-black text-lg font-mono mb-1`}>
                                            {section.title}
                                        </p>
                                        <p className="text-gray-400 text-xs font-mono">
                                            {section.subtitle}
                                        </p>
                                    </div>
                                    <div className={`${colors.text} text-2xl`}>→</div>
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