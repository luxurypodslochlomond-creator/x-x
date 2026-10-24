import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Music, Plus, X, RefreshCw } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import TrackPlate from '@/components/climate/music/TrackPlate';
import MusicSubmitForm from '@/components/climate/music/MusicSubmitForm';
import { givenStamp } from '@/components/climate/music/stamp';

// ── THE RECORD'S MUSIC ──────────────────────────────────────────────────────────
// Music arrives here the same way a photograph or an entry does: someone gives it,
// and it is read at once. A track that is clean goes up the moment it is given — the
// artist should not be left waiting on a person to be able to hear what they just gave
// away — and only a flagged track waits for a keeper.
//
// Everything on this page is drawn from the record's own fields, so no track can be
// dressed better than another: the order is the order they were given, nothing is
// ranked, no play is counted, and no one pays for a place. The artist's name is on the
// track, on its card and on the page it plays from, and the master is served whole.
//
// The band at the foot of the record is the same band, not a copy of it — one
// component, drawn in both places.

export default function ClimateMusic() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [doorOpen, setDoorOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items } = await base44.entities.ClimateTrack.filter(
        { status: 'published' },
        { sort: 'created_date', limit: 50 },
      );
      setTracks(items);
      setActiveId((current) => (current && items.some((t) => t.id === current) ? current : items[0]?.id || null));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const active = tracks.find((t) => t.id === activeId) || null;

  return (
    <ClimateRecordShell
      eyebrow="The record's music"
      marker="Given to the record · never sold · no plays counted, no cut taken"
      title="Music"
      statement="Music made for the record and given to it. Free to listen, the master whole, and the artist's name kept on it."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="A track stands here because an artist gave it to the record. Nothing is bought, sold, licensed or counted: no plays, no ranking, no cut — and no one pays for a place on this page. A master is stored exactly as it was given and served whole to anyone with an account-free link. What is printed beside each track is the file's own truth: its format comes out of the master's header, its date is the moment the record took it in, and its fingerprint is read on the artist's own device before the file is ever sent — so nothing here has to be taken on trust."
    >
      {loading ? (
        <div className="border-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-10 text-center">
          <RefreshCw className="w-5 h-5 animate-spin text-[#5a5246] mx-auto mb-3" />
          <p className="text-[11px] font-mono text-[#5a5246]">Bringing the music through…</p>
        </div>
      ) : tracks.length === 0 ? (
        <div className="border-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-10 text-center">
          <Music className="w-7 h-7 text-[#e2602a] mx-auto mb-3" />
          <p className="text-[12px] font-black font-mono uppercase text-[#141210]">No music on the record yet</p>
          <p className="text-[11px] font-mono text-[#5a5246] mt-2 leading-relaxed">
            The first track to arrive stands here. Yours can be it.
          </p>
        </div>
      ) : (
        <>
          {/* The rail — only when there is more than one track to choose between. */}
          {tracks.length > 1 && (
            <div className="mb-4 border-2 border-[#141210]/15 bg-[#efe7d6]">
              {tracks.map((track) => {
                const on = track.id === activeId;
                return (
                  <button
                    key={track.id}
                    onClick={() => setActiveId(track.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 min-h-[52px] text-left border-b border-[#141210]/10 last:border-b-0 transition-colors ${
                      on ? 'bg-[#141210] text-[#efe7d6]' : 'text-[#141210] active:bg-[#141210]/10'
                    }`}
                  >
                    <Music className={`w-4 h-4 flex-shrink-0 ${on ? 'text-[#e2602a]' : 'text-[#5a5246]'}`} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[12px] font-black font-mono uppercase truncate">{track.title}</span>
                      <span className={`block text-[10px] font-mono truncate ${on ? 'text-[#efe7d6]/60' : 'text-[#5a5246]'}`}>
                        {track.artist_name}
                        {givenStamp(track.created_date, 'short') ? ` · ${givenStamp(track.created_date, 'short')}` : ''}
                        {track.seconds ? ` · ${Math.floor(track.seconds / 60)}:${String(Math.round(track.seconds % 60)).padStart(2, '0')}` : ''}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <TrackPlate track={active} />
        </>
      )}

      {/* The artist's door — closed until an artist opens it, so the page stays the music. */}
      <div className="mt-6">
        {!doorOpen ? (
          <button
            onClick={() => setDoorOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#efe7d6] text-[#141210] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#1a1612] active:text-[#efe7d6] transition-colors"
          >
            <Plus className="w-4 h-4" /> Your track belongs here too
          </button>
        ) : (
          <div className="border-2 border-[#141210] bg-[#efe7d6] p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-[11px] font-black font-mono uppercase tracking-widest text-[#141210]">Give the record your track</p>
              <button
                onClick={() => setDoorOpen(false)}
                aria-label="Close"
                className="w-11 h-11 flex items-center justify-center border-2 border-[#141210] text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <MusicSubmitForm onSubmitted={load} />
          </div>
        )}
      </div>
    </ClimateRecordShell>
  );
}