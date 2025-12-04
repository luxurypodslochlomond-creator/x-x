/**
 * UF51 HEALING PROTOCOLS
 * Most advanced frequency healing system on Earth
 * 
 * Each protocol can stack:
 * - Binaural beats (stereo frequency difference)
 * - Isochronic tones (rhythmic pulses)
 * - Harmonic series (mathematically related overtones)
 * - Noise beds (pink/brown for depth)
 * - Schumann resonance (7.83Hz Earth grounding)
 * - Frequency sweeps (transition between states)
 * - Color therapy (screen pulses at exact Hz)
 * - Haptic feedback (body feels the frequency)
 * - Breathing pacer (0.1Hz HRV coherence)
 */

export const HEALING_PROTOCOLS = [
  {
    id: 'sleep',
    name: 'Deep Sleep',
    emoji: '🌙',
    description: 'Delta waves for deepest regenerative rest',
    
    // Core frequency
    targetHz: 2,
    carrier: 200,
    
    // Layers (all toggleable)
    layers: {
      binaural: true,        // Stereo beat
      isochronic: true,      // Rhythmic pulse
      harmonics: [1, 2, 4],  // Harmonic multipliers
      noise: 'brown',        // brown/pink/white/none
      schumann: true,        // 7.83Hz undertone
      sweep: null,           // No sweep for sleep
    },
    
    // Visuals
    color: 'from-indigo-600 to-purple-800',
    rgb: [99, 102, 241],
    pulseColor: 'rgba(99, 102, 241, 0.8)',
    
    // Session
    duration: 60,
    breathingPacer: false,  // Don't want active breathing for sleep
    
    // Science
    science: 'Delta waves (0.5-4Hz) trigger deep sleep, HGH release, cellular repair. Brown noise masks disturbances.',
    research: 'NIH: Delta entrainment increases slow-wave sleep by 30%'
  },
  
  {
    id: 'anxiety',
    name: 'Anxiety Relief',
    emoji: '🌍',
    description: "Earth's frequency - instant grounding",
    
    targetHz: 7.83,
    carrier: 200,
    
    layers: {
      binaural: true,
      isochronic: true,
      harmonics: [1, 2],
      noise: 'pink',
      schumann: true,  // This IS Schumann
      sweep: null,
    },
    
    color: 'from-cyan-500 to-teal-700',
    rgb: [6, 182, 212],
    pulseColor: 'rgba(6, 182, 212, 0.8)',
    
    duration: 20,
    breathingPacer: true,  // 0.1Hz breathing helps anxiety
    
    science: "Schumann resonance (7.83Hz) - Earth's electromagnetic heartbeat. Proven to reduce cortisol within minutes.",
    research: 'HeartMath Institute: Schumann exposure reduces anxiety markers by 40%'
  },
  
  {
    id: 'focus',
    name: 'Laser Focus',
    emoji: '🎯',
    description: 'Gamma for peak cognitive performance',
    
    targetHz: 40,
    carrier: 300,
    
    layers: {
      binaural: true,
      isochronic: true,
      harmonics: [1, 1.5, 2],
      noise: 'pink',
      schumann: true,
      sweep: { from: 10, to: 40, duration: 300 }, // Alpha to gamma ramp
    },
    
    color: 'from-yellow-500 to-orange-600',
    rgb: [245, 158, 11],
    pulseColor: 'rgba(245, 158, 11, 0.8)',
    
    duration: 25,
    breathingPacer: false,
    
    science: '40Hz gamma - MIT proven to clear amyloid plaques, enhance cognition, memory, and mental clarity.',
    research: 'MIT Tsai Lab: 40Hz entrainment reduces Alzheimer markers'
  },
  
  {
    id: 'pain',
    name: 'Pain Gate',
    emoji: '💫',
    description: 'Natural anesthetic frequency',
    
    targetHz: 174,
    carrier: null, // No binaural needed - direct solfeggio
    
    layers: {
      binaural: false,
      isochronic: true,
      harmonics: [1, 2, 3, 4], // Full harmonic series
      noise: 'brown',
      schumann: true,
      sweep: null,
    },
    
    color: 'from-red-600 to-orange-600',
    rgb: [239, 68, 68],
    pulseColor: 'rgba(239, 68, 68, 0.8)',
    
    duration: 30,
    breathingPacer: true,
    
    science: '174Hz Solfeggio acts as natural anesthetic. Pain gate theory: competing signals reduce pain perception.',
    research: 'Journal of Pain Research: Frequency therapy reduces chronic pain scores by 25%'
  },
  
  {
    id: 'dna',
    name: 'DNA Repair',
    emoji: '🧬',
    description: 'Love frequency - cellular regeneration',
    
    targetHz: 528,
    carrier: null,
    
    layers: {
      binaural: false,
      isochronic: true,
      harmonics: [1, 1.618, 2], // Golden ratio harmonic!
      noise: 'pink',
      schumann: true,
      sweep: null,
    },
    
    color: 'from-green-500 to-emerald-600',
    rgb: [34, 197, 94],
    pulseColor: 'rgba(34, 197, 94, 0.8)',
    
    duration: 21,
    breathingPacer: true,
    
    science: '528Hz "Miracle Tone" - documented to repair DNA, reduce cortisol, increase oxytocin. The frequency of love.',
    research: 'Dr. Glen Rein: 528Hz increased UV light absorption in DNA by 8.2%'
  },
  
  {
    id: 'heart',
    name: 'Heart Coherence',
    emoji: '💗',
    description: 'HeartMath validated synchronization',
    
    targetHz: 0.1, // 6 breaths per minute
    carrier: 200,
    
    layers: {
      binaural: true,
      isochronic: false, // Too slow for isochronic
      harmonics: [1],
      noise: 'pink',
      schumann: true,
      sweep: null,
    },
    
    color: 'from-pink-500 to-rose-600',
    rgb: [236, 72, 153],
    pulseColor: 'rgba(236, 72, 153, 0.8)',
    
    duration: 15,
    breathingPacer: true, // Essential for this protocol
    
    science: 'Heart-brain coherence at 0.1Hz creates emotional balance, intuition, and vagal tone.',
    research: 'HeartMath Institute: 0.1Hz breathing increases HRV coherence by 500%'
  },
  
  {
    id: 'depression',
    name: 'Mood Lift',
    emoji: '☀️',
    description: 'Alpha waves for natural serotonin',
    
    targetHz: 10,
    carrier: 200,
    
    layers: {
      binaural: true,
      isochronic: true,
      harmonics: [1, 2],
      noise: 'pink',
      schumann: true,
      sweep: { from: 4, to: 10, duration: 180 }, // Theta to alpha lift
    },
    
    color: 'from-amber-400 to-yellow-500',
    rgb: [251, 191, 36],
    pulseColor: 'rgba(251, 191, 36, 0.9)',
    
    duration: 30,
    breathingPacer: true,
    
    science: '10Hz alpha increases serotonin and dopamine naturally. Light therapy colors enhance effect.',
    research: 'Neuroscience Letters: Alpha entrainment elevates mood within 15 minutes'
  },
  
  {
    id: 'trauma',
    name: 'Trauma Release',
    emoji: '🫂',
    description: 'Gentle delta for stored pain',
    
    targetHz: 3,
    carrier: 150,
    
    layers: {
      binaural: true,
      isochronic: false, // Too jarring for trauma
      harmonics: [1, 2],
      noise: 'brown', // Warmest, safest
      schumann: true,
      sweep: { from: 7, to: 3, duration: 600 }, // Slow descent
    },
    
    color: 'from-purple-600 to-indigo-800',
    rgb: [147, 51, 234],
    pulseColor: 'rgba(147, 51, 234, 0.7)',
    
    duration: 40,
    breathingPacer: true,
    
    science: '3Hz delta accesses subconscious mind, allowing gentle release of stored trauma without re-traumatization.',
    research: 'EMDR research: Bilateral stimulation at low Hz processes traumatic memories'
  },
  
  {
    id: 'meditation',
    name: 'Deep Meditation',
    emoji: '🧘',
    description: 'Theta gateway to inner wisdom',
    
    targetHz: 6,
    carrier: 200,
    
    layers: {
      binaural: true,
      isochronic: true,
      harmonics: [1, 1.5, 2],
      noise: 'pink',
      schumann: true,
      sweep: { from: 10, to: 6, duration: 300 }, // Alpha to theta
    },
    
    color: 'from-violet-500 to-purple-700',
    rgb: [139, 92, 246],
    pulseColor: 'rgba(139, 92, 246, 0.8)',
    
    duration: 30,
    breathingPacer: true,
    
    science: 'Theta (4-8Hz) is the gateway to subconscious, creativity, and spiritual insight.',
    research: 'Davidson et al: Theta dominance in experienced meditators'
  },
  
  {
    id: 'energy',
    name: 'Energy Boost',
    emoji: '⚡',
    description: 'Beta activation without caffeine',
    
    targetHz: 18,
    carrier: 250,
    
    layers: {
      binaural: true,
      isochronic: true,
      harmonics: [1, 1.5],
      noise: 'white', // Bright, alert
      schumann: false, // Don't ground - want energy
      sweep: { from: 10, to: 18, duration: 180 },
    },
    
    color: 'from-orange-500 to-red-500',
    rgb: [249, 115, 22],
    pulseColor: 'rgba(249, 115, 22, 0.9)',
    
    duration: 15,
    breathingPacer: false,
    
    science: '18Hz beta creates alert, energized state. Better than caffeine - no crash.',
    research: 'EEG studies: Beta entrainment increases alertness within 10 minutes'
  },
  
  {
    id: 'immunity',
    name: 'Immune Boost',
    emoji: '🛡️',
    description: '285Hz cellular regeneration',
    
    targetHz: 285,
    carrier: null,
    
    layers: {
      binaural: false,
      isochronic: true,
      harmonics: [1, 2, 3],
      noise: 'pink',
      schumann: true,
      sweep: null,
    },
    
    color: 'from-emerald-500 to-teal-600',
    rgb: [16, 185, 129],
    pulseColor: 'rgba(16, 185, 129, 0.8)',
    
    duration: 25,
    breathingPacer: true,
    
    science: '285Hz Solfeggio influences energy field, promotes cellular health and tissue repair.',
    research: 'Biofield science: Frequency exposure enhances immune cell activity'
  },
  
  {
    id: 'creativity',
    name: 'Creative Flow',
    emoji: '🎨',
    description: 'Theta-alpha bridge for inspiration',
    
    targetHz: 7.5,
    carrier: 200,
    
    layers: {
      binaural: true,
      isochronic: true,
      harmonics: [1, 1.618], // Golden ratio
      noise: 'pink',
      schumann: true, // Close to Schumann
      sweep: { from: 10, to: 7.5, duration: 300, oscillate: true },
    },
    
    color: 'from-fuchsia-500 to-pink-600',
    rgb: [217, 70, 239],
    pulseColor: 'rgba(217, 70, 239, 0.8)',
    
    duration: 30,
    breathingPacer: false,
    
    science: 'Theta-alpha border (7-8Hz) is where creative insights emerge. Artists and inventors live here.',
    research: 'EEG of creative insight moments shows theta-alpha crossover'
  }
];

// Solfeggio scale for reference
export const SOLFEGGIO_FREQUENCIES = {
  174: 'Pain relief, safety',
  285: 'Tissue healing, immunity',
  396: 'Liberation from fear',
  417: 'Facilitating change',
  528: 'DNA repair, love',
  639: 'Relationships, connection',
  741: 'Awakening intuition',
  852: 'Spiritual order',
  963: 'Divine consciousness'
};

// Brainwave reference
export const BRAINWAVE_STATES = {
  delta: { range: '0.5-4Hz', state: 'Deep sleep, healing, regeneration' },
  theta: { range: '4-8Hz', state: 'Meditation, creativity, subconscious' },
  alpha: { range: '8-12Hz', state: 'Relaxed focus, calm, learning' },
  beta: { range: '12-30Hz', state: 'Active thinking, alertness' },
  gamma: { range: '30-100Hz', state: 'Peak cognition, insight, memory' }
};