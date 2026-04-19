import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Globe, Zap, BookOpen, ArrowLeft, Coffee, ChevronDown, ShieldCheck, Users, Star } from 'lucide-react';
import { createDonationCheckout } from '@/functions/createDonationCheckout';

const CURRENCIES = [
  { code: 'gbp', symbol: '£', label: 'GBP — British Pound' },
  { code: 'usd', symbol: '$', label: 'USD — US Dollar' },
  { code: 'eur', symbol: '€', label: 'EUR — Euro' },
  { code: 'aud', symbol: 'A$', label: 'AUD — Australian Dollar' },
  { code: 'cad', symbol: 'C$', label: 'CAD — Canadian Dollar' },
  { code: 'jpy', symbol: '¥', label: 'JPY — Japanese Yen' },
  { code: 'inr', symbol: '₹', label: 'INR — Indian Rupee' },
  { code: 'brl', symbol: 'R$', label: 'BRL — Brazilian Real' },
  { code: 'mxn', symbol: 'MX$', label: 'MXN — Mexican Peso' },
  { code: 'sgd', symbol: 'S$', label: 'SGD — Singapore Dollar' },
  { code: 'nzd', symbol: 'NZ$', label: 'NZD — New Zealand Dollar' },
  { code: 'zar', symbol: 'R', label: 'ZAR — South African Rand' },
  { code: 'nok', symbol: 'kr', label: 'NOK — Norwegian Krone' },
  { code: 'sek', symbol: 'kr', label: 'SEK — Swedish Krona' },
  { code: 'chf', symbol: 'Fr', label: 'CHF — Swiss Franc' },
];

// Amount presets per currency (in minor units)
const PRESETS = {
  gbp: [{ label: '£1', value: 100 }, { label: '£3', value: 300 }, { label: '£5', value: 500 }, { label: '£10', value: 1000 }, { label: '£25', value: 2500 }, { label: '£50', value: 5000 }],
  usd: [{ label: '$1', value: 100 }, { label: '$3', value: 300 }, { label: '$5', value: 500 }, { label: '$10', value: 1000 }, { label: '$25', value: 2500 }, { label: '$50', value: 5000 }],
  eur: [{ label: '€1', value: 100 }, { label: '€3', value: 300 }, { label: '€5', value: 500 }, { label: '€10', value: 1000 }, { label: '€25', value: 2500 }, { label: '€50', value: 5000 }],
  jpy: [{ label: '¥150', value: 150 }, { label: '¥500', value: 500 }, { label: '¥1000', value: 1000 }, { label: '¥2500', value: 2500 }, { label: '¥5000', value: 5000 }, { label: '¥10000', value: 10000 }],
  inr: [{ label: '₹100', value: 100 }, { label: '₹250', value: 250 }, { label: '₹500', value: 500 }, { label: '₹1000', value: 1000 }, { label: '₹2500', value: 2500 }, { label: '₹5000', value: 5000 }],
};

const getPresets = (code) => PRESETS[code] || PRESETS['gbp'].map(p => ({
  ...p,
  label: `${CURRENCIES.find(c => c.code === code)?.symbol || ''}${p.value / 100}`
}));

export default function SupportLearn51() {
  const [currency, setCurrency] = useState('gbp');
  const [selected, setSelected] = useState(500);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const currencyData = CURRENCIES.find(c => c.code === currency);
  const presets = getPresets(currency);

  // JPY and some currencies don't use decimals
  const noDecimal = ['jpy', 'krw', 'vnd', 'clp'].includes(currency);
  const customToMinor = (val) => noDecimal ? Math.round(parseFloat(val)) : Math.round(parseFloat(val) * 100);
  const minAmount = noDecimal ? 100 : 100;

  const finalAmount = custom ? customToMinor(custom) : selected;

  const handleDonate = async () => {
    if (window.self !== window.top) {
      alert('Please open the full app to donate.');
      return;
    }
    if (!finalAmount || finalAmount < minAmount) return;
    setLoading(true);
    try {
      const res = await createDonationCheckout({ amount: finalAmount, currency });
      if (res.data?.url) window.location.href = res.data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-8">

        {/* Back */}
        <Link to="/Learn51" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Learn51
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="text-6xl">🧒</div>
          <h1 className="text-4xl font-black leading-tight">The best AI learning tech<br /><span className="text-emerald-400">should be free for every child.</span></h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Not just the ones whose parents can afford it.<br />
            Every child. Every country. Right now. Free forever.
          </p>
          <p className="text-white/50 text-sm">
            Open it. Pick a subject. Start learning.<br/>No login. No cost. No catch.
          </p>
        </motion.div>

        {/* Real story / emotional hook */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <p className="text-white/80 text-sm leading-relaxed">
            💬 <span className="italic">"My daughter was embarrassed to ask her teacher the same question again. She used Learn51 at 10pm. She got it. She went to school the next day and answered first in class."</span>
          </p>
          <p className="text-white/40 text-xs">— A mum in Glasgow</p>
        </motion.div>

        {/* Why it exists */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="space-y-3">
          {[
            { icon: ShieldCheck, label: 'Zero data collected', desc: 'No accounts. No profiles. Your child stays invisible to the internet.', color: 'text-cyan-400' },
            { icon: Globe, label: 'Works anywhere on Earth', desc: 'A kid in rural Scotland or rural Kenya gets the same AI tutor. No cost. No barrier.', color: 'text-emerald-400' },
            { icon: Users, label: 'Built by parents, for parents', desc: "We're a CIC — a community company. Every penny goes back into the platform.", color: 'text-amber-400' },
            { icon: Star, label: 'No hidden agenda', desc: "We don't sell data. We don't upsell. We just want kids to learn.", color: 'text-pink-400' },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="flex items-start gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
              <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="text-white font-black text-sm">{label}</p>
                <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Donation form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-3xl border border-white/10 p-6 space-y-5">
          <div className="text-center space-y-1">
            <p className="text-white font-black text-lg">Keep it free for every child</p>
            <p className="text-white/40 text-sm">AI credits cost real money. Even £1 funds dozens of lessons.</p>
          </div>

          {/* Currency picker */}
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Your currency</p>
            <div className="relative">
              <button
                onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
                className="w-full flex items-center justify-between bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white hover:border-emerald-400 transition-all"
              >
                <span className="font-bold">{currencyData?.symbol} {currencyData?.label}</span>
                <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showCurrencyPicker ? 'rotate-180' : ''}`} />
              </button>
              {showCurrencyPicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a0f2a] border border-white/20 rounded-xl overflow-auto max-h-48 z-10 shadow-2xl">
                  {CURRENCIES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setSelected(getPresets(c.code)[2]?.value || 500); setCustom(''); setShowCurrencyPicker(false); }}
                      className={`w-full text-left px-4 py-3 hover:bg-emerald-500/20 transition-all text-sm ${currency === c.code ? 'text-emerald-300 font-bold' : 'text-white/70'}`}
                    >
                      {c.symbol} {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount presets */}
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Amount</p>
            <div className="grid grid-cols-3 gap-2">
              {presets.map(a => (
                <button
                  key={a.value}
                  onClick={() => { setSelected(a.value); setCustom(''); }}
                  className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${
                    selected === a.value && !custom
                      ? 'border-emerald-400 bg-emerald-500/20 text-white'
                      : 'border-white/10 hover:border-emerald-400/40 text-white/70'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="flex items-center gap-3">
            <span className="text-white/60 font-bold text-lg">{currencyData?.symbol}</span>
            <input
              type="number"
              placeholder="Other amount"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Pay button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleDonate}
            disabled={loading || !finalAmount || finalAmount < minAmount}
            className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 disabled:opacity-40 text-white font-black text-xl rounded-2xl transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3"
          >
            <Heart className="w-6 h-6" />
            {loading ? 'One sec...' : `Contribute ${currencyData?.symbol}${custom || (selected ? (noDecimal ? selected : (selected/100).toFixed(2)) : '')}`}
          </motion.button>

          {/* Payment methods note */}
          <div className="text-center space-y-1">
            <p className="text-white/30 text-xs">💳 Card &nbsp;·&nbsp; Apple Pay &nbsp;·&nbsp; Google Pay &nbsp;·&nbsp; Link</p>
            <p className="text-white/20 text-xs">Secure checkout via Stripe · No account needed</p>
          </div>
        </motion.div>

        {/* For organisations */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-3">
          <p className="text-amber-300 font-black text-sm">🏢 Are you a business or organisation?</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Schools, charities, and companies support Learn51 too. As a registered CIC, your contribution may qualify as a <span className="text-white font-bold">tax-deductible donation</span> — many UK businesses offset this against corporation tax. We can provide a receipt and full CIC documentation.
          </p>
          <a href="mailto:family@uf51.love" className="inline-block text-amber-400 text-xs font-bold hover:underline">
            📧 family@uf51.love — let's talk
          </a>
        </motion.div>

        {/* Trust / honest note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 text-center space-y-3">
          <Coffee className="w-6 h-6 text-emerald-400 mx-auto" />
          <p className="text-white/80 text-sm leading-relaxed">
            <span className="text-emerald-300 font-bold">Universal Frequency 51 CIC</span><br />
            We're a registered Community Interest Company — not a startup, not a charity looking for a handout. We built this because kids we love needed it.
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            No VC money. Asset-locked. Every contribution is protected by law to be used for community benefit only.
          </p>
          <p className="text-white/30 text-xs">Questions? <a href="mailto:family@uf51.love" className="text-emerald-400 hover:underline">family@uf51.love</a></p>
        </motion.div>

        {/* What you're NOT getting */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-center space-y-1 pb-6">
          <p className="text-white/20 text-xs">No newsletter. No follow-up emails. No guilt trips.</p>
          <p className="text-white/20 text-xs">Just a kid somewhere learning something. ♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}