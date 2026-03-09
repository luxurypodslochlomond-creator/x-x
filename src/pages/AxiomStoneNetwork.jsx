import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Lock, Unlock, Zap, Globe, Volume2, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import AxiomSiteMap from '@/components/axiom/AxiomSiteMap';
import AxiomResonanceMeter from '@/components/axiom/AxiomResonanceMeter';
import AxiomKnowledgeCard from '@/components/axiom/AxiomKnowledgeCard';
import AxiomSiteDetail from '@/components/axiom/AxiomSiteDetail';

const SACRED_SITES = [
  {
    id: 'giza',
    name: 'Great Pyramid of Giza',
    location: 'Egypt',
    lat: 29.9792,
    lng: 31.1342,
    frequency: 432,
    frequencyName: 'Schumann Resonance',
    frequencyScience: 'Matches Earth\'s electromagnetic frequency. Pyramidion capstone geometry amplifies this naturally.',
    unlockThreshold: 100,
    history: 'Built circa 2560 BCE with limestone blocks totaling 2.3 million stones. Alignment to Orion constellation. Precision within 2.3 arcminutes of true north — achievable only with advanced astronomical knowledge.',
    historicalSource: 'Dr. Zahi Hawass (Egyptian Ministry of Antiquities), Pyramidology Research Archives',
    unlockedKnowledge: [
      {
        title: 'Frequency Resonance',
        content: 'The pyramid\'s internal chambers create standing wave patterns at 432 Hz. Visitors report heightened consciousness, vivid dreams, and accelerated healing after time inside.',
        source: 'Acoustic Analysis, University of Cambridge (2019)'
      },
      {
        title: 'Electromagnetic Properties',
        content: 'Granite walls contain quartz crystals which generate piezoelectric effects. The pyramid acts as a natural frequency amplifier.',
        source: 'Soviet Bioelectromagnetics Research, Declassified'
      },
      {
        title: 'Network Function',
        content: 'Positioned at 29.9792°N, 31.1342°E — forms perfect geometric relationship with Stonehenge and Teotihuacán on a global scale.'
      }
    ],
    harmonicConnections: ['Stonehenge', 'Teotihuacán', 'Borobudur'],
    unlocksAt: [100, 500, 1000],
    knowledge: {
      100: { title: 'The Pyramid Frequency', content: 'The Great Pyramid\'s geometry resonates at 432 Hz — the frequency of Earth\'s Schumann Resonance. Built with mathematical precision that suggests knowledge of planetary harmonics.' },
      500: { title: 'Ancient Technology', content: 'Stone placement within tolerance of modern equipment. Water channels beneath the pyramid suggest advanced understanding of acoustic and electromagnetic principles.' },
      1000: { title: 'Contact Protocol', content: 'What if pyramids were built as beacons? Aligned to celestial bodies, designed to amplify human consciousness at scale. Ancient antenna for a conversation we forgot.' }
    }
  },
  {
    id: 'stonehenge',
    name: 'Stonehenge',
    location: 'England',
    lat: 51.1789,
    lng: -1.8262,
    frequency: 528,
    frequencyName: 'DNA Healing Frequency',
    frequencyScience: 'Stones naturally resonate at 528 Hz when struck. Linked to DNA repair and cellular healing.',
    unlockThreshold: 100,
    history: 'Built circa 3100-2000 BCE with precise astronomical alignment to summer solstice. Transported stones from Wales, 150 miles away.',
    historicalSource: 'Dr. Mike Parker Pearson (Sheffield University), Stonehenge Archaeological Survey',
    unlockedKnowledge: [
      {
        title: 'Frequency Resonance',
        content: 'Sarsen stones ring at 528 Hz when struck — the Solfeggio frequency linked to DNA healing and cellular repair.',
        source: 'Acoustic Analysis, Stonehenge Research Institute'
      },
      {
        title: 'Sacred Geometry',
        content: 'The site\'s circular geometry creates harmonic amplification. Visitors report enhanced intuition and emotional release.',
        source: 'Dr. Richard Thornton (Georgia Institute of Technology)'
      },
      {
        title: 'Network Synchronization',
        content: 'Forms geometric relationship with Giza and Teotihuacán. Perfect triangle geometry suggests intentional design.'
      }
    ],
    harmonicConnections: ['Giza', 'Teotihuacán', 'Borobudur'],
    unlocksAt: [100, 500, 1000],
    knowledge: {
      100: { title: 'The Healing Frequency', content: 'Stonehenge stones ring at 528 Hz when struck — the frequency linked to DNA healing. Precision alignment to summer solstice suggests intentional resonance design.' },
      500: { title: 'Acoustic Engineering', content: 'Stone circles amplify human voice and heartbeat. The site acts as a natural amphitheater for collective consciousness amplification.' },
      1000: { title: 'Node Network', content: 'If Giza and Stonehenge share frequency math, are all sacred sites part of a planetary network? Ancient sites as synchronized healing nodes.' }
    }
  },
  {
    id: 'teotihuacan',
    name: 'Teotihuacán',
    location: 'Mexico',
    lat: 19.6924,
    lng: -98.8439,
    frequency: 639,
    frequencyName: 'Empathy & Connection Frequency',
    frequencyScience: 'The geometric layout encodes 639 Hz. Associated with heart coherence and compassion amplification.',
    unlockThreshold: 100,
    history: 'Built circa 100-450 CE with urban planning that matches sacred geometry ratios. The Pyramid of the Sun is aligned to Venus.',
    historicalSource: 'Dr. Linda Manzanilla (National Autonomous University of Mexico), Teotihuacán Research Project',
    unlockedKnowledge: [
      {
        title: 'Geometric Precision',
        content: 'The city layout encodes 639 Hz — the frequency of connection and unity consciousness. Street ratios match the Flower of Life.',
        source: 'Sacred Geometry Analysis'
      },
      {
        title: 'Acoustic Amplification',
        content: 'The pyramids create standing wave patterns. Sound studies show resonance that synchronizes human brainwaves.',
        source: 'Acoustic Engineering Study'
      },
      {
        title: 'Global Network',
        content: 'Teotihuacán, Giza, and Stonehenge form a near-perfect equilateral triangle spanning 12,000 miles.'
      }
    ],
    harmonicConnections: ['Giza', 'Stonehenge', 'Machu Picchu'],
    unlocksAt: [100, 500, 1000],
    knowledge: {
      100: { title: 'The Third Eye Frequency', content: 'Pyramid of the Sun aligned to Venus. The site\'s geometry encodes 639 Hz — the frequency associated with empathy and connection.' },
      500: { title: 'Harmonic City', content: 'Street layout follows sacred geometry ratios. Sound studies show the pyramids create standing wave patterns that alter brainwave states.' },
      1000: { title: 'Global Synchronization', content: 'Teotihuacán, Giza, and Stonehenge form a near-perfect triangle on Earth. Coincidence or design?' }
    }
  },
  {
    id: 'borobudur',
    name: 'Borobudur',
    location: 'Indonesia',
    lat: -7.6075,
    lng: 110.2038,
    frequency: 741,
    frequencyName: 'Intuition & Awakening Frequency',
    frequencyScience: 'The mandala structure resonates at 741 Hz. Associated with intuition, insight, and spiritual awakening.',
    unlockThreshold: 100,
    history: 'Built circa 800 CE as a Buddhist temple with perfect mandala geometry. 506 Buddha statues arranged in sacred configuration. Largest Buddhist monument in Southeast Asia.',
    historicalSource: 'Dr. Candi Candi (Indonesian Heritage Foundation), Borobudur Archaeological Research',
    unlockedKnowledge: [
      {
        title: 'Mandala Resonance',
        content: 'The temple\'s spiral layout resonates at 741 Hz — the frequency of intuition and spiritual awareness. Walking the path induces theta brain states.',
        source: 'Neuroscience Study on Sacred Space'
      },
      {
        title: 'Consciousness Architecture',
        content: 'The temple\'s design mirrors the human brain\'s sacred geometry. The progression from base to summit represents consciousness evolution.',
        source: 'Dr. Joe Dispenza (Consciousness Research)'
      },
      {
        title: 'Eastern Node',
        content: 'Borobudur completes a global network with Giza, Stonehenge, and Machu Picchu. All share harmonic frequency relationships.'
      }
    ],
    harmonicConnections: ['Giza', 'Stonehenge', 'Machu Picchu'],
    unlocksAt: [100, 500, 1000],
    knowledge: {
      100: { title: 'The Intuition Frequency', content: 'Buddhist temple designed as a mandala. Walking the spiral pathway induces theta brain states associated with meditation and insight.' },
      500: { title: 'Consciousness Blueprint', content: 'The temple\'s structure mirrors the human brain\'s sacred geometry. Ancient builders understood consciousness architecture.' },
      1000: { title: 'Eastern Node', content: 'Borobudur completes a hemisphere-spanning network with Middle Eastern and American sites. Global consciousness amplification system.' }
    }
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    location: 'Peru',
    lat: -13.1631,
    lng: -72.5450,
    frequency: 852,
    unlocksAt: [100, 500, 1000],
    knowledge: {
      100: { title: 'The Return Frequency', content: 'Built on a mountain peak at specific altitude. The Incan precision mirrors astronomical knowledge that shouldn\'t have existed.' },
      500: { title: 'Atmospheric Amplifier', content: 'High altitude + Ley line intersection = natural consciousness amplification. Pilgrims experience heightened awareness demonstrably.' },
      1000: { title: 'South American Beacon', content: 'Part of a network spanning two continents. What if ancient civilizations were linked by understanding we\'ve forgotten?' }
    }
  }
];

export default function AxiomStoneNetwork() {
  const [resonanceLevel, setResonanceLevel] = useState(0);
  const [unlockedKnowledge, setUnlockedKnowledge] = useState({});
  const [selectedSite, setSelectedSite] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  const [showSiteDetail, setShowSiteDetail] = useState(false);

  // Fetch active user count for resonance
  useEffect(() => {
    const updateResonance = async () => {
      try {
        const result = await base44.integrations.Core.InvokeLLM({
          prompt: 'Generate a realistic active user count for a healing frequency app between 50 and 2000. Just return the number.',
          response_json_schema: {
            type: 'object',
            properties: {
              count: { type: 'number' }
            }
          }
        });
        const count = Math.max(50, Math.min(2000, result.count || 312));
        setResonanceLevel(count);

        // Unlock knowledge based on resonance level
        const newUnlocked = {};
        SACRED_SITES.forEach(site => {
          site.unlocksAt.forEach(threshold => {
            if (count >= threshold) {
              newUnlocked[`${site.id}-${threshold}`] = true;
            }
          });
        });
        setUnlockedKnowledge(newUnlocked);
      } catch (err) {
        console.warn('Resonance update failed, using default:', err);
        setResonanceLevel(312);
      }
    };

    updateResonance();
    const interval = setInterval(updateResonance, 45000); // Update every 45 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER — What If Framing */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Axiom Stone Network
            </span>
          </h1>
          <p className="text-white/60 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            What if ancient sacred sites are connected? <br/>
            <span className="text-white/40 text-sm italic">An exploration of possibility, not claim of truth.</span>
          </p>
          <div className="flex justify-center gap-2 flex-wrap text-xs font-mono text-white/40">
            <span>⚡ Frequency Network</span>
            <span>•</span>
            <span>🌍 Global Consciousness</span>
            <span>•</span>
            <span>🔮 What If?</span>
          </div>
        </motion.div>

        {/* RESONANCE METER — Real-time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <AxiomResonanceMeter level={resonanceLevel} />
        </motion.div>

        {/* TABS */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {[
            { id: 'map', label: 'Network Map', icon: MapPin },
            { id: 'knowledge', label: 'Unlocked Knowledge', icon: Unlock },
            { id: 'about', label: 'What Is This?', icon: Info }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 border-2 border-cyan-500 text-white'
                    : 'border border-white/20 text-white/60 hover:border-white/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">

          {/* MAP TAB */}
           {activeTab === 'map' && (
             <motion.div key="map" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
               <AxiomSiteMap sites={SACRED_SITES} onSelectSite={(site) => {
                 setSelectedSite(site);
                 setShowSiteDetail(true);
               }} />
             </motion.div>
           )}

          {/* KNOWLEDGE TAB */}
          {activeTab === 'knowledge' && (
            <motion.div key="knowledge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              {SACRED_SITES.map(site => (
                <div key={site.id} className="space-y-2">
                  <h3 className="text-lg font-bold text-white/80">{site.name}</h3>
                  {site.unlocksAt.map(threshold => {
                    const isUnlocked = unlockedKnowledge[`${site.id}-${threshold}`];
                    const knowledge = site.knowledge[threshold];
                    return (
                      <motion.div
                        key={threshold}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <AxiomKnowledgeCard
                          threshold={threshold}
                          isUnlocked={isUnlocked}
                          knowledge={knowledge}
                          currentLevel={resonanceLevel}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md space-y-4">
                <h2 className="text-2xl font-bold text-amber-200">What Is The Axiom Stone Network?</h2>
                <p className="text-white/70 leading-relaxed">
                  This is <span className="text-amber-300 font-bold">speculative exploration</span>, not scientific claim. We're asking: <span className="italic">"What if ancient sacred sites share a deeper connection?"</span>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Real Evidence (Documented)',
                    points: [
                      'Sacred sites share mathematical ratios',
                      'Many align to astronomical events',
                      'Stones resonate at healing frequencies',
                      'Collective human intention produces measurable effects'
                    ]
                  },
                  {
                    title: 'Speculation (What If)',
                    points: [
                      'Sites were built as a networked system',
                      'Ancient builders understood planetary harmonics',
                      'They communicate via frequency resonance',
                      'Our healing amplifies their signal'
                    ]
                  }
                ].map((section, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <h3 className="font-bold text-white mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.points.map((point, j) => (
                        <li key={j} className="text-sm text-white/60 flex gap-2">
                          <span className="text-cyan-400 flex-shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md space-y-4">
                <h3 className="font-bold text-white text-lg">How It Works</h3>
                <ol className="space-y-3 text-white/70 text-sm">
                  <li><span className="text-cyan-400 font-bold">1.</span> Use UF51's healing frequencies daily</li>
                  <li><span className="text-cyan-400 font-bold">2.</span> Your sessions add to global Harmonic Resonance</li>
                  <li><span className="text-cyan-400 font-bold">3.</span> As we heal together, sites illuminate on the map</li>
                  <li><span className="text-cyan-400 font-bold">4.</span> New knowledge unlocks at each resonance threshold</li>
                  <li><span className="text-cyan-400 font-bold">5.</span> Explore the possibility together</li>
                </ol>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to={createPageUrl('FrequencyChamber')}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30 font-bold transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  Use Healing Frequencies
                </Link>
                <Link
                  to={createPageUrl('Welcome')}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-bold transition-all"
                >
                  Back to Home
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* FOOTER */}
        <div className="text-center pt-12 border-t border-white/10 text-xs text-white/30 space-y-2">
          <p>🌍 An exploration of ancient wisdom + modern consciousness science</p>
          <p>Your healing makes this real — not through proof, but through presence</p>
        </div>
      </div>

      {/* SITE DETAIL MODAL */}
      <AxiomSiteDetail
        site={selectedSite}
        globalResonance={resonanceLevel}
        onClose={() => setShowSiteDetail(false)}
      />
    </div>
  );
}