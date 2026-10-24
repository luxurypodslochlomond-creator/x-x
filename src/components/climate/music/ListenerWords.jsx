import React, { useState } from 'react';
import WordsList from './WordsList';
import WordForm from './WordForm';

// ── WHY IT LANDED, SAID BY A PERSON ─────────────────────────────────────────────
// The record can say what a master is, to the byte, and it can say when a track was
// taken in. It cannot say why the thing moved somebody, and it will not have a machine
// pretend to. The only honest answer to that is a person saying so, in their own hand —
// so this is the one place under a track where a reader can speak, and what they write
// stands unedited beside the artist's own words.

export default function ListenerWords({ track }) {
  const [reloadKey, setReloadKey] = useState(0);

  if (!track?.id) return null;

  return (
    <details className="bg-[#efe7d6] px-5 lg:px-10 py-4 border-t-2 border-[#141210]">
      <summary className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#141210] min-h-[44px] flex items-center cursor-pointer">
        In the listener's own words
      </summary>
      <p className="mt-3 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        Why a piece lands cannot be read out of a file, so no machine is asked to guess at it here. What is kept is
        what a person actually said, exactly as they said it — nothing corrected, nothing tidied.
      </p>
      <p className="mt-2 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        Nothing here is counted, scored or ranked, and the artist is never graded by it. There is no reply box: under a
        piece of work this is a room of listeners, not a forum, and nobody answers back under a track.
      </p>
      <p className="mt-2 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        Disagreeing with the work is not abuse, and it stays. A line is taken down only for what is unlawful, only by a
        keeper — and it is never quietly.
      </p>
      {/* A line that came down does not vanish without trace: the record leaves its own note
          where the line stood — that one was taken down, when, and on what grounds. The line
          itself is never reprinted, and the removal is never quiet. */}
      {track.words_note && (
        <div className="mt-4 border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-3">
          <p className="text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#b3261e]">
            A line was taken down · in the open
          </p>
          <p className="mt-1.5 text-[11px] font-mono text-[#141210] leading-relaxed whitespace-pre-wrap">{track.words_note}</p>
          <p className="mt-1.5 text-[9px] font-mono text-[#5a5246] leading-relaxed">
            It is not reprinted here. Taking a line down is not the same as erasing that it happened.
          </p>
        </div>
      )}
      <WordsList trackId={track.id} reloadKey={reloadKey} />
      <WordForm trackId={track.id} onLeft={() => setReloadKey((k) => k + 1)} />
    </details>
  );
}