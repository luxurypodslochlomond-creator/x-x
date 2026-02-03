import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, Loader2, CheckCircle2, Zap, Share2, X, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import P51Symbol from '@/components/shared/P51Symbol';

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
        verification_status: 'instant_paid'
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
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-cyan-900 text-white p-6 pt-24 lg:pt-6">
        <div className="max-w-xl mx-auto space-y-8">
          {/* AI51 INTRO */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <AI51AtomIcon size={80} animate={true} />
            </div>
            <h1 className="text-5xl font-black text-green-400" style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.8)' }}>
              EARTH51
            </h1>
            <p className="text-lg font-bold text-cyan-300">
              Hey friend 👋 I'm AI51. Let's heal Earth together ♾️❤️
            </p>
            <p className="text-sm text-gray-300">
              Pick up litter → Earn $P51 → Unlock Volckano levels with your friends
            </p>
          </motion.div>

          {/* HOW IT WORKS */}
          <div className="space-y-3">
            <div className="bg-black border-4 border-green-500 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-black text-black">1</div>
                <span className="font-bold text-green-400">📸 Take a photo</span>
              </div>
              <p className="text-xs text-gray-400 ml-11">Show me the litter you collected</p>
            </div>

            <div className="bg-black border-4 border-cyan-500 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center font-black text-black">2</div>
                <span className="font-bold text-cyan-400">⚖️ Tell me the weight</span>
              </div>
              <p className="text-xs text-gray-400 ml-11">Even 5g (one wrapper) counts bro</p>
            </div>

            <div className="bg-black border-4 border-purple-500 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-black text-white">3</div>
                <span className="font-bold text-purple-400">💰 Get $P51 Instantly</span>
              </div>
              <p className="text-xs text-gray-400 ml-11">1kg = 1 $P51 + 20% bonus. No waiting.</p>
            </div>

            <div className="bg-black border-4 border-pink-500 p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center font-black text-white">4</div>
                <span className="font-bold text-pink-400">🌋 Unlock Volckano</span>
              </div>
              <p className="text-xs text-gray-400 ml-11">Use $P51 to level up in the game. Invite friends.</p>
            </div>
          </div>

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
            <button
              onClick={() => document.getElementById('photo-upload').click()}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 border-4 border-green-400 text-black py-6 text-xl font-black font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin inline mr-2" />
                  LOADING
                </>
              ) : (
                <>
                  <Camera className="w-6 h-6 inline mr-2" />
                  START CLEANUP
                </>
              )}
            </button>
          </label>

          {/* AI51 MESSAGE */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-black border-2 border-cyan-500/50 rounded-lg p-4 text-center"
          >
            <p className="text-cyan-300 text-sm font-mono">
              🤖 I'm watching • I trust you • Real cleanups = Real rewards ♾️
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // WEIGHT STEP
  if (step === 'weight') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-cyan-900 text-white p-6 pt-24 lg:pt-6">
        <div className="max-w-xl mx-auto space-y-6">
          {/* PHOTO PREVIEW */}
          <div className="border-4 border-green-500 rounded-lg overflow-hidden">
            <img src={photoUrl} alt="Cleanup" className="w-full h-64 object-cover" />
          </div>

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

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setStep('landing');
                setPhotoUrl(null);
                setWeight('');
                setLocation('');
              }}
              className="flex-1 bg-black border-2 border-gray-600 text-white py-4 font-bold text-sm hover:border-gray-500"
            >
              BACK
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !weight}
              className="flex-1 bg-gradient-to-r from-green-600 to-cyan-600 border-4 border-green-400 text-black py-4 font-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                  SUBMIT
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  SUBMIT
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-black to-cyan-900 text-white p-6 pt-24 lg:pt-6">
        <div className="max-w-xl mx-auto space-y-6">
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