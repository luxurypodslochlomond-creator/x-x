import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Lock, Heart, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import COOLASFUCKIcon from '@/components/shared/COOLASFUCKIcon';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto space-y-8 py-8">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3">
                        <COOLASFUCKIcon size={64} />
                        <Eye className="w-16 h-16 text-cyan-400" />
                    </div>
                    <h1 className="text-5xl font-black">Privacy (Real Talk)</h1>
                    <p className="text-xl text-gray-300">What we track, what we don't, and why</p>
                </motion.div>

                {/* The Big Promise */}
                <Card className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-4 border-green-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-4xl font-black text-green-400 mb-4 text-center">
                            The Core Principle
                        </h2>
                        <p className="text-2xl text-white text-center font-bold leading-relaxed">
                            We track PLAYS to pay artists.
                            <br />
                            We don't track PEOPLE to sell data.
                        </p>
                        <div className="mt-6 p-4 bg-black/60 rounded-lg border-2 border-cyan-400">
                            <p className="text-cyan-300 text-center font-bold">
                                We will NEVER sell your data. Ever. That's the old world. We don't do that here.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* What We Track */}
                <Card className="bg-black/60 border border-cyan-500/30">
                    <CardContent className="p-8 space-y-6">
                        
                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                                <Eye className="w-8 h-8" />
                                What We Track (And Why)
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <h4 className="font-bold text-white mb-2">🎵 Music Plays</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> When a track is played</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To pay artists fairly based on plays</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> Only the artist and UF51 admins</p>
                                </div>

                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <h4 className="font-bold text-white mb-2">🌍 County-Level Location</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> Your county or region (e.g., "Glasgow" not your exact address)</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To show global impact on the map. You can disable this.</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> Public map (if you choose)</p>
                                </div>

                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <h4 className="font-bold text-white mb-2">📸 Cleanup Photos (Hashed)</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> SHA-256 cryptographic fingerprint of your photo</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To prevent reusing the same photo multiple times (fraud detection)</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> Only AI51 fraud detection system</p>
                                    <p className="text-yellow-300 text-xs mt-2">⚠️ We DON'T store your face or analyze your appearance</p>
                                </div>

                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <h4 className="font-bold text-white mb-2">⚖️ Litter Weight</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> Weight of litter you collected</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To calculate P51 payment</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> You and the public leaderboard (optional)</p>
                                </div>

                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <h4 className="font-bold text-white mb-2">🤖 AI Material Detection Data</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> AI analysis of materials in cleanup photos (plastic, glass, metal, etc.)</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To suggest weight estimates and calculate recycling bonuses</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> Only you (to verify AI suggestions)</p>
                                    <p className="text-cyan-300 text-xs mt-2">✨ This helps you get fair payment without manual verification delays</p>
                                </div>

                                <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                                    <h4 className="font-bold text-white mb-2">💓 HRV Biofeedback (Frequency Chamber)</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> Heart rate detected via phone camera (photoplethysmography - same tech as Apple Watch)</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To adapt healing frequencies to your nervous system state in real-time</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> ONLY YOU. Never stored. Never transmitted. Processed 100% on-device.</p>
                                    <p className="text-purple-300 text-xs mt-2">⚠️ Camera data stays on YOUR phone. We literally cannot see your heart rate.</p>
                                </div>

                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <h4 className="font-bold text-white mb-2">📊 Anonymous Frequency Usage (For Grant Evidence)</h4>
                                    <p className="text-sm text-gray-300"><strong>What:</strong> Which frequency protocol was used, session duration, completion status, device type (mobile/desktop)</p>
                                    <p className="text-sm text-gray-300"><strong>Why:</strong> To prove healing frequencies work (for NHS, Mind, lottery grant applications)</p>
                                    <p className="text-sm text-gray-300"><strong>Who sees it:</strong> PUBLIC aggregated stats (e.g., "528Hz used 10,847 times, 87% completion rate")</p>
                                    <p className="text-green-300 text-xs mt-2">✓ ZERO personal info. No names, emails, locations. Just "Protocol X helped Y people". Helps us get grants to keep it FREE.</p>
                                </div>

                                {/* NEW SECTION - CORPORATE TRACEABILITY */}
                                <div className="bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                                    <h4 className="font-bold text-white mb-2">🏢 Corporate Pollution Data (OPTIONAL - Phase 2)</h4>
                                    <p className="text-sm text-gray-300 mb-2"><strong>What:</strong> Barcode, brand, manufacturing details on litter you photograph</p>
                                    <p className="text-sm text-gray-300 mb-2"><strong>Why:</strong> To build legal evidence against corporate polluters</p>
                                    <p className="text-sm text-gray-300 mb-2"><strong>Who sees it:</strong> Public database (anonymized), lawyers (for lawsuits), YOU (always)</p>
                                    
                                    <div className="mt-3 p-3 bg-black/40 rounded border border-yellow-500/30">
                                        <p className="text-yellow-300 text-xs font-bold mb-2">⚠️ CRITICAL CLARIFICATIONS:</p>
                                        <ul className="text-xs text-gray-300 space-y-1">
                                            <li>• <strong className="text-white">We're NOT tracking YOU.</strong> We're tracking CORPORATE WASTE.</li>
                                            <li>• <strong className="text-white">Your identity stays private.</strong> Only the pollution data is public.</li>
                                            <li>• <strong className="text-white">You can opt out.</strong> Clean for P51 without contributing to corporate database.</li>
                                            <li>• <strong className="text-white">Surveillance tech FOR accountability,</strong> not FOR control.</li>
                                        </ul>
                                    </div>

                                    <div className="mt-3 p-3 bg-green-900/30 rounded border border-green-500/30">
                                        <p className="text-green-300 text-xs font-bold mb-2">✅ Example Use Case:</p>
                                        <p className="text-xs text-gray-300">
                                            "In Glasgow 2025, we have photographic evidence of 47,382 McDonald's cups. 
                                            McDonald's produced them. McDonald's is responsible for cleanup costs. 
                                            We're suing for £350,000. Here's the proof."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-red-400 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-8 h-8" />
                                What We DON'T Track
                            </h3>
                            
                            <div className="bg-red-900/30 p-6 rounded-lg border-2 border-red-500/50">
                                <ul className="space-y-2 text-gray-300">
                                    <li>❌ Your browsing history</li>
                                    <li>❌ Your personal conversations</li>
                                    <li>❌ Your exact GPS coordinates (only county if you choose)</li>
                                    <li>❌ Your listening habits for advertising</li>
                                    <li>❌ Your face (we hash photos, not analyze faces)</li>
                                    <li>❌ Your friends or contacts</li>
                                    <li>❌ Your device fingerprint (except for offline music sync)</li>
                                    <li>❌ Anything we don't need to pay artists or prevent fraud</li>
                                </ul>
                                <p className="text-red-300 font-bold mt-4">
                                    If we don't need it, we don't collect it. Simple.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-purple-400 mb-4">Bluetooth Music Sharing</h3>
                            <p className="text-gray-300 mb-3">
                                You can share healing frequencies with nearby souls via Bluetooth. Here's what happens:
                            </p>
                            <div className="space-y-3">
                                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                    <p className="text-sm text-gray-300"><strong className="text-white">When you share:</strong> Encrypted Bluetooth transmission. No tracking.</p>
                                </div>
                                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                    <p className="text-sm text-gray-300"><strong className="text-white">When you receive:</strong> You can listen offline (zero tracking) or go online (artist gets paid).</p>
                                </div>
                                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                    <p className="text-sm text-gray-300"><strong className="text-white">We don't log:</strong> Who you shared with, when you shared, or how many times you shared.</p>
                                </div>
                            </div>
                            <p className="text-cyan-300 text-sm mt-3">
                                📖 Read more in our <a href="/PrivacyMathematics" className="underline">Privacy Mathematics</a> page
                            </p>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Fraud Detection (Without Invading Privacy)</h3>
                            <p className="text-gray-300 mb-3">
                                We need to stop bots and fake cleanups. But we do it without degrading humans.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
                                    <p className="font-bold text-cyan-300 mb-2">✅ What Triggers Review:</p>
                                    <ul className="space-y-1 text-xs text-gray-300">
                                        <li>• 100+ plays in 1 hour (bot behavior)</li>
                                        <li>• Reused photos (hash matching)</li>
                                        <li>• Fake GPS location</li>
                                        <li>• Multiple accounts from same IP</li>
                                    </ul>
                                </div>
                                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                    <p className="font-bold text-green-300 mb-2">✅ What's NOT Suspicious:</p>
                                    <ul className="space-y-1 text-xs text-gray-300">
                                        <li>• Being broke (poverty ≠ fraud)</li>
                                        <li>• Listening to music for hours</li>
                                        <li>• Submitting small cleanups</li>
                                        <li>• Offline music listening</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-yellow-300 text-sm mt-3">
                                ⚠️ We protect artists WITHOUT degrading humans. That's the Universal Dignity Protocol.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Your Privacy Choices</h3>
                            <p className="text-gray-300 mb-3">
                                You control your privacy level:
                            </p>
                            <div className="space-y-3">
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <p className="font-bold text-white mb-2">🗺️ Location Sharing</p>
                                    <p className="text-sm text-gray-300">Choose: County-level, Country-level, or None</p>
                                    <p className="text-xs text-gray-500 mt-1">Default: County-level (shows global impact without exact location)</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <p className="font-bold text-white mb-2">👁️ Public Profile</p>
                                    <p className="text-sm text-gray-300">Show your cleanups on the public map? (Yes/No)</p>
                                    <p className="text-xs text-gray-500 mt-1">Default: No (private by default)</p>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <p className="font-bold text-white mb-2">🎵 Artist Support Visibility</p>
                                    <p className="text-sm text-gray-300">Show which artists you support? (Yes/No)</p>
                                    <p className="text-xs text-gray-500 mt-1">Default: No (your listening is private)</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Your Data Rights</h3>
                            <p className="text-gray-300 mb-3">
                                You own your data. Here's what you can do:
                            </p>
                            <ul className="space-y-2 text-gray-300 ml-6 list-disc">
                                <li><strong className="text-white">View:</strong> See all data we have on you anytime</li>
                                <li><strong className="text-white">Download:</strong> Export your data (cleanups, plays, earnings)</li>
                                <li><strong className="text-white">Delete:</strong> Request deletion of your account and all data</li>
                                <li><strong className="text-white">Correct:</strong> Fix any incorrect information</li>
                                <li><strong className="text-white">Opt-out:</strong> Stop tracking for non-essential features</li>
                            </ul>
                            <p className="text-cyan-300 text-sm mt-3">
                                💬 Contact us: <a href="mailto:family@uf51.love" className="underline">family@uf51.love</a>
                            </p>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Data Security</h3>
                            <p className="text-gray-300 mb-3">
                                How we protect your data:
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-start gap-3 bg-gray-900/50 p-3 rounded-lg">
                                    <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-bold text-sm">HTTPS Encryption</p>
                                        <p className="text-xs text-gray-400">All data transmitted securely</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-gray-900/50 p-3 rounded-lg">
                                    <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-bold text-sm">SHA-256 Hashing</p>
                                        <p className="text-xs text-gray-400">Photos hashed for fraud prevention (not facial recognition)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-gray-900/50 p-3 rounded-lg">
                                    <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white font-bold text-sm">Base44 Infrastructure</p>
                                        <p className="text-xs text-gray-400">Enterprise-grade database security and backups</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Cookies & Tracking Tech</h3>
                            <p className="text-gray-300 mb-3">
                                We use minimal cookies:
                            </p>
                            <ul className="space-y-2 text-gray-300 ml-6 list-disc">
                                <li><strong className="text-white">Essential:</strong> Login session (required for the site to work)</li>
                                <li><strong className="text-white">Analytics:</strong> Basic usage stats (aggregated, not personal)</li>
                            </ul>
                            <p className="text-yellow-300 text-sm mt-3">
                                ⚠️ We DON'T use tracking cookies for ads. We don't do ads. Period.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Third-Party Services</h3>
                            <p className="text-gray-300 mb-3">
                                Services we use (and what they see):
                            </p>
                            <div className="space-y-2">
                                <div className="bg-gray-900/50 p-3 rounded-lg">
                                    <p className="text-white font-bold text-sm">Base44 (Hosting & Database)</p>
                                    <p className="text-xs text-gray-400">Stores all data. They're family, not a vendor. They don't sell data either.</p>
                                </div>
                                <div className="bg-gray-900/50 p-3 rounded-lg">
                                    <p className="text-white font-bold text-sm">Revolut (Payment Processing)</p>
                                    <p className="text-xs text-gray-400">For P51 → fiat conversions. Sees bank details only when you convert.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Children's Privacy & Parental Consent (COPPA Compliance)</h3>
                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    UF51 is for ages 13+. <strong className="text-white">Children under 13 can only use UF51 with verifiable parental consent.</strong>
                                </p>
                                
                                <div className="bg-yellow-900/30 p-4 rounded-lg border-2 border-yellow-500/50">
                                    <p className="font-bold text-yellow-300 mb-3">📋 PARENTAL CONSENT REQUIRED:</p>
                                    <p className="text-sm text-gray-300 mb-3">
                                        Parents/guardians must confirm they:
                                    </p>
                                    <ul className="text-sm text-gray-300 space-y-1 ml-4">
                                        <li>✓ Understand what data UF51 collects (cleanup location, photo hash, weight, frequency usage)</li>
                                        <li>✓ Understand what UF51 does NOT collect (email, name, face data, browsing history, ads tracking)</li>
                                        <li>✓ Approve their child's participation in cleanup activities</li>
                                        <li>✓ Accept that UF51 uses AI to verify cleanups and prevent fraud</li>
                                        <li>✓ Acknowledge litter cleanup safety risks and will supervise</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-green-900/30 p-4 rounded-lg border-2 border-green-500/50">
                                    <p className="font-bold text-green-300 mb-2">✅ ZERO DATA HARVESTING PROMISE:</p>
                                    <p className="text-sm text-gray-300">
                                        We collect ONLY the minimum data needed to:
                                        <ul className="mt-2 space-y-1 ml-4">
                                            <li>1. Verify cleanups are real (photo hash + weight)</li>
                                            <li>2. Calculate P51 rewards fairly</li>
                                            <li>3. Prevent fraud (duplicate photos, fake locations)</li>
                                        </ul>
                                    </p>
                                    <p className="text-sm text-green-300 font-bold mt-2">
                                        We CANNOT and WILL NOT:
                                        <ul className="mt-2 space-y-1 ml-4 text-gray-300 font-normal">
                                            <li>• Sell your child's data</li>
                                            <li>• Use it for targeted advertising</li>
                                            <li>• Create psychological profiles</li>
                                            <li>• Track their behavior</li>
                                            <li>• Share it with third parties</li>
                                        </ul>
                                    </p>
                                </div>
                                
                                <div className="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
                                    <p className="font-bold text-red-300 mb-2">⚠️ SAFETY NOTICE:</p>
                                    <p className="text-sm text-gray-300">
                                        Litter cleanup can be dangerous. Children may encounter broken glass, sharp objects, needles, or hazardous materials. 
                                        <strong className="text-white"> Parents must supervise all cleanup activities</strong> and ensure proper safety equipment (gloves, appropriate footwear).
                                    </p>
                                </div>
                                
                                <p className="text-gray-300 text-sm">
                                    If we discover a child under 13 using UF51 without parental consent, we'll delete the account and all associated data immediately.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Changes to Privacy Policy</h3>
                            <p className="text-gray-300">
                                We may update this policy as UF51 evolves. We'll notify you of major changes. 
                                Continued use means you accept the updates.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-3xl font-black text-cyan-400 mb-4">Contact & Questions</h3>
                            <p className="text-gray-300 mb-3">
                                Privacy questions or concerns? Reach out:
                            </p>
                            <ul className="space-y-1 text-gray-300">
                                <li>📧 Email: <a href="mailto:family@uf51.love" className="text-cyan-400 underline">family@uf51.love</a></li>
                                <li>💬 AI51 Chat: Available on every page</li>
                            </ul>
                        </section>

                    </CardContent>
                </Card>

                {/* Final Note */}
                <Card className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
                    <CardContent className="p-8 text-center space-y-4">
                        <Heart className="w-16 h-16 text-pink-400 mx-auto" />
                        <h2 className="text-3xl font-black text-white">That's The Truth.</h2>
                        <p className="text-xl text-gray-300">
                            We respect your privacy because we respect you. Simple as that.
                        </p>
                        <p className="text-sm text-gray-400 mt-4">
                            Last Updated: December 2025 (Frequency Chamber HRV Biofeedback added)
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}