import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Package, Users, Zap, Globe, CheckCircle, Smartphone, MapPin, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * BIG ISSUE FOOD RESCUE PITCH
 * Dedicated landing page for Big Issue partnership
 * Shows opportunity, tech, perfect fit, with application form
 */

export default function BigIssueFoodRescue() {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        region: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const submitMutation = useMutation({
        mutationFn: async (data) => {
            // Send to AI51 for processing
            await base44.integrations.Core.SendEmail({
                to: 'scott@uf51.love',
                subject: `Big Issue Food Rescue Interest - ${data.name}`,
                body: `
Name: ${data.name}
Role: ${data.role}
Email: ${data.email}
Phone: ${data.phone}
Region: ${data.region}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
                `
            });
        },
        onSuccess: () => {
            setSubmitted(true);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        submitMutation.mutate(formData);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 text-white p-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl text-center"
                >
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                    <h1 className="text-4xl font-black text-white mb-4">THANK YOU</h1>
                    <p className="text-gray-300 text-lg mb-6">
                        We'll be in touch within 48 hours to discuss how we can make this happen together.
                    </p>
                    <p className="text-red-400 font-bold">
                        Let's feed people, not bins. ♾️❤️♾️
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 text-white p-4 pb-32">
            
            {/* HEADER - BIG ISSUE BRANDED */}
            <div className="max-w-4xl mx-auto mb-12 px-4 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ 
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-6"
                    >
                        <Package className="w-20 h-20 text-red-400 mx-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(239, 68, 68, 0.8))' }} />
                    </motion.div>
                    
                    <div className="bg-red-600 text-white px-6 py-3 inline-block mb-6 font-black text-2xl tracking-wider">
                        BIG ISSUE
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
                        FOOD RESCUE NETWORK
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-6">
                        Your vendors become food rescue coordinators
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 text-red-400 text-sm">
                        <Heart className="w-5 h-5 animate-pulse" />
                        <span className="font-mono font-bold">ZERO COST STARTUP • MASSIVE SOCIAL IMPACT • PERFECT FIT</span>
                        <Heart className="w-5 h-5 animate-pulse" />
                    </div>
                </motion.div>
            </div>

            {/* THE OPPORTUNITY */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">THE OPPORTUNITY</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-xs mb-2">RIGHT NOW IN YOUR COMMUNITY:</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>Supermarkets bin millions in good food daily</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>Food banks 5 minutes away don't know about it</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>People your vendors serve go hungry</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">❌</span>
                                    <span>No real-time connection exists</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">✓ WHAT IF YOUR VENDORS COULD:</p>
                            <ul className="space-y-2 text-xs text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Get instant alerts when M&S/Tesco bins good food nearby</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Coordinate rescue with local food banks via mesh network</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Help distribute rescued food to people who need it</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Track impact: tons saved, people fed, emissions prevented</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHY BIG ISSUE IS PERFECT */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">WHY BIG ISSUE IS PERFECT FOR THIS</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-red-500/30 rounded-lg p-4">
                                <p className="text-red-400 font-bold text-xs mb-2">✓ YOUR NETWORK:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• Vendors in every UK city</li>
                                    <li>• Already at key locations (supermarkets, stations)</li>
                                    <li>• Trust from councils + public</li>
                                    <li>• Direct connection to people in need</li>
                                </ul>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-4">
                                <p className="text-red-400 font-bold text-xs mb-2">✓ YOUR MISSION:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• Social enterprise (not charity or pure profit)</li>
                                    <li>• Fighting poverty + homelessness</li>
                                    <li>• Already tech-forward</li>
                                    <li>• Community-first approach</li>
                                </ul>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-4">
                                <p className="text-red-400 font-bold text-xs mb-2">✓ YOUR IMPACT:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• This amplifies your existing work</li>
                                    <li>• Zero cost to start</li>
                                    <li>• Measurable outcomes for funders</li>
                                    <li>• Media-friendly story</li>
                                </ul>
                            </div>

                            <div className="bg-black border border-red-500/30 rounded-lg p-4">
                                <p className="text-red-400 font-bold text-xs mb-2">✓ YOUR REPUTATION:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• 30+ years trusted brand</li>
                                    <li>• Respected by supermarkets</li>
                                    <li>• Government/council relationships</li>
                                    <li>• Perfect partner credibility</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-lg p-4 mt-4">
                            <p className="text-red-400 font-black text-center text-base">
                                YOUR VENDORS = THE MISSING LINK BETWEEN WASTE & NEED
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Smartphone className="w-8 h-8 text-green-400" />
                        <h2 className="text-2xl font-black text-white">HOW IT WORKS (SIMPLE)</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="grid gap-3">
                            <div className="bg-black border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                                <div className="bg-green-500 text-black font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">SUPERMARKET BINS FOOD</p>
                                    <p className="text-gray-400 text-xs">M&S staff tap NFC tag: "20 sandwiches expiring midnight"</p>
                                </div>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-4 flex items-start gap-3">
                                <div className="bg-cyan-500 text-black font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">INSTANT MESH ALERT</p>
                                    <p className="text-gray-400 text-xs">Big Issue vendors nearby + food banks get real-time notification</p>
                                </div>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-4 flex items-start gap-3">
                                <div className="bg-pink-500 text-black font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">COORDINATE RESCUE</p>
                                    <p className="text-gray-400 text-xs">Vendor connects food bank with supermarket, facilitates pickup</p>
                                </div>
                            </div>

                            <div className="bg-black border border-purple-500/30 rounded-lg p-4 flex items-start gap-3">
                                <div className="bg-purple-500 text-black font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">VERIFY & TRACK</p>
                                    <p className="text-gray-400 text-xs">NFC tap confirms transfer, system logs impact for reporting</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4 mt-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                TOTAL TIME: MINUTES • TOTAL COST: £50 SETUP
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                PWA works on any phone. NFC tags £0.20 each. No app stores. Updates automatic. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE TECH */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-purple-400" />
                        <h2 className="text-2xl font-black text-white">THE TECH (UNSTOPPABLE)</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="bg-black border border-purple-500/30 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-xs mb-2">P2P MESH NETWORK:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• No central server to shut down</li>
                                <li>• Works offline (sheds, vans, rural areas)</li>
                                <li>• Every phone = a node in the network</li>
                                <li>• Phones relay messages to each other</li>
                                <li>• When ONE gets internet → whole mesh syncs</li>
                                <li>• <strong className="text-purple-400">UNSTOPPABLE</strong></li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-cyan-500/30 rounded-lg p-3">
                                <p className="text-cyan-400 font-bold text-xs mb-1">📱 PWA</p>
                                <p className="text-gray-400 text-xs">Works on any phone, no app store</p>
                            </div>

                            <div className="bg-black border border-green-500/30 rounded-lg p-3">
                                <p className="text-green-400 font-bold text-xs mb-1">📡 NFC Tags</p>
                                <p className="text-gray-400 text-xs">£0.20 each, tap to verify</p>
                            </div>

                            <div className="bg-black border border-pink-500/30 rounded-lg p-3">
                                <p className="text-pink-400 font-bold text-xs mb-1">🌐 IPFS</p>
                                <p className="text-gray-400 text-xs">Decentralized, can't be deleted</p>
                            </div>

                            <div className="bg-black border border-amber-500/30 rounded-lg p-3">
                                <p className="text-amber-400 font-bold text-xs mb-1">🔐 Crypto Signing</p>
                                <p className="text-gray-400 text-xs">Tamper-proof records</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-black text-center">
                                WE ALREADY BUILT THIS TECH - PRODUCTION READY ✓
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHAT WE PROVIDE */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-cyan-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">WHAT WE PROVIDE (FREE)</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-2">✓ TECH:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• Complete PWA system</li>
                                    <li>• P2P mesh infrastructure</li>
                                    <li>• NFC integration</li>
                                    <li>• Analytics dashboard</li>
                                </ul>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-2">✓ TRAINING:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• Vendor onboarding</li>
                                    <li>• Staff training materials</li>
                                    <li>• Supermarket partnership guides</li>
                                    <li>• Ongoing support</li>
                                </ul>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-2">✓ PARTNERSHIP SUPPORT:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• M&S/Tesco approach templates</li>
                                    <li>• Legal agreement templates</li>
                                    <li>• Council liaison support</li>
                                    <li>• Media kit</li>
                                </ul>
                            </div>

                            <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                                <p className="text-cyan-400 font-bold text-xs mb-2">✓ IMPACT TRACKING:</p>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li>• Real-time dashboards</li>
                                    <li>• Grant reporting tools</li>
                                    <li>• ESG impact data</li>
                                    <li>• Success stories</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-black text-center mb-2">
                                ZERO COST TO BIG ISSUE
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                We're a Community Interest Company. No extraction. Open source. This is about impact, not profit. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PILOT PROPOSAL */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-8 h-8 text-amber-400" />
                        <h2 className="text-2xl font-black text-white">PROPOSED PILOT</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <div className="bg-black border border-amber-500/30 rounded-lg p-4">
                            <p className="text-amber-400 font-bold text-xs mb-2">PHASE 1 (MONTH 1):</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Start with ONE city (Glasgow or London)</li>
                                <li>• 5 Big Issue vendors</li>
                                <li>• 2 local food banks</li>
                                <li>• 1 supermarket partnership (M&S or Tesco)</li>
                                <li>• Track: food rescued, people fed, vendor impact</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">✓ SUCCESS METRICS:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Tons of food rescued</li>
                                <li>• Number of people fed</li>
                                <li>• Vendor satisfaction scores</li>
                                <li>• Supermarket feedback</li>
                                <li>• Media coverage generated</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-xs mb-2">PHASE 2 (MONTH 2-3):</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Expand to 3 more cities</li>
                                <li>• 50 vendors total</li>
                                <li>• Multiple supermarket chains</li>
                                <li>• Begin home → food bank feature</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-4">
                            <p className="text-orange-400 font-black text-center">
                                PROOF OF CONCEPT → NATIONAL ROLLOUT
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* APPLICATION FORM */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-4 border-red-500 rounded-xl p-8">
                    <div className="text-center mb-6">
                        <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-3xl font-black text-white mb-2">LET'S MAKE THIS HAPPEN</h2>
                        <p className="text-gray-300 text-sm">
                            Fill in your details and we'll schedule a call within 48 hours
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-white text-xs font-bold mb-2 block">YOUR NAME *</label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="bg-black border-red-500/50 text-white"
                                    placeholder="e.g. Sarah Johnson"
                                />
                            </div>

                            <div>
                                <label className="text-white text-xs font-bold mb-2 block">YOUR ROLE *</label>
                                <Input
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="bg-black border-red-500/50 text-white"
                                    placeholder="e.g. Regional Manager"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-white text-xs font-bold mb-2 block">EMAIL *</label>
                                <Input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="bg-black border-red-500/50 text-white"
                                    placeholder="you@bigissue.com"
                                />
                            </div>

                            <div>
                                <label className="text-white text-xs font-bold mb-2 block">PHONE</label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="bg-black border-red-500/50 text-white"
                                    placeholder="07XXX XXXXXX"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-white text-xs font-bold mb-2 block">REGION / CITY</label>
                            <Input
                                value={formData.region}
                                onChange={(e) => setFormData({...formData, region: e.target.value})}
                                className="bg-black border-red-500/50 text-white"
                                placeholder="e.g. Glasgow, London, Manchester"
                            />
                        </div>

                        <div>
                            <label className="text-white text-xs font-bold mb-2 block">MESSAGE (OPTIONAL)</label>
                            <Textarea
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="bg-black border-red-500/50 text-white h-32"
                                placeholder="Tell us about your interest, questions, or specific ideas..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={submitMutation.isPending}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-6"
                        >
                            {submitMutation.isPending ? 'SENDING...' : 'SUBMIT APPLICATION'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-black border-2 border-red-500/30 rounded-xl p-6 text-center">
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        UF51 Community Interest Company • Zero Extraction Forever
                    </p>
                    <p className="text-red-400 text-sm font-black mb-3">
                        ♾️❤️♾️ LET'S FEED PEOPLE, NOT BINS ♾️❤️♾️
                    </p>
                    <p className="text-gray-500 text-xs">
                        Questions? Email: scott@uf51.love
                    </p>
                </div>
            </div>

        </div>
    );
}