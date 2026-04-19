import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, ChevronDown } from 'lucide-react';
import { createDonationCheckout } from '@/functions/createDonationCheckout';

const CURRENCIES = [
  { code: 'gbp', symbol: '£', label: 'GBP' },
  { code: 'usd', symbol: '$', label: 'USD' },
  { code: 'eur', symbol: '€', label: 'EUR' },
  { code: 'aud', symbol: 'A$', label: 'AUD' },
  { code: 'cad', symbol: 'C$', label: 'CAD' },
  { code: 'jpy', symbol: '¥', label: 'JPY' },
  { code: 'inr', symbol: '₹', label: 'INR' },
  { code: 'nzd', symbol: 'NZ$', label: 'NZD' },
  { code: 'chf', symbol: 'Fr', label: 'CHF' },
];

const PRESETS = {
  gbp: [100, 300, 500, 1000, 2500, 5000],
  usd: [100, 300, 500, 1000, 2500, 5000],
  eur: [100, 300, 500, 1000, 2500, 5000],
  jpy: [150, 500, 1000, 2500, 5000, 10000],
  inr: [100, 250, 500, 1000, 2500, 5000],
};

const NO_DECIMAL = ['jpy', 'krw', 'vnd'];

const getPresets = (code) => {
  const sym = CURRENCIES.find(c => c.code === code)?.symbol || '';
  const nd = NO_DECIMAL.includes(code);
  const vals = PRESETS[code] || PRESETS['gbp'];
  return vals.map(v => ({ value: v, label: `${sym}${nd ? v : (v / 100).toFixed(0)}` }));
};

export default function SupportLearn51() {
  const [currency, setCurrency] = useState('gbp');
  const [selected, setSelected] = useState(100);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const currencyData = CURRENCIES.find(c => c.code === currency);
  const presets = getPresets(currency);
  const noDecimal = NO_DECIMAL.includes(currency);
  const finalAmount = custom
    ? (noDecimal ? Math.round(parseFloat(custom)) : Math.round(parseFloat(custom) * 100))
    : selected;

  const displayAmount = custom
    ? `${currencyData?.symbol}${custom}`
    : selected
    ? `${currencyData?.symbol}${noDecimal ? selected : (selected / 100).toFixed(0)}`
    : '';

  const lessons = finalAmount >= 100 ? Math.round((noDecimal ? finalAmount : finalAmount / 100) * 12) : 0;

  const handleDonate = async () => {
    if (window.self !== window.top) { alert('Please open the full app to contribute.'); return; }
    if (!finalAmount || finalAmount < 100) return;
    setLoading(true);
    try {
      const res = await createDonationCheckout({ amount: finalAmount, currency });
      if (res.data?.url) window.location.href = res.data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060d10] text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-md space-y-8">

        <Link to="/Learn51" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm w-fit">
          <ArrowLeft className="w-4 h-4" /> Learn51
        </Link>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-5 pt-4">
          <div className="text-6xl">🧒🌍</div>
          <h1 className="text-3xl font-black leading-snug">
            A kid is learning right now.<br />
            <span className="text-emerald-400">Help keep it free.</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed">
            Learn51 is free AI tutoring for every child on Earth — no login, no tracking, no cost to them.<br />
            <span className="text-white/80">AI costs money. You make it possible.</span>
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="border-l-4 border-emerald-500 pl-4 py-1">
          <p className="text-white/60 text-sm italic leading-relaxed">
            "She used Learn51 at 10pm because she was too embarrassed to ask again. Next day she answered first in class."
          </p>
          <p className="text-white/25 text-xs mt-1">— A mum in Glasgow</p>
        </motion.div>

        {/* Donation box */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white/4 border border-white/10 rounded-3xl p-6 space-y-5">

          {/* Currency */}
          <div className="relative">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white hover:border-emerald-400/40 transition-all text-sm"
            >
              <span className="font-bold">{currencyData?.symbol} {currencyData?.label}</span>
              <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${showPicker ? 'rotate-180' : ''}`} />
            </button>
            {showPicker && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d1a1e] border border-white/10 rounded-xl overflow-auto max-h-40 z-20 shadow-2xl">
                {CURRENCIES.map(c => (
                  <button key={c.code}
                    onClick={() => { setCurrency(c.code); setSelected(getPresets(c.code)[0].value); setCustom(''); setShowPicker(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-500/10 transition-all ${currency === c.code ? 'text-emerald-300 font-bold' : 'text-white/50'}`}>
                    {c.symbol} {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Presets */}
          <div className="grid grid-cols-3 gap-2">
            {presets.map(a => (
              <button key={a.value}
                onClick={() => { setSelected(a.value); setCustom(''); }}
                className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${
                  selected === a.value && !custom
                    ? 'border-emerald-400 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/10'
                    : 'border-white/8 text-white/40 hover:border-white/20'
                }`}>
                {a.label}
              </button>
            ))}
          </div>

          {/* Custom */}
          <div className="flex items-center gap-2 bg-white/3 border border-white/8 rounded-xl px-4 py-3 focus-within:border-emerald-400/50 transition-all">
            <span className="text-white/40 font-bold text-sm">{currencyData?.symbol}</span>
            <input
              type="number"
              placeholder="Other amount"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
              className="flex-1 bg-transparent text-white placeholder-white/20 focus:outline-none text-sm"
            />
          </div>

          {/* Impact */}
          {lessons > 0 && (
            <motion.p key={lessons} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              className="text-center text-emerald-300 text-sm font-bold">
              🎓 That's ~{lessons} free lessons for a child who has nothing else
            </motion.p>
          )}

          {/* Button */}
          <button
            onClick={handleDonate}
            disabled={loading || !finalAmount || finalAmount < 100}
            className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 disabled:opacity-30 text-white font-black text-xl rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
          >
            <Heart className="w-5 h-5" />
            {loading ? 'One sec...' : `Give ${displayAmount}`}
          </button>

          <p className="text-center text-white/20 text-xs">
            💳 Card · Apple Pay · Google Pay · Secure via Stripe
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-center space-y-1 pb-8">
          <p className="text-white/25 text-xs">Universal Frequency 51 CIC — asset-locked by law. Every penny funds lessons.</p>
          <p className="text-white/20 text-xs">No newsletter. No follow-up. Just a kid learning. ♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}