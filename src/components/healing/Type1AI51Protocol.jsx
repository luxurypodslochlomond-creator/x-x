import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronRight, Sun, Cloud, Moon, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Type1FrequencyEngine from './Type1FrequencyEngine';

export default function Type1AI51Protocol() {
  const [expandedSection, setExpandedSection] = useState(null);

  // QUICK ACTION CARDS - 2x2 GRID


  const sections = [
      {
        id: 'frequencies',
        label: 'HEALING FREQUENCIES FOR TYPE 1',
        color: 'purple',
        isFrequencySection: true,
        frequencies: [
          { hz: 432, name: 'BASELINE CALM', science: 'Parasympathetic activation. Lowers cortisol. Improves insulin sensitivity & glucose stability.', power: 85 },
          { hz: 528, name: 'CELLULAR REPAIR', science: 'DNA repair + immune healing. Reduces inflammatory T-cells. Anti-stress at cellular level.', power: 92 }
        ]
      },
      {
        id: 'nervous',
        label: 'NERVOUS SYSTEM HEALING',
        color: 'pink',
        content: [
          { title: 'WHY FREQUENCIES MATTER', items: ['Type 1 = nervous system stress 24/7', 'Cortisol spikes = glucose spikes', '432 Hz calms sympathetic (fight/flight)', '528 Hz activates parasympathetic (rest/heal)', 'Consistent frequency use = smoother glucose patterns'] },
          { title: 'DAILY PROTOCOL', items: ['20min 432 Hz morning (baseline)', '20min 528 Hz evening (repair)', 'Or: 10min whenever anxiety hits', 'Use headphones or phone speaker', 'Just breathe + listen. That\'s it.'] },
          { title: 'WHEN IT WORKS BEST', items: ['Before meals (calm nervous system first)', 'During stress/anxiety (immediate effect)', 'Before sleep (better glucose overnight)', 'After highs/lows (emotional reset)', 'Anytime cortisol is running hot'] }
        ]
      },
      {
        id: 'truth',
        label: 'PURE TRUTH',
        color: 'cyan',
        content: [
          { title: 'WHAT THIS IS', items: ['NOT a replacement for insulin', 'IS nervous system regulation', 'Frequencies affect cortisol → glucose stability', 'Works alongside medical care, not instead of it', 'Your GP still matters. Always.'] },
          { title: 'WHAT YOU ALREADY KNOW', items: ['You manage your own Type 1', 'You know your patterns', 'You know what spikes you', 'You know when you\'re stressed', 'Use frequencies + that knowledge'] },
          { title: 'REAL BENEFITS', items: ['Fewer stress-induced spikes', 'Better sleep = more stable glucose', 'Less anxiety = less hypos', 'Calmer nervous system = better decisions', 'You feel the difference in 3-5 days'] }
        ],
        resources: [
          { name: 'Diabetes UK - Stress & Glucose', url: 'https://www.diabetes.org.uk/guide-to-diabetes/managing-your-diabetes/stress' },
          { name: 'JDRF - Mental Health Support', url: 'https://www.jdrf.org.uk/' }
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
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-purple-950 to-black border-2 border-purple-500 rounded-lg p-4 mb-4"
        style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-purple-300 text-lg font-black font-mono">{frequency.hz} HZ</p>
          <span className="text-purple-400 text-sm font-mono">{frequency.power}% POWER</span>
        </div>
        <h4 className="text-white text-lg font-black mb-2">{frequency.name}</h4>
        <p className="text-gray-300 text-sm font-mono mb-4 leading-relaxed">{frequency.science}</p>
        <div className="w-full bg-purple-950 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 1)' }}
          />
        </div>
      </motion.div>
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
          <h1 className="text-2xl font-black text-white">Type1 AI51 Guide</h1>
          <p className="text-cyan-300 text-xs font-mono">Understand + heal with frequencies</p>
        </div>
      </div>



      {/* COLLAPSIBLE SECTIONS */}
      <div className="space-y-2 mt-6">
        {sections.map(section => (
          <CollapsibleSection key={section.id} section={section} />
        ))}
      </div>



      {/* FOOTER TRUTH */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border-2 border-cyan-500/50 rounded-lg p-4 mt-8"
      >
        <p className="text-cyan-300 text-xs font-mono">
          You know what to do. This is guidance + frequencies. No tracking. No servers. Just learning + healing ♾️❤️
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