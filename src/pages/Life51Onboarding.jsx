import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Building, Music, Users, Crown, Zap, Check, ArrowRight } from 'lucide-react';
import Kingdom51Crown8Bit from '@/components/shared/Kingdom51Crown8Bit';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * LIFE51 ONBOARDING
 * Indie artist → Free/Pro
 * Label → Enterprise (ROI tracking, multi-artist, rights)
 */

export default function Life51Onboarding() {
    const [step, setStep] = useState('choose'); // choose | indie | label | complete
    const [userType, setUserType] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        artistCount: '',
        needsRights: false,
        needsContracts: false,
        needsAccounting: false
    });
    const navigate = useNavigate();

    const handleChoose = (type) => {
        setUserType(type);
        setStep(type === 'indie' ? 'indie' : 'label');
    };

    const handleComplete = () => {
        // Save to localStorage
        localStorage.setItem('life51_user_type', userType);
        localStorage.setItem('life51_user_data', JSON.stringify(formData));
        localStorage.setItem('life51_onboarded', 'true');
        
        setStep('complete');
        setTimeout(() => {
            navigate(createPageUrl('Life51'));
        }, 2000);
    };

    // CHOOSE USER TYPE
    if (step === 'choose') {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12">
                        <Kingdom51Crown8Bit size={80} animate={true} className="mx-auto mb-6" />
                        <h1 className="text-5xl font-black text-cyan-400 mb-3 font-mono">LIFE51</h1>
                        <p className="text-gray-400 text-sm font-mono">Choose your path</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* INDIE ARTIST */}
                        <motion.button
                            onClick={() => handleChoose('indie')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black border-4 border-cyan-500 hover:border-cyan-400 rounded-xl p-8 text-left transition-all"
                            style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
                        >
                            <Music className="w-12 h-12 text-cyan-400 mb-4" />
                            <h2 className="text-2xl font-black text-white mb-2 font-mono">INDIE ARTIST</h2>
                            <p className="text-gray-400 text-sm mb-4 font-mono">Solo artist, band, producer</p>
                            
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>Calendar + Tasks</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>Social AI drafts</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>Gig tracking</span>
                                </div>
                            </div>

                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3">
                                <p className="text-cyan-400 font-bold text-sm font-mono">FREE</p>
                                <p className="text-gray-500 text-xs font-mono">Or £9/month Pro</p>
                            </div>
                        </motion.button>

                        {/* LABEL */}
                        <motion.button
                            onClick={() => handleChoose('label')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black border-4 border-amber-500 hover:border-amber-400 rounded-xl p-8 text-left transition-all"
                            style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)' }}
                        >
                            <Building className="w-12 h-12 text-amber-400 mb-4" />
                            <h2 className="text-2xl font-black text-white mb-2 font-mono">LABEL</h2>
                            <p className="text-gray-400 text-sm mb-4 font-mono">Manage roster, rights, ROI</p>
                            
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>Multi-artist dashboard</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>Rights + Publishing</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>ROI tracking</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                                    <Check className="w-4 h-4" />
                                    <span>Contract templates</span>
                                </div>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                                <p className="text-amber-400 font-bold text-sm font-mono">£99/MONTH</p>
                                <p className="text-gray-500 text-xs font-mono">Per 10 artists</p>
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    // INDIE FORM
    if (step === 'indie') {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-black border-4 border-cyan-500 rounded-xl p-8"
                >
                    <Music className="w-12 h-12 text-cyan-400 mb-4" />
                    <h2 className="text-2xl font-black text-white mb-6 font-mono">INDIE SETUP</h2>
                    
                    <div className="space-y-4 mb-6">
                        <Input
                            placeholder="Artist name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-black border-2 border-cyan-500 text-white font-mono"
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-black border-2 border-cyan-500 text-white font-mono"
                        />
                        <Input
                            placeholder="Phone (optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="bg-black border-2 border-cyan-500 text-white font-mono"
                        />
                    </div>

                    <Button
                        onClick={handleComplete}
                        disabled={!formData.name || !formData.email}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black font-mono py-6"
                    >
                        START FREE
                    </Button>
                </motion.div>
            </div>
        );
    }

    // LABEL FORM
    if (step === 'label') {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-black border-4 border-amber-500 rounded-xl p-8"
                >
                    <Building className="w-12 h-12 text-amber-400 mb-4" />
                    <h2 className="text-2xl font-black text-white mb-6 font-mono">LABEL SETUP</h2>
                    
                    <div className="space-y-4 mb-6">
                        <Input
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="bg-black border-2 border-amber-500 text-white font-mono"
                        />
                        <Input
                            placeholder="Label name"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="bg-black border-2 border-amber-500 text-white font-mono"
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-black border-2 border-amber-500 text-white font-mono"
                        />
                        <Input
                            placeholder="How many artists?"
                            value={formData.artistCount}
                            onChange={(e) => setFormData({...formData, artistCount: e.target.value})}
                            className="bg-black border-2 border-amber-500 text-white font-mono"
                        />

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-white text-sm font-mono cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.needsRights}
                                    onChange={(e) => setFormData({...formData, needsRights: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Publishing rights tracking
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm font-mono cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.needsContracts}
                                    onChange={(e) => setFormData({...formData, needsContracts: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Contract generation
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm font-mono cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.needsAccounting}
                                    onChange={(e) => setFormData({...formData, needsAccounting: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                Accounting + ROI
                            </label>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4 mb-6">
                        <p className="text-amber-400 font-bold font-mono mb-1">£99/MONTH</p>
                        <p className="text-gray-500 text-xs font-mono">7-day free trial • Cancel anytime</p>
                    </div>

                    <Button
                        onClick={handleComplete}
                        disabled={!formData.name || !formData.email || !formData.company}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black font-mono py-6"
                    >
                        START TRIAL
                    </Button>
                </motion.div>
            </div>
        );
    }

    // COMPLETE
    if (step === 'complete') {
        return (
            <div className="min-h-screen bg-black p-4 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mb-6"
                    >
                        <Kingdom51Crown8Bit size={80} animate={true} className="mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-cyan-400 mb-3 font-mono">WELCOME TO LIFE51</h2>
                    <p className="text-gray-400 text-sm font-mono">Setting up your dashboard...</p>
                </motion.div>
            </div>
        );
    }
}