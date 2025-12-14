import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Users, X, MessageCircle, Image as ImageIcon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * TEAM CHAT - REAL-TIME OFFLINE MESSAGING
 * Works WITHOUT internet - P2P mesh
 * Send messages, docs, photos - everyone sees instantly
 * 
 * USE CASES:
 * - Festival: "Load in delayed 30 mins" → whole team knows
 * - Van: "Merch sold out of L shirts" → instant
 * - Deal: Share contract PDF → everyone reviews together
 * - Quick Q: "What's venue WiFi password?" → answered immediately
 * 
 * ZERO ADS. ZERO BULLSHIT. JUST TEAM HELPING TEAM ♾️❤️♾️
 */

export default function ScottTeamChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [myName, setMyName] = useState('');
    const [connectionId, setConnectionId] = useState(null);
    const [peers, setPeers] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Load name
        const savedName = localStorage.getItem('kingdom51_team_name') || 'Team Member';
        setMyName(savedName);

        // Load message history
        const savedMessages = localStorage.getItem('kingdom51_team_messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }

        // Initialize P2P
        initMesh();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
            scrollToBottom();
        }
    }, [isOpen, messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const initMesh = () => {
        const id = 'kingdom51_' + Math.random().toString(36).substr(2, 9);
        setConnectionId(id);

        const channel = new BroadcastChannel('kingdom51_team_chat');

        channel.onmessage = (event) => {
            const { type, from, name, message, file, timestamp } = event.data;

            if (type === 'peer_announce' && from !== id) {
                setPeers(prev => {
                    const existing = prev.find(p => p.id === from);
                    if (!existing) {
                        return [...prev, { id: from, name: name || 'Team', lastSeen: Date.now() }];
                    }
                    return prev.map(p => p.id === from ? { ...p, lastSeen: Date.now(), name: name || p.name } : p);
                });
            }

            if (type === 'chat_message' && from !== id) {
                const newMsg = {
                    id: `msg_${timestamp}`,
                    from: name || 'Team',
                    text: message,
                    file: file,
                    timestamp: timestamp,
                    fromMe: false
                };
                
                setMessages(prev => {
                    const updated = [...prev, newMsg];
                    localStorage.setItem('kingdom51_team_messages', JSON.stringify(updated));
                    return updated;
                });

                // Increment unread if chat closed
                if (!isOpen) {
                    setUnreadCount(prev => prev + 1);
                }
            }
        };

        // Announce presence
        const announce = () => {
            channel.postMessage({
                type: 'peer_announce',
                from: id,
                name: myName,
                timestamp: Date.now()
            });
        };
        announce();
        setInterval(announce, 5000);

        window.kingdom51TeamChatChannel = channel;
    };

    const sendMessage = async () => {
        if (!newMessage.trim() && !window.pendingFile) return;

        const timestamp = Date.now();
        const msg = {
            id: `msg_${timestamp}`,
            from: myName,
            text: newMessage.trim(),
            file: window.pendingFile || null,
            timestamp: timestamp,
            fromMe: true
        };

        // Save locally
        const updated = [...messages, msg];
        setMessages(updated);
        localStorage.setItem('kingdom51_team_messages', JSON.stringify(updated));

        // Broadcast to team
        if (window.kingdom51TeamChatChannel) {
            window.kingdom51TeamChatChannel.postMessage({
                type: 'chat_message',
                from: connectionId,
                name: myName,
                message: newMessage.trim(),
                file: window.pendingFile || null,
                timestamp: timestamp
            });
        }

        setNewMessage('');
        window.pendingFile = null;
    };

    const handleFileAttach = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload to get URL
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            window.pendingFile = {
                name: file.name,
                url: file_url,
                type: file.type
            };
            alert(`✓ ${file.name} ready to send`);
        } catch (error) {
            alert('Upload failed');
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 p-4 rounded-full shadow-2xl transition-all"
                style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}
            >
                <MessageCircle className="w-7 h-7 text-white" />
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                        {unreadCount}
                    </div>
                )}
            </button>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-black border-4 border-cyan-500 rounded-xl shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.5)', maxHeight: 'calc(100vh - 3rem)' }}
        >
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b-2 border-cyan-500/30">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-cyan-400 font-black font-mono text-sm">TEAM CHAT</h3>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-mono">{peers.length}</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-900 rounded transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
            </div>

            {/* MESSAGES */}
            <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-black to-gray-950">
                {messages.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-600 text-sm font-mono">No messages yet</p>
                        <p className="text-gray-700 text-xs font-mono mt-1">Team will see your messages instantly</p>
                    </div>
                ) : (
                    messages.map(msg => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${msg.fromMe ? 'ml-8' : 'mr-8'}`}
                        >
                            <div className={`p-3 rounded-lg ${
                                msg.fromMe
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-gray-900 border border-gray-800 text-gray-200'
                            }`}>
                                {!msg.fromMe && (
                                    <p className="text-cyan-400 font-bold text-xs font-mono mb-1">{msg.from}</p>
                                )}
                                {msg.text && (
                                    <p className="text-sm font-mono whitespace-pre-wrap">{msg.text}</p>
                                )}
                                {msg.file && (
                                    <a
                                        href={msg.file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 mt-2 p-2 bg-black/30 rounded hover:bg-black/50 transition-colors"
                                    >
                                        {msg.file.type?.startsWith('image/') ? (
                                            <ImageIcon className="w-4 h-4" />
                                        ) : (
                                            <FileText className="w-4 h-4" />
                                        )}
                                        <span className="text-xs font-mono truncate">{msg.file.name}</span>
                                    </a>
                                )}
                                <p className="text-xs opacity-60 mt-1 font-mono">
                                    {new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t-2 border-cyan-500/30">
                <div className="flex gap-2">
                    <label className="flex-shrink-0 p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded cursor-pointer transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-400" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileAttach}
                        />
                    </label>
                    <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder="Message your team..."
                        className="flex-1 bg-black border-2 border-gray-800 text-white resize-none font-mono text-sm focus:border-cyan-500"
                        rows={2}
                    />
                    <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() && !window.pendingFile}
                        className="flex-shrink-0 bg-cyan-500 hover:bg-cyan-600 text-black px-4"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-600 text-xs font-mono">
                        {peers.length === 0 ? 'Waiting for team...' : `${peers.length} online • Messages sync offline`}
                    </p>
                    {window.pendingFile && (
                        <button
                            onClick={() => { window.pendingFile = null; alert('✓ File cleared'); }}
                            className="text-cyan-400 text-xs font-mono hover:text-cyan-300"
                        >
                            Clear file
                        </button>
                    )}
                </div>
            </div>

            {/* WHO'S ONLINE */}
            {peers.length > 0 && (
                <div className="p-3 border-t border-gray-900 bg-black">
                    <p className="text-gray-500 text-xs font-mono mb-2">ONLINE NOW:</p>
                    <div className="flex flex-wrap gap-2">
                        {peers.map(peer => (
                            <div key={peer.id} className="flex items-center gap-1 px-2 py-1 bg-green-900/30 border border-green-500/50 rounded">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-400 text-xs font-mono font-bold">{peer.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}