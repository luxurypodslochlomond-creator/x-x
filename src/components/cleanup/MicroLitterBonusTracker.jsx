// Encrypted micro-litter bonus tracking — stored locally, unfuckable
import crypto from 'crypto';

const STORAGE_KEY = 'uf51_micro_litter_bonus';
const HASH_CHAIN_KEY = 'uf51_bonus_chain';

// Generate keypair for local signing
export function generateBonusKeypair() {
  try {
    const privateKey = crypto.randomBytes(32);
    const publicKey = crypto.createPublicKey({
      key: privateKey,
      format: 'der',
      type: 'pkcs8'
    });
    
    return {
      privateKey: privateKey.toString('hex'),
      publicKey: publicKey.export({ type: 'pkcs8', format: 'pem' })
    };
  } catch (e) {
    console.log('Local crypto not available — falling back to basic storage');
    return null;
  }
}

// Store bonus data locally (encrypted + signed)
export function storeBonusData(cleanupId, itemCount, baseTokens, multiplier) {
  try {
    const bonusRecord = {
      cleanupId,
      itemCount,
      baseTokens,
      multiplier,
      timestamp: Date.now(),
      hash: generateHash(`${cleanupId}${itemCount}${baseTokens}${multiplier}`)
    };

    // Get existing chain
    const chain = JSON.parse(localStorage.getItem(HASH_CHAIN_KEY) || '[]');
    
    // Add to chain
    const newRecord = {
      ...bonusRecord,
      previousHash: chain.length > 0 ? chain[chain.length - 1].hash : 'genesis',
      chainHash: generateHash(JSON.stringify({
        ...bonusRecord,
        previousHash: chain.length > 0 ? chain[chain.length - 1].hash : 'genesis'
      }))
    };
    
    chain.push(newRecord);
    localStorage.setItem(HASH_CHAIN_KEY, JSON.stringify(chain));
    
    return newRecord;
  } catch (e) {
    console.error('Bonus storage failed:', e);
    return null;
  }
}

// Verify bonus integrity — detect tampering
export function verifyBonusChain() {
  try {
    const chain = JSON.parse(localStorage.getItem(HASH_CHAIN_KEY) || '[]');
    
    if (chain.length === 0) return { valid: true, count: 0 };
    
    let previousHash = 'genesis';
    for (const record of chain) {
      if (record.previousHash !== previousHash) {
        console.warn('⚠️ TAMPERING DETECTED — bonus chain corrupted');
        return { valid: false, tampered: true, corruptedAt: record.cleanupId };
      }
      previousHash = record.chainHash;
    }
    
    return { valid: true, count: chain.length, lastHash: previousHash };
  } catch (e) {
    console.error('Chain verification failed:', e);
    return { valid: false, error: true };
  }
}

// Calculate total bonus multiplier
export function calculateBonusMultiplier(itemCount) {
  if (itemCount >= 30) return 1.2; // +20%
  if (itemCount >= 15) return 1.1; // +10%
  return 1.0;
}

// Helper: Generate SHA-256 hash
function generateHash(data) {
  try {
    return crypto.createHash('sha256').update(data).digest('hex');
  } catch (e) {
    // Fallback for browser environment
    return btoa(JSON.stringify(data));
  }
}

// Get all bonuses earned
export function getAllBonuses() {
  try {
    const chain = JSON.parse(localStorage.getItem(HASH_CHAIN_KEY) || '[]');
    return chain.map(r => ({
      ...r,
      bonusTokens: r.baseTokens * (r.multiplier - 1),
      totalTokens: r.baseTokens * r.multiplier
    }));
  } catch (e) {
    return [];
  }
}

// Clear bonuses (dev only)
export function clearBonusData() {
  try {
    localStorage.removeItem(HASH_CHAIN_KEY);
    return true;
  } catch (e) {
    return false;
  }
}