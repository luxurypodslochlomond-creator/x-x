import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart } from 'lucide-react';

/**
 * VOLCKANO - Gergie7's Game
 * TAP to jump over lava rocks • Save the people • Beat your high score
 * Simple, smooth, addictive - like Flappy Bird but COOLASFUCK
 * Made with ♾️❤️ for GERGIE7
 */

export default function Volckano() {
    const [playerName, setPlayerName] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [playerY, setPlayerY] = useState(200);
    const [velocity, setVelocity] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const gameLoop = useRef(null);
    const lastTime = useRef(Date.now());

    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        const savedHS = localStorage.getItem('volckano_highscore');
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
        if (savedHS) setHighScore(parseInt(savedHS));
    }, []);

    const jump = () => {
        if (gameOver) {
            resetGame();
            return;
        }
        if (!gameStarted) {
            setGameStarted(true);
            return;
        }
        setVelocity(-12);
    };

    const resetGame = () => {
        setGameOver(false);
        setGameStarted(false);
        setScore(0);
        setPlayerY(200);
        setVelocity(0);
        setObstacles([]);
    };

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        gameLoop.current = setInterval(() => {
            const now = Date.now();
            const delta = (now - lastTime.current) / 16.67; // 60fps normalized
            lastTime.current = now;

            // Physics
            setVelocity(v => v + 0.6 * delta);
            setPlayerY(y => {
                const newY = y + velocity * delta;
                if (newY < 0) return 0;
                if (newY > 450) {
                    setGameOver(true);
                    return 450;
                }
                return newY;
            });

            // Move obstacles
            setObstacles(prev => {
                const updated = prev
                    .map(obs => ({ ...obs, x: obs.x - 4 * delta }))
                    .filter(obs => obs.x > -60);

                // Spawn new obstacle
                if (updated.length === 0 || updated[updated.length - 1].x < 250) {
                    updated.push({
                        x: 400,
                        y: Math.random() > 0.5 ? 0 : 350,
                        height: 80 + Math.random() * 60
                    });
                }

                return updated;
            });

            // Collision detection
            setObstacles(prev => {
                const hit = prev.some(obs => {
                    if (obs.x > 50 && obs.x < 110) {
                        if (obs.y === 0) {
                            return playerY < obs.height;
                        } else {
                            return playerY + 50 > obs.y;
                        }
                    }
                    return false;
                });
                
                if (hit) setGameOver(true);
                return prev;
            });

            // Score
            setScore(s => s + 1);
        }, 16.67);

        return () => clearInterval(gameLoop.current);
    }, [gameStarted, gameOver, velocity, playerY]);

    useEffect(() => {
        if (gameOver && score > highScore) {
            setHighScore(score);
            localStorage.setItem('volckano_highscore', score.toString());
        }
    }, [gameOver, score, highScore]);

    if (showLogin) {
        return (
            <div className="h-screen w-screen relative overflow-hidden">
                <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/870b0a855_IMG_6227.png"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Volcano"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="relative z-10 h-full flex items-center justify-center px-6">
                    <div className="w-full max-w-sm space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-7xl font-black text-white mb-2" style={{ 
                                textShadow: '4px 4px 0 #FF4500, 8px 8px 20px #000',
                                fontFamily: 'Impact, sans-serif'
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
            className="h-screen w-screen bg-gradient-to-b from-orange-900 via-red-900 to-black overflow-hidden select-none"
            onClick={jump}
            onTouchStart={(e) => { e.preventDefault(); jump(); }}
        >
            {/* Sky/background */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-red-500 to-orange-900" />
            
            {/* Game container */}
            <div className="relative h-full max-w-md mx-auto flex items-center justify-center">
                <div className="relative w-full h-[500px] bg-black/20 border-4 border-orange-500 rounded-xl overflow-hidden">
                    
                    {/* Player */}
                    <motion.div
                        className="absolute left-[80px] w-[50px] h-[50px] flex items-center justify-center text-4xl"
                        style={{ top: `${playerY}px` }}
                        animate={{ rotate: velocity > 0 ? 20 : -20 }}
                        transition={{ duration: 0.1 }}
                    >
                        😊
                    </motion.div>

                    {/* Obstacles (lava rocks) */}
                    {obstacles.map((obs, i) => (
                        <div
                            key={i}
                            className="absolute w-[60px] bg-gradient-to-b from-red-600 to-orange-800 border-4 border-red-900 rounded"
                            style={{
                                left: `${obs.x}px`,
                                top: obs.y === 0 ? '0px' : `${obs.y}px`,
                                height: `${obs.height}px`
                            }}
                        >
                            <div className="text-center text-2xl mt-2">
                                {obs.y === 0 ? '🌋' : '🔥'}
                            </div>
                        </div>
                    ))}

                    {/* Ground */}
                    <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-b from-orange-700 to-red-900 border-t-4 border-orange-600" />

                    {/* Score */}
                    <div className="absolute top-4 left-4 bg-black/60 border-2 border-orange-500 rounded-lg px-4 py-2">
                        <p className="text-white font-black text-2xl">{Math.floor(score / 10)}</p>
                    </div>

                    {/* High score */}
                    <div className="absolute top-4 right-4 bg-black/60 border-2 border-yellow-500 rounded-lg px-4 py-2">
                        <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <p className="text-yellow-400 font-black text-lg">{Math.floor(highScore / 10)}</p>
                        </div>
                    </div>

                    {/* Game Over */}
                    {gameOver && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/80 flex items-center justify-center"
                        >
                            <div className="text-center space-y-4">
                                <p className="text-6xl">💥</p>
                                <h2 className="text-4xl font-black text-red-400">BOOM!</h2>
                                <p className="text-white text-xl font-bold">Score: {Math.floor(score / 10)}</p>
                                {score > highScore && (
                                    <p className="text-yellow-400 text-lg font-bold">🏆 NEW HIGH SCORE! 🏆</p>
                                )}
                                <button
                                    onClick={resetGame}
                                    className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-4 rounded-xl text-xl border-b-4 border-orange-900 mt-4"
                                >
                                    🌋 TRY AGAIN
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Start prompt */}
                    {!gameStarted && !gameOver && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="bg-black/80 border-4 border-orange-500 rounded-xl p-6 text-center">
                                <p className="text-white text-2xl font-black mb-2">TAP TO START</p>
                                <p className="text-orange-300 text-sm">Keep tapping to dodge lava!</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Footer hint */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white text-sm font-bold">
                    Made with ♾️❤️ by BRO51 for GERGIE7
                </p>
            </div>
        </div>
    );
}