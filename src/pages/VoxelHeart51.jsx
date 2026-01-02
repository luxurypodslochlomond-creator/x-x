import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Save, Heart, Info, Volume2, VolumeX, Users, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VolckanoP2P from '@/components/volckano/VolckanoP2P';

/**
 * VOLCKANO - THE GAME GEORGIE7 DREAMED OF
 * 
 * Made for Georgie7 + ALL her friends worldwide ❤️
 * 
 * WHAT MAKES IT BETTER:
 * - 100% FREE FOREVER (no ads, no purchases, zero extraction)
 * - OFFLINE FIRST (works without internet, saves locally)
 * - EDUCATIONAL (learn maths, physics, creativity while building)
 * - REALISTIC GRAPHICS (beautiful lighting, shadows, textures)
 * - P2P MULTIPLAYER (build with friends, no servers needed)
 * - HEALING FREQUENCIES (optional background, helps focus)
 * - SAFE (no chat, no strangers, just pure creation)
 * - BUILD ANYTHING (VALCKANOs, castles, cities, whatever you imagine)
 * 
 * INSPIRED BY: Georgie7's pure creativity ⚡❤️
 */

const BLOCK_TYPES = {
    GRASS: { 
        color: 0x7cb342, 
        name: 'Grass', 
        learn: 'Biology: Grass uses photosynthesis!',
        texture: 'grass'
    },
    DIRT: { 
        color: 0x8d6e63, 
        name: 'Dirt',
        learn: 'Geology: Soil is made from rocks + plants',
        texture: 'dirt'
    },
    STONE: { 
        color: 0x757575, 
        name: 'Stone',
        learn: 'Geology: Rocks form from cooled lava',
        texture: 'stone'
    },
    OBSIDIAN: {
        color: 0x1a1a2e,
        name: 'Obsidian',
        learn: 'Geology: Volcanic glass formed when lava cools FAST!',
        texture: 'obsidian'
    },
    WOOD: { 
        color: 0x6d4c41, 
        name: 'Wood',
        learn: 'Biology: Trees grow by absorbing CO2',
        texture: 'wood'
    },
    LAVA: { 
        color: 0xff5722, 
        name: 'Lava', 
        glow: true,
        learn: 'Geology: Lava is 700-1200°C molten rock!',
        texture: 'lava'
    },
    MAGMA: {
        color: 0xff6b00,
        name: 'Magma',
        glow: true,
        learn: 'Geology: Underground molten rock = magma, above ground = lava!',
        texture: 'magma'
    },
    ASH: {
        color: 0x4a4a4a,
        name: 'Ash',
        learn: 'Geology: Volcanic ash can travel thousands of miles!',
        texture: 'ash'
    },
    SMOKE: {
        color: 0x808080,
        name: 'Smoke',
        transparent: true,
        learn: 'Physics: Hot air rises - that\'s why smoke goes up!',
        texture: 'smoke'
    },
    WATER: { 
        color: 0x2196f3, 
        name: 'Water', 
        transparent: true,
        learn: 'Chemistry: H2O - 2 hydrogen + 1 oxygen',
        texture: 'water'
    },
    GOLD: { 
        color: 0xffc107, 
        name: 'Gold', 
        glow: true,
        learn: 'Chemistry: Gold never rusts or corrodes!',
        texture: 'gold'
    },
    HEART: { 
        color: 0xec4899, 
        name: 'Heart', 
        glow: true,
        learn: 'Biology: Your heart beats 100,000 times/day ❤️',
        texture: 'heart'
    },
    CRYSTAL: {
        color: 0x00ffff,
        name: 'Crystal',
        glow: true,
        learn: 'Physics: Crystals vibrate at specific frequencies!',
        texture: 'crystal'
    }
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
    const [showEducation, setShowEducation] = useState(false);
    const [playMusic, setPlayMusic] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);
    const [blocksPlaced, setBlocksPlaced] = useState(0);
    const [showStats, setShowStats] = useState(false);
    const audioContextRef = useRef(null);

    // Initialize Three.js scene with REALISTIC graphics
    useEffect(() => {
        if (!mountRef.current || showNameInput) return;

        // Scene setup with beautiful gradient sky
        const scene = new THREE.Scene();
        
        // Realistic sky gradient (sunrise vibes like VALCKANO screenshot)
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
        gradient.addColorStop(0, '#ff6b35'); // Warm orange top
        gradient.addColorStop(0.3, '#f7b733'); // Golden yellow
        gradient.addColorStop(0.6, '#4facfe'); // Sky blue
        gradient.addColorStop(1, '#00a8ff'); // Deep blue bottom
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);
        
        const skyTexture = new THREE.CanvasTexture(canvas);
        scene.background = skyTexture;
        scene.fog = new THREE.Fog(0xf7b733, 40, 200);
        sceneRef.current = scene;

        // Camera (higher FOV for more epic feel)
        const camera = new THREE.PerspectiveCamera(
            80,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            500
        );
        camera.position.set(15, 20, 15);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer with advanced settings for realistic graphics
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: false
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft realistic shadows
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // Cinematic tone mapping
        renderer.toneMappingExposure = 1.3;
        renderer.physicallyCorrectLights = true;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Realistic lighting setup (3-point lighting like movies)
        const ambientLight = new THREE.AmbientLight(0xffa366, 0.5);
        scene.add(ambientLight);

        // Key light (main sun - dramatic angle like VALCKANO)
        const sunLight = new THREE.DirectionalLight(0xffcc66, 2.0);
        sunLight.position.set(100, 100, 50);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 4096;
        sunLight.shadow.mapSize.height = 4096;
        sunLight.shadow.camera.left = -150;
        sunLight.shadow.camera.right = 150;
        sunLight.shadow.camera.top = 150;
        sunLight.shadow.camera.bottom = -150;
        sunLight.shadow.bias = -0.0001;
        sunLight.shadow.radius = 4;
        scene.add(sunLight);

        // Fill light (softer, fills shadows)
        const fillLight = new THREE.DirectionalLight(0x66ccff, 0.4);
        fillLight.position.set(-80, 40, -80);
        scene.add(fillLight);

        // Rim light (creates beautiful edge glow)
        const rimLight = new THREE.DirectionalLight(0xff6b35, 0.8);
        rimLight.position.set(0, 60, -120);
        scene.add(rimLight);

        // Ground plane (starter blocks)
        const groundSize = 30;
        for (let x = -groundSize / 2; x < groundSize / 2; x++) {
            for (let z = -groundSize / 2; z < groundSize / 2; z++) {
                // Vary terrain slightly
                if (Math.random() > 0.8) {
                    addBlock(x, 0, z, 'DIRT');
                } else {
                    addBlock(x, 0, z, 'GRASS');
                }
            }
        }

        // Add some starter inspiration blocks (pyramid shape)
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i + j < 4) {
                    addBlock(8 + i, 1 + Math.floor((4 - i - j) / 2), 8 + j, 'STONE');
                }
            }
        }

        // Load saved world
        loadWorld();

        // Mouse/touch controls
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let isRotating = false;
        let previousMouseX = 0;
        let previousMouseY = 0;

        const onMouseDown = (event) => {
            if (event.button === 2) {
                isRotating = true;
                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        };

        const onMouseMove = (event) => {
            if (isRotating) {
                const deltaX = event.clientX - previousMouseX;
                const deltaY = event.clientY - previousMouseY;
                
                const radius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);
                const angle = Math.atan2(camera.position.z, camera.position.x);
                const newAngle = angle - deltaX * 0.01;
                
                camera.position.x = Math.cos(newAngle) * radius;
                camera.position.z = Math.sin(newAngle) * radius;
                camera.position.y = Math.max(5, camera.position.y - deltaY * 0.1);
                camera.lookAt(0, 2, 0);

                previousMouseX = event.clientX;
                previousMouseY = event.clientY;
            }
        };

        const onMouseUp = () => {
            isRotating = false;
        };

        const onClick = (event) => {
            if (isRotating) return;

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

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
                    setBlocksPlaced(prev => Math.max(0, prev - 1));
                } else {
                    // Add block
                    const normal = intersect.face.normal;
                    const pos = intersect.object.position.clone();
                    pos.add(normal);
                    const newPos = {
                        x: Math.round(pos.x),
                        y: Math.round(pos.y),
                        z: Math.round(pos.z)
                    };
                    if (newPos.y < 50) { // Height limit
                        addBlock(newPos.x, newPos.y, newPos.z, selectedBlock);
                        setBlocksPlaced(prev => prev + 1);
                    }
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
            const zoomSpeed = 2;
            const direction = new THREE.Vector3();
            direction.subVectors(camera.position, new THREE.Vector3(0, 2, 0)).normalize();
            
            if (event.deltaY < 0) {
                camera.position.sub(direction.multiplyScalar(zoomSpeed));
            } else {
                camera.position.add(direction.multiplyScalar(zoomSpeed));
            }
            
            // Limit zoom
            const dist = camera.position.distanceTo(new THREE.Vector3(0, 2, 0));
            if (dist < 5) {
                camera.position.normalize().multiplyScalar(5);
                camera.position.y += 2;
            }
            if (dist > 100) {
                camera.position.normalize().multiplyScalar(100);
                camera.position.y += 2;
            }
        };
        renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

        // Animation loop with dynamic cinematic camera
        let animationId;
        const animate = () => {
            if (!isPlaying) return;
            animationId = requestAnimationFrame(animate);
            
            // Gentle orbiting camera (like watching a masterpiece)
            const time = Date.now() * 0.00003;
            const radius = 40;
            camera.position.x = Math.cos(time) * radius;
            camera.position.z = Math.sin(time) * radius;
            camera.position.y = 25 + Math.sin(time * 0.7) * 8;
            camera.lookAt(0, 5, 0);

            // Animate sun (day cycle feel)
            sunLight.position.x = Math.cos(time * 0.2) * 100;
            sunLight.position.z = Math.sin(time * 0.2) * 80;

            renderer.render(scene, camera);
        };
        animate();

        // Window resize
        const onResize = () => {
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', onResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onResize);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
            renderer.domElement.removeEventListener('click', onClick);
            renderer.domElement.removeEventListener('wheel', onWheel);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [isPlaying, selectedBlock, showNameInput]);

    // Healing frequency audio (optional, 432Hz)
    useEffect(() => {
        if (!playMusic) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        // 432Hz base (healing frequency)
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, audioContext.currentTime);
        gain1.gain.setValueAtTime(0.03, audioContext.currentTime);
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        osc1.start();

        // Harmonic (528Hz - love frequency)
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(528, audioContext.currentTime);
        gain2.gain.setValueAtTime(0.02, audioContext.currentTime);
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.start();

        return () => {
            osc1.stop();
            osc2.stop();
            audioContext.close();
        };
    }, [playMusic]);

    const addBlock = (x, y, z, type) => {
        if (!sceneRef.current) return;

        const key = `${x},${y},${z}`;
        if (blocksRef.current.has(key)) return;

        const blockType = BLOCK_TYPES[type];
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        // Create realistic procedural texture
        const textureCanvas = document.createElement('canvas');
        textureCanvas.width = 64;
        textureCanvas.height = 64;
        const ctx = textureCanvas.getContext('2d');
        
        // Base color with variation
        const baseColor = new THREE.Color(blockType.color);
        ctx.fillStyle = `rgb(${baseColor.r * 255}, ${baseColor.g * 255}, ${baseColor.b * 255})`;
        ctx.fillRect(0, 0, 64, 64);
        
        // Add texture noise for realism
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 64;
            const y = Math.random() * 64;
            const brightness = Math.random() * 0.3 - 0.15;
            ctx.fillStyle = `rgba(${(baseColor.r + brightness) * 255}, ${(baseColor.g + brightness) * 255}, ${(baseColor.b + brightness) * 255}, 0.3)`;
            ctx.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 3 + 1);
        }
        
        const texture = new THREE.CanvasTexture(textureCanvas);
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        
        // Realistic material with proper PBR
        const material = new THREE.MeshStandardMaterial({ 
            map: texture,
            color: blockType.color,
            transparent: blockType.transparent || false,
            opacity: blockType.transparent ? 0.6 : 1,
            roughness: 0.9,
            metalness: type === 'GOLD' ? 0.8 : type === 'CRYSTAL' ? 0.3 : 0.1,
            emissive: blockType.glow ? blockType.color : 0x000000,
            emissiveIntensity: blockType.glow ? 0.4 : 0,
            envMapIntensity: 1
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Edge lines for that Minecraft-inspired look but smoother
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
            color: 0x000000, 
            opacity: 0.15, 
            transparent: true,
            linewidth: 1
        }));
        mesh.add(line);

        if (blockType.glow) {
            // Beautiful glowing effect
            const light = new THREE.PointLight(blockType.color, 2, 12);
            light.position.copy(mesh.position);
            light.castShadow = true;
            light.shadow.mapSize.width = 512;
            light.shadow.mapSize.height = 512;
            sceneRef.current.add(light);
            
            // Store light reference to remove later
            mesh.userData.light = light;
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
        localStorage.setItem('volckano_world', JSON.stringify(worldData));
        localStorage.setItem('volckano_player', playerName);
        localStorage.setItem('volckano_blocks_placed', blocksPlaced.toString());
        alert(`${playerName}'s VOLCKANO saved! 🌋❤️⚡`);
    };

    const loadWorld = () => {
        const savedWorld = localStorage.getItem('volckano_world');
        const savedPlayer = localStorage.getItem('volckano_player');
        const savedBlocks = localStorage.getItem('volckano_blocks_placed');
        
        if (savedPlayer) {
            setPlayerName(savedPlayer);
            setShowNameInput(false);
        }

        if (savedBlocks) {
            setBlocksPlaced(parseInt(savedBlocks));
        }

        if (savedWorld) {
            const worldData = JSON.parse(savedWorld);
            worldData.forEach(({ x, y, z, type }) => {
                if (type && BLOCK_TYPES[type]) {
                    addBlock(x, y, z, type);
                }
            });
        }
    };

    const clearWorld = () => {
        if (!confirm('Start fresh? This will clear your VOLCKANO.')) return;
        
        blocksRef.current.forEach(mesh => {
            if (mesh.userData.light) {
                sceneRef.current.remove(mesh.userData.light);
            }
            sceneRef.current.remove(mesh);
        });
        blocksRef.current.clear();
        localStorage.removeItem('volckano_world');
        setBlocksPlaced(0);
        
        // Rebuild starter ground
        const groundSize = 30;
        for (let x = -groundSize / 2; x < groundSize / 2; x++) {
            for (let z = -groundSize / 2; z < groundSize / 2; z++) {
                if (Math.random() > 0.8) {
                    addBlock(x, 0, z, 'DIRT');
                } else {
                    addBlock(x, 0, z, 'GRASS');
                }
            }
        }
    };

    if (showNameInput) {
        return (
            <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
                {/* Georgie7's exact VALCKANO sunset colors */}
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, #1a1a2e 0%, #2d1b3d 15%, #4a2545 30%, #d4634d 55%, #f7a063 75%, #b4d5f0 100%)'
                }} />
                
                {/* Dramatic metal frame - like the screenshot */}
                <div className="absolute top-0 left-0 right-0 h-16 z-20 pointer-events-none">
                    <div className="h-full bg-gradient-to-b from-gray-800 via-gray-700 to-transparent opacity-90" style={{
                        boxShadow: 'inset 0 -8px 16px rgba(0,0,0,0.9)'
                    }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none">
                    <div className="h-full bg-gradient-to-t from-gray-800 via-gray-700 to-transparent opacity-90" style={{
                        boxShadow: 'inset 0 8px 16px rgba(0,0,0,0.9)'
                    }} />
                </div>
                
                {/* Floating lava embers */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                bottom: `${-10 + Math.random() * 20}%`,
                                width: Math.random() * 6 + 3,
                                height: Math.random() * 6 + 3,
                                background: Math.random() > 0.6 ? '#ff6b35' : Math.random() > 0.3 ? '#ff9500' : '#ffaa00',
                                boxShadow: '0 0 12px currentColor',
                                borderRadius: '1px'
                            }}
                            animate={{
                                y: [-50, -window.innerHeight - 100],
                                opacity: [0, 1, 0.8, 0],
                                scale: [0.3, 1.2, 1, 0.5]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 6,
                                repeat: Infinity,
                                delay: Math.random() * 8,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>

                {/* Simple centered card - Minecraft simplicity */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 mx-4 max-w-md"
                >
                    {/* VOLCKANO Title - exact style from image */}
                    <div className="text-center mb-8">
                        <motion.h1 
                            className="text-8xl font-black mb-2"
                            animate={{
                                textShadow: [
                                    '0 0 30px rgba(255, 107, 53, 1), 6px 6px 0 #000, -2px -2px 0 rgba(255, 150, 80, 0.8)',
                                    '0 0 50px rgba(255, 107, 53, 1), 6px 6px 0 #000, -2px -2px 0 rgba(255, 150, 80, 1)',
                                    '0 0 30px rgba(255, 107, 53, 1), 6px 6px 0 #000, -2px -2px 0 rgba(255, 150, 80, 0.8)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ 
                                color: '#d4634d',
                                fontFamily: 'Impact, sans-serif',
                                letterSpacing: '3px',
                                WebkitTextStroke: '2px rgba(0,0,0,0.8)'
                            }}
                        >
                            VOLCKANO
                        </motion.h1>
                        <p className="text-orange-300 text-sm font-bold" style={{ textShadow: '2px 2px 4px #000' }}>
                            by Georgie7 ❤️
                        </p>
                    </div>
                    
                    {/* Ultra simple - just name and GO (Minecraft style) */}
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && playerName.trim() && setShowNameInput(false)}
                            placeholder="Your name..."
                            className="w-full bg-gray-900/80 backdrop-blur-sm border-4 border-orange-500/80 px-5 py-5 text-white text-center text-2xl font-bold placeholder:text-gray-500 focus:border-orange-400 focus:outline-none transition-all"
                            style={{ textShadow: '2px 2px 4px #000' }}
                            autoFocus
                        />
                        
                        <Button
                            onClick={() => {
                                if (playerName.trim()) {
                                    setShowNameInput(false);
                                    localStorage.setItem('volckano_player', playerName);
                                }
                            }}
                            disabled={!playerName.trim()}
                            className="w-full bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 border-4 border-orange-900 text-white font-black py-6 text-2xl disabled:opacity-50 transition-all"
                            style={{ textShadow: '3px 3px 0 #000', boxShadow: '0 8px 0 #000, 0 0 30px rgba(249, 115, 22, 0.8)' }}
                        >
                            🌋 START BUILDING
                        </Button>

                        <p className="text-white/60 text-xs text-center font-bold pt-2" style={{ textShadow: '1px 1px 2px #000' }}>
                            FREE • OFFLINE • NO ADS
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-black overflow-hidden relative">
            {/* 3D Canvas */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Stats Overlay */}
            {showStats && (
                <div className="absolute top-20 left-4 bg-black/90 border-2 border-cyan-500 rounded-lg p-3 max-w-xs">
                    <p className="text-cyan-400 font-bold text-sm mb-2">📊 YOUR STATS:</p>
                    <div className="text-white text-xs space-y-1">
                        <p>Builder: <span className="text-yellow-400 font-bold">{playerName}</span></p>
                        <p>Blocks Placed: <span className="text-green-400 font-bold">{blocksPlaced}</span></p>
                        <p>Level: <span className="text-purple-400 font-bold">{Math.floor(blocksPlaced / 100) + 1}</span></p>
                    </div>
                </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 pointer-events-none">
                <div className="flex items-start justify-between gap-4">
                    {/* Left: Block selector */}
                    <div className="bg-black/90 border-2 border-pink-500 rounded-lg p-3 pointer-events-auto max-w-xs">
                        <p className="text-pink-400 font-bold text-xs mb-2">🎨 BLOCKS:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(BLOCK_TYPES).map(([key, block]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedBlock(key)}
                                    onMouseEnter={() => setShowEducation(true)}
                                    className={`w-14 h-14 rounded-lg border-2 transition-all relative ${
                                        selectedBlock === key
                                            ? 'border-white scale-110 shadow-lg'
                                            : 'border-gray-600 hover:border-gray-400 hover:scale-105'
                                    }`}
                                    style={{ 
                                        backgroundColor: `#${block.color.toString(16).padStart(6, '0')}`,
                                        boxShadow: selectedBlock === key ? `0 0 20px #${block.color.toString(16).padStart(6, '0')}` : 'none'
                                    }}
                                    title={block.name}
                                >
                                    {block.glow && <div className="absolute inset-0 rounded-lg animate-pulse" style={{ boxShadow: `inset 0 0 10px rgba(255,255,255,0.5)` }} />}
                                </button>
                            ))}
                        </div>
                        {showEducation && selectedBlock && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-2 bg-cyan-900/80 border border-cyan-500 rounded p-2"
                            >
                                <p className="text-cyan-300 text-xs font-bold flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    DID YOU KNOW?
                                </p>
                                <p className="text-white text-xs mt-1">{BLOCK_TYPES[selectedBlock].learn}</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Controls */}
                    <div className="bg-black/90 border-2 border-cyan-500 rounded-lg p-3 pointer-events-auto">
                        <p className="text-cyan-400 font-bold text-xs mb-2">👤 {playerName.toUpperCase()}</p>
                        <div className="space-y-2">
                            <Button onClick={() => setIsPlaying(!isPlaying)} size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                                {isPlaying ? <><Pause className="w-4 h-4 mr-2" /> Pause</> : <><Play className="w-4 h-4 mr-2" /> Play</>}
                            </Button>
                            <Button onClick={saveWorld} size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button onClick={() => setShowStats(!showStats)} size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
                                📊 Stats
                            </Button>
                            <Button onClick={clearWorld} size="sm" className="w-full bg-red-600 hover:bg-red-700">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Clear
                            </Button>
                            <Button onClick={() => setPlayMusic(!playMusic)} size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                {playMusic ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                                Music
                            </Button>
                            <Button onClick={() => setShowHelp(!showHelp)} size="sm" className="w-full bg-cyan-600 hover:bg-cyan-700">
                                <Info className="w-4 h-4 mr-2" />
                                Help
                            </Button>
                            <VolckanoP2P 
                                playerName={playerName}
                                onBlockPlaced={(x, y, z, type) => addBlock(x, y, z, type)}
                                onBlockRemoved={(x, y, z) => {
                                    const key = `${x},${y},${z}`;
                                    const block = blocksRef.current.get(key);
                                    if (block) {
                                        if (block.userData.light) sceneRef.current.remove(block.userData.light);
                                        sceneRef.current.remove(block);
                                        blocksRef.current.delete(key);
                                    }
                                }}
                            />
                        </div>
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
                        className="absolute bottom-4 left-4 bg-black/95 border-2 border-purple-500 rounded-lg p-4 max-w-md pointer-events-auto"
                    >
                        <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            HOW TO BUILD:
                        </h3>
                        <ul className="text-gray-300 text-sm space-y-1.5">
                            <li>• <strong className="text-white">Click</strong> on a block to place your selected block</li>
                            <li>• <strong className="text-white">Shift + Click</strong> to remove a block</li>
                            <li>• <strong className="text-white">Right Click + Drag</strong> to rotate camera</li>
                            <li>• <strong className="text-white">Mouse Wheel</strong> to zoom in/out</li>
                            <li>• <strong className="text-yellow-400">Hover blocks</strong> to learn cool science facts!</li>
                            <li>• Build anything: VALCKANOs, castles, hearts ❤️⚡</li>
                        </ul>
                        <div className="mt-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500 rounded p-2">
                            <p className="text-pink-400 text-xs font-bold">
                                🌋 TIP: Stack LAVA + MAGMA high, add OBSIDIAN edges, SMOKE on top = EPIC VOLCKANO!
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="absolute bottom-4 right-4 bg-black/90 border-2 border-pink-500 rounded-lg px-4 py-2 pointer-events-none">
                <p className="text-pink-400 text-xs font-bold">
                    ❤️ FREE FOREVER • 100% OFFLINE • ZERO EXTRACTION ❤️
                </p>
                <p className="text-cyan-400 text-[10px] font-bold text-center mt-1">
                    Inspired by what kids love • Made for kids worldwide ⚡
                </p>
            </div>
        </div>
    );
}