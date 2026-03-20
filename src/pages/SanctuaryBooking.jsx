import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Copy, Check, Sparkles, RefreshCw, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const RETREAT_TYPES = [
  { key: 'reset', emoji: '🔥', name: '48hr Reset', desc: 'Sauna. Cold plunge. Silence. Sleep.' },
  { key: 'healing', emoji: '🌊', name: 'Healing Retreat', desc: 'FrequencyChamber. Nature. Recovery.' },
  { key: 'artist', emoji: '🎵', name: 'Artist Residency', desc: 'Create. Record. Collaborate.' },
  { key: 'nature', emoji: '🏔️', name: 'John Muir Hike', desc: 'Walk. Sauna. Cold water. Done.' },
];

const SCENES = {
  reset: "hyper-realistic DSLR photography, 4am misty dawn at ancient Scottish loch, wood fired sauna silhouette, steam rising into darkness, stars still visible, mirror-still water, moody cinematic, shot on Sony A7R5, no people, absolutely real",
  healing: "hyper-realistic DSLR travel photography, person standing in cold loch at sunrise, mountains reflected in dark water, mist rising, moment of pure peace, golden first light breaking through, intimate and raw, Sony A7R5",
  artist: "hyper-realistic lifestyle photography, rustic cabin interior with warm amber light, acoustic guitar leaning against stone wall, notebook, coffee, window view of Loch Lomond in distance, creative workspace, authentic, no staging",
  nature: "hyper-realistic hiking photography, dramatic Scottish Highland landscape, lone hiker on John Muir Way, Ben Lomond rising above, perfect morning light, wild untamed nature, shot on Sony A7R5 35mm, cinematic",
};

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
];

export default function SanctuaryBooking() {
  const [selectedRetreat, setSelectedRetreat] = useState(0);
  const [lang, setLang] = useState('en');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [genError, setGenError] = useState(null);

  const retreat = RETREAT_TYPES[selectedRetreat];

  const buildEnCaption = () => {
    const captions = {
      reset: "🔥 48-HOUR RESET\n\nTwo cabins. Wood fired sauna. Cold loch plunge. Silence.\n\nNo Wi-Fi guarantee. Sleep like a human again. That's the promise.\n\n📍 Stoneymollan, Loch Lomond\n⏱️ 25min from Glasgow\n🏔️ John Muir Way at your door\n\nBook: overlochlomond.com\n✉️ 10-5@overlochlomond.com\n\n#LochLomond #Scotland #Wellness #RetreatLife #HighlandEscape #RealHealing",
      healing: "🌊 HEALING RETREAT\n\nFrequency immersion in the most restorative place in Scotland.\n\nSauna. Cold plunge. FrequencyChamber sessions. Walk the John Muir Way. Sleep deeper than you have in years.\n\n📍 Stoneymollan, Loch Lomond\n⏱️ 25min from Glasgow\n🏔️ Ancient coffin road + modern wellness\n\nBook: overlochlomond.com\n✉️ 10-5@overlochlomond.com\n\n#HealingFrequency #UniversalFamily51 #Scotland #WellnessRetreat",
      artist: "🎵 ARTIST RESIDENCY\n\nTwo cabins. Infinite views. Space to create.\n\nRecord. Write. Collaborate. No distractions. Just you, nature, and your work.\n\n📍 Stoneymollan, Loch Lomond\n⏱️ 25min from Glasgow\n🏔️ Creative sanctuary\n\nBook: overlochlomond.com\n✉️ 10-5@overlochlomond.com\n\n#ArtistResidency #Scotland #CreativeRetreat #LochLomond",
      nature: "🏔️ JOHN MUIR WAY\n\nWalk one of Scotland's greatest trails. Sleep in our cabins. Wake up to mountains.\n\nSauna. Cold plunge. Silence. The simple stuff that heals.\n\n📍 Stoneymollan, Loch Lomond\n⏱️ 25min from Glasgow\n🥾 Zone 1 of the Way starts at our gate\n\nBook: overlochlomond.com\n✉️ 10-5@overlochlomond.com\n\n#JohnMuirWay #Scotland #Hiking #HighlandLife",
    };
    return captions[retreat.key] || '';
  };

  const buildCaption = async () => {
    if (lang === 'en') return buildEnCaption();
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Translate this Instagram caption for a luxury Scottish Highland retreat to ${LANGUAGES.find(l => l.code === lang)?.name}. Keep the emojis. Keep the hashtags mostly in English (just translate the obvious ones). Keep overlochlomond.com and the email unchanged.\n\n${buildEnCaption()}`,
      });
      return result;
    } catch {
      return buildEnCaption();
    }
  };

  const [captionText, setCaptionText] = React.useState('');
  const [captionLoading, setCaptionLoading] = React.useState(false);

  const getCaption = async () => {
    if (lang === 'en') {
      setCaptionText(buildEnCaption());
      return;
    }
    setCaptionLoading(true);
    const text = await buildCaption();
    setCaptionText(text);
    setCaptionLoading(false);
  };

  React.useEffect(() => {
    setCaptionText(buildEnCaption());
    setGeneratedUrl(null);
  }, [selectedRetreat]);

  React.useEffect(() => {
    getCaption();
    setGeneratedUrl(null);
  }, [lang, selectedRetreat]);

  const copyCaption = () => {
    navigator.clipboard.writeText(captionText || buildEnCaption());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateImage = async () => {
    setGenerating(true);
    setGeneratedUrl(null);
    setGenError(null);
    try {
      const prompt = `${SCENES[retreat.key]}. Portrait format 9:16 for Instagram Stories. NO TEXT overlays. NO graphics. NO artifice. Pure stunning photography that makes people feel something. This should look like something a real photographer captured that moved them. Ultra sharp, ultra real, aspirational but REAL.`;
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 50000));
      const result = await Promise.race([base44.integrations.Core.GenerateImage({ prompt }), timeout]);
      setGeneratedUrl(result.url);
    } catch (e) {
      setGenError(e?.message === 'timeout' ? 'Took too long — please try again' : 'Generation failed — tap to retry');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0d1a14 50%, #0a0f1a 100%)' }}>
      <div className="max-w-lg mx-auto px-4 py-6">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏴󠁧󠁢󠁳󠁣󠁴󠁬󠁿</div>
          <h1 className="text-3xl font-black tracking-tight mb-1" style={{ color: '#D4AF37' }}>Stoneymollan</h1>
          <p className="text-gray-400 text-sm">Two cabins. Nature. Sauna. Cold loch.</p>
          <p className="text-gray-500 text-xs mt-1">25min from Glasgow • John Muir Way at your door</p>
          <a href="https://www.overlochlomond.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-green-400 text-xs mt-2 hover:underline">
            overlochlomond.com <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Pick retreat type */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-gray-500 mb-3">PICK YOUR RETREAT</p>
          <div className="space-y-2">
            {RETREAT_TYPES.map((r, i) => (
              <button key={r.key} onClick={() => setSelectedRetreat(i)}
                className="w-full p-3 rounded-xl border-2 text-left transition-all"
                style={selectedRetreat === i
                  ? { borderColor: '#D4AF37', background: 'rgba(212,175,55,0.12)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }
                  : { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }
                }>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{r.emoji}</div>
                  <div>
                    <div className="text-sm font-bold text-white">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-gray-500 mb-3">LANGUAGE</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                className="px-3 py-2 rounded-lg text-sm font-bold transition-all border"
                style={lang === l.code
                  ? { borderColor: '#D4AF37', background: 'rgba(212,175,55,0.12)', color: '#D4AF37' }
                  : { borderColor: 'rgba(255,255,255,0.1)', color: '#9ca3af' }
                }>
                {l.flag} {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
            <p className="text-sm font-black" style={{ color: '#D4AF37' }}>📋 Caption</p>
            <button onClick={copyCaption}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={copied
                ? { background: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid #4ade80' }
                : { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }
              }>
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>
          <div className="px-4 py-3">
            {captionLoading
              ? <p className="text-gray-500 text-xs">Translating...</p>
              : <pre className="text-gray-300 text-xs whitespace-pre-wrap leading-relaxed font-sans">{captionText || buildEnCaption()}</pre>
            }
          </div>
        </div>

        {/* Generate image */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-gray-500 mb-3">GENERATE PHOTO (9:16)</p>

          <button onClick={generateImage} disabled={generating}
            className="w-full py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2"
            style={generating
              ? { background: 'rgba(212,175,55,0.1)', border: '2px solid rgba(212,175,55,0.3)', color: 'rgba(212,175,55,0.5)' }
              : { background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))', border: '2px solid #D4AF37', color: '#D4AF37', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }
            }>
            {generating
              ? <><RefreshCw className="w-5 h-5 animate-spin" /> Generating photo...</>
              : <><Sparkles className="w-5 h-5" /> Generate Photo</>
            }
          </button>

          {genError && <p className="text-red-400 text-xs text-center mt-2">{genError}</p>}
        </div>

        {/* Generated image */}
        {generatedUrl && (
          <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(212,175,55,0.4)' }}>
            <img src={generatedUrl} alt="Generated photo" className="w-full" />
            <div className="p-3 flex gap-2">
              <a href={generatedUrl} download="stoneymollan-retreat.png" target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl font-black text-sm text-center transition-all"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#000' }}>
                ⬇️ Save
              </a>
              <button onClick={generateImage}
                className="px-4 py-3 rounded-xl font-bold text-sm border transition-all"
                style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }}>
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Booking link */}
        <div className="text-center pt-4 pb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <a href="https://hotels.cloudbeds.com/reservation/CD3LLY" target="_blank" rel="noopener noreferrer"
            className="inline-block py-3 px-6 rounded-xl font-black text-base transition-all"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#000', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
            📅 Check Availability
          </a>
          <p className="text-gray-600 text-xs mt-4">✉️ 10-5@overlochlomond.com</p>
        </div>
      </div>
    </div>
  );
}