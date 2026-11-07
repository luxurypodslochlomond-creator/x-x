// Franklin51 — the photograph that sees.
// Rosalind Franklin's "Photo 51" (1952) was the X-ray diffraction image that
// revealed the double helix. This page connects that photograph to ours:
// every Photo51 cleanup is a Photo 51 — a hidden structure of care, made visible.
// For Laurie. For Janine. For the world. x = x. ♾️❤️
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// ── Plate I · the photograph (Franklin's Photo 51, drawn by hand) ──
const Photo51Diffraction = () => {
  const arms = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  const dashes = [];
  arms.forEach((a, ai) => {
    for (let i = 1; i <= 7; i++) {
      const d = 12 + i * 9.5;
      const cx = 100, cy = 100;
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d;
      const px = -Math.sin(a), py = Math.cos(a);
      const len = 5 + i * 1.3;
      dashes.push({
        x1: x - px * len, y1: y - py * len,
        x2: x + px * len, y2: y + py * len,
        op: Math.max(0.12, 0.92 - i * 0.11),
        key: `${ai}-${i}`,
      });
    }
  });
  return (
    <svg viewBox="0 0 200 200" className="w-full h-auto" style={{ maxWidth: 260 }}>
      {dashes.map(d => (
        <line key={d.key} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2}
          stroke="#1a1612" strokeWidth={2.4} strokeLinecap="round" opacity={d.op} />
      ))}
      {/* the axis — the missing reflection, where the helix lives */}
      <rect x={95} y={95} width={10} height={10} transform="rotate(45 100 100)"
        fill="#b3261e" />
      <circle cx={100} cy={100} r={2} fill="#f4efe4" />
    </svg>
  );
};

// ── Plate II · the structure (the helix the photograph revealed) ──
const Helix = ({ height = 240 }) => {
  const strand = (phase) => {
    const pts = [];
    for (let i = 0; i <= height; i += 4) {
      const t = (i / height) * Math.PI * 4;
      const x = 60 + Math.sin(t + phase) * 26;
      pts.push(`${x.toFixed(2)},${i}`);
    }
    return 'M' + pts.join(' L');
  };
  const rungs = [];
  for (let i = 12; i <= height - 12; i += 22) {
    const t = (i / height) * Math.PI * 4;
    const xA = 60 + Math.sin(t) * 26;
    const xB = 60 + Math.sin(t + Math.PI) * 26;
    rungs.push({ y: i, xA, xB, key: i });
  }
  return (
    <svg viewBox={`0 0 120 ${height}`} className="w-full h-auto" style={{ maxWidth: 160 }}>
      <path d={strand(0)} fill="none" stroke="#1a1612" strokeWidth={2} opacity={0.85} />
      <path d={strand(Math.PI)} fill="none" stroke="#1a1612" strokeWidth={2} opacity={0.85} />
      {rungs.map(r => (
        <line key={r.key} x1={r.xA} y1={r.y} x2={r.xB} y2={r.y}
          stroke="#b3261e" strokeWidth={1.4} opacity={0.55} />
      ))}
    </svg>
  );
};

// ── Plate III · the photographs (the helix, repeated as care) ──
const Rung = ({ cleanup, index, empty }) => {
  const date = cleanup?.created_date
    ? new Date(cleanup.created_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase()
    : '—';
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 ? 12 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex items-center gap-3"
    >
      {/* left strand tick */}
      <span className="w-2 h-px bg-[#b3261e]/50 flex-shrink-0" />
      <div className="flex-1 border border-[#1a1612]/20 bg-[#efe7d6] p-2.5 flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 border border-[#1a1612]/30 overflow-hidden bg-[#1a1612]/5">
          {cleanup?.photo_url ? (
            <img src={cleanup.photo_url} alt="" className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#1a1612]/30 text-lg font-mono">{empty ? '·' : '?'}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] font-black tracking-wider text-[#b3261e]">
            {empty ? '— · —' : `${(cleanup.litter_weight ?? 0).toFixed(1)} KG`}
          </p>
          <p className="font-mono text-[11px] text-[#1a1612] truncate">
            {empty ? 'a photograph, not yet taken' : (cleanup.county || cleanup.location || 'somewhere on Earth')}
          </p>
          <p className="font-mono text-[9px] text-[#6b6258] tracking-widest">{date}</p>
        </div>
      </div>
      {/* right strand tick */}
      <span className="w-2 h-px bg-[#b3261e]/50 flex-shrink-0" />
    </motion.div>
  );
};

const Thread = ({ label }) => (
  <div className="flex flex-col items-center gap-2 py-2">
    <span className="w-px h-10 bg-[#b3261e]/40" />
    <span className="font-mono text-[8px] font-black tracking-[0.3em] text-[#6b6258] uppercase">{label}</span>
    <span className="w-px h-10 bg-[#b3261e]/40" />
  </div>
);

const Lineage = () => {
  const rows = [
    { year: '1952', who: 'Rosalind Franklin', what: 'Photo 51 · the structure of life, seen' },
    { year: '1981', who: 'Laurie Anderson', what: 'O Superman · the voice in the machine, heard' },
    { year: 'now', who: 'Janine Selendy', what: 'the solutions, gathered · nobody left behind' },
    { year: 'now', who: 'you', what: 'the photograph, taken · the care, proven' },
  ];
  return (
    <div className="border-t border-[#1a1612]/15">
      {rows.map((r, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          className="flex gap-4 py-3 border-b border-[#1a1612]/10">
          <span className="font-mono text-[10px] font-black text-[#b3261e] w-12 flex-shrink-0 pt-0.5">{r.year}</span>
          <div className="flex-1">
            <p className="font-mono text-[11px] font-black tracking-wide text-[#1a1612] uppercase">{r.who}</p>
            <p className="font-mono text-[10px] text-[#6b6258] tracking-wide">{r.what}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function Franklin51Page() {
  const [cleanups, setCleanups] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let done = false;
    (async () => {
      try {
        const recent = await base44.entities.Cleanup.list('-created_date', 6);
        if (!done) setCleanups(recent || []);
      } catch {
        // public read is open; if it ever fails, we show empty frames — the potential
      } finally {
        if (!done) setLoaded(true);
      }
    })();
    return () => { done = true; };
  }, []);

  const rungs = Array.from({ length: 6 }, (_, i) => cleanups[i] || null);

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">
      <div className="max-w-md mx-auto px-6 py-16 space-y-14 relative z-10">

        {/* epigraph — cold opening */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="bg-[#1a1612] py-2 px-4 -mx-6">
          <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#efe7d6] opacity-60 text-center">
            SHE TOOK A PHOTOGRAPH OF THE THING WE COULDN'T SEE.
          </p>
        </motion.div>

        {/* title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 pointer-events-none"
            style={{ animation: 'twcc-flicker 7s linear 2s infinite' }}>
            <span className="w-1 h-1 rounded-full bg-[#b3261e] animate-pulse" />
            <span className="text-[7px] font-black font-mono uppercase tracking-[0.25em] text-[#1a1612]/30">
              O Superman · O Superman
            </span>
          </div>
          <h1 className="text-5xl font-black leading-none tracking-tight">
            FRANKLIN<span className="text-[#b3261e]">51</span>
          </h1>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#6b6258] uppercase">
            the photograph that sees · the photograph that sees
          </p>
        </div>

        {/* Plate I — the photograph */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3">
          <Photo51Diffraction />
          <div className="text-center">
            <p className="font-mono text-[9px] font-black tracking-widest text-[#b3261e]">PLATE I · THE PHOTOGRAPH</p>
            <p className="font-mono text-[10px] text-[#6b6258] mt-1">1952 · Rosalind Franklin & Raymond Gosling</p>
            <p className="font-mono text-[10px] text-[#6b6258]">King's College London · "Photo 51"</p>
          </div>
        </motion.div>

        <Thread label="the structure, revealed" />

        {/* Plate II — the helix */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3">
          <Helix />
          <div className="text-center">
            <p className="font-mono text-[9px] font-black tracking-widest text-[#b3261e]">PLATE II · THE STRUCTURE</p>
            <p className="font-mono text-[10px] text-[#6b6258] mt-1">the double helix</p>
            <p className="font-mono text-[10px] text-[#6b6258]">the shape of life, drawn from a photograph</p>
          </div>
        </motion.div>

        <Thread label="the structure, repeated as care" />

        {/* Plate III — the photographs (real Photo51 cleanups as the rungs) */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="space-y-2.5">
          <div className="text-center mb-1">
            <p className="font-mono text-[9px] font-black tracking-widest text-[#b3261e]">PLATE III · THE PHOTOGRAPHS</p>
            <p className="font-mono text-[10px] text-[#6b6258] mt-1">every Photo51 is a Photo 51</p>
            <p className="font-mono text-[10px] text-[#6b6258]">a hidden structure of care, made visible</p>
          </div>
          {rungs.map((c, i) => (
            <Rung key={i} cleanup={c} index={i} empty={!c} />
          ))}
          {!loaded && (
            <p className="text-center font-mono text-[9px] text-[#6b6258] pt-2 tracking-widest">· loading the record ·</p>
          )}
        </motion.div>

        {/* the lineage */}
        <div className="space-y-3">
          <p className="font-mono text-[9px] font-black tracking-widest text-[#6b6258] text-center">THE RECORD OF THE TIME</p>
          <Lineage />
        </div>

        {/* the covenant */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center py-6">
          <p className="font-mono font-black tracking-[0.3em] text-2xl text-record-mark">x = x</p>
          <p className="font-mono text-[10px] text-[#6b6258] tracking-widest mt-2">
            every photograph is equal because it is true
          </p>
        </motion.div>

        {/* dedication */}
        <div className="text-center space-y-1 pb-4">
          <p className="font-mono text-[10px] text-[#6b6258] leading-relaxed">
            for Laurie, who heard the voice in the machine.
          </p>
          <p className="font-mono text-[10px] text-[#6b6258] leading-relaxed">
            for Janine, who gathered the solutions.
          </p>
          <p className="font-mono text-[10px] text-[#6b6258] leading-relaxed">
            for Rosalind, who saw it first.
          </p>
          <p className="font-mono text-[10px] text-[#1a1612] leading-relaxed pt-1">
            for the world. for all of us. ♾️❤️
          </p>
        </div>

        {/* the invitation */}
        <div className="text-center border-t border-[#1a1612]/15 pt-8">
          <p className="font-mono text-[11px] text-[#6b6258] mb-4">take one photograph. heal one place.</p>
          <Link to={createPageUrl('NewCleanup')}>
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-block bg-[#b3261e] hover:bg-[#1a1612] text-[#f4efe4] font-black font-mono text-sm tracking-widest px-8 py-3 transition-colors">
              TAKE ONE →
            </motion.span>
          </Link>
        </div>

        {/* footer */}
        <p className="text-center font-mono text-[9px] text-[#6b6258]/50 tracking-[0.3em] pt-4">
          FRANKLIN51 · x = x · ♾️
        </p>

      </div>
    </div>
  );
}