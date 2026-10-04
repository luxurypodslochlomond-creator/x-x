import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WifiOff, Recycle, Share2 } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { COOLASFUCKHeart, COOLASFUCKMusicNote } from '@/components/shared/COOLASFUCKIcon';
import P51Symbol from '@/components/shared/P51Symbol';
import FraudDetectionModal from '@/components/cleanup/FraudDetectionModal';
import TechExplainerModal from '@/components/cleanup/TechExplainerModal';

const headStyle = { fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', letterSpacing: '-0.02em' };

export default function CleanupSuccess({
  formData, step, setStep, setCapturedPhotos, setFormData, setAiAnalysis, setAfterPhoto,
  handleShare, showFraudModal, setShowFraudModal, showTechModal, setShowTechModal
}) {
  const navigate = useNavigate();

  const resetForAnother = () => {
    setStep('landing');
    setCapturedPhotos([]);
    setFormData({
      location: '', county: '', coordinates: formData.coordinates,
      litter_weight: 0, photo_url: '', cleanup_type: 'street',
      weather_conditions: '', notes: '', tokens_awarded: 0,
      tokens_instant: 0, tokens_pending: 0,
      instant_payout_percentage: 100, verification_status: 'instant_paid'
    });
    setAiAnalysis(null);
    setAfterPhoto(null);
  };

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-6 pt-24 lg:pt-6" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
          <div className="bg-[#f7f1e5] border-2 border-[#141210] p-6 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1e3a2b]" />

            {step === 'success_offline' ? (
              <>
                <WifiOff className="w-14 h-14 text-[#e2602a] mx-auto mb-4 mt-2" />
                <p className="font-black font-mono uppercase text-[#e2602a] mb-2" style={{ ...headStyle, fontSize: 'clamp(24px,7vw,32px)' }}>Saved Offline</p>
                <p className="text-[#5a5246] font-mono text-sm mb-2">Will sync + AI verify when online</p>
                <p className="text-[#1e3a2b] text-xs font-mono">✓ Zero fraud · AI checks photo</p>
              </>
            ) : (
              <>
                <div className="mt-2"><COOLASFUCKHeart size={56} animate={true} className="mx-auto mb-3" /></div>
                <p className="font-black font-mono uppercase text-[#1e3a2b] mb-1" style={{ ...headStyle, fontSize: 'clamp(30px,9vw,42px)' }}>
                  +{formData.tokens_awarded.toFixed(1)} <P51Symbol showTooltip={true} />
                </p>
                <p className="text-[#141210] font-black font-mono text-xs uppercase tracking-widest">Cleanup Verified</p>
              </>
            )}
          </div>

          <div className="bg-[#f7f1e5] border-2 border-[#141210] p-5">
            <h2 className="font-black font-mono uppercase text-[#141210] text-center mb-5" style={{ ...headStyle, fontSize: 'clamp(20px,6vw,26px)' }}>What's Next?</h2>
            <div className="space-y-3">
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={resetForAnother}
                className="w-full bg-[#1e3a2b] hover:bg-[#141210] border-2 border-[#141210] text-[#efe7d6] py-4 font-black font-mono uppercase text-base flex items-center justify-center gap-3 transition-colors">
                <Recycle className="w-5 h-5" /> Another Cleanup
              </motion.button>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('Radio'))}
                className="w-full bg-[#f7f1e5] hover:bg-[#e2602a] hover:text-[#141210] border-2 border-[#141210] text-[#141210] py-4 font-black font-mono uppercase text-base flex items-center justify-center gap-3 transition-colors">
                <COOLASFUCKMusicNote size={22} animate={true} /> Listen To Music
              </motion.button>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('FrequencyChamber'))}
                className="w-full bg-[#f7f1e5] hover:bg-[#e2602a] hover:text-[#141210] border-2 border-[#141210] text-[#141210] py-4 font-black font-mono uppercase text-base flex items-center justify-center gap-3 transition-colors">
                <COOLASFUCKHeart size={22} animate={true} /> Heal
              </motion.button>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('Profile'))}
                className="w-full bg-[#e2602a] hover:bg-[#141210] hover:text-[#efe7d6] border-2 border-[#141210] text-[#141210] py-4 font-black font-mono uppercase text-base flex items-center justify-center gap-3 transition-colors">
                <P51Symbol /> See Balance
              </motion.button>
            </div>
          </div>

          {step === 'success' && (
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="w-full bg-[#141210] hover:bg-[#e2602a] hover:text-[#141210] border-2 border-[#141210] text-[#efe7d6] py-4 font-black font-mono uppercase flex items-center justify-center gap-2 transition-colors">
              <Share2 className="w-5 h-5" /> Share Your Impact
            </motion.button>
          )}
        </motion.div>
      </div>

      <FraudDetectionModal isOpen={showFraudModal} onClose={() => setShowFraudModal(false)} />
      <TechExplainerModal isOpen={showTechModal} onClose={() => setShowTechModal(false)} />
    </div>
  );
}