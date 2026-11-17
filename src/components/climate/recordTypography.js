// Canvas graphics resolve the same real font as the record, before measuring text.
export function recordFontFamily() {
  const record = document.querySelector('.climate-record') || document.documentElement;
  return window.getComputedStyle(record).getPropertyValue('--font-record-ui').trim() || 'Helvetica, Arial, sans-serif';
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
  return { DISPLAY: family, MONO: family };
}