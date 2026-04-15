import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Radio, Waves, BookOpen, Share2, Heart, Volume2, Cpu, Lightbulb, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ST51Page() {
  const [chamberLength, setChamberLength] = useState(34);
  const [chamberDiameter, setChamberDiameter] = useState(10);
  const [selectedFrequency, setSelectedFrequency] = useState(40000);
  const [standingWaveMode, setStandingWaveMode] = useState('1/2');
  const [activeTab, setActiveTab] = useState('calculator');

  // Calculate resonant frequencies based on chamber dimensions
  const speedOfSound = 343; // m/s at 20°C
  const chamberLengthM = chamberLength / 100; // convert cm to m
  
  const calculateFrequencies = () => {
    const fundamentals = [];
    for (let harmonic = 1; harmonic <= 6; harmonic++) {
      const freq = (speedOfSound * harmonic) / (2 * chamberLengthM);
      fundamentals.push({ harmonic, freq: Math.round(freq) });
    }
    return fundamentals;
  };

  const resonantFreqs = calculateFrequencies();

  // Calculate acoustic pressure node positions
  const nodePositions = {
    '1/2': [0.5],
    '1/4': [0.25, 0.75],
    '1/3': [0.33, 0.67],
  };

  const getModeDescription = (mode) => {
    const descriptions = {
      '1/2': 'Single node at chamber center — optimal for small objects, easiest to achieve',
      '1/4': 'Two nodes at 1/4 and 3/4 — for larger objects, more complex tuning',
      '1/3': 'Two nodes distributed — advanced configuration for asymmetric loads',
    };
    return descriptions[mode] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-6">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
            <Waves className="w-7 h-7 text-cyan-400" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ST51</h1>
          <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center">
            <Zap className="w-7 h-7 text-blue-400" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">Acoustic Levitation</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Open-source physics research platform. Build acoustic reactors. Share discoveries. No gatekeeping.
        </p>
        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          <div className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">Free & Open Source</div>
          <div className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">Physics-Based</div>
          <div className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">Community Driven</div>
        </div>
      </motion.div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-cyan-500/30 p-1 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Calculator
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="flex items-center gap-2">
              <Waves className="w-4 h-4" /> Visualizer
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Build Guide
            </TabsTrigger>
            <TabsTrigger value="science" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Physics
            </TabsTrigger>
          </TabsList>

          {/* CALCULATOR TAB */}
          <TabsContent value="calculator" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Input Controls */}
              <Card className="bg-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" /> Chamber Specs
                  </CardTitle>
                  <CardDescription>Define your reactor geometry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-cyan-300 mb-2 block">
                      Chamber Length: {chamberLength}cm
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={chamberLength}
                      onChange={(e) => setChamberLength(Number(e.target.value))}
                      className="w-full h-2 bg-cyan-900/50 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-gray-400 mt-2">Longer chambers = lower fundamental frequencies</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-cyan-300 mb-2 block">
                      Chamber Diameter: {chamberDiameter}cm
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={chamberDiameter}
                      onChange={(e) => setChamberDiameter(Number(e.target.value))}
                      className="w-full h-2 bg-cyan-900/50 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-gray-400 mt-2">Affects transducer positioning and volume</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-cyan-300 mb-2 block">Standing Wave Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['1/2', '1/4', '1/3'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setStandingWaveMode(mode)}
                          className={`p-3 rounded-lg font-bold transition-all ${
                            standingWaveMode === mode
                              ? 'bg-cyan-600 border-2 border-cyan-300'
                              : 'bg-black/50 border border-cyan-500/30 hover:border-cyan-500/60'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{getModeDescription(standingWaveMode)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Resonant Frequencies */}
              <Card className="bg-black/40 border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-green-400" /> Resonant Frequencies
                  </CardTitle>
                  <CardDescription>Your optimal tuning points (Hz)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {resonantFreqs.map((item) => (
                      <motion.button
                        key={item.harmonic}
                        onClick={() => setSelectedFrequency(item.freq)}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          selectedFrequency === item.freq
                            ? 'bg-green-600/30 border-2 border-green-400'
                            : 'bg-black/40 border border-green-500/30 hover:border-green-500/60'
                        }`}
                      >
                        <div className="font-bold text-green-300">
                          {item.harmonic}λ/2: {item.freq.toLocaleString()} Hz
                        </div>
                        <div className="text-xs text-gray-400">
                          Harmonic {item.harmonic} mode
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="text-sm text-green-300 font-bold mb-1">Selected Frequency</div>
                    <div className="text-3xl font-black text-green-400">{selectedFrequency.toLocaleString()} Hz</div>
                    <div className="text-xs text-gray-400 mt-2">
                      {selectedFrequency < 20000 ? '🔊 Audible' : '🎯 Ultrasonic'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommended Transducers */}
            <Card className="bg-black/40 border-amber-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Recommended Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/50 rounded-lg">
                    <div className="font-bold text-amber-300 mb-2">Transducers</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {selectedFrequency < 20000 ? (
                        <>
                          <li>• Piezo speakers 10-40kHz</li>
                          <li>• 4-8 units for redundancy</li>
                          <li>~$5-15 each</li>
                        </>
                      ) : (
                        <>
                          <li>• Ultrasonic transducers 40kHz</li>
                          <li>• Piezo ceramic elements</li>
                          <li>~$2-8 each</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="p-4 bg-black/50 rounded-lg">
                    <div className="font-bold text-amber-300 mb-2">Amplifier</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 50-200W Class D amp</li>
                      <li>• Adjustable frequency output</li>
                      <li>~$30-80</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-black/50 rounded-lg">
                    <div className="font-bold text-amber-300 mb-2">Control System</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Arduino or Raspberry Pi</li>
                      <li>• DDS frequency generator</li>
                      <li>~$25-50</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VISUALIZER TAB */}
          <TabsContent value="visualizer" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <Card className="bg-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-purple-400" /> Standing Wave Pattern
                  </CardTitle>
                  <CardDescription>Pressure nodes in your chamber</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Chamber visualization */}
                    <div className="p-4 bg-black/50 rounded-lg border border-purple-500/30">
                      <div className="mb-2 text-xs text-gray-400">Chamber length: {chamberLength}cm</div>
                      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded h-24 relative border border-purple-500/30 flex items-center">
                        {/* Draw nodes */}
                        {nodePositions[standingWaveMode].map((pos, idx) => (
                          <div
                            key={idx}
                            className="absolute w-1 h-full bg-purple-400 shadow-lg"
                            style={{
                              left: `${pos * 100}%`,
                              boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
                            }}
                          />
                        ))}
                        
                        {/* Pressure wave visualization */}
                        <svg className="w-full h-full absolute" style={{ pointerEvents: 'none' }}>
                          <path
                            d={`M 0,${96} Q ${chamberLength * 2.5},${48} ${chamberLength * 5},${96}`}
                            stroke="url(#waveGradient)"
                            strokeWidth="2"
                            fill="none"
                          />
                          <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="50%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      <div className="mt-4 space-y-2">
                        {nodePositions[standingWaveMode].map((pos, idx) => (
                          <div key={idx} className="p-2 bg-purple-900/30 rounded text-xs">
                            <div className="text-purple-300 font-bold">Node {idx + 1}: {(pos * 100).toFixed(0)}% from start</div>
                            <div className="text-gray-400">Distance: {(pos * chamberLength).toFixed(1)}cm</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-cyan-400" /> Levitation Sweet Spot
                  </CardTitle>
                  <CardDescription>Where objects suspend with minimal power</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                    <div className="font-bold text-cyan-300 mb-2">Optimal Zone</div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="font-bold text-cyan-300">{selectedFrequency} Hz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mode:</span>
                        <span className="font-bold text-cyan-300">{standingWaveMode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Primary Node:</span>
                        <span className="font-bold text-cyan-300">
                          {(nodePositions[standingWaveMode][0] * chamberLength).toFixed(1)}cm
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-black/50 rounded-lg border border-gray-500/30 space-y-2">
                    <div className="text-xs text-gray-400 font-bold mb-2">TUNING PROCEDURE:</div>
                    <ol className="text-sm text-gray-300 space-y-2">
                      <li className="flex gap-2">
                        <span className="text-cyan-400 font-bold">1.</span>
                        <span>Place lightweight object at primary node</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400 font-bold">2.</span>
                        <span>Start at ~70% power, increase frequency slowly</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400 font-bold">3.</span>
                        <span>Listen for resonance "locking in"</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-400 font-bold">4.</span>
                        <span>Fine-tune ±100Hz around sweet spot</span>
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* BUILD GUIDE TAB */}
          <TabsContent value="guide" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {[
                {
                  phase: 'Phase 01: Design',
                  description: 'Chamber and component selection',
                  steps: [
                    'Calculate resonant frequency for your chamber length',
                    'Source transducers matched to frequency',
                    '3D print or fabricate chamber with acoustic material',
                    'Plan transducer mounting (symmetric placement crucial)',
                  ],
                },
                {
                  phase: 'Phase 02: Electronics',
                  description: 'Power and signal generation',
                  steps: [
                    'Build or buy frequency generator (DDS module or Arduino)',
                    'Connect to Class D amplifier',
                    'Wire transducers to amplifier output',
                    'Add potentiometer for frequency fine-tuning',
                  ],
                },
                {
                  phase: 'Phase 03: Testing',
                  description: 'Finding your sweet spot',
                  steps: [
                    'Start with lightweight object (foam ball, small stone)',
                    'Sweep frequency range around calculated resonance',
                    'Monitor acceleration with phone accelerometer app',
                    'Record successful frequencies in your notes',
                  ],
                },
                {
                  phase: 'Phase 04: Optimization',
                  description: 'Scaling up power and stability',
                  steps: [
                    'Increase power gradually to reduce tuning sensitivity',
                    'Test with progressively heavier objects',
                    'Refine chamber geometry if instability occurs',
                    'Document your final configuration',
                  ],
                },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-black/40 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">{section.phase}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {section.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex gap-3 text-gray-300 text-sm">
                            <span className="text-green-400 font-bold flex-shrink-0">{stepIdx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <Card className="bg-black/40 border-pink-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-pink-400" /> Share Your Design
                  </CardTitle>
                  <CardDescription>Help others by documenting your build</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p>Share on our community platform:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Chamber dimensions and materials</li>
                      <li>Component sourcing links</li>
                      <li>Sweet spot frequencies you discovered</li>
                      <li>Photos/videos of your reactor</li>
                      <li>Lessons learned and optimizations</li>
                    </ul>
                    <Button className="mt-4 w-full bg-pink-600 hover:bg-pink-700">
                      <Share2 className="w-4 h-4 mr-2" /> Submit Your Build
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* PHYSICS TAB */}
          <TabsContent value="science" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {[
                {
                  title: 'How Acoustic Levitation Works',
                  content:
                    'Sound creates pressure waves. When these waves reflect in a chamber, they create standing wave patterns with nodes (low pressure) and antinodes (high pressure). Objects placed at pressure nodes experience a force balancing gravity.',
                },
                {
                  title: 'Standing Waves & Resonance',
                  content:
                    'Resonance occurs when the driving frequency matches a natural frequency of your chamber. At resonance, acoustic pressure amplifies dramatically with minimal input energy. This is where levitation becomes effortless.',
                },
                {
                  title: 'The Role of Frequency',
                  content:
                    'Lower frequencies travel farther but need larger chambers. Higher frequencies (ultrasonic 40kHz) work in compact spaces but require more precise tuning. Your chamber length determines fundamental frequency: f = c/(2L), where c is speed of sound.',
                },
                {
                  title: 'Why Multiple Transducers Matter',
                  content:
                    'Single transducers create uneven pressure. Multiple transducers positioned symmetrically create stable, uniform standing waves. This reduces power requirement and improves levitation stability.',
                },
                {
                  title: 'Energy Efficiency',
                  content:
                    'At resonance, acoustic energy couples efficiently to the standing wave. Off-resonance, most energy dissipates as heat. This is why finding the sweet spot is crucial — it\'s not magic, it\'s physics working *with* you.',
                },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-black/40 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm leading-relaxed">{section.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-cyan-400/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" /> Why This Matters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-300">
                  <p>
                    Acoustic levitation isn't just physics — it's a window into how the universe works. Every system, from atoms to galaxies, responds to resonance. Understanding this principle helps us:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Solve problems by working *with* natural forces, not against them</li>
                    <li>Design more efficient technology aligned with physics</li>
                    <li>Understand consciousness and connection at fundamental level</li>
                    <li>Build tools that heal and elevate humanity</li>
                  </ul>
                  <p className="text-cyan-300 font-bold">This is why ST51 is open. Knowledge is humanity's inheritance. ♾️</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-950/30 to-cyan-950/30 border border-cyan-500/30 rounded-2xl"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">ST51: Sound Technology for Humanity</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Open-source. Peer-reviewed science. Community-driven. No extraction. Just tools that work.
            </p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap mb-6">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              View on GitHub
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white">
              Community Forum
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white">
              Share Your Build
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Built with love. Open forever. No corporate capture.
          </p>
        </motion.div>
      </div>
    </div>
  );
}