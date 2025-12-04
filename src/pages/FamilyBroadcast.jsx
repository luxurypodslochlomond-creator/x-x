import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Radio, Heart, Send, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

export default function FamilyBroadcast() {
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ['broadcastUser'],
        queryFn: () => base44.auth.me()
    });

    const broadcastMutation = useMutation({
        mutationFn: async (broadcastData) => {
            // Get all users to broadcast to
            const allUsers = await base44.entities.User.list();
            
            // Send email to each user
            for (const recipient of allUsers) {
                if (recipient.email !== user?.email) {
                    await base44.integrations.Core.SendEmail({
                        from_name: `${user?.full_name || 'A Soul'} via UF51`,
                        to: recipient.email,
                        subject: broadcastData.subject,
                        body: `${broadcastData.message}\n\n---\nSent with love from the Universal Family\nUF51.LOVE`
                    });
                }
            }
            
            return { success: true };
        },
        onSuccess: () => {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setMessage('');
                setSubject('');
            }, 3000);
        }
    });

    if (!user) return <QuantumLoader />;

    if (user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center p-8">
                <div className="space-y-6">
                    <Heart className="w-20 h-20 text-pink-400 mx-auto" />
                    <h1 className="text-4xl font-black text-white">This frequency is reserved for family coordinators</h1>
                    <p className="text-gray-400">Only admins can broadcast to the whole family</p>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6"
                >
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
                    <h1 className="text-5xl font-black text-white">Love Transmitted</h1>
                    <p className="text-2xl text-gray-300">Your message is traveling at the speed of light</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
                
                <header className="text-center space-y-4">
                    <Radio className="w-20 h-20 text-purple-400 mx-auto animate-pulse" style={{ filter: 'drop-shadow(0 0 20px #a855f7)' }} />
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Family Broadcast
                    </h1>
                    <p className="text-xl text-gray-300">Send love to every soul in the family at once</p>
                </header>

                <Card className="bg-black/40 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Transmit to All Souls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="subject" className="text-lg text-gray-300">Subject</Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="What's this transmission about?"
                                className="bg-gray-900/50 border-purple-500/50 text-white mt-2"
                            />
                        </div>

                        <div>
                            <Label htmlFor="message" className="text-lg text-gray-300">Message</Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Share your heart with the family..."
                                className="bg-gray-900/50 border-purple-500/50 text-white h-64 mt-2"
                            />
                        </div>

                        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                            <p className="text-sm text-purple-300">
                                <strong>This will send an email to every member of the family.</strong>
                                <br />Use this power with love and intention.
                            </p>
                        </div>

                        <Button
                            onClick={() => broadcastMutation.mutate({ subject, message })}
                            disabled={broadcastMutation.isPending || !subject || !message}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6"
                        >
                            {broadcastMutation.isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Transmitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Broadcast Love
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}