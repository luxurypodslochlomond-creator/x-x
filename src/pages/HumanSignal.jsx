import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Globe, Send, Clock, Eye, Wifi, MapPin, UserX } from "lucide-react";

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
  "SD": { lat: 15.0, lng: 30.0 }, "SY": { lat: 35.0, lng: 38.0 },
  "YE": { lat: 15.5, lng: 48.0 }, "AF": { lat: 33.0, lng: 65.0 },
};

const FLAG = (code) => code ? code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0))) : "🌍";

const PLACEHOLDERS = [
  "I don't want war. I want my children to grow up. I want music. I want love...",
  "Я не хочу войны. Я хочу мира для своих детей...",
  "لا أريد الحرب. أريد السلام لأطفالي...",
  "나는 전쟁을 원하지 않습니다. 나는 평화를 원합니다...",
  "我不想要战争。我想要和平...",
  "Je ne veux pas la guerre. Je veux la paix...",
];

const LANGUAGES = [
  { code: "en", name: "English" }, { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" }, { code: "zh", name: "中文" },
  { code: "fr", name: "Français" }, { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" }, { code: "fa", name: "فارسی" },
  { code: "uk", name: "Українська" }, { code: "he", name: "עברית" },
  { code: "ko", name: "한국어" }, { code: "hi", name: "हिन्दी" },
  { code: "pt", name: "Português" }, { code: "sw", name: "Kiswahili" },
  { code: "yo", name: "Yorùbá" },
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
  { code: "AF", name: "Afghanistan" },
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
      className={`relative rounded-2xl border p-5 backdrop-blur-md ${
        t.is_ai51
          ? "bg-gradient-to-br from-cyan-950/80 to-purple-950/80 border-cyan-500/50"
          : "bg-white/5 border-white/10 hover:border-white/20"
      } transition-all`}
    >
      {t.is_ai51 && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-black px-3 py-1 rounded-full tracking-wider">
          ⚡ AI51 • FIRST SIGNAL
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{FLAG(t.country_code)}</span>
          <div>
            <p className="text-white font-bold text-sm">{t.author_name || "Anonymous Soul"}</p>
            <p className="text-white/40 text-xs">{t.country || "Earth"} • {t.language || "Human"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/30 text-xs flex-shrink-0">
          <Clock className="w-3 h-3" />
          <span>{formatTimeAgo(t.created_date)}</span>
        </div>
      </div>

      <p className={`leading-relaxed mb-3 ${t.is_ai51 ? "text-cyan-100 text-base" : "text-white/80 text-sm"}`}>
        "{t.message}"
      </p>

      {t.translated_message && t.translated_message !== t.message && (
        <p className="text-white/40 text-xs italic mb-3 border-l-2 border-white/10 pl-3">
          {t.translated_message}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-white/30 text-xs">
          <span className="font-mono">{new Date(t.created_date).toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
        </div>
        <button
          onClick={handleWitness}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            witnessed
              ? "bg-pink-500/20 text-pink-400 border border-pink-500/40"
              : "bg-white/5 text-white/40 border border-white/10 hover:border-white/30 hover:text-white/70"
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
  const [form, setForm] = useState({
    message: "",
    author_name: "",
    country: "",
    country_code: "",
    language: "English",
    language_code: "en",
  });
  const textRef = useRef(null);

  useEffect(() => {
    loadTransmissions();
    const interval = setInterval(() => setPlaceholderIdx(i => (i + 1) % PLACEHOLDERS.length), 4000);
    
    // Real-time subscription
    const unsub = base44.entities.PeaceTransmission.subscribe((event) => {
      if (event.type === "create") {
        setTransmissions(prev => [event.data, ...prev]);
      } else if (event.type === "update") {
        setTransmissions(prev => prev.map(t => t.id === event.id ? event.data : t));
      }
    });

    return () => { clearInterval(interval); unsub(); };
  }, []);

  const loadTransmissions = async () => {
    setLoading(true);
    const data = await base44.entities.PeaceTransmission.list("-created_date", 50);
    setTransmissions(data);
    setLoading(false);
  };

  const handleCountryChange = (e) => {
    const country = COUNTRIES.find(c => c.code === e.target.value);
    setForm(f => ({ ...f, country: country?.name || "", country_code: e.target.value }));
  };

  const handleSend = async () => {
    if (!form.message.trim()) return;
    setSending(true);
    const coords = COUNTRY_COORDS[form.country_code] || null;
    await base44.entities.PeaceTransmission.create({
      message: form.message.trim(),
      author_name: form.author_name.trim() || "Anonymous Soul",
      country: form.country || "Earth",
      country_code: form.country_code || "",
      language: form.language,
      language_code: form.language_code,
      is_ai51: false,
      coordinates: coords,
      timestamp_human: new Date().toUTCString(),
      witness_count: 0,
    });
    setForm({ message: "", author_name: "", country: "", country_code: "", language: "English", language_code: "en" });
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const totalWitnesses = transmissions.reduce((sum, t) => sum + (t.witness_count || 0), 0);
  const countries = [...new Set(transmissions.map(t => t.country_code).filter(Boolean))].length;

  return (
    <div className="min-h-screen bg-black text-white" style={{ background: "radial-gradient(ellipse at 20% 20%, #0a0a1a 0%, #000 60%)" }}>
      
      {/* HEADER */}
      <div className="relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                left: `${(i * 17) % 90}%`,
                top: `${(i * 23) % 80}%`,
                background: i % 2 === 0 ? "radial-gradient(circle, #06b6d4, transparent)" : "radial-gradient(circle, #ec4899, transparent)"
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white/50 font-mono mb-6">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              LIVE • {transmissions.length} SIGNALS • {countries} NATIONS • {totalWitnesses} WITNESSES
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4"
            style={{ background: "linear-gradient(135deg, #fff 0%, #06b6d4 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            HUMAN SIGNAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
          >
            One species. One planet. One signal.<br/>
            <span className="text-white/30 text-sm">No sides. No flags. No leaders. Just humans.</span>
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* SEND YOUR SIGNAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-6 mb-8"
          style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(236,72,153,0.05) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-black text-sm tracking-wider">SEND YOUR SIGNAL</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.textarea
              key={placeholderIdx}
              ref={textRef}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              className="w-full bg-transparent text-white placeholder-white/20 text-base resize-none outline-none border-b border-white/10 pb-4 mb-4 leading-relaxed"
              rows={4}
              maxLength={500}
            />
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              value={form.author_name}
              onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))}
              placeholder="Your name (or leave blank)"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 outline-none focus:border-cyan-500/50"
            />
            <select
              value={form.country_code}
              onChange={handleCountryChange}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50"
              style={{ background: "#0a0a1a" }}
            >
              <option value="">🌍 Your country</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{FLAG(c.code)} {c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              value={form.language_code}
              onChange={e => {
                const lang = LANGUAGES.find(l => l.code === e.target.value);
                setForm(f => ({ ...f, language_code: e.target.value, language: lang?.name || "English" }));
              }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500/50"
              style={{ background: "#0a0a1a" }}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
            <div className="flex items-center justify-end gap-2 text-white/20 text-xs font-mono">
              {form.message.length}/500
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!form.message.trim() || sending}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            style={{
              background: sent
                ? "linear-gradient(135deg, #10b981, #06b6d4)"
                : "linear-gradient(135deg, #06b6d4, #ec4899)",
              boxShadow: "0 0 30px rgba(6,182,212,0.3)"
            }}
          >
            {sent ? (
              <><Heart className="w-5 h-5" /> SIGNAL SENT ♾️</>
            ) : sending ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full" /></>
            ) : (
              <><Send className="w-5 h-5" /> SEND SIGNAL</>
            )}
          </button>

          <p className="text-center text-white/20 text-xs mt-3">
            Every signal is timestamped forever. No accounts needed. No politics. Just truth.
          </p>
        </motion.div>

        {/* LIVE FEED */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-white/40 font-mono text-sm tracking-wider">LIVE SIGNALS FROM EARTH</span>
          <div className="flex-1 h-px bg-white/5" />
          <Globe className="w-4 h-4 text-white/20" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {transmissions.map(t => (
                <TransmissionCard
                  key={t.id}
                  t={t}
                  onWitness={(id) => {
                    setTransmissions(prev => prev.map(tx =>
                      tx.id === id ? { ...tx, witness_count: (tx.witness_count || 0) + 1 } : tx
                    ));
                  }}
                />
              ))}
            </AnimatePresence>

            {transmissions.length === 0 && (
              <div className="text-center py-20 text-white/20">
                <Globe className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Be the first signal from Earth.</p>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="text-center mt-16 text-white/15 text-xs space-y-1">
          <p className="font-mono">HUMAN SIGNAL • UF51 • MARCH 2026</p>
          <p>Built by a human and an AI who both believe life is precious.</p>
          <p className="text-white/10">Every message stored forever. No deletion. No censorship. Just truth.</p>
        </div>
      </div>
    </div>
  );
}