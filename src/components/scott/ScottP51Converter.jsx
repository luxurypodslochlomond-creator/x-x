import React, { useState } from 'react';
import { DollarSign, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * KINGDOM51 × P51 CONVERTER
 * Artists convert earnings → love currency
 * Spend on studio, gear, visas, other artists
 * ZERO EXTRACTION - value stays in family
 */

export default function ScottP51Converter() {
    const [isOpen, setIsOpen] = useState(false);
    const [amountGBP, setAmountGBP] = useState('');
    const [convertSuccess, setConvertSuccess] = useState(false);

    // Conversion rate: £1 = 100 P51 (can adjust)
    const conversionRate = 100;
    const totalP51 = amountGBP ? parseFloat(amountGBP) * conversionRate : 0;
    const uf51Fee = totalP51 * 0.1; // 10% to UF51 verified healing
    const amountP51 = totalP51 - uf51Fee; // Artist receives 90%

    // Get current user's wallet (if exists)
    const { data: user } = useQuery({
        queryKey: ['scott-user'],
        queryFn: async () => {
            try {
                return await base44.auth.me();
            } catch {
                return null;
            }
        }
    });

    const convertMutation = useMutation({
        mutationFn: async (data) => {
            // Create transaction record (artist receives 90%, 10% to UF51)
            const transaction = await base44.entities.Transaction.create({
                amount: data.amountP51,
                type: 'convert_fiat',
                description: `Converted £${data.amountGBP} to ${data.amountP51} P51 (90% to artist, 10% to UF51 healing)`,
                status: 'completed',
                from_currency: 'GBP',
                to_currency: 'P51',
                conversion_rate: conversionRate,
                uf51_fee: data.uf51Fee
            });

            // Update user balance (if wallet exists)
            if (user?.p51_balance !== undefined) {
                await base44.auth.updateMe({
                    p51_balance: (user.p51_balance || 0) + data.amountP51
                });
            }

            return transaction;
        },
        onSuccess: () => {
            setConvertSuccess(true);
            setAmountGBP('');
            setTimeout(() => {
                setConvertSuccess(false);
                setIsOpen(false);
            }, 3000);
        }
    });

    const handleConvert = () => {
        if (!amountGBP || parseFloat(amountGBP) <= 0) return;
        
        convertMutation.mutate({
            amountGBP: parseFloat(amountGBP),
            amountP51: amountP51,
            uf51Fee: uf51Fee
        });
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border-2 border-pink-500 hover:border-pink-400 rounded-lg p-4 transition-all"
                style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
                        </div>
                        <div className="text-left">
                            <p className="text-white text-sm font-black font-mono">CONVERT TO P51</p>
                            <p className="text-pink-400 text-xs font-mono">Your money → Love currency</p>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-pink-400" />
                </div>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto p-4">
            <div className="max-w-md mx-auto py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black border-2 border-pink-500 rounded-xl p-6"
                    style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                            <h2 className="text-2xl font-black text-pink-400 font-mono">CONVERT</h2>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white font-mono text-sm"
                        >
                            ✕ CLOSE
                        </button>
                    </div>

                    {convertSuccess ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center py-12"
                        >
                            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-pulse" fill="currentColor" />
                            <p className="text-pink-400 text-2xl font-black font-mono mb-2">CONVERTED! ❤️</p>
                            <p className="text-gray-400 text-sm font-mono">Welcome to the love economy</p>
                        </motion.div>
                    ) : (
                        <>
                            {/* WHY */}
                            <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 mb-6">
                                <p className="text-pink-400 font-bold text-xs font-mono mb-2">WHY CONVERT?</p>
                                <ul className="text-gray-400 text-xs font-mono space-y-1">
                                    <li>• Pay other artists in P51</li>
                                    <li>• Book studio time</li>
                                    <li>• Buy gear from family</li>
                                    <li>• Zero extraction - stays in music</li>
                                </ul>
                            </div>

                            {/* CONVERTER */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-xs font-mono font-bold mb-2 block">FROM: £ GBP</label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={amountGBP}
                                        onChange={(e) => setAmountGBP(e.target.value)}
                                        className="bg-black border-2 border-gray-800 text-white text-2xl font-black text-center font-mono"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="flex items-center justify-center">
                                    <ArrowRight className="w-6 h-6 text-pink-400" />
                                </div>

                                <div>
                                    <label className="text-pink-400 text-xs font-mono font-bold mb-2 block">YOU RECEIVE: P51</label>
                                    <div className="bg-pink-900/20 border-2 border-pink-500 rounded-lg p-4">
                                        <p className="text-pink-400 text-3xl font-black text-center font-mono">
                                            {amountP51.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {amountGBP && (
                                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
                                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                                            <span className="text-gray-400">Total P51:</span>
                                            <span className="text-white font-bold">{totalP51.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                                            <span className="text-gray-400">You receive (90%):</span>
                                            <span className="text-pink-400 font-bold">{amountP51.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-mono">
                                            <span className="text-cyan-400">UF51 Healing (10%):</span>
                                            <span className="text-cyan-400 font-bold">{uf51Fee.toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}

                                <p className="text-gray-500 text-xs font-mono text-center">
                                    Rate: £1 = {conversionRate} P51
                                </p>
                            </div>

                            {/* CONVERT BUTTON */}
                            <Button
                                onClick={handleConvert}
                                disabled={!amountGBP || parseFloat(amountGBP) <= 0 || convertMutation.isPending}
                                className="w-full mt-6 bg-pink-500 hover:bg-pink-400 text-black font-black text-lg py-6 font-mono"
                            >
                                {convertMutation.isPending ? 'CONVERTING...' : 'CONVERT TO P51 ❤️'}
                            </Button>

                            {/* INFO */}
                            <div className="mt-6 bg-black border border-pink-500/30 rounded-lg p-4">
                                <p className="text-pink-400 font-bold text-xs font-mono mb-2">CIRCULAR ECONOMY</p>
                                <p className="text-gray-400 text-xs font-mono leading-relaxed mb-3">
                                    Your money becomes love currency. Spend it in the music family. 
                                    Value stays with creators, not extracted by middlemen.
                                </p>
                                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-2">
                                    <p className="text-cyan-400 text-xs font-mono">
                                        ❤️ 10% → UF51 verified healing (not Fanny Bawz)
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}