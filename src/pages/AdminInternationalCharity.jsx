import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Globe, AlertTriangle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminInternationalCharity() {
    const options = [
        {
            name: "UK CIC (Community Interest Company)",
            speed: "10-14 days",
            cost: "£65-£86",
            recognition: "UK + Some International",
            advantages: [
                "✅ Asset lock proves mission (funders LOVE this)",
                "✅ UK government regulated = legitimate",
                "✅ Patagonia, European funders recognize it",
                "✅ Can pay founders reasonable salaries",
                "✅ Tax advantages for UK donors"
            ],
            disadvantages: [
                "❌ Not recognized as 'charity' in USA (different tax treatment)",
                "❌ Not 501(c)(3) equivalent (US donors don't get full deduction)",
                "❌ UK-specific (not global standard)",
                "❌ Annual reporting to CIC regulator required"
            ],
            verdict: "BEST FOR UK/EUROPE FUNDERS",
            color: "green",
            recommended: true
        },

        {
            name: "B Corporation Certification",
            speed: "3-6 months",
            cost: "£1,000-£25,000/year (based on revenue)",
            recognition: "Global (130+ countries)",
            advantages: [
                "✅ GLOBAL recognition (Patagonia, Ben & Jerry's use this)",
                "✅ Marketing credibility (B Corp = trusted brand)",
                "✅ International funders know it well",
                "✅ Rigorous verification (85+ point assessment)",
                "✅ Can be ADDED to CIC (CIC + B Corp = ultimate)"
            ],
            disadvantages: [
                "❌ NOT a legal structure (it's a CERTIFICATION)",
                "❌ Expensive (annual fees scale with revenue)",
                "❌ 3-6 month assessment process",
                "❌ Doesn't give you charity tax status",
                "❌ Still need CIC/LLC/Corp underneath"
            ],
            verdict: "ADD THIS AFTER CIC (not instead of)",
            color: "purple",
            recommended: false
        },

        {
            name: "US 501(c)(3) Nonprofit",
            speed: "3-6 months (IRS approval)",
            cost: "$275-$600 filing + legal costs",
            recognition: "USA + International",
            advantages: [
                "✅ US donors get full tax deduction",
                "✅ Access to US foundations (Gates, etc.)",
                "✅ Globally recognized charity status",
                "✅ Tax-exempt in USA"
            ],
            disadvantages: [
                "❌ Must have US presence/address",
                "❌ 3-6 month IRS approval process",
                "❌ CANNOT pay founders AT ALL (volunteer only)",
                "❌ Complex annual reporting (Form 990)",
                "❌ Restrictions on political activity",
                "❌ You're in Scotland - adds complexity"
            ],
            verdict: "NOT WORTH IT (you need to get paid)",
            color: "red",
            recommended: false
        },

        {
            name: "Charitable Incorporated Organisation (CIO)",
            speed: "4-8 weeks",
            cost: "£0 (free registration)",
            recognition: "UK Only",
            advantages: [
                "✅ Full charity status in UK",
                "✅ UK donors get full tax relief",
                "✅ Simpler structure than company + charity",
                "✅ No Companies House reporting"
            ],
            disadvantages: [
                "❌ CANNOT trade/sell services easily",
                "❌ All income must be 'charitable' (can't charge for app)",
                "❌ Founders = volunteers only (zero salary until BIG)",
                "❌ Not recognized internationally as well as CIC",
                "❌ Harder to convert to social enterprise later"
            ],
            verdict: "TOO RESTRICTIVE (you need trading power)",
            color: "orange",
            recommended: false
        },

        {
            name: "Just Register as UK Limited Company (Ltd)",
            speed: "24 hours",
            cost: "£12",
            recognition: "Global (standard business)",
            advantages: [
                "✅ INSTANT (24 hour approval)",
                "✅ Can do ANYTHING legally",
                "✅ Founders can be paid normally",
                "✅ Cheapest option",
                "✅ Globally recognized business structure"
            ],
            disadvantages: [
                "❌ NO CHARITY STATUS (funders won't touch you)",
                "❌ No asset lock (looks like profit-driven)",
                "❌ No grant eligibility",
                "❌ Looks like typical startup (not mission-driven)",
                "❌ Can't prove you're locked to mission"
            ],
            verdict: "WORST FOR GRANTS (but fastest to start trading)",
            color: "gray",
            recommended: false
        },

        {
            name: "CIC NOW + B Corp LATER",
            speed: "CIC: 10-14 days, B Corp: +6 months",
            cost: "CIC: £65, B Corp: £1k-£5k/year",
            recognition: "Ultimate Global Recognition",
            advantages: [
                "✅ CIC = asset lock proves mission",
                "✅ B Corp = global marketing credibility",
                "✅ Both = UK + international funders happy",
                "✅ Can pay founders (CIC allows it)",
                "✅ Best of both worlds"
            ],
            disadvantages: [
                "❌ B Corp costs money (wait until revenue)",
                "❌ Two sets of reporting/compliance",
                "❌ B Corp assessment takes time"
            ],
            verdict: "🔥 OPTIMAL STRATEGY 🔥",
            color: "cyan",
            recommended: true,
            strategy: "Get CIC NOW (10 days). Apply for B Corp when you hit £50k revenue (6-12 months). Then you're UNSTOPPABLE."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Globe className="w-20 h-20 mx-auto text-cyan-400" style={{ filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.8))' }} />
                    <h1 className="text-5xl md:text-7xl font-black">INTERNATIONAL CHARITY STATUS</h1>
                    <p className="text-2xl text-gray-300">What's the easiest path?</p>
                </motion.div>

                {/* THE TRUTH */}
                <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-4 border-yellow-500">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                            <Zap className="w-10 h-10 text-yellow-400" />
                            THE BRUTAL TRUTH
                        </h2>
                        <div className="space-y-4 text-gray-300 text-lg">
                            <p>
                                <strong className="text-white">There is NO "global charity status."</strong> Every country has different rules.
                            </p>
                            <p>
                                <strong className="text-yellow-400">Your options:</strong>
                            </p>
                            <ul className="space-y-2 ml-6">
                                <li>🇬🇧 <strong>UK CIC</strong> = recognized in UK + Europe, some international</li>
                                <li>🇺🇸 <strong>US 501(c)(3)</strong> = recognized globally, but you can't get paid</li>
                                <li>🌍 <strong>B Corporation</strong> = global marketing badge, but NOT charity status</li>
                            </ul>
                            <div className="bg-green-900/40 border-2 border-green-500 rounded-lg p-6 mt-6">
                                <p className="text-green-300 font-bold text-2xl mb-3">💚 RECOMMENDED PATH:</p>
                                <p className="text-white text-xl">
                                    1. Get UK CIC NOW (10 days, £65)<br/>
                                    2. Add B Corp certification LATER (when revenue allows)<br/>
                                    3. Then you have UK charity + global credibility
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* OPTIONS COMPARISON */}
                <div className="space-y-6">
                    {options.map((option, index) => {
                        const borderColors = {
                            green: 'border-green-500',
                            purple: 'border-purple-500',
                            red: 'border-red-500',
                            orange: 'border-orange-500',
                            gray: 'border-gray-500',
                            cyan: 'border-cyan-500'
                        };

                        const bgColors = {
                            green: 'from-green-900/40 to-emerald-900/40',
                            purple: 'from-purple-900/40 to-indigo-900/40',
                            red: 'from-red-900/40 to-rose-900/40',
                            orange: 'from-orange-900/40 to-amber-900/40',
                            gray: 'from-gray-900/40 to-gray-800/40',
                            cyan: 'from-cyan-900/40 to-blue-900/40'
                        };

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className={`bg-gradient-to-r ${bgColors[option.color]} border-2 ${borderColors[option.color]} ${option.recommended ? 'border-4' : ''}`}>
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <h3 className="text-3xl font-black text-white mb-2">{option.name}</h3>
                                                {option.recommended && (
                                                    <span className="inline-flex items-center gap-2 bg-green-600 px-3 py-1 rounded-full text-white font-bold text-sm">
                                                        <CheckCircle className="w-4 h-4" />
                                                        RECOMMENDED
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="bg-black/40 rounded-lg p-4">
                                                <p className="text-gray-400 text-xs mb-1">SPEED</p>
                                                <p className="text-white font-bold">{option.speed}</p>
                                            </div>
                                            <div className="bg-black/40 rounded-lg p-4">
                                                <p className="text-gray-400 text-xs mb-1">COST</p>
                                                <p className="text-white font-bold">{option.cost}</p>
                                            </div>
                                            <div className="bg-black/40 rounded-lg p-4">
                                                <p className="text-gray-400 text-xs mb-1">RECOGNITION</p>
                                                <p className="text-white font-bold">{option.recognition}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="space-y-2">
                                                <h4 className="text-green-400 font-bold text-lg mb-3">ADVANTAGES:</h4>
                                                {option.advantages.map((adv, i) => (
                                                    <p key={i} className="text-gray-300 text-sm">{adv}</p>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-red-400 font-bold text-lg mb-3">DISADVANTAGES:</h4>
                                                {option.disadvantages.map((dis, i) => (
                                                    <p key={i} className="text-gray-300 text-sm">{dis}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={`bg-${option.color}-900/30 border-2 border-${option.color}-500 rounded-lg p-6`}>
                                            <p className="text-white font-black text-xl mb-2">VERDICT:</p>
                                            <p className="text-gray-200 text-lg">{option.verdict}</p>
                                            {option.strategy && (
                                                <p className="text-cyan-300 text-base mt-3 font-bold">{option.strategy}</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* THE SIMPLE ANSWER */}
                <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-4 border-green-500">
                    <CardContent className="p-8">
                        <h2 className="text-4xl font-black text-white mb-8 text-center flex items-center justify-center gap-3">
                            <Heart className="w-12 h-12 text-pink-500" />
                            THE SIMPLE ANSWER
                        </h2>
                        
                        <div className="space-y-6">
                            
                            <div className="bg-black/60 rounded-xl p-6 border-2 border-green-500">
                                <p className="text-green-300 font-black text-2xl mb-4">PHASE 1 (NOW - Next 2 weeks):</p>
                                <div className="space-y-3 text-gray-300">
                                    <p className="text-lg">
                                        ✅ <strong className="text-white">Get UK CIC</strong> - 10-14 days, £65
                                    </p>
                                    <p className="text-base">
                                        → This unlocks: UK grants, European grants, Patagonia, private UK donors
                                    </p>
                                    <p className="text-base">
                                        → Proves your mission is asset-locked forever
                                    </p>
                                </div>
                            </div>

                            <div className="bg-black/60 rounded-xl p-6 border-2 border-cyan-500">
                                <p className="text-cyan-300 font-black text-2xl mb-4">PHASE 2 (6-12 months later):</p>
                                <div className="space-y-3 text-gray-300">
                                    <p className="text-lg">
                                        ✅ <strong className="text-white">Apply for B Corp Certification</strong>
                                    </p>
                                    <p className="text-base">
                                        → Do this when you hit £50k revenue (can afford the fees)
                                    </p>
                                    <p className="text-base">
                                        → Then you have: CIC (legal structure) + B Corp (global badge)
                                    </p>
                                    <p className="text-base">
                                        → Example: <strong className="text-cyan-400">Divine Chocolate</strong> = UK CIC + B Corp (both)
                                    </p>
                                </div>
                            </div>

                            <div className="bg-black/60 rounded-xl p-6 border-2 border-purple-500">
                                <p className="text-purple-300 font-black text-2xl mb-4">PHASE 3 (If you expand to USA):</p>
                                <div className="space-y-3 text-gray-300">
                                    <p className="text-lg">
                                        ✅ <strong className="text-white">Set up "Friends of UF51" US 501(c)(3)</strong>
                                    </p>
                                    <p className="text-base">
                                        → This is a SEPARATE US charity that receives US donations
                                    </p>
                                    <p className="text-base">
                                        → Then sends grants to your UK CIC for specific projects
                                    </p>
                                    <p className="text-base">
                                        → Common structure: UK CIC (main org) + US 501(c)(3) (fundraising arm)
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 bg-green-900/60 border-4 border-green-500 rounded-xl p-8">
                            <p className="text-green-300 font-black text-3xl mb-4 text-center">💚 FINAL RECOMMENDATION 💚</p>
                            <div className="space-y-4 text-white text-xl">
                                <p>
                                    <strong>RIGHT NOW:</strong> Get UK CIC. It's 10 days, £65, and opens MOST doors.
                                </p>
                                <p>
                                    <strong>6 months:</strong> Add B Corp certification (global credibility boost).
                                </p>
                                <p>
                                    <strong>12+ months:</strong> If you're scaling to USA, set up US 501(c)(3) "Friends of UF51" as fundraising arm.
                                </p>
                                <p className="text-cyan-400 font-bold text-2xl mt-6">
                                    = You'll have UK + Europe + USA + Global funders covered.
                                </p>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* WHY NOT JUST "INTERNATIONAL NONPROFIT"? */}
                <Card className="bg-gradient-to-r from-red-900/40 to-pink-900/40 border-2 border-red-500/50">
                    <CardContent className="p-8">
                        <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                            <AlertTriangle className="w-10 h-10 text-red-400" />
                            WHY NO "GLOBAL CHARITY" STATUS?
                        </h3>
                        <div className="space-y-4 text-gray-300">
                            <p className="text-lg">
                                Because every country protects its own tax system. They want to make sure charities are REAL before giving tax breaks.
                            </p>
                            <p>
                                <strong className="text-white">US charities:</strong> Must register in USA (IRS approval)
                            </p>
                            <p>
                                <strong className="text-white">UK charities:</strong> Must register in UK (Charity Commission or CIC Regulator)
                            </p>
                            <p>
                                <strong className="text-white">EU charities:</strong> Must register in specific EU country
                            </p>
                            <p className="text-yellow-400 font-bold text-xl mt-6">
                                There is NO shortcut. You pick your home base (UK CIC = best for you), then expand internationally later if needed.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* NEXT STEPS */}
                <Card className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 border-4 border-cyan-500">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-4xl font-black text-white mb-6">WHAT TO DO NOW</h3>
                        <div className="space-y-4 text-left max-w-3xl mx-auto">
                            <div className="bg-black/60 border-l-4 border-green-400 p-6 rounded-lg">
                                <p className="text-green-300 font-bold text-xl mb-2">1. Finish UK CIC application</p>
                                <p className="text-gray-300">10-14 days. £65. This is your foundation.</p>
                            </div>
                            <div className="bg-black/60 border-l-4 border-cyan-400 p-6 rounded-lg">
                                <p className="text-cyan-300 font-bold text-xl mb-2">2. Apply to Patagonia + Matthew Good</p>
                                <p className="text-gray-300">CIC status helps. Both accept UK CICs. Fast decisions.</p>
                            </div>
                            <div className="bg-black/60 border-l-4 border-purple-400 p-6 rounded-lg">
                                <p className="text-purple-300 font-bold text-xl mb-2">3. When revenue hits £50k → Apply for B Corp</p>
                                <p className="text-gray-300">Then you're CIC + B Corp = global powerhouse</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-green-900/60 border-4 border-green-500 rounded-xl">
                            <p className="text-white font-black text-2xl">
                                You don't need "international charity status" RIGHT NOW.
                            </p>
                            <p className="text-green-300 text-xl mt-3">
                                UK CIC opens 80% of doors. B Corp later = opens the rest.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* EXAMPLES */}
                <Card className="bg-black/40 border-2 border-gray-700">
                    <CardContent className="p-8">
                        <h3 className="text-2xl font-black text-white mb-6">WHO DOES THIS (CIC + B Corp):</h3>
                        <div className="space-y-4">
                            <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4">
                                <p className="text-cyan-300 font-bold text-lg">Divine Chocolate</p>
                                <p className="text-gray-300 text-sm">UK CIC + B Corp. Fair trade chocolate. Globally recognized. Still mission-locked.</p>
                            </div>
                            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-300 font-bold text-lg">Tony's Chocolonely</p>
                                <p className="text-gray-300 text-sm">B Corp. Mission-locked (slave-free chocolate). Global brand. Started in Netherlands.</p>
                            </div>
                            <div className="bg-pink-900/30 border border-pink-500/50 rounded-lg p-4">
                                <p className="text-pink-300 font-bold text-lg">Patagonia</p>
                                <p className="text-gray-300 text-sm">B Corp. "Earth is our only shareholder." You're doing UK version of this.</p>
                            </div>
                        </div>
                        <p className="text-green-400 font-bold mt-6 text-lg text-center">
                            They all started local (CIC or B Corp), then expanded. Same path for you.
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}