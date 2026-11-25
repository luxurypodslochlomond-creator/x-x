import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Music, RefreshCw } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import TrackPlate from '@/components/climate/music/TrackPlate';
import MusicDeck from '@/components/climate/music/MusicDeck';
import MusicFind from '@/components/climate/music/MusicFind';
import MusicTerms from '@/components/climate/music/MusicTerms';
import ThemeSignal from '@/components/climate/music/ThemeSignal';
import Transmission from '@/components/climate/Transmission';
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

// A cultural check is a person hearing every piece, not a machine reading its title.
// While it is being made, the record's own theme is the only music that stands.
const MUSIC_HOLD = true;

export default function ClimateMusic() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  // ── A LINK CAN NAME ONE PIECE ────────────────────────────────────────────────
  // The seal page fingerprints one track's words, so its row should open that track and
  // not a room of twenty-one with the reader left to find it. ?track=<id> does exactly
  // that, and does nothing else: if the piece named is not standing (the record's music
  // is still held for a person to hear, so most are not), the room opens on whatever is
  // standing rather than on an empty plate. No play is counted, nothing is ranked.
  const [activeId, setActiveId] = useState(
    () => new URLSearchParams(window.location.search).get('track') || null
  );
  const [word, setWord] = useState('');
  const [kind, setKind] = useState('');
  const [kinds, setKinds] = useState([]);
  const [total, setTotal] = useState(0);
  const [themeTrack, setThemeTrack] = useState(null);
  // A keeper alone decides which piece stands as the record's theme; nobody else ever sees the control.
  const [isAdmin, setIsAdmin] = useState(false);

  // A word finds a track by what the record actually holds — its title, the artist's
  // name, and the words either of them gave with it. Never by how many people played
  // it, because nothing here is counted. The asking happens on the record itself, not
  // on a copy of it kept in this browser, so a track given a minute ago is as findable
  // as one given last year.
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = { status: 'published' };
      // ── HELD AT JANINE'S ASKING, 9 NOVEMBER 2026 ──
      // "Music needs to be checked for cultural sensitivity… no war symbols, no unkind
      // references of any kind, only positive." Until each piece has been heard by a
      // person against that test, only the record's own theme stands. Nothing is deleted:
      // every track given is still on the record, whole and untouched, waiting. Turn this
      // off (or set theme on the pieces that have passed) and they stand again.
      if (MUSIC_HOLD) query.theme = true;
      if (kind) query.kind = kind;
      const asked = word.trim();
      if (asked) {
        query.$or = [
          { title: { $regex: asked, $options: 'i' } },
          { artist_name: { $regex: asked, $options: 'i' } },
          { statement: { $regex: asked, $options: 'i' } },
          { lyric: { $regex: asked, $options: 'i' } },
          { tracklist: { $regex: asked, $options: 'i' } },
        ];
      }
      const { items } = await base44.entities.ClimateTrack.filter(query, { sort: '-created_date', limit: 50 });
      setTracks(items);
      setActiveId((current) => (current && items.some((t) => t.id === current) ? current : items[0]?.id || null));
      // The shelves offered are the kinds actually standing on the record — read off the
      // record itself, so no chip can ever promise a kind that has no music on it.
      if (!asked && !kind) {
        setKinds((prev) => (prev.length ? prev : [...new Set(items.map((t) => t.kind).filter(Boolean))]));
      }
    } finally {
      setLoading(false);
    }
  }, [word, kind]);

  // A word is not sent letter by letter: it waits a moment, then asks once.
  useEffect(() => {
    const id = setTimeout(load, word.trim() ? 300 : 0);
    return () => clearTimeout(id);
  }, [load, word]);

  useEffect(() => {
    base44.entities.ClimateTrack.count(MUSIC_HOLD ? { status: 'published', theme: true } : { status: 'published' }).then(setTotal);
  }, []);

  // The theme is read off the record itself, never from a list kept here, so the day it is
  // given it is simply standing.
  useEffect(() => {
    base44.entities.ClimateTrack.filter({ status: 'published', theme: true }, { limit: 1 })
      .then((page) => setThemeTrack(page.items?.[0] || null))
      .catch(() => setThemeTrack(null));
  }, []);

  useEffect(() => {
    base44.auth.me().then((u) => setIsAdmin(u?.role === 'admin')).catch(() => setIsAdmin(false));
  }, []);

  const markTheme = async (track) => {
    if (!track) return;
    const already = themeTrack?.id === track.id;
    // A theme is a signal, not a prize: marking another piece takes it off the last.
    await base44.entities.ClimateTrack.updateMany({ theme: true }, { $set: { theme: false } });
    if (!already) await base44.entities.ClimateTrack.update(track.id, { theme: true });
    const page = await base44.entities.ClimateTrack.filter({ theme: true }, { limit: 1 });
    setThemeTrack(page.items?.[0] || null);
  };

  const active = tracks.find((t) => t.id === activeId) || null;

  return (
    <>
    <ClimateRecordShell
      eyebrow="The record's music"
      marker="Given to the record · never sold · no plays counted, no cut taken"
      title="Music"
      statement="Music given to the record. Free to hear, the master whole, the artist's name kept on it."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
    >
      {/* The record's own signal, above the field — pressed to play, never played at anyone. */}
      <ThemeSignal track={themeTrack} />

      {/* The sphere stands first, before anything asks for a word: you should be able to
          see and hear a piece, and feel whether it resonates, before you go looking. */}
      {active && (
        <div className="mb-4" id="music-deck">
          <MusicDeck track={active} />
        </div>
      )}

      {/* A field of one piece is not a shelf to search: while the theme is the only thing
          standing, asking a reader to look through it is furniture, not music. */}
      {tracks.length > 1 && (
        <MusicFind
          word={word}
          onWord={setWord}
          kind={kind}
          onKind={setKind}
          kinds={kinds}
          shown={tracks.length}
          total={total || tracks.length}
          loading={loading}
        />
      )}

      {/* Her rule, printed rather than assumed: music is heard by a person before it stands
          here, and the test is cultural — no war symbols, no unkind reference of any kind,
          only what is positive. Until a piece has passed that, it is held: nothing given is
          deleted, and only the record's own theme stands while the check is being made. */}
      <p className="mb-4 border-l-4 border-l-[#141210]/25 pl-3 text-[11px] font-mono leading-relaxed text-[#5a5246]">
        Every piece is heard by a person first: no war symbols, nothing unkind, only what is positive.
      </p>

      {loading ? (
        <div className="border-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-10 text-center">
          <RefreshCw className="w-5 h-5 animate-spin text-[#5a5246] mx-auto mb-3" />
          <p className="text-[11px] font-mono text-[#5a5246]">Bringing the music through…</p>
        </div>
      ) : tracks.length === 0 ? (
        word.trim() || kind ? (
          <div className="border-2 border-[#141210]/15 bg-[#efe7d6] px-4 py-10 text-center">
            <p className="text-[12px] font-black font-mono uppercase text-[#141210]">Nothing on the record holds that</p>
            <p className="text-[11px] font-mono text-[#5a5246] mt-2 leading-relaxed">
              {MUSIC_HOLD
                ? 'While the check is being made, only the record\u2019s theme stands here.'
                : 'Try an artist\u2019s name, a word from a title, or the kind of piece it is.'}
            </p>
            <button
              onClick={() => { setWord(''); setKind(''); }}
              className="mt-4 px-4 min-h-[44px] border-2 border-[#141210] bg-[#efe7d6] text-[11px] font-black font-mono uppercase text-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
            >
              Show everything on the record
            </button>
          </div>
        ) : null
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
                    onClick={() => {
                      setActiveId(track.id);
                      // The sphere is the head of the page: choosing a track brings you back
                      // to it, so what you picked is the thing you are looking at.
                      document.getElementById('music-deck')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
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

          {isAdmin && (
            <button
              onClick={() => markTheme(active)}
              className="mt-3 w-full px-3 py-3 min-h-[44px] border-2 border-[#141210]/30 text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
            >
              {themeTrack?.id === active?.id ? 'Standing as the theme · take it down' : 'Stand this piece as the record\u2019s theme'}
            </button>
          )}
        </>
      )}

      {/* The door for artists is closed at Janine's request, 9 November 2026: "it would be
          helpful to not distract by inviting music… it will take viewers away from the
          entries of solutions and crises." Nothing already given has been touched — the
          record's own theme still stands, and the terms below still say what the record
          promises about a master. Nothing new is invited. */}

      {/* The record's own terms, at the foot of the page: what it claims, and how any
          stranger can test each claim. Free is a condition here, not a price. */}
      <MusicTerms />
    </ClimateRecordShell>

    {/* The transmission stands here now, in the music room, where a reader has come on
        purpose to listen. It no longer crosses the record's front page, so nothing asks
        to be heard before the reading has started. Full width, under the page's column. */}
    <Transmission />
    </>
  );
}