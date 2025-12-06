import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { COOLASFUCKMusicNote, COOLASFUCKHeart, COOLASFUCKGlobe, COOLASFUCKZap, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';
import InteractiveChordPlayer from '@/components/guitar/InteractiveChordPlayer';
import DrumLoops from '@/components/guitar/DrumLoops';
import LyricsChordDisplay from '@/components/guitar/LyricsChordDisplay';
import RecordingStudio from '@/components/guitar/RecordingStudio';

// CHORD DIAGRAMS - Simple visual representation
const ChordDiagram = ({ name, frets, fingers }) => {
    // frets: array of 6 strings, each showing fret number (0=open, x=muted, 1-4=fret)
    // Simple text-based for now
    return (
        <div className="bg-black border-4 border-amber-500 p-4 text-center">
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

// SONG DATA
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
        icon: COOLASFUCKMusicNote,
        lyrics: [
            { label: "Intro", lines: [{ chords: "Em7    G      Dsus4    A7sus4", text: "" }] },
            { label: "Verse 1", lines: [
                { chords: "Em7           G", text: "Today is gonna be the day" },
                { chords: "         Dsus4              A7sus4", text: "That they're gonna throw it back to you" },
                { chords: "Em7              G", text: "By now you should've somehow" },
                { chords: "          Dsus4           A7sus4", text: "Realized what you gotta do" },
            ]},
            { label: "Chorus", lines: [
                { chords: "Cadd9      Dsus4        Em7", text: "I said maybe" },
                { chords: "Cadd9         Dsus4      Em7", text: "You're gonna be the one that saves me" },
                { chords: "Cadd9  Dsus4  Em7  G  Em7  A7sus4", text: "And after all" },
                { chords: "Cadd9  Dsus4  Em7", text: "You're my wonderwall" },
            ]}
        ]
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
        icon: COOLASFUCKSparkle
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
        icon: COOLASFUCKHeart
    },
    {
        id: 4,
        title: "Last Request",
        artist: "Paolo Nutini",
        difficulty: "Beginner",
        chords: ["Am", "C", "G", "F"],
        capo: null,
        pattern: "Down Down Up Up Down Up",
        progression: "Am – C – G – F (verse and chorus)",
        tips: "Beautiful Scottish soul. 4 chords, smooth changes. Let it flow!",
        icon: COOLASFUCKHeart
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
        icon: COOLASFUCKGlobe
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
        icon: COOLASFUCKZap
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
        icon: COOLASFUCKSparkle
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
        icon: COOLASFUCKZap
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
        icon: COOLASFUCKHeart
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
        icon: COOLASFUCKSparkle
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
        icon: COOLASFUCKMusicNote
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
        icon: COOLASFUCKSparkle
    },
    {
        id: 13,
        title: "So Far Away",
        artist: "Dire Straits",
        difficulty: "Beginner+",
        chords: ["E", "A", "D", "B7"],
        capo: null,
        pattern: "Gentle fingerpick or arpeggios",
        progression: "E – A – E – B7",
        tips: "Mark Knopfler classic. Fingerpicking style but can strum gently too. Beautiful melody.",
        icon: COOLASFUCKSparkle
    },
    {
        id: 14,
        title: "Shine On You Crazy Diamond",
        artist: "Pink Floyd",
        difficulty: "Intermediate",
        chords: ["Gm", "Bb", "F", "C", "Dm"],
        capo: null,
        pattern: "Slow arpeggios, let notes ring",
        progression: "Gm – Bb – F – C – Gm",
        tips: "Epic tribute to Syd Barrett. Take it VERY slow, let each chord breathe. Feel the emotion.",
        icon: COOLASFUCKSparkle
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
                    <div className="inline-flex items-center justify-center bg-black border-4 border-amber-500 p-4">
                        <COOLASFUCKMusicNote size={64} animate={true} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-mono text-amber-400" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>
                        LEARN GUITAR
                    </h1>
                    <p className="text-xl text-orange-200 font-bold">
                        Easy songs with simple chords - perfect for beginners!
                    </p>
                </motion.div>

                {/* RECORDING STUDIO */}
                <RecordingStudio />

                {/* DRUM LOOPS */}
                <Card className="bg-black border-4 border-purple-500">
                    <CardContent className="p-4 md:p-6">
                        <h2 className="text-2xl md:text-3xl font-black font-mono text-purple-400 mb-2" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                            🥁 JAM WITH DRUMS
                        </h2>
                        <p className="text-purple-200 mb-4 font-bold text-sm md:text-base">
                            Pick a beat, play along. Old school + modern.
                        </p>
                        <DrumLoops />
                    </CardContent>
                </Card>

                {/* QUICK TIPS */}
                <Card className="bg-black border-4 border-amber-500">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-black font-mono text-amber-400 mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>🔥 QUICK TIPS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-black border-2 border-amber-500/50 p-3">
                                <p className="font-black font-mono text-amber-300 mb-1">START SLOW</p>
                                <p className="text-gray-300">Speed comes with practice. Accuracy first!</p>
                            </div>
                            <div className="bg-black border-2 border-amber-500/50 p-3">
                                <p className="font-black font-mono text-amber-300 mb-1">PRESS HARD</p>
                                <p className="text-gray-300">Fingertips right behind the fret wire.</p>
                            </div>
                            <div className="bg-black border-2 border-amber-500/50 p-3">
                                <p className="font-black font-mono text-amber-300 mb-1">PRACTICE CHANGES</p>
                                <p className="text-gray-300">Switch between 2 chords until smooth.</p>
                            </div>
                            <div className="bg-black border-2 border-amber-500/50 p-3">
                                <p className="font-black font-mono text-amber-300 mb-1">HAVE FUN!</p>
                                <p className="text-gray-300">Music is joy. Don't stress about perfection. 💚</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* INTERACTIVE CHORD PLAYER */}
                <Card className="bg-black border-4 border-green-500">
                    <CardContent className="p-4 md:p-6">
                        <h2 className="text-2xl md:text-3xl font-black font-mono text-green-400 mb-2 text-center" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                            🎸 TAP TO HEAR CHORDS
                        </h2>
                        <p className="text-green-200 text-center mb-4 md:mb-6 font-bold text-sm md:text-base">
                            Learn through FREQUENCY, not diagrams. Tap = HEAR! ✨
                        </p>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                            {['G', 'C', 'D', 'Em', 'Am', 'E', 'A', 'F', 'Em7', 'Dsus4', 'A7sus4', 'Cadd9', 'B7', 'Gm', 'Bb', 'Dm'].map(chord => (
                                <InteractiveChordPlayer key={chord} chordName={chord} size="small" />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* CHORD LIBRARY TOGGLE */}
                <Button
                    onClick={() => setShowChordLibrary(!showChordLibrary)}
                    className="w-full bg-black border-4 border-cyan-500 hover:bg-cyan-900 text-white font-black font-mono py-4"
                >
                    {showChordLibrary ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                    {showChordLibrary ? "HIDE" : "SHOW"} CHORD DIAGRAMS
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
                    <h2 className="text-3xl font-black font-mono text-amber-400 text-center bg-black border-4 border-amber-500 py-3" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>🎵 EASY SONGS</h2>
                    
                    {SONGS.map((song, index) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card 
                                className={`bg-black border-4 cursor-pointer transition-all ${
                                    expandedSong === song.id ? 'border-amber-400' : 'border-amber-500/50 hover:border-amber-500'
                                }`}
                                onClick={() => setExpandedSong(expandedSong === song.id ? null : song.id)}
                            >
                                <CardContent className="p-4">
                                    {/* SONG HEADER */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <song.icon size={40} animate={true} />
                                            <div>
                                                <p className="font-black font-mono text-white text-lg">{song.title}</p>
                                                <p className="text-amber-300 text-sm font-bold">{song.artist}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 border-2 text-xs font-black font-mono ${
                                                song.difficulty === 'Beginner' ? 'bg-green-600 border-green-400' : 'bg-yellow-600 border-yellow-400'
                                            }`}>
                                                {song.difficulty.toUpperCase()}
                                            </span>
                                            {expandedSong === song.id ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </div>

                                    {/* EXPANDED DETAILS */}
                                    {expandedSong === song.id && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-4 pt-4 border-t-4 border-amber-500 space-y-4"
                                        >
                                            {/* CHORDS */}
                                            <div>
                                                <p className="text-amber-400 font-black font-mono mb-2">CHORDS:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {song.chords.map(chord => (
                                                        <span key={chord} className="px-3 py-1 bg-black border-2 border-amber-600 text-amber-400 font-black font-mono">
                                                            {chord}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CAPO */}
                                            {song.capo && (
                                                <div className="bg-black border-2 border-cyan-500 p-3">
                                                    <p className="text-cyan-400 font-black font-mono mb-1">CAPO:</p>
                                                    <p className="text-white font-bold">{song.capo}</p>
                                                </div>
                                            )}

                                            {/* PROGRESSION */}
                                            <div className="bg-black border-2 border-purple-500 p-3">
                                                <p className="text-purple-400 font-black font-mono mb-1">PROGRESSION:</p>
                                                <p className="text-cyan-300 font-mono font-bold">{song.progression}</p>
                                            </div>

                                            {/* STRUMMING */}
                                            <div className="bg-black border-2 border-pink-500 p-3">
                                                <p className="text-pink-400 font-black font-mono mb-1">STRUMMING:</p>
                                                <p className="text-white font-bold">{song.pattern}</p>
                                            </div>

                                            {/* TIPS */}
                                            <div className="bg-black border-4 border-green-500 p-4">
                                                <p className="text-green-400 font-black font-mono mb-2">💡 TIPS:</p>
                                                <p className="text-green-200 font-bold">{song.tips}</p>
                                            </div>

                                            {/* LYRICS + CHORDS */}
                                            <LyricsChordDisplay song={song} />

                                            {/* CHORD DIAGRAMS FOR THIS SONG */}
                                            <div>
                                                <p className="text-amber-400 font-black font-mono mb-2">CHORD SHAPES:</p>
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
                <Card className="bg-black border-4 border-pink-500">
                    <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                            <COOLASFUCKHeart size={48} animate={true} />
                        </div>
                        <h3 className="text-2xl font-black font-mono text-pink-300 mb-2" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>YOU'VE GOT THIS!</h3>
                        <p className="text-pink-200 font-bold">
                            Every guitarist started exactly where you are now. 
                            Practice a little every day, and you'll be amazed how fast you improve!
                        </p>
                        <p className="text-sm text-gray-400 mt-4 font-mono">
                            Music heals the soul. Keep playing. ♾️❤️♾️
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}