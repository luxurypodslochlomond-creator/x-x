// AI-Proof Validator — Validates cleanup submissions against known exploits
import { detectPromptInjection, validateAIOutput, runSecurityAudit, validatePhotoLiveness, checkRateLimit } from '@/components/security/AIProofSecurity';

export async function validateCleanupAIProof(formData, aiAnalysis, isAuthenticated) {
  const validation = {
    passed: true,
    warnings: [],
    errors: [],
    audit: {}
  };

  try {
    // 1. RATE LIMITING — Prevent brute force
    const rateLimit = checkRateLimit(
      isAuthenticated ? 'authenticated' : 'anonymous',
      'cleanup',
      10 // max 10 per hour
    );
    
    if (!rateLimit.allowed) {
      validation.errors.push(`Too many submissions. Retry in ${Math.ceil(rateLimit.retryAfter / 60000)} minutes.`);
      validation.passed = false;
    }

    // 2. AI OUTPUT VALIDATION — Ensure AI wasn't manipulated
    if (aiAnalysis) {
      const aiValidation = validateAIOutput(aiAnalysis, 'json');
      if (!aiValidation.valid) {
        validation.warnings.push(...aiValidation.errors);
      }
    }

    // 3. PHOTO LIVENESS VALIDATION — Detect deepfakes/stock photos
    const livenessCheck = validatePhotoLiveness({
      submission_timestamp: formData.submission_timestamp || new Date().toISOString(),
      gps_verified: formData.coordinates ? true : false,
      photo_hash: formData.photo_hash,
      liveness_score: aiAnalysis?.confidence_score ? aiAnalysis.confidence_score * 100 : 75,
      perceptual_hash: formData.perceptual_hash
    });

    if (!livenessCheck.valid) {
      validation.errors.push('Photo authenticity check failed. Ensure real outdoor location.');
      validation.passed = false;
    }

    if (!livenessCheck.trustworthy && aiAnalysis) {
      validation.warnings.push(`⚠️ Low confidence (${livenessCheck.livenessScore}%) — may require review`);
    }

    // 4. WEIGHT SANITY CHECK — Detect impossible weights
    if (formData.litter_weight) {
      if (formData.litter_weight < 0.005) {
        validation.errors.push('Minimum 5g required');
        validation.passed = false;
      }
      if (formData.litter_weight > 1000) {
        validation.errors.push('Maximum 1000kg per submission');
        validation.passed = false;
      }

      // Check AI vs user weight discrepancy
      if (aiAnalysis?.estimated_weight_kg) {
        const aiWeight = aiAnalysis.estimated_weight_kg;
        const userWeight = formData.litter_weight;
        const percentDiff = Math.abs(userWeight - aiWeight) / aiWeight * 100;

        if (percentDiff > 300) {
          validation.errors.push(`Weight mismatch: AI detected ${aiWeight}kg, you entered ${userWeight}kg`);
          validation.passed = false;
        } else if (percentDiff > 100) {
          validation.warnings.push(`⚠️ Weight differs from AI estimate (AI: ${aiWeight}kg, You: ${userWeight}kg)`);
        }
      }
    }

    // 5. FRAUD FLAGS CHECK — Detect obvious scams
    if (aiAnalysis?.fraud_flags && aiAnalysis.fraud_flags.length > 0) {
      const criticalFlags = aiAnalysis.fraud_flags.filter(f => 
        f.toLowerCase().includes('indoor') || 
        f.toLowerCase().includes('staged') ||
        f.toLowerCase().includes('shelf') ||
        f.toLowerCase().includes('fake')
      );

      if (criticalFlags.length > 0) {
        validation.errors.push(`Fraud detected: ${criticalFlags.join(', ')}`);
        validation.passed = false;
      } else {
        validation.warnings.push(`⚠️ Minor flags: ${aiAnalysis.fraud_flags.join(', ')}`);
      }
    }

    // 6. INDOOR STAGING DETECTION
    if (aiAnalysis?.is_indoor_staging) {
      validation.errors.push('Indoor staging detected. Must be real outdoor cleanup.');
      validation.passed = false;
    }

    // 7. FULL SECURITY AUDIT
    validation.audit = runSecurityAudit(formData, aiAnalysis);
    if (!validation.audit.passed) {
      validation.warnings.push('⚠️ Security audit flagged issues for review');
    }

    return validation;
  } catch (err) {
    validation.errors.push(`Validation error: ${err.message}`);
    validation.passed = false;
    return validation;
  }
}

// Check if AI response might be injection attack
export function checkForAIManipulation(aiOutput) {
  if (!aiOutput) return null;

  const injectionCheck = detectPromptInjection(JSON.stringify(aiOutput));
  
  if (injectionCheck.detected) {
    return {
      detected: true,
      pattern: injectionCheck.pattern,
      message: '⚠️ Suspicious pattern detected in AI output — validation rejected'
    };
  }

  return null;
}

// Calculate confidence score
export function calculateTrustScore(formData, aiAnalysis, isAuthenticated) {
  let score = 100;

  // GPS verified = +10
  if (formData.gps_verified) score += 10;

  // AI confidence score
  if (aiAnalysis?.confidence_score) {
    const aiConfidence = (aiAnalysis.confidence_score || 0.95) * 100;
    score += (aiConfidence / 100) * 20; // max +20
  }

  // Liveness check
  if (aiAnalysis?.liveness_score && aiAnalysis.liveness_score >= 85) {
    score += 15;
  }

  // No fraud flags
  if (!aiAnalysis?.fraud_flags || aiAnalysis.fraud_flags.length === 0) {
    score += 15;
  }

  // High recyclable = more trustworthy
  if (aiAnalysis?.recyclable_percentage && aiAnalysis.recyclable_percentage > 80) {
    score += 10;
  }

  // Cap at 100
  return Math.min(score, 100);
}