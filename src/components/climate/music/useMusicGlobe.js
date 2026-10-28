import { useEffect } from 'react';
import * as THREE from 'three';

// ── THE SPHERE, DIMENSIONALLY ───────────────────────────────────────────────────
// No grid, no cage, no lines: a world made of light. Points of warm paper sit on a
// sphere, closer ones brighter and larger, further ones dimmer — which is what makes a
// thing read as depth rather than as a drawing. The low end swells it, the mids carry
// it round, the top end lifts its colour toward signal orange, and a slow ripple travels
// across it with the music, so you feel the piece before you have found words for it.
//
// The sound is read from the master as it plays. Where a file will not be read, this
// holds still and the listening carries on untouched.

const VERTEX = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uSize;
  attribute float aSeed;
  varying float vDepth;

  void main() {
    float ripple = sin(position.y * 7.0 - uTime * 2.6 + aSeed * 6.2831);
    float push = (0.02 * uMid + 0.055 * uBass) * ripple;
    vec3 p = position * (1.0 + push + 0.05 * uBass);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = smoothstep(-4.2, -2.2, mv.z);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 + 1.1 * uBass) * (0.55 + 0.85 * vDepth);
  }
`;

const FRAGMENT = `
  uniform float uTreble;
  varying float vDepth;

  void main() {
    float r = length(gl_PointCoord - vec2(0.5));
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.02, r);
    vec3 far = vec3(0.40, 0.38, 0.35);
    vec3 near = vec3(0.96, 0.93, 0.86);
    vec3 signal = vec3(0.886, 0.376, 0.165);
    vec3 col = mix(far, near, vDepth);
    col = mix(col, signal, 0.35 * uTreble * vDepth);
    gl_FragColor = vec4(col, soft * (0.16 + 0.84 * vDepth));
  }
`;

const COUNT = 5200;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export default function useMusicGlobe({ canvasRef, graphRef, playingRef, levelRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (err) {
      // No WebGL here: the controls still work, nothing is faked in its place.
      return undefined;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.6;

    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i += 1) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN * i;
      positions[i * 3] = Math.cos(theta) * ring;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * ring;
      seeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uBass: { value: 0 },
      uMid: { value: 0 },
      uTreble: { value: 0 },
      uSize: { value: 2.4 * dpr },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const globe = new THREE.Points(geometry, material);
    scene.add(globe);

    // the core: the sound at the centre of it, breathing with the low end
    const coreCanvas = document.createElement('canvas');
    coreCanvas.width = 128;
    coreCanvas.height = 128;
    const coreCtx = coreCanvas.getContext('2d');
    const gradient = coreCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 186, 132, 1)');
    gradient.addColorStop(0.25, 'rgba(226, 96, 42, 0.5)');
    gradient.addColorStop(1, 'rgba(226, 96, 42, 0)');
    coreCtx.fillStyle = gradient;
    coreCtx.fillRect(0, 0, 128, 128);
    const coreTexture = new THREE.CanvasTexture(coreCanvas);
    const coreMaterial = new THREE.SpriteMaterial({
      map: coreTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0.45,
    });
    const core = new THREE.Sprite(coreMaterial);
    core.scale.setScalar(0.9);
    scene.add(core);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let spin = 0;

    const loop = () => {
      // read the master as it plays
      const graph = graphRef.current;
      let heard = { bass: 0, mid: 0, treble: 0 };
      if (graph && playingRef.current) {
        graph.analyser.getByteFrequencyData(graph.data);
        const data = graph.data;
        const n = data.length;
        const band = (from, to) => {
          const a = Math.max(0, Math.floor(n * from));
          const b = Math.max(a + 1, Math.floor(n * to));
          let sum = 0;
          for (let i = a; i < b; i += 1) sum += data[i];
          return sum / ((b - a) * 255);
        };
        heard = { bass: band(0, 0.08), mid: band(0.08, 0.3), treble: band(0.3, 0.7) };
      }

      const prev = levelRef.current;
      const level = {
        bass: prev.bass + (heard.bass - prev.bass) * 0.28,
        mid: prev.mid + (heard.mid - prev.mid) * 0.24,
        treble: prev.treble + (heard.treble - prev.treble) * 0.3,
      };
      levelRef.current = level;

      uniforms.uTime.value += 0.016;
      uniforms.uBass.value = level.bass;
      uniforms.uMid.value = level.mid;
      uniforms.uTreble.value = level.treble;
      uniforms.uSize.value = (2.2 + level.treble * 2.2) * dpr;

      spin += playingRef.current ? 0.0018 + 0.02 * level.mid : 0.0009;
      globe.rotation.y = spin;
      globe.rotation.x = -0.3 + Math.sin(uniforms.uTime.value * 0.18) * 0.09;
      globe.scale.setScalar(1 + 0.06 * level.bass);

      core.scale.setScalar(0.7 + 1.6 * level.bass);
      coreMaterial.opacity = 0.3 + 0.6 * level.mid;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      coreTexture.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, [canvasRef, graphRef, playingRef, levelRef]);
}