// Extracted cleanup submission logic with AI-proof validation
import { base44 } from '@/api/base44Client';
import { signCleanup, verifyChainIntegrity } from '@/components/security/CryptoSecurity';
import { validateCleanupAIProof, checkForAIManipulation, calculateTrustScore } from '@/components/cleanup/AIProofValidator';

export async function submitCleanup(formData, aiAnalysis, isAuthenticated, isOffline) {
  // 1. AI-PROOF VALIDATION
  const aiProofValidation = await validateCleanupAIProof(formData, aiAnalysis, isAuthenticated);
  
  if (!aiProofValidation.passed) {
    return {
      success: false,
      error: aiProofValidation.errors[0],
      warnings: aiProofValidation.warnings
    };
  }

  // 2. CHECK FOR AI MANIPULATION
  const manipulationCheck = checkForAIManipulation(aiAnalysis);
  if (manipulationCheck?.detected) {
    return {
      success: false,
      error: manipulationCheck.message
    };
  }

  // 3. WEIGHT VALIDATION (redundant but critical)
  if (!formData.photo_url) {
    return { success: false, error: 'Photo required' };
  }
  if (!formData.litter_weight || formData.litter_weight < 0.005) {
    return { success: false, error: 'Minimum 5g required' };
  }

  // 4. RATE LIMITING CHECK
  const lastSubmit = localStorage.getItem('lastCleanupSubmit');
  if (lastSubmit) {
    const timeSince = Date.now() - parseInt(lastSubmit);
    if (timeSince < 5 * 60 * 1000) {
      return { success: false, error: 'Too fast. Wait 5 mins between cleanups.' };
    }
  }
  localStorage.setItem('lastCleanupSubmit', Date.now().toString());

  // 5. ANTI-FRAUD: Duplicate photo check
  if (formData.photo_hash && !isOffline) {
    try {
      const existingCleanups = await base44.entities.Cleanup.filter({ 
        photo_hash: formData.photo_hash 
      }, '-created_date', 1);
      
      if (existingCleanups && existingCleanups.length > 0) {
        return { success: false, error: 'This photo was already submitted.' };
      }
    } catch (err) {
      if (!navigator.onLine) {
        console.log('Offline: skipping duplicate check');
      } else {
        return { success: false, error: 'Duplicate check failed' };
      }
    }
  }

  // 6. ANTI-FRAUD: GPS verification
  let gpsVerified = false;
  if (formData.coordinates && navigator.geolocation && !isOffline) {
    try {
      const currentPos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const distance = Math.sqrt(
        Math.pow(currentPos.coords.latitude - formData.coordinates.lat, 2) +
        Math.pow(currentPos.coords.longitude - formData.coordinates.lng, 2)
      ) * 111; // rough km
      gpsVerified = distance < 1; // within 1km
    } catch (err) {
      console.log('GPS verification skipped:', err);
    }
  }

  // 7. CRYPTOGRAPHIC SIGNING
  let cryptoSignature;
  try {
    cryptoSignature = await signCleanup({
      ...formData,
      litter_weight: formData.litter_weight,
      location: formData.location || formData.county || 'Unknown',
      photo_hash: formData.photo_hash,
      coordinates: formData.coordinates
    });
    
    const chainValid = verifyChainIntegrity();
    if (!chainValid) {
      return { success: false, error: 'Hash chain corrupted — potential tampering' };
    }
  } catch (err) {
    console.error('Crypto signing failed:', err);
    return { success: false, error: 'Security validation failed' };
  }

  // 8. CALCULATE TRUST SCORE
  const trustScore = calculateTrustScore(formData, aiAnalysis, isAuthenticated);

  // 9. BUILD CLEANUP RECORD
  const tokens = formData.tokens_awarded || (formData.litter_weight * 1);
  const cleanupData = {
    ...formData,
    tokens_awarded: tokens,
    tokens_instant: tokens,
    tokens_pending: 0,
    instant_payout_percentage: 100,
    location: formData.location || formData.county || 'Unknown',
    county: formData.county || 'Unknown',
    gps_verified: gpsVerified,
    submission_timestamp: new Date().toISOString(),
    trust_score: trustScore,
    // CRYPTOGRAPHIC PROOF
    crypto_signature: cryptoSignature.signature,
    crypto_public_key: cryptoSignature.publicKey,
    crypto_signed_data: cryptoSignature.signedData,
    crypto_hash: cryptoSignature.cleanupHash,
    crypto_previous_hash: cryptoSignature.previousHash,
    crypto_version: cryptoSignature.version
  };

  // 10. SUBMIT
  if (isOffline) {
    // Save locally
    const offlineCleanups = JSON.parse(localStorage.getItem('offlineCleanups') || '[]');
    offlineCleanups.push({
      ...cleanupData,
      offlineId: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('offlineCleanups', JSON.stringify(offlineCleanups));

    // Track earnings locally
    if (!isAuthenticated) {
      const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
      localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
    }

    return { success: true, offline: true };
  } else {
    try {
      const created = await base44.entities.Cleanup.create(cleanupData);

      // Update balance
      if (isAuthenticated) {
        const user = await base44.auth.me();
        const newBalance = (user.p51_balance || 0) + tokens;
        await base44.auth.updateMe({ p51_balance: newBalance });
      } else {
        const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
        localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
      }

      return { success: true, cleanup: created, tokens };
    } catch (err) {
      if (!navigator.onLine) {
        // Fallback to offline
        const offlineCleanups = JSON.parse(localStorage.getItem('offlineCleanups') || '[]');
        offlineCleanups.push({
          ...cleanupData,
          offlineId: Date.now(),
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('offlineCleanups', JSON.stringify(offlineCleanups));
        return { success: true, offline: true };
      }
      return { success: false, error: err.message };
    }
  }
}