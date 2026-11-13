import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { markFor } from '@/components/climate/pageMarks';

// ── THE DOOR OPENS WHEN THE FINGER LIFTS ────────────────────────────────────────
// A door that goes somewhere has always opened on the browser's click — the event a phone
// sends after a tap. That event is a courtesy, not a promise. On a handset the browser
// drops it whenever the gesture looked even slightly like something else: a thumb that
// travelled a few pixels on the way down and up, a finger that landed while the grid was
// re-rendering, a tap that arrived while the page above it was still settling. Every one
// of those is invisible to the reader, and all of them look the same from the outside:
// the door did not open, so they tap it again. And again. That is exactly the report —
// "sometimes I have to tap a few times" — and no amount of warming or press feedback
// could fix it, because the navigation was never being asked for.
//
// So the door no longer waits to be asked twice. On a touch it navigates the moment the
// finger lifts, if the finger is still on the same door it went down on. The click that
// follows a moment later is swallowed by the same flag, so a page never opens twice and
// the back button never has to be pressed twice to leave it. A finger that DRAGS (more
// than a thumb's width) is scrolling the sheet, not choosing a door, and is left alone.
// A mouse is untouched: hovering and clicking behave exactly as they did.
export default function RecordNavDoor({ to, label, what, active = false, size = 44, className = '', onClick, asButton = false, expanded, controls }) {
  const Mark = markFor(to);
  const navigate = useNavigate();
  const downAt = useRef(null);
  const opened = useRef(false);

  const onPointerDown = asButton ? undefined : (event) => {
    if (event.pointerType === 'mouse') return;
    downAt.current = { x: event.clientX, y: event.clientY };
    opened.current = false;
  };

  const onPointerUp = asButton ? undefined : (event) => {
    const from = downAt.current;
    downAt.current = null;
    if (!from || event.pointerType === 'mouse') return;
    if (Math.abs(event.clientX - from.x) > 12 || Math.abs(event.clientY - from.y) > 12) return;
    opened.current = true;
    window.setTimeout(() => { opened.current = false; }, 900);
    navigate(to);
    if (onClick) onClick(event);
  };

  const onClickDoor = (event) => {
    if (opened.current) { opened.current = false; event.preventDefault(); return; }
    if (onClick) onClick(event);
  };

  const Door = asButton ? 'button' : Link;
  return (
    <Door
      {...(asButton ? { type: 'button', 'aria-expanded': expanded, 'aria-controls': controls, 'aria-haspopup': 'dialog' } : { to })}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onClick={onClickDoor}
      title={what ? `${label}: ${what}` : label}
      aria-label={what ? `${label}. ${what}` : label}
      aria-current={!asButton && active ? 'page' : undefined}
      className={`rec-art-door ${active ? 'rec-art-door-active' : ''} ${className}`}
    >
      <span className="rec-art-drawing" aria-hidden="true"><Mark size={size} /></span>
      <span className="rec-art-caption">{label}</span>
    </Door>
  );
}