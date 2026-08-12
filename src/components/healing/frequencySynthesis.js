/**
 * frequencySynthesis — pure Web Audio graph creation.
 * No React. Returns { nodes, sweepInterval, earlyReturn }.
 *
 * Extracted from useFrequencyEngine so both files stay small and compile fast.
 */
export function createAudioGraph(ctx, freq, masterGain, onSweepFreq) {
  const nodes = [];
  let sweepInterval = null;
  const carrier = freq.carrier || freq.hz || 20;

  // === BROWN NOISE ===
  if (freq.isBrownNoise) {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
    }
    const brownNoise = ctx.createBufferSource();
    brownNoise.buffer = buffer;
    brownNoise.loop = true;
    brownNoise.connect(masterGain);
    brownNoise.start();
    nodes.push(brownNoise);
    return { nodes, sweepInterval, earlyReturn: true };
  }

  // === BUZZSTOP ===
  if (freq.isBuzzStop) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      data[i] = lastOut * 8;
    }
    const pinkNoise = ctx.createBufferSource();
    pinkNoise.buffer = buffer;
    pinkNoise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.12;
    pinkNoise.connect(noiseGain);
    noiseGain.connect(masterGain);
    pinkNoise.start();
    nodes.push(pinkNoise, noiseGain);

    const isoOsc = ctx.createOscillator();
    isoOsc.frequency.value = 300;
    isoOsc.type = 'sine';
    const isoGain = ctx.createGain();
    isoGain.gain.value = 0;
    isoOsc.connect(isoGain);
    isoGain.connect(masterGain);
    isoOsc.start();
    const pulsePeriod = 0.1, pulseOn = 0.05, totalPulses = 600 * 10;
    for (let i = 0; i < totalPulses; i++) {
      const t = ctx.currentTime + (i * pulsePeriod);
      isoGain.gain.setValueAtTime(0.2, t);
      isoGain.gain.setValueAtTime(0, t + pulseOn);
    }
    nodes.push(isoOsc, isoGain);

    const oscA = ctx.createOscillator();
    oscA.frequency.value = 200; oscA.type = 'sine';
    const oscB = ctx.createOscillator();
    oscB.frequency.value = 210; oscB.type = 'sine';
    const abGain = ctx.createGain();
    abGain.gain.value = 0.12;
    oscA.connect(abGain); oscB.connect(abGain);
    abGain.connect(masterGain);
    oscA.start(); oscB.start();
    nodes.push(oscA, oscB, abGain);

    const groundOsc = ctx.createOscillator();
    groundOsc.frequency.value = 55; groundOsc.type = 'sine';
    const groundGain = ctx.createGain();
    groundGain.gain.value = 0.08;
    for (let i = 0; i < 80; i++) {
      const t = ctx.currentTime + (i * 16);
      groundGain.gain.linearRampToValueAtTime(0.15, t + 8);
      groundGain.gain.linearRampToValueAtTime(0.04, t + 16);
    }
    groundOsc.connect(groundGain);
    groundGain.connect(masterGain);
    groundOsc.start();
    nodes.push(groundOsc, groundGain);

    return { nodes, sweepInterval, earlyReturn: true };
  }

  // === TINNITUS NOTCH ===
  if (freq.isNotch) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const notchFilter = ctx.createBiquadFilter();
    notchFilter.type = 'notch';
    notchFilter.frequency.value = freq.notchHz || 8000;
    notchFilter.Q.value = 5;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 4000;
    bandpass.Q.value = 0.3;

    noise.connect(bandpass);
    bandpass.connect(notchFilter);
    notchFilter.connect(masterGain);
    noise.start();
    nodes.push(noise, notchFilter, bandpass);

    const alphaL = ctx.createOscillator();
    alphaL.frequency.value = 200; alphaL.type = 'sine';
    const alphaR = ctx.createOscillator();
    alphaR.frequency.value = 210; alphaR.type = 'sine';
    const alphaGain = ctx.createGain();
    alphaGain.gain.value = 0.1;
    alphaL.connect(alphaGain); alphaR.connect(alphaGain);
    alphaGain.connect(masterGain);
    alphaL.start(); alphaR.start();
    nodes.push(alphaL, alphaR, alphaGain);

    return { nodes, sweepInterval, earlyReturn: true };
  }

  // === BINAURAL ===
  if (freq.binaural) {
    const beatHz = freq.hz;
    const merger = ctx.createChannelMerger(2);

    const leftOsc = ctx.createOscillator();
    leftOsc.type = 'sine';
    leftOsc.frequency.value = carrier;
    const leftGain = ctx.createGain();
    leftGain.gain.value = 0.4;
    leftOsc.connect(leftGain);
    leftGain.connect(merger, 0, 0);

    const rightOsc = ctx.createOscillator();
    rightOsc.type = 'sine';
    rightOsc.frequency.value = carrier + beatHz;
    const rightGain = ctx.createGain();
    rightGain.gain.value = 0.4;
    rightOsc.connect(rightGain);
    rightGain.connect(merger, 0, 1);

    merger.connect(masterGain);
    leftOsc.start();
    rightOsc.start();
    nodes.push(leftOsc, rightOsc, leftGain, rightGain, merger);
    return { nodes, sweepInterval, earlyReturn: false };
  }

  // === STANDARD OSCILLATOR ===
  const osc = ctx.createOscillator();
  osc.type = freq.waveform;
  osc.frequency.value = carrier;
  const gain = ctx.createGain();
  gain.gain.value = 0.4;
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  nodes.push(osc, gain);

  // === SWEEP ===
  if (freq.isSweep) {
    const sweepTime = freq.sweepDuration || 30;
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(20, now);
    osc.frequency.exponentialRampToValueAtTime(20000, now + sweepTime);
    osc.frequency.exponentialRampToValueAtTime(20, now + sweepTime * 2);

    const sweepStartTime = Date.now();
    sweepInterval = setInterval(() => {
      const elapsed = ((Date.now() - sweepStartTime) / 1000) % (sweepTime * 2);
      if (elapsed < sweepTime) {
        const progress = elapsed / sweepTime;
        onSweepFreq?.(Math.round(20 * Math.pow(1000, progress)));
      } else {
        const progress = (elapsed - sweepTime) / sweepTime;
        onSweepFreq?.(Math.round(20000 * Math.pow(0.001, progress)));
      }
    }, 200);

    const sweepLoopInterval = setInterval(() => {
      const t = ctx.currentTime;
      osc.frequency.cancelScheduledValues(t);
      osc.frequency.setValueAtTime(20, t);
      osc.frequency.exponentialRampToValueAtTime(20000, t + sweepTime);
      osc.frequency.exponentialRampToValueAtTime(20, t + sweepTime * 2);
    }, sweepTime * 2 * 1000);
    nodes.push({ stop: () => clearInterval(sweepLoopInterval), disconnect: () => {} });

    const alphaL = ctx.createOscillator();
    alphaL.frequency.value = 200; alphaL.type = 'sine';
    const alphaR = ctx.createOscillator();
    alphaR.frequency.value = 210; alphaR.type = 'sine';
    const alphaGain = ctx.createGain();
    alphaGain.gain.value = 0.08;
    alphaL.connect(alphaGain); alphaR.connect(alphaGain);
    alphaGain.connect(masterGain);
    alphaL.start(); alphaR.start();
    nodes.push(alphaL, alphaR, alphaGain);
  }

  // === HARMONICS + AMBIENT (non-sweep only) ===
  if (!freq.isSweep) {
    const harmonics = [
      { mult: 0.25, vol: 0.35 },
      { mult: 0.5, vol: 0.4 },
      { mult: 2, vol: 0.25 },
      { mult: 3, vol: 0.2 },
      { mult: 4, vol: 0.15 },
    ];
    harmonics.forEach(({ mult, vol }) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = carrier * mult;
      const g = ctx.createGain();
      g.gain.value = vol;
      o.connect(g);
      g.connect(masterGain);
      o.start();
      nodes.push(o, g);
    });

    const ambientFreqs = [
      carrier * 0.125, carrier * 0.33, carrier * 0.66,
      carrier * 1.5, carrier * 2.5, carrier * 3.5,
      carrier * 5, carrier * 7
    ];
    ambientFreqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.03 + (i * 0.002);
      o.connect(g);
      g.connect(masterGain);
      o.start();
      nodes.push(o, g);
    });
  }

  return { nodes, sweepInterval, earlyReturn: false };
}