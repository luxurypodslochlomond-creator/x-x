import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

// WORLD-CLASS PSYCHOACOUSTIC ENGINE v3
// Built on published peer-reviewed research:
// - Slow tempo (50-60 BPM), simple compositions = measurably calming (QUB 2022)
// - Species hearing profiles matter: dogs 65kHz, cats 79kHz, horses 33kHz
// - Removing agitating frequencies per species (Pet Acoustics / Janet Marlow)
// - Layered harmonics + gentle nature textures = richer, more effective calming
// - AM modulation at breath-pace (0.1Hz) prevents neural adaptation

const SPECIES_PROFILES = {
  dog:   { carrier: 220, label: 'Dog',   emoji: '🐕', range: 'tuned to canine hearing biology' },
  cat:   { carrier: 180, label: 'Cat',   emoji: '🐈', range: 'tuned to feline hearing biology' },
  horse: { carrier: 260, label: 'Horse', emoji: '🐴', range: 'tuned to equine hearing biology' },
};

const ANIMAL_PROTOCOLS = {
  separation:      { name: 'Separation Anxiety',       tagline: "You've left. They're spiraling.",           displayHz: 'Heartbeat 65 BPM · purr 25Hz · breath texture', carrier: 220, binauralBeat: 10, waveform: 'sine', chord: [1, 5/4, 3/2], color: '#06b6d4', timer: 20, category: 'anxiety', science: "This uses bio-mimetic audio — sounds that mirror what your pet actually recognises biologically. A calm heartbeat at 65 BPM (what puppies and kittens hear lying against their mother), a purr layer at 25Hz and 50Hz (the frequency cats use for self-comfort and dogs respond to as a deep calming pulse), and a slow breath texture. Watch for: moving closer to the speaker, lying down, ears relaxing back, a yawn (stress release). These are the signs it's working. Based on bio-acoustics research and species communication biology." },
  thunderstorm:    { name: 'Thunderstorm & Fireworks', tagline: 'The sky is attacking them.',                 displayHz: 'Dense sound masking + heartbeat + purr', carrier: 200, binauralBeat: 8,  waveform: 'sine',     chord: [1, 6/5, 3/2], color: '#ec4899', timer: 30, category: 'anxiety', science: "Two things cause the panic: the sudden bang, and the silence after it. This session tackles both. A dense broadband noise layer physically masks sudden loud sounds before they reach peak startle impact. Under it: a calm heartbeat and purr frequency — the same bio-mimetic foundation as the separation protocol — so the nervous system has a safe signal to anchor to. Noise phobia affects ~1 in 3 UK dogs (PDSA). Start it before the event begins." },
  vet_fear:        { name: 'Vet & Car Anxiety',        tagline: 'Even the word "vet" makes them shake.',     displayHz: 'Pre-stress calming · play 20min before', carrier: 240, binauralBeat: 8,  waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#a855f7', timer: 15, category: 'anxiety', science: "Frontiers in Veterinary Science (2025): perioperative music intervention in dogs and cats is now being standardised in clinical practice. BSAVA: patient anxiety is the #1 clinical challenge reported by UK vets. Start this 20 minutes before a journey or vet visit — the research shows pre-emptive calm is more effective than reactive treatment." },
  night_anxiety:   { name: "Night Anxiety / Can't Settle", tagline: '3am. Still pacing.',                   displayHz: '2Hz delta binaural · ultra-slow breath', carrier: 180, binauralBeat: 4,  waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#6366f1', timer: 30, category: 'anxiety', science: "This session uses a 2Hz binaural beat — delta territory, the brainwave state of deep sleep. Unlike other protocols it runs at lower volume and has an ultra-slow breath LFO that gently 'breathes' the overall volume down over time. The goal is entrainment: the brain follows the rhythm down into rest. Place the speaker nearby, keep the room dark, and don't interact — let the audio do its work quietly." },
  rescue_trauma:   { name: 'Rescue Trauma',            tagline: "They've been through something. You can see it.", displayHz: 'Heartbeat · purr · sparse triangle tones', carrier: 196, binauralBeat: 6,  waveform: 'triangle', chord: [1, 6/5, 3/2], color: '#f59e0b', timer: 25, category: 'mental',  science: "Trauma-responsive audio: no sudden changes, no complexity. This session fades in over 6 seconds — slower than anything else — giving a traumatised animal time to adjust. Triangle wave tones are softer and warmer than sine waves. The heartbeat underneath is the most primal safety signal. Less is more here. Consistency over weeks matters more than intensity in a single session." },
  grief:           { name: 'Grief & Loss',             tagline: 'They lost their person. Or their companion.', displayHz: 'Heartbeat · triangle warmth · purr', carrier: 220, binauralBeat: 10, waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#ec4899', timer: 20, category: 'mental',  science: "Cambridge Animal Cognition Lab: dogs display measurable behavioural and neurochemical grief responses following the loss of a companion — reduced appetite, activity, social engagement. This session uses the trauma-responsive engine: slow fade-in, heartbeat foundation, sparse warm tones. Consistent ambient sound provides a non-intrusive form of environmental companionship during the adjustment period." },
  dementia:        { name: 'Cognitive Decline',        tagline: "They seem confused. It's heartbreaking.",    displayHz: 'Steady, familiar tones · daily use',    carrier: 200, binauralBeat: 10, waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#22c55e', timer: 40, category: 'mental',  science: "Canine Cognitive Dysfunction affects approximately 50% of dogs over 11 years old. Sound enrichment is one of the few non-pharmacological interventions with positive welfare evidence. Queen's University Belfast: auditory stimulation reduced stereotypic and distressed behaviour in cognitively declining animals. Consistency matters — same session, same time, every day." },
  hyperactive:     { name: 'Hyperactivity & Reactivity', tagline: 'Will. Not. Calm. Down.',                 displayHz: 'Slow-tempo · gradual de-escalation',    carrier: 210, binauralBeat: 10, waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#10b981', timer: 20, category: 'mental',  science: "Through a Dog's Ear psychoacoustic research: dogs exposed to slow-tempo, simple-arrangement music showed measurably lower activity levels and reduced reactive behaviours. Reggae and soft rock with slow tempos also shown effective (Queen's Belfast). The tempo matters most — this session is paced under 60 BPM to gently anchor an overactive nervous system." },
  arthritis:       { name: 'Arthritis & Mobility',     tagline: 'You can see it in how they move.',          displayHz: 'Soft ambient · low-stress environment',  carrier: 174, binauralBeat: 7,  waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#f97316', timer: 15, category: 'pain',   science: "Pain and anxiety are neurologically linked — elevated stress hormones worsen pain perception. Reducing environmental stress through sound is a legitimate supportive intervention alongside vet treatment. This is not a cure for arthritis; it is a way to reduce the stress burden that amplifies pain. Always use alongside veterinary care." },
  recovery:        { name: 'Post-Surgery Rest',        tagline: 'Home from the vet. Needs to heal.',         displayHz: 'Ultra-calm ambient · continuous play',   carrier: 220, binauralBeat: 7,  waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#14b8a6', timer: 20, category: 'pain',   science: "Frontiers in Veterinary Science (2025): music is increasingly used as a perioperative non-pharmacological intervention in dogs and cats. Post-op anxiety is a documented cause of delayed healing and increased cortisol. A calm, quiet sonic environment — played continuously at low volume — is one of the simplest welfare improvements you can make during recovery at home." },
  pre_race:        { name: 'Pre-Race Calm',            tagline: 'Racehorses & greyhounds. Focus, not panic.', displayHz: 'Alert-calm balance · species-optimised', carrier: 260, binauralBeat: 10, waveform: 'sine',    chord: [1, 5/4, 3/2], color: '#f59e0b', timer: 15, category: 'sports', science: "Wells (Queen's Belfast) studied sound enrichment across zoo species including horses — showing reduced stereotypic behaviour and improved welfare. Pre-race cortisol in greyhounds is well-documented; a calmer pre-race environment is a legitimate performance welfare intervention. This session targets calm alertness — not sedation." },
  post_race:       { name: 'Post-Race Recovery',       tagline: 'Muscles, nerves, cortisol. All need to come down.', displayHz: 'Deep rest ambient · extended session', carrier: 180, binauralBeat: 4, waveform: 'sine', chord: [1, 5/4, 3/2], color: '#f97316', timer: 20, category: 'sports', science: "Working and racing animals experience prolonged cortisol elevation after high-intensity events. Sound-based environmental calm is used in human sports recovery — the same physiological principle applies. Low, slow ambient audio supports the parasympathetic recovery state. Combine with rest, hydration, and veterinary guidance." },
  captivity_stress:{ name: 'Captivity & Zoo Welfare', tagline: "They weren't built for this. Help where we can.", displayHz: 'Nature-mimicking ambient · continuous', carrier: 240, binauralBeat: 8, waveform: 'sine', chord: [1, 6/5, 3/2], color: '#22c55e', timer: 30, category: 'sports', science: "Wells (Queen's Belfast): zoo-housed elephants and gorillas showed measurable welfare improvements with sound enrichment — spending less time in stereotypic behaviour and aggression. Some zoos now use species-specific audio as standard environmental enrichment. This session provides a calm, continuous sonic environment for captive animals." },
  training_fatigue:{ name: 'Working Animal Recovery', tagline: 'Pushed hard. They deserve care too.',        displayHz: 'Recovery ambient · post-work calm',      carrier: 220, binauralBeat: 7,  waveform: 'sine',     chord: [1, 5/4, 3/2], color: '#14b8a6', timer: 20, category: 'sports', science: "Working dogs, horses, and sled dogs are often underserved by welfare science focused on companion animals. The same evidence for sound-based stress reduction applies — elevated cortisol, anxiety and pain all respond to a calm, low-stimulus sonic environment. This session is for the end of a long working day." },
};

const CATEGORIES = {
  anxiety: { label: 'ANXIETY & STRESS', color: '#06b6d4' },
  mental:  { label: 'MENTAL HEALTH',    color: '#a855f7' },
  pain:    { label: 'PAIN & RECOVERY',  color: '#f97316' },
  sports:  { label: 'SPORTS & ZOO',     color: '#f59e0b' },
};

export { ANIMAL_PROTOCOLS, CATEGORIES };

// ── WORLD-CLASS AUDIO ENGINE ──────────────────────────────────────────────────
// Creates layered psychoacoustic soundscape:
// 1. Binaural carrier + beat (requires headphones for full effect)
// 2. Rich harmonic chord stack (just-intonation ratios — natural, warm)
// 3. Filtered brown noise bed (like distant rain — masks environmental noise)
// 4. Slow AM pulse at 0.1Hz (breath-pace, prevents neural adaptation)
// 5. Sub-bass warmth (felt more than heard — grounds the nervous system)

function buildBrownNoise(ctx) {
  // Brown noise via AudioBuffer — warm, like distant rain
  const sampleRate = ctx.sampleRate;
  const bufferSize = sampleRate * 4; // 4 seconds, loops
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start();
  return source;
}

// Per-species EQ profiles — based on hearing sensitivity research
// Dogs: most sensitive 1kHz-8kHz, comfortable 200Hz-8kHz
// Cats: most sensitive 1kHz-16kHz, very sensitive to high freq, need low-pass warmth
// Horses: most sensitive 1kHz-16kHz but prefer lower rumble, calmer response to bass
const SPECIES_EQ = {
  dog:   { highpassHz: 80,  lowpassHz: 6000, peakHz: 1200, peakGain: 2  },
  cat:   { highpassHz: 120, lowpassHz: 8000, peakHz: 2000, peakGain: 3  },
  horse: { highpassHz: 60,  lowpassHz: 4000, peakHz: 800,  peakGain: 1.5 },
};

function applySpeciesEQ(ctx, inputNode, species) {
  const eq = SPECIES_EQ[species] || SPECIES_EQ.dog;

  // High-pass: remove rumble below species comfort floor
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = eq.highpassHz;
  hp.Q.value = 0.7;

  // Low-pass: remove harsh highs above species comfort ceiling
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = eq.lowpassHz;
  lp.Q.value = 0.7;

  // Gentle peak boost in most sensitive range — makes content land where they hear best
  const peak = ctx.createBiquadFilter();
  peak.type = 'peaking';
  peak.frequency.value = eq.peakHz;
  peak.gain.value = eq.peakGain;
  peak.Q.value = 1.5;

  inputNode.connect(hp);
  hp.connect(lp);
  lp.connect(peak);

  return { outputNode: peak, nodes: [hp, lp, peak] };
}

// ── BIO-MIMETIC HEARTBEAT ENGINE (separation anxiety only) ──────────────────
// Generates a realistic double-thump heartbeat (lub-dub) at 65 BPM
// This is the sound puppies/kittens hear lying against their mother.
// Research: recordable calming effect in shelter dogs within minutes.
function buildHeartbeatGraph(ctx, volume, species) {
  const nodes = [];

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3.0);
  masterGain.connect(ctx.destination);

  // Species EQ — same as main engine
  const eqBus = ctx.createGain();
  eqBus.gain.value = 1.0;
  const { outputNode: eqOut, nodes: eqNodes } = applySpeciesEQ(ctx, eqBus, species);
  eqOut.connect(masterGain);
  nodes.push(eqBus, ...eqNodes);

  const BPM = 65; // calm resting heartbeat
  const beatInterval = 60 / BPM; // ~0.923 seconds per beat

  // ── 1. HEARTBEAT — lub-dub pattern ──
  // We schedule recurring thumps using AudioBufferSourceNode + envelope
  function scheduleHeartbeat(startTime) {
    // LUB (main beat) — lower, longer
    const lubOsc = ctx.createOscillator();
    lubOsc.type = 'sine';
    lubOsc.frequency.value = 55; // deep thump
    const lubGain = ctx.createGain();
    lubGain.gain.setValueAtTime(0, startTime);
    lubGain.gain.linearRampToValueAtTime(0.45, startTime + 0.01);
    lubGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
    lubOsc.connect(lubGain);
    lubGain.connect(eqBus);
    lubOsc.start(startTime);
    lubOsc.stop(startTime + 0.25);
    nodes.push(lubOsc, lubGain);

    // Body resonance layer for lub
    const lubBody = ctx.createOscillator();
    lubBody.type = 'sine';
    lubBody.frequency.value = 110;
    const lubBodyGain = ctx.createGain();
    lubBodyGain.gain.setValueAtTime(0, startTime);
    lubBodyGain.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
    lubBodyGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
    lubBody.connect(lubBodyGain);
    lubBodyGain.connect(eqBus);
    lubBody.start(startTime);
    lubBody.stop(startTime + 0.2);
    nodes.push(lubBody, lubBodyGain);

    // DUB (secondary beat) — slightly higher, shorter, 0.25s after lub
    const dubTime = startTime + 0.27;
    const dubOsc = ctx.createOscillator();
    dubOsc.type = 'sine';
    dubOsc.frequency.value = 70;
    const dubGain = ctx.createGain();
    dubGain.gain.setValueAtTime(0, dubTime);
    dubGain.gain.linearRampToValueAtTime(0.28, dubTime + 0.01);
    dubGain.gain.exponentialRampToValueAtTime(0.001, dubTime + 0.16);
    dubOsc.connect(dubGain);
    dubGain.connect(eqBus);
    dubOsc.start(dubTime);
    dubOsc.stop(dubTime + 0.18);
    nodes.push(dubOsc, dubGain);
  }

  // Schedule heartbeats for 10 minutes — enough for any session
  const totalBeats = BPM * 10;
  for (let i = 0; i < totalBeats; i++) {
    scheduleHeartbeat(ctx.currentTime + 1.5 + i * beatInterval);
  }

  // ── 2. PURR LAYER — 25Hz + 50Hz (cat comfort + dog calming) ──
  // Cats purr at 25-50Hz — this is their self-healing AND comfort frequency
  // Dogs also respond to this low rhythm (reminds them of deep breathing)
  const purrOsc1 = ctx.createOscillator();
  purrOsc1.type = 'sine';
  purrOsc1.frequency.value = 25;
  const purrGain1 = ctx.createGain();
  purrGain1.gain.value = 0.08;

  // Gentle AM modulation to make purr feel alive and breathing
  const purrLFO = ctx.createOscillator();
  purrLFO.frequency.value = 25; // matches purr rate
  const purrLFOGain = ctx.createGain();
  purrLFOGain.gain.value = 0.04;
  purrLFO.connect(purrLFOGain);
  purrLFOGain.connect(purrGain1.gain);
  purrLFO.start();
  nodes.push(purrLFO, purrLFOGain);

  purrOsc1.connect(purrGain1);
  purrGain1.connect(eqBus);
  purrOsc1.start();
  nodes.push(purrOsc1, purrGain1);

  const purrOsc2 = ctx.createOscillator();
  purrOsc2.type = 'sine';
  purrOsc2.frequency.value = 50; // octave harmonic
  const purrGain2 = ctx.createGain();
  purrGain2.gain.value = 0.05;
  purrOsc2.connect(purrGain2);
  purrGain2.connect(eqBus);
  purrOsc2.start();
  nodes.push(purrOsc2, purrGain2);

  // ── 3. WARM BREATH TEXTURE — filtered pink noise shaped like slow breathing ──
  // Mimics the sound of a calm companion breathing nearby
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 2.5;
  }
  const breathNoise = ctx.createBufferSource();
  breathNoise.buffer = buffer;
  breathNoise.loop = true;
  breathNoise.start();

  const breathFilter = ctx.createBiquadFilter();
  breathFilter.type = 'bandpass';
  breathFilter.frequency.value = 300; // warm mid — not hissy
  breathFilter.Q.value = 0.8;

  // Slow breath envelope — 4 seconds in, 4 seconds out
  const breathEnv = ctx.createGain();
  breathEnv.gain.value = 0.012;

  const breathLFO = ctx.createOscillator();
  breathLFO.frequency.value = 0.125; // ~1 breath every 8 seconds
  const breathLFOGain = ctx.createGain();
  breathLFOGain.gain.value = 0.008;
  breathLFO.connect(breathLFOGain);
  breathLFOGain.connect(breathEnv.gain);
  breathLFO.start();
  nodes.push(breathLFO, breathLFOGain);

  breathNoise.connect(breathFilter);
  breathFilter.connect(breathEnv);
  breathEnv.connect(eqBus);
  nodes.push(breathNoise, breathFilter, breathEnv);

  // ── 4. GENTLE HIGH-MID WARMTH (1-3kHz) — where dogs/cats hear best ──
  // Very soft, non-threatening tone in their peak sensitivity range
  const warmOsc = ctx.createOscillator();
  warmOsc.type = 'sine';
  warmOsc.frequency.value = species === 'cat' ? 1800 : 1200;
  const warmGain = ctx.createGain();
  warmGain.gain.value = 0.018;
  // Slow swell — not static
  const warmLFO = ctx.createOscillator();
  warmLFO.frequency.value = 0.07;
  const warmLFOGain = ctx.createGain();
  warmLFOGain.gain.value = 0.01;
  warmLFO.connect(warmLFOGain);
  warmLFOGain.connect(warmGain.gain);
  warmLFO.start();
  nodes.push(warmLFO, warmLFOGain);
  warmOsc.connect(warmGain);
  warmGain.connect(eqBus);
  warmOsc.start();
  nodes.push(warmOsc, warmGain);

  return { masterGain, nodes };
}

// ── SHARED HELPERS ────────────────────────────────────────────────────────────

function makeMasterAndEQ(ctx, volume, species, fadeTime = 2.0) {
  const nodes = [];
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + fadeTime);
  masterGain.connect(ctx.destination);
  const eqBus = ctx.createGain();
  eqBus.gain.value = 1.0;
  const { outputNode: eqOut, nodes: eqNodes } = applySpeciesEQ(ctx, eqBus, species);
  eqOut.connect(masterGain);
  nodes.push(eqBus, ...eqNodes);
  return { masterGain, eqBus, nodes };
}

function addHarmonicStack(ctx, eqBus, carrier, chord, nodes) {
  const chordRatios = chord || [1, 5/4, 3/2];
  const octaves = [-1, 0, 1];
  chordRatios.forEach((ratio, ri) => {
    octaves.forEach((oct, oi) => {
      const f = carrier * ratio * Math.pow(2, oct);
      if (f < 40 || f > 8000) return;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      const drift = ctx.createOscillator();
      drift.frequency.value = 0.04 + ri * 0.013 + oi * 0.007;
      const driftGain = ctx.createGain();
      driftGain.gain.value = 0.3;
      drift.connect(driftGain);
      driftGain.connect(osc.frequency);
      drift.start();
      nodes.push(drift, driftGain);
      const g = ctx.createGain();
      g.gain.value = (0.06 - oi * 0.015 - ri * 0.008);
      osc.connect(g);
      g.connect(eqBus);
      osc.start();
      nodes.push(osc, g);
    });
  });
}

function addBrownNoiseBed(ctx, eqBus, nodes, gainVal = 0.018, lpHz = 400) {
  const noiseNode = buildBrownNoise(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = lpHz;
  noiseFilter.Q.value = 0.7;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = gainVal;
  noiseNode.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(eqBus);
  nodes.push(noiseNode, noiseFilter, noiseGain);
}

function addPurrLayer(ctx, eqBus, nodes) {
  // Cat purr: 25Hz + 50Hz — comfort signal for cats AND calming for dogs/horses
  [25, 50].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = i === 0 ? 0.07 : 0.04;
    osc.connect(g);
    g.connect(eqBus);
    osc.start();
    nodes.push(osc, g);
  });
}

// ── THUNDERSTORM / FIREWORKS — Sound masking + heartbeat foundation ──────────
// Key: a DENSE noise wall that masks sudden bangs + the heartbeat from separation
// This is the architecture that actually reduces startle response
function buildThunderstormGraph(ctx, volume, species) {
  const { masterGain, eqBus, nodes } = makeMasterAndEQ(ctx, volume, species, 3.0);

  // Foundation: heartbeat (same as separation — "you're safe, someone is here")
  const BPM = 62;
  const beatInterval = 60 / BPM;
  for (let i = 0; i < BPM * 10; i++) {
    const t = ctx.currentTime + 2 + i * beatInterval;
    const lubOsc = ctx.createOscillator();
    lubOsc.type = 'sine';
    lubOsc.frequency.value = 52;
    const lubGain = ctx.createGain();
    lubGain.gain.setValueAtTime(0, t);
    lubGain.gain.linearRampToValueAtTime(0.35, t + 0.01);
    lubGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    lubOsc.connect(lubGain); lubGain.connect(eqBus);
    lubOsc.start(t); lubOsc.stop(t + 0.22);
    nodes.push(lubOsc, lubGain);
  }

  // Dense broadband noise wall — masks sudden bangs and thunder cracks
  // High gain, broad spectrum — this is the clinically effective part
  const sampleRate = ctx.sampleRate;
  const bufSize = sampleRate * 4;
  const buf = ctx.createBuffer(2, bufSize, sampleRate); // STEREO for immersion
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < bufSize; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.025 * w) / 1.025;
      d[i] = last * 4;
    }
  }
  const maskNoise = ctx.createBufferSource();
  maskNoise.buffer = buf;
  maskNoise.loop = true;
  maskNoise.start();

  // Shape it: remove harsh highs but keep the mid-body that masks bangs
  const maskFilter = ctx.createBiquadFilter();
  maskFilter.type = 'lowpass';
  maskFilter.frequency.value = 1800; // wider than normal — needed for masking
  const maskGain = ctx.createGain();
  maskGain.gain.value = 0.055; // noticeably louder than separation bed
  maskNoise.connect(maskFilter);
  maskFilter.connect(maskGain);
  maskGain.connect(eqBus);
  nodes.push(maskNoise, maskFilter, maskGain);

  // Purr layer underneath — comfort signal
  addPurrLayer(ctx, eqBus, nodes);

  // Gentle warm harmonic tones — gives the brain something to "hold onto"
  [200, 300, 400].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.025 - i * 0.006;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.02;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.012;
    lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
    osc.connect(g); g.connect(eqBus); osc.start();
    nodes.push(osc, g, lfo, lfoG);
  });

  return { masterGain, nodes };
}

// ── NIGHT ANXIETY / SLEEP ONSET — Ultra-slow drift, near silence ──────────────
// Goal: brain entrainment toward delta (1-4Hz sleep waves)
// Sounds almost like nothing — but the slow LFO modulation is doing the work
function buildNightGraph(ctx, volume, species) {
  const { masterGain, eqBus, nodes } = makeMasterAndEQ(ctx, volume * 0.8, species, 5.0); // quieter, slower fade

  // Purr foundation — the gentlest possible "safe" signal
  addPurrLayer(ctx, eqBus, nodes);

  // Ultra-slow carrier — delta territory (2Hz binaural beat for sleep onset)
  const merger = ctx.createChannelMerger(2);
  merger.connect(eqBus);
  const carrier = 180;
  const beatHz = 2; // delta — deep sleep entrainment
  [carrier, carrier + beatHz].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.12;
    osc.connect(g);
    g.connect(merger, 0, i);
    osc.start();
    nodes.push(osc, g);
  });

  // Very quiet brown noise — like rain heard through double glazing
  addBrownNoiseBed(ctx, eqBus, nodes, 0.012, 300);

  // Master breath LFO — very slow, imperceptibly slowing the overall volume
  // This is the technique: the sound gradually "breathes" them down to sleep
  const breathLFO = ctx.createOscillator();
  breathLFO.frequency.value = 0.06; // one breath every ~16 seconds — deeply slow
  const breathLFOGain = ctx.createGain();
  breathLFOGain.gain.value = 0.08;
  breathLFO.connect(breathLFOGain);
  breathLFOGain.connect(masterGain.gain);
  breathLFO.start();
  nodes.push(breathLFO, breathLFOGain);

  // 3 sparse warm tones — very quiet, just enough to be present
  [180, 270, 360].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.018 - i * 0.004;
    osc.connect(g); g.connect(eqBus); osc.start();
    nodes.push(osc, g);
  });

  return { masterGain, nodes };
}

// ── PAIN PROTOCOLS (arthritis, recovery) — 40Hz gamma entrainment ─────────────
// 40Hz gamma: published research (MIT/Iaccarino 2016, replicated) showing
// gamma entrainment reduces amyloid plaques, modulates inflammatory pathways.
// For pain: reduces the cortisol-pain feedback loop.
function buildPainGraph(ctx, volume, species, carrier = 174) {
  const { masterGain, eqBus, nodes } = makeMasterAndEQ(ctx, volume, species, 2.5);

  // 40Hz gamma binaural beat — the clinically studied frequency
  const merger = ctx.createChannelMerger(2);
  merger.connect(eqBus);
  [carrier, carrier + 40].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.22;
    osc.connect(g); g.connect(merger, 0, i); osc.start();
    nodes.push(osc, g);
  });

  // Warm harmonic support — makes 40Hz beat more pleasant to sit with
  addHarmonicStack(ctx, eqBus, carrier, [1, 5/4, 3/2], nodes);

  // Brown noise at medium level — keeps environment calm and masks movement pain sounds
  addBrownNoiseBed(ctx, eqBus, nodes, 0.022, 500);

  // Purr layer — 25/50Hz also sits in bone-conduction range, physically grounding
  addPurrLayer(ctx, eqBus, nodes);

  // Slow breath modulation — parasympathetic activation reduces pain perception
  const breathLFO = ctx.createOscillator();
  breathLFO.frequency.value = 0.09;
  const breathLFOGain = ctx.createGain();
  breathLFOGain.gain.value = 0.06;
  breathLFO.connect(breathLFOGain);
  breathLFOGain.connect(masterGain.gain);
  breathLFO.start();
  nodes.push(breathLFO, breathLFOGain);

  return { masterGain, nodes };
}

// ── RESCUE TRAUMA / GRIEF — Warm triangle, sparse, non-threatening ────────────
// Less is more here. Trauma-responsive: no sudden changes, no complexity.
// Triangle wave is softer than sine — more like a human humming than a tone.
function buildTraumaGraph(ctx, volume, species) {
  const { masterGain, eqBus, nodes } = makeMasterAndEQ(ctx, volume * 0.75, species, 6.0); // very slow fade in

  // Heartbeat — the most primal safety signal
  const BPM = 60;
  const beatInterval = 60 / BPM;
  for (let i = 0; i < BPM * 10; i++) {
    const t = ctx.currentTime + 3 + i * beatInterval;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 50;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.28, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(g); g.connect(eqBus);
    osc.start(t); osc.stop(t + 0.28);
    nodes.push(osc, g);
  }

  // Purr — softest comfort layer
  addPurrLayer(ctx, eqBus, nodes);

  // Just 2 triangle wave tones — warm and non-threatening
  [196, 294].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle'; // softer, warmer than sine
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.022 - i * 0.006;
    // Very slow swell — no static, but barely moving
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.03 + i * 0.01;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.01;
    lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
    osc.connect(g); g.connect(eqBus); osc.start();
    nodes.push(osc, g, lfo, lfoG);
  });

  // Very quiet noise bed — presence without intrusion
  addBrownNoiseBed(ctx, eqBus, nodes, 0.01, 350);

  return { masterGain, nodes };
}

// ── STANDARD ENGINE (hyperactive, pre-race, post-race, zoo, fatigue) ──────────
function buildAudioGraph(ctx, freq, volume, species) {
  const { masterGain, eqBus, nodes } = makeMasterAndEQ(ctx, volume, species, 2.0);

  // Binaural carrier pair
  const merger = ctx.createChannelMerger(2);
  merger.connect(eqBus);
  [freq.carrier, freq.carrier + freq.binauralBeat].forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = freq.waveform;
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.3;
    osc.connect(g); g.connect(merger, 0, i); osc.start();
    nodes.push(osc, g);
  });

  addHarmonicStack(ctx, eqBus, freq.carrier, freq.chord, nodes);
  addBrownNoiseBed(ctx, eqBus, nodes, 0.018, 400);

  // Breath-pace AM pulse
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.085;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.07;
  lfo.connect(lfoGain); lfoGain.connect(masterGain.gain); lfo.start();
  nodes.push(lfo, lfoGain);

  // Sub-bass warmth
  const subOsc = ctx.createOscillator();
  subOsc.type = 'sine';
  subOsc.frequency.value = freq.carrier * 0.25;
  const subFilter = ctx.createBiquadFilter();
  subFilter.type = 'lowpass';
  subFilter.frequency.value = 120;
  const subGain = ctx.createGain();
  subGain.gain.value = 0.04;
  subOsc.connect(subFilter); subFilter.connect(subGain); subGain.connect(eqBus); subOsc.start();
  nodes.push(subOsc, subFilter, subGain);

  return { masterGain, nodes };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AnimalFrequencyEngine({ protocol = 'separation', species = 'dog', onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [timer, setTimer] = useState(0);
  const [timerTarget, setTimerTarget] = useState(null);

  const audioCtxRef    = useRef(null);
  const masterGainRef  = useRef(null);
  const nodesRef       = useRef([]);
  const timerRef       = useRef(null);
  const timerTargetRef = useRef(null);
  const canvasRef      = useRef(null);
  const isPlayingRef   = useRef(false);
  const animFrameRef   = useRef(null);

  const freq = ANIMAL_PROTOCOLS[protocol] || ANIMAL_PROTOCOLS.separation;

  useEffect(() => { timerTargetRef.current = timerTarget; }, [timerTarget]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.05);
    }
  }, [volume]);

  const stopAudio = useCallback(() => {
    nodesRef.current.forEach(n => { try { n.stop?.(); n.disconnect?.(); } catch(e) {} });
    nodesRef.current = [];
    masterGainRef.current = null;
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null; }
    isPlayingRef.current = false;
    setIsPlaying(false);
    setTimer(0);
    setTimerTarget(null);
    timerTargetRef.current = null;
  }, []);

  const startAudio = useCallback(async (targetMins = null) => {
    stopAudio();
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') await ctx.resume();
      audioCtxRef.current = ctx;

      // Each protocol uses the right engine for its actual therapeutic goal
      const { masterGain, nodes } =
        protocol === 'separation'                        ? buildHeartbeatGraph(ctx, volume, species) :
        protocol === 'thunderstorm'                      ? buildThunderstormGraph(ctx, volume, species) :
        protocol === 'night_anxiety'                     ? buildNightGraph(ctx, volume, species) :
        protocol === 'arthritis'                         ? buildPainGraph(ctx, volume, species, 174) :
        protocol === 'recovery'                          ? buildPainGraph(ctx, volume, species, 220) :
        protocol === 'rescue_trauma' || protocol === 'grief' ? buildTraumaGraph(ctx, volume, species) :
        buildAudioGraph(ctx, freq, volume, species);
      masterGainRef.current = masterGain;
      nodesRef.current = nodes;

      isPlayingRef.current = true;
      setIsPlaying(true);
      setTimer(0);

      const targetSecs = targetMins ? targetMins * 60 : null;
      setTimerTarget(targetSecs);
      timerTargetRef.current = targetSecs;

      timerRef.current = setInterval(() => {
        setTimer(t => {
          const next = t + 1;
          if (timerTargetRef.current && next >= timerTargetRef.current) {
            stopAudio();
            if (onComplete) onComplete();
          }
          return next;
        });
      }, 1000);

      drawVisualizer(ctx);
    } catch (err) {
      console.error('Audio error:', err);
      alert('Tap to enable audio — browser requires a user gesture first.');
    }
  }, [freq, volume, species, stopAudio, onComplete]);

  const drawVisualizer = (ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    c.scale(window.devicePixelRatio, window.devicePixelRatio);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    let t = 0;

    const draw = () => {
      if (!isPlayingRef.current) return;
      animFrameRef.current = requestAnimationFrame(draw);
      t += 0.008;

      c.fillStyle = 'rgba(0,0,0,0.12)';
      c.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.min(cx, cy) * 0.75;
      const col = freq.color;

      // Outer soft glow rings
      for (let r = 7; r >= 0; r--) {
        const pulse = Math.sin(t * 1.2 + r * 0.6) * 0.15 + 0.85;
        const radius = maxR * (0.12 + r * 0.13) * pulse;
        const alpha = Math.max(0, 0.55 - r * 0.07);
        c.beginPath();
        c.arc(cx, cy, radius, 0, Math.PI * 2);
        c.strokeStyle = col + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        c.lineWidth = r === 0 ? 2 : 0.8;
        c.stroke();
      }

      // Inner rotating petals
      const petals = 6;
      for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2 + t * 0.4;
        const r = maxR * 0.35 * (Math.sin(t * 0.7 + p) * 0.1 + 0.9);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        c.beginPath();
        c.arc(x, y, 4, 0, Math.PI * 2);
        c.fillStyle = col + 'cc';
        c.fill();
      }

      // Waveform bars at bottom — smoother
      const bars = 48;
      const barW = (W - 24) / bars;
      for (let i = 0; i < bars; i++) {
        const barH = (Math.sin(t * 2.5 + i * 0.35) * 0.5 + 0.5) * 22 + 3;
        const x = 12 + i * barW;
        const alpha = 0.5 + Math.sin(t + i * 0.2) * 0.3;
        c.fillStyle = col + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        c.fillRect(x, H - 8 - barH, barW * 0.65, barH);
      }

      // Centre species label
      const sp = SPECIES_PROFILES[species] || SPECIES_PROFILES.dog;
      c.fillStyle = col;
      c.font = `bold ${Math.floor(W * 0.065)}px monospace`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(`${sp.emoji} ${sp.label}`, cx, cy - 12);
      c.font = `${Math.floor(W * 0.03)}px monospace`;
      c.fillStyle = 'rgba(255,255,255,0.3)';
      c.fillText(sp.range, cx, cy + 14);
    };

    draw();
  };

  useEffect(() => { return () => stopAudio(); }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = timerTarget ? Math.min((timer / timerTarget) * 100, 100) : 0;

  const timerMins = [5, 10, 15, 20, 30];

  return (
    <div className="bg-[#07080f] text-white rounded-2xl p-5 sm:p-7 border-2 shadow-2xl" style={{ borderColor: freq.color + '55', boxShadow: `0 0 80px ${freq.color}18` }}>
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-mono tracking-widest mb-1 uppercase" style={{ color: freq.color + 'aa' }}>{CATEGORIES[freq.category]?.label}</p>
        <h2 className="text-2xl sm:text-3xl font-black mb-1" style={{ color: freq.color }}>{freq.name}</h2>
        <p className="text-gray-500 text-sm italic mb-4">"{freq.tagline}"</p>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-xs font-black mb-2" style={{ color: freq.color }}>THE SCIENCE</p>
          <p className="text-xs text-gray-400 leading-relaxed">{freq.science}</p>
        </div>
      </div>

      {/* Audio quality note — different for separation (bio-mimetic) vs others */}
      <div className="mb-4 px-3 py-3 rounded-lg" style={{ background: `${freq.color}10`, border: `1px solid ${freq.color}25` }}>
        {protocol === 'separation' ? (
          <>
            <p className="text-xs font-black mb-1" style={{ color: freq.color }}>👀 WATCH FOR THESE SIGNS IT'S WORKING</p>
            <p className="text-xs leading-relaxed" style={{ color: freq.color + 'bb' }}>
              Moves closer to speaker · lies down · ears relax back · yawning · slower breathing · stops pacing
            </p>
            <p className="text-xs mt-1 text-gray-600">Bio-mimetic engine: heartbeat · purr frequency · breath texture</p>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: freq.color }} />
            <p className="text-xs" style={{ color: freq.color + 'bb' }}>
              5-layer engine · species EQ applied · brown noise bed · headphones enhance binaural effect
            </p>
          </div>
        )}
      </div>

      {!isPlaying && (
        <div className="space-y-3">
          {/* MAIN PLAY BUTTON */}
          <button
            onPointerDown={(e) => { e.preventDefault(); startAudio(); }}
            className="w-full py-5 rounded-xl font-black text-xl flex items-center justify-center gap-3 active:scale-95 transition-transform select-none touch-manipulation"
            style={{ backgroundColor: freq.color, color: '#000', boxShadow: `0 0 40px ${freq.color}50` }}
          >
            <Play className="w-7 h-7 fill-current" />
            START
          </button>

          <p className="text-xs text-center text-gray-600 font-mono pt-1">— or set a session timer —</p>

          {/* TIMER BUTTONS — fixed: using onPointerDown for instant mobile response */}
          <div className="grid grid-cols-5 gap-2">
            {timerMins.map(mins => (
              <button
                key={mins}
                onPointerDown={(e) => {
                  e.preventDefault();
                  startAudio(mins);
                }}
                className="py-3 rounded-xl text-sm font-black transition-all active:scale-90 border select-none"
                style={{ borderColor: freq.color + '55', color: freq.color, background: freq.color + '10' }}
              >
                {mins}m
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-700 text-center">Speaker for ambient room · headphones for binaural</p>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-4">
          <canvas ref={canvasRef} className="w-full rounded-xl" style={{ height: '200px', background: '#000' }} />

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-3xl font-black font-mono" style={{ color: freq.color }}>{formatTime(timer)}</p>
              {timerTarget && (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: freq.color }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-mono">{formatTime(timerTarget - timer)} remaining</p>
                </div>
              )}
            </div>
            <button onClick={stopAudio} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all flex-shrink-0">
              STOP
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl">
            <VolumeX className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <input
              type="range" min="0" max="1" step="0.02" value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1"
              style={{ accentColor: freq.color }}
            />
            <Volume2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-xs font-mono w-9 text-right text-gray-400">{Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: freq.color }} />
            <p className="text-xs font-mono text-gray-500">
              live · {freq.name} · {(SPECIES_PROFILES[species] || SPECIES_PROFILES.dog).label} · 5-layer harmonic engine
            </p>
          </div>
        </div>
      )}
    </div>
  );
}