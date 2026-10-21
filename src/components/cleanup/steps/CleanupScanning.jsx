import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Loader2, Zap, CheckCircle2, Eye } from 'lucide-react';

const headStyle = { fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' };

export default function CleanupScanning({ formData, afterPhoto, setAfterPhoto, isOffline }) {
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-6 pt-24 lg:pt-6" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Sparkles className="w-7 h-7 text-[#e2602a] animate-pulse" />
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <Loader2 className="w-7 h-7 text-[#1e3a2b]" />
              </motion.div>
              <Zap className="w-7 h-7 text-[#e2602a] animate-pulse" />
            </div>
            <h2 className="font-black uppercase text-[#141210]" style={{ ...headStyle, fontSize: 'clamp(30px, 9vw, 44px)' }}>Scanning</h2>
          </div>

          <div className="border-2 border-[#141210] bg-[#f7f1e5] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#e2602a]" />
                <span className="text-[#141210] font-black font-mono uppercase text-sm">Live</span>
              </div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>
                    <CheckCircle2 className="w-5 h-5 text-[#1e3a2b]" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#e2602a] text-sm font-mono underline">Real?</a>
              <span className="text-[#1e3a2b] text-xs font-mono">🔐 Crypto-signed</span>
            </div>
          </div>

          {formData.photo_url && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#5a5246] text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />Before</p>
                <div className="border-2 border-[#141210] overflow-hidden">
                  <img src={formData.photo_url} alt="Before" className="w-full h-48 object-cover" />
                </div>
              </div>
              <div>
                <p className="text-[#5a5246] text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-2"><Camera className="w-4 h-4" />After</p>
                {afterPhoto ? (
                  <div className="border-2 border-[#141210] overflow-hidden">
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
                    <div className="border-2 border-dashed border-[#141210] h-48 flex flex-col items-center justify-center hover:bg-[#e2602a]/10 transition-colors">
                      <Camera className="w-8 h-8 text-[#e2602a] mb-2" />
                      <span className="text-[#141210] font-mono text-sm">Tap to add AFTER photo</span>
                      <span className="text-[#5a5246] font-mono text-xs mt-1">(optional)</span>
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          <p className="text-center text-[#5a5246] text-sm font-mono uppercase tracking-widest">
            {isOffline ? 'Saving locally…' : 'AI analyzing…'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}