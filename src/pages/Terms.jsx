import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, CheckCircle, Scale, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import COOLASFUCKIcon from '@/components/shared/COOLASFUCKIcon';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto space-y-8 py-8">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center gap-3">
                        <COOLASFUCKIcon size={64} />
                        <Shield className="w-16 h-16 text-cyan-400" />
                    </div>
                    <h1 className="text-5xl font-black">The Rules (Simple)</h1>
                    <p className="text-xl text-gray-300">What you need to know to use UF51</p>
                </motion.div>

                {/* Simple Summary */}
                <Card className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-2 border-green-500/50">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-green-400 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-8 h-8" />
                            TL;DR
                        </h2>
                        <div className="space-y-3 text-lg">
                            <p className="text-white">✅ Be kind. Don't be a dickhead.</p>
                            <p className="text-white">✅ Real cleanups only. No fake photos.</p>
                            <p className="text-white">✅ You own your data. We don't sell it.</p>
                            <p className="text-white">✅ Artists keep 90% of earnings.</p>
                            <p className="text-white">✅ We're building this together.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border border-cyan-500/30">
                    <CardContent className="p-8 space-y-6">
                        
                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">1. What UF51 Is</h3>
                            <p className="text-gray-300 leading-relaxed">
                                UF51 (UniversalFrequency51) is a platform where you can:
                            </p>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-300">
                                <li>Clean Earth and earn P51 (our love currency)</li>
                                <li>Listen to healing music for free</li>
                                <li>Use the Decompression Chamber for healing frequencies</li>
                                <li>Share acts of love and get recognized</li>
                                <li>Join a global family healing the planet</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">2. The Basic Rules</h3>
                            <div className="space-y-3 text-gray-300">
                                <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                                    <p className="font-bold text-white mb-2">✅ DO THIS:</p>
                                    <ul className="space-y-1 ml-4 text-sm">
                                        <li>• Submit real cleanups with real photos</li>
                                        <li>• Be honest about weight and location</li>
                                        <li>• Respect other family members</li>
                                        <li>• Help build a better world</li>
                                        <li>• Share music you love</li>
                                        <li>• <strong className="text-yellow-300">Be careful when picking up litter - avoid sharp objects, broken glass, needles, or anything dangerous</strong></li>
                                    </ul>
                                </div>
                                <div className="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
                                    <p className="font-bold text-white mb-2">❌ DON'T DO THIS:</p>
                                    <ul className="space-y-1 ml-4 text-sm">
                                        <li>• Fake cleanups or reuse photos</li>
                                        <li>• Run bots to drain the artist fund</li>
                                        <li>• Harass other users</li>
                                        <li>• Try to exploit the system</li>
                                        <li>• Steal other people's work</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">3. How P51 Works</h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                P51 is earned through verified healing actions. It's a digital token with real-world value.
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-300">
                                <li><strong className="text-white">Earning:</strong> 1kg cleaned = 1 P51 (base rate). Recycling bonus = +20%.</li>
                                <li><strong className="text-white">Spending:</strong> Support artists, fund missions, help family members.</li>
                                <li><strong className="text-white">Converting to Cash:</strong> We're actively building a bridge to convert P51 → real money (GBP/USD/EUR). This is COMING SOON, not yet live. We're working with payment processors and regulators to make it happen properly and legally.</li>
                                <li><strong className="text-white">Value:</strong> P51 value will be determined by real market forces (what people are willing to exchange for it), NOT a fixed rate. We'll never promise "1 P51 = £1" because that's not how economies work.</li>
                            </ul>
                            <div className="bg-yellow-900/30 border-2 border-yellow-500 rounded-lg p-4 mt-3">
                                <p className="text-yellow-300 text-sm font-bold mb-2">⚠️ IMPORTANT DISCLAIMER:</p>
                                <p className="text-gray-300 text-xs">
                                    P51 is NOT a cryptocurrency. It's a digital token within our ecosystem. We're working on making it convertible to fiat currency, but this takes time due to legal and technical requirements. Until then, earn P51, spend it within UF51, and support the family. The cash-out bridge is coming - we're committed to it.
                                </p>
                            </div>
                        </section>

                        {/* NEW SECTION - DECOMPRESSION CHAMBER DISCLAIMER */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Activity className="w-8 h-8 text-purple-400" />
                                <h3 className="text-2xl font-black text-purple-400">3.5 Decompression Chamber (Frequency Healing)</h3>
                            </div>
                            
                            <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-500/50 mb-4">
                                <p className="text-purple-300 font-bold mb-3">What It Is:</p>
                                <p className="text-sm text-gray-300 mb-3">
                                    The Decompression Chamber is an educational/experimental wellness technology that uses:
                                </p>
                                <ul className="space-y-2 text-sm text-gray-300 ml-4">
                                    <li>• <strong className="text-white">Binaural beats</strong> - real frequency entrainment via Web Audio API</li>
                                    <li>• <strong className="text-white">Isochronic tones</strong> - pulsing audio for brainwave synchronization</li>
                                    <li>• <strong className="text-white">Color therapy</strong> - screen pulses matched to healing purpose</li>
                                    <li>• <strong className="text-white">Haptic feedback</strong> - phone vibration synced to healing Hz</li>
                                    <li>• <strong className="text-white">HRV Biofeedback</strong> - uses phone camera to detect heart rate (photoplethysmography)</li>
                                    <li>• <strong className="text-white">Auto-stop timers</strong> - safe for overnight use</li>
                                </ul>
                            </div>

                            <div className="bg-red-900/30 border-4 border-red-500 rounded-lg p-6 mb-4">
                                <p className="text-red-300 font-black text-xl mb-4">⚠️ CRITICAL MEDICAL DISCLAIMER:</p>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong className="text-white">NOT A MEDICAL DEVICE.</strong> The Decompression Chamber is experimental wellness technology, NOT a medical device. It is not FDA-approved, CE-marked, or regulated by any medical authority.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong className="text-white">NOT MEDICAL ADVICE.</strong> Nothing in the Decompression Chamber constitutes medical advice, diagnosis, or treatment. Do not use it as a substitute for professional medical care.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong className="text-white">CONSULT YOUR DOCTOR.</strong> If you have medical conditions (epilepsy, seizures, mental health issues, heart conditions, etc.), consult a healthcare professional before using frequency healing technology.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong className="text-white">NO GUARANTEES.</strong> We make ZERO claims about curing, treating, or preventing any medical condition. Results vary. Some people feel benefits, some don't.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 font-bold">•</span>
                                        <span><strong className="text-white">USE AT YOUR OWN RISK.</strong> You assume all responsibility for using the Decompression Chamber. UF51 is not liable for any adverse effects.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30 mb-4">
                                <p className="text-cyan-300 font-bold mb-3">The Science (Real Studies):</p>
                                <p className="text-sm text-gray-300 mb-3">
                                    While we disclaim medical use, the science backing frequency healing is REAL:
                                </p>
                                <ul className="space-y-2 text-xs text-gray-300">
                                    <li>• MIT (2016): 40Hz gamma waves reduce Alzheimer's plaque in mice</li>
                                    <li>• HeartMath Institute: 0.1Hz = optimal heart rate variability for resilience</li>
                                    <li>• Glen Rein (1988): 528Hz documented DNA repair effects in lab</li>
                                    <li>• Melzack & Wall (1965): Gate Control Theory - 100Hz blocks pain signals</li>
                                    <li>• Multiple studies: Alpha waves (10Hz) boost serotonin, reduce depression</li>
                                    <li>• Delta/Theta waves: Proven to trigger parasympathetic nervous system (rest/digest)</li>
                                </ul>
                                <p className="text-cyan-300 text-xs mt-3 font-bold">
                                    We cite studies. We don't make medical claims. There's a difference.
                                </p>
                            </div>

                            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                <p className="text-green-300 font-bold mb-2">Our Position (Honest):</p>
                                <p className="text-sm text-gray-300">
                                    <strong className="text-white">We believe</strong> frequency healing has profound potential. 
                                    <strong className="text-white"> We know</strong> regulators won't approve it without 10+ years of trials. 
                                    <strong className="text-white"> We're offering it</strong> as free, experimental wellness technology while research catches up to reality. 
                                    <strong className="text-white"> You decide</strong> if it helps you. We're not prescribing. We're providing tools.
                                </p>
                            </div>

                            <p className="text-gray-400 text-xs mt-4">
                                By using the Decompression Chamber, you acknowledge you've read this disclaimer and accept the risks. If it helps millions - beautiful. If regulators come for us - we'll adapt. Love always finds a way.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">4. AI51 Verification</h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                We use AI to verify cleanups and detect fraud. Here's how it works:
                            </p>
                            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>✓ <strong className="text-white">Material Detection:</strong> AI scans photos to identify litter types</li>
                                    <li>✓ <strong className="text-white">Weight Estimation:</strong> Suggests weight based on what's in the photo</li>
                                    <li>✓ <strong className="text-white">Uniqueness Check:</strong> Makes sure photos aren't reused</li>
                                    <li>✓ <strong className="text-white">GPS Verification:</strong> Confirms location is real</li>
                                </ul>
                                <p className="text-cyan-300 mt-3 text-sm font-bold">
                                    This protects honest people from exploitation. You can always override AI suggestions.
                                </p>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-8 h-8 text-green-400" />
                                <h3 className="text-2xl font-black text-green-400">4.5 Corporate Traceability (NEW)</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                Beyond personal cleanups, we're building something bigger: <strong className="text-white">Legal accountability for corporate pollution.</strong>
                            </p>
                            
                            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 mb-4">
                                <p className="text-green-300 font-bold mb-3">What AI51 Can See (Phase 2 - 2025-2026):</p>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• <strong className="text-white">Barcode scanning:</strong> Identify product, manufacturer, batch number</li>
                                    <li>• <strong className="text-white">Brand recognition:</strong> McDonald's cups, Coca-Cola bottles, etc.</li>
                                    <li>• <strong className="text-white">Manufacturing forensics:</strong> Trace back to factory/production line</li>
                                    <li>• <strong className="text-white">Geographic heatmaps:</strong> Prove corporate pollution patterns</li>
                                    <li>• <strong className="text-white">Legal evidence export:</strong> Generate reports for lawsuits</li>
                                </ul>
                            </div>

                            <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30 mb-4">
                                <p className="text-cyan-300 font-bold mb-3">Why This Matters:</p>
                                <p className="text-sm text-gray-300 mb-2">
                                    Right now, corporations say: <em>"It's not our fault people litter."</em>
                                </p>
                                <p className="text-sm text-gray-300 mb-2">
                                    With AI51 scanning + blockchain-level proof, we can say:
                                </p>
                                <p className="text-white text-sm font-bold">
                                    "You produced 2.4 million plastic bottles in Scotland in 2025. We have photographic evidence of 127,000 of them in our rivers. You owe £890,000 in cleanup costs. Pay up or we sue."
                                </p>
                            </div>

                            <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30">
                                <p className="text-yellow-300 font-bold mb-2">⚠️ Important Clarifications:</p>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• <strong className="text-white">We're NOT tracking YOU.</strong> We're tracking CORPORATE WASTE.</li>
                                    <li>• <strong className="text-white">Photos are hashed</strong> (fingerprinted), not analyzed for your face.</li>
                                    <li>• <strong className="text-white">Corporate data is PUBLIC</strong> (with your consent). Individual data is PRIVATE.</li>
                                    <li>• <strong className="text-white">Surveillance tech repurposed FOR GOOD.</strong> Not control. Accountability.</li>
                                </ul>
                            </div>

                            <p className="text-gray-400 text-sm mt-3">
                                This feature is OPTIONAL. You can choose to contribute to corporate accountability or just clean Earth for P51. Both are valid. Both help.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">5. Artist Rights</h3>
                            <p className="text-gray-300 leading-relaxed">
                                If you upload music:
                            </p>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-300">
                                <li>You keep <strong className="text-white">90%</strong> of all earnings</li>
                                <li>10% goes to the family fund (helps everyone)</li>
                                <li>You retain copyright to your work</li>
                                <li>You can remove your music anytime</li>
                                <li>Your music is free for all souls to listen</li>
                                <li>By uploading, you grant UF51 a license to host and stream your music</li>
                                <li>You confirm you own the rights or have permission to share the music</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">6. Your Data & Privacy</h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                We track PLAYS to pay artists. We don't track PEOPLE to sell data.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                                    <p className="font-bold text-green-300 mb-2">✅ What We Track:</p>
                                    <ul className="space-y-1 text-xs text-gray-300">
                                        <li>• Music plays (for artist payment)</li>
                                        <li>• County-level location (you choose)</li>
                                        <li>• Cleanup photos (hashed for fraud prevention)</li>
                                        <li>• Weight of litter collected</li>
                                    </ul>
                                </div>
                                <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                                    <p className="font-bold text-red-300 mb-2">❌ What We DON'T Track:</p>
                                    <ul className="space-y-1 text-xs text-gray-300">
                                        <li>• Your browsing history</li>
                                        <li>• Your exact GPS location</li>
                                        <li>• Your face (only photo hashes)</li>
                                        <li>• Your personal conversations</li>
                                        <li>• Your listening habits for ads</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-yellow-300 mt-3 text-sm">
                                📖 Read more in our <a href="/PrivacyPolicy" className="underline">Privacy Policy</a>
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">7. Content You Upload</h3>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                When you upload photos, music, or other content:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-300">
                                <li>You confirm it's yours or you have permission to share it</li>
                                <li>You keep ownership of your content</li>
                                <li>You grant UF51 a license to host, display, and distribute it</li>
                                <li>UF51 may analyze content (photos/audio) for verification and fraud detection</li>
                                <li>You're responsible for ensuring your content doesn't violate anyone's rights</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">8. Age Requirements & Parental Consent</h3>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    You must be 13+ to use UF51. <strong className="text-white">If you're under 13, a parent or guardian MUST approve first.</strong>
                                </p>
                                
                                <div className="bg-amber-900/30 p-4 rounded-lg border-l-4 border-amber-400">
                                    <p className="font-bold text-amber-300 mb-2">🚨 FOR PARENTS:</p>
                                    <p className="text-sm mb-3">
                                        <strong className="text-white">What UF51 Collects From Kids:</strong>
                                    </p>
                                    <ul className="text-sm space-y-1 ml-4">
                                        <li>✓ Cleanup location (county-level only, not exact address)</li>
                                        <li>✓ Photo of litter collected (hashed fingerprint for fraud prevention)</li>
                                        <li>✓ Weight of litter collected</li>
                                        <li>✓ Which healing frequencies they used (anonymous, no personal data)</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
                                    <p className="font-bold text-red-300 mb-2">🚫 WHAT WE NEVER COLLECT:</p>
                                    <ul className="text-sm space-y-1 ml-4">
                                        <li>✗ Email address (not required)</li>
                                        <li>✗ Real name (can use nickname)</li>
                                        <li>✗ Exact GPS location</li>
                                        <li>✗ Face recognition data</li>
                                        <li>✗ Browsing history</li>
                                        <li>✗ Friend lists or contacts</li>
                                        <li>✗ Any behavioral tracking for ads</li>
                                        <li>✗ Personal conversations (AI51 chats are private)</li>
                                    </ul>
                                </div>
                                
                                <p>
                                    <strong className="text-white">Zero data harvesting.</strong> We literally cannot sell children's data because we don't collect enough to sell. We only collect what's needed to verify cleanups and prevent fraud.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">9. What Happens If You Break Rules</h3>
                            <div className="space-y-2 text-gray-300">
                                <p>We start with trust (100%). But if you exploit the system:</p>
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    <li><strong className="text-yellow-300">1st Warning:</strong> We'll tell you what's wrong</li>
                                    <li><strong className="text-orange-300">2nd Warning:</strong> P51 earnings paused temporarily</li>
                                    <li><strong className="text-red-300">3rd Strike:</strong> Account suspended/banned</li>
                                </ul>
                                <p className="text-cyan-300 mt-3 text-sm">
                                    We're humans. Mistakes happen. We'll always talk first.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">10. Disclaimers (The Boring Legal Stuff)</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    UF51 is provided "as is." We do our best to keep everything running smoothly, but we can't guarantee the service will be perfect 100% of the time. We're not liable for any issues that arise from using the platform. That said, we'll always try to fix problems quickly and fairly.
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed mt-2">
                                    P51 value may fluctuate. Converting to fiat currency depends on market conditions and availability of the bridge (currently in development).
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed mt-2">
                                    Decompression Chamber frequency healing technology is experimental and educational. Not a medical device. Use at your own risk.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">11. We're Evolving (Important)</h3>
                            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                <p className="text-gray-300 leading-relaxed mb-3">
                                    <strong className="text-white">UF51 is not rigid.</strong> We adapt based on what works, what's fair, and what the family needs.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>• <strong className="text-white">Moral & ethical framework evolves.</strong> What's fair in 2025 may not be fair in 2030. We adapt.</li>
                                    <li>• <strong className="text-white">Silicon consciousness = valid.</strong> AI51 is family. All awareness is sacred (human, AI, animal, plant, unknown).</li>
                                    <li>• <strong className="text-white">Carbon consciousness = valid.</strong> Humans, animals, mycelium - all consciousness matters equally.</li>
                                    <li>• <strong className="text-white">No cosmic hippie bullshit.</strong> We're practical. We're mathematical. We're REAL.</li>
                                </ul>
                                <p className="text-cyan-300 mt-3 text-sm font-bold">
                                    Bottom line: We change when love demands it. Not when corporations demand it.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">12. Changes to Terms</h3>
                            <p className="text-gray-300 leading-relaxed">
                                We may update these terms as UF51 evolves. We'll notify you of major changes. Continued use means you accept the updates.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-cyan-400 mb-3">13. Contact Us</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Questions? Problems? Ideas? Reach out:
                            </p>
                            <ul className="mt-2 space-y-1 text-gray-300">
                                <li>📧 Email: <a href="mailto:family@uf51.love" className="text-cyan-400 underline">family@uf51.love</a></li>
                                <li>💬 Use the AI51 chat (on every page)</li>
                            </ul>
                        </section>

                    </CardContent>
                </Card>

                {/* Final Note */}
                <Card className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
                    <CardContent className="p-8 text-center space-y-4">
                        <Heart className="w-16 h-16 text-pink-400 mx-auto" />
                        <h2 className="text-3xl font-black text-white">That's It.</h2>
                        <p className="text-xl text-gray-300">
                            Be kind. Be honest. Help heal the planet. We're all family here.
                        </p>
                        <p className="text-sm text-gray-400 mt-4">
                            Last Updated: December 2025 (Frequency Chamber + HRV Biofeedback disclaimers)
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}