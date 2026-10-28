import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── THE MARK ────────────────────────────────────────────────────────────────────
// One small mark. No words, no number.
//
// It warms while another page has this record open at the same moment, and stays cold
// and still when it does not. That is all it says, because it is all that can be said
// without claiming something that cannot be shown.
//
// It is not a reading of anybody. The room it listens to counts open pages and tells
// each of them one true/false — no name, no place, no history, and no figure anywhere
// to be counted, ranked, screenshotted or kept. When a page closes, that fact leaves
// with it and nothing of it remains.

export default function PresenceMark() {
  const [together, setTogether] = useState(false);

  useEffect(() => {
    // Actors may not be reachable on every device. If they are not, the mark simply
    // stays cold: nothing here is ever allowed to stop the music from playing.
    if (!base44.actors?.MusicRoom) return undefined;

    // The connection id lives in this tab only, so a reload reclaims the same place
    // rather than leaving a ghost of a closed page behind for a while.
    let connId = sessionStorage.getItem('music_room_conn');
    if (!connId) {
      connId = crypto.randomUUID();
      sessionStorage.setItem('music_room_conn', connId);
    }

    const room = base44.actors.MusicRoom('music').connect({ id: connId });
    const sub = room.subscribe((msg) => {
      if (msg && msg.type === 'presence') setTogether(msg.together === true);
    });

    return () => {
      sub?.unsubscribe?.();
      room.close();
    };
  }, []);

  return (
    <>
      <style>{`@keyframes mark-together { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }`}</style>
      <span
        role="img"
        aria-label={
          together
            ? 'Someone else has this record open at this moment'
            : 'No one else has this record open at this moment'
        }
        className="block w-2 h-2 pointer-events-none"
        style={{
          backgroundColor: together ? '#e2602a' : 'rgba(239,231,214,0.22)',
          boxShadow: together ? '0 0 10px rgba(226,96,42,0.85)' : 'none',
          animation: together ? 'mark-together 3.2s ease-in-out infinite' : 'none',
        }}
      />
    </>
  );
}