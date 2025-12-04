import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, EyeOff, Zap, CheckCircle } from 'lucide-react';

export default function PrivacyMathematics() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <header className="text-center space-y-6">
                    <Shield className="w-20 h-20 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }} />
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Zero Loss ≠ Zero Privacy
                    </h1>
                    <p className="text-2xl text-gray-300">The Mathematics of Private Verification</p>
                </header>

                {/* The Problem */}
                <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-red-300 mb-6">The Surveillance Trap</h2>
                        <div className="space-y-4 text-gray-300">
                            <p className="text-lg">
                                Most "verification" systems today = <strong className="text-white">MASS SURVEILLANCE</strong>
                            </p>
                            <ul className="space-y-2 ml-6">
                                <li>• Track your exact location</li>
                                <li>• Store your photos forever</li>
                                <li>• Sell your data to advertisers</li>
                                <li>• Build profiles of your behavior</li>
                            </ul>
                            <p className="text-xl text-red-400 font-bold mt-6">
                                We reject this entirely.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Shannon + Privacy */}
                <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-cyan-300 mb-6">Shannon's Theorem + Cryptography</h2>
                        <div className="space-y-6 text-gray-300">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">Zero-Loss Transmission</h3>
                                <p>Shannon proved information can be transmitted perfectly. This means:</p>
                                <div className="bg-black/40 p-4 rounded-lg mt-3 font-mono text-cyan-300">
                                    Your cleanup proof arrives perfect. No degradation.
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">+ Zero-Knowledge Proof</h3>
                                <p>Cryptography proves you did the cleanup WITHOUT revealing private details:</p>
                                <div className="bg-black/40 p-4 rounded-lg mt-3 space-y-2">
                                    <p className="text-green-400">✓ Proves you collected litter</p>
                                    <p className="text-green-400">✓ Proves the location is valid</p>
                                    <p className="text-green-400">✓ Proves the photo is authentic</p>
                                    <p className="text-red-400 mt-4">✗ Does NOT reveal your exact GPS</p>
                                    <p className="text-red-400">✗ Does NOT store your photo forever</p>
                                    <p className="text-red-400">✗ Does NOT track your movements</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* The Mathematics */}
                <Card className="bg-black/60 border border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-3xl text-white">The Mathematical Guarantees</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        
                        {/* Photo Hash */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Lock className="w-8 h-8 text-purple-400" />
                                <h3 className="text-2xl font-bold text-white">1. Photo Hash (SHA-256)</h3>
                            </div>
                            <div className="bg-gray-900/60 p-6 rounded-xl">
                                <p className="text-gray-300 mb-4">Your photo → Cryptographic fingerprint</p>
                                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs text-cyan-300 overflow-x-auto">
                                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                                </div>
                                <div className="mt-4 space-y-2 text-sm text-gray-400">
                                    <p className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Proves photo authenticity
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        Detects if photo is reused
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <EyeOff className="w-4 h-4 text-purple-400" />
                                        Doesn't reveal the actual photo
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Differential Privacy */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Eye className="w-8 h-8 text-cyan-400" />
                                <h3 className="text-2xl font-bold text-white">2. Differential Privacy</h3>
                            </div>
                            <div className="bg-gray-900/60 p-6 rounded-xl">
                                <p className="text-gray-300 mb-4">Show aggregate data without individual tracking:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                        <p className="text-green-300 font-bold mb-2">✓ What we show:</p>
                                        <p className="text-sm text-gray-300">"Glasgow: 47 cleanups this week, 132kg litter removed"</p>
                                    </div>
                                    <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                                        <p className="text-red-300 font-bold mb-2">✗ What we DON'T show:</p>
                                        <p className="text-sm text-gray-300">"John at 123 Main St did 3 cleanups"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Control */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Shield className="w-8 h-8 text-blue-400" />
                                <h3 className="text-2xl font-bold text-white">3. User-Controlled Privacy</h3>
                            </div>
                            <div className="bg-gray-900/60 p-6 rounded-xl">
                                <p className="text-gray-300 mb-4">YOU choose your privacy level:</p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                                        <span className="text-white">Share exact location on map</span>
                                        <span className="text-gray-400 text-sm">Optional</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                                        <span className="text-white">Show county/city only</span>
                                        <span className="text-cyan-400 text-sm">Default</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                                        <span className="text-white">Anonymous contribution</span>
                                        <span className="text-gray-400 text-sm">Optional</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* Dickwad Protection */}
                <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-orange-300 mb-6">Dickwad Protection</h2>
                        <div className="space-y-4 text-gray-300">
                            <p className="text-lg">Mathematical safeguards against gaming the system:</p>
                            <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="bg-black/40 p-4 rounded-lg">
                                    <h4 className="text-white font-bold mb-2">GPS Spoofing</h4>
                                    <p className="text-sm">Pattern analysis detects impossible travel speeds</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-lg">
                                    <h4 className="text-white font-bold mb-2">Photo Recycling</h4>
                                    <p className="text-sm">Hash database catches reused images</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-lg">
                                    <h4 className="text-white font-bold mb-2">Bot Attacks</h4>
                                    <p className="text-sm">Community verification + AI analysis</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-lg">
                                    <h4 className="text-white font-bold mb-2">Sybil Attacks</h4>
                                    <p className="text-sm">Quantum randomness + trust scoring</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* The Promise */}
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-pink-500/50">
                    <CardContent className="p-12 text-center space-y-6">
                        <Zap className="w-16 h-16 text-pink-400 mx-auto" />
                        <h2 className="text-4xl font-black text-white">Our Sacred Promise</h2>
                        <div className="space-y-4 text-xl text-gray-300 max-w-2xl mx-auto">
                            <p>Signal clarity = <strong className="text-cyan-400">Shannon's theorem</strong></p>
                            <p>Privacy protection = <strong className="text-purple-400">Cryptographic mathematics</strong></p>
                            <p>Zero surveillance = <strong className="text-pink-400">Eternal protocol</strong></p>
                        </div>
                        <p className="text-2xl text-white font-black mt-8">
                            You deserve both.
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}