import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Check, X, HelpCircle, ExternalLink, RefreshCw } from 'lucide-react';

// The checking room. One page, three buttons, no training: open the source, then say whether
// it says what the entry claims. A volunteer here is not junior staff being kept away from the
// real machine — they are the pair of eyes the record promises, and this is the whole of their
// job. Nothing on this page can publish, edit or delete anything.
const ANSWERS = [
  { id: 'holds', label: 'The source says it', tone: '#1e3a2b', Icon: Check },
  { id: 'does_not_hold', label: 'It does not', tone: '#b3261e', Icon: X },
  { id: 'cannot_tell', label: 'Could not tell', tone: '#b8860b', Icon: HelpCircle },
];

const WORD = { holds: 'source says it', does_not_hold: 'it does not', cannot_tell: 'could not tell' };

export default function ClimateChecking() {
  const [me, setMe] = useState(null);
  const [entries, setEntries] = useState([]);
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await base44.functions.invoke('checkerQueue', {});
      setMe(res.data.checker);
      setEntries(res.data.entries || []);
      setChecks(res.data.checks || []);
    } catch (e) {
      setError(e?.response?.status === 403 ? 'not_a_checker' : 'That did not load. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setDraft = (id, patch) =>
    setDrafts((p) => ({ ...p, [id]: { ...(p[id] || {}), ...patch } }));

  const save = async (entry) => {
    const d = drafts[entry.id] || {};
    if (!d.verdict) return;
    setSaving(entry.id);
    setError('');
    try {
      const res = await base44.functions.invoke('checkerNote', {
        entry_type: entry.type,
        entry_id: entry.id,
        entry_title: entry.title || '',
        verdict: d.verdict,
        note: d.note || '',
      });
      const saved = res.data.saved;
      setChecks((c) => [{ ...saved, entry_id: entry.id, checker_name: saved.checker_name, note: d.note || '' }, ...c]);
      setEntries((list) => list.filter((x) => x.id !== entry.id));
      setDrafts((p) => { const n = { ...p }; delete n[entry.id]; return n; });
    } catch (e) {
      setError(e?.response?.data?.error || 'That note did not save. Try again.');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-record-paper">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-record-muted">opening the queue</span>
      </div>
    );
  }

  if (error === 'not_a_checker') {
    return (
      <div className="min-h-[60vh] bg-record-paper px-5 py-16">
        <div className="max-w-xl mx-auto border-2 border-record-ink/20 bg-record-bone p-6">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-record-red mb-3">not on the list</p>
          <h1 className="font-black text-record-ink text-xl mb-3">Checking is by invitation.</h1>
          <p className="text-sm text-record-ink/80 leading-relaxed">
            This room opens for people a keeper has added by name. Ask for your email address to be put on the list,
            and it will open on your next sign-in.
          </p>
          <p className="text-sm text-record-ink/80 leading-relaxed mt-3">
            <Link to={createPageUrl('ClimateFellows')} className="font-black text-record-red underline">
              What checking involves, and how to ask
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-record-paper pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red mb-3">checking the record</p>
        <h1 className="font-black text-record-ink text-2xl leading-tight mb-2">
          {me?.name ? `${me.name}, open the source and say what you find.` : 'Open the source and say what you find.'}
        </h1>
        <p className="text-sm text-record-ink/75 leading-relaxed mb-1">
          You are not approving anything. Nothing you do here publishes, edits or deletes an entry: you say whether the
          link opens and whether it says what the entry claims, and a keeper decides with your words in front of them.
        </p>
        <p className="text-[11px] font-mono text-record-muted mb-6">
          {entries.length} {entries.length === 1 ? 'entry is' : 'entries are'} waiting · signed as {me?.name}
        </p>

        {error && error !== 'not_a_checker' && (
          <p className="text-[11px] font-mono text-record-red border-l-4 border-l-record-red pl-3 mb-5">{error}</p>
        )}

        {!entries.length && (
          <div className="border-2 border-record-ink/15 bg-record-bone p-6">
            <p className="text-sm text-record-ink/80 leading-relaxed">
              Nothing is waiting. Everything submitted has been looked at. Come back when the next one arrives.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {entries.map((entry) => {
            const d = drafts[entry.id] || {};
            const already = checks.filter((c) => c.entry_id === entry.id);
            return (
              <div key={entry.id} className="bg-record-bone border-2 border-record-ink/20 p-4">
                <p className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-record-muted mb-1">
                  {entry.type === 'comment' ? 'comment' : entry.type}
                  {entry.source_name ? ` · ${entry.source_name}` : ''}
                </p>
                <h2 className="font-black text-record-ink text-base leading-snug mb-2">{entry.title}</h2>
                {entry.body && entry.body !== entry.title && (
                  <p className="text-[12px] text-record-ink/80 leading-relaxed mb-3 line-clamp-4">{entry.body}</p>
                )}

                {entry.source_url ? (
                  <a
                    href={entry.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] px-3 mb-3 border-2 border-record-ink text-[10px] font-black font-mono uppercase text-record-ink active:bg-record-ink active:text-record-paper"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> open the source
                  </a>
                ) : (
                  <p className="text-[10px] font-mono uppercase text-record-red mb-3">no source link on this entry</p>
                )}

                {already.length > 0 && (
                  <div className="border-l-4 border-l-record-ink/30 bg-record-paper/60 pl-2 py-1 mb-3">
                    {already.map((c) => (
                      <p key={c.id} className="text-[10px] font-mono text-record-ink/70 leading-relaxed">
                        <span className="font-black uppercase">{WORD[c.verdict] || c.verdict} · {c.checker_name}</span>
                        {c.note ? ` — ${c.note}` : ''}
                      </p>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 mb-2">
                  {ANSWERS.map(({ id, label, tone, Icon }) => {
                    const on = d.verdict === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setDraft(entry.id, { verdict: id })}
                        className="flex flex-col items-center justify-center gap-1 min-h-[52px] px-1 border-2 text-[9px] font-black font-mono uppercase leading-tight"
                        style={{
                          borderColor: on ? tone : 'rgba(26,22,18,0.25)',
                          color: on ? '#f4efe4' : tone,
                          background: on ? tone : 'transparent',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {d.verdict && d.verdict !== 'holds' && (
                  <textarea
                    value={d.note || ''}
                    onChange={(e) => setDraft(entry.id, { note: e.target.value })}
                    rows={3}
                    placeholder="What did you find? A few words is enough."
                    className="w-full p-2 text-[12px] font-mono bg-record-paper border-2 border-record-ink/25 text-record-ink mb-2"
                  />
                )}
                {d.verdict === 'holds' && (
                  <textarea
                    value={d.note || ''}
                    onChange={(e) => setDraft(entry.id, { note: e.target.value })}
                    rows={2}
                    placeholder="Anything worth adding (optional)."
                    className="w-full p-2 text-[12px] font-mono bg-record-paper border-2 border-record-ink/25 text-record-ink mb-2"
                  />
                )}

                <button
                  onClick={() => save(entry)}
                  disabled={!d.verdict || saving === entry.id}
                  className="w-full min-h-[44px] bg-record-ink text-record-paper text-[10px] font-black font-mono uppercase tracking-[0.2em] disabled:opacity-30"
                >
                  {saving === entry.id ? 'saving' : 'put my name to it'}
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={load}
          className="mt-8 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-record-muted"
        >
          <RefreshCw className="w-3.5 h-3.5" /> look again
        </button>

        <p className="text-[10px] font-mono text-record-muted leading-relaxed mt-8 border-t border-record-ink/15 pt-4">
          Your notes are kept in your name and are never edited afterwards. If your access is ended, what you found stays
          on the record: ending access is not the same as erasing work.
        </p>
      </div>
    </div>
  );
}