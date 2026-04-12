import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ClientSidePhotoCheck from './ClientSidePhotoCheck';
import LivenessDetector from './LivenessDetector';
import AdvancedWeightEstimator from './AdvancedWeightEstimator';
import TrustScoreEngine from './TrustScoreEngine';
import ParentConsentModal from './ParentConsentModal';
import AILitterVerification from './AILitterVerification';

/**
 * PRIVACY-FIRST ENGINE - 2026 GOLD STANDARD
 * 
 * Client-side ALWAYS runs (offline-safe)
 * Cloud AI ONLY if parent consents
 * 
 * GDPR Article 5: Data minimization
 * COPPA 2.0: Parental consent for AI processing
 * UK Online Safety Act: Age-appropriate design
 */

export default function PrivacyFirstEngine({ 
  photoFile, 
  photoUrl, 
  onWeightEstimated,
  onFraudDetected,
  onTrustCalculated,
  onAllChecksComplete 
}) {
  const [aiConsent, setAiConsent] = useState(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [clientCheck, setClientCheck] = useState(null);
  const [trustScore, setTrustScore] = useState(null);
  const [allResults, setAllResults] = useState({});

  // Load consent from localStorage (persisted choice)
  useEffect(() => {
    const stored = localStorage.getItem('earth51_ai_consent');
    if (stored !== null) {
      setAiConsent(stored === 'true');
    } else {
      // First time - ask parent
      setShowConsentModal(true);
    }
  }, []);

  // Get stored hashes for duplicate detection
  const existingHashes = JSON.parse(localStorage.getItem('earth51_photo_hashes') || '[]');

  const handleConsentChoice = (consent) => {
    setAiConsent(consent);
    localStorage.setItem('earth51_ai_consent', consent.toString());
    setShowConsentModal(false);
  };

  // Aggregate all results
  useEffect(() => {
    if (clientCheck && trustScore) {
      onAllChecksComplete?.({
        client_safe: clientCheck.passes_basic_checks,
        trust_score: trustScore,
        ai_consent: aiConsent,
        ...allResults
      });
    }
  }, [clientCheck, trustScore, allResults, aiConsent, onAllChecksComplete]);

  return (
    <div className="space-y-3">
      {/* CONSENT MODAL */}
      {showConsentModal && (
        <ParentConsentModal
          onConsent={handleConsentChoice}
          onDecline={() => handleConsentChoice(false)}
        />
      )}

      {/* ALWAYS: Client-side check (privacy-safe) */}
      <ClientSidePhotoCheck
        photoFile={photoFile}
        photoUrl={photoUrl}
        existingHashes={existingHashes}
        onCheckComplete={(result) => {
          setClientCheck(result);
          if (!result.passes_basic_checks) {
            onFraudDetected?.('duplicate_or_suspicious');
          }
        }}
      />

      {/* ALWAYS: Trust score (local calculation) */}
      <TrustScoreEngine
        onTrustCalculated={(score) => {
          setTrustScore(score);
          onTrustCalculated?.(score);
        }}
      />

      {/* OPTIONAL: AI checks (only if consented) */}
      {aiConsent === true && photoUrl && (
        <>
          <LivenessDetector
            photoUrl={photoUrl}
            onLivenessChecked={(result) => {
              setAllResults(prev => ({ ...prev, liveness: result }));
              if (!result.is_live_photo || !result.safe_for_kids) {
                onFraudDetected?.('ai_detected_fraud');
              }
            }}
          />

          <AdvancedWeightEstimator
            photoUrl={photoUrl}
            onWeightEstimated={(result) => {
              setAllResults(prev => ({ ...prev, weight: result }));
              onWeightEstimated?.(result);
            }}
          />

          <AILitterVerification
            photoUrl={photoUrl}
            onVerified={(result) => {
              setAllResults(prev => ({ ...prev, brands: result }));
            }}
          />
        </>
      )}

      {/* PRIVACY NOTICE */}
      {aiConsent === false && (
        <div className="bg-green-500 border-4 border-green-400 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-black" />
            <div>
              <p className="text-black font-black font-mono text-xs">PRIVACY MODE ACTIVE</p>
              <p className="text-black font-mono text-[9px]">All checks on your device ✓</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}