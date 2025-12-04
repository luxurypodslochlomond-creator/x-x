/**
 * UF51 FREQUENCY ENGINE
 * The most advanced audio healing engine on Earth
 * 
 * Layers:
 * 1. Binaural beats (stereo frequency difference → brain entrainment)
 * 2. Isochronic tones (rhythmic on/off pulses → stronger entrainment)
 * 3. Harmonic series (mathematically related overtones → richer healing)
 * 4. Noise beds (pink/brown/white → depth and masking)
 * 5. Schumann resonance (7.83Hz → Earth grounding)
 * 6. Frequency sweeps (smooth transitions between states)
 */

export class FrequencyEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.nodes = [];
    this.sweepInterval = null;
    this.currentHz = 0;
  }

  async init() {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  stop() {
    clearInterval(this.sweepInterval);
    this.nodes.forEach(node => {
      try {
        node.stop?.();
        node.disconnect?.();
      } catch (e) {}
    });
    this.nodes = [];
    this.currentHz = 0;
  }

  setVolume(vol) {
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
  }

  /**
   * MAIN PLAY FUNCTION
   * Stacks all enabled layers for maximum healing effect
   */
  async play(protocol, options = {}) {
    const ctx = await this.init();
    this.stop();

    const {
      volume = 0.7,
      binauralEnabled = true,
      isochronicEnabled = true,
      harmonicsEnabled = true,
      noiseEnabled = true,
      schumannEnabled = true,
    } = options;

    const { targetHz, carrier, layers } = protocol;
    this.currentHz = targetHz;

    // Master output
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = volume;
    this.masterGain.connect(ctx.destination);
    this.nodes.push(this.masterGain);

    // Layer gains for mixing
    const layerGains = {
      binaural: 0.4,
      isochronic: 0.25,
      harmonics: 0.15,
      noise: 0.08,
      schumann: 0.12
    };

    // 1. BINAURAL BEATS
    if (layers.binaural && binauralEnabled && carrier) {
      this.createBinaural(ctx, targetHz, carrier, layerGains.binaural);
    }

    // 2. ISOCHRONIC TONES
    if (layers.isochronic && isochronicEnabled && targetHz > 0.5) {
      this.createIsochronic(ctx, targetHz, carrier || 200, layerGains.isochronic);
    }

    // 3. HARMONIC SERIES
    if (layers.harmonics && harmonicsEnabled) {
      this.createHarmonics(ctx, targetHz, carrier, layers.harmonics, layerGains.harmonics);
    }

    // 4. NOISE BED
    if (layers.noise && noiseEnabled) {
      this.createNoise(ctx, layers.noise, layerGains.noise);
    }

    // 5. SCHUMANN RESONANCE
    if (layers.schumann && schumannEnabled) {
      this.createSchumann(ctx, layerGains.schumann);
    }

    // 6. FREQUENCY SWEEP
    if (layers.sweep) {
      this.startSweep(protocol, layers.sweep);
    }

    return this.currentHz;
  }

  /**
   * BINAURAL BEATS
   * Different frequency in each ear creates perceived beat
   * Brain entrains to the difference frequency
   */
  createBinaural(ctx, targetHz, carrier, gain) {
    const merger = ctx.createChannelMerger(2);
    const binauralGain = ctx.createGain();
    binauralGain.gain.value = gain;
    binauralGain.connect(this.masterGain);
    merger.connect(binauralGain);

    // Left ear: carrier frequency
    const left = ctx.createOscillator();
    left.type = 'sine';
    left.frequency.value = carrier;
    left.connect(merger, 0, 0);
    left.start();

    // Right ear: carrier + target (creates beat)
    const right = ctx.createOscillator();
    right.type = 'sine';
    right.frequency.value = carrier + targetHz;
    right.connect(merger, 0, 1);
    right.start();

    this.nodes.push(left, right, merger, binauralGain);
  }

  /**
   * ISOCHRONIC TONES
   * Rhythmic pulses that turn on/off at target frequency
   * Stronger entrainment than binaural, works with speakers
   */
  createIsochronic(ctx, targetHz, carrier, gain) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = carrier;

    // LFO to create pulsing
    const lfo = ctx.createOscillator();
    lfo.type = 'square'; // Sharp on/off
    lfo.frequency.value = targetHz;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = gain;

    // Modulate amplitude with LFO
    const modulatorGain = ctx.createGain();
    modulatorGain.gain.value = 0;

    lfo.connect(lfoGain);
    lfoGain.connect(modulatorGain.gain);

    osc.connect(modulatorGain);
    modulatorGain.connect(this.masterGain);

    osc.start();
    lfo.start();

    this.nodes.push(osc, lfo, lfoGain, modulatorGain);
  }

  /**
   * HARMONIC SERIES
   * Mathematically related frequencies create richer, more effective sound
   * Based on natural acoustic principles
   */
  createHarmonics(ctx, baseHz, carrier, multipliers, totalGain) {
    const baseFreq = carrier || baseHz;
    const gainPerHarmonic = totalGain / multipliers.length;

    multipliers.forEach((mult, i) => {
      const freq = baseFreq * mult;
      if (freq < 20 || freq > 20000) return;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      // Decrease volume for higher harmonics (natural acoustic rolloff)
      gain.gain.value = gainPerHarmonic / (i + 1);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      this.nodes.push(osc, gain);
    });
  }

  /**
   * NOISE BEDS
   * Pink: Natural, calming (1/f distribution)
   * Brown: Deeper, warmer (1/f² distribution)
   * White: All frequencies equal (alerting)
   */
  createNoise(ctx, type, gain) {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      // Pink noise algorithm (Paul Kellet's refined method)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      // Brown noise (integrated white noise)
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Normalize
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = gain;

    source.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    source.start();

    this.nodes.push(source, noiseGain);
  }

  /**
   * SCHUMANN RESONANCE
   * Earth's electromagnetic frequency (7.83Hz)
   * Grounds and balances all other frequencies
   */
  createSchumann(ctx, gain) {
    // Create 7.83Hz through isochronic modulation
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = 136.1; // Cosmic Om frequency

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 7.83;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.5;

    const modulatorGain = ctx.createGain();
    modulatorGain.gain.value = gain;

    lfo.connect(lfoGain);
    lfoGain.connect(modulatorGain.gain);

    carrier.connect(modulatorGain);
    modulatorGain.connect(this.masterGain);

    carrier.start();
    lfo.start();

    this.nodes.push(carrier, lfo, lfoGain, modulatorGain);
  }

  /**
   * FREQUENCY SWEEP
   * Smoothly transitions between frequencies
   * Used to guide brain from one state to another
   */
  startSweep(protocol, sweepConfig) {
    const { from, to, duration, oscillate } = sweepConfig;
    const startTime = Date.now();
    const durationMs = duration * 1000;

    this.sweepInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let progress = Math.min(elapsed / durationMs, 1);

      if (oscillate && progress >= 1) {
        // Reset for oscillation
        return;
      }

      const newHz = from + (to - from) * progress;
      this.currentHz = newHz;

      // Update binaural frequencies
      this.nodes.forEach(node => {
        if (node instanceof OscillatorNode && node.frequency.value > 100) {
          // This is a carrier - check if it's the right channel
          const currentFreq = node.frequency.value;
          const baseCarrier = protocol.carrier || 200;
          
          if (Math.abs(currentFreq - baseCarrier) < 1) {
            // Left channel - keep as carrier
            node.frequency.setTargetAtTime(baseCarrier, this.ctx.currentTime, 0.5);
          } else if (Math.abs(currentFreq - (baseCarrier + from)) < from + 10) {
            // Right channel - update with new Hz
            node.frequency.setTargetAtTime(baseCarrier + newHz, this.ctx.currentTime, 0.5);
          }
        }
      });

      if (progress >= 1 && !oscillate) {
        clearInterval(this.sweepInterval);
      }
    }, 100);
  }

  getCurrentHz() {
    return this.currentHz;
  }
}

export default FrequencyEngine;