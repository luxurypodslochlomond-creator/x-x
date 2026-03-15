import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Paintbrush, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Download, ArrowLeft, Volume2 } from 'lucide-react';

const SUGGESTIONS = [
  { emoji: '🌹', label: 'Rose' },
  { emoji: '🌻', label: 'Sunflower' },
  { emoji: '🐶', label: 'Dog' },
  { emoji: '🐱', label: 'Cat' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🌳', label: 'Tree' },
  { emoji: '🏠', label: 'House' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🐉', label: 'Dragon' },
  { emoji: '🌙', label: 'Moon' },
  { emoji: '🐠', label: 'Fish' },
  { emoji: '🦁', label: 'Lion' },
];

const COLORS = ['#1a1a1a', '#ef4444', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899', '#ffffff'];

function AnimatedShape({ shape, animKey }) {
  const s = (shape || '').toLowerCase();
  const stroke = '#ec4899';
  const sw = 3.5;

  // Each shape: {el, length} — length is approximate pathLength for dasharray animation
  const shapeMap = {
    oval:          { el: <ellipse cx="50" cy="40" rx="40" ry="25" fill="none" stroke={stroke} strokeWidth={sw} />, len: 210 },
    circle:        { el: <circle cx="50" cy="40" r="30" fill="none" stroke={stroke} strokeWidth={sw} />, len: 190 },
    rectangle:     { el: <rect x="10" y="15" width="80" height="50" rx="3" fill="none" stroke={stroke} strokeWidth={sw} />, len: 260 },
    triangle:      { el: <polygon points="50,10 90,70 10,70" fill="none" stroke={stroke} strokeWidth={sw} />, len: 230 },
    diamond:       { el: <polygon points="50,10 90,40 50,70 10,40" fill="none" stroke={stroke} strokeWidth={sw} />, len: 225 },
    'curved-line': { el: <path d="M 10 60 Q 50 10 90 60" fill="none" stroke={stroke} strokeWidth={sw} />, len: 120 },
    zigzag:        { el: <polyline points="10,60 30,20 50,60 70,20 90,60" fill="none" stroke={stroke} strokeWidth={sw} />, len: 180 },
    spiral:        { el: <path d="M50,40 m0,-18 a18,18 0 1,1 -0.1,0 M50,40 m0,-12 a12,12 0 1,0 0.1,0 M50,40 m0,-6 a6,6 0 1,1 -0.1,0" fill="none" stroke={stroke} strokeWidth={sw} />, len: 220 },
    star:          { el: <polygon points="50,10 61,35 90,35 67,57 76,82 50,65 24,82 33,57 10,35 39,35" fill="none" stroke={stroke} strokeWidth={sw} />, len: 300 },
    heart:         { el: <path d="M50,70 C20,50 5,28 25,16 C35,10 50,22 50,22 C50,22 65,10 75,16 C95,28 80,50 50,70Z" fill="none" stroke={stroke} strokeWidth={sw} />, len: 240 },
  };

  const cfg = shapeMap[s];
  if (!cfg) return null;

  const animId = `draw-anim-${animKey}-${s}`;

  return (
    <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 mt-3">
      <p className="text-pink-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
        ✏️ Watch & copy this!
      </p>
      <div className="flex items-center justify-center">
        <svg width="140" height="110" viewBox="0 0 100 80" style={{ overflow: 'visible' }}>
          <style>{`
            @keyframes ${animId} {
              from { stroke-dashoffset: ${cfg.len}; }
              to   { stroke-dashoffset: 0; }
            }
            .shape-${animId} {
              stroke-dasharray: ${cfg.len};
              stroke-dashoffset: ${cfg.len};
              animation: ${animId} 1.8s ease-in-out forwards;
            }
          `}</style>
          {/* Ghost guide (faint full shape) */}
          {React.cloneElement(cfg.el, { stroke: 'rgba(236,72,153,0.15)', strokeWidth: sw, strokeDasharray: undefined, strokeDashoffset: undefined })}
          {/* Animated drawing */}
          {React.cloneElement(cfg.el, { className: `shape-${animId}`, key: animKey })}
        </svg>
      </div>
      <p className="text-center text-gray-400 text-xs mt-2 capitalize">Draw a <span className="text-pink-300 font-bold">{shape.replace('-', ' ')}</span> like this ☝️</p>
    </div>
  );
}

function ShapePreview({ shape, stepKey }) {
  if (!shape || shape === 'none') return null;
  return <AnimatedShape shape={shape} animKey={stepKey} />;
}
const BRUSH_SIZES = [2, 5, 10, 18];

export default function Draw51() {
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState('pick');
  const [referenceImage, setReferenceImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [color, setColor] = useState('#1a1a1a');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef(null);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.9;
    utt.pitch = 1.2;

    const setVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a nice female English voice
      const femaleVoice = voices.find(v => /samantha|karen|victoria|moira|fiona|zira|susan|female|woman/i.test(v.name))
        || voices.find(v => v.name.includes('Google UK English Female'))
        || voices.find(v => v.name.includes('Google US English') && v.name.includes('Female'))
        || voices.find(v => /en[-_]GB|en[-_]AU/i.test(v.lang) && v.name.toLowerCase().includes('female'))
        || voices.find(v => /en/i.test(v.lang) && v.gender === 'female')
        || voices.find(v => /samantha|karen|victoria|moira|fiona|zira|susan|alice|allison|ava|kate|siri/i.test(v.name));
      if (femaleVoice) utt.voice = femaleVoice;
      window.speechSynthesis.speak(utt);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      setVoiceAndSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const getSteps = async (name) => {
    setLoading(true);
    setReferenceImage(null);
    setLoadingImage(true);

    // Generate reference image in parallel
    base44.integrations.Core.GenerateImage({
      prompt: `A beautiful, simple, clear pencil sketch / illustration of a ${name}, suitable as a drawing reference for children. Clean white background, friendly and charming style, easy to copy.`
    }).then(res => {
      setReferenceImage(res.url);
    }).catch(() => {}).finally(() => setLoadingImage(false));

    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, a warm, encouraging art teacher for kids and adults. Give me exactly 6 simple step-by-step instructions to sketch a "${name}" from scratch. Each step should be short (1-2 sentences), fun, and encouraging. Use simple language a child can understand. Return JSON with a "steps" array, each item having "title" (short step name, max 4 words), "instruction" (what to do), "tip" (a small encouraging tip or fun fact, 1 sentence), and "shape" (one of: "oval", "circle", "rectangle", "triangle", "diamond", "curved-line", "zigzag", "spiral", "star", "heart", "none" — the main shape to draw in this step).`,
        response_json_schema: {
          type: 'object',
          properties: {
            steps: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  instruction: { type: 'string' },
                  tip: { type: 'string' },
                  shape: { type: 'string' }
                }
              }
            }
          }
        }
      });
      setSteps(res.steps || []);
      setCurrentStep(0);
      setPhase('draw');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePick = (label) => { setSubject(label); getSteps(label); };
  const handleCustom = (e) => {
    e.preventDefault();
    if (!customSubject.trim()) return;
    setSubject(customSubject.trim());
    getSteps(customSubject.trim());
  };

  useEffect(() => {
    if (phase !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [phase]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const startDraw = (e) => { e.preventDefault(); drawing.current = true; lastPos.current = getPos(e, canvasRef.current); };
  const doDraw = (e) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isErasing ? '#0d1117' : color;
    ctx.lineWidth = isErasing ? brushSize * 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
  };
  const endDraw = () => { drawing.current = false; };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `my-${subject}-draw51.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (phase === 'pick') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 pt-4">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 rounded-full px-4 py-1.5 mb-6">
              <Paintbrush className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 font-bold text-sm tracking-wider">DRAW51</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              What will you<br /><span className="text-pink-400">create today?</span>
            </h1>
            <p className="text-gray-400 text-base">AI51 walks you through it, step by step.</p>
            <p className="text-gray-500 text-sm mt-1">Perfect for kids, beginners, and anyone who thinks they "can't draw" 🌹</p>
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
            {SUGGESTIONS.map(({ emoji, label }) => (
              <button
                key={label}
                onClick={() => handlePick(label)}
                disabled={loading}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-400/60 hover:bg-pink-500/10 transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs font-bold text-gray-300">{label}</span>
              </button>
            ))}
          </div>

          {/* Custom input */}
          <form onSubmit={handleCustom} className="flex gap-3">
            <input
              value={customSubject}
              onChange={e => setCustomSubject(e.target.value)}
              placeholder="Or type anything… a dragon, your dog, the moon 🌙"
              className="flex-1 px-4 py-3 rounded-2xl border border-white/20 bg-white/5 focus:border-pink-400 outline-none text-white font-medium placeholder-gray-500 text-sm"
            />
            <button
              type="submit"
              disabled={loading || !customSubject.trim()}
              className="px-5 py-3 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-40"
            >
              Go!
            </button>
          </form>

          {loading && (
            <div className="text-center mt-10">
              <div className="text-4xl animate-bounce mb-3">✏️</div>
              <p className="text-gray-400 font-bold">AI51 is preparing your drawing guide…</p>
            </div>
          )}

          <p className="text-center text-xs text-gray-600 mt-10">Draw freely — there are no mistakes, only art ♾️</p>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-3 sm:p-6">
      <div className="max-w-5xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={() => { setPhase('pick'); setSteps([]); setSubject(''); setCustomSubject(''); setReferenceImage(null); }}
            className="flex items-center gap-2 text-gray-400 hover:text-pink-400 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Draw something else
          </button>
          <div className="flex items-center gap-2">
            <Paintbrush className="w-4 h-4 text-pink-400" />
            <span className="font-black text-white">Drawing: <span className="text-pink-400">{subject}</span></span>
          </div>
        </div>

        {/* On mobile: steps on top, canvas below */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* STEPS PANEL */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {step && (
              <div className="bg-white/5 rounded-2xl border border-pink-500/30 p-5" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.1)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-500 text-white text-xs font-black px-3 py-1 rounded-full">Step {currentStep + 1} / {steps.length}</span>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                  <button
                    onClick={() => speak(`Step ${currentStep + 1}. ${step.title}. ${step.instruction}. Tip: ${step.tip}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-xl text-cyan-400 text-xs font-bold transition-all"
                    title="Listen to this step"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>
                </div>
                <h2 className="text-xl font-black text-white mb-2">{step.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{step.instruction}</p>
                <ShapePreview shape={step.shape} stepKey={`${subject}-${currentStep}`} />
                <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/20 mt-3">
                  <p className="text-xs text-yellow-300 font-medium">💡 {step.tip}</p>
                </div>
              </div>
            )}

            {/* Step nav */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-xl border border-white/10 font-bold text-gray-400 hover:border-white/20 transition-all disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={currentStep === steps.length - 1}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl font-bold text-white transition-all disabled:opacity-30"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`rounded-full transition-all ${i === currentStep ? 'bg-pink-500 w-4 h-2.5' : i < currentStep ? 'bg-pink-400/50 w-2.5 h-2.5' : 'bg-white/20 w-2.5 h-2.5'}`}
                />
              ))}
            </div>

            {/* Reference Image */}
            <div className="bg-white/5 rounded-2xl border border-purple-500/30 p-4">
              <p className="text-purple-400 font-black text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                🖼️ Copy this on paper!
              </p>
              {loadingImage && (
                <div className="flex flex-col items-center py-6">
                  <div className="text-3xl animate-bounce mb-2">🎨</div>
                  <p className="text-gray-500 text-xs">AI51 is drawing a reference…</p>
                </div>
              )}
              {referenceImage && !loadingImage && (
                <img
                  src={referenceImage}
                  alt={`Reference drawing of ${subject}`}
                  className="w-full rounded-xl border border-white/10"
                  style={{ maxHeight: 220, objectFit: 'contain', background: '#fff' }}
                />
              )}
            </div>

            {currentStep === steps.length - 1 && (
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-4 text-white text-center" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.3)' }}>
                <p className="text-2xl mb-1">🌟</p>
                <p className="font-black text-lg">You did it!</p>
                <p className="text-sm opacity-90">Save your masterpiece ↓</p>
              </div>
            )}
          </div>

          {/* CANVAS PANEL */}
          <div className="lg:col-span-3 flex flex-col gap-3">

            {/* Toolbar */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-3 flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5 flex-wrap">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => { setColor(c); setIsErasing(false); }}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all"
                    style={{
                      background: c,
                      borderColor: color === c && !isErasing ? '#f472b6' : c === '#ffffff' ? '#4b5563' : 'transparent',
                      transform: color === c && !isErasing ? 'scale(1.25)' : 'scale(1)',
                      boxShadow: color === c && !isErasing ? '0 0 8px rgba(244,114,182,0.6)' : 'none'
                    }}
                  />
                ))}
              </div>

              <div className="w-px h-5 bg-white/10" />

              <div className="flex gap-1.5 items-center">
                {BRUSH_SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setBrushSize(s); setIsErasing(false); }}
                    className={`rounded-full transition-all ${brushSize === s && !isErasing ? 'ring-2 ring-pink-400' : ''}`}
                    style={{ width: s + 8, height: s + 8, minWidth: 10, minHeight: 10, background: '#e2e8f0' }}
                  />
                ))}
              </div>

              <div className="w-px h-5 bg-white/10" />

              <button
                onClick={() => setIsErasing(e => !e)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${isErasing ? 'bg-orange-500/20 border-orange-400 text-orange-300' : 'bg-white/5 border-white/20 text-gray-400 hover:border-white/30'}`}
              >
                🧹 Eraser
              </button>

              <div className="ml-auto flex gap-2">
                <button onClick={clearCanvas} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 transition-all">
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
                <button onClick={downloadCanvas} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white transition-all">
                  <Download className="w-3 h-3" /> Save
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ touchAction: 'none', boxShadow: '0 0 40px rgba(236,72,153,0.1)' }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={560}
                className="w-full cursor-crosshair block"
                style={{ background: '#0d1117', display: 'block' }}
                onMouseDown={startDraw}
                onMouseMove={doDraw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={doDraw}
                onTouchEnd={endDraw}
              />
            </div>

            <p className="text-center text-xs text-gray-600">Draw freely — there are no mistakes, only art ♾️❤️</p>
          </div>
        </div>
      </div>
    </div>
  );
}