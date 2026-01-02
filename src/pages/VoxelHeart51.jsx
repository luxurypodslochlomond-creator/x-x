import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import VolckanoP2PSimple from '@/components/volckano/VolckanoP2PSimple';

/**
 * VOLCKANO - THE GAME GERGIE7 DREAMED OF
 * 
 * Made for Gergie7 + ALL her friends worldwide ❤️
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
 * INSPIRED BY: Gergie7's pure creativity ⚡❤️
 */

const BLOCK_TYPES = {
    GRASS: { color: 0x7cb342, name: '🌱' },
    DIRT: { color: 0x8d6e63, name: '🟤' },
    STONE: { color: 0x757575, name: '⬛' },
    LAVA: { color: 0xff5722, name: '🔥', glow: true },
    WATER: { color: 0x2196f3, name: '💧', transparent: true },
    WOOD: { color: 0x6d4c41, name: '🪵' },
    GOLD: { color: 0xffc107, name: '✨', glow: true },
    HEART: { color: 0xec4899, name: '❤️', glow: true }
};

export default function VoxelHeart51() {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const blocksRef = useRef(new Map());
    const [selectedBlock, setSelectedBlock] = useState('GRASS');
    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);
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
                
                // Skip if clicked on edge lines (no face)
                if (!intersect.face) return;
                
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
                    const newPos = {
                        x: Math.round(pos.x),
                        y: Math.round(pos.y),
                        z: Math.round(pos.z)
                    };
                    if (newPos.y < 50) { // Height limit
                        addBlock(newPos.x, newPos.y, newPos.z, selectedBlock);
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

        // Simple animation loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
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
    }, [selectedBlock, showNameInput]);

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
        alert(`${playerName}'s VOLCKANO saved! 🌋❤️`);
    };

    const loadWorld = () => {
        const savedWorld = localStorage.getItem('volckano_world');
        const savedPlayer = localStorage.getItem('volckano_player');
        
        if (savedPlayer) {
            setPlayerName(savedPlayer);
            setShowNameInput(false);
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

    if (showNameInput) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-black">
                {/* HER volcano image as background */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/870b0a855_IMG_6227.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                
                {/* Dark overlay so text readable */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Metal frame effect - exactly like her image */}
                <div className="absolute top-0 left-0 right-0 h-20 z-20 pointer-events-none">
                    <div className="h-full" style={{
                        background: 'linear-gradient(to bottom, rgba(50,50,50,0.95) 0%, rgba(70,70,70,0.8) 50%, transparent 100%)',
                        boxShadow: 'inset 0 -12px 20px rgba(0,0,0,0.9)'
                    }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none">
                    <div className="h-full" style={{
                        background: 'linear-gradient(to top, rgba(50,50,50,0.95) 0%, rgba(70,70,70,0.8) 50%, transparent 100%)',
                        boxShadow: 'inset 0 12px 20px rgba(0,0,0,0.9)'
                    }} />
                </div>
                
                {/* Simple centered form - no extra animations */}
                <div className="relative z-10 h-full flex items-center justify-center px-4">
                    <div className="w-full max-w-sm space-y-4">
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && playerName.trim() && setShowNameInput(false)}
                            placeholder="Your name..."
                            className="w-full bg-black/60 backdrop-blur-sm border-2 border-orange-500/50 px-6 py-4 text-white text-center text-xl font-bold placeholder:text-gray-400 focus:border-orange-500 focus:outline-none transition-all"
                            style={{ textShadow: '2px 2px 4px #000' }}
                            autoFocus
                        />
                        
                        <button
                            onClick={() => {
                                if (playerName.trim()) {
                                    setShowNameInput(false);
                                    localStorage.setItem('volckano_player', playerName);
                                }
                            }}
                            disabled={!playerName.trim()}
                            className="w-full bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 text-white font-black py-5 text-2xl disabled:opacity-50 transition-all border-b-4 border-orange-900"
                            style={{ textShadow: '3px 3px 0 #000' }}
                        >
                            🌋 START BUILDING
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-black overflow-hidden relative">
            {/* 3D Canvas */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Simple block selector - just blocks, no text */}
            <div className="absolute top-4 left-4 bg-black/80 border-2 border-orange-500 rounded-lg p-2 pointer-events-auto">
                <div className="grid grid-cols-4 gap-2">
                    {Object.entries(BLOCK_TYPES).map(([key, block]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedBlock(key)}
                            className={`w-12 h-12 rounded border-2 transition-all text-2xl ${
                                selectedBlock === key
                                    ? 'border-white scale-110'
                                    : 'border-gray-600 hover:border-gray-400'
                            }`}
                            style={{ 
                                backgroundColor: `#${block.color.toString(16).padStart(6, '0')}`,
                                boxShadow: selectedBlock === key ? `0 0 15px #${block.color.toString(16).padStart(6, '0')}` : 'none'
                            }}
                        >
                            {block.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Controls - top right */}
            <div className="absolute top-4 right-4 space-y-2 pointer-events-auto">
                <button
                    onClick={saveWorld}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg border-2 border-green-800"
                >
                    💾 SAVE
                </button>
                
                <div className="relative">
                    <VolckanoP2PSimple
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
    );
}