import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, FileText, AlertCircle } from 'lucide-react';

export default function CB51Terms() {
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
                        <FileText className="w-12 h-12 text-cyan-400" />
                        <h1 className="text-4xl font-black text-cyan-400 font-mono">CB51 TERMS</h1>
                    </div>
                    <p className="text-gray-500 font-mono text-sm">Plain English. No tricks.</p>
                    <p className="text-gray-600 font-mono text-xs mt-2">Last updated: 24 January 2026</p>
                </div>

                {/* Key Points */}
                <div className="bg-cyan-500/10 border-2 border-cyan-500 rounded-lg p-6 mb-8">
                    <h2 className="text-cyan-400 font-black font-mono text-xl mb-4">THE DEAL</h2>
                    <ul className="space-y-2 text-white font-mono text-sm">
                            <li>✓ Professional tools built for artists</li>
                            <li>✓ Your data stays yours</li>
                            <li>✓ Heading toward white label possibilities</li>
                            <li>✓ No lock-in contracts</li>
                            <li>✓ Built by artists, for artists</li>
                        </ul>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    
                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">WHAT YOU GET</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• AI gig parsing & workflow</p>
                            <p className="text-gray-300 font-mono text-sm">• Calendar sync (Google Calendar)</p>
                            <p className="text-gray-300 font-mono text-sm">• Finance tracking</p>
                            <p className="text-gray-300 font-mono text-sm">• Band notifications & voting</p>
                            <p className="text-gray-300 font-mono text-sm">• Offline mode</p>
                            <p className="text-gray-300 font-mono text-sm">• Team collaboration</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">ACCESS MODEL</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">CB51 is currently in development with trusted artists and managers.</p>
                            <p className="text-gray-300 font-mono text-sm">We're building this with the people who'll use it - not for profit, but for progress.</p>
                            <p className="text-green-400 font-mono text-sm font-bold mt-3">White label possibilities coming soon for labels and agencies.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">YOUR RESPONSIBILITIES</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• Keep your login secure</p>
                            <p className="text-gray-300 font-mono text-sm">• Don't share your account</p>
                            <p className="text-gray-300 font-mono text-sm">• Don't abuse the AI (spam, illegal content)</p>
                            <p className="text-gray-300 font-mono text-sm">• Pay on time</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">OUR RESPONSIBILITIES</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• Keep CB51 running (99.9% uptime)</p>
                            <p className="text-gray-300 font-mono text-sm">• Protect your data</p>
                            <p className="text-gray-300 font-mono text-sm">• Fix bugs fast</p>
                            <p className="text-gray-300 font-mono text-sm">• Add features regularly</p>
                            <p className="text-gray-300 font-mono text-sm">• Respond to support requests</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-6 h-6 text-amber-400" />
                            <h2 className="text-white font-black font-mono text-2xl">LIMITATIONS</h2>
                        </div>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• AI parsing isn't 100% perfect (but it's damn good)</p>
                            <p className="text-gray-300 font-mono text-sm">• Offline mode needs initial online setup</p>
                            <p className="text-gray-300 font-mono text-sm">• We're not liable for missed gigs (always double-check)</p>
                            <p className="text-gray-300 font-mono text-sm">• Maximum liability = 12 months subscription fees</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">INTELLECTUAL PROPERTY</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• CB51 code + branding = ours</p>
                            <p className="text-gray-300 font-mono text-sm">• Your artist data + content = yours</p>
                            <p className="text-gray-300 font-mono text-sm">• We can't use your data for anything except running CB51</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">CHANGES TO TERMS</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• We may update these terms</p>
                            <p className="text-gray-300 font-mono text-sm">• You'll get 30 days notice</p>
                            <p className="text-gray-300 font-mono text-sm">• Keep using CB51 = you accept new terms</p>
                            <p className="text-gray-300 font-mono text-sm">• Don't like changes? Cancel before they take effect</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">LEGAL STUFF</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-3">
                            <p className="text-gray-300 font-mono text-sm">• Governed by UK law</p>
                            <p className="text-gray-300 font-mono text-sm">• Disputes in UK courts</p>
                            <p className="text-gray-300 font-mono text-sm">• If one clause is invalid, rest still applies</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-black font-mono text-2xl mb-3">CONTACT</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4">
                            <p className="text-gray-300 font-mono text-sm">Questions about terms?</p>
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