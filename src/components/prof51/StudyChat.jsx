import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Send, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudyChat() {
    const [messages, setMessages] = useState([
        { user: 'Sophie (Economics)', text: 'Anyone got notes from today\'s macro lecture?', time: '14:23' },
        { user: 'James (Economics)', text: 'Yeah I got them, sending now via P2P', time: '14:24' },
        { user: 'Archie', text: 'Legend! Also check Prof51 Excel generator for the GDP model', time: '14:25' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, { user: 'Archie', text: newMessage, time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) }]);
        setNewMessage('');
    };

    return (
        <div className="max-w-2xl mx-auto h-[calc(100vh-120px)] flex flex-col">
            <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-4 mb-4" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)' }}>
                <div className="flex items-center gap-3">
                    <Users className="w-10 h-10 text-green-400" />
                    <div className="flex-1">
                        <h2 className="text-green-400 font-black text-lg font-mono">Economics Study Group</h2>
                        <p className="text-gray-400 text-xs font-mono flex items-center gap-1">
                            <WifiOff className="w-3 h-3" />
                            P2P Mesh • 12 students nearby • Offline mode active
                        </p>
                    </div>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${msg.user === 'Archie' ? 'ml-auto bg-cyan-900/40 border-cyan-500/50' : 'mr-auto bg-gray-900/60 border-gray-700'} border-2 rounded-lg p-3 max-w-[80%]`}
                    >
                        <p className={`${msg.user === 'Archie' ? 'text-cyan-400' : 'text-green-400'} text-xs font-bold font-mono mb-1`}>{msg.user}</p>
                        <p className="text-white text-sm font-mono">{msg.text}</p>
                        <p className="text-gray-500 text-[10px] font-mono mt-1">{msg.time}</p>
                    </motion.div>
                ))}
            </div>

            {/* INPUT */}
            <div className="flex gap-2">
                <Input
                    placeholder="Message study group..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="bg-black border-green-500/30 text-white font-mono"
                />
                <Button
                    onClick={sendMessage}
                    className="bg-green-500 hover:bg-green-600 text-black"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>

            <p className="text-gray-600 text-[10px] font-mono text-center mt-2">
                End-to-end encrypted • Device-to-device • Works offline ♾️
            </p>
        </div>
    );
}