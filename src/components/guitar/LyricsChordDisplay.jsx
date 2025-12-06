import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LYRICS + CHORDS DISPLAY
 * See chords above lyrics - karaoke style
 */

export default function LyricsChordDisplay({ song }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!song.lyrics) return null;

    return (
        <div className="bg-black border-4 border-pink-500">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-pink-900/20 transition-all"
            >
                <div className="flex items-center gap-3">
                    <Music className="w-6 h-6 text-pink-400" />
                    <span className="font-black font-mono text-pink-300 text-lg">LYRICS + CHORDS</span>
                </div>
                {isExpanded ? <ChevronUp className="w-6 h-6 text-pink-400" /> : <ChevronDown className="w-6 h-6 text-pink-400" />}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 border-t-4 border-pink-500 bg-black/60 space-y-6">
                            {song.lyrics.map((section, idx) => (
                                <div key={idx} className="space-y-3">
                                    {section.label && (
                                        <p className="text-sm font-black font-mono text-cyan-400 uppercase">
                                            [{section.label}]
                                        </p>
                                    )}
                                    {section.lines.map((line, lineIdx) => (
                                        <div key={lineIdx} className="space-y-1">
                                            {/* Chords line */}
                                            {line.chords && (
                                                <div className="font-mono text-amber-400 font-black text-sm md:text-base whitespace-pre">
                                                    {line.chords}
                                                </div>
                                            )}
                                            {/* Lyrics line */}
                                            <div className="text-white font-bold text-base md:text-lg">
                                                {line.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}