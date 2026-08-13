import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WifiOff, Recycle, Share2 } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { COOLASFUCKHeart, COOLASFUCKMusicNote } from '@/components/shared/COOLASFUCKIcon';
import P51Symbol from '@/components/shared/P51Symbol';
import FraudDetectionModal from '@/components/cleanup/FraudDetectionModal';
import TechExplainerModal from '@/components/cleanup/TechExplainerModal';

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
    <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
          <div className="bg-black border-4 border-green-500 p-6 text-center relative">
            <div className="absolute top-0 left-0 w-4 h-4 bg-green-500" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-green-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500" />

            {step === 'success_offline' ? (
              <>
                <WifiOff className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <p className="text-3xl font-black font-mono text-amber-400 mb-2">SAVED OFFLINE</p>
                <p className="text-amber-300 font-mono text-sm mb-2">Will sync + AI verify when online</p>
                <p className="text-cyan-400 text-xs font-mono">✓ Zero fraud • AI checks photo</p>
              </>
            ) : (
              <>
                <COOLASFUCKHeart size={64} animate={true} className="mx-auto mb-4" />
                <p className="text-4xl font-black font-mono text-green-400 mb-2">
                  +{formData.tokens_awarded.toFixed(1)} <P51Symbol showTooltip={true} />
                </p>
                <p className="text-green-300 font-black font-mono text-sm">CLEANUP VERIFIED</p>
              </>
            )}
          </div>

          <div className="bg-black border-4 border-cyan-500 p-6">
            <h2 className="text-2xl font-black font-mono text-cyan-400 text-center mb-6">WHAT'S NEXT?</h2>
            <div className="space-y-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={resetForAnother}
                className="w-full bg-green-600 hover:bg-green-700 border-4 border-green-400 text-black py-5 font-black font-mono text-lg flex items-center justify-center gap-3">
                <Recycle className="w-6 h-6" /> ANOTHER CLEANUP
              </motion.button>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('Radio'))}
                className="w-full bg-purple-600 hover:bg-purple-700 border-4 border-purple-400 text-white py-5 font-black font-mono text-lg flex items-center justify-center gap-3">
                <COOLASFUCKMusicNote size={24} animate={true} /> LISTEN TO MUSIC
              </motion.button>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('FrequencyChamber'))}
                className="w-full bg-pink-600 hover:bg-pink-700 border-4 border-pink-400 text-white py-5 font-black font-mono text-lg flex items-center justify-center gap-3">
                <COOLASFUCKHeart size={24} animate={true} /> HEAL
              </motion.button>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('Profile'))}
                className="w-full bg-amber-600 hover:bg-amber-700 border-4 border-amber-400 text-black py-5 font-black font-mono text-lg flex items-center justify-center gap-3">
                <P51Symbol /> SEE BALANCE
              </motion.button>
            </div>
          </div>

          {step === 'success' && (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 border-4 border-cyan-400 text-white py-4 font-black font-mono flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" /> SHARE YOUR IMPACT
            </motion.button>
          )}
        </motion.div>
      </div>

      <FraudDetectionModal isOpen={showFraudModal} onClose={() => setShowFraudModal(false)} />
      <TechExplainerModal isOpen={showTechModal} onClose={() => setShowTechModal(false)} />
    </div>
  );
}