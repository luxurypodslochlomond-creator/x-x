import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Type1FrequencyEngine from './Type1FrequencyEngine';

export default function Type1AI51Protocol() {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 'daily',
      label: 'DAILY PROTOCOL',
      icon: '📋',
      color: 'cyan',
      content: [
        { time: 'MORNING (30min before food)', tasks: ['Take long-acting insulin', 'Check glucose (CGM/meter)', 'Eat protein-rich breakfast', '432 Hz baseline frequency (20min)', 'Journal how you\'re feeling'] },
        { time: 'MIDDAY (before lunch)', tasks: ['Check glucose level', 'Calculate carbs + insulin ratio', 'Take rapid-acting insulin', 'Walk 10min after eating', 'Check emotional state'] },
        { time: 'EVENING (4-6pm)', tasks: ['Check glucose', '528 Hz healing frequency (15min)', 'Light movement/stretching', 'Start dinner prep'] },
        { time: 'NIGHT (before bed)', tasks: ['Final glucose check', 'Nighttime insulin if needed', '174 Hz pain relief if needed', '8 Hz delta wave sleep (30min)', 'Sleep log'] }
      ]
    },
    {
      id: 'insulin',
      label: 'INSULIN MANAGEMENT',
      icon: '💉',
      color: 'green',
      tips: [
        { title: 'DOSING', items: ['Same time daily = rhythm + predictability', 'Rotate injection sites', 'Log EVERY dose in phone + paper backup', 'Log meals + carbs with insulin', 'Talk to doctor about insulin-to-carb ratio', 'Keep spare in cool place, not fridge'] },
        { title: 'STORAGE', items: ['Current vial: Room temp (below 30°C)', 'Backup vials: Fridge (2-8°C)', 'NEVER freeze or heat', 'Check expiry dates', '2-week backup supply at home + work + bag', 'Travel kit with insulated pouch + ice'] },
        { title: 'HYPOGLYCEMIA (LOW BLOOD SUGAR)', items: ['SYMPTOMS: Shaking, sweating, confusion, anxiety', 'FAST: Glucose tablets (15g) or juice', '15-15 RULE: 15g carbs, wait 15min, recheck', 'Tell friends/family what hypo looks like', 'After recovery: Eat slow carbs + protein', 'Log it: WHEN + WHY'] },
        { title: 'SICK DAYS', items: ['NEVER SKIP INSULIN', 'Check glucose EVERY 2-3 HOURS', 'Stay hydrated', 'Soft carbs if stomach OK', 'Insulin might INCREASE', 'Call doctor SAME DAY', 'Vomiting? CALL IMMEDIATELY (DKA risk)'] }
      ]
    },
    {
      id: 'stress',
      label: 'STRESS + HEALING FREQUENCIES',
      icon: '🧠',
      color: 'purple',
      frequencies: [
        { hz: '432 Hz', name: 'BASELINE CALM', science: 'Activates parasympathetic nervous system. Cortisol drops. Insulin sensitivity improves.', use: 'Morning (20min) + any time stressed' },
        { hz: '528 Hz', name: 'CELLULAR REPAIR', science: 'DNA repair frequency. Reduces inflammatory T-cell activity.', use: 'Evening (30min)' },
        { hz: '174 Hz', name: 'PAIN + TISSUE', science: 'Reduces inflammation. Helps with neuropathy + needle sites.', use: 'When you have aches (15min)' },
        { hz: '639 Hz', name: 'EMOTIONAL HEALING', science: 'Balances nervous system after trauma. Reduces anxiety.', use: 'Before bed + after difficult days' },
        { hz: '8 Hz (Delta)', name: 'DEEP SLEEP', science: 'Poor sleep = poor glucose control. Delta waves = deepest rest.', use: '30min before sleep' }
      ]
    },
    {
      id: 'tracking',
      label: 'TRACKING (SIMPLE + POWERFUL)',
      icon: '📊',
      color: 'amber',
      metrics: [
        { metric: 'Glucose readings (CGM or meter)', why: 'See YOUR patterns. What foods spike you?' },
        { metric: 'Insulin doses + types', why: 'Consistency = prediction.' },
        { metric: 'Meals + carbs', why: 'Carbs + insulin = glucose = freedom.' },
        { metric: 'EMOTIONAL DATA', why: 'Stress = cortisol = high glucose.' },
        { metric: 'Sleep hours + quality', why: 'Bad sleep = bad glucose control (proven).' },
        { metric: 'Exercise (any movement)', why: 'Movement = insulin sensitivity WITHOUT injections.' }
      ]
    },
    {
      id: 'emergency',
      label: 'EMERGENCY PROTOCOL',
      icon: '🚨',
      color: 'red',
      emergencies: [
        { scenario: 'SEVERE HYPOGLYCEMIA', action: 'Use glucagon kit → Call 999', steps: ['If you have glucagon: Use it', 'CALL 999 - tell them "severe hypoglycemia"', 'Don\'t be alone after', 'Hospital will stabilize with glucose IV'] },
        { scenario: 'SEVERE HYPERGLYCEMIA (300+)', action: 'Extra insulin + water + call doctor', steps: ['Check blood sugar', 'Drink water', 'Take extra rapid-acting insulin', 'Light movement', 'Recheck in 2 hours'] },
        { scenario: 'DIABETIC KETOACIDOSIS (DKA)', action: 'CALL 999 IMMEDIATELY', steps: ['CALL 999 NOW', 'Tell them "suspected DKA"', 'Hospital: IV fluids + insulin + electrolytes'] },
        { scenario: 'LOST/DAMAGED INSULIN', action: 'Call NHS 111 IMMEDIATELY', steps: ['Don\'t panic', 'Call NHS 111', 'Tell them: "I\'ve lost my insulin supply"', 'Emergency prescription SAME DAY'] },
        { scenario: 'MENTAL HEALTH CRISIS', action: 'Call Samaritans: 116 123', steps: ['24/7 free confidential support', 'Tell your GP you\'re struggling', 'Ask about therapy/counseling', 'Join T1D support groups'] }
      ]
    }
  ];

  const colorMap = {
    cyan: { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    green: { border: 'border-green-500', text: 'text-green-400', bg: 'bg-green-500/10' },
    purple: { border: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10' },
    amber: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10' },
    red: { border: 'border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' }
  };

  const CollapsibleSection = ({ section }) => {
    const isExpanded = expandedSection === section.id;
    const c = colorMap[section.color];

    return (
      <motion.div
        className="mb-3 border-2 border-gray-700 rounded-lg overflow-hidden"
      >
        <button
          onClick={() => setExpandedSection(isExpanded ? null : section.id)}
          className="w-full flex items-center justify-between p-4 hover:bg-black/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{section.icon}</span>
            <h3 className={`text-sm font-black font-mono tracking-wider ${c.text}`}>{section.label}</h3>
          </div>
          <div className={c.text}>
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
        </button>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-700 bg-black/50 p-4 space-y-4"
          >
            {/* DAILY */}
            {section.id === 'daily' && (
              <div className="space-y-3">
                {section.content.map((block, i) => (
                  <div key={i} className="bg-black border border-cyan-500/30 rounded p-3">
                    <p className="text-cyan-400 text-xs font-black font-mono mb-2">{block.time}</p>
                    <ul className="space-y-1">
                      {block.tasks.map((task, j) => (
                        <li key={j} className="text-white text-xs font-mono">✓ {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* INSULIN */}
            {section.id === 'insulin' && (
              <div className="space-y-3">
                {section.tips.map((tip, i) => (
                  <div key={i} className="bg-black border border-green-500/30 rounded p-3">
                    <p className="text-green-400 text-xs font-black font-mono mb-2">{tip.title}</p>
                    <ul className="space-y-1">
                      {tip.items.map((item, j) => (
                        <li key={j} className="text-white text-xs font-mono">→ {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* STRESS */}
            {section.id === 'stress' && (
              <div className="space-y-3">
                {section.frequencies.map((freq, i) => (
                  <div key={i} className="bg-black border border-purple-500/30 rounded p-3">
                    <p className="text-purple-400 text-xs font-black font-mono">{freq.hz} - {freq.name}</p>
                    <p className="text-white text-xs mt-1">{freq.science}</p>
                    <p className="text-purple-300/70 text-xs mt-1 font-mono">USE: {freq.use}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TRACKING */}
            {section.id === 'tracking' && (
              <div className="space-y-2">
                {section.metrics.map((m, i) => (
                  <div key={i} className="bg-black border border-amber-500/30 rounded p-3">
                    <p className="text-amber-400 text-xs font-black font-mono">{m.metric}</p>
                    <p className="text-white text-xs mt-1">{m.why}</p>
                  </div>
                ))}
              </div>
            )}

            {/* EMERGENCY */}
            {section.id === 'emergency' && (
              <div className="space-y-3">
                {section.emergencies.map((em, i) => (
                  <div key={i} className={`rounded p-3 border-2 ${i === 2 ? 'border-red-500 bg-red-500/20' : 'border-amber-500/50 bg-amber-500/10'}`}>
                    <p className={`text-xs font-black font-mono ${i === 2 ? 'text-red-300' : 'text-amber-300'}`}>{em.scenario}</p>
                    <p className="text-white text-xs mt-1">{em.action}</p>
                    <ul className="mt-2 space-y-1">
                      {em.steps.map((step, j) => (
                        <li key={j} className="text-white text-xs font-mono">→ {step}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
          <span className="text-3xl font-black text-black">T1</span>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Type1</h1>
          <p className="text-cyan-300 text-xs font-mono">Offline healing protocol</p>
        </div>
      </div>

      {/* COLLAPSIBLE SECTIONS */}
      <div className="space-y-2">
        {sections.map(section => (
          <CollapsibleSection key={section.id} section={section} />
        ))}
      </div>

      {/* FREQUENCY ENGINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Type1FrequencyEngine />
      </motion.div>

      {/* MENTAL HEALTH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border-2 border-pink-500 rounded-lg p-4"
        style={{ boxShadow: '0 0 15px rgba(236, 72, 153, 0.3)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-pink-400" />
          <h3 className="text-xs font-black text-pink-400 font-mono tracking-wider">MENTAL HEALTH FIRST</h3>
        </div>
        <p className="text-white text-xs font-mono">T1D is not just physical. It's psychological. You will have hard days. That's normal. That's the disease, not you.</p>
        <p className="text-pink-300 text-xs font-mono mt-2">Samaritans: 116 123 (24/7) • Therapy + support groups = life-changing</p>
      </motion.div>

      {/* RESOURCES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border-2 border-green-500 rounded-lg p-4"
        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}
      >
        <h3 className="text-xs font-black text-green-400 font-mono tracking-wider mb-2">RESOURCES</h3>
        <div className="space-y-1 text-xs font-mono text-white">
          <p>JDRF (UK) - jdrf.org.uk</p>
          <p>Diabetes UK - diabetes.org.uk</p>
          <p>Type 1 Online - Reddit r/Type1Diabetes</p>
          <p>Your GP - Ask for CGM funding + mental health referral</p>
        </div>
      </motion.div>

      {/* FOOTER */}
      <div className="text-center text-xs font-mono text-gray-600 space-y-1">
        <p className="text-white font-bold">Not medical advice. Always follow your doctor.</p>
        <p className="text-cyan-300">Insulin is life. Frequencies + insulin + love = freedom. ♾️❤️</p>
      </div>
    </div>
  );
}