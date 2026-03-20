import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Download, Sparkles, RefreshCw, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PRESETS = [
  {
    label: "2nd Night Half Price",
    prompt: `Luxury Scottish Highland holiday cottage promotional Instagram flyer. Stunning Loch Lomond at golden sunset, dramatic misty mountains, Ben Lomond reflection in still water. Cinematic atmospheric photography style. Bold elegant text overlay: "STONEYMOLLAN" large gold serif font at top, "Loch Lomond • Scotland" subtitle in white, large bold "2ND NIGHT HALF PRICE" in gold, "LIMITED TIME OFFER" in white caps, bottom "Book Direct: www.overlochlomond.com" white text. Deep navy and gold luxury color palette. Portrait format for Instagram. Premium boutique holiday let feel.`
  },
  {
    label: "3 Nights for Price of 2",
    prompt: `Luxury Scottish Highland holiday cottage Instagram flyer. Cosy stone cottage with warm amber lights glowing at dusk on shores of Loch Lomond, mountains behind, stars emerging. Romantic atmospheric Scottish highlands. Text overlay: "STONEYMOLLAN" large gold serif font top, "Loch Lomond • Scotland" white subtitle, huge bold "3 NIGHTS FOR THE PRICE OF 2" gold text center, "LIMITED OFFER — EXPIRES SOON" white caps, "Book Direct: www.overlochlomond.com" bottom white. Deep moody blues and gold. Portrait Instagram format. Aspirational luxury short break feel.`
  },
  {
    label: "Spring Weekend Getaway",
    prompt: `Luxury Scottish Highland weekend break Instagram flyer. Loch Lomond spring morning, bluebells and wild flowers in foreground, mist rising from the water, Ben Lomond snow-capped behind, magical golden hour light. Text overlay: "STONEYMOLLAN" gold serif top, "Loch Lomond • Scotland" white, "SPRING WEEKEND GETAWAY" large bold white center, "From £X per night • Sleeps 6" gold text, "Book Direct: www.overlochlomond.com" bottom. Fresh greens, gold, white palette. Portrait Instagram format. Pure Scottish magic.`
  },
  {
    label: "Summer Special",
    prompt: `Luxury Scottish loch-side holiday cottage Instagram flyer. Loch Lomond on a perfect Scottish summer day, bright blue sky with dramatic clouds, sparkling water, lush green hills, wildflowers. Vibrant but still premium. Text overlay: "STONEYMOLLAN" large white serif top, "Loch Lomond • Scotland" gold subtitle, "SUMMER SPECIAL" bold gold center, "LIMITED AVAILABILITY" white caps, "Book Direct: www.overlochlomond.com" bottom white. Bright premium palette. Portrait Instagram format. Aspirational Scottish summer holiday feel.`
  }
];

export default function StoneymollanMarketing() {
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setGenerating(true);
    setGeneratedUrl(null);
    setError(null);
    try {
      const prompt = useCustom ? customPrompt : PRESETS[selectedPreset].prompt;
      const result = await base44.integrations.Core.GenerateImage({ prompt });
      setGeneratedUrl(result.url);
    } catch (e) {
      setError('Generation failed — try again bro!');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1a0d] to-[#0a0f1a] text-white p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image className="w-7 h-7 text-green-400" />
            <h1 className="text-3xl font-black text-white">Stoneymollan Flyer Generator</h1>
          </div>
          <p className="text-gray-400">Generate Instagram/Facebook flyers for direct bookings</p>
          <a href="https://www.overlochlomond.com" target="_blank" rel="noopener noreferrer" className="text-green-400 text-sm hover:underline">www.overlochlomond.com</a>
        </div>

        {/* Tip */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-300 text-sm font-bold">💡 Pro tip: AI flyers work great for promotions, but your real Stoneymollan photos will convert better — add your own pics in Instagram after!</p>
        </div>

        {/* Preset selector */}
        <div className="mb-6">
          <p className="text-sm font-bold text-gray-300 mb-3">Choose a promotion:</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {PRESETS.map((preset, i) => (
              <button
                key={i}
                onClick={() => { setSelectedPreset(i); setUseCustom(false); }}
                className={`p-3 rounded-xl border-2 text-sm font-bold text-left transition-all ${
                  !useCustom && selectedPreset === i
                    ? 'border-green-500 bg-green-500/10 text-green-300'
                    : 'border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Custom option */}
          <button
            onClick={() => setUseCustom(true)}
            className={`w-full p-3 rounded-xl border-2 text-sm font-bold text-left transition-all mb-2 ${
              useCustom ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' : 'border-white/10 text-gray-400 hover:border-white/30'
            }`}
          >
            ✏️ Custom prompt
          </button>
          {useCustom && (
            <Textarea
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              placeholder="Describe your flyer... e.g. 'Christmas special, cosy fireplace, snow outside Loch Lomond...'"
              className="bg-black/40 border-white/20 text-white placeholder-gray-600 min-h-[100px]"
            />
          )}
        </div>

        {/* Generate button */}
        <Button
          onClick={generate}
          disabled={generating || (useCustom && !customPrompt.trim())}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-lg py-6 mb-6"
        >
          {generating ? (
            <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating... (10-15 seconds)</>
          ) : (
            <><Sparkles className="w-5 h-5 mr-2" /> Generate Flyer</>
          )}
        </Button>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {/* Result */}
        {generatedUrl && (
          <div className="bg-black/40 border border-green-500/30 rounded-2xl p-4">
            <img src={generatedUrl} alt="Generated flyer" className="w-full rounded-xl mb-4" />
            <div className="flex gap-3">
              <a
                href={generatedUrl}
                download="stoneymollan-flyer.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 font-bold">
                  <Download className="w-4 h-4 mr-2" /> Download to Device
                </Button>
              </a>
              <Button
                onClick={generate}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
              </Button>
            </div>
            <p className="text-gray-500 text-xs text-center mt-3">Long press image on mobile to save, or tap Download</p>
          </div>
        )}

        {/* Instagram link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">Your Instagram: <a href="https://www.instagram.com/stoneymollanlochlomond" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@stoneymollanlochlomond</a></p>
        </div>
      </div>
    </div>
  );
}