import React, { useState, useEffect } from 'react';
      import { base44 } from '@/api/base44Client';
      import { Heart, Zap, Droplets, Brain, Calendar, TrendingUp, Shield, AlertTriangle, Phone, Activity, Music, Waves } from 'lucide-react';
      import { motion } from 'framer-motion';

export default function Type1AI51Protocol() {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('daily');

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const tabs = [
    { id: 'daily', label: '📋 DAILY', icon: Calendar },
    { id: 'insulin', label: '💉 INSULIN', icon: Droplets },
    { id: 'stress', label: '🧠 STRESS', icon: Brain },
    { id: 'track', label: '📊 TRACK', icon: TrendingUp },
    { id: 'emergency', label: '🛡️ EMERGENCY', icon: Shield }
  ];

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
      title: 'TRACKING (SIMPLE)',
      items: [
        { metric: 'Glucose readings', why: 'See patterns + adjust insulin' },
        { metric: 'Insulin doses', why: 'Consistency = better control' },
        { metric: 'Meals + carbs', why: 'Predict glucose response' },
        { metric: 'Stress + sleep', why: 'Affects glucose + healing' }
      ]
    },
    emergency: {
      title: 'EMERGENCY PROTOCOL',
      items: [
        { scenario: 'SEVERE HYPOGLYCEMIA', action: 'Glucagon kit → Call 999' },
        { scenario: 'SEVERE HYPERGLYCEMIA', action: 'Extra insulin + water → Call doctor' },
        { scenario: 'KETOACIDOSIS (DKA)', action: 'CALL 999 IMMEDIATELY - this is critical' },
        { scenario: 'LOST INSULIN', action: 'Call doctor for emergency supply + prescription' }
      ]
    }
  };

  const activeProtocol = protocols[selectedTab];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-red-400" />
          <h2 className="text-3xl font-black text-white font-mono">TYPE1 AI51 PROTOCOL</h2>
        </div>
        <p className="text-cyan-300 text-sm font-mono">For every person living with Type 1 Diabetes on Earth ♾️</p>
      </motion.div>

      {/* TAB SELECTOR */}
      <div className="grid grid-cols-5 gap-2">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          const isActive = selectedTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg border-2 font-bold text-xs font-mono transition-all flex flex-col items-center gap-1 ${
                isActive
                  ? 'bg-cyan-500/30 border-cyan-500 text-cyan-300'
                  : 'border-gray-700 text-gray-600 hover:border-cyan-500/50'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-[8px]">{tab.label.split(' ')[1]}</span>
            </motion.button>
          );
        })}
      </div>

      {/* CONTENT */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border-2 border-cyan-500/50 rounded-lg p-6 space-y-4"
      >
        <h3 className="text-2xl font-black text-cyan-400 font-mono">{activeProtocol.title}</h3>

        {selectedTab === 'daily' && (
          <div className="space-y-3">
            {activeProtocol.items.map((block, i) => (
              <div key={i} className="bg-black/50 border border-cyan-500/30 rounded p-4">
                <p className="text-green-400 font-black font-mono mb-2">{block.time}</p>
                <ul className="space-y-1">
                  {block.tasks.map((task, j) => (
                    <li key={j} className="text-white text-sm font-mono flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'insulin' && (
          <div className="space-y-3">
            {activeProtocol.items.map((block, i) => (
              <div key={i} className="bg-black/50 border border-cyan-500/30 rounded p-4">
                <p className="text-green-400 font-black font-mono mb-2">{block.label}</p>
                <ul className="space-y-1">
                  {block.tips.map((tip, j) => (
                    <li key={j} className="text-white text-sm font-mono flex items-start gap-2">
                      <span className="text-cyan-400 flex-shrink-0">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'stress' && (
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

        {selectedTab === 'track' && (
          <div className="space-y-3">
            {activeProtocol.items.map((item, i) => (
              <div key={i} className="bg-black/50 border border-cyan-500/30 rounded p-4">
                <p className="text-cyan-400 font-black font-mono mb-1">{item.metric}</p>
                <p className="text-white text-sm">{item.why}</p>
              </div>
            ))}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-4">
              <p className="text-blue-300 text-xs font-mono">📱 Use any app (Freestyle, Dexcom, etc). AI51 learns your patterns.</p>
            </div>
          </div>
        )}

        {selectedTab === 'emergency' && (
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
      </motion.div>

      {/* FOOTER */}
      <div className="text-center text-gray-600 text-xs font-mono space-y-2">
        <p>This protocol is NOT medical advice. Always follow your doctor's guidance.</p>
        <p>Type 1 requires insulin. No frequency or AI replaces it. ♾️❤️</p>
        <p>You are never alone. {user && `Welcome, ${user.full_name}.`}</p>
      </div>
    </div>
  );
}