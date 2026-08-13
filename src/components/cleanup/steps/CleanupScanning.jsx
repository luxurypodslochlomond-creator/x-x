import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Loader2, Zap, CheckCircle2, Eye } from 'lucide-react';

export default function CleanupScanning({ formData, afterPhoto, setAfterPhoto, isOffline }) {
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <Loader2 className="w-8 h-8 text-cyan-500" />
              </motion.div>
              <Zap className="w-8 h-8 text-amber-500 animate-pulse" />
            </div>
            <h2 className="text-4xl font-black">SCANNING</h2>
          </div>

          <div className="border-2 border-cyan-500 bg-cyan-500/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-bold">LIVE</span>
              </div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-cyan-400 text-sm underline">Real?</a>
              <span className="text-green-400 text-xs font-mono">🔐 Crypto-signed</span>
            </div>
          </div>

          {formData.photo_url && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/60 text-xs mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />BEFORE</p>
                <div className="border-2 border-green-500 rounded-lg overflow-hidden">
                  <img src={formData.photo_url} alt="Before" className="w-full h-48 object-cover" />
                </div>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />AFTER</p>
                {afterPhoto ? (
                  <div className="border-2 border-green-500 rounded-lg overflow-hidden">
                    <img src={afterPhoto} alt="After" className="w-full h-48 object-cover" />
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
                      }}
                      className="hidden" />
                    <div className="border-2 border-dashed border-cyan-500 rounded-lg h-48 flex flex-col items-center justify-center hover:border-cyan-400 transition-all">
                      <Camera className="w-8 h-8 text-cyan-400 mb-2" />
                      <span className="text-cyan-400 text-sm">Tap to add AFTER photo</span>
                      <span className="text-cyan-400/60 text-xs mt-1">(optional)</span>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          <p className="text-center text-white/60 text-sm font-mono">
            {isOffline ? 'Saving locally...' : 'AI analyzing...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}