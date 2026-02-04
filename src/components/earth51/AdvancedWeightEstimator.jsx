import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Scale, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ADVANCED WEIGHT ESTIMATOR - 2025 TECH
 * Multi-factor analysis:
 * - Object detection & counting
 * - Size estimation via reference objects
 * - Material density analysis
 * - Environmental scale comparison
 * - CNN-style analysis (via latest LLM vision)
 */

export default function AdvancedWeightEstimator({ photoUrl, onWeightEstimated }) {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  React.useEffect(() => {
    if (!photoUrl) return;
    
    const estimateWeight = async () => {
      setStatus('analyzing');
      
      try {
        // LATEST 2025 AI VISION - Multi-factor weight estimation
        const analysis = await base44.integrations.Core.InvokeLLM({
          prompt: `ADVANCED WEIGHT ESTIMATION (2025 CNN-Style Analysis):

Analyze this litter cleanup photo and estimate total weight with HIGH ACCURACY.

MULTI-FACTOR ANALYSIS:
1. OBJECT DETECTION:
   - Count individual items (bottles, cans, wrappers, bags)
   - Identify material types (plastic, metal, paper, glass)
   - Estimate size of each item

2. SCALE REFERENCE:
   - Compare to known objects (hands, shoes, coins, drinks)
   - Use environmental context (sidewalk width, tree size)
   - Estimate volume via spatial analysis

3. MATERIAL DENSITY:
   - PET plastic bottle (20-30g empty, 500ml full = ~520g)
   - Aluminum can (15g empty, 330ml full = ~350g)
   - Plastic bag (5-10g)
   - Glass bottle (200-500g)
   - Paper/cardboard (varies by size)

4. CONFIDENCE SCORING:
   - High confidence (clear items, good angle) = accurate
   - Medium confidence (partial view, cluttered) = range
   - Low confidence (blurry, far away) = conservative estimate

5. FRAUD DETECTION:
   - Is litter amount realistic?
   - Are items actually trash (not staged clean items)?
   - Does environment match cleanup context?

Return detailed breakdown with confidence level.`,
          file_urls: photoUrl,
          response_json_schema: {
            type: "object",
            properties: {
              estimated_weight_kg: { type: "number" },
              confidence_level: { 
                type: "string",
                enum: ["high", "medium", "low"]
              },
              weight_range: {
                type: "object",
                properties: {
                  min_kg: { type: "number" },
                  max_kg: { type: "number" }
                }
              },
              items_detected: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    item_type: { type: "string" },
                    count: { type: "number" },
                    estimated_weight_each: { type: "number" }
                  }
                }
              },
              scale_references_used: { type: "array", items: { type: "string" }},
              fraud_likelihood: { 
                type: "string",
                enum: ["none", "low", "medium", "high"]
              },
              reasoning: { type: "string" }
            }
          }
        });

        setResult(analysis);
        setStatus('complete');
        onWeightEstimated?.(analysis);
        
      } catch (err) {
        console.error('Weight estimation failed:', err);
        setStatus('error');
      }
    };
    
    estimateWeight();
  }, [photoUrl, onWeightEstimated]);

  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border-4 p-4 ${
        status === 'analyzing' ? 'border-purple-500 bg-purple-500/10' :
        status === 'complete' ? 'border-green-500 bg-green-500/10' :
        'border-red-500 bg-red-500/10'
      }`}
      style={{ boxShadow: '4px 4px 0px #000' }}
    >
      <div className="space-y-3">
        {status === 'analyzing' && (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Scale className="w-6 h-6 text-purple-400" />
            </motion.div>
            <div>
              <p className="text-purple-400 font-black font-mono text-xs">
                AI51 WEIGHING...
              </p>
              <p className="text-purple-300 font-mono text-[10px]">
                Counting items • Checking sizes • Detecting materials
              </p>
            </div>
          </div>
        )}

        {status === 'complete' && result && (
          <>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-green-400 font-black font-mono text-sm">
                  WEIGHT: {result.estimated_weight_kg}kg
                </p>
                <p className="text-green-300 font-mono text-[9px]">
                  Confidence: {result.confidence_level} • Range: {result.weight_range?.min_kg}-{result.weight_range?.max_kg}kg
                </p>
              </div>
            </div>

            {result.items_detected && result.items_detected.length > 0 && (
              <div className="bg-black border-2 border-green-500/50 p-3">
                <p className="text-green-400 font-mono text-[9px] mb-2">Items I see:</p>
                {result.items_detected.slice(0, 4).map((item, i) => (
                  <p key={i} className="text-white font-mono text-[9px]">
                    • {item.count}x {item.item_type} (~{item.estimated_weight_each}g each)
                  </p>
                ))}
              </div>
            )}

            {result.fraud_likelihood && result.fraud_likelihood !== 'none' && (
              <div className="bg-amber-500/20 border-2 border-amber-500 p-2">
                <p className="text-amber-400 font-mono text-[9px]">
                  ⚠️ Fraud risk: {result.fraud_likelihood}
                </p>
              </div>
            )}
          </>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <p className="text-amber-400 font-mono text-xs">
              Manual entry needed
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}