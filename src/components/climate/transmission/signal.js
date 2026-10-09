// Generative signal — runs the console whenever no real track is loaded.
// Fills typed arrays in place so nothing is allocated per frame.
export const BPM = 60; // a heartbeat, not a dance floor
const BEAT_MS = 60000 / BPM;
const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

// energy 0 = quiet carrier breathing · energy 1 = full four-on-the-floor
export function fillSynthFreq(out, t, energy) {
  const n = out.length;
  const pos = (t % (BEAT_MS * 4)) / BEAT_MS;
  const frac = pos % 1;
  const bassPat = [1, 0, 0.45, 0][Math.floor(pos) % 4]; // lub-dub
  for (let i = 0; i < n; i++) {
    const idle = 9 + Math.sin(t * 0.0008 + i * 0.07) * 5 + Math.sin(t * 0.0003 - i * 0.2) * 5 * Math.exp(-i / 40);
    let v = idle * (1 - energy * 0.7);
    if (energy > 0.01) {
      let p = Math.exp(-frac * 4) * 180 * Math.exp(-i / 6); // softer, longer heartbeat envelope
      p += bassPat * Math.exp(-frac * 2) * 70 * Math.exp(-i / 18) * (1 + Math.sin(t * 0.0015) * 0.15);
      p += Math.exp(-Math.pow((frac - 0.5) * 10, 2)) * 60 * (i / n);
      p += (Math.sin(t * 0.0003 + i * 0.03) * 0.5 + 0.5) * 24 * Math.exp(-Math.abs(i - 24) / 18); // slow mid breath
      p += (Math.sin(t * 0.001 + i * 0.31) * 0.5 + 0.5) * 50 * Math.exp(-Math.abs(i - 46) / 28);
      p += (Math.sin(t * 0.0025 - i * 0.5) * 0.5 + 0.5) * 28 * (i / n) * (0.5 + 0.5 * Math.exp(-frac * 3));
      p += Math.random() * 7;
      v += p * energy;
    }
    out[i] = clamp(v);
  }
}

export function fillSynthWave(out, t, energy) {
  const n = out.length;
  const frac = ((t % (BEAT_MS * 4)) / BEAT_MS) % 1;
  const kick = Math.exp(-frac * 6);
  for (let i = 0; i < n; i++) {
    const x = (i / n) * Math.PI * 2;
    let v = Math.sin(x * 3 + t * 0.003) * 0.12;
    v += energy * (
      Math.sin(x * 5 - t * 0.008) * 0.28 * (0.5 + kick) +
      Math.sin(x * 17 + t * 0.013) * 0.14 +
      Math.sin(x * 2 + t * 0.002) * 0.2 * kick
    );
    out[i] = clamp(128 + v * 127);
  }
}