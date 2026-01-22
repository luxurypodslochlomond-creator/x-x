import React, { useState, useEffect } from 'react';

/**
 * AI51 Crypto Proof System
 * Signs sessions with user's device keypair
 * Proves healing happened, tied to user identity
 */

export default function AI51CryptoProof() {
  const [publicKey, setPublicKey] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate device keypair on first run
  useEffect(() => {
    const initializeKeys = async () => {
      let storedKey = localStorage.getItem('ai51_public_key');
      
      if (!storedKey) {
        // Generate new keypair
        const keyPair = await window.crypto.subtle.generateKey(
          {
            name: 'ECDSA',
            namedCurve: 'P-256'
          },
          false, // don't extract private key
          ['sign', 'verify']
        );

        // Export public key for storage
        const exported = await window.crypto.subtle.exportKey('raw', keyPair.publicKey);
        const publicKeyHex = Array.from(new Uint8Array(exported))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        
        localStorage.setItem('ai51_public_key', publicKeyHex);
        localStorage.setItem('ai51_keypair_generated', new Date().toISOString());
        storedKey = publicKeyHex;
      }

      setPublicKey(storedKey);
      setIsInitialized(true);
    };

    initializeKeys();
  }, []);

  // Sign session data
  const signSessionData = async (sessionData) => {
    if (!isInitialized) return null;

    const privateKeyRaw = localStorage.getItem('ai51_private_key_raw');
    if (!privateKeyRaw) {
      console.log('Private key not available for signing');
      return null;
    }

    const data = new TextEncoder().encode(JSON.stringify(sessionData));
    const signature = await window.crypto.subtle.sign(
      'ECDSA',
      privateKeyRaw,
      data
    );

    return {
      sessionHash: Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(''),
      timestamp: new Date().toISOString(),
      publicKey
    };
  };

  return {
    publicKey,
    signSessionData,
    isReady: isInitialized
  };
}

// Export hook for easy use
export const useAI51Proof = () => {
  const [proof, setProof] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      const keys = await AI51CryptoProof();
      setProof(keys);
    };
    init();
  }, []);

  return proof;
};