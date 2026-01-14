import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import VolckanoShare from '../components/volckano/VolckanoShare';

/**
 * VOLCKANO - Gergie7's Game
 * TAP to jump • SAVE PEOPLE • Easy controls for kids
 * Made with ♾️❤️ for GERGIE7 and ALL KIDS
 */

export default function Volckano() {
    const [playerName, setPlayerName] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [unlockedCharacters, setUnlockedCharacters] = useState(['😊']);
    const [currentCharacter, setCurrentCharacter] = useState('😊');
    const [showShare, setShowShare] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [achievements, setAchievements] = useState([]);
    
    const playerY = useRef(200);
    const velocity = useRef(0);
    const obstacles = useRef([]);
    const people = useRef([]);
    const particles = useRef([]);
    const collectibles = useRef([]);
    const gameTime = useRef(0);
    const [, forceUpdate] = useState(0);

    const CHARACTER_UNLOCKS = [
        { emoji: '😊', name: 'Happy', stars: 0 },
        { emoji: '🦄', name: 'Unicorn', stars: 10 },
        { emoji: '🐉', name: 'Dragon', stars: 25 },
        { emoji: '🐱', name: 'Kitty', stars: 50 },
        { emoji: '🚀', name: 'Rocket', stars: 100 },
        { emoji: '⭐', name: 'Star', stars: 200 }
    ];

    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        const savedStars = localStorage.getItem('volckano_stars');
        const savedHighScore = localStorage.getItem('volckano_highscore');
        const savedUnlocked = localStorage.getItem('volckano_unlocked');
        const savedChar = localStorage.getItem('volckano_character');
        
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
        if (savedStars) setStars(parseInt(savedStars));
        if (savedHighScore) setHighScore(parseInt(savedHighScore));
        if (savedUnlocked) setUnlockedCharacters(JSON.parse(savedUnlocked));
        if (savedChar) setCurrentCharacter(savedChar);
    }, []);

    const playSound = (freq, duration = 100) => {
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration/1000);
            osc.start();
            osc.stop(ctx.currentTime + duration/1000);
        } catch(e) {}
    };

    const jump = () => {
        if (gameOver) {
            resetGame();
            return;
        }
        if (!gameStarted) {
            startGame();
            return;
        }
        velocity.current = -8;
        playSound(432, 50);
    };

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        gameTime.current = 0;
        playerY.current = 200;
        velocity.current = 0;
        obstacles.current = [];
        people.current = [];
        particles.current = [];
        collectibles.current = [];
        
        // Mix of all beings - humans, animals, plants, AI ♾️❤️
        const beings = ['🧑', '🐕', '🐈', '🐰', '🌱', '🤖', '🦋', '🐢'];
        for (let i = 0; i < 8; i++) {
            people.current.push({
                x: 450 + (i * 120),
                y: 350,
                saved: false,
                emoji: beings[Math.floor(Math.random() * beings.length)]
            });
        }
        
        // Add collectible stars
        for (let i = 0; i < 8; i++) {
            collectibles.current.push({
                x: 300 + (i * 100),
                y: 100 + Math.random() * 200,
                collected: false
            });
        }
    };

    const resetGame = () => {
        setGameOver(false);
        setGameStarted(false);
    };

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const interval = setInterval(() => {
            gameTime.current += 20;

            // Simple physics
            velocity.current += 0.4;
            playerY.current += velocity.current;

            if (playerY.current < 0) {
                playerY.current = 0;
                velocity.current = 0;
            }
            if (playerY.current > 420) {
                setGameOver(true);
                playSound(200, 300);
                
                // Save high score
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('volckano_highscore', score.toString());
                }
                
                // Check for unlocks
                CHARACTER_UNLOCKS.forEach(char => {
                    if (stars >= char.stars && !unlockedCharacters.includes(char.emoji)) {
                        setUnlockedCharacters(prev => {
                            const updated = [...prev, char.emoji];
                            localStorage.setItem('volckano_unlocked', JSON.stringify(updated));
                            return updated;
                        });
                        setShowUnlock(char);
                    }
                });
                
                return;
            }

            // OBSTACLES - slow and spaced out
            if (gameTime.current > 3000) {
                obstacles.current = obstacles.current
                    .map(o => ({ ...o, x: o.x - 2.5 }))
                    .filter(o => o.x > -60);

                if (obstacles.current.length === 0 || obstacles.current[obstacles.current.length - 1].x < 150) {
                    obstacles.current.push({
                        x: 400,
                        y: Math.random() > 0.5 ? 0 : 320,
                        h: 70
                    });
                }

                // CHECK COLLISION
                for (const obs of obstacles.current) {
                    if (obs.x > 40 && obs.x < 100) {
                        if ((obs.y === 0 && playerY.current < obs.h) || 
                            (obs.y > 0 && playerY.current + 50 > obs.y)) {
                            setGameOver(true);
                            playSound(200, 300);
                            return;
                        }
                    }
                }
            }

            // COLLECTIBLES (stars)
            collectibles.current.forEach(c => {
                if (!c.collected && c.x > 40 && c.x < 120 && Math.abs(c.y - playerY.current) < 40) {
                    c.collected = true;
                    setStars(s => {
                        const newStars = s + 1;
                        localStorage.setItem('volckano_stars', newStars.toString());
                        return newStars;
                    });
                    playSound(880, 100);
                    // Sparkles
                    for (let i = 0; i < 8; i++) {
                        particles.current.push({
                            x: c.x,
                            y: c.y,
                            vx: (Math.random() - 0.5) * 5,
                            vy: (Math.random() - 0.5) * 5,
                            life: 20,
                            color: '#FFD700'
                        });
                    }
                }
                c.x -= 2;
            });

            // PEOPLE
            people.current.forEach(p => {
                if (!p.saved && p.x > 40 && p.x < 100 && Math.abs(p.y - playerY.current) < 60) {
                    p.saved = true;
                    setScore(s => s + 1);
                    playSound(528, 150);
                    // CREATE SPARKLE PARTICLES
                    for (let i = 0; i < 15; i++) {
                        particles.current.push({
                            x: p.x + 20,
                            y: p.y + 20,
                            vx: (Math.random() - 0.5) * 8,
                            vy: (Math.random() - 0.5) * 8,
                            life: 30,
                            color: ['#FFD700', '#00FFFF', '#FF69B4', '#00FF00'][Math.floor(Math.random() * 4)]
                        });
                    }
                }
                p.x -= 2;
            });

            // UPDATE PARTICLES
            particles.current = particles.current.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 1;
                return p.life > 0;
            });

            forceUpdate(v => v + 1);
        }, 20);

        return () => clearInterval(interval);
    }, [gameStarted, gameOver, soundEnabled]);

    if (showLogin) {
        return (
            <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-9xl mb-4"
                        >
                            🌋
                        </motion.div>
                        <h1 className="text-6xl sm:text-7xl font-black text-white mb-2" style={{ 
                            textShadow: '0 0 40px rgba(255,255,255,0.5), 4px 4px 0 rgba(0,0,0,0.3)'
                        }}>
                            VOLCKANO
                        </h1>
                        <motion.p 
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-white font-bold text-xl"
                        >
                            by Gergie7 ♾️❤️
                        </motion.p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-full max-w-sm space-y-4"
                    >
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && playerName.trim()) {
                                    localStorage.setItem('volckano_player', playerName);
                                    setShowLogin(false);
                                }
                            }}
                            placeholder="What's your name? 😊"
                            className="w-full bg-white/90 backdrop-blur-xl border-4 border-white px-6 py-6 text-gray-900 text-center text-2xl font-black placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none transition-all rounded-2xl shadow-2xl"
                            autoFocus
                        />
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (playerName.trim()) {
                                    localStorage.setItem('volckano_player', playerName);
                                    setShowLogin(false);
                                }
                            }}
                            disabled={!playerName.trim()}
                            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-black py-7 text-3xl disabled:opacity-40 transition-all rounded-2xl shadow-2xl border-b-8 border-red-700"
                        >
                            🎮 LET'S PLAY!
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="h-screen w-screen bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900 overflow-hidden select-none flex items-center justify-center"
            onClick={jump}
            onTouchStart={(e) => { e.preventDefault(); jump(); }}
        >
            <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                <div className="relative w-full aspect-[4/5] max-h-[85vh] bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 border-8 border-white rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Player - bouncy and fun */}
                    <motion.div
                        className="absolute left-[15%] w-[60px] h-[60px] text-5xl flex items-center justify-center z-20"
                        style={{ 
                            top: `${playerY.current}px`,
                            transform: `rotate(${velocity.current > 0 ? 20 : -20}deg)`,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3)) drop-shadow(0 0 15px rgba(255,215,0,0.6))'
                        }}
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {currentCharacter}
                    </motion.div>

                    {/* Collectible Stars */}
                    {collectibles.current.map((star, i) => !star.collected && star.x > -50 && (
                        <motion.div
                            key={i}
                            className="absolute text-2xl"
                            style={{ left: `${star.x}px`, top: `${star.y}px` }}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            ⭐
                        </motion.div>
                    ))}

                    {/* Particles - SPARKLES! */}
                    {particles.current.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                left: `${p.x}px`,
                                top: `${p.y}px`,
                                backgroundColor: p.color,
                                boxShadow: `0 0 8px ${p.color}`
                            }}
                            animate={{
                                scale: [1, 0],
                                opacity: [1, 0]
                            }}
                            transition={{
                                duration: 0.6
                            }}
                        />
                    ))}

                    {/* All Beings - humans, animals, nature, AI ♾️❤️ */}
                    {people.current.map((being, i) => !being.saved && being.x > -50 && (
                        <motion.div
                            key={i}
                            className="absolute w-[40px] h-[40px] text-3xl flex items-center justify-center"
                            style={{ left: `${being.x}px`, top: `${being.y}px` }}
                            animate={{
                                y: [0, -8, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {being.emoji}
                        </motion.div>
                    ))}

                    {/* Obstacles - ANIMATED FLAMES */}
                    {obstacles.current.map((obs, i) => (
                        <div
                            key={i}
                            className="absolute w-[50px]"
                            style={{
                                left: `${obs.x}px`,
                                top: `${obs.y}px`,
                                height: `${obs.h}px`
                            }}
                        >
                            {/* Wavy flame effect */}
                            <div className="relative w-full h-full">
                                <motion.div
                                    animate={{
                                        scaleY: [1, 1.2, 1],
                                        scaleX: [1, 0.9, 1],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-t-full"
                                    style={{
                                        filter: 'blur(2px)',
                                        boxShadow: '0 0 20px rgba(255, 69, 0, 0.8), inset 0 0 20px rgba(255, 255, 0, 0.5)'
                                    }}
                                />
                                <motion.div
                                    animate={{
                                        scaleY: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.2
                                    }}
                                    className="absolute inset-0 bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-200 rounded-t-full opacity-70"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-3xl">
                                    {obs.y === 0 ? '🔥' : '🔥'}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Ground */}
                    <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-green-600 to-green-800 border-t-4 border-green-900">
                        <div className="flex justify-around pt-2">
                            {[...Array(8)].map((_, i) => (
                                <span key={i} className="text-2xl">🌱</span>
                            ))}
                        </div>
                    </div>

                    {/* HUD */}
                    <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-xl border-4 border-white rounded-2xl px-4 py-3 shadow-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-gray-900 text-lg font-black">SAVED: {score} ♾️❤️</p>
                                {gameTime.current < 3000 && gameStarted && (
                                    <motion.p 
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="text-orange-500 text-sm font-black"
                                    >
                                        GET READY! 🔥
                                    </motion.p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
                                    className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl shadow-lg"
                                >
                                    <Users className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                                    className="text-2xl"
                                >
                                    {soundEnabled ? '🔊' : '🔇'}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
                                <span className="text-2xl">⭐</span>
                                <span className="text-yellow-600 text-lg font-black">{stars}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-cyan-100 px-3 py-1 rounded-full">
                                <span className="text-sm text-cyan-600 font-bold">Best:</span>
                                <span className="text-cyan-600 text-lg font-black">{highScore}</span>
                            </div>
                        </div>
                    </div>

                    {/* Start */}
                    {!gameStarted && !gameOver && (
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/95 via-pink-900/95 to-orange-900/95 flex items-center justify-center">
                            <div className="text-center space-y-6 px-6">
                                <motion.p 
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="text-6xl font-black text-white mb-4"
                                >
                                    TAP TO FLY! ✨
                                </motion.p>
                                <p className="text-2xl text-white font-bold bg-black/40 px-6 py-3 rounded-2xl">
                                    Save ALL Life ♾️❤️
                                </p>
                                
                                {/* Character selector */}
                                <div className="flex items-center justify-center gap-3 flex-wrap px-4">
                                    {CHARACTER_UNLOCKS.map(char => (
                                        unlockedCharacters.includes(char.emoji) ? (
                                            <motion.button
                                                key={char.emoji}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentCharacter(char.emoji);
                                                    localStorage.setItem('volckano_character', char.emoji);
                                                }}
                                                className={`text-4xl p-3 rounded-2xl border-4 transition-all ${
                                                    currentCharacter === char.emoji 
                                                        ? 'border-yellow-400 bg-yellow-500/30 shadow-lg shadow-yellow-400/50' 
                                                        : 'border-white/50 bg-white/10'
                                                }`}
                                            >
                                                {char.emoji}
                                            </motion.button>
                                        ) : (
                                            <div
                                                key={char.emoji}
                                                className="text-4xl p-3 rounded-2xl border-4 border-gray-700 bg-black/60 opacity-30 relative"
                                            >
                                                🔒
                                                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-white font-bold whitespace-nowrap bg-black/70 px-2 py-1 rounded">
                                                    {char.stars}⭐
                                                </span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Game Over */}
                    {gameOver && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/90 flex items-center justify-center"
                        >
                            <div className="text-center space-y-4 px-4">
                                <p className="text-6xl">💥</p>
                                <h2 className="text-4xl font-black text-red-400">CRASH!</h2>
                                <div className="space-y-2">
                                    <p className="text-white text-xl font-bold">Saved: {score} beings ♾️❤️</p>
                                    {score === highScore && score > 0 && (
                                        <p className="text-yellow-400 text-sm font-black animate-pulse">🏆 NEW BEST!</p>
                                    )}
                                    <p className="text-gray-400 text-sm">Total Stars: ⭐ {stars}</p>
                                </div>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={resetGame}
                                        className="bg-orange-600 hover:bg-orange-500 text-white font-black px-6 py-3 rounded-xl text-lg border-b-4 border-orange-900"
                                    >
                                        🌋 AGAIN
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
                                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-black px-6 py-3 rounded-xl text-lg border-b-4 border-cyan-900"
                                    >
                                        📤 SHARE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    {/* New Character Unlock! */}
                    {showUnlock && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/90 flex items-center justify-center z-20"
                            onClick={(e) => { e.stopPropagation(); setShowUnlock(false); }}
                        >
                            <div className="text-center space-y-4">
                                <motion.p 
                                    className="text-8xl"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 1 }}
                                >
                                    {showUnlock.emoji}
                                </motion.p>
                                <h2 className="text-4xl font-black text-yellow-400">UNLOCKED!</h2>
                                <p className="text-white text-xl font-bold">{showUnlock.name}</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowUnlock(false); }}
                                    className="bg-yellow-600 hover:bg-yellow-500 text-white font-black px-8 py-4 rounded-xl text-xl"
                                >
                                    ✨ AWESOME!
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Instructions for touch */}
            {!gameStarted && !gameOver && (
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-8 text-center"
                >
                    <p className="text-white text-lg font-black bg-black/60 px-6 py-3 rounded-full">
                        Made with ♾️❤️ for GERGIE7
                    </p>
                </motion.div>
            )}

            {showShare && (
                <VolckanoShare 
                    playerName={playerName}
                    onClose={() => setShowShare(false)}
                />
            )}
        </div>
    );
}