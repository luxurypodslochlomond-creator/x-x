import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, CheckCircle, Mail, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

/**
 * PROF51 REFUND - STUDENTS ALWAYS PROTECTED
 * 
 * If it didn't help, you get money back.
 * No questions, no forms, just love ♾️
 */

export default function Prof51Refund() {
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [submitted, setSubmitted] = useState(false);

    React.useEffect(() => {
        document.title = 'Prof51 Refund - Always Protected ♾️';
    }, []);

    const refundMutation = useMutation({
        mutationFn: async () => {
            // Store refund request
            await base44.entities.AI51Memory.create({
                memory_type: 'conversation',
                content: `Refund request from ${email}`,
                context: reason || 'No reason provided',
                emotional_weight: 'important',
                tags: ['refund', 'prof51', 'student_protection']
            });

            // Email notification
            await base44.integrations.Core.SendEmail({
                to: 'scott@example.com', // Replace with real email
                subject: `Prof51 Refund Request - ${email}`,
                body: `Student refund request:\n\nEmail: ${email}\n\nReason: ${reason || 'None provided'}\n\nProcess immediately with love ♾️`
            });
        },
        onSuccess: () => {
            setSubmitted(true);
        }
    });

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md text-center"
                >
                    <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-2xl p-8">
                        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                        <h1 className="text-3xl font-black text-green-400 font-mono mb-4">REFUND PROCESSING</h1>
                        <p className="text-white text-lg font-mono mb-4">
                            Money back within 24 hours ✓
                        </p>
                        <p className="text-gray-400 text-sm font-mono">
                            We're sorry Prof51 didn't help. You're still protected, still loved ♾️❤️♾️
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-6">
            <div className="max-w-2xl mx-auto py-12">
                
                {/* HEADER */}
                <div className="text-center mb-12">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                        className="inline-block mb-6"
                    >
                        <GraduationCap className="w-20 h-20 text-purple-400" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-white font-mono mb-4">PROF51 REFUND</h1>
                    <p className="text-xl text-purple-400 font-bold font-mono">Students Always Protected</p>
                </div>

                {/* PROMISE */}
                <div className="bg-gradient-to-r from-pink-500/20 to-green-500/20 border-4 border-pink-500 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Heart className="w-12 h-12 text-pink-400" />
                        <div>
                            <h2 className="text-pink-400 font-black text-2xl font-mono">OUR PROMISE:</h2>
                            <p className="text-gray-400 text-sm font-mono">If Prof51 didn't help, money back</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-white text-sm font-mono">
                        <p>✓ No questions asked</p>
                        <p>✓ No forms or proof needed</p>
                        <p>✓ Processed within 24 hours</p>
                        <p>✓ Still loved forever ♾️❤️♾️</p>
                    </div>
                </div>

                {/* WHY WE DO THIS */}
                <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-6 mb-8">
                    <h3 className="text-cyan-400 font-bold text-sm font-mono mb-3">WHY WE DO THIS:</h3>
                    <p className="text-gray-300 text-sm font-mono mb-3">
                        Prof51 exists to HELP students, not extract from them.
                    </p>
                    <p className="text-gray-300 text-sm font-mono">
                        If it didn't help you, we don't deserve your money. Simple as that.
                    </p>
                </div>

                {/* REQUEST FORM */}
                <div className="bg-gradient-to-br from-purple-500/20 to-black border-2 border-purple-500 rounded-xl p-6 mb-6">
                    <h2 className="text-purple-400 font-black text-xl font-mono mb-6">REQUEST REFUND:</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-2 block font-bold">
                                YOUR EMAIL:
                            </label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="student@uni.ac.uk"
                                className="bg-black border-2 border-purple-500/50 text-white font-mono focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-mono mb-2 block font-bold">
                                REASON (OPTIONAL):
                            </label>
                            <Textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Didn't help with my essay / Not what I expected / etc (optional - helps us improve)"
                                rows={4}
                                className="bg-black border-2 border-purple-500/50 text-white font-mono text-sm focus:border-purple-500 resize-none"
                            />
                            <p className="text-gray-600 text-xs font-mono mt-1">
                                Helps us improve but NOT required for refund ✓
                            </p>
                        </div>

                        <Button
                            onClick={() => refundMutation.mutate()}
                            disabled={!email.trim() || refundMutation.isPending}
                            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-black py-4"
                        >
                            {refundMutation.isPending ? 'SUBMITTING...' : 'REQUEST REFUND'}
                        </Button>
                    </div>
                </div>

                {/* REASSURANCE */}
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-400 text-xs font-mono font-bold">
                        ✓ Processed within 24 hours • No judgment • Still family ♾️
                    </p>
                </div>

                {/* FOOTER */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-xs font-mono">
                        Students protected forever • Built for love not extraction ♾️❤️♾️
                    </p>
                </div>
            </div>
        </div>
    );
}