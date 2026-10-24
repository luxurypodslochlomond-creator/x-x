import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Trash2, RefreshCw, AlertTriangle } from 'lucide-react';

// ── THE LINES LEFT UNDER THE MUSIC ──────────────────────────────────────────────
// A keeper is the only person who can take a listener's line down, and only for
// something unlawful. What happens next is the point of this panel: the line goes, and
// a note stays where it stood — that one came off, when, and on what grounds. The note
// never reprints the line: taking something down is not the same as erasing that it
// happened, and on a record that corrects everything else in daylight, a line vanishing
// without trace would be the one silent edit.
//
// Disagreement is not a ground. A listener criticising the work, the artist or the
// record stays exactly where they wrote it — this panel is not for tidying a room of a
// person who said something the artist would rather not read.

const today = () =>
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ListenerLinesPanel() {
  const [lines, setLines] = useState([]);
  const [titles, setTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [grounds, setGrounds] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { items } = await base44.entities.ClimateWord.filter(
        { status: 'published' },
        { sort: '-created_date', limit: 25 },
      );
      setLines(items);
      const ids = [...new Set(items.map((l) => l.track_id).filter(Boolean))];
      if (ids.length) {
        const { items: found } = await base44.entities.ClimateTrack.filter({ id: { $in: ids } }, { limit: 50 });
        const map = {};
        found.forEach((t) => { map[t.id] = `${t.title} — ${t.artist_name}`; });
        setTitles(map);
      }
    } catch (e) {
      setError(e?.message || 'The lines did not come through.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const takeDown = async (line) => {
    if (grounds.trim().length < 4) {
      setError('Write the grounds first — why it came down. The line itself is never reprinted.');
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    try {
      // The note is left where the line stood, and it is left there before the line goes,
      // so a failure can never take a line away and leave nothing behind in its place.
      let track = null;
      try { track = await base44.entities.ClimateTrack.get(line.track_id); } catch { track = null; }
      if (track) {
        const note = `${today()} · a line was taken down: ${grounds.trim()}`;
        const standing = track.words_note ? `${track.words_note}\n\n` : '';
        await base44.entities.ClimateTrack.update(track.id, { words_note: `${note}${standing}` });
      }
      await base44.entities.ClimateWord.delete(line.id);
      setNotice(track ? 'Taken down, and the record says so where the line stood.' : 'Taken down. Its track has gone, so there was nowhere to leave the note.');
      setOpenId(null);
      setGrounds('');
      await load();
    } catch (e) {
      setError(e?.message || 'That did not go through — the line is still standing.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-6 border-2 border-[#1a1612]/25 bg-[#efe7d6] p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h2 className="text-[11px] font-black font-mono uppercase tracking-[0.18em] text-[#1a1612]">
            Lines left under the music
          </h2>
          <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mt-1.5">
            The most recent lines, as listeners wrote them. A line comes down only for something unlawful: a threat, incitement,
            words that are abusive, or private details about somebody who did not put them here. Criticising the work, the artist or
            the record is not a ground, and never was. Taking one down leaves a note in the open, where the line stood.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-2 border-2 border-[#1a1612] text-[10px] font-black font-mono uppercase bg-[#f7f1e5] active:bg-[#1a1612] active:text-[#efe7d6] transition-colors flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {notice && <p className="text-[10px] font-mono text-[#1e3a2b] leading-relaxed mb-2">{notice}</p>}
      {error && (
        <p className="flex items-start gap-1.5 text-[10px] font-mono text-[#b3261e] leading-relaxed mb-2">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {error}
        </p>
      )}

      {loading ? (
        <p className="text-[10px] font-mono text-[#6b6258]">Bringing the lines through…</p>
      ) : lines.length === 0 ? (
        <p className="text-[10px] font-mono text-[#6b6258]">No lines stand under the music yet.</p>
      ) : (
        <ul className="space-y-2">
          {lines.map((line) => (
            <li key={line.id} className="bg-[#f7f1e5] border-2 border-[#1a1612]/20 p-3">
              <p className="text-[11px] font-mono text-[#1a1612] leading-relaxed whitespace-pre-wrap">{line.word}</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#6b6258] mt-1.5">
                {line.listener_name ? `${line.listener_name}, a listener` : 'A listener'} · under {titles[line.track_id] || 'a track'}
              </p>

              {openId === line.id ? (
                <div className="mt-2">
                  <label className="block text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#6b6258] mb-1.5" htmlFor={`grounds-${line.id}`}>
                    The grounds, in your own words — shown on the track, never the line
                  </label>
                  <textarea
                    id={`grounds-${line.id}`}
                    value={grounds}
                    onChange={(e) => setGrounds(e.target.value)}
                    rows={2}
                    maxLength={400}
                    className="w-full px-3 py-2 bg-[#f7f1e5] border-2 border-[#1a1612]/25 focus:border-[#1a1612] text-[11px] font-mono text-[#1a1612] outline-none"
                    placeholder="What makes this unlawful — a threat, incitement, abuse, or another person's private details."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => takeDown(line)}
                      disabled={busy}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] bg-[#b3261e] text-[#efe7d6] text-[10px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#1a1612] transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Take it down, and say so
                    </button>
                    <button
                      onClick={() => { setOpenId(null); setGrounds(''); setError(''); }}
                      className="px-3 py-2.5 min-h-[44px] bg-[#f7f1e5] text-[#1a1612] text-[10px] font-black font-mono uppercase border-2 border-[#1a1612]/25"
                    >
                      Leave it
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setOpenId(line.id); setGrounds(''); setError(''); setNotice(''); }}
                  className="flex items-center gap-1.5 mt-2 px-3 py-2 min-h-[40px] bg-[#efe7d6] border-2 border-[#1a1612]/25 text-[9px] font-black font-mono uppercase text-[#1a1612] active:border-[#b3261e] active:text-[#b3261e] transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Take it down
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}