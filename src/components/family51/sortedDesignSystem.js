/**
 * SORTED Design System — one source of truth.
 * No quantum bullshit. Just craft.
 *
 * These tokens kill the jiggle: consistent radii, consistent motion,
 * accessible text sizes, honest contrast, reserved space.
 */

// ── COLOR ──
export const COLOR = {
  gold: '#c6995c',
  ink: '#1c1c1e',
  paper: '#fcfaf6',
  white: '#ffffff',
  muted: 'rgba(28,28,30,0.6)',      // 0.6 — WCAG-compliant on paper bg
  faint: 'rgba(28,28,30,0.4)',
  border: 'rgba(28,28,30,0.08)',
  borderStrong: 'rgba(28,28,30,0.12)',
  green: '#16a34a',
  red: '#dc2626',
  amber: '#d97706',
  teal: '#0891b2',
};

// ── RADIUS ── One card, one pill, one button. Never anything else.
export const RADIUS = {
  card: 16,
  pill: 12,
  button: 14,
  small: 8,
};

// ── SPACING ──
export const SPACE = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// ── TYPOGRAPHY ── 16px minimum. Always. No exceptions.
export const FONT = {
  family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
  body: 16,
  bodyLarge: 18,
  bodySmall: 15,    // only for secondary/muted text, never primary
  label: 11,
  micro: 13,        // timestamps, meta — never body
  heading: 'clamp(32px, 7vw, 44px)',
  subheading: 'clamp(17px, 3.5vw, 19px)',
  lineHeight: 1.55,
  lineHeightTight: 1.3,
  labelSpacing: '0.12em',
  labelWeight: 700,
};

// ── TOUCH ── 44px minimum. Apple HIG. No exceptions.
export const TOUCH = {
  minHeight: 44,
  minHeightSm: 36,
};

// ── MOTION ── One spring. One fade. One ease. Everywhere.
export const MOTION = {
  spring: { type: 'spring', stiffness: 400, damping: 28 },
  springGentle: { type: 'spring', stiffness: 300, damping: 24 },
  fade: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  fadeQuick: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  stagger: (i) => ({ duration: 0.25, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }),
};

// ── ELEVATION ──
export const SHADOW = {
  card: '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)',
  cardActive: '0 8px 28px rgba(198,153,92,0.10), 0 2px 8px rgba(0,0,0,0.04)',
  cardLifted: '0 12px 40px rgba(198,153,92,0.10), 0 2px 8px rgba(0,0,0,0.04)',
  button: '0 4px 20px rgba(28,28,30,0.18)',
};

// ── HAPTICS ──
export const haptic = {
  tap: () => { try { navigator.vibrate?.(8); } catch {} },
  strong: () => { try { navigator.vibrate?.(15); } catch {} },
};

// ── BASE STYLE ── Applied to the root container
export const baseStyle = {
  minHeight: '100dvh',
  background: COLOR.paper,
  color: COLOR.ink,
  overflowX: 'hidden',
  overscrollBehavior: 'none',
  WebkitOverflowScrolling: 'touch',
  fontFamily: FONT.family,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
};