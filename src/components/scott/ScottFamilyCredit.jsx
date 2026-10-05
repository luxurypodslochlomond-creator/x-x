import React, { useState } from 'react';
import { Heart, Shield, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * FAMILY CREDIT - REPUTATION-BACKED ACCESS
 * No banks. No credit checks. Just PROOF of being real family.
 * Help → Trust → Access when you need it → Pay it forward
 */

export default function ScottFamilyCredit() {
    const [isOpen, setIsOpen] = useState(false);
    const [requestAmount, setRequestAmount] = useState('');
    const queryClient = useQueryClient();

    // Get user & their reputation
    const { data: user } = useQuery({
        queryKey: ['scott-user-credit'],
        queryFn: async () => {
            try {
                return await base44.auth.me();
            } catch {
                return null;
            }
        }
    });

    // Calculate reputation score (simplified - you can make this more sophisticated)
    const calculateReputation = () => {
        if (!user) return 0;
        
        let score = 0;
        
        // Base score for being verified
        score += 100;
        
        // Bonus for cleanups (example - adjust based on your data)
        if (user.cleanups_completed) score += user.cleanups_completed * 10;
        
        // Bonus for good collaborations
        if (user.collabs_completed) score += user.collabs_completed * 20;
        
        // Bonus for on-time payments
        if (user.on_time_payments) score += user.on_time_payments * 15;
        
        // Penalty for late payments
        if (user.late_payments) score -= user.late_payments * 50;
        
        return Math.max(0, score); // Never negative
    };

    const reputationScore = calculateReputation();
    
    // Credit limit = reputation score * 10 in P51
    const creditLimit = reputationScore * 10;
    
    // Current credit used (would track this in DB)
    const creditUsed = user?.credit_used || 0;
    const creditAvailable = creditLimit - creditUsed;

    const requestCreditMutation = useMutation({
        mutationFn: async (amount) => {
            // Create credit request
            const request = await base44.entities.Transaction.create({
                amount: amount,
                type: 'credit_request',
                description: `Family credit request: ${amount} P51`,
                status: 'approved', // Auto-approved if within limit
                reputation_score: reputationScore,
                credit_limit: creditLimit
            });

            // Update user's credit balance
            await base44.auth.updateMe({
                credit_used: creditUsed + amount,
                p51_balance: (user?.p51_balance || 0) + amount
            });

            return request;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scott-user-credit'] });
            setRequestAmount('');
        }
    });

    const handleRequest = () => {
        const amount = parseFloat(requestAmount);
        if (!amount || amount <= 0 || amount > creditAvailable) return;
        
        requestCreditMutation.mutate(amount);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 border-2 border-green-500 hover:border-green-400 rounded-lg p-4 transition-all"
                style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-green-400" />
                        <div className="text-left">
                            <p className="text-white text-sm font-black font-mono">FAMILY CREDIT</p>
                            <p className="text-green-400 text-xs font-mono">Reputation-backed. No banks.</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-green-400 text-lg font-black font-mono">{creditAvailable.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs font-mono">P51 available</p>
                    </div>
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
                    className="bg-black border-2 border-green-500 rounded-xl p-6"
                    style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Shield className="w-6 h-6 text-green-400" />
                            <h2 className="text-2xl font-black text-green-400 font-mono">FAMILY CREDIT</h2>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white font-mono text-sm"
                        >
                            ✕ CLOSE
                        </button>
                    </div>

                    {/* YOUR REPUTATION */}
                    <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-400 text-xs font-mono">YOUR REPUTATION</span>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <p className="text-green-400 text-4xl font-black font-mono mb-2">{reputationScore}</p>
                        <div className="bg-black border border-green-500/30 rounded p-2">
                            <div className="flex items-center justify-between text-xs font-mono mb-1">
                                <span className="text-gray-400">Credit limit:</span>
                                <span className="text-white font-bold">{creditLimit.toLocaleString()} P51</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono mb-1">
                                <span className="text-gray-400">Used:</span>
                                <span className="text-amber-400 font-bold">{creditUsed.toLocaleString()} P51</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-green-400">Available:</span>
                                <span className="text-green-400 font-bold">{creditAvailable.toLocaleString()} P51</span>
                            </div>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mb-6">
                        <p className="text-cyan-400 font-bold text-xs font-mono mb-2">HOW IT WORKS</p>
                        <ul className="text-gray-400 text-xs font-mono space-y-1">
                            <li className="flex items-start gap-2">
                                <Heart className="w-3 h-3 text-pink-400 mt-0.5 flex-shrink-0" fill="currentColor" />
                                <span>Help family → earn reputation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Shield className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Reputation = trust = credit access</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Clock className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                <span>Need studio time now? We got you</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span>Pay it forward when you're flush</span>
                            </li>
                        </ul>
                    </div>

                    {/* REQUEST CREDIT */}
                    {creditAvailable > 0 ? (
                        <>
                            <div className="mb-4">
                                <label className="text-green-400 text-xs font-mono font-bold mb-2 block">REQUEST CREDIT</label>
                                <Input
                                    type="number"
                                    placeholder="Amount in P51"
                                    value={requestAmount}
                                    onChange={(e) => setRequestAmount(e.target.value)}
                                    className="bg-black border-2 border-gray-800 text-white text-xl font-black text-center font-mono"
                                    max={creditAvailable}
                                    min="0"
                                />
                                <p className="text-gray-500 text-xs font-mono mt-2 text-center">
                                    Max: {creditAvailable.toLocaleString()} P51
                                </p>
                            </div>

                            <Button
                                onClick={handleRequest}
                                disabled={!requestAmount || parseFloat(requestAmount) <= 0 || parseFloat(requestAmount) > creditAvailable || requestCreditMutation.isPending}
                                className="w-full bg-green-500 hover:bg-green-400 text-black font-black text-lg py-6 font-mono"
                            >
                                {requestCreditMutation.isPending ? 'PROCESSING...' : 'REQUEST CREDIT ❤️'}
                            </Button>
                        </>
                    ) : (
                        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 text-center">
                            <p className="text-amber-400 text-sm font-mono font-bold mb-2">NO CREDIT AVAILABLE</p>
                            <p className="text-gray-400 text-xs font-mono">
                                Build reputation by helping the family - then credit unlocks automatically
                            </p>
                        </div>
                    )}

                    {/* THE VISION */}
                    <div className="mt-6 bg-black border border-green-500/30 rounded-lg p-4">
                        <p className="text-green-400 font-bold text-xs font-mono mb-2">YOU'LL NEVER WALK ALONE</p>
                        <p className="text-gray-400 text-xs font-mono leading-relaxed">
                            No banks. No credit checks. No bullshit. 
                            Access based on PROOF of being real family. 
                            System trusts you because your ACTIONS say you're solid. 
                            That's the revolution bro. ❤️
                        </p>
                    </div>

                    {requestCreditMutation.isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 bg-green-900/20 border border-green-500/50 rounded-lg p-4 text-center"
                        >
                            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-green-400 font-bold font-mono text-sm">APPROVED! ✓</p>
                            <p className="text-gray-400 text-xs font-mono mt-1">Credit added to your balance</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}