import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Download, Sparkles, RefreshCw, Image, Upload, X, Globe, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const LANGUAGES = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'nl', label: '🇳🇱 Nederlands' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'it', label: '🇮🇹 Italiano' },
  { code: 'sv', label: '🇸🇪 Svenska' },
  { code: 'no', label: '🇳🇴 Norsk' },
];

const LANG_TEXTS = {
  en: { headline: "2ND NIGHT HALF PRICE", sub: "Loch Lomond • Scotland", cta: "Book Direct: overlochlomond.com", tagline: "Where the Highlands meet the Loch" },
  de: { headline: "2. NACHT ZUM HALBEN PREIS", sub: "Loch Lomond • Schottland", cta: "Direkt buchen: overlochlomond.com", tagline: "Wo das Hochland den Loch trifft" },
  fr: { headline: "2ÈME NUIT À MOITIÉ PRIX", sub: "Loch Lomond • Écosse", cta: "Réservez directement: overlochlomond.com", tagline: "Où les Highlands rencontrent le Loch" },
  nl: { headline: "2E NACHT HALF PRIJS", sub: "Loch Lomond • Schotland", cta: "Direct boeken: overlochlomond.com", tagline: "Waar de Hooglanden het meer ontmoeten" },
  es: { headline: "2ª NOCHE A MITAD DE PRECIO", sub: "Loch Lomond • Escocia", cta: "Reserva directa: overlochlomond.com", tagline: "Donde las Highlands encuentran el Loch" },
  it: { headline: "2ª NOTTE A METÀ PREZZO", sub: "Loch Lomond • Scozia", cta: "Prenota diretto: overlochlomond.com", tagline: "Dove le Highlands incontrano il Loch" },
  sv: { headline: "2:A NATTEN HALVA PRISET", sub: "Loch Lomond • Skottland", cta: "Boka direkt: overlochlomond.com", tagline: "Där Highlands möter sjön" },
  no: { headline: "2. NATT TIL HALV PRIS", sub: "Loch Lomond • Skottland", cta: "Book direkte: overlochlomond.com", tagline: "Der Høylandet møter innsjøen" },
};

const PRESETS = [
  { label: "2nd Night Half Price", key: "half_price" },
  { label: "3 Nights for Price of 2", key: "three_for_two" },
  { label: "Spring Weekend Getaway", key: "spring" },
  { label: "Summer Special", key: "summer" },
  { label: "Autumn Escape", key: "autumn" },
  { label: "Christmas & New Year", key: "christmas" },
];

function buildPrompt({ preset, headline, sub, cta, tagline, lang, uploadedImageUrl }) {
  const sceneMap = {
    half_price: "golden sunset over Loch Lomond, Ben Lomond reflected in still water, warm amber light, dramatic clouds",
    three_for_two: "misty morning Loch Lomond, atmospheric Highland mist rising from the water, magical ethereal light",
    spring: "spring bluebells and wildflowers on shores of Loch Lomond, fresh greens, soft morning light, snow-capped Ben Lomond",
    summer: "bright Scottish summer day at Loch Lomond, sparkling deep blue water, lush green hills, dramatic white clouds",
    autumn: "autumn colours at Loch Lomond, rich golds and reds, dramatic moody Highland sky, reflections in the water",
    christmas: "Loch Lomond in winter snow, cosy stone cottage lights glowing warm amber, frost on the loch, stars in dark sky",
  };

  const scene = sceneMap[preset] || sceneMap.half_price;

  const styleNote = uploadedImageUrl
    ? "Use the provided reference photograph as the main image, enhance with dramatic lighting and luxury feel."
    : `Photorealistic cinematic scene: ${scene}.`;

  return `Luxury Scottish Highland holiday cottage Instagram flyer. ${styleNote}

CRITICAL TEXT LAYOUT — bold elegant serif fonts (NOT monospace, NOT techy — warm, luxury, aspirational):
- TOP: Property name "STONEYMOLLAN" in large gold elegant serif font
- SUBTITLE: "${sub}" in white italic beneath
- CENTER MAIN: "${headline}" in very large bold white or gold text, eye-catching
- TAGLINE: "${tagline}" in smaller elegant white italic
- BOTTOM: "${cta}" in clean white text with subtle gold underline

Color palette: Deep navy/dark slate background gradient, gold accents (#D4AF37), white text. Luxury boutique Scottish holiday let aesthetic. NOT budget, NOT corporate — warm, romantic, breathtaking. Portrait format for Instagram Stories and Feed. Professional enough to print.`;
}

export default function StoneymollanMarketing() {
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [lang, setLang] = useState('en');
  const [useCustom, setUseCustom] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [error, setError] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef();

  // Editable copy
  const defaultTexts = LANG_TEXTS[lang] || LANG_TEXTS.en;
  const [headline, setHeadline] = useState('');
  const [sub, setSub] = useState('');
  const [cta, setCta] = useState('');
  const [tagline, setTagline] = useState('');

  const getHeadline = () => headline || defaultTexts.headline;
  const getSub = () => sub || defaultTexts.sub;
  const getCta = () => cta || defaultTexts.cta;
  const getTagline = () => tagline || defaultTexts.tagline;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadedPreview(URL.createObjectURL(file));
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      setUploadedImageUrl(result.file_url);
    } catch {
      setError('Upload failed, try again');
    } finally {
      setUploading(false);
    }
  };

  const generate = async () => {
    setGenerating(true);
    setGeneratedUrl(null);
    setError(null);
    try {
      let prompt = useCustom
        ? customPrompt
        : buildPrompt({
            preset: PRESETS[selectedPreset].key,
            headline: getHeadline(),
            sub: getSub(),
            cta: getCta(),
            tagline: getTagline(),
            lang,
            uploadedImageUrl,
          });

      const opts = { prompt };
      if (uploadedImageUrl) opts.existing_image_urls = [uploadedImageUrl];

      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 45000));
      const result = await Promise.race([base44.integrations.Core.GenerateImage(opts), timeoutPromise]);
      setGeneratedUrl(result.url);
    } catch (err) {
      setError(err?.message === 'Timeout' ? 'Took too long — please try again!' : 'Generation failed — try again!');
    } finally {
      setGenerating(false);
    }
  };

  const captionText = `📍 Stoneymollan, Loch Lomond, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁬󠁿\n\n${getHeadline()} ✨\n\n${getTagline()}\n\n🔗 Book direct & save: www.overlochlomond.com\n\n#LochLomond #Scotland #HighlandCottage #ScottishHighlands #Stoneymollan #HolidayCottage #Scotland2025 #VisitScotland #LuxuryTravel #CottageLife`;

  const copyCaption = () => {
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1a0d] to-[#0a0f1a] text-white p-4 md:p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <Image className="w-7 h-7 text-green-400" />
            <h1 className="text-2xl md:text-3xl font-black">Stoneymollan Flyer Generator</h1>
          </div>
          <p className="text-gray-400 text-sm">AI-powered Instagram & Facebook flyers • Direct bookings</p>
          <a href="https://www.overlochlomond.com" target="_blank" rel="noopener noreferrer" className="text-green-400 text-sm hover:underline">overlochlomond.com</a>
        </div>

        {/* Upload your own photo */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-5">
          <p className="text-cyan-300 font-bold text-sm mb-2">📸 Upload a Stoneymollan photo (recommended!)</p>
          <p className="text-gray-400 text-xs mb-3">AI will use YOUR real photo + add the promo text overlay. Way more authentic than pure AI.</p>
          {uploadedPreview ? (
            <div className="relative inline-block">
              <img src={uploadedPreview} alt="Uploaded" className="h-24 rounded-lg object-cover" />
              <button onClick={() => { setUploadedPreview(null); setUploadedImageUrl(null); }} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
              {uploading && <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"><RefreshCw className="w-5 h-5 animate-spin text-cyan-400" /></div>}
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-4 py-2 border border-cyan-500/40 rounded-lg text-cyan-300 text-sm hover:bg-cyan-500/10 transition-all">
              <Upload className="w-4 h-4" /> Choose Photo
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>

        {/* Language */}
        <div className="mb-5">
          <p className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2"><Globe className="w-4 h-4" /> Language</p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setHeadline(''); setSub(''); setCta(''); setTagline(''); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${lang === l.code ? 'border-green-500 bg-green-500/10 text-green-300' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preset */}
        <div className="mb-5">
          <p className="text-sm font-bold text-gray-300 mb-2">Promotion type</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => { setSelectedPreset(i); setUseCustom(false); }}
                className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${!useCustom && selectedPreset === i ? 'border-green-500 bg-green-500/10 text-green-300' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editable copy */}
        <div className="mb-5 bg-black/30 border border-white/10 rounded-xl p-4 space-y-3">
          <p className="text-sm font-bold text-gray-300">✏️ Tweak the copy (leave blank to use default)</p>
          <div>
            <p className="text-xs text-gray-500 mb-1">Main headline</p>
            <Input value={headline} onChange={e => setHeadline(e.target.value)} placeholder={defaultTexts.headline} className="bg-black/40 border-white/10 text-white placeholder-gray-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Tagline</p>
            <Input value={tagline} onChange={e => setTagline(e.target.value)} placeholder={defaultTexts.tagline} className="bg-black/40 border-white/10 text-white placeholder-gray-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Call to action / booking link</p>
            <Input value={cta} onChange={e => setCta(e.target.value)} placeholder={defaultTexts.cta} className="bg-black/40 border-white/10 text-white placeholder-gray-600 text-sm" />
          </div>
        </div>

        {/* Custom prompt toggle */}
        <div className="mb-5">
          <button onClick={() => setUseCustom(!useCustom)}
            className={`w-full p-3 rounded-xl border-2 text-sm font-bold text-left transition-all ${useCustom ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
            🧠 Full custom AI prompt (advanced)
          </button>
          {useCustom && (
            <Textarea value={customPrompt} onChange={e => setCustomPrompt(e.target.value)}
              placeholder="Describe exactly what you want... e.g. 'Cosy Christmas fireplace, snow outside, Loch Lomond...'"
              className="mt-2 bg-black/40 border-white/20 text-white placeholder-gray-600 min-h-[80px]" />
          )}
        </div>

        {/* Generate */}
        <Button onClick={generate} disabled={generating || uploading || (useCustom && !customPrompt.trim())}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-lg py-6 mb-4">
          {generating
            ? <><RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating... (10–15 seconds)</>
            : <><Sparkles className="w-5 h-5 mr-2" /> Generate Flyer</>}
        </Button>

        {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}

        {/* Result */}
        {generatedUrl && (
          <div className="bg-black/40 border border-green-500/30 rounded-2xl p-4 mb-6">
            <img src={generatedUrl} alt="Generated flyer" className="w-full rounded-xl mb-4" />
            <div className="flex gap-3 mb-4">
              <a href={generatedUrl} download="stoneymollan-flyer.png" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700 font-bold">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </a>
              <Button onClick={generate} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <RefreshCw className="w-4 h-4 mr-2" /> Redo
              </Button>
            </div>
            <p className="text-gray-500 text-xs text-center">Long press on mobile to save to camera roll</p>
          </div>
        )}

        {/* Caption generator */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-300">📋 Instagram Caption (copy & paste)</p>
            <button onClick={copyCaption} className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300">
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>
          <pre className="text-gray-400 text-xs whitespace-pre-wrap font-sans leading-relaxed">{captionText}</pre>
        </div>

        <div className="text-center text-gray-600 text-xs pb-4">
          Instagram: <a href="https://www.instagram.com/stoneymollanlochlomond" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">@stoneymollanlochlomond</a>
        </div>
      </div>
    </div>
  );
}