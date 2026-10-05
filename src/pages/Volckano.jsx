import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import VolckanoShare from '../components/volckano/VolckanoShare';
import { VolckanoPlayer, VolckanoLife, VolckanoFlame, VolckanoStar } from '../components/volckano/VolckanoCustomIcons';

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
    const [unlockedCharacters, setUnlockedCharacters] = useState(['happy']);
    const [currentCharacter, setCurrentCharacter] = useState('happy');
    const [showShare, setShowShare] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [achievements, setAchievements] = useState([]);
    const [p51Balance, setP51Balance] = useState(0);
    const [inGameP51, setInGameP51] = useState(0);
    const [saveIndicator, setSaveIndicator] = useState(false);
    
    const playerY = useRef(200);
    const velocity = useRef(0);
    const obstacles = useRef([]);
    const people = useRef([]);
    const particles = useRef([]);
    const collectibles = useRef([]);
    const gameTime = useRef(0);
    const [, forceUpdate] = useState(0);
    const autoSaveInterval = useRef(null);

    const CHARACTER_UNLOCKS = [
        { type: 'happy', name: 'Happy', stars: 0, p51Required: 0 },
        { type: 'unicorn', name: 'Unicorn', stars: 10, p51Required: 0 },
        { type: 'dragon', name: 'Dragon', stars: 25, p51Required: 5 },
        { type: 'kitty', name: 'Kitty', stars: 50, p51Required: 10 },
        { type: 'rocket', name: 'Rocket', stars: 100, p51Required: 20 },
        { type: 'star', name: 'Star', stars: 200, p51Required: 50 }
    ];

    // AUTO-SAVE GAME STATE
    const saveGameState = () => {
        try {
            const gameState = {
                stars,
                highScore,
                unlockedCharacters,
                currentCharacter,
                inGameP51,
                lastSaved: Date.now()
            };
            localStorage.setItem('volckano_gamestate', JSON.stringify(gameState));
            setSaveIndicator(true);
            setTimeout(() => setSaveIndicator(false), 1000);
        } catch (e) {
            console.error('Save failed:', e);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        const savedStars = localStorage.getItem('volckano_stars');
        const savedHighScore = localStorage.getItem('volckano_highscore');
        const savedUnlocked = localStorage.getItem('volckano_unlocked');
        const savedChar = localStorage.getItem('volckano_character');
        const earth51Balance = parseFloat(localStorage.getItem('earth51_local_balance') || '0');
        const savedInGameP51 = parseFloat(localStorage.getItem('volckano_ingame_p51') || '0');
        
        // Try loading full game state backup
        try {
            const gameState = localStorage.getItem('volckano_gamestate');
            if (gameState) {
                const state = JSON.parse(gameState);
                setStars(state.stars || 0);
                setHighScore(state.highScore || 0);
                setUnlockedCharacters(state.unlockedCharacters || ['happy']);
                setCurrentCharacter(state.currentCharacter || 'happy');
                setInGameP51(state.inGameP51 || 0);
            } else {
                // Fallback to old method
                if (saved) {
                    setPlayerName(saved);
                    setShowLogin(false);
                }
                if (savedStars) setStars(parseInt(savedStars));
                if (savedHighScore) setHighScore(parseInt(savedHighScore));
                if (savedUnlocked) setUnlockedCharacters(JSON.parse(savedUnlocked));
                if (savedChar) setCurrentCharacter(savedChar);
                setInGameP51(savedInGameP51);
            }
        } catch (e) {
            // If backup fails, use old method
            if (saved) {
                setPlayerName(saved);
                setShowLogin(false);
            }
            if (savedStars) setStars(parseInt(savedStars));
            if (savedHighScore) setHighScore(parseInt(savedHighScore));
            if (savedUnlocked) setUnlockedCharacters(JSON.parse(savedUnlocked));
            if (savedChar) setCurrentCharacter(savedChar);
            setInGameP51(savedInGameP51);
        }
        
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
        setP51Balance(earth51Balance);
        
        // Auto-save every 10 seconds
        autoSaveInterval.current = setInterval(saveGameState, 10000);
        
        // Save on page unload (before crash/close)
        const handleUnload = () => saveGameState();
        window.addEventListener('beforeunload', handleUnload);
        
        return () => {
            clearInterval(autoSaveInterval.current);
            window.removeEventListener('beforeunload', handleUnload);
            saveGameState(); // Final save
        };
    }, [stars, highScore, unlockedCharacters, currentCharacter, inGameP51]);

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
        velocity.current = -10; // Bigger jump = easier for kids
        playSound(432, 50);
        
        // Haptic feedback - kids love the vibration!
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
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
        const beings = ['human', 'dog', 'cat', 'plant', 'robot', 'butterfly', 'turtle'];
        for (let i = 0; i < 8; i++) {
            people.current.push({
                x: 450 + (i * 120),
                y: 350,
                saved: false,
                type: beings[Math.floor(Math.random() * beings.length)]
            });
        }
        
        // Add collectible stars AND in-game litter (earns small P51)
        for (let i = 0; i < 8; i++) {
            collectibles.current.push({
                x: 300 + (i * 100),
                y: 100 + Math.random() * 200,
                collected: false,
                type: Math.random() > 0.7 ? 'litter' : 'star' // 30% litter, 70% stars
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

            // Simple physics - gentler gravity for kids
            velocity.current += 0.35;
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
                
                // Check for unlocks (stars + P51 requirement)
                CHARACTER_UNLOCKS.forEach(char => {
                    const hasStars = stars >= char.stars;
                    const hasP51 = p51Balance >= char.p51Required;
                    const canUnlock = hasStars && hasP51;

                    if (canUnlock && !unlockedCharacters.includes(char.type)) {
                        setUnlockedCharacters(prev => {
                            const updated = [...prev, char.type];
                            localStorage.setItem('volckano_unlocked', JSON.stringify(updated));
                            return updated;
                        });
                        setShowUnlock(char);
                    }
                });
                
                return;
            }

            // OBSTACLES - slow and spaced out for kids
            if (gameTime.current > 3000) {
                obstacles.current = obstacles.current
                    .map(o => ({ ...o, x: o.x - 2 })) // Slower = easier
                    .filter(o => o.x > -60);

                if (obstacles.current.length === 0 || obstacles.current[obstacles.current.length - 1].x < 200) {
                    obstacles.current.push({
                        x: 400,
                        y: Math.random() > 0.5 ? 0 : 320,
                        h: 70
                    });
                }

                // CHECK COLLISION - forgiving hitbox for kids
                for (const obs of obstacles.current) {
                    if (obs.x > 50 && obs.x < 90) { // Smaller collision window
                        if ((obs.y === 0 && playerY.current < obs.h - 10) || // Top obstacle more forgiving
                            (obs.y > 0 && playerY.current + 60 > obs.y)) { // Bottom obstacle more forgiving
                            setGameOver(true);
                            playSound(200, 300);
                            return;
                        }
                    }
                }
            }

            // COLLECTIBLES (stars + in-game litter) - bigger zone
            collectibles.current.forEach(c => {
                if (!c.collected && c.x > 30 && c.x < 130 && Math.abs(c.y - playerY.current) < 50) {
                    c.collected = true;
                    
                    if (c.type === 'litter') {
                        // IN-GAME LITTER: 1 P51 per pickup (whole numbers!)
                        setInGameP51(prev => {
                            const newBalance = prev + 1;
                            localStorage.setItem('volckano_ingame_p51', newBalance.toString());
                            return newBalance;
                        });
                        playSound(528, 100);
                    } else {
                        // STARS: Unlock characters
                        setStars(s => {
                            const newStars = s + 1;
                            localStorage.setItem('volckano_stars', newStars.toString());
                            return newStars;
                        });
                        playSound(880, 100);
                    }
                    
                    if (navigator.vibrate) navigator.vibrate(30);
                    // Sparkles
                    for (let i = 0; i < 8; i++) {
                        particles.current.push({
                            x: c.x,
                            y: c.y,
                            vx: (Math.random() - 0.5) * 5,
                            vy: (Math.random() - 0.5) * 5,
                            life: 20,
                            color: c.type === 'litter' ? '#22c55e' : '#FFD700'
                        });
                    }
                }
                c.x -= 2;
            });

            // PEOPLE - bigger collection zone for kids
            people.current.forEach(p => {
                if (!p.saved && p.x > 30 && p.x < 110 && Math.abs(p.y - playerY.current) < 70) {
                    p.saved = true;
                    setScore(s => s + 1);
                    playSound(528, 150);
                    if (navigator.vibrate) navigator.vibrate([30, 50, 30]); // Double buzz for saving life!
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
    }, [gameStarted, gameOver]);

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
                        <div className="flex items-center justify-center gap-2">
                            <motion.div 
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-white font-bold text-xl"
                            >
                                by Gergie7
                            </motion.div>
                            <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
                                <rect x="6" y="10" width="20" height="14" fill="#ec4899" rx="2"/>
                                <rect x="10" y="6" width="12" height="20" fill="#ec4899" rx="2"/>
                                <rect x="12" y="14" width="8" height="2" fill="#ff69b4"/>
                            </svg>
                        </div>
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
                            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-black py-7 text-3xl disabled:opacity-40 transition-all rounded-2xl shadow-2xl border-b-8 border-red-700 flex items-center justify-center gap-3"
                        >
                            <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
                                <rect x="4" y="8" width="24" height="16" fill="#4a5568" rx="2"/>
                                <circle cx="10" cy="16" r="3" fill="#3b82f6"/>
                                <rect x="18" y="12" width="3" height="3" fill="#ef4444"/>
                                <rect x="22" y="16" width="3" height="3" fill="#22c55e"/>
                            </svg>
                            LET'S PLAY!
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="h-screen w-screen bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900 overflow-hidden select-none flex items-center justify-center p-4 active:bg-purple-800 transition-colors"
            onClick={jump}
            onTouchStart={(e) => { e.preventDefault(); jump(); }}
        >
            <div className="relative w-full max-w-sm">
                <div className="relative w-full aspect-[9/16] bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 border-8 border-white rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Player - Custom Icon */}
                    <motion.div
                        className="absolute left-[15%] z-20"
                        style={{ 
                            top: `${playerY.current}px`,
                            transform: `rotate(${velocity.current > 0 ? 15 : -15}deg)`,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                        }}
                        animate={{
                            scale: [1, 1.08, 1],
                        }}
                        transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <VolckanoPlayer type={currentCharacter} size={60} />
                    </motion.div>

                    {/* Collectibles - Stars + In-Game Litter */}
                    {collectibles.current.map((item, i) => !item.collected && item.x > -50 && (
                        <div
                            key={i}
                            className="absolute"
                            style={{ left: `${item.x}px`, top: `${item.y}px` }}
                        >
                            {item.type === 'litter' ? (
                                <svg width="28" height="28" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                                    <rect x="10" y="8" width="12" height="16" fill="#22c55e" rx="2"/>
                                    <rect x="8" y="6" width="16" height="3" fill="#16a34a"/>
                                    <rect x="14" y="11" width="4" height="10" fill="#86efac"/>
                                </svg>
                            ) : (
                                <VolckanoStar size={32} />
                            )}
                        </div>
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

                    {/* All Beings - Custom Icons ♾️❤️ */}
                    {people.current.map((being, i) => !being.saved && being.x > -50 && (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{ left: `${being.x}px`, top: `${being.y}px` }}
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <VolckanoLife type={being.type} size={40} />
                        </motion.div>
                    ))}

                    {/* Obstacles - Custom Flames */}
                    {obstacles.current.map((obs, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${obs.x}px`,
                                top: `${obs.y}px`,
                                height: `${obs.h}px`
                            }}
                        >
                            <VolckanoFlame size={50} inverted={obs.y === 0} />
                        </div>
                    ))}

                    {/* Ground - 8-bit grass */}
                    <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-green-600 to-green-800 border-t-4 border-green-900">
                        <div className="flex justify-around pt-2">
                            {[...Array(8)].map((_, i) => (
                                <svg key={i} width="20" height="24" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
                                    <rect x="6" y="8" width="4" height="8" fill="#22c55e"/>
                                    <polygon points="8,2 6,8 10,8" fill="#10b981"/>
                                    <polygon points="4,6 6,10 8,8" fill="#10b981"/>
                                    <polygon points="12,6 10,10 8,8" fill="#10b981"/>
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* HUD - 8-BIT EARTH.LOVE STYLE */}
                    <div className="absolute top-4 left-4 right-4 bg-black border-4 border-cyan-500 px-3 py-2 shadow-2xl" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-white text-sm font-black font-mono">SAVED: {score} ♾️❤️</p>
                                {gameTime.current < 3000 && gameStarted && (
                                    <motion.p 
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="text-orange-400 text-xs font-black font-mono"
                                    >
                                        GET READY! 🔥
                                    </motion.p>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
                                    className="p-1.5 bg-cyan-500 hover:bg-cyan-400 border-2 border-cyan-400"
                                >
                                    <Users className="w-4 h-4 text-black" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                                    className="text-xl"
                                >
                                    {soundEnabled ? '🔊' : '🔇'}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1 bg-yellow-500 border-2 border-yellow-400 px-2 py-0.5">
                                <span className="text-base">⭐</span>
                                <span className="text-black text-sm font-black font-mono">{stars}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-green-500 border-2 border-green-400 px-2 py-0.5">
                                <span className="text-black text-[10px] font-black font-mono">GAME:</span>
                                <span className="text-black text-sm font-black font-mono">{Math.round(inGameP51)}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-pink-500 border-2 border-pink-400 px-2 py-0.5">
                                <span className="text-black text-[10px] font-black font-mono">REAL:</span>
                                <span className="text-black text-sm font-black font-mono">{Math.round(p51Balance)}</span>
                            </div>
                            {saveIndicator && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="flex items-center gap-1 bg-cyan-500 border-2 border-cyan-400 px-2 py-0.5"
                                >
                                    <span className="text-black text-[9px] font-black font-mono">✓ SAVED</span>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Start Screen - Clean & Fun */}
                    {!gameStarted && !gameOver && (
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/98 via-pink-900/98 to-orange-900/98 flex flex-col items-center justify-center px-6 py-8">
                            {/* Volcano 8-bit */}
                            <motion.svg 
                                width="80" 
                                height="80" 
                                viewBox="0 0 64 64" 
                                className="mb-4"
                                animate={{ 
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{ imageRendering: 'pixelated' }}
                            >
                                <polygon points="32,8 12,48 52,48" fill="#8B4513"/>
                                <polygon points="28,20 24,32 40,32 36,20" fill="#FF4500"/>
                                <rect x="28" y="8" width="8" height="12" fill="#FFD700"/>
                                <circle cx="24" cy="6" r="3" fill="#FFD700" opacity="0.8"/>
                                <circle cx="40" cy="6" r="3" fill="#FFD700" opacity="0.8"/>
                            </motion.svg>

                            {/* Title - 8-bit style */}
                            <motion.div 
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mb-6 text-center"
                            >
                                <h1 className="text-5xl font-black text-white mb-2" style={{ 
                                    textShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                                    fontFamily: 'monospace',
                                    letterSpacing: '2px'
                                }}>
                                    TAP TO FLY
                                </h1>
                                <p className="text-cyan-300 font-bold text-lg tracking-wide" style={{ fontFamily: 'monospace' }}>
                                    Save ALL Life ♾️❤️
                                </p>
                            </motion.div>
                            
                            {/* Character Grid - Cleaner */}
                            <div className="bg-black/40 backdrop-blur-sm border-4 border-white/30 rounded-3xl p-4 mb-4">
                                <p className="text-white font-black text-sm text-center mb-3 opacity-80" style={{ fontFamily: 'monospace' }}>
                                    CHOOSE YOUR HERO
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {CHARACTER_UNLOCKS.map(char => {
                                        const hasStars = stars >= char.stars;
                                        const hasP51 = p51Balance >= char.p51Required;
                                        const canUnlock = hasStars && hasP51;
                                        const isUnlocked = unlockedCharacters.includes(char.type);
                                        
                                        return isUnlocked ? (
                                            <motion.button
                                                key={char.type}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentCharacter(char.type);
                                                    localStorage.setItem('volckano_character', char.type);
                                                    if (navigator.vibrate) navigator.vibrate(30);
                                                }}
                                                className={`relative p-2 border-4 transition-all ${
                                                    currentCharacter === char.type 
                                                        ? 'border-yellow-400 bg-yellow-500/40' 
                                                        : 'border-white/40 bg-white/10 hover:bg-white/20'
                                                }`}
                                                style={{ boxShadow: currentCharacter === char.type ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none' }}
                                            >
                                                <VolckanoPlayer type={char.type} size={40} />
                                                {currentCharacter === char.type && (
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white flex items-center justify-center">
                                                        <span className="text-white text-xs font-black">✓</span>
                                                    </div>
                                                )}
                                            </motion.button>
                                        ) : (
                                            <div
                                                key={char.type}
                                                className="relative p-2 border-4 border-gray-700 bg-black/60"
                                            >
                                                <div className="w-[40px] h-[40px] flex items-center justify-center text-2xl opacity-40">
                                                    🔒
                                                </div>
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 space-y-0.5">
                                                    <div className="bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 border-2 border-white whitespace-nowrap font-mono">
                                                        {char.stars}⭐
                                                    </div>
                                                    {char.p51Required > 0 && (
                                                        <div className={`${hasP51 ? 'bg-green-600' : 'bg-pink-600'} text-white text-[9px] font-black px-1.5 py-0.5 border-2 border-white whitespace-nowrap font-mono`}>
                                                            {char.p51Required} P51
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* P51 EXPLAINER */}
                            <div className="bg-black border-4 border-green-500 p-4 mb-4" style={{ boxShadow: '4px 4px 0px #000' }}>
                                <p className="text-green-400 font-black font-mono text-xs mb-2">HOW P51 WORKS:</p>
                                <div className="space-y-1 text-white font-mono text-[9px]">
                                    <p>🌍 Clean REAL Earth = 10 P51/kg</p>
                                    <p>🎮 Clean in-game = 1 P51/pickup</p>
                                    <p>💡 Real Earth 10x better!</p>
                                </div>
                                <div className="bg-pink-500 border-2 border-pink-400 p-2 mt-2">
                                    <p className="text-black font-black font-mono text-[9px] text-center">
                                        Unlock levels with REAL cleanups!
                                    </p>
                                </div>
                            </div>

                            {/* Quick instruction - 8-bit style */}
                            <motion.div 
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-center"
                            >
                                <p className="text-white text-sm font-bold" style={{ fontFamily: 'monospace' }}>
                                    👆 TAP ANYWHERE 👆
                                </p>
                            </motion.div>
                        </div>
                    )}

                    {/* Game Over - 8-bit style */}
                    {gameOver && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/95 flex items-center justify-center"
                        >
                            <div className="text-center space-y-6 px-4">
                                {/* 8-bit explosion */}
                                <motion.svg 
                                    width="100" 
                                    height="100" 
                                    viewBox="0 0 64 64"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, repeat: 2 }}
                                    style={{ imageRendering: 'pixelated' }}
                                    className="mx-auto"
                                >
                                    <circle cx="32" cy="32" r="20" fill="#FF4500"/>
                                    <circle cx="32" cy="32" r="14" fill="#FFD700"/>
                                    <polygon points="32,12 34,20 32,18" fill="#FFA500"/>
                                    <polygon points="52,32 44,34 46,32" fill="#FFA500"/>
                                    <polygon points="32,52 30,44 32,46" fill="#FFA500"/>
                                    <polygon points="12,32 20,30 18,32" fill="#FFA500"/>
                                </motion.svg>
                                
                                <h2 className="text-5xl font-black text-red-400" style={{ 
                                    fontFamily: 'monospace',
                                    textShadow: '4px 4px 0px rgba(0,0,0,0.5)'
                                }}>
                                    OH NO!
                                </h2>
                                
                                <div className="bg-black border-4 border-cyan-500 p-4 space-y-2" style={{ boxShadow: '4px 4px 0px #000' }}>
                                    <p className="text-white text-2xl font-black font-mono">
                                        SAVED: {score} ♾️❤️
                                    </p>
                                    {score === highScore && score > 0 && (
                                        <motion.p 
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                            className="text-yellow-400 text-lg font-black font-mono"
                                        >
                                            🏆 NEW RECORD!
                                        </motion.p>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <div className="bg-yellow-500 border-2 border-yellow-400 px-2 py-1 flex items-center gap-1">
                                            <span className="text-sm">⭐</span>
                                            <span className="text-black text-sm font-black font-mono">{stars}</span>
                                        </div>
                                        <div className="bg-green-500 border-2 border-green-400 px-2 py-1 flex items-center gap-1">
                                            <span className="text-black text-[9px] font-black font-mono">+{Math.round(inGameP51)}</span>
                                        </div>
                                    </div>
                                    <p className="text-pink-400 text-[9px] font-mono">
                                        Real Earth: {Math.round(p51Balance)} P51
                                    </p>
                                </div>
                                
                                <div className="flex gap-3 justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={resetGame}
                                        className="bg-gradient-to-b from-orange-500 to-orange-700 text-white font-black px-8 py-4 rounded-xl text-xl border-4 border-orange-400"
                                        style={{ 
                                            fontFamily: 'monospace',
                                            boxShadow: '0 6px 0 rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        ▶ PLAY AGAIN
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
                                        className="bg-gradient-to-b from-cyan-500 to-cyan-700 text-white font-black px-6 py-4 rounded-xl text-xl border-4 border-cyan-400"
                                        style={{ 
                                            fontFamily: 'monospace',
                                            boxShadow: '0 6px 0 rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        📤
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    {/* New Character Unlock - 8-bit celebration */}
                    {showUnlock && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/95 flex items-center justify-center z-20"
                            onClick={(e) => { e.stopPropagation(); setShowUnlock(false); }}
                        >
                            <div className="text-center space-y-6 px-6">
                                {/* Confetti pixels */}
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-3 h-3 rounded-sm"
                                        style={{
                                            left: `${30 + Math.random() * 40}%`,
                                            top: `${20 + Math.random() * 40}%`,
                                            backgroundColor: ['#FFD700', '#FF69B4', '#00FFFF', '#00FF00'][i % 4],
                                            imageRendering: 'pixelated'
                                        }}
                                        animate={{
                                            y: [0, 200],
                                            rotate: [0, 360],
                                            opacity: [1, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.1
                                        }}
                                    />
                                ))}
                                
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 0.5, repeat: 3 }}
                                >
                                    <VolckanoPlayer type={showUnlock.type} size={140} />
                                </motion.div>
                                
                                <div className="bg-gradient-to-b from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-2xl border-4 border-yellow-400" style={{
                                    boxShadow: '0 6px 0 rgba(0,0,0,0.3)'
                                }}>
                                    <h2 className="text-4xl font-black" style={{ 
                                        fontFamily: 'monospace',
                                        textShadow: '3px 3px 0px rgba(0,0,0,0.3)'
                                    }}>
                                        UNLOCKED!
                                    </h2>
                                    <p className="text-2xl font-bold mt-1" style={{ fontFamily: 'monospace' }}>
                                        {showUnlock.name}
                                    </p>
                                </div>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); setShowUnlock(false); }}
                                    className="bg-gradient-to-b from-green-500 to-green-700 text-white font-black px-10 py-5 rounded-xl text-2xl border-4 border-green-400"
                                    style={{ 
                                        fontFamily: 'monospace',
                                        boxShadow: '0 6px 0 rgba(0,0,0,0.3)'
                                    }}
                                >
                                    ✨ COOL!
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Footer - 8-bit love */}
            {!gameStarted && !gameOver && (
                <div className="absolute bottom-6 left-0 right-0">
                    <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-pink-500 rounded-sm"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ))}
                    </div>
                    <p className="text-white text-sm font-black text-center" style={{ 
                        fontFamily: 'monospace',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
                    }}>
                        Made with ♾️❤️ for GERGIE7
                    </p>
                </div>
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