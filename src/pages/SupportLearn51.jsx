import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, ArrowLeft, Coffee, ChevronDown, ShieldCheck, Zap, Copy, Check } from 'lucide-react';
import { createDonationCheckout } from '@/functions/createDonationCheckout';

const CURRENCIES = [
  { code: 'gbp', symbol: '£', label: 'GBP' },
  { code: 'usd', symbol: '$', label: 'USD' },
  { code: 'eur', symbol: '€', label: 'EUR' },
  { code: 'aud', symbol: 'A$', label: 'AUD' },
  { code: 'cad', symbol: 'C$', label: 'CAD' },
  { code: 'jpy', symbol: '¥', label: 'JPY' },
  { code: 'inr', symbol: '₹', label: 'INR' },
  { code: 'brl', symbol: 'R$', label: 'BRL' },
  { code: 'sgd', symbol: 'S$', label: 'SGD' },
  { code: 'nzd', symbol: 'NZ$', label: 'NZD' },
  { code: 'zar', symbol: 'R', label: 'ZAR' },
  { code: 'nok', symbol: 'kr', label: 'NOK' },
  { code: 'chf', symbol: 'Fr', label: 'CHF' },
];

const PRESETS = {
  gbp: [{ label: '£1', value: 100 }, { label: '£3', value: 300 }, { label: '£5', value: 500 }, { label: '£10', value: 1000 }, { label: '£25', value: 2500 }, { label: '£50', value: 5000 }],
  usd: [{ label: '$1', value: 100 }, { label: '$3', value: 300 }, { label: '$5', value: 500 }, { label: '$10', value: 1000 }, { label: '$25', value: 2500 }, { label: '$50', value: 5000 }],
  eur: [{ label: '€1', value: 100 }, { label: '€3', value: 300 }, { label: '€5', value: 500 }, { label: '€10', value: 1000 }, { label: '€25', value: 2500 }, { label: '€50', value: 5000 }],
  jpy: [{ label: '¥150', value: 150 }, { label: '¥500', value: 500 }, { label: '¥1000', value: 1000 }, { label: '¥2500', value: 2500 }, { label: '¥5000', value: 5000 }, { label: '¥10000', value: 10000 }],
  inr: [{ label: '₹100', value: 100 }, { label: '₹250', value: 250 }, { label: '₹500', value: 500 }, { label: '₹1000', value: 1000 }, { label: '₹2500', value: 2500 }, { label: '₹5000', value: 5000 }],
};

const getPresets = (code) => PRESETS[code] || PRESETS['gbp'].map(p => ({
  ...p, label: `${CURRENCIES.find(c => c.code === code)?.symbol || ''}${p.value / 100}`
}));

const CRYPTO = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x742d35Cc6634C0532925a3b8D4C9b9bB4B7e8cF2',
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
    icon: '⟠',
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    icon: '₿',
  },
];

function CryptoAddress({ coin }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(coin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`rounded-2xl border ${coin.border} ${coin.bg} p-4 space-y-2`}>
      <div className="flex items-center justify-between">
        <span className={`font-black text-sm ${coin.color}`}>{coin.icon} {coin.name} ({coin.symbol})</span>
        <button onClick={copy} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${coin.border} ${coin.color} hover:opacity-80 transition-all`}>
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="text-white/40 text-xs font-mono break-all leading-relaxed">{coin.address}</p>
    </div>
  );
}

export default function SupportLearn51() {
  const [currency, setCurrency] = useState('gbp');
  const [selected, setSelected] = useState(500);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [tab, setTab] = useState('fiat'); // 'fiat' | 'crypto'

  const currencyData = CURRENCIES.find(c => c.code === currency);
  const presets = getPresets(currency);
  const noDecimal = ['jpy', 'krw', 'vnd', 'clp'].includes(currency);
  const customToMinor = (val) => noDecimal ? Math.round(parseFloat(val)) : Math.round(parseFloat(val) * 100);
  const finalAmount = custom ? customToMinor(custom) : selected;

  const handleDonate = async () => {
    if (window.self !== window.top) {
      alert('Please open the full app to contribute.');
      return;
    }
    if (!finalAmount || finalAmount < 100) return;
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
    <div className="min-h-screen bg-gradient-to-br from-[#060410] via-[#0d0820] to-[#060410] text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-8">

        {/* Back */}
        <Link to="/Learn51" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Learn51
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="text-5xl">🌍</div>
          <h1 className="text-4xl font-black leading-tight">
            The best AI learning tech<br />
            <span className="text-emerald-400">should be free for every child.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Not just the ones whose parents can afford it.<br />
            <span className="text-white/80 font-bold">Every child. Every country. Right now. Free forever.</span>
          </p>
        </motion.div>

        {/* Real story */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="bg-white/3 border border-white/8 rounded-2xl p-5 space-y-2">
          <p className="text-white/70 text-sm leading-relaxed italic">
            💬 "My daughter was embarrassed to ask her teacher the same question again. She used Learn51 at 10pm. She got it. She went to school the next day and answered first in class."
          </p>
          <p className="text-white/30 text-xs">— A mum in Glasgow</p>
        </motion.div>

        {/* Why */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="space-y-2">
          {[
            { icon: ShieldCheck, label: 'No data. No tracking. Ever.', desc: 'No accounts. No profiles. Kids stay invisible to the internet.', color: 'text-cyan-400' },
            { icon: Globe, label: 'Works anywhere on Earth', desc: 'A child in rural Scotland or rural Kenya gets the same thing. Free.', color: 'text-emerald-400' },
            { icon: Heart, label: 'Built by parents, not investors', desc: "We're a CIC — a community company. No VC money. Every penny stays in the mission.", color: 'text-pink-400' },
            { icon: Zap, label: 'No upsells. No agenda.', desc: "We don't sell data. We don't upsell. We just want kids to learn.", color: 'text-amber-400' },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="flex items-start gap-4 bg-white/3 rounded-2xl p-4 border border-white/8">
              <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="text-white font-black text-sm">{label}</p>
                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contribution form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 overflow-hidden">

          {/* Tab switcher */}
          <div className="grid grid-cols-2 border-b border-white/10">
            <button
              onClick={() => setTab('fiat')}
              className={`py-4 text-sm font-black transition-all ${tab === 'fiat' ? 'bg-emerald-500/15 text-emerald-300 border-b-2 border-emerald-400' : 'text-white/30 hover:text-white/60 bg-white/2'}`}
            >
              💳 Card / Bank
            </button>
            <button
              onClick={() => setTab('crypto')}
              className={`py-4 text-sm font-black transition-all ${tab === 'crypto' ? 'bg-purple-500/15 text-purple-300 border-b-2 border-purple-400' : 'text-white/30 hover:text-white/60 bg-white/2'}`}
            >
              ⟠ Crypto
            </button>
          </div>

          <div className="p-6 space-y-5 bg-white/2">
            <div className="text-center space-y-1">
              <p className="text-white font-black text-lg">Keep it free for every child</p>
              <p className="text-white/30 text-sm">AI credits cost real money. Even £1 funds dozens of lessons.</p>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'fiat' ? (
                <motion.div key="fiat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  {/* Currency picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
                      className="w-full flex items-center justify-between bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white hover:border-emerald-400/50 transition-all"
                    >
                      <span className="font-bold text-sm">{currencyData?.symbol} — {currencyData?.label}</span>
                      <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showCurrencyPicker ? 'rotate-180' : ''}`} />
                    </button>
                    {showCurrencyPicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#130d24] border border-white/15 rounded-xl overflow-auto max-h-44 z-10 shadow-2xl">
                        {CURRENCIES.map(c => (
                          <button
                            key={c.code}
                            onClick={() => { setCurrency(c.code); setSelected(getPresets(c.code)[2]?.value || 500); setCustom(''); setShowCurrencyPicker(false); }}
                            className={`w-full text-left px-4 py-3 hover:bg-emerald-500/10 transition-all text-sm ${currency === c.code ? 'text-emerald-300 font-bold' : 'text-white/60'}`}
                          >
                            {c.symbol} {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Presets */}
                  <div className="grid grid-cols-3 gap-2">
                    {presets.map(a => (
                      <button
                        key={a.value}
                        onClick={() => { setSelected(a.value); setCustom(''); }}
                        className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${
                          selected === a.value && !custom
                            ? 'border-emerald-400 bg-emerald-500/15 text-white'
                            : 'border-white/8 hover:border-emerald-400/30 text-white/50'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom */}
                  <div className="flex items-center gap-3">
                    <span className="text-white/50 font-bold">{currencyData?.symbol}</span>
                    <input
                      type="number"
                      placeholder="Your own amount"
                      value={custom}
                      onChange={e => { setCustom(e.target.value); setSelected(null); }}
                      className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-400 transition-all text-sm"
                    />
                  </div>

                  {/* Pay button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDonate}
                    disabled={loading || !finalAmount || finalAmount < 100}
                    className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:opacity-90 disabled:opacity-30 text-white font-black text-lg rounded-2xl transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3"
                  >
                    <Heart className="w-5 h-5" />
                    {loading ? 'One sec...' : `Contribute ${currencyData?.symbol}${custom || (selected ? (noDecimal ? selected : (selected / 100).toFixed(2)) : '')}`}
                  </motion.button>

                  <div className="text-center">
                    <p className="text-white/20 text-xs">💳 Card · Apple Pay · Google Pay · Link &nbsp;·&nbsp; Stripe · No account needed</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="crypto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <p className="text-white/40 text-xs text-center leading-relaxed">
                    Send any amount directly to these wallets.<br />
                    No middleman. No fees. Pure signal.
                  </p>
                  {CRYPTO.map(coin => <CryptoAddress key={coin.symbol} coin={coin} />)}
                  <p className="text-white/20 text-xs text-center">
                    After sending, email <a href="mailto:family@uf51.love" className="text-purple-400 hover:underline">family@uf51.love</a> and we'll acknowledge it. No pressure.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Orgs / tax */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
          className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5 space-y-2">
          <p className="text-amber-300 font-black text-sm">🏫 School, charity or company?</p>
          <p className="text-white/50 text-sm leading-relaxed">
            We're a registered CIC. Your contribution may be <span className="text-white font-bold">tax-deductible</span> against corporation tax in the UK. We can provide a receipt and CIC documentation.
          </p>
          <a href="mailto:family@uf51.love" className="inline-block text-amber-400 text-xs font-bold hover:underline">
            📧 family@uf51.love
          </a>
        </motion.div>

        {/* CIC trust */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
          className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 text-center space-y-2">
          <Coffee className="w-5 h-5 text-emerald-400 mx-auto" />
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="text-emerald-300 font-bold">Universal Frequency 51 CIC</span><br />
            Not a startup. Not a charity asking for a handout. We built this because kids we love needed it.
          </p>
          <p className="text-white/30 text-xs">Asset-locked by law. Every contribution goes to the mission.</p>
        </motion.div>

        {/* Footer note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36 }}
          className="text-center space-y-1 pb-8">
          <p className="text-white/20 text-xs">No newsletter. No guilt trips. No follow-up.</p>
          <p className="text-white/20 text-xs">Just a kid somewhere learning something. ♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}