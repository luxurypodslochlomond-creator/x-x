// Scope (live waveform) + waterfall (scrolling spectrogram) strips under the stage.
const BONE = '239,231,214';
const SIG = '226,96,42';

export function drawScope(ctx, w, h, wave, E) {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = `rgba(${BONE},0.07)`; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += w / 12) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
  ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
  ctx.stroke();

  const n = wave.length, mid = h / 2, gain = (h * 0.45) / 128 * 1.8;
  const trace = (sign) => {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * w;
      const y = Math.max(2, Math.min(h - 2, mid + sign * (wave[i] - 128) * gain));
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };
  ctx.strokeStyle = `rgba(${BONE},0.22)`; ctx.lineWidth = 1;
  trace(-1);
  ctx.shadowColor = `rgba(${SIG},1)`; ctx.shadowBlur = 8;
  ctx.strokeStyle = `rgba(${SIG},${0.65 + E * 0.35})`; ctx.lineWidth = 1.6;
  trace(1);
  ctx.shadowBlur = 0;
}

// ink -> deep green -> signal -> bone
function heat(v) {
  if (v < 0.35) { const k = v / 0.35; return [20 + 10 * k, 18 + 72 * k, 16 + 44 * k]; }
  if (v < 0.7) { const k = (v - 0.35) / 0.35; return [30 + 196 * k, 90 + 6 * k, 60 - 18 * k]; }
  const k = (v - 0.7) / 0.3;
  return [226 + 13 * k, 96 + 135 * k, 42 + 172 * k];
}

export function pushWaterfall(ctx, freq, W, H) {
  ctx.putImageData(ctx.getImageData(0, 0, W, H - 1), 0, 1);
  for (let x = 0; x < W; x++) {
    const bin = Math.min(127, Math.floor(Math.pow(x / W, 1.5) * 127));
    const [r, g, b] = heat(Math.min(1, (freq[bin] / 255) * (1 + (x / W) * 0.8)));
    ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
    ctx.fillRect(x, 0, 1, 1);
  }
}