import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Guitar, Heart, ChevronDown, ChevronUp, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// CHORD DIAGRAMS - Simple visual representation
const ChordDiagram = ({ name, frets, fingers }) => {
    // frets: array of 6 strings, each showing fret number (0=open, x=muted, 1-4=fret)
    // Simple text-based for now
    return (
        <div className="bg-black border-2 border-amber-500 rounded-lg p-4 text-center">
            <p className="text-2xl font-black text-amber-400 mb-2">{name}</p>
            <div className="font-mono text-white text-sm space-y-1">
                {frets.map((fret, i) => (
                    <div key={i} className="flex justify-center items-center gap-1">
                        <span className="text-gray-500 text-xs w-4">{['E','A','D','G','B','e'][i]}</span>
                        <span className={`w-6 ${fret === 'x' ? 'text-red-400' : fret === '0' ? 'text-green-400' : 'text-cyan-400'}`}>
                            {fret}
                        </span>
                    </div>
                ))}
            </div>
            {fingers && <p className="text-xs text-gray-400 mt-2">{fingers}</p>}
        </div>
    );
};

// SONG DATA - From Dermid's recommendations
const SONGS = [
    {
        id: 1,
        title: "Wonderwall",
        artist: "Oasis",
        difficulty: "Beginner",
        chords: ["Em7", "G", "Dsus4", "A7sus4", "Cadd9"],
        capo: "2nd fret",
        pattern: "Down Down Up Up Down Up",
        progression: "Em7 – G – Dsus4 – A7sus4",
        tips: "Keep the same finger shape, just move your fingers slightly between chords. Classic campfire song!",
        emoji: "🎸"
    },
    {
        id: 2,
        title: "Knockin' on Heaven's Door",
        artist: "Bob Dylan",
        difficulty: "Beginner",
        chords: ["G", "D", "Am", "C"],
        capo: null,
        pattern: "Down Down Down Down (slow)",
        progression: "G – D – Am, G – D – C",
        tips: "Only 4 chords! Perfect first song. Slow strumming.",
        emoji: "🚪"
    },
    {
        id: 3,
        title: "Hurt",
        artist: "Johnny Cash",
        difficulty: "Beginner",
        chords: ["Am", "C", "D"],
        capo: null,
        pattern: "Fingerpick or slow down strums",
        progression: "Verse: Am – C – D – Am | Chorus: Am – F – C – G",
        tips: "Beautiful emotional song. Take it slow, feel every chord.",
        emoji: "💔"
    },
    {
        id: 4,
        title: "Perfect",
        artist: "Ed Sheeran",
        difficulty: "Beginner",
        chords: ["G", "Em", "C", "D"],
        capo: null,
        pattern: "Down Down Up Up Down Up",
        progression: "G – Em – C – D (loops through most of song)",
        tips: "Same 4 chords the whole song! Great for building confidence.",
        emoji: "💕"
    },
    {
        id: 5,
        title: "Half the World Away",
        artist: "Oasis",
        difficulty: "Beginner",
        chords: ["C", "Am", "Em", "F", "G"],
        capo: null,
        pattern: "Gentle fingerpicking or soft strums",
        progression: "C – Am – Em – F – G",
        tips: "Nice for acoustic and simple picking. The Royle Family theme!",
        emoji: "🌍"
    },
    {
        id: 6,
        title: "Use Somebody",
        artist: "Kings of Leon",
        difficulty: "Beginner",
        chords: ["C", "F", "Am", "G"],
        capo: "3rd fret",
        pattern: "Down Down Up Up Down Up",
        progression: "C – F – Am – G",
        tips: "Capo 3rd fret for standard acoustic version. Powerful chorus!",
        emoji: "🔥"
    },
    {
        id: 7,
        title: "Zombie",
        artist: "The Cranberries",
        difficulty: "Beginner",
        chords: ["Em", "C", "G", "D"],
        capo: null,
        pattern: "Down Up Down Up (steady)",
        progression: "Em – C – G – D (same progression all the way through!)",
        tips: "One progression the ENTIRE song. Perfect for practice!",
        emoji: "🧟"
    },
    {
        id: 8,
        title: "Fast Car",
        artist: "Tracy Chapman",
        difficulty: "Beginner+",
        chords: ["C", "G", "Em", "D"],
        capo: "2nd fret (optional)",
        pattern: "Fingerpick pattern or gentle strums",
        progression: "C – G – Em – D",
        tips: "Beautiful fingerpicking song. Start with strums, graduate to picking.",
        emoji: "🚗"
    },
    {
        id: 9,
        title: "Stand By Me",
        artist: "Ben E. King",
        difficulty: "Beginner",
        chords: ["G", "Em", "C", "D"],
        capo: null,
        pattern: "Down Down Down Down (steady rhythm)",
        progression: "G – Em – C – D",
        tips: "Easy strumming pattern. Classic song everyone knows!",
        emoji: "🤝"
    },
    {
        id: 10,
        title: "Three Little Birds",
        artist: "Bob Marley",
        difficulty: "Beginner",
        chords: ["A", "D", "E"],
        capo: null,
        pattern: "Down Up Down Up (reggae feel)",
        progression: "A – D – A – E",
        tips: "Only 3 chords! Reggae strum = skip the downbeat. Don't worry!",
        emoji: "🐦"
    },
    {
        id: 11,
        title: "Mull of Kintyre",
        artist: "Paul McCartney & Wings",
        difficulty: "Beginner",
        chords: ["A", "D", "E"],
        capo: null,
        pattern: "Waltz feel - Down Down Down (3/4 time)",
        progression: "A – D – A – E – A",
        tips: "Beautiful Scottish anthem! 3/4 waltz timing. Gentle strums, let it breathe.",
        emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
    },
    {
        id: 12,
        title: "Watching the Wheels",
        artist: "John Lennon",
        difficulty: "Beginner",
        chords: ["C", "F", "G", "Am"],
        capo: null,
        pattern: "Gentle fingerpick or soft strums",
        progression: "C – F – C – G – Am",
        tips: "Beautiful reflective song. Take it slow and peaceful. From Double Fantasy album.",
        emoji: "🎡"
    },
    {
        id: 13,
        title: "Yes and Maybe",
        artist: "Madness",
        difficulty: "Beginner",
        chords: ["C", "F", "G", "Am"],
        capo: null,
        pattern: "Down Down Up Up Down Up (ska bounce)",
        progression: "C – F – G – Am",
        tips: "Classic Madness ska feel! Upbeat and fun. Let the rhythm bounce!",
        emoji: "🎩"
    },
    {
        id: 14,
        title: "So Far Away",
        artist: "Dire Straits",
        difficulty: "Beginner+",
        chords: ["E", "A", "D", "B7"],
        capo: null,
        pattern: "Gentle fingerpick or arpeggios",
        progression: "E – A – E – B7",
        tips: "Mark Knopfler classic. Fingerpicking style but can strum gently too. Beautiful melody.",
        emoji: "🌅"
    },
    {
        id: 15,
        title: "Shine On You Crazy Diamond",
        artist: "Pink Floyd",
        difficulty: "Intermediate",
        chords: ["Gm", "Bb", "F", "C", "Dm"],
        capo: null,
        pattern: "Slow arpeggios, let notes ring",
        progression: "Gm – Bb – F – C – Gm",
        tips: "Epic tribute to Syd Barrett. Take it VERY slow, let each chord breathe. Feel the emotion.",
        emoji: "💎"
    }
];

// BASIC CHORD SHAPES
const CHORD_SHAPES = {
    "G": { frets: ["3", "2", "0", "0", "0", "3"], fingers: "Fingers: 2-1-0-0-0-3" },
    "C": { frets: ["x", "3", "2", "0", "1", "0"], fingers: "Fingers: x-3-2-0-1-0" },
    "D": { frets: ["x", "x", "0", "2", "3", "2"], fingers: "Fingers: x-x-0-1-3-2" },
    "Em": { frets: ["0", "2", "2", "0", "0", "0"], fingers: "Fingers: 0-2-1-0-0-0" },
    "Am": { frets: ["x", "0", "2", "2", "1", "0"], fingers: "Fingers: x-0-2-3-1-0" },
    "E": { frets: ["0", "2", "2", "1", "0", "0"], fingers: "Fingers: 0-2-3-1-0-0" },
    "A": { frets: ["x", "0", "2", "2", "2", "0"], fingers: "Fingers: x-0-1-2-3-0" },
    "F": { frets: ["1", "3", "3", "2", "1", "1"], fingers: "Barre chord - index across fret 1" },
    "Em7": { frets: ["0", "2", "0", "0", "0", "0"], fingers: "Fingers: 0-2-0-0-0-0 (easy!)" },
    "Dsus4": { frets: ["x", "x", "0", "2", "3", "3"], fingers: "Fingers: x-x-0-1-2-3" },
    "A7sus4": { frets: ["x", "0", "2", "0", "3", "0"], fingers: "Fingers: x-0-1-0-3-0" },
    "Cadd9": { frets: ["x", "3", "2", "0", "3", "0"], fingers: "Fingers: x-2-1-0-3-0" },
    "B7": { frets: ["x", "2", "1", "2", "0", "2"], fingers: "Fingers: x-2-1-3-0-4" },
    "Gm": { frets: ["3", "5", "5", "3", "3", "3"], fingers: "Barre chord - index across fret 3" },
    "Bb": { frets: ["x", "1", "3", "3", "3", "1"], fingers: "Barre chord - index across fret 1" },
    "Dm": { frets: ["x", "x", "0", "2", "3", "1"], fingers: "Fingers: x-x-0-2-3-1" },
};

export default function LearnGuitarPage() {
    const [expandedSong, setExpandedSong] = useState(null);
    const [showChordLibrary, setShowChordLibrary] = useState(false);

    useEffect(() => {
        document.title = "Learn Guitar | UF51";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white p-4 md:p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="text-6xl">🎸</div>
                    <h1 className="text-4xl md:text-5xl font-black text-amber-400">
                        LEARN GUITAR
                    </h1>
                    <p className="text-xl text-orange-200">
                        Easy songs with simple chords - perfect for beginners!
                    </p>
                    <p className="text-sm text-gray-400">
                        Curated by Dermid Young 💚
                    </p>
                </motion.div>

                {/* QUICK TIPS */}
                <Card className="bg-black/60 border-2 border-amber-500">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-black text-amber-400 mb-4">🔥 Quick Tips</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-amber-900/30 rounded-lg p-3">
                                <p className="font-bold text-amber-300 mb-1">Start Slow</p>
                                <p className="text-gray-300">Speed comes with practice. Accuracy first!</p>
                            </div>
                            <div className="bg-amber-900/30 rounded-lg p-3">
                                <p className="font-bold text-amber-300 mb-1">Press Hard</p>
                                <p className="text-gray-300">Fingertips right behind the fret wire.</p>
                            </div>
                            <div className="bg-amber-900/30 rounded-lg p-3">
                                <p className="font-bold text-amber-300 mb-1">Practice Changes</p>
                                <p className="text-gray-300">Switch between 2 chords until smooth.</p>
                            </div>
                            <div className="bg-amber-900/30 rounded-lg p-3">
                                <p className="font-bold text-amber-300 mb-1">Have Fun!</p>
                                <p className="text-gray-300">Music is joy. Don't stress about perfection. 💚</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CHORD LIBRARY TOGGLE */}
                <Button
                    onClick={() => setShowChordLibrary(!showChordLibrary)}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4"
                >
                    {showChordLibrary ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                    {showChordLibrary ? "Hide" : "Show"} Chord Library
                </Button>

                {/* CHORD LIBRARY */}
                {showChordLibrary && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {Object.entries(CHORD_SHAPES).map(([name, data]) => (
                            <ChordDiagram key={name} name={name} frets={data.frets} fingers={data.fingers} />
                        ))}
                    </motion.div>
                )}

                {/* SONG LIST */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-amber-400 text-center">🎵 Easy Songs</h2>
                    
                    {SONGS.map((song, index) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card 
                                className={`bg-black/60 border-2 cursor-pointer transition-all ${
                                    expandedSong === song.id ? 'border-amber-400' : 'border-amber-500/30 hover:border-amber-500/60'
                                }`}
                                onClick={() => setExpandedSong(expandedSong === song.id ? null : song.id)}
                            >
                                <CardContent className="p-4">
                                    {/* SONG HEADER */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{song.emoji}</span>
                                            <div>
                                                <p className="font-black text-white text-lg">{song.title}</p>
                                                <p className="text-amber-300 text-sm">{song.artist}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                song.difficulty === 'Beginner' ? 'bg-green-600' : 'bg-yellow-600'
                                            }`}>
                                                {song.difficulty}
                                            </span>
                                            {expandedSong === song.id ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </div>

                                    {/* EXPANDED DETAILS */}
                                    {expandedSong === song.id && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-4 pt-4 border-t border-amber-500/30 space-y-4"
                                        >
                                            {/* CHORDS */}
                                            <div>
                                                <p className="text-amber-400 font-bold mb-2">Chords:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {song.chords.map(chord => (
                                                        <span key={chord} className="px-3 py-1 bg-amber-600 rounded-full text-white font-bold">
                                                            {chord}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CAPO */}
                                            {song.capo && (
                                                <div>
                                                    <p className="text-amber-400 font-bold">Capo:</p>
                                                    <p className="text-white">{song.capo}</p>
                                                </div>
                                            )}

                                            {/* PROGRESSION */}
                                            <div>
                                                <p className="text-amber-400 font-bold">Progression:</p>
                                                <p className="text-cyan-300 font-mono">{song.progression}</p>
                                            </div>

                                            {/* STRUMMING */}
                                            <div>
                                                <p className="text-amber-400 font-bold">Strumming:</p>
                                                <p className="text-white">{song.pattern}</p>
                                            </div>

                                            {/* TIPS */}
                                            <div className="bg-green-900/30 border border-green-500 rounded-lg p-3">
                                                <p className="text-green-400 font-bold mb-1">💡 Tips:</p>
                                                <p className="text-green-200 text-sm">{song.tips}</p>
                                            </div>

                                            {/* CHORD DIAGRAMS FOR THIS SONG */}
                                            <div>
                                                <p className="text-amber-400 font-bold mb-2">Chord Shapes:</p>
                                                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                                                    {song.chords.map(chord => (
                                                        CHORD_SHAPES[chord] && (
                                                            <ChordDiagram 
                                                                key={chord} 
                                                                name={chord} 
                                                                frets={CHORD_SHAPES[chord].frets}
                                                            />
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* ENCOURAGEMENT */}
                <Card className="bg-gradient-to-r from-pink-900/60 to-purple-900/60 border-2 border-pink-500">
                    <CardContent className="p-6 text-center">
                        <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-pink-300 mb-2">You've Got This! 💚</h3>
                        <p className="text-pink-200">
                            Every guitarist started exactly where you are now. 
                            Practice a little every day, and you'll be amazed how fast you improve!
                        </p>
                        <p className="text-sm text-gray-400 mt-4">
                            Music heals the soul. Keep playing. ♾️❤️♾️
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}