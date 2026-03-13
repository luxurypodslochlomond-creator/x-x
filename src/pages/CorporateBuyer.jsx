import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Globe, CheckCircle, ArrowRight, Users, Leaf, Lock, Building, ShoppingCart, Home, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CREDIT_PACKAGES = [
  {
    name: "Starter",
    credits: 1000,
    kg: "1,000kg",
    price: 5000,
    priceDisplay: "£5,000",
    perCredit: "£5/credit",
    people: "~10 people",
    color: "from-green-900 to-emerald-900",
    border: "border-green-500",
    glow: "rgba(74, 222, 128, 0.3)",
  },
  {
    name: "Growth",
    credits: 10000,
    kg: "10,000kg",
    price: 40000,
    priceDisplay: "£40,000",
    perCredit: "£4/credit",
    people: "~100 people",
    color: "from-cyan-900 to-teal-900",
    border: "border-cyan-500",
    glow: "rgba(34, 211, 238, 0.3)",
    popular: true,
  },
  {
    name: "Impact",
    credits: 100000,
    kg: "100,000kg",
    price: 300000,
    priceDisplay: "£300,000",
    perCredit: "£3/credit",
    people: "~1,000 people",
    color: "from-purple-900 to-violet-900",
    border: "border-purple-500",
    glow: "rgba(168, 85, 247, 0.3)",
  }
];

export default function CorporateBuyer() {
  const [calc, setCalc] = useState(10000);

  const kgRemoved = calc;
  const peopleHelped = Math.round(calc / 100);
  const groceryWeeks = Math.round(calc / 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#0d1a0d] to-[#0a0514] text-white">

      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-500/50 rounded-full px-4 py-2 mb-6">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-bold font-mono">COMMUNITY INTEREST COMPANY — ASSET LOCKED BY UK LAW</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Your budget funds<br/>
            <span className="text-green-400">real people</span><br/>
            healing the planet
          </h1>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Not a promise. Not an offset. Not greenwashing.<br/>
            <strong className="text-white">Verified, GPS-anchored, AI-confirmed litter removal</strong> — by people in your community who need the income.
          </p>

          <p className="text-green-400 font-bold text-lg">
            They use that money to buy food. Pay rent. Feed their kids. ❤️
          </p>
        </motion.div>
      </div>

      {/* THE HUMAN REALITY */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="bg-black/40 border-2 border-green-500/40 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-center text-white mb-2">What actually happens with your money</h2>
          <p className="text-center text-gray-400 text-sm mb-8">No middlemen. No boardrooms. This is where it goes:</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-900/60 border-2 border-green-400 flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-400 font-black text-lg">You buy $P51 credits</p>
              <p className="text-gray-400 text-sm">Your ESG/sustainability budget. Any amount. Verified receipt for your reports.</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-cyan-900/60 border-2 border-cyan-400 flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-cyan-400 font-black text-lg">People remove litter</p>
              <p className="text-gray-400 text-sm">Real humans, real locations, GPS + AI verified. Every kg has a permanent record. Forever.</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-pink-900/60 border-2 border-pink-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-pink-400" />
              </div>
              <p className="text-pink-400 font-black text-lg">They get paid</p>
              <p className="text-gray-400 text-sm">Into their bank. For groceries. For rent. For their family. Real money for real work.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="flex flex-col items-center gap-1 text-gray-400"><Utensils className="w-5 h-5 text-green-400" /><span>Groceries</span></div>
            <div className="flex flex-col items-center gap-1 text-gray-400"><Home className="w-5 h-5 text-cyan-400" /><span>Rent / mortgage</span></div>
            <div className="flex flex-col items-center gap-1 text-gray-400"><ShoppingCart className="w-5 h-5 text-pink-400" /><span>Bills</span></div>
          </div>
        </motion.div>
      </div>

      {/* CIC PROTECTION */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="bg-black/40 border-2 border-yellow-500/40 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-10 h-10 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-yellow-400 font-black text-lg mb-2">Why we can't misuse your money — legally</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Universal Frequency 51 is a <strong className="text-white">Community Interest Company (CIC)</strong> — a UK legal structure where <strong className="text-white">all assets are locked by law</strong>. We cannot pay dividends. We cannot sell. Every penny of value <strong className="text-green-400">must return to the community and the planet</strong>.
              </p>
              <p className="text-gray-300 text-sm">
                This isn't a policy. It's not a promise. It's <strong className="text-white">written into our articles of association and enforced by the UK Government's CIC Regulator</strong>. We literally cannot be greedy even if we wanted to.
              </p>
              <p className="text-yellow-400 font-bold text-sm mt-3">
                That's the difference between us and every other ESG provider you've ever worked with.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIMPLE MATHS */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-black text-center text-white mb-2">The maths. Simple as it gets.</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Slide to see what your budget actually does</p>

        <div className="bg-black/40 border-2 border-green-500/30 rounded-2xl p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>£500</span>
              <span className="text-green-400 font-bold text-lg">£{calc.toLocaleString()} budget</span>
              <span>£500,000</span>
            </div>
            <input
              type="range"
              min="500"
              max="500000"
              step="500"
              value={calc}
              onChange={e => setCalc(Number(e.target.value))}
              className="w-full accent-green-400"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
              <p className="text-green-400 font-black text-3xl">{kgRemoved.toLocaleString()}kg</p>
              <p className="text-gray-400 text-sm mt-1">of litter removed from Earth</p>
              <p className="text-gray-500 text-xs mt-1">GPS verified. AI confirmed. IPFS stored forever.</p>
            </div>
            <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/30">
              <p className="text-cyan-400 font-black text-3xl">~{peopleHelped.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mt-1">people earned real income</p>
              <p className="text-gray-500 text-xs mt-1">Not volunteers. Paid workers.</p>
            </div>
            <div className="bg-pink-900/30 rounded-xl p-4 border border-pink-500/30">
              <p className="text-pink-400 font-black text-3xl">~{groceryWeeks.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mt-1">weeks of groceries funded</p>
              <p className="text-gray-500 text-xs mt-1">Real families. Real food.</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
                <p className="text-red-400 font-bold mb-1">Traditional carbon offset</p>
                <p className="text-gray-400">A company promises something will happen. Maybe. Somewhere. Someday. Unverifiable.</p>
              </div>
              <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                <p className="text-green-400 font-bold mb-1">$P51 Proof of Impact</p>
                <p className="text-gray-400">GPS coordinates. AI photo analysis. SHA-256 hash. IPFS permanent record. Mathematically unfakeable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PACKAGES */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-black text-center text-white mb-2">Credit packages</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Every package includes full verification reports for your ESG disclosure</p>

        <div className="grid md:grid-cols-3 gap-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <div key={pkg.name} className={`relative bg-gradient-to-b ${pkg.color} border-2 ${pkg.border} rounded-2xl p-6`}
              style={{ boxShadow: `0 0 30px ${pkg.glow}` }}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-black px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-black text-white mb-1">{pkg.name}</h3>
              <p className="text-3xl font-black text-white mb-1">{pkg.priceDisplay}</p>
              <p className="text-xs text-gray-400 mb-4">{pkg.perCredit}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300"><strong className="text-white">{pkg.kg}</strong> verified litter removed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300"><strong className="text-white">{pkg.people}</strong> paid real wages</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Full ESG verification report</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Permanent IPFS record</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Use in annual reports</span>
                </div>
              </div>

              <Link to={createPageUrl("ESGBridge")} className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-black bg-white hover:bg-gray-100 transition-all`}>
                Get started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Need something custom? <Link to={createPageUrl("ESGBridge")} className="text-green-400 hover:underline">Talk to us</Link> — we work with budgets of all sizes.
        </p>
      </div>

      {/* WHO THIS IS FOR */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-black text-white mb-6 text-center">Who buys $P51 credits</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {[
              { icon: Building, title: "Corporations with ESG commitments", desc: "Sustainability teams that need verifiable impact they can actually put in their annual report. Not a vague promise." },
              { icon: Shield, title: "Councils & local government", desc: "Environmental budgets that need to show real outcomes to residents. Every kg documented." },
              { icon: Globe, title: "ESG funds ($30 trillion globally)", desc: "Fund managers looking for the first truly verifiable environmental asset class." },
              { icon: Users, title: "Brands that want to mean it", desc: "Companies tired of being called out for greenwashing. $P51 is mathematically impossible to fake." },
            ].map(item => (
              <div key={item.title} className="flex gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <item.icon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold mb-1">{item.title}</p>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-10"
          style={{ boxShadow: '0 0 60px rgba(74, 222, 128, 0.2)' }}>
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-4">
            This is the most human ESG product that exists
          </h2>
          <p className="text-gray-300 mb-2 max-w-xl mx-auto">
            Other ESG products fund abstract projects somewhere far away.
          </p>
          <p className="text-green-400 font-bold text-lg mb-8">
            $P51 funds the person down your road picking up litter so they can afford their rent this month. ❤️
          </p>
          <Link to={createPageUrl("ESGBridge")}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-black text-lg px-8 py-4 rounded-2xl transition-all"
            style={{ boxShadow: '0 0 30px rgba(74, 222, 128, 0.5)' }}>
            <Leaf className="w-6 h-6" />
            Start making real impact
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-gray-500 text-xs mt-4">Community Interest Company. Asset locked by UK law. CIC Regulator registered.</p>
        </div>
      </div>
    </div>
  );
}