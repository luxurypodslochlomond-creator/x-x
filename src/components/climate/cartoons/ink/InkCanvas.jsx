import React, { useCallback, useEffect, useRef } from 'react';
import { stampStroke, taperEnds } from '@/components/climate/cartoons/ink/inkStroke';

// ── THE PANEL YOU DRAW IN ──────────────────────────────────────────────────────
// The square is 640 pixels whatever the screen is, so a drawing made on a phone in a
// workshop and a drawing made on a big screen are the same drawing at the same size, and
// the print does not depend on which one it was made on.
//
// It only draws. It does not know what a strip is, or a caption, or the wall — it holds a
// pen, a colour, a width and the strokes it has been given, and it hands each finished
// stroke back. That is why the same component can sit in a child's panel and, one day, in
// anything else on the record that needs ink.
const SIZE = 640;

const clamp = (n, low, high) => Math.min(high, Math.max(low, n));

export default function InkCanvas({ strokes, onStroke, hex, nib, guide }) {
  const canvasRef = useRef(null);
  const liveRef = useRef(null);
  const clockRef = useRef(0);

  const repaint = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, SIZE, SIZE);
    strokes.forEach((stroke) => stampStroke(ctx, stroke));
    if (liveRef.current) stampStroke(ctx, liveRef.current);
    if (guide) {
      ctx.save();
      ctx.strokeStyle = 'rgba(26,22,18,0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([7, 7]);
      ctx.strokeRect(26.5, 26.5, SIZE - 53, SIZE - 53);
      ctx.restore();
    }
  }, [strokes, guide]);

  useEffect(() => { repaint(); }, [repaint]);

  // Width at this instant: fast hand, thin line; slow hand, fat line; and a real pen's own
  // pressure where the device has one. The last width is carried forward so the stroke
  // swells and thins smoothly instead of stepping.
  const at = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * SIZE;
    const y = ((event.clientY - rect.top) / rect.height) * SIZE;
    const now = performance.now();
    const last = liveRef.current?.pts[liveRef.current.pts.length - 1];
    const gap = Math.max(8, now - (clockRef.current || now));
    const speed = last ? Math.hypot(x - last.x, y - last.y) / gap : 0;
    const pressure = event.pressure > 0 ? event.pressure : 0.5;
    const want = nib * clamp(1.18 - speed * 0.55, 0.42, 1.18) * (0.62 + pressure * 0.76);
    clockRef.current = now;
    return { x, y, w: last ? last.w * 0.65 + want * 0.35 : want * 0.72 };
  };

  // Only the newest segment is stamped while the hand is moving. Repainting every stroke on
  // every pointer event is what makes a drawing surface feel heavy on a phone.
  const paintLive = () => {
    const ctx = canvasRef.current?.getContext('2d');
    const live = liveRef.current;
    if (!ctx || !live) return;
    const pts = live.pts.length > 1 ? live.pts.slice(-2) : live.pts;
    stampStroke(ctx, { hex: live.hex, pts });
  };

  const down = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    clockRef.current = 0;
    liveRef.current = { hex, pts: [at(event)] };
    paintLive();
  };

  const move = (event) => {
    const live = liveRef.current;
    if (!live) return;
    const point = at(event);
    const last = live.pts[live.pts.length - 1];
    if (Math.hypot(point.x - last.x, point.y - last.y) < 0.7) return;
    live.pts.push(point);
    paintLive();
  };

  const up = () => {
    const stroke = liveRef.current;
    if (!stroke) return;
    liveRef.current = null;
    onStroke(taperEnds(stroke));
  };

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
      onPointerCancel={up}
      className="mt-2 block aspect-square w-full touch-none border-2 border-record-ink bg-white"
      style={{ cursor: 'crosshair' }}
      aria-label="The panel you are drawing in"
    />
  );
}