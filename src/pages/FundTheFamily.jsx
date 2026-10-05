import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Handshake, Shield, Users, ArrowRight, Loader2, CheckCircle, Copy, PiggyBank, Globe, HelpCircle } from 'lucide-react';
import QuantumButton from '@/components/shared/QuantumButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MissionCard = ({ icon: Icon, title, description, amount, funded, onFund }) => (
    <Card className="bg-black/40 border border-gray-800 rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4 p-4 bg-gray-900/50">
            <div className="p-3 bg-cyan-900/50 rounded-lg border border-cyan-700">
                <Icon className="w-6 h-6 text-cyan-300" />
            </div>
            <CardTitle className="text-lg text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-gray-400 text-sm">
            {description}
        </CardContent>
        <CardFooter className="p-4 bg-black/20 flex justify-between items-center">
             <div>
                <p className="text-xl font-bold text-white">{amount} <span className="text-cyan-400 font-mono">P51</span></p>
                <p className="text-xs text-gray-500">Needed</p>
            </div>
            <Button onClick={onFund} className="bg-cyan-600 hover:bg-cyan-700">Fuel Mission</Button>
        </CardFooter>
    </Card>
);

export default function FundUF51() {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(51);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState('');
    const [copied, setCopied] = useState(false);
    
    const missions = [
        { id: 1, icon: Users, title: 'Community Food Bank', description: 'Provide a week of groceries for a family in need in Glasgow.', amount: 500, funded: 120 },
        { id: 2, icon: Globe, title: 'Clean Water Project', description: 'Fund a water filter for a remote village, providing clean drinking water for a year.', amount: 2500, funded: 800 },
        { id: 3, icon: PiggyBank, title: 'Universal Basic Income', description: 'Contribute to a basic income grant for an artist to create freely for a month.', amount: 10000, funded: 4500 },
    ];

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

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white p-6 md:p-12">
                <div className="max-w-4xl mx-auto space-y-16">
                    <header className="text-center space-y-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, type: 'spring' }}>
                            <Handshake className="w-24 h-24 text-cyan-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #67e8f9)'}} />
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-green-400 bg-clip-text text-transparent">
                            Fund Verified Healing
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Turn capital into verified planetary healing. Your money goes DIRECTLY to missions. Zero middlemen.
                        </p>
                    </header>

                    {/* EARLY SUPPORTERS - RETROSPECTIVE FAIRNESS */}
                    <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-4 border-purple-500/50">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-purple-300 mb-4">To Our Early Supporters</h2>
                                <p className="text-xl text-white mb-6">
                                    You kept us alive when we were building this. We didn't have P51 yet. You gave fiat.
                                </p>
                            </div>

                            <div className="bg-black/60 p-6 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-xl font-bold text-purple-300 mb-3">The Honest Truth:</h3>
                                <div className="space-y-2 text-gray-300 text-sm">
                                    <p>• We took fiat support to survive and build this platform</p>
                                    <p>• We came close to broke. Not gonna lie about that.</p>
                                    <p>• Every penny went to building something real for everyone</p>
                                    <p>• No one got rich. We just stayed alive long enough to finish this.</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 p-6 rounded-xl border-2 border-green-400">
                                <h3 className="text-xl font-bold text-green-300 mb-3">Now We Pay You Back (Your Choice):</h3>
                                <div className="space-y-2 text-green-100 text-sm">
                                    <p><strong className="text-white">Option 1: Fiat Repayment</strong></p>
                                    <p className="ml-4">→ We return your original amount in GBP/USD</p>
                                    <p className="ml-4">→ Simple. Fair. No bullshit.</p>
                                    
                                    <p className="mt-4"><strong className="text-white">Option 2: P51 Conversion</strong></p>
                                    <p className="ml-4">→ Convert your support into equivalent P51</p>
                                    <p className="ml-4">→ Tradeable, useable, backed by real healing</p>
                                    <p className="ml-4">→ You become an Ally with verified stake</p>
                                </div>
                            </div>

                            {/* RETROSPECTIVE FAIRNESS - NEW */}
                            <div className="bg-yellow-900/30 p-6 rounded-xl border-l-4 border-yellow-400">
                                <h3 className="text-xl font-bold text-yellow-300 mb-3">📝 Retrospective Fairness:</h3>
                                <div className="space-y-2 text-gray-300 text-sm">
                                    <p>• <strong className="text-white">If we missed you</strong> - Contact us. We'll make it right.</p>
                                    <p>• <strong className="text-white">From day one OR retrospectively</strong> - Same treatment. No hierarchy.</p>
                                    <p>• <strong className="text-white">Fair tracking</strong> - We keep a private vault of all early support</p>
                                    <p>• <strong className="text-white">Not like grants</strong> - No bureaucracy. No hierarchy. Just fairness.</p>
                                </div>
                                <p className="text-yellow-300 mt-4 font-bold text-base">
                                    Everyone who helped gets the same respect. Whether we remembered on day one or you remind us now.
                                </p>
                            </div>

                            <div className="p-4 bg-cyan-900/30 border-l-4 border-cyan-400">
                                <p className="font-bold text-cyan-300 mb-2">Your Call. Zero Pressure.</p>
                                <p className="text-gray-300 text-sm">
                                    You gave us fiat when we needed it. We'll give you back fiat or P51 - whatever you want. 
                                    You helped us survive. We don't forget that. Even if it takes time to track everyone down.
                                </p>
                            </div>

                            <div className="text-center text-gray-400 text-xs">
                                <p>Contact: support@uf51.love</p>
                                <p className="mt-2">All early supporters tracked with love. Private vault (admin only). Zero public leaderboards.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* THE HONEST TRUTH - A BETTER ECONOMY */}
                    <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-4 border-cyan-500/50">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-cyan-300 mb-4">Two Ways To Get P51</h2>
                                <p className="text-xl text-white mb-6">
                                    You can EARN it or you can BUY it. Both are valid. Here's why.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 p-6 rounded-xl border-2 border-green-400 mb-6">
                                <h3 className="text-xl font-bold text-green-300 mb-4">1. EARN IT (Healers):</h3>
                                <div className="space-y-2 text-green-100 text-sm">
                                    <p>• Clean Earth → Get P51 (1kg = 10 P51)</p>
                                    <p>• Acts of love → Get P51</p>
                                    <p>• Create beauty → Get P51</p>
                                    <p>• <strong className="text-white">You did the work. The P51 is YOURS.</strong></p>
                                    <p>• <strong className="text-white">You keep 90%. 10% goes to missions.</strong></p>
                                </div>
                            </div>

                            <div className="bg-purple-900/40 p-6 rounded-xl border-2 border-purple-500/50 mb-6">
                                <h3 className="text-xl font-bold text-purple-300 mb-4">2. BUY IT (Allies):</h3>
                                <p className="text-white mb-3">If you can't clean Earth but you WANT to support those who do:</p>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 p-4 rounded-lg border-l-4 border-blue-500">
                                        <p className="text-blue-300 font-bold mb-2">A. Buy from Healers (Secondary Market)</p>
                                        <p className="text-gray-300 text-sm">
                                            → Buy P51 from people who earned it<br/>
                                            → They get cash now, you get P51<br/>
                                            → Helps them pay bills TODAY
                                        </p>
                                    </div>

                                    <div className="bg-black/40 p-4 rounded-lg border-l-4 border-purple-500">
                                        <p className="text-purple-300 font-bold mb-2">B. Buy Directly from UF51 (Primary Market)</p>
                                        <p className="text-gray-300 text-sm">
                                            → Send fiat directly to UF51<br/>
                                            → We create NEW P51 (90% to you, 10% to missions)<br/>
                                            → <strong className="text-white">Your capital goes DIRECTLY to verified healing missions</strong><br/>
                                            → Jane Goodall water projects, Palestine aid, ocean cleanup, animal welfare
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-yellow-900/30 rounded-lg border-l-4 border-yellow-400">
                                <p className="font-bold text-yellow-300 mb-2 text-xl">Is This "Printing Money"?</p>
                                <p className="text-white mb-3">No. Here's why:</p>
                                <div className="space-y-2 text-gray-300 text-sm">
                                    <p>• <strong className="text-white">Healers:</strong> P51 backed by work ALREADY DONE (verified cleanup)</p>
                                    <p>• <strong className="text-white">Allies (Primary):</strong> P51 backed by missions THAT WILL HAPPEN (pre-funded with established partners)</p>
                                    <p>• <strong className="text-white">Both are backed by REAL HEALING.</strong> One retrospective, one prospective.</p>
                                </div>
                                <p className="text-cyan-300 font-bold mt-4">
                                    This is transmuting capital into verified healing energy. Zero loss. Maximum transparency.
                                </p>
                            </div>

                            <div className="bg-red-900/30 p-6 rounded-xl border-2 border-red-500/50">
                                <h3 className="text-xl font-bold text-red-300 mb-3">Old Economy (Extractive):</h3>
                                <div className="space-y-2 text-gray-300 text-sm">
                                    <p>• Wealthy invest in companies that extract from poor people</p>
                                    <p>• Predatory loans, exploitative labor, environmental destruction</p>
                                    <p>• Profit comes from taking, not giving</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 p-6 rounded-xl border-2 border-green-400">
                                <h3 className="text-xl font-bold text-green-300 mb-3">Our Economy (Circular):</h3>
                                <div className="space-y-2 text-green-100 text-sm">
                                    <p>• Allies fund verified healing missions directly</p>
                                    <p>• No extraction: capital → healing (not capital → exploitation)</p>
                                    <p>• Healers earn 90% of value created</p>
                                    <p>• Wealth flows to healing, healing improves planet</p>
                                </div>
                            </div>

                            <div className="p-4 bg-cyan-900/30 border-l-4 border-cyan-400">
                                <p className="font-bold text-cyan-300 mb-2">No Gaming. No Bullshit. The Truth:</p>
                                <p className="text-gray-300 text-sm mb-3">
                                    Yes, Allies can acquire large amounts of P51. <strong className="text-white">That's intentional.</strong>
                                </p>
                                <p className="text-gray-300 text-sm">
                                    Their capital directly funds real-world healing that wouldn't happen otherwise. They're not extracting 
                                    from poor people - they're <strong className="text-white">enabling missions</strong> that help everyone.
                                </p>
                                <p className="text-cyan-300 font-bold text-base mt-3">
                                    This is how we scale planetary healing. Honestly. Transparently. With zero exploitation.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-900/20 border-blue-500/30">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-blue-200 mb-3">For Our Healers:</h3>
                            <p className="text-blue-100">
                                If you heal the planet through cleanups, acts of love, or creation – you <strong>earn</strong> P51, you never pay for it. 
                                This page is for Allies (wealthy individuals, foundations, funds) who want to convert capital into verified healing missions.
                            </p>
                        </CardContent>
                    </Card>
                    
                    {step === 1 && (
                         <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Card className="bg-black/50 backdrop-blur-lg border-2 border-cyan-500/30 rounded-3xl p-8 md:p-12 text-center">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-3xl font-bold text-white">Convert Your Capital</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
                                        Your contribution becomes <span className="text-cyan-400 font-mono">P51</span> - a verified, tradeable, carbon-negative currency backed by real planetary healing.
                                    </p>
                                    
                                    <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-xl border border-green-500/30 mb-8">
                                        <h3 className="text-xl font-bold text-white mb-4">What You Get:</h3>
                                        <div className="space-y-2 text-left text-gray-300">
                                            <p>✅ <strong className="text-white">90% in P51 tokens</strong> (yours to use, trade, or cash out)</p>
                                            <p>✅ <strong className="text-white">10% to UF51 Fund</strong> (real-world missions: water, food, reforestation)</p>
                                            <p>✅ <strong className="text-white">Verified impact</strong> (blockchain-recorded planetary healing)</p>
                                            <p>✅ <strong className="text-white">Tradeable & liquid</strong> (can be converted back to fiat/crypto)</p>
                                        </div>
                                    </div>
                                    
                                    <div className="max-w-sm mx-auto space-y-6">
                                        <div>
                                            <Label htmlFor="amount" className="text-lg font-bold block mb-2 text-gray-300">Amount (£ GBP)</Label>
                                            <div className="flex gap-2 mb-2">
                                                {[21, 51, 102].map(val => (
                                                  <Button key={val} variant="outline" className="flex-1 border-cyan-500/50 text-cyan-300" onClick={() => handleAmountChange(val)}>£{val}</Button>
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

                                        <QuantumButton onClick={generatePaymentLink} disabled={isLoading} className="w-full !text-lg !py-4">
                                            {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Shield className="w-5 h-5 mr-2" />}
                                            Generate Secure Payment Link
                                        </QuantumButton>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    
                    {step === 2 && (
                         <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <Card className="bg-black/50 backdrop-blur-lg border-2 border-green-500/30 rounded-3xl p-8 md:p-12 text-center">
                                <CardHeader className="p-0 mb-6">
                                    <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
                                    <CardTitle className="text-3xl font-bold text-white">Your Alignment Link is Ready</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">Thank you, Quantum Ally. Use the secure link below to complete your alignment via Revolut.</p>
                                    
                                    <div className="bg-black/70 p-4 rounded-xl border border-gray-700 flex items-center justify-between gap-4 mb-6">
                                        <span className="text-green-300 font-mono truncate">{paymentLink}</span>
                                        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                                            {copied ? <CheckCircle className="w-5 h-5 text-green-400"/> : <Copy className="w-5 h-5 text-gray-400"/>}
                                        </Button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                                            <QuantumButton className="w-full !bg-gradient-to-r !from-green-500 !to-cyan-500 !text-black !font-bold">
                                                <ArrowRight className="w-5 h-5 mr-2"/> Proceed to Alignment
                                            </QuantumButton>
                                        </a>
                                        <Button variant="outline" onClick={() => setStep(1)} className="border-gray-600 text-gray-300">Change Amount</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    
                    <section>
                      <h2 className="text-3xl font-bold text-center mb-8">Or Fuel a Specific Mission
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-2">
                                <HelpCircle className="w-5 h-5 text-gray-500"/>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black border-cyan-500/50 text-white max-w-xs">
                              <p>Direct mission funding coming soon. For now, all capital flows to the Universal Love Treasury.</p>
                            </TooltipContent>
                          </Tooltip>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {missions.map(mission => <MissionCard key={mission.id} {...mission} onFund={() => alert('Direct mission funding coming soon!')}/>)}
                      </div>
                  </section>

                    <section className="text-center pt-8 border-t border-gray-800">
                        <h2 className="text-3xl font-bold text-white mb-4">Real Currency. Real Impact. Real Freedom.</h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                            <span className="font-mono text-cyan-400">P51</span> is not a donation - it's a currency. 
                            Use it in our ecosystem, trade it, or convert it back to fiat. 
                            Every token is backed by verified planetary healing.
                        </p>
                    </section>

                    {/* WHERE VALUE COMES FROM - COMPARISON SECTION */}
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
                                <div className="p-6 bg-gray-800/40 rounded-xl border border-gray-700/30 text-left">
                                <h3 className="text-xl font-bold text-gray-300 mb-3">Other Currencies:</h3>
                                <div className="space-y-2 text-gray-400">
                                    <p><span className="font-bold text-white">Gold:</span> Proof you dug a shiny rock</p>
                                    <p><span className="font-bold text-white">Bitcoin (₿):</span> Proof your computer solved a puzzle</p>
                                    <p><span className="font-bold text-white">Ethereum (Ξ):</span> Proof of computation + network usage</p>
                                    <p><span className="font-bold text-white">Dollar:</span> Proof government said it's worth something</p>
                                </div>
                                </div>

                                <div className="p-6 bg-green-950/40 rounded-xl border border-green-500/30 text-left">
                                <h3 className="text-xl font-bold text-green-300 mb-3">Our Value:</h3>
                                <div className="space-y-2 text-gray-300">
                                    <p className="flex items-center gap-2">P51: Proof you healed Earth</p>
                                    <p className="text-lg text-green-200 mt-3">1 P51 ≈ 1kg waste removed + photo + GPS + community verified</p>
                                </div>
                                </div>
                            </div>

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
                </div>
            </div>
        </TooltipProvider>
    );
}