import { useEffect, useRef } from 'react';

/**
 * DESTRUCTIVE INTERFERENCE ENGINE - Zero Loss Fear Protocol
 * 
 * How it works:
 * 1. Detect fear frequency (from voice analysis OR selected protocol)
 * 2. Generate INVERTED waveform (180° phase shift = negative amplitude)
 * 3. Layer with healing frequency
 * 4. Result: Fear frequency CANCELS OUT (destructive interference)
 * 5. Visual + Audio sync for maximum effect
 * 
 * Physics: Wave + InvertedWave = Silence (zero loss)
 */

export const useDestructiveInterference = (isActive, fearFrequency, healingFrequency, audioContext, masterGain) => {
  const inverseNodesRef = useRef([]);

  useEffect(() => {
    if (!isActive || !fearFrequency || !audioContext || !masterGain) return;

    try {
      const ctx = audioContext;

      // STEP 1: CREATE FEAR FREQUENCY
      const fearOsc = ctx.createOscillator();
      const fearGain = ctx.createGain();
      fearOsc.type = 'sine';
      fearOsc.frequency.value = fearFrequency;
      fearGain.gain.value = 0.2; // Present but not dominant

      fearOsc.connect(fearGain);
      fearGain.connect(masterGain);
      fearOsc.start();

      // STEP 2: CREATE INVERTED FEAR FREQUENCY (180° phase shift = negative)
      const invertedOsc = ctx.createOscillator();
      const invertedGain = ctx.createGain();
      invertedOsc.type = 'sine';
      invertedOsc.frequency.value = fearFrequency;
      invertedGain.gain.value = -0.2; // NEGATIVE = inverted/opposite phase

      invertedOsc.connect(invertedGain);
      invertedGain.connect(masterGain);
      invertedOsc.start();

      // STEP 3: HEALING FREQUENCY (dominant, stacks with cancellation)
      const healingOsc = ctx.createOscillator();
      const healingGain = ctx.createGain();
      healingOsc.type = 'sine';
      healingOsc.frequency.value = healingFrequency;
      healingGain.gain.value = 0.35; // Stronger than fear

      healingOsc.connect(healingGain);
      healingGain.connect(masterGain);
      healingOsc.start();

      // STEP 4: HARMONIC STACK - Reinforces healing while fear cancels
      // Add harmonics of healing frequency only (not fear)
      const harmonics = [healingFrequency * 1.5, healingFrequency * 2, healingFrequency * 2.5];
      const harmonicOscs = harmonics.map((harmonic) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = harmonic;
        gain.gain.value = 0.1 / (harmonics.indexOf(harmonic) + 1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        return { osc, gain };
      });

      inverseNodesRef.current = [
        { osc: fearOsc, gain: fearGain },
        { osc: invertedOsc, gain: invertedGain },
        { osc: healingOsc, gain: healingGain },
        ...harmonicOscs
      ];

      console.log('✓ Destructive Interference Active');
      console.log(`  Fear frequency: ${fearFrequency}Hz (present)`);
      console.log(`  Inverted: -${fearFrequency}Hz (cancels fear)`);
      console.log(`  Healing: ${healingFrequency}Hz (dominant + harmonics)`);
      console.log(`  Result: Fear CANCELLED OUT via destructive interference`);

      return () => {
        inverseNodesRef.current.forEach(node => {
          try {
            node.osc.stop();
            node.gain.disconnect();
          } catch (e) {}
        });
        inverseNodesRef.current = [];
      };
    } catch (err) {
      console.error('Destructive Interference Error:', err);
    }
  }, [isActive, fearFrequency, healingFrequency, audioContext, masterGain]);
};

/**
 * VISUAL DESTRUCTIVE INTERFERENCE
 * Flash screen with inverted color/intensity
 * Creates visual cancellation effect synchronized with audio
 */
export const useVisualDestructiveInterference = (isActive, fearFrequency, primaryColor) => {
  useEffect(() => {
    if (!isActive || !fearFrequency) return;

    // Calculate flash period from fear frequency
    const flashPeriod = 1000 / fearFrequency; // ms

    // Inverted visual sequence
    let flashCount = 0;
    const interval = setInterval(() => {
      flashCount++;

      if (flashCount % 2 === 0) {
        // FEAR PHASE - Show the "fear" color (what we're cancelling)
        document.body.style.outline = `8px solid rgba(239, 68, 68, 0.3)`; // Red = fear
        document.body.style.boxShadow = 'inset 0 0 100px rgba(239, 68, 68, 0.2)';
      } else {
        // INVERTED PHASE - Show inverted (healing) color
        document.body.style.outline = `8px solid ${primaryColor}80`;
        document.body.style.boxShadow = `inset 0 0 100px ${primaryColor}30`;
      }
    }, flashPeriod);

    return () => {
      clearInterval(interval);
      document.body.style.outline = 'none';
      document.body.style.boxShadow = 'none';
    };
  }, [isActive, fearFrequency, primaryColor]);
};

/**
 * AUTOMATIC FEAR DETECTION + INVERSION
 * Voice analysis or protocol selection triggers inverse protocol
 */
export const detectFearFrequency = (voiceAnalysisData) => {
  // If voice analysis detected stress, extract dominant frequency
  if (voiceAnalysisData?.f0_hz) {
    // Fear typically elevates voice pitch
    // Return slightly below the detected frequency (inverse)
    return voiceAnalysisData.f0_hz * 0.8; // Slightly lower = inverted perception
  }

  // Default fear frequency (common in anxiety)
  // 200-300Hz = stress/fear range
  return 250; // Hz
};

/**
 * PROTOCOL FEAR DETECTION
 * Detect if user selected protocol targets fear/trauma
 * Auto-enable inverse frequency for those protocols
 */
export const shouldUseInverseFrequency = (protocolId) => {
  const fearProtocols = [
    'anxiety',
    'trauma',
    'ptsd',
    'panic',
    'emergency',
    'emergency_universal',
    'anger',
    'withdrawal_physical',
    'addiction',
    'cancer_support',
    'concussion_recovery'
  ];

  return fearProtocols.some(fp => protocolId.includes(fp));
};

export default { useDestructiveInterference, useVisualDestructiveInterference, detectFearFrequency, shouldUseInverseFrequency };