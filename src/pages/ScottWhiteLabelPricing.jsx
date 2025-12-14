import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Crown, Music, Building, Zap, Users } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
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

        // Label - create Stripe checkout
        setLoading(true);
        try {
            const response = await base44.functions.invoke('createStripeCheckout', {
                plan: 'label',
                priceId: 'price_label_99', // Set this in Stripe dashboard
                successUrl: window.location.origin + createPageUrl('ScottManager'),
                cancelUrl: window.location.origin + createPageUrl('ScottWhiteLabelPricing')
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            alert('Payment setup failed - email support');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-4 flex items-center justify-center">
            <div className="max-w-6xl w-full">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <Kingdom51Crown8Bit size={80} animate={true} className="mx-auto mb-6" />
                    <h1 className="text-5xl font-black text-amber-400 mb-3 font-mono">CO-MANAGER51</h1>
                    <p className="text-gray-400 text-sm font-mono mb-3">AI co-manager for music industry</p>
                    <div className="inline-block bg-gradient-to-r from-pink-500/20 to-green-500/20 border-2 border-pink-500 px-4 py-2 rounded-lg">
                        <p className="text-pink-400 font-black text-sm font-mono">🏹 ROBIN HOOD PRICING</p>
                        <p className="text-gray-400 text-xs font-mono">Labels fund free indie artists</p>
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

                            <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
                                <p className="text-cyan-400 text-xs font-mono font-bold">🏹 Funded by labels</p>
                            </div>
                        </motion.div>

                        {/* SMALL LABEL */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-amber-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                        >
                            <Building className="w-10 h-10 text-amber-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">SMALL</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">4-10 artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-amber-400 font-mono">£99</p>
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
                                onClick={() => handleSubscribe('small_label')}
                                disabled={loading}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono py-4 text-sm"
                            >
                                {loading ? 'LOADING...' : 'START 7-DAY TRIAL'}
                            </Button>

                            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">🏹 £20/mo funds indies</p>
                            </div>
                        </motion.div>

                        {/* MID LABEL */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-black border-4 border-green-500 rounded-xl p-6 relative"
                            style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)' }}
                        >
                            <div className="absolute -top-3 right-4 bg-green-500 text-black px-2 py-1 rounded font-black text-xs font-mono">
                                POPULAR
                            </div>

                            <Building className="w-10 h-10 text-green-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">MID</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">11-30 artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-green-400 font-mono">£499</p>
                                <p className="text-gray-500 text-xs font-mono">Per month</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Everything in Small
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    ROI dashboard
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    White label rebrand
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-green-400" />
                                    Priority support
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('mid_label')}
                                disabled={loading}
                                className="w-full bg-green-500 hover:bg-green-400 text-black font-black font-mono py-4 text-sm"
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
                            className="bg-black border-4 border-purple-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}
                        >
                            <Crown className="w-10 h-10 text-purple-400 mb-3" />
                            <h2 className="text-2xl font-black text-white mb-1 font-mono">MAJOR</h2>
                            <p className="text-gray-400 text-xs mb-4 font-mono">30+ artists</p>

                            <div className="mb-4">
                                <p className="text-4xl font-black text-purple-400 font-mono">£2,499</p>
                                <p className="text-gray-500 text-xs font-mono">Per month</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    Everything in Mid
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    Unlimited artists
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    API access
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white font-mono">
                                    <Check className="w-4 h-4 text-purple-400" />
                                    Dedicated support
                                </div>
                            </div>

                            <Button
                                onClick={() => handleSubscribe('major_label')}
                                disabled={loading}
                                className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black font-mono py-4 text-sm"
                            >
                                {loading ? 'LOADING...' : 'CONTACT US'}
                            </Button>

                            <div className="mt-4 bg-pink-500/10 border border-pink-500/30 rounded p-2">
                                <p className="text-pink-400 text-xs font-mono font-bold">🏹 £750/mo → indies + healing</p>
                            </div>
                        </motion.div>

                </div>

                {/* WHERE THE MONEY GOES */}
                <div className="bg-gradient-to-r from-pink-500/20 to-green-500/20 border-4 border-pink-500 rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-black text-center text-pink-400 mb-6 font-mono">🏹 WHERE YOUR MONEY GOES</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-black border-2 border-amber-500 rounded-lg p-4 text-center">
                            <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                            <p className="text-amber-400 font-black text-lg font-mono mb-1">70%</p>
                            <p className="text-white text-sm font-mono">Build Co-Manager51</p>
                            <p className="text-gray-500 text-xs font-mono mt-1">Team, servers, growth - sustainable</p>
                        </div>

                        <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 text-center">
                            <Music className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                            <p className="text-cyan-400 font-black text-lg font-mono mb-1">20%</p>
                            <p className="text-white text-sm font-mono">Free indie artists</p>
                            <p className="text-gray-500 text-xs font-mono mt-1">Zero cost for struggling artists</p>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4 text-center">
                            <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="text-green-400 font-black text-lg font-mono mb-1">10%</p>
                            <p className="text-white text-sm font-mono">Healing + planet</p>
                            <p className="text-gray-500 text-xs font-mono mt-1">Mental health + environment</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-black border-2 border-pink-500 rounded-lg p-4 text-center">
                        <p className="text-white font-black text-sm font-mono mb-1">ETHICAL + PROFITABLE = SUSTAINABLE</p>
                        <p className="text-gray-400 text-xs font-mono">Labels pay. Scott builds. Indies stay free. Everyone wins.</p>
                    </div>
                </div>

                {/* VALUE PROOF - HIRE MORE STAFF */}
                <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6 text-center">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <p className="text-white font-black text-xl mb-2 font-mono">Free up 20+ hours/week per manager</p>
                    <p className="text-gray-400 text-sm font-mono">Your team handles strategy • AI handles admin</p>
                    <p className="text-green-400 text-xs font-mono mt-2">Hire MORE staff • Scale faster • Indies get freed • Planet heals</p>
                </div>

            </div>
        </div>
    );
}