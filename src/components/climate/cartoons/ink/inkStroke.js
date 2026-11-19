// ── THE NIB ────────────────────────────────────────────────────────────────────
// One renderer, used twice: by the panel you draw in and by the strip that gets printed.
// That is the whole reason this file exists. If the screen and the print drew a stroke two
// different ways, a cartoonist would spend their life correcting a preview — and the first
// thing they would notice is that the line on the paper is not the line they drew.
//
// The stroke is not a line of one width. Every point carries its own width, set from the
// speed of the hand and the pressure of the pen, so a stroke starts thin, swells where the
// hand slowed down, and lifts off thin again. That is what a nib does, and it is the
// difference between ink and a wire — the thing that makes a drawing look drawn.
const STEP = 1.4; // how far apart the stamps sit, in canvas pixels

function disc(ctx, point) {
  // moveTo first, or a path full of arcs joins them with chords and the line grows spines.
  ctx.moveTo(point.x + point.w / 2, point.y);
  ctx.arc(point.x, point.y, Math.max(0.35, point.w / 2), 0, Math.PI * 2);
}

// `place` lets the same stroke be stamped somewhere else at another size — that is how a
// drawing made at 640 pixels lands on a printed panel without being re-drawn or blurred.
export function stampStroke(ctx, stroke, place = {}) {
  const pts = stroke?.pts || [];
  if (!pts.length) return;
  const ox = place.x || 0;
  const oy = place.y || 0;
  const k = place.scale || 1;
  const at = (p) => ({ x: ox + p.x * k, y: oy + p.y * k, w: Math.max(0.5, p.w * k) });

  ctx.fillStyle = stroke.hex;
  ctx.beginPath();
  disc(ctx, at(pts[0]));
  for (let i = 1; i < pts.length; i += 1) {
    const a = at(pts[i - 1]);
    const b = at(pts[i]);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const span = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(span / STEP));
    for (let s = 1; s <= steps; s += 1) {
      const t = s / steps;
      disc(ctx, { x: a.x + dx * t, y: a.y + dy * t, w: a.w + (b.w - a.w) * t });
    }
  }
  ctx.fill();
}

// A pen does not stop dead at full width — it lifts. Thinning the last few stamps is the
// whole of that, and it is the detail the eye reads as "somebody drew this".
export function taperEnds(stroke) {
  const pts = stroke?.pts || [];
  const n = pts.length;
  if (n < 6) return stroke;
  const lift = Math.min(4, Math.floor(n / 4));
  for (let i = 0; i < lift; i += 1) {
    pts[n - 1 - i].w *= 0.45 + 0.55 * (i / lift);
  }
  return stroke;
}