import React from 'react';
import { Shield, Heart, AlertTriangle } from 'lucide-react';

/**
 * ANIMAL HEALING TERMS & CONDITIONS
 * Legal protection + clear disclaimers
 */

export default function PetSounds51Terms() {
    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-black mb-3">Terms & Conditions</h1>
                    <p className="text-gray-400">PetSounds51 Animal Healing Service</p>
                    <p className="text-sm text-gray-600 mt-2">Last Updated: January 7, 2026</p>
                </div>

                {/* Critical Disclaimer */}
                <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <div className="text-yellow-200">
                            <p className="font-black text-lg mb-2">NOT VETERINARY MEDICAL ADVICE</p>
                            <p className="text-sm leading-relaxed">
                                PetSounds51 provides complementary sound therapy for animal wellness. 
                                This is NOT a substitute for veterinary medical care. Always consult a licensed 
                                veterinarian for medical diagnosis and treatment. Sound therapy should be used 
                                alongside, not instead of, professional veterinary care.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Terms Content */}
                <div className="space-y-8 text-gray-300">
                    
                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">1. Service Description</h2>
                        <p className="leading-relaxed mb-3">
                            PetSounds51 provides sound frequency therapy protocols designed to support animal wellness. 
                            Our service uses specific healing frequencies (Solfeggio and custom frequencies) delivered 
                            through audio playback.
                        </p>
                        <p className="leading-relaxed">
                            AI51 analysis provides behavioral wellness recommendations based on observed patterns, 
                            not medical diagnoses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">2. What We Are NOT</h2>
                        <ul className="space-y-2">
                            <li>• NOT veterinary medical professionals</li>
                            <li>• NOT providing medical diagnosis or treatment</li>
                            <li>• NOT replacing veterinary care</li>
                            <li>• NOT making medical claims or guarantees</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">3. User Responsibilities</h2>
                        <p className="leading-relaxed mb-3">You agree to:</p>
                        <ul className="space-y-2">
                            <li>• Consult a licensed veterinarian for any medical concerns</li>
                            <li>• Use sound therapy as complementary support only</li>
                            <li>• Monitor your animal's response and stop if distress occurs</li>
                            <li>• Provide accurate information when using AI51 analysis</li>
                            <li>• Not hold PetSounds51 liable for medical outcomes</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">4. Refund Policy</h2>
                        <p className="leading-relaxed mb-3">
                            We offer a 30-day money-back guarantee for all tiers:
                        </p>
                        <ul className="space-y-2">
                            <li>• Full refund within 30 days if not satisfied</li>
                            <li>• Email: refunds@uf51.love with proof of purchase</li>
                            <li>• Processed within 5-7 business days</li>
                            <li>• No questions asked</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">5. Subscription Terms</h2>
                        <p className="leading-relaxed mb-3">
                            For monthly subscriptions:
                        </p>
                        <ul className="space-y-2">
                            <li>• Automatically renews each month</li>
                            <li>• Cancel anytime through account settings</li>
                            <li>• Cancellation takes effect at end of billing period</li>
                            <li>• No refunds for partial months</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">6. Data & Privacy</h2>
                        <p className="leading-relaxed">
                            We collect minimal data (email, payment info, usage). See our Privacy Policy for details. 
                            We never sell your data. AI51 analysis is private and not shared.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">7. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            PetSounds51 and its creators are not liable for any medical outcomes, injuries, or 
                            complications arising from use of this service. Sound therapy is used at your own risk 
                            and discretion. Maximum liability is limited to the amount you paid for the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">8. Acceptable Use</h2>
                        <p className="leading-relaxed mb-3">You may NOT:</p>
                        <ul className="space-y-2">
                            <li>• Resell or redistribute our frequency protocols</li>
                            <li>• Claim PetSounds51 replaces veterinary care</li>
                            <li>• Use for illegal purposes</li>
                            <li>• Abuse or spam our support systems</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">9. Changes to Terms</h2>
                        <p className="leading-relaxed">
                            We may update these terms. Continued use after changes constitutes acceptance. 
                            Major changes will be emailed to active subscribers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-cyan-400 mb-4">10. Contact</h2>
                        <p className="leading-relaxed">
                            Questions: support@uf51.love<br/>
                            Refunds: refunds@uf51.love<br/>
                            Legal: legal@uf51.love
                        </p>
                    </section>

                </div>

                {/* Love Footer */}
                <div className="mt-12 pt-8 border-t border-cyan-500/30 text-center">
                    <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                        Built with love for all animals ♾️❤️<br/>
                        Part of Universal Frequency 51
                    </p>
                </div>

            </div>
        </div>
    );
}