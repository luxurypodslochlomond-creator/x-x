import React, { useState, useEffect } from 'react';
            import { base44 } from '@/api/base44Client';
            import { Heart, Zap, Droplets, Brain, Calendar, TrendingUp, Shield, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
            import { motion } from 'framer-motion';
            import Type1FrequencyEngine from './Type1FrequencyEngine';

export default function Type1AI51Protocol() {
  const [user, setUser] = useState(null);
  const [expandedSection, setExpandedSection] = useState('daily');

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const sections = [
    { id: 'daily', label: 'DAILY', icon: Calendar, color: 'green' },
    { id: 'insulin', label: 'INSULIN', icon: Droplets, color: 'cyan' },
    { id: 'stress', label: 'STRESS', icon: Brain, color: 'purple' },
    { id: 'track', label: 'TRACKING', icon: TrendingUp, color: 'amber' },
    { id: 'emergency', label: 'EMERGENCY', icon: Shield, color: 'red' }
  ];

  const colorMap = {
    green: { border: 'border-green-500', bg: 'bg-green-500/20', text: 'text-green-300', icon: 'bg-green-500' },
    cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500/20', text: 'text-cyan-300', icon: 'bg-cyan-500' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-300', icon: 'bg-purple-500' },
    amber: { border: 'border-amber-500', bg: 'bg-amber-500/20', text: 'text-amber-300', icon: 'bg-amber-500' },
    red: { border: 'border-red-500', bg: 'bg-red-500/20', text: 'text-red-300', icon: 'bg-red-500' }
  };

  const protocols = {
      daily: {
        title: 'DAILY PROTOCOL',
        subtitle: 'The foundation. Non-negotiable. This is your lifeline.',
        items: [
          { time: 'MORNING (30min before food)', tasks: ['✓ Take long-acting insulin (or check pump)', '✓ Check glucose (CGM or meter)', '✓ Eat protein-rich breakfast (slows glucose rise)', '✓ 432 Hz baseline frequency (20min)', '✓ Journal: How are you feeling?'] },
          { time: 'MIDDAY (before lunch)', tasks: ['✓ Check glucose level', '✓ Calculate carbs + insulin ratio', '✓ Take rapid-acting insulin with food', '✓ Walk 10min after eating (improves insulin sensitivity)', '✓ Check in emotionally - stress? Joy?'] },
          { time: 'EVENING (4-6pm)', tasks: ['✓ Check glucose', '✓ 528 Hz healing frequency (15min) - immune + cellular repair', '✓ Light movement or stretching', '✓ Start dinner prep (avoid rushing)'] },
          { time: 'NIGHT (before bed)', tasks: ['✓ Final glucose check (prevent nighttime hypoglycemia)', '✓ Nighttime insulin if needed', '✓ 174 Hz pain relief frequency if any discomfort', '✓ 8 Hz delta wave sleep frequency (30min)', '✓ Sleep log: How did you feel today?'] }
        ]
      },
    insulin: {
      title: 'INSULIN MANAGEMENT',
      subtitle: 'Insulin is LIFE. Treat it with sacred respect.',
      items: [
        { 
          label: '💉 DOSING', 
          tips: [
            'Same time daily = rhythm + predictability',
            'Rotate injection sites (thigh, belly, arm) - prevents lipohypertrophy (fat lumps that ruin absorption)',
            'Log EVERY dose + amount in phone + paper backup',
            'Log meals + carbs TOGETHER with insulin (pattern recognition)',
            'Talk to your doctor about your insulin-to-carb ratio (ICR)',
            'Keep spare insulin in COOL place, not fridge (damaged at extremes)'
          ] 
        },
        { 
          label: '🧊 STORAGE', 
          tips: [
            'Current vial: Room temp (below 30°C)',
            'Backup vials: Fridge (2-8°C exactly)',
            'NEVER freeze. NEVER heat.',
            'Check expiry - expired insulin = high blood sugar + confusion',
            'Have 2-week backup supply hidden at home + work + bag',
            'Travel kit: Insulated pouch with ice packs'
          ] 
        },
        { 
          label: '⚡ HYPOGLYCEMIA (LOW BLOOD SUGAR - THE EMERGENCY)',
          tips: [
            'SYMPTOMS: Shaking, sweating, fast heart, confusion, anxiety, hunger',
            'FAST: Glucose tablets (15g) or juice (small glass) - ALWAYS carry',
            '15-15 RULE: Take 15g carbs. Wait 15min. Check again. If still low, repeat.',
            'DON\'T give up. DON\'T go to sleep. DON\'T drive.',
            'Tell friends/family what hypo looks like. Give them fast carbs.',
            'After recovery: Eat slow carbs + protein (prevents next low in 2 hours)',
            'Log it: WHEN + WHY (too much insulin? Not enough food? Exercise?)'
          ] 
        },
        { 
          label: '🤒 SICK DAYS (Cold, flu, stomach bug)',
          tips: [
            'GOLDEN RULE: NEVER SKIP INSULIN - sickness increases glucose',
            'Check glucose EVERY 2-3 HOURS (not every 8)',
            'Stay hydrated (water, sugar-free fluids)',
            'Eat soft carbs if stomach OK (toast, rice, broth)',
            'Insulin might INCREASE (counterintuitive but real)',
            'Call your doctor SAME DAY - don\'t guess',
            'If vomiting: Call doctor IMMEDIATELY (risk of DKA)'
          ] 
        }
      ]
    },
    stress: {
      title: 'STRESS + HEALING FREQUENCIES',
      subtitle: 'Stress = high cortisol = insulin resistance. These frequencies calm your nervous system.',
      items: [
        { 
          frequency: '432 Hz', 
          benefit: 'BASELINE CALM - Heart coherence',
          science: 'Activates parasympathetic nervous system (rest-digest). Cortisol drops. Insulin sensitivity improves.',
          use: 'Morning (20min) + any time stressed'
        },
        { 
          frequency: '528 Hz', 
          benefit: 'CELLULAR REPAIR - Immune rebalancing',
          science: 'DNA repair frequency. Reduces inflammatory T-cell activity. Immune system calms.',
          use: 'Evening (30min) - let your immune system rest'
        },
        { 
          frequency: '174 Hz', 
          benefit: 'PAIN + TISSUE - Neuropathy relief',
          science: 'Reduces inflammation. Helps with needle sites, neuropathy, any T1D pain.',
          use: 'When you have aches (15min sessions)'
        },
        { 
          frequency: '639 Hz', 
          benefit: 'EMOTIONAL HEALING - Resilience',
          science: 'Balances nervous system after trauma (yes, diagnosis is trauma). Reduces anxiety.',
          use: 'Before bed + after difficult glucose days'
        },
        {
          frequency: '8 Hz (Delta)',
          benefit: 'DEEP SLEEP - Glucose regulation',
          science: 'Poor sleep = poor glucose control. Delta waves = deepest rest = immune recovery.',
          use: '30min before sleep, during sleep if possible'
        }
      ]
    },
    track: {
      title: 'TRACKING (SIMPLE + POWERFUL)',
      subtitle: 'Data = power. But simple data. Not obsession.',
      items: [
        { 
          metric: 'Glucose readings (CGM or meter)', 
          why: 'See YOUR patterns. What foods spike you? What calms you? Only YOU know.',
          how: 'Log time + reading. Weekly review: Are patterns getting better?'
        },
        { 
          metric: 'Insulin doses + types',
          why: 'Consistency = prediction. You\'ll see what dose works best.',
          how: 'Write down (phone or paper): Type + amount + time. Compare to glucose.'
        },
        { 
          metric: 'Meals + carbs (be real)',
          why: 'Carbs + insulin = glucose. Understanding this = freedom.',
          how: 'Use app or rough guess. Don\'t obsess. But log it.'
        },
        { 
          metric: 'EMOTIONAL DATA (the secret weapon)',
          why: 'Stress = cortisol = high glucose. Happy = low cortisol = better control.',
          how: 'Daily: "How did I FEEL today?" Angry? Happy? Lonely? Compare to glucose trends.'
        },
        { 
          metric: 'Sleep hours + quality',
          why: 'Bad sleep = bad glucose control (proven). Sleep is medication.',
          how: 'Track: Did you sleep 7-9 hours? How did you feel?'
        },
        {
          metric: 'Exercise (any movement)',
          why: 'Movement = insulin sensitivity WITHOUT injections.',
          how: '10-30min walk after meals drops glucose naturally. Log it.'
        }
      ]
    },
    emergency: {
      title: '🚨 EMERGENCY PROTOCOL - LIFESAVING',
      subtitle: 'Read this when you\'re calm. Memorize it. Share with people around you.',
      items: [
        { 
          scenario: 'SEVERE HYPOGLYCEMIA (Can\'t think. Shaking. Scared.)',
          action: 'GLUCAGON KIT (if available) → Call 999',
          symptoms: 'Confusion, can\'t focus, shaking badly, sweating, loss of consciousness',
          steps: [
            '1. If you have glucagon: Use it (inject or nasal spray) - ask someone to help',
            '2. CALL 999 - tell them "severe hypoglycemia"',
            '3. Don\'t be alone after - someone needs to stay with you',
            '4. Hospital will stabilize you with glucose IV',
            '5. TELL people around you where your glucagon is'
          ]
        },
        { 
          scenario: 'SEVERE HYPERGLYCEMIA (Blood sugar 300+)',
          action: 'Extra insulin + water + call doctor SAME DAY',
          symptoms: 'Extreme thirst, peeing lots, tired, blurry vision, maybe nausea',
          steps: [
            '1. Check blood sugar (if it\'s 300+, take action)',
            '2. Drink water (dehydration makes it worse)',
            '3. Take extra rapid-acting insulin (10-15% more than normal)',
            '4. Light movement (short walk = helps insulin work)',
            '5. Recheck in 2 hours. Still high? Call doctor.'
          ]
        },
        { 
          scenario: '⚠️ DIABETIC KETOACIDOSIS (DKA) - LIFE-THREATENING',
          action: 'CALL 999 IMMEDIATELY',
          symptoms: 'Nausea/vomiting + fruity breath + confusion + severe tiredness + stomach pain',
          science: 'Your body is breaking down fat too fast = acidic blood = organ damage risk',
          steps: [
            '1. CALL 999 NOW - don\'t wait',
            '2. Tell them "suspected DKA"',
            '3. Hospital: IV fluids + insulin + electrolytes (they stabilize you)',
            '4. DKA = usually from missing insulin doses or extreme stress',
            '5. After recovery: Talk to doctor about what happened'
          ]
        },
        { 
          scenario: 'LOST OR DAMAGED INSULIN',
          action: 'Call NHS 111 or your doctor IMMEDIATELY',
          steps: [
            '1. Don\'t panic - this is solvable today',
            '2. Call NHS 111 (dial 111 UK)',
            '3. Tell them: "I\'ve lost my insulin supply"',
            '4. They can authorize emergency prescription SAME DAY',
            '5. Pharmacy: Get replacement insulin + syringes',
            '6. Don\'t skip doses - that\'s when DKA happens'
          ]
        },
        {
          scenario: 'YOU\'RE NOT COPING (Mental health crisis)',
          action: 'Call Samaritans: 116 123 (free, 24/7)',
          why: 'T1D is hard. Depression is real. Asking for help = strength.',
          steps: [
            '1. Call Samaritans (anyone, anytime - confidential)',
            '2. Tell your GP: "I\'m struggling with T1D management"',
            '3. Ask about therapy/counseling (NHS covers it)',
            '4. Join T1D support groups (you\'re not alone)',
            '5. Tell someone you trust TODAY'
          ]
        }
      ]
    }
  };

  const activeProtocol = protocols[expandedSection];

  return (
    <div className="space-y-4">
      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm font-mono">← BACK</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs font-mono font-bold px-3 py-1 border border-green-500 rounded">🟢 ONLINE</span>
        </div>
      </div>

      {/* AVATAR + TITLE */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-cyan-500 rounded-lg flex items-center justify-center">
          <span className="text-4xl font-black text-black">T1</span>
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">Type1</h1>
          <p className="text-gray-400 font-mono text-sm">Protocol</p>
        </div>
      </div>

      {/* 2x2 GRID OF ACTION CARDS */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {sections.map((section, i) => {
          const c = colorMap[section.color];
          const IconComponent = section.icon;
          const isActive = expandedSection === section.id;
          const glowColors = {
            green: 'rgba(34, 197, 94, 0.5)',
            cyan: 'rgba(6, 182, 212, 0.5)',
            purple: 'rgba(168, 85, 247, 0.5)',
            amber: 'rgba(245, 158, 11, 0.5)',
            red: 'rgba(239, 68, 68, 0.5)'
          };
          return (
            <motion.button
              key={section.id}
              onClick={() => setExpandedSection(isActive ? null : section.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`border-2 ${c.border} rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all bg-black/80 hover:bg-black`}
              style={isActive ? { boxShadow: `0 0 25px ${glowColors[section.color]}` } : {}}
            >
              <div className={`${c.icon} p-2.5 rounded`}>
                <IconComponent className="w-5 h-5 text-black" />
              </div>
              <span className={`font-black font-mono text-xs ${c.text} tracking-wider`}>{section.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* EXPANDABLE SECTIONS */}
      {expandedSection && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          key={expandedSection}
          className="bg-black border-2 border-cyan-500 rounded-lg overflow-hidden space-y-0"
          style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
        >
          <div className="p-4 border-b border-cyan-500/30 bg-black">
            <h3 className="text-lg font-black text-cyan-400 font-mono tracking-wider">{activeProtocol.title}</h3>
            <p className="text-xs text-cyan-300/60 font-mono mt-1">{activeProtocol.subtitle}</p>
          </div>

          <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
            {expandedSection === 'daily' && (
              <div className="space-y-3">
            {activeProtocol.items.map((block, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 5 }}
                className="bg-black border border-cyan-500/40 rounded p-4 hover:border-cyan-500/80 transition-all"
              >
                <p className="text-cyan-400 font-black font-mono mb-2">{block.time}</p>
                <ul className="space-y-1">
                  {block.tasks.map((task, j) => (
                    <li key={j} className="text-white text-sm font-mono flex items-start gap-2">
                      <span className="text-cyan-400 flex-shrink-0">✓</span> {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
              </div>
            )}

            {expandedSection === 'insulin' && (
              <div className="space-y-3">
            {activeProtocol.items.map((block, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 5 }}
                className="bg-black border border-cyan-500/40 rounded p-4 hover:border-cyan-500/80 transition-all"
              >
                <p className="text-cyan-400 font-black font-mono mb-2">{block.label}</p>
                <ul className="space-y-1">
                  {block.tips.map((tip, j) => (
                    <li key={j} className="text-white text-sm font-mono flex items-start gap-2">
                      <span className="text-cyan-400 flex-shrink-0">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
              </div>
            )}

            {expandedSection === 'stress' && (
              <div className="space-y-3">
            {activeProtocol.items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded p-4"
              >
                <p className="text-pink-400 font-black font-mono mb-1">{item.frequency}</p>
                <p className="text-white text-sm">{item.benefit}</p>
              </motion.div>
            ))}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
              <p className="text-amber-300 text-xs font-mono">💡 Stress affects blood glucose. Use frequencies daily for immune + nervous system support.</p>
            </div>
              </div>
            )}

            {expandedSection === 'track' && (
              <div className="space-y-3">
            {activeProtocol.items.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 5 }}
                className="bg-black border border-cyan-500/40 rounded p-4 hover:border-cyan-500/80 transition-all"
              >
                <p className="text-cyan-400 font-black font-mono mb-1">{item.metric}</p>
                <p className="text-white text-sm">{item.why}</p>
              </motion.div>
            ))}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 mt-4">
              <p className="text-cyan-300 text-xs font-mono">📱 Use any app (Freestyle, Dexcom). AI51 learns YOUR patterns.</p>
            </div>
              </div>
            )}

            {expandedSection === 'emergency' && (
              <div className="space-y-3">
            {activeProtocol.items.map((item, i) => (
              <div key={i} className={`rounded p-4 border-2 ${
                i === 2 ? 'bg-red-500/20 border-red-500' : 'bg-amber-500/10 border-amber-500/30'
              }`}>
                <p className={`font-black font-mono mb-1 ${i === 2 ? 'text-red-300' : 'text-amber-400'}`}>
                  {item.scenario}
                </p>
                <p className={`text-sm ${i === 2 ? 'text-red-200' : 'text-white'}`}>{item.action}</p>
              </div>
            ))}
            <div className="bg-red-500/20 border-2 border-red-500 rounded p-3 mt-4">
              <p className="text-red-300 text-xs font-mono font-bold">🚨 DKA IS LIFE-THREATENING. If confused, nauseous, or hard to breathe = CALL 999 NOW</p>
            </div>
              </div>
            )}
            </div>
            </motion.div>
            )}

      {/* PSYCHOLOGICAL + EMOTIONAL SUPPORT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Heart className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-black text-cyan-400 font-mono">MENTAL HEALTH FIRST</h3>
        </div>
        <div className="space-y-3 text-sm font-mono">
          <p className="text-white">✓ T1D is not just physical. It's psychological.</p>
          <p className="text-gray-300">✓ You will have days where you want to give up.</p>
          <p className="text-gray-300">✓ You will have days where glucose is "perfect" and you still feel broken.</p>
          <p className="text-gray-300">✓ That's normal. That's the disease, not you.</p>
          <p className="text-cyan-300 font-bold">✓ Talk to someone. Therapy + diabetes support groups = life-changing.</p>
          <p className="text-pink-300">✓ You deserve to feel OK about this. Not "fine." OK.</p>
        </div>
      </motion.div>

      {/* RESOURCES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Heart className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-black text-cyan-400 font-mono">RESOURCES</h3>
        </div>
        <div className="space-y-3 text-sm font-mono">
          <p className="text-white">🏥 JDRF (Juvenile Diabetes Research Foundation) - jdrf.org.uk</p>
          <p className="text-white">🏥 Diabetes UK - diabetes.org.uk (free support line + local groups)</p>
          <p className="text-white">💬 Type 1 Online Community - facebook groups + Reddit (r/Type1Diabetes)</p>
          <p className="text-white">🧠 Samaritans - 116 123 (mental health crisis, 24/7)</p>
          <p className="text-white">📱 Your GP - Ask for CGM funding + mental health referral</p>
          <p className="text-white">💪 This: AI51 frequencies + community + love</p>
        </div>
      </motion.div>

      {/* FREQUENCY ENGINE - OFFLINE AUDIO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Type1FrequencyEngine />
      </motion.div>

      {/* FOOTER */}
      <div className="text-center text-gray-600 text-xs font-mono space-y-2 mt-6">
        <p className="text-white font-bold">This protocol is NOT medical advice. Always follow your doctor's guidance.</p>
        <p className="text-cyan-300">Type 1 requires insulin. No frequency or AI replaces it. Frequencies + insulin + love = life.</p>
        <p className="text-pink-300 font-bold">You are never alone. {user && `Welcome, ${user.full_name}.`} ♾️❤️</p>
        <p className="text-gray-600 text-[10px]">Built with love for every person living with T1D. Freedom comes through community. 100% offline. 100% free. ♾️</p>
      </div>
    </div>
  );
}