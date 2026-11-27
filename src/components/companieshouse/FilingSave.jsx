import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Check, Loader2 } from 'lucide-react';

// Two small saves, and only two: the authentication code when it arrives, and the
// confirmation reference when the filing is done. Both go into the admin-only vault, so the
// next person to open this page — or the next reminder, a year from now — starts with facts
// rather than a hunt.
export default function FilingSave({ facts, onSaved }) {
  const [code, setCode] = useState('');
  const [reference, setReference] = useState('');
  const [busy, setBusy] = useState(null);
  const [note, setNote] = useState(null);

  const save = async (kind) => {
    const value = kind === 'code' ? code.trim() : reference.trim();
    if (!value) return;
    setBusy(kind);
    setNote(null);
    try {
      await base44.entities.SecureVault.create({
        section: 'Filing references and payments',
        label: kind === 'code' ? 'Company authentication code' : 'Confirmation statement filed',
        value,
        notes: kind === 'code'
          ? 'The six-character code used to file on Companies House. Requested or received from Companies House.'
          : `Confirmation statement for the period ending 18/11/2026 filed on ${new Date().toLocaleDateString('en-GB')}.`,
        sort_order: kind === 'code' ? 60 : 61,
      });
      setNote(kind === 'code' ? 'Code saved in the vault.' : 'Filing recorded in the vault.');
      if (kind === 'code') setCode('');
      else setReference('');
      onSaved?.();
    } catch {
      setNote('That could not be saved just now. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      {!facts?.['Company authentication code'] && (
        <div>
          <label htmlFor="auth-code" className="block text-[15px] font-bold text-[#1a1612]">
            When the authentication code arrives
          </label>
          <p className="mt-1 text-[14px] leading-relaxed text-[#3d362e]">
            Six characters, posted to the registered office. Save it here once and it is never lost again.
          </p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              id="auth-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={12}
              autoComplete="off"
              className="min-h-[44px] flex-1 border border-[#1a1612]/40 bg-white px-3 font-mono text-base text-[#1a1612]"
              placeholder="Six characters"
            />
            <button
              type="button"
              onClick={() => save('code')}
              disabled={!code.trim() || busy === 'code'}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#1a1612] bg-[#1a1612] px-4 text-sm font-bold text-[#f4efe4] disabled:opacity-40"
            >
              {busy === 'code' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save code
            </button>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="filing-ref" className="block text-[15px] font-bold text-[#1a1612]">
          When it is filed
        </label>
        <p className="mt-1 text-[14px] leading-relaxed text-[#3d362e]">
          Paste the submission reference. This is the line that means the next reminder can be answered in a minute.
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="filing-ref"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            autoComplete="off"
            className="min-h-[44px] flex-1 border border-[#1a1612]/40 bg-white px-3 font-mono text-base text-[#1a1612]"
            placeholder="Reference from Companies House"
          />
          <button
            type="button"
            onClick={() => save('reference')}
            disabled={!reference.trim() || busy === 'reference'}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#1e3a2b] bg-[#1e3a2b] px-4 text-sm font-bold text-[#f4efe4] disabled:opacity-40"
          >
            {busy === 'reference' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Mark as filed
          </button>
        </div>
      </div>

      {note ? <p className="text-sm font-bold text-[#1e3a2b]" role="status">{note}</p> : null}

      {facts?.['Confirmation statement filed'] ? (
        <p className="border-t border-[#1a1612]/15 pt-3 text-[13.5px] leading-relaxed text-[#6b6258]">
          Recorded in the vault: {facts['Confirmation statement filed']}
        </p>
      ) : null}
    </div>
  );
}