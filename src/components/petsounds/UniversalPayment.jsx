import React, { useState } from 'react';
import { CreditCard, Banknote, Bitcoin, Smartphone, Building, Send, Globe } from 'lucide-react';
import SimplePetPayment from './SimplePetPayment';
import CashPayment from './CashPayment';

/**
 * UNIVERSAL PAYMENT - EVERYONE CAN PAY
 * Every possible payment method for global accessibility
 */

const PAYMENT_METHODS = [
    {
        id: 'card',
        name: 'Card',
        icon: CreditCard,
        description: 'Visa, Mastercard, Amex',
        available: true,
        fees: 'No extra fees',
        time: 'Instant'
    },
    {
        id: 'cash',
        name: 'Cash',
        icon: Banknote,
        description: 'Post Office, MoneyGram, Hawala',
        available: true,
        fees: 'No extra fees',
        time: '24h verification'
    },
    {
        id: 'crypto',
        name: 'Crypto',
        icon: Bitcoin,
        description: 'Bitcoin, USDC, ETH',
        available: true,
        fees: 'Network fees only',
        time: 'Instant'
    },
    {
        id: 'mobile',
        name: 'Mobile Money',
        icon: Smartphone,
        description: 'M-Pesa, Paytm, GCash',
        available: true,
        fees: 'No extra fees',
        time: 'Instant'
    },
    {
        id: 'bank',
        name: 'Bank Transfer',
        icon: Building,
        description: 'Direct bank transfer / IBAN',
        available: true,
        fees: 'No extra fees',
        time: '1-3 days'
    },
    {
        id: 'paypal',
        name: 'PayPal / Venmo',
        icon: Send,
        description: 'PayPal, Venmo, CashApp',
        available: true,
        fees: 'No extra fees',
        time: 'Instant'
    }
];

export default function UniversalPayment({ tier, onSuccess }) {
    const [selectedMethod, setSelectedMethod] = useState(null);

    if (selectedMethod === 'card' || selectedMethod === 'paypal') {
        return (
            <div>
                <button
                    onClick={() => setSelectedMethod(null)}
                    className="mb-4 text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                >
                    ← Choose Different Method
                </button>
                <SimplePetPayment tier={tier} onSuccess={onSuccess} />
            </div>
        );
    }

    if (selectedMethod === 'cash') {
        return (
            <div>
                <button
                    onClick={() => setSelectedMethod(null)}
                    className="mb-4 text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                >
                    ← Choose Different Method
                </button>
                <SimplePetPayment tier={tier} onSuccess={onSuccess} />
            </div>
        );
    }

    if (selectedMethod === 'crypto') {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => setSelectedMethod(null)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                >
                    ← Choose Different Method
                </button>
                <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-2 border-orange-500 rounded-xl p-8 text-center">
                    <Bitcoin className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-white mb-4">Crypto Payment</h3>
                    <p className="text-gray-300 mb-6">
                        We accept: Bitcoin, USDC, ETH, and other major cryptocurrencies
                    </p>
                    <div className="bg-black/40 rounded-lg p-6 mb-6">
                        <p className="text-sm text-gray-400 mb-2">Send payment to:</p>
                        <p className="text-xs font-mono text-cyan-400 break-all">
                            0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
                        </p>
                        <p className="text-xs text-gray-500 mt-4">Reference: PETSOUNDS51-[YOUR EMAIL]</p>
                    </div>
                    <p className="text-sm text-gray-400">
                        Email proof to: payments@uf51.love with your email for instant access
                    </p>
                </div>
            </div>
        );
    }

    if (selectedMethod === 'mobile') {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => setSelectedMethod(null)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                >
                    ← Choose Different Method
                </button>
                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-xl p-8">
                    <Smartphone className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-white mb-4 text-center">Mobile Money</h3>
                    <div className="space-y-4">
                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">🇰🇪 Kenya - M-Pesa</p>
                            <p className="text-sm text-gray-400">Number: +254 700 000 000</p>
                            <p className="text-xs text-gray-500">Reference: PETSOUNDS51</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">🇮🇳 India - Paytm / UPI</p>
                            <p className="text-sm text-gray-400">UPI: petsounds51@paytm</p>
                            <p className="text-xs text-gray-500">Reference: Your email</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-4">
                            <p className="text-white font-bold mb-2">🇵🇭 Philippines - GCash</p>
                            <p className="text-sm text-gray-400">Number: +63 900 000 0000</p>
                            <p className="text-xs text-gray-500">Reference: PETSOUNDS51</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 text-center mt-6">
                        After payment, email screenshot to: payments@uf51.love
                    </p>
                </div>
            </div>
        );
    }

    if (selectedMethod === 'bank') {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => setSelectedMethod(null)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold text-sm"
                >
                    ← Choose Different Method
                </button>
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500 rounded-xl p-8">
                    <Building className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-white mb-4 text-center">Bank Transfer</h3>
                    <div className="bg-black/40 rounded-lg p-6 space-y-2">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <p className="text-gray-400">Account Name:</p>
                            <p className="text-white font-bold">PetSounds51 Ltd</p>
                            <p className="text-gray-400">Account Number:</p>
                            <p className="text-white font-mono">12345678</p>
                            <p className="text-gray-400">Sort Code:</p>
                            <p className="text-white font-mono">12-34-56</p>
                            <p className="text-gray-400">IBAN:</p>
                            <p className="text-white font-mono text-xs">GB00 BARC 1234 5612 3456 78</p>
                            <p className="text-gray-400">Reference:</p>
                            <p className="text-white font-bold">PETSOUNDS51</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 text-center mt-6">
                        Email your email + reference to: payments@uf51.love for access
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white mb-2">Choose How To Pay</h2>
                <p className="text-gray-400 text-sm">We accept every payment method globally</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map((method) => {
                    const IconComponent = method.icon;
                    return (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            disabled={!method.available}
                            className={`text-left p-6 rounded-xl border-2 transition-all ${
                                method.available
                                    ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-500 hover:bg-gray-900/80'
                                    : 'bg-gray-900/20 border-gray-800 opacity-50 cursor-not-allowed'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <IconComponent className={`w-8 h-8 flex-shrink-0 ${
                                    method.available ? 'text-cyan-400' : 'text-gray-600'
                                }`} />
                                <div className="flex-1">
                                    <h3 className="text-white font-black text-lg mb-1">{method.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{method.description}</p>
                                    <div className="flex gap-3 text-xs">
                                        <span className="text-green-400">{method.fees}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-cyan-400">{method.time}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center">
                <p className="text-sm text-green-300">
                    ✅ <span className="font-bold">EVERYONE CAN PAY</span> - No one left behind
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Card • Cash • Crypto • Mobile Money • Bank Transfer • PayPal
                </p>
            </div>
        </div>
    );
}