import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Shield, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TRUST SCORE ENGINE - 2025 ANTI-FRAUD
 * 
 * New kids: 50% instant payout, 50% pending verification
 * Proven kids: 100% instant (light speed)
 * 
 * Trust builds over time with legit cleanups
 * Fraud = instant trust drop
 */

export default function TrustScoreEngine({ onTrustCalculated }) {
  const [trustLevel, setTrustLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateTrust = async () => {
      try {
        const user = await base44.auth.me().catch(() => null);
        
        if (!user) {
          // Anonymous = 50% instant
          const score = {
            trust_percentage: 50,
            instant_payout_percentage: 50,
            cleanup_count: 0,
            fraud_count: 0,
            tier: 'new',
            quantum_speed: 'standard'
          };
          setTrustLevel(score);
          onTrustCalculated?.(score);
          setIsLoading(false);
          return;
        }

        // Get user's cleanup history
        const cleanups = await base44.entities.Cleanup.filter({ created_by: user.email });
        const legit = cleanups.filter(c => c.verification_status !== 'rejected').length;
        const rejected = cleanups.filter(c => c.verification_status === 'rejected').length;

        // TRUST ALGORITHM (2025)
        let trustScore = 50; // Everyone starts at 50%
        
        // +10% per legit cleanup (max +50%)
        trustScore += Math.min(legit * 10, 50);
        
        // -20% per rejected cleanup
        trustScore -= rejected * 20;
        
        // Cap at 100%
        trustScore = Math.max(0, Math.min(100, trustScore));

        const score = {
          trust_percentage: trustScore,
          instant_payout_percentage: trustScore,
          cleanup_count: legit,
          fraud_count: rejected,
          tier: trustScore >= 90 ? 'trusted' : trustScore >= 70 ? 'proven' : trustScore >= 50 ? 'new' : 'watch',
          quantum_speed: trustScore >= 90 ? 'light_speed' : trustScore >= 70 ? 'fast' : 'standard'
        };

        setTrustLevel(score);
        onTrustCalculated?.(score);
        setIsLoading(false);
        
      } catch (error) {
        console.error('Trust calculation failed:', error);
        // Default to 50% on error (fair for kids)
        const defaultScore = {
          trust_percentage: 50,
          instant_payout_percentage: 50,
          tier: 'new',
          quantum_speed: 'standard'
        };
        setTrustLevel(defaultScore);
        onTrustCalculated?.(defaultScore);
        setIsLoading(false);
      }
    };

    calculateTrust();
  }, [onTrustCalculated]);

  if (isLoading || !trustLevel) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-4 p-4 ${
        trustLevel.tier === 'trusted' ? 'border-green-500 bg-green-500/10' :
        trustLevel.tier === 'proven' ? 'border-cyan-500 bg-cyan-500/10' :
        trustLevel.tier === 'new' ? 'border-purple-500 bg-purple-500/10' :
        'border-red-500 bg-red-500/10'
      }`}
      style={{ boxShadow: '4px 4px 0px #000' }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ 
            scale: trustLevel.tier === 'trusted' ? [1, 1.1, 1] : 1,
            rotate: trustLevel.tier === 'trusted' ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 2, repeat: trustLevel.tier === 'trusted' ? Infinity : 0 }}
        >
          {trustLevel.tier === 'trusted' ? (
            <Sparkles className="w-7 h-7 text-green-400" />
          ) : (
            <Shield className="w-7 h-7 text-cyan-400" />
          )}
        </motion.div>
        
        <div className="flex-1">
          <p className={`font-black font-mono text-sm ${
            trustLevel.tier === 'trusted' ? 'text-green-400' :
            trustLevel.tier === 'proven' ? 'text-cyan-400' :
            trustLevel.tier === 'new' ? 'text-purple-400' :
            'text-red-400'
          }`}>
            {trustLevel.tier === 'trusted' && '⚡ LIGHT SPEED TRUST'}
            {trustLevel.tier === 'proven' && '✓ PROVEN USER'}
            {trustLevel.tier === 'new' && '🌱 NEW CLEANER'}
            {trustLevel.tier === 'watch' && '⚠️ UNDER REVIEW'}
          </p>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-black h-2 border border-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trustLevel.trust_percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full ${
                  trustLevel.tier === 'trusted' ? 'bg-green-400' :
                  trustLevel.tier === 'proven' ? 'bg-cyan-400' :
                  trustLevel.tier === 'new' ? 'bg-purple-400' :
                  'bg-red-400'
                }`}
              />
            </div>
            <p className="text-white font-mono text-[10px] font-black">
              {trustLevel.trust_percentage}%
            </p>
          </div>

          <p className="text-white/60 font-mono text-[9px] mt-1">
            {trustLevel.instant_payout_percentage}% instant • {100 - trustLevel.instant_payout_percentage}% pending
          </p>

          {trustLevel.cleanup_count > 0 && (
            <p className="text-green-400 font-mono text-[9px] mt-1">
              ✓ {trustLevel.cleanup_count} successful cleanup{trustLevel.cleanup_count !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {trustLevel.tier === 'new' && (
        <div className="bg-black border-2 border-purple-500/50 p-2 mt-3">
          <p className="text-purple-300 font-mono text-[9px]">
            💜 Keep cleaning! +10% trust per cleanup (max 100%)
          </p>
        </div>
      )}
    </motion.div>
  );
}