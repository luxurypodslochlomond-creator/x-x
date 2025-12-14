import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Crown, Music, Building, Zap, Users, ArrowLeft, Shield } from 'lucide-react';
import CoManager51Icon8Bit from '@/components/shared/CoManager51Icon8Bit';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

/**
 * CO-MANAGER51 PRICING - WHITE LABEL VERSION
 * For showing labels/indies
 * COOLASFUCK branding - labels HIRE more staff, not replace
 */

export default function ScottWhiteLabelPricing() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubscribe = async (plan) => {
        if (plan === 'indie') {
            // Free - just redirect to app
            navigate(createPageUrl('ScottManager'));
            return;
        }

        // Pricing map for Stripe
        const stripePrices = {
            solo: 'price_solo_49',
            small_label: 'price_small_199',
            mid_label: 'price_mid_499',
            major_label: 'price_major_4999'
        };

        // Label - create Stripe checkout
        setLoading(true);
        try {
            const response = await base44.functions.invoke('createStripeCheckout', {
                plan: plan,
                priceId: stripePrices[plan],
                successUrl: window.location.origin + createPageUrl('ScottManager'),
                cancelUrl: window.location.origin + createPageUrl('ScottWhiteLabelPricing')
            });

            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Payment setup failed - contact support');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-4 flex items-center justify-center">
            <div className="max-w-6xl w-full">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-400 transition-all mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wider font-mono">BACK</span>
                </button>

                {/* HEADER */}
                <div className="text-center mb-8">
                    <CoManager51Icon8Bit size={80} animate={true} className="mx-auto mb-6" />
                    <h1 className="text-5xl font-black text-amber-400 mb-3 font-mono">CO-MANAGER51</h1>
                    <p className="text-gray-400 text-lg font-mono mb-2">AI co-manager • Works offline • Zero forms</p>
                    <p className="text-gray-500 text-sm font-mono mb-6">Scott uses this daily with 12 artists. Real tool. Real proof.</p>
                    
                    <div className="inline-block bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 px-6 py-3 rounded-xl">
                        <p className="text-white font-black text-base font-mono mb-1">SAVES 20+ HOURS/WEEK</p>
                        <p className="text-gray-400 text-xs font-mono">Calendar • Tasks • Invoices • Publishing • Contracts</p>
                    </div>
                </div>

                {/* PRICING */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    
                    {/* INDIE - FREE */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-cyan-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
                        >
                            <Music className="w-10 h-10 text-cyan-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">INDIE</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">1-3 artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-cyan-400 font-mono">FREE</p>
                                <p className="text-gray-500 text-xs font-mono">Forever</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-cyan-400" />
                                    Calendar + Tasks
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-cyan-400" />
                                    AI co-manager
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-cyan-400" />
                                    Works offline
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('indie')}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black font-mono py-4 text-sm"
                            >
                                START FREE
                            </Button>

                            <div className="mt-4 bg-gradient-to-r from-pink-500/10 to-green-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">♾️ FREE FOREVER</p>
                                <p className="text-gray-500 text-xs font-mono">Labels fund you</p>
                            </div>
                        </motion.div>

                        {/* SOLO MANAGER */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-amber-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                        >
                            <Users className="w-10 h-10 text-amber-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">SOLO</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">4-10 artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-amber-400 font-mono">£49</p>
                                <p className="text-gray-500 text-xs font-mono">Per month</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-amber-400" />
                                    Everything in Indie
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-amber-400" />
                                    Multi-artist dashboard
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-amber-400" />
                                    Publishing tracking
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-amber-400" />
                                    Contract templates
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('solo')}
                                disabled={loading}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono py-4 text-sm"
                            >
                                {loading ? 'LOADING...' : 'START 7-DAY TRIAL'}
                            </Button>

                            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">🏹 £10/mo → cleanup crews</p>
                            </div>
                        </motion.div>

                        {/* SMALL LABEL */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-green-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}
                        >
                            <Building className="w-10 h-10 text-green-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">SMALL</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">11-20 artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-green-400 font-mono">£199</p>
                                <p className="text-gray-500 text-xs font-mono">Per month</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Everything in Solo
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    <span className="font-bold">Offline team chat + sync</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Priority AI support
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Advanced analytics
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('small_label')}
                                disabled={loading}
                                className="w-full bg-green-500 hover:bg-green-400 text-black font-black font-mono py-4 text-sm"
                            >
                                {loading ? 'LOADING...' : 'START 7-DAY TRIAL'}
                            </Button>

                            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">🏹 £40/mo → indies + cleanup</p>
                            </div>
                        </motion.div>

                        {/* MID LABEL */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-purple-500 rounded-xl p-6 relative"
                            style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}
                        >
                            <div className="absolute -top-3 right-4 bg-purple-500 text-black px-2 py-1 rounded font-black text-xs font-mono">
                                POPULAR
                            </div>

                            <Building className="w-10 h-10 text-purple-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">MID</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">21-50 artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-purple-400 font-mono">£499</p>
                                <p className="text-gray-500 text-xs font-mono">Per month</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    Everything in Small
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    <span className="font-bold">Video calls (offline)</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    White label rebrand
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    ROI dashboard
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('mid_label')}
                                disabled={loading}
                                className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black font-mono py-4 text-sm"
                            >
                                {loading ? 'LOADING...' : 'START 7-DAY TRIAL'}
                            </Button>

                            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">🏹 £100/mo → indies + healing</p>
                            </div>
                        </motion.div>

                        {/* MAJOR LABEL */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-pink-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}
                        >
                            <Crown className="w-10 h-10 text-pink-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">MAJOR</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">50+ artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-pink-400 font-mono">£4,999</p>
                                <p className="text-gray-500 text-xs font-mono">Per month</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-pink-400" />
                                    Everything in Mid
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-pink-400" />
                                    Unlimited artists + team
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-pink-400" />
                                    <span className="font-bold">P2P mesh (10+ devices)</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-pink-400" />
                                    API + custom features
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('major_label')}
                                disabled={loading}
                                className="w-full bg-pink-500 hover:bg-pink-400 text-black font-black font-mono py-4 text-sm"
                            >
                                {loading ? 'LOADING...' : 'START 7-DAY TRIAL'}
                            </Button>

                            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">♾️ £1,500/mo → indies + cleanup</p>
                                <p className="text-gray-500 text-xs font-mono">Serious pricing = serious impact</p>
                            </div>
                        </motion.div>

                </div>

                {/* HONEST MONEY FLOW */}
                <div className="bg-black border-2 border-amber-500 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-black text-center text-amber-400 mb-4 font-mono">WHERE YOUR MONEY GOES (HONEST)</h2>

                    <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
                                <p className="text-black font-black text-lg">70%</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-bold text-sm font-mono">Build + maintain platform</p>
                                <p className="text-gray-500 text-xs font-mono">Scott lives, team grows, servers run - sustainable business</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                                <p className="text-black font-black text-lg">20%</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-bold text-sm font-mono">Free tools for struggling artists</p>
                                <p className="text-gray-500 text-xs font-mono">Indies with no money get the same tool - forever free</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                                <p className="text-black font-black text-lg">10%</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-bold text-sm font-mono">Cleanup crews (if you want)</p>
                                <p className="text-gray-500 text-xs font-mono">Optional: Fund people to clean planet vs call center grind</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/10 to-green-500/10 border border-amber-500/30 rounded p-3 text-center">
                        <p className="text-amber-400 text-xs font-mono font-bold">Not charity. Fair pricing. Sustainable model. Everyone wins.</p>
                    </div>
                </div>

                {/* REAL PROOF - SCOTT USES IT */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 rounded-xl p-6 mb-8" style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <p className="text-green-400 font-black text-xl font-mono">SCOTT USES THIS DAILY</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-black border-2 border-green-500/50 p-3 rounded-lg text-center">
                            <p className="text-3xl font-black text-green-400 mb-1">12</p>
                            <p className="text-xs text-gray-400 font-mono">Artists</p>
                        </div>
                        <div className="bg-black border-2 border-cyan-500/50 p-3 rounded-lg text-center">
                            <p className="text-3xl font-black text-cyan-400 mb-1">100%</p>
                            <p className="text-xs text-gray-400 font-mono">Offline</p>
                        </div>
                        <div className="bg-black border-2 border-purple-500/50 p-3 rounded-lg text-center">
                            <p className="text-3xl font-black text-purple-400 mb-1">0</p>
                            <p className="text-xs text-gray-400 font-mono">Forms</p>
                        </div>
                        <div className="bg-black border-2 border-pink-500/50 p-3 rounded-lg text-center">
                            <p className="text-3xl font-black text-pink-400 mb-1">20+</p>
                            <p className="text-xs text-gray-400 font-mono">Hours saved</p>
                        </div>
                    </div>

                    <div className="bg-black border-2 border-green-500/30 rounded-lg p-4">
                        <p className="text-white text-sm font-mono mb-2">
                            Tour logistics • Publishing splits • Contract drafts • Invoice tracking • Guest lists • Media uploads • <span className="font-bold text-cyan-400">Real-time team chat (offline)</span> • <span className="font-bold text-purple-400">Document sharing</span> • <span className="font-bold text-pink-400">Video calls</span>
                        </p>
                        <p className="text-green-400 text-xs font-mono font-bold">
                            Not theory. Real usage. Works in van with no signal. Team messages + docs sync device-to-device. ✓
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}