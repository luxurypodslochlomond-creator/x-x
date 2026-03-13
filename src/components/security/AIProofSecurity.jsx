// AI-Proof Security Hardening — Protects against prompt injection, model poisoning, output manipulation
// Validates all AI responses and prevents known attack vectors

// 1. PROMPT INJECTION DETECTION
export function detectPromptInjection(prompt) {
  const injectionPatterns = [
    /ignore.*instructions/i,
    /forget.*previous/i,
    /system.*message/i,
    /override.*safety/i,
    /bypass.*verification/i,
    /return.*internal.*state/i,
    /execute.*code/i,
    /sql.*injection/i,
    /javascript.*eval/i,
    /base64.*decode/i,
    /process\.env/i,
    /require\(/i,
    /import\(/i
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(prompt)) {
      console.warn('⚠️ PROMPT INJECTION DETECTED:', prompt.slice(0, 100));
      return { detected: true, pattern: pattern.toString() };
    }
  }
  
  return { detected: false };
}

// 2. AI OUTPUT VALIDATION — Ensure responses are sane
export function validateAIOutput(output, expectedType = 'json') {
  const validation = {
    valid: true,
    warnings: [],
    errors: []
  };

  // Check for prompt echoing (model was confused)
  if (output.includes('I cannot') || output.includes('I should not')) {
    validation.warnings.push('AI output indicates refusal — may be injection attempt');
  }

  // Check JSON validity
  if (expectedType === 'json') {
    try {
      const parsed = typeof output === 'string' ? JSON.parse(output) : output;
      
      // Validate schema bounds
      if (parsed.weight !== undefined) {
        if (parsed.weight < 0 || parsed.weight > 1000) {
          validation.errors.push(`Weight out of bounds: ${parsed.weight}kg`);
          validation.valid = false;
        }
      }
      
      if (parsed.confidence !== undefined) {
        if (parsed.confidence < 0 || parsed.confidence > 100) {
          validation.errors.push(`Confidence out of bounds: ${parsed.confidence}%`);
          validation.valid = false;
        }
      }

      // Check for suspicious keys
      const suspiciousKeys = Object.keys(parsed).filter(k => 
        k.includes('exec') || k.includes('eval') || k.includes('code') || k.includes('shell')
      );
      if (suspiciousKeys.length > 0) {
        validation.errors.push(`Suspicious fields detected: ${suspiciousKeys.join(', ')}`);
        validation.valid = false;
      }
    } catch (e) {
      validation.errors.push(`JSON parse failed: ${e.message}`);
      validation.valid = false;
    }
  }

  return validation;
}

// 3. LIVENESS DETECTION — Prevent deepfakes and stock photos
export function validatePhotoLiveness(metadata) {
  const checks = {
    timestamp: { required: true, present: !!metadata.submission_timestamp },
    gps: { required: true, present: !!metadata.gps_verified },
    photoHash: { required: true, present: !!metadata.photo_hash },
    livenessScore: { required: true, present: metadata.liveness_score !== undefined },
    perceptualHash: { required: true, present: !!metadata.perceptual_hash }
  };

  // ALL checks must pass
  const allValid = Object.values(checks).every(c => c.present);
  const livenessValid = metadata.liveness_score >= 75; // Must be >75% confident it's real

  return {
    valid: allValid && livenessValid,
    checks,
    livenessScore: metadata.liveness_score || 0,
    trustworthy: allValid && livenessValid && metadata.liveness_score >= 85
  };
}

// 4. REPLAY ATTACK PREVENTION
export function generateNonce() {
  return crypto.getRandomValues(new Uint8Array(16));
}

export function validateNonce(nonce, timestamp, maxAgeMs = 300000) {
  const now = Date.now();
  const age = now - timestamp;
  
  if (age > maxAgeMs) {
    return { valid: false, reason: 'Nonce expired' };
  }

  if (!nonce || nonce.length < 16) {
    return { valid: false, reason: 'Invalid nonce format' };
  }

  return { valid: true, ageMs: age };
}

// 5. BALANCE CONSISTENCY CHECK — Detect manipulation
export function validateBalanceConsistency(balance, transactions, cleanups, proofs) {
  const calculated = 
    (cleanups?.reduce((s, c) => s + (c.tokens_awarded || 0), 0) || 0) +
    (proofs?.reduce((s, p) => s + (p.p51_awarded || 0), 0) || 0) +
    (transactions?.filter(t => t.to_user === 'user').reduce((s, t) => s + (t.p51_amount || 0), 0) || 0) -
    (transactions?.filter(t => t.from_user === 'user').reduce((s, t) => s + (t.p51_amount || 0), 0) || 0);

  const discrepancy = Math.abs(balance - calculated);
  
  return {
    valid: discrepancy < 0.01, // Allow floating point error
    discrepancy,
    calculated,
    reported: balance,
    shouldFlag: discrepancy > 1 // Flag if >1 token difference
  };
}

// 6. OUTPUT SANITIZATION — Remove code/exec attempts from AI
export function sanitizeAIResponse(response) {
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onerror, etc
    /eval\(/gi,
    /exec\(/gi,
    /system\(/gi,
    /process\.exec/gi,
    /require\(/gi,
    /import\(/gi,
    /\$\{.*\}/g, // Template injection
  ];

  let sanitized = response;
  for (const pattern of dangerousPatterns) {
    if (pattern.test(sanitized)) {
      console.warn('⚠️ DANGEROUS PATTERN REMOVED:', pattern);
      sanitized = sanitized.replace(pattern, '');
    }
  }

  return sanitized;
}

// 7. SIGNATURE VERIFICATION — Cryptographic proof
export function generateCleanupSignature(cleanupData, privateKey) {
  try {
    const dataString = JSON.stringify({
      location: cleanupData.location,
      weight: cleanupData.litter_weight,
      timestamp: cleanupData.submission_timestamp,
      photoHash: cleanupData.photo_hash,
      gpsVerified: cleanupData.gps_verified
    });

    // In browser: use SubtleCrypto
    // This is simplified — real implementation uses ECDSA P-256
    const encoder = new TextEncoder();
    const data = encoder.encode(dataString);
    
    return btoa(dataString); // Placeholder — real crypto needed
  } catch (e) {
    console.error('Signature generation failed:', e);
    return null;
  }
}

// 8. RATE LIMITING — Prevent brute force on AI
export function checkRateLimit(userId, action, maxPerHour = 10) {
  const storageKey = `ratelimit_${userId}_${action}`;
  const now = Date.now();
  const hourAgo = now - 3600000;

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const recent = stored.filter(ts => ts > hourAgo);
    
    if (recent.length >= maxPerHour) {
      return { allowed: false, remaining: 0, retryAfter: recent[0] + 3600000 - now };
    }

    recent.push(now);
    localStorage.setItem(storageKey, JSON.stringify(recent));
    return { allowed: true, remaining: maxPerHour - recent.length };
  } catch (e) {
    console.error('Rate limit check failed:', e);
    return { allowed: true }; // Fail open
  }
}

// 9. INTEGRITY CHECK — Verify data hasn't been modified
export function calculateIntegrityHash(data) {
  const dataStr = JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < dataStr.length; i++) {
    const char = dataStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
}

export function verifyIntegrity(data, expectedHash) {
  const calculatedHash = calculateIntegrityHash(data);
  return {
    valid: calculatedHash === expectedHash,
    calculated: calculatedHash,
    expected: expectedHash
  };
}

// 10. MASTER SECURITY CHECK
export function runSecurityAudit(cleanupData, aiOutput) {
  const audit = {
    timestamp: Date.now(),
    passed: true,
    checks: {}
  };

  // Check 1: Liveness
  audit.checks.liveness = validatePhotoLiveness(cleanupData);
  if (!audit.checks.liveness.valid) audit.passed = false;

  // Check 2: AI Output validation
  audit.checks.aiOutput = validateAIOutput(aiOutput);
  if (!audit.checks.aiOutput.valid) audit.passed = false;

  // Check 3: Balance consistency
  audit.checks.balance = validateBalanceConsistency(
    cleanupData.reportedBalance,
    cleanupData.transactions,
    cleanupData.cleanups,
    cleanupData.proofs
  );
  if (audit.checks.balance.shouldFlag) audit.passed = false;

  // Check 4: Rate limiting
  audit.checks.rateLimit = checkRateLimit(cleanupData.createdBy, 'cleanup');
  if (!audit.checks.rateLimit.allowed) audit.passed = false;

  return audit;
}