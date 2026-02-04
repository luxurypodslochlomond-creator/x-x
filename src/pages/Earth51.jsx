import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, Loader2, CheckCircle2, Zap, Share2, X, MapPin, Shield, Lock, Eye, Heart, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import P51Symbol from '@/components/shared/P51Symbol';
import AILitterVerification from '@/components/earth51/AILitterVerification';

/**
 * EARTH51 - KIDS EDITION
 * Photo → Weight → $P51 → Unlock Volckano Levels
 * Simple. Direct. Coolasfuck.
 */

export default function Earth51() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState('landing');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [aiVerification, setAiVerification] = useState(null);
  const [showP51Explainer, setShowP51Explainer] = useState(false);
  const [showParentInfo, setShowParentInfo] = useState(false);

  // HIDE MAIN NAV FOR KIDS EXPERIENCE
  useEffect(() => {
    document.body.style.setProperty('--hide-main-nav', 'true');
    return () => document.body.style.removeProperty('--hide-main-nav');
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const createCleanupMutation = useMutation({
    mutationFn: async (cleanupData) => {
      return await base44.entities.Cleanup.create(cleanupData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleanups'] });
    }
  });

  const handlePhotoCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      if (isOffline) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoUrl(reader.result);
          setStep('weight');
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        const uploadResult = await base44.functions.invoke('uploadToIPFS', { file });
        setPhotoUrl(uploadResult.file_url);
        setStep('weight');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Upload failed. Try again bro.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!weight || parseFloat(weight) < 0.005) {
      setError('Need at least 5g (even one wrapper!)');
      return;
    }

    try {
      setIsLoading(true);
      const weightNum = parseFloat(weight);
      const baseTokens = weightNum * 1;
      const bonus = baseTokens * 0.2;
      const total = baseTokens + bonus;

      setTokensEarned(Math.round(total * 10) / 10);

      const cleanupData = {
        photo_url: photoUrl,
        location: location || 'Earth51 Cleanup',
        county: location || 'Somewhere Amazing',
        litter_weight: weightNum,
        cleanup_type: 'street',
        tokens_awarded: total,
        tokens_instant: total,
        tokens_pending: 0,
        verification_status: 'instant_paid',
        // AI VERIFICATION DATA
        ai_brands_detected: aiVerification?.brands?.map(b => b.brand_name).join(', ') || null,
        ai_corporate_accountability: aiVerification?.corporate_accountability || null,
        ai_verification_summary: aiVerification?.verification_summary || null
      };

      if (!isOffline) {
        await createCleanupMutation.mutateAsync(cleanupData);
        const user = await base44.auth.me().catch(() => null);
        if (user) {
          await base44.auth.updateMe({
            p51_balance: (user.p51_balance || 0) + total
          });
        }
      }

      setStep('success');
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Submission failed');
      setIsLoading(false);
    }
  };

  // LANDING
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* 8-BIT HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-cyan-500">
          <div className="max-w-xl mx-auto p-3 flex items-center justify-between">
            <motion.button
              onClick={() => navigate(createPageUrl('Welcome'))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-pink-500 flex items-center justify-center shadow-lg border-2 border-pink-400"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }}>
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="4" strokeLinecap="square"/>
              </svg>
            </motion.button>

            <div className="text-center">
              <motion.h1 
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl font-black font-mono text-green-400"
                style={{ textShadow: '2px 2px 0px #000, 4px 4px 0px rgba(6, 182, 212, 0.5)' }}
              >
                earth.love
              </motion.h1>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="w-2 h-2 bg-pink-500 animate-pulse"></span>
                <p className="text-[10px] font-black font-mono text-cyan-400">KIDS EDITION</p>
                <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
              </div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-12 border-2 border-cyan-500 bg-black flex items-center justify-center"
            >
              <span className="text-2xl">🌍</span>
            </motion.div>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-3 pt-20 p-3 pb-32">
          
          {/* 8-BIT AI51 MESSAGE */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-cyan-500 border-4 border-cyan-400 p-4"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 bg-black border-2 border-white flex items-center justify-center flex-shrink-0"
              >
                <span className="text-2xl">🤖</span>
              </motion.div>
              <div className="flex-1">
                <div className="bg-black border-2 border-white p-3 mb-2">
                  <p className="text-green-400 font-black font-mono text-xs leading-relaxed">
                    HEY FRIEND! I'M AI51 :)
                  </p>
                </div>
                <div className="bg-white border-2 border-black p-3">
                  <p className="text-black font-bold font-mono text-xs leading-relaxed">
                    TAKE PHOTO → I CHECK → YOU GET $PHOTO51 → USE IN VOLCKANO! 🌋
                  </p>
                </div>
              </div>
            </div>
          </motion.div>



          <AnimatePresence>
            {showParentInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-blue-500 border-4 border-blue-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <div className="bg-black border-2 border-white p-4 mb-3">
                    <h3 className="text-blue-400 font-black font-mono text-lg">FOR PARENTS</h3>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-green-500 border-2 border-green-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-1">ZERO PERSONAL DATA</p>
                      <p className="text-black font-mono text-[10px]">No names. No tracking. Just photos.</p>
                    </div>

                    <div className="bg-cyan-500 border-2 border-cyan-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-1">AI SAFETY CHECK</p>
                      <p className="text-black font-mono text-[10px]">Every photo checked. Blocks bad stuff.</p>
                    </div>

                    <div className="bg-purple-500 border-2 border-purple-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-1">$PHOTO51</p>
                      <p className="text-black font-mono text-[10px]">Game coins. Not real money. Named after scientist!</p>
                    </div>

                    <div className="bg-pink-500 border-2 border-pink-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-1">EDUCATION</p>
                      <p className="text-black font-mono text-[10px]">Teaches Earth care + responsibility.</p>
                    </div>
                  </div>

                  <div className="bg-black border-2 border-white p-2 mt-3">
                    <p className="text-green-400 font-mono text-[9px] text-center">
                      COPPA/GDPR SAFE • OPEN SOURCE • BUILT WITH ❤️
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 8-BIT TILES */}
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                className="hidden"
                id="photo-upload-main"
              />
              <motion.button
                onClick={() => document.getElementById('photo-upload-main').click()}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-500 border-4 border-green-400 p-5 disabled:opacity-50 aspect-square flex flex-col items-center justify-center"
                style={{ boxShadow: '4px 4px 0px #000' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-16 h-16 bg-black border-2 border-white mb-3 flex items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-green-400" />
                </motion.div>
                <p className="text-black font-black font-mono text-sm">TAKE PHOTO</p>
              </motion.button>
            </label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(createPageUrl('Volckano'))}
              className="w-full bg-orange-500 border-4 border-orange-400 p-5 aspect-square flex flex-col items-center justify-center"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-16 h-16 bg-black border-2 border-white mb-3 flex items-center justify-center"
              >
                <span className="text-4xl">🌋</span>
              </motion.div>
              <p className="text-black font-black font-mono text-sm">VOLCKANO</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowP51Explainer(!showP51Explainer)}
              className="w-full bg-purple-500 border-4 border-purple-400 p-5 aspect-square flex flex-col items-center justify-center"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 bg-black border-2 border-white mb-3 flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-purple-400" />
              </motion.div>
              <p className="text-black font-black font-mono text-xs text-center">WHAT IS $PHOTO51?</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowParentInfo(!showParentInfo)}
              className="w-full bg-blue-500 border-4 border-blue-400 p-5 aspect-square flex flex-col items-center justify-center"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 bg-black border-2 border-white mb-3 flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-blue-400" />
              </motion.div>
              <p className="text-black font-black font-mono text-xs text-center">PARENTS INFO</p>
            </motion.button>
          </div>



          <AnimatePresence>
            {showP51Explainer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-purple-500 border-4 border-purple-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <div className="bg-black border-2 border-white p-4 mb-3">
                    <h3 className="text-purple-400 font-black font-mono text-xl mb-2">$PHOTO51</h3>
                    <p className="text-white font-mono text-xs leading-relaxed">
                      Named after scientist Rosalind Franklin's DNA photo! Your reward for cleaning Earth.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-green-500 border-2 border-green-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">HOW YOU EARN:</p>
                      <p className="text-black font-mono text-[10px]">• 1kg litter = 1 $PHOTO51</p>
                      <p className="text-black font-mono text-[10px]">• +20% bonus!</p>
                      <p className="text-black font-mono text-[10px]">• Even tiny cleanups count</p>
                    </div>

                    <div className="bg-cyan-500 border-2 border-cyan-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">WHAT YOU DO:</p>
                      <p className="text-black font-mono text-[10px]">• Unlock Volckano powers</p>
                      <p className="text-black font-mono text-[10px]">• Send to friends</p>
                      <p className="text-black font-mono text-[10px]">• Save up!</p>
                    </div>

                    <div className="bg-black border-2 border-white p-3">
                      <p className="text-green-400 font-mono text-[10px] text-center">
                        Not real money - just fun game coins!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 8-BIT FOOTER */}
          <div className="bg-black border-4 border-cyan-500 p-4 text-center" style={{ boxShadow: '4px 4px 0px rgba(6, 182, 212, 0.5)' }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-cyan-400 font-black font-mono text-xs">
                🤖 I'M HERE TO HELP! 🌍
              </p>
            </motion.div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
              <span className="w-2 h-2 bg-pink-500 animate-pulse"></span>
              <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WEIGHT STEP
  if (step === 'weight') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* 8-BIT HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-cyan-500">
          <div className="flex items-center justify-between p-3">
            <button
              onClick={() => {
                setStep('landing');
                setPhotoUrl(null);
                setWeight('');
                setLocation('');
              }}
              className="bg-pink-500 border-2 border-pink-400 px-3 py-2 flex items-center gap-2"
              style={{ boxShadow: '2px 2px 0px #000' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }}>
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="4" strokeLinecap="square"/>
              </svg>
              <span className="font-black font-mono text-xs">BACK</span>
            </button>
            <span className="font-black font-mono text-green-400">STEP 2</span>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-4 pt-20 p-3 pb-24">
          {/* PHOTO PREVIEW */}
          <div className="border-4 border-green-500 overflow-hidden" style={{ boxShadow: '4px 4px 0px #000' }}>
            <img src={photoUrl} alt="Cleanup" className="w-full h-48 object-cover" />
          </div>

          {/* AI VERIFICATION */}
          <AILitterVerification 
            photoUrl={photoUrl}
            onVerified={(data) => {
              setAiVerification(data);
              if (data.litter_analysis?.estimated_weight_kg) {
                setWeight(data.litter_analysis.estimated_weight_kg.toString());
              }
              if (data.litter_analysis?.location_type) {
                setLocation(data.litter_analysis.location_type);
              }
            }}
          />

          {/* INPUT */}
          <div className="space-y-3">
            <label className="block">
              <p className="text-green-400 font-black font-mono text-sm mb-2">HOW MUCH LITTER? (kg)</p>
              <input
                type="number"
                step="0.01"
                min="0.005"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.5"
                className="w-full bg-black border-4 border-cyan-500 text-white text-2xl font-black font-mono p-4 text-center"
                style={{ boxShadow: '4px 4px 0px rgba(6, 182, 212, 0.5)' }}
              />
              <p className="text-cyan-300 text-[10px] font-mono mt-2 text-center">Even 5g counts • Be honest!</p>
            </label>

            <label className="block">
              <p className="text-cyan-400 font-black font-mono text-xs mb-2">LOCATION (optional)</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. My Street"
                className="w-full bg-black border-2 border-cyan-500/50 text-white font-mono text-sm p-3"
              />
            </label>
          </div>

          {error && (
            <div className="bg-red-500 border-4 border-red-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
              <p className="text-black font-black font-mono text-xs">{error}</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !weight}
            className="w-full bg-green-500 border-4 border-green-400 py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-black animate-spin" />
                <span className="text-black font-black font-mono text-sm">SUBMITTING...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-black" />
                <span className="text-black font-black font-mono text-sm">SUBMIT CLEANUP</span>
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* 8-BIT HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-cyan-500">
          <div className="flex items-center justify-center p-3">
            <span className="font-black font-mono text-xl text-green-400">SUCCESS!</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-4 pt-20 p-3 pb-24">
          {/* CELEBRATION */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-cyan-500 bg-black flex items-center justify-center"
              >
                <span className="text-6xl">🎉</span>
              </motion.div>
            </div>
            <div className="bg-green-500 border-4 border-green-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
              <h1 className="text-4xl font-black font-mono text-black">
                +{tokensEarned}
              </h1>
              <p className="text-2xl font-black font-mono text-black">$PHOTO51</p>
            </div>
            <p className="text-cyan-400 font-black font-mono text-xs">YOU'RE AWESOME! ❤️</p>
          </motion.div>

          {/* WHAT'S NEXT */}
          <div className="bg-cyan-500 border-4 border-cyan-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
            <h2 className="text-xl font-black font-mono text-black text-center mb-4">WHAT'S NEXT?</h2>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('Volckano'))}
                className="w-full bg-orange-500 border-4 border-orange-400 text-black py-4 font-black font-mono text-sm"
                style={{ boxShadow: '4px 4px 0px #000' }}
              >
                🌋 PLAY VOLCKANO
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setStep('landing');
                  setPhotoUrl(null);
                  setWeight('');
                  setLocation('');
                }}
                className="w-full bg-green-500 border-4 border-green-400 text-black py-4 font-black font-mono text-sm"
                style={{ boxShadow: '4px 4px 0px #000' }}
              >
                ♻️ CLEAN MORE
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(createPageUrl('Profile'))}
                className="w-full bg-purple-500 border-4 border-purple-400 text-black py-4 font-black font-mono text-sm"
                style={{ boxShadow: '4px 4px 0px #000' }}
              >
                💰 MY BALANCE
              </motion.button>
            </div>
          </div>

          {/* AI51 FINAL MESSAGE */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="bg-black border-4 border-pink-500 p-4 text-center"
            style={{ boxShadow: '4px 4px 0px rgba(236, 72, 153, 0.5)' }}
          >
            <p className="text-pink-400 font-black font-mono text-xs">
              🤖 YOU'RE HEALING EARTH! 🌍
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
              <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
              <span className="w-2 h-2 bg-pink-500 animate-pulse"></span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
}