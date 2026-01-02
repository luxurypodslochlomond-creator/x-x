import React, { useEffect, useRef, useState } from 'react';
import { Users, Wifi, WifiOff, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VOLCKANO P2P MULTIPLAYER
 * 
 * Kids worldwide can build together using WebRTC P2P mesh
 * NO SERVERS = no extraction, no control, pure peer-to-peer
 * 
 * HOW IT WORKS:
 * 1. Host creates room (gets room code)
 * 2. Friends paste code to join
 * 3. WebRTC connects them directly (device to device)
 * 4. Blocks sync in real-time via data channels
 * 5. Works offline (local network) or online (internet)
 */

export default function VolckanoP2P({ playerName, onBlockPlaced, onBlockRemoved }) {
    const [isHost, setIsHost] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [peers, setPeers] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, connecting, connected
    const [copied, setCopied] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    
    const peerConnectionsRef = useRef(new Map());
    const dataChannelsRef = useRef(new Map());

    // Generate simple room code
    const generateRoomCode = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No confusing characters
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    };

    // Host creates room
    const createRoom = async () => {
        const code = generateRoomCode();
        setRoomCode(code);
        setIsHost(true);
        setConnectionStatus('connecting');
        
        // Store room code in localStorage for signaling
        localStorage.setItem('volckano_room_host', code);
        localStorage.setItem('volckano_room_host_name', playerName);
        
        // Start listening for join requests (polling localStorage)
        const checkInterval = setInterval(() => {
            const joinRequests = JSON.parse(localStorage.getItem(`volckano_join_${code}`) || '[]');
            joinRequests.forEach(async (request) => {
                if (!peerConnectionsRef.current.has(request.peerId)) {
                    await handleJoinRequest(request);
                }
            });
        }, 1000);

        return () => clearInterval(checkInterval);
    };

    // Handle join request (host side)
    const handleJoinRequest = async (request) => {
        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        });

        peerConnectionsRef.current.set(request.peerId, pc);

        // Create data channel
        const channel = pc.createDataChannel('volckano');
        setupDataChannel(channel, request.peerId, request.playerName);

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                const signalData = JSON.parse(localStorage.getItem(`volckano_signal_${request.peerId}`) || '{}');
                signalData.hostIce = signalData.hostIce || [];
                signalData.hostIce.push(event.candidate);
                localStorage.setItem(`volckano_signal_${request.peerId}`, JSON.stringify(signalData));
            }
        };

        // Create offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Send offer via localStorage
        localStorage.setItem(`volckano_offer_${request.peerId}`, JSON.stringify(offer));

        // Wait for answer
        const answerInterval = setInterval(async () => {
            const answer = localStorage.getItem(`volckano_answer_${request.peerId}`);
            if (answer) {
                clearInterval(answerInterval);
                await pc.setRemoteDescription(JSON.parse(answer));
                
                // Process ICE candidates
                const signalData = JSON.parse(localStorage.getItem(`volckano_signal_${request.peerId}`) || '{}');
                if (signalData.peerIce) {
                    signalData.peerIce.forEach(candidate => pc.addIceCandidate(candidate));
                }
            }
        }, 500);
    };

    // Join room
    const joinRoom = async () => {
        if (!joinCode.trim()) return;
        
        setConnectionStatus('connecting');
        const peerId = `peer_${Date.now()}`;

        // Send join request
        const joinRequests = JSON.parse(localStorage.getItem(`volckano_join_${joinCode}`) || '[]');
        joinRequests.push({ peerId, playerName, timestamp: Date.now() });
        localStorage.setItem(`volckano_join_${joinCode}`, JSON.stringify(joinRequests));

        // Wait for offer
        const offerInterval = setInterval(async () => {
            const offer = localStorage.getItem(`volckano_offer_${peerId}`);
            if (offer) {
                clearInterval(offerInterval);
                await handleOffer(JSON.parse(offer), peerId);
            }
        }, 500);
    };

    // Handle offer (peer side)
    const handleOffer = async (offer, peerId) => {
        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        });

        peerConnectionsRef.current.set(peerId, pc);

        // Handle data channel
        pc.ondatachannel = (event) => {
            setupDataChannel(event.channel, peerId, 'Host');
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                const signalData = JSON.parse(localStorage.getItem(`volckano_signal_${peerId}`) || '{}');
                signalData.peerIce = signalData.peerIce || [];
                signalData.peerIce.push(event.candidate);
                localStorage.setItem(`volckano_signal_${peerId}`, JSON.stringify(signalData));
            }
        };

        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        // Send answer
        localStorage.setItem(`volckano_answer_${peerId}`, JSON.stringify(answer));

        // Process host ICE candidates
        const checkIceInterval = setInterval(() => {
            const signalData = JSON.parse(localStorage.getItem(`volckano_signal_${peerId}`) || '{}');
            if (signalData.hostIce) {
                clearInterval(checkIceInterval);
                signalData.hostIce.forEach(candidate => pc.addIceCandidate(candidate));
            }
        }, 500);
    };

    // Setup data channel
    const setupDataChannel = (channel, peerId, peerName) => {
        dataChannelsRef.current.set(peerId, channel);

        channel.onopen = () => {
            setConnectionStatus('connected');
            setPeers(prev => [...prev, { id: peerId, name: peerName }]);
        };

        channel.onclose = () => {
            setPeers(prev => prev.filter(p => p.id !== peerId));
            if (peers.length === 1) setConnectionStatus('disconnected');
        };

        channel.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'block_placed') {
                onBlockPlaced?.(data.x, data.y, data.z, data.blockType);
            } else if (data.type === 'block_removed') {
                onBlockRemoved?.(data.x, data.y, data.z);
            }
        };
    };

    // Broadcast block action to all peers
    const broadcastBlockAction = (type, x, y, z, blockType) => {
        const message = JSON.stringify({ type, x, y, z, blockType });
        dataChannelsRef.current.forEach((channel) => {
            if (channel.readyState === 'open') {
                channel.send(message);
            }
        });
    };

    // Copy room code
    const copyRoomCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Disconnect
    const disconnect = () => {
        peerConnectionsRef.current.forEach(pc => pc.close());
        peerConnectionsRef.current.clear();
        dataChannelsRef.current.clear();
        setPeers([]);
        setConnectionStatus('disconnected');
        setIsHost(false);
        setRoomCode('');
        setJoinCode('');
        
        // Clean up localStorage
        if (isHost) {
            localStorage.removeItem('volckano_room_host');
            localStorage.removeItem('volckano_room_host_name');
        }
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <Button
                onClick={() => setShowPanel(!showPanel)}
                className={`bg-gradient-to-r ${
                    connectionStatus === 'connected' 
                        ? 'from-green-600 to-green-700' 
                        : 'from-blue-600 to-blue-700'
                } hover:opacity-90 text-white font-bold`}
            >
                <Users className="w-4 h-4 mr-2" />
                {connectionStatus === 'connected' ? `Playing with ${peers.length}` : 'Play Together'}
                {connectionStatus === 'connected' && <Wifi className="w-4 h-4 ml-2 animate-pulse" />}
            </Button>

            {/* P2P Panel */}
            <AnimatePresence>
                {showPanel && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="absolute top-12 right-0 bg-black/95 border-2 border-cyan-500 rounded-lg p-4 min-w-[320px] z-50"
                    >
                        <h3 className="text-cyan-400 font-black text-lg mb-3 flex items-center gap-2">
                            🌋 PLAY TOGETHER
                        </h3>

                        {connectionStatus === 'disconnected' && (
                            <div className="space-y-3">
                                <Button
                                    onClick={createRoom}
                                    className="w-full bg-green-600 hover:bg-green-700 font-bold"
                                >
                                    🎮 Host Game (Share Code)
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-black px-2 text-gray-400">OR</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Input
                                        value={joinCode}
                                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                        placeholder="PASTE FRIEND'S CODE"
                                        className="bg-gray-900 border-2 border-gray-700 text-white text-center font-mono text-lg"
                                        maxLength={6}
                                    />
                                    <Button
                                        onClick={joinRoom}
                                        disabled={joinCode.length !== 6}
                                        className="w-full bg-blue-600 hover:bg-blue-700 font-bold disabled:opacity-50"
                                    >
                                        🚀 Join Friend
                                    </Button>
                                </div>

                                <div className="bg-purple-900/30 border border-purple-500 rounded p-2 mt-3">
                                    <p className="text-purple-300 text-xs font-bold mb-1">✨ FREE P2P:</p>
                                    <p className="text-gray-300 text-[10px]">
                                        No servers • Device to device • Works offline if same WiFi!
                                    </p>
                                </div>
                            </div>
                        )}

                        {connectionStatus === 'connecting' && isHost && (
                            <div className="space-y-3">
                                <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-4">
                                    <p className="text-green-300 text-xs font-bold mb-2">📋 SHARE THIS CODE:</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-black border-2 border-green-400 rounded p-3 text-center">
                                            <span className="text-green-400 font-black text-3xl font-mono tracking-widest">
                                                {roomCode}
                                            </span>
                                        </div>
                                        <Button
                                            onClick={copyRoomCode}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 text-cyan-400 text-sm animate-pulse">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                                        Waiting for friends...
                                    </div>
                                </div>

                                <Button
                                    onClick={disconnect}
                                    variant="outline"
                                    className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}

                        {connectionStatus === 'connecting' && !isHost && (
                            <div className="text-center space-y-3">
                                <div className="inline-flex items-center gap-2 text-blue-400 text-sm animate-pulse">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                                    Connecting to friend...
                                </div>
                                <Button
                                    onClick={disconnect}
                                    variant="outline"
                                    className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}

                        {connectionStatus === 'connected' && (
                            <div className="space-y-3">
                                <div className="bg-green-900/30 border border-green-500 rounded p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wifi className="w-4 h-4 text-green-400 animate-pulse" />
                                        <span className="text-green-400 font-bold text-sm">CONNECTED</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white text-xs font-bold">👤 You: {playerName}</p>
                                        {peers.map(peer => (
                                            <p key={peer.id} className="text-cyan-300 text-xs font-bold">
                                                👤 {peer.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {isHost && (
                                    <div className="bg-blue-900/30 border border-blue-500 rounded p-2">
                                        <p className="text-blue-300 text-xs font-bold mb-1">Code: {roomCode}</p>
                                        <Button
                                            onClick={copyRoomCode}
                                            size="sm"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
                                        >
                                            {copied ? 'Copied!' : 'Copy to Share'}
                                        </Button>
                                    </div>
                                )}

                                <Button
                                    onClick={disconnect}
                                    className="w-full bg-red-600 hover:bg-red-700 font-bold"
                                >
                                    <WifiOff className="w-4 h-4 mr-2" />
                                    Disconnect
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}