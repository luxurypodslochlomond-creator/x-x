import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, Loader2, CheckCircle2, Zap, Share2, X, MapPin, Shield, Lock, Eye, Heart, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import P51Symbol from '@/components/shared/P51Symbol';
import PrivacyFirstEngine from '@/components/earth51/PrivacyFirstEngine';
import Earth518BitIcon from '@/components/earth51/Earth518BitIcon';
import LiveClock from '@/components/shared/LiveClock';

/**
 * EARTH51 - KIDS EDITION
 * Photo → Weight → $P51 → Unlock Volckano Levels
 * Simple. Direct. Coolasfuck.
 */

export default function Earth51() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState('landing');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showP51Explainer, setShowP51Explainer] = useState(false);
  const [showResonance, setShowResonance] = useState(false);
  const [allChecks, setAllChecks] = useState(null);
  const [trustScore, setTrustScore] = useState(null);
  const [fraudBlocked, setFraudBlocked] = useState(false);
  const [localBalance, setLocalBalance] = useState(() => {
    return parseFloat(localStorage.getItem('earth51_local_balance') || '0');
  });
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
      setPhotoFile(file);

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
      setError('Upload failed. Try again!');
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!weight || parseFloat(weight) < 0.005) {
      setError('Need at least 5g (even one wrapper!)');
      return;
    }

    if (fraudBlocked) {
      setError('⚠️ Please take a fresh photo of real litter');
      return;
    }

    try {
      setIsLoading(true);
      const weightNum = parseFloat(weight);
      const baseTokens = weightNum * 10; // 10 $P51 per kg (whole numbers!)
      const total = baseTokens;

      // TRUST SCORE SPLITS PAYOUT
      const instantPercentage = trustScore?.instant_payout_percentage || 50;
      const instantTokens = (total * instantPercentage) / 100;
      const pendingTokens = total - instantTokens;

      setTokensEarned(Math.round(instantTokens * 10) / 10);

      // ANONYMOUS MODE: Store locally
      const newBalance = localBalance + instantTokens;
      setLocalBalance(newBalance);
      localStorage.setItem('earth51_local_balance', newBalance.toString());

      // Store cleanup locally
      const localCleanups = JSON.parse(localStorage.getItem('earth51_local_cleanups') || '[]');
      localCleanups.push({
        id: Date.now().toString(),
        photo_url: photoUrl,
        location: location || 'Earth51 Cleanup',
        litter_weight: weightNum,
        tokens_awarded: total,
        tokens_instant: instantTokens,
        tokens_pending: pendingTokens,
        created_date: new Date().toISOString(),
        synced: false
      });
      localStorage.setItem('earth51_local_cleanups', JSON.stringify(localCleanups));

      // TRY to sync to server if logged in (optional)
      try {
        const user = await base44.auth.me().catch(() => null);
        if (user) {
          const cleanupData = {
            photo_url: photoUrl,
            location: location || 'Earth51 Cleanup',
            county: location || 'Somewhere Amazing',
            litter_weight: weightNum,
            cleanup_type: 'street',
            tokens_awarded: total,
            tokens_instant: instantTokens,
            tokens_pending: pendingTokens,
            verification_status: instantPercentage === 100 ? 'instant_paid' : 'pending_verification',
            instant_payout_percentage: instantPercentage,
            quantum_processing_speed: trustScore?.quantum_speed || 'standard',
            perceptual_hash: allChecks?.client_safe ? 'client_verified' : null,
            liveness_score: allChecks?.liveness?.liveness_score || null,
            fraud_flags: allChecks?.liveness?.fraud_flags || [],
            ai_weight_confidence: allChecks?.weight?.confidence_level || null,
            ai_weight_range_min: allChecks?.weight?.weight_range?.min_kg || null,
            ai_weight_range_max: allChecks?.weight?.weight_range?.max_kg || null,
            ai_items_detected: allChecks?.weight?.items_detected?.map(i => `${i.count}x ${i.item_type}`).join(', ') || null,
            ai_brands_detected: allChecks?.brands?.brands?.map(b => b.brand_name).join(', ') || null,
            ai_corporate_accountability: allChecks?.brands?.corporate_accountability || null,
            ai_verification_summary: allChecks?.brands?.verification_summary || null,
            privacy_mode: allChecks?.ai_consent === false ? 'client_only' : 'ai_enhanced'
          };
          await createCleanupMutation.mutateAsync(cleanupData);
          await base44.auth.updateMe({
            p51_balance: (user.p51_balance || 0) + instantTokens
          });
          // Mark as synced
          const updatedCleanups = localCleanups.map(c => 
            c.id === localCleanups[localCleanups.length - 1].id ? { ...c, synced: true } : c
          );
          localStorage.setItem('earth51_local_cleanups', JSON.stringify(updatedCleanups));
        }
      } catch (e) {
        // Silent fail - works anonymously
      }

      setStep('success');
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Submission failed');
      setIsLoading(false);
    }
  };

  // LANDING - TRUE 8-BIT GAME BOY RETRO
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white" style={{ imageRendering: 'pixelated' }}>
        {/* HEADER - AUTHENTIC 8-BIT */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-green-500">
          <div className="max-w-xl mx-auto p-3 flex items-center justify-between">
            <motion.button
              onClick={() => navigate(createPageUrl('Welcome'))}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className="w-10 h-10 bg-pink-500 border-3 border-pink-400 flex items-center justify-center font-black"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              &lt;
            </motion.button>

            <div className="text-center">
              <h1 className="text-lg font-black font-mono text-green-400" style={{ textShadow: '2px 2px #000' }}>earth51.love</h1>
              <p className="text-[8px] font-black font-mono text-cyan-400 tracking-widest">KIDS ▪ REAL IMPACT</p>
            </div>

            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-xl mx-auto pt-16 p-2 pb-20 space-y-2">
          
          {/* HERO - PIXEL ART CAMERA */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-cyan-600 border-4 border-cyan-500 p-3 text-center"
            style={{ boxShadow: '4px 4px 0px #000', imageRendering: 'pixelated' }}
          >
            {/* PIXEL CAMERA */}
            <svg width="48" height="48" viewBox="0 0 32 32" className="mx-auto mb-2" style={{ imageRendering: 'pixelated' }}>
              <rect x="4" y="6" width="24" height="18" fill="none" stroke="#000" strokeWidth="2"/>
              <circle cx="16" cy="15" r="6" fill="none" stroke="#000" strokeWidth="2"/>
              <rect x="26" y="8" width="3" height="3" fill="#000"/>
            </svg>
            <p className="text-white font-black font-mono text-xs leading-tight">📸 TAKE PHOTO</p>
            <p className="text-white/80 font-mono text-[8px]">AI verifies • You earn</p>
          </motion.div>
  
          {/* FLOW STEPS - MINIMAL & CLEAR */}
          <div className="space-y-1">
            {[
              { num: 1, title: 'PHOTO', desc: 'Real litter' },
              { num: 2, title: 'VERIFY', desc: 'I check it' },
              { num: 3, title: 'EARN', desc: '$P51' }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-black border-3 border-green-500 p-2 flex items-center gap-2"
                style={{ boxShadow: '3px 3px 0px rgba(34, 197, 94, 0.4)' }}
              >
                <div className="w-7 h-7 bg-green-500 border-2 border-green-400 flex items-center justify-center flex-shrink-0" style={{ imageRendering: 'pixelated' }}>
                  <span className="text-black font-black font-mono text-xs">{s.num}</span>
                </div>
                <div className="flex-1">
                  <p className="font-black font-mono text-green-400 text-[9px]">{s.title}</p>
                  <p className="text-gray-500 font-mono text-[7px]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
  
          {/* MAIN CTA - BIG PIXEL BUTTON */}
          <label className="block mt-3">
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
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-full bg-green-500 border-4 border-green-400 py-5 disabled:opacity-60 flex items-center justify-center gap-3"
              style={{ boxShadow: '5px 5px 0px #000, 0 0 15px rgba(34, 197, 94, 0.5)', imageRendering: 'pixelated' }}
            >
              {/* PIXEL CAMERA ICON */}
              <svg width="28" height="28" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
                <rect x="3" y="5" width="18" height="14" fill="none" stroke="#000" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="#000" strokeWidth="2"/>
                <rect x="19" y="7" width="2" height="2" fill="#000"/>
              </svg>
              <p className="text-black font-black font-mono text-sm leading-none">TAKE</p>
              <p className="text-black font-black font-mono text-sm leading-none">PHOTO</p>
            </motion.button>
          </label>

          {/* ACTION GRID - 2x2 PIXEL BUTTONS */}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(createPageUrl('Volckano'))}
              className="bg-orange-500 border-3 border-orange-400 py-3 flex flex-col items-center justify-center gap-1"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <p className="text-black font-black font-mono text-lg leading-none">🌋</p>
              <p className="text-black font-black font-mono text-[7px]">GAME</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowParentInfo(!showParentInfo)}
              className="bg-blue-500 border-3 border-blue-400 py-3 flex flex-col items-center justify-center gap-1"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <p className="text-black font-black font-mono text-lg leading-none">🛡️</p>
              <p className="text-black font-black font-mono text-[7px]">SAFE?</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowP51Explainer(!showP51Explainer)}
              className="bg-purple-500 border-3 border-purple-400 py-3 flex flex-col items-center justify-center gap-1"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <p className="text-black font-black font-mono text-lg leading-none">💰</p>
              <p className="text-black font-black font-mono text-[7px]">EARN</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowResonance(!showResonance)}
              className="bg-pink-500 border-3 border-pink-400 py-3 flex flex-col items-center justify-center gap-1"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <p className="text-black font-black font-mono text-lg leading-none">🎵</p>
              <p className="text-black font-black font-mono text-[7px]">HEAL</p>
            </motion.button>
          </div>
  
          {/* EXPANDABLES */}
          <AnimatePresence>
            {showParentInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-blue-500 border-3 border-blue-400 p-2 mt-1" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[8px] mb-1">SAFE ✓ NO DATA ✓ COPPA ✓</p>
                  <p className="text-black font-mono text-[7px]">Zero tracking. AI checks photos. Teaches responsibility.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showP51Explainer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-purple-500 border-3 border-purple-400 p-2 mt-1" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[8px] mb-1">$P51 = PHOTO51</p>
                  <p className="text-black font-mono text-[7px]">Named after Rosalind Franklin's DNA photo. Real reward for real impact.</p>
                  <p className="text-black font-mono text-[7px] mt-1">1kg litter = 10 $P51. Use in Volckano to unlock levels!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showResonance && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-pink-500 border-3 border-pink-400 p-2 mt-1" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[8px] mb-1">HEALING FREQUENCIES</p>
                  <p className="text-black font-mono text-[7px]">432Hz & 528Hz match your body's natural rhythm. We just listen to what's already there. ♾️❤️</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FOOTER - LIVE CLOCK + BASE44 */}
          <div className="bg-black border-3 border-cyan-600 p-2 text-center mt-3" style={{ boxShadow: '3px 3px 0px #0e7490', imageRendering: 'pixelated' }}>
            <LiveClock />
            <p className="text-xs text-gray-500 mt-2">Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">Base44</a></p>
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

          {/* PRIVACY-FIRST ENGINE - 2026 GOLD STANDARD */}
          <PrivacyFirstEngine
            photoFile={photoFile}
            photoUrl={photoUrl}
            onWeightEstimated={(data) => {
              if (data?.estimated_weight_kg) {
                setWeight(data.estimated_weight_kg.toString());
              }
            }}
            onFraudDetected={(reason) => {
              setFraudBlocked(true);
              setError(reason === 'duplicate_or_suspicious' 
                ? '⚠️ This photo was already submitted. Try a new one!'
                : '⚠️ Photo looks suspicious. Please take a fresh photo of real litter!'
              );
            }}
            onTrustCalculated={setTrustScore}
            onAllChecksComplete={setAllChecks}
          />

          {/* AI51 ESTIMATE MESSAGE */}
          {weight && !fraudBlocked && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-cyan-500 border-4 border-cyan-400 p-3"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <p className="text-black font-black font-mono text-xs">
                  I THINK IT'S {weight}KG! YOU CAN CHANGE IT IF I'M WRONG :)
                </p>
              </div>
            </motion.div>
          )}

          {/* INPUT */}
          <div className="space-y-3">
            <label className="block">
              <p className="text-green-400 font-black font-mono text-sm mb-2">WEIGHT (kg)</p>
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
              <p className="text-cyan-300 text-[10px] font-mono mt-2 text-center">Change if needed • Be honest!</p>
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
            disabled={isLoading || !weight || fraudBlocked}
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
              <p className="text-2xl font-black font-mono text-black">$P51</p>
              <p className="text-black font-mono text-xs mt-2">
                Total: {Math.round(localBalance)} $P51
              </p>
              {trustScore && trustScore.instant_payout_percentage < 100 && (
                <p className="text-black/60 font-mono text-[9px] mt-1">
                  ({trustScore.instant_payout_percentage}% now • {100 - trustScore.instant_payout_percentage}% pending)
                </p>
              )}
            </div>
            <p className="text-cyan-400 font-black font-mono text-xs">YOU'RE AWESOME! ❤️</p>

            <div className="bg-black border-2 border-cyan-500/50 p-3">
              <p className="text-cyan-400 font-mono text-[9px] text-center">
                💾 Saved on your device • Login to sync & play Volckano
              </p>
            </div>

            {trustScore && trustScore.tier === 'new' && (
              <div className="bg-purple-500 border-4 border-purple-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
                <p className="text-black font-black font-mono text-xs">
                  💜 KEEP CLEANING! +10% INSTANT TRUST PER CLEANUP
                </p>
              </div>
            )}
          </motion.div>

          {/* WHAT'S NEXT */}
          <div className="bg-cyan-500 border-4 border-cyan-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
            <h2 className="text-xl font-black font-mono text-black text-center mb-4">WHAT'S NEXT?</h2>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  const user = await base44.auth.me().catch(() => null);
                  if (user) {
                    navigate(createPageUrl('Volckano'));
                  } else {
                    if (confirm('Login to sync your $P51 and play Volckano with unlocked levels?')) {
                      base44.auth.redirectToLogin(window.location.origin + createPageUrl('Volckano'));
                    }
                  }
                }}
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
                onClick={async () => {
                  const user = await base44.auth.me().catch(() => null);
                  if (user) {
                    navigate(createPageUrl('Profile'));
                  } else {
                    alert(`Your balance: ${Math.round(localBalance)} $P51 (stored locally)\n\nLogin to sync to cloud & unlock more features!`);
                  }
                }}
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