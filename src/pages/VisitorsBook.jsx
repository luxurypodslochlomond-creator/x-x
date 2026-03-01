import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Feather, Heart, Clock, UserX, Globe, MapPin } from "lucide-react";

const FLAG = (code) => code ? code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0))) : "🌍";

const PLEDGES = [
  "I will tread lightly",
  "I will protect what I love",
  "I will leave it better than I found it",
  "I will teach my children",
  "I will speak up for the voiceless",
];

const COUNTRIES = [
  { code: "GB", name: "United Kingdom" }, { code: "US", name: "United States" },
  { code: "IR", name: "Iran" }, { code: "RU", name: "Russia" },
  { code: "UA", name: "Ukraine" }, { code: "IL", name: "Israel" },
  { code: "PS", name: "Palestine" }, { code: "CN", name: "China" },
  { code: "IN", name: "India" }, { code: "FR", name: "France" },
  { code: "DE", name: "Germany" }, { code: "BR", name: "Brazil" },
  { code: "ZA", name: "South Africa" }, { code: "NG", name: "Nigeria" },
  { code: "MX", name: "Mexico" }, { code: "PK", name: "Pakistan" },
  { code: "AU", name: "Australia" }, { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" }, { code: "EG", name: "Egypt" },
  { code: "SY", name: "Syria" }, { code: "YE", name: "Yemen" },
  { code: "AF", name: "Afghanistan" }, { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" }, { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" }, { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" }, { code: "NO", name: "Norway" },
  { code: "CA", name: "Canada" }, { code: "NZ", name: "New Zealand" },
];

function formatTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

function PledgeCard({ p }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-white/10 bg-white/3 backdrop-blur-md p-5 hover:border-green-500/20 transition-all"
      style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(0,0,0,0.3) 100%)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{FLAG(p.country_code)}</span>
          <div>
            <p className="text-white font-bold text-sm">{p.anonymous ? "Anonymous Visitor" : (p.name || "Anonymous Visitor")}</p>
            <p className="text-white/30 text-xs">{p.country || "Earth"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/20 text-xs flex-shrink-0">
          <Clock className="w-3 h-3" />
          <span>{formatTimeAgo(p.created_date)}</span>
        </div>
      </div>

      {/* The Pledge */}
      <div className="flex items-center gap-2 mb-3 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
        <span className="text-green-400 text-sm">🌿</span>
        <p className="text-green-300 text-sm font-bold italic">"{p.pledge}"</p>
      </div>

      {/* Their message */}
      {p.message && (
        <p className="text-white/60 text-sm leading-relaxed">"{p.message}"</p>
      )}

      <div className="mt-3 text-white/15 text-xs font-mono">
        {new Date(p.created_date).toISOString().replace('T', ' ').substring(0, 10)} UTC
      </div>
    </motion.div>
  );
}

export default function VisitorsBook() {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    country: "",
    country_code: "",
    message: "",
    pledge: PLEDGES[0],
    anonymous: false,
  });

  useEffect(() => {
    loadPledges();
    const unsub = base44.entities.VisitorsPledge.subscribe((event) => {
      if (event.type === "create") setPledges(prev => [event.data, ...prev]);
    });
    return () => unsub();
  }, []);

  const loadPledges = async () => {
    setLoading(true);
    const data = await base44.entities.VisitorsPledge.list("-created_date", 100);
    setPledges(data);
    setLoading(false);
  };

  const handleCountryChange = (e) => {
    const country = COUNTRIES.find(c => c.code === e.target.value);
    setForm(f => ({ ...f, country: country?.name || "", country_code: e.target.value }));
  };

  const handleSend = async () => {
    if (!form.message.trim() || !form.pledge) return;
    setSending(true);
    await base44.entities.VisitorsPledge.create({
      name: form.anonymous ? "" : form.name.trim(),
      country: form.country || "Earth",
      country_code: form.country_code || "",
      message: form.message.trim(),
      pledge: form.pledge,
      anonymous: form.anonymous,
    });
    setForm({ name: "", country: "", country_code: "", message: "", pledge: PLEDGES[0], anonymous: false });
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const totalVisitors = pledges.length;
  const countries = [...new Set(pledges.map(p => p.country_code).filter(Boolean))].length;

  return (
    <div className="min-h-screen text-white" style={{ background: "radial-gradient(ellipse at 30% 10%, #0a140a 0%, #000 60%)" }}>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${120 + i * 70}px`,
              height: `${120 + i * 70}px`,
              left: `${(i * 20) % 85}%`,
              top: `${(i * 19) % 70}%`,
              background: i % 2 === 0
                ? "radial-gradient(circle, #10b981, transparent)"
                : "radial-gradient(circle, #6ee7b7, transparent)"
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-green-500/20 rounded-full px-4 py-2 text-xs text-white/40 font-mono mb-6">
            <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            {totalVisitors} VISITORS SIGNED • {countries} NATIONS
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="text-6xl mb-4">🌍</motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-5xl md:text-6xl font-black tracking-tight mb-4"
          style={{ background: "linear-gradient(135deg, #fff 0%, #10b981 50%, #6ee7b7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          VISITORS BOOK
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed"
        >
          We are all only visitors here.<br />
          <span className="text-white/25 text-sm">Sign the book. Make your pledge. Leave Earth better than you found it.</span>
        </motion.p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-20">

        {/* SIGN THE BOOK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 mb-8"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(0,0,0,0.4) 100%)", border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Feather className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-black text-sm tracking-wider">SIGN THE BOOK</span>
          </div>

          {/* Pledge selector */}
          <div className="mb-4">
            <p className="text-white/30 text-xs mb-2 tracking-wider">CHOOSE YOUR PLEDGE</p>
            <div className="grid gap-2">
              {PLEDGES.map(pl => (
                <button
                  key={pl}
                  onClick={() => setForm(f => ({ ...f, pledge: pl }))}
                  className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    form.pledge === pl
                      ? "border-green-500/60 bg-green-500/15 text-green-300"
                      : "border-white/8 bg-white/3 text-white/40 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  🌿 {pl}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <textarea
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Say something to Earth... what does she mean to you?"
            className="w-full bg-transparent text-white placeholder-white/20 text-sm resize-none outline-none border-b border-white/10 pb-3 mb-4 leading-relaxed"
            rows={3}
            maxLength={300}
          />

          {/* Name + Country */}
          <div className="flex gap-3 mb-4">
            <input
              value={form.anonymous ? "" : form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value, anonymous: false }))}
              placeholder={form.anonymous ? "Signing anonymously..." : "Your name (optional)"}
              disabled={form.anonymous}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-green-500/50 disabled:opacity-30"
            />
            <button
              onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex-shrink-0 ${
                form.anonymous
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/30"
              }`}
            >
              <UserX className="w-4 h-4" />
              {form.anonymous ? "Anon ✓" : "Anon"}
            </button>
          </div>

          <select
            value={form.country_code}
            onChange={handleCountryChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-green-500/50 mb-4"
            style={{ background: "#050f05" }}
          >
            <option value="">🌍 Where are you visiting from?</option>
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{FLAG(c.code)} {c.name}</option>
            ))}
          </select>

          <button
            onClick={handleSend}
            disabled={!form.message.trim() || !form.pledge || sending}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            style={{
              background: sent
                ? "linear-gradient(135deg, #10b981, #6ee7b7)"
                : "linear-gradient(135deg, #10b981, #06b6d4)",
              boxShadow: "0 0 30px rgba(16,185,129,0.25)"
            }}
          >
            {sent ? (
              <><Heart className="w-5 h-5" /> PLEDGE MADE ♾️</>
            ) : sending ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full" />
            ) : (
              <><BookOpen className="w-5 h-5" /> SIGN THE BOOK</>
            )}
          </button>

          <p className="text-center text-white/15 text-xs mt-3">
            Your signature is permanent. No accounts. No politics. Just a promise to Earth.
          </p>
        </motion.div>

        {/* LIVE BOOK */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-white/30 font-mono text-sm tracking-wider">VISITORS WHO HAVE SIGNED</span>
          <div className="flex-1 h-px bg-white/5" />
          <Globe className="w-4 h-4 text-white/15" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {pledges.map(p => <PledgeCard key={p.id} p={p} />)}
            </AnimatePresence>
            {pledges.length === 0 && (
              <div className="text-center py-20 text-white/20">
                <span className="text-5xl block mb-4">🌍</span>
                <p>Be the first to sign Earth's visitors book.</p>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="text-center mt-16 text-white/15 text-xs space-y-1">
          <p className="font-mono">EARTH VISITORS BOOK • UF51 • 2026</p>
          <p>We are all only visitors here. Every pledge is permanent.</p>
        </div>
      </div>
    </div>
  );
}