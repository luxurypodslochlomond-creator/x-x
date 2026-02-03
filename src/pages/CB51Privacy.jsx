import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Shield, Lock, Eye, KeyRound, Database, UserCheck, AlertCircle } from 'lucide-react';
import CB51NavBio from '@/components/scott/CB51NavBio';
import { motion } from 'framer-motion';

export default function CB51Privacy() {
    const [expandedSection, setExpandedSection] = useState(null);

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
                <div className="space-y-3">
                    
                    {/* End-to-End Encryption */}
                    <CB51NavBio
                        icon={KeyRound}
                        title="End-to-End Encryption"
                        shortBio="Your data stays yours"
                        fullBio="All your gig data, messages, and calendar events are encrypted before they leave your device. Only you can unlock them. We can't read it even if we wanted to."
                        onClick={() => setExpandedSection(expandedSection === 'e2e' ? null : 'e2e')}
                    />
                    {expandedSection === 'e2e' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 border-l border-cyan-500/30 pl-3 bg-black/60 border border-cyan-500/20 rounded p-3 space-y-2 text-xs text-gray-300 font-mono"
                        >
                            <p>🔒 <strong>How it works:</strong> Your data is encrypted with military-grade AES-256 before syncing to our servers.</p>
                            <p>🔑 <strong>Keys:</strong> Encryption keys are stored only on your device. We never have access.</p>
                            <p>✅ <strong>Verify:</strong> You can inspect the encrypted data yourself if you want proof.</p>
                        </motion.div>
                    )}

                    {/* User Data Sovereignty */}
                    <CB51NavBio
                        icon={UserCheck}
                        title="User Data Sovereignty"
                        shortBio="You own everything"
                        fullBio="Every piece of data you create is yours. You can download it, delete it, or move it to another service anytime. Zero lock-in."
                        onClick={() => setExpandedSection(expandedSection === 'sovereignty' ? null : 'sovereignty')}
                    />
                    {expandedSection === 'sovereignty' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 border-l border-cyan-500/30 pl-3 bg-black/60 border border-cyan-500/20 rounded p-3 space-y-2 text-xs text-gray-300 font-mono"
                        >
                            <p>📥 <strong>Export:</strong> Download all your data as JSON or CSV anytime.</p>
                            <p>🗑️ <strong>Delete:</strong> Your account, all gigs, messages, calendar—gone in one click. Permanently.</p>
                            <p>🚀 <strong>Move:</strong> Take your data to another platform. We support standard formats.</p>
                        </motion.div>
                    )}

                    {/* Data Isolation */}
                    <CB51NavBio
                        icon={Database}
                        title="Data Isolation"
                        shortBio="Clean separation"
                        fullBio="Your data is siloed per artist. Band members can't see other artists' gigs. Managers can't see each other's contacts. Strict access control."
                        onClick={() => setExpandedSection(expandedSection === 'isolation' ? null : 'isolation')}
                    />
                    {expandedSection === 'isolation' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 border-l border-cyan-500/30 pl-3 bg-black/60 border border-cyan-500/20 rounded p-3 space-y-2 text-xs text-gray-300 font-mono"
                        >
                            <p>🎨 <strong>Artist-level:</strong> Each artist has their own encrypted database partition.</p>
                            <p>👥 <strong>Team roles:</strong> Band members only see what's shared with them.</p>
                            <p>🔐 <strong>No cross-contamination:</strong> If one account is breached, others stay safe.</p>
                        </motion.div>
                    )}

                    {/* Privacy by Design */}
                    <CB51NavBio
                        icon={Eye}
                        title="Privacy by Design"
                        shortBio="Built in from the start"
                        fullBio="We don't collect tracking pixels, cookies, or analytics on you. We don't profile you. No dark patterns. No engagement tricks. Just CB51."
                        onClick={() => setExpandedSection(expandedSection === 'privacy' ? null : 'privacy')}
                    />
                    {expandedSection === 'privacy' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 border-l border-cyan-500/30 pl-3 bg-black/60 border border-cyan-500/20 rounded p-3 space-y-2 text-xs text-gray-300 font-mono"
                        >
                            <p>📱 <strong>Minimal tracking:</strong> We log feature usage (like "user created gig") but never profile behavior.</p>
                            <p>🚫 <strong>No ads:</strong> We're not selling your attention.</p>
                            <p>🤖 <strong>AI parsing:</strong> Emails you paste for gig scanning are processed encrypted and never stored.</p>
                        </motion.div>
                    )}

                    {/* Infrastructure Security */}
                    <CB51NavBio
                        icon={Shield}
                        title="Infrastructure Security"
                        shortBio="Bulletproof setup"
                        fullBio="Cloud-hosted on AWS & Google Cloud with DDoS protection, regular penetration testing, and 24/7 monitoring. GDPR compliant. UK data residency."
                        onClick={() => setExpandedSection(expandedSection === 'infra' ? null : 'infra')}
                    />
                    {expandedSection === 'infra' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 border-l border-cyan-500/30 pl-3 bg-black/60 border border-cyan-500/20 rounded p-3 space-y-2 text-xs text-gray-300 font-mono"
                        >
                            <p>🛡️ <strong>DDoS Protection:</strong> Cloudflare & AWS Shield defending against attacks.</p>
                            <p>🔍 <strong>Audits:</strong> Third-party penetration testing quarterly.</p>
                            <p>🌍 <strong>Redundancy:</strong> Multi-region backups. If one server fails, you lose nothing.</p>
                            <p>✅ <strong>Compliance:</strong> GDPR, UK GDPR, Data Protection Act 2018 certified.</p>
                        </motion.div>
                    )}

                    {/* What We Collect */}
                    <section className="mt-8 pt-6 border-t border-gray-900">
                        <h2 className="text-white font-black font-mono text-xl mb-3 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-cyan-400" />
                            WHAT WE COLLECT
                        </h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-2 text-sm text-gray-300 font-mono">
                            <p>• Artist names, emails, phone numbers, bios</p>
                            <p>• Gig dates, venues, fees, promoter contact info</p>
                            <p>• Calendar events, band member details</p>
                            <p>• Task lists, finance records</p>
                            <p className="text-cyan-400 font-bold mt-3">What we DON'T collect: Browsing history, location (unless you share), financial accounts, third-party profiles</p>
                        </div>
                    </section>

                    {/* GDPR Rights */}
                    <section className="pt-6">
                        <h2 className="text-white font-black font-mono text-xl mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-cyan-400" />
                            YOUR GDPR RIGHTS
                        </h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4 space-y-2 text-sm text-gray-300 font-mono">
                            <p><strong className="text-white">Access:</strong> Download all your data in machine-readable format</p>
                            <p><strong className="text-white">Delete:</strong> Request permanent deletion of your account & data</p>
                            <p><strong className="text-white">Correct:</strong> Update any inaccurate information</p>
                            <p><strong className="text-white">Port:</strong> Export to another service in open format</p>
                            <p><strong className="text-white">Restrict:</strong> Pause processing of your data</p>
                            <p className="text-green-400 font-bold mt-3">Email family@uf51.love with any data requests (respond within 30 days)</p>
                        </div>
                    </section>

                    {/* No Third Party Sharing */}
                    <section className="pt-6">
                        <h2 className="text-white font-black font-mono text-xl mb-3">THIRD PARTIES</h2>
                        <div className="bg-black border border-gray-900 rounded-lg p-4">
                            <p className="text-red-400 font-bold font-mono text-sm mb-3">We NEVER share with advertisers, data brokers, or other companies.</p>
                            <div className="space-y-2 text-sm text-gray-300 font-mono">
                                <p><strong className="text-white">OpenAI:</strong> For gig email parsing (encrypted)</p>
                                <p><strong className="text-white">Stripe:</strong> For payments only (if you subscribe)</p>
                                <p><strong className="text-white">Email providers:</strong> For band notifications only</p>
                            </div>
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