import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Paintbrush, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Download } from 'lucide-react';

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
const BRUSH_SIZES = [2, 5, 10, 18];

export default function Draw51() {
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState('pick'); // pick | draw
  const [color, setColor] = useState('#1a1a1a');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef(null);

  const getSteps = async (name) => {
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, a warm, encouraging art teacher for kids and adults. Give me exactly 6 simple step-by-step instructions to sketch a "${name}" from scratch. Each step should be short (1-2 sentences), fun, and encouraging. Use simple language a child can understand. Return JSON with a "steps" array, each item having "title" (short step name, max 4 words) and "instruction" (what to do) and "tip" (a small encouraging tip or fun fact, 1 sentence).`,
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
                  tip: { type: 'string' }
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

  const handlePick = (label) => {
    setSubject(label);
    getSteps(label);
  };

  const handleCustom = (e) => {
    e.preventDefault();
    if (!customSubject.trim()) return;
    setSubject(customSubject.trim());
    getSteps(customSubject.trim());
  };

  // Canvas drawing
  useEffect(() => {
    if (phase !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fefce8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [phase]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    drawing.current = true;
    lastPos.current = getPos(e, canvasRef.current);
  };

  const doDraw = (e) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isErasing ? '#fefce8' : color;
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
    ctx.fillStyle = '#fefce8';
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">🎨</div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3" style={{ letterSpacing: '-0.02em' }}>
              Draw<span className="text-pink-500">51</span>
            </h1>
            <p className="text-gray-500 text-lg font-medium">Pick something to draw — AI51 walks you through it, step by step.</p>
            <p className="text-gray-400 text-sm mt-1">Perfect for kids, beginners, and anyone who thinks they "can't draw" 🌹</p>
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
            {SUGGESTIONS.map(({ emoji, label }) => (
              <button
                key={label}
                onClick={() => handlePick(label)}
                disabled={loading}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-pink-300 hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs font-bold text-gray-700">{label}</span>
              </button>
            ))}
          </div>

          {/* Custom input */}
          <form onSubmit={handleCustom} className="flex gap-3">
            <input
              value={customSubject}
              onChange={e => setCustomSubject(e.target.value)}
              placeholder="Or type anything… a dragon, your dog, the moon 🌙"
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-400 outline-none text-gray-800 font-medium bg-white text-sm"
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
              <p className="text-gray-500 font-bold">AI51 is preparing your drawing guide…</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { setPhase('pick'); setSteps([]); setSubject(''); setCustomSubject(''); }}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-bold transition-colors"
          >
            ← Draw something else
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span className="font-black text-gray-800">Drawing: <span className="text-pink-500">{subject}</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* STEPS PANEL */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {/* Current step card */}
            {step && (
              <div className="bg-white rounded-2xl shadow-md p-5 border-2 border-pink-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-pink-500 text-white text-xs font-black px-2 py-1 rounded-full">Step {currentStep + 1} of {steps.length}</span>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">{step.title}</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{step.instruction}</p>
                <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                  <p className="text-xs text-yellow-700 font-medium">💡 {step.tip}</p>
                </div>
              </div>
            )}

            {/* Step navigation */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:border-gray-300 transition-all disabled:opacity-30"
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

            {/* Step dots */}
            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentStep ? 'bg-pink-500 scale-125' : i < currentStep ? 'bg-pink-300' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {/* Finished message */}
            {currentStep === steps.length - 1 && (
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-4 text-white text-center">
                <p className="text-2xl mb-1">🌟</p>
                <p className="font-black text-lg">You did it!</p>
                <p className="text-sm opacity-90">Don't forget to save your masterpiece ↓</p>
              </div>
            )}
          </div>

          {/* CANVAS PANEL */}
          <div className="lg:col-span-3 flex flex-col gap-3">

            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-wrap items-center gap-3">
              {/* Colors */}
              <div className="flex gap-1.5 flex-wrap">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => { setColor(c); setIsErasing(false); }}
                    className="w-7 h-7 rounded-full border-2 transition-all"
                    style={{
                      background: c,
                      borderColor: color === c && !isErasing ? '#f472b6' : c === '#ffffff' ? '#e5e7eb' : c,
                      transform: color === c && !isErasing ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>

              <div className="w-px h-6 bg-gray-200" />

              {/* Brush sizes */}
              <div className="flex gap-1.5 items-center">
                {BRUSH_SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setBrushSize(s); setIsErasing(false); }}
                    className={`rounded-full bg-gray-800 transition-all ${brushSize === s && !isErasing ? 'ring-2 ring-pink-400' : ''}`}
                    style={{ width: s + 8, height: s + 8, minWidth: 10, minHeight: 10 }}
                  />
                ))}
              </div>

              <div className="w-px h-6 bg-gray-200" />

              {/* Eraser */}
              <button
                onClick={() => setIsErasing(e => !e)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${isErasing ? 'bg-orange-100 border-orange-400 text-orange-700' : 'bg-gray-100 border-gray-200 text-gray-600'}`}
              >
                🧹 Eraser
              </button>

              <div className="ml-auto flex gap-2">
                <button onClick={clearCanvas} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all">
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
                <button onClick={downloadCanvas} className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white transition-all">
                  <Download className="w-3 h-3" /> Save
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-gray-100" style={{ touchAction: 'none' }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full cursor-crosshair block"
                style={{ background: '#fefce8' }}
                onMouseDown={startDraw}
                onMouseMove={doDraw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={doDraw}
                onTouchEnd={endDraw}
              />
            </div>

            <p className="text-center text-xs text-gray-400">Draw freely — there are no mistakes, only art 🌹</p>
          </div>
        </div>
      </div>
    </div>
  );
}