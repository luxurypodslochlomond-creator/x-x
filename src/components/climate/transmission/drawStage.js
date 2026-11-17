import { BPM } from './signal';

// ── THE STAGE ──
// A dot-matrix planet whose continents ride the spectrum, ringed by a mirrored
// equaliser, swept by radar, rippling outward on every kick, orbited by satellites,
// flanked by hardware VU meters. Beadie Signal palette: ink · bone · signal · green.
const TAU = Math.PI * 2;
const BONE = '239,231,214';
const SIG = '255,212,71';
const GRN = '79,154,115';
const RED = '179,38,30';
const BARS = 96;
const ORBIT = 0.9;
const FONT = '700 9px "Record UI", Helvetica, Arial, sans-serif';

const SATS = [
  { sp: 0.00055, rx: 0.98, ry: 0.34, tilt: 0.5, col: SIG, label: 'SAT-51' },
  { sp: -0.0004, rx: 0.86, ry: 0.28, tilt: -0.7, col: BONE },
  { sp: 0.0008, rx: 1.0, ry: 0.52, tilt: 1.9, col: GRN },
];

// Fibonacci-sphere points with pseudo-continents (land lifts with the music)
const PTS = (() => {
  const n = 560;
  const ga = Math.PI * (3 - Math.sqrt(5));
  const out = [];
  for (let i = 0; i < n; i++) {
    const sl = 1 - (i / (n - 1)) * 2;
    const lat = Math.asin(sl);
    const lon = (((ga * i) % TAU) + TAU) % TAU;
    const land = Math.sin(lon * 1.7 + 0.8) * Math.cos(lat * 2.1) + Math.sin(lon * 3.3 - lat * 1.4) * 0.6 + Math.cos(lon * 0.9 + lat * 3.1) * 0.4 > 0.55;
    out.push({ lon, sl, cl: Math.cos(lat), land });
  }
  return out;
})();

const level = (freq, k, n) => Math.min(1, (freq[Math.min(127, Math.floor(Math.pow(k / n, 1.5) * 110))] / 255) * (1 + (k / n) * 0.7));
const avg = (freq, a, b) => { let s = 0; for (let i = a; i < b; i++) s += freq[i]; return s / (b - a) / 255; };

export function createStageState() {
  return {
    energy: 0, rot: 0, sweep: 0, flash: 0, smoothBass: 0, bassAvg: 0.2,
    lastKick: 0, lastPing: 0, ripples: [], tears: [],
    peaks: new Float32Array(BARS), bands: new Float32Array(40),
    satA: [0, 2.1, 4.0], vuL: 0, vuR: 0, pkL: 0, pkR: 0,
  };
}

// Static layer (dot grid, rings, orbits, compass bezel) — drawn once per resize
export function buildGrid(w, h, dpr) {
  const c = document.createElement('canvas');
  c.width = w * dpr; c.height = h * dpr;
  const g = c.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cx = w / 2, cy = h / 2, maxR = Math.min(w, h) / 2 - 44;
  g.fillStyle = `rgba(${BONE},0.07)`;
  for (let x = 12; x < w; x += 24) for (let y = 12; y < h; y += 24) g.fillRect(x, y, 1, 1);
  g.strokeStyle = `rgba(${BONE},0.07)`; g.lineWidth = 1;
  g.beginPath(); g.moveTo(0, cy); g.lineTo(w, cy); g.moveTo(cx, 0); g.lineTo(cx, h); g.stroke();
  g.setLineDash([2, 5]); g.strokeStyle = `rgba(${BONE},0.14)`;
  [0.33, 0.55, 0.78].forEach((f) => { g.beginPath(); g.arc(cx, cy, maxR * f, 0, TAU); g.stroke(); });
  g.setLineDash([]); g.strokeStyle = `rgba(${SIG},0.12)`;
  SATS.forEach((s) => { g.beginPath(); g.ellipse(cx, cy, maxR * s.rx * ORBIT, maxR * s.ry * ORBIT, s.tilt, 0, TAU); g.stroke(); });
  for (let d = 0; d < 360; d += 5) {
    const a = (d * Math.PI) / 180 - Math.PI / 2;
    const long = d % 30 === 0;
    const r2 = maxR + (long ? 12 : 6);
    g.strokeStyle = long ? `rgba(${SIG},0.85)` : `rgba(${BONE},0.28)`;
    g.beginPath(); g.moveTo(cx + Math.cos(a) * (maxR + 2), cy + Math.sin(a) * (maxR + 2)); g.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); g.stroke();
  }
  g.fillStyle = `rgba(${BONE},0.42)`; g.font = '700 8px "Record UI", Helvetica, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  [['000', 0], ['090', 90], ['180', 180], ['270', 270]].forEach(([t, d]) => {
    const a = (d * Math.PI) / 180 - Math.PI / 2;
    g.fillText(t, cx + Math.cos(a) * (maxR + 19), cy + Math.sin(a) * (maxR + 19));
  });
  return c;
}

function drawGlow(ctx, c) {
  const g = ctx.createRadialGradient(c.cx, c.cy, 0, c.cx, c.cy, c.maxR * 1.15);
  g.addColorStop(0, `rgba(${SIG},${0.1 + c.E * 0.12 + c.bass * 0.12})`);
  g.addColorStop(1, `rgba(${SIG},0)`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.w, c.h);
}

function drawSweep(ctx, c, S) {
  if (!ctx.createConicGradient) return;
  const wedge = 1.1, f = wedge / TAU;
  const g = ctx.createConicGradient(S.sweep - wedge, c.cx, c.cy);
  g.addColorStop(0, `rgba(${SIG},0)`);
  g.addColorStop(f, `rgba(${SIG},${0.12 + c.E * 0.22})`);
  g.addColorStop(Math.min(0.999, f + 0.002), `rgba(${SIG},0)`);
  g.addColorStop(1, `rgba(${SIG},0)`);
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(c.cx, c.cy); ctx.arc(c.cx, c.cy, c.maxR, 0, TAU); ctx.fill();
  ctx.strokeStyle = `rgba(${SIG},${0.3 + c.E * 0.4})`; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(c.cx, c.cy); ctx.lineTo(c.cx + Math.cos(S.sweep) * c.maxR, c.cy + Math.sin(S.sweep) * c.maxR); ctx.stroke();
}

function drawRipples(ctx, c, S) {
  S.ripples = S.ripples.filter((r) => c.now - r.born < 3400); // waves of change travel slow
  S.ripples.forEach((r) => {
    const age = (c.now - r.born) / 3400;
    const rad = c.R * 1.3 + age * (c.maxR - c.R * 1.3);
    ctx.strokeStyle = `rgba(${SIG},${Math.pow(1 - age, 1.5) * 0.5 * r.s})`;
    ctx.lineWidth = 1 + (1 - age) * 2;
    ctx.beginPath(); ctx.arc(c.cx, c.cy, rad, 0, TAU); ctx.stroke();
  });
}

function drawRing(ctx, c, S, freq) {
  const inner = c.R * 1.28, maxLen = c.R * 0.8;
  ctx.strokeStyle = `rgba(${BONE},0.25)`; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(c.cx, c.cy, inner - 4, 0, TAU); ctx.stroke();
  ctx.lineWidth = 2.2;
  for (let i = 0; i < BARS; i++) {
    const k = i < BARS / 2 ? i : BARS - 1 - i;
    const v = level(freq, k, BARS / 2);
    S.peaks[i] = Math.max(v, S.peaks[i] - c.dt * 0.0007);
    const a = (i / BARS) * TAU - Math.PI / 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const len = 2 + v * maxLen;
    ctx.strokeStyle = `rgba(${k < 12 ? GRN : k < 30 ? SIG : BONE},${0.35 + v * 0.65})`;
    ctx.beginPath(); ctx.moveTo(c.cx + ca * inner, c.cy + sa * inner); ctx.lineTo(c.cx + ca * (inner + len), c.cy + sa * (inner + len)); ctx.stroke();
    const pr = inner + 5 + S.peaks[i] * maxLen;
    ctx.fillStyle = `rgba(${BONE},${0.3 + S.peaks[i] * 0.5})`;
    ctx.fillRect(c.cx + ca * pr - 1, c.cy + sa * pr - 1, 2, 2);
  }
}

function drawGlobe(ctx, c, S, freq) {
  const { cx, cy, R, E } = c;
  for (let b = 0; b < 40; b++) S.bands[b] = level(freq, b, 40);
  const atm = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.3);
  atm.addColorStop(0, `rgba(${SIG},${0.22 + E * 0.2})`);
  atm.addColorStop(1, `rgba(${SIG},0)`);
  ctx.fillStyle = atm; ctx.beginPath(); ctx.arc(cx, cy, R * 1.3, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(20,18,16,0.72)';
  ctx.beginPath(); ctx.arc(cx, cy, R * 0.98, 0, TAU); ctx.fill();

  const tilt = 0.38, ct = Math.cos(tilt), st = Math.sin(tilt);
  const pulse = 1 + S.smoothBass * 0.1 * E;
  for (let i = 0; i < PTS.length; i++) {
    const p = PTS[i];
    const lonR = p.lon + S.rot;
    const x = p.cl * Math.sin(lonR), z = p.cl * Math.cos(lonR);
    const y2 = p.sl * ct - z * st, z2 = p.sl * st + z * ct;
    let bump = 0;
    if (p.land) bump = (S.bands[Math.floor((((lonR % TAU) + TAU) % TAU) / TAU * 40)] || 0) * 0.16 * E;
    const rr = R * (pulse + bump);
    const sx = c.cx + x * rr, sy = c.cy - y2 * rr;
    if (z2 < 0) {
      ctx.fillStyle = `rgba(${BONE},0.07)`; ctx.fillRect(sx, sy, 1.2, 1.2);
    } else if (p.land) {
      ctx.fillStyle = `rgba(${bump > 0.05 ? SIG : BONE},${0.65 + z2 * 0.35})`;
      const s = 1.8 + z2 * 1.6; ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
    } else {
      ctx.fillStyle = `rgba(${GRN},${0.3 + z2 * 0.5})`;
      const s = 1.2 + z2 * 1.0; ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
    }
  }
  if (S.flash > 0.02) {
    ctx.strokeStyle = `rgba(${SIG},${S.flash * 0.9})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.04, 0, TAU); ctx.stroke();
  }
}

function satPos(c, s, a) {
  const ex = Math.cos(a) * c.maxR * s.rx * ORBIT, ey = Math.sin(a) * c.maxR * s.ry * ORBIT;
  const ct = Math.cos(s.tilt), st = Math.sin(s.tilt);
  return [c.cx + ex * ct - ey * st, c.cy + ex * st + ey * ct];
}

function drawSats(ctx, c, S) {
  SATS.forEach((s, i) => {
    S.satA[i] += s.sp * c.dt * (1 + c.E);
    for (let j = 14; j >= 1; j--) {
      const [tx, ty] = satPos(c, s, S.satA[i] - j * 0.05 * Math.sign(s.sp));
      ctx.fillStyle = `rgba(${s.col},${(1 - j / 14) * 0.5})`; ctx.fillRect(tx - 1, ty - 1, 2, 2);
    }
    const [x, y] = satPos(c, s, S.satA[i]);
    ctx.fillStyle = `rgba(${s.col},1)`; ctx.fillRect(x - 2, y - 2, 4, 4);
    if (s.label) { ctx.fillStyle = `rgba(${BONE},0.5)`; ctx.font = '700 7px "Record UI", Helvetica, Arial, sans-serif'; ctx.textAlign = 'left'; ctx.fillText(s.label, x + 6, y + 2); }
  });
}

function drawTears(ctx, c, S) {
  S.tears = S.tears.filter((t) => c.now - t.born < 120);
  S.tears.forEach((t) => {
    ctx.fillStyle = `rgba(${SIG},${0.3 * (1 - (c.now - t.born) / 120)})`;
    ctx.fillRect(t.x, t.y, t.w, t.h);
  });
}

function drawVU(ctx, c, S, freq) {
  const segs = 20, top = 60, bot = c.h - 60, segH = (bot - top) / segs, wv = 8;
  const L = Math.min(1, avg(freq, 0, 18) * 1.5), R = Math.min(1, avg(freq, 8, 64) * 2.4);
  S.vuL += (L - S.vuL) * Math.min(1, c.dt * (L > S.vuL ? 0.03 : 0.006));
  S.vuR += (R - S.vuR) * Math.min(1, c.dt * (R > S.vuR ? 0.03 : 0.006));
  S.pkL = Math.max(S.vuL, S.pkL - c.dt * 0.0003);
  S.pkR = Math.max(S.vuR, S.pkR - c.dt * 0.0003);
  [[6, S.vuL, S.pkL], [c.w - 6 - wv, S.vuR, S.pkR]].forEach(([x, v, pk]) => {
    const lit = Math.round(v * segs);
    for (let s = 0; s < segs; s++) {
      const col = s < 12 ? GRN : s < 17 ? SIG : RED;
      ctx.fillStyle = s < lit ? `rgba(${col},0.95)` : `rgba(${BONE},0.07)`;
      ctx.fillRect(x, bot - (s + 1) * segH + 1, wv, segH - 2);
    }
    const ps = Math.min(segs - 1, Math.floor(pk * segs));
    ctx.fillStyle = `rgba(${BONE},0.85)`; ctx.fillRect(x, bot - (ps + 1) * segH + 1, wv, 2);
  });
  ctx.font = '700 7px "Record UI", Helvetica, Arial, sans-serif'; ctx.fillStyle = `rgba(${BONE},0.4)`; ctx.textAlign = 'left';
  ctx.fillText('L', 7, top - 6); ctx.fillText('R', c.w - 13, top - 6);
}

function drawHud(ctx, c, S, live) {
  ctx.font = FONT; ctx.textBaseline = 'alphabetic';
  const on = c.E > 0.5;
  ctx.textAlign = 'left';
  ctx.fillStyle = `rgba(${SIG},0.95)`; ctx.fillText('EARTH · 51 MHz', 26, 24);
  // The mark keeps its own borrowed red on the stage too, not the stage's bone.
  ctx.fillStyle = 'rgba(204,45,42,0.95)'; ctx.fillText('x = x', 26, 36);
  const deg = (((-S.rot * 180) / Math.PI) % 360 + 360) % 360;
  ctx.fillText(`LON ${deg <= 180 ? deg.toFixed(1) + '°E' : (360 - deg).toFixed(1) + '°W'}`, 26, c.h - 12);
  ctx.textAlign = 'right';
  ctx.fillStyle = on ? `rgba(${SIG},${0.65 + 0.35 * Math.sin(c.now * 0.008)})` : `rgba(${BONE},0.4)`;
  ctx.fillText(on ? '● TRANSMITTING' : '○ STANDBY', c.w - 26, 24);
  ctx.fillStyle = `rgba(${BONE},0.6)`;
  // A real master's tempo is its own — the 60 BPM heartbeat reads only when the
  // signal is synthetic. With a track loaded the stamp carries its true spec instead.
  ctx.fillText(live ? 'MASTER · 44.1/16' : `♥ ${BPM}`, c.w - 26, 36);
  ctx.fillText(`SIG -${(60 - S.smoothBass * 48).toFixed(0)} dB`, c.w - 26, c.h - 12);
  if (c.E < 0.6) {
    ctx.textAlign = 'center';
    ctx.fillStyle = `rgba(${SIG},${(0.5 + 0.5 * Math.sin(c.now * 0.004)) * (1 - c.E * 1.6)})`;
    ctx.fillText('▶  TAP TO LISTEN — THE EARTH IS SPEAKING', c.cx, c.h - 12);
  }
}

export function drawStage(ctx, w, h, now, dt, S, freq, grid, playing, live) {
  S.energy += ((playing ? 1 : 0) - S.energy) * Math.min(1, dt * 0.0035);
  const E = S.energy;
  const bass = (freq[0] + freq[1] + freq[2] + freq[3]) / 1020;
  S.smoothBass += (bass - S.smoothBass) * Math.min(1, dt * 0.02);
  S.bassAvg += (bass - S.bassAvg) * Math.min(1, dt * 0.002);

  if (E > 0.3 && bass > 0.5 && bass > S.bassAvg * 1.22 && now - S.lastKick > 700) { // each heartbeat sends one wave
    S.lastKick = now; S.flash = 1;
    S.ripples.push({ born: now, s: 0.6 + bass * 0.6 });
    S.tears.push({ born: now, x: Math.random() * w * 0.6, y: Math.random() * h, w: 40 + Math.random() * w * 0.4, h: 1 });
  }
  if (E < 0.35 && now - S.lastPing > 4200) { S.lastPing = now; S.ripples.push({ born: now, s: 0.4 }); } // the planet breathes

  S.rot += dt * (0.00008 + E * 0.00014); // the earth turns slow
  S.sweep += dt * (0.0006 + E * 0.0007); // the radar scans for solutions
  S.flash = Math.max(0, S.flash - dt * 0.004);

  const maxR = Math.min(w, h) / 2 - 44;
  const c = { cx: w / 2, cy: h / 2, w, h, maxR, R: maxR * 0.4, E, bass, now, dt };

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(20,18,16,0.62)'; ctx.fillRect(0, 0, w, h);
  if (grid) ctx.drawImage(grid, 0, 0, w, h);
  drawGlow(ctx, c);
  ctx.globalCompositeOperation = 'lighter';
  drawSweep(ctx, c, S);
  drawRipples(ctx, c, S);
  ctx.globalCompositeOperation = 'source-over';
  drawRing(ctx, c, S, freq);
  drawGlobe(ctx, c, S, freq);
  drawSats(ctx, c, S);
  drawTears(ctx, c, S);
  drawVU(ctx, c, S, freq);
  drawHud(ctx, c, S, live);
}