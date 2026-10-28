import { useEffect } from 'react';
import * as THREE from 'three';

// ── THE FIELD ───────────────────────────────────────────────────────────────────
// Not a ball in a box. The shell of light is larger than the frame, so it leaves by the
// top and the bottom and there is no edge to look at: you are standing in the field, not
// watching an object. No outline, no ring, no drawn circle.
//
// Each point listens to its own part of the sound — bass low in the field, treble high —
// so the picture is the master's own spectrum laid across a world, not three vague bands
// breathing together. It is read from the file as it plays, by the browser's analyser: a
// real reading of the real master, and the only honest kind of reacting there is.
//
// The beat is found, not guessed at: the frame-to-frame rise across the spectrum is
// measured, and only a rise that clears what that piece has been doing lately counts as
// an onset. Then the field is allowed to let go of it slowly. That is the difference
// between moving with the music and twitching at it.
//
// And it remembers. The picture is never cleared: each frame is laid over the last and
// the past is washed a little toward the ink, so what you see is the music's own recent
// memory — where it has just been, dimming. In a quiet passage the memory lingers; in a
// loud one it clears fast, because there is more to see. Not a scroll, not a history:
// the same place, remembering, which is what a place does.

const BANDS = 64;
const COUNT = 13000;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const INK = '#141210';

const VERTEX = `
  uniform float uTime;
  uniform float uBeat;
  uniform float uSize;
  uniform sampler2D uBands;

  attribute float aSeed;
  attribute float aBand;

  varying float vDepth;
  varying float vTone;

  void main() {
    // this point hears its own part of the sound
    float tone = texture2D(uBands, vec2(aBand, 0.5)).r;
    vTone = tone;

    vec3 dir = normalize(position);
    float drift = sin(uTime * 0.55 + aSeed * 6.2831) * 0.010;
    float lift = 0.045 + 0.26 * tone + 0.020 * uBeat;

    vec3 p = dir * (length(position) + lift + drift);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // near points bright, far points dim: depth, not a drawing
    vDepth = smoothstep(-3.55, -1.40, mv.z);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.60 + 0.55 * vDepth) * (0.80 + 0.60 * tone + 0.45 * uBeat);
  }
`;

const FRAGMENT = `
  uniform float uTreble;

  varying float vDepth;
  varying float vTone;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float r2 = dot(c, c);
    if (r2 > 0.25) discard;

    float core = 1.0 - smoothstep(0.0, 0.25, r2);

    vec3 far = vec3(0.34, 0.31, 0.28);
    vec3 near = vec3(0.96, 0.93, 0.86);
    vec3 signal = vec3(0.886, 0.376, 0.165);

    vec3 col = mix(far, near, vDepth);
    col = mix(col, signal, clamp((0.28 * uTreble + 0.34 * vTone) * vDepth, 0.0, 0.7));

    gl_FragColor = vec4(col, core * (0.08 + 0.92 * vDepth));
  }
`;

const edgesFor = (analyser, sampleRate) => {
  const n = analyser.frequencyBinCount;
  const nyquist = (sampleRate || 44100) / 2;
  const hi = Math.min(16000, nyquist);
  const edges = new Int32Array(BANDS + 1);
  for (let i = 0; i <= BANDS; i += 1) {
    // bands are spaced by ear, not by arithmetic: low notes get room to be told apart
    const f = 32 * Math.pow(hi / 32, i / BANDS);
    edges[i] = Math.min(n - 1, Math.round((f / nyquist) * n));
  }
  return edges;
};

export default function useMusicGlobe({ canvasRef, trailRef, graphRef, playingRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const trail = trailRef.current;
    if (!canvas || !trail) return undefined;
    const tctx = trail.getContext('2d');
    if (!tctx) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch (err) {
      // No WebGL here: the controls still work, nothing is faked in its place.
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.25;

    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const bandOf = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i += 1) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN * i;
      const seed = Math.random();
      seeds[i] = seed;
      // an irregular shell, never a machined ball: no edge of the field is a perfect line
      const radius = 1.30 * (0.93 + 0.13 * seed);
      positions[i * 3] = Math.cos(theta) * ring * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * ring * radius;
      // bass sits low in the field, treble high — with a little scatter so neighbouring
      // points overlap in what they hear, the way a real room does
      bandOf[i] = THREE.MathUtils.clamp((y * 0.5 + 0.5) * 0.9 + seed * 0.1, 0, 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aBand', new THREE.BufferAttribute(bandOf, 1));

    // the spectrum, handed to the points as they are drawn: one texel per band
    const bandData = new Uint8Array(BANDS * 4);
    const bandsTexture = new THREE.DataTexture(bandData, BANDS, 1, THREE.RGBAFormat);
    bandsTexture.minFilter = THREE.LinearFilter;
    bandsTexture.magFilter = THREE.LinearFilter;
    bandsTexture.wrapS = THREE.ClampToEdgeWrapping;
    bandsTexture.wrapT = THREE.ClampToEdgeWrapping;
    bandsTexture.generateMipmaps = false;
    bandsTexture.needsUpdate = true;

    const uniforms = {
      uTime: { value: 0 },
      uBeat: { value: 0 },
      uTreble: { value: 0 },
      uSize: { value: 1.95 },
      uBands: { value: bandsTexture },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const field = new THREE.Points(geometry, material);
    scene.add(field);

    // the sound at the centre of it — a warmth, not a lamp
    const coreCanvas = document.createElement('canvas');
    coreCanvas.width = 128;
    coreCanvas.height = 128;
    const coreCtx = coreCanvas.getContext('2d');
    const glow = coreCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    glow.addColorStop(0, 'rgba(255, 186, 132, 1)');
    glow.addColorStop(0.28, 'rgba(226, 96, 42, 0.42)');
    glow.addColorStop(1, 'rgba(226, 96, 42, 0)');
    coreCtx.fillStyle = glow;
    coreCtx.fillRect(0, 0, 128, 128);
    const coreTexture = new THREE.CanvasTexture(coreCanvas);
    const coreMaterial = new THREE.SpriteMaterial({
      map: coreTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      opacity: 0.18,
    });
    const core = new THREE.Sprite(coreMaterial);
    core.scale.setScalar(0.8);
    scene.add(core);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      trail.width = Math.round(w * dpr);
      trail.height = Math.round(h * dpr);
      tctx.fillStyle = INK;
      tctx.fillRect(0, 0, trail.width, trail.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── what the sound is doing, read from the master as it plays ──
    let raw = null;
    let before = null;
    let edges = null;

    const readSound = (graph) => {
      const { analyser, ctx } = graph;
      const n = analyser.frequencyBinCount;
      if (!raw || raw.length !== n) {
        raw = new Uint8Array(n);
        before = new Uint8Array(n);
        edges = edgesFor(analyser, ctx?.sampleRate);
      }
      analyser.getByteFrequencyData(raw);

      let loud = 0;
      let bright = 0;
      let top = 0;

      for (let b = 0; b < BANDS; b += 1) {
        const from = edges[b];
        const to = Math.max(from + 1, edges[b + 1]);
        let peak = 0;
        for (let i = from; i < to; i += 1) if (raw[i] > peak) peak = raw[i];
        bandData[b * 4] = peak;
        bandData[b * 4 + 1] = peak;
        bandData[b * 4 + 2] = peak;
        bandData[b * 4 + 3] = 255;
        loud += peak;
        if (b >= BANDS * 0.66) {
          bright += peak;
          top += 1;
        }
      }
      bandsTexture.needsUpdate = true;

      // how much the spectrum has just risen — the measure a beat is found from
      let risen = 0;
      for (let i = 0; i < n; i += 1) {
        const d = raw[i] - before[i];
        if (d > 0) risen += d;
        before[i] = raw[i];
      }

      return {
        loud: loud / (BANDS * 255),
        bright: top ? bright / (top * 255) : 0,
        risen: risen / (n * 255),
      };
    };

    const memory = new Float32Array(48);
    let memoryAt = 0;
    let habitual = 0.05;
    let beat = 0;
    let level = 0;
    let treble = 0;
    let lastOnset = -1;
    let spin = 0;
    let elapsed = 0;
    let previous = performance.now();
    let frame = 0;

    const loop = (now) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - previous) / 1000));
      previous = now;
      elapsed += dt;

      const graph = graphRef.current;
      const hearing = Boolean(graph && playingRef.current);

      if (hearing) {
        const heard = readSound(graph);

        memory[memoryAt] = heard.risen;
        memoryAt = (memoryAt + 1) % memory.length;
        habitual += (heard.risen - habitual) * 0.05;

        // a rise that clears what this piece has been doing lately is an onset; a rise
        // that merely matches it is just the music carrying on
        if (heard.risen > habitual * 1.55 + 0.012 && elapsed - lastOnset > 0.13) {
          lastOnset = elapsed;
          beat = 1;
        }

        level += (heard.loud - level) * (heard.loud > level ? 0.45 : 0.09);
        treble += (heard.bright - treble) * 0.2;
      } else {
        level += (0 - level) * 0.04;
        treble += (0 - treble) * 0.06;
        if (!graph) {
          for (let b = 0; b < BANDS; b += 1) {
            bandData[b * 4] = 0;
            bandData[b * 4 + 1] = 0;
            bandData[b * 4 + 2] = 0;
            bandData[b * 4 + 3] = 255;
          }
          bandsTexture.needsUpdate = true;
        }
      }

      // and let go of the beat slowly, so nothing ever snaps
      beat *= Math.pow(0.02, dt);

      uniforms.uTime.value = elapsed;
      uniforms.uBeat.value = beat;
      uniforms.uTreble.value = treble;
      uniforms.uSize.value = 2.15 + treble * 0.9 + beat * 0.6;

      spin += dt * (0.055 + 0.20 * level);
      field.rotation.y = spin;
      field.rotation.x = -0.12 + Math.sin(elapsed * 0.11) * 0.07;

      core.scale.setScalar(0.62 + 0.9 * level);
      coreMaterial.opacity = 0.10 + 0.26 * level;

      renderer.render(scene, camera);

      // ── the memory: wash the past toward ink, then lay this frame over it ──
      // Quiet passage: the wash is gentle, so what has just happened lingers. Loud
      // passage: it clears quickly, because there is more to read. Exponential by
      // nature, and it never moves — the field stays where it is and remembers.
      const wash = 0.045 + 0.16 * level;
      tctx.globalAlpha = wash;
      tctx.fillStyle = INK;
      tctx.fillRect(0, 0, trail.width, trail.height);
      tctx.globalAlpha = 0.92;
      tctx.drawImage(renderer.domElement, 0, 0, trail.width, trail.height);
      tctx.globalAlpha = 1;

      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      bandsTexture.dispose();
      coreTexture.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, [canvasRef, trailRef, graphRef, playingRef]);
}