import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/**
 * VOLCKANO - Gergie7's Game
 * 
 * BUILD SHELTERS → VOLCANO ERUPTS → SURVIVE
 * Simple as Minecraft, more realistic graphics, play with friends offline
 * 
 * Made with love for Gergie7 ❤️🌋
 */

const BLOCKS = {
    GRASS: { color: 0x7cb342, emoji: '🌱' },
    DIRT: { color: 0x8d6e63, emoji: '🟤' },
    STONE: { color: 0x757575, emoji: '⬛' },
    WOOD: { color: 0x8B4513, emoji: '🪵' },
    LAVA: { color: 0xff4400, emoji: '🔥', glow: true },
    WATER: { color: 0x2196f3, emoji: '💧' },
};

export default function Volckano() {
    const containerRef = useRef(null);
    const [playerName, setPlayerName] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('GRASS');
    const [showLogin, setShowLogin] = useState(true);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const worldRef = useRef(new Map());

    // Load saved name
    useEffect(() => {
        const saved = localStorage.getItem('volckano_player');
        if (saved) {
            setPlayerName(saved);
            setShowLogin(false);
        }
    }, []);

    // Initialize 3D world
    useEffect(() => {
        if (showLogin || !containerRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // Sky blue
        scene.fog = new THREE.Fog(0x87CEEB, 50, 200);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(20, 15, 20);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(50, 50, 50);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        scene.add(sun);
        scene.add(new THREE.AmbientLight(0x404040, 0.5));

        // Create starter ground
        for (let x = -15; x < 15; x++) {
            for (let z = -15; z < 15; z++) {
                createBlock(x, 0, z, 'GRASS');
            }
        }

        // Load saved world
        const saved = localStorage.getItem('volckano_world');
        if (saved) {
            try {
                const world = JSON.parse(saved);
                world.forEach(({ x, y, z, type }) => {
                    if (BLOCKS[type]) createBlock(x, y, z, type);
                });
            } catch (e) {}
        }

        // MOBILE TOUCH CONTROLS
        let touchStart = null;
        let touchTime = 0;
        let lastTouch = { x: 0, y: 0 };
        let rotating = false;

        const onTouchStart = (e) => {
            if (e.touches.length === 1) {
                touchStart = Date.now();
                touchTime = Date.now();
                lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2) {
                rotating = true;
                lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        const onTouchMove = (e) => {
            e.preventDefault();
            
            if (e.touches.length === 2 && rotating) {
                const dx = e.touches[0].clientX - lastTouch.x;
                const dy = e.touches[0].clientY - lastTouch.y;
                
                const radius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);
                const angle = Math.atan2(camera.position.z, camera.position.x) - dx * 0.01;
                
                camera.position.x = Math.cos(angle) * radius;
                camera.position.z = Math.sin(angle) * radius;
                camera.position.y = Math.max(5, camera.position.y - dy * 0.1);
                camera.lookAt(0, 0, 0);
                
                lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 1) {
                const moved = Math.abs(e.touches[0].clientX - lastTouch.x) + Math.abs(e.touches[0].clientY - lastTouch.y);
                if (moved > 10) touchStart = null; // Cancel tap if moved
            }
        };

        const onTouchEnd = (e) => {
            rotating = false;
            
            if (touchStart && Date.now() - touchStart < 300 && e.changedTouches.length > 0) {
                const touch = e.changedTouches[0];
                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();
                const rect = renderer.domElement.getBoundingClientRect();
                
                mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
                
                raycaster.setFromCamera(mouse, camera);
                const blocks = Array.from(worldRef.current.values());
                const hits = raycaster.intersectObjects(blocks);

                if (hits.length > 0 && hits[0].face) {
                    const hit = hits[0];
                    const pos = hit.object.position.clone();
                    const tapDuration = Date.now() - touchTime;
                    
                    if (tapDuration > 500) {
                        // Long press = remove
                        const key = `${pos.x},${pos.y},${pos.z}`;
                        if (hit.object.userData.light) scene.remove(hit.object.userData.light);
                        scene.remove(hit.object);
                        worldRef.current.delete(key);
                    } else {
                        // Quick tap = place
                        pos.add(hit.face.normal);
                        if (pos.y >= 0 && pos.y < 30) {
                            createBlock(Math.round(pos.x), Math.round(pos.y), Math.round(pos.z), selectedBlock);
                        }
                    }
                    saveWorld();
                }
            }
            touchStart = null;
        };

        renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
        renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
        renderer.domElement.addEventListener('touchend', onTouchEnd);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const onResize = () => {
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [showLogin, selectedBlock]);

    const createBlock = (x, y, z, type) => {
        if (!sceneRef.current) return;
        
        const key = `${x},${y},${z}`;
        if (worldRef.current.has(key)) return;

        const block = BLOCKS[type];
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({ 
            color: block.color,
            emissive: block.glow ? block.color : 0x000000,
            emissiveIntensity: block.glow ? 0.5 : 0
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Black edges (Minecraft style)
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges, 
            new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
        );
        mesh.add(line);

        if (block.glow) {
            const light = new THREE.PointLight(block.color, 1, 10);
            light.position.copy(mesh.position);
            sceneRef.current.add(light);
            mesh.userData.light = light;
        }

        sceneRef.current.add(mesh);
        worldRef.current.set(key, mesh);
    };

    const saveWorld = () => {
        const world = Array.from(worldRef.current.entries()).map(([key, mesh]) => {
            const [x, y, z] = key.split(',').map(Number);
            const type = Object.keys(BLOCKS).find(k => BLOCKS[k].color === mesh.material.color.getHex());
            return { x, y, z, type };
        });
        localStorage.setItem('volckano_world', JSON.stringify(world));
    };

    const handleSave = () => {
        saveWorld();
        alert('🌋 Saved!');
    };

    // LOGIN - Use Gergie7's actual volcano image
    if (showLogin) {
        return (
            <div className="h-screen w-screen relative overflow-hidden">
                {/* Her volcano as background */}
                <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/870b0a855_IMG_6227.png"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Volcano"
                />
                
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Centered input */}
                <div className="relative z-10 h-full flex items-center justify-center px-6">
                    <div className="w-full max-w-sm space-y-4">
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
                            className="w-full bg-black/50 backdrop-blur-md border-4 border-orange-600 px-6 py-5 text-white text-center text-2xl font-black placeholder:text-orange-200/60 focus:border-orange-400 focus:outline-none transition-all rounded-xl"
                            style={{ textShadow: '3px 3px 6px #000' }}
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
                            className="w-full bg-gradient-to-b from-orange-500 via-orange-600 to-orange-800 hover:from-orange-400 hover:via-orange-500 hover:to-orange-700 text-white font-black py-6 text-2xl disabled:opacity-40 transition-all rounded-xl border-b-8 border-orange-950 shadow-2xl"
                            style={{ textShadow: '4px 4px 0 #000' }}
                        >
                            🌋 START BUILDING
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // GAME
    return (
        <div className="h-screen w-screen bg-black relative overflow-hidden">
            {/* 3D world */}
            <div ref={containerRef} className="w-full h-full" />

            {/* Block palette - simple grid */}
            <div className="absolute top-4 left-4 bg-black/80 border-4 border-orange-600 rounded-xl p-3 pointer-events-auto">
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(BLOCKS).map(([key, block]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedBlock(key)}
                            className={`w-16 h-16 rounded-lg border-4 transition-all text-3xl flex items-center justify-center ${
                                selectedBlock === key
                                    ? 'border-white scale-110'
                                    : 'border-gray-700 hover:border-gray-500'
                            }`}
                            style={{ 
                                backgroundColor: `#${block.color.toString(16).padStart(6, '0')}`,
                                boxShadow: selectedBlock === key ? `0 0 20px #${block.color.toString(16).padStart(6, '0')}` : 'none'
                            }}
                        >
                            {block.emoji}
                        </button>
                    ))}
                </div>
            </div>

            {/* Save button */}
            <button
                onClick={handleSave}
                className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white font-black px-8 py-4 rounded-xl text-xl border-4 border-green-800 pointer-events-auto shadow-xl"
            >
                💾 SAVE
            </button>

            {/* Mobile controls hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border-2 border-orange-500 rounded-lg px-6 py-3 pointer-events-none max-w-xs">
                <p className="text-white text-xs font-bold text-center leading-tight">
                    <span className="text-orange-400">TAP</span> = Place • <span className="text-orange-400">HOLD</span> = Remove<br/>
                    <span className="text-orange-400">2 FINGERS</span> = Rotate View
                </p>
            </div>
        </div>
    );
}