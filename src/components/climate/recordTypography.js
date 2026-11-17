// Canvas graphics resolve the same real font as the record, before measuring text.
export function recordFontFamily() {
  const record = document.querySelector('.climate-record') || document.documentElement;
  return window.getComputedStyle(record).getPropertyValue('--font-record-ui').trim() || 'Helvetica, Arial, sans-serif';
}

// Read colours at export time, so saved graphics follow the live design tokens.
export function recordCardPalette() {
  const css = window.getComputedStyle(document.documentElement);
  const color = (name) => `rgb(${css.getPropertyValue(name).trim()})`;
  return {
    PAPER: color('--record-paper'), BONE: color('--record-bone'),
    INK: color('--record-ink'), MUTED: color('--record-muted'),
    SIGNAL: color('--record-red'), RED: color('--record-red'),
    MARK: color('--record-mark'), SUN: color('--cartoon-sun'),
    SIGNAL_BRIGHT: color('--cartoon-sun'),
  };
}

export async function loadRecordCardFonts() {
  const family = recordFontFamily();
  try {
    await Promise.all([
      document.fonts.load(`400 26px ${family}`),
      document.fonts.load(`700 66px ${family}`),
    ]);
  } catch { /* Keep the existing offline fallback to the system sans. */ }
  // Both former card voices now use the record's sans, with hierarchy by weight.
  return { DISPLAY: family, MONO: family, colors: recordCardPalette() };
}