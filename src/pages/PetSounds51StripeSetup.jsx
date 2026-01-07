import React from 'react';
import { DollarSign, Check, ArrowRight, AlertTriangle } from 'lucide-react';

/**
 * STRIPE CONNECT SETUP GUIDE
 * How to receive payments and get money into YOUR bank account
 */

export default function PetSounds51StripeSetup() {
    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-black mb-3">How To Receive Payments</h1>
                    <p className="text-gray-400">Get customer payments into YOUR bank account</p>
                </div>

                {/* The Right Way - Stripe Connect */}
                <div className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-2 border-green-500 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-black text-green-400 mb-6 flex items-center gap-2">
                        <Check className="w-6 h-6" />
                        The Right Way: Stripe Connect
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">What Is Stripe Connect?</h3>
                            <p className="text-gray-300 text-sm">
                                Stripe Connect lets you receive payments from customers and automatically transfers money to YOUR bank account. 
                                It's how Uber, Airbnb, and all major platforms handle payments.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">How It Works:</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center flex-shrink-0">1</div>
                                    <div className="flex-1">
                                        <p className="text-white font-bold">Customer pays £49.99</p>
                                        <p className="text-sm text-gray-400">For Premium tier</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600 ml-3" />
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center flex-shrink-0">2</div>
                                    <div className="flex-1">
                                        <p className="text-white font-bold">Stripe takes 2.9% + 20p fee</p>
                                        <p className="text-sm text-gray-400">= £1.65 fee</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600 ml-3" />
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-black font-black flex items-center justify-center flex-shrink-0">3</div>
                                    <div className="flex-1">
                                        <p className="text-white font-bold">YOU get £48.34 in YOUR bank</p>
                                        <p className="text-sm text-gray-400">Automatically, daily/weekly payouts</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-sm text-gray-300">
                                <span className="font-bold text-green-400">Monthly Example:</span><br/>
                                100 customers × £49.99 = £4,999 revenue<br/>
                                Stripe fees (2.9% + 20p) = £165<br/>
                                <span className="font-black text-white">YOU RECEIVE: £4,834</span> → into your bank account
                            </p>
                        </div>
                    </div>
                </div>

                {/* Setup Steps */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-black text-cyan-400 mb-6">Setup Steps (Takes 10 Minutes)</h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-cyan-500 pl-4">
                            <h3 className="font-bold text-white mb-2">Step 1: Create Stripe Account</h3>
                            <p className="text-sm text-gray-400 mb-2">Go to stripe.com and sign up (free)</p>
                            <p className="text-xs text-gray-500">Need: Email, phone number, bank details</p>
                        </div>

                        <div className="border-l-4 border-cyan-500 pl-4">
                            <h3 className="font-bold text-white mb-2">Step 2: Enable Stripe Connect</h3>
                            <p className="text-sm text-gray-400 mb-2">In Stripe dashboard → Settings → Connect</p>
                            <p className="text-xs text-gray-500">Follow the setup wizard</p>
                        </div>

                        <div className="border-l-4 border-cyan-500 pl-4">
                            <h3 className="font-bold text-white mb-2">Step 3: Get Your API Keys</h3>
                            <p className="text-sm text-gray-400 mb-2">Stripe dashboard → Developers → API keys</p>
                            <p className="text-xs text-gray-500">You'll need: Publishable key + Secret key</p>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-bold text-white mb-2">Step 4: Add Keys To Base44</h3>
                            <p className="text-sm text-gray-400 mb-2">Base44 dashboard → Settings → Secrets</p>
                            <p className="text-xs text-gray-500">Add STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY</p>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-bold text-white mb-2">Step 5: Set Payout Schedule</h3>
                            <p className="text-sm text-gray-400 mb-2">Stripe → Balance → Payout schedule</p>
                            <p className="text-xs text-gray-500">Choose: Daily or Weekly automatic transfers</p>
                        </div>
                    </div>
                </div>

                {/* What You Can Pay */}
                <div className="bg-gray-900/60 border border-green-500/30 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-black text-green-400 mb-6">YES - You Can Pay Yourself!</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-green-900/20 rounded-lg p-4">
                            <p className="font-bold text-white mb-2">✅ Personal Bills</p>
                            <p className="text-sm text-gray-400">Rent, food, life - this is YOUR business income</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-4">
                            <p className="font-bold text-white mb-2">✅ Business Expenses</p>
                            <p className="text-sm text-gray-400">Domain, hosting, tools, marketing</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-4">
                            <p className="font-bold text-white mb-2">✅ Team Salaries</p>
                            <p className="text-sm text-gray-400">If you hire help later</p>
                        </div>

                        <div className="bg-green-900/20 rounded-lg p-4">
                            <p className="font-bold text-white mb-2">✅ Growth Investment</p>
                            <p className="text-sm text-gray-400">Ads, partnerships, scaling</p>
                        </div>
                    </div>
                </div>

                {/* Real Numbers */}
                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-black text-purple-400 mb-6">Real Revenue Examples</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-lg font-bold text-white mb-2">10 customers/month</p>
                            <p className="text-sm text-gray-400">10 × £49.99 = £499.90</p>
                            <p className="text-xs text-gray-500">After fees: ~£485/month → covers hosting + food</p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-lg font-bold text-white mb-2">100 customers/month</p>
                            <p className="text-sm text-gray-400">100 × £49.99 = £4,999</p>
                            <p className="text-xs text-gray-500">After fees: ~£4,850/month → full-time living wage</p>
                        </div>

                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-lg font-bold text-white mb-2">1 zoo/month (enterprise)</p>
                            <p className="text-sm text-gray-400">1 × £4,999 = £4,999</p>
                            <p className="text-xs text-gray-500">After fees: ~£4,850 → ONE customer = full income</p>
                        </div>
                    </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                        <div className="space-y-2 text-sm text-yellow-300">
                            <p className="font-bold">Important:</p>
                            <p>• Set aside 20% for tax (UK self-employed)</p>
                            <p>• Keep records of all income</p>
                            <p>• Register as self-employed when earning £1k+/year</p>
                            <p>• Stripe sends you tax documents automatically</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}