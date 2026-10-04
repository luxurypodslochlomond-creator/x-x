import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, CheckCircle2, Sparkles, Recycle, Zap, AlertCircle, Globe, X, Camera } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

const headStyle = { fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', letterSpacing: '-0.02em' };

const Card = ({ accent = '#1e3a2b', className = '', children }) => (
  <div className={`bg-[#f7f1e5] border border-[#141210] border-l-4 p-4 ${className}`} style={{ borderLeftColor: accent }}>
    {children}
  </div>
);
const Label = ({ color = '#1e3a2b', children }) => (
  <p className="text-[11px] font-black font-mono uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color }}>{children}</p>
);

export default function CleanupAnalysis({
  aiAnalysis, isLoading, formData, setFormData,
  afterPhoto, setAfterPhoto, calculateTokens, setStep,
  showFraudModal, setShowFraudModal, showTechModal, setShowTechModal
}) {
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-6 pt-24 lg:pt-6" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="max-w-2xl mx-auto space-y-5">

        {/* LIVE STATUS */}
        <div className="border-2 border-[#141210] bg-[#f7f1e5] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#e2602a] animate-pulse" />
              <span className="text-[#141210] font-black font-mono uppercase text-sm">Live</span>
            </div>
            <div className="flex gap-2">{[...Array(4)].map((_, i) => <CheckCircle2 key={i} className="w-5 h-5 text-[#1e3a2b]" />)}</div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={(e) => { e.preventDefault(); setShowFraudModal(true); }}
              className="text-[#e2602a] text-sm font-mono underline">Real?</button>
            <button onClick={(e) => { e.preventDefault(); setShowTechModal(true); }}
              className="text-[#1e3a2b] text-sm font-mono underline">How?</button>
          </div>
        </div>

        {/* AI ANALYSIS */}
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative overflow-hidden border-2 border-[#141210] bg-[#f7f1e5] p-5 space-y-4">
            <motion.div className="absolute left-0 right-0 h-16 bg-[#e2602a]/10"
              animate={{ top: ["-10%", "110%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-7 h-7 text-[#e2602a]" />
                </motion.div>
                <div>
                  <h3 className="font-black uppercase text-[#141210]" style={{ ...headStyle, fontSize: '24px' }}>AI51 Analyzing</h3>
                  <p className="text-[#5a5246] text-xs font-mono uppercase tracking-widest">Advanced computer vision active</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Material identification", delay: 0 },
                  { label: "Brand detection", delay: 0.3 },
                  { label: "Weight analysis", delay: 0.6 },
                  { label: "Fraud verification", delay: 0.9 },
                  { label: "Environmental impact", delay: 1.2 }
                ].map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: item.delay }}
                    className="flex items-center gap-3 bg-[#efe7d6] border border-[#141210] p-3">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: item.delay }}>
                      <CheckCircle2 className="w-5 h-5 text-[#1e3a2b]" />
                    </motion.div>
                    <span className="text-[#141210] font-mono text-sm">{item.label}</span>
                    <motion.div className="ml-auto flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: item.delay }}>
                      <span className="text-[#e2602a]">.</span><span className="text-[#e2602a]">.</span><span className="text-[#e2602a]">.</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-[#1e3a2b] border border-[#141210] p-3">
                <p className="text-[#efe7d6] text-xs font-mono text-center uppercase tracking-wide">⚡ Photo hash verified · GPS locked</p>
              </div>
            </div>
          </motion.div>
        ) : aiAnalysis && aiAnalysis.materials ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="border-2 border-[#141210] border-l-8 border-l-[#1e3a2b] bg-[#f7f1e5] p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-7 h-7 text-[#1e3a2b]" />
              <div>
                <h3 className="font-black uppercase text-[#141210]" style={{ ...headStyle, fontSize: '24px' }}>Quantum Analysis</h3>
                <p className="text-[#5a5246] text-xs font-mono uppercase tracking-widest">AI51 · {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {aiAnalysis.scene_description && (
              <Card accent="#e2602a">
                <Label color="#e2602a"><Eye className="w-4 h-4" />Scene Detected</Label>
                <p className="text-[#141210] font-mono text-sm">{aiAnalysis.scene_description}</p>
                {aiAnalysis.time_of_day_estimate && <p className="text-[#5a5246] font-mono text-xs mt-2">⏰ {aiAnalysis.time_of_day_estimate}</p>}
              </Card>
            )}

            {aiAnalysis.item_by_item_count && (
              <Card accent="#1e3a2b">
                <Label>📊 Items Counted</Label>
                <p className="text-[#141210] font-mono text-sm">{aiAnalysis.item_by_item_count}</p>
              </Card>
            )}

            {aiAnalysis.brands && aiAnalysis.brands.length > 0 && (
              <Card accent="#e2602a">
                <Label color="#e2602a"><Zap className="w-4 h-4" />Brands Detected</Label>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.brands.map((brand, idx) => (
                    <motion.span key={idx} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="bg-[#e2602a] text-[#141210] border border-[#141210] px-3 py-1.5 text-xs font-black font-mono uppercase">{brand}</motion.span>
                  ))}
                </div>
              </Card>
            )}

            <Card accent="#1e3a2b">
              <Label><Recycle className="w-4 h-4" />Materials Identified</Label>
              <div className="flex flex-wrap gap-2">
                {aiAnalysis.materials.map((material, idx) => (
                  <motion.span key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="bg-[#1e3a2b] text-[#efe7d6] border border-[#141210] px-3 py-1.5 text-xs font-bold font-mono">{material}</motion.span>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card accent="#e2602a">
                <Label color="#e2602a">⚖️ Weight</Label>
                <p className="text-3xl font-black font-mono text-[#141210]">{formData.litter_weight}kg</p>
              </Card>
              {aiAnalysis.recyclable_percentage !== undefined && (
                <Card accent="#1e3a2b">
                  <Label>♻️ Recyclable</Label>
                  <p className="text-3xl font-black font-mono text-[#141210]">{aiAnalysis.recyclable_percentage}%</p>
                </Card>
              )}
            </div>

            {(aiAnalysis.ocean_threat_level !== undefined || aiAnalysis.wildlife_danger_score !== undefined) && (
              <Card accent="#e2602a">
                <Label color="#e2602a"><AlertCircle className="w-4 h-4" />Threat Prevented</Label>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {aiAnalysis.ocean_threat_level !== undefined && (
                    <div><p className="text-[10px] font-mono uppercase tracking-widest text-[#5a5246] mb-1">Ocean</p><p className="text-2xl font-black font-mono text-[#e2602a]">{aiAnalysis.ocean_threat_level}/10</p></div>
                  )}
                  {aiAnalysis.wildlife_danger_score !== undefined && (
                    <div><p className="text-[10px] font-mono uppercase tracking-widest text-[#5a5246] mb-1">Wildlife</p><p className="text-2xl font-black font-mono text-[#e2602a]">{aiAnalysis.wildlife_danger_score}/10</p></div>
                  )}
                </div>
              </Card>
            )}

            {aiAnalysis.observations && (
              <Card accent="#1e3a2b">
                <Label>AI51 Notes</Label>
                <div className="text-[#141210] font-mono text-sm leading-relaxed space-y-2" dangerouslySetInnerHTML={{
                  __html: aiAnalysis.observations.split('\n').map(l => l.trim()).filter(l => l)
                    .map(line => `<p>${line.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#e2602a] underline">$1</a>')}</p>`).join('')
                }} />
              </Card>
            )}

            {aiAnalysis.recyclable_percentage > 50 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}
                className="flex items-center justify-center gap-2 bg-[#e2602a] text-[#141210] border border-[#141210] px-4 py-3">
                <span className="text-xl">⭐</span><span className="font-black font-mono uppercase text-sm">Recycling Bonus +20%</span>
              </motion.div>
            )}

            {(aiAnalysis.carbon_saved_kg || aiAnalysis.microplastic_risk) && (
              <Card accent="#1e3a2b">
                <Label><Globe className="w-4 h-4" />Planetary Impact</Label>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {aiAnalysis.carbon_saved_kg && <div><p className="text-[10px] font-mono uppercase tracking-widest text-[#5a5246] mb-1">CO₂ Saved</p><p className="text-xl font-black font-mono text-[#1e3a2b]">{aiAnalysis.carbon_saved_kg}kg</p></div>}
                  {aiAnalysis.microplastic_risk && <div><p className="text-[10px] font-mono uppercase tracking-widest text-[#5a5246] mb-1">Microplastic Risk</p><p className="text-xl font-black font-mono text-[#1e3a2b]">{aiAnalysis.microplastic_risk}</p></div>}
                </div>
              </Card>
            )}

            <div className="bg-[#efe7d6] border border-[#141210] p-3">
              <p className="text-xs text-[#141210] font-mono text-center">
                AI51 confidence: {Math.round((aiAnalysis.confidence_score || 0.95) * 100)}% ·
                {aiAnalysis.fraud_flags && aiAnalysis.fraud_flags.length > 0 ? ' ⚠️ Review needed' : ' ✓ Verified authentic'}
              </p>
            </div>
            <div className="bg-[#1e3a2b] border border-[#141210] p-3">
              <p className="text-xs text-[#efe7d6] font-mono text-center uppercase tracking-wide">🔐 Cryptographic signing ready · Hash chain verified · Tamper-proof</p>
            </div>
          </motion.div>
        ) : (
          <div className="border-2 border-[#141210] bg-[#f7f1e5] p-6 text-center">
            <p className="text-[#5a5246] font-mono text-sm uppercase tracking-widest">Enter cleanup details below</p>
          </div>
        )}

        {/* PHOTOS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#5a5246] text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />Before</p>
            <div className="border-2 border-[#141210] overflow-hidden">
              <img src={formData.photo_url} alt="Before" className="w-full h-48 object-cover" />
            </div>
          </div>
          <div>
            <p className="text-[#5a5246] text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />After (optional)</p>
            {afterPhoto ? (
              <div className="border-2 border-[#141210] overflow-hidden relative">
                <img src={afterPhoto} alt="After" className="w-full h-48 object-cover" />
                <button onClick={() => setAfterPhoto(null)} className="absolute top-2 right-2 bg-[#efe7d6] border border-[#141210] p-1">
                  <X className="w-4 h-4 text-[#141210]" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input type="file" accept="image/*" capture="environment"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => setAfterPhoto(reader.result);
                    reader.readAsDataURL(file);
                  }} className="hidden" />
                <div className="border-2 border-dashed border-[#141210] h-48 flex flex-col items-center justify-center hover:bg-[#e2602a]/10 transition-colors">
                  <Camera className="w-8 h-8 text-[#e2602a] mb-2" /><span className="text-[#141210] font-mono text-sm">Tap to add</span>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* EDIT FIELDS */}
        <div className="space-y-4">
          <div>
            <label className="text-[#5a5246] font-mono text-[10px] uppercase tracking-widest mb-2 block flex items-center gap-2">
              Weight (kg)
              {aiAnalysis?.estimated_weight_kg && <span className="text-[#1e3a2b] text-[10px]">✓ AI detected</span>}
            </label>
            <Input type="number" step="0.001" min="0.005" value={formData.litter_weight}
              onChange={(e) => setFormData({ ...formData, litter_weight: parseFloat(e.target.value) || 0 })}
              className="bg-[#f7f1e5] border-[#141210] text-[#141210] text-lg font-mono" />
            <p className="text-[#5a5246] text-xs font-mono mt-1">AI auto-filled · edit if needed</p>
          </div>
          <div>
            <label className="text-[#5a5246] font-mono text-[10px] uppercase tracking-widest mb-2 block flex items-center gap-2">
              Location
              {aiAnalysis?.estimated_location && <span className="text-[#1e3a2b] text-[10px]">✓ AI detected</span>}
            </label>
            <Input value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="AI auto-fills from photo" className="bg-[#f7f1e5] border-[#141210] text-[#141210] font-mono" />
          </div>
          <div>
            <label className="text-[#5a5246] font-mono text-[10px] uppercase tracking-widest mb-2 block flex items-center gap-2">
              Area
              {aiAnalysis?.estimated_location_detail && <span className="text-[#1e3a2b] text-[10px]">✓ AI detected</span>}
            </label>
            <Input value={formData.county}
              onChange={(e) => setFormData({ ...formData, county: e.target.value })}
              placeholder="AI auto-fills from photo" className="bg-[#f7f1e5] border-[#141210] text-[#141210] font-mono" />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-1">
          <Button onClick={() => setStep('landing')} variant="outline"
            className="flex-1 border-2 border-[#141210] text-[#141210] py-6 font-black font-mono uppercase hover:bg-[#141210] hover:text-[#efe7d6]">Back</Button>
          <Button onClick={() => { calculateTokens(); setStep('review'); }}
            className="flex-1 bg-[#e2602a] hover:bg-[#141210] hover:text-[#efe7d6] border-2 border-[#141210] text-[#141210] py-6 font-black font-mono uppercase">
            <CheckCircle2 className="w-5 h-5 mr-2" />Continue
          </Button>
        </div>
      </div>
    </div>
  );
}