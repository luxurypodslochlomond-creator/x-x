import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Package, Users, Zap, Globe, CheckCircle, Smartphone, MapPin, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * BIG ISSUE FOOD RESCUE
 * Real talk for Big Issue about solving food waste
 * Zero bullshit, zero extraction, real solution
 * Partnership = let's fix this together
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
            const isOnline = navigator.onLine;
            
            if (isOnline) {
                // Send to family@uf51.love
                await base44.integrations.Core.SendEmail({
                    to: 'family@uf51.love',
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
            } else {
                // OFFLINE: Store locally
                const pending = JSON.parse(localStorage.getItem('uf51_pending_messages') || '[]');
                pending.push({
                    type: 'big_issue_contact',
                    data: data,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('uf51_pending_messages', JSON.stringify(pending));
            }
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
        const isOnline = navigator.onLine;
        
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 text-white p-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl text-center"
                >
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                    <h1 className="text-4xl font-black text-white mb-4">
                        {isOnline ? 'MESSAGE SENT ✓' : 'MESSAGE SAVED ✓'}
                    </h1>
                    <p className="text-gray-300 text-lg mb-6">
                        {isOnline 
                            ? "We'll be in touch within 48 hours to discuss how we can make this happen together."
                            : "Your message is saved and will send automatically when you're back online. Works offline, always."
                        }
                    </p>
                    <p className="text-red-400 font-bold">
                        Let's feed people, not bins. ♾️❤️♾️
                    </p>
                    
                    {!isOnline && (
                        <div className="mt-6 bg-amber-900/30 border border-amber-500/50 rounded-lg p-4">
                            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                            <p className="text-amber-400 text-xs font-mono">
                                Offline mode: Message queued, will send when connection restored
                            </p>
                        </div>
                    )}
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
                        LET'S FEED PEOPLE
                    </h1>
                    
                    <p className="text-xl text-gray-300 font-bold mb-6">
                        Real solution. Zero bullshit. Already built.
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 text-red-400 text-sm">
                        <Heart className="w-5 h-5 animate-pulse" />
                        <span className="font-mono font-bold">YOUR NETWORK + OUR TECH = RESCUE MILLIONS IN FOOD</span>
                        <Heart className="w-5 h-5 animate-pulse" />
                    </div>
                </motion.div>
            </div>

            {/* THE TRUTH */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">THE TRUTH</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-white font-bold">
                            Supermarkets bin MILLIONS in good food. People go hungry. Your vendors see it every day.
                        </p>

                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <p className="text-red-400 font-bold text-xs mb-2">THE NUMBERS (UK):</p>
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">9.5 million tons</strong> of food wasted annually</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">£19 billion</strong> worth</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">14 million</strong> people in food poverty</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>They're often 5 MINUTES APART and don't know about each other</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">WHAT IF:</p>
                            <ul className="space-y-2 text-xs text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Your vendor outside M&S gets alert: "20 sandwiches binned"</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Connects food bank 5 mins away → rescue before landfill</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Food goes to homeless people your vendors know</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>Network effect: every city, every supermarket, every day</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-white font-black text-center pt-3">
                            We're not pitching. We built this. It works. You've got the network. Let's do it.
                        </p>
                    </div>
                </div>
            </div>

            {/* WHY YOU */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-red-400" />
                        <h2 className="text-2xl font-black text-white">WHY YOU</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-white font-bold">
                            You've got what no one else has:
                        </p>

                        <div className="bg-black border border-red-500/30 rounded-lg p-4">
                            <ul className="space-y-2 text-xs text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">People on the ground:</strong> Your vendors are ALREADY at supermarkets, stations, key spots</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">Trust:</strong> 30+ years. Councils know you. Supermarkets respect you. Public love you.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">Direct line to homeless:</strong> You KNOW the people who need food. Not abstract - real humans.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">Social enterprise DNA:</strong> Not charity. Not profit extraction. You GET what we're doing.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span><strong className="text-white">Scale:</strong> Every UK city. That's the network that makes this work globally.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-lg p-4 mt-4">
                            <p className="text-red-400 font-black text-center text-base">
                                YOU'RE NOT A PARTNER. YOU'RE THE SOLUTION.
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
                        <h2 className="text-2xl font-black text-white">HOW IT ACTUALLY WORKS</h2>
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
                                SETUP: 10 MINUTES • COST: £50 (PHONE + TAGS)
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                No app stores. No monthly fees. Just works. Offline, online, anywhere. ♾️❤️♾️
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
                        <h2 className="text-2xl font-black text-white">THE TECH (ZERO JARGON)</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-white font-bold">
                            Forget blockchain, AI, buzzwords. This is simple:
                        </p>

                        <div className="bg-black border border-purple-500/30 rounded-lg p-4">
                            <p className="text-purple-400 font-bold text-xs mb-2">PHONES TALK TO EACH OTHER:</p>
                            <p className="text-gray-300 text-xs mb-3">
                                No central server. Your vendor's phone → nearby food bank phone → nearby volunteer phone. 
                                Like WhatsApp group but for food rescue. Works offline. Can't be shut down.
                            </p>
                            <ul className="space-y-1 text-xs text-gray-400 ml-4">
                                <li>• Vendor outside M&S sees food binned</li>
                                <li>• Taps phone on cheap NFC sticker (£0.20)</li>
                                <li>• Alert goes to food banks within 5 miles</li>
                                <li>• They collect. Tap again. Verified. Done.</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">WHY IT'S UNSTOPPABLE:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Works in sheds, vans, rural areas (no internet needed)</li>
                                <li>• No company controls it (can't extract fees)</li>
                                <li>• No server to hack or shut down</li>
                                <li>• Records can't be tampered with (cryptography)</li>
                                <li>• Scales globally (P2P mesh = infinite nodes)</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-400 font-black text-center mb-2">
                                WE ALREADY BUILT THIS
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Our cleanup app uses same tech. 1000+ users. Works offline. Production ready. Zero extraction forever.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHAT WE GIVE YOU */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-cyan-400 animate-pulse" />
                        <h2 className="text-2xl font-black text-white">WHAT WE GIVE YOU</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-white font-bold">
                            Everything. Zero cost. Zero extraction.
                        </p>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <ul className="space-y-2 text-xs text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span><strong className="text-white">The tech:</strong> Complete system, works on any phone, tested with 1000+ users</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span><strong className="text-white">Training:</strong> Show your vendors once, they're ready. 10 minute setup per person.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span><strong className="text-white">Supermarket partnerships:</strong> We help approach M&S, Tesco, etc. Templates ready.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span><strong className="text-white">Impact data:</strong> Real-time tracking. Tons rescued, people fed, CO2 saved. For your funders.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400">✓</span>
                                    <span><strong className="text-white">Support:</strong> We're here. Questions? Call us. Issues? We fix them.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-lg p-4">
                            <p className="text-cyan-400 font-black text-center mb-2">
                                WHY FREE? WE'RE A CIC.
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                Community Interest Company = profits locked for social good. We can't extract. It's illegal for us. 
                                This is about feeding people, not making money off you. ♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* START SMALL */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-8 h-8 text-amber-400" />
                        <h2 className="text-2xl font-black text-white">START SMALL, PROVE IT WORKS</h2>
                    </div>

                    <div className="space-y-3 text-gray-200 text-sm">
                        <p className="text-white font-bold">
                            One city. One month. Real results.
                        </p>

                        <div className="bg-black border border-amber-500/30 rounded-lg p-4">
                            <p className="text-amber-400 font-bold text-xs mb-2">WEEK 1:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Pick Glasgow or London</li>
                                <li>• 5 vendors (ones already outside supermarkets)</li>
                                <li>• 2 local food banks</li>
                                <li>• We train everyone in one afternoon</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 font-bold text-xs mb-2">WEEK 2-4:</p>
                            <ul className="space-y-1 text-xs text-gray-300 ml-4">
                                <li>• Vendors use the app daily</li>
                                <li>• M&S/Tesco bins food → alert → rescue</li>
                                <li>• Track: tons rescued, people fed, time saved</li>
                                <li>• Fix any issues real-time</li>
                            </ul>
                        </div>

                        <div className="bg-black border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-xs mb-2">END OF MONTH:</p>
                            <p className="text-gray-300 text-xs mb-2">
                                Review the numbers. Does it work? Do vendors like it? Did we feed more people?
                            </p>
                            <p className="text-white text-xs font-bold">
                                If yes → roll out to 10 cities. If no → we failed, no hard feelings.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-4">
                            <p className="text-orange-400 font-black text-center mb-2">
                                ONE CITY → NATIONAL → GLOBAL
                            </p>
                            <p className="text-gray-300 text-xs text-center">
                                If it works in Glasgow, it works anywhere. That's the power of P2P mesh.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTACT FORM */}
            <div className="max-w-4xl mx-auto mb-8 px-4">
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-4 border-red-500 rounded-xl p-8">
                    <div className="text-center mb-6">
                        <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-3xl font-black text-white mb-2">LET'S TALK</h2>
                        <p className="text-gray-300 text-sm">
                            One call. No sales. Just real talk about making this work.
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
                            {submitMutation.isPending ? 'SENDING...' : 'SEND MESSAGE'}
                        </Button>

                        <p className="text-gray-400 text-xs text-center mt-3">
                            Or email directly: family@uf51.love
                        </p>
                    </form>
                </div>
            </div>

            {/* FOOTER */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-black border-2 border-red-500/30 rounded-xl p-6 text-center">
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        UF51 Community Interest Company • Registered November 2025 • Zero Extraction Forever
                    </p>
                    <p className="text-red-400 text-sm font-black mb-3">
                        ♾️❤️♾️ LET'S FEED PEOPLE, NOT BINS ♾️❤️♾️
                    </p>
                    <p className="text-xs text-gray-500">
                        Contact: family@uf51.love
                    </p>
                </div>
            </div>

        </div>
    );
}