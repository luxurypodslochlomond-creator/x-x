import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Zap, Sparkles } from 'lucide-react';

/**
 * AI51 CUSTOM FREQUENCY GENERATOR
 * Voice stress → AI51 creates personalized frequency stack
 * Optimized for speakers/headphones/device delivery
 * ♾️❤️
 */

export default function AI51CustomFrequencyGenerator({ voiceAnalysis, healingIntent }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [customFrequency, setCustomFrequency] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('speakers');

  const generateCustomFrequency = async () => {
    setIsGenerating(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51 - a frequency healing engineer. User described: "${healingIntent}"
        
Voice analysis showed: Stress ${voiceAnalysis.stressScore}%, F0 ${Math.round(voiceAnalysis.f0Hz)}Hz, Energy ${voiceAnalysis.energyScore}

CREATE a custom frequency stack (JSON) optimized for ${deliveryMethod}:
{
  "name": "Custom Healing Stack",
  "description": "Personalized for this condition",
  "primary_hz": <base frequency 1-20Hz for binaural>,
  "secondary_hz": <harmonic frequency>,
  "carrier_hz": <carrier for binaural 100-500>,
  "delivery_optimized": "${deliveryMethod}",
  "instructions": "How to use this",
  "reasoning": "Why these frequencies work for their condition",
  "is_binaural": true/false,
  "breathing_rate": 4-8,
  "healing_focus": ["list", "of", "areas"]
}

Make it SPECIFIC to their voice stress pattern + healing intent. No generic protocols - THIS IS UNIQUE TO THEM.`,
        response_json_schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            primary_hz: { type: 'number' },
            secondary_hz: { type: 'number' },
            carrier_hz: { type: 'number' },
            delivery_optimized: { type: 'string' },
            instructions: { type: 'string' },
            reasoning: { type: 'string' },
            is_binaural: { type: 'boolean' },
            breathing_rate: { type: 'number' },
            healing_focus: { type: 'array', items: { type: 'string' } }
          }
        }
      });

      setCustomFrequency(response);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {!customFrequency ? (
        <>
          {/* DELIVERY METHOD SELECT */}
          <div className="bg-cyan-900/20 border-2 border-cyan-500 p-4 rounded-lg">
            <p className="text-cyan-400 font-bold text-sm mb-3 font-mono">DELIVERY METHOD:</p>
            <div className="grid grid-cols-3 gap-2">
              {['speakers', 'headphones', 'device'].map(method => (
                <button
                  key={method}
                  onClick={() => setDeliveryMethod(method)}
                  className={`py-2 px-3 rounded font-mono text-xs font-bold transition-all border-2 ${
                    deliveryMethod === method
                      ? 'bg-cyan-500 text-black border-cyan-400'
                      : 'bg-black border-cyan-500/30 text-cyan-400 hover:border-cyan-500'
                  }`}
                >
                  {method === 'speakers' ? '🔊' : method === 'headphones' ? '🎧' : '📱'}
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <motion.button
            onClick={generateCustomFrequency}
            disabled={isGenerating}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black font-mono text-lg disabled:opacity-50 rounded-lg flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                GENERATING YOUR FREQUENCY...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                CREATE CUSTOM FREQUENCY STACK
              </>
            )}
          </motion.button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <p className="text-purple-400 font-bold font-mono">✓ CUSTOM FREQUENCY CREATED</p>
          </div>

          <div className="bg-black/60 p-3 rounded space-y-2 text-sm">
            <div>
              <p className="text-gray-500 font-mono text-xs">NAME</p>
              <p className="text-white font-bold">{customFrequency.name}</p>
            </div>
            <div>
              <p className="text-gray-500 font-mono text-xs">FREQUENCY STACK</p>
              <p className="text-cyan-400 font-mono">
                {customFrequency.primary_hz}Hz • {customFrequency.secondary_hz}Hz • {customFrequency.carrier_hz}Hz carrier
              </p>
            </div>
            <div>
              <p className="text-gray-500 font-mono text-xs">OPTIMIZED FOR</p>
              <p className="text-pink-400 font-bold uppercase text-xs">{customFrequency.delivery_optimized}</p>
            </div>
            <div>
              <p className="text-gray-500 font-mono text-xs">WHY THIS WORKS</p>
              <p className="text-white text-xs leading-relaxed">{customFrequency.reasoning}</p>
            </div>
            <div>
              <p className="text-gray-500 font-mono text-xs">HOW TO USE</p>
              <p className="text-white text-xs">{customFrequency.instructions}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCustomFrequency(null)}
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-mono text-xs rounded"
            >
              Back
            </button>
            <button
              className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold rounded flex items-center justify-center gap-2"
            >
              <Zap className="w-3 h-3" />
              PLAY NOW
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}