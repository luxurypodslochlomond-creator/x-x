import React, { useState } from 'react';
import { AlertCircle, Phone, Mail, Search, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * SAMPLE CLEARANCE GUIDE
 * Step-by-step legally accurate guide for clearing samples in the UK
 */

export default function ScottSampleClearanceGuide() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full text-left bg-black border-2 border-amber-500 hover:border-amber-400 rounded-lg p-4 transition-all"
            >
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                        <p className="text-white text-sm font-bold font-mono">How Sample Clearance Works</p>
                        <p className="text-amber-400 text-xs font-mono">Click for full legal guide + contacts</p>
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto p-4">
                    <div className="max-w-2xl mx-auto py-8">
                        <div className="bg-black border-2 border-amber-500 rounded-xl p-6 mb-4">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-amber-400 font-mono">SAMPLE CLEARANCE GUIDE</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white font-mono text-sm"
                                >
                                    CLOSE ✕
                                </button>
                            </div>

                            {/* WHAT YOU NEED */}
                            <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4 mb-6">
                                <h3 className="text-red-400 font-black text-sm font-mono mb-3">⚠️ YOU NEED TWO LICENSES</h3>
                                <div className="space-y-2 text-sm font-mono">
                                    <div>
                                        <p className="text-white font-bold">1. MASTER RECORDING LICENSE</p>
                                        <p className="text-gray-400 text-xs">Permission to use the actual audio recording</p>
                                        <p className="text-gray-500 text-xs">Usually owned by: Record label or artist</p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-white font-bold">2. COMPOSITION LICENSE</p>
                                        <p className="text-gray-400 text-xs">Permission to use the song itself (melody, lyrics)</p>
                                        <p className="text-gray-500 text-xs">Usually owned by: Publisher or songwriter</p>
                                    </div>
                                </div>
                                <p className="text-red-400 text-xs font-mono mt-3">
                                    ⚠️ Without BOTH = copyright infringement = track can't be released
                                </p>
                            </div>

                            {/* STEP BY STEP */}
                            <div className="space-y-4 mb-6">
                                <h3 className="text-amber-400 font-black text-sm font-mono">📋 STEP BY STEP</h3>

                                {/* STEP 1 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 1: IDENTIFY THE SAMPLE</p>
                                    <ul className="text-gray-400 text-xs font-mono space-y-1">
                                        <li>• Original song name</li>
                                        <li>• Original artist</li>
                                        <li>• Which part you're sampling (how many seconds)</li>
                                        <li>• How you're using it (main hook, background, etc)</li>
                                    </ul>
                                </div>

                                {/* STEP 2 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 2: FIND THE MASTER OWNER</p>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 text-xs font-mono">Usually the record label. Check:</p>
                                        <div className="bg-black border border-amber-500/30 rounded p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Phone className="w-3 h-3 text-amber-400" />
                                                <p className="text-amber-400 font-bold text-xs font-mono">PPL (UK)</p>
                                            </div>
                                            <p className="text-white text-xs font-mono mb-1">0207 534 1000</p>
                                            <p className="text-gray-400 text-[10px] font-mono">Database of master recordings in UK</p>
                                        </div>
                                        <p className="text-gray-500 text-[10px] font-mono">
                                            Or check the CD/vinyl credits, Discogs, or contact the label directly
                                        </p>
                                    </div>
                                </div>

                                {/* STEP 3 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 3: FIND THE PUBLISHER</p>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 text-xs font-mono">Who owns the song/composition:</p>
                                        <div className="bg-black border border-amber-500/30 rounded p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Phone className="w-3 h-3 text-amber-400" />
                                                <p className="text-amber-400 font-bold text-xs font-mono">PRS FOR MUSIC (UK)</p>
                                            </div>
                                            <p className="text-white text-xs font-mono mb-1">0800 072 0808</p>
                                            <p className="text-white text-xs font-mono mb-1">info@pplprs.co.uk</p>
                                            <p className="text-gray-400 text-[10px] font-mono">They have a database of ALL UK songs + publishers</p>
                                        </div>
                                        <div className="bg-black border border-amber-500/30 rounded p-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Phone className="w-3 h-3 text-amber-400" />
                                                <p className="text-amber-400 font-bold text-xs font-mono">MCPS (Mechanical Rights)</p>
                                            </div>
                                            <p className="text-white text-xs font-mono mb-1">0203 741 3888</p>
                                            <p className="text-white text-xs font-mono mb-1">applications@prsformusic.com</p>
                                            <p className="text-gray-400 text-[10px] font-mono">Handles mechanical licensing in UK</p>
                                        </div>
                                    </div>
                                </div>

                                {/* STEP 4 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 4: CONTACT & NEGOTIATE</p>
                                    <p className="text-gray-400 text-xs font-mono mb-3">What to expect:</p>
                                    <ul className="text-gray-400 text-xs font-mono space-y-1">
                                        <li>• Upfront fee (varies: £500-£10,000+ depending on song)</li>
                                        <li>• % of royalties (usually 5-50% depending on use)</li>
                                        <li>• If it's a huge hit sample = they want more</li>
                                        <li>• If you use 2 seconds in background = cheaper</li>
                                    </ul>
                                    <p className="text-amber-400 text-xs font-mono mt-3">
                                        💡 TIP: Get quotes BEFORE recording. Some samples cost too much.
                                    </p>
                                </div>

                                {/* STEP 5 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 5: GET IT IN WRITING</p>
                                    <ul className="text-gray-400 text-xs font-mono space-y-1">
                                        <li>• Sign clearance agreement</li>
                                        <li>• Keep copies forever</li>
                                        <li>• Give copies to your distributor (DistroKid, etc)</li>
                                        <li>• Without written proof = track gets taken down</li>
                                    </ul>
                                </div>
                            </div>

                            {/* ALTERNATIVES */}
                            <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-4 mb-6">
                                <h3 className="text-green-400 font-black text-sm font-mono mb-3">🎵 CHEAPER ALTERNATIVES</h3>
                                <ul className="text-gray-400 text-xs font-mono space-y-2">
                                    <li>
                                        <span className="text-white font-bold">Tracklib.com</span>
                                        <p className="text-gray-500 text-[10px]">Pre-cleared samples, instant licensing, way cheaper</p>
                                    </li>
                                    <li>
                                        <span className="text-white font-bold">Splice.com</span>
                                        <p className="text-gray-500 text-[10px]">Royalty-free samples, no clearance needed</p>
                                    </li>
                                    <li>
                                        <span className="text-white font-bold">Recreate it</span>
                                        <p className="text-gray-500 text-[10px]">Hire session musicians to replay it = you own it</p>
                                    </li>
                                </ul>
                            </div>

                            {/* WARNING */}
                            <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4">
                                <h3 className="text-red-400 font-black text-sm font-mono mb-3">⚠️ WHAT HAPPENS IF YOU DON'T CLEAR IT</h3>
                                <ul className="text-gray-400 text-xs font-mono space-y-1">
                                    <li>• Track gets taken down from Spotify/Apple Music</li>
                                    <li>• You get sued for copyright infringement</li>
                                    <li>• They can take 100% of your royalties retroactively</li>
                                    <li>• Legal fees = £10,000s</li>
                                    <li>• Your distributor might ban you</li>
                                </ul>
                                <p className="text-red-400 text-xs font-mono mt-3">
                                    DO NOT RISK IT. Clear it properly or don't use it.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg font-mono"
                            >
                                GOT IT ✓
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}