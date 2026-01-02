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
    const [showShare, setShowShare] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    
    const playerY = useRef(200);
    const velocity = useRef(0);
    const obstacles = useRef([]);
    const people = useRef([]);
    const gameTime = useRef(0);
    const [, forceUpdate] = useState(0);

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
        if (gameOver) {
            resetGame();
            return;
        }
        if (!gameStarted) {
            startGame();
            return;
        }
        velocity.current = -6;
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
        
        for (let i = 0; i < 5; i++) {
            people.current.push({
                x: 450 + (i * 150),
                y: 350,
                saved: false
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

            // GENTLE PHYSICS
            velocity.current += 0.35;
            playerY.current += velocity.current;

            if (playerY.current < 0) {
                playerY.current = 0;
                velocity.current = 0;
            }
            if (playerY.current > 420) {
                setGameOver(true);
                playSound(200, 300);
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

            // PEOPLE
            people.current.forEach(p => {
                if (!p.saved && p.x > 40 && p.x < 100 && Math.abs(p.y - playerY.current) < 60) {
                    p.saved = true;
                    setScore(s => s + 1);
                    playSound(528, 150);
                }
                p.x -= 2;
            });

            forceUpdate(v => v + 1);
        }, 20);

        return () => clearInterval(interval);
    }, [gameStarted, gameOver, soundEnabled]);

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
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2" style={{ 
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
                <div className="relative w-[400px] h-[500px] bg-black/60 border-4 border-orange-500 rounded-xl overflow-hidden">
                    
                    {/* Player */}
                    <div
                        className="absolute left-[70px] w-[50px] h-[50px] text-4xl flex items-center justify-center transition-transform duration-75"
                        style={{ top: `${playerY.current}px`, transform: `rotate(${velocity.current > 0 ? 15 : -15}deg)` }}
                    >
                        {score > 0 ? '😇' : '😊'}
                    </div>

                    {/* People */}
                    {people.current.map((person, i) => !person.saved && person.x > -50 && (
                        <div
                            key={i}
                            className="absolute w-[40px] h-[40px] text-3xl flex items-center justify-center"
                            style={{ left: `${person.x}px`, top: `${person.y}px` }}
                        >
                            🧑
                        </div>
                    ))}

                    {/* Obstacles */}
                    {obstacles.current.map((obs, i) => (
                        <div
                            key={i}
                            className="absolute w-[50px] bg-gradient-to-b from-red-600 to-orange-800 border-4 border-red-900 rounded flex items-center justify-center text-2xl"
                            style={{
                                left: `${obs.x}px`,
                                top: `${obs.y}px`,
                                height: `${obs.h}px`
                            }}
                        >
                            {obs.y === 0 ? '🌋' : '🔥'}
                        </div>
                    ))}

                    {/* Ground */}
                    <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-b from-orange-700 to-red-900 border-t-4 border-orange-600" />

                    {/* HUD */}
                    <div className="absolute top-3 left-3 right-3 bg-black/70 border-2 border-cyan-500 rounded-lg px-3 py-2 flex items-center justify-between">
                        <div>
                            <p className="text-white text-sm font-black">SAVED: {score}</p>
                            {gameTime.current < 3000 && gameStarted && (
                                <p className="text-amber-400 text-xs font-bold animate-pulse">GET READY!</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
                                className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded"
                            >
                                <Users className="w-4 h-4 text-cyan-400" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                                className="text-xl"
                            >
                                {soundEnabled ? '🔊' : '🔇'}
                            </button>
                        </div>
                    </div>

                    {/* Start */}
                    {!gameStarted && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-4xl font-black text-cyan-400 mb-2">TAP TO PLAY</p>
                                <p className="text-sm text-gray-300">Dodge lava • Save people</p>
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
                            <div className="text-center space-y-4">
                                <p className="text-6xl">💥</p>
                                <h2 className="text-4xl font-black text-red-400">CRASH!</h2>
                                <p className="text-white text-xl font-bold">You saved {score} people</p>
                                <button
                                    onClick={resetGame}
                                    className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-4 rounded-xl text-xl border-b-4 border-orange-900 mt-4"
                                >
                                    🌋 TRY AGAIN
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 text-center">
                <p className="text-white text-xs font-bold">Made with ♾️❤️ for GERGIE7</p>
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