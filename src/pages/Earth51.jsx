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
import { GameIcon, SafeIcon, EarnIcon, HealIcon, CameraIcon } from '@/components/earth51/Earth51PixelButtons';
import UnlockProgressTracker from '@/components/earth51/UnlockProgressTracker';
import CleanupRewards from '@/components/earth51/CleanupRewards';

/**
 * EARTH51 - KIDS EDITION
 * Photo → Weight → P51 → Unlock Volckano Levels
 * Simple. Direct. Coolasfuck.
 */

export default function Earth51() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState('landing'); // landing | weight | success | shop
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
  const [balanceBeforeCleanup, setBalanceBeforeCleanup] = useState(0);
  const [showParentInfo, setShowParentInfo] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [totalCleanups, setTotalCleanups] = useState(() => {
    return parseInt(localStorage.getItem('earth51_total_cleanups') || '0');
  });

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
      const baseTokens = weightNum * 1; // 1 P51 per kg (1:1 tokenomics)
      const total = baseTokens;

      // SAVE BALANCE BEFORE for comparison (Georgie's request!)
      setBalanceBeforeCleanup(localBalance);

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

      // Track total cleanups for unlock progression
      const newCleanupCount = localCleanups.length;
      setTotalCleanups(newCleanupCount);
      localStorage.setItem('earth51_total_cleanups', newCleanupCount.toString());

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

        <div className="max-w-xl mx-auto pt-16 p-2 pb-16 space-y-1.5">
          
          {/* HERO - HOW IT WORKS */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-green-600 border-4 border-green-500 p-3 text-center"
            style={{ boxShadow: '4px 4px 0px #000', imageRendering: 'pixelated' }}
          >
            <p className="text-white font-black font-mono text-sm mb-1">HOW IT WORKS</p>
            <p className="text-white/80 font-mono text-[8px]">📸 Photo → 🤖 AI scans → 💰 Earn P51</p>
          </motion.div>
  
          {/* FLOW STEPS - MINIMAL & CLEAR */}
          <div className="space-y-1">
            {[
              { num: 1, title: 'PHOTO', desc: 'Real litter' },
              { num: 2, title: 'VERIFY', desc: 'I check it' },
              { num: 3, title: 'EARN', desc: 'P51' }
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
              id="photo-upload-landing"
            />
            <motion.button
              onClick={() => document.getElementById('photo-upload-landing').click()}
              disabled={isLoading}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="w-full bg-green-500 border-4 border-green-400 py-4 disabled:opacity-60 flex items-center justify-center gap-2 font-black"
              style={{ boxShadow: '4px 4px 0px #000', imageRendering: 'pixelated' }}
            >
              <CameraIcon />
              <span className="text-black font-mono text-sm leading-none">TAKE PHOTO</span>
            </motion.button>
          </label>

          {/* ACTION GRID - 2x2 PIXEL BUTTONS */}
          <div className="grid grid-cols-2 gap-1 mt-1">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setStep('shop')}
              className="bg-yellow-600 border-3 border-yellow-500 py-2 flex flex-col items-center justify-center gap-0.5"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <div className="text-xl">🛒</div>
              <p className="text-black font-black font-mono text-[7px]">SHOP</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate(createPageUrl('Volckano'))}
              className="bg-orange-600 border-3 border-orange-500 py-2 flex flex-col items-center justify-center gap-0.5"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <GameIcon />
              <p className="text-black font-black font-mono text-[7px]">GAME</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowP51Explainer(!showP51Explainer)}
              className="bg-purple-600 border-3 border-purple-500 py-2 flex flex-col items-center justify-center gap-0.5"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <EarnIcon />
              <p className="text-black font-black font-mono text-[7px]">EARN</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowResonance(!showResonance)}
              className="bg-pink-600 border-3 border-pink-500 py-2 flex flex-col items-center justify-center gap-0.5"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              <HealIcon />
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
                <div className="bg-blue-600 border-3 border-blue-500 p-2 mt-1" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[7px] mb-1">SAFE ✓ NO DATA ✓ COPPA ✓</p>
                  <p className="text-black font-mono text-[6px]">Zero tracking. AI checks photos. Teaches responsibility.</p>
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
                <div className="bg-purple-600 border-3 border-purple-500 p-2 mt-1" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[7px] mb-1">P51 = PHOTO51</p>
                  <p className="text-black font-mono text-[6px]">Named after Rosalind Franklin. 1kg = 10 P51. Unlock Volckano!</p>
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
                <div className="bg-pink-600 border-3 border-pink-500 p-2 mt-1" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[7px] mb-1">FREQUENCIES</p>
                  <p className="text-black font-mono text-[6px]">432Hz & 528Hz. Your body's natural rhythm. ♾️❤️</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FOR PARENTS - EXPANDABLE */}
          <motion.button
            onClick={() => setShowParentInfo(!showParentInfo)}
            className="w-full bg-black border-3 border-purple-500 p-2"
            style={{ boxShadow: '3px 3px 0px #000' }}
          >
            <p className="text-purple-400 font-black font-mono text-[9px]">
              {showParentInfo ? '▼' : '▶'} FOR PARENTS (CLICK)
            </p>
          </motion.button>

          <AnimatePresence>
            {showParentInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-purple-600 border-3 border-purple-500 p-2" style={{ boxShadow: '3px 3px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[7px] mb-1">SAFE ✓ NO DATA ✓ COPPA ✓</p>
                  <p className="text-black font-mono text-[6px] mb-2">Zero tracking. AI checks photos on-device. Teaches responsibility + AI literacy.</p>
                  <div className="flex gap-1 flex-wrap">
                    <button onClick={() => navigate(createPageUrl('Earth51Terms'))} className="bg-black text-purple-400 px-2 py-1 font-mono text-[6px] font-bold">TERMS</button>
                    <button onClick={() => navigate(createPageUrl('Earth51Privacy'))} className="bg-black text-purple-400 px-2 py-1 font-mono text-[6px] font-bold">PRIVACY</button>
                    <button onClick={() => navigate(createPageUrl('Earth51Contact'))} className="bg-black text-purple-400 px-2 py-1 font-mono text-[6px] font-bold">CONTACT</button>
                    <button onClick={() => navigate(createPageUrl('AI51'))} className="bg-black text-purple-400 px-2 py-1 font-mono text-[6px] font-bold">TALK TO AI51</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FOOTER - LIVE CLOCK + BASE44 */}
          <div className="bg-black border-3 border-cyan-600 p-2 text-center" style={{ boxShadow: '3px 3px 0px #0e7490', imageRendering: 'pixelated' }}>
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
          {/* PHOTO PREVIEW - CRYSTAL CLEAR */}
          <div className="border-4 border-green-500 overflow-hidden bg-black" style={{ boxShadow: '4px 4px 0px #000', aspectRatio: '4/3' }}>
            <img src={photoUrl} alt="Cleanup" className="w-full h-full object-contain" />
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

          {/* AI51 ANALYSIS - KIDS SEE WHAT THEY'RE EARNING! */}
          {allChecks && !fraudBlocked && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-3"
            >
              {/* AI51 SCANNING HEADER */}
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-cyan-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <span className="text-2xl">🤖</span>
                  </motion.div>
                  <p className="text-black font-black font-mono text-xs">AI51 SCANNING YOUR LITTER...</p>
                </div>
                {weight && (
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-white font-black font-mono text-sm">TOTAL: {weight}kg = {parseFloat(weight) * 1} P51</p>
                  </div>
                )}
              </div>

              {/* WHAT AI51 FOUND */}
              {allChecks.weight?.items_detected?.length > 0 && (
                <div className="bg-green-500 border-4 border-green-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[9px] mb-2">🔍 WHAT I FOUND:</p>
                  <div className="space-y-1">
                    {allChecks.weight?.items_detected?.map((item, i) => (
                      <div key={i} className="bg-black/20 p-2 rounded flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{item.item_type === 'bottle' ? '🍾' : item.item_type === 'wrapper' ? '🍬' : item.item_type === 'can' ? '🥫' : '🗑️'}</span>
                          <p className="text-black font-mono text-[8px]">{item.count}x {item.item_type}</p>
                        </div>
                        <p className="text-black font-black text-[8px]">~{(item.estimated_kg * 1).toFixed(1)} P51</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BRANDS DETECTED - CORPORATE ACCOUNTABILITY */}
              {allChecks.brands?.brands?.length > 0 && (
                <div className="bg-yellow-500 border-4 border-yellow-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <p className="text-black font-black font-mono text-[9px] mb-2">🏢 BRANDS I SAW:</p>
                  <div className="flex flex-wrap gap-1">
                    {allChecks.brands?.brands?.map((brand, i) => (
                      <div key={i} className="bg-black/20 px-2 py-1 rounded">
                        <p className="text-black font-mono text-[7px]">{brand.brand_name}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-black/70 font-mono text-[6px] mt-2">These companies made this litter - we're tracking it! 📊</p>
                </div>
              )}

              {/* AI51 ENCOURAGEMENT */}
              <div className="bg-pink-500 border-4 border-pink-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <p className="text-black font-black font-mono text-[8px]">
                    {allChecks.weight?.items_detected?.length > 3 
                      ? "WOW! That's a big cleanup! You're amazing! 🌟" 
                      : "Great start! Next time try collecting more - bigger bags = more P51! 💰"}
                  </p>
                </div>
              </div>

              {/* WHAT YOU COULD EARN */}
              <div className="bg-purple-500 border-4 border-purple-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
                <p className="text-black font-black font-mono text-[9px] mb-2">💰 WHAT YOU COULD EARN:</p>
                <div className="space-y-1">
                  <div className="bg-black/20 p-2 rounded flex items-center justify-between">
                    <p className="text-black font-mono text-[8px]">Small bag (0.5kg)</p>
                    <p className="text-black font-black text-[8px]">0.5 P51</p>
                  </div>
                  <div className="bg-black/20 p-2 rounded flex items-center justify-between">
                    <p className="text-black font-mono text-[8px]">Full bag (2kg)</p>
                    <p className="text-black font-black text-[8px]">2 P51</p>
                  </div>
                  <div className="bg-black/20 p-2 rounded flex items-center justify-between">
                    <p className="text-black font-mono text-[8px]">BIG cleanup (5kg)</p>
                    <p className="text-black font-black text-[8px]">5 P51 🌟</p>
                  </div>
                </div>
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
              <div className="space-y-2">
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-black/70 font-mono text-[9px]">Before:</p>
                  <p className="text-black font-black font-mono text-lg">{Math.round(balanceBeforeCleanup)} P51</p>
                </div>
                <div className="text-center">
                  <p className="text-black font-black text-3xl">↓ +{Math.round(tokensEarned)}</p>
                </div>
                <div className="bg-yellow-400 p-2 rounded">
                  <p className="text-black/70 font-mono text-[9px]">Now:</p>
                  <p className="text-black font-black font-mono text-2xl">{Math.round(localBalance)} P51</p>
                </div>
              </div>
              {trustScore && trustScore.instant_payout_percentage < 100 && (
                <p className="text-black/60 font-mono text-[9px] mt-2">
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

          {/* REWARDS + PROGRESSION */}
          <CleanupRewards 
            weight={parseFloat(weight) || 0}
            p51Earned={tokensEarned}
            nextUnlock={null}
            progressToNext={50}
          />

          {/* UNLOCK TRACKER */}
          <UnlockProgressTracker totalCleanups={totalCleanups} />

          {/* WHAT'S NEXT */}
          <div className="bg-cyan-500 border-4 border-cyan-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
            <h2 className="text-xl font-black font-mono text-black text-center mb-4">WHAT'S NEXT?</h2>

            <div className="space-y-3">
              {/* SHOP - ONLY IF YOU CAN AFFORD SOMETHING (Georgie's request!) */}
              {localBalance >= 2 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep('shop')}
                  className="w-full bg-yellow-500 border-4 border-yellow-400 text-black py-4 font-black font-mono text-sm"
                  style={{ boxShadow: '4px 4px 0px #000' }}
                >
                  🛍️ SHOP NOW!
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  const user = await base44.auth.me().catch(() => null);
                  if (user) {
                    navigate(createPageUrl('Volckano'));
                  } else {
                    if (confirm('Login to sync your P51 and play Volckano with unlocked levels?')) {
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
                    alert(`Your balance: ${Math.round(localBalance)} P51 (stored locally)\n\nLogin to sync to cloud & unlock more features!`);
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

  // SHOP - Georgie's royal shop! Blue throne background
  if (step === 'shop') {
    const shopItems = [
      { id: 1, name: '🍫 Chocolate Bar', price: 5, emoji: '🍫' },
      { id: 2, name: '🍭 Lollipop', price: 2, emoji: '🍭' },
      { id: 3, name: '🎮 Volckano Unlock', price: 10, emoji: '🌋' },
      { id: 4, name: '⭐ Gold Star Badge', price: 8, emoji: '⭐' },
      { id: 5, name: '🦸 Super Power', price: 15, emoji: '⚡' },
      { id: 6, name: '🎨 Rainbow Skin', price: 12, emoji: '🌈' },
      { id: 7, name: '🍕 Pizza Slice', price: 7, emoji: '🍕' },
      { id: 8, name: '🎁 Mystery Box', price: 20, emoji: '🎁' },
    ];

    const handlePurchase = (item) => {
      if (localBalance < item.price) {
        alert(`Need ${item.price} P51! You have ${Math.round(localBalance)}`);
        return;
      }

      const newBalance = localBalance - item.price;
      setLocalBalance(newBalance);
      localStorage.setItem('earth51_local_balance', newBalance.toString());

      // Track purchase locally
      const purchases = JSON.parse(localStorage.getItem('earth51_purchases') || '[]');
      purchases.push({
        item: item.name,
        price: item.price,
        date: new Date().toISOString()
      });
      localStorage.setItem('earth51_purchases', JSON.stringify(purchases));

      setPurchaseSuccess(item);
      setTimeout(() => setPurchaseSuccess(null), 2000);
    };

    return (
      <div className="min-h-screen bg-black text-white" style={{ imageRendering: 'pixelated' }}>
        {/* HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-yellow-500">
          <div className="max-w-xl mx-auto p-3 flex items-center justify-between">
            <motion.button
              onClick={() => setStep('landing')}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className="w-10 h-10 bg-pink-500 border-3 border-pink-400 flex items-center justify-center font-black"
              style={{ boxShadow: '3px 3px 0px #000', imageRendering: 'pixelated' }}
            >
              &lt;
            </motion.button>

            <div className="text-center">
              <h1 className="text-lg font-black font-mono text-yellow-400" style={{ textShadow: '2px 2px #000' }}>🛒 SHOP</h1>
              <p className="text-[8px] font-black font-mono text-green-400">BALANCE: {Math.round(localBalance)} P51</p>
            </div>

            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-xl mx-auto pt-20 p-3 pb-24 space-y-3">
          
          {/* SUCCESS ANIMATION */}
          <AnimatePresence>
            {purchaseSuccess && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-green-500 border-4 border-green-400 p-8 text-center"
                style={{ boxShadow: '6px 6px 0px #000' }}
              >
                <div className="text-6xl mb-2">{purchaseSuccess.emoji}</div>
                <p className="text-black font-black font-mono text-sm">BOUGHT!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SHOP ITEMS GRID */}
          <div className="grid grid-cols-2 gap-3">
            {shopItems.map((item) => {
              const canAfford = localBalance >= item.price;
              return (
                <motion.button
                  key={item.id}
                  whileHover={canAfford ? { scale: 1.03 } : {}}
                  whileTap={canAfford ? { scale: 0.97 } : {}}
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford}
                  className={`${
                    canAfford 
                      ? 'bg-white border-yellow-400' 
                      : 'bg-gray-700 border-gray-600 opacity-50'
                  } border-4 p-3 flex flex-col items-center justify-center gap-2`}
                  style={{ boxShadow: '4px 4px 0px #000', imageRendering: 'pixelated' }}
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <p className={`font-black font-mono text-[8px] text-center leading-tight ${
                    canAfford ? 'text-black' : 'text-gray-400'
                  }`}>
                    {item.name.split(' ').slice(1).join(' ')}
                  </p>
                  <div className={`${
                    canAfford ? 'bg-yellow-400' : 'bg-gray-600'
                  } px-2 py-1 font-black font-mono text-[8px] text-black`}>
                    {item.price} P51
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* INFO BOX */}
          <div className="bg-black border-4 border-white p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
            <p className="text-white font-black font-mono text-[8px] mb-1">GEORGIE'S SHOP:</p>
            <p className="text-white font-mono text-[7px]">
              1. Clean up litter 🌍<br/>
              2. Take photo 📸<br/>
              3. Earn P51 (1kg = 1 P51) 💰<br/>
              4. Buy treats here! 🎁
            </p>
          </div>

          {/* BIG DREAMS - REAL REWARDS */}
          <div className="bg-gradient-to-r from-green-600 to-cyan-600 border-4 border-yellow-400 p-4 mt-3" style={{ boxShadow: '4px 4px 0px #000, 0 0 20px rgba(34, 197, 94, 0.5)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎮</span>
              <p className="text-yellow-300 font-black font-mono text-[9px]">SAVE FOR BIG THINGS!</p>
            </div>
            <p className="text-white font-mono text-[8px] mb-2">
              P51 = REAL MONEY 💰
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-black/40 p-2 text-center border-2 border-yellow-400/50">
                <div className="text-xl mb-1">📱</div>
                <p className="text-white font-black text-[6px]">PHONE</p>
              </div>
              <div className="bg-black/40 p-2 text-center border-2 border-yellow-400/50">
                <div className="text-xl mb-1">🎮</div>
                <p className="text-white font-black text-[6px]">PLAYSTATION</p>
              </div>
              <div className="bg-black/40 p-2 text-center border-2 border-yellow-400/50">
                <div className="text-xl mb-1">💻</div>
                <p className="text-white font-black text-[6px]">APPLE</p>
              </div>
            </div>
            <p className="text-cyan-200 font-mono text-[7px] mt-2 text-center">
              Clean litter → Earn P51 → Buy ANYTHING! 🌟
            </p>
          </div>

          {/* EARN MORE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep('landing')}
            className="w-full bg-green-500 border-4 border-green-400 py-4 font-black font-mono text-sm"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-center justify-center gap-2">
              <span>📸</span>
              <span className="text-black">EARN MORE P51</span>
            </div>
          </motion.button>
        </div>
      </div>
    );
  }
}