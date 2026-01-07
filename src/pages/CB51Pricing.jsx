import React from 'react';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 PRICING - 3 TIERS
 * Not extraction - real value at every level
 */

export default function CB51Pricing() {
    const tiers = [
        {
            name: 'STARTER',
            price: '£0',
            period: 'forever',
            icon: Sparkles,
            color: 'from-gray-500 to-gray-600',
            border: 'border-gray-500',
            features: [
                '1 artist',
                'Gig offer management',
                'Basic calendar',
                'Message centre',
                'AI gig filter',
                'Email support'
            ],
            cta: 'START FREE',
            link: '/CB51'
        },
        {
            name: 'PRO',
            price: '£20',
            period: '/month',
            icon: Zap,
            color: 'from-cyan-500 to-blue-500',
            border: 'border-cyan-500',
            popular: true,
            features: [
                'Unlimited artists',
                'AI draft responses',
                'Legal docs + expiry alerts',
                'Finance tracking',
                'Invoice management',
                'Priority support',
                'Offline mode',
                'Export all data'
            ],
            cta: 'GO PRO',
            link: '/CB51?upgrade=pro'
        },
        {
            name: 'WHITE LABEL',
            price: '£500',
            period: '/month',
            icon: Crown,
            color: 'from-amber-500 to-yellow-500',
            border: 'border-amber-500',
            features: [
                'Everything in Pro',
                'Your branding',
                'Custom domain',
                'Multiple managers',
                'API access',
                'Dedicated support',
                'Add-on marketplace',
                'Revenue share on add-ons'
            ],
            cta: 'CONTACT US',
            link: 'mailto:scott@uf51.love?subject=CB51 White Label'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 pb-24">
            
            {/* HEADER */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    CB51 PRICING
                </h1>
                <p className="text-gray-400 text-lg font-mono">
                    Not extraction • Real value • Fair pricing
                </p>
            </div>

            {/* PRICING TIERS */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                {tiers.map((tier, idx) => {
                    const Icon = tier.icon;
                    return (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative bg-gray-900/60 border-2 ${tier.border} rounded-xl p-6 ${tier.popular ? 'shadow-lg shadow-cyan-500/50 scale-105' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-black">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white font-mono">{tier.name}</h3>
                            </div>

                            <div className="mb-6">
                                <span className="text-5xl font-black text-white">{tier.price}</span>
                                <span className="text-gray-400 text-sm font-mono ml-2">{tier.period}</span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-sm font-mono">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href={tier.link}>
                                <button className={`w-full bg-gradient-to-r ${tier.color} text-white font-black py-3 rounded-lg hover:opacity-90 transition-all`}>
                                    {tier.cta}
                                </button>
                            </a>
                        </motion.div>
                    );
                })}
            </div>

            {/* VALUE PROPOSITION */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-8">
                <h2 className="text-2xl font-black text-white mb-4 text-center">WHY CB51 IS DIFFERENT</h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-300 font-mono text-sm">
                    <div>
                        <p className="text-green-400 font-bold mb-2">✓ NOT EXTRACTION</p>
                        <p>We save you 10-20 hours/week. That's £2,000-4,000/month in manager time. We charge £20.</p>
                    </div>
                    <div>
                        <p className="text-cyan-400 font-bold mb-2">✓ SOLVES REAL PROBLEMS</p>
                        <p>Message overwhelm, missed gigs, invoice chaos, legal expiries. Not made-up problems.</p>
                    </div>
                    <div>
                        <p className="text-purple-400 font-bold mb-2">✓ WHITE LABEL REVENUE</p>
                        <p>Big agencies pay £500/month for their branding. Fair for both sides.</p>
                    </div>
                    <div>
                        <p className="text-amber-400 font-bold mb-2">✓ ADD-ON MARKETPLACE</p>
                        <p>Future: sample clearance, tour routing, merch - agencies earn commission.</p>
                    </div>
                </div>
            </div>

            {/* SUCCESS POTENTIAL */}
            <div className="max-w-4xl mx-auto mt-12 bg-gray-900/40 border border-gray-800 rounded-xl p-8">
                <h2 className="text-xl font-black text-white mb-4 text-center">MARKET OPPORTUNITY</h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="text-4xl font-black text-cyan-400 mb-2">£10B+</p>
                        <p className="text-gray-400 text-sm font-mono">Artist management industry</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-green-400 mb-2">10-20h</p>
                        <p className="text-gray-400 text-sm font-mono">Hours saved per week</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-purple-400 mb-2">95%</p>
                        <p className="text-gray-400 text-sm font-mono">Still use Excel + WhatsApp</p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm font-mono text-center mt-6">
                    Current tools are from 2005. CB51 is purpose-built for managers in 2026.
                </p>
            </div>
        </div>
    );
}