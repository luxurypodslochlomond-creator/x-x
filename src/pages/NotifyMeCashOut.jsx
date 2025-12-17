import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * NOTIFY ME - CASH OUT READY
 * Greatest impact: let people know when $P51→£ is live
 */

export default function NotifyMeCashOut() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const notifyMutation = useMutation({
        mutationFn: async (data) => {
            await base44.entities.AI51ProactiveMessage.create({
                to_user: data.email,
                message_type: 'reminder',
                content: `Notify ${data.email} (${data.phone || 'no phone'}) when $P51→£ cash-out is live`,
                priority: 'important'
            });
        },
        onSuccess: () => {
            setSubmitted(true);
        }
    });

    const handleSubmit = () => {
        if (!email.trim()) return;
        notifyMutation.mutate({ email, phone });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="max-w-md text-center space-y-6"
                >
                    <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
                    <h1 className="text-4xl font-black font-mono">YOU'RE ON THE LIST</h1>
                    <p className="text-xl text-green-400 font-mono">We'll tell you the SECOND cash-out is live</p>
                    <p className="text-gray-400 text-sm font-mono">Keep earning $P51 - it'll be real money in 8-10 weeks ♾️❤️♾️</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-2xl mx-auto space-y-8 py-20">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Bell className="w-16 h-16 text-pink-400 mx-auto" />
                    <h1 className="text-5xl font-black font-mono">NOTIFY ME</h1>
                    <p className="text-xl text-cyan-400 font-mono">When $P51 → £ cash-out is ready</p>
                </motion.div>

                <div className="bg-black border-4 border-amber-500 p-8 space-y-6">
                    <h2 className="text-2xl font-black font-mono text-amber-400">THE PLAN:</h2>
                    <div className="space-y-3 font-mono text-sm">
                        <p className="text-gray-300">✓ Week 1-2: Revolut Business API integration</p>
                        <p className="text-gray-300">✓ Week 3-4: Live testing with small amounts</p>
                        <p className="text-gray-300">✓ Week 5-6: Open to 100 early supporters</p>
                        <p className="text-gray-300">✓ Week 7-8: Full launch - everyone can cash out</p>
                        <p className="text-green-400 font-bold pt-2">Target: 8-10 weeks from now</p>
                    </div>
                </div>

                <div className="bg-black border-4 border-pink-500 p-8 space-y-4">
                    <h2 className="text-xl font-black font-mono text-pink-400">ENTER YOUR INFO:</h2>
                    
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-black border-2 border-pink-500 text-white text-lg font-mono"
                    />

                    <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone (optional)"
                        className="bg-black border-2 border-gray-700 text-white text-lg font-mono"
                    />

                    <Button
                        onClick={handleSubmit}
                        disabled={!email.trim() || notifyMutation.isPending}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-black text-xl py-6 font-mono"
                    >
                        {notifyMutation.isPending ? (
                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> SAVING...</>
                        ) : (
                            <>NOTIFY ME →</>
                        )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center font-mono">
                        We'll ONLY message you when cash-out is live. Zero spam.
                    </p>
                </div>

                <div className="bg-black border-4 border-cyan-500 p-6">
                    <h2 className="text-lg font-black font-mono text-cyan-400 mb-3">MEANWHILE:</h2>
                    <div className="space-y-2 font-mono text-sm text-gray-300">
                        <p>→ Keep earning $P51 by cleaning Earth</p>
                        <p>→ Spend on music (artists keep 90%)</p>
                        <p>→ Use healing frequencies</p>
                        <p className="text-white font-bold pt-2">Your $P51 will be ready to cash out when we launch ✓</p>
                    </div>
                </div>

            </div>
        </div>
    );
}