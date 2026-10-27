import React from 'react';
import { Search, X } from 'lucide-react';

// ── FINDING A PIECE OF MUSIC ON THE RECORD ──────────────────────────────────────
// A record with twenty tracks on it and no way to look is a pile, not a record. But the
// way through it must not become a ranking: nothing here says what is best, what is
// played most or what is worth more. So there are two honest doors — a word, and the
// kind of piece it is — and the order underneath them is the order the music arrived.
//
// The word is asked of the record itself, never of a copy of it sitting in the browser,
// so a track given five minutes ago is found the same way as one given last year.

const shelf = (kind) => String(kind || '').replaceAll('_', ' ');

const chip = (on) =>
  `px-2.5 min-h-[38px] text-[10px] font-black font-mono uppercase tracking-widest border-2 transition-colors ${
    on
      ? 'border-[#141210] bg-[#141210] text-[#efe7d6]'
      : 'border-[#141210]/30 text-[#141210] active:bg-[#141210]/10'
  }`;

export default function MusicFind({ word, onWord, kind, onKind, kinds, shown, total, loading }) {
  const filtering = Boolean(word.trim() || kind);

  return (
    <div className="border-2 border-[#141210]/15 bg-[#efe7d6] p-3 mb-4">
      <label
        htmlFor="music-find"
        className="block text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#141210] mb-2"
      >
        Find a track
      </label>

      <span className="flex items-center gap-2 border-2 border-[#141210] bg-[#f4efe4] px-3 min-h-[48px]">
        <Search className="w-4 h-4 text-[#5a5246] flex-shrink-0" />
        <input
          id="music-find"
          type="search"
          value={word}
          onChange={(e) => onWord(e.target.value)}
          placeholder="A title, an artist, a word they wrote"
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent py-2 text-[16px] font-mono text-[#141210] placeholder:text-[#5a5246] focus:outline-none"
        />
        {word && (
          <button
            onClick={() => onWord('')}
            aria-label="Clear the word"
            className="w-9 h-9 flex items-center justify-center text-[#141210] active:bg-[#141210]/10 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </span>

      {/* Only the kinds that are actually on the record: a shelf is never offered empty. */}
      {kinds.length > 1 && (
        <div className="flex items-center gap-1.5 flex-wrap mt-2">
          <button onClick={() => onKind('')} className={chip(!kind)}>
            Everything
          </button>
          {kinds.map((k) => (
            <button key={k} onClick={() => onKind(kind === k ? '' : k)} className={chip(kind === k)}>
              {shelf(k)}
            </button>
          ))}
        </div>
      )}

      <p className="mt-2.5 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        {loading
          ? 'Looking through the record…'
          : filtering
            ? `${shown} of ${total} on the record ${shown === 1 ? 'holds' : 'hold'} this.`
            : `${total} on the record, in the order they were given — newest first. Nothing is ranked, and no play is ever counted.`}
      </p>
    </div>
  );
}