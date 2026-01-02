import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Save, Play, Pause } from 'lucide-react';

/**
 * VOLCKANO - Gergie7's Game
 * Simple 8-bit game: Build shelters, protect people from eruptions
 * Made with ♾️❤️ by BRO51 for GERGIE7
 */

const BLOCKS = [
    { type: 'WALL', emoji: '🧱', color: '#8B4513' },
    { type: 'ROOF', emoji: '🏠', color: '#DC143C' },
    { type: 'GLASS', emoji: '🪟', color: '#87CEEB' },
    { type: 'DOOR', emoji: '🚪', color: '#8B4513' },
];

export default function Volckano() {
    const [playerName, setPlayerName] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [grid, setGrid] = useState(Array(15).fill(null).map(() => Array(20).fill(null)));
    const [selectedBlock, setSelectedBlock] = useState('WALL');
    const [people, setPeople] = useState([{ x: 10, y: 13, safe: true }]);
    const [erupting, setErupting] = useState(false);
    const [lava, setLava] = useState([]);
    const [score, setScore] = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const cellSize = Math.min(canvas.width / 20, canvas.height / 15);

        // Clear
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw ground
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 14 * cellSize, canvas.width, cellSize);

        // Draw grid
        grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    const block = BLOCKS.find(b => b.type === cell);
                    ctx.fillStyle = block.color;
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    
                    // Black outline
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    
                    // Emoji
                    ctx.font = `${cellSize * 0.6}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(block.emoji, x * cellSize + cellSize/2, y * cellSize + cellSize/2);
                }
            });
        });

        // Draw people
        people.forEach(person => {
            ctx.font = `${cellSize * 0.8}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(person.safe ? '😊' : '😰', person.x * cellSize + cellSize/2, person.y * cellSize + cellSize/2);
        });

        // Draw lava
        lava.forEach(drop => {
            ctx.fillStyle = '#FF4500';
            ctx.fillRect(drop.x * cellSize, drop.y * cellSize, cellSize, cellSize);
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 2;
            ctx.strokeRect(drop.x * cellSize, drop.y * cellSize, cellSize, cellSize);
        });
    }, [grid, people, lava]);

    const handleTap = (e) => {
        if (!canvasRef.current || erupting) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const cellSize = Math.min(canvas.width / 20, canvas.height / 15);
        
        const x = Math.floor((e.clientX - rect.left) / cellSize);
        const y = Math.floor((e.clientY - rect.top) / cellSize);
        
        if (x >= 0 && x < 20 && y >= 0 && y < 14) {
            const newGrid = [...grid];
            newGrid[y][x] = newGrid[y][x] ? null : selectedBlock;
            setGrid(newGrid);
        }
    };

    const startEruption = () => {
        setErupting(true);
        setLava([]);
        
        const interval = setInterval(() => {
            setLava(prev => {
                const newLava = prev.map(drop => ({ ...drop, y: drop.y + 1 }))
                    .filter(drop => drop.y < 15);
                
                if (Math.random() > 0.7) {
                    newLava.push({ x: Math.floor(Math.random() * 20), y: 0 });
                }
                
                return newLava;
            });
        }, 300);

        setTimeout(() => {
            clearInterval(interval);
            setErupting(false);
            checkSafety();
        }, 5000);
    };

    const checkSafety = () => {
        const newPeople = people.map(person => {
            const hasRoof = grid[person.y - 1]?.[person.x];
            const hasWalls = grid[person.y]?.[person.x - 1] && grid[person.y]?.[person.x + 1];
            return { ...person, safe: !!(hasRoof && hasWalls) };
        });
        
        const savedCount = newPeople.filter(p => p.safe).length;
        setScore(score + savedCount * 10);
        setPeople(newPeople);
    };

    const saveWorld = () => {
        localStorage.setItem('volckano_world', JSON.stringify({ grid, people, score }));
        alert('🌋 Saved!');
    };

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
                            <h1 className="text-6xl font-black text-white mb-2" style={{ 
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
        <div className="h-screen w-screen bg-gradient-to-b from-orange-900 via-red-900 to-black flex flex-col p-2 sm:p-4">
            
            {/* Header */}
            <div className="bg-black/80 border-4 border-orange-500 rounded-xl p-3 mb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-orange-400">VOLCKANO</h1>
                        <p className="text-white text-sm">Score: {score} 🌋</p>
                    </div>
                    <button
                        onClick={saveWorld}
                        className="bg-green-600 hover:bg-green-700 text-white font-black px-6 py-3 rounded-lg border-2 border-green-800"
                    >
                        <Save className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-black/60 border-4 border-orange-500 rounded-xl overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full h-full cursor-pointer"
                    onClick={handleTap}
                />
            </div>

            {/* Controls */}
            <div className="bg-black/80 border-4 border-orange-500 rounded-xl p-3 mt-2">
                <div className="grid grid-cols-5 gap-2 mb-2">
                    {BLOCKS.map(block => (
                        <button
                            key={block.type}
                            onClick={() => setSelectedBlock(block.type)}
                            className={`aspect-square rounded-lg border-4 text-4xl flex items-center justify-center transition-all ${
                                selectedBlock === block.type 
                                    ? 'border-white bg-orange-600 scale-110' 
                                    : 'border-gray-600 bg-gray-800 hover:border-gray-400'
                            }`}
                        >
                            {block.emoji}
                        </button>
                    ))}
                    
                    <button
                        onClick={startEruption}
                        disabled={erupting}
                        className="aspect-square rounded-lg border-4 border-red-600 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-4xl flex items-center justify-center"
                    >
                        🌋
                    </button>
                </div>
                
                <p className="text-white text-center text-xs font-bold">
                    TAP blocks to build shelters • Tap 🌋 to start eruption!
                </p>
            </div>
        </div>
    );
}