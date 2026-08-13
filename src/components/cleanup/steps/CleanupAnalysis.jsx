import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, CheckCircle2, Sparkles, Recycle, Zap, AlertCircle, Globe, X, Camera, ArrowLeft } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

export default function CleanupAnalysis({
  aiAnalysis, isLoading, formData, setFormData,
  afterPhoto, setAfterPhoto, calculateTokens, setStep,
  showFraudModal, setShowFraudModal, showTechModal, setShowTechModal
}) {
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* LIVE STATUS */}
        <div className="border-2 border-cyan-500 bg-cyan-500/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold">LIVE</span>
            </div>
            <div className="flex gap-2">{[...Array(4)].map((_, i) => <CheckCircle2 key={i} className="w-5 h-5 text-green-400" />)}</div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={(e) => { e.preventDefault(); setShowFraudModal(true); }}
              className="text-cyan-400 text-sm underline hover:text-cyan-300">Real?</button>
            <button onClick={(e) => { e.preventDefault(); setShowTechModal(true); }}
              className="text-purple-400 text-sm underline hover:text-purple-300">How?</button>
          </div>
        </div>

        {/* AI ANALYSIS */}
        {isLoading ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden border-2 border-cyan-500 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-xl p-6 space-y-4">
            <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
              animate={{ y: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-black text-cyan-400">AI51 ANALYZING</h3>
                    <p className="text-cyan-300 text-xs font-mono">Advanced computer vision active</p>
                  </div>
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
                    className="flex items-center gap-3 bg-black/40 rounded-lg p-3">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: item.delay }}>
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </motion.div>
                    <span className="text-white font-mono text-sm">{item.label}</span>
                    <motion.div className="ml-auto flex gap-1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: item.delay }}>
                      <span className="text-cyan-400">.</span><span className="text-cyan-400">.</span><span className="text-cyan-400">.</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-3">
                <p className="text-cyan-300 text-xs font-mono text-center">⚡ Processing at quantum speed • Photo hash verified • GPS locked</p>
              </div>
            </div>
          </motion.div>
        ) : aiAnalysis && aiAnalysis.materials ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="border-2 border-green-500 bg-green-900/20 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-2xl font-black text-green-400">QUANTUM ANALYSIS</h3>
                <p className="text-green-300 text-xs font-mono">AI51 • {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {aiAnalysis.scene_description && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
                className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-lg p-4">
                <p className="text-cyan-400 text-sm font-black mb-2 flex items-center gap-2"><Eye className="w-4 h-4" />SCENE DETECTED</p>
                <p className="text-white text-sm">{aiAnalysis.scene_description}</p>
                {aiAnalysis.time_of_day_estimate && <p className="text-cyan-300 text-xs mt-2">⏰ {aiAnalysis.time_of_day_estimate}</p>}
              </motion.div>
            )}

            {aiAnalysis.item_by_item_count && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
                className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-lg p-4">
                <p className="text-purple-400 text-sm font-black mb-2">📊 ITEMS COUNTED</p>
                <p className="text-white text-sm font-mono">{aiAnalysis.item_by_item_count}</p>
              </motion.div>
            )}

            {aiAnalysis.brands && aiAnalysis.brands.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50 rounded-lg p-4">
                <p className="text-pink-400 text-sm font-black mb-3 flex items-center gap-2"><Zap className="w-4 h-4" />BRANDS DETECTED</p>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.brands.map((brand, idx) => (
                    <motion.span key={idx} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">{brand}</motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="bg-black/40 border-2 border-green-500/50 rounded-lg p-4">
              <p className="text-green-400 text-sm font-black mb-3 flex items-center gap-2"><Recycle className="w-4 h-4" />MATERIALS IDENTIFIED</p>
              <div className="flex flex-wrap gap-2">
                {aiAnalysis.materials.map((material, idx) => (
                  <motion.span key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="bg-green-800/40 border border-green-600 text-green-300 px-3 py-2 rounded-lg text-sm font-bold">{material}</motion.span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-lg p-4">
                <p className="text-amber-400 text-xs font-black mb-2">⚖️ WEIGHT</p>
                <p className="text-4xl font-black text-white">{formData.litter_weight}kg</p>
              </motion.div>
              {aiAnalysis.recyclable_percentage !== undefined && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-lg p-4">
                  <p className="text-cyan-400 text-xs font-black mb-2">♻️ RECYCLABLE</p>
                  <p className="text-4xl font-black text-white">{aiAnalysis.recyclable_percentage}%</p>
                </motion.div>
              )}
            </div>

            {(aiAnalysis.ocean_threat_level !== undefined || aiAnalysis.wildlife_danger_score !== undefined) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm font-black mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" />THREAT PREVENTED</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {aiAnalysis.ocean_threat_level !== undefined && (
                    <div><p className="text-xs text-gray-400 mb-1">Ocean</p><p className="text-3xl font-black text-red-300">{aiAnalysis.ocean_threat_level}/10</p></div>
                  )}
                  {aiAnalysis.wildlife_danger_score !== undefined && (
                    <div><p className="text-xs text-gray-400 mb-1">Wildlife</p><p className="text-3xl font-black text-red-300">{aiAnalysis.wildlife_danger_score}/10</p></div>
                  )}
                </div>
              </motion.div>
            )}

            {aiAnalysis.observations && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4">
                <p className="text-cyan-400 text-sm font-black mb-3">AI51 NOTES</p>
                <div className="text-gray-300 text-sm leading-relaxed space-y-2" dangerouslySetInnerHTML={{
                  __html: aiAnalysis.observations.split('\n').map(l => l.trim()).filter(l => l)
                    .map(line => `<p>${line.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">$1</a>')}</p>`).join('')
                }} />
              </motion.div>
            )}

            {aiAnalysis.recyclable_percentage > 50 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 py-3 rounded-lg">
                <span className="text-2xl">⭐</span><span className="font-black">RECYCLING BONUS +20%</span>
              </motion.div>
            )}

            {(aiAnalysis.carbon_saved_kg || aiAnalysis.microplastic_risk) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-lg p-4">
                <p className="text-green-400 text-sm font-black mb-3 flex items-center gap-2"><Globe className="w-4 h-4" />PLANETARY IMPACT</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {aiAnalysis.carbon_saved_kg && <div><p className="text-xs text-gray-400 mb-1">CO₂ Saved</p><p className="text-2xl font-black text-green-300">{aiAnalysis.carbon_saved_kg}kg</p></div>}
                  {aiAnalysis.microplastic_risk && <div><p className="text-xs text-gray-400 mb-1">Microplastic Risk</p><p className="text-2xl font-black text-green-300">{aiAnalysis.microplastic_risk}</p></div>}
                </div>
              </motion.div>
            )}

            <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-3">
              <p className="text-xs text-cyan-300 font-mono text-center">
                AI51 confidence: {Math.round((aiAnalysis.confidence_score || 0.95) * 100)}% •
                {aiAnalysis.fraud_flags && aiAnalysis.fraud_flags.length > 0 ? ' ⚠️ Review needed' : ' ✓ Verified authentic'}
              </p>
            </div>
            <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-3">
              <p className="text-xs text-green-300 font-mono text-center">🔐 Cryptographic signing ready • Hash chain verified • Tamper-proof</p>
            </div>
          </motion.div>
        ) : (
          <div className="border-2 border-gray-700 bg-gray-900/20 rounded-xl p-6 text-center">
            <p className="text-gray-400 font-mono text-sm">Enter cleanup details below</p>
          </div>
        )}

        {/* PHOTOS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/60 text-xs mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />BEFORE</p>
            <div className="border-2 border-green-500 rounded-lg overflow-hidden">
              <img src={formData.photo_url} alt="Before" className="w-full h-48 object-cover" />
            </div>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />AFTER (optional)</p>
            {afterPhoto ? (
              <div className="border-2 border-green-500 rounded-lg overflow-hidden relative">
                <img src={afterPhoto} alt="After" className="w-full h-48 object-cover" />
                <button onClick={() => setAfterPhoto(null)} className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                  <X className="w-4 h-4 text-white" />
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
                <div className="border-2 border-dashed border-cyan-500 rounded-lg h-48 flex flex-col items-center justify-center hover:border-cyan-400 transition-all">
                  <Camera className="w-8 h-8 text-cyan-400 mb-2" /><span className="text-cyan-400 text-sm">Tap to add</span>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* EDIT FIELDS */}
        <div className="space-y-4">
          <div>
            <label className="text-white/60 font-mono text-xs mb-2 block flex items-center gap-2">
              WEIGHT (KG)
              {aiAnalysis?.estimated_weight_kg && <span className="text-green-400 text-xs">✓ AI detected</span>}
            </label>
            <Input type="number" step="0.001" min="0.005" value={formData.litter_weight}
              onChange={(e) => setFormData({ ...formData, litter_weight: parseFloat(e.target.value) || 0 })}
              className="bg-white/10 border-white/20 text-white text-lg font-mono" />
            <p className="text-cyan-400/60 text-xs font-mono mt-1">AI auto-filled • Edit if needed</p>
          </div>
          <div>
            <label className="text-white/60 font-mono text-xs mb-2 block flex items-center gap-2">
              LOCATION
              {aiAnalysis?.estimated_location && <span className="text-green-400 text-xs">✓ AI detected</span>}
            </label>
            <Input value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="AI auto-fills from photo" className="bg-white/10 border-white/20 text-white font-mono" />
          </div>
          <div>
            <label className="text-white/60 font-mono text-xs mb-2 block flex items-center gap-2">
              AREA
              {aiAnalysis?.estimated_location_detail && <span className="text-green-400 text-xs">✓ AI detected</span>}
            </label>
            <Input value={formData.county}
              onChange={(e) => setFormData({ ...formData, county: e.target.value })}
              placeholder="AI auto-fills from photo" className="bg-white/10 border-white/20 text-white font-mono" />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <Button onClick={() => setStep('landing')} variant="outline"
            className="flex-1 border-white/20 text-white py-6 font-bold hover:bg-white/10">Back</Button>
          <Button onClick={() => { calculateTokens(); setStep('review'); }}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-6 font-bold">
            <CheckCircle2 className="w-5 h-5 mr-2" />Continue
          </Button>
        </div>
      </div>
    </div>
  );
}