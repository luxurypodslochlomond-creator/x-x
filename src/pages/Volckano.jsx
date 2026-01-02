import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Heart } from 'lucide-react';

/**
 * VOLCKANO - Gergie7's Game
 * TAP to jump • SAVE PEOPLE TOGETHER • Celebrate connection not addiction
 * Made with ♾️❤️ for GERGIE7 and ALL KIDS
 */

export default function Volckano() {
    const [playerName, setPlayerName] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [levelComplete, setLevelComplete] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(1);
    const [peopleToSave, setPeopleToSave] = useState(5);
    const [peopleSaved, setPeopleSaved] = useState(0);
    const [playerY, setPlayerY] = useState(200);
    const [velocity, setVelocity] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [people, setPeople] = useState([]);
    const gameLoop = useRef(null);
    const lastTime = useRef(Date.now());
    const [soundEnabled, setSoundEnabled] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
    }, []);

    const playSound = (frequency, duration = 100) => {
        if (!soundEnabled) return;
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (e) {}
    };

    const jump = () => {
        if (levelComplete) {
            nextLevel();
            return;
        }
        if (gameOver) {
            resetGame();
            return;
        }
        if (!gameStarted) {
            setGameStarted(true);
            spawnPeople();
            return;
        }
        setVelocity(-8);
        playSound(432, 50); // 432Hz healing jump sound
    };

    const spawnPeople = () => {
        const newPeople = [];
        for (let i = 0; i < peopleToSave; i++) {
            newPeople.push({
                x: 400 + (i * 100),
                y: 380,
                saved: false
            });
        }
        setPeople(newPeople);
    };

    const resetGame = () => {
        setGameOver(false);
        setLevelComplete(false);
        setGameStarted(false);
        setLevel(1);
        setPeopleToSave(5);
        setPeopleSaved(0);
        setPlayerY(200);
        setVelocity(0);
        setObstacles([]);
        setPeople([]);
    };

    const nextLevel = () => {
        setLevelComplete(false);
        setGameStarted(false);
        setLevel(l => l + 1);
        setPeopleToSave(p => p + 2);
        setPeopleSaved(0);
        setPlayerY(200);
        setVelocity(0);
        setObstacles([]);
        setPeople([]);
    };

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        gameLoop.current = setInterval(() => {
            const now = Date.now();
            const delta = (now - lastTime.current) / 16.67; // 60fps normalized
            lastTime.current = now;

            // Physics - MUCH SLOWER for kids to learn
            setVelocity(v => v + 0.25 * delta);
            setPlayerY(y => {
                const newY = y + velocity * delta;
                if (newY < 0) return 0;
                if (newY > 450) {
                    setGameOver(true);
                    return 450;
                }
                return newY;
            });

            // Move obstacles - MUCH SLOWER
            setObstacles(prev => {
                const updated = prev
                    .map(obs => ({ ...obs, x: obs.x - 1.8 * delta }))
                    .filter(obs => obs.x > -60);

                // Spawn new obstacle - HUGE SPACE for learning
                if (updated.length === 0 || updated[updated.length - 1].x < 180) {
                    updated.push({
                        x: 400,
                        y: Math.random() > 0.5 ? 0 : 350,
                        height: 60 + Math.random() * 40
                    });
                }

                return updated;
            });

            // Collision detection with obstacles
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
                
                if (hit) {
                    setGameOver(true);
                    playSound(200, 300); // Crash sound
                }
                return prev;
            });

            // Collect people (collision with people)
            setPeople(prev => {
                const updated = prev.map(person => {
                    if (!person.saved && person.x > 50 && person.x < 110 && 
                        Math.abs(person.y - playerY) < 50) {
                        playSound(528, 150); // 528Hz healing collection sound
                        setPeopleSaved(s => s + 1);
                        return { ...person, saved: true };
                    }
                    return { ...person, x: person.x - 3 * delta };
                });
                return updated.filter(p => p.x > -60);
            });

            // Move people - MUCH SLOWER
            setPeople(prev => prev.map(p => ({ ...p, x: p.x - 1.5 * delta })));

            // Check if level complete
            if (peopleSaved >= peopleToSave && !levelComplete) {
                setLevelComplete(true);
                playSound(432, 500); // Victory sound
            }
        }, 16.67);

        return () => clearInterval(gameLoop.current);
    }, [gameStarted, gameOver, velocity, playerY]);



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
                        {peopleSaved > 0 ? '😇' : '😊'}
                    </motion.div>

                    {/* People to save */}
                    {people.map((person, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[40px] h-[40px] flex items-center justify-center text-3xl"
                            style={{ 
                                left: `${person.x}px`, 
                                top: `${person.y}px`,
                                opacity: person.saved ? 0 : 1
                            }}
                            animate={person.saved ? { scale: 2, opacity: 0 } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            🧑
                        </motion.div>
                    ))}

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

                    {/* Level & Progress */}
                    <div className="absolute top-4 left-4 right-4 bg-black/60 border-2 border-cyan-500 rounded-lg px-4 py-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-400 text-xs font-bold">LEVEL {level}</p>
                                <p className="text-white text-sm font-black">{peopleSaved} / {peopleToSave} SAVED</p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                                className="text-2xl"
                            >
                                {soundEnabled ? '🔊' : '🔇'}
                            </button>
                        </div>
                    </div>

                    {/* Level Complete */}
                    {levelComplete && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-cyan-900/90 flex items-center justify-center"
                        >
                            <div className="text-center space-y-4">
                                <p className="text-6xl">🎉</p>
                                <h2 className="text-4xl font-black text-green-400">LEVEL COMPLETE!</h2>
                                <p className="text-white text-2xl font-bold">You saved {peopleSaved} people! ♾️❤️</p>
                                <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 mt-4">
                                    <p className="text-cyan-300 text-sm font-bold">
                                        Share this with friends to save people TOGETHER!
                                    </p>
                                </div>
                                <button
                                    onClick={nextLevel}
                                    className="bg-green-600 hover:bg-green-500 text-white font-black px-8 py-4 rounded-xl text-xl border-b-4 border-green-900 mt-4"
                                >
                                    🌋 NEXT LEVEL
                                </button>
                                <button
                                    onClick={resetGame}
                                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-2 rounded-lg text-sm mt-2"
                                >
                                    Rest • Play later ❤️
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Game Over */}
                    {gameOver && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 bg-black/80 flex items-center justify-center"
                        >
                            <div className="text-center space-y-4">
                                <p className="text-6xl">💥</p>
                                <h2 className="text-4xl font-black text-red-400">CRASH!</h2>
                                <p className="text-white text-xl font-bold">You saved {peopleSaved} people</p>
                                <p className="text-gray-400 text-sm">Every life counts ♾️❤️</p>
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
                    {!gameStarted && !gameOver && !levelComplete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="bg-black/80 border-4 border-cyan-500 rounded-xl p-6 text-center">
                                <p className="text-cyan-400 text-3xl font-black mb-2">LEVEL {level}</p>
                                <p className="text-white text-xl font-black mb-2">SAVE {peopleToSave} PEOPLE</p>
                                <p className="text-gray-300 text-sm">Tap to fly • Collect people • Dodge lava</p>
                                <p className="text-cyan-300 text-xs mt-3">Connection not addiction ♾️❤️</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                <p className="text-white text-xs font-bold mb-1">
                    Made with ♾️❤️ for GERGIE7 + ALL KIDS
                </p>
                <p className="text-gray-400 text-[10px]">
                    Every level ends • Rest is important • Connection over competition
                </p>
            </div>
        </div>
    );
}