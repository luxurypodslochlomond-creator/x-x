import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import VolckanoShare from '../components/volckano/VolckanoShare';

/**
 * VOLCKANO - Gergie7's Game
 * SIMPLE + RELIABLE - No quantum BS, just works
 * Made with ♾️❤️ for GERGIE7 and ALL KIDS
 */

export default function Volckano() {
    const [playerName, setPlayerName] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    
    // Game state - simple refs, no bullshit
    const playerY = useRef(250);
    const velocity = useRef(0);
    const gameTime = useRef(0);
    const obstacles = useRef([]);
    const people = useRef([]);
    const score = useRef(0);
    const gameOver = useRef(false);
    
    const canvasRef = useRef(null);
    const animationFrame = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
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
        if (!gameStarted) {
            startGame();
            return;
        }
        if (gameOver.current) {
            resetGame();
            return;
        }
        velocity.current = -7;
        playSound(432, 50);
    };

    const startGame = () => {
        setGameStarted(true);
        gameOver.current = false;
        score.current = 0;
        gameTime.current = 0;
        playerY.current = 250;
        velocity.current = 0;
        obstacles.current = [];
        people.current = [];
        
        // Spawn initial people
        for (let i = 0; i < 5; i++) {
            people.current.push({
                x: 400 + (i * 120),
                y: 380,
                saved: false
            });
        }
    };

    const resetGame = () => {
        gameOver.current = false;
        setGameStarted(false);
    };

    // SIMPLE GAME LOOP - No bullshit
    useEffect(() => {
        if (!gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let lastTime = Date.now();

        const gameLoop = () => {
            if (gameOver.current) {
                cancelAnimationFrame(animationFrame.current);
                return;
            }

            const now = Date.now();
            const dt = (now - lastTime) / 16.67;
            lastTime = now;

            gameTime.current += 16.67;

            // PHYSICS - SIMPLE
            velocity.current += 0.3 * dt;
            playerY.current += velocity.current * dt;

            // Bounds
            if (playerY.current < 0) {
                playerY.current = 0;
                velocity.current = 0;
            }
            if (playerY.current > 430) {
                gameOver.current = true;
                playSound(200, 300);
                setTimeout(() => setGameStarted(false), 100);
                return;
            }

            // OBSTACLES - Spawn after 3 seconds
            if (gameTime.current > 3000) {
                obstacles.current = obstacles.current
                    .map(o => ({ ...o, x: o.x - 2 * dt }))
                    .filter(o => o.x > -60);

                if (obstacles.current.length === 0 || obstacles.current[obstacles.current.length - 1].x < 200) {
                    obstacles.current.push({
                        x: 400,
                        y: Math.random() > 0.5 ? 0 : 350,
                        h: 60 + Math.random() * 30
                    });
                }
            }

            // COLLISION
            for (const obs of obstacles.current) {
                if (obs.x > 50 && obs.x < 100) {
                    if ((obs.y === 0 && playerY.current < obs.h) || 
                        (obs.y > 0 && playerY.current + 40 > obs.y)) {
                        gameOver.current = true;
                        playSound(200, 300);
                        setTimeout(() => setGameStarted(false), 100);
                        return;
                    }
                }
            }

            // PEOPLE
            people.current = people.current.map(p => {
                if (!p.saved && p.x > 50 && p.x < 100 && Math.abs(p.y - playerY.current) < 50) {
                    playSound(528, 150);
                    score.current++;
                    return { ...p, saved: true };
                }
                return { ...p, x: p.x - 1.5 * dt };
            }).filter(p => p.x > -60);

            // DRAW
            ctx.fillStyle = '#1a0f2a';
            ctx.fillRect(0, 0, 400, 500);

            // Ground
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(0, 450, 400, 50);

            // Player
            ctx.fillStyle = score.current > 0 ? '#4ade80' : '#22d3ee';
            ctx.fillRect(70, playerY.current, 40, 40);
            ctx.fillText('😊', 75, playerY.current + 30);

            // Obstacles
            ctx.fillStyle = '#ef4444';
            obstacles.current.forEach(o => {
                ctx.fillRect(o.x, o.y, 50, o.h);
            });

            // People
            people.current.forEach(p => {
                if (!p.saved) {
                    ctx.fillStyle = '#fbbf24';
                    ctx.fillRect(p.x, p.y, 30, 30);
                }
            });

            // Score
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px monospace';
            ctx.fillText(`SAVED: ${score.current}`, 10, 30);
            
            if (gameTime.current < 3000) {
                ctx.fillStyle = '#fbbf24';
                ctx.fillText('GET READY!', 140, 250);
            }

            animationFrame.current = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => cancelAnimationFrame(animationFrame.current);
    }, [gameStarted, soundEnabled]);

    if (showLogin) {
        return (
            <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-b from-orange-900 to-black">
                <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/870b0a855_IMG_6227.png"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    alt="Volcano"
                />
                
                <div className="relative z-10 h-full flex items-center justify-center px-6">
                    <div className="w-full max-w-sm space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-7xl font-black text-white mb-2" style={{ 
                                textShadow: '4px 4px 0 #FF4500, 8px 8px 20px #000'
                            }}>
                                VOLCKANO
                            </h1>
                            <p className="text-orange-300 font-bold text-lg">by Gergie7 ♾️❤️</p>
                        </motion.div>
                        
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
                            placeholder="Your name..."
                            className="w-full bg-black/60 backdrop-blur-md border-4 border-orange-500 px-6 py-5 text-white text-center text-2xl font-black placeholder:text-orange-200/50 focus:border-orange-400 focus:outline-none transition-all rounded-xl"
                            autoFocus
                        />
                        
                        <button
                            onClick={() => {
                                if (playerName.trim()) {
                                    localStorage.setItem('volckano_player', playerName);
                                    setShowLogin(false);
                                }
                            }}
                            disabled={!playerName.trim()}
                            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-6 text-2xl disabled:opacity-40 transition-all rounded-xl border-b-8 border-orange-900"
                        >
                            🌋 START
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="h-screen w-screen bg-gradient-to-b from-orange-900 via-red-900 to-black overflow-hidden select-none flex items-center justify-center"
            onClick={jump}
            onTouchStart={(e) => { e.preventDefault(); jump(); }}
        >
            <div className="relative">
                {/* Canvas Game */}
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={500}
                    className="border-4 border-orange-500 rounded-xl bg-black"
                />

                {/* Controls Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
                        className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded border-2 border-cyan-500"
                    >
                        <Users className="w-5 h-5 text-cyan-400" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                        className="text-2xl"
                    >
                        {soundEnabled ? '🔊' : '🔇'}
                    </button>
                </div>

                {/* Start Overlay */}
                {!gameStarted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl pointer-events-none"
                    >
                        <div className="text-center text-white">
                            <p className="text-4xl font-black text-cyan-400 mb-2">TAP TO START</p>
                            <p className="text-sm text-gray-400">Tap to fly • Collect people • Dodge lava</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 text-center">
                <p className="text-white text-xs font-bold mb-1">
                    Made with ♾️❤️ for GERGIE7 + ALL KIDS
                </p>
                <p className="text-gray-400 text-[10px]">
                    Simple • Fast • Fun
                </p>
            </div>

            {showShare && (
                <VolckanoShare 
                    playerName={playerName}
                    onClose={() => setShowShare(false)}
                />
            )}
        </div>
    );
}