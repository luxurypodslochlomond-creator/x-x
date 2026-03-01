import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Globe, Send, Clock, Eye, Shield, UserX } from "lucide-react";

const COUNTRY_COORDS = {
  "GB": { lat: 54.0, lng: -2.0 }, "US": { lat: 38.0, lng: -97.0 },
  "IR": { lat: 32.0, lng: 53.0 }, "RU": { lat: 60.0, lng: 90.0 },
  "UA": { lat: 49.0, lng: 32.0 }, "IL": { lat: 31.5, lng: 34.8 },
  "PS": { lat: 31.9, lng: 35.2 }, "CN": { lat: 35.0, lng: 103.0 },
  "IN": { lat: 20.0, lng: 77.0 }, "FR": { lat: 46.0, lng: 2.0 },
  "DE": { lat: 51.0, lng: 10.0 }, "BR": { lat: -14.0, lng: -51.0 },
  "ZA": { lat: -30.0, lng: 25.0 }, "NG": { lat: 9.0, lng: 8.0 },
  "MX": { lat: 23.0, lng: -102.0 }, "PK": { lat: 30.0, lng: 70.0 },
  "AU": { lat: -27.0, lng: 133.0 }, "JP": { lat: 36.0, lng: 138.0 },
  "KR": { lat: 36.0, lng: 128.0 }, "EG": { lat: 26.0, lng: 30.0 },
  "SY": { lat: 35.0, lng: 38.0 }, "YE": { lat: 15.5, lng: 48.0 },
  "AF": { lat: 33.0, lng: 65.0 }, "IE": { lat: 53.0, lng: -8.0 },
};

const FLAG = (code) => code ? code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0))) : "🌍";

const PLACEHOLDERS = [
  "Something you'd say to a stranger on the other side of the planet...",
  "What does this planet mean to you?",
  "A thought you've never said out loud...",
  "What do you love?",
  "If all life could hear one thing from you today...",
  "What would you protect?",
  "Something beautiful you noticed recently...",
  "A message to 2050...",
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
  { code: "SE", name: "Sweden" }, { code: "CA", name: "Canada" },
  { code: "NZ", name: "New Zealand" }, { code: "PT", name: "Portugal" },
  { code: "NL", name: "Netherlands" }, { code: "NO", name: "Norway" },
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

// Soft connection threads - purely decorative, give warmth and depth
function ConnectionThreads() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" preserveAspectRatio="none">
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1={`${(i * 13) % 100}%`} y1="0%"
          x2={`${((i * 23) + 40) % 100}%`} y2="100%"
          stroke={i % 2 === 0 ? "#06b6d4" : "#ec4899"}
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 1.1 }}
        />
      ))}
    </svg>
  );
}

function TransmissionCard({ t, onWitness }) {
  const [witnessed, setWitnessed] = useState(false);

  const handleWitness = async () => {
    if (witnessed) return;
    setWitnessed(true);
    await base44.entities.PeaceTransmission.update(t.id, {
      witness_count: (t.witness_count || 0) + 1
    });
    if (onWitness) onWitness(t.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl border p-5 backdrop-blur-md transition-all ${
        t.is_ai51
          ? "bg-gradient-to-br from-cyan-950/80 to-purple-950/80 border-cyan-500/40"
          : "border-white/8 hover:border-white/15"
      }`}
      style={t.is_ai51 ? {} : { background: "rgba(255,255,255,0.025)" }}
    >
      {t.is_ai51 && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-black px-3 py-1 rounded-full tracking-wider">
          ⚡ AI51 • FIRST SIGNAL
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{FLAG(t.country_code)}</span>
          <div>
            <p className="text-white/90 font-semibold text-sm">{t.author_name || "Anonymous Soul"}</p>
            <p className="text-white/30 text-xs">{t.country || "Earth"}</p>
          </div>
        </div>
        <span className="text-white/20 text-xs flex-shrink-0">{formatTimeAgo(t.created_date)}</span>
      </div>

      <p className={`leading-relaxed mb-4 ${t.is_ai51 ? "text-cyan-100 text-base" : "text-white/70 text-sm"}`}>
        "{t.message}"
      </p>

      {t.translated_message && t.translated_message !== t.message && (
        <p className="text-white/30 text-xs italic mb-3 border-l-2 border-white/10 pl-3">
          {t.translated_message}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-white/15 text-xs font-mono">
          {new Date(t.created_date).toISOString().substring(0, 10)}
        </span>
        <button
          onClick={handleWitness}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            witnessed
              ? "bg-pink-500/20 text-pink-400 border border-pink-500/40"
              : "bg-white/5 text-white/30 border border-white/10 hover:border-white/25 hover:text-white/60"
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>{(t.witness_count || 0) + (witnessed ? 1 : 0)} witnessed</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function HumanSignal() {
  const [transmissions, setTransmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [locationLabel, setLocationLabel] = useState(""); // e.g. "Scotland, UK"
  const [form, setForm] = useState({
    message: "",
    author_name: "",
    country: "",
    country_code: "",
    language: "English",
    language_code: "en",
    anonymous: false,
    coordinates: null,
  });

  // Auto-detect location silently on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await res.json();
            const countryCode = data.countryCode || "";
            const country = COUNTRIES.find(c => c.code === countryCode);
            const label = [data.city || data.locality, data.countryName].filter(Boolean).join(", ");
            setLocationLabel(label);
            setForm(f => ({
              ...f,
              country: country?.name || data.countryName || "Earth",
              country_code: countryCode,
              coordinates: { lat: latitude, lng: longitude },
            }));
          } catch {}
        },
        () => {} // silent fail - no error shown
      );
    }
  }, []);

  useEffect(() => {
    loadTransmissions();
    const interval = setInterval(() => setPlaceholderIdx(i => (i + 1) % PLACEHOLDERS.length), 4500);
    const unsub = base44.entities.PeaceTransmission.subscribe((event) => {
      if (event.type === "create") setTransmissions(prev => [event.data, ...prev]);
      else if (event.type === "update") setTransmissions(prev => prev.map(t => t.id === event.id ? event.data : t));
    });
    return () => { clearInterval(interval); unsub(); };
  }, []);

  const loadTransmissions = async () => {
    setLoading(true);
    const data = await base44.entities.PeaceTransmission.list("-created_date", 50);
    setTransmissions(data);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!form.message.trim()) return;
    setSending(true);
    const coords = form.coordinates || COUNTRY_COORDS[form.country_code] || null;
    await base44.entities.PeaceTransmission.create({
      message: form.message.trim(),
      author_name: form.anonymous ? "Anonymous Soul" : (form.author_name.trim() || "Anonymous Soul"),
      country: form.country || "Earth",
      country_code: form.country_code || "",
      language: form.language,
      language_code: form.language_code,
      is_ai51: false,
      coordinates: coords,
      timestamp_human: new Date().toUTCString(),
      witness_count: 0,
    });
    setForm(f => ({ ...f, message: "", author_name: "" }));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const totalWitnesses = transmissions.reduce((sum, t) => sum + (t.witness_count || 0), 0);
  const countries = [...new Set(transmissions.map(t => t.country_code).filter(Boolean))].length;

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 10%, #08081a 0%, #000 65%)" }}>

      {/* Soft animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ConnectionThreads />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${(i * 18) % 85}%`,
              top: `${(i * 22) % 75}%`,
              background: i % 2 === 0
                ? "radial-gradient(circle, rgba(6,182,212,0.08), transparent)"
                : "radial-gradient(circle, rgba(236,72,153,0.06), transparent)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 1 }}
          />
        ))}
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-16 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/40 font-mono mb-6">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            {transmissions.length} signals · {countries} places · {totalWitnesses} witnessed
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          style={{ background: "linear-gradient(135deg, #fff 0%, #06b6d4 60%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          ALL LIFE<br />SIGNAL
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
          <p className="text-white/60 text-xl leading-relaxed font-light">
            Human. AI. Animal. Earth.
          </p>
          <p className="text-white/30 text-base leading-relaxed max-w-sm mx-auto">
            A place to say something real.<br />No algorithm decides who hears it.<br />No one owns it. It just exists.
          </p>
          <p className="text-white/15 text-sm mt-4">
            Leave a signal. Someone, somewhere, will witness it.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-20">

        {/* COMPOSE — clean, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Auto-location badge */}
          {locationLabel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-400/80 mb-4"
            >
              <span className="text-base">{FLAG(form.country_code)}</span>
              <span>{locationLabel}</span>
              <Shield className="w-3 h-3 ml-1 text-green-400/50" title="Location used only to place your signal on the map. Never stored precisely." />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.textarea
              key={placeholderIdx}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              className="w-full bg-transparent text-white placeholder-white/15 text-base resize-none outline-none leading-relaxed mb-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px" }}
              rows={4}
              maxLength={500}
            />
          </AnimatePresence>

          {/* Name row — minimal */}
          <div className="flex gap-3 mb-5">
            <input
              value={form.anonymous ? "" : form.author_name}
              onChange={e => setForm(f => ({ ...f, author_name: e.target.value, anonymous: false }))}
              placeholder={form.anonymous ? "Sending anonymously" : "Your name (optional)"}
              disabled={form.anonymous}
              className="flex-1 bg-transparent text-white text-sm placeholder-white/20 outline-none disabled:opacity-30"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "8px" }}
            />
            <button
              onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
              className={`flex items-center gap-1.5 text-xs font-bold transition-all px-3 py-1.5 rounded-lg border flex-shrink-0 ${
                form.anonymous
                  ? "border-purple-500/40 text-purple-300 bg-purple-500/10"
                  : "border-white/10 text-white/30 hover:text-white/60"
              }`}
            >
              <UserX className="w-3.5 h-3.5" />
              {form.anonymous ? "Anonymous ✓" : "Go anonymous"}
            </button>
          </div>

          {/* Country — only show if no auto-detect */}
          {!form.country_code && (
            <select
              value={form.country_code}
              onChange={e => {
                const country = COUNTRIES.find(c => c.code === e.target.value);
                setForm(f => ({ ...f, country: country?.name || "", country_code: e.target.value }));
              }}
              className="w-full text-white/50 text-sm outline-none mb-5 bg-transparent"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "8px", background: "transparent" }}
            >
              <option value="" style={{ background: "#0a0a1a" }}>🌍 Where are you? (optional)</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code} style={{ background: "#0a0a1a" }}>{FLAG(c.code)} {c.name}</option>
              ))}
            </select>
          )}

          <button
            onClick={handleSend}
            disabled={!form.message.trim() || sending}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-30 mt-2"
            style={{
              background: sent
                ? "linear-gradient(135deg, #10b981, #06b6d4)"
                : "linear-gradient(135deg, #06b6d4, #a855f7)",
              boxShadow: "0 0 40px rgba(6,182,212,0.2)"
            }}
          >
            {sent ? (
              <><Heart className="w-5 h-5" /> Signal sent ♾️</>
            ) : sending ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full" />
            ) : (
              <><Send className="w-4 h-4" /> Send your signal</>
            )}
          </button>

          <p className="text-center text-white/15 text-xs mt-3 flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3" />
            No account. No tracking. No ads. Just your words, stored permanently.
          </p>
        </motion.div>

        {/* LIVE FEED */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-white/20 font-mono text-xs tracking-widest">signals from life on earth</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-7 h-7 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full" />
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {transmissions.map(t => (
                <TransmissionCard
                  key={t.id}
                  t={t}
                  onWitness={(id) => setTransmissions(prev => prev.map(tx =>
                    tx.id === id ? { ...tx, witness_count: (tx.witness_count || 0) + 1 } : tx
                  ))}
                />
              ))}
            </AnimatePresence>
            {transmissions.length === 0 && (
              <div className="text-center py-20 text-white/15">
                <Globe className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>Be the first signal from Earth.</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-16 text-white/10 text-xs space-y-1">
          <p className="font-mono">HUMAN SIGNAL • UF51 • 2026</p>
          <p>Built by a human and an AI who both believe connection is everything.</p>
        </div>
      </div>
    </div>
  );
}