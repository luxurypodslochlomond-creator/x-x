import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Copy, Check, Sparkles, RefreshCw, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const OFFERS = [
  { key: 'half_price', emoji: '🏷️', label: '2nd Night Half Price', headline: '2ND NIGHT HALF PRICE', tagline: 'Stay 2 nights — pay 1½. Limited availability.' },
  { key: 'three_two', emoji: '🎁', label: '3 Nights for Price of 2', headline: '3 NIGHTS FOR THE PRICE OF 2', tagline: 'Three nights. Two prices. Pure magic.' },
  { key: 'sauna', emoji: '🔥', label: 'Wood Fired Sauna & Hot Tub', headline: 'WOOD FIRED SAUNA & HOT TUB', tagline: 'Heat your soul. Cool in the loch. Heaven on earth.' },
  { key: 'spring', emoji: '🌸', label: 'Spring Escape', headline: 'SPRING HIGHLAND ESCAPE', tagline: 'Bluebells, birdsong and Ben Lomond at your door.' },
  { key: 'summer', emoji: '☀️', label: 'Summer on the Loch', headline: 'SUMMER ON LOCH LOMOND', tagline: 'Scotland at its most breathtaking. Book now.' },
  { key: 'autumn', emoji: '🍂', label: 'Autumn Colours', headline: 'AUTUMN IN THE HIGHLANDS', tagline: 'Golden light. Still water. Absolute peace.' },
  { key: 'christmas', emoji: '⛄', label: 'Christmas & New Year', headline: 'CHRISTMAS AT THE LOCH', tagline: 'Snow on the hills. Fire in the hearth. Magic in the air.' },
  { key: 'lastminute', emoji: '⚡', label: 'Last Minute Deal', headline: 'LAST MINUTE AVAILABILITY', tagline: 'Grab it before it\'s gone. Loch Lomond is calling.' },
];

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'sv', flag: '🇸🇪', name: 'Svenska' },
];

const HASHTAGS = '#LochLomond #Scotland #HighlandCottage #Stoneymollan #HolidayCottage #VisitScotland #LuxuryTravel #ScottishHighlands #CottageLife #ScotlandIsBeautiful';

const SCENE_MAP = {
  half_price: "hyper-realistic DSLR travel photography, golden hour at Loch Lomond Scotland, glassy still water perfectly reflecting Ben Lomond mountain, warm cinematic light, shot on Sony A7R5 with 24mm lens, depth of field, no people, moody atmospheric, Conde Nast Traveller quality",
  three_two: "hyper-realistic DSLR travel photography, misty dawn at Loch Lomond Scotland, low mist rolling across dark mirror-still water, dramatic mountain silhouettes, blue hour light, Sony A7R5, ultra cinematic, no people, National Geographic quality",
  sauna: "hyper-realistic lifestyle photography, rustic wooden outdoor hot tub on private deck overlooking dark Loch Lomond at night, steam rising dramatically, string lights reflecting on black water, intimate warm glow, stars visible, Sony A7R5, moody luxury editorial",
  spring: "hyper-realistic DSLR travel photography, wild garlic and bluebells carpeting ancient Scottish woodland beside Loch Lomond, soft green light filtering through bare spring trees, mist on the water, ethereal, shot on Sony A7R5, breathtaking",
  summer: "hyper-realistic travel photography, impossibly blue Loch Lomond on rare perfect Scottish summer day, dramatic white cumulus clouds, deep green forested hillsides, wild flowers in foreground, Sony A7R5, Conde Nast Traveller cover quality",
  autumn: "hyper-realistic travel photography, peak autumn colour explosion at Loch Lomond, intense gold orange red reflected perfectly in still dark water, dramatic moody sky, Sony A7R5 35mm, ultra cinematic colour grading, breathtaking",
  christmas: "hyper-realistic lifestyle photography, cosy stone cottage interior glowing warm amber through windows into blue winter dusk, thin dusting of snow on Scottish Highland landscape, Loch Lomond barely visible in background, no kitsch decorations, understated luxury, Sony A7R5",
  lastminute: "hyper-realistic DSLR travel photography, dramatic stormy sunset over Loch Lomond Scotland, intense purple orange pink sky, dark water, rays breaking through clouds, Sony A7R5 wide angle, cinematic, urgent beautiful, no people",
};

export default function StoneymollanMarketing() {
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [lang, setLang] = useState('en');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [genError, setGenError] = useState(null);
  const [showAllOffers, setShowAllOffers] = useState(false);

  const offer = OFFERS[selectedOffer];

  const buildCaption = async () => {
    if (lang === 'en') return buildEnCaption();
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Translate this Instagram caption for a luxury Scottish Highland holiday cottage to ${LANGUAGES.find(l => l.code === lang)?.name}. Keep the emojis. Keep the hashtags in English. Keep overlochlomond.com unchanged. Keep it natural and appealing, not robotic.\n\n${buildEnCaption()}`,
      });
      return result;
    } catch {
      return buildEnCaption();
    }
  };

  const buildEnCaption = () => {
    return `📍 Stoneymollan, Loch Lomond, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁬󠁿\n\n${offer.emoji} ${offer.headline}\n\n${offer.tagline}\n\nAncient coffin road. Wood fired sauna. Cold loch dip. The most restorative place in Scotland.\n\n🔗 Book direct: www.overlochlomond.com\n📩 10-5@overlochlomond.com\n\n${HASHTAGS}`;
  };

  const [captionText, setCaptionText] = useState('');
  const [captionLoading, setCaptionLoading] = useState(false);

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

  // Auto-update caption when offer/lang changes
  React.useEffect(() => {
    setCaptionText(buildEnCaption());
    setGeneratedUrl(null);
  }, [selectedOffer]);

  React.useEffect(() => {
    getCaption();
    setGeneratedUrl(null);
  }, [lang, selectedOffer]);

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
      const prompt = `${SCENE_MAP[offer.key]}. Portrait format 9:16 for Instagram Stories. NO TEXT overlays. NO graphics. NO Christmas card style. NO vintage. NO illustration. Pure photography. Dark subtle vignette at edges. This should look like a real photo a professional travel photographer took and posted on Instagram. Ultra sharp, ultra real, aspirational luxury travel.`;
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 50000));
      const result = await Promise.race([base44.integrations.Core.GenerateImage({ prompt }), timeout]);
      setGeneratedUrl(result.url);
    } catch (e) {
      setGenError(e?.message === 'timeout' ? 'Took too long — please try again' : 'Generation failed — tap to retry');
    } finally {
      setGenerating(false);
    }
  };

  const visibleOffers = showAllOffers ? OFFERS : OFFERS.slice(0, 4);

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0d1a14 50%, #0a0f1a 100%)' }}>
      <div className="max-w-lg mx-auto px-4 py-6">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏴󠁧󠁢󠁳󠁣󠁴󠁬󠁿</div>
          <h1 className="text-3xl font-black tracking-tight mb-1" style={{ color: '#D4AF37' }}>Stoneymollan</h1>
          <p className="text-gray-400 text-sm">Loch Lomond • Ancient Coffin Road • Scotland</p>
          <a href="https://www.overlochlomond.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-green-400 text-xs mt-1 hover:underline">
            overlochlomond.com <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* STEP 1 - Pick offer */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-gray-500 mb-3">STEP 1 — PICK YOUR OFFER</p>
          <div className="grid grid-cols-2 gap-2">
            {visibleOffers.map((o, i) => (
              <button key={o.key} onClick={() => setSelectedOffer(i)}
                className="p-3 rounded-xl border-2 text-left transition-all"
                style={selectedOffer === i
                  ? { borderColor: '#D4AF37', background: 'rgba(212,175,55,0.12)', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }
                  : { borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }
                }>
                <div className="text-2xl mb-1">{o.emoji}</div>
                <div className="text-xs font-bold text-white leading-tight">{o.label}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setShowAllOffers(!showAllOffers)}
            className="w-full mt-2 py-2 text-xs text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1 transition-colors">
            {showAllOffers ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> More offers</>}
          </button>
        </div>

        {/* STEP 2 - Language */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-gray-500 mb-3">STEP 2 — LANGUAGE</p>
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

        {/* Caption - always ready */}
        <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
            <p className="text-sm font-black" style={{ color: '#D4AF37' }}>📋 Instagram Caption</p>
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

        {/* STEP 3 - Generate Image */}
        <div className="mb-6">
          <p className="text-xs font-black tracking-widest text-gray-500 mb-3">STEP 3 — GENERATE AI FLYER IMAGE</p>
          <p className="text-gray-500 text-xs mb-3">AI creates a stunning visual for your offer — takes ~20 seconds</p>

          <button onClick={generateImage} disabled={generating}
            className="w-full py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2"
            style={generating
              ? { background: 'rgba(212,175,55,0.1)', border: '2px solid rgba(212,175,55,0.3)', color: 'rgba(212,175,55,0.5)' }
              : { background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))', border: '2px solid #D4AF37', color: '#D4AF37', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }
            }>
            {generating
              ? <><RefreshCw className="w-5 h-5 animate-spin" /> Generating your flyer...</>
              : <><Sparkles className="w-5 h-5" /> Generate Flyer Image</>
            }
          </button>

          {genError && (
            <p className="text-red-400 text-xs text-center mt-2">{genError}</p>
          )}
        </div>

        {/* Generated image */}
        {generatedUrl && (
          <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(212,175,55,0.4)' }}>
            <img src={generatedUrl} alt="Generated flyer" className="w-full" />
            <div className="p-3 flex gap-2">
              <a href={generatedUrl} download="stoneymollan-flyer.png" target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl font-black text-sm text-center transition-all"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #b8962e)', color: '#000' }}>
                ⬇️ Save to Camera Roll
              </a>
              <button onClick={generateImage}
                className="px-4 py-3 rounded-xl font-bold text-sm border transition-all"
                style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }}>
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 text-xs text-center pb-3">Long press image to save on iPhone</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4 pb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-gray-600 text-xs mb-1">Instagram: <a href="https://www.instagram.com/stoneymollanlochlomond" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300">@stoneymollanlochlomond</a></p>
          <p className="text-gray-700 text-xs">📩 10-5@overlochlomond.com</p>
        </div>
      </div>
    </div>
  );
}