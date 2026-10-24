// ── THE RECORD'S OWN MUSIC MARK ─────────────────────────────────────────────────
// Not a borrowed symbol. The note glyph everyone uses says "music" the way a shop sign
// says "bread": it was drawn by the platform it ships on, and the record did not make
// it. This mark, the record makes.
//
// It is a tuning fork — the instrument of frequency, and the one thing an artist already
// holds — with a single bow of sound leaving either side, and its foot lit in the
// record's own signal orange: a voice leaving its source and travelling outward, to
// anyone, with nothing standing in the way. Fork and arcs are drawn in one ink stroke,
// square-cut, so at nav size it carries the same weight as the words beside it.
export default function MusicSignalIcon({ size = 20, className = '', accent = '#e2602a' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* the fork */}
      <path d="M9 4.2 V13.4" />
      <path d="M15 4.2 V13.4" />
      <path d="M9 13.4 A3 3 0 0 0 15 13.4" />
      {/* its stem and lit foot */}
      <path d="M12 16.4 V19.2" />
      <circle cx="12" cy="20.3" r="1.2" fill={accent} stroke="none" />
      {/* one bow of sound leaving each side */}
      <path d="M6.4 6.6 Q3.6 9.6 6.4 12.6" />
      <path d="M17.6 6.6 Q20.4 9.6 17.6 12.6" />
    </svg>
  );
}