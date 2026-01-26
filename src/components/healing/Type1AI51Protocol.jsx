import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Heart, Zap, Droplets, Brain, Calendar, TrendingUp, Shield } from 'lucide-react';
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
      items: [
        { time: 'MORNING', tasks: ['Take insulin', 'Check glucose', 'Eat protein breakfast', 'Play healing frequency'] },
        { time: 'MIDDAY', tasks: ['Log lunch + insulin', 'Check levels', '5min walk', 'AI51 mood check'] },
        { time: 'EVENING', tasks: ['Dinner prep', 'Evening insulin', 'Stress frequency (15min)', 'Log day'] },
        { time: 'NIGHT', tasks: ['Final check', 'Bedtime routine', 'Sleep frequency (8hz)', 'Rest'] }
      ]
    },
    insulin: {
      title: 'INSULIN MANAGEMENT',
      items: [
        { label: 'DOSING', tips: ['Time injections same time daily', 'Rotate injection sites', 'Log every dose', 'Note meals + carbs'] },
        { label: 'STORAGE', tips: ['Keep at correct temp', 'Check expiry dates', 'Have backup supply', 'Travel kit ready'] },
        { label: 'HYPOGLYCEMIA', tips: ['Recognize symptoms', 'Keep fast carbs nearby', '15-15 rule (15g carbs, recheck 15min)', 'Tell people around you'] },
        { label: 'SICK DAYS', tips: ['Never skip insulin', 'Check more often', 'Stay hydrated', 'Call doctor if unsure'] }
      ]
    },
    stress: {
      title: 'STRESS + HEALING',
      items: [
        { frequency: '432 Hz', benefit: 'Baseline calm + insulin response support' },
        { frequency: '528 Hz', benefit: 'Cellular healing + immune balance' },
        { frequency: '174 Hz', benefit: 'Pain relief + tissue healing' },
        { frequency: '639 Hz', benefit: 'Emotional balance + resilience' }
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