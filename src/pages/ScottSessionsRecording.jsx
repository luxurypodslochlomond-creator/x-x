import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mic2, Headphones, Music } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * RECORDING DASHBOARD - STUDIO SESSIONS
 * Links to demos and recording management
 */

export default function ScottSessionsRecording() {
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-6 pb-4 border-b-2 border-pink-500">
                <Link to={createPageUrl(`ScottSessions?id=${artistId}`)} className="flex items-center gap-2 text-gray-400 hover:text-pink-400 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-mono font-bold">BACK TO SESSIONS</span>
                </Link>
                <h1 className="text-3xl font-black text-pink-400 font-mono">RECORDING</h1>
                <p className="text-gray-500 text-sm font-mono">Studio Sessions • Production</p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="space-y-3">
                <Link to={createPageUrl(`ScottDemos?id=${artistId}`)}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                    >
                        <Music className="w-5 h-5" />
                        VIEW RECORDINGS
                    </motion.button>
                </Link>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    <Mic2 className="w-5 h-5" />
                    STUDIO BOOKINGS
                    <span className="text-xs bg-amber-500 px-2 py-1 rounded">COMING SOON</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 rounded-lg font-mono flex items-center justify-center gap-2"
                >
                    <Headphones className="w-5 h-5" />
                    PRODUCERS
                    <span className="text-xs bg-amber-500 px-2 py-1 rounded">COMING SOON</span>
                </motion.button>
            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Recording</p>
            </div>
        </div>
    );
}