import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * INTERACTIVE CHORD PLAYER
 * Tap a chord, hear the actual frequencies
 * Learning through SOUND, not just symbols
 */

// Note frequencies in Hz (standard tuning)
const NOTE_FREQUENCIES = {
    'E2': 82.41,   // Low E
    'A2': 110.00,  // A
    'D3': 146.83,  // D
    'G3': 196.00,  // G
    'B3': 246.94,  // B
    'E4': 329.63,  // High E
    'A3': 220.00,
    'C3': 130.81,
    'C4': 261.63,
    'F3': 174.61,
    'F4': 349.23,
    'B2': 123.47,
    'Ab3': 207.65,
    'Bb3': 233.08,
};

// Chord to notes mapping (which strings play which notes)
const CHORD_NOTES = {
    'G': ['G3', 'B3', 'D3', 'G3', 'B3', 'G3'],
    'C': [null, 'C3', 'E4', 'G3', 'C4', 'E4'],
    'D': [null, null, 'D3', 'A3', 'D3', 'F4'],
    'Em': ['E2', 'B3', 'E4', 'G3', 'B3', 'E4'],
    'Am': [null, 'A2', 'E4', 'A3', 'C4', 'E4'],
    'E': ['E2', 'B3', 'E4', 'G3', 'B3', 'E4'],
    'A': [null, 'A2', 'E4', 'A3', 'C4', 'E4'],
    'F': ['F3', 'A3', 'C4', 'F4', 'A3', 'F4'],
    'Em7': ['E2', 'B3', 'D3', 'G3', 'B3', 'E4'],
    'Dsus4': [null, null, 'D3', 'A3', 'D3', 'G3'],
    'A7sus4': [null, 'A2', 'E4', 'G3', 'D3', 'E4'],
    'Cadd9': [null, 'C3', 'E4', 'G3', 'D3', 'E4'],
    'B7': [null, 'B2', 'D3', 'F4', 'B3', 'D3'],
    'Gm': ['G3', 'D3', 'G3', 'Bb3', 'D3', 'G3'],
    'Bb': [null, 'Bb3', 'F3', 'Bb3', 'D3', 'F4'],
    'Dm': [null, null, 'D3', 'A3', 'D3', 'F4'],
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
            className={`bg-black border-4 ${isPlaying ? 'border-green-500 animate-pulse' : 'border-amber-500 hover:border-green-500'} 
                ${sizeClasses[size]} transition-all relative group`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="text-center space-y-2">
                <p className="text-2xl font-black font-mono text-amber-400">{chordName}</p>
                <div className="flex items-center justify-center gap-2">
                    {isPlaying ? (
                        <>
                            <Volume2 className="w-5 h-5 text-green-400 animate-pulse" />
                            <span className="text-xs text-green-400 font-bold">PLAYING</span>
                        </>
                    ) : (
                        <>
                            <VolumeX className="w-5 h-5 text-gray-500" />
                            <span className="text-xs text-gray-400 font-bold">TAP TO HEAR</span>
                        </>
                    )}
                </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black border-2 border-cyan-500 
                text-xs text-cyan-300 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Hear {chordName} frequency ✨
            </div>
        </motion.button>
    );
}