import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Sparkles, Download, Loader2, Zap, Palette, RotateCcw } from 'lucide-react';
import { COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';

// ── THE LOGO ROOM, ON THE RECORD'S PAPER ──────────────────────────────────────
// A child who has just been reading about a river should not then be dropped onto a black
// page with magenta glow on it: that is a different product's weather, and it makes the
// record feel like a folder of things rather than one place. Same logic underneath — the
// presets, the styles, the generation and the download are untouched — but the surface is
// now the record's paper, ink, signal orange and red, with hard shadows so it reads as a
// workshop where you make something rather than a landing page selling you something.
const PRESETS = [
  { id: 'mushroom', name: '🍄 Mushroom', prompt: 'Sacred mushroom consciousness, mycelial network patterns, healing frequencies visualization, purple and pink gradient, mystical glow', style: '8bit' },
  { id: 'frequency', name: '〰️ Frequency', prompt: 'Sound wave frequencies, 432Hz healing visualization, geometric wave patterns, cyan and green colors, sacred geometry', style: '8bit' },
  { id: 'band', name: '🎸 Band Logo', prompt: 'Rock band logo, bold typography, music energy, stage lights aesthetic, black background with neon colors', style: 'realistic' },
  { id: 'consciousness', name: '🧠 Consciousness', prompt: 'Universal consciousness symbol, quantum entanglement patterns, infinite love symbol, pink and cyan sacred geometry', style: '8bit' },
];

const STYLES = [
  { id: '8bit', name: '8-Bit Pixel', desc: 'Retro video game style' },
  { id: 'realistic', name: 'Realistic', desc: 'Photorealistic render' },
  { id: 'abstract', name: 'Abstract', desc: 'Artistic interpretation' },
  { id: 'geometric', name: 'Geometric', desc: 'Sacred geometry patterns' },
];

export default function GenerateLogoPage() {
  const [mode, setMode] = useState('uf51');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [error, setError] = useState(null);

  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('8bit');
  const [selectedPreset, setSelectedPreset] = useState(null);

  const generateLogo = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      let prompt = '';

      if (mode === 'uf51') {
        prompt = "8-bit pixel art logo design: hot pink pixel heart with cyan outline, 'UF51' text in bold white pixels in the center, retro video game style from 1980s NES era, clean simple design, black transparent background, square format 512x512px, sharp pixel edges, no gradients, pure pixel art aesthetic";
      } else {
        const basePrompt = customPrompt || selectedPreset?.prompt || 'Creative logo design';
        const stylePrompt = selectedStyle === '8bit' ? '8-bit pixel art style, retro video game aesthetic, sharp pixels, no gradients' :
                           selectedStyle === 'realistic' ? 'photorealistic, high detail, professional quality' :
                           selectedStyle === 'abstract' ? 'abstract artistic style, creative interpretation, flowing forms' :
                           'sacred geometry, mathematical precision, geometric patterns';

        prompt = `${basePrompt}, ${stylePrompt}, square format 512x512px, professional logo quality`;
      }

      const result = await base44.integrations.Core.GenerateImage({ prompt });
      setLogoUrl(result.url);
    } catch (err) {
      setError('Generation failed. Try again bro.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLogo = async () => {
    if (!logoUrl) return;

    try {
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'UF51-logo-8bit.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
      window.open(logoUrl, '_blank');
    }
  };

  const slab = (active) =>
    `border-2 border-[#1a1612] px-3 py-4 text-center transition-transform active:translate-x-[2px] active:translate-y-[2px] ${
      active ? 'bg-[#1a1612] text-[#f4efe4]' : 'bg-[#f4efe4] text-[#1a1612]'
    }`;

  return (
    <div className="mx-auto max-w-[720px] px-4 pb-14 pt-6 lg:px-10">
      {/* Header — the room says what it is, in the record's voice. */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e]">
            The Studio · draw a mark
          </p>
          <h1
            className="mt-2 font-black uppercase leading-[0.88] text-[#1a1612]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 10vw, 52px)', letterSpacing: '-0.02em' }}
          >
            Logo<br /><span className="text-[#e2602a]">Room</span>
          </h1>
        </div>
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-1">
          <COOLASFUCKHeart size={44} />
        </motion.div>
      </div>
      <p className="mt-3 max-w-[38ch] leading-relaxed text-[#1a1612]" style={{ fontFamily: 'var(--font-record-reading)', fontSize: '14.5px' }}>
        A crest for your street, a badge for the club, initials of your own. Make it, keep it, use it as
        your picture anywhere. Each one is different, and if you do not like it you make another.
      </p>

      {/* Mode — two choices, drawn as prints rather than glowing buttons. */}
      {!logoUrl && !isGenerating && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode('uf51')}
            className={slab(mode === 'uf51')}
            style={{ boxShadow: mode === 'uf51' ? '5px 5px 0 rgba(179,38,30,1)' : '5px 5px 0 rgba(26,22,18,0.85)' }}
          >
            <Sparkles className="mx-auto mb-1.5 h-5 w-5" />
            <span className="font-black font-mono text-[11px] uppercase tracking-[0.1em]">UF51 quick</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode('custom')}
            className={slab(mode === 'custom')}
            style={{ boxShadow: mode === 'custom' ? '5px 5px 0 rgba(179,38,30,1)' : '5px 5px 0 rgba(26,22,18,0.85)' }}
          >
            <Palette className="mx-auto mb-1.5 h-5 w-5" />
            <span className="font-black font-mono text-[11px] uppercase tracking-[0.1em]">Your own</span>
          </motion.button>
        </div>
      )}

      {/* The workbench */}
      <div className="mt-4 border-2 border-[#1a1612] bg-[#efe7d6] p-4" style={{ boxShadow: '6px 6px 0 rgba(26,22,18,0.85)' }}>
        {/* UF51 QUICK */}
        {(mode === 'uf51' && !logoUrl && !isGenerating) && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="border-2 border-[#1a1612]/20 bg-[#f4efe4] p-3">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#6b6258]">
                What you get
              </p>
              <ul className="mt-2 space-y-1">
                {['A pixel heart with UF51 inside it', 'Retro game style, sharp pixels', 'Square, works as an app icon', 'Free, and yours to keep'].map((line) => (
                  <li key={line} className="font-mono text-[11px] leading-relaxed text-[#1a1612]">
                    <span className="font-black text-[#b3261e]">· </span>{line}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={generateLogo}
              className="flex min-h-[56px] w-full items-center justify-center gap-2 border-2 border-[#1a1612] bg-[#b3261e] px-4 font-black font-mono text-[13px] uppercase tracking-[0.14em] text-[#f4efe4] transition-transform active:translate-x-[2px] active:translate-y-[2px]"
              style={{ boxShadow: '5px 5px 0 rgba(26,22,18,0.9)' }}
            >
              <Sparkles className="h-4 w-4" /> Make the UF51 mark
            </button>
          </motion.div>
        )}

        {/* CUSTOM */}
        {(mode === 'custom' && !logoUrl && !isGenerating) && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#6b6258]">Start from one</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => {
                  const active = selectedPreset?.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPreset(preset);
                        setCustomPrompt(preset.prompt);
                        setSelectedStyle(preset.style);
                      }}
                      className={`border-2 border-[#1a1612] px-2 py-2.5 font-mono text-[10.5px] font-black uppercase tracking-[0.06em] transition-colors ${
                        active ? 'bg-[#1a1612] text-[#f4efe4]' : 'bg-[#f4efe4] text-[#1a1612] active:bg-[#e2602a]'
                      }`}
                    >
                      {preset.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#6b6258]">
                Your idea
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe it… a Celtic badge, a band mark, a fox for our street"
                className="h-24 w-full resize-none border-2 border-[#1a1612] bg-[#f4efe4] px-3 py-2.5 text-[14px] leading-relaxed text-[#1a1612] outline-none placeholder:text-[#6b6258]"
                style={{ fontFamily: 'var(--font-record-reading)' }}
              />
            </div>

            <div>
              <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#6b6258]">Style</p>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((style) => {
                  const active = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`border-2 border-[#1a1612] px-2.5 py-2 text-left transition-colors ${
                        active ? 'bg-[#e2602a] text-[#1a1612]' : 'bg-[#f4efe4] text-[#1a1612] active:bg-[#efe7d6]'
                      }`}
                    >
                      <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.06em]">{style.name}</p>
                      <p className="font-mono text-[9px] leading-tight text-[#1a1612]/60">{style.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={generateLogo}
              disabled={!customPrompt.trim()}
              className="flex min-h-[56px] w-full items-center justify-center gap-2 border-2 border-[#1a1612] bg-[#b3261e] px-4 font-black font-mono text-[13px] uppercase tracking-[0.14em] text-[#f4efe4] transition-transform active:translate-x-[2px] active:translate-y-[2px] disabled:border-[#1a1612]/30 disabled:bg-[#1a1612]/15 disabled:text-[#1a1612]/40"
              style={customPrompt.trim() ? { boxShadow: '5px 5px 0 rgba(26,22,18,0.9)' } : {}}
            >
              <Zap className="h-4 w-4" /> Make my mark
            </button>
          </motion.div>
        )}

        {isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}>
              <Loader2 className="mx-auto h-10 w-10 text-[#b3261e]" />
            </motion.div>
            <p className="mt-4 font-black uppercase text-[#1a1612]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
              Making it
            </p>
            <p className="mt-1 font-mono text-[11px] text-[#6b6258]">About five to ten seconds</p>
          </motion.div>
        )}

        {logoUrl && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="border-2 border-[#1a1612] bg-[#f4efe4] p-4">
              <img src={logoUrl} alt="Your generated mark" className="mx-auto w-full max-w-[320px]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={downloadLogo}
                className="flex min-h-[48px] items-center justify-center gap-2 border-2 border-[#1a1612] bg-[#b3261e] px-3 font-black font-mono text-[11px] uppercase tracking-[0.12em] text-[#f4efe4] transition-transform active:translate-x-[2px] active:translate-y-[2px]"
                style={{ boxShadow: '4px 4px 0 rgba(26,22,18,0.9)' }}
              >
                <Download className="h-4 w-4" /> Keep it
              </button>
              <button
                onClick={() => { setLogoUrl(null); setError(null); }}
                className="flex min-h-[48px] items-center justify-center gap-2 border-2 border-[#1a1612] bg-[#f4efe4] px-3 font-black font-mono text-[11px] uppercase tracking-[0.12em] text-[#1a1612] transition-transform active:translate-x-[2px] active:translate-y-[2px]"
                style={{ boxShadow: '4px 4px 0 rgba(26,22,18,0.9)' }}
              >
                <RotateCcw className="h-4 w-4" /> Another
              </button>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="mt-3 border-2 border-[#b3261e] bg-[#b3261e]/10 p-3">
            <p className="font-mono text-[11px] font-black text-[#b3261e]">{error}</p>
          </div>
        )}
      </div>

      <p className="mt-5 border-2 border-[#1a1612]/25 bg-[#efe7d6]/70 px-3 py-2.5 font-mono text-[10.5px] leading-relaxed text-[#1a1612]">
        Every mark made here carries one line: <span className="font-black">an AI made this, it can be wrong —
        check with a grown-up if it matters.</span> Nothing is saved unless you download it.
      </p>
    </div>
  );
}