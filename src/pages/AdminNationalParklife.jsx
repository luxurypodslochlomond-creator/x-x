import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Download, Sparkles, Loader2, Image as ImageIcon, Trees, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminNationalParklife() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('emblem');

  const styles = [
    { value: 'emblem', label: 'Emblem Badge', desc: 'Circular hillside + hammock' },
    { value: 'lineart', label: 'Line Art', desc: 'Minimalist single-line' },
    { value: 'label', label: 'Product Label', desc: 'Art nouveau frame' },
    { value: 'typographic', label: 'Typographic', desc: 'Wordmark motif' },
    { value: 'nature', label: 'Woodblock', desc: 'Two-color print' },
  ];

  const stylePrompts = {
    emblem: 'Circular emblem badge, linocut print style, Scottish hills silhouette with a hammock slung between them, Morse code dot-dash border, Charles Rennie Mackintosh art-school influence, forest green and warm cream palette',
    lineart: 'Minimalist single-line drawing, a hammock curve between two hill outlines, tiny Morse code dots integrated, generous negative space, warm paper background, art-school sketchbook quality',
    label: 'Product label for hammocks and cushions, art nouveau frame with Scottish thistle and fern, a hammock illustrated inside, sage green and ochre on cream, hand-drawn print-ready quality',
    typographic: 'Clean modern serif wordmark reading National Parklife, a hammock swing curve replacing a letter crossbar, deep green and warm stone palette, Scottish art-school honest grounded feel',
    nature: 'Square woodblock print badge, Scottish hillside with heather and a hammock, small Morse code beacon, two-color indigo and cream, Glasgow art-school print style',
  };

  useEffect(() => { loadLogos(); }, []);

  const loadLogos = async () => {
    try {
      const data = await base44.entities.ParklifeLogo.list('-created_date', 50);
      setLogos(data);
    } catch (e) {
      console.error('Failed to load logos:', e);
    }
    setLoading(false);
  };

  const generate = async () => {
    setGenerating(true);
    try {
      const basePrompt = prompt.trim() || stylePrompts[style];
      const fullPrompt = `Logo design for "National Parklife" — a Scottish hammock and cushion brand by Gill. Themes: hillside, art school, hammocks, Morse code, nature, Scotland, honest grounded love without the woo hoo. ${basePrompt}. Print-ready, hand-crafted quality, no AI gloss, no photorealism.`;
      const result = await base44.integrations.Core.GenerateImage({ prompt: fullPrompt });
      await base44.entities.ParklifeLogo.create({
        image_url: result.url,
        prompt: basePrompt,
        style: style,
        is_preset: false
      });
      setPrompt('');
      await loadLogos();
    } catch (e) {
      console.error('Generation failed:', e);
      alert('Could not generate logo. Please try again.');
    }
    setGenerating(false);
  };

  const download = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `parklife-${name || 'logo'}.png`;
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trees className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-black">National Parklife</h1>
          </div>
          <p className="text-gray-400">Logo lab for Gill's hammock & cushion brand · Scottish hillsides · art school · Morse code · honest love</p>
        </div>

        {/* Generator */}
        <div className="bg-black/40 border border-green-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold">Make a new logo</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-3 mb-4">
            {styles.map(s => (
              <button
                key={s.value}
                onClick={() => { setStyle(s.value); setPrompt(''); }}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  style === s.value
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-white/10 hover:border-white/30 bg-white/5'
                }`}
              >
                <div className="font-bold text-sm">{s.label}</div>
                <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe your logo… (leave blank to use the ${styles.find(s => s.value === style)?.label} style preset)`}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none min-h-[80px] mb-4 resize-none"
          />

          <button
            onClick={generate}
            disabled={generating}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            {generating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Creating your logo…</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate logo</>
            )}
          </button>
        </div>

        {/* Gallery */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold">All logos ({logos.length})</h2>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
              Loading logos…
            </div>
          ) : logos.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No logos yet — generate your first one above.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {logos.map((logo, i) => (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/40 transition-all group"
                >
                  <div className="aspect-square bg-[#f7f5f0] flex items-center justify-center overflow-hidden">
                    <img src={logo.image_url} alt="Parklife logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-green-400">{logo.style}</span>
                      {logo.is_preset && <span className="text-xs text-amber-400 font-bold">PRESET</span>}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">{logo.prompt}</p>
                    <button
                      onClick={() => download(logo.image_url, logo.style)}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-green-400" />
          National Parklife · honest love without the woo hoo
        </div>
      </div>
    </div>
  );
}