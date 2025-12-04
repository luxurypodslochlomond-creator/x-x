import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminProjectReferencePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Shield className="w-20 h-20 mx-auto text-cyan-400" style={{ filter: 'drop-shadow(0 0 20px #22d3ee)' }} />
                    <h1 className="text-5xl font-black">PROJECT REFERENCE</h1>
                    <p className="text-xl text-gray-300">THE SOURCE OF TRUTH - Never get details wrong again</p>
                </motion.div>

                {/* CRITICAL DATES WARNING */}
                <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-4 border-red-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                            DATES - LOCK THESE IN
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                        <div className="bg-red-900/30 p-4 rounded-lg">
                            <p className="font-bold text-2xl text-red-300 mb-2">Creative Scotland Application:</p>
                            <p className="text-3xl font-mono">March 2026 → June 2027</p>
                            <p className="text-sm text-gray-300 mt-2">(15 months duration)</p>
                        </div>
                        <div className="bg-yellow-900/30 p-4 rounded-lg border-2 border-yellow-500">
                            <p className="text-green-300 font-bold mb-2">✅ DATES ARE CORRECT:</p>
                            <p className="text-green-200">Start: 02/03/2026 ✓ (March 2026 - after 14 week approval)</p>
                            <p className="text-green-200">End: 01/06/2027 ✓ (June 2027 - 15 months later)</p>
                            <p className="text-sm text-gray-400 mt-2">Apply Nov 2025 → 14 weeks approval → March 2026 start</p>
                        </div>
                    </CardContent>
                </Card>

                {/* PROJECT CORE DETAILS */}
                <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">CREATIVE SCOTLAND £100K PROJECT</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">PROJECT TITLE:</p>
                            <p className="text-2xl font-bold text-cyan-400">UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">AMOUNT:</p>
                                <p className="text-3xl font-mono text-green-400">£100,000</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">DURATION:</p>
                                <p className="text-3xl font-mono text-purple-400">15 months</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">APPLICANT:</p>
                            <p className="text-xl font-bold">Universal Frequency51 CIC (SC870603)</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">DIRECTOR:</p>
                            <p className="text-xl font-bold">Brian Hughes</p>
                        </div>
                    </CardContent>
                </Card>

                {/* COMPANY DETAILS */}
                <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">COMPANY INFORMATION</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">FULL NAME:</p>
                            <p className="text-xl font-bold">Universal Frequency51</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">LEGAL STATUS:</p>
                            <p className="text-xl font-bold">Community Interest Company (CIC)</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">COMPANY NUMBER:</p>
                            <p className="text-xl font-mono">SC870603</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">REGISTRATION STATUS:</p>
                            <p className="text-xl font-bold text-yellow-400">APPROVED 19 Nov 2025</p>
                        </div>
                    </CardContent>
                </Card>

                {/* MISSION STATEMENT */}
                <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">MISSION STATEMENT (300 words)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-white">
                        <div className="bg-purple-900/30 p-4 rounded-lg">
                          <p className="text-gray-200 leading-relaxed">
                              Universal Frequency51 is a Community Interest Company (SC870603) established to address three interconnected global challenges: environmental degradation, artist exploitation in streaming, and lack of access to medical-grade healing technologies.
                          </p>
                        </div>
                        <div>
                            <p className="font-bold text-purple-300 mb-2">Our primary activities are:</p>
                            <div className="space-y-3">
                                <div className="bg-green-900/30 p-3 rounded-lg">
                                    <p className="font-bold text-green-400 mb-1">Planetary Healing Verification System:</p>
                                    <p className="text-sm text-gray-300">We've developed technology that verifies environmental cleanup actions and rewards participants with our digital currency ($P51). Users photograph litter collection, AI verifies authenticity, and we track real-world environmental impact through our platform.</p>
                                </div>
                                <div className="bg-cyan-900/30 p-3 rounded-lg">
                                    <p className="font-bold text-cyan-400 mb-1">Lossless Audio Platform for Artists:</p>
                                    <p className="text-sm text-gray-300">We provide musicians with zero-compression audio streaming, ensuring artists receive 100% of the audio quality they created. This directly challenges the 95% data loss standard in commercial streaming (Spotify, Apple Music) and gives artists a fair platform.</p>
                                </div>
                                <div className="bg-pink-900/30 p-3 rounded-lg">
                                    <p className="font-bold text-pink-400 mb-1">Medical-Grade Healing Frequencies:</p>
                                    <p className="text-sm text-gray-300">We offer free access to scientifically-researched healing frequencies (432Hz, 528Hz, binaural beats) that support mental health, trauma recovery, and wellbeing - particularly for underserved communities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-900/30 p-4 rounded-lg">
                            <p className="text-gray-200 leading-relaxed">
                                Our core mission is creating a circular economy where environmental healing funds artistic freedom, and healing frequencies support human wellbeing. We've already registered cleanups across Scotland and are building our artist network.
                            </p>
                        </div>
                        <div className="bg-purple-900/30 p-4 rounded-lg">
                            <p className="text-gray-200 leading-relaxed">
                                We align with UN SDGs 3 (Health), 11 (Sustainable Communities), 13 (Climate Action), and 14 (Life Below Water). As a CIC, all surplus is reinvested into our community mission.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* ONE-LINE SUMMARY */}
                <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">ONE-LINE SUMMARY (for quick use)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                        <p className="text-xl font-bold text-yellow-300">
                            "We're artists supporting artists, communities healing communities - using creative approaches to build resilient, connected, healthier Scotland."
                        </p>
                    </CardContent>
                </Card>

                {/* BUDGET BREAKDOWN */}
                <Card className="bg-gradient-to-r from-indigo-900/40 to-violet-900/40 border-2 border-indigo-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">BUDGET BREAKDOWN (£100,000)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-900/30 p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Artist Commissions</p>
                                <p className="text-2xl font-bold text-indigo-300">£45,000</p>
                            </div>
                            <div className="bg-indigo-900/30 p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Research & Impact</p>
                                <p className="text-2xl font-bold text-indigo-300">£20,000</p>
                            </div>
                            <div className="bg-indigo-900/30 p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Platform Delivery</p>
                                <p className="text-2xl font-bold text-indigo-300">£20,000</p>
                            </div>
                            <div className="bg-indigo-900/30 p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Marketing</p>
                                <p className="text-2xl font-bold text-indigo-300">£8,000</p>
                            </div>
                            <div className="bg-indigo-900/30 p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Professional Services</p>
                                <p className="text-2xl font-bold text-indigo-300">£5,000</p>
                            </div>
                            <div className="bg-indigo-900/30 p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Accessibility</p>
                                <p className="text-2xl font-bold text-indigo-300">£2,000</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* KEY CONTACTS */}
                <Card className="bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-2 border-teal-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">KEY PARTNERS & CONTACTS</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-white">
                        <div className="bg-teal-900/30 p-3 rounded-lg">
                            <p className="font-bold text-teal-300">Musicians' Union Scotland</p>
                            <p className="text-sm text-gray-400">Artist recruitment & outreach</p>
                        </div>
                        <div className="bg-teal-900/30 p-3 rounded-lg">
                            <p className="font-bold text-teal-300">Scottish Music Centre</p>
                            <p className="text-sm text-gray-400">Artist recruitment & outreach</p>
                        </div>
                        <div className="bg-teal-900/30 p-3 rounded-lg">
                            <p className="font-bold text-teal-300">University of the West of Scotland</p>
                            <p className="text-sm text-gray-400">Psychology dept - research partnership</p>
                        </div>
                        <div className="bg-teal-900/30 p-3 rounded-lg">
                            <p className="font-bold text-teal-300">Friends of Loch Lomond</p>
                            <p className="text-sm text-gray-400">Community outreach</p>
                        </div>
                    </CardContent>
                </Card>

                {/* GEOGRAPHIC FOCUS */}
                <Card className="bg-gradient-to-r from-lime-900/40 to-green-900/40 border-2 border-lime-500">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">GEOGRAPHIC FOCUS</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                        <div className="space-y-3">
                            <div className="bg-lime-900/30 p-3 rounded-lg">
                                <p className="font-bold text-lime-300">Primary: Loch Lomond & West Dunbartonshire</p>
                                <p className="text-sm text-gray-400">Stoneymollan, Balloch, Alexandria</p>
                            </div>
                            <div className="bg-lime-900/30 p-3 rounded-lg">
                                <p className="font-bold text-lime-300">Secondary: Scotland-wide</p>
                                <p className="text-sm text-gray-400">All 30 musicians must be Scottish-based</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}