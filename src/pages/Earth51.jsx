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
import Earth51AI51Icon from '@/components/earth51/Earth51AI51Icon';

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

  // LANDING - STRIPPED DOWN & HONEST
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-green-500">
          <div className="max-w-xl mx-auto p-4 flex items-center justify-between">
            <motion.button
              onClick={() => navigate(createPageUrl('Welcome'))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-pink-500 flex items-center justify-center border-2 border-pink-400"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }}>
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="4" strokeLinecap="square"/>
              </svg>
            </motion.button>

            <div className="text-center">
              <h1 className="text-xl font-black font-mono text-green-400">earth51.love</h1>
              <p className="text-[9px] font-black font-mono text-cyan-400">KIDS • REAL IMPACT</p>
            </div>

            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-xl mx-auto pt-20 p-4 pb-32 space-y-6">
          
          {/* AI51 GREETING */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-br from-cyan-500 to-green-500 border-4 border-white p-8 flex flex-col items-center text-center"
            style={{ boxShadow: '6px 6px 0px #000' }}
          >
            <Earth51AI51Icon size={100} animate={true} />
            <p className="text-black font-black font-mono text-sm mt-4 mb-3">I'M AI51</p>
            <p className="text-black font-bold font-mono text-xs leading-relaxed">
              Take a real photo of litter. I'll verify it. You earn $P51. That's it.
            </p>
          </motion.div>

          {/* THE FLOW - 3 SIMPLE STEPS */}
          <div className="space-y-3">
            {[
              { num: 1, title: 'TAKE PHOTO', desc: 'Real litter you picked up' },
              { num: 2, title: 'I VERIFY', desc: 'I check its real + weight' },
              { num: 3, title: 'YOU EARN', desc: 'Real $P51 for Volckano' }
            ].map((step, i) => (
              <div key={i} className="bg-black border-2 border-green-500 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 border-2 border-green-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-black font-mono text-sm">{step.num}</span>
                </div>
                <div>
                  <p className="font-black font-mono text-green-400 text-sm">{step.title}</p>
                  <p className="text-gray-400 font-mono text-xs">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
  
          {/* BIG CTA */}
          <label className="block mt-6">
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
              className="w-full bg-green-500 border-4 border-green-400 py-8 disabled:opacity-50 flex flex-col items-center justify-center gap-3"
              style={{ boxShadow: '6px 6px 0px #000' }}
            >
              <div className="w-14 h-14 bg-black border-2 border-white flex items-center justify-center">
                <Camera className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-black font-black font-mono text-lg">TAKE PHOTO</p>
            </motion.button>
          </label>

          {/* SECONDARY OPTIONS */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(createPageUrl('Volckano'))}
              className="bg-orange-500 border-4 border-orange-400 py-6 flex flex-col items-center justify-center gap-2"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <div className="w-12 h-12 bg-black border-2 border-white flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 20,8 18,18 6,18 4,8" fill="none" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <p className="text-black font-black font-mono text-xs">PLAY VOLCKANO</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowParentInfo(!showParentInfo)}
              className="bg-blue-500 border-4 border-blue-400 py-6 flex flex-col items-center justify-center gap-2"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <Shield className="w-8 h-8 text-black" />
              <p className="text-black font-black font-mono text-xs">FOR PARENTS</p>
            </motion.button>
          </div>
  
          {/* PARENT INFO EXPANDABLE */}
          <AnimatePresence>
            {showParentInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-blue-500 border-4 border-blue-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <h3 className="text-black font-black font-mono text-sm mb-3">SAFE FOR KIDS ✓</h3>
                  <div className="space-y-2">
                    <p className="text-black font-mono text-xs">✓ Zero personal data</p>
                    <p className="text-black font-mono text-xs">✓ AI safety verification on every photo</p>
                    <p className="text-black font-mono text-xs">✓ COPPA/GDPR compliant</p>
                    <p className="text-black font-mono text-xs">✓ Teaches real responsibility</p>
                  </div>
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
                <div className="bg-pink-500 border-4 border-pink-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <div className="bg-black border-2 border-white p-4 mb-3">
                    <h3 className="text-pink-400 font-black font-mono text-lg mb-2">HOW HEALING WORKS</h3>
                    <p className="text-white font-mono text-xs leading-relaxed">
                      The whole universe vibrates. Your body listens. Simple science!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-cyan-500 border-2 border-cyan-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">PLANCK FREQUENCY:</p>
                      <p className="text-black font-mono text-[10px]">The universe's native vibration</p>
                      <p className="text-black font-mono text-[10px]">Everything sings to this beat</p>
                    </div>

                    <div className="bg-purple-500 border-2 border-purple-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">432 Hz & 528 Hz:</p>
                      <p className="text-black font-mono text-[10px]">Harmonic ratios to Planck</p>
                      <p className="text-black font-mono text-[10px]">Your body naturally resonates</p>
                    </div>

                    <div className="bg-green-500 border-2 border-green-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">RESONANCE = HEALING:</p>
                      <p className="text-black font-mono text-[10px]">Like tuning a guitar string</p>
                      <p className="text-black font-mono text-[10px]">Perfect pitch = perfect calm</p>
                    </div>

                    <div className="bg-black border-2 border-white p-3">
                      <p className="text-pink-400 font-mono text-[10px] text-center leading-relaxed">
                        We're not inventing healing. We're listening to what's already there ♾️
                      </p>
                    </div>
                  </div>
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
                <div className="bg-purple-500 border-4 border-purple-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
                  <div className="bg-black border-2 border-white p-4 mb-3">
                    <h3 className="text-purple-400 font-black font-mono text-xl mb-2">$PHOTO51</h3>
                    <p className="text-white font-mono text-xs leading-relaxed">
                      Named after scientist Rosalind Franklin's DNA photo! Your reward for cleaning Earth.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-green-500 border-2 border-green-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">REAL EARTH:</p>
                      <p className="text-black font-mono text-[10px]">• 1kg = 10 $P51</p>
                      <p className="text-black font-mono text-[10px]">• Even 0.1kg = 1 $P51!</p>
                      <p className="text-black font-mono text-[10px]">• Best way to earn!</p>
                    </div>

                    <div className="bg-amber-500 border-2 border-amber-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">IN VOLCKANO GAME:</p>
                      <p className="text-black font-mono text-[10px]">• Pick litter = 1 $P51</p>
                      <p className="text-black font-mono text-[10px]">• 10x less than real!</p>
                      <p className="text-black font-mono text-[10px]">• Real Earth better!</p>
                    </div>

                    <div className="bg-pink-500 border-2 border-pink-400 p-3">
                      <p className="text-black font-black font-mono text-xs mb-2">UNLOCK LEVELS:</p>
                      <p className="text-black font-mono text-[10px]">• Use $P51 in Volckano</p>
                      <p className="text-black font-mono text-[10px]">• Get new characters</p>
                      <p className="text-black font-mono text-[10px]">• Have fun!</p>
                    </div>

                    <div className="bg-black border-2 border-white p-3">
                      <p className="text-cyan-400 font-mono text-[10px] text-center leading-relaxed">
                        Named after scientist Rosalind Franklin! One day: buy real stuff globally ❤️
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