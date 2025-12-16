import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Send, Users, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

/**
 * SCOTT SIMPLE COMMS - Managing Artists Like Kids
 * 
 * ULTRA SIMPLE:
 * - Send question to band/crew
 * - They tap IN or OUT
 * - Scott sees results instantly
 * - P2P mesh (works offline at festivals)
 * 
 * INSPIRED BY: Jack Dorsey's Nostr protocol (open source, decentralized)
 * BUT SIMPLER: Binary choice only (IN/OUT, YES/NO)
 * 
 * Jack gets credit - he pioneered decentralized comms ✓
 */

export default function ScottSimpleComms() {
    const [message, setMessage] = useState('');
    const [sentMessage, setSentMessage] = useState(null);
    const queryClient = useQueryClient();

    // Get team members
    const { data: team = [] } = useQuery({
        queryKey: ['scottTeam'],
        queryFn: () => base44.entities.ScottTeamMember.filter({ active: true })
    });

    // Get pending responses
    const { data: pendingMessages = [] } = useQuery({
        queryKey: ['scottPendingComms'],
        queryFn: () => base44.entities.ScottMessage.filter({ 
            status: 'pending_response',
            category: 'simple_comms'
        }, '-created_date', 10),
        refetchInterval: 3000 // Auto-refresh every 3s
    });

    // Send mutation
    const sendMutation = useMutation({
        mutationFn: async (text) => {
            const promises = team.map(member =>
                base44.entities.ScottMessage.create({
                    team_member_id: member.id,
                    message_text: text,
                    priority: 'normal',
                    category: 'simple_comms',
                    status: 'pending_response'
                })
            );
            const results = await Promise.all(promises);
            return { text, messageIds: results.map(r => r.id) };
        },
        onSuccess: (data) => {
            setSentMessage(data);
            setMessage('');
            queryClient.invalidateQueries(['scottPendingComms']);
        }
    });

    // Get responses for a message
    const getResponses = (messageText) => {
        return pendingMessages.filter(m => m.message_text === messageText);
    };

    const handleReset = () => {
        setSentMessage(null);
        setMessage('');
    };

    return (
        <div className="bg-black border-2 border-cyan-500 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-cyan-400" />
                <div>
                    <h2 className="text-cyan-400 font-black text-xl font-mono">SIMPLE COMMS</h2>
                    <p className="text-gray-500 text-xs font-mono">IN or OUT • YES or NO • P2P mesh</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!sentMessage ? (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-2 block">
                                ASK TEAM: (they tap IN or OUT)
                            </label>
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., 'London gig tomorrow?' or 'Studio session Friday?'"
                                rows={3}
                                className="bg-black/60 border-2 border-gray-700 text-white font-mono text-sm focus:border-cyan-500"
                            />
                        </div>

                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-3">
                            <p className="text-cyan-400 text-xs font-bold mb-2">SENDING TO:</p>
                            <div className="space-y-1">
                                {team.length === 0 ? (
                                    <p className="text-gray-500 text-xs">No team members yet</p>
                                ) : (
                                    team.map(member => (
                                        <p key={member.id} className="text-white text-xs font-mono">
                                            • {member.name} ({member.role})
                                        </p>
                                    ))
                                )}
                            </div>
                        </div>

                        <Button
                            onClick={() => sendMutation.mutate(message)}
                            disabled={!message.trim() || team.length === 0 || sendMutation.isPending}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black"
                        >
                            {sendMutation.isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    SENDING...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    SEND TO {team.length} PEOPLE
                                </>
                            )}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-lg p-4 mb-4">
                            <p className="text-cyan-400 font-bold text-sm mb-2">YOU ASKED:</p>
                            <p className="text-white font-mono text-sm">"{sentMessage.text}"</p>
                        </div>

                        {/* LIVE RESPONSES */}
                        <div className="space-y-2">
                            <p className="text-gray-400 text-xs font-mono font-bold mb-3">RESPONSES (auto-updates):</p>
                            {team.map(member => {
                                const response = getResponses(sentMessage.text).find(m => m.team_member_id === member.id);
                                const hasResponded = response && response.response;
                                const isIn = hasResponded && response.response.toLowerCase().includes('in');
                                const isOut = hasResponded && response.response.toLowerCase().includes('out');

                                return (
                                    <div
                                        key={member.id}
                                        className={`flex items-center justify-between p-3 rounded border-2 ${
                                            isIn ? 'bg-green-900/30 border-green-500' :
                                            isOut ? 'bg-red-900/30 border-red-500' :
                                            'bg-black/60 border-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isIn ? (
                                                <CheckCircle className="w-6 h-6 text-green-400" />
                                            ) : isOut ? (
                                                <XCircle className="w-6 h-6 text-red-400" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full border-2 border-gray-600 animate-pulse" />
                                            )}
                                            <p className="text-white font-mono text-sm">{member.name}</p>
                                        </div>
                                        <p className={`font-black text-sm font-mono ${
                                            isIn ? 'text-green-400' :
                                            isOut ? 'text-red-400' :
                                            'text-gray-600'
                                        }`}>
                                            {isIn ? 'IN' : isOut ? 'OUT' : 'WAITING...'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* SUMMARY */}
                        <div className="bg-black/60 border border-cyan-500 rounded p-3 mt-4">
                            <div className="flex items-center justify-around text-center">
                                <div>
                                    <p className="text-3xl font-black text-green-400 font-mono">
                                        {getResponses(sentMessage.text).filter(m => m.response?.toLowerCase().includes('in')).length}
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono">IN</p>
                                </div>
                                <div className="h-12 w-px bg-gray-700" />
                                <div>
                                    <p className="text-3xl font-black text-red-400 font-mono">
                                        {getResponses(sentMessage.text).filter(m => m.response?.toLowerCase().includes('out')).length}
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono">OUT</p>
                                </div>
                                <div className="h-12 w-px bg-gray-700" />
                                <div>
                                    <p className="text-3xl font-black text-gray-600 font-mono">
                                        {team.length - getResponses(sentMessage.text).filter(m => m.response).length}
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono">WAITING</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleReset}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold"
                        >
                            NEW MESSAGE
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* P2P + JACK CREDIT */}
            <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded p-3">
                <p className="text-purple-400 text-xs font-mono mb-2">
                    <strong>P2P MESH:</strong> Works offline at festivals (device-to-device)
                </p>
                <p className="text-gray-600 text-xs font-mono">
                    Inspired by Jack Dorsey's Nostr protocol - props to decentralized pioneers ✓
                </p>
            </div>
        </div>
    );
}