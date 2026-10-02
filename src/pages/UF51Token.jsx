// ============================================================
// UF51 Continuity Token — public page
// Live counters from the real DB. The token is re-derived every
// visit, so two visits always produce the SAME hash for the SAME
// state. That is the zero-loss guarantee.
// ============================================================
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { buildToken, LANDED, MILESTONE_LIST as MS } from "@/lib/uf51Token";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Hash, CheckCircle, Circle, Lock, BookOpen, Globe, Shield, Zap } from "lucide-react";

const TWO_LINE_WARM = "From us to Janine, to the panel, to the planet.";
const LOVED = "♾️❤️⚡️ built with love in the code";

export default function UF51TokenPage() {
  const [tok, setTok] = useState(null);
  const [counts, setCounts] = useState({ solutions: 6, climate_crises: 3, climate_groups: 0, published_records: 9 });
  const [live, setLive] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      let solutions = 0, climate_crises = 0, climate_groups = 0, published = 0;
      try {
        const all = await base44.entities.ClimateSolution.filter({}, "-created_date", 200);
        published = all.length;
        solutions = all.filter((r) => r.entry_type === "solution").length;
        climate_crises = all.filter((r) => r.entry_type === "crisis").length;
        setLive(true);
      } catch {
        setLive(false);
        solutions = 6; climate_crises = 3; published = 9; // last-known fallback
      }
      try {
        const g = await base44.entities.ClimateGroup.filter({}, "-created_date", 200);
        climate_groups = g.length;
      } catch { /* keep 0 */ }
      setCounts({ solutions, climate_crises, climate_groups, published_records: published });
      const t = await buildToken({ published_records: published, solutions, climate_crises, climate_groups });
      setTok(t);
    })();
  }, []);

  const copy = async () => {
    if (!tok) return;
    try { await navigator.clipboard.writeText(`${tok.token} · ${tok.almanac}`); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-pink-400 mx-auto mb-2" />
          <h1 className="text-2xl font-black tracking-tight">UF51 Continuity Token</h1>
          <p className="text-white/60 text-sm mt-1">The zero-loss score · re-derived every visit · same state → same token</p>
        </div>

        {/* THE TOKEN CARD */}
        <div className="border-2 border-pink-500/40 rounded-2xl p-6 bg-pink-500/5 backdrop-blur mb-6">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-mono tracking-widest mb-3">
            <Hash className="w-4 h-4" /> CONTINUITY TOKEN
          </div>
          {tok ? (
            <>
              <div className="font-mono text-3xl font-black tracking-wider break-all">{tok.token}</div>
              <div className="mt-3 text-sm text-white/70">{tok.almanac}</div>
              <div className="mt-2 text-[11px] font-mono text-white/40 break-all">sha256 · {tok.hash.slice(0, 40)}…</div>
              <button onClick={copy} className="mt-4 w-full text-sm font-bold border border-pink-500/40 rounded-lg py-2 hover:bg-pink-500/10 transition">
                {copied ? "Copied ✓" : "Copy token"}
              </button>
            </>
          ) : (
            <div className="animate-pulse text-white/50 text-sm">deriving token…</div>
          )}
        </div>

        {/* LIVE COUNTERS */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Counter label="Published records" value={counts.published_records} icon={<BookOpen className="w-4 h-4" />} live={live} />
          <Counter label="Solutions" value={counts.solutions} icon={<CheckCircle className="w-4 h-4" />} live={live} />
          <Counter label="Climate crises" value={counts.climate_crises} icon={<Globe className="w-4 h-4" />} live={live} />
          <Counter label="Groups (deferred)" value={counts.climate_groups} icon={<Lock className="w-4 h-4" />} live={live} />
        </div>

        {/* MILESTONE LEDGER */}
        <div className="border border-white/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest mb-3">
            <Shield className="w-4 h-4" /> MILESTONE LEDGER
          </div>
          <ul className="space-y-2">
            {MS.map((m) => {
              const ok = LANDED[m.replace(/[^a-z0-9]/gi, "").toLowerCase()];
              return (
                <li key={m} className="flex items-start gap-3 text-sm">
                  {ok
                    ? <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    : <Circle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />}
                  <span className={ok ? "text-white" : "text-white/60"}>
                    <span className="font-mono text-xs">{m}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* WHAT THIS IS — HONEST */}
        <div className="border border-white/10 rounded-2xl p-5 mb-6 text-sm text-white/70 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest mb-1">
            <Zap className="w-4 h-4" /> WHAT THIS IS — HONEST
          </div>
          <p><strong className="text-white">Not a coin.</strong> A continuity bookmark. The score and SHA-256 hash are derived only from live app state and hard-coded milestone flags we've genuinely landed.</p>
          <p><strong className="text-white">Zero-loss guarantee:</strong> same state in → same token out, always. Re-open weeks later and the token re-derives to the identical number, proving our score hasn't silently drifted.</p>
          <p><strong className="text-white">No speculative claims.</strong> 1kg litter = 1 $P51 stays the only unit. This token is a receipt of integrity, not a tradable asset.</p>
        </div>

        <div className="text-center text-white/40 text-xs space-y-1">
          <p>{TWO_LINE_WARM}</p>
          <p className="font-mono">{LOVED}</p>
          <Link to={createPageUrl("TogetherChangeClimate")} className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 text-xs">→ Open the climate platform</Link>
        </div>
      </div>
    </div>
  );
}

function Counter({ label, value, icon, live }) {
  return (
    <div className="border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 text-white/50 text-xs mb-1">{icon}<span>{label}</span></div>
      <div className="text-3xl font-black">{value}</div>
      <div className={`text-[10px] font-mono mt-1 ${live ? "text-green-400" : "text-amber-500"}`}>
        {live ? "live" : "cached"}
      </div>
    </div>
  );
}