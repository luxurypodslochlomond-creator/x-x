import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Globe, Zap, BookOpen, ArrowLeft, Coffee } from 'lucide-react';
import { createDonationCheckout } from '@/functions/createDonationCheckout';

const AMOUNTS = [
  { label: '£2', value: 200, desc: 'Buys a lesson for 200 kids' },
  { label: '£5', value: 500, desc: 'Powers a week of learning' },
  { label: '£10', value: 1000, desc: 'Keeps the lights on for a month' },
  { label: '£25', value: 2500, desc: 'A term of free education' },
];

export default function SupportLearn51() {
  const [selected, setSelected] = useState(500);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);

  const finalAmount = custom ? Math.round(parseFloat(custom) * 100) : selected;

  const handleDonate = async () => {
    if (window.self !== window.top) {
      alert('Please open the full app to donate.');
      return;
    }
    if (!finalAmount || finalAmount < 100) return;
    setLoading(true);
    try {
      const res = await createDonationCheckout({ amount: finalAmount, currency: 'gbp' });
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
            Learn51 is completely free — no ads, no logins, no tracking.<br />
            Every child on Earth can use it, right now, today.
          </p>
          <p className="text-white/40 text-sm">
            But servers, AI credits, and keeping the lights on cost real money.<br />
            If it's helped you or a child you love, anything helps.
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

        {/* Amount picker */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-3xl border border-white/10 p-6 space-y-4">
          <p className="text-white font-black text-lg">Choose an amount</p>

          <div className="grid grid-cols-2 gap-3">
            {AMOUNTS.map(a => (
              <button
                key={a.value}
                onClick={() => { setSelected(a.value); setCustom(''); }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  selected === a.value && !custom
                    ? 'border-violet-400 bg-violet-500/20'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <p className="text-white font-black text-xl">{a.label}</p>
                <p className="text-white/40 text-xs">{a.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/60 font-bold">£</span>
            <input
              type="number"
              placeholder="Other amount"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-400"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleDonate}
            disabled={loading || !finalAmount || finalAmount < 100}
            className="w-full py-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700 disabled:opacity-40 text-white font-black text-xl rounded-2xl transition-all shadow-2xl shadow-violet-500/30 flex items-center justify-center gap-3"
          >
            <Heart className="w-6 h-6" />
            {loading ? 'One sec...' : `Donate ${custom ? `£${custom}` : AMOUNTS.find(a => a.value === selected)?.label || ''}`}
          </motion.button>

          <p className="text-center text-white/20 text-xs">Secure payment via Stripe. No account needed.</p>
        </motion.div>

        {/* Honest note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-5 text-center space-y-2">
          <Coffee className="w-6 h-6 text-violet-400 mx-auto" />
          <p className="text-white/80 text-sm leading-relaxed">
            This is built by one person who believes every child deserves a great education.<br />
            <span className="text-violet-300 font-bold">No VC funding. No corporate owners. Just love and code.</span>
          </p>
          <p className="text-white/40 text-xs">Even £2 makes a real difference. Thank you. ♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}