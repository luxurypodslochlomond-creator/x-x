import React from 'react';

// ── THE ROOM, SAYING WHAT IT HAS GOT ──────────────────────────────────────────
// One quiet line, and one tap. It never says "offline ready" unless every drawing on the
// wall is actually in this phone's cache, because a room that claims to work without a
// signal and then does not is worse than one that never made the claim.
//
// The count is the whole promise: "18 of 18" means pull the plug and it still opens.
export default function OfflineKept({ offline }) {
  if (!offline.total || !offline.worker) return null;

  if (offline.ready) {
    return (
      <p className="record-meta border-y border-record-ink/20 py-2" role="status">
        Kept on this phone: all {offline.total} drawings, with their titles, hands and words. Turn the signal off — it still opens.
      </p>
    );
  }

  return (
    <div className="border-y border-record-ink/20 py-2" role="status">
      <p className="record-meta">
        {offline.keeping
          ? `Keeping the room on this phone… ${offline.kept} of ${offline.total} drawings so far.`
          : `${offline.kept} of ${offline.total} drawings are kept on this phone.`}
      </p>
      {!offline.keeping && (
        <button
          type="button"
          onClick={offline.keep}
          className="mt-1 border-b border-record-ink/40 font-mono text-[10.5px] uppercase tracking-[0.14em] text-record-ink"
        >
          Keep the room on this phone
        </button>
      )}
      <p className="record-meta mt-1">Nothing is sent anywhere. The copy stays on this device, for a room with no signal.</p>
    </div>
  );
}