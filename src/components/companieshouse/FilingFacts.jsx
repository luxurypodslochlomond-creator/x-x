import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Loader2 } from 'lucide-react';

function CopyLine({ label, value, note }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="border-t border-[#1a1612]/12 py-2.5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6b6258]">{label}</p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <p className="min-w-0 break-words font-mono text-[15px] font-bold leading-snug text-[#1a1612]">
          {value || <span className="font-sans font-normal text-[#6b6258]">not saved yet</span>}
        </p>
        {value ? (
          <button
            type="button"
            onClick={copy}
            className="flex min-h-[36px] shrink-0 items-center gap-1.5 border border-[#1a1612]/35 px-2.5 text-[11px] font-bold uppercase tracking-wide text-[#1a1612]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        ) : null}
      </div>
      {note ? <p className="mt-1 text-[13px] leading-snug text-[#6b6258]">{note}</p> : null}
    </div>
  );
}

// ── WHAT TO HAVE OPEN IN ANOTHER TAB ────────────────────────────────────────────
// Everything below is read from the admin-only vault. Nothing here is a new secret:
// it is the same information the Companies House details page already shows, put in the
// order the filing service asks for it.
export default function FilingFacts({ facts }) {
  if (!facts) {
    return (
      <div className="flex items-center gap-2 py-6 text-[#6b6258]">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        <span className="text-sm">Opening the vault…</span>
      </div>
    );
  }

  return (
    <div>
      <CopyLine label="Company number" value={facts['Company number']} />
      <CopyLine
        label="Registered office, as this record holds it"
        value={facts['Registered office']}
        note="Postcode confirmed: G83 8QU. Check the rest of the address against Companies House before confirming the filing."
      />
      <div className="border-t border-[#1a1612]/12 py-2.5">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6b6258]">Directors on the register</p>
        <p className="mt-1 text-[15px] font-bold leading-snug text-[#1a1612]">Brian Hughes · Gillian Barbara Brown</p>
        <p className="mt-1 text-[13px] leading-snug text-[#6b6258]">
          Both are also people with significant control. Step 5: check the names and service addresses as Companies House
          shows them.
        </p>
      </div>
      <CopyLine label="Personal code — Brian" value={facts['Brian Hughes - personal code']} note="Paste this if the filing asks for a director’s personal code." />
      <CopyLine
        label="Personal code — Gill"
        value={facts['Gillian Barbara Brown - personal code']}
        note="Stored, but her page still shows awaiting verification. Check this first."
      />
      <CopyLine label="Gateway user ID — Login A" value={facts['Login A - Gateway user ID']} />
      <CopyLine label="Gateway user ID — Login B" value={facts['Login B - Gateway user ID']} />
      <CopyLine
        label="Company authentication code"
        value={facts['Company authentication code']}
        note="Six characters, different from the Gateway password and from the 11-character personal codes. This record does not hold it yet. If it is in your hands, save it in the box at the foot of this page; if not, request a new one today, because it comes by post."
      />
      <p className="mt-4 text-[13.5px] leading-relaxed text-[#6b6258]">
        The Government Gateway passwords are on{' '}
        <Link to="/AdminCompaniesHouseDetails" className="font-bold text-[#1a1612] underline decoration-[#b3261e] underline-offset-4">
          the Companies House details page
        </Link>
        .
      </p>
    </div>
  );
}