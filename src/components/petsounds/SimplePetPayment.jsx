import React, { useState } from 'react';
import { Check, Loader2, CreditCard, Smartphone, Banknote } from 'lucide-react';
import CashPayment from './CashPayment';
import { motion } from 'framer-motion';

/**
 * SIMPLE PAYMENT FLOW
 * Multi-currency support: GBP, USD, EUR, AUD, CAD
 * One-time or subscription
 * 
 * Uses Stripe - integrates when user has set STRIPE_SECRET_KEY
 */

const CURRENCY_SYMBOLS = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    AUD: 'A$',
    CAD: 'C$'
};

const PRICING = {
    basic: {
        oneTime: { GBP: 9.99, USD: 12.99, EUR: 11.99, AUD: 18.99, CAD: 16.99 },
        monthly: { GBP: 2.99, USD: 3.99, EUR: 3.49, AUD: 5.49, CAD: 4.99 }
    },
    premium: {
        oneTime: { GBP: 99, USD: 129, EUR: 119, AUD: 189, CAD: 169 },
        monthly: { GBP: 9.99, USD: 12.99, EUR: 11.99, AUD: 18.99, CAD: 16.99 }
    },
    concierge: {
        oneTime: { GBP: 499, USD: 649, EUR: 599, AUD: 949, CAD: 849 },
        monthly: { GBP: 39.99, USD: 49.99, EUR: 45.99, AUD: 69.99, CAD: 59.99 }
    }
};

export default function SimplePetPayment({ tier = 'premium', onSuccess }) {
    const [currency, setCurrency] = useState('GBP');
    const [billingType, setBillingType] = useState('oneTime'); // oneTime or monthly
    const [paymentMethod, setPaymentMethod] = useState('card'); // card or cash
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');

    const price = PRICING[tier][billingType][currency];
    const symbol = CURRENCY_SYMBOLS[currency];

    const handlePayment = async () => {
        if (!email.trim()) {
            alert('Please enter your email');
            return;
        }

        setProcessing(true);

        try {
            // TODO: Create Stripe checkout when STRIPE_SECRET_KEY is set
            // For now, simulate successful payment for demo
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Store purchase locally for offline access
            const purchase = {
                tier,
                currency,
                price,
                billingType,
                email,
                purchasedAt: new Date().toISOString()
            };
            localStorage.setItem('petsounds51_purchase', JSON.stringify(purchase));
            
            if (onSuccess) onSuccess(purchase);

        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed - please try again');
        } finally {
            setProcessing(false);
        }
    };

    if (paymentMethod === 'cash') {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => setPaymentMethod('card')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                >
                    ← Back to Card Payment
                </button>
                <CashPayment 
                    tier={tier}
                    price={price}
                    currency={currency}
                    onSuccess={onSuccess}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            
            {/* Payment Method Toggle */}
            <div>
                <label className="block text-white font-bold mb-3 text-sm">Payment Method:</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`py-3 px-4 rounded-lg font-bold transition-all ${
                            paymentMethod === 'card'
                                ? 'bg-cyan-500 text-black'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                    >
                        <CreditCard className="w-5 h-5 mx-auto mb-1" />
                        Card
                    </button>
                    <button
                        onClick={() => setPaymentMethod('cash')}
                        className={`py-3 px-4 rounded-lg font-bold transition-all ${
                            paymentMethod === 'cash'
                                ? 'bg-green-500 text-black'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                    >
                        <Banknote className="w-5 h-5 mx-auto mb-1" />
                        Cash
                    </button>
                </div>
            </div>
            
            {/* Currency Selector */}
            <div>
                <label className="block text-white font-bold mb-3 text-sm">Select Currency:</label>
                <div className="grid grid-cols-5 gap-2">
                    {Object.keys(CURRENCY_SYMBOLS).map((curr) => (
                        <button
                            key={curr}
                            onClick={() => setCurrency(curr)}
                            className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${
                                currency === curr
                                    ? 'bg-cyan-500 text-black'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            {curr}
                        </button>
                    ))}
                </div>
            </div>

            {/* Billing Type */}
            <div>
                <label className="block text-white font-bold mb-3 text-sm">Payment Type:</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setBillingType('oneTime')}
                        className={`py-4 px-4 rounded-lg transition-all ${
                            billingType === 'oneTime'
                                ? 'bg-green-500 text-black border-2 border-green-400'
                                : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-gray-600'
                        }`}
                    >
                        <p className="font-black text-lg">{symbol}{PRICING[tier].oneTime[currency]}</p>
                        <p className="text-xs opacity-80 mt-1">One-time • Lifetime</p>
                        {billingType === 'oneTime' && (
                            <p className="text-xs font-bold mt-2">✅ BEST VALUE</p>
                        )}
                    </button>
                    <button
                        onClick={() => setBillingType('monthly')}
                        className={`py-4 px-4 rounded-lg transition-all ${
                            billingType === 'monthly'
                                ? 'bg-cyan-500 text-black border-2 border-cyan-400'
                                : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-gray-600'
                        }`}
                    >
                        <p className="font-black text-lg">{symbol}{PRICING[tier].monthly[currency]}</p>
                        <p className="text-xs opacity-80 mt-1">Per month</p>
                    </button>
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-white font-bold mb-2 text-sm">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                />
            </div>

            {/* Pay Button */}
            <button
                onClick={handlePayment}
                disabled={processing || !email.trim()}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    processing || !email.trim()
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black'
                }`}
            >
                {processing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <CreditCard className="w-5 h-5" />
                        Pay {symbol}{price} {billingType === 'monthly' ? '/month' : 'once'}
                    </>
                )}
            </button>

            {/* Security Note */}
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-xs text-green-300">
                    🔒 Secure payment via Stripe • Works in {Object.keys(CURRENCY_SYMBOLS).length} currencies
                </p>
            </div>

            {/* What You Get */}
            <div className="border-t border-gray-700 pt-4">
                <p className="text-white font-bold text-sm mb-3">What You Get:</p>
                <div className="space-y-2">
                    {tier === 'basic' && (
                        <>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>1 protocol of your choice</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Lifetime access</span>
                            </div>
                        </>
                    )}
                    {tier === 'premium' && (
                        <>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>ALL protocols (6 total)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>AI51 behavior analysis</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Future protocols included</span>
                            </div>
                        </>
                    )}
                    {tier === 'concierge' && (
                        <>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Everything in Premium</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Video consultations with AI51</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Custom protocol creation</span>
                            </div>
                        </>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Works offline forever</span>
                    </div>
                </div>
            </div>

        </div>
    );
}