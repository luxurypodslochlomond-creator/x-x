import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Shield, Lock, Eye, KeyRound, Database, UserCheck, AlertCircle } from 'lucide-react';
import CB51NavBio from '@/components/scott/CB51NavBio';
import { motion } from 'framer-motion';

export default function CB51Privacy() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto p-6 pb-24">
                
                {/* Header */}
                <div className="mb-8">
                    <Link to={createPageUrl('CB51')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
                        <Radio className="w-5 h-5" />
                        <span className="font-black font-mono text-sm">BACK TO CB51</span>
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-12 h-12 text-cyan-400" />
                        <h1 className="text-4xl font-black text-cyan-400 font-mono">CB51 PRIVACY</h1>
                    </div>
                    <p className="text-gray-500 font-mono text-sm">Your data. Your rights. Zero bullshit.</p>
                    <p className="text-gray-600 font-mono text-xs mt-2">Last updated: 24 January 2026</p>
                </div>

                {/* Key Points */}
                <div className="bg-cyan-500/10 border-2 border-cyan-500 rounded-lg p-6 mb-8">
                    <h2 className="text-cyan-400 font-black font-mono text-xl mb-4">TL;DR</h2>
                    <ul className="space-y-2 text-white font-mono text-sm">
                        <li>✓ Your gig data stays yours</li>
                        <li>✓ We never sell your info</li>
                        <li>✓ Encryption everywhere</li>
                        <li>✓ Delete anytime</li>
                        <li>✓ GDPR compliant</li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-white font-black font-mono text-2xl">WHAT WE COLLECT</h2>
                        </div>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Artist data:</strong> Names, emails, phone numbers, gig details</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Calendar:</strong> Show dates, venues, fees</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Messages:</strong> Emails you paste for AI parsing</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Tasks:</strong> To-do lists, assignments</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-white font-black font-mono text-2xl">HOW WE USE IT</h2>
                        </div>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• AI parsing of gig offers</p>
                            <p className="text-gray-300 font-mono text-sm">• Calendar sync</p>
                            <p className="text-gray-300 font-mono text-sm">• Band notifications</p>
                            <p className="text-gray-300 font-mono text-sm">• Finance tracking</p>
                            <p className="text-green-400 font-mono text-sm font-bold mt-3">We NEVER sell your data. Ever.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">DATA SECURITY</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• End-to-end encryption</p>
                            <p className="text-gray-300 font-mono text-sm">• Secure cloud storage (AWS/Google Cloud)</p>
                            <p className="text-gray-300 font-mono text-sm">• Regular backups</p>
                            <p className="text-gray-300 font-mono text-sm">• GDPR compliant</p>
                            <p className="text-gray-300 font-mono text-sm">• UK data protection laws</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">YOUR RIGHTS</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Access:</strong> Download all your data anytime</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Delete:</strong> Remove your account + all data</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Correct:</strong> Update any incorrect info</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Object:</strong> Stop processing your data</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Port:</strong> Export to another service</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">THIRD PARTIES</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">AI processing:</strong> OpenAI for email parsing (data encrypted)</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Payments:</strong> Stripe (if you subscribe)</p>
                            <p className="text-gray-300 font-mono text-sm"><strong className="text-white">Email:</strong> For band notifications only</p>
                            <p className="text-red-400 font-mono text-sm font-bold mt-3">We don't share with advertisers, data brokers, or anyone else.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">CONTACT</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4">
                            <p className="text-gray-300 font-mono text-sm">Questions about privacy?</p>
                            <p className="text-cyan-400 font-mono text-sm mt-2">Email: family@uf51.love</p>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-900 text-center">
                    <p className="text-gray-600 font-mono text-xs">CB51 • Artist Management AI</p>
                </div>

            </div>
        </div>
    );
}