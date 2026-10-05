import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, CheckCircle2, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { LocalLedger } from './LocalLedger';

// 8-BIT SOUND
const playBleep = () => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.05);
        osc.type = 'square';
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
};

export default function P2PTransfer({ userBalance, onSuccess }) {
    const queryClient = useQueryClient();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Listen for QR scan
    useEffect(() => {
        const handleQR = (e) => setRecipient(e.detail);
        window.addEventListener('qr-scanned', handleQR);
        return () => window.removeEventListener('qr-scanned', handleQR);
    }, []);

    const sendMutation = useMutation({
        mutationFn: async () => {
            const user = await base44.auth.me();
            const amt = parseFloat(amount);

            if (amt > userBalance) {
                throw new Error('Not enough P51');
            }

            // Sign it
            const timestamp = Date.now();
            const data = `${user.email}-${recipient}-${amt}-${timestamp}`;
            const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
            const sig = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');

            LocalLedger.recordPendingOut(amt, recipient, 'email', sig);

            if (isOffline) {
                const queue = JSON.parse(localStorage.getItem('p2pQueue') || '[]');
                queue.push({ from: user.email, to: recipient, amount: amt, sig, timestamp });
                localStorage.setItem('p2pQueue', JSON.stringify(queue));
                return { offline: true };
            }

            await base44.entities.Transaction.create({
                from_user: user.email,
                to_user: recipient,
                p51_amount: amt,
                transaction_type: 'sent',
                reason: 'P2P transfer',
                crypto_signature: sig
            });

            await base44.auth.updateMe({ p51_balance: userBalance - amt });
            LocalLedger.confirmTransaction(sig);

            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profileUser'] });
            queryClient.invalidateQueries({ queryKey: ['profileTransactions'] });
            playBleep();
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                onSuccess && onSuccess();
            }, 1500);
        }
    });

    if (showSuccess) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
            >
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-3" />
                <p className="text-2xl font-black font-mono text-green-400">SENT!</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            {isOffline && (
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono bg-amber-900/30 p-2 border border-amber-500/50">
                    <WifiOff className="w-4 h-4" />
                    Offline - will sync later
                </div>
            )}

            {/* RECIPIENT */}
            <div>
                <label className="text-cyan-400 text-xs font-mono font-black mb-1 block">TO</label>
                <Input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="their@email.com"
                    className="bg-black border-2 border-cyan-500/50 text-white font-mono h-12"
                />
            </div>

            {/* AMOUNT */}
            <div>
                <label className="text-cyan-400 text-xs font-mono font-black mb-1 block">AMOUNT</label>
                <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max={userBalance}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="bg-black border-2 border-cyan-500/50 text-white font-mono text-2xl h-14"
                />
                <p className="text-cyan-400/60 text-xs font-mono mt-1">
                    Available: {userBalance?.toFixed(1) || 0} P51
                </p>
            </div>

            {/* SEND BUTTON */}
            <Button
                onClick={() => { playBleep(); sendMutation.mutate(); }}
                disabled={!recipient || !amount || sendMutation.isPending}
                className="w-full bg-cyan-600 hover:bg-cyan-500 border-2 border-cyan-400 text-black font-black font-mono h-14 text-lg active:scale-95 transition-transform"
            >
                {sendMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <Send className="w-5 h-5 mr-2" />
                        SEND
                    </>
                )}
            </Button>

            {sendMutation.isError && (
                <p className="text-red-400 text-xs font-mono text-center">
                    {sendMutation.error?.message || 'Failed'}
                </p>
            )}
        </div>
    );
}