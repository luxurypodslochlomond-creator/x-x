import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Music, Check, AlertTriangle } from 'lucide-react';
import { readMasterSpec } from './audioSpec';
import { fingerprintMaster } from './masterPrint';
import { createPageUrl } from '@/utils';

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

const FIELD = 'w-full px-3 py-3 min-h-[44px] bg-[#f7f1e5] border-2 border-[#141210]/25 focus:border-[#141210] text-[16px] sm:text-[13px] font-mono text-[#141210] outline-none transition-colors';
const LABEL = 'block text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246] mb-1.5';

export default function MusicSubmitForm({ onSubmitted }) {
  const [artistName, setArtistName] = useState('');
  const [artistLink, setArtistLink] = useState('');
  const [title, setTitle] = useState('');
  const [statement, setStatement] = useState('');
  const [lyric, setLyric] = useState('');
  const [giving, setGiving] = useState('track');
  const [tracklist, setTracklist] = useState('');
  const [email, setEmail] = useState('');
  const [master, setMaster] = useState(null);
  const [masterOffer, setMasterOffer] = useState('take_it_whole');
  const [masterSpec, setMasterSpec] = useState('');
  const [masterSeconds, setMasterSeconds] = useState(null);
  const [masterPrint, setMasterPrint] = useState('');
  const [cover, setCover] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const isSet = giving === 'set';

  const pickMaster = async (file) => {
    setMaster(file || null);
    setMasterSpec('');
    setMasterSeconds(null);
    setMasterPrint('');
    if (file) {
      const { spec, seconds } = await readMasterSpec(file);
      setMasterSpec(spec);
      setMasterSeconds(seconds);
      setMasterPrint(await fingerprintMaster(file));
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
          master_sha256: masterPrint,
          master_offer: masterOffer,
          kind: isSet ? 'set' : undefined,
          tracklist: isSet ? tracklist : undefined,
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
            ? `Your ${isSet ? 'set' : 'track'} is on the record and anyone can hear it — your name on it, the master exactly as you gave it${isSet ? ', whole and uncut' : ''}. Read as: ${String(result.kind || 'other').replace(/_/g, ' ')}.`
            : `Nothing is lost and nothing is thrown away: your ${isSet ? 'set' : 'track'} is held, with its file and your words, until a keeper has read it. Your name stays on it, and it goes up as it is.`}
        </p>
        <p className="text-[10px] font-mono text-[#5a5246] mt-2 leading-relaxed">
          It is never edited, re-encoded, sold or counted, and no one can take your name off it.
          {' '}Your choice about the master stands written on the track, where anyone can read it.
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

      {/* What is being given. A set is named by the person who made it, because the arc of a
          set is theirs to name and nothing here hears the work. */}
      <div>
        <label className={LABEL}>What you are giving</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'track', label: 'One track' },
            { key: 'set', label: 'A whole set' },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setGiving(option.key)}
              className={`px-3 py-3 min-h-[44px] border-2 text-[11px] font-black font-mono uppercase transition-colors ${
                giving === option.key
                  ? 'bg-[#141210] text-[#efe7d6] border-[#141210]'
                  : 'bg-[#f7f1e5] text-[#141210] border-[#141210]/25 active:border-[#141210]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {isSet && (
          <p className="text-[10px] font-mono text-[#5a5246] mt-2 leading-relaxed">
            A set is one piece of work and it is kept whole: this record never cuts it into chapters, never
            splits the file, and never serves it in pieces. The arc is the work.
          </p>
        )}
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
        {masterPrint && (
          <p className="text-[10px] font-mono text-[#5a5246] mt-1.5 leading-relaxed">
            Its own fingerprint, read on your device: <b className="font-black break-all">{masterPrint.slice(0, 16)}…</b> Kept with the track,
            so what you gave can never quietly become something else — and anyone can check it rather than trust it.
          </p>
        )}
        <p className="text-[9px] font-mono text-[#5a5246] mt-1.5 leading-relaxed">
          Give the master itself, in whatever format and resolution you work at. Nothing is converted, ever — what you
          hand over is what is kept and what is served. A FLAC plays in nearly every browser as it stands; a WAV or an
          AIFF may not stream on every device, which is why the file you give can also be offered to take and play
          anywhere — your choice, below. Stored publicly — anyone with the link can open them. That is the whole point: anyone, anywhere, no account, nothing to buy.
        </p>
      </div>

      {/* The giver's choice, made once, at the door — and said plainly on the track after this,
          so nobody has to ask them for it. Not a licence either way, and no lock: a lock on a
          file is the one thing this record does not do. The generous answer is the default. */}
      <div>
        <label className={LABEL}>How your master is offered</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'take_it_whole', label: 'Take it whole' },
            { key: 'listen_here_only', label: 'Heard here only' },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setMasterOffer(option.key)}
              className={`px-3 py-3 min-h-[44px] border-2 text-[11px] font-black font-mono uppercase transition-colors ${
                masterOffer === option.key
                  ? 'bg-[#141210] text-[#efe7d6] border-[#141210]'
                  : 'bg-[#f7f1e5] text-[#141210] border-[#141210]/25 active:border-[#141210]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-[10px] font-mono text-[#5a5246] mt-2 leading-relaxed">
          {masterOffer === 'take_it_whole'
            ? 'Anyone may take the master, play it out and pass it on — your name stays on the work. Not a licence, and nothing added to it: the work stays yours, and this is a gift that travels.'
            : 'It is heard on the record and not offered for taking. The file is still kept exactly as you gave it — and said plainly: it sits at a public address, so someone who goes looking can reach it. The record will not pretend otherwise.'}
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

      {isSet && (
        <div>
          <label className={LABEL} htmlFor="track-tracklist">The works inside it, in your own order</label>
          <textarea id="track-tracklist" value={tracklist} onChange={(e) => setTracklist(e.target.value)} rows={6} className={FIELD} placeholder={'One to a line, as you would write them.\nArtists, titles, anything you want said.'} />
          <p className="text-[9px] font-mono text-[#5a5246] mt-1.5 leading-relaxed">
            Kept exactly as you write it, in your order and your spelling, and shown as your text. The record takes this
            list on your word: it does not check another person's tracklist, and it never moves a work to a name you did
            not give. Leave it empty if you would rather — a set without a list is still a set.
          </p>
        </div>
      )}

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
        <p className="text-[10px] font-mono text-[#6b6258] mt-1.5 leading-relaxed">
          Your address is kept so the record can reach you about this track, and is never shown to a listener. What that means, in full: <a href={createPageUrl('ClimatePrivacy')} target="_blank" rel="noopener noreferrer" className="underline text-[#141210]">Privacy page</a>.
        </p>
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