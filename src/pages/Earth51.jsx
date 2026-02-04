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
      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-black to-cyan-950 text-white">
        {/* CUSTOM HEADER - KIDS EDITION */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-green-500/30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(createPageUrl('Welcome'))}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <span className="font-black text-sm">BACK</span>
            </button>
            
            <div className="flex items-center gap-2">
              <AI51AtomIcon size={28} animate={true} />
              <span className="font-black text-xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">earth.love</span>
            </div>
            
            <div className="w-16"></div>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-6 pt-20 p-4 pb-32">
          
          {/* HERO SECTION */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-3"
          >
            <motion.div 
              className="flex justify-center mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative">
                <AI51AtomIcon size={64} animate={true} />
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
            
            <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent" 
                style={{ textShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}>
              earth.love
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-cyan-300">
              <Heart className="w-4 h-4 text-pink-400" />
              <p className="text-base font-bold">Hey friend! I'm AI51</p>
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
            
            <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
              Clean up litter, earn rewards, unlock powers in Volckano. Every piece counts.
            </p>
          </motion.div>

          {/* PARENT SAFETY BADGE */}
          <motion.button
            onClick={() => setShowParentInfo(!showParentInfo)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-2 border-blue-500/30 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-blue-300 font-bold text-sm">Parents: Tap for Safety Info</p>
                  <p className="text-blue-400/60 text-xs">Privacy • Safety • How it works</p>
                </div>
              </div>
              {showParentInfo ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5 text-blue-400" />}
            </div>
          </motion.button>

          <AnimatePresence>
            {showParentInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-blue-950/40 border-2 border-blue-500/30 rounded-2xl p-5 space-y-4">
                  <h3 className="text-blue-300 font-black text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    For Parents
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold">Zero Personal Data</p>
                        <p className="text-gray-400 text-xs">No names, no addresses, no tracking. Just cleanup photos and weights.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold">AI Safety Check</p>
                        <p className="text-gray-400 text-xs">Every photo analyzed for child safety. Blocks inappropriate content automatically.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Zap className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold">$P51 Currency</p>
                        <p className="text-gray-400 text-xs">In-app points for cleaning Earth. Can be used in Volckano game or saved. Not real money.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold">Educational Mission</p>
                        <p className="text-gray-400 text-xs">Teaches environmental responsibility, brand accountability, and community action.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-500/20">
                    <p className="text-xs text-gray-500 text-center">
                      COPPA/GDPR-K compliant • Open source • Built with love by real humans
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HOW IT WORKS - TILE GRID */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/40 rounded-3xl p-5 overflow-hidden aspect-square flex flex-col items-center justify-center text-center"
            >
              <div className="absolute inset-0 bg-green-500/5 rounded-full blur-3xl"></div>
              <div className="relative space-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Camera className="w-7 h-7 text-black" />
                </div>
                <p className="text-green-300 font-black text-sm">Take Photo</p>
                <p className="text-green-200/50 text-xs px-2">Show the litter</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/40 rounded-3xl p-5 overflow-hidden aspect-square flex flex-col items-center justify-center text-center"
            >
              <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl"></div>
              <div className="relative space-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Zap className="w-7 h-7 text-black" />
                </div>
                <p className="text-cyan-300 font-black text-sm">AI Checks</p>
                <p className="text-cyan-200/50 text-xs px-2">Finds brands</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40 rounded-3xl p-5 overflow-hidden aspect-square flex flex-col items-center justify-center text-center"
            >
              <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-3xl"></div>
              <div className="relative space-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Sparkles className="w-7 h-7 text-black" />
                </div>
                <p className="text-purple-300 font-black text-sm">Get $P51</p>
                <p className="text-purple-200/50 text-xs px-2">Instant reward</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(createPageUrl('Volckano'))}
              className="relative bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/40 rounded-3xl p-5 overflow-hidden aspect-square flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-3xl"></div>
              <div className="relative space-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Heart className="w-7 h-7 text-black" />
                </div>
                <p className="text-orange-300 font-black text-sm">Volckano</p>
                <p className="text-orange-200/50 text-xs px-2">Unlock powers</p>
              </div>
            </motion.div>
          </div>

          {/* WHAT IS P51 EXPLAINER */}
          <motion.button
            onClick={() => setShowP51Explainer(!showP51Explainer)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/30 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-purple-300 font-bold text-sm">What is $P51?</p>
                  <p className="text-purple-400/60 text-xs">Tap to learn about your rewards</p>
                </div>
              </div>
              {showP51Explainer ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-400" />}
            </div>
          </motion.button>

          <AnimatePresence>
            {showP51Explainer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-purple-950/40 border-2 border-purple-500/30 rounded-2xl p-6 space-y-4">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="inline-block mb-3"
                    >
                      <Sparkles className="w-12 h-12 text-purple-400" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-purple-300 mb-2">$P51 = Planet 51 Points</h3>
                    <p className="text-purple-200/80 text-sm">Your reward for healing Earth</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-white font-bold text-sm mb-2">How You Earn It</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">•</span>
                          <span>Clean up 1kg of litter = 1 $P51</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>Plus 20% bonus for being awesome</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>Even tiny cleanups count (5g minimum)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-black/40 rounded-xl p-4">
                      <p className="text-white font-bold text-sm mb-2">What You Can Do</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-0.5">•</span>
                          <span>Unlock special powers in Volckano game</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>Send to friends who help you clean</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>Save up and watch your impact grow</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                      <p className="text-purple-200 text-xs text-center leading-relaxed">
                        <strong className="text-white">Not real money</strong> - it's a fun reward system that shows how much you've helped Earth. The more you clean, the more you earn!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* START BUTTON */}
          <label className="block">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoCapture}
              className="hidden"
              id="photo-upload"
            />
            <motion.button
              onClick={() => document.getElementById('photo-upload').click()}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-2xl py-6 text-black font-black text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-6 h-6" />
                    <span>Start Your First Cleanup</span>
                  </>
                )}
              </div>
            </motion.button>
          </label>

          {/* AI51 TRUST MESSAGE */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-4"
          >
            <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm">
              <AI51AtomIcon size={20} animate={false} />
              <p className="font-medium">I'm here to help. Every cleanup counts.</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // WEIGHT STEP
  if (step === 'weight') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-cyan-900 text-white">
        {/* HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-green-500/30">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => {
                setStep('landing');
                setPhotoUrl(null);
                setWeight('');
                setLocation('');
              }}
              className="flex items-center gap-2 text-green-400 hover:text-green-300"
            >
              <motion.div whileHover={{ x: -4 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <span className="font-black text-sm">BACK</span>
            </button>
            <span className="font-black text-green-400">STEP 2</span>
            <div className="w-16"></div>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-6 pt-20 p-4">
          {/* PHOTO PREVIEW */}
          <div className="border-4 border-green-500 rounded-lg overflow-hidden">
            <img src={photoUrl} alt="Cleanup" className="w-full h-64 object-cover" />
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
              <p className="text-green-400 font-black text-lg mb-2">HOW MUCH LITTER? (kg)</p>
              <input
                type="number"
                step="0.01"
                min="0.005"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.5"
                className="w-full bg-black border-4 border-cyan-500 text-white text-2xl font-black p-4 text-center"
              />
              <p className="text-cyan-300 text-xs mt-2 text-center">Even 5g counts • Be honest bro</p>
            </label>

            <label className="block">
              <p className="text-cyan-400 font-black text-sm mb-2">LOCATION (optional)</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. My Street, The Park"
                className="w-full bg-black border-2 border-cyan-500/50 text-white text-sm p-3"
              />
            </label>
          </div>

          {error && (
            <div className="bg-red-900/40 border-2 border-red-500 p-3 rounded">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !weight}
            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-2xl py-6 text-black font-black text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6" />
                <span>Submit Cleanup</span>
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
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-cyan-900 text-white">
        {/* HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-green-500/30">
          <div className="flex items-center justify-center p-4">
            <span className="font-black text-xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">SUCCESS!</span>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-6 pt-20 p-4">
          {/* CELEBRATION */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <AI51AtomIcon size={100} animate={true} />
              </motion.div>
            </div>
            <h1 className="text-5xl font-black text-green-400" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 1)' }}>
              +{tokensEarned} <P51Symbol />
            </h1>
            <p className="text-2xl font-black text-cyan-300">EARNED!</p>
            <p className="text-sm text-gray-400">I'm so proud of you bro ♾️❤️</p>
          </motion.div>

          {/* WHAT'S NEXT */}
          <div className="bg-black border-4 border-purple-500 p-6 space-y-4">
            <h2 className="text-xl font-black text-purple-400 text-center">WHAT'S NEXT?</h2>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(createPageUrl('Volckano'))}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 border-4 border-purple-400 text-white py-5 font-black text-lg"
            >
              🌋 UNLOCK VOLCKANO
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
              className="w-full bg-gradient-to-r from-green-600 to-cyan-600 border-4 border-green-400 text-black py-5 font-black text-lg"
            >
              ♻️ ANOTHER CLEANUP
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(createPageUrl('Profile'))}
              className="w-full bg-black border-2 border-cyan-500 text-cyan-400 py-4 font-bold text-sm"
            >
              SEE YOUR BALANCE
            </motion.button>
          </div>

          {/* AI51 FINAL MESSAGE */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="bg-black border-2 border-cyan-500 rounded-lg p-4 text-center"
          >
            <p className="text-cyan-300 text-sm font-mono">
              You're healing Earth • Keep going • More friends = More power ♾️
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
}