import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronRight, Sun, Cloud, Moon, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Type1FrequencyEngine from './Type1FrequencyEngine';

export default function Type1AI51Protocol() {
  const [expandedSection, setExpandedSection] = useState(null);

  // QUICK ACTION CARDS - 2x2 GRID
  const actionCards = [
    {
      time: 'MORNING',
      icon: Sun,
      color: 'amber',
      tasks: ['Long-acting insulin', 'Check glucose', 'Protein breakfast', '432 Hz (20min)'],
      description: 'Start with rhythm'
    },
    {
      time: 'MIDDAY',
      icon: Cloud,
      color: 'cyan',
      tasks: ['Check glucose', 'Count carbs', 'Rapid insulin', 'Walk 10min'],
      description: 'Stay balanced'
    },
    {
      time: 'EVENING',
      icon: Moon,
      color: 'purple',
      tasks: ['Check glucose', '528 Hz healing', 'Light stretch', 'Dinner prep'],
      description: 'Begin unwinding'
    },
    {
      time: 'NIGHT',
      icon: Star,
      color: 'blue',
      tasks: ['Final glucose', 'Nighttime insulin', '8 Hz sleep', 'Rest well'],
      description: 'Recovery mode'
    }
  ];

  const sections = [
    {
      id: 'insulin',
      label: 'INSULIN MANAGEMENT',
      color: 'green',
      content: [
        { title: 'DOSING BASICS', items: ['Same time daily = predictability', 'Rotate injection sites (prevent lumps)', 'Log EVERY dose in your diary', 'Keep 2-week backup supply: home + work + bag', 'Check expiry dates monthly'] },
        { title: 'STORAGE & TRAVEL', items: ['Current vial: Room temp (below 30°C)', 'Backup vials: Fridge (2-8°C)', 'NEVER freeze or heat insulin', 'Travel kit: Insulated pouch + ice packs', 'Always carry backup needle + meter'] },
        { title: 'HYPOGLYCEMIA (LOW)', items: ['SYMPTOMS: Shaking, sweating, confusion, anxiety', 'FAST: 15g carbs (glucose tablets or juice)', '15-15 RULE: Eat 15g, wait 15min, recheck', 'After recovery: Eat slow carbs + protein', 'Tell friends/family what hypo looks like'] },
        { title: 'SICK DAYS', items: ['NEVER SKIP INSULIN - ever', 'Check glucose EVERY 2-3 HOURS', 'Stay hydrated (water only)', 'Soft carbs if stomach OK', 'Call NHS 111 SAME DAY if vomiting'] }
      ],
      resources: [
        { name: 'Diabetes UK Insulin Guide', url: 'https://www.diabetes.org.uk/guide-to-diabetes/managing-your-diabetes/treating-your-diabetes/insulin' },
        { name: 'NHS Type 1 Diabetes', url: 'https://www.nhs.uk/conditions/type-1-diabetes/' }
      ]
    },
    {
      id: 'monitoring',
      label: 'BLOOD GLUCOSE MONITORING',
      color: 'cyan',
      content: [
        { title: 'CGM vs FINGER PRICKS', items: ['CGM (continuous): Every 5min data, trends, alarms', 'Finger pricks: Before meals, before bed, when low', 'Both give you PATTERNS - what foods spike you?', 'NHS may fund CGM if you meet criteria - ask your GP', 'Track patterns in notes app or diabetes app'] },
        { title: 'TARGET RANGES', items: ['Fasting (morning): 5-7 mmol/L', 'Before meals: 4-7 mmol/L', 'After meals (2hrs): 8-10 mmol/L', 'Bedtime: 6-8 mmol/L', 'Above 20 mmol/L = contact GP', 'Below 3.5 mmol/L = emergency'] }
      ],
      resources: [
        { name: 'NICE Diabetes Management', url: 'https://www.nice.org.uk/guidance/ng17' }
      ]
    },
    {
      id: 'frequencies',
      label: 'HEALING FREQUENCIES',
      color: 'purple',
      isFrequencySection: true,
      frequencies: [
        { hz: 432, name: 'BASELINE CALM', science: 'Activates parasympathetic nervous system. Lowers cortisol. Improves insulin sensitivity.', power: 85 },
        { hz: 528, name: 'CELLULAR REPAIR', science: 'DNA repair activation. Reduces inflammatory T-cells. Supports immune healing.', power: 92 }
      ]
    },
    {
      id: 'nutrition',
      label: 'NUTRITION GUIDE',
      color: 'green',
      content: [
        { title: 'CARB COUNTING BASICS', items: ['1 portion carbs = 10-15g', 'Read food labels for total carbs', 'Fiber slows carb absorption (subtract half)', 'Protein + fat slow glucose rise', 'Apps: MyFitnessPal, Carbs & Cals'] },
        { title: 'FOODS THAT SPIKE YOU', items: ['White bread, sugary drinks (avoid)', 'But everyone is different - YOUR data is key', 'Track what you eat + your glucose rise', 'Some foods spike you, not others', 'Find your personal triggers'] },
        { title: 'MEAL PREP SAVES LIFE', items: ['Know carbs BEFORE eating = better insulin dosing', 'Batch cook proteins on Sunday', 'Keep emergency snacks: nuts, cheese, dark chocolate', 'Eat regular meals = stable glucose'] }
      ],
      resources: [
        { name: 'Diabetes UK Nutrition', url: 'https://www.diabetes.org.uk/guide-to-diabetes/managing-your-diabetes/eating-well' }
      ]
    },
    {
      id: 'mental',
      label: 'MENTAL HEALTH',
      color: 'pink',
      content: [
        { title: 'TYPE 1 IS HARD', items: ['24/7 management = burnout is real', 'Having hard days is NORMAL', 'Guilt about glucose is NOT your fault', 'Tell someone if you\'re struggling', 'Therapy helps more than you think'] },
        { title: 'SUPPORT + RESOURCES', items: ['Samaritans: 116 123 (24/7 free)', 'JDRF Peer Support: jdrf.org.uk', 'Your GP can refer to counseling', 'Type 1 Online Reddit: r/Type1Diabetes', 'Support groups near you: Diabetes UK'] },
        { title: 'DAILY MENTAL CHECK-IN', items: ['Journal: How are you actually feeling today?', 'Emotions affect glucose (cortisol = high glucose)', 'Breathwork helps: 4-7-8 breathing (calms nervous system)', 'Move your body daily (even 10min walk)', 'Sleep = mental health foundation'] }
      ],
      resources: [
        { name: 'Samaritans 24/7', url: 'https://www.samaritans.org/' },
        { name: 'JDRF Support Groups', url: 'https://www.jdrf.org.uk/' }
      ]
    },
    {
      id: 'emergency',
      label: 'EMERGENCY PROTOCOL',
      color: 'red',
      content: [
        { title: 'SEVERE HYPOGLYCEMIA', items: ['Unconscious or seizures = CALL 999', 'Use glucagon kit if trained', 'Hospital: IV glucose stabilization', 'After: Rest + recovery plan with GP'] },
        { title: 'SEVERE HYPERGLYCEMIA (300+)', items: ['Check blood sugar', 'Drink water', 'Extra rapid-acting insulin', 'Light movement', 'Recheck in 2 hours'] },
        { title: 'DKA (Diabetic Ketoacidosis)', items: ['CALL 999 IMMEDIATELY', 'Symptoms: Nausea, vomiting, confusion, fruity breath', 'Hospital: IV fluids + insulin + electrolytes', 'This is life-threatening - do not wait'] },
        { title: 'LOST/DAMAGED INSULIN', items: ['CALL NHS 111 IMMEDIATELY', 'Emergency prescription SAME DAY', 'Pharmacy can help in crisis'] }
      ],
      resources: [
        { name: 'NHS 111 - Urgent Care', url: 'https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-services/nhs-111/' }
      ]
    }
  ];

  const colorMap = {
    amber: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', icon: 'text-amber-400' },
    cyan: { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: 'text-cyan-400' },
    purple: { border: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10', icon: 'text-purple-400' },
    blue: { border: 'border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10', icon: 'text-blue-400' },
    green: { border: 'border-green-500', text: 'text-green-400', bg: 'bg-green-500/10', icon: 'text-green-400' },
    pink: { border: 'border-pink-500', text: 'text-pink-400', bg: 'bg-pink-500/10', icon: 'text-pink-400' },
    red: { border: 'border-red-500', text: 'text-red-400', bg: 'bg-red-500/10', icon: 'text-red-400' }
  };

  const ActionCard = ({ card }) => {
    const c = colorMap[card.color];
    const IconComponent = card.icon;

    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`bg-black border-2 ${c.border} rounded-lg p-4 ${c.bg}`}
        style={{ boxShadow: `0 0 15px rgba(${card.color === 'amber' ? '251, 146, 60' : card.color === 'cyan' ? '6, 182, 212' : card.color === 'purple' ? '168, 85, 247' : '59, 130, 246'}, 0.3)` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <IconComponent className={`w-5 h-5 ${c.icon}`} />
          <h3 className={`text-sm font-black font-mono ${c.text}`}>{card.time}</h3>
        </div>
        <p className="text-gray-400 text-xs font-mono mb-3">{card.description}</p>
        <div className="space-y-1">
          {card.tasks.map((task, i) => (
            <div key={i} className="text-white text-xs font-mono flex items-start gap-2">
              <span className={c.text}>▪</span>
              <span>{task}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const FrequencyVisualizer = ({ frequency }) => {
    const barWidth = (frequency.power / 100) * 100;
    return (
      <div className="bg-black border border-purple-500/30 rounded p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-purple-400 text-xs font-black font-mono">{frequency.hz} HZ</p>
          <span className="text-purple-300 text-xs font-mono">{frequency.power}%</span>
        </div>
        <h4 className="text-white text-xs font-bold mb-2">{frequency.name}</h4>
        <p className="text-gray-400 text-xs font-mono mb-3 leading-relaxed">{frequency.science}</p>
        <div className="w-full bg-purple-950 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
          />
        </div>
      </div>
    );
  };

  const CollapsibleSection = ({ section }) => {
    const isExpanded = expandedSection === section.id;
    const c = colorMap[section.color];

    return (
      <motion.div className="mb-3 border-2 border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedSection(isExpanded ? null : section.id)}
          className="w-full flex items-center justify-between p-4 hover:bg-black/40 transition-all"
        >
          <h3 className={`text-sm font-black font-mono tracking-wider ${c.text}`}>{section.label}</h3>
          {isExpanded ? (
            <ChevronDown className={`w-5 h-5 ${c.text}`} />
          ) : (
            <ChevronRight className={`w-5 h-5 ${c.text}`} />
          )}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-700 bg-black/50 p-4 space-y-4"
          >
            {section.isFrequencySection ? (
              <div className="space-y-4">
                {section.frequencies.map((freq, i) => (
                  <FrequencyVisualizer key={i} frequency={freq} />
                ))}
                <div className="mt-6 border-t border-purple-500/30 pt-4">
                  <Type1FrequencyEngine />
                </div>
              </div>
            ) : (
              section.content.map((block, i) => (
                <div key={i} className={`bg-black border border-gray-700 rounded p-3`}>
                  <p className={`text-xs font-black font-mono mb-2 ${c.text}`}>{block.title}</p>
                  <ul className="space-y-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="text-white text-xs font-mono leading-relaxed">→ {item}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}

            {section.resources && section.resources.length > 0 && (
              <div className="border-t border-gray-700 pt-3 mt-3">
                <p className={`text-xs font-black font-mono mb-2 ${c.text}`}>RESOURCES</p>
                <div className="space-y-2">
                  {section.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs font-mono"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {resource.name}
                    </a>
                  ))}
                </div>
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
        <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-3xl font-black text-black">T1</span>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Type1 AI51</h1>
          <p className="text-cyan-300 text-xs font-mono">Your daily diabetes manager</p>
        </div>
      </div>

      {/* 2x2 ACTION GRID - MOBILE FIRST */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {actionCards.map((card, i) => (
          <ActionCard key={i} card={card} />
        ))}
      </div>

      {/* COLLAPSIBLE SECTIONS */}
      <div className="space-y-2 mt-6">
        {sections.map(section => (
          <CollapsibleSection key={section.id} section={section} />
        ))}
      </div>



      {/* PRIVACY NOTICE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border-2 border-gray-700 rounded-lg p-4 mt-8"
      >
        <p className="text-gray-400 text-xs font-mono">
          🔒 Privacy: This guide does NOT collect your health data. Everything stays on YOUR device. No tracking. No servers. Just you + your health.
        </p>
      </motion.div>

      {/* FOOTER */}
      <div className="text-center text-xs font-mono text-gray-600 space-y-1 mt-8">
        <p className="text-white font-bold">⚠️ Not medical advice. Always follow your GP.</p>
        <p className="text-cyan-300">Insulin is life. Data + love = freedom. ♾️❤️</p>
      </div>
    </div>
  );
}