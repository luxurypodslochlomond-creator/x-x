import React, { useState } from 'react';
import { Building, Users, Heart, Check, Sparkles } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { motion } from 'framer-motion';

/**
 * ENTERPRISE TIER - ZOOS, STABLES, AQUARIUMS, VET CLINICS
 * £4,999/year for unlimited animals
 * Custom AI51 protocols for entire facilities
 */

export default function PetSounds51Enterprise() {
    const [showPayment, setShowPayment] = useState(false);

    const enterpriseFeatures = [
        "✅ Unlimited animals",
        "✅ Custom protocols for your facility's species mix",
        "✅ Priority email support",
        "✅ Onboarding call included",
        "✅ Staff guidance notes",
        "✅ Monthly outcome check-in",
        "✅ Dedicated contact person",
        "✅ White-label option available"
    ];

    const useCases = [
        {
            title: "Zoos & Aquariums",
            description: "Reduce stress in captive animals, improve behavioral health",
            savings: "Save £50k+/year on vet stress consultations",
            icon: "🦁"
        },
        {
            title: "Racing Stables",
            description: "Faster injury recovery, performance optimization",
            savings: "£2k-5k per horse injury treatment",
            icon: "🐴"
        },
        {
            title: "Marine Parks",
            description: "Dolphin/whale stress protocols, NO other tech exists",
            savings: "Priceless - first in world",
            icon: "🐬"
        },
        {
            title: "Vet Clinics",
            description: "Offer complementary healing to clients, new revenue stream",
            savings: "£10k+/year new service revenue",
            icon: "🏥"
        },
        {
            title: "Wildlife Hospitals",
            description: "Speed recovery for injured/rescued animals",
            savings: "FREE for registered charities",
            icon: "🦅"
        },
        {
            title: "Luxury Stables",
            description: "Elite horse care, wealthy clients demand best",
            savings: "Charge clients £500+ premium for access",
            icon: "💎"
        }
    ];

    if (showPayment) {
        window.location.href = 'mailto:family@uf51.love?subject=PetSounds51%20Enterprise%20Enquiry&body=Hi%2C%0A%0AI%27d%20like%20to%20discuss%20the%20Enterprise%20tier%20for%20PetSounds51.%0A%0AOrganisation%3A%20%0ANumber%20of%20animals%3A%20%0ASpecies%3A%20%0A%0AThank%20you!';
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            {/* Header */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <motion.div 
                        className="flex justify-center mb-6"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <PetSounds51Icon8Bit size={100} animate={true} />
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black mb-4 font-mono bg-gradient-to-r from-cyan-400 via-green-400 to-pink-400 bg-clip-text text-transparent">
                        ENTERPRISE TIER
                    </h1>
                    <p className="text-xl text-gray-400 mb-2">
                        For Organizations Healing Hundreds Of Animals
                    </p>
                    <div className="inline-block bg-gradient-to-r from-green-500 to-cyan-500 px-6 py-2 rounded-lg">
                        <p className="text-2xl font-black text-black">£4,999/year</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Unlimited animals • Priority support</p>
                </div>

                {/* ROI Calculator */}
                <div className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-2 border-green-500 rounded-xl p-8 mb-12">
                    <h2 className="text-3xl font-black text-green-400 mb-6 text-center">ROI Breakdown</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <p className="text-4xl font-black text-white mb-2">£5k</p>
                            <p className="text-sm text-gray-400">Annual Cost</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-black text-white mb-2">500</p>
                            <p className="text-sm text-gray-400">Animals</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-black text-green-400 mb-2">£10</p>
                            <p className="text-sm text-gray-400">Per animal/year</p>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-black/40 rounded-lg">
                        <p className="text-center text-white">
                            <span className="font-black text-green-400">VS</span> £200+ per vet stress consultation
                        </p>
                        <p className="text-center text-sm text-gray-400 mt-2">
                            Save £50,000+ per year in behavioral vet costs
                        </p>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black text-cyan-400 mb-6 text-center">Who This Is For</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((useCase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500 transition-all"
                            >
                                <div className="text-4xl mb-3">{useCase.icon}</div>
                                <h3 className="text-xl font-black text-white mb-2">{useCase.title}</h3>
                                <p className="text-sm text-gray-400 mb-3">{useCase.description}</p>
                                <p className="text-xs text-green-400 font-bold">{useCase.savings}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-8 mb-12">
                    <h2 className="text-3xl font-black text-cyan-400 mb-6 text-center">What You Get</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {enterpriseFeatures.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button
                        onClick={() => setShowPayment(true)}
                        className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-black text-xl px-12 py-6 rounded-xl transition-all inline-flex items-center gap-3"
                        style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
                    >
                        <Sparkles className="w-6 h-6" />
                        Enquire About Enterprise
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        Setup within 24 hours • Cancel anytime
                    </p>
                </div>
            </div>

        </div>
    );
}