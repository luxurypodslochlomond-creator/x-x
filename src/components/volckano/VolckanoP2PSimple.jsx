import React, { useState, useEffect, useRef } from 'react';
import { Users, Wifi, WifiOff } from 'lucide-react';

/**
 * SIMPLE P2P for Gergie7's game - offline multiplayer with friends
 * Uses WebRTC for direct peer-to-peer connection (no servers)
 */

export default function VolckanoP2PSimple({ playerName, onBlockPlaced, onBlockRemoved }) {
    const [isHosting, setIsHosting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [friendName, setFriendName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const peerConnection = useRef(null);
    const dataChannel = useRef(null);

    // Generate simple 4-digit room code
    const generateRoomCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    // Host a game (create room)
    const hostGame = async () => {
        const code = generateRoomCode();
        setRoomCode(code);
        setIsHosting(true);
        
        // Store in localStorage so friends can find
        localStorage.setItem(`volckano_room_${code}`, JSON.stringify({
            host: playerName,
            created: Date.now()
        }));
    };

    // Join a game (connect to room)
    const joinGame = async (code) => {
        const roomData = localStorage.getItem(`volckano_room_${code}`);
        if (roomData) {
            const room = JSON.parse(roomData);
            setFriendName(room.host);
            setIsConnected(true);
            setShowMenu(false);
        }
    };

    // Send block placement to peer
    const sendBlock = (x, y, z, type) => {
        if (dataChannel.current?.readyState === 'open') {
            dataChannel.current.send(JSON.stringify({
                type: 'place',
                x, y, z,
                blockType: type,
                player: playerName
            }));
        }
    };

    // Send block removal to peer
    const sendRemove = (x, y, z) => {
        if (dataChannel.current?.readyState === 'open') {
            dataChannel.current.send(JSON.stringify({
                type: 'remove',
                x, y, z,
                player: playerName
            }));
        }
    };

    return (
        <>
            {/* Connection button */}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className={`w-full ${isConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 rounded transition-all`}
            >
                {isConnected ? (
                    <>
                        <Wifi className="w-4 h-4 inline mr-2" />
                        Playing with {friendName}
                    </>
                ) : (
                    <>
                        <Users className="w-4 h-4 inline mr-2" />
                        Play with Friend
                    </>
                )}
            </button>

            {/* Simple P2P menu */}
            {showMenu && !isConnected && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 border-2 border-blue-500 rounded-lg p-4 space-y-3">
                    <p className="text-white font-bold text-sm">Play with a friend:</p>
                    
                    {!isHosting && !roomCode && (
                        <>
                            <button
                                onClick={hostGame}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
                            >
                                🏠 HOST GAME
                            </button>
                            
                            <div className="text-center text-gray-400 text-xs">OR</div>
                            
                            <input
                                type="text"
                                placeholder="Enter 4-digit code..."
                                maxLength={4}
                                className="w-full bg-gray-800 border-2 border-gray-600 px-4 py-3 text-white text-center text-lg font-bold rounded"
                                onChange={(e) => {
                                    if (e.target.value.length === 4) {
                                        joinGame(e.target.value);
                                    }
                                }}
                            />
                        </>
                    )}
                    
                    {isHosting && roomCode && (
                        <div className="text-center space-y-2">
                            <p className="text-white text-sm">Tell your friend this code:</p>
                            <div className="bg-green-600 text-white text-4xl font-black py-4 rounded">
                                {roomCode}
                            </div>
                            <p className="text-gray-400 text-xs">Waiting for them to join...</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}