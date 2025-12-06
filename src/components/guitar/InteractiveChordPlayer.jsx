import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * INTERACTIVE CHORD PLAYER
 * Tap a chord, hear the actual frequencies
 * Learning through SOUND, not just symbols
 */

// Note frequencies in Hz (standard tuning E A D G B E)
const NOTE_FREQUENCIES = {
    // Open strings
    'E2': 82.41,   // 6th string (low E)
    'A2': 110.00,  // 5th string
    'D3': 146.83,  // 4th string
    'G3': 196.00,  // 3rd string
    'B3': 246.94,  // 2nd string
    'E4': 329.63,  // 1st string (high E)
    
    // Fretted notes we need
    'F2': 87.31,
    'Gb2': 92.50,
    'G2': 98.00,
    'Ab2': 103.83,
    'Bb2': 116.54,
    'B2': 123.47,
    'C3': 130.81,
    'Db3': 138.59,
    'Eb3': 155.56,
    'E3': 164.81,
    'F3': 174.61,
    'Gb3': 185.00,
    'Ab3': 207.65,
    'A3': 220.00,
    'Bb3': 233.08,
    'C4': 261.63,
    'Db4': 277.18,
    'D4': 293.66,
    'Eb4': 311.13,
    'F4': 349.23,
    'Gb4': 369.99,
};

// Chord to notes mapping [6th, 5th, 4th, 3rd, 2nd, 1st string] - Low to High
const CHORD_NOTES = {
    'G': ['G2', 'B2', 'D3', 'G3', 'B3', 'G3'],           // G major open
    'C': [null, 'C3', 'E3', 'G3', 'C4', 'E4'],          // C major
    'D': [null, null, 'D3', 'A3', 'D4', 'Gb4'],         // D major
    'Em': ['E2', 'B2', 'E3', 'G3', 'B3', 'E4'],         // E minor
    'Am': [null, 'A2', 'E3', 'A3', 'C4', 'E4'],         // A minor
    'E': ['E2', 'B2', 'E3', 'Ab3', 'B3', 'E4'],         // E major
    'A': [null, 'A2', 'E3', 'A3', 'Db4', 'E4'],         // A major
    'F': ['F2', 'C3', 'F3', 'A3', 'C4', 'F4'],          // F major barre
    'Em7': ['E2', 'B2', 'E3', 'G3', 'B3', 'E4'],        // E minor 7
    'Dsus4': [null, null, 'D3', 'A3', 'D4', 'G3'],      // D sus4
    'A7sus4': [null, 'A2', 'E3', 'G3', 'D4', 'E4'],     // A7sus4
    'Cadd9': [null, 'C3', 'E3', 'G3', 'D4', 'E4'],      // C add9
    'B7': [null, 'B2', 'Gb3', 'Ab3', 'B3', 'Eb4'],      // B7
    'Gm': ['G2', 'D3', 'G3', 'Bb3', 'D4', 'G3'],        // G minor
    'Bb': [null, 'Bb2', 'F3', 'Bb3', 'D4', 'F4'],       // Bb major
    'Dm': [null, null, 'D3', 'A3', 'D4', 'F4'],         // D minor
};

export default function InteractiveChordPlayer({ chordName, size = 'normal' }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);

    const playChord = () => {
        if (isPlaying) return;

        const chordNotes = CHORD_NOTES[chordName];
        if (!chordNotes) return;

        setIsPlaying(true);

        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const now = ctx.currentTime;
        const duration = 2.0; // Play for 2 seconds

        // Play each string
        chordNotes.forEach((noteName, stringIndex) => {
            if (!noteName) return; // Muted string

            const frequency = NOTE_FREQUENCIES[noteName];
            if (!frequency) return;

            // Create oscillator for this note
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine'; // Guitar-like tone

            // Stagger the strings slightly (like strumming)
            const startTime = now + (stringIndex * 0.05);
            
            // Envelope: quick attack, sustained, fade out
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });

        // Reset playing state after chord finishes
        setTimeout(() => {
            setIsPlaying(false);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        }, duration * 1000);
    };

    const sizeClasses = {
        small: 'p-3',
        normal: 'p-4',
        large: 'p-6'
    };

    return (
        <motion.button
            onClick={playChord}
            disabled={isPlaying}
            className={`bg-black border-4 ${isPlaying ? 'border-green-500' : 'border-amber-500 hover:border-green-500'} 
                ${sizeClasses[size]} transition-all relative group w-full`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={isPlaying ? { boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)' } : {}}
        >
            <div className="text-center space-y-1">
                <p className={`${size === 'small' ? 'text-xl' : 'text-2xl'} font-black font-mono text-amber-400`} 
                   style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.8)' }}>
                    {chordName}
                </p>
                <div className="flex items-center justify-center gap-1">
                    {isPlaying ? (
                        <>
                            <Volume2 className="w-4 h-4 text-green-400 animate-pulse" />
                            <span className="text-xs text-green-400 font-black font-mono">PLAYING</span>
                        </>
                    ) : (
                        <span className="text-xs text-gray-500 font-black font-mono">TAP</span>
                    )}
                </div>
            </div>
            
            {/* Tooltip - desktop only */}
            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black border-2 border-cyan-500 
                text-xs text-cyan-300 font-black font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                HEAR {chordName} ✨
            </div>
        </motion.button>
    );
}