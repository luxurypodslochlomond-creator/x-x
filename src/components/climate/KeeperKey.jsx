import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { currentUser } from '@/lib/currentUser';
import { ArrowRight, KeyRound } from 'lucide-react';

// ── THE RECORD'S OWN DOOR ON THE RECORD'S OWN DESK ───────────────────────────────
//
// This screen used to sit behind the building's door — the app's admin role — which meant a
// keeper invited to hold the record's keys was stopped here and told "Admins only" on the one
// page built for her. The record's keys and the building's keys are not the same keys, and the
// desk belongs to the record.
//
// So the question is the record's: a line on its guest list with the keeper flag set. An app
// admin still opens it (whoever built the record has to be able to test it), and anybody else
// is told plainly what this is, with one tap back to sign in as themselves.
//
// And it is written as a sentence now, not a warning. It was three lines of uppercase mono on
// a dark plate — a door that made the person standing at it feel accused before they had done
// anything. Same question, same rule, said in the record's reading voice.
const reading = { fontFamily: 'var(--font-reading)' };

export default function KeeperKey({ children }) {
  const [state, setState] = useState('checking'); // checking | open | anon | denied

  useEffect(() => {
    let live = true;
    (async () => {
      const user = await currentUser().catch(() => null);
      if (!live) return;
      if (!user) { setState('anon'); return; }
      if (user.role === 'admin') { setState('open'); return; }
      const res = await base44.functions
        .invoke('climateKeeperRoom', { action: 'whoami' })
        .catch(() => null);
      if (live) setState(res?.data?.isKeeper ? 'open' : 'denied');
    })();
    return () => { live = false; };
  }, []);

  if (state === 'open') return children;

  if (state === 'checking') {
    return (
      <div className="min-h-screen bg-[#f4efe4] flex items-center justify-center">
        <div className="w-7 h-7 rounded-full animate-spin" style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4efe4] flex items-center justify-center px-5">
      <div className="max-w-md w-full border-t border-[#141210]/25 pt-6">
        <KeyRound className="w-6 h-6 text-[#b3261e] mb-3" />
        <p className="text-[#1a1612] font-semibold mb-2" style={{ ...reading, fontSize: '21px', lineHeight: 1.35 }}>
          {state === 'denied' ? 'This room is by invitation' : 'Sign in to the record'}
        </p>
        <p className="text-[15px] leading-[1.7] text-[#2b2622] mb-5" style={reading}>
          {state === 'denied'
            ? 'What is waiting, who is reading, and how much is on the record — this room names people, so it opens to a custodian of this record. Your address is not on that list yet, and asking is one line: a custodian can add you in a moment.'
            : 'A custodian’s work belongs to the record, not to the building. Sign in with the address a custodian added and this page opens where you left it.'}
        </p>
        {state === 'anon' && (
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-4 bg-[#1a1612] text-[#f4efe4] text-[14px] font-semibold active:bg-[#b3261e] transition-colors"
            style={reading}
          >
            Sign in <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {state === 'denied' && (
          <a
            href="/ClimateFellows"
            className="inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-[#141210] border-b-2 border-[#b3261e]"
            style={reading}
          >
            What checking involves <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}