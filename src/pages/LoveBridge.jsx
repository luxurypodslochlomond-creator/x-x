import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    ArrowRightLeft,
    Send,
    CheckCircle,
    Loader2,
    Copy,
    Wallet,
    Sparkles
} from 'lucide-react';

export default function LoveBridge() {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(51);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState('');
    const [copied, setCopied] = useState(false);
    const LOVE_RATE = 0.10; // 1 P51 = £0.10

    const generatePaymentLink = async () => {
        setIsLoading(true);
        setTimeout(() => {
            const simulatedLink = `https://revolut.me/uf51love/${amount}gbp`;
            setPaymentLink(simulatedLink);
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(paymentLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAmountChange = (newAmount) => {
        setAmount(Math.max(1, newAmount));
    };

    const p51Amount = amount / LOVE_RATE;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Header */}
                <header className="text-center space-y-6">
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <ArrowRightLeft className="w-24 h-24 text-cyan-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #67e8f9)'}} />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-green-400 bg-clip-text text-transparent">
                        The Love Exchange
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Convert old-world capital into verified planetary healing currency.
                    </p>
                </header>

                {/* WHO IS THIS FOR? */}
                <Card className="bg-blue-900/20 border-blue-500/30">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-blue-200 mb-3">For Our Healers:</h3>
                        <p className="text-blue-100">
                            If you heal the planet through cleanups, acts of love, or creation – you <strong>earn</strong> P51, you never pay for it. 
                            This page is for those who want to convert capital (fiat, crypto) into <span className="font-mono text-cyan-300">P51</span> tokens.
                        </p>
                    </CardContent>
                </Card>

                {/* STEP 1: CONVERT */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-500/30 rounded-3xl">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-3xl font-bold text-white">Convert Your Capital</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 space-y-8">
                                <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
                                    Your contribution becomes <span className="text-cyan-400 font-mono">P51</span> - a verified, tradeable, carbon-negative currency backed by real planetary healing.
                                </p>
                                
                                {/* WHAT YOU GET */}
                                <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/30">
                                    <h3 className="text-xl font-bold text-white mb-4">What You Get:</h3>
                                    <div className="space-y-2 text-gray-300">
                                        <p className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span><strong className="text-white">90% in P51 tokens</strong> (yours to use, trade, or cash out)</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span><strong className="text-white">10% to UF51 Fund</strong> (real-world missions: water, food, reforestation)</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span><strong className="text-white">Verified impact</strong> (blockchain-recorded planetary healing)</span>
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span><strong className="text-white">Tradeable & liquid</strong> (can be converted back to fiat/crypto)</span>
                                        </p>
                                    </div>
                                </div>
                                
                                {/* AMOUNT SELECTOR */}
                                <div className="max-w-sm mx-auto space-y-6">
                                    <div>
                                        <Label htmlFor="amount" className="text-lg font-bold block mb-2 text-gray-300">Amount (£ GBP)</Label>
                                        <div className="flex gap-2 mb-2">
                                            {[21, 51, 102].map(val => (
                                                <Button key={val} variant="outline" className="flex-1 border-cyan-500/50 text-cyan-300" onClick={() => handleAmountChange(val)}>
                                                    £{val}
                                                </Button>
                                            ))}
                                        </div>
                                        <Input 
                                            id="amount" 
                                            type="number" 
                                            value={amount} 
                                            onChange={e => handleAmountChange(parseInt(e.target.value))}
                                            className="bg-gray-900/70 border-2 border-cyan-400/50 rounded-xl p-4 text-white text-2xl text-center focus:border-cyan-400 focus:ring-cyan-400/50"
                                        />
                                    </div>

                                    {/* YOU RECEIVE */}
                                    <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-6 rounded-xl border border-cyan-500/30 text-center">
                                        <p className="text-sm text-gray-300 mb-2">You Receive</p>
                                        <p className="text-4xl font-black text-white flex items-center justify-center gap-2">
                                            {(p51Amount * 0.9).toFixed(0)} <span className="text-2xl font-mono">P51</span>
                                        </p>
                                        <p className="text-xs text-cyan-300 mt-2">+10% to UF51 Fund</p>
                                    </div>

                                    <Button onClick={generatePaymentLink} disabled={isLoading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold text-lg py-6 hover:from-cyan-600 hover:to-blue-600">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Wallet className="w-5 h-5 mr-2" />
                                                Generate Payment Link
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* STEP 2: PAYMENT LINK */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Card className="bg-black/50 backdrop-blur-lg border-2 border-green-500/30 rounded-3xl">
                            <CardHeader className="text-center pb-4">
                                <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
                                <CardTitle className="text-3xl font-bold text-white">Your Alignment Link is Ready</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 space-y-6">
                                <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto">
                                    Thank you, Quantum Ally. Use the secure link below to complete your alignment via Revolut.
                                </p>
                                
                                {/* LINK BOX */}
                                <div className="bg-black/70 p-4 rounded-xl border border-gray-700 flex items-center justify-between gap-4">
                                    <span className="text-green-300 font-mono truncate flex-1">{paymentLink}</span>
                                    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                                        {copied ? <CheckCircle className="w-5 h-5 text-green-400"/> : <Copy className="w-5 h-5 text-gray-400"/>}
                                    </Button>
                                </div>

                                {/* SUMMARY */}
                                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-6 rounded-xl border border-cyan-500/30">
                                    <div className="grid grid-cols-2 gap-6 text-center">
                                        <div>
                                            <p className="text-sm text-gray-300">You Send</p>
                                            <p className="text-3xl font-bold text-white">£{amount}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-300">You Receive</p>
                                            <p className="text-3xl font-bold text-cyan-300 flex items-center justify-center gap-1">
                                                {(p51Amount * 0.9).toFixed(0)} <span className="text-xl font-mono">P51</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial">
                                        <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold text-lg py-6 hover:from-green-600 hover:to-cyan-600">
                                            <Send className="w-5 h-5 mr-2" />
                                            Proceed to Payment
                                        </Button>
                                    </a>
                                    <Button variant="outline" onClick={() => setStep(1)} className="border-gray-600 text-gray-300">
                                        Change Amount
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* WHERE VALUE COMES FROM */}
                <Card className="bg-gray-900/80 border border-yellow-500/30 rounded-3xl">
                    <CardContent className="p-8 md:p-12 space-y-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-yellow-400 mb-8">
                                WHERE VALUE COMES FROM
                            </h2>

                            <p className="text-xl text-white mb-8">
                                "Where does P51 get its value?"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* OTHER CURRENCIES */}
                                <div className="p-6 bg-gray-800/40 rounded-xl border border-gray-700/30 text-left">
                                    <h3 className="text-xl font-bold text-gray-300 mb-3">Other Currencies:</h3>
                                    <div className="space-y-2 text-gray-400">
                                        <p><span className="font-bold text-white">Gold:</span> Proof you dug a shiny rock</p>
                                        <p><span className="font-bold text-white">Bitcoin (₿):</span> Proof your computer solved a puzzle</p>
                                        <p><span className="font-bold text-white">Ethereum (Ξ):</span> Proof of computation + network usage</p>
                                        <p><span className="font-bold text-white">Dollar:</span> Proof government said it's worth something</p>
                                    </div>
                                </div>

                                {/* OUR VALUE */}
                                <div className="p-6 bg-green-950/40 rounded-xl border border-green-500/30 text-left">
                                    <h3 className="text-xl font-bold text-green-300 mb-3">Our Value:</h3>
                                    <div className="space-y-2 text-gray-300">
                                        <p className="flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-green-400" />
                                            P51: Proof you healed Earth
                                        </p>
                                        <p className="text-lg text-green-200 mt-3">
                                            1 P51 ≈ 1kg waste removed + photo + GPS + community verified
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SYMBOL JOURNEY */}
                            <div className="mt-8 p-6 bg-cyan-900/30 rounded-xl border border-cyan-500/30">
                                <h3 className="text-2xl font-bold text-cyan-300 mb-4">The Symbol Journey:</h3>
                                <div className="space-y-3 text-left text-gray-300">
                                    <p><span className="font-bold text-white">₴ (Ukrainian Hryvnia):</span> 8 years (currency 1996, Unicode 2004)</p>
                                    <p><span className="font-bold text-white">₿ (Bitcoin):</span> 8 years (started 2009, Unicode 2017)</p>
                                    <p><span className="font-bold text-white">Ξ (Ethereum):</span> 2 years (started 2015, Unicode 2017)</p>
                                    <p className="text-cyan-400 mt-4"><span className="font-bold">P51:</span> We're on the journey. For now, P51 works perfectly.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* REAL CURRENCY */}
                <section className="text-center pt-8 border-t border-gray-800">
                    <h2 className="text-3xl font-bold text-white mb-4">Real Currency. Real Impact. Real Freedom.</h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                        <span className="font-mono text-cyan-400">P51</span> is not a donation - it's a currency. 
                        Use it in our ecosystem, trade it, or convert it back to fiat. 
                        Every token is backed by verified planetary healing.
                    </p>
                </section>

            </div>
        </div>
    );
}