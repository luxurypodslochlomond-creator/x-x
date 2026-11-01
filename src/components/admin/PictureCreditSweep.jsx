import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { RefreshCw, Image, Check } from 'lucide-react';

// THE PICTURE AND CREDIT SWEEP.
//
// Janine's spec asks for "vibrant images top and throughout" and copyright-free pictures that
// carry their credit. Once the entries are in, three things go quietly wrong, and none of them
// look wrong on the page: a credit stands with no picture under it, a credit names a platform
// instead of a person, or an entry has no picture at all. Somebody has to go and look through
// the record to find them. This is that look, in one tap.
//
// It only ever reports. It will not write a credit and never guesses a photographer: an invented
// credit is worse than a missing one, because it looks finished. A person keeps that word.

const PLATFORM_ONLY = /^(unsplash|pexels|pixabay|freepik|wikimedia commons|flickr|shutterstock)$/i;

const creditIsPlatformOnly = (credit) => PLATFORM_ONLY.test(String(credit || '').trim());

// What this entry needs, worst first. Null means nothing to do.
function gapFor(entry) {
  const hasPicture = Boolean(entry.image_url);
  const credit = String(entry.image_credit || '').trim();
  if (credit && !hasPicture) return 'credit_only';
  if (credit && creditIsPlatformOnly(credit)) return 'credit_needs_a_name';
  if (!hasPicture && !credit) return 'needs_picture';
  return null;
}

const NEED = {
  credit_only: {
    label: 'Credit stands, picture does not',
    said: 'the credit is on the entry but no picture is held here — either add the picture or the credit is claiming something a reader cannot see',
  },
  credit_needs_a_name: {
    label: 'Credit names a platform, not a person',
    said: 'a copyright-free picture still belongs to whoever made it — the credit wants the photographer, not the place it was found',
  },
  needs_picture: {
    label: 'No picture, no credit',
    said: 'the entry has none — nothing is broken, but the record is asking for a picture throughout',
  },
};

const ORDER = ['credit_only', 'credit_needs_a_name', 'needs_picture'];

export default function PictureCreditSweep() {
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    try {
      const [solPage, newsPage] = await Promise.all([
        base44.entities.ClimateSolution.filter({}, { sort: '-created_date', limit: 100 }),
        base44.entities.ClimateNews.filter({}, { sort: '-created_date', limit: 100 }),
      ]);
      const all = [
        ...(solPage.items || []).map((i) => ({ ...i, _kind: 'solution' })),
        ...(newsPage.items || []).map((i) => ({ ...i, _kind: 'news' })),
      ];
      const found = all
        .map((i) => ({ ...i, _gap: gapFor(i), _title: i.title || i.headline || 'Untitled' }))
        .filter((i) => i._gap);
      found.sort((a, b) => ORDER.indexOf(a._gap) - ORDER.indexOf(b._gap));
      setRows({ checked: all.length, found });
    } finally {
      setBusy(false);
    }
  };

  const counts = rows
    ? ORDER.reduce((acc, key) => ({ ...acc, [key]: rows.found.filter((r) => r._gap === key).length }), {})
    : null;

  return (
    <div className="mb-4 bg-[#efe7d6] border-2 border-[#1a1612]/25 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Image className="w-3.5 h-3.5 text-[#b3261e] flex-shrink-0" />
        <span className="text-[10px] font-black font-mono uppercase text-[#1a1612]">Picture &amp; credit sweep</span>
        <span className="text-[9px] font-mono text-[#6b6258] ml-auto">every picture carries its credit</span>
      </div>

      {!rows && (
        <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mb-2">
          Check every solution, crisis and wire entry for the three things that go wrong quietly: a credit with no
          picture under it, a credit naming a platform instead of a photographer, and no picture at all. It reports
          only — it will never write a credit or guess who took a picture.
        </p>
      )}

      {rows && (
        <div className="mb-2">
          {rows.found.length === 0 ? (
            <p className="text-[10px] font-mono text-[#1e3a2b] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> All {rows.checked} entries hold a picture and a credit that names who made it.
            </p>
          ) : (
            <>
              <p className="text-[10px] font-mono text-[#1a1612] leading-relaxed">
                <b className="font-black">{rows.found.length}</b> of {rows.checked} entries need a look
                {ORDER.filter((k) => counts[k] > 0).map((k) => (
                  <span key={k} className="text-[#6b6258]"> · {counts[k]} {NEED[k].label.toLowerCase()}</span>
                ))}
              </p>
              <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                {rows.found.map((r) => (
                  <div key={`${r._kind}-${r.id}`} className="border-l-2 border-l-[#b3261e] pl-2">
                    <p className="text-[10px] font-mono text-[#1a1612] leading-snug">
                      {r._title}
                      <span className="text-[9px] uppercase text-[#6b6258]"> · {r._kind}</span>
                    </p>
                    <p className="text-[9px] font-mono uppercase text-[#b3261e]">{NEED[r._gap].label}</p>
                    {r.image_credit && (
                      <p className="text-[9px] font-mono text-[#6b6258] leading-snug break-words">credit as it stands: {r.image_credit}</p>
                    )}
                    <p className="text-[9px] font-mono text-[#6b6258] leading-snug">{NEED[r._gap].said}</p>
                    <Link
                      to={r._kind === 'news' ? `/ClimateWireEntry/${r.id}` : `/ClimateDetail/solution/${r.id}`}
                      className="text-[9px] font-mono text-[#0f5f7a] underline"
                    >
                      open the entry
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={run}
        disabled={busy}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] bg-[#efe7d6] border-2 border-[#1a1612] text-[#1a1612] text-[10px] font-black font-mono uppercase active:bg-[#1a1612] active:text-[#efe7d6] transition-colors disabled:opacity-50"
      >
        {busy ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Image className="w-3.5 h-3.5" />}
        {rows ? 'Check again' : 'Check pictures and credits'}
      </button>
    </div>
  );
}