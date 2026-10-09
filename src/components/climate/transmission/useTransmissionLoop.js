import { useEffect } from 'react';
import { createStageState, buildGrid, drawStage } from './drawStage';
import { drawScope, pushWaterfall } from './drawStrips';

const fmt = (s) => {
  if (!s || isNaN(s) || !isFinite(s)) return '00:00';
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

// One rAF loop drives stage + scope + waterfall + progress. Pauses when off-screen.
export default function useTransmissionLoop({ stageRef, scopeRef, fallRef, flashRef, barRef, timeRef, durRef, apiRef }) {
  useEffect(() => {
    const stage = stageRef.current, scope = scopeRef.current, fall = fallRef.current;
    if (!stage || !scope || !fall) return undefined;
    const sctx = stage.getContext('2d');
    const pctx = scope.getContext('2d');
    const fctx = fall.getContext('2d', { willReadFrequently: true });
    fctx.fillStyle = '#141210'; fctx.fillRect(0, 0, fall.width, fall.height);

    const S = createStageState();
    let w = 0, h = 0, pw = 0, ph = 0, grid = null, raf = 0, visible = true, frame = 0;
    let last = performance.now(), lastTime = '';

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = stage.offsetWidth; h = stage.offsetHeight;
      stage.width = w * dpr; stage.height = h * dpr; sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pw = scope.offsetWidth; ph = scope.offsetHeight;
      scope.width = pw * dpr; scope.height = ph * dpr; pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (w && h) grid = buildGrid(w, h, dpr);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(stage);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(stage);

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !w || !h) { last = now; return; }
      const dt = Math.min(64, now - last); last = now; frame++;
      const api = apiRef.current;
      const { freq, wave } = api.read(now, S.energy);
      drawStage(sctx, w, h, now, dt, S, freq, grid, api.isPlaying());
      drawScope(pctx, pw, ph, wave, S.energy);
      if (frame % 2 === 0) pushWaterfall(fctx, freq, fall.width, fall.height);
      if (flashRef.current) flashRef.current.style.opacity = String(S.flash * 0.2);

      const { cur, dur } = api.getTime();
      const text = fmt(cur);
      if (timeRef.current && text !== lastTime) { timeRef.current.textContent = text; lastTime = text; }
      if (durRef.current) durRef.current.textContent = dur ? fmt(dur) : '\u221E';
      if (barRef.current) barRef.current.style.width = `${(dur ? cur / dur : (cur % 90) / 90) * 100}%`;
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);
}