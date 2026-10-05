import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, Shield, Zap, Users, Info, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import P51Symbol from '@/components/shared/P51Symbol';

export default function AllyBridgePage() {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('GBP');
    const [showSuccess, setShowSuccess] = useState(false);
    
    const queryClient = useQueryClient();

    // Check for success/cancel in URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('success') === 'true') {
            setShowSuccess(true);
            setAmount(params.get('amount') || '');
        }
    }, []);

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => base44.auth.me()
    });

    const createCheckoutMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.functions.invoke('createAllyCheckout', data);
        },
        onSuccess: (response) => {
            // Redirect to Stripe checkout
            window.location.href = response.data.checkout_url;
        }
    });

    const handlePurchase = async (e) => {
        e.preventDefault();
        
        const p51Amount = parseFloat(amount);
        if (!p51Amount || p51Amount <= 0) return;

        await createCheckoutMutation.mutateAsync({
            p51_amount: p51Amount,
            currency: currency
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white p-6 pt-24 lg:pt-6">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3">
                        <Heart className="w-12 h-12 text-pink-500" />
                        <Shield className="w-12 h-12 text-cyan-500" />
                    </div>
                    <h1 className="text-5xl font-black">
                        BECOME AN <span className="text-cyan-400">ALLY</span>
                    </h1>
                    <p className="text-xl text-gray-300">
                        Support healers. Provide liquidity. Enable cash-outs.
                    </p>
                </motion.div>

                {/* HEALER VS ALLY EXPLANATION */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-8 h-8 text-green-400" />
                            <h2 className="text-2xl font-black text-green-400">HEALERS</h2>
                        </div>
                        <div className="space-y-3 text-gray-300">
                            <p><strong className="text-white">EARN</strong> <P51Symbol /> through action:</p>
                            <ul className="space-y-2 text-sm">
                                <li>✓ Clean litter (1kg = 1 P51)</li>
                                <li>✓ Prove love actions</li>
                                <li>✓ Complete missions</li>
                            </ul>
                            <p className="text-green-300 font-bold mt-4">
                                Balance = proof you healed Earth
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-cyan-400" />
                            <h2 className="text-2xl font-black text-cyan-400">ALLIES</h2>
                        </div>
                        <div className="space-y-3 text-gray-300">
                            <p><strong className="text-white">BUY</strong> <P51Symbol /> to support:</p>
                            <ul className="space-y-2 text-sm">
                                <li>✓ Provide cash-out liquidity</li>
                                <li>✓ Enable healer withdrawals</li>
                                <li>✓ Fund the system</li>
                            </ul>
                            <p className="text-cyan-300 font-bold mt-4">
                                Balance = proof you supported healers
                            </p>
                        </div>
                    </div>
                </div>

                {/* THE DISTINCTION */}
                <div className="bg-pink-900/20 border-2 border-pink-500/50 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <Info className="w-6 h-6 text-pink-400" />
                        <h3 className="text-xl font-black text-pink-400">THE CRITICAL DISTINCTION</h3>
                    </div>
                    <div className="space-y-3 text-gray-300">
                        <p>
                            When you <strong className="text-cyan-400">buy P51 as an Ally</strong>, 
                            you're <strong className="text-white">funding the healers</strong>.
                        </p>
                        <p>
                            You're <strong className="text-pink-400">NOT claiming</strong> you cleaned Earth yourself. 
                            You're saying: <strong className="text-white">"I believe in this system enough to put my money behind it."</strong>
                        </p>
                        <p className="text-cyan-300 font-bold">
                            Healers earn through action. Allies support through capital. Both are essential. ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* PURCHASE FORM */}
                <form onSubmit={handlePurchase} className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500/50 rounded-xl p-8 space-y-6">
                    <h2 className="text-3xl font-black text-indigo-400">BUY AS ALLY</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">
                                Amount of <P51Symbol /> to purchase
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="100"
                                className="w-full bg-black/60 border border-indigo-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                                required
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">
                                Currency
                            </label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full bg-black/60 border border-indigo-500/50 rounded-lg px-4 py-3 text-white"
                            >
                                <option value="GBP">GBP (£)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                            </select>
                        </div>

                        <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-cyan-400" />
                                <p className="text-cyan-300 font-bold">Instant Payment via Stripe</p>
                            </div>
                            <p className="text-gray-300 text-sm">
                                <strong>Rate:</strong> 1 P51 = 1 {currency}
                                <br/>
                                <strong>Methods:</strong> Card, PayPal
                                <br/>
                                <strong>Processing:</strong> Instant (balance credited immediately)
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={createCheckoutMutation.isPending}
                        className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-black text-lg px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        style={{
                            boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
                        }}
                    >
                        <CreditCard className="w-6 h-6" />
                        {createCheckoutMutation.isPending ? 'REDIRECTING TO CHECKOUT...' : 'PAY WITH STRIPE'}
                    </button>
                </form>

                {/* SUCCESS MESSAGE */}
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6 text-center space-y-3"
                    >
                        <Heart className="w-12 h-12 text-green-400 mx-auto" />
                        <h3 className="text-2xl font-black text-green-400">PAYMENT SUCCESSFUL</h3>
                        <p className="text-gray-300">
                            {amount} <P51Symbol /> has been added to your balance instantly!
                        </p>
                        <p className="text-cyan-300 text-sm font-bold">
                            Thank you for supporting the healers. ♾️❤️♾️
                        </p>
                    </motion.div>
                )}

                {/* WHY THIS MATTERS */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-8 space-y-4">
                    <h3 className="text-2xl font-black text-purple-400">WHY ALLIES MATTER</h3>
                    <div className="space-y-3 text-gray-300">
                        <p>
                            Without Allies, Healers couldn't cash out. Your capital creates the bridge 
                            between <P51Symbol /> and fiat.
                        </p>
                        <p>
                            You're not claiming you healed Earth. You're saying:
                        </p>
                        <ul className="space-y-2 text-sm ml-6">
                            <li>• "I believe in this system"</li>
                            <li>• "I want healers to get paid"</li>
                            <li>• "I'm funding the revolution"</li>
                        </ul>
                        <p className="text-purple-300 font-bold mt-4">
                            Healers do the work. Allies provide the infrastructure. Both are sacred.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}