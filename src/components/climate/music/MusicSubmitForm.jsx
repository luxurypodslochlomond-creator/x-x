import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Music, Check, AlertTriangle } from 'lucide-react';
import { readMasterSpec } from './audioSpec';

// ── GIVE THE RECORD YOUR TRACK ──────────────────────────────────────────────────
// The artist's own door, and nothing is asked of them that costs them anything: no
// account, no signature, no exclusive, no fee. What they give, they keep — their name
// stays on the track, the master is stored exactly as they gave it, and it is served
// whole to anyone who wants to hear it, for nothing.
//
// The record reads the master before it goes up: the first kilobyte is opened on the
// artist's own device and its header walked, so the page can state the track's real
// format instead of asking the artist to describe their own file. What is printed is
// the file's own truth, not a promise.

const FIELD = 'w-full px-3 py-3 min-h-[44px] bg-[#f7f1e5] border-2 border-[#141210]/25 focus:border-[#141210] text-[13px] font-mono text-[#141210] outline-none transition-colors';
const LABEL = 'block text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246] mb-1.5';

export default function MusicSubmitForm({ onSubmitted }) {
  const [artistName, setArtistName] = useState('');
  const [artistLink, setArtistLink] = useState('');
  const [title, setTitle] = useState('');
  const [statement, setStatement] = useState('');
  const [lyric, setLyric] = useState('');
  const [email, setEmail] = useState('');
  const [master, setMaster] = useState(null);
  const [masterSpec, setMasterSpec] = useState('');
  const [masterSeconds, setMasterSeconds] = useState(null);
  const [cover, setCover] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const pickMaster = async (file) => {
    setMaster(file || null);
    setMasterSpec('');
    if (file) {
      const { spec, seconds } = await readMasterSpec(file);
      setMasterSpec(spec);
      setMasterSeconds(seconds);
    }
  };

  const send = async () => {
    if (!master) { setError('Choose the master file first — the record takes the file itself, not a link.'); return; }
    if (!artistName.trim() || !title.trim() || !email.trim()) { setError('A track needs your name, its title, and an email we can reach you on.'); return; }
    setError('');
    setBusy(true);
    try {
      const { file_url: audioUrl } = await base44.integrations.Core.UploadPublicFile({ file: master });
      let coverUrl = '';
      if (cover) {
        const { file_url } = await base44.integrations.Core.UploadPublicFile({ file: cover });
        coverUrl = file_url;
      }
      const res = await base44.functions.invoke('climateMusicSubmit', {
        data: {
          title, artist_name: artistName, artist_link: artistLink, statement, lyric,
          audio_url: audioUrl, cover_url: coverUrl, submitter_email: email,
          spec: masterSpec,
          seconds: masterSeconds ?? undefined,
        },
      });
      setResult(res?.data || { success: false });
      onSubmitted?.();
    } catch (e) {
      setError(e?.message || 'That did not go through — try once more.');
    } finally {
      setBusy(false);
    }
  };

  if (result?.success) {
    const live = result.status === 'published';
    return (
      <div className={`border-2 p-4 ${live ? 'border-[#1e3a2b] bg-[#1e3a2b]/5' : 'border-[#b8860b] bg-[#b8860b]/5'}`}>
        <div className="flex items-center gap-2 mb-2">
          {live ? <Check className="w-4 h-4 text-[#1e3a2b]" /> : <AlertTriangle className="w-4 h-4 text-[#b8860b]" />}
          <p className={`text-[11px] font-black font-mono uppercase tracking-widest ${live ? 'text-[#1e3a2b]' : 'text-[#b8860b]'}`}>
            {live ? 'On the record now' : 'Waiting for a keeper'}
          </p>
        </div>
        <p className="text-[12px] font-mono text-[#141210] leading-relaxed">
          {live
            ? `Your track is on the record and anyone can hear it — your name on it, the master exactly as you gave it. Read as: ${String(result.kind || 'other').replace(/_/g, ' ')}.`
            : 'Nothing is lost and nothing is thrown away: your track is held, with its file and your words, until a keeper has read it. Your name stays on it, and it goes up as it is.'}
        </p>
        <p className="text-[10px] font-mono text-[#5a5246] mt-2 leading-relaxed">
          It is never edited, re-encoded, sold or counted, and no one can take your name off it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-l-4 border-l-[#e2602a] bg-[#efe7d6] px-3 py-3">
        <p className="text-[11px] font-mono text-[#141210] leading-relaxed">
          No account, no signature, no exclusive — you keep everything, and your name stays on it.
          Your master is kept exactly as you give it: never re-encoded, never trimmed, never sold.
        </p>
      </div>

      <div>
        <label className={LABEL} htmlFor="track-master">The master file</label>
        <input
          id="track-master"
          type="file"
          accept="audio/*,.wav,.aiff,.aif,.flac,.mp3,.m4a"
          onChange={(e) => pickMaster(e.target.files?.[0] || null)}
          className="w-full px-3 py-3 min-h-[44px] bg-[#f7f1e5] border-2 border-[#141210]/25 focus:border-[#141210] text-[11px] font-mono text-[#141210] outline-none file:mr-3 file:px-3 file:py-2 file:border-2 file:border-[#141210] file:bg-[#e2602a] file:text-[#141210] file:text-[10px] file:font-black file:font-mono file:uppercase"
        />
        {masterSpec && (
          <p className="text-[10px] font-mono text-[#1e3a2b] mt-2 leading-relaxed">
            The record read your master: <b className="font-black">{masterSpec}</b>
          </p>
        )}
        <p className="text-[9px] font-mono text-[#5a5246] mt-1.5 leading-relaxed">
          Stored publicly — anyone with the link can open them. That is the whole point: anyone, anywhere, no account, nothing to buy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={LABEL} htmlFor="track-artist">Your name, as it should stand on it</label>
          <input id="track-artist" value={artistName} onChange={(e) => setArtistName(e.target.value)} className={FIELD} placeholder="The name you keep" />
        </div>
        <div>
          <label className={LABEL} htmlFor="track-title">The track's title</label>
          <input id="track-title" value={title} onChange={(e) => setTitle(e.target.value)} className={FIELD} placeholder="What it is called" />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="track-statement">Your own words about it <span className="normal-case tracking-normal">(if you want any)</span></label>
        <textarea id="track-statement" value={statement} onChange={(e) => setStatement(e.target.value)} rows={3} className={FIELD} placeholder="Quoted exactly as you write it. Nothing is corrected or paraphrased." />
      </div>

      <div>
        <label className={LABEL} htmlFor="track-lyric">The words of the track <span className="normal-case tracking-normal">(if there are any)</span></label>
        <textarea id="track-lyric" value={lyric} onChange={(e) => setLyric(e.target.value)} rows={4} className={FIELD} placeholder="Shown as your text, kept as your text." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={LABEL} htmlFor="track-link">One link of your own <span className="normal-case tracking-normal">(optional)</span></label>
          <input id="track-link" value={artistLink} onChange={(e) => setArtistLink(e.target.value)} className={FIELD} placeholder="Your site or page" />
        </div>
        <div>
          <label className={LABEL} htmlFor="track-cover">A picture for it <span className="normal-case tracking-normal">(optional)</span></label>
          <input
            id="track-cover"
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
            className="w-full px-3 py-3 min-h-[44px] bg-[#f7f1e5] border-2 border-[#141210]/25 focus:border-[#141210] text-[11px] font-mono text-[#141210] outline-none file:mr-3 file:px-3 file:py-2 file:border-2 file:border-[#141210] file:bg-[#efe7d6] file:text-[#141210] file:text-[10px] file:font-black file:font-mono file:uppercase"
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="track-email">Your email <span className="normal-case tracking-normal">— used only to reach you about this track, never published</span></label>
        <input id="track-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={FIELD} placeholder="you@example.com" />
      </div>

      {/* The honeypot: a person never sees it, a bot fills it in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" onChange={() => {}} />

      {error && (
        <p className="text-[11px] font-mono text-[#b3261e] border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2 leading-relaxed">{error}</p>
      )}

      <button
        onClick={send}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#e2602a] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors disabled:opacity-50"
      >
        <Music className="w-4 h-4" />
        {busy ? 'Reading it, then putting it up…' : 'Give it to the record'}
      </button>

      <p className="text-[9px] font-mono text-[#5a5246] leading-relaxed">
        It is read at once, not queued: a track that is clean goes up the moment you send it. If the
        screener flags it, it waits for a person instead — and you keep your name either way.
      </p>
    </div>
  );
}