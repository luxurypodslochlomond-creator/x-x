import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, CheckCircle, Archive, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactMessages() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            
            if (currentUser.role === 'admin') {
                const allMessages = await base44.entities.ContactMessage.list('-created_date', 100);
                setMessages(allMessages);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (messageId, newStatus) => {
        try {
            await base44.entities.ContactMessage.update(messageId, { status: newStatus });
            await loadData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <Card className="bg-red-900/20 border-red-500/50 max-w-md">
                    <CardContent className="p-8 text-center text-white">
                        <h2 className="text-2xl font-bold mb-2">Admin Only</h2>
                        <p>This page is for admin users only.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const newMessages = messages.filter(m => m.status === 'new');
    const respondedMessages = messages.filter(m => m.status === 'responded');

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                
                <header className="text-center space-y-4">
                    <Mail className="w-16 h-16 text-purple-400 mx-auto" />
                    <h1 className="text-4xl md:text-6xl font-black">
                        Contact Messages
                    </h1>
                    <p className="text-xl text-gray-400">
                        {newMessages.length} new • {respondedMessages.length} responded
                    </p>
                </header>

                {/* NEW MESSAGES */}
                {newMessages.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
                            <Clock className="w-6 h-6" />
                            New Messages
                        </h2>
                        {newMessages.map(msg => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Card className="bg-black/50 border-2 border-purple-500/50">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl text-white">{msg.name}</CardTitle>
                                                <a href={`mailto:${msg.email}`} className="text-cyan-400 hover:underline font-mono">
                                                    {msg.email}
                                                </a>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(msg.created_date).toLocaleString()}
                                                </p>
                                            </div>
                                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                                                NEW
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => updateStatus(msg.id, 'responded')}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Mark as Responded
                                            </Button>
                                            <Button
                                                onClick={() => updateStatus(msg.id, 'archived')}
                                                variant="outline"
                                                className="border-gray-500 text-gray-400"
                                            >
                                                <Archive className="w-4 h-4 mr-2" />
                                                Archive
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* RESPONDED MESSAGES */}
                {respondedMessages.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6" />
                            Responded
                        </h2>
                        {respondedMessages.map(msg => (
                            <Card key={msg.id} className="bg-black/30 border border-green-500/30">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white font-bold">{msg.name}</p>
                                            <p className="text-cyan-400 font-mono text-sm">{msg.email}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(msg.created_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                            RESPONDED
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {messages.length === 0 && (
                    <Card className="bg-black/50 border-purple-500/30">
                        <CardContent className="p-12 text-center text-gray-400">
                            <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>No messages yet. When someone uses the contact form, they'll appear here.</p>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
}