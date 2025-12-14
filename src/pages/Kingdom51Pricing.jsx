import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Crown, Music, Building, Zap } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

/**
 * KINGDOM51 PRICING
 * Indie free → Label £99/month via Stripe
 * COOLASFUCK but real payment flow
 */

export default function Kingdom51Pricing() {
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
                cancelUrl: window.location.origin + createPageUrl('Kingdom51Pricing')
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
            <div className="max-w-5xl w-full">
                
                {/* HEADER */}
                <div className="text-center mb-12">
                    <Kingdom51Crown8Bit size={80} animate={true} className="mx-auto mb-6" />
                    <h1 className="text-5xl font-black text-amber-400 mb-3 font-mono">CO-MANAGER51</h1>
                    <p className="text-gray-400 text-sm font-mono">AI co-manager for music industry</p>
                </div>

                {/* PRICING */}
                <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* INDIE */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-black border-4 border-cyan-500 rounded-xl p-8"
                        style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
                    >
                        <Music className="w-12 h-12 text-cyan-400 mb-4" />
                        <h2 className="text-3xl font-black text-white mb-2 font-mono">INDIE</h2>
                        <p className="text-gray-400 text-sm mb-6 font-mono">Solo artist, band, producer</p>
                        
                        <div className="mb-6">
                            <p className="text-5xl font-black text-cyan-400 font-mono">FREE</p>
                            <p className="text-gray-500 text-sm font-mono">Forever</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-cyan-400" />
                                Calendar + Tasks
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-cyan-400" />
                                AI drafts messages
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-cyan-400" />
                                Gig tracking
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-cyan-400" />
                                Works offline
                            </div>
                        </div>

                        <Button
                            onClick={() => handleSubscribe('indie')}
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black font-mono py-6 text-lg"
                        >
                            START FREE
                        </Button>
                    </motion.div>

                    {/* LABEL */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-black border-4 border-amber-500 rounded-xl p-8 relative"
                        style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                    >
                        <div className="absolute -top-4 right-4 bg-green-500 text-black px-3 py-1 rounded font-black text-xs font-mono">
                            2500x ROI
                        </div>

                        <Building className="w-12 h-12 text-amber-400 mb-4" />
                        <h2 className="text-3xl font-black text-white mb-2 font-mono">LABEL</h2>
                        <p className="text-gray-400 text-sm mb-6 font-mono">Manage roster, rights, ROI</p>
                        
                        <div className="mb-6">
                            <p className="text-5xl font-black text-amber-400 font-mono">£99</p>
                            <p className="text-gray-500 text-sm font-mono">Per month / 10 artists</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-amber-400" />
                                Everything in Indie
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-amber-400" />
                                Multi-artist dashboard
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-amber-400" />
                                Publishing rights tracking
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-amber-400" />
                                Contract templates (AI)
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-amber-400" />
                                ROI dashboard
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Check className="w-5 h-5 text-amber-400" />
                                White label rebrand
                            </div>
                        </div>

                        <Button
                            onClick={() => handleSubscribe('label')}
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono py-6 text-lg"
                        >
                            {loading ? 'LOADING...' : 'START TRIAL'}
                        </Button>
                        <p className="text-center text-gray-600 text-xs font-mono mt-3">7 days free • Cancel anytime</p>
                    </motion.div>

                </div>

                {/* PROOF */}
                <div className="mt-12 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6 text-center">
                    <Zap className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <p className="text-white font-black text-xl mb-2 font-mono">Labels save 142 hours/month</p>
                    <p className="text-gray-400 text-sm font-mono">Worth £3,550 in time + £245k deals closed</p>
                    <p className="text-green-400 text-xs font-mono mt-2">Provable ROI • Real results</p>
                </div>

            </div>
        </div>
    );
}