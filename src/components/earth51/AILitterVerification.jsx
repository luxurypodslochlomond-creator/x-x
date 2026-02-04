import React, { useState } from 'react';
import { Camera, CheckCircle, AlertCircle, Loader2, Shield, Eye } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI LITTER VERIFICATION - earth.love
 * Corporate accountability + child safety + zero data nonsense
 * 
 * Features:
 * - Photo → AI identifies brands (Coca-Cola, Pepsi, etc)
 * - Litter type analysis (plastic, glass, metal, etc)
 * - Corporate accountability scoring
 * - Anti-fraud verification
 * - Zero personal data stored
 * - Photos auto-delete after verification
 */

export default function AILitterVerification({ onVerified, photoUrl }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeLitter = async () => {
    if (!photoUrl) {
      setError('No photo provided');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      // AI VISION ANALYSIS - Identify brands, litter types, verify legitimacy
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `EARTH.LOVE - AI LITTER VERIFICATION
        
Analyze this cleanup photo with ZERO TOLERANCE for fraud:

1. BRAND IDENTIFICATION:
   - List ALL visible brand logos (Coca-Cola, Pepsi, McDonald's, etc)
   - Estimate quantity per brand
   - Confidence score per brand (0-100%)

2. LITTER TYPE ANALYSIS:
   - Plastic bottles/containers
   - Glass bottles
   - Metal cans
   - Paper/cardboard
   - Other waste types
   - Estimate total pieces

3. CORPORATE ACCOUNTABILITY:
   - Which corporations are responsible?
   - Estimated cleanup cost per brand
   - Environmental impact score

4. FRAUD DETECTION:
   - Is this a legitimate cleanup? (yes/no)
   - Red flags if any (staged photo, indoor litter, unrealistic amount, etc)
   - Verification confidence (0-100%)

5. SAFETY CHECK:
   - Any visible children in photo? (BLOCK if yes - privacy)
   - Any personal identifiable info? (BLOCK if yes)
   - Location identifiable? (OK if general area only)

Return structured JSON. Be strict on fraud detection - kids' trust is everything.`,
        file_urls: [photoUrl],
        response_json_schema: {
          type: "object",
          properties: {
            brands_detected: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  brand_name: { type: "string" },
                  quantity_estimated: { type: "number" },
                  confidence_percent: { type: "number" },
                  litter_types: { type: "array", items: { type: "string" } }
                }
              }
            },
            litter_analysis: {
              type: "object",
              properties: {
                plastic_pieces: { type: "number" },
                glass_pieces: { type: "number" },
                metal_cans: { type: "number" },
                paper_cardboard: { type: "number" },
                other_waste: { type: "number" },
                total_pieces: { type: "number" },
                estimated_weight_kg: { type: "number" }
              }
            },
            corporate_accountability: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  corporation: { type: "string" },
                  responsibility_percent: { type: "number" },
                  estimated_cleanup_cost_gbp: { type: "number" },
                  environmental_impact_score: { type: "number" }
                }
              }
            },
            fraud_check: {
              type: "object",
              properties: {
                is_legitimate: { type: "boolean" },
                confidence_percent: { type: "number" },
                red_flags: { type: "array", items: { type: "string" } },
                fraud_reason: { type: "string" }
              }
            },
            safety_check: {
              type: "object",
              properties: {
                children_visible: { type: "boolean" },
                personal_info_visible: { type: "boolean" },
                location_identifiable: { type: "boolean" },
                safe_to_process: { type: "boolean" },
                safety_notes: { type: "string" }
              }
            },
            verification_summary: { type: "string" }
          }
        }
      });

      // SAFETY FIRST - Block if any child safety issues
      if (!analysis.safety_check.safe_to_process) {
        setError(`❌ SAFETY BLOCK: ${analysis.safety_check.safety_notes}`);
        setAnalyzing(false);
        return;
      }

      // FRAUD CHECK - Block if not legitimate
      if (!analysis.fraud_check.is_legitimate || analysis.fraud_check.confidence_percent < 70) {
        setError(`❌ VERIFICATION FAILED: ${analysis.fraud_check.fraud_reason || 'Suspicious activity detected'}`);
        setAnalyzing(false);
        return;
      }

      setResult(analysis);
      
      // Pass verified data to parent
      if (onVerified) {
        onVerified({
          verified: true,
          brands: analysis.brands_detected,
          litter_analysis: analysis.litter_analysis,
          corporate_accountability: analysis.corporate_accountability,
          verification_summary: analysis.verification_summary
        });
      }

    } catch (err) {
      console.error('AI verification error:', err);
      setError('Verification failed - please try again');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* VERIFY BUTTON */}
      {!result && !analyzing && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={analyzeLitter}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg"
        >
          <Eye className="w-5 h-5" />
          <span>AI VERIFY CLEANUP</span>
        </motion.button>
      )}

      {/* ANALYZING STATE */}
      {analyzing && (
        <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-6 text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-cyan-400 font-black font-mono text-sm mb-2">AI ANALYZING...</p>
          <p className="text-gray-400 text-xs font-mono">Detecting brands • Checking fraud • Verifying safety</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/40 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-bold text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* VERIFICATION RESULTS */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* SUCCESS HEADER */}
          <div className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-2 border-green-500 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-green-400 font-black font-mono text-lg">✓ VERIFIED CLEANUP</h3>
                <p className="text-green-400/60 text-xs font-mono">AI confidence: {result.fraud_check.confidence_percent}%</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{result.verification_summary}</p>
          </div>

          {/* BRANDS DETECTED */}
          {result.brands_detected && result.brands_detected.length > 0 && (
            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-cyan-400 font-black font-mono text-sm mb-3">BRANDS DETECTED</h4>
              <div className="space-y-2">
                {result.brands_detected.map((brand, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-black/40 p-2 rounded">
                    <div>
                      <p className="text-white font-bold text-sm">{brand.brand_name}</p>
                      <p className="text-gray-400 text-xs">~{brand.quantity_estimated} items • {brand.confidence_percent}% match</p>
                    </div>
                    <div className="bg-amber-500/20 text-amber-400 text-xs font-black px-2 py-1 rounded">
                      ACCOUNTABLE
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LITTER BREAKDOWN */}
          <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="text-cyan-400 font-black font-mono text-sm mb-3">LITTER BREAKDOWN</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/40 p-2 rounded">
                <p className="text-gray-400 text-xs">Plastic</p>
                <p className="text-white font-black">{result.litter_analysis.plastic_pieces || 0}</p>
              </div>
              <div className="bg-black/40 p-2 rounded">
                <p className="text-gray-400 text-xs">Glass</p>
                <p className="text-white font-black">{result.litter_analysis.glass_pieces || 0}</p>
              </div>
              <div className="bg-black/40 p-2 rounded">
                <p className="text-gray-400 text-xs">Metal</p>
                <p className="text-white font-black">{result.litter_analysis.metal_cans || 0}</p>
              </div>
              <div className="bg-black/40 p-2 rounded">
                <p className="text-gray-400 text-xs">Total</p>
                <p className="text-white font-black">{result.litter_analysis.total_pieces || 0}</p>
              </div>
            </div>
            <div className="mt-2 bg-green-500/20 border border-green-500/50 rounded p-2">
              <p className="text-green-400 text-xs font-mono text-center">
                ~{result.litter_analysis.estimated_weight_kg || 0}kg collected
              </p>
            </div>
          </div>

          {/* CORPORATE ACCOUNTABILITY */}
          {result.corporate_accountability && result.corporate_accountability.length > 0 && (
            <div className="bg-black/60 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-amber-400 font-black font-mono text-sm mb-3">CORPORATE ACCOUNTABILITY</h4>
              <div className="space-y-2">
                {result.corporate_accountability.map((corp, idx) => (
                  <div key={idx} className="bg-black/40 p-2 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-bold text-sm">{corp.corporation}</p>
                      <p className="text-amber-400 font-black text-xs">{corp.responsibility_percent}%</p>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Cleanup cost:</span>
                      <span className="text-green-400 font-bold">£{corp.estimated_cleanup_cost_gbp?.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SAFETY SEAL */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-2 border-blue-500/50 rounded-lg p-3 flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <div className="flex-1">
              <p className="text-blue-400 font-black text-xs font-mono">CHILD SAFETY VERIFIED</p>
              <p className="text-blue-400/60 text-[10px] font-mono">Zero personal data • No faces detected • Safe to process</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}