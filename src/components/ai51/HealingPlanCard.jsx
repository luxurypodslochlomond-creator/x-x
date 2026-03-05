import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Wind, Zap, Leaf, X, Share2, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SECTION_ICONS = {
  frequency: Waves,
  breathing: Wind,
  movement: Zap,
  nutrition: Leaf,
};

const SECTION_COLORS = {
  frequency: { border: 'rgba(34,211,238,0.4)', text: 'rgba(34,211,238,0.9)', glow: 'rgba(34,211,238,0.15)' },
  breathing:  { border: 'rgba(168,85,247,0.4)', text: 'rgba(168,85,247,0.9)', glow: 'rgba(168,85,247,0.15)' },
  movement:   { border: 'rgba(251,191,36,0.4)', text: 'rgba(251,191,36,0.9)', glow: 'rgba(251,191,36,0.15)' },
  nutrition:  { border: 'rgba(34,197,94,0.4)',  text: 'rgba(34,197,94,0.9)',  glow: 'rgba(34,197,94,0.15)' },
};

export default function HealingPlanCard({ condition, onClose }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      try {
        const result = await base44.integrations.Core.InvokeLLM({
          prompt: `You are AI51's healing intelligence. Someone has this condition/situation: "${condition}"

Generate a concise, practical healing plan with exactly 4 sections. Be specific, warm, and actionable. No fluff.

Respond with JSON only:
{
  "title": "short healing plan title (e.g. 'Tension Headache Relief')",
  "subtitle": "one warm sentence about what this plan does",
  "sections": [
    { "type": "frequency", "title": "Frequency", "instruction": "specific frequency + duration (e.g. '432Hz for 20 minutes — place headphones on, close eyes')" },
    { "type": "breathing", "title": "Breathing", "instruction": "specific technique + timing (e.g. '4-7-8 breath: in for 4, hold 7, out 8 — repeat 6 times')" },
    { "type": "movement", "title": "Movement", "instruction": "gentle specific movement (e.g. 'slow neck rolls, 3 each side, chin to chest for 30s')" },
    { "type": "nutrition", "title": "Nourishment", "instruction": "specific food/drink (e.g. 'large glass of water now + magnesium-rich food within the hour')" }
  ],
  "closing": "one sentence of genuine encouragement"
}`,
          response_json_schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              subtitle: { type: "string" },
              sections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string" },
                    title: { type: "string" },
                    instruction: { type: "string" }
                  }
                }
              },
              closing: { type: "string" }
            }
          }
        });
        setPlan(result);
      } catch (e) {
        console.warn('Healing plan generation failed:', e);
      } finally {
        setLoading(false);
      }
    };
    generate();
  }, [condition]);

  const handleShare = async () => {
    if (!plan) return;
    const text = `AI51 Healing Plan: ${plan.title}\n\n${plan.sections.map(s => `${s.title}: ${s.instruction}`).join('\n\n')}\n\n${plan.closing}\n\nfrom UF51.love ♾️❤️`;
    if (navigator.share) {
      await navigator.share({ title: plan.title, text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard ♾️');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(10, 4, 30, 0.97)',
        border: '1px solid rgba(34,211,238,0.25)',
        boxShadow: '0 0 60px rgba(34,211,238,0.12), 0 0 120px rgba(168,85,247,0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex-1">
          <p className="text-cyan-400/60 font-mono text-xs tracking-widest mb-1">AI51 HEALING PLAN</p>
          {loading ? (
            <div className="h-5 w-40 rounded bg-white/10 animate-pulse" />
          ) : (
            <h3 className="text-white font-bold text-base leading-tight">{plan?.title}</h3>
          )}
        </div>
        <button onClick={onClose} className="ml-3 mt-0.5 text-white/20 hover:text-white/60 transition-colors flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-cyan-400/50 animate-spin" />
          <span className="ml-2 text-white/30 text-sm font-sans">synthesising your plan...</span>
        </div>
      ) : plan ? (
        <>
          {/* Subtitle */}
          <p className="px-4 pb-3 text-white/50 text-xs leading-relaxed font-sans">{plan.subtitle}</p>

          {/* Sections */}
          <div className="px-3 pb-3 space-y-2">
            {plan.sections.map((section) => {
              const Icon = SECTION_ICONS[section.type] || Waves;
              const colors = SECTION_COLORS[section.type] || SECTION_COLORS.frequency;
              return (
                <div
                  key={section.type}
                  className="rounded-xl p-3 flex gap-3"
                  style={{ background: colors.glow, border: `1px solid ${colors.border}` }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.text }} />
                  <div>
                    <p className="text-xs font-bold mb-0.5 font-mono tracking-wider" style={{ color: colors.text }}>{section.title.toUpperCase()}</p>
                    <p className="text-white/80 text-xs leading-relaxed font-sans">{section.instruction}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing + Share */}
          <div className="px-4 pb-4 space-y-3">
            <p className="text-white/40 text-xs text-center italic font-sans">{plan.closing}</p>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all"
              style={{
                background: 'rgba(34,211,238,0.08)',
                border: '1px solid rgba(34,211,238,0.2)',
                color: 'rgba(34,211,238,0.7)',
              }}
            >
              <Share2 className="w-3.5 h-3.5" />
              SHARE THIS PLAN
            </button>
          </div>
        </>
      ) : (
        <p className="text-white/30 text-xs text-center py-8 px-4 font-sans">Couldn't generate plan right now. Try again.</p>
      )}
    </motion.div>
  );
}