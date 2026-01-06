import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mail, Shield, Zap, Copy, CheckCircle } from 'lucide-react';

/**
 * CB51 EMAIL SETUP GUIDE
 * How to forward gig offers to AI51 for automatic parsing
 */

export default function ScottEmailSetup() {
    const [copied, setCopied] = React.useState(false);
    const emailAddress = 'gigs@cb51.uf51.love';

    const copyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        document.title = 'CB51 • Email Setup';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f1419] to-[#0a0f1a] pb-20">
            {/* HEADER */}
            <div className="sticky top-0 z-50 border-b border-cyan-500/30 px-4 py-3 bg-[#0a0f1a]/95 backdrop-blur-xl">
                <Link to={createPageUrl('CB51')} className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 text-cyan-400" />
                    Back
                </Link>
            </div>

            <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
                {/* TITLE */}
                <div className="text-center">
                    <Mail className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-cyan-400 font-black text-3xl font-mono mb-2">Email Setup</h1>
                    <p className="text-gray-500 text-sm font-mono">Forward gig offers → AI51 parses automatically</p>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <h2 className="text-white font-black text-xl font-mono mb-4">How It Works</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 text-black font-black rounded-lg flex items-center justify-center flex-shrink-0 font-mono">
                                1
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm font-mono mb-1">Receive gig offer email</p>
                                <p className="text-gray-400 text-xs font-mono">From promoter/venue in your inbox</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 text-black font-black rounded-lg flex items-center justify-center flex-shrink-0 font-mono">
                                2
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm font-mono mb-1">Forward to AI51</p>
                                <p className="text-gray-400 text-xs font-mono">Send to: {emailAddress}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-cyan-500 text-black font-black rounded-lg flex items-center justify-center flex-shrink-0 font-mono">
                                3
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm font-mono mb-1">AI51 parses everything</p>
                                <p className="text-gray-400 text-xs font-mono">Venue, date, fee, capacity, requirements</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-500 text-black font-black rounded-lg flex items-center justify-center flex-shrink-0 font-mono">
                                ✓
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm font-mono mb-1">Appears in CB51</p>
                                <p className="text-gray-400 text-xs font-mono">Ready to review, filtered, drafted</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EMAIL ADDRESS */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-lg font-mono">Your Email Address</h2>
                    </div>

                    <div className="bg-black/60 border border-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-white font-bold text-lg font-mono text-center mb-3">
                            {emailAddress}
                        </p>
                        <button
                            onClick={copyEmail}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded-lg font-mono flex items-center justify-center gap-2 transition-all"
                        >
                            {copied ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-5 h-5" />
                                    Copy Email
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                        <p className="text-white font-bold text-xs font-mono mb-2">💡 Pro Tip</p>
                        <p className="text-gray-400 text-xs font-mono">
                            Add this to your contacts as "CB51 AI". Then just forward → "CB51 AI" → Done.
                        </p>
                    </div>
                </div>

                {/* WHITE LABEL */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-cyan-400 font-black text-lg font-mono">White Label Ready</h2>
                    </div>

                    <div className="space-y-3 text-sm font-mono">
                        <p className="text-white">Each white-label customer gets their own subdomain + email:</p>
                        
                        <div className="bg-black/60 border border-gray-800 rounded-lg p-3">
                            <p className="text-cyan-400 text-xs mb-1">Example:</p>
                            <p className="text-white text-xs">yourband.cb51.uf51.love</p>
                            <p className="text-white text-xs">gigs@yourband.cb51.uf51.love</p>
                        </div>

                        <p className="text-gray-400 text-xs">
                            ✓ Isolated data<br/>
                            ✓ Branded email<br/>
                            ✓ Same powerful AI
                        </p>
                    </div>
                </div>

                {/* SECURITY */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-6 h-6 text-green-400" />
                        <h2 className="text-green-400 font-black text-lg font-mono">Security</h2>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                        <p className="text-white">✓ Only you can see your data</p>
                        <p className="text-white">✓ Emails processed and deleted</p>
                        <p className="text-white">✓ No third-party access</p>
                        <p className="text-white">✓ End-to-end encryption</p>
                        <p className="text-gray-500 mt-3">AI51 only sees what you forward</p>
                    </div>
                </div>

                {/* TIME SAVED */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-amber-400" />
                        <h2 className="text-amber-400 font-black text-lg font-mono">Time Saved</h2>
                    </div>

                    <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-4">
                        <p className="text-white font-bold text-2xl font-mono mb-2">~2 hours</p>
                        <p className="text-gray-400 text-xs font-mono">Per gig offer (reading, parsing, drafting, organizing)</p>
                    </div>
                </div>

                {/* SETUP STATUS */}
                <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-6">
                    <p className="text-amber-400 font-bold text-sm font-mono mb-2">⚠️ Coming Soon</p>
                    <p className="text-white text-xs font-mono mb-3">
                        Email forwarding launching January 2026. For now, paste emails directly into CB51.
                    </p>
                    <Link to={createPageUrl('ScottGigOffers')}>
                        <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-3 rounded-lg text-sm font-mono transition-all">
                            Paste Gig Offers →
                        </button>
                    </Link>
                </div>

                {/* FOOTER */}
                <div className="text-center pt-6 border-t border-cyan-500/30">
                    <p className="text-gray-700 text-xs font-mono">CB51 • Zero stress ♾️📻♾️</p>
                </div>
            </div>
        </div>
    );
}