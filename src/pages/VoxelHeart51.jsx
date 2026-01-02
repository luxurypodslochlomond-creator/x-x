import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Save, Heart, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * VOXELHEART51 - FREE MINECRAFT-STYLE GAME FOR KIDS
 * 
 * Made for Georgie7 and her friends ❤️
 * - 100% offline (saves to localStorage)
 * - FREE FOREVER
 * - Place/destroy blocks
 * - Build anything you imagine
 * - Healing frequencies while you play
 * - No ads, no purchases, pure creation
 * 
 * "VALCKANO" - Never change Georgie7 ❤️⚡️
 */

const BLOCK_TYPES = {
    GRASS: { color: 0x7cb342, name: 'Grass' },
    DIRT: { color: 0x8d6e63, name: 'Dirt' },
    STONE: { color: 0x757575, name: 'Stone' },
    WOOD: { color: 0x6d4c41, name: 'Wood' },
    LAVA: { color: 0xff5722, name: 'Lava', glow: true },
    WATER: { color: 0x2196f3, name: 'Water', transparent: true },
    GOLD: { color: 0xffc107, name: 'Gold', glow: true },
    HEART: { color: 0xec4899, name: 'Heart', glow: true }
};

export default function VoxelHeart51() {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const blocksRef = useRef(new Map());
    const [selectedBlock, setSelectedBlock] = useState('GRASS');
    const [isPlaying, setIsPlaying] = useState(true);
    const [showHelp, setShowHelp] = useState(true);
    const [playMusic, setPlayMusic] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);
    const audioContextRef = useRef(null);

    // Initialize Three.js scene
    useEffect(() => {
        if (!mountRef.current || showNameInput) return;

        // Scene setup with realistic sky
        const scene = new THREE.Scene();
        
        // Gradient sky background (sunrise/sunset vibes)
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#ff6b35'); // Orange top
        gradient.addColorStop(0.5, '#f7b733'); // Yellow middle
        gradient.addColorStop(1, '#4facfe'); // Blue bottom
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        const skyTexture = new THREE.CanvasTexture(canvas);
        scene.background = skyTexture;
        scene.fog = new THREE.Fog(0xf7b733, 30, 150);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(10, 15, 10);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer with realistic settings
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Realistic lighting
        const ambientLight = new THREE.AmbientLight(0xffa366, 0.4); // Warm ambient
        scene.add(ambientLight);

        // Main sun (dramatic angle)
        const sunLight = new THREE.DirectionalLight(0xffcc66, 1.2);
        sunLight.position.set(100, 80, 50);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.left = -100;
        sunLight.shadow.camera.right = 100;
        sunLight.shadow.camera.top = 100;
        sunLight.shadow.camera.bottom = -100;
        sunLight.shadow.bias = -0.0001;
        scene.add(sunLight);

        // Fill light (softer, opposite side)
        const fillLight = new THREE.DirectionalLight(0x66ccff, 0.3);
        fillLight.position.set(-50, 30, -50);
        scene.add(fillLight);

        // Rim light (dramatic edge lighting)
        const rimLight = new THREE.DirectionalLight(0xff6b35, 0.5);
        rimLight.position.set(0, 50, -100);
        scene.add(rimLight);

        // Ground plane (initial blocks)
        const groundSize = 20;
        for (let x = -groundSize / 2; x < groundSize / 2; x++) {
            for (let z = -groundSize / 2; z < groundSize / 2; z++) {
                addBlock(x, 0, z, 'GRASS');
            }
        }

        // Load saved world
        loadWorld();

        // Mouse controls
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let isRotating = false;
        let previousMouseX = 0;
        let previousMouseY = 0;

        const onMouseDown = (event) => {
            if (event.button === 2) { // Right click
                isRotating = true;
                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        };

        const onMouseMove = (event) => {
            if (isRotating) {
                const deltaX = event.clientX - previousMouseX;
                const deltaY = event.clientY - previousMouseY;
                
                camera.position.x += deltaX * 0.05;
                camera.position.z += deltaY * 0.05;
                camera.lookAt(0, 0, 0);

                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        };

        const onMouseUp = () => {
            isRotating = false;
        };

        const onClick = (event) => {
            if (isRotating) return;

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            
            const allBlocks = Array.from(blocksRef.current.values());
            const intersects = raycaster.intersectObjects(allBlocks);

            if (intersects.length > 0) {
                const intersect = intersects[0];
                
                if (event.shiftKey) {
                    // Remove block
                    const block = intersect.object;
                    const key = `${Math.round(block.position.x)},${Math.round(block.position.y)},${Math.round(block.position.z)}`;
                    scene.remove(block);
                    blocksRef.current.delete(key);
                } else {
                    // Add block
                    const normal = intersect.face.normal;
                    const pos = intersect.object.position.clone();
                    pos.add(normal);
                    addBlock(Math.round(pos.x), Math.round(pos.y), Math.round(pos.z), selectedBlock);
                }
            }
        };

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('click', onClick);
        renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

        // Zoom with mouse wheel
        const onWheel = (event) => {
            event.preventDefault();
            const zoomSpeed = 0.1;
            const direction = camera.position.clone().normalize();
            if (event.deltaY < 0) {
                camera.position.sub(direction.multiplyScalar(zoomSpeed));
            } else {
                camera.position.add(direction.multiplyScalar(zoomSpeed));
            }
        };
        renderer.domElement.addEventListener('wheel', onWheel);

        // Animation loop with dynamic lighting
        let animationId;
        const animate = () => {
            if (!isPlaying) return;
            animationId = requestAnimationFrame(animate);
            
            // Rotate camera slowly and smoothly
            const time = Date.now() * 0.00005;
            camera.position.x = Math.cos(time) * 35;
            camera.position.z = Math.sin(time) * 35;
            camera.position.y = 20 + Math.sin(time * 0.5) * 5; // Gentle up/down
            camera.lookAt(0, 3, 0);

            // Animate sun position (day/night cycle feel)
            sunLight.position.x = Math.cos(time * 0.3) * 100;
            sunLight.position.z = Math.sin(time * 0.3) * 100;

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
            renderer.domElement.removeEventListener('click', onClick);
            renderer.domElement.removeEventListener('wheel', onWheel);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [isPlaying, selectedBlock, showNameInput]);

    // Healing frequency audio
    useEffect(() => {
        if (!playMusic) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        // 432Hz healing frequency (gentle background)
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(432, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();

        return () => {
            oscillator.stop();
            audioContext.close();
        };
    }, [playMusic]);

    const addBlock = (x, y, z, type) => {
        if (!sceneRef.current) return;

        const key = `${x},${y},${z}`;
        if (blocksRef.current.has(key)) return;

        const blockType = BLOCK_TYPES[type];
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        // More realistic materials
        const material = new THREE.MeshStandardMaterial({ 
            color: blockType.color,
            transparent: blockType.transparent || false,
            opacity: blockType.transparent ? 0.7 : 1,
            roughness: 0.8,
            metalness: type === 'GOLD' ? 0.7 : 0.2,
            emissive: blockType.glow ? blockType.color : 0x000000,
            emissiveIntensity: blockType.glow ? 0.3 : 0
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Add ambient occlusion effect (darker edges)
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
            color: 0x000000, 
            opacity: 0.2, 
            transparent: true 
        }));
        mesh.add(line);

        if (blockType.glow) {
            // Brighter glow lights
            const light = new THREE.PointLight(blockType.color, 1.5, 8);
            light.position.copy(mesh.position);
            light.castShadow = true;
            sceneRef.current.add(light);
        }

        sceneRef.current.add(mesh);
        blocksRef.current.set(key, mesh);
    };

    const saveWorld = () => {
        const worldData = Array.from(blocksRef.current.entries()).map(([key, mesh]) => {
            const [x, y, z] = key.split(',').map(Number);
            const type = Object.keys(BLOCK_TYPES).find(
                k => BLOCK_TYPES[k].color === mesh.material.color.getHex()
            );
            return { x, y, z, type };
        });
        localStorage.setItem('voxelheart51_world', JSON.stringify(worldData));
        localStorage.setItem('voxelheart51_player', playerName);
        alert(`${playerName}'s world saved! ❤️`);
    };

    const loadWorld = () => {
        const savedWorld = localStorage.getItem('voxelheart51_world');
        const savedPlayer = localStorage.getItem('voxelheart51_player');
        
        if (savedPlayer) {
            setPlayerName(savedPlayer);
            setShowNameInput(false);
        }

        if (savedWorld) {
            const worldData = JSON.parse(savedWorld);
            worldData.forEach(({ x, y, z, type }) => {
                addBlock(x, y, z, type);
            });
        }
    };

    const clearWorld = () => {
        if (!confirm('Clear everything and start fresh?')) return;
        
        blocksRef.current.forEach(mesh => {
            sceneRef.current.remove(mesh);
        });
        blocksRef.current.clear();
        localStorage.removeItem('voxelheart51_world');
        
        // Rebuild ground
        const groundSize = 20;
        for (let x = -groundSize / 2; x < groundSize / 2; x++) {
            for (let z = -groundSize / 2; z < groundSize / 2; z++) {
                addBlock(x, 0, z, 'GRASS');
            }
        }
    };

    if (showNameInput) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Pixel clouds floating */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-20 bg-white" style={{ clipPath: 'polygon(0 50%, 25% 50%, 25% 25%, 50% 25%, 50% 0, 75% 0, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0 75%)' }} />
                    <div className="absolute top-40 right-20 w-40 h-24 bg-white" style={{ clipPath: 'polygon(0 50%, 25% 50%, 25% 25%, 50% 25%, 50% 0, 75% 0, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0 75%)' }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-b from-orange-500 to-red-600 border-8 border-yellow-400 p-8 max-w-md relative"
                    style={{ boxShadow: '0 0 60px rgba(251, 191, 36, 0.8), inset 0 0 40px rgba(0,0,0,0.3)' }}
                >
                    {/* Blocky lava heart */}
                    <div className="relative mb-6">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="mx-auto w-32 h-32 relative"
                        >
                            {/* Pixel heart in lava colors */}
                            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
                                {[
                                    [0,0,1,1,0,1,1,0],
                                    [0,1,1,1,1,1,1,1],
                                    [1,1,1,1,1,1,1,1],
                                    [1,1,1,1,1,1,1,1],
                                    [1,1,1,1,1,1,1,1],
                                    [0,1,1,1,1,1,1,0],
                                    [0,0,1,1,1,1,0,0],
                                    [0,0,0,1,1,0,0,0]
                                ].map((row, i) => row.map((cell, j) => 
                                    cell ? <div key={`${i}-${j}`} className="bg-red-600 border border-orange-400" style={{ boxShadow: '0 0 8px rgba(251, 146, 60, 0.8)' }} /> : <div key={`${i}-${j}`} />
                                ))}
                            </div>
                        </motion.div>
                        {/* Lightning bolt through heart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 bg-cyan-400 h-24 transform rotate-12" style={{ clipPath: 'polygon(50% 0, 100% 35%, 60% 35%, 75% 100%, 25% 60%, 50% 60%)' }} />
                        </div>
                    </div>

                    <h1 className="text-5xl font-black text-white text-center mb-2" style={{ textShadow: '4px 4px 0 #000, -2px -2px 0 #fbbf24' }}>
                        VOXELHEART51
                    </h1>
                    <p className="text-yellow-300 text-center text-lg font-bold mb-1" style={{ textShadow: '2px 2px 0 #000' }}>
                        ⚡ Build Your VALCKANO! ⚡
                    </p>
                    <p className="text-white text-center text-sm font-bold mb-6" style={{ textShadow: '1px 1px 0 #000' }}>
                        What's your name, builder?
                    </p>
                    
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Type your name..."
                        className="w-full bg-yellow-600 border-4 border-yellow-900 px-4 py-4 text-black text-center text-2xl font-black mb-4 placeholder:text-yellow-800"
                        autoFocus
                    />
                    
                    <Button
                        onClick={() => {
                            if (playerName.trim()) {
                                setShowNameInput(false);
                                localStorage.setItem('voxelheart51_player', playerName);
                            }
                        }}
                        disabled={!playerName.trim()}
                        className="w-full bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 border-4 border-green-900 text-white font-black py-4 text-2xl"
                        style={{ textShadow: '2px 2px 0 #000' }}
                    >
                        🚀 START BUILDING! 🚀
                    </Button>

                    <p className="text-yellow-300 text-xs text-center mt-4 font-bold" style={{ textShadow: '1px 1px 0 #000' }}>
                        For Georgie7 + ALL her friends ❤️⚡
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-black overflow-hidden relative">
            {/* 3D Canvas */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 pointer-events-none">
                <div className="flex items-start justify-between">
                    {/* Left: Block selector */}
                    <div className="bg-black/80 border-2 border-pink-500 rounded-lg p-3 pointer-events-auto">
                        <p className="text-pink-400 font-bold text-xs mb-2">BLOCKS:</p>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.entries(BLOCK_TYPES).map(([key, block]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedBlock(key)}
                                    className={`w-12 h-12 rounded border-2 transition-all ${
                                        selectedBlock === key
                                            ? 'border-white scale-110'
                                            : 'border-gray-600 hover:border-gray-400'
                                    }`}
                                    style={{ backgroundColor: `#${block.color.toString(16).padStart(6, '0')}` }}
                                    title={block.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Controls */}
                    <div className="bg-black/80 border-2 border-cyan-500 rounded-lg p-3 pointer-events-auto space-y-2">
                        <p className="text-cyan-400 font-bold text-xs mb-2">{playerName.toUpperCase()}</p>
                        <Button onClick={() => setIsPlaying(!isPlaying)} size="sm" className="w-full">
                            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                            {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                        <Button onClick={saveWorld} size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button onClick={clearWorld} size="sm" className="w-full bg-red-600 hover:bg-red-700">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Clear
                        </Button>
                        <Button onClick={() => setPlayMusic(!playMusic)} size="sm" className="w-full">
                            {playMusic ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                            {playMusic ? 'Music On' : 'Music Off'}
                        </Button>
                        <Button onClick={() => setShowHelp(!showHelp)} size="sm" className="w-full">
                            <Info className="w-4 h-4 mr-2" />
                            Help
                        </Button>
                    </div>
                </div>
            </div>

            {/* Help Panel */}
            <AnimatePresence>
                {showHelp && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-4 left-4 bg-black/90 border-2 border-purple-500 rounded-lg p-4 max-w-sm pointer-events-auto"
                    >
                        <h3 className="text-purple-400 font-bold mb-2">HOW TO PLAY:</h3>
                        <ul className="text-gray-300 text-sm space-y-1">
                            <li>• <strong>Click</strong> on a block to place your selected block</li>
                            <li>• <strong>Shift + Click</strong> to remove a block</li>
                            <li>• <strong>Right Click + Drag</strong> to rotate camera</li>
                            <li>• <strong>Mouse Wheel</strong> to zoom in/out</li>
                            <li>• Build anything! Castles, VALCKANOS, hearts ❤️</li>
                        </ul>
                        <p className="text-pink-400 text-xs mt-3 font-bold">
                            Made for Georgie7 and her friends ❤️⚡️
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="absolute bottom-4 right-4 bg-black/80 border-2 border-pink-500 rounded-lg px-4 py-2 pointer-events-none">
                <p className="text-pink-400 text-xs font-bold">
                    FREE FOREVER • 100% OFFLINE • MADE WITH ❤️
                </p>
            </div>
        </div>
    );
}