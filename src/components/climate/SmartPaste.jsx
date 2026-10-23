import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Wand2, RefreshCw, Check, AlertTriangle, Link2 } from 'lucide-react';

// PASTE THE EMAIL — the machine fills the form in.
//
// The people who send material to this record send it as a mail: a heading, a link, a line of
// quote, their own signature. Filling four forms out of that by hand is what stops an editor
// sending anything at all — and a record nobody feeds is a record that dies. So the form takes
// the mail as it is.
//
// It arrives in the form still, not on the record: every field it fills can be changed, and a
// person still sends it. The link is the one field the machine will not supply itself — it
// fills it only when the address was actually in the mail, and never from the signature.

export default function SmartPaste({ kind, accept, onParsed, note }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [error, setError] = useState('');

  const read = async () => {
    if (!text.trim()) return;
    setBusy(true); setError(''); setOutcome(null);
    try {
      const res = await base44.functions.invoke('climateParseSubmission', { text, kind });
      const data = res?.data ?? res;
      if (data?.error) throw new Error(data.error);
      const wanted = {};
      for (const key of accept) {
        if (data.fields?.[key]) wanted[key] = data.fields[key];
      }
      onParsed(wanted);
      setOutcome({ verified: !!data.link_verified, links: data.links_in_text || 0, unsure: data.unsure || '' });
    } catch (e) {
      setError('Could not read that. Try again, or fill the form in yourself.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-4 bg-[#efe7d6] border-2 border-[#141210]/25 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Wand2 className="w-3.5 h-3.5 text-[#e2602a] flex-shrink-0" />
        <span className="text-[10px] font-black font-mono uppercase text-[#141210]">Got an email? Paste it</span>
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-2">
        {note || 'Paste the whole mail — heading, link, quote and all. We read it and fill the form in. Check it says what you mean before you send.'}
      </p>
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setOutcome(null); }}
        placeholder="Paste the email here…"
        rows={4}
        className="w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a] resize-none"
      />
      <button
        type="button"
        onClick={read}
        disabled={busy || !text.trim()}
        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#e2602a] text-[#141210] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors disabled:opacity-40"
      >
        {busy ? <><RefreshCw className="w-4 h-4 animate-spin" /> Reading it…</> : <><Wand2 className="w-4 h-4" /> Read it and fill the form</>}
      </button>

      {outcome && (
        <div className="mt-2 space-y-1">
          {outcome.verified ? (
            <p className="text-[10px] font-mono text-[#1e3a2b] flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> Form filled in. The origin link was found in your email and copied across exactly.
            </p>
          ) : (
            <p className="text-[10px] font-mono text-[#b3261e] flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              {outcome.links > 0
                ? 'Form filled in, but no origin link could be confirmed from your email. Paste the link to the source yourself — nothing goes on the record without one.'
                : 'Form filled in. There was no link in that email at all, so the source link is empty — paste it yourself.'}
            </p>
          )}
          {outcome.unsure && (
            <p className="text-[10px] font-mono text-[#5a5246] flex items-start gap-1.5">
              <Link2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> Not certain: {outcome.unsure}
            </p>
          )}
        </div>
      )}

      {error && <p className="text-[10px] font-mono text-[#b3261e] mt-2">{error}</p>}
    </div>
  );
}