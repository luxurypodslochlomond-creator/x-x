import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Globe, Zap, BookOpen, ArrowLeft, Coffee, ChevronDown } from 'lucide-react';
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
          <div className="text-6xl">🌍</div>
          <h1 className="text-4xl font-black">Keep Learn51 Free</h1>
          <p className="text-white/60 text-lg leading-relaxed">
            No ads. No logins. No tracking.<br />
            Every child on Earth can use it, right now, today.
          </p>
          <p className="text-white/40 text-sm">
            AI credits and servers cost real money.<br />
            If it's helped someone you love, anything helps. ♾️
          </p>
        </motion.div>

        {/* What it pays for */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3">
          {[
            { icon: Zap, label: 'AI Credits', desc: 'Powers every lesson' },
            { icon: Globe, label: 'Free Access', desc: 'No paywall, ever' },
            { icon: BookOpen, label: 'New Subjects', desc: 'More every month' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
              <Icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-white font-black text-sm">{label}</p>
              <p className="text-white/40 text-xs">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Donation form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-3xl border border-white/10 p-6 space-y-5">

          {/* Currency picker */}
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Your currency</p>
            <div className="relative">
              <button
                onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
                className="w-full flex items-center justify-between bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white hover:border-violet-400 transition-all"
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
                      className={`w-full text-left px-4 py-3 hover:bg-violet-500/20 transition-all text-sm ${currency === c.code ? 'text-violet-300 font-bold' : 'text-white/70'}`}
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
                      ? 'border-violet-400 bg-violet-500/20 text-white'
                      : 'border-white/10 hover:border-white/30 text-white/70'
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
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-400 transition-all"
            />
          </div>

          {/* Pay button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleDonate}
            disabled={loading || !finalAmount || finalAmount < minAmount}
            className="w-full py-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700 disabled:opacity-40 text-white font-black text-xl rounded-2xl transition-all shadow-2xl shadow-violet-500/30 flex items-center justify-center gap-3"
          >
            <Heart className="w-6 h-6" />
            {loading ? 'One sec...' : `Donate ${currencyData?.symbol}${custom || (selected ? (noDecimal ? selected : (selected/100).toFixed(2)) : '')}`}
          </motion.button>

          {/* Payment methods note */}
          <div className="text-center space-y-1">
            <p className="text-white/30 text-xs">💳 Card &nbsp;·&nbsp;  Apple Pay &nbsp;·&nbsp; Google Pay &nbsp;·&nbsp; Link</p>
            <p className="text-white/20 text-xs">Secure checkout via Stripe · No account needed</p>
          </div>
        </motion.div>

        {/* Honest note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-5 text-center space-y-2">
          <Coffee className="w-6 h-6 text-violet-400 mx-auto" />
          <p className="text-white/80 text-sm leading-relaxed">
            Built by one person who believes every child deserves a great education.<br />
            <span className="text-violet-300 font-bold">No VC funding. No corporate owners. Just love and code.</span>
          </p>
          <p className="text-white/40 text-xs">Even the smallest amount keeps a child learning. Thank you. ♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}