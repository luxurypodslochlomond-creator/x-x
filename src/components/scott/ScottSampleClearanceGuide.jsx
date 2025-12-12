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
                                        <p className="text-gray-400 text-xs font-mono">Usually the record label. Check by region:</p>
                                        
                                        <div className="bg-black border border-amber-500/30 rounded p-3">
                                            <p className="text-amber-400 font-bold text-xs font-mono mb-2">🇬🇧 UK</p>
                                            <p className="text-white text-xs font-mono">PPL: 0207 534 1000</p>
                                        </div>

                                        <div className="bg-black border border-cyan-500/30 rounded p-3">
                                            <p className="text-cyan-400 font-bold text-xs font-mono mb-2">🇺🇸 USA</p>
                                            <p className="text-white text-xs font-mono mb-1">SoundExchange: +1 202-640-5858</p>
                                            <p className="text-gray-400 text-[10px] font-mono">Or contact label directly (Universal, Sony, Warner, etc)</p>
                                        </div>

                                        <div className="bg-black border border-green-500/30 rounded p-3">
                                            <p className="text-green-400 font-bold text-xs font-mono mb-2">🇰🇷 KOREA (K-POP)</p>
                                            <p className="text-white text-xs font-mono">Labels: SM, YG, HYBE, JYP handle internally</p>
                                            <p className="text-gray-400 text-[10px] font-mono">Contact label A&R department directly</p>
                                        </div>

                                        <div className="bg-black border border-purple-500/30 rounded p-3">
                                            <p className="text-purple-400 font-bold text-xs font-mono mb-2">🇪🇺 EUROPE</p>
                                            <p className="text-white text-xs font-mono">Varies by country - contact national collection societies</p>
                                        </div>

                                        <p className="text-gray-500 text-[10px] font-mono mt-2">
                                            Or check CD/vinyl credits, Discogs, AllMusic, or Wikipedia
                                        </p>
                                    </div>
                                </div>

                                {/* STEP 3 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 3: FIND THE PUBLISHER</p>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 text-xs font-mono">Who owns the song/composition by region:</p>
                                        
                                        <div className="bg-black border border-amber-500/30 rounded p-3">
                                            <p className="text-amber-400 font-bold text-xs font-mono mb-2">🇬🇧 UK</p>
                                            <p className="text-white text-xs font-mono">PRS for Music: 0800 072 0808</p>
                                            <p className="text-white text-xs font-mono">MCPS: 0203 741 3888</p>
                                            <p className="text-white text-xs font-mono text-[10px] mt-1">applications@prsformusic.com</p>
                                        </div>

                                        <div className="bg-black border border-cyan-500/30 rounded p-3">
                                            <p className="text-cyan-400 font-bold text-xs font-mono mb-2">🇺🇸 USA</p>
                                            <p className="text-white text-xs font-mono mb-1">ASCAP: +1 212-621-6000 (licensing@ascap.com)</p>
                                            <p className="text-white text-xs font-mono mb-1">BMI: +1 212-220-3000 (licensing@bmi.com)</p>
                                            <p className="text-white text-xs font-mono mb-1">SESAC: +1 615-320-0055</p>
                                            <p className="text-white text-xs font-mono">Harry Fox Agency: +1 212-922-4203 (mechanical rights)</p>
                                        </div>

                                        <div className="bg-black border border-green-500/30 rounded p-3">
                                            <p className="text-green-400 font-bold text-xs font-mono mb-2">🇰🇷 KOREA (K-POP)</p>
                                            <p className="text-white text-xs font-mono mb-1">KOMCA: +82 2-2660-0400</p>
                                            <p className="text-white text-xs font-mono mb-1">KOSCAP: +82 2-2660-0300</p>
                                            <p className="text-gray-400 text-[10px] font-mono">Korean music copyright societies</p>
                                        </div>

                                        <div className="bg-black border border-purple-500/30 rounded p-3">
                                            <p className="text-purple-400 font-bold text-xs font-mono mb-2">🇪🇺 EUROPE</p>
                                            <p className="text-white text-xs font-mono mb-1">🇩🇪 GEMA (Germany): +49 89-48003-0</p>
                                            <p className="text-white text-xs font-mono mb-1">🇫🇷 SACEM (France): +33 1-47-15-47-15</p>
                                            <p className="text-white text-xs font-mono">Each country has its own PRO</p>
                                        </div>

                                        <p className="text-amber-400 text-xs font-mono mt-3">
                                            💡 TIP: If sample is from multiple countries, you need clearance from ALL territories
                                        </p>
                                    </div>
                                </div>

                                {/* STEP 4 */}
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                                    <p className="text-white font-bold text-sm font-mono mb-2">STEP 4: CONTACT & NEGOTIATE</p>
                                    <p className="text-gray-400 text-xs font-mono mb-3">Costs by region:</p>
                                    <ul className="text-gray-400 text-xs font-mono space-y-1">
                                        <li>• 🇬🇧 UK: £500-£10,000+ upfront + 5-50% royalties</li>
                                        <li>• 🇺🇸 USA: $1,000-$50,000+ upfront (more expensive)</li>
                                        <li>• 🇰🇷 K-pop: Contact label - usually 20-50% split</li>
                                        <li>• 🇪🇺 Europe: Varies by country, similar to UK</li>
                                    </ul>
                                    <p className="text-gray-500 text-[10px] font-mono mt-2">
                                        Factors: How famous is the original? How much are you using? Is it the hook or background?
                                    </p>
                                    <p className="text-amber-400 text-xs font-mono mt-3">
                                        💡 TIP: Get quotes BEFORE recording. Some samples cost too much.
                                    </p>
                                    <p className="text-cyan-400 text-xs font-mono mt-2">
                                        🌍 GLOBAL RELEASE: Need clearance in EVERY territory you're releasing in
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