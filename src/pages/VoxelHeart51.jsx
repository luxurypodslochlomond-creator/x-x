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
    const [playMusic, setPlayMusic] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);
    const audioContextRef = useRef(null);

    // Initialize Three.js scene
    useEffect(() => {
        if (!mountRef.current || showNameInput) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
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

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
        sunLight.position.set(50, 50, 50);
        sunLight.castShadow = true;
        sunLight.shadow.camera.left = -50;
        sunLight.shadow.camera.right = 50;
        sunLight.shadow.camera.top = 50;
        sunLight.shadow.camera.bottom = -50;
        scene.add(sunLight);

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

        // Animation loop
        let animationId;
        const animate = () => {
            if (!isPlaying) return;
            animationId = requestAnimationFrame(animate);
            
            // Rotate camera slowly
            const time = Date.now() * 0.0001;
            camera.position.x = Math.cos(time) * 30;
            camera.position.z = Math.sin(time) * 30;
            camera.lookAt(0, 5, 0);

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
        const material = new THREE.MeshLambertMaterial({ 
            color: blockType.color,
            transparent: blockType.transparent || false,
            opacity: blockType.transparent ? 0.7 : 1
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (blockType.glow) {
            const light = new THREE.PointLight(blockType.color, 0.5, 5);
            light.position.copy(mesh.position);
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
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black/80 border-4 border-pink-500 rounded-2xl p-8 max-w-md"
                >
                    <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-center mb-4">
                        VOXELHEART51
                    </h1>
                    <p className="text-gray-300 text-center mb-6">
                        What's your name, builder? ❤️
                    </p>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Type your name..."
                        className="w-full bg-purple-900/50 border-2 border-pink-500 rounded-lg px-4 py-3 text-white text-center text-xl mb-4"
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
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black py-4 text-xl"
                    >
                        START BUILDING ❤️
                    </Button>
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